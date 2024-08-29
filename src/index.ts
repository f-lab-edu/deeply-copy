/**
 * 인자로 받은 객체(모든 데이터 타입 포함)를 깊은 복사를 해 불변 객체로 반환한다. 순환 참조를 처리한다.
 *
 * 참고: null check을 하는 이유는 자바스크립트 고유 버그로 인해 typeof null이 'object'이기 때문이다.
 * 관련 내용: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof#typeof_null
 *
 * @template P
 * @param {P} target - 복사를 하려는 타겟 객체.
 * @param {WeakMap<Object, Object>} [hash=new WeakMap()] - 순환 참조를 핸들링하기 위해 WeakMap이 사용되었다.
 * @returns {P} target을 깊은 복사로 생성한 불변 객체
 */
export function deeplyCopy<P>(target: P, hash = new WeakMap()): P {
  if (typeof target === 'object' && target !== null) {
    if (hash.has(target)) {
      return hash.get(target);
    }
    const obj: any = Array.isArray(target) ? [] : {};
    hash.set(target, obj);
    for (let prop in target) {
      obj[prop] = deeplyCopy(target[prop], hash);
    }
    return obj;
  } else {
    return target;
  }
}
