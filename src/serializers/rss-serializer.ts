import escapeXml from '../utils/escape-xml';
import FeedItem from '../types/feed-item';
import FeedMetadata from '../types/feed-metadata';

/**
 * Serializes feed metadata and items into a valid RSS 2.0 XML document.
 *
 * This function generates an RSS feed from the provided {@link FeedMetadata} and
 * array of {@link FeedItem} objects. The resulting XML conforms to the
 * [RSS 2.0 specification](https://validator.w3.org/feed/docs/rss2.html).
 *
 * The output includes a `<channel>` element with metadata such as `<title>`, `<link>`,
 * and `<description>`, along with a series of `<item>` elements for each feed entry.
 *
 * It uses {@link escapeXml} to ensure special characters are properly encoded in XML.
 * @param metadata - Feed-level metadata including title, description, link, and optionally lastBuildDate
 * @param items - An array of feed items to include in the feed, each rendered as an `<item>` element
 * @returns A complete RSS 2.0 feed as an XML string
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
            ? `<description>${escapeXml(item.description)}</description>`
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
