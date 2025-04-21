import { RssFeed } from '../../src';

describe('RSS Feed Item Adding', () => {
  it('Should add the new item', () => {
    const metadata = {
      title: 'Undercroft Labs',
      description: 'Tiny tools. Big ideas.',
      id: 'https://undercroftlabs.com/feed',
      url: 'https://undercroftlabs.com',
      language: 'en',
      author: 'Michael Goodwin',
      updated: '2025-04-20T21:57:39.581Z',
    };

    const item = {
      id: 'you-are-not-a-data-point',
      title: 'You Are Not a Data Point',
      url: 'https://undercroftlabs.com/blog/posts/you-are-not-a-data-point',
      description: "Why Undercroft doesn't track you.",
      contentHtml: '<p>We value your privacy.</p>',
      author: 'Michael Goodwin',
      published: '2025-04-20T00:00:00Z',
    };

    const rssFeed = new RssFeed(metadata, []);
    const beforeCount = rssFeed.getItems().length;
    rssFeed.addItem(item);
    const afterCount = rssFeed.getItems().length;

    expect(beforeCount).toBe(0);
    expect(afterCount).toBe(1);
  });
});
