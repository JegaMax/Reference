'use strict';
n('./161');
e.exports = function (e, t) {
  var n = e.getSelection(), r = e.getCurrentContent(), o = n.getStartKey(), a = n.getStartOffset(), i = o, l = 0;
  if (t > a) {
    var s = r.getKeyBefore(o);
    if (null == s)
      i = o;
    else
      i = s, l = r.getBlockForKey(s).getText().length;
  } else
    l = a - t;
  return n.merge({
    focusKey: i,
    focusOffset: l,
    isBackward: !0
  });
};