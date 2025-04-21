import Feed from '../feed';
import serializeAtom from '../serializers/atom-serializer';

/**
 * Represents an Atom feed (RFC 4287).
 *
 * This class extends the abstract {@link Feed} base class and uses the Atom 1.0 specification
 * to serialize the feed contents. It supports standard Atom metadata and entry fields including:
 *
 * - `<title>`, `<subtitle>`, `<link>`, `<id>`, `<updated>`, `<author>`
 * - `<entry>` elements with title, content, author, published, updated, and summary fields
 */
export default class AtomFeed extends Feed {
  /**
   * Renders the Atom feed as a valid Atom 1.0 XML string.
   * @returns A complete Atom 1.0 feed in XML format
   */
  render(): string {
    return serializeAtom(this.metadata, this.items);
  }
}
