'use strict';
Object.defineProperty(t, '__esModule', { value: !0 }), t.assertNodeList = s, t.setElement = function (e) {
  var t = e;
  if ('string' == typeof t && i.canUseDOM) {
    var n = document.querySelectorAll(t);
    s(n, t), t = 'length' in n ? n[0] : n;
  }
  return l = t || l;
}, t.validateElement = c, t.hide = function (e) {
  c(e) && (e || l).setAttribute('aria-hidden', 'true');
}, t.show = function (e) {
  c(e) && (e || l).removeAttribute('aria-hidden');
}, t.documentNotReadyOrSSRTesting = function () {
  l = null;
}, t.resetForTesting = function () {
  l = null;
};
var r, o = n('./287'), a = (r = o) && r.__esModule ? r : { default: r }, i = n('./122');
var l = null;
function s(e, t) {
  if (!e || !e.length)
    throw new Error('react-modal: No elements were found for selector ' + t + '.');
}
function c(e) {
  return !(!e && !l) || ((0, a.default)(!1, [
    'react-modal: App element is not defined.',
    'Please use `Modal.setAppElement(el)` or set `appElement={el}`.',
    'This is needed so screen readers don\'t see main content',
    'when modal is opened. It is not recommended, but you can opt-out',
    'by setting `ariaHideApp={false}`.'
  ].join(' ')), !1);
}