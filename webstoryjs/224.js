'use strict';
var r = n('./60'), o = n('./18'), a = n('./31'), i = n('./463'), l = n('./153'), s = n('./465'), c = n('./89'), u = n('./59'), f = n('./35'), d = n('./41'), p = n('./226'), h = n('./468'), g = n('./82'), m = n('./24'), b = n('./92'), v = n('./37'), y = n('./88'), C = n('./70'), w = n('./131').f, x = n('./470'), E = n('./471').forEach, _ = n('./474'), O = n('./36'), S = n('./129'), k = n('./48'), A = n('./475'), j = k.get, M = k.set, I = O.f, T = S.f, P = Math.round, D = o.RangeError, R = s.ArrayBuffer, N = s.DataView, z = l.NATIVE_ARRAY_BUFFER_VIEWS, L = l.TYPED_ARRAY_TAG, B = l.TypedArray, F = l.TypedArrayPrototype, H = l.aTypedArrayConstructor, U = l.isTypedArray, W = 'BYTES_PER_ELEMENT', V = 'Wrong length', K = function (e, t) {
    for (var n = 0, r = t.length, o = new (H(e))(r); r > n;)
      o[n] = t[n++];
    return o;
  }, q = function (e, t) {
    I(e, t, {
      get: function () {
        return j(this)[t];
      }
    });
  }, G = function (e) {
    var t;
    return e instanceof R || 'ArrayBuffer' == (t = b(e)) || 'SharedArrayBuffer' == t;
  }, Z = function (e, t) {
    return U(e) && 'symbol' != typeof t && t in e && String(+t) == String(t);
  }, Y = function (e, t) {
    return Z(e, t = g(t, !0)) ? u(2, e[t]) : T(e, t);
  }, Q = function (e, t, n) {
    return !(Z(e, t = g(t, !0)) && v(n) && m(n, 'value')) || m(n, 'get') || m(n, 'set') || n.configurable || m(n, 'writable') && !n.writable || m(n, 'enumerable') && !n.enumerable ? I(e, t, n) : (e[t] = n.value, e);
  };
a ? (z || (S.f = Y, O.f = Q, q(F, 'buffer'), q(F, 'byteOffset'), q(F, 'byteLength'), q(F, 'length')), r({
  target: 'Object',
  stat: !0,
  forced: !z
}, {
  getOwnPropertyDescriptor: Y,
  defineProperty: Q
}), e.exports = function (e, t, n) {
  var a = e.match(/\d+$/)[0] / 8, l = e + (n ? 'Clamped' : '') + 'Array', s = 'get' + e, u = 'set' + e, g = o[l], m = g, b = m && m.prototype, O = {}, S = function (e, t) {
      I(e, t, {
        get: function () {
          return function (e, t) {
            var n = j(e);
            return n.view[s](t * a + n.byteOffset, !0);
          }(this, t);
        },
        set: function (e) {
          return function (e, t, r) {
            var o = j(e);
            n && (r = (r = P(r)) < 0 ? 0 : r > 255 ? 255 : 255 & r), o.view[u](t * a + o.byteOffset, r, !0);
          }(this, t, e);
        },
        enumerable: !0
      });
    };
  z ? i && (m = t(function (e, t, n, r) {
    return c(e, m, l), A(v(t) ? G(t) ? void 0 !== r ? new g(t, h(n, a), r) : void 0 !== n ? new g(t, h(n, a)) : new g(t) : U(t) ? K(m, t) : x.call(m, t) : new g(p(t)), e, m);
  }), C && C(m, B), E(w(g), function (e) {
    e in m || f(m, e, g[e]);
  }), m.prototype = b) : (m = t(function (e, t, n, r) {
    c(e, m, l);
    var o, i, s, u = 0, f = 0;
    if (v(t)) {
      if (!G(t))
        return U(t) ? K(m, t) : x.call(m, t);
      o = t, f = h(n, a);
      var g = t.byteLength;
      if (void 0 === r) {
        if (g % a)
          throw D(V);
        if ((i = g - f) < 0)
          throw D(V);
      } else if ((i = d(r) * a) + f > g)
        throw D(V);
      s = i / a;
    } else
      s = p(t), o = new R(i = s * a);
    for (M(e, {
        buffer: o,
        byteOffset: f,
        byteLength: i,
        length: s,
        view: new N(o)
      }); u < s;)
      S(e, u++);
  }), C && C(m, B), b = m.prototype = y(F)), b.constructor !== m && f(b, 'constructor', m), L && f(b, L, l), O[l] = m, r({
    global: !0,
    forced: m != g,
    sham: !z
  }, O), W in m || f(m, W, a), W in b || f(b, W, a), _(l);
}) : e.exports = function () {
};