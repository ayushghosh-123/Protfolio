import ImageKit from 'imagekit';

/**
 * Lazily get ImageKit instance to avoid build-time errors when env vars are pending
 */
export function getImageKitClient(): ImageKit {
  const publicKey = process.env.IMAGEKIT_PUBLIC_KEY || 'dummy_public_key';
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY || 'dummy_private_key';
  const urlEndpoint = process.env.IMAGEKIT_URL_ENDPOINT || 'https://ik.imagekit.io/placeholder';

  return new ImageKit({
    publicKey,
    privateKey,
    urlEndpoint,
  });
}

export interface ImageKitUploadResult {
  success: boolean;
  url: string;
  fileId: string;
  name: string;
}

/**
 * Upload an image buffer to ImageKit
 * @param fileBuffer - Buffer containing file data
 * @param fileName - Original or target filename
 * @param folder - Destination folder on ImageKit (e.g. /portfolio/projects)
 */
export async function uploadImageToImageKit(
  fileBuffer: Buffer,
  fileName: string,
  folder: string = '/portfolio/projects'
): Promise<ImageKitUploadResult> {
  if (!process.env.IMAGEKIT_PUBLIC_KEY || !process.env.IMAGEKIT_PRIVATE_KEY) {
    throw new Error('ImageKit credentials missing: Please provide IMAGEKIT_PUBLIC_KEY and IMAGEKIT_PRIVATE_KEY in your .env file.');
  }

  const imagekit = getImageKitClient();

  return new Promise((resolve, reject) => {
    imagekit.upload(
      {
        file: fileBuffer,
        fileName: fileName || `upload_${Date.now()}`,
        folder: folder,
        useUniqueFileName: true,
      },
      (error, result) => {
        if (error) {
          reject(new Error(`ImageKit upload failed: ${error.message}`));
        } else if (result) {
          resolve({
            success: true,
            url: result.url,
            fileId: result.fileId,
            name: result.name,
          });
        } else {
          reject(new Error('ImageKit upload returned an empty response.'));
        }
      }
    );
  });
}

/**
 * Delete an image file from ImageKit by fileId
 * @param fileId - ImageKit file ID
 */
export async function deleteImageFromImageKit(fileId: string): Promise<{ success: boolean; message?: string }> {
  if (!process.env.IMAGEKIT_PUBLIC_KEY || !process.env.IMAGEKIT_PRIVATE_KEY) {
    throw new Error('ImageKit credentials missing: Please set IMAGEKIT_PUBLIC_KEY and IMAGEKIT_PRIVATE_KEY in .env.');
  }

  const imagekit = getImageKitClient();

  return new Promise((resolve, reject) => {
    imagekit.deleteFile(fileId, (error) => {
      if (error) {
        reject(new Error(`Failed to delete image from ImageKit: ${error.message}`));
      } else {
        resolve({ success: true, message: 'Image deleted from ImageKit successfully.' });
      }
    });
  });
}
