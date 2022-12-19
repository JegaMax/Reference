'use strict';
n('./312');
var r = n('./60'), o = n('./86'), a = n('./186'), i = n('./49'), l = n('./188'), s = n('./68'), c = n('./181'), u = n('./48'), f = n('./89'), d = n('./24'), p = n('./90'), h = n('./92'), g = n('./32'), m = n('./37'), b = n('./88'), v = n('./59'), y = n('./314'), C = n('./91'), w = n('./19'), x = o('fetch'), E = o('Headers'), _ = w('iterator'), O = 'URLSearchParams', S = 'URLSearchParamsIterator', k = u.set, A = u.getterFor(O), j = u.getterFor(S), M = /\+/g, I = Array(4), T = function (e) {
    return I[e - 1] || (I[e - 1] = RegExp('((?:%[\\da-f]{2}){' + e + '})', 'gi'));
  }, P = function (e) {
    try {
      return decodeURIComponent(e);
    } catch (t) {
      return e;
    }
  }, D = function (e) {
    var t = e.replace(M, ' '), n = 4;
    try {
      return decodeURIComponent(t);
    } catch (e) {
      for (; n;)
        t = t.replace(T(n--), P);
      return t;
    }
  }, R = /[!'()~]|%20/g, N = {
    '!': '%21',
    '\'': '%27',
    '(': '%28',
    ')': '%29',
    '~': '%7E',
    '%20': '+'
  }, z = function (e) {
    return N[e];
  }, L = function (e) {
    return encodeURIComponent(e).replace(R, z);
  }, B = function (e, t) {
    if (t)
      for (var n, r, o = t.split('&'), a = 0; a < o.length;)
        (n = o[a++]).length && (r = n.split('='), e.push({
          key: D(r.shift()),
          value: D(r.join('='))
        }));
  }, F = function (e) {
    this.entries.length = 0, B(this.entries, e);
  }, H = function (e, t) {
    if (e < t)
      throw TypeError('Not enough arguments');
  }, U = c(function Iterator(e, t) {
    k(this, {
      type: S,
      iterator: y(A(e).entries),
      kind: t
    });
  }, 'Iterator', function () {
    var e = j(this), t = e.kind, n = e.iterator.next(), r = n.value;
    return n.done || (n.value = 'keys' === t ? r.key : 'values' === t ? r.value : [
      r.key,
      r.value
    ]), n;
  }), W = function URLSearchParams() {
    f(this, W, O);
    var e, t, n, r, o, a, i, l, s, c = arguments.length > 0 ? arguments[0] : void 0, u = this, p = [];
    if (k(u, {
        type: O,
        entries: p,
        updateURL: function () {
        },
        updateSearchParams: F
      }), void 0 !== c)
      if (m(c))
        if ('function' == typeof (e = C(c)))
          for (n = (t = e.call(c)).next; !(r = n.call(t)).done;) {
            if ((i = (a = (o = y(g(r.value))).next).call(o)).done || (l = a.call(o)).done || !a.call(o).done)
              throw TypeError('Expected sequence with length 2');
            p.push({
              key: i.value + '',
              value: l.value + ''
            });
          }
        else
          for (s in c)
            d(c, s) && p.push({
              key: s,
              value: c[s] + ''
            });
      else
        B(p, 'string' == typeof c ? '?' === c.charAt(0) ? c.slice(1) : c : c + '');
  }, V = W.prototype;
l(V, {
  append: function (e, t) {
    H(arguments.length, 2);
    var n = A(this);
    n.entries.push({
      key: e + '',
      value: t + ''
    }), n.updateURL();
  },
  delete: function (e) {
    H(arguments.length, 1);
    for (var t = A(this), n = t.entries, r = e + '', o = 0; o < n.length;)
      n[o].key === r ? n.splice(o, 1) : o++;
    t.updateURL();
  },
  get: function (e) {
    H(arguments.length, 1);
    for (var t = A(this).entries, n = e + '', r = 0; r < t.length; r++)
      if (t[r].key === n)
        return t[r].value;
    return null;
  },
  getAll: function (e) {
    H(arguments.length, 1);
    for (var t = A(this).entries, n = e + '', r = [], o = 0; o < t.length; o++)
      t[o].key === n && r.push(t[o].value);
    return r;
  },
  has: function (e) {
    H(arguments.length, 1);
    for (var t = A(this).entries, n = e + '', r = 0; r < t.length;)
      if (t[r++].key === n)
        return !0;
    return !1;
  },
  set: function (e, t) {
    H(arguments.length, 1);
    for (var n, r = A(this), o = r.entries, a = !1, i = e + '', l = t + '', s = 0; s < o.length; s++)
      (n = o[s]).key === i && (a ? o.splice(s--, 1) : (a = !0, n.value = l));
    a || o.push({
      key: i,
      value: l
    }), r.updateURL();
  },
  sort: function () {
    var e, t, n, r = A(this), o = r.entries, a = o.slice();
    for (o.length = 0, n = 0; n < a.length; n++) {
      for (e = a[n], t = 0; t < n; t++)
        if (o[t].key > e.key) {
          o.splice(t, 0, e);
          break;
        }
      t === n && o.push(e);
    }
    r.updateURL();
  },
  forEach: function (e) {
    for (var t, n = A(this).entries, r = p(e, arguments.length > 1 ? arguments[1] : void 0, 3), o = 0; o < n.length;)
      r((t = n[o++]).value, t.key, this);
  },
  keys: function () {
    return new U(this, 'keys');
  },
  values: function () {
    return new U(this, 'values');
  },
  entries: function () {
    return new U(this, 'entries');
  }
}, { enumerable: !0 }), i(V, _, V.entries), i(V, 'toString', function () {
  for (var e, t = A(this).entries, n = [], r = 0; r < t.length;)
    e = t[r++], n.push(L(e.key) + '=' + L(e.value));
  return n.join('&');
}, { enumerable: !0 }), s(W, O), r({
  global: !0,
  forced: !a
}, { URLSearchParams: W }), a || 'function' != typeof x || 'function' != typeof E || r({
  global: !0,
  enumerable: !0,
  forced: !0
}, {
  fetch: function (e) {
    var t, n, r, o = [e];
    return arguments.length > 1 && (m(t = arguments[1]) && (n = t.body, h(n) === O && ((r = t.headers ? new E(t.headers) : new E()).has('content-type') || r.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8'), t = b(t, {
      body: v(0, String(n)),
      headers: v(0, r)
    }))), o.push(t)), x.apply(this, o);
  }
}), e.exports = {
  URLSearchParams: W,
  getState: A
};