'use strict';
var r = n('./227'), o = n('./228');
e.exports = function (e, t) {
  var n = t.getStartKey(), a = t.getStartOffset(), i = t.getEndKey(), l = t.getEndOffset(), s = o(e, t).getBlockMap(), c = s.keySeq(), u = c.indexOf(n), f = c.indexOf(i) + 1;
  return r(s.slice(u, f).map(function (e, t) {
    var r = e.getText(), o = e.getCharacterList();
    return n === i ? e.merge({
      text: r.slice(a, l),
      characterList: o.slice(a, l)
    }) : t === n ? e.merge({
      text: r.slice(a),
      characterList: o.slice(a)
    }) : t === i ? e.merge({
      text: r.slice(0, l),
      characterList: o.slice(0, l)
    }) : e;
  }));
};