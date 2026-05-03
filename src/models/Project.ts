import mongoose, { Schema, Document } from 'mongoose';

// interface for project
export interface IProject extends Document {
  title: string;
  description: string;
  longDescription: string;
  imageUrl: string;
  tags: string[];
  liveLink?: string;
  githubLink?: string;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// schema for project
const ProjectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
      minlength: [3, 'Title must be at least 3 characters'],
    },
    description: {
      type: String,
      required: [true, 'Project description is required'],
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters'],
      minlength: [10, 'Description must be at least 10 characters'],
    },
    longDescription: {
      type: String,
      trim: true,
      maxlength: [5000, 'Long description cannot exceed 5000 characters'],
    },
    imageUrl: {
      type: String,
      required: [true, 'Project image URL is required'],
      trim: true,
      // Cloudinary URL validation
      validate: {
        validator: function (v: string) {
          return /^(https?:\/\/)?(www\.)?cloudinary\.com|res\.cloudinary\.com/.test(v);
        },
        message: 'Image URL must be a valid Cloudinary URL',
      },
    },
    tags: {
      type: [String],
      default: [],
      validate: {
        validator: function (v: string[]) {
          return v.length <= 10;
        },
        message: 'Cannot have more than 10 tags',
      },
    },
    liveLink: {
      type: String,
      trim: true,
    },
    githubLink: {
      type: String,
      trim: true,
    },
    featured: {
      type: Boolean,
      default: false,
      index: true, // Index for faster queries
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
    versionKey: false, // Removes __v field
  }
);

// Indexes for better query performance
ProjectSchema.index({ featured: 1, createdAt: -1 });
ProjectSchema.index({ tags: 1 });

// Text index for searching by title and description
ProjectSchema.index({ title: 'text', description: 'text' });

// Force model re-compilation in development to pick up schema changes
if (mongoose.models && mongoose.models.Project) {
  delete mongoose.models.Project;
}

const Project = mongoose.model<IProject>('Project', ProjectSchema);

export default Project;