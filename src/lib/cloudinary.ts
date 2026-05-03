import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export interface UploadOptions {
  folder?: string;
  publicId?: string;
  quality?: 'auto' | number;
  width?: number;
  height?: number;
  crop?: string;
}

/**
 * Upload an image to Cloudinary from a file buffer
 * @param fileBuffer - The image file buffer
 * @param filename - The original filename
 * @param options - Upload options
 * @returns Cloudinary upload response with image URL
 */
export async function uploadImageToCloudinary(
  fileBuffer: Buffer,
  filename: string,
  options: UploadOptions = {}
) {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: options.folder || 'portfolio/projects',
        public_id: options.publicId || filename.split('.')[0],
        quality: options.quality || 'auto',
        resource_type: 'auto',
        overwrite: true,
      },
      (error, result) => {
        if (error) {
          reject(new Error(`Cloudinary upload failed: ${error.message}`));
        } else {
          resolve({
            success: true,
            url: result?.secure_url,
            publicId: result?.public_id,
            cloudinaryId: result?.asset_id,
          });
        }
      }
    );

    // Write buffer to upload stream
    uploadStream.end(fileBuffer);
  });
}

/**
 * Delete an image from Cloudinary
 * @param publicId - The public ID of the image to delete
 */
export async function deleteImageFromCloudinary(publicId: string) {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return {
      success: result.result === 'ok',
      message: result.result,
    };
  } catch (error) {
    throw new Error(`Failed to delete image from Cloudinary: ${error}`);
  }
}

/**
 * Get optimized image URL with transformations
 * @param publicId - The public ID of the image
 * @param width - Width in pixels (optional)
 * @param height - Height in pixels (optional)
 */
export function getOptimizedImageUrl(
  publicId: string,
  width?: number,
  height?: number
): string {
  return cloudinary.url(publicId, {
    quality: 'auto',
    fetch_format: 'auto',
    width,
    height,
    crop: 'fill',
    gravity: 'auto',
  });
}

export default cloudinary;