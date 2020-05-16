import 'mocha';
import { expect } from 'chai';

import { any } from '../../lib';

describe('Invocation', () => {
  it('should be able to be executed.', () => {
    return any([5]);
  });

  it ('should be able to be executed with a handler', () => {
    return any([1, 5, 0], (n) => n);
  });

  it ('should be able to be executed with a handler and config', () => {
    return any([1, 5, 0], (n) => n, { concurrency: Infinity });
  });

  it ('should be able to be executed with a null handler and config', () => {
    return any([1, 5, 0], null, {});
  });

  it ('should be able to be executed with config as a second argument', () => {
    return any([1, 5, 0], { concurrency: 2 });
  });
});
