# @undercroft/syndication

A lightweight, zero-dependency TypeScript library for generating RSS 2.0, Atom 1.0, and JSON Feed 1.1 syndication feeds.

Built for projects that prioritize clarity, maintainability, and privacy-conscious tooling. Whether you’re building a blog, newsletter, or publishing platform, this library helps you publish well-formed feeds without bloat.

---

## ✨ Features

- ✅ Supports RSS 2.0, Atom 1.0, and JSON Feed 1.1
- ✅ Fully typed with TypeScript
- ✅ Framework agnostic (Node.js, browser, static)
- ✅ Small footprint with zero runtime dependencies
- ✅ Works with `import`, `require`, and browser `<script>` tags

---

## UMD Support

A UMD build is included in the `dist/` folder and exposes the global `Syndication` object when used in the browser.

```html
<script src="https://cdn.jsdelivr.net/npm/@undercroft/syndication/dist/index.umd.js"></script>
<script>
  const feed = new Syndication.JsonFeed({ title: "My Feed", ... }, []);
  console.log(feed.render());
</script>
```

## CDNs

jsDelivr: https://cdn.jsdelivr.net/npm/@undercroft/syndication/dist/index.umd.js
unpkg: https://unpkg.com/@undercroft/syndication/dist/index.umd.js
Skypack: https://cdn.skypack.dev/@undercroft/syndication
esm.sh: https://esm.sh/@undercroft/syndication
jspm: https://jspm.dev/@undercroft/syndication
esm.run: https://esm.run/@undercroft/syndication

#  Distribution & Compatibility

Works in Node.js, modern browsers, and bundlers

# Test Coverage & CI

Full unit test coverage with Jest
Automatically tested on Ubuntu and Windows
Bundle size tracked via Size Limit
Code coverage reported via Codecov

# Installation

```bash
npm install @undercroft/syndication
```

## Usage in NodeJS

```ts
import { RssFeed } from '@undercroft/syndication';

const metadata = {
  title: 'Undercroft Labs',
  description: 'Tiny tools. Big ideas.',
  url: 'https://undercroftlabs.com',
  id: 'https://undercroftlabs.com/feed',
  author: 'Michael Goodwin',
};

const items = [
  {
    id: 'welcome',
    title: 'Welcome to Undercroft',
    url: 'https://undercroftlabs.com/posts/welcome',
    description: 'The first post.',
    published: '2025-04-20T00:00:00Z',
  },
];

const feed = new RssFeed(metadata, items);
const xml = feed.render();
console.log(xml);
```

## Usage in Browser

```html
<script src="https://cdn.jsdelivr.net/npm/@undercroft/syndication/dist/index.umd.js"></script>
<script>
  const feed = new Syndication.JsonFeed({
    title: 'Undercroft Labs',
    id: 'https://undercroftlabs.com/feed',
    url: 'https://undercroftlabs.com',
    description: 'Tiny tools. Big ideas.',
    author: 'Michael Goodwin',
  }, [{
    id: 'welcome',
    title: 'Welcome to Undercroft',
    url: 'https://undercroftlabs.com/posts/welcome',
    description: 'The first post.',
    published: '2025-04-20T00:00:00Z',
  }]);

  console.log(feed.render());
</script>
```

# Creating Feeds

You can create and render feeds using any of the following classes:

```ts
new RssFeed(metadata, items)  // returns RSS 2.0 XML
new AtomFeed(metadata, items) // returns Atom 1.0 XML
new JsonFeed(metadata, items) // returns JSON Feed v1.1
```

Each feed exposes the method:

```ts
feed.render(): string
```
You can also dynamically add items:

```ts
feed.addItem({
  id: 'post-2',
  title: 'Another Post',
  url: 'https://site.com/posts/2',
  published: '2025-04-21T00:00:00Z'
});
```

## Contributing

Contributions to the syndication project is welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request on the GitHub repository.

## License

This project is licensed under the MIT License. See the LICENSE file for more information.
