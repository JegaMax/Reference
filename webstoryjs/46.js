'use strict';
n('./292');
var r, o = n('./60'), a = n('./31'), i = n('./186'), l = n('./18'), s = n('./184'), c = n('./49'), u = n('./89'), f = n('./24'), d = n('./303'), p = n('./304'), h = n('./123').codeAt, g = n('./310'), m = n('./68'), b = n('./311'), v = n('./48'), y = l.URL, C = b.URLSearchParams, w = b.getState, x = v.set, E = v.getterFor('URL'), _ = Math.floor, O = Math.pow, S = 'Invalid scheme', k = 'Invalid host', A = 'Invalid port', j = /[A-Za-z]/, M = /[\d+-.A-Za-z]/, I = /\d/, T = /^(0x|0X)/, P = /^[0-7]+$/, D = /^\d+$/, R = /^[\dA-Fa-f]+$/, N = /[\u0000\u0009\u000A\u000D #%/:?@[\\]]/, z = /[\u0000\u0009\u000A\u000D #/:?@[\\]]/, L = /^[\u0000-\u001F ]+|[\u0000-\u001F ]+$/g, B = /[\u0009\u000A\u000D]/g, F = function (e, t) {
    var n, r, o;
    if ('[' == t.charAt(0)) {
      if (']' != t.charAt(t.length - 1))
        return k;
      if (!(n = U(t.slice(1, -1))))
        return k;
      e.host = n;
    } else if (Q(e)) {
      if (t = g(t), N.test(t))
        return k;
      if (null === (n = H(t)))
        return k;
      e.host = n;
    } else {
      if (z.test(t))
        return k;
      for (n = '', r = p(t), o = 0; o < r.length; o++)
        n += Z(r[o], V);
      e.host = n;
    }
  }, H = function (e) {
    var t, n, r, o, a, i, l, s = e.split('.');
    if (s.length && '' == s[s.length - 1] && s.pop(), (t = s.length) > 4)
      return e;
    for (n = [], r = 0; r < t; r++) {
      if ('' == (o = s[r]))
        return e;
      if (a = 10, o.length > 1 && '0' == o.charAt(0) && (a = T.test(o) ? 16 : 8, o = o.slice(8 == a ? 1 : 2)), '' === o)
        i = 0;
      else {
        if (!(10 == a ? D : 8 == a ? P : R).test(o))
          return e;
        i = parseInt(o, a);
      }
      n.push(i);
    }
    for (r = 0; r < t; r++)
      if (i = n[r], r == t - 1) {
        if (i >= O(256, 5 - t))
          return null;
      } else if (i > 255)
        return null;
    for (l = n.pop(), r = 0; r < n.length; r++)
      l += n[r] * O(256, 3 - r);
    return l;
  }, U = function (e) {
    var t, n, r, o, a, i, l, s = [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ], c = 0, u = null, f = 0, d = function () {
        return e.charAt(f);
      };
    if (':' == d()) {
      if (':' != e.charAt(1))
        return;
      f += 2, u = ++c;
    }
    for (; d();) {
      if (8 == c)
        return;
      if (':' != d()) {
        for (t = n = 0; n < 4 && R.test(d());)
          t = 16 * t + parseInt(d(), 16), f++, n++;
        if ('.' == d()) {
          if (0 == n)
            return;
          if (f -= n, c > 6)
            return;
          for (r = 0; d();) {
            if (o = null, r > 0) {
              if (!('.' == d() && r < 4))
                return;
              f++;
            }
            if (!I.test(d()))
              return;
            for (; I.test(d());) {
              if (a = parseInt(d(), 10), null === o)
                o = a;
              else {
                if (0 == o)
                  return;
                o = 10 * o + a;
              }
              if (o > 255)
                return;
              f++;
            }
            s[c] = 256 * s[c] + o, 2 != ++r && 4 != r || c++;
          }
          if (4 != r)
            return;
          break;
        }
        if (':' == d()) {
          if (f++, !d())
            return;
        } else if (d())
          return;
        s[c++] = t;
      } else {
        if (null !== u)
          return;
        f++, u = ++c;
      }
    }
    if (null !== u)
      for (i = c - u, c = 7; 0 != c && i > 0;)
        l = s[c], s[c--] = s[u + i - 1], s[u + --i] = l;
    else if (8 != c)
      return;
    return s;
  }, W = function (e) {
    var t, n, r, o;
    if ('number' == typeof e) {
      for (t = [], n = 0; n < 4; n++)
        t.unshift(e % 256), e = _(e / 256);
      return t.join('.');
    }
    if ('object' == typeof e) {
      for (t = '', r = function (e) {
          for (var t = null, n = 1, r = null, o = 0, a = 0; a < 8; a++)
            0 !== e[a] ? (o > n && (t = r, n = o), r = null, o = 0) : (null === r && (r = a), ++o);
          return o > n && (t = r, n = o), t;
        }(e), n = 0; n < 8; n++)
        o && 0 === e[n] || (o && (o = !1), r === n ? (t += n ? ':' : '::', o = !0) : (t += e[n].toString(16), n < 7 && (t += ':')));
      return '[' + t + ']';
    }
    return e;
  }, V = {}, K = d({}, V, {
    ' ': 1,
    '"': 1,
    '<': 1,
    '>': 1,
    '`': 1
  }), q = d({}, K, {
    '#': 1,
    '?': 1,
    '{': 1,
    '}': 1
  }), G = d({}, q, {
    '/': 1,
    ':': 1,
    ';': 1,
    '=': 1,
    '@': 1,
    '[': 1,
    '\\': 1,
    ']': 1,
    '^': 1,
    '|': 1
  }), Z = function (e, t) {
    var n = h(e, 0);
    return n > 32 && n < 127 && !f(t, e) ? e : encodeURIComponent(e);
  }, Y = {
    ftp: 21,
    file: null,
    http: 80,
    https: 443,
    ws: 80,
    wss: 443
  }, Q = function (e) {
    return f(Y, e.scheme);
  }, $ = function (e) {
    return '' != e.username || '' != e.password;
  }, X = function (e) {
    return !e.host || e.cannotBeABaseURL || 'file' == e.scheme;
  }, J = function (e, t) {
    var n;
    return 2 == e.length && j.test(e.charAt(0)) && (':' == (n = e.charAt(1)) || !t && '|' == n);
  }, ee = function (e) {
    var t;
    return e.length > 1 && J(e.slice(0, 2)) && (2 == e.length || '/' === (t = e.charAt(2)) || '\\' === t || '?' === t || '#' === t);
  }, te = function (e) {
    var t = e.path, n = t.length;
    !n || 'file' == e.scheme && 1 == n && J(t[0], !0) || t.pop();
  }, ne = function (e) {
    return '.' === e || '%2e' === e.toLowerCase();
  }, re = {}, oe = {}, ae = {}, ie = {}, le = {}, se = {}, ce = {}, ue = {}, fe = {}, de = {}, pe = {}, he = {}, ge = {}, me = {}, be = {}, ve = {}, ye = {}, we = {}, xe = {}, _e = {}, Se = {}, ke = function (e, t, n, o) {
    var a, i, l, s, c, u = n || re, d = 0, h = '', g = !1, m = !1, b = !1;
    for (n || (e.scheme = '', e.username = '', e.password = '', e.host = null, e.port = null, e.path = [], e.query = null, e.fragment = null, e.cannotBeABaseURL = !1, t = t.replace(L, '')), t = t.replace(B, ''), a = p(t); d <= a.length;) {
      switch (i = a[d], u) {
      case re:
        if (!i || !j.test(i)) {
          if (n)
            return S;
          u = ae;
          continue;
        }
        h += i.toLowerCase(), u = oe;
        break;
      case oe:
        if (i && (M.test(i) || '+' == i || '-' == i || '.' == i))
          h += i.toLowerCase();
        else {
          if (':' != i) {
            if (n)
              return S;
            h = '', u = ae, d = 0;
            continue;
          }
          if (n && (Q(e) != f(Y, h) || 'file' == h && ($(e) || null !== e.port) || 'file' == e.scheme && !e.host))
            return;
          if (e.scheme = h, n)
            return void (Q(e) && Y[e.scheme] == e.port && (e.port = null));
          h = '', 'file' == e.scheme ? u = me : Q(e) && o && o.scheme == e.scheme ? u = ie : Q(e) ? u = ue : '/' == a[d + 1] ? (u = le, d++) : (e.cannotBeABaseURL = !0, e.path.push(''), u = xe);
        }
        break;
      case ae:
        if (!o || o.cannotBeABaseURL && '#' != i)
          return S;
        if (o.cannotBeABaseURL && '#' == i) {
          e.scheme = o.scheme, e.path = o.path.slice(), e.query = o.query, e.fragment = '', e.cannotBeABaseURL = !0, u = Se;
          break;
        }
        u = 'file' == o.scheme ? me : se;
        continue;
      case ie:
        if ('/' != i || '/' != a[d + 1]) {
          u = se;
          continue;
        }
        u = fe, d++;
        break;
      case le:
        if ('/' == i) {
          u = de;
          break;
        }
        u = we;
        continue;
      case se:
        if (e.scheme = o.scheme, i == r)
          e.username = o.username, e.password = o.password, e.host = o.host, e.port = o.port, e.path = o.path.slice(), e.query = o.query;
        else if ('/' == i || '\\' == i && Q(e))
          u = ce;
        else if ('?' == i)
          e.username = o.username, e.password = o.password, e.host = o.host, e.port = o.port, e.path = o.path.slice(), e.query = '', u = _e;
        else {
          if ('#' != i) {
            e.username = o.username, e.password = o.password, e.host = o.host, e.port = o.port, e.path = o.path.slice(), e.path.pop(), u = we;
            continue;
          }
          e.username = o.username, e.password = o.password, e.host = o.host, e.port = o.port, e.path = o.path.slice(), e.query = o.query, e.fragment = '', u = Se;
        }
        break;
      case ce:
        if (!Q(e) || '/' != i && '\\' != i) {
          if ('/' != i) {
            e.username = o.username, e.password = o.password, e.host = o.host, e.port = o.port, u = we;
            continue;
          }
          u = de;
        } else
          u = fe;
        break;
      case ue:
        if (u = fe, '/' != i || '/' != h.charAt(d + 1))
          continue;
        d++;
        break;
      case fe:
        if ('/' != i && '\\' != i) {
          u = de;
          continue;
        }
        break;
      case de:
        if ('@' == i) {
          g && (h = '%40' + h), g = !0, l = p(h);
          for (var v = 0; v < l.length; v++) {
            var y = l[v];
            if (':' != y || b) {
              var C = Z(y, G);
              b ? e.password += C : e.username += C;
            } else
              b = !0;
          }
          h = '';
        } else if (i == r || '/' == i || '?' == i || '#' == i || '\\' == i && Q(e)) {
          if (g && '' == h)
            return 'Invalid authority';
          d -= p(h).length + 1, h = '', u = pe;
        } else
          h += i;
        break;
      case pe:
      case he:
        if (n && 'file' == e.scheme) {
          u = ve;
          continue;
        }
        if (':' != i || m) {
          if (i == r || '/' == i || '?' == i || '#' == i || '\\' == i && Q(e)) {
            if (Q(e) && '' == h)
              return k;
            if (n && '' == h && ($(e) || null !== e.port))
              return;
            if (s = F(e, h))
              return s;
            if (h = '', u = ye, n)
              return;
            continue;
          }
          '[' == i ? m = !0 : ']' == i && (m = !1), h += i;
        } else {
          if ('' == h)
            return k;
          if (s = F(e, h))
            return s;
          if (h = '', u = ge, n == he)
            return;
        }
        break;
      case ge:
        if (!I.test(i)) {
          if (i == r || '/' == i || '?' == i || '#' == i || '\\' == i && Q(e) || n) {
            if ('' != h) {
              var w = parseInt(h, 10);
              if (w > 65535)
                return A;
              e.port = Q(e) && w === Y[e.scheme] ? null : w, h = '';
            }
            if (n)
              return;
            u = ye;
            continue;
          }
          return A;
        }
        h += i;
        break;
      case me:
        if (e.scheme = 'file', '/' == i || '\\' == i)
          u = be;
        else {
          if (!o || 'file' != o.scheme) {
            u = we;
            continue;
          }
          if (i == r)
            e.host = o.host, e.path = o.path.slice(), e.query = o.query;
          else if ('?' == i)
            e.host = o.host, e.path = o.path.slice(), e.query = '', u = _e;
          else {
            if ('#' != i) {
              ee(a.slice(d).join('')) || (e.host = o.host, e.path = o.path.slice(), te(e)), u = we;
              continue;
            }
            e.host = o.host, e.path = o.path.slice(), e.query = o.query, e.fragment = '', u = Se;
          }
        }
        break;
      case be:
        if ('/' == i || '\\' == i) {
          u = ve;
          break;
        }
        o && 'file' == o.scheme && !ee(a.slice(d).join('')) && (J(o.path[0], !0) ? e.path.push(o.path[0]) : e.host = o.host), u = we;
        continue;
      case ve:
        if (i == r || '/' == i || '\\' == i || '?' == i || '#' == i) {
          if (!n && J(h))
            u = we;
          else if ('' == h) {
            if (e.host = '', n)
              return;
            u = ye;
          } else {
            if (s = F(e, h))
              return s;
            if ('localhost' == e.host && (e.host = ''), n)
              return;
            h = '', u = ye;
          }
          continue;
        }
        h += i;
        break;
      case ye:
        if (Q(e)) {
          if (u = we, '/' != i && '\\' != i)
            continue;
        } else if (n || '?' != i)
          if (n || '#' != i) {
            if (i != r && (u = we, '/' != i))
              continue;
          } else
            e.fragment = '', u = Se;
        else
          e.query = '', u = _e;
        break;
      case we:
        if (i == r || '/' == i || '\\' == i && Q(e) || !n && ('?' == i || '#' == i)) {
          if ('..' === (c = (c = h).toLowerCase()) || '%2e.' === c || '.%2e' === c || '%2e%2e' === c ? (te(e), '/' == i || '\\' == i && Q(e) || e.path.push('')) : ne(h) ? '/' == i || '\\' == i && Q(e) || e.path.push('') : ('file' == e.scheme && !e.path.length && J(h) && (e.host && (e.host = ''), h = h.charAt(0) + ':'), e.path.push(h)), h = '', 'file' == e.scheme && (i == r || '?' == i || '#' == i))
            for (; e.path.length > 1 && '' === e.path[0];)
              e.path.shift();
          '?' == i ? (e.query = '', u = _e) : '#' == i && (e.fragment = '', u = Se);
        } else
          h += Z(i, q);
        break;
      case xe:
        '?' == i ? (e.query = '', u = _e) : '#' == i ? (e.fragment = '', u = Se) : i != r && (e.path[0] += Z(i, V));
        break;
      case _e:
        n || '#' != i ? i != r && ('\'' == i && Q(e) ? e.query += '%27' : e.query += '#' == i ? '%23' : Z(i, V)) : (e.fragment = '', u = Se);
        break;
      case Se:
        i != r && (e.fragment += Z(i, K));
      }
      d++;
    }
  }, je = function URL(e) {
    var t, n, r = u(this, je, 'URL'), o = arguments.length > 1 ? arguments[1] : void 0, i = String(e), l = x(r, { type: 'URL' });
    if (void 0 !== o)
      if (o instanceof je)
        t = E(o);
      else if (n = ke(t = {}, String(o)))
        throw TypeError(n);
    if (n = ke(l, i, null, t))
      throw TypeError(n);
    var s = l.searchParams = new C(), c = w(s);
    c.updateSearchParams(l.query), c.updateURL = function () {
      l.query = String(s) || null;
    }, a || (r.href = ze.call(r), r.origin = Fe.call(r), r.protocol = Ue.call(r), r.username = qe.call(r), r.password = $e.call(r), r.host = Xe.call(r), r.hostname = et.call(r), r.port = tt.call(r), r.pathname = nt.call(r), r.search = rt.call(r), r.searchParams = ot.call(r), r.hash = at.call(r));
  }, Re = je.prototype, ze = function () {
    var e = E(this), t = e.scheme, n = e.username, r = e.password, o = e.host, a = e.port, i = e.path, l = e.query, s = e.fragment, c = t + ':';
    return null !== o ? (c += '//', $(e) && (c += n + (r ? ':' + r : '') + '@'), c += W(o), null !== a && (c += ':' + a)) : 'file' == t && (c += '//'), c += e.cannotBeABaseURL ? i[0] : i.length ? '/' + i.join('/') : '', null !== l && (c += '?' + l), null !== s && (c += '#' + s), c;
  }, Fe = function () {
    var e = E(this), t = e.scheme, n = e.port;
    if ('blob' == t)
      try {
        return new URL(t.path[0]).origin;
      } catch (e) {
        return 'null';
      }
    return 'file' != t && Q(e) ? t + '://' + W(e.host) + (null !== n ? ':' + n : '') : 'null';
  }, Ue = function () {
    return E(this).scheme + ':';
  }, qe = function () {
    return E(this).username;
  }, $e = function () {
    return E(this).password;
  }, Xe = function () {
    var e = E(this), t = e.host, n = e.port;
    return null === t ? '' : null === n ? W(t) : W(t) + ':' + n;
  }, et = function () {
    var e = E(this).host;
    return null === e ? '' : W(e);
  }, tt = function () {
    var e = E(this).port;
    return null === e ? '' : String(e);
  }, nt = function () {
    var e = E(this), t = e.path;
    return e.cannotBeABaseURL ? t[0] : t.length ? '/' + t.join('/') : '';
  }, rt = function () {
    var e = E(this).query;
    return e ? '?' + e : '';
  }, ot = function () {
    return E(this).searchParams;
  }, at = function () {
    var e = E(this).fragment;
    return e ? '#' + e : '';
  }, it = function (e, t) {
    return {
      get: e,
      set: t,
      configurable: !0,
      enumerable: !0
    };
  };
if (a && s(Re, {
    href: it(ze, function (e) {
      var t = E(this), n = String(e), r = ke(t, n);
      if (r)
        throw TypeError(r);
      w(t.searchParams).updateSearchParams(t.query);
    }),
    origin: it(Fe),
    protocol: it(Ue, function (e) {
      var t = E(this);
      ke(t, String(e) + ':', re);
    }),
    username: it(qe, function (e) {
      var t = E(this), n = p(String(e));
      if (!X(t)) {
        t.username = '';
        for (var r = 0; r < n.length; r++)
          t.username += Z(n[r], G);
      }
    }),
    password: it($e, function (e) {
      var t = E(this), n = p(String(e));
      if (!X(t)) {
        t.password = '';
        for (var r = 0; r < n.length; r++)
          t.password += Z(n[r], G);
      }
    }),
    host: it(Xe, function (e) {
      var t = E(this);
      t.cannotBeABaseURL || ke(t, String(e), pe);
    }),
    hostname: it(et, function (e) {
      var t = E(this);
      t.cannotBeABaseURL || ke(t, String(e), he);
    }),
    port: it(tt, function (e) {
      var t = E(this);
      X(t) || ('' == (e = String(e)) ? t.port = null : ke(t, e, ge));
    }),
    pathname: it(nt, function (e) {
      var t = E(this);
      t.cannotBeABaseURL || (t.path = [], ke(t, e + '', ye));
    }),
    search: it(rt, function (e) {
      var t = E(this);
      '' == (e = String(e)) ? t.query = null : ('?' == e.charAt(0) && (e = e.slice(1)), t.query = '', ke(t, e, _e)), w(t.searchParams).updateSearchParams(t.query);
    }),
    searchParams: it(ot),
    hash: it(at, function (e) {
      var t = E(this);
      '' != (e = String(e)) ? ('#' == e.charAt(0) && (e = e.slice(1)), t.fragment = '', ke(t, e, Se)) : t.fragment = null;
    })
  }), c(Re, 'toJSON', function () {
    return ze.call(this);
  }, { enumerable: !0 }), c(Re, 'toString', function () {
    return ze.call(this);
  }, { enumerable: !0 }), y) {
  var lt = y.createObjectURL, st = y.revokeObjectURL;
  lt && c(je, 'createObjectURL', function (e) {
    return lt.apply(y, arguments);
  }), st && c(je, 'revokeObjectURL', function (e) {
    return st.apply(y, arguments);
  });
}
m(je, 'URL'), o({
  global: !0,
  forced: !i,
  sham: !a
}, { URL: je });