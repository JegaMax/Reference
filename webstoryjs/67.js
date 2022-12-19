var r;
!function (o) {
  'use strict';
  var a, i = 1000000, l = 1000000, s = '[big.js] ', c = s + 'Invalid ', u = c + 'decimal places', f = s + 'Division by zero', d = {}, p = void 0, h = /^-?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i;
  function g(e, t, n, r) {
    var o = e.c;
    if (n === p && (n = a.RM), 0 !== n && 1 !== n && 2 !== n && 3 !== n)
      throw Error('[big.js] Invalid rounding mode');
    if (t < 1)
      r = 3 === n && (r || !!o[0]) || 0 === t && (1 === n && o[0] >= 5 || 2 === n && (o[0] > 5 || 5 === o[0] && (r || o[1] !== p))), o.length = 1, r ? (e.e = e.e - t + 1, o[0] = 1) : o[0] = e.e = 0;
    else if (t < o.length) {
      if (r = 1 === n && o[t] >= 5 || 2 === n && (o[t] > 5 || 5 === o[t] && (r || o[t + 1] !== p || 1 & o[t - 1])) || 3 === n && (r || !!o[0]), o.length = t--, r)
        for (; ++o[t] > 9;)
          o[t] = 0, t-- || (++e.e, o.unshift(1));
      for (t = o.length; !o[--t];)
        o.pop();
    }
    return e;
  }
  function m(e, t, n) {
    var r = e.e, o = e.c.join(''), a = o.length;
    if (t)
      o = o.charAt(0) + (a > 1 ? '.' + o.slice(1) : '') + (r < 0 ? 'e' : 'e+') + r;
    else if (r < 0) {
      for (; ++r;)
        o = '0' + o;
      o = '0.' + o;
    } else if (r > 0)
      if (++r > a)
        for (r -= a; r--;)
          o += '0';
      else
        r < a && (o = o.slice(0, r) + '.' + o.slice(r));
    else
      a > 1 && (o = o.charAt(0) + '.' + o.slice(1));
    return e.s < 0 && n ? '-' + o : o;
  }
  d.abs = function () {
    var e = new this.constructor(this);
    return e.s = 1, e;
  }, d.cmp = function (e) {
    var t, n = this, r = n.c, o = (e = new n.constructor(e)).c, a = n.s, i = e.s, l = n.e, s = e.e;
    if (!r[0] || !o[0])
      return r[0] ? a : o[0] ? -i : 0;
    if (a != i)
      return a;
    if (t = a < 0, l != s)
      return l > s ^ t ? 1 : -1;
    for (i = (l = r.length) < (s = o.length) ? l : s, a = -1; ++a < i;)
      if (r[a] != o[a])
        return r[a] > o[a] ^ t ? 1 : -1;
    return l == s ? 0 : l > s ^ t ? 1 : -1;
  }, d.div = function (e) {
    var t = this, n = t.constructor, r = t.c, o = (e = new n(e)).c, a = t.s == e.s ? 1 : -1, l = n.DP;
    if (l !== ~~l || l < 0 || l > i)
      throw Error(u);
    if (!o[0])
      throw Error(f);
    if (!r[0])
      return new n(0 * a);
    var s, c, d, h, m, b = o.slice(), v = s = o.length, y = r.length, C = r.slice(0, s), w = C.length, x = e, E = x.c = [], _ = 0, O = l + (x.e = t.e - e.e) + 1;
    for (x.s = a, a = O < 0 ? 0 : O, b.unshift(0); w++ < s;)
      C.push(0);
    do {
      for (d = 0; d < 10; d++) {
        if (s != (w = C.length))
          h = s > w ? 1 : -1;
        else
          for (m = -1, h = 0; ++m < s;)
            if (o[m] != C[m]) {
              h = o[m] > C[m] ? 1 : -1;
              break;
            }
        if (!(h < 0))
          break;
        for (c = w == s ? o : b; w;) {
          if (C[--w] < c[w]) {
            for (m = w; m && !C[--m];)
              C[m] = 9;
            --C[m], C[w] += 10;
          }
          C[w] -= c[w];
        }
        for (; !C[0];)
          C.shift();
      }
      E[_++] = h ? d : ++d, C[0] && h ? C[w] = r[v] || 0 : C = [r[v]];
    } while ((v++ < y || C[0] !== p) && a--);
    return E[0] || 1 == _ || (E.shift(), x.e--, O--), _ > O && g(x, O, n.RM, C[0] !== p), x;
  }, d.eq = function (e) {
    return 0 === this.cmp(e);
  }, d.gt = function (e) {
    return this.cmp(e) > 0;
  }, d.gte = function (e) {
    return this.cmp(e) > -1;
  }, d.lt = function (e) {
    return this.cmp(e) < 0;
  }, d.lte = function (e) {
    return this.cmp(e) < 1;
  }, d.minus = d.sub = function (e) {
    var t, n, r, o, a = this, i = a.constructor, l = a.s, s = (e = new i(e)).s;
    if (l != s)
      return e.s = -s, a.plus(e);
    var c = a.c.slice(), u = a.e, f = e.c, d = e.e;
    if (!c[0] || !f[0])
      return f[0] ? (e.s = -s, e) : new i(c[0] ? a : 0);
    if (l = u - d) {
      for ((o = l < 0) ? (l = -l, r = c) : (d = u, r = f), r.reverse(), s = l; s--;)
        r.push(0);
      r.reverse();
    } else
      for (n = ((o = c.length < f.length) ? c : f).length, l = s = 0; s < n; s++)
        if (c[s] != f[s]) {
          o = c[s] < f[s];
          break;
        }
    if (o && (r = c, c = f, f = r, e.s = -e.s), (s = (n = f.length) - (t = c.length)) > 0)
      for (; s--;)
        c[t++] = 0;
    for (s = t; n > l;) {
      if (c[--n] < f[n]) {
        for (t = n; t && !c[--t];)
          c[t] = 9;
        --c[t], c[n] += 10;
      }
      c[n] -= f[n];
    }
    for (; 0 === c[--s];)
      c.pop();
    for (; 0 === c[0];)
      c.shift(), --d;
    return c[0] || (e.s = 1, c = [d = 0]), e.c = c, e.e = d, e;
  }, d.mod = function (e) {
    var t, n = this, r = n.constructor, o = n.s, a = (e = new r(e)).s;
    if (!e.c[0])
      throw Error(f);
    return n.s = e.s = 1, t = 1 == e.cmp(n), n.s = o, e.s = a, t ? new r(n) : (o = r.DP, a = r.RM, r.DP = r.RM = 0, n = n.div(e), r.DP = o, r.RM = a, this.minus(n.times(e)));
  }, d.plus = d.add = function (e) {
    var t, n = this, r = n.constructor, o = n.s, a = (e = new r(e)).s;
    if (o != a)
      return e.s = -a, n.minus(e);
    var i = n.e, l = n.c, s = e.e, c = e.c;
    if (!l[0] || !c[0])
      return c[0] ? e : new r(l[0] ? n : 0 * o);
    if (l = l.slice(), o = i - s) {
      for (o > 0 ? (s = i, t = c) : (o = -o, t = l), t.reverse(); o--;)
        t.push(0);
      t.reverse();
    }
    for (l.length - c.length < 0 && (t = c, c = l, l = t), o = c.length, a = 0; o; l[o] %= 10)
      a = (l[--o] = l[o] + c[o] + a) / 10 | 0;
    for (a && (l.unshift(a), ++s), o = l.length; 0 === l[--o];)
      l.pop();
    return e.c = l, e.e = s, e;
  }, d.pow = function (e) {
    var t = this, n = new t.constructor(1), r = n, o = e < 0;
    if (e !== ~~e || e < -1000000 || e > l)
      throw Error(c + 'exponent');
    for (o && (e = -e); 1 & e && (r = r.times(t)), e >>= 1;)
      t = t.times(t);
    return o ? n.div(r) : r;
  }, d.prec = function (e, t) {
    if (e !== ~~e || e < 1 || e > i)
      throw Error(c + 'precision');
    return g(new this.constructor(this), e, t);
  }, d.round = function (e, t) {
    if (e === p)
      e = 0;
    else if (e !== ~~e || e < -i || e > i)
      throw Error(u);
    return g(new this.constructor(this), e + this.e + 1, t);
  }, d.sqrt = function () {
    var e, t, n, r = this, o = r.constructor, a = r.s, i = r.e, l = new o(0.5);
    if (!r.c[0])
      return new o(r);
    if (a < 0)
      throw Error(s + 'No square root');
    0 === (a = Math.sqrt(r + '')) || a === 1 / 0 ? ((t = r.c.join('')).length + i & 1 || (t += '0'), i = ((i + 1) / 2 | 0) - (i < 0 || 1 & i), e = new o(((a = Math.sqrt(t)) == 1 / 0 ? '5e' : (a = a.toExponential()).slice(0, a.indexOf('e') + 1)) + i)) : e = new o(a), i = e.e + (o.DP += 4);
    do {
      n = e, e = l.times(n.plus(r.div(n)));
    } while (n.c.slice(0, i).join('') !== e.c.slice(0, i).join(''));
    return g(e, (o.DP -= 4) + e.e + 1, o.RM);
  }, d.times = d.mul = function (e) {
    var t, n = this, r = n.constructor, o = n.c, a = (e = new r(e)).c, i = o.length, l = a.length, s = n.e, c = e.e;
    if (e.s = n.s == e.s ? 1 : -1, !o[0] || !a[0])
      return new r(0 * e.s);
    for (e.e = s + c, i < l && (t = o, o = a, a = t, c = i, i = l, l = c), t = new Array(c = i + l); c--;)
      t[c] = 0;
    for (s = l; s--;) {
      for (l = 0, c = i + s; c > s;)
        l = t[c] + a[s] * o[c - s - 1] + l, t[c--] = l % 10, l = l / 10 | 0;
      t[c] = l;
    }
    for (l ? ++e.e : t.shift(), s = t.length; !t[--s];)
      t.pop();
    return e.c = t, e;
  }, d.toExponential = function (e, t) {
    var n = this, r = n.c[0];
    if (e !== p) {
      if (e !== ~~e || e < 0 || e > i)
        throw Error(u);
      for (n = g(new n.constructor(n), ++e, t); n.c.length < e;)
        n.c.push(0);
    }
    return m(n, !0, !!r);
  }, d.toFixed = function (e, t) {
    var n = this, r = n.c[0];
    if (e !== p) {
      if (e !== ~~e || e < 0 || e > i)
        throw Error(u);
      for (e = e + (n = g(new n.constructor(n), e + n.e + 1, t)).e + 1; n.c.length < e;)
        n.c.push(0);
    }
    return m(n, !1, !!r);
  }, d.toJSON = d.toString = function () {
    var e = this, t = e.constructor;
    return m(e, e.e <= t.NE || e.e >= t.PE, !!e.c[0]);
  }, d.toNumber = function () {
    var e = Number(m(this, !0, !0));
    if (!0 === this.constructor.strict && !this.eq(e.toString()))
      throw Error(s + 'Imprecise conversion');
    return e;
  }, d.toPrecision = function (e, t) {
    var n = this, r = n.constructor, o = n.c[0];
    if (e !== p) {
      if (e !== ~~e || e < 1 || e > i)
        throw Error(c + 'precision');
      for (n = g(new r(n), e, t); n.c.length < e;)
        n.c.push(0);
    }
    return m(n, e <= n.e || n.e <= r.NE || n.e >= r.PE, !!o);
  }, d.valueOf = function () {
    var e = this, t = e.constructor;
    if (!0 === t.strict)
      throw Error(s + 'valueOf disallowed');
    return m(e, e.e <= t.NE || e.e >= t.PE, !0);
  }, (a = function e() {
    function Big(t) {
      var n = this;
      if (!(n instanceof Big))
        return t === p ? e() : new Big(t);
      if (t instanceof Big)
        n.s = t.s, n.e = t.e, n.c = t.c.slice();
      else {
        if ('string' != typeof t) {
          if (!0 === Big.strict)
            throw TypeError(c + 'number');
          t = 0 === t && 1 / t < 0 ? '-0' : String(t);
        }
        !function (e, t) {
          var n, r, o;
          if (!h.test(t))
            throw Error(c + 'number');
          e.s = '-' == t.charAt(0) ? (t = t.slice(1), -1) : 1, (n = t.indexOf('.')) > -1 && (t = t.replace('.', ''));
          (r = t.search(/e/i)) > 0 ? (n < 0 && (n = r), n += +t.slice(r + 1), t = t.substring(0, r)) : n < 0 && (n = t.length);
          for (o = t.length, r = 0; r < o && '0' == t.charAt(r);)
            ++r;
          if (r == o)
            e.c = [e.e = 0];
          else {
            for (; o > 0 && '0' == t.charAt(--o););
            for (e.e = n - r - 1, e.c = [], n = 0; r <= o;)
              e.c[n++] = +t.charAt(r++);
          }
        }(n, t);
      }
      n.constructor = Big;
    }
    return Big.prototype = d, Big.DP = 20, Big.RM = 1, Big.NE = -7, Big.PE = 21, Big.strict = false, Big;
  }()).default = a.Big = a, void 0 === (r = function () {
    return a;
  }.call(t, n, t, e)) || (e.exports = r);
}();