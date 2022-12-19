'use strict';
Object.defineProperty(t, '__esModule', { value: !0 }), t.default = function (e, t) {
  var n = (0, a.default)(e);
  if (!n.length)
    return void t.preventDefault();
  var r = void 0, o = t.shiftKey, i = n[0], l = n[n.length - 1];
  if (e === document.activeElement) {
    if (!o)
      return;
    r = l;
  }
  l !== document.activeElement || o || (r = i);
  i === document.activeElement && o && (r = l);
  if (r)
    return t.preventDefault(), void r.focus();
  var s = /(\bChrome\b|\bSafari\b)\//.exec(navigator.userAgent);
  if (null == s || 'Chrome' == s[1] || null != /\biPod\b|\biPad\b/g.exec(navigator.userAgent))
    return;
  var c = n.indexOf(document.activeElement);
  c > -1 && (c += o ? -1 : 1);
  if (void 0 === (r = n[c]))
    return t.preventDefault(), void (r = o ? l : i).focus();
  t.preventDefault(), r.focus();
};
var r, o = n('./169'), a = (r = o) && r.__esModule ? r : { default: r };
e.exports = t.default;