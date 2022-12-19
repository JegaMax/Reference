'use strict';
var r = n('./516');
e.exports = function (e) {
  var t = r(e);
  return {
    x: t.left,
    y: t.top,
    width: t.right - t.left,
    height: t.bottom - t.top
  };
};