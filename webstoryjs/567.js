'use strict';
n('./161');
var r = {
  isValidBlock: function (e, t) {
    var n = e.getKey(), r = e.getParentKey();
    if (null != r && !t.get(r).getChildKeys().includes(n))
      return !1;
    if (!e.getChildKeys().map(function (e) {
        return t.get(e);
      }).every(function (e) {
        return e.getParentKey() === n;
      }))
      return !1;
    var o = e.getPrevSiblingKey();
    if (null != o && t.get(o).getNextSiblingKey() !== n)
      return !1;
    var a = e.getNextSiblingKey();
    if (null != a && t.get(a).getPrevSiblingKey() !== n)
      return !1;
    return (null === a || null === o || o !== a) && !('' != e.text && e.getChildKeys().size > 0);
  },
  isConnectedTree: function (e) {
    var t = e.toArray().filter(function (e) {
      return null == e.getParentKey() && null == e.getPrevSiblingKey();
    });
    if (1 !== t.length)
      return !1;
    for (var n = 0, r = t.shift().getKey(), o = []; null != r;) {
      var a = e.get(r), i = a.getChildKeys(), l = a.getNextSiblingKey();
      if (i.size > 0) {
        null != l && o.unshift(l);
        var s = i.map(function (t) {
          return e.get(t);
        }).find(function (e) {
          return null == e.getPrevSiblingKey();
        });
        if (null == s)
          return !1;
        r = s.getKey();
      } else
        r = null != a.getNextSiblingKey() ? a.getNextSiblingKey() : o.shift();
      n++;
    }
    return n === e.size;
  },
  isValidTree: function (e) {
    var t = this;
    return !!e.toArray().every(function (n) {
      return t.isValidBlock(n, e);
    }) && this.isConnectedTree(e);
  }
};
e.exports = r;