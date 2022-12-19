'use strict';
Object.defineProperty(t, '__esModule', { value: !0 }), t.Checkboard = void 0;
var r = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, o = n('./0'), a = s(o), i = s(n('./6')), l = function (e) {
    if (e && e.__esModule)
      return e;
    var t = {};
    if (null != e)
      for (var n in e)
        Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
    return t.default = e, t;
  }(n('./431'));
function s(e) {
  return e && e.__esModule ? e : { default: e };
}
var c = t.Checkboard = function Checkboard(e) {
  var t = e.white, n = e.grey, s = e.size, c = e.renderers, u = e.borderRadius, f = e.boxShadow, d = e.children, p = (0, i.default)({
      default: {
        grid: {
          borderRadius: u,
          boxShadow: f,
          absolute: '0px 0px 0px 0px',
          background: 'url(' + l.get(t, n, s, c.canvas) + ') center left'
        }
      }
    });
  return (0, o.isValidElement)(d) ? a.default.cloneElement(d, r({}, d.props, { style: r({}, d.props.style, p.grid) })) : a.default.createElement('div', { style: p.grid });
};
c.defaultProps = {
  size: 8,
  white: 'transparent',
  grey: 'rgba(0,0,0,.08)',
  renderers: {}
}, t.default = c;