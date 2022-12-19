var n = 0, r = Math.random();
e.exports = function (e) {
  return 'Symbol(' + String(void 0 === e ? '' : e) + ')_' + (++n + r).toString(36);
};