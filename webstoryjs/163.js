'use strict';
Object.defineProperty(t, '__esModule', { value: !0 }), t.default = void 0;
var r = s(n('./321')), o = s(n('./322')), a = s(n('./324')), i = s(n('./325')), l = s(n('./326'));
function s(e) {
  return e && e.__esModule ? e : { default: e };
}
var c = {
  code: 'en-US',
  formatDistance: r.default,
  formatLong: o.default,
  formatRelative: a.default,
  localize: i.default,
  match: l.default,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
t.default = c, e.exports = t.default;