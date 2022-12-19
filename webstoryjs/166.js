var n = 1 / 0, r = 1.7976931348623157e+308, o = NaN, a = '[object Symbol]', i = /^\s+|\s+$/g, l = /^[-+]0x[0-9a-f]+$/i, s = /^0b[01]+$/i, c = /^0o[0-7]+$/i, u = parseInt, f = Object.prototype.toString;
function d(e, t) {
  var d;
  if ('function' != typeof t)
    throw new TypeError('Expected a function');
  return e = function (e) {
    var t = function (e) {
        if (!e)
          return 0 === e ? e : 0;
        if ((e = function (e) {
            if ('number' == typeof e)
              return e;
            if (function (e) {
                return 'symbol' == typeof e || function (e) {
                  return !!e && 'object' == typeof e;
                }(e) && f.call(e) == a;
              }(e))
              return o;
            if (p(e)) {
              var t = 'function' == typeof e.valueOf ? e.valueOf() : e;
              e = p(t) ? t + '' : t;
            }
            if ('string' != typeof e)
              return 0 === e ? e : +e;
            e = e.replace(i, '');
            var n = s.test(e);
            return n || c.test(e) ? u(e.slice(2), n ? 2 : 8) : l.test(e) ? o : +e;
          }(e)) === n || e === -1 / 0) {
          return (e < 0 ? -1 : 1) * r;
        }
        return e == e ? e : 0;
      }(e), d = t % 1;
    return t == t ? d ? t - d : t : 0;
  }(e), function () {
    return --e > 0 && (d = t.apply(this, arguments)), e <= 1 && (t = void 0), d;
  };
}
function p(e) {
  var t = typeof e;
  return !!e && ('object' == t || 'function' == t);
}
e.exports = function (e) {
  return d(2, e);
};