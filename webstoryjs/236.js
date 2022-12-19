'use strict';
var r = n('./55');
e.exports = function e(t) {
  if (r(t)) {
    var n = t, o = n.getAttribute('data-offset-key');
    if (o)
      return o;
    for (var a = 0; a < n.childNodes.length; a++) {
      var i = e(n.childNodes[a]);
      if (i)
        return i;
    }
  }
  return null;
};