'use strict';
var r = n('./11');
e.exports = function (e) {
  var t = e.getSelection(), n = t.getEndKey(), o = e.getCurrentContent().getBlockForKey(n).getLength();
  return r.set(e, {
    selection: t.merge({
      anchorKey: n,
      anchorOffset: o,
      focusKey: n,
      focusOffset: o,
      isBackward: !1
    }),
    forceSelection: !0
  });
};