'use strict';
Object.defineProperty(t, '__esModule', { value: !0 }), t.isvalidColorString = t.red = t.getContrastingColor = t.isValidHex = t.toState = t.simpleCheckForValidColor = void 0;
var r = a(n('./457')), o = a(n('./65'));
function a(e) {
  return e && e.__esModule ? e : { default: e };
}
t.simpleCheckForValidColor = function (e) {
  var t = 0, n = 0;
  return (0, r.default)([
    'r',
    'g',
    'b',
    'a',
    'h',
    's',
    'l',
    'v'
  ], function (r) {
    if (e[r] && (t += 1, isNaN(e[r]) || (n += 1), 's' === r || 'l' === r)) {
      /^\d+%$/.test(e[r]) && (n += 1);
    }
  }), t === n && e;
};
var i = t.toState = function (e, t) {
  var n = e.hex ? (0, o.default)(e.hex) : (0, o.default)(e), r = n.toHsl(), a = n.toHsv(), i = n.toRgb(), l = n.toHex();
  return 0 === r.s && (r.h = t || 0, a.h = t || 0), {
    hsl: r,
    hex: '000000' === l && 0 === i.a ? 'transparent' : '#' + l,
    rgb: i,
    hsv: a,
    oldHue: e.h || t || r.h,
    source: e.source
  };
};
t.isValidHex = function (e) {
  if ('transparent' === e)
    return !0;
  var t = '#' === String(e).charAt(0) ? 1 : 0;
  return e.length !== 4 + t && e.length < 7 + t && (0, o.default)(e).isValid();
}, t.getContrastingColor = function (e) {
  if (!e)
    return '#fff';
  var t = i(e);
  return 'transparent' === t.hex ? 'rgba(0,0,0,0.4)' : (299 * t.rgb.r + 587 * t.rgb.g + 114 * t.rgb.b) / 1000 >= 128 ? '#000' : '#fff';
}, t.red = {
  hsl: {
    a: 1,
    h: 0,
    l: 0.5,
    s: 1
  },
  hex: '#ff0000',
  rgb: {
    r: 255,
    g: 0,
    b: 0,
    a: 1
  },
  hsv: {
    h: 0,
    s: 1,
    v: 1,
    a: 1
  }
}, t.isvalidColorString = function (e, t) {
  var n = e.replace('\xB0', '');
  return (0, o.default)(t + ' (' + n + ')')._ok;
};