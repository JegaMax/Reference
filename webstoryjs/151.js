e.exports = function (e) {
  if (!e.webpackPolyfill) {
    var t = Object.create(e);
    t.children || (t.children = []), Object.defineProperty(t, 'loaded', {
      enumerable: !0,
      get: function () {
        return t.l;
      }
    }), Object.defineProperty(t, 'id', {
      enumerable: !0,
      get: function () {
        return t.i;
      }
    }), Object.defineProperty(t, 'exports', { enumerable: !0 }), t.webpackPolyfill = 1;
  }
  return t;
};