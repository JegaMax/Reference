var r = n('./18'), o = n('./35'), a = n('./24'), i = n('./125'), l = n('./172'), s = n('./48'), c = s.get, u = s.enforce, f = String(String).split('String');
(e.exports = function (e, t, n, l) {
  var s, c = !!l && !!l.unsafe, d = !!l && !!l.enumerable, p = !!l && !!l.noTargetGet;
  'function' == typeof n && ('string' != typeof t || a(n, 'name') || o(n, 'name', t), (s = u(n)).source || (s.source = f.join('string' == typeof t ? t : ''))), e !== r ? (c ? !p && e[t] && (d = !0) : delete e[t], d ? e[t] = n : o(e, t, n)) : d ? e[t] = n : i(t, n);
})(Function.prototype, 'toString', function () {
  return 'function' == typeof this && c(this).source || l(this);
});