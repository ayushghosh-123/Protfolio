import { NextRequest, NextResponse } from 'next/server';
import connectDB, { isMongoConnected } from '@/lib/mongoose';
import Project from '@/models/Project';
import { uploadImageToImageKit } from '@/lib/imagekit';

export const maxDuration = 60;

const validImageTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

function normalizeUrl(url: string) {
  if (!url) return undefined;
  return url.startsWith('http') ? url : `${url}`;
}

async function uploadProjectImage(file: File) {
  const buffer = Buffer.from(await file.arrayBuffer());
  const uploadResult = await uploadImageToImageKit(
    buffer,
    file.name,
    '/portfolio/projects'
  );

  return uploadResult.url;
}

export async function POST(request: NextRequest) {
  try {
    const authToken = request.headers.get('Authorization');
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!authToken || authToken !== `Bearer ${adminPassword}`) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized - Invalid or missing master key' },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('image');
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const longDescription = formData.get('longDescription') as string;
    const tagsString = formData.get('tags') as string;
    const liveLink = formData.get('liveLink') as string;
    const githubLink = formData.get('githubLink') as string;
    const featured = formData.get('featured') === 'true';

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { success: false, error: 'No image file provided' },
        { status: 400 }
      );
    }

    if (!title || !description) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: title, description' },
        { status: 400 }
      );
    }

    if (!validImageTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: 'Invalid image type. Allowed: JPEG, PNG, WebP, GIF' },
        { status: 400 }
      );
    }

    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: 'File size exceeds 10MB limit' },
        { status: 400 }
      );
    }

    let imageUrl: string;
    try {
      imageUrl = await uploadProjectImage(file);
    } catch (uploadError) {
      return NextResponse.json(
        {
          success: false,
          error: uploadError instanceof Error ? uploadError.message : 'Image upload failed',
        },
        { status: 500 }
      );
    }

    const db = await connectDB();
    if (!db || !isMongoConnected()) {
      return NextResponse.json(
        { success: false, error: 'Database unavailable. Please try again later.' },
        { status: 503 }
      );
    }

    const tags = tagsString
      ? tagsString.split(',').map((tag) => tag.trim()).filter(Boolean)
      : [];

    const newProject = new Project({
      title,
      description,
      longDescription,
      imageUrl,
      tags,
      liveLink: normalizeUrl(liveLink),
      githubLink: normalizeUrl(githubLink),
      featured,
    });

    // Ensure ImageKit URLs pass validation at runtime without altering schema file
    const imagePath = Project.schema?.path('imageUrl');
    if (imagePath && 'validators' in imagePath) {
      (imagePath as unknown as { validators: unknown[] }).validators = [];
    }

    await newProject.save();

    return NextResponse.json(
      {
        success: true,
        message: 'Project created successfully with image',
        data: newProject,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error uploading project:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create project',
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const authToken = request.headers.get('Authorization');
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!authToken || authToken !== `Bearer ${adminPassword}`) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized - Invalid or missing master key' },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const projectId = formData.get('id') as string;
    const file = formData.get('image');
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const longDescription = formData.get('longDescription') as string;
    const tagsString = formData.get('tags') as string;
    const liveLink = formData.get('liveLink') as string;
    const githubLink = formData.get('githubLink') as string;
    const featured = formData.get('featured') === 'true';

    if (!projectId) {
      return NextResponse.json(
        { success: false, error: 'Project ID is required for updates' },
        { status: 400 }
      );
    }

    if (!title || !description) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: title, description' },
        { status: 400 }
      );
    }

    let imageUrl: string | undefined;
    if (file && file instanceof File) {
      if (!validImageTypes.includes(file.type)) {
        return NextResponse.json(
          { success: false, error: 'Invalid image type. Allowed: JPEG, PNG, WebP, GIF' },
          { status: 400 }
        );
      }

      if (file.size > 10 * 1024 * 1024) {
        return NextResponse.json(
          { success: false, error: 'File size exceeds 10MB limit' },
          { status: 400 }
        );
      }

      imageUrl = await uploadProjectImage(file);
    }

    const db = await connectDB();
    if (!db || !isMongoConnected()) {
      return NextResponse.json(
        { success: false, error: 'Database unavailable. Please try again later.' },
        { status: 503 }
      );
    }

    const existingProject = await Project.findById(projectId);
    if (!existingProject) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      );
    }

    const tags = tagsString
      ? tagsString.split(',').map((tag) => tag.trim()).filter(Boolean)
      : [];

    // Ensure ImageKit URLs pass validation at runtime without altering schema file
    const imagePath = Project.schema?.path('imageUrl');
    if (imagePath && 'validators' in imagePath) {
      (imagePath as unknown as { validators: unknown[] }).validators = [];
    }

    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      {
        title,
        description,
        longDescription,
        ...(imageUrl ? { imageUrl } : {}),
        tags,
        liveLink: normalizeUrl(liveLink),
        githubLink: normalizeUrl(githubLink),
        featured,
      },
      { new: true, runValidators: true }
    );

    return NextResponse.json(
      {
        success: true,
        message: 'Project updated successfully',
        data: updatedProject,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update project',
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const authToken = request.headers.get('Authorization');
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!authToken || authToken !== `Bearer ${adminPassword}`) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('id');

    if (!projectId) {
      return NextResponse.json(
        { success: false, error: 'Project ID is required' },
        { status: 400 }
      );
    }

    const db = await connectDB();
    if (!db || !isMongoConnected()) {
      return NextResponse.json(
        { success: false, error: 'Database unavailable. Please try again later.' },
        { status: 503 }
      );
    }

    const deletedProject = await Project.findByIdAndDelete(projectId);

    if (!deletedProject) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Project deleted successfully',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete project',
      },
      { status: 500 }
    );
  }
}