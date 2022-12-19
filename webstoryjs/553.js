'use strict';
function r(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
var o = n('./53'), a = n('./30'), i = n('./260'), l = n('./39'), s = n('./261'), c = n('./44'), u = n('./8'), f = n('./234'), d = u.List, p = u.Repeat, h = c('draft_tree_data_support'), g = h ? a : o, m = {
    processHTML: function (e, t) {
      return i(e, s, t);
    },
    processText: function (e, t, n) {
      return e.reduce(function (e, o, a) {
        o = f(o);
        var i = l(), s = {
            key: i,
            type: n,
            text: o,
            characterList: d(p(t, o.length))
          };
        if (h && 0 !== a) {
          var c = a - 1;
          s = function (e) {
            for (var t = 1; t < arguments.length; t++) {
              var n = null != arguments[t] ? arguments[t] : {}, o = Object.keys(n);
              'function' == typeof Object.getOwnPropertySymbols && (o = o.concat(Object.getOwnPropertySymbols(n).filter(function (e) {
                return Object.getOwnPropertyDescriptor(n, e).enumerable;
              }))), o.forEach(function (t) {
                r(e, t, n[t]);
              });
            }
            return e;
          }({}, s, { prevSibling: (e[c] = e[c].merge({ nextSibling: i })).getKey() });
        }
        return e.push(new g(s)), e;
      }, []);
    }
  };
e.exports = m;