'use strict';
var r = n('./27');
function RE(e, t) {
  return RegExp(e, t);
}
t.UNSUPPORTED_Y = r(function () {
  var e = RE('a', 'y');
  return e.lastIndex = 2, null != e.exec('abcd');
}), t.BROKEN_CARET = r(function () {
  var e = RE('^r', 'gy');
  return e.lastIndex = 2, null != e.exec('str');
});