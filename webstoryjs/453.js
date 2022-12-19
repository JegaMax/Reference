var r = n('./28'), o = n('./102'), a = /^\s+|\s+$/g, i = /^[-+]0x[0-9a-f]+$/i, l = /^0b[01]+$/i, s = /^0o[0-7]+$/i, c = parseInt;
e.exports = function (e) {
  if ('number' == typeof e)
    return e;
  if (o(e))
    return NaN;
  if (r(e)) {
    var t = 'function' == typeof e.valueOf ? e.valueOf() : e;
    e = r(t) ? t + '' : t;
  }
  if ('string' != typeof e)
    return 0 === e ? e : +e;
  e = e.replace(a, '');
  var n = l.test(e);
  return n || s.test(e) ? c(e.slice(2), n ? 2 : 8) : i.test(e) ? NaN : +e;
};