'use strict';
e.exports = function (e) {
  var t = e.getSelection(), n = t.getAnchorKey(), r = e.getBlockTree(n), o = t.getStartOffset(), a = !1;
  return r.some(function (e) {
    return o === e.get('start') ? (a = !0, !0) : o < e.get('end') && e.get('leaves').some(function (e) {
      var t = e.get('start');
      return o === t && (a = !0, !0);
    });
  }), a;
};