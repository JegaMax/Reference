'use strict';
var r = n('./258'), o = n('./11'), a = n('./160'), i = n('./78');
e.exports = function (e) {
  var t = i(e, function (e) {
    var t = e.getSelection(), n = t.getStartOffset();
    if (0 === n)
      return a(e, 1);
    var o = t.getStartKey(), i = e.getCurrentContent().getBlockForKey(o).getText().slice(0, n), l = r.getBackward(i);
    return a(e, l.length || 1);
  }, 'backward');
  return t === e.getCurrentContent() ? e : o.push(e, t, 'remove-range');
};