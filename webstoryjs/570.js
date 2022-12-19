'use strict';
var r = n('./56'), o = n('./8').OrderedSet, a = r.substr, i = o();
e.exports = function (e, t) {
  var n = Array(e.length).fill(i);
  return t && t.forEach(function (t) {
    for (var r = a(e, 0, t.offset).length, o = r + a(e, t.offset, t.length).length; r < o;)
      n[r] = n[r].add(t.style), r++;
  }), n;
};