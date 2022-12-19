'use strict';
var r = n('./11'), o = n('./56'), a = n('./160'), i = n('./78');
e.exports = function (e) {
  var t = i(e, function (e) {
    var t = e.getSelection(), n = e.getCurrentContent(), r = t.getAnchorKey(), i = t.getAnchorOffset(), l = n.getBlockForKey(r).getText()[i - 1];
    return a(e, l ? o.getUTF16Length(l, 0) : 1);
  }, 'backward');
  if (t === e.getCurrentContent())
    return e;
  var n = e.getSelection();
  return r.push(e, t.set('selectionBefore', n), n.isCollapsed() ? 'backspace-character' : 'remove-range');
};