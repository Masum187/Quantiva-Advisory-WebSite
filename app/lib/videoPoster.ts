/** Poster path for a looping background clip (local first-frame JPG or Cloudinary still). */
export function videoPosterFor(src: string): string | undefined {
  if (!src) return undefined;
  if (src.startsWith('/assets/') && src.endsWith('.mp4')) {
    return src.replace(/\.mp4$/, '-poster.jpg');
  }
  if (src.includes('res.cloudinary.com') && src.includes('/video/upload/')) {
    return src.replace('/video/upload/', '/video/upload/so_0/').replace(/\.mp4(\?.*)?$/, '.jpg$1');
  }
  return undefined;
}
