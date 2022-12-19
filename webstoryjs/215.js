(function (e) {
  var r = n('./33'), o = t && !t.nodeType && t, a = o && 'object' == typeof e && e && !e.nodeType && e, i = a && a.exports === o ? r.Buffer : void 0, l = i ? i.allocUnsafe : void 0;
  e.exports = function (e, t) {
    if (t)
      return e.slice();
    var n = e.length, r = l ? l(n) : new e.constructor(n);
    return e.copy(r), r;
  };
}.call(this, n('./94')(e)));