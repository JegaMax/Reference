'use strict';
var r = Object.prototype.hasOwnProperty;
e.exports = function (e, t, n) {
  if (!e)
    return null;
  var o = {};
  for (var a in e)
    r.call(e, a) && (o[a] = t.call(n, e[a], a, e));
  return o;
};