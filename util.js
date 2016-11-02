export function assign(target, sources) {
  return Object.assign({}, target, sources);
}

export function toUpper(v) {
  return v.toUpperCase();
}

export function isFunction(v) {
  return typeof v === 'function';
}

export function isObject(v) {
  return v !== null && typeof v === 'object';
} 

export function warn(str) {
  if (typeof console === 'object' && console.warn) {
    console.warn('[Req warn：]', str);
  }
}
