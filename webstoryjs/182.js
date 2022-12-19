'use strict';
var r, o, a, i = n('./87'), l = n('./35'), s = n('./24'), c = n('./19'), u = n('./83'), f = c('iterator'), d = !1;
[].keys && ('next' in (a = [].keys()) ? (o = i(i(a))) !== Object.prototype && (r = o) : d = !0), null == r && (r = {}), u || s(r, f) || l(r, f, function () {
  return this;
}), e.exports = {
  IteratorPrototype: r,
  BUGGY_SAFARI_ITERATORS: d
};