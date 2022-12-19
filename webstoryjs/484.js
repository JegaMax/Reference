'use strict';
e.exports = {
  getRemovalRange: function (e, t, n, r, o) {
    var a = n.split(' ');
    a = a.map(function (e, t) {
      if ('forward' === o) {
        if (t > 0)
          return ' ' + e;
      } else if (t < a.length - 1)
        return e + ' ';
      return e;
    });
    for (var i, l = r, s = null, c = null, u = 0; u < a.length; u++) {
      if (e < (i = l + a[u].length) && l < t)
        null !== s || (s = l), c = i;
      else if (null !== s)
        break;
      l = i;
    }
    var f = r + n.length, d = s === r, p = c === f;
    return (!d && p || d && !p) && ('forward' === o ? c !== f && c++ : s !== r && s--), {
      start: s,
      end: c
    };
  }
};