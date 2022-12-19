'use strict';
var r = n('./239'), o = n('./11'), a = n('./240'), i = n('./241');
e.exports = function (e) {
  if (e._blockSelectEvents || e._latestEditorState !== e.props.editorState) {
    if (e._blockSelectEvents) {
      var t = e.props.editorState.getSelection();
      r.logBlockedSelectionEvent({
        anonymizedDom: 'N/A',
        extraParams: JSON.stringify({ stacktrace: new Error().stack }),
        selectionState: JSON.stringify(t.toJS())
      });
    }
  } else {
    var n = e.props.editorState, l = i(n, a(e)), s = l.selectionState;
    s !== n.getSelection() && (n = l.needsRecovery ? o.forceSelection(n, s) : o.acceptSelection(n, s), e.update(n));
  }
};