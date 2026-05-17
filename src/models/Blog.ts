import mongoose, { Schema, Document } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  summary: string;
  category: string;
  imageUrl: string;
  watchUrl: string;
  tags: string[];
  readTime: string;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema = new Schema<IBlog>(
  {
    title: {
      type: String,
      required: [true, 'Blog title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    summary: {
      type: String,
      required: [true, 'Blog summary is required'],
      trim: true,
      maxlength: [1000, 'Summary cannot exceed 1000 characters'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
      default: 'Tech',
    },
    imageUrl: {
      type: String,
      required: [true, 'Blog image URL is required'],
      trim: true,
    },
    watchUrl: {
      type: String,
      required: [true, 'Watch/Read link is required'],
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    readTime: {
      type: String,
      required: [true, 'Read time is required'],
      trim: true,
      default: '5 MIN READ',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Clear cached model to avoid re-compilation errors in development
if (mongoose.models && mongoose.models.Blog) {
  delete mongoose.models.Blog;
}

const Blog = mongoose.model<IBlog>('Blog', BlogSchema);
export default Blog;
