'use strict';
var r = n('./11');
e.exports = function (e, t, n) {
  var o = r.undo(t);
  if ('spellcheck-change' !== t.getLastChangeType())
    e.preventDefault(), t.getNativelyRenderedContent() ? (n, setTimeout(function () {
      n(o);
    }, 0)) : n(o);
  else {
    var a = o.getCurrentContent();
    n;
  }
};