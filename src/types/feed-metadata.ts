/**
 * Represents metadata describing the overall feed, including identity,
 * author information, and branding.
 */
export default interface FeedMetadata {
  /**
   * The name of the feed (e.g. the blog or site title)
   */
  title: string;

  /**
   * A short summary or tagline describing the feed
   */
  description: string;

  /**
   * A unique identifier for the feed (typically a full feed URL)
   */
  id: string;

  /**
   * The canonical home page URL for the feed or site
   */
  url: string;

  /**
   * Language code for the feed content (e.g., `"en"`)
   */
  language?: string;

  /**
   * The name of the primary feed author or publisher
   */
  author?: string;

  /**
   * ISO 8601 timestamp representing the last modified time of the feed
   */
  updated?: string;

  /**
   * A URL to a logo image that visually represents the feed
   */
  logo?: string;

  /**
   * A URL to a favicon or smaller image for branding
   */
  favicon?: string;

  /**
   * A copyright notice for the feed content
   */
  copyright?: string;
}
