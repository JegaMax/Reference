'use strict';
Object.defineProperty(t, '__esModule', { value: !0 }), t.handleFocus = void 0;
var r, o = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, a = function () {
    function e(e, t) {
      for (var n = 0; n < t.length; n++) {
        var r = t[n];
        r.enumerable = r.enumerable || !1, r.configurable = !0, 'value' in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
      }
    }
    return function (t, n, r) {
      return n && e(t.prototype, n), r && e(t, r), t;
    };
  }(), i = n('./0'), l = (r = i) && r.__esModule ? r : { default: r };
function s(e, t) {
  if (!(e instanceof t))
    throw new TypeError('Cannot call a class as a function');
}
function c(e, t) {
  if (!e)
    throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
  return !t || 'object' != typeof t && 'function' != typeof t ? e : t;
}
function u(e, t) {
  if ('function' != typeof t && null !== t)
    throw new TypeError('Super expression must either be null or a function, not ' + typeof t);
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      enumerable: !1,
      writable: !0,
      configurable: !0
    }
  }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
}
t.handleFocus = function (e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 'span';
  return function (n) {
    function Focus() {
      var e, t, n;
      s(this, Focus);
      for (var r = arguments.length, o = Array(r), a = 0; a < r; a++)
        o[a] = arguments[a];
      return t = n = c(this, (e = Focus.__proto__ || Object.getPrototypeOf(Focus)).call.apply(e, [this].concat(o))), n.state = { focus: !1 }, n.handleFocus = function () {
        return n.setState({ focus: !0 });
      }, n.handleBlur = function () {
        return n.setState({ focus: !1 });
      }, c(n, t);
    }
    return u(Focus, n), a(Focus, [{
        key: 'render',
        value: function () {
          return l.default.createElement(t, {
            onFocus: this.handleFocus,
            onBlur: this.handleBlur
          }, l.default.createElement(e, o({}, this.props, this.state)));
        }
      }]), Focus;
  }(l.default.Component);
};