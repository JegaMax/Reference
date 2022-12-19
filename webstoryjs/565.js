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
var a = n('./53'), i = n('./30'), l = n('./154'), s = n('./106'), c = n('./566'), u = (n('./567'), n('./107')), f = n('./568'), d = n('./569'), p = n('./570'), h = n('./39'), g = n('./44'), m = n('./8'), b = n('./9'), v = g('draft_tree_data_support'), y = m.List, C = m.Map, w = m.OrderedMap, x = function (e, t) {
    var n = e.key, r = e.type, o = e.data;
    return {
      text: e.text,
      depth: e.depth || 0,
      type: r || 'unstyled',
      key: n || h(),
      data: C(o),
      characterList: E(e, t)
    };
  }, E = function (e, t) {
    var n = e.text, o = e.entityRanges, a = e.inlineStyleRanges, i = o || [];
    return f(p(n, a || []), d(n, i.filter(function (e) {
      return t.hasOwnProperty(e.key);
    }).map(function (e) {
      return r({}, e, { key: t[e.key] });
    })));
  }, _ = function (e) {
    return r({}, e, { key: e.key || h() });
  }, O = function (e, t, n) {
    var o = t.map(function (e) {
      return r({}, e, { parentRef: n });
    });
    return e.concat(o.reverse());
  }, S = function (e, t) {
    var n = e.blocks.find(function (e) {
        return Array.isArray(e.children) && e.children.length > 0;
      }), o = v && !n ? c.fromRawStateToRawTreeState(e).blocks : e.blocks;
    return v ? function (e, t) {
      return e.map(_).reduce(function (n, o, a) {
        Array.isArray(o.children) || b(!1);
        var l = o.children.map(_), s = new i(r({}, x(o, t), {
            prevSibling: 0 === a ? null : e[a - 1].key,
            nextSibling: a === e.length - 1 ? null : e[a + 1].key,
            children: y(l.map(function (e) {
              return e.key;
            }))
          }));
        n = n.set(s.getKey(), s);
        for (var c = O([], l, s); c.length > 0;) {
          var u = c.pop(), f = u.parentRef, d = f.getChildKeys(), p = d.indexOf(u.key), h = Array.isArray(u.children);
          if (!h) {
            h || b(!1);
            break;
          }
          var g = u.children.map(_), m = new i(r({}, x(u, t), {
              parent: f.getKey(),
              children: y(g.map(function (e) {
                return e.key;
              })),
              prevSibling: 0 === p ? null : d.get(p - 1),
              nextSibling: p === d.size - 1 ? null : d.get(p + 1)
            }));
          n = n.set(m.getKey(), m), c = O(c, g, m);
        }
        return n;
      }, w());
    }(o, t) : function (e, t) {
      return w(e.map(function (e) {
        var n = new a(x(e, t));
        return [
          n.getKey(),
          n
        ];
      }));
    }(n ? c.fromRawTreeStateToRawState(e).blocks : o, t);
  };
e.exports = function (e) {
  Array.isArray(e.blocks) || b(!1);
  var t = function (e) {
      var t = e.entityMap, n = {};
      return Object.keys(t).forEach(function (e) {
        var r = t[e], o = r.type, a = r.mutability, i = r.data;
        n[e] = s.__create(o, a, i || {});
      }), n;
    }(e), n = S(e, t), r = n.isEmpty() ? new u() : u.createEmpty(n.first().getKey());
  return new l({
    blockMap: n,
    entityMap: t,
    selectionBefore: r,
    selectionAfter: r
  });
};