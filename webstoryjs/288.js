var r;
!function () {
  'use strict';
  var o = !('undefined' == typeof window || !window.document || !window.document.createElement), a = {
      canUseDOM: o,
      canUseWorkers: 'undefined' != typeof Worker,
      canUseEventListeners: o && !(!window.addEventListener && !window.attachEvent),
      canUseViewport: o && !!window.screen
    };
  void 0 === (r = function () {
    return a;
  }.call(t, n, t, e)) || (e.exports = r);
}();