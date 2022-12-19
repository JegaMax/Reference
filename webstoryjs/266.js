e.exports = function (e, t, n, r) {
  var o = n ? n.call(r, e, t) : void 0;
  if (void 0 !== o)
    return !!o;
  if (e === t)
    return !0;
  if ('object' != typeof e || !e || 'object' != typeof t || !t)
    return !1;
  var a = Object.keys(e), i = Object.keys(t);
  if (a.length !== i.length)
    return !1;
  for (var l = Object.prototype.hasOwnProperty.bind(t), s = 0; s < a.length; s++) {
    var c = a[s];
    if (!l(c))
      return !1;
    var u = e[c], f = t[c];
    if (!1 === (o = n ? n.call(r, u, f, c) : void 0) || void 0 === o && u !== f)
      return !1;
  }
  return !0;
};