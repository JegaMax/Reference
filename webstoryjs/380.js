var r = n('./71'), o = n('./202'), a = n('./73'), i = n('./201'), l = n('./381'), s = n('./382'), c = r ? r.prototype : void 0, u = c ? c.valueOf : void 0;
e.exports = function (e, t, n, r, c, f, d) {
  switch (n) {
  case '[object DataView]':
    if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
      return !1;
    e = e.buffer, t = t.buffer;
  case '[object ArrayBuffer]':
    return !(e.byteLength != t.byteLength || !f(new o(e), new o(t)));
  case '[object Boolean]':
  case '[object Date]':
  case '[object Number]':
    return a(+e, +t);
  case '[object Error]':
    return e.name == t.name && e.message == t.message;
  case '[object RegExp]':
  case '[object String]':
    return e == t + '';
  case '[object Map]':
    var p = l;
  case '[object Set]':
    var h = 1 & r;
    if (p || (p = s), e.size != t.size && !h)
      return !1;
    var g = d.get(e);
    if (g)
      return g == t;
    r |= 2, d.set(e, t);
    var m = i(p(e), p(t), r, c, f, d);
    return d.delete(e), m;
  case '[object Symbol]':
    if (u)
      return u.call(e) == u.call(t);
  }
  return !1;
};