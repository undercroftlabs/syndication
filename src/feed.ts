import FeedItem from './types/feed-item';
import FeedMetadata from './types/feed-metadata';

/**
 * Abstract base class for all feed formats (e.g. RSS, Atom, JSON Feed).
 *
 * This class provides shared structure and utility methods for working with
 * syndication feeds. It holds feed-level metadata and an array of feed items,
 * and exposes common methods to interact with them.
 */
export default abstract class Feed {
  /** Metadata describing the feed as a whole (title, url, etc.) */
  protected metadata: FeedMetadata;

  /** A list of items to include in the feed (e.g. blog posts, updates) */
  protected items: FeedItem[];

  /**
   * Creates a new Feed instance.
   * @param metadata - Feed-level metadata such as title, author, url, etc.
   * @param items - An initial array of items to include in the feed
   */
  constructor(metadata: FeedMetadata, items: FeedItem[]) {
    this.metadata = metadata;
    this.items = items;
  }

  /**
   * Adds a new item to the feed.
   * @param item - A {@link FeedItem} to append to the feed
   */
  public addItem(item: FeedItem): void {
    this.items.push(item);
  }

  /**
   * Returns all items currently in the feed.
   * @returns An array of {@link FeedItem}s
   */
  public getItems(): FeedItem[] {
    return this.items;
  }

  /**
   * Returns the metadata describing the feed.
   * @returns A {@link FeedMetadata} object
   */
  public getMetadata(): FeedMetadata {
    return this.metadata;
  }

  /**
   * Serializes the feed to a string in the target format.
   * Must be implemented by subclasses.
   * @returns A string representation of the feed (e.g. XML or JSON)
   */
  public abstract render(): string;
}
