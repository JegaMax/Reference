var r = n('./50'), o = n('./41'), a = n('./91'), i = n('./187'), l = n('./90'), s = n('./153').aTypedArrayConstructor;
e.exports = function (e) {
  var t, n, c, u, f, d, p = r(e), h = arguments.length, g = h > 1 ? arguments[1] : void 0, m = void 0 !== g, b = a(p);
  if (null != b && !i(b))
    for (d = (f = b.call(p)).next, p = []; !(u = d.call(f)).done;)
      p.push(u.value);
  for (m && h > 2 && (g = l(g, arguments[2], 2)), n = o(p.length), c = new (s(this))(n), t = 0; n > t; t++)
    c[t] = m ? g(p[t], t) : p[t];
  return c;
};