'use strict';
var r = n('./123').charAt, o = n('./48'), a = n('./176'), i = 'String Iterator', l = o.set, s = o.getterFor(i);
a(String, 'String', function (e) {
  l(this, {
    type: i,
    string: String(e),
    index: 0
  });
}, function () {
  var e, t = s(this), n = t.string, o = t.index;
  return o >= n.length ? {
    value: void 0,
    done: !0
  } : (e = r(n, o), t.index += e.length, {
    value: e,
    done: !1
  });
});