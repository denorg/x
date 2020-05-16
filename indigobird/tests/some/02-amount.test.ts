import 'mocha';
import { expect } from 'chai';

import { some } from '../../lib';

describe('Standard case: Amount', () => {
  it('should be able to be executed with a practical case.', async () => {
    const items = [5, 3, 1];
    const amount = 2;
    let handled = 0;

    await some(
      items,
      (item) => {
        handled++;
      },
      { amount, concurrency: 1 }
    );

    expect(handled).to.equal(amount);
  });

  it('should not have issue resolving in case where concurrency exceeds amount.', async () => {
    const items = [5, 3, 1];
    const amount = 2;
    const concurrency = 3;
    let handled = 0;

    const results = await some(
      items,
      (item) => {
        handled++;
        return item;
      },
      { amount, concurrency }
    );

    const resolved = results.reduce((total, result) => total + (result ? 1 : 0), 0);

    expect(resolved).to.equal(amount);
    expect(handled).to.equal(items.length);
  });

  it('should still succeed if errors are not sufficient to qualify as a fail', async () => {
    const items = [5, 3, 1, 8];
    const amount = 2;
    const amountToError = items.length - amount;
    const concurrency = 4;
    let handled = 0;
    let errored = 0;

    const results = await some(
      items,
      (item, i) => {
        handled++;
        if (i > amount - 1) {
          errored++;
          throw new Error('Hi.');
        }

        return new Promise((resolve) =>
          setTimeout(() => {
            expect(errored).to.equal(amountToError); // Errors should have already occurred.
            resolve(item);
          }, 15)
        );
      },
      { amount, concurrency }
    );

    const resolved = results.reduce((total: number, result) => total + (result ? 1 : 0), 0);

    expect(resolved).to.equal(amount);
    expect(errored).to.equal(amountToError);
    expect(handled).to.equal(items.length);
  });

  it('should fail if errors are sufficient to qualify as a fail', async () => {
    const items = [5, 3, 1, 8];
    const amount = 2;
    const amountToError = items.length - amount;
    const concurrency = 4;
    let handled = 0;
    let errored = 0;
    let failed = false;
    let resolved = 0;

    // We fail because we needed 2 to succed, but 3 fail, leaving only 1 possible success.
    await some(
      items,
      (item, i) => {
        handled++;
        // Will produce amountToError + 1 amount of errors. i.e. too many
        if (i > 0) {
          errored++;
          throw new Error('Hi.');
        }

        return new Promise((resolve) =>
          setTimeout(() => {
            resolved++;
            resolve(item);
          }, 15)
        );
      },
      { amount, concurrency }
    ).catch((err) => {
      failed = true;
      // Even though 1 WOULD have resolved, because it's 15ms delayed by timeout, and all the errors are instant
      // the error should have cause failure the moment it was no longer possible to succeed.
      expect(resolved).to.equal(0);
      expect(errored).to.equal(amountToError + 1);
      expect(handled).to.equal(items.length);
    });

    expect(failed).to.be.true;
  });
});
