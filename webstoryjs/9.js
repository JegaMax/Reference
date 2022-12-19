'use strict';
var r = function (e) {
};
e.exports = function (e, t) {
  for (var n = arguments.length, o = new Array(n > 2 ? n - 2 : 0), a = 2; a < n; a++)
    o[a - 2] = arguments[a];
  if (r(t), !e) {
    var i;
    if (void 0 === t)
      i = new Error('Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.');
    else {
      var l = 0;
      (i = new Error(t.replace(/%s/g, function () {
        return String(o[l++]);
      }))).name = 'Invariant Violation';
    }
    throw i.framesToPop = 1, i;
  }
};