var r = n('./27'), o = n('./19'), a = n('./83'), i = o('iterator');
e.exports = !r(function () {
  var e = new URL('b?a=1&b=2&c=3', 'http://a'), t = e.searchParams, n = '';
  return e.pathname = 'c%20d', t.forEach(function (e, r) {
    t.delete('b'), n += r + e;
  }), a && !e.toJSON || !t.sort || 'http://a/c%20d?a=1&c=3' !== e.href || '3' !== t.get('c') || 'a=1' !== String(new URLSearchParams('?a=1')) || !t[i] || 'a' !== new URL('https://a@b').username || 'b' !== new URLSearchParams(new URLSearchParams('a=b')).get('a') || 'xn--e1aybc' !== new URL('http://тест').host || '#%D0%B1' !== new URL('http://a#б').hash || 'a1c3' !== n || 'x' !== new URL('http://x', void 0).host;
});