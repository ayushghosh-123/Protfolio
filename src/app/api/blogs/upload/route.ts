import { NextRequest, NextResponse } from 'next/server';
import connectDB, { isMongoConnected } from '@/lib/mongoose';
import Blog from '@/models/Blog';
import { uploadImageToImageKit } from '@/lib/imagekit';

export const maxDuration = 60;

const validImageTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

async function uploadBlogImage(file: File) {
  const buffer = Buffer.from(await file.arrayBuffer());
  const uploadResult = await uploadImageToImageKit(
    buffer,
    file.name,
    '/portfolio/blogs'
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
    const summary = formData.get('summary') as string;
    const category = formData.get('category') as string;
    const watchUrl = formData.get('watchUrl') as string;
    const readTime = formData.get('readTime') as string;
    const tagsString = formData.get('tags') as string;

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { success: false, error: 'No image file provided' },
        { status: 400 }
      );
    }

    if (!title || !summary || !watchUrl) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: title, summary, watchUrl' },
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
      imageUrl = await uploadBlogImage(file);
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

    const newBlog = new Blog({
      title,
      summary,
      category: category || 'Tech',
      imageUrl,
      watchUrl,
      readTime: readTime || '5 MIN READ',
      tags,
    });

    await newBlog.save();

    return NextResponse.json(
      {
        success: true,
        message: 'Blog post created successfully',
        data: newBlog,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error uploading blog:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create blog',
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
    const blogId = formData.get('id') as string;
    const file = formData.get('image');
    const title = formData.get('title') as string;
    const summary = formData.get('summary') as string;
    const category = formData.get('category') as string;
    const watchUrl = formData.get('watchUrl') as string;
    const readTime = formData.get('readTime') as string;
    const tagsString = formData.get('tags') as string;

    if (!blogId) {
      return NextResponse.json(
        { success: false, error: 'Blog ID is required for updates' },
        { status: 400 }
      );
    }

    if (!title || !summary || !watchUrl) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: title, summary, watchUrl' },
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

      imageUrl = await uploadBlogImage(file);
    }

    const db = await connectDB();
    if (!db || !isMongoConnected()) {
      return NextResponse.json(
        { success: false, error: 'Database unavailable. Please try again later.' },
        { status: 503 }
      );
    }

    const existingBlog = await Blog.findById(blogId);
    if (!existingBlog) {
      return NextResponse.json(
        { success: false, error: 'Blog post not found' },
        { status: 404 }
      );
    }

    const tags = tagsString
      ? tagsString.split(',').map((tag) => tag.trim()).filter(Boolean)
      : [];

    const updatedBlog = await Blog.findByIdAndUpdate(
      blogId,
      {
        title,
        summary,
        category: category || 'Tech',
        ...(imageUrl ? { imageUrl } : {}),
        watchUrl,
        readTime: readTime || '5 MIN READ',
        tags,
      },
      { new: true, runValidators: true }
    );

    return NextResponse.json(
      {
        success: true,
        message: 'Blog post updated successfully',
        data: updatedBlog,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating blog:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update blog',
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
    const blogId = searchParams.get('id');

    if (!blogId) {
      return NextResponse.json(
        { success: false, error: 'Blog ID is required' },
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

    const deletedBlog = await Blog.findByIdAndDelete(blogId);

    if (!deletedBlog) {
      return NextResponse.json(
        { success: false, error: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Blog post deleted successfully',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting blog:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete blog',
      },
      { status: 500 }
    );
  }
}
