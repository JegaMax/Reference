'use strict';
t.__esModule = !0, t.default = function (e, t) {
  if (e === t)
    return !0;
  if ('object' != typeof e || null === e || 'object' != typeof t || null === t)
    return !1;
  var n = Object.keys(e), r = Object.keys(t);
  if (n.length !== r.length)
    return !1;
  for (var o = Object.prototype.hasOwnProperty.bind(t), a = 0; a < n.length; a++)
    if (!o(n[a]) || e[n[a]] !== t[n[a]])
      return !1;
  return !0;
}, e.exports = t.default;