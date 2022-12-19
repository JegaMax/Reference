'use strict';
Object.defineProperty(t, '__esModule', { value: !0 }), t.active = void 0;
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
var u = t.active = function (e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 'span';
  return function (n) {
    function Active() {
      var n, r, a;
      l(this, Active);
      for (var c = arguments.length, u = Array(c), f = 0; f < c; f++)
        u[f] = arguments[f];
      return r = a = s(this, (n = Active.__proto__ || Object.getPrototypeOf(Active)).call.apply(n, [this].concat(u))), a.state = { active: !1 }, a.handleMouseDown = function () {
        return a.setState({ active: !0 });
      }, a.handleMouseUp = function () {
        return a.setState({ active: !1 });
      }, a.render = function () {
        return i.default.createElement(t, {
          onMouseDown: a.handleMouseDown,
          onMouseUp: a.handleMouseUp
        }, i.default.createElement(e, o({}, a.props, a.state)));
      }, s(a, r);
    }
    return c(Active, n), Active;
  }(i.default.Component);
};
t.default = u;