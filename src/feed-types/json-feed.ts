import Feed from '../feed';
import serializeJsonFeed from '../serializers/json-serializer';

/**
 * Represents a JSON Feed (version 1.1).
 *
 * This class extends the abstract {@link Feed} base class and renders feed data
 * using the [JSON Feed format](https://jsonfeed.org/version/1.1), a modern alternative
 * to RSS and Atom that is designed to be readable by both humans and machines.
 *
 * The rendered output includes top-level metadata such as `title`, `home_page_url`,
 * `feed_url`, `description`, and an array of feed items containing content and publishing details.
 */
export default class JsonFeed extends Feed {
  /**
   * Renders the feed as a valid JSON Feed v1.1 string.
   * @returns A JSON string conforming to the JSON Feed v1.1 specification
   */
  render(): string {
    return serializeJsonFeed(this.metadata, this.items);
  }
}
