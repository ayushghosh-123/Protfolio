import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose';
import Project from '@/models/Project';

export async function GET(request: NextRequest) {
  try {
    // Connect to MongoDB
    await connectDB();

    // Fetch all projects, sorted by creation date (newest first)
    const projects = await Project.find({})
      .sort({ createdAt: -1 })
      .select('title description longDescription imageUrl tags liveLink githubLink featured createdAt');

    // Return projects with success status
    return NextResponse.json(
      {
        success: true,
        data: projects,
        count: projects.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch projects',
      },
      { status: 500 }
    );
  }
}

// POST route for adding new projects (admin only)
export async function POST(request: NextRequest) {
  try {
    // Verify admin authentication (you can use JWT or session here)
    const authToken = request.headers.get('Authorization');
    if (!authToken || !authToken.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    const body = await request.json();
    const { title, description, longDescription, imageUrl, tags, liveLink, githubLink, featured } = body;

    // Validation
    if (!title || !description || !imageUrl) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: title, description, imageUrl' },
        { status: 400 }
      );
    }

    // Create new project
    const newProject = new Project({
      title,
      description,
      longDescription,
      imageUrl,
      tags: tags || [],
      liveLink,
      githubLink,
      featured: featured || false,
    });

    // Save to database
    await newProject.save();

    return NextResponse.json(
      {
        success: true,
        message: 'Project created successfully',
        data: newProject,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create project',
      },
      { status: 500 }
    );
  }
}