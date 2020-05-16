import { init, add, get, search } from './trie.ts';
import { assertEquals } from '../deps.ts';

Deno.test('init() should create rootNode with empty children and ignoreCasing set to true', () => {
  const root = init<number>();
  assertEquals(root.parent, undefined);
  assertEquals(root.value, undefined);
  assertEquals(root.children, {});
  assertEquals(root.ignoreCasing, true);
});

Deno.test('add() should add nodes to the correct trie structure', () => {
  const root = init<number>();
  add(root, 'foo', 1);
  add(root, 'foobar', 2);
  add(root, 'BAR', 3);
  assertEquals(root.children['f']?.children['o']?.children['o']?.value, 1);
  assertEquals(
    root.children['f']?.children['o']?.children['o']?.children['b']?.children['a']?.children['r']
      ?.value,
    2,
  );
  assertEquals(root.children['b']?.children['a']?.children['r']?.value, 3);
});

Deno.test('get() should retrieve correct nodes by key', () => {
  const root = init<number>();
  add(root, 'foo', 1);
  add(root, 'foobar', 2);
  add(root, 'bar', 3);
  const foo = get(root, 'foo');
  const foobar = get(root, 'foobar');
  const bar = get(root, 'bar');
  const BAR = get(root, 'BAR');
  const barfoo = get(root, 'barfoo');

  assertEquals(foo, 1);
  assertEquals(foobar, 2);
  assertEquals(bar, 3);
  assertEquals(BAR, 3);
  assertEquals(barfoo, undefined);
});

Deno.test('get() should retrieve correct nodes by keyword 1', () => {
  const root = init<number>();
  add(root, 'Hello World', 1);
  add(root, 'World Best', 2);
  add(root, 'Beer', 3);
  const hello = search(root, 'hello');
  const world = search(root, 'world');
  const lo = search(root, 'lo');
  const rl = search(root, 'rl');
  const lr = search(root, 'lr');
  const be = search(root, 'be');
  assertEquals(hello, [{ key: 'Hello World', value: 1 }]);
  assertEquals(world, [
    { key: 'World Best', value: 2 },
    { key: 'Hello World', value: 1 },
  ]);
  assertEquals(lo, [{ key: 'Hello World', value: 1 }]);
  assertEquals(rl, [
    { key: 'Hello World', value: 1 },
    { key: 'World Best', value: 2 },
  ]);
  assertEquals(lr, []);
  assertEquals(
    be,
    [
      { key: 'Beer', value: 3 },
      { key: 'World Best', value: 2 },
    ].sort(),
  );
});

Deno.test('search() should retrieve correct nodes by keyword 2', () => {
  const root = init<number>();
  add(root, 'Hello World', 1);
  add(root, 'Hello', 2);
  const hello = search(root, 'hello');
  assertEquals(hello, [
    { key: 'Hello', value: 2 },
    { key: 'Hello World', value: 1 },
  ]);
});

Deno.test('search() should retrieve correct nodes by keyword 2', () => {
  const root = init<number>({
    ignoreCasing: false,
  });
  add(root, 'Hello World', 1);
  add(root, 'World Best', 2);
  add(root, 'Beer', 3);
  const helloworld = get(root, 'hello world');
  const worldbest = get(root, 'world best');
  const hello = search(root, 'hello');
  const world = search(root, 'world');
  const be = search(root, 'be');
  assertEquals(helloworld, undefined);
  assertEquals(worldbest, undefined);
  assertEquals(hello, []);
  assertEquals(world, []);
  assertEquals(be, []);
});
