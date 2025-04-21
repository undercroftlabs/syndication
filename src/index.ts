/**
 * A lightweight syndication toolkit for generating RSS, Atom, and JSON feeds.
 * This package provides format-specific feed classes (`RssFeed`, `AtomFeed`, `JsonFeed`)
 * that extend a shared `Feed` base class. Each format class allows you to define
 * metadata and entries, and render the feed to a valid XML or JSON string.
 *
 * ### Example:
 * ```ts
 * import { RssFeed } from '@undercroft/syndication';
 *
 * const feed = new RssFeed(metadata, items);
 * const xml = feed.render();
 * ```
 *
 * All exports are also available via the default object:
 * ```ts
 * import Syndication from '@undercroft/syndication';
 *
 * const feed = new Syndication.JsonFeed(metadata, items);
 * ```
 * @module
 */

import Feed from './feed';
import AtomFeed from './feed-types/atom-feed';
import JsonFeed from './feed-types/json-feed';
import RssFeed from './feed-types/rss-feed';

/**
 * Base abstract class used by all feed types (RSS, Atom, JSON).
 * Extend or use this if you're writing a custom feed serializer.
 */
export { Feed };

/**
 * RSS 2.0 feed generator.
 */
export { RssFeed };

/**
 * Atom 1.0 feed generator.
 */
export { AtomFeed };

/**
 * JSON Feed v1.1 generator.
 */
export { JsonFeed };

/**
 * Default export containing all feed types and base class.
 */
export default {
  Feed,
  RssFeed,
  AtomFeed,
  JsonFeed,
};
