'use strict';
var r = n('./11'), o = n('./23');
e.exports = function (e, t) {
  var n = e._latestEditorState, a = n.getSelection();
  if (!a.getHasFocus()) {
    var i = a.set('hasFocus', !0);
    e.props.onFocus && e.props.onFocus(t), o.isBrowser('Chrome < 60.0.3081.0') ? e.update(r.forceSelection(n, i)) : e.update(r.acceptSelection(n, i));
  }
};