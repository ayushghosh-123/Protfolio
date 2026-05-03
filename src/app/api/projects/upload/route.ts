import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose';
import Project from '@/models/Project';
import { uploadImageToCloudinary } from '@/lib/cloudinary';

// Set higher max duration for image processing (Route Segment Config)
export const maxDuration = 60; // 60 seconds max

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const authToken = request.headers.get('Authorization');
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!authToken || authToken !== `Bearer ${adminPassword}`) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized - Invalid or missing master key' },
        { status: 401 }
      );
    }

    // Parse FormData
    const formData = await request.formData();
    const file = formData.get('image') as File;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const longDescription = formData.get('longDescription') as string;
    const tagsString = formData.get('tags') as string;
    const liveLink = formData.get('liveLink') as string;
    const githubLink = formData.get('githubLink') as string;
    const featured = formData.get('featured') === 'true';

    // Validation
    if (!file) {
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

    // Validate file type
    const validImageTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!validImageTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: 'Invalid image type. Allowed: JPEG, PNG, WebP, GIF' },
        { status: 400 }
      );
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: 'File size exceeds 10MB limit' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Upload image to Cloudinary
    let imageUrl: string;
    try {
      const uploadResult = await uploadImageToCloudinary(
        buffer,
        file.name,
        {
          folder: 'portfolio/projects',
          quality: 'auto',
        }
      ) as { url: string };
      imageUrl = uploadResult.url;
    } catch (uploadError) {
      return NextResponse.json(
        {
          success: false,
          error: uploadError instanceof Error ? uploadError.message : 'Image upload failed',
        },
        { status: 500 }
      );
    }

    // Connect to MongoDB
    await connectDB();

    // Parse tags
    const tags = tagsString
      ? tagsString.split(',').map((tag) => tag.trim()).filter(Boolean)
      : [];

    // Normalize links
    const normalizeUrl = (url: string) => {
      if (!url) return undefined;
      return url.startsWith('http') ? url : `${url}`;
    };

    // Create new project document
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

    // Save to database
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

// DELETE route to remove a project
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

    await connectDB();

    // Find and delete project
    const deletedProject = await Project.findByIdAndDelete(projectId);

    if (!deletedProject) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      );
    }

    // Note: Image deletion from Cloudinary can be done separately
    // using the public_id stored in the database if needed

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