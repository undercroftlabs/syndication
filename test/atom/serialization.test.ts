import { AtomFeed } from '../../src';
import fs from 'node:fs';
import path from 'node:path';
import { JSDOM } from 'jsdom';

describe('Atom Feed Serialization', () => {
  it('Should serialize without an author', () => {
    const metadata = {
      title: 'Undercroft Labs',
      description: 'Tiny tools. Big ideas.',
      id: 'https://undercroftlabs.com/feed',
      url: 'https://undercroftlabs.com',
      language: 'en',
      updated: '2025-04-20T21:57:39.581Z',
    };

    const items = [
      {
        id: 'you-are-not-a-data-point',
        title: 'You Are Not a Data Point',
        url: 'https://undercroftlabs.com/blog/posts/you-are-not-a-data-point',
        description: "Why Undercroft doesn't track you.",
        contentHtml: '<p>We value your privacy.</p>',
        published: '2025-04-20T00:00:00Z',
      },
    ];

    const atomFeed = new AtomFeed(metadata, items);

    const renderedFeed = atomFeed.render();
    const expectedFeed = fs.readFileSync(
      path.join(__dirname, '__snapshots__', 'expected-no-author.atom'),
      'utf8',
    );

    const normalize = (str: string) =>
      str.trim().replace(/\r/g, '').replace(/\s+/g, ' ');

    const actual = normalize(renderedFeed);
    const expected = normalize(expectedFeed);

    expect(actual).toBe(expected);
  });

  it('Should serialize without an html content', () => {
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
        author: 'Michael Goodwin',
        published: '2025-04-20T00:00:00Z',
      },
    ];

    const atomFeed = new AtomFeed(metadata, items);

    const renderedFeed = atomFeed.render();
    const expectedFeed = fs.readFileSync(
      path.join(__dirname, '__snapshots__', 'expected-no-html-content.atom'),
      'utf8',
    );

    const normalize = (str: string) =>
      str.trim().replace(/\r/g, '').replace(/\s+/g, ' ');

    const actual = normalize(renderedFeed);
    const expected = normalize(expectedFeed);

    expect(actual).toBe(expected);
  });

  it('Should serialize without a description', () => {
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
        contentHtml: '<p>We value your privacy.</p>',
        author: 'Michael Goodwin',
        published: '2025-04-20T00:00:00Z',
      },
    ];

    const atomFeed = new AtomFeed(metadata, items);

    const renderedFeed = atomFeed.render();
    const expectedFeed = fs.readFileSync(
      path.join(__dirname, '__snapshots__', 'expected-no-description.atom'),
      'utf8',
    );

    const normalize = (str: string) =>
      str.trim().replace(/\r/g, '').replace(/\s+/g, ' ');

    const actual = normalize(renderedFeed);
    const expected = normalize(expectedFeed);

    expect(actual).toBe(expected);
  });

  it('Should serialize without an update date', () => {
    const metadata = {
      title: 'Undercroft Labs',
      description: 'Tiny tools. Big ideas.',
      id: 'https://undercroftlabs.com/feed',
      url: 'https://undercroftlabs.com',
      language: 'en',
      author: 'Michael Goodwin',
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

    const atomFeed = new AtomFeed(metadata, items);
    const renderedFeed = atomFeed.render();
    const dom = new JSDOM(renderedFeed, { contentType: 'application/xml' });
    const updatedTag = dom.window.document.querySelector('feed > updated');

    expect(updatedTag).toBeTruthy();
    expect(() => new Date(updatedTag!.textContent!).toISOString()).not.toThrow();

  });
});
