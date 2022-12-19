'use strict';
(function (e) {
  var r = n('./13'), o = 'object' == typeof exports && exports && !exports.nodeType && exports, a = o && 'object' == typeof e && e && !e.nodeType && e, i = a && a.exports === o ? r.a.Buffer : void 0, l = i ? i.allocUnsafe : void 0;
  t.a = function (e, t) {
    if (t)
      return e.slice();
    var n = e.length, r = l ? l(n) : new e.constructor(n);
    return e.copy(r), r;
  };
}.call(this, n('./151')(e)));