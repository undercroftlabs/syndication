/**
 * Represents a single item or entry in a feed (RSS, Atom, or JSON Feed).
 */
export default interface FeedItem {
  /**
   * A unique identifier for the item (used as `<guid>`, `id`, etc.)
   */
  id: string;

  /**
   * The display title of the item
   */
  title: string;

  /**
   * The canonical URL where the item is hosted
   */
  url: string;

  /**
   * A plain text or summary version of the content
   */
  description?: string;

  /**
   * Full HTML content to include in feeds that support it (e.g., Atom, JSON Feed)
   */
  contentHtml?: string;

  /**
   * The name of the item's author
   */
  author?: string;

  /**
   * The ISO timestamp representing when the item was first published
   */
  published: string;

  /**
   * ISO timestamp representing when the item was last modified
   */
  updated?: string;

  /**
   * A featured image URL associated with the item
   */
  image?: string;
}
