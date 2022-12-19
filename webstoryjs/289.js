'use strict';
Object.defineProperty(t, '__esModule', { value: !0 }), t.dumpClassLists = function () {
  0;
};
var r = {}, o = {};
t.add = function (e, t) {
  return n = e.classList, a = 'html' == e.nodeName.toLowerCase() ? r : o, void t.split(' ').forEach(function (e) {
    !function (e, t) {
      e[t] || (e[t] = 0), e[t] += 1;
    }(a, e), n.add(e);
  });
  var n, a;
}, t.remove = function (e, t) {
  return n = e.classList, a = 'html' == e.nodeName.toLowerCase() ? r : o, void t.split(' ').forEach(function (e) {
    !function (e, t) {
      e[t] && (e[t] -= 1);
    }(a, e), 0 === a[e] && n.remove(e);
  });
  var n, a;
};