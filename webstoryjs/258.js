'use strict';
var r = '\\s|(?![_])' + n('./544').getPunctuation(), o = new RegExp('^(?:' + r + ')*(?:' + '[\'\u2018\u2019]|(?!' + r + ').)*(?:(?!' + r + ').)'), a = new RegExp('(?:(?!' + r + ').)(?:' + '[\'\u2018\u2019]|(?!' + r + ').)*(?:' + r + ')*$');
function i(e, t) {
  var n = t ? a.exec(e) : o.exec(e);
  return n ? n[0] : e;
}
var l = {
  getBackward: function (e) {
    return i(e, !0);
  },
  getForward: function (e) {
    return i(e, !1);
  }
};
e.exports = l;