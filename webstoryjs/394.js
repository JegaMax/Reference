var r = n('./146');
function o(e, t) {
  if ('function' != typeof e || null != t && 'function' != typeof t)
    throw new TypeError('Expected a function');
  var n = function () {
    var r = arguments, o = t ? t.apply(this, r) : r[0], a = n.cache;
    if (a.has(o))
      return a.get(o);
    var i = e.apply(this, r);
    return n.cache = a.set(o, i) || a, i;
  };
  return n.cache = new (o.Cache || r)(), n;
}
o.Cache = r, e.exports = o;