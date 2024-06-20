export function deeplyCopy<P>(target: P, hash = new WeakMap()): P {
  if (typeof target === "object" && target !== null) {
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
