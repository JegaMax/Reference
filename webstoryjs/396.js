var r = n('./71'), o = n('./198'), a = n('./25'), i = n('./102'), l = r ? r.prototype : void 0, s = l ? l.toString : void 0;
e.exports = function e(t) {
  if ('string' == typeof t)
    return t;
  if (a(t))
    return o(t, e) + '';
  if (i(t))
    return s ? s.call(t) : '';
  var n = t + '';
  return '0' == n && 1 / t == -Infinity ? '-0' : n;
};