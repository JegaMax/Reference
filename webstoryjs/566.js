'use strict';
function r(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = null != arguments[t] ? arguments[t] : {}, r = Object.keys(n);
    'function' == typeof Object.getOwnPropertySymbols && (r = r.concat(Object.getOwnPropertySymbols(n).filter(function (e) {
      return Object.getOwnPropertyDescriptor(n, e).enumerable;
    }))), r.forEach(function (t) {
      o(e, t, n[t]);
    });
  }
  return e;
}
function o(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
var a = n('./39'), i = n('./9'), l = function (e) {
    if (!e || !e.type)
      return !1;
    var t = e.type;
    return 'unordered-list-item' === t || 'ordered-list-item' === t;
  }, s = {
    fromRawTreeStateToRawState: function (e) {
      var t = e.blocks, n = [];
      return Array.isArray(t) || i(!1), Array.isArray(t) && t.length ? (function (e, t) {
        for (var n = [].concat(e).reverse(); n.length;) {
          var r = n.pop();
          t(r);
          var o = r.children;
          Array.isArray(o) || i(!1), n = n.concat([].concat(o.reverse()));
        }
      }(t, function (e) {
        var t = r({}, e);
        l(e) && (t.depth = t.depth || 0, function (e) {
          Array.isArray(e.children) && (e.children = e.children.map(function (t) {
            return t.type === e.type ? r({}, t, { depth: (e.depth || 0) + 1 }) : t;
          }));
        }(e), null != e.children && e.children.length > 0) || (delete t.children, n.push(t));
      }), e.blocks = n, r({}, e, { blocks: n })) : e;
    },
    fromRawStateToRawTreeState: function (e) {
      var t = [], n = [];
      return e.blocks.forEach(function (e) {
        var o = l(e), i = e.depth || 0, s = r({}, e, { children: [] });
        if (o) {
          var c = n[0];
          if (null == c && 0 === i)
            t.push(s);
          else if (null == c || c.depth < i - 1) {
            var u = {
              key: a(),
              text: '',
              depth: i - 1,
              type: e.type,
              children: [],
              entityRanges: [],
              inlineStyleRanges: []
            };
            n.unshift(u), 1 === i ? t.push(u) : null != c && c.children.push(u), u.children.push(s);
          } else if (c.depth === i - 1)
            c.children.push(s);
          else {
            for (; null != c && c.depth >= i;)
              n.shift(), c = n[0];
            i > 0 ? c.children.push(s) : t.push(s);
          }
        } else
          t.push(s);
      }), r({}, e, { blocks: t });
    }
  };
e.exports = s;