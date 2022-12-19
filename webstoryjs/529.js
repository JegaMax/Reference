'use strict';
var r = n('./11'), o = n('./158'), a = n('./248');
e.exports = function (e, t) {
  var n = t.currentTarget.ownerDocument;
  if (!Boolean(e.props.preserveSelectionOnBlur) && a(n) === n.body) {
    var i = n.defaultView.getSelection(), l = e.editor;
    1 === i.rangeCount && o(l, i.anchorNode) && o(l, i.focusNode) && i.removeAllRanges();
  }
  var s = e._latestEditorState, c = s.getSelection();
  if (c.getHasFocus()) {
    var u = c.set('hasFocus', !1);
    e.props.onBlur && e.props.onBlur(t), e.update(r.acceptSelection(s, u));
  }
};