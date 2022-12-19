'use strict';
var r = n('./242');
e.exports = function (e, t) {
  var n = t.ownerDocument.defaultView.getSelection(), o = n.anchorNode, a = n.anchorOffset, i = n.focusNode, l = n.focusOffset;
  return 0 === n.rangeCount || null == o || null == i ? {
    selectionState: e.getSelection().set('hasFocus', !1),
    needsRecovery: !1
  } : r(e, t, o, a, i, l);
};