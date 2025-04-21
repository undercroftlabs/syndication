import { JsonFeed } from '../../src';
import fs from 'node:fs';
import path from 'node:path';

describe('JSON Feed Rendering', () => {
  it('Should render a valid JSON feed', () => {
    const metadata = {
      title: 'Undercroft Labs',
      description: 'Tiny tools. Big ideas.',
      id: 'https://undercroftlabs.com/feed',
      url: 'https://undercroftlabs.com',
      language: 'en',
      author: 'Michael Goodwin',
      updated: '2025-04-20T21:57:39.581Z',
    };

    const items = [
      {
        id: 'you-are-not-a-data-point',
        title: 'You Are Not a Data Point',
        url: 'https://undercroftlabs.com/blog/posts/you-are-not-a-data-point',
        description: "Why Undercroft doesn't track you.",
        contentHtml: '<p>We value your privacy.</p>',
        author: 'Michael Goodwin',
        published: '2025-04-20T00:00:00Z',
      },
    ];

    const jsonFeed = new JsonFeed(metadata, items);

    const renderedFeed = jsonFeed.render();
    const expectedFeed = fs.readFileSync(
      path.join(__dirname, '__snapshots__', 'expected.json'),
      'utf8',
    );

    const actual = JSON.stringify(JSON.parse(renderedFeed));
    const expected = JSON.stringify(JSON.parse(expectedFeed));

    expect(actual).toBe(expected);
  });
});
