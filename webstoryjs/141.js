(function (e) {
  var r = n('./191'), o = t && !t.nodeType && t, a = o && 'object' == typeof e && e && !e.nodeType && e, i = a && a.exports === o && r.process, l = function () {
      try {
        var e = a && a.require && a.require('util').types;
        return e || i && i.binding && i.binding('util');
      } catch (e) {
      }
    }();
  e.exports = l;
}.call(this, n('./94')(e)));