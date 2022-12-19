'use strict';
Object.defineProperty(t, '__esModule', { value: !0 }), t.Alpha = void 0;
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
  }(), a = n('./0'), i = u(a), l = u(n('./6')), s = function (e) {
    if (e && e.__esModule)
      return e;
    var t = {};
    if (null != e)
      for (var n in e)
        Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
    return t.default = e, t;
  }(n('./430')), c = u(n('./152'));
function u(e) {
  return e && e.__esModule ? e : { default: e };
}
function f(e, t) {
  if (!(e instanceof t))
    throw new TypeError('Cannot call a class as a function');
}
function d(e, t) {
  if (!e)
    throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
  return !t || 'object' != typeof t && 'function' != typeof t ? e : t;
}
var p = t.Alpha = function (e) {
  function Alpha() {
    var e, t, n;
    f(this, Alpha);
    for (var r = arguments.length, o = Array(r), a = 0; a < r; a++)
      o[a] = arguments[a];
    return t = n = d(this, (e = Alpha.__proto__ || Object.getPrototypeOf(Alpha)).call.apply(e, [this].concat(o))), n.handleChange = function (e) {
      var t = s.calculateChange(e, n.props.hsl, n.props.direction, n.props.a, n.container);
      t && 'function' == typeof n.props.onChange && n.props.onChange(t, e);
    }, n.handleMouseDown = function (e) {
      n.handleChange(e), window.addEventListener('mousemove', n.handleChange), window.addEventListener('mouseup', n.handleMouseUp);
    }, n.handleMouseUp = function () {
      n.unbindEventListeners();
    }, n.unbindEventListeners = function () {
      window.removeEventListener('mousemove', n.handleChange), window.removeEventListener('mouseup', n.handleMouseUp);
    }, d(n, t);
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
  }(Alpha, e), o(Alpha, [
    {
      key: 'componentWillUnmount',
      value: function () {
        this.unbindEventListeners();
      }
    },
    {
      key: 'render',
      value: function () {
        var e = this, t = this.props.rgb, n = (0, l.default)({
            default: {
              alpha: {
                absolute: '0px 0px 0px 0px',
                borderRadius: this.props.radius
              },
              checkboard: {
                absolute: '0px 0px 0px 0px',
                overflow: 'hidden',
                borderRadius: this.props.radius
              },
              gradient: {
                absolute: '0px 0px 0px 0px',
                background: 'linear-gradient(to right, rgba(' + t.r + ',' + t.g + ',' + t.b + ', 0) 0%,\n           rgba(' + t.r + ',' + t.g + ',' + t.b + ', 1) 100%)',
                boxShadow: this.props.shadow,
                borderRadius: this.props.radius
              },
              container: {
                position: 'relative',
                height: '100%',
                margin: '0 3px'
              },
              pointer: {
                position: 'absolute',
                left: 100 * t.a + '%'
              },
              slider: {
                width: '4px',
                borderRadius: '1px',
                height: '8px',
                boxShadow: '0 0 2px rgba(0, 0, 0, .6)',
                background: '#fff',
                marginTop: '1px',
                transform: 'translateX(-2px)'
              }
            },
            vertical: {
              gradient: { background: 'linear-gradient(to bottom, rgba(' + t.r + ',' + t.g + ',' + t.b + ', 0) 0%,\n           rgba(' + t.r + ',' + t.g + ',' + t.b + ', 1) 100%)' },
              pointer: {
                left: 0,
                top: 100 * t.a + '%'
              }
            },
            overwrite: r({}, this.props.style)
          }, {
            vertical: 'vertical' === this.props.direction,
            overwrite: !0
          });
        return i.default.createElement('div', { style: n.alpha }, i.default.createElement('div', { style: n.checkboard }, i.default.createElement(c.default, { renderers: this.props.renderers })), i.default.createElement('div', { style: n.gradient }), i.default.createElement('div', {
          style: n.container,
          ref: function (t) {
            return e.container = t;
          },
          onMouseDown: this.handleMouseDown,
          onTouchMove: this.handleChange,
          onTouchStart: this.handleChange
        }, i.default.createElement('div', { style: n.pointer }, this.props.pointer ? i.default.createElement(this.props.pointer, this.props) : i.default.createElement('div', { style: n.slider }))));
      }
    }
  ]), Alpha;
}(a.PureComponent || a.Component);
t.default = p;