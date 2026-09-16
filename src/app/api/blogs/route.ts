import { NextRequest, NextResponse } from 'next/server';
import connectDB, { isMongoConnected } from '@/lib/mongoose';
import Blog from '@/models/Blog';

export async function GET(request: NextRequest) {
  try {
    const db = await connectDB();

    if (!db || !isMongoConnected()) {
      return NextResponse.json(
        {
          success: true,
          data: [],
          count: 0,
          message: 'MongoDB is unavailable. Returning an empty blog list.',
        },
        { status: 200 }
      );
    }

    let blogs;
    try {
      blogs = await Blog.find({}).sort({ createdAt: -1 });
    } catch (queryError) {
      console.error('Blog query failed:', queryError);
      return NextResponse.json(
        {
          success: true,
          data: [],
          count: 0,
          message: 'MongoDB query failed. Returning an empty blog list.',
        },
        { status: 200 }
      );
    }

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
