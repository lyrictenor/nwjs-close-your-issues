'use strict';

import githubSlug from '../../src/scripts/utils/githubSlug';
import assert from 'power-assert';

describe('githubSlug', () => {
  it('detects slug', () => {
    const repoUrl = 'https://github.com/lyrictenor/nwjs-close-your-issues';
    assert.equal(githubSlug(repoUrl), 'lyrictenor/nwjs-close-your-issues');
  });
});
