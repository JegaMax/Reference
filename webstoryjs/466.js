var n = 1 / 0, r = Math.abs, o = Math.pow, a = Math.floor, i = Math.log, l = Math.LN2;
e.exports = {
  pack: function (e, t, s) {
    var c, u, f, d = new Array(s), p = 8 * s - t - 1, h = (1 << p) - 1, g = h >> 1, m = 23 === t ? o(2, -24) - o(2, -77) : 0, b = e < 0 || 0 === e && 1 / e < 0 ? 1 : 0, v = 0;
    for ((e = r(e)) != e || e === n ? (u = e != e ? 1 : 0, c = h) : (c = a(i(e) / l), e * (f = o(2, -c)) < 1 && (c--, f *= 2), (e += c + g >= 1 ? m / f : m * o(2, 1 - g)) * f >= 2 && (c++, f /= 2), c + g >= h ? (u = 0, c = h) : c + g >= 1 ? (u = (e * f - 1) * o(2, t), c += g) : (u = e * o(2, g - 1) * o(2, t), c = 0)); t >= 8; d[v++] = 255 & u, u /= 256, t -= 8);
    for (c = c << t | u, p += t; p > 0; d[v++] = 255 & c, c /= 256, p -= 8);
    return d[--v] |= 128 * b, d;
  },
  unpack: function (e, t) {
    var r, a = e.length, i = 8 * a - t - 1, l = (1 << i) - 1, s = l >> 1, c = i - 7, u = a - 1, f = e[u--], d = 127 & f;
    for (f >>= 7; c > 0; d = 256 * d + e[u], u--, c -= 8);
    for (r = d & (1 << -c) - 1, d >>= -c, c += t; c > 0; r = 256 * r + e[u], u--, c -= 8);
    if (0 === d)
      d = 1 - s;
    else {
      if (d === l)
        return r ? NaN : f ? -1 / 0 : n;
      r += o(2, t), d -= s;
    }
    return (f ? -1 : 1) * r * o(2, d - t);
  }
};