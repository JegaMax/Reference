'use strict';
Object.defineProperty(t, '__esModule', { value: !0 });
t.calculateChange = function (e, t, n, r) {
  var o = r.clientWidth, a = r.clientHeight, i = 'number' == typeof e.pageX ? e.pageX : e.touches[0].pageX, l = 'number' == typeof e.pageY ? e.pageY : e.touches[0].pageY, s = i - (r.getBoundingClientRect().left + window.pageXOffset), c = l - (r.getBoundingClientRect().top + window.pageYOffset);
  if ('vertical' === t) {
    var u = void 0;
    if (c < 0)
      u = 359;
    else if (c > a)
      u = 0;
    else {
      u = 360 * (-100 * c / a + 100) / 100;
    }
    if (n.h !== u)
      return {
        h: u,
        s: n.s,
        l: n.l,
        a: n.a,
        source: 'hsl'
      };
  } else {
    var f = void 0;
    if (s < 0)
      f = 0;
    else if (s > o)
      f = 359;
    else {
      f = 360 * (100 * s / o) / 100;
    }
    if (n.h !== f)
      return {
        h: f,
        s: n.s,
        l: n.l,
        a: n.a,
        source: 'hsl'
      };
  }
  return null;
};