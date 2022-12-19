'use strict';
var r = n('./56'), o = n('./76'), a = function (e, t) {
    return e === t;
  }, i = function (e) {
    return !!e;
  }, l = [];
e.exports = function (e) {
  var t = e.getCharacterList().map(function (e) {
      return e.getStyle();
    }).toList(), n = t.flatten().toSet().map(function (n) {
      return function (e, t, n) {
        var l = [], s = t.map(function (e) {
            return e.has(n);
          }).toList();
        return o(s, a, i, function (t, o) {
          var a = e.getText();
          l.push({
            offset: r.strlen(a.slice(0, t)),
            length: r.strlen(a.slice(t, o)),
            style: n
          });
        }), l;
      }(e, t, n);
    });
  return Array.prototype.concat.apply(l, n.toJS());
};