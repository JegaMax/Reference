'use strict';
Object.defineProperty(t, '__esModule', { value: !0 });
t.calculateChange = function (e, t, n) {
  var r = n.getBoundingClientRect(), o = r.width, a = r.height, i = 'number' == typeof e.pageX ? e.pageX : e.touches[0].pageX, l = 'number' == typeof e.pageY ? e.pageY : e.touches[0].pageY, s = i - (n.getBoundingClientRect().left + window.pageXOffset), c = l - (n.getBoundingClientRect().top + window.pageYOffset);
  s < 0 ? s = 0 : s > o && (s = o), c < 0 ? c = 0 : c > a && (c = a);
  var u = s / o, f = 1 - c / a;
  return {
    h: t.h,
    s: u,
    v: f,
    a: t.a,
    source: 'hsv'
  };
};