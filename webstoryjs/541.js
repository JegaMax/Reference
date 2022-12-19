'use strict';
var r = n('./11'), o = n('./542'), a = n('./242'), i = n('./160'), l = n('./78');
e.exports = function (e, t) {
  var n = l(e, function (e) {
    var n = e.getSelection();
    if (n.isCollapsed() && 0 === n.getAnchorOffset())
      return i(e, 1);
    var r = t.currentTarget.ownerDocument.defaultView.getSelection().getRangeAt(0);
    return r = o(r), a(e, null, r.endContainer, r.endOffset, r.startContainer, r.startOffset).selectionState;
  }, 'backward');
  return n === e.getCurrentContent() ? e : r.push(e, n, 'remove-range');
};