'use strict';
Object.defineProperty(t, '__esModule', { value: !0 }), t.hover = void 0;
var r, o = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, a = n('./0'), i = (r = a) && r.__esModule ? r : { default: r };
function l(e, t) {
  if (!(e instanceof t))
    throw new TypeError('Cannot call a class as a function');
}
function s(e, t) {
  if (!e)
    throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
  return !t || 'object' != typeof t && 'function' != typeof t ? e : t;
}
function c(e, t) {
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
var u = t.hover = function (e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 'span';
  return function (n) {
    function Hover() {
      var n, r, a;
      l(this, Hover);
      for (var c = arguments.length, u = Array(c), f = 0; f < c; f++)
        u[f] = arguments[f];
      return r = a = s(this, (n = Hover.__proto__ || Object.getPrototypeOf(Hover)).call.apply(n, [this].concat(u))), a.state = { hover: !1 }, a.handleMouseOver = function () {
        return a.setState({ hover: !0 });
      }, a.handleMouseOut = function () {
        return a.setState({ hover: !1 });
      }, a.render = function () {
        return i.default.createElement(t, {
          onMouseOver: a.handleMouseOver,
          onMouseOut: a.handleMouseOut
        }, i.default.createElement(e, o({}, a.props, a.state)));
      }, s(a, r);
    }
    return c(Hover, n), Hover;
  }(i.default.Component);
};
t.default = u;