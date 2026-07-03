/**
 * Parses YouTube or Vimeo sharing links and returns their respective iframe embed URLs.
 * Returns null if the URL is not a valid YouTube or Vimeo link.
 */
export function getEmbedUrl(url: string | undefined | null): string | null {
  if (!url) return null;

  // YouTube RegExp (handles watch?v=, embed/, v/, youtu.be/, shorts/, etc.)
  const ytReg = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=|shorts\/)|youtu\.be\/)([^"&?\/\s]{11})/i;
  const ytMatch = url.match(ytReg);
  if (ytMatch && ytMatch[1]) {
    return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&mute=0&rel=0`;
  }

  // Vimeo RegExp (handles vimeo.com/..., player.vimeo.com/video/...)
  const vimeoReg = /(?:vimeo\.com\/(?:channels\/[^\/]+\/|groups\/[^\/]+\/album\/[^\/]+\/video\/|showcase\/[^\/]+\/video\/|video\/|)|player\.vimeo\.com\/video\/)([0-9]+)/i;
  const vimeoMatch = url.match(vimeoReg);
  if (vimeoMatch && vimeoMatch[1]) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1&badge=0&autopause=0&player_id=0`;
  }

  return null;
}
