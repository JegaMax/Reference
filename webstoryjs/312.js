'use strict';
var r = n('./84'), o = n('./313'), a = n('./69'), i = n('./48'), l = n('./176'), s = 'Array Iterator', c = i.set, u = i.getterFor(s);
e.exports = l(Array, 'Array', function (e, t) {
  c(this, {
    type: s,
    target: r(e),
    index: 0,
    kind: t
  });
}, function () {
  var e = u(this), t = e.target, n = e.kind, r = e.index++;
  return !t || r >= t.length ? (e.target = void 0, {
    value: void 0,
    done: !0
  }) : 'keys' == n ? {
    value: r,
    done: !1
  } : 'values' == n ? {
    value: t[r],
    done: !1
  } : {
    value: [
      r,
      t[r]
    ],
    done: !1
  };
}, 'values'), a.Arguments = a.Array, o('keys'), o('values'), o('entries');