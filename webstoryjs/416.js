var r = n('./150'), o = n('./417'), a = n('./418'), i = n('./419'), l = n('./218');
e.exports = function (e, t, n) {
  var s = e.constructor;
  switch (t) {
  case '[object ArrayBuffer]':
    return r(e);
  case '[object Boolean]':
  case '[object Date]':
    return new s(+e);
  case '[object DataView]':
    return o(e, n);
  case '[object Float32Array]':
  case '[object Float64Array]':
  case '[object Int8Array]':
  case '[object Int16Array]':
  case '[object Int32Array]':
  case '[object Uint8Array]':
  case '[object Uint8ClampedArray]':
  case '[object Uint16Array]':
  case '[object Uint32Array]':
    return l(e, n);
  case '[object Map]':
    return new s();
  case '[object Number]':
  case '[object String]':
    return new s(e);
  case '[object RegExp]':
    return a(e);
  case '[object Set]':
    return new s();
  case '[object Symbol]':
    return i(e);
  }
};