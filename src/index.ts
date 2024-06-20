export function deeplyCopy(target: any): any {
  if (typeof target === "object" && target !== null) {
    const obj: any = Array.isArray(target) ? [] : {};
    for (let prop in target) {
      obj[prop] = deeplyCopy(target[prop]);
    }
    return obj;
  } else {
    return target;
  }
}
