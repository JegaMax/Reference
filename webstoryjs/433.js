'use strict';
Object.defineProperty(t, '__esModule', { value: !0 }), t.Hue = void 0;
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
  }(), o = n('./0'), a = s(o), i = s(n('./6')), l = function (e) {
    if (e && e.__esModule)
      return e;
    var t = {};
    if (null != e)
      for (var n in e)
        Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
    return t.default = e, t;
  }(n('./434'));
function s(e) {
  return e && e.__esModule ? e : { default: e };
}
function c(e, t) {
  if (!(e instanceof t))
    throw new TypeError('Cannot call a class as a function');
}
function u(e, t) {
  if (!e)
    throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
  return !t || 'object' != typeof t && 'function' != typeof t ? e : t;
}
var f = t.Hue = function (e) {
  function Hue() {
    var e, t, n;
    c(this, Hue);
    for (var r = arguments.length, o = Array(r), a = 0; a < r; a++)
      o[a] = arguments[a];
    return t = n = u(this, (e = Hue.__proto__ || Object.getPrototypeOf(Hue)).call.apply(e, [this].concat(o))), n.handleChange = function (e) {
      var t = l.calculateChange(e, n.props.direction, n.props.hsl, n.container);
      t && 'function' == typeof n.props.onChange && n.props.onChange(t, e);
    }, n.handleMouseDown = function (e) {
      n.handleChange(e), window.addEventListener('mousemove', n.handleChange), window.addEventListener('mouseup', n.handleMouseUp);
    }, n.handleMouseUp = function () {
      n.unbindEventListeners();
    }, u(n, t);
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
  }(Hue, e), r(Hue, [
    {
      key: 'componentWillUnmount',
      value: function () {
        this.unbindEventListeners();
      }
    },
    {
      key: 'unbindEventListeners',
      value: function () {
        window.removeEventListener('mousemove', this.handleChange), window.removeEventListener('mouseup', this.handleMouseUp);
      }
    },
    {
      key: 'render',
      value: function () {
        var e = this, t = this.props.direction, n = void 0 === t ? 'horizontal' : t, r = (0, i.default)({
            default: {
              hue: {
                absolute: '0px 0px 0px 0px',
                borderRadius: this.props.radius,
                boxShadow: this.props.shadow
              },
              container: {
                padding: '0 2px',
                position: 'relative',
                height: '100%',
                borderRadius: this.props.radius
              },
              pointer: {
                position: 'absolute',
                left: 100 * this.props.hsl.h / 360 + '%'
              },
              slider: {
                marginTop: '1px',
                width: '4px',
                borderRadius: '1px',
                height: '8px',
                boxShadow: '0 0 2px rgba(0, 0, 0, .6)',
                background: '#fff',
                transform: 'translateX(-2px)'
              }
            },
            vertical: {
              pointer: {
                left: '0px',
                top: -100 * this.props.hsl.h / 360 + 100 + '%'
              }
            }
          }, { vertical: 'vertical' === n });
        return a.default.createElement('div', { style: r.hue }, a.default.createElement('div', {
          className: 'hue-' + n,
          style: r.container,
          ref: function (t) {
            return e.container = t;
          },
          onMouseDown: this.handleMouseDown,
          onTouchMove: this.handleChange,
          onTouchStart: this.handleChange
        }, a.default.createElement('style', null, '\n            .hue-horizontal {\n              background: linear-gradient(to right, #f00 0%, #ff0 17%, #0f0\n                33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);\n              background: -webkit-linear-gradient(to right, #f00 0%, #ff0\n                17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);\n            }\n\n            .hue-vertical {\n              background: linear-gradient(to top, #f00 0%, #ff0 17%, #0f0 33%,\n                #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);\n              background: -webkit-linear-gradient(to top, #f00 0%, #ff0 17%,\n                #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);\n            }\n          '), a.default.createElement('div', { style: r.pointer }, this.props.pointer ? a.default.createElement(this.props.pointer, this.props) : a.default.createElement('div', { style: r.slider }))));
      }
    }
  ]), Hue;
}(o.PureComponent || o.Component);
t.default = f;