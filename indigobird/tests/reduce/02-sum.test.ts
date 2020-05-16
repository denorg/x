import 'mocha';
import { expect } from 'chai';

import { reduce } from '../../lib';

describe('Invocation', () => {
  it('should correctly sum values in case with no concurrency and synchronous handlers', async () => {
    const arr = [1, 2, 3, 64, 32, 1, 1];
    const sum = await reduce(arr, (getSum, n) => {
      return getSum() + n;
    }, 0, { concurrency: 1 });
    expect(sum).to.equal(arr.reduce((total, n) => total + n, 0));
  });

  it('should correctly sum values in case with concurrency and synchronous handlers', async () => {
    const arr = [1, 2, 3, 6, 4, 2, 9, 1, 64];
    const sum = await reduce(arr, (getSum, n) => {
      return getSum() + n;
    }, 0, { concurrency: 6 });
    expect(sum).to.equal(arr.reduce((total, n) => total + n, 0));
  });

  it('should correctly sum values in case with no concurrency and asynchronous handlers', async () => {
    const arr = [1, 2, 3, 64, 32, 1, 1];
    const sum = await reduce(arr, (getSum, n) => {
      return new Promise((resolve) => setTimeout(() => resolve(getSum() + n), 0));
    }, 0, { concurrency: 1 });
    expect(sum).to.equal(arr.reduce((total, n) => total + n, 0));
  });

  it('should correctly sum values in case with concurrency and asynchronous handlers', async () => {
    const arr = [1, 2, 3, 6, 4, 2, 9, 1, 64];
    const sum = await reduce(arr, (getSum, n) => {
      return new Promise((resolve) => setTimeout(() => resolve(getSum() + n), 0));
    }, 0, { concurrency: 6 });
    expect(sum).to.equal(arr.reduce((total, n) => total + n, 0));
  });
});
