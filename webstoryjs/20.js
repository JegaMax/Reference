'use strict';
var r = n('./315'), o = n('./32'), a = n('./50'), i = n('./41'), l = n('./47'), s = n('./81'), c = n('./319'), u = n('./320'), f = Math.max, d = Math.min, p = Math.floor, h = /\$([$&'`]|\d\d?|<[^>]*>)/g, g = /\$([$&'`]|\d\d?)/g;
r('replace', 2, function (e, t, n, r) {
  var m = r.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE, b = r.REPLACE_KEEPS_$0, v = m ? '$' : '$0';
  return [
    function (n, r) {
      var o = s(this), a = null == n ? void 0 : n[e];
      return void 0 !== a ? a.call(n, o, r) : t.call(String(o), n, r);
    },
    function (e, r) {
      if (!m && b || 'string' == typeof r && -1 === r.indexOf(v)) {
        var a = n(t, e, this, r);
        if (a.done)
          return a.value;
      }
      var s = o(e), p = String(this), h = 'function' == typeof r;
      h || (r = String(r));
      var g = s.global;
      if (g) {
        var C = s.unicode;
        s.lastIndex = 0;
      }
      for (var w = [];;) {
        var x = u(s, p);
        if (null === x)
          break;
        if (w.push(x), !g)
          break;
        '' === String(x[0]) && (s.lastIndex = c(p, i(s.lastIndex), C));
      }
      for (var E, _ = '', O = 0, S = 0; S < w.length; S++) {
        x = w[S];
        for (var k = String(x[0]), A = f(d(l(x.index), p.length), 0), j = [], M = 1; M < x.length; M++)
          j.push(void 0 === (E = x[M]) ? E : String(E));
        var I = x.groups;
        if (h) {
          var T = [k].concat(j, A, p);
          void 0 !== I && T.push(I);
          var P = String(r.apply(void 0, T));
        } else
          P = y(k, p, A, j, I, r);
        A >= O && (_ += p.slice(O, A) + P, O = A + k.length);
      }
      return _ + p.slice(O);
    }
  ];
  function y(e, n, r, o, i, l) {
    var s = r + e.length, c = o.length, u = g;
    return void 0 !== i && (i = a(i), u = h), t.call(l, u, function (t, a) {
      var l;
      switch (a.charAt(0)) {
      case '$':
        return '$';
      case '&':
        return e;
      case '`':
        return n.slice(0, r);
      case '\'':
        return n.slice(s);
      case '<':
        l = i[a.slice(1, -1)];
        break;
      default:
        var u = +a;
        if (0 === u)
          return t;
        if (u > c) {
          var f = p(u / 10);
          return 0 === f ? t : f <= c ? void 0 === o[f - 1] ? a.charAt(1) : o[f - 1] + a.charAt(1) : t;
        }
        l = o[u - 1];
      }
      return void 0 === l ? '' : l;
    });
  }
});