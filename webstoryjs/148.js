var r = n('./25'), o = n('./102'), a = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, i = /^\w*$/;
e.exports = function (e, t) {
  if (r(e))
    return !1;
  var n = typeof e;
  return !('number' != n && 'symbol' != n && 'boolean' != n && null != e && !o(e)) || i.test(e) || !a.test(e) || null != t && e in Object(t);
};