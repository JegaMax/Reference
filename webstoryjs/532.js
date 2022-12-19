'use strict';
var r = n('./21'), o = n('./11'), a = n('./112'), i = n('./255'), l = n('./113'), s = n('./533');
e.exports = function (e, t) {
  var n, c = e._latestEditorState, u = c.getSelection(), f = t.target;
  if (u.isCollapsed())
    t.preventDefault();
  else {
    if (s(f)) {
      var d = f;
      n = l(a.getScrollParent(d));
    }
    var p = i(c);
    e.setClipboard(p), e.setMode('cut'), setTimeout(function () {
      e.restoreEditorDOM(n), e.exitCurrentMode(), e.update(function (e) {
        var t = r.removeRange(e.getCurrentContent(), e.getSelection(), 'forward');
        return o.push(e, t, 'remove-range');
      }(c));
    }, 0);
  }
};