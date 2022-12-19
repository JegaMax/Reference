'use strict';
function r(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
var o = n('./53'), a = n('./30'), i = n('./264'), l = n('./563'), s = n('./564'), c = n('./9'), u = function (e, t) {
    return {
      key: e.getKey(),
      text: e.getText(),
      type: e.getType(),
      depth: e.getDepth(),
      inlineStyleRanges: s(e),
      entityRanges: l(e, t),
      data: e.getData().toObject()
    };
  }, f = function (e, t, n, i) {
    if (e instanceof o)
      n.push(u(e, t));
    else {
      e instanceof a || c(!1);
      var l = e.getParentKey(), s = i[e.getKey()] = function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = null != arguments[t] ? arguments[t] : {}, o = Object.keys(n);
            'function' == typeof Object.getOwnPropertySymbols && (o = o.concat(Object.getOwnPropertySymbols(n).filter(function (e) {
              return Object.getOwnPropertyDescriptor(n, e).enumerable;
            }))), o.forEach(function (t) {
              r(e, t, n[t]);
            });
          }
          return e;
        }({}, u(e, t), { children: [] });
      l ? i[l].children.push(s) : n.push(s);
    }
  };
e.exports = function (e) {
  var t = {
    entityMap: {},
    blocks: []
  };
  return t = function (e, t) {
    var n = t.entityMap, r = [], o = {}, a = {}, l = 0;
    return e.getBlockMap().forEach(function (e) {
      e.findEntityRanges(function (e) {
        return null !== e.getEntity();
      }, function (t) {
        var r = e.getEntityAt(t), o = i.stringify(r);
        a[o] || (a[o] = r, n[o] = ''.concat(l), l++);
      }), f(e, n, r, o);
    }), {
      blocks: r,
      entityMap: n
    };
  }(e, t), t = function (e, t) {
    var n = t.blocks, r = t.entityMap, o = {};
    return Object.keys(r).forEach(function (t, n) {
      var r = e.getEntity(i.unstringify(t));
      o[n] = {
        type: r.getType(),
        mutability: r.getMutability(),
        data: r.getData()
      };
    }), {
      blocks: n,
      entityMap: o
    };
  }(e, t);
};