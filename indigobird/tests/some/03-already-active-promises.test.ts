import 'mocha';
import { expect } from 'chai';

import { some } from '../../lib';

describe('Active promises', () => {
  it('should still await active promises.', async () => {
    let resolved = 0;
    const results = await some(
      [
        new Promise((resolve) =>
          setTimeout(() => {
            resolved++;
            resolve();
          }, 15)
        ),
        new Promise((resolve) =>
          setTimeout(() => {
            resolved++;
            resolve();
          }, 30)
        ),
        new Promise((resolve) =>
          setTimeout(() => {
            resolved++;
            resolve();
          }, 30)
        ),
        new Promise((resolve) =>
          setTimeout(() => {
            resolved++;
            resolve();
          }, 45)
        ),
      ],
      undefined,
      { amount: 2 }
    );

    expect(resolved).to.equal(2);
  });


  it('should still await active promises without passing a handler or placeholder', async () => {
    let resolved = 0;
    const results = await some(
      [
        new Promise((resolve) =>
          setTimeout(() => {
            resolved++;
            resolve();
          }, 15)
        ),
        new Promise((resolve) =>
          setTimeout(() => {
            resolved++;
            resolve();
          }, 30)
        ),
        new Promise((resolve) =>
          setTimeout(() => {
            resolved++;
            resolve();
          }, 30)
        ),
        new Promise((resolve) =>
          setTimeout(() => {
            resolved++;
            resolve();
          }, 45)
        ),
      ],
      { amount: 2 }
    );

    expect(resolved).to.equal(2);
  });
});
