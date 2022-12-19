var r = n('./27'), o = /#|\.prototype\./, a = function (e, t) {
    var n = l[i(e)];
    return n == c || n != s && ('function' == typeof t ? r(t) : !!t);
  }, i = a.normalize = function (e) {
    return String(e).replace(o, '.').toLowerCase();
  }, l = a.data = {}, s = a.NATIVE = 'N', c = a.POLYFILL = 'P';
e.exports = a;