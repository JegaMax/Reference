'use strict';
Object.defineProperty(t, '__esModule', { value: !0 }), t.ColorWrap = void 0;
var r = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, o = function () {
    function e(e, t) {
      for (var n = 0; n < t.length; n++) {
        var r = t[n];
        r.enumerable = r.enumerable || !1, r.configurable = !0, 'value' in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
      }
    }
    return function (t, n, r) {
      return n && e(t.prototype, n), r && e(t, r), t;
    };
  }(), a = n('./0'), i = c(a), l = c(n('./222')), s = function (e) {
    if (e && e.__esModule)
      return e;
    var t = {};
    if (null != e)
      for (var n in e)
        Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
    return t.default = e, t;
  }(n('./456'));
function c(e) {
  return e && e.__esModule ? e : { default: e };
}
var u = t.ColorWrap = function ColorWrap(e) {
  var t = function (t) {
    function ColorPicker(e) {
      !function (e, t) {
        if (!(e instanceof t))
          throw new TypeError('Cannot call a class as a function');
      }(this, ColorPicker);
      var t = function (e, t) {
        if (!e)
          throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
        return !t || 'object' != typeof t && 'function' != typeof t ? e : t;
      }(this, (ColorPicker.__proto__ || Object.getPrototypeOf(ColorPicker)).call(this));
      return t.handleChange = function (e, n) {
        if (s.simpleCheckForValidColor(e)) {
          var r = s.toState(e, e.h || t.state.oldHue);
          t.setState(r), t.props.onChangeComplete && t.debounce(t.props.onChangeComplete, r, n), t.props.onChange && t.props.onChange(r, n);
        }
      }, t.handleSwatchHover = function (e, n) {
        if (s.simpleCheckForValidColor(e)) {
          var r = s.toState(e, e.h || t.state.oldHue);
          t.props.onSwatchHover && t.props.onSwatchHover(r, n);
        }
      }, t.state = r({}, s.toState(e.color, 0)), t.debounce = (0, l.default)(function (e, t, n) {
        e(t, n);
      }, 100), t;
    }
    return function (e, t) {
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
    }(ColorPicker, t), o(ColorPicker, [{
        key: 'render',
        value: function () {
          var t = {};
          return this.props.onSwatchHover && (t.onSwatchHover = this.handleSwatchHover), i.default.createElement(e, r({}, this.props, this.state, { onChange: this.handleChange }, t));
        }
      }], [{
        key: 'getDerivedStateFromProps',
        value: function (e, t) {
          return r({}, s.toState(e.color, t.oldHue));
        }
      }]), ColorPicker;
  }(a.PureComponent || a.Component);
  return t.propTypes = r({}, e.propTypes), t.defaultProps = r({}, e.defaultProps, {
    color: {
      h: 250,
      s: 0.5,
      l: 0.2,
      a: 1
    }
  }), t;
};
t.default = u;