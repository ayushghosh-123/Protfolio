import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose';
import Blog from '@/models/Blog';

export async function GET(request: NextRequest) {
  try {
    // Connect to database
    await connectDB();

    // Fetch all blogs sorted newest first
    const blogs = await Blog.find({}).sort({ createdAt: -1 });

    return NextResponse.json(
      {
        success: true,
        data: blogs,
        count: blogs.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch blogs',
      },
      { status: 500 }
    );
  }
}
