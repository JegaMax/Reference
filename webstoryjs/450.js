'use strict';
Object.defineProperty(t, '__esModule', { value: !0 }), t.Saturation = void 0;
var r = function () {
    function e(e, t) {
      for (var n = 0; n < t.length; n++) {
        var r = t[n];
        r.enumerable = r.enumerable || !1, r.configurable = !0, 'value' in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
      }
    }
    return function (t, n, r) {
      return n && e(t.prototype, n), r && e(t, r), t;
    };
  }(), o = n('./0'), a = c(o), i = c(n('./6')), l = c(n('./451')), s = function (e) {
    if (e && e.__esModule)
      return e;
    var t = {};
    if (null != e)
      for (var n in e)
        Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
    return t.default = e, t;
  }(n('./454'));
function c(e) {
  return e && e.__esModule ? e : { default: e };
}
var u = t.Saturation = function (e) {
  function Saturation(e) {
    !function (e, t) {
      if (!(e instanceof t))
        throw new TypeError('Cannot call a class as a function');
    }(this, Saturation);
    var t = function (e, t) {
      if (!e)
        throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
      return !t || 'object' != typeof t && 'function' != typeof t ? e : t;
    }(this, (Saturation.__proto__ || Object.getPrototypeOf(Saturation)).call(this, e));
    return t.handleChange = function (e) {
      'function' == typeof t.props.onChange && t.throttle(t.props.onChange, s.calculateChange(e, t.props.hsl, t.container), e);
    }, t.handleMouseDown = function (e) {
      t.handleChange(e);
      var n = t.getContainerRenderWindow();
      n.addEventListener('mousemove', t.handleChange), n.addEventListener('mouseup', t.handleMouseUp);
    }, t.handleMouseUp = function () {
      t.unbindEventListeners();
    }, t.throttle = (0, l.default)(function (e, t, n) {
      e(t, n);
    }, 50), t;
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
  }(Saturation, e), r(Saturation, [
    {
      key: 'componentWillUnmount',
      value: function () {
        this.throttle.cancel(), this.unbindEventListeners();
      }
    },
    {
      key: 'getContainerRenderWindow',
      value: function () {
        for (var e = this.container, t = window; !t.document.contains(e) && t.parent !== t;)
          t = t.parent;
        return t;
      }
    },
    {
      key: 'unbindEventListeners',
      value: function () {
        var e = this.getContainerRenderWindow();
        e.removeEventListener('mousemove', this.handleChange), e.removeEventListener('mouseup', this.handleMouseUp);
      }
    },
    {
      key: 'render',
      value: function () {
        var e = this, t = this.props.style || {}, n = t.color, r = t.white, o = t.black, l = t.pointer, s = t.circle, c = (0, i.default)({
            default: {
              color: {
                absolute: '0px 0px 0px 0px',
                background: 'hsl(' + this.props.hsl.h + ',100%, 50%)',
                borderRadius: this.props.radius
              },
              white: {
                absolute: '0px 0px 0px 0px',
                borderRadius: this.props.radius
              },
              black: {
                absolute: '0px 0px 0px 0px',
                boxShadow: this.props.shadow,
                borderRadius: this.props.radius
              },
              pointer: {
                position: 'absolute',
                top: -100 * this.props.hsv.v + 100 + '%',
                left: 100 * this.props.hsv.s + '%',
                cursor: 'default'
              },
              circle: {
                width: '4px',
                height: '4px',
                boxShadow: '0 0 0 1.5px #fff, inset 0 0 1px 1px rgba(0,0,0,.3),\n            0 0 1px 2px rgba(0,0,0,.4)',
                borderRadius: '50%',
                cursor: 'hand',
                transform: 'translate(-2px, -2px)'
              }
            },
            custom: {
              color: n,
              white: r,
              black: o,
              pointer: l,
              circle: s
            }
          }, { custom: !!this.props.style });
        return a.default.createElement('div', {
          style: c.color,
          ref: function (t) {
            return e.container = t;
          },
          onMouseDown: this.handleMouseDown,
          onTouchMove: this.handleChange,
          onTouchStart: this.handleChange
        }, a.default.createElement('style', null, '\n          .saturation-white {\n            background: -webkit-linear-gradient(to right, #fff, rgba(255,255,255,0));\n            background: linear-gradient(to right, #fff, rgba(255,255,255,0));\n          }\n          .saturation-black {\n            background: -webkit-linear-gradient(to top, #000, rgba(0,0,0,0));\n            background: linear-gradient(to top, #000, rgba(0,0,0,0));\n          }\n        '), a.default.createElement('div', {
          style: c.white,
          className: 'saturation-white'
        }, a.default.createElement('div', {
          style: c.black,
          className: 'saturation-black'
        }), a.default.createElement('div', { style: c.pointer }, this.props.pointer ? a.default.createElement(this.props.pointer, this.props) : a.default.createElement('div', { style: c.circle }))));
      }
    }
  ]), Saturation;
}(o.PureComponent || o.Component);
t.default = u;