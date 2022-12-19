'use strict';
var r = n('./9'), o = /\./, a = /\|\|/, i = /\s+\-\s+/, l = /^(<=|<|=|>=|~>|~|>|)?\s*(.+)/, s = /^(\d*)(.*)/;
function c(e, t) {
  var n = e.split(a);
  return n.length > 1 ? n.some(function (e) {
    return C.contains(e, t);
  }) : function (e, t) {
    var n = e.split(i);
    if (n.length > 0 && n.length <= 2 || r(!1), 1 === n.length)
      return u(n[0], t);
    var o = n[0], a = n[1];
    return g(o) && g(a) || r(!1), u('>=' + o, t) && u('<=' + a, t);
  }(e = n[0].trim(), t);
}
function u(e, t) {
  if ('' === (e = e.trim()))
    return !0;
  var n, r = t.split(o), a = p(e), i = a.modifier, l = a.rangeComponents;
  switch (i) {
  case '<':
    return f(r, l);
  case '<=':
    return -1 === (n = y(r, l)) || 0 === n;
  case '>=':
    return d(r, l);
  case '>':
    return function (e, t) {
      return 1 === y(e, t);
    }(r, l);
  case '~':
  case '~>':
    return function (e, t) {
      var n = t.slice(), r = t.slice();
      r.length > 1 && r.pop();
      var o = r.length - 1, a = parseInt(r[o], 10);
      h(a) && (r[o] = a + 1 + '');
      return d(e, n) && f(e, r);
    }(r, l);
  default:
    return function (e, t) {
      return 0 === y(e, t);
    }(r, l);
  }
}
function f(e, t) {
  return -1 === y(e, t);
}
function d(e, t) {
  var n = y(e, t);
  return 1 === n || 0 === n;
}
function p(e) {
  var t = e.split(o), n = t[0].match(l);
  return n || r(!1), {
    modifier: n[1],
    rangeComponents: [n[2]].concat(t.slice(1))
  };
}
function h(e) {
  return !isNaN(e) && isFinite(e);
}
function g(e) {
  return !p(e).modifier;
}
function m(e, t) {
  for (var n = e.length; n < t; n++)
    e[n] = '0';
}
function b(e, t) {
  var n = e.match(s)[1], r = t.match(s)[1], o = parseInt(n, 10), a = parseInt(r, 10);
  return h(o) && h(a) && o !== a ? v(o, a) : v(e, t);
}
function v(e, t) {
  return typeof e != typeof t && r(!1), e > t ? 1 : e < t ? -1 : 0;
}
function y(e, t) {
  for (var n = function (e, t) {
        m(e = e.slice(), (t = t.slice()).length);
        for (var n = 0; n < t.length; n++) {
          var r = t[n].match(/^[x*]$/i);
          if (r && (t[n] = e[n] = '0', '*' === r[0] && n === t.length - 1))
            for (var o = n; o < e.length; o++)
              e[o] = '0';
        }
        return m(t, e.length), [
          e,
          t
        ];
      }(e, t), r = n[0], o = n[1], a = 0; a < o.length; a++) {
    var i = b(r[a], o[a]);
    if (i)
      return i;
  }
  return 0;
}
var C = {
  contains: function (e, t) {
    return c(e.trim(), t.trim());
  }
};
e.exports = C;