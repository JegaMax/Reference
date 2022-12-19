'use strict';
var r = n('./252'), o = n('./21'), a = n('./11'), i = n('./109'), l = n('./110'), s = n('./254'), c = n('./243'), u = n('./237'), f = n('./114'), d = n('./22');
var p = {
  onDragEnd: function (e) {
    e.exitCurrentMode(), h(e);
  },
  onDrop: function (e, t) {
    var n = new r(t.nativeEvent.dataTransfer), u = e._latestEditorState, p = function (e, t) {
        var n = null, r = null, o = l(e.currentTarget);
        if ('function' == typeof o.caretRangeFromPoint) {
          var a = o.caretRangeFromPoint(e.x, e.y);
          n = a.startContainer, r = a.startOffset;
        } else {
          if (!e.rangeParent)
            return null;
          n = e.rangeParent, r = e.rangeOffset;
        }
        n = d(n), r = d(r);
        var s = d(i(n));
        return c(t, s, r, s, r);
      }(t.nativeEvent, u);
    if (t.preventDefault(), e._dragCount = 0, e.exitCurrentMode(), null != p) {
      var m = n.getFiles();
      if (m.length > 0) {
        if (e.props.handleDroppedFiles && f(e.props.handleDroppedFiles(p, m)))
          return;
        s(m, function (t) {
          t && e.update(g(u, p, t));
        });
      } else {
        var b = e._internalDrag ? 'internal' : 'external';
        e.props.handleDrop && f(e.props.handleDrop(p, n, b)) || (e._internalDrag ? e.update(function (e, t) {
          var n = o.moveText(e.getCurrentContent(), e.getSelection(), t);
          return a.push(e, n, 'insert-fragment');
        }(u, p)) : e.update(g(u, p, n.getText()))), h(e);
      }
    }
  }
};
function h(e) {
  e._internalDrag = !1;
  var t = e.editorContainer;
  if (t) {
    var n = new MouseEvent('mouseup', {
      view: u(t),
      bubbles: !0,
      cancelable: !0
    });
    t.dispatchEvent(n);
  }
}
function g(e, t, n) {
  var r = o.insertText(e.getCurrentContent(), t, n, e.getCurrentInlineStyle());
  return a.push(e, r, 'insert-fragment');
}
e.exports = p;