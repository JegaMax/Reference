var r;
!function () {
  'use strict';
  var n = {}.hasOwnProperty;
  function o() {
    for (var e = [], t = 0; t < arguments.length; t++) {
      var r = arguments[t];
      if (r) {
        var a = typeof r;
        if ('string' === a || 'number' === a)
          e.push(r);
        else if (Array.isArray(r) && r.length) {
          var i = o.apply(null, r);
          i && e.push(i);
        } else if ('object' === a)
          for (var l in r)
            n.call(r, l) && r[l] && e.push(l);
      }
    }
    return e.join(' ');
  }
  e.exports ? (o.default = o, e.exports = o) : void 0 === (r = function () {
    return o;
  }.apply(t, [])) || (e.exports = r);
}();