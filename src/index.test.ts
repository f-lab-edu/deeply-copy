import { deeplyCopy } from './index';

describe('deeplyCopy', () => {
  test('primitive type을 복사한다. ', () => {
    expect(deeplyCopy(12)).toBe(12);
    expect(deeplyCopy('dummy')).toBe('dummy');
    expect(deeplyCopy(false)).toBe(false);
    expect(deeplyCopy(undefined)).toBe(undefined);
    expect(deeplyCopy(null)).toBeNull();
    expect(deeplyCopy(Symbol('foo'))).toBe('foo');
  });
  test('단일 레벨 객체를 복사한다.', () => {
    const obj = { a: 'foo', b: 'bar' };
    const copied = deeplyCopy(obj);
    expect(copied).toEqual(obj);
    expect(copied).not.toBe(obj);
  });
  test('단일 레벨 배열을 복사한다.', () => {
    const arr = [1, 2, 3];
    const copied = deeplyCopy(arr);
    expect(copied).toEqual(arr);
    expect(copied).not.toBe(arr);
  });
  test('중첩 객체를 내부까지 복사한다.', () => {
    const nestedObj = { a: { b: 'foo' }, c: { d: { e: 'bar' }, f: 'baz' } };
    const copied = deeplyCopy(nestedObj);
    expect(copied).toEqual(nestedObj);
    expect(copied).not.toBe(nestedObj);
  });
  test('중첩 배열을 내부까지 복사한다.', () => {
    const nestedArr = [[0], [[1], [2]], [[[3]]]];
    const copied = deeplyCopy(nestedArr);
    expect(copied).toEqual(nestedArr);
    expect(copied).not.toBe(nestedArr);
    expect(copied[1]).toEqual(nestedArr[1]);
    expect(copied[1]).not.toBe(nestedArr[1]);
    expect(copied[1][0]).toEqual(nestedArr[1][0]);
    expect(copied[1][0]).not.toBe(nestedArr[1][0]);
  });
  test('배열을 프로퍼티로 포함한 객체를 복사한다.', () => {
    const nestedObj = { a: [1, 2], c: { d: { e: [3] }, f: [4, 5] } };
    const copied = deeplyCopy(nestedObj);
    expect(copied).toEqual(nestedObj);
    expect(copied).not.toBe(nestedObj);
    expect(copied.a).toEqual(nestedObj.a);
    expect(copied.a).not.toBe(nestedObj.a);
    expect(copied.c.d.e).toEqual(nestedObj.c.d.e);
    expect(copied.c.d.e).not.toBe(nestedObj.c.d.e);
  });
  test('객체를 요소로 포함한 배열을 복사한다.', () => {
    const nestedArr = [{ a: 1 }, { b: 'foo' }, { c: ['bar', 'baz'] }];
    const copied = deeplyCopy(nestedArr);
    expect(copied).toEqual(nestedArr);
    expect(copied).not.toBe(nestedArr);
    expect(copied[0]).toEqual(nestedArr[0]);
    expect(copied[2]).not.toBe(nestedArr[2]);
  });
  test('사이클이 있는 객체를 복사한다.', () => {
    interface CircularObject {
      a?: CircularObject;
    }
    const obj: CircularObject = { a: undefined };
    obj.a = obj;
    const copied = deeplyCopy(obj);
    expect(copied).not.toBe(obj);
    expect(copied.a).toBe(copied);
  });
  test('사이클이 있는 배열을 복사한다.', () => {
    type CircularArray = CircularArray[];
    const arr: CircularArray = [];
    arr.push(arr);
    const copied = deeplyCopy(arr);
    expect(copied).toEqual(arr);
    expect(copied).not.toEqual(arr);
  });
  test('클래스 인스턴스를 복사한다.', () => {
    class Node {
      val: number;
      next: Node | null = null;

      constructor(val: number) {
        this.val = val;
      }
    }

    const node1 = new Node(1);
    const node2 = new Node(2);
    node1.next = node2;
    node2.next = node1;

    const copiedNode1 = deeplyCopy(node1);

    expect(copiedNode1).toEqual(node1);
    expect(copiedNode1).not.toBe(node1);
    expect(copiedNode1.next).toEqual(node2);
    expect(copiedNode1.next).not.toBe(node2);
    expect(copiedNode1.next.next).toBe(copiedNode1); // check circular reference
  });
});
