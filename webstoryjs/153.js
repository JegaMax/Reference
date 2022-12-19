'use strict';
var r, o = n('./225'), a = n('./31'), i = n('./18'), l = n('./37'), s = n('./24'), c = n('./92'), u = n('./35'), f = n('./49'), d = n('./36').f, p = n('./87'), h = n('./70'), g = n('./19'), m = n('./127'), b = i.Int8Array, v = b && b.prototype, y = i.Uint8ClampedArray, C = y && y.prototype, w = b && p(b), x = v && p(v), E = Object.prototype, _ = E.isPrototypeOf, O = g('toStringTag'), S = m('TYPED_ARRAY_TAG'), k = o && !!h && 'Opera' !== c(i.opera), A = !1, j = {
    Int8Array: 1,
    Uint8Array: 1,
    Uint8ClampedArray: 1,
    Int16Array: 2,
    Uint16Array: 2,
    Int32Array: 4,
    Uint32Array: 4,
    Float32Array: 4,
    Float64Array: 8
  }, M = function (e) {
    return l(e) && s(j, c(e));
  };
for (r in j)
  i[r] || (k = !1);
if ((!k || 'function' != typeof w || w === Function.prototype) && (w = function TypedArray() {
    throw TypeError('Incorrect invocation');
  }, k))
  for (r in j)
    i[r] && h(i[r], w);
if ((!k || !x || x === E) && (x = w.prototype, k))
  for (r in j)
    i[r] && h(i[r].prototype, x);
if (k && p(C) !== x && h(C, x), a && !s(x, O))
  for (r in (A = !0, d(x, O, {
      get: function () {
        return l(this) ? this[S] : void 0;
      }
    }), j))
    i[r] && u(i[r], S, r);
e.exports = {
  NATIVE_ARRAY_BUFFER_VIEWS: k,
  TYPED_ARRAY_TAG: A && S,
  aTypedArray: function (e) {
    if (M(e))
      return e;
    throw TypeError('Target is not a typed array');
  },
  aTypedArrayConstructor: function (e) {
    if (h) {
      if (_.call(w, e))
        return e;
    } else
      for (var t in j)
        if (s(j, r)) {
          var n = i[t];
          if (n && (e === n || _.call(n, e)))
            return e;
        }
    throw TypeError('Target is not a typed array constructor');
  },
  exportTypedArrayMethod: function (e, t, n) {
    if (a) {
      if (n)
        for (var r in j) {
          var o = i[r];
          o && s(o.prototype, e) && delete o.prototype[e];
        }
      x[e] && !n || f(x, e, n ? t : k && v[e] || t);
    }
  },
  exportTypedArrayStaticMethod: function (e, t, n) {
    var r, o;
    if (a) {
      if (h) {
        if (n)
          for (r in j)
            (o = i[r]) && s(o, e) && delete o[e];
        if (w[e] && !n)
          return;
        try {
          return f(w, e, n ? t : k && b[e] || t);
        } catch (e) {
        }
      }
      for (r in j)
        !(o = i[r]) || o[e] && !n || f(o, e, t);
    }
  },
  isView: function (e) {
    var t = c(e);
    return 'DataView' === t || s(j, t);
  },
  isTypedArray: M,
  TypedArray: w,
  TypedArrayPrototype: x
};