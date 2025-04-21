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

    const rssFeed = new RssFeed(metadata, []);
    const feedMetadata = rssFeed.getMetadata();
    expect(feedMetadata).toBe(metadata);
  });
});
