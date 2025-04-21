import escapeXml from '../utils/escape-xml';
import FeedItem from '../types/feed-item';
import FeedMetadata from '../types/feed-metadata';

/**
 * Serializes feed metadata and items into a valid Atom 1.0 XML document.
 *
 * This function takes a {@link FeedMetadata} object and an array of {@link FeedItem}s
 * and returns an Atom-compliant XML string. It includes required fields like `<title>`,
 * `<id>`, and `<updated>`, and supports optional elements such as `<subtitle>`, `<author>`,
 * `<summary>`, and HTML content wrapped in a CDATA block.
 *
 * It escapes all necessary XML characters using {@link escapeXml} and defaults to using
 * `item.updated` or `item.published` as the entry `<updated>` timestamp.
 * @see https://datatracker.ietf.org/doc/html/rfc4287 Atom Syndication Format (RFC 4287)
 * @param metadata - An object containing feed-level metadata such as title, id, url, and author
 * @param items - An array of {@link FeedItem} objects to include as `<entry>` elements
 * @returns A string of Atom 1.0-compliant XML
 */
export default function serializeAtom(
  metadata: FeedMetadata,
  items: FeedItem[],
): string {
  const itemsXml = items
    .map(
      (item) => `
      <entry>
        <title>${escapeXml(item.title)}</title>
        <link href="${item.url}" />
        <id>${item.id}</id>
        <updated>${new Date(
          item.updated || item.published,
        ).toISOString()}</updated>
        <published>${new Date(item.published).toISOString()}</published>
        ${
          item.author
            ? `<author><name>${escapeXml(item.author)}</name></author>`
            : ''
        }
        ${
          item.contentHtml
            ? `<content type="html"><![CDATA[${item.contentHtml}]]></content>`
            : ''
        }
        ${
          item.description
            ? `<summary><![CDATA[${item.description}]]></summary>`
            : ''
        }
      </entry>
    `,
    )
    .join('\n');

  return `<?xml version="1.0" encoding="utf-8"?>
  <feed xmlns="http://www.w3.org/2005/Atom">
    <title>${escapeXml(metadata.title)}</title>
    <subtitle>${escapeXml(metadata.description)}</subtitle>
    <link href="${metadata.url}" />
    <id>${metadata.id}</id>
    <updated>${new Date(
      metadata.updated || new Date().toISOString(),
    ).toISOString()}</updated>
    ${
      metadata.author
        ? `<author><name>${escapeXml(metadata.author)}</name></author>`
        : ''
    }
    ${itemsXml}
  </feed>`.trim();
}
