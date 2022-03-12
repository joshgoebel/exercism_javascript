import { hello } from './hello-world';

describe('Hello World', () => {
  test('Say Hi!', () => {
    expect(true).toEqual(true);
  });
  test('Say Hi!', () => {
    expect(hello()).toEqual('Hello, World!');
  });
});
