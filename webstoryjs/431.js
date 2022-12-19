'use strict';
Object.defineProperty(t, '__esModule', { value: !0 });
var r = {}, o = t.render = function (e, t, n, r) {
    if ('undefined' == typeof document && !r)
      return null;
    var o = r ? new r() : document.createElement('canvas');
    o.width = 2 * n, o.height = 2 * n;
    var a = o.getContext('2d');
    return a ? (a.fillStyle = e, a.fillRect(0, 0, o.width, o.height), a.fillStyle = t, a.fillRect(0, 0, n, n), a.translate(n, n), a.fillRect(0, 0, n, n), o.toDataURL()) : null;
  };
t.get = function (e, t, n, a) {
  var i = e + '-' + t + '-' + n + (a ? '-server' : '');
  if (r[i])
    return r[i];
  var l = o(e, t, n, a);
  return r[i] = l, l;
};