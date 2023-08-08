import { describe, expect, it } from '@jest/globals';
import { stringify } from 'qs';
import { extractURLParams } from '@/lib/extractURLParams';

describe('extractURLParams', () => {
  it('url', () => {
    const str = stringify({
      a: 1,
      b: stringify({
        c: 2,
        d: stringify({
          e: 3,
        }),
      }),
    });
    expect(str).toBe('a=1&b=c%3D2%26d%3De%253D3');
    const params = extractURLParams(str, {
      recursiveKeys: ['b', 'd'],
      favoriteKeys: ['e', 'c'],
    });
    expect(params).toEqual({
      a: '1',
      b: 'c=2&d=e%3D3',
      c: '2',
      d: 'e=3',
      e: '3',
    });
    expect(Object.keys(params)).toEqual(['e', 'c', 'a', 'b', 'd']);
  });
});
