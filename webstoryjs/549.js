'use strict';
var r = n('./11'), o = n('./56'), a = n('./259'), i = n('./78');
e.exports = function (e) {
  var t = i(e, function (e) {
    var t = e.getSelection(), n = e.getCurrentContent(), r = t.getAnchorKey(), i = t.getAnchorOffset(), l = n.getBlockForKey(r).getText()[i];
    return a(e, l ? o.getUTF16Length(l, 0) : 1);
  }, 'forward');
  if (t === e.getCurrentContent())
    return e;
  var n = e.getSelection();
  return r.push(e, t.set('selectionBefore', n), n.isCollapsed() ? 'delete-character' : 'remove-range');
};