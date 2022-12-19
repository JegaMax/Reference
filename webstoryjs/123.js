var r = n('./47'), o = n('./81'), a = function (e) {
    return function (t, n) {
      var a, i, l = String(o(t)), s = r(n), c = l.length;
      return s < 0 || s >= c ? e ? '' : void 0 : (a = l.charCodeAt(s)) < 55296 || a > 56319 || s + 1 === c || (i = l.charCodeAt(s + 1)) < 56320 || i > 57343 ? e ? l.charAt(s) : a : e ? l.slice(s, s + 2) : i - 56320 + (a - 55296 << 10) + 65536;
    };
  };
e.exports = {
  codeAt: a(!1),
  charAt: a(!0)
};