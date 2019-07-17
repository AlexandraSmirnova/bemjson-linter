import { lint } from '.';

test('should parse json and return array', () => {
    const json = JSON.stringify({ block: "someBlock"});
    expect(lint(json)).toEqual([]);
});