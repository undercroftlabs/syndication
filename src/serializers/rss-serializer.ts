import escapeXml from '../utils/escape-xml';
import FeedItem from '../types/feed-item';
import FeedMetadata from '../types/feed-metadata';

/**
 * Serializes feed metadata and items into a valid RSS 2.0 XML document.
 *
 * This function generates an RSS feed string from the provided {@link FeedMetadata} and
 * an array of {@link FeedItem} objects. It outputs a standards-compliant RSS 2.0 document
 * with all special XML characters properly escaped.
 *
 * Each `<item>` element includes the required fields such as `<title>`, `<link>`, `<guid>`,
 * and `<pubDate>`. Optional fields like `<description>` are included if available and wrapped
 * in CDATA blocks to preserve formatting and prevent encoding issues with special characters.
 *
 * The `<channel>` element contains overall feed metadata including title, description,
 * link, and optionally the last build date.
 *
 * @see https://validator.w3.org/feed/docs/rss2.html - RSS 2.0 specification
 * @param metadata - Feed-level metadata such as title, description, link, and optionally `updated` as `lastBuildDate`
 * @param items - Array of {@link FeedItem} objects to serialize as RSS `<item>` entries
 * @returns A complete RSS 2.0 XML feed string
 */
export default function serializeRss(
  metadata: FeedMetadata,
  items: FeedItem[],
): string {
  const itemsXml = items
    .map(
      (item) => `
      <item>
        <title>${escapeXml(item.title)}</title>
        <link>${item.url}</link>
        <guid>${item.id}</guid>
        <pubDate>${new Date(item.published).toUTCString()}</pubDate>
        ${
          item.description
            ? `<description><![CDATA[${item.description}]]></description>`
            : ''
        }
      </item>
    `,
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0">
    <channel>
      <title>${escapeXml(metadata.title)}</title>
      <link>${metadata.url}</link>
      <description>${escapeXml(metadata.description)}</description>
      ${
        metadata.updated
          ? `<lastBuildDate>${new Date(
              metadata.updated,
            ).toUTCString()}</lastBuildDate>`
          : ''
      }
      ${itemsXml}
    </channel>
  </rss>`.trim();
}
