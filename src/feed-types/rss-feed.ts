import Feed from '../feed';
import serializeRss from '../serializers/rss-serializer';

/**
 * Represents an RSS feed (version 2.0).
 *
 * This class extends the abstract {@link Feed} base class and serializes the feed
 * using the [RSS 2.0 format](https://validator.w3.org/feed/docs/rss2.html), a widely supported
 * format for syndicating blog posts, podcasts, and news updates.
 *
 * The rendered output includes a `<channel>` element with metadata such as `title`, `link`,
 * and `description`, and a list of `<item>` entries for each feed item.
 */
export default class RssFeed extends Feed {
  /**
   * Renders the feed as a valid RSS 2.0 XML string.
   * @returns An RSS feed in XML format conforming to the RSS 2.0 specification
   */
  render(): string {
    return serializeRss(this.metadata, this.items);
  }
}
