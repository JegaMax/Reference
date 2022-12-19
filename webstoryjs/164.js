'use strict';
var r = n('./118'), o = {
    childContextTypes: !0,
    contextType: !0,
    contextTypes: !0,
    defaultProps: !0,
    displayName: !0,
    getDefaultProps: !0,
    getDerivedStateFromError: !0,
    getDerivedStateFromProps: !0,
    mixins: !0,
    propTypes: !0,
    type: !0
  }, a = {
    name: !0,
    length: !0,
    prototype: !0,
    caller: !0,
    callee: !0,
    arguments: !0,
    arity: !0
  }, i = {
    $$typeof: !0,
    compare: !0,
    defaultProps: !0,
    displayName: !0,
    propTypes: !0,
    type: !0
  }, l = {};
function s(e) {
  return r.isMemo(e) ? i : l[e.$$typeof] || o;
}
l[r.ForwardRef] = {
  $$typeof: !0,
  render: !0,
  defaultProps: !0,
  displayName: !0,
  propTypes: !0
}, l[r.Memo] = i;
var c = Object.defineProperty, u = Object.getOwnPropertyNames, f = Object.getOwnPropertySymbols, d = Object.getOwnPropertyDescriptor, p = Object.getPrototypeOf, h = Object.prototype;
e.exports = function e(t, n, r) {
  if ('string' != typeof n) {
    if (h) {
      var o = p(n);
      o && o !== h && e(t, o, r);
    }
    var i = u(n);
    f && (i = i.concat(f(n)));
    for (var l = s(t), g = s(n), m = 0; m < i.length; ++m) {
      var b = i[m];
      if (!(a[b] || r && r[b] || g && g[b] || l && l[b])) {
        var v = d(n, b);
        try {
          c(t, b, v);
        } catch (e) {
        }
      }
    }
  }
  return t;
};