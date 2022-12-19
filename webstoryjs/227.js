'use strict';
var r = n('./30'), o = n('./39'), a = n('./8').OrderedMap;
e.exports = function (e) {
  return e.first() instanceof r ? function (e) {
    var t, n = {};
    return a(e.withMutations(function (e) {
      e.forEach(function (r, a) {
        var i = r.getKey(), l = r.getNextSiblingKey(), s = r.getPrevSiblingKey(), c = r.getChildKeys(), u = r.getParentKey(), f = o();
        if (n[i] = f, l && (e.get(l) ? e.setIn([
            l,
            'prevSibling'
          ], f) : e.setIn([
            i,
            'nextSibling'
          ], null)), s && (e.get(s) ? e.setIn([
            s,
            'nextSibling'
          ], f) : e.setIn([
            i,
            'prevSibling'
          ], null)), u && e.get(u)) {
          var d = e.get(u).getChildKeys();
          e.setIn([
            u,
            'children'
          ], d.set(d.indexOf(r.getKey()), f));
        } else
          e.setIn([
            i,
            'parent'
          ], null), t && (e.setIn([
            t.getKey(),
            'nextSibling'
          ], f), e.setIn([
            i,
            'prevSibling'
          ], n[t.getKey()])), t = e.get(i);
        c.forEach(function (t) {
          e.get(t) ? e.setIn([
            t,
            'parent'
          ], f) : e.setIn([
            i,
            'children'
          ], r.getChildKeys().filter(function (e) {
            return e !== t;
          }));
        });
      });
    }).toArray().map(function (e) {
      return [
        n[e.getKey()],
        e.set('key', n[e.getKey()])
      ];
    }));
  }(e) : function (e) {
    return a(e.toArray().map(function (e) {
      var t = o();
      return [
        t,
        e.set('key', t)
      ];
    }));
  }(e);
};