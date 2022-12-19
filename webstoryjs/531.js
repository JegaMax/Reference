'use strict';
var r = n('./255');
e.exports = function (e, t) {
  e._latestEditorState.getSelection().isCollapsed() ? t.preventDefault() : e.setClipboard(r(e._latestEditorState));
};