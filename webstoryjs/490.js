'use strict';
function r(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
var o = n('./76'), a = n('./232'), i = n('./8'), l = i.List, s = i.Repeat, c = i.Record, u = function () {
    return !0;
  }, f = c({
    start: null,
    end: null
  }), d = c({
    start: null,
    end: null,
    decoratorKey: null,
    leaves: null
  }), p = {
    generate: function (e, t, n) {
      var r = t.getLength();
      if (!r)
        return l.of(new d({
          start: 0,
          end: 0,
          decoratorKey: null,
          leaves: l.of(new f({
            start: 0,
            end: 0
          }))
        }));
      var a = [], i = n ? n.getDecorations(t, e) : l(s(null, r)), c = t.getCharacterList();
      return o(i, g, u, function (e, t) {
        a.push(new d({
          start: e,
          end: t,
          decoratorKey: i.get(e),
          leaves: h(c.slice(e, t).toList(), e)
        }));
      }), l(a);
    },
    fromJS: function (e) {
      var t = e.leaves, n = function (e, t) {
          if (null == e)
            return {};
          var n, r, o = {}, a = Object.keys(e);
          for (r = 0; r < a.length; r++)
            n = a[r], t.indexOf(n) >= 0 || (o[n] = e[n]);
          return o;
        }(e, ['leaves']);
      return new d(function (e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {}, o = Object.keys(n);
          'function' == typeof Object.getOwnPropertySymbols && (o = o.concat(Object.getOwnPropertySymbols(n).filter(function (e) {
            return Object.getOwnPropertyDescriptor(n, e).enumerable;
          }))), o.forEach(function (t) {
            r(e, t, n[t]);
          });
        }
        return e;
      }({}, n, {
        leaves: null != t ? l(Array.isArray(t) ? t : a(t)).map(function (e) {
          return f(e);
        }) : null
      }));
    }
  };
function h(e, t) {
  var n = [], r = e.map(function (e) {
      return e.getStyle();
    }).toList();
  return o(r, g, u, function (e, r) {
    n.push(new f({
      start: e + t,
      end: r + t
    }));
  }), l(n);
}
function g(e, t) {
  return e === t;
}
e.exports = p;