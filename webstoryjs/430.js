'use strict';
Object.defineProperty(t, '__esModule', { value: !0 });
t.calculateChange = function (e, t, n, r, o) {
  var a = o.clientWidth, i = o.clientHeight, l = 'number' == typeof e.pageX ? e.pageX : e.touches[0].pageX, s = 'number' == typeof e.pageY ? e.pageY : e.touches[0].pageY, c = l - (o.getBoundingClientRect().left + window.pageXOffset), u = s - (o.getBoundingClientRect().top + window.pageYOffset);
  if ('vertical' === n) {
    var f = void 0;
    if (f = u < 0 ? 0 : u > i ? 1 : Math.round(100 * u / i) / 100, t.a !== f)
      return {
        h: t.h,
        s: t.s,
        l: t.l,
        a: f,
        source: 'rgb'
      };
  } else {
    var d = void 0;
    if (r !== (d = c < 0 ? 0 : c > a ? 1 : Math.round(100 * c / a) / 100))
      return {
        h: t.h,
        s: t.s,
        l: t.l,
        a: d,
        source: 'rgb'
      };
  }
  return null;
};