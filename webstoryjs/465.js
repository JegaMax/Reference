'use strict';
var r = n('./18'), o = n('./31'), a = n('./225'), i = n('./35'), l = n('./188'), s = n('./27'), c = n('./89'), u = n('./47'), f = n('./41'), d = n('./226'), p = n('./466'), h = n('./87'), g = n('./70'), m = n('./131').f, b = n('./36').f, v = n('./467'), y = n('./68'), C = n('./48'), w = C.get, x = C.set, E = 'ArrayBuffer', _ = 'DataView', O = 'Wrong index', S = r.ArrayBuffer, k = S, A = r.DataView, j = A && A.prototype, M = Object.prototype, I = r.RangeError, T = p.pack, P = p.unpack, D = function (e) {
    return [255 & e];
  }, R = function (e) {
    return [
      255 & e,
      e >> 8 & 255
    ];
  }, N = function (e) {
    return [
      255 & e,
      e >> 8 & 255,
      e >> 16 & 255,
      e >> 24 & 255
    ];
  }, z = function (e) {
    return e[3] << 24 | e[2] << 16 | e[1] << 8 | e[0];
  }, L = function (e) {
    return T(e, 23, 4);
  }, B = function (e) {
    return T(e, 52, 8);
  }, F = function (e, t) {
    b(e.prototype, t, {
      get: function () {
        return w(this)[t];
      }
    });
  }, H = function (e, t, n, r) {
    var o = d(n), a = w(e);
    if (o + t > a.byteLength)
      throw I(O);
    var i = w(a.buffer).bytes, l = o + a.byteOffset, s = i.slice(l, l + t);
    return r ? s : s.reverse();
  }, U = function (e, t, n, r, o, a) {
    var i = d(n), l = w(e);
    if (i + t > l.byteLength)
      throw I(O);
    for (var s = w(l.buffer).bytes, c = i + l.byteOffset, u = r(+o), f = 0; f < t; f++)
      s[c + f] = u[a ? f : t - f - 1];
  };
if (a) {
  if (!s(function () {
      S(1);
    }) || !s(function () {
      new S(-1);
    }) || s(function () {
      return new S(), new S(1.5), new S(NaN), S.name != E;
    })) {
    for (var W, V = (k = function ArrayBuffer(e) {
          return c(this, k), new S(d(e));
        }).prototype = S.prototype, K = m(S), q = 0; K.length > q;)
      (W = K[q++]) in k || i(k, W, S[W]);
    V.constructor = k;
  }
  g && h(j) !== M && g(j, M);
  var G = new A(new k(2)), Z = j.setInt8;
  G.setInt8(0, 2147483648), G.setInt8(1, 2147483649), !G.getInt8(0) && G.getInt8(1) || l(j, {
    setInt8: function (e, t) {
      Z.call(this, e, t << 24 >> 24);
    },
    setUint8: function (e, t) {
      Z.call(this, e, t << 24 >> 24);
    }
  }, { unsafe: !0 });
} else
  k = function ArrayBuffer(e) {
    c(this, k, E);
    var t = d(e);
    x(this, {
      bytes: v.call(new Array(t), 0),
      byteLength: t
    }), o || (this.byteLength = t);
  }, A = function DataView(e, t, n) {
    c(this, A, _), c(e, k, _);
    var r = w(e).byteLength, a = u(t);
    if (a < 0 || a > r)
      throw I('Wrong offset');
    if (a + (n = void 0 === n ? r - a : f(n)) > r)
      throw I('Wrong length');
    x(this, {
      buffer: e,
      byteLength: n,
      byteOffset: a
    }), o || (this.buffer = e, this.byteLength = n, this.byteOffset = a);
  }, o && (F(k, 'byteLength'), F(A, 'buffer'), F(A, 'byteLength'), F(A, 'byteOffset')), l(A.prototype, {
    getInt8: function (e) {
      return H(this, 1, e)[0] << 24 >> 24;
    },
    getUint8: function (e) {
      return H(this, 1, e)[0];
    },
    getInt16: function (e) {
      var t = H(this, 2, e, arguments.length > 1 ? arguments[1] : void 0);
      return (t[1] << 8 | t[0]) << 16 >> 16;
    },
    getUint16: function (e) {
      var t = H(this, 2, e, arguments.length > 1 ? arguments[1] : void 0);
      return t[1] << 8 | t[0];
    },
    getInt32: function (e) {
      return z(H(this, 4, e, arguments.length > 1 ? arguments[1] : void 0));
    },
    getUint32: function (e) {
      return z(H(this, 4, e, arguments.length > 1 ? arguments[1] : void 0)) >>> 0;
    },
    getFloat32: function (e) {
      return P(H(this, 4, e, arguments.length > 1 ? arguments[1] : void 0), 23);
    },
    getFloat64: function (e) {
      return P(H(this, 8, e, arguments.length > 1 ? arguments[1] : void 0), 52);
    },
    setInt8: function (e, t) {
      U(this, 1, e, D, t);
    },
    setUint8: function (e, t) {
      U(this, 1, e, D, t);
    },
    setInt16: function (e, t) {
      U(this, 2, e, R, t, arguments.length > 2 ? arguments[2] : void 0);
    },
    setUint16: function (e, t) {
      U(this, 2, e, R, t, arguments.length > 2 ? arguments[2] : void 0);
    },
    setInt32: function (e, t) {
      U(this, 4, e, N, t, arguments.length > 2 ? arguments[2] : void 0);
    },
    setUint32: function (e, t) {
      U(this, 4, e, N, t, arguments.length > 2 ? arguments[2] : void 0);
    },
    setFloat32: function (e, t) {
      U(this, 4, e, L, t, arguments.length > 2 ? arguments[2] : void 0);
    },
    setFloat64: function (e, t) {
      U(this, 8, e, B, t, arguments.length > 2 ? arguments[2] : void 0);
    }
  });
y(k, E), y(A, _), e.exports = {
  ArrayBuffer: k,
  DataView: A
};