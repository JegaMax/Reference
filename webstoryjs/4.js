'use strict';
n.d(t, 'd', function () {
  return i;
}), n.d(t, 'b', function () {
  return l;
});
var r = n('./119'), o = n('./0'), a = n('./57');
n.d(t, 'a', function () {
  return a.a;
}), n.d(t, 'c', function () {
  return a.b;
});
const i = (e, t, n = r.shallowEqual) => {
    const i = Object(o.useRef)(), l = n ? e => {
        const r = t(e);
        return n ? i.current : (i.current = r, r);
      } : t;
    return Object(a.c)(e, l);
  }, l = e => e;