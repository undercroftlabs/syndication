/* eslint-disable no-underscore/no-underscore */
import FeedItem from '../types/feed-item';
import FeedMetadata from '../types/feed-metadata';

/**
 * Serializes feed metadata and items into a valid JSON Feed v1.1 string.
 *
 * This function generates a JSON-based feed format that is a modern, lightweight
 * alternative to RSS and Atom. It includes both required and optional fields
 * according to the [JSON Feed v1.1 specification](https://jsonfeed.org/version/1.1).
 *
 * It accepts a {@link FeedMetadata} object for global feed-level properties and
 * an array of {@link FeedItem}s that populate the `items` array in the output.
 *
 * Optional fields like `icon`, `favicon`, `author`, `image`, and `content_html`
 * are included when present. Feed items may contain either raw HTML via `contentHtml`
 * or a plain `description`.
 * @param metadata - The metadata for the feed including title, id, url, author, etc.
 * @param items - An array of items to include in the feed, each representing a post or entry
 * @returns A stringified JSON Feed document, pretty-printed with 2-space indentation
 */
export default function serializeJsonFeed(
  metadata: FeedMetadata,
  items: FeedItem[],
): string {
  const feed = {
    version: 'https://jsonfeed.org/version/1.1',
    title: metadata.title,
    home_page_url: metadata.url,
    feed_url: metadata.id,
    description: metadata.description,
    language: metadata.language,
    icon: metadata.logo,
    favicon: metadata.favicon,
    author: metadata.author ? { name: metadata.author } : undefined,
    items: items.map((item) => ({
      id: item.id,
      url: item.url,
      title: item.title,
      content_html: item.contentHtml || item.description,
      summary: item.description,
      date_published: item.published,
      date_modified: item.updated,
      author: item.author ? { name: item.author } : undefined,
      image: item.image,
    })),
  };

  return JSON.stringify(feed, null, 2);
}
