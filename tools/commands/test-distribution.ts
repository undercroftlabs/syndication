/* eslint-disable no-console,no-underscore/no-underscore */
import { Command } from '../types/command';
import { buildHeader } from '../core/header-builder';
import { requireDistExport } from '../require-dist-export';
import fs from 'node:fs';
import path from 'node:path';

export class TestDistribution implements Command {
  public readonly command = 'test:distribution';
  public readonly description = 'Validate The Built Package';

  public async handler(): Promise<number> {
    try {
      console.log(buildHeader('Running tests for the built package...', false));
      this.runTests();
      console.log('');
      console.log(buildHeader('All tests passed successfully.', false));
      return 0;
    } catch (e) {
      console.log(buildHeader(`Tests Failed ${e.message}`, true));
      return 1;
    }
  }

  private runTests() {
    const snapshotDir = path.resolve(__dirname, '../__snapshots__');
    // We must import from the built package. This is important to make
    // sure we are testing the distribution package.
    const JsonFeed =
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      requireDistExport<typeof import('../../dist/index.js').JsonFeed>(
        'JsonFeed',
      );

    const AtomFeed =
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      requireDistExport<typeof import('../../dist/index.js').AtomFeed>(
        'AtomFeed',
      );

    const RssFeed =
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      requireDistExport<typeof import('../../dist/index.js').RssFeed>(
        'RssFeed',
      );

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
    const atomFeed = new AtomFeed(metadata, items);
    const rssFeed = new RssFeed(metadata, items);

    let passed = true;

    const testCases = [
      {
        value: jsonFeed.render(),
        expected: fs.readFileSync(
          path.join(snapshotDir, 'expected.json'),
          'utf8',
        ),
        type: 'JSON Feed',
      },
      {
        value: atomFeed.render(),
        expected: fs.readFileSync(
          path.join(snapshotDir, 'expected.atom'),
          'utf8',
        ),
        type: 'ATOM Feed',
      },
      {
        value: rssFeed.render(),
        expected: fs.readFileSync(
          path.join(snapshotDir, 'expected.rss'),
          'utf8',
        ),
        type: 'RSS Feed',
      },
    ];

    for (const testCase of testCases) {
      if (testCase.type === 'JSON Feed') {
        const actual = JSON.parse(testCase.value);
        const expected = JSON.parse(testCase.expected);
        if (JSON.stringify(actual) !== JSON.stringify(expected)) {
          passed = false;
          console.log(`\x1b[41m\x1b[30mFAIL\x1b[0m - ${testCase.type}`);
          console.error(`Expected ${testCase.expected}, got ${testCase.value}`);
        } else {
          console.log(`\x1b[42m\x1b[30mPASS\x1b[0m - ${testCase.type}`);
        }
      }

      if (testCase.type === 'ATOM Feed' || testCase.type === 'RSS Feed') {
        const normalize = (str: string) =>
          str.trim().replace(/\r/g, '').replace(/\s+/g, ' ');

        const actual = normalize(testCase.value);
        const expected = normalize(testCase.expected);

        if (actual !== expected) {
          passed = false;
          console.log(`\x1b[41m\x1b[30mFAIL\x1b[0m - ${testCase.type}`);
          console.error(`Expected:\n${expected}\nGot:\n${actual}`);
        } else {
          console.log(`\x1b[42m\x1b[30mPASS\x1b[0m - ${testCase.type}`);
        }
      }
    }

    if (!passed) {
      throw new Error('Some tests failed');
    }
  }
}
