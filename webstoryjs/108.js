'use strict';
var r = n('./9'), o = 'LTR', a = null;
function i(e) {
  return e === o || 'RTL' === e;
}
function l(e) {
  return i(e) || r(!1), e === o ? 'ltr' : 'rtl';
}
function s(e) {
  a = e;
}
var c = {
  NEUTRAL: 'NEUTRAL',
  LTR: o,
  RTL: 'RTL',
  isStrong: i,
  getHTMLDir: l,
  getHTMLDirIfDifferent: function (e, t) {
    return i(e) || r(!1), i(t) || r(!1), e === t ? null : l(e);
  },
  setGlobalDir: s,
  initGlobalDir: function () {
    s(o);
  },
  getGlobalDir: function () {
    return a || this.initGlobalDir(), a || r(!1), a;
  }
};
e.exports = c;