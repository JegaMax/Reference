'use strict';
Object.defineProperty(t, '__esModule', { value: !0 }), t.handleBlur = c, t.handleFocus = u, t.markForFocusLater = function () {
  i.push(document.activeElement);
}, t.returnFocus = function () {
  var e = null;
  try {
    return void (0 !== i.length && (e = i.pop()).focus());
  } catch (t) {
    console.warn([
      'You tried to return focus to',
      e,
      'but it is not in the DOM anymore'
    ].join(' '));
  }
}, t.popWithoutFocus = function () {
  i.length > 0 && i.pop();
}, t.setupScopedFocus = function (e) {
  l = e, window.addEventListener ? (window.addEventListener('blur', c, !1), document.addEventListener('focus', u, !0)) : (window.attachEvent('onBlur', c), document.attachEvent('onFocus', u));
}, t.teardownScopedFocus = function () {
  l = null, window.addEventListener ? (window.removeEventListener('blur', c), document.removeEventListener('focus', u)) : (window.detachEvent('onBlur', c), document.detachEvent('onFocus', u));
};
var r, o = n('./169'), a = (r = o) && r.__esModule ? r : { default: r };
var i = [], l = null, s = !1;
function c() {
  s = !0;
}
function u() {
  if (s) {
    if (s = !1, !l)
      return;
    setTimeout(function () {
      l.contains(document.activeElement) || ((0, a.default)(l)[0] || l).focus();
    }, 0);
  }
}