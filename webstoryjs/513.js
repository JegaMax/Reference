'use strict';
var r = n('./514'), o = n('./515');
function a(e) {
  return null == e ? e : String(e);
}
e.exports = function (e, t) {
  var n;
  if (window.getComputedStyle && (n = window.getComputedStyle(e, null)))
    return a(n.getPropertyValue(o(t)));
  if (document.defaultView && document.defaultView.getComputedStyle) {
    if (n = document.defaultView.getComputedStyle(e, null))
      return a(n.getPropertyValue(o(t)));
    if ('display' === t)
      return 'none';
  }
  return e.currentStyle ? a('float' === t ? e.currentStyle.cssFloat || e.currentStyle.styleFloat : e.currentStyle[r(t)]) : a(e.style && e.style[r(t)]);
};