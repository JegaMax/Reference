'use strict';
var r = n('./264'), o = n('./56').strlen;
e.exports = function (e, t) {
  var n = [];
  return e.findEntityRanges(function (e) {
    return !!e.getEntity();
  }, function (a, i) {
    var l = e.getText(), s = e.getEntityAt(a);
    n.push({
      offset: o(l.slice(0, a)),
      length: o(l.slice(a, i)),
      key: Number(t[r.stringify(s)])
    });
  }), n;
};