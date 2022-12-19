'use strict';
var r = {}, o = Math.pow(2, 24);
e.exports = function () {
  for (var e; void 0 === e || r.hasOwnProperty(e) || !isNaN(+e);)
    e = Math.floor(Math.random() * o).toString(32);
  return r[e] = !0, e;
};