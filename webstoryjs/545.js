'use strict';
var r = n('./258'), o = n('./11'), a = n('./259'), i = n('./78');
e.exports = function (e) {
  var t = i(e, function (e) {
    var t = e.getSelection(), n = t.getStartOffset(), o = t.getStartKey(), i = e.getCurrentContent().getBlockForKey(o).getText().slice(n), l = r.getForward(i);
    return a(e, l.length || 1);
  }, 'forward');
  return t === e.getCurrentContent() ? e : o.push(e, t, 'remove-range');
};