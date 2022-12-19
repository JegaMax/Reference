'use strict';
Object.defineProperty(t, '__esModule', { value: !0 }), t.default = function (e) {
  return [].slice.call(e.querySelectorAll('*'), 0).filter(i);
};
var r = /input|select|textarea|button|object/;
function o(e) {
  var t = e.offsetWidth <= 0 && e.offsetHeight <= 0;
  if (t && !e.innerHTML)
    return !0;
  var n = window.getComputedStyle(e);
  return t ? 'visible' !== n.getPropertyValue('overflow') || e.scrollWidth <= 0 && e.scrollHeight <= 0 : 'none' == n.getPropertyValue('display');
}
function a(e, t) {
  var n = e.nodeName.toLowerCase();
  return (r.test(n) && !e.disabled || 'a' === n && e.href || t) && function (e) {
    for (var t = e; t && t !== document.body;) {
      if (o(t))
        return !1;
      t = t.parentNode;
    }
    return !0;
  }(e);
}
function i(e) {
  var t = e.getAttribute('tabindex');
  null === t && (t = void 0);
  var n = isNaN(t);
  return (n || t >= 0) && a(e, !n);
}
e.exports = t.default;