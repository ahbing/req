
export function assign(target, sources) {
  return Object.assign({}, target, sources);
}

export function toUpper(v) {
  return v.toUpperCase();
}
export function toLower(v) {
  return v.toLowerCase();
}

export function trim(str) {
  return str.replace(/^\s*|\s*$/, '');
}

export function isFunction(v) {
  return typeof v === 'function';
}

export function isObject(v) {
  return v !== null && typeof v === 'object';
}

export function isFormData(v) {
  return typeof FormData !== 'undefined' && v instanceof FormData;
}

export function isArray(v) {
  return Array.isArray(v);
}

export function isString(v) {
  return typeof v === 'string';
}

export function warn(str) {
  if (typeof console === 'object' && console.warn) {
    console.warn('[Req warn：]', str);
  }
}


export function each(list, callback) {
  if (isArray(list)) {
    list.forEach(callback);
  } else if (isObject(list)) {
    const keys = Object.keys(list);
    keys.forEach(key => {
      callback.call(null, list[key], key, list)
    });
  }
}
