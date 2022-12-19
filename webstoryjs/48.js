var r, o, a, i = n('./293'), l = n('./18'), s = n('./37'), c = n('./35'), u = n('./24'), f = n('./124'), d = n('./126'), p = n('./128'), h = l.WeakMap;
if (i) {
  var g = f.state || (f.state = new h()), m = g.get, b = g.has, v = g.set;
  r = function (e, t) {
    return t.facade = e, v.call(g, e, t), t;
  }, o = function (e) {
    return m.call(g, e) || {};
  }, a = function (e) {
    return b.call(g, e);
  };
} else {
  var y = d('state');
  p[y] = !0, r = function (e, t) {
    return t.facade = e, c(e, y, t), t;
  }, o = function (e) {
    return u(e, y) ? e[y] : {};
  }, a = function (e) {
    return u(e, y);
  };
}
e.exports = {
  set: r,
  get: o,
  has: a,
  enforce: function (e) {
    return a(e) ? o(e) : r(e, {});
  },
  getterFor: function (e) {
    return function (t) {
      var n;
      if (!s(t) || (n = o(t)).type !== e)
        throw TypeError('Incompatible receiver, ' + e + ' required');
      return n;
    };
  }
};