'use strict';
Object.defineProperty(t, '__esModule', { value: !0 }), t.Swatch = void 0;
var r = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, o = s(n('./0')), a = s(n('./6')), i = n('./460'), l = s(n('./152'));
function s(e) {
  return e && e.__esModule ? e : { default: e };
}
var c = t.Swatch = function Swatch(e) {
  var t = e.color, n = e.style, i = e.onClick, s = void 0 === i ? function () {
    } : i, c = e.onHover, u = e.title, f = void 0 === u ? t : u, d = e.children, p = e.focus, h = e.focusStyle, g = void 0 === h ? {} : h, m = 'transparent' === t, b = (0, a.default)({
      default: {
        swatch: r({
          background: t,
          height: '100%',
          width: '100%',
          cursor: 'pointer',
          position: 'relative',
          outline: 'none'
        }, n, p ? g : {})
      }
    }), v = {};
  return c && (v.onMouseOver = function (e) {
    return c(t, e);
  }), o.default.createElement('div', r({
    style: b.swatch,
    onClick: function (e) {
      return s(t, e);
    },
    title: f,
    tabIndex: 0,
    onKeyDown: function (e) {
      return 13 === e.keyCode && s(t, e);
    }
  }, v), d, m && o.default.createElement(l.default, {
    borderRadius: b.swatch.borderRadius,
    boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.1)'
  }));
};
t.default = (0, i.handleFocus)(c);