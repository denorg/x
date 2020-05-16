import 'mocha';
import { expect } from 'chai';

import { props } from '../../lib';

describe('Prop/Result matching', () => {
  it('should have aligned props with expected results', async () => {
    const results = await props(
      {
        a: 'A',
        b: 'B',
        c: 'C',
      },
      (letter, key) => {
        return letter + key;
      },
      { concurrency: 3 }
    );

    expect(results.a).to.not.be.undefined;
    expect(results.a).to.equal('Aa');
    expect(results.b).to.not.be.undefined;
    expect(results.b).to.equal('Bb');
    expect(results.c).to.not.be.undefined;
    expect(results.c).to.equal('Cc');
  });
});
