// Shared regexes
const YT_REG = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=|shorts\/)|youtu\.be\/)([^"&?\/\s]{11})/i;
const VIMEO_REG = /(?:vimeo\.com\/(?:channels\/[^\/]+\/|groups\/[^\/]+\/album\/[^\/]+\/video\/|showcase\/[^\/]+\/video\/|video\/|)|player\.vimeo\.com\/video\/)([0-9]+)/i;

/**
 * Parses YouTube or Vimeo sharing links and returns their respective iframe embed URLs.
 * Returns null if the URL is not a valid YouTube or Vimeo link.
 */
export function getEmbedUrl(url: string | undefined | null): string | null {
  if (!url) return null;

  const ytMatch = url.match(YT_REG);
  if (ytMatch?.[1]) {
    return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&mute=0&rel=0`;
  }

  const vimeoMatch = url.match(VIMEO_REG);
  if (vimeoMatch?.[1]) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1&badge=0&autopause=0&player_id=0`;
  }

  return null;
}

/**
 * Derives a public static thumbnail URL from a YouTube or Vimeo link.
 * - YouTube: uses img.youtube.com (no auth required, always available)
 * - Vimeo:   uses the oEmbed JSON endpoint (requires a browser fetch; call from a useEffect)
 * Returns null if the URL is not a recognised YouTube or Vimeo link.
 */
export function getYouTubeThumbnail(url: string | undefined | null): string | null {
  if (!url) return null;
  const ytMatch = url.match(YT_REG);
  if (ytMatch?.[1]) {
    // hqdefault (480×360) — always present without auth
    return `https://img.youtube.com/vi/${ytMatch[1]}/hqdefault.jpg`;
  }
  return null;
}

/**
 * Returns the Vimeo video ID if found in the URL, else null.
 * Use this to fetch the thumbnail async via oEmbed on the client.
 */
export function getVimeoId(url: string | undefined | null): string | null {
  if (!url) return null;
  const vimeoMatch = url.match(VIMEO_REG);
  return vimeoMatch?.[1] ?? null;
}
