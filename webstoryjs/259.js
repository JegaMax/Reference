'use strict';
n('./161');
e.exports = function (e, t) {
  var n, r = e.getSelection(), o = r.getStartKey(), a = r.getStartOffset(), i = e.getCurrentContent(), l = o;
  return t > i.getBlockForKey(o).getText().length - a ? (l = i.getKeyAfter(o), n = 0) : n = a + t, r.merge({
    focusKey: l,
    focusOffset: n
  });
};