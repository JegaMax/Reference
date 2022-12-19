'use strict';
var r, o, a = n('./317'), i = n('./318'), l = RegExp.prototype.exec, s = String.prototype.replace, c = l, u = (r = /a/, o = /b*/g, l.call(r, 'a'), l.call(o, 'a'), 0 !== r.lastIndex || 0 !== o.lastIndex), f = i.UNSUPPORTED_Y || i.BROKEN_CARET, d = void 0 !== /()??/.exec('')[1];
(u || d || f) && (c = function (e) {
  var t, n, r, o, i = this, c = f && i.sticky, p = a.call(i), h = i.source, g = 0, m = e;
  return c && (-1 === (p = p.replace('y', '')).indexOf('g') && (p += 'g'), m = String(e).slice(i.lastIndex), i.lastIndex > 0 && (!i.multiline || i.multiline && '\n' !== e[i.lastIndex - 1]) && (h = '(?: ' + h + ')', m = ' ' + m, g++), n = new RegExp('^(?:' + h + ')', p)), d && (n = new RegExp('^' + h + '$(?!\\s)', p)), u && (t = i.lastIndex), r = l.call(c ? n : i, m), c ? r ? (r.input = r.input.slice(g), r[0] = r[0].slice(g), r.index = i.lastIndex, i.lastIndex += r[0].length) : i.lastIndex = 0 : u && r && (i.lastIndex = i.global ? r.index + r[0].length : t), d && r && r.length > 1 && s.call(r[0], n, function () {
    for (o = 1; o < arguments.length - 2; o++)
      void 0 === arguments[o] && (r[o] = void 0);
  }), r;
}), e.exports = c;