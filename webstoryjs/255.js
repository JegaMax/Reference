'use strict';
var r = n('./105');
e.exports = function (e) {
  var t = e.getSelection();
  return t.isCollapsed() ? null : r(e.getCurrentContent(), t);
};