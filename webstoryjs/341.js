var r = n('./51'), o = n('./139'), a = n('./38'), i = {};
i['[object Float32Array]'] = i['[object Float64Array]'] = i['[object Int8Array]'] = i['[object Int16Array]'] = i['[object Int32Array]'] = i['[object Uint8Array]'] = i['[object Uint8ClampedArray]'] = i['[object Uint16Array]'] = i['[object Uint32Array]'] = !0, i['[object Arguments]'] = i['[object Array]'] = i['[object ArrayBuffer]'] = i['[object Boolean]'] = i['[object DataView]'] = i['[object Date]'] = i['[object Error]'] = i['[object Function]'] = i['[object Map]'] = i['[object Number]'] = i['[object Object]'] = i['[object RegExp]'] = i['[object Set]'] = i['[object String]'] = i['[object WeakMap]'] = !1, e.exports = function (e) {
  return a(e) && o(e.length) && !!i[r(e)];
};