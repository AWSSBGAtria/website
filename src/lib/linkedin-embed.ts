/**
 * Build LinkedIn's public single-post embed URL from a normal post URL.
 * LinkedIn's own embed URLs are preserved as-is. Share URLs that do not expose
 * a public post identifier remain clickable links but cannot be framed here.
 */
export function getLinkedInEmbedUrl(postUrl: string): string | null {
  try {
    const parsed = new URL(postUrl);
    if (!/(^|\.)linkedin\.com$/i.test(parsed.hostname)) return null;

    const existingEmbed = parsed.pathname.match(
      /\/embed\/feed\/update\/(urn:li:(?:activity|share|ugcPost):[^/?]+)/i,
    );
    if (existingEmbed) {
      return `https://www.linkedin.com/embed/feed/update/${existingEmbed[1]}`;
    }

    const feedUpdate = parsed.pathname.match(
      /\/feed\/update\/(urn:li:(?:activity|share|ugcPost):[^/?]+)/i,
    );
    if (feedUpdate) {
      return `https://www.linkedin.com/embed/feed/update/${feedUpdate[1]}`;
    }

    const postIdentifier = `${parsed.pathname}${parsed.search}`.match(
      /(activity|ugcPost|share)-(\d+)/i,
    );
    if (!postIdentifier) return null;

    const urnType = postIdentifier[1].toLowerCase();
    const normalizedType =
      urnType === "ugcpost" ? "ugcPost" : urnType;
    return `https://www.linkedin.com/embed/feed/update/urn:li:${normalizedType}:${postIdentifier[2]}`;
  } catch {
    return null;
  }
}
