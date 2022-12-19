var r = n('./51'), o = n('./144'), a = n('./38'), i = Function.prototype, l = Object.prototype, s = i.toString, c = l.hasOwnProperty, u = s.call(Object);
e.exports = function (e) {
  if (!a(e) || '[object Object]' != r(e))
    return !1;
  var t = o(e);
  if (null === t)
    return !0;
  var n = c.call(t, 'constructor') && t.constructor;
  return 'function' == typeof n && n instanceof n && s.call(n) == u;
};