'use strict';
var r = n('./29'), o = n('./8').List;
e.exports = function (e, t) {
  var n = e.map(function (e, n) {
    var o = t[n];
    return r.create({
      style: e,
      entity: o
    });
  });
  return o(n);
};