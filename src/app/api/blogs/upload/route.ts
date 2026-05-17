import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose';
import Blog from '@/models/Blog';
import { uploadImageToCloudinary } from '@/lib/cloudinary';

// Route segment config
export const maxDuration = 60; // 60 seconds limit for Cloudinary image uploads

export async function POST(request: NextRequest) {
  try {
    // 1. Authorization checks
    const authToken = request.headers.get('Authorization');
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!authToken || authToken !== `Bearer ${adminPassword}`) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized - Invalid or missing master key' },
        { status: 401 }
      );
    }

    // 2. Parse FormData
    const formData = await request.formData();
    const file = formData.get('image') as File;
    const title = formData.get('title') as string;
    const summary = formData.get('summary') as string;
    const category = formData.get('category') as string;
    const watchUrl = formData.get('watchUrl') as string;
    const readTime = formData.get('readTime') as string;
    const tagsString = formData.get('tags') as string;

    // 3. Simple validations
    if (!file) {
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

    // Validate size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: 'File size exceeds 10MB limit' },
        { status: 400 }
      );
    }

    // 4. File buffering and Cloudinary uploading
    const buffer = Buffer.from(await file.arrayBuffer());

    let imageUrl: string;
    try {
      const uploadResult = await uploadImageToCloudinary(
        buffer,
        file.name,
        {
          folder: 'portfolio/blogs',
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

    // 5. Connect and save to DB
    await connectDB();

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

    await connectDB();

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
