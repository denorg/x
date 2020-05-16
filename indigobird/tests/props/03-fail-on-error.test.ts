import 'mocha';
import { expect } from 'chai';

import { props } from '../../lib';

describe('Failure condition', () => {
  it('should fail if there is a single error and pass through the first error.', async () => {
    let failed = false;
    const firstErr = new Error('Hi');
    await props(
      {
        a: 'A',
        b: 'B',
        c: 'C',
      },
      (letter, key) => {
        if (key === 'a') throw firstErr;
      },
      { concurrency: 3 }
    ).catch((err) => {
      failed = true;
      expect(err).to.equal(firstErr);
    });

    expect(failed).to.be.true;
  });
});
