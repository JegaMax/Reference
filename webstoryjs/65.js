var r;
!function (o) {
  var a = /^\s+/, i = /\s+$/, l = 0, s = o.round, c = o.min, u = o.max, f = o.random;
  function d(e, t) {
    if (t = t || {}, (e = e || '') instanceof d)
      return e;
    if (!(this instanceof d))
      return new d(e, t);
    var n = function (e) {
      var t = {
          r: 0,
          g: 0,
          b: 0
        }, n = 1, r = null, l = null, s = null, f = !1, d = !1;
      'string' == typeof e && (e = function (e) {
        e = e.replace(a, '').replace(i, '').toLowerCase();
        var t, n = !1;
        if (M[e])
          e = M[e], n = !0;
        else if ('transparent' == e)
          return {
            r: 0,
            g: 0,
            b: 0,
            a: 0,
            format: 'name'
          };
        if (t = W.rgb.exec(e))
          return {
            r: t[1],
            g: t[2],
            b: t[3]
          };
        if (t = W.rgba.exec(e))
          return {
            r: t[1],
            g: t[2],
            b: t[3],
            a: t[4]
          };
        if (t = W.hsl.exec(e))
          return {
            h: t[1],
            s: t[2],
            l: t[3]
          };
        if (t = W.hsla.exec(e))
          return {
            h: t[1],
            s: t[2],
            l: t[3],
            a: t[4]
          };
        if (t = W.hsv.exec(e))
          return {
            h: t[1],
            s: t[2],
            v: t[3]
          };
        if (t = W.hsva.exec(e))
          return {
            h: t[1],
            s: t[2],
            v: t[3],
            a: t[4]
          };
        if (t = W.hex8.exec(e))
          return {
            r: R(t[1]),
            g: R(t[2]),
            b: R(t[3]),
            a: B(t[4]),
            format: n ? 'name' : 'hex8'
          };
        if (t = W.hex6.exec(e))
          return {
            r: R(t[1]),
            g: R(t[2]),
            b: R(t[3]),
            format: n ? 'name' : 'hex'
          };
        if (t = W.hex4.exec(e))
          return {
            r: R(t[1] + '' + t[1]),
            g: R(t[2] + '' + t[2]),
            b: R(t[3] + '' + t[3]),
            a: B(t[4] + '' + t[4]),
            format: n ? 'name' : 'hex8'
          };
        if (t = W.hex3.exec(e))
          return {
            r: R(t[1] + '' + t[1]),
            g: R(t[2] + '' + t[2]),
            b: R(t[3] + '' + t[3]),
            format: n ? 'name' : 'hex'
          };
        return !1;
      }(e));
      'object' == typeof e && (V(e.r) && V(e.g) && V(e.b) ? (p = e.r, h = e.g, g = e.b, t = {
        r: 255 * P(p, 255),
        g: 255 * P(h, 255),
        b: 255 * P(g, 255)
      }, f = !0, d = '%' === String(e.r).substr(-1) ? 'prgb' : 'rgb') : V(e.h) && V(e.s) && V(e.v) ? (r = z(e.s), l = z(e.v), t = function (e, t, n) {
        e = 6 * P(e, 360), t = P(t, 100), n = P(n, 100);
        var r = o.floor(e), a = e - r, i = n * (1 - t), l = n * (1 - a * t), s = n * (1 - (1 - a) * t), c = r % 6;
        return {
          r: 255 * [
            n,
            l,
            i,
            i,
            s,
            n
          ][c],
          g: 255 * [
            s,
            n,
            n,
            l,
            i,
            i
          ][c],
          b: 255 * [
            i,
            i,
            s,
            n,
            n,
            l
          ][c]
        };
      }(e.h, r, l), f = !0, d = 'hsv') : V(e.h) && V(e.s) && V(e.l) && (r = z(e.s), s = z(e.l), t = function (e, t, n) {
        var r, o, a;
        function i(e, t, n) {
          return n < 0 && (n += 1), n > 1 && (n -= 1), n < 1 / 6 ? e + 6 * (t - e) * n : n < 0.5 ? t : n < 2 / 3 ? e + (t - e) * (2 / 3 - n) * 6 : e;
        }
        if (e = P(e, 360), t = P(t, 100), n = P(n, 100), 0 === t)
          r = o = a = n;
        else {
          var l = n < 0.5 ? n * (1 + t) : n + t - n * t, s = 2 * n - l;
          r = i(s, l, e + 1 / 3), o = i(s, l, e), a = i(s, l, e - 1 / 3);
        }
        return {
          r: 255 * r,
          g: 255 * o,
          b: 255 * a
        };
      }(e.h, r, s), f = !0, d = 'hsl'), e.hasOwnProperty('a') && (n = e.a));
      var p, h, g;
      return n = T(n), {
        ok: f,
        format: e.format || d,
        r: c(255, u(t.r, 0)),
        g: c(255, u(t.g, 0)),
        b: c(255, u(t.b, 0)),
        a: n
      };
    }(e);
    this._originalInput = e, this._r = n.r, this._g = n.g, this._b = n.b, this._a = n.a, this._roundA = s(100 * this._a) / 100, this._format = t.format || n.format, this._gradientType = t.gradientType, this._r < 1 && (this._r = s(this._r)), this._g < 1 && (this._g = s(this._g)), this._b < 1 && (this._b = s(this._b)), this._ok = n.ok, this._tc_id = l++;
  }
  function p(e, t, n) {
    e = P(e, 255), t = P(t, 255), n = P(n, 255);
    var r, o, a = u(e, t, n), i = c(e, t, n), l = (a + i) / 2;
    if (a == i)
      r = o = 0;
    else {
      var s = a - i;
      switch (o = l > 0.5 ? s / (2 - a - i) : s / (a + i), a) {
      case e:
        r = (t - n) / s + (t < n ? 6 : 0);
        break;
      case t:
        r = (n - e) / s + 2;
        break;
      case n:
        r = (e - t) / s + 4;
      }
      r /= 6;
    }
    return {
      h: r,
      s: o,
      l: l
    };
  }
  function h(e, t, n) {
    e = P(e, 255), t = P(t, 255), n = P(n, 255);
    var r, o, a = u(e, t, n), i = c(e, t, n), l = a, s = a - i;
    if (o = 0 === a ? 0 : s / a, a == i)
      r = 0;
    else {
      switch (a) {
      case e:
        r = (t - n) / s + (t < n ? 6 : 0);
        break;
      case t:
        r = (n - e) / s + 2;
        break;
      case n:
        r = (e - t) / s + 4;
      }
      r /= 6;
    }
    return {
      h: r,
      s: o,
      v: l
    };
  }
  function g(e, t, n, r) {
    var o = [
      N(s(e).toString(16)),
      N(s(t).toString(16)),
      N(s(n).toString(16))
    ];
    return r && o[0].charAt(0) == o[0].charAt(1) && o[1].charAt(0) == o[1].charAt(1) && o[2].charAt(0) == o[2].charAt(1) ? o[0].charAt(0) + o[1].charAt(0) + o[2].charAt(0) : o.join('');
  }
  function m(e, t, n, r) {
    return [
      N(L(r)),
      N(s(e).toString(16)),
      N(s(t).toString(16)),
      N(s(n).toString(16))
    ].join('');
  }
  function b(e, t) {
    t = 0 === t ? 0 : t || 10;
    var n = d(e).toHsl();
    return n.s -= t / 100, n.s = D(n.s), d(n);
  }
  function v(e, t) {
    t = 0 === t ? 0 : t || 10;
    var n = d(e).toHsl();
    return n.s += t / 100, n.s = D(n.s), d(n);
  }
  function y(e) {
    return d(e).desaturate(100);
  }
  function C(e, t) {
    t = 0 === t ? 0 : t || 10;
    var n = d(e).toHsl();
    return n.l += t / 100, n.l = D(n.l), d(n);
  }
  function w(e, t) {
    t = 0 === t ? 0 : t || 10;
    var n = d(e).toRgb();
    return n.r = u(0, c(255, n.r - s(-t / 100 * 255))), n.g = u(0, c(255, n.g - s(-t / 100 * 255))), n.b = u(0, c(255, n.b - s(-t / 100 * 255))), d(n);
  }
  function x(e, t) {
    t = 0 === t ? 0 : t || 10;
    var n = d(e).toHsl();
    return n.l -= t / 100, n.l = D(n.l), d(n);
  }
  function E(e, t) {
    var n = d(e).toHsl(), r = (n.h + t) % 360;
    return n.h = r < 0 ? 360 + r : r, d(n);
  }
  function _(e) {
    var t = d(e).toHsl();
    return t.h = (t.h + 180) % 360, d(t);
  }
  function O(e) {
    var t = d(e).toHsl(), n = t.h;
    return [
      d(e),
      d({
        h: (n + 120) % 360,
        s: t.s,
        l: t.l
      }),
      d({
        h: (n + 240) % 360,
        s: t.s,
        l: t.l
      })
    ];
  }
  function S(e) {
    var t = d(e).toHsl(), n = t.h;
    return [
      d(e),
      d({
        h: (n + 90) % 360,
        s: t.s,
        l: t.l
      }),
      d({
        h: (n + 180) % 360,
        s: t.s,
        l: t.l
      }),
      d({
        h: (n + 270) % 360,
        s: t.s,
        l: t.l
      })
    ];
  }
  function k(e) {
    var t = d(e).toHsl(), n = t.h;
    return [
      d(e),
      d({
        h: (n + 72) % 360,
        s: t.s,
        l: t.l
      }),
      d({
        h: (n + 216) % 360,
        s: t.s,
        l: t.l
      })
    ];
  }
  function A(e, t, n) {
    t = t || 6, n = n || 30;
    var r = d(e).toHsl(), o = 360 / n, a = [d(e)];
    for (r.h = (r.h - (o * t >> 1) + 720) % 360; --t;)
      r.h = (r.h + o) % 360, a.push(d(r));
    return a;
  }
  function j(e, t) {
    t = t || 6;
    for (var n = d(e).toHsv(), r = n.h, o = n.s, a = n.v, i = [], l = 1 / t; t--;)
      i.push(d({
        h: r,
        s: o,
        v: a
      })), a = (a + l) % 1;
    return i;
  }
  d.prototype = {
    isDark: function () {
      return this.getBrightness() < 128;
    },
    isLight: function () {
      return !this.isDark();
    },
    isValid: function () {
      return this._ok;
    },
    getOriginalInput: function () {
      return this._originalInput;
    },
    getFormat: function () {
      return this._format;
    },
    getAlpha: function () {
      return this._a;
    },
    getBrightness: function () {
      var e = this.toRgb();
      return (299 * e.r + 587 * e.g + 114 * e.b) / 1000;
    },
    getLuminance: function () {
      var e, t, n, r = this.toRgb();
      return e = r.r / 255, t = r.g / 255, n = r.b / 255, 0.2126 * (e <= 0.03928 ? e / 12.92 : o.pow((e + 0.055) / 1.055, 2.4)) + 0.7152 * (t <= 0.03928 ? t / 12.92 : o.pow((t + 0.055) / 1.055, 2.4)) + 0.0722 * (n <= 0.03928 ? n / 12.92 : o.pow((n + 0.055) / 1.055, 2.4));
    },
    setAlpha: function (e) {
      return this._a = T(e), this._roundA = s(100 * this._a) / 100, this;
    },
    toHsv: function () {
      var e = h(this._r, this._g, this._b);
      return {
        h: 360 * e.h,
        s: e.s,
        v: e.v,
        a: this._a
      };
    },
    toHsvString: function () {
      var e = h(this._r, this._g, this._b), t = s(360 * e.h), n = s(100 * e.s), r = s(100 * e.v);
      return 1 == this._a ? 'hsv(' + t + ', ' + n + '%, ' + r + '%)' : 'hsva(' + t + ', ' + n + '%, ' + r + '%, ' + this._roundA + ')';
    },
    toHsl: function () {
      var e = p(this._r, this._g, this._b);
      return {
        h: 360 * e.h,
        s: e.s,
        l: e.l,
        a: this._a
      };
    },
    toHslString: function () {
      var e = p(this._r, this._g, this._b), t = s(360 * e.h), n = s(100 * e.s), r = s(100 * e.l);
      return 1 == this._a ? 'hsl(' + t + ', ' + n + '%, ' + r + '%)' : 'hsla(' + t + ', ' + n + '%, ' + r + '%, ' + this._roundA + ')';
    },
    toHex: function (e) {
      return g(this._r, this._g, this._b, e);
    },
    toHexString: function (e) {
      return '#' + this.toHex(e);
    },
    toHex8: function (e) {
      return function (e, t, n, r, o) {
        var a = [
          N(s(e).toString(16)),
          N(s(t).toString(16)),
          N(s(n).toString(16)),
          N(L(r))
        ];
        if (o && a[0].charAt(0) == a[0].charAt(1) && a[1].charAt(0) == a[1].charAt(1) && a[2].charAt(0) == a[2].charAt(1) && a[3].charAt(0) == a[3].charAt(1))
          return a[0].charAt(0) + a[1].charAt(0) + a[2].charAt(0) + a[3].charAt(0);
        return a.join('');
      }(this._r, this._g, this._b, this._a, e);
    },
    toHex8String: function (e) {
      return '#' + this.toHex8(e);
    },
    toRgb: function () {
      return {
        r: s(this._r),
        g: s(this._g),
        b: s(this._b),
        a: this._a
      };
    },
    toRgbString: function () {
      return 1 == this._a ? 'rgb(' + s(this._r) + ', ' + s(this._g) + ', ' + s(this._b) + ')' : 'rgba(' + s(this._r) + ', ' + s(this._g) + ', ' + s(this._b) + ', ' + this._roundA + ')';
    },
    toPercentageRgb: function () {
      return {
        r: s(100 * P(this._r, 255)) + '%',
        g: s(100 * P(this._g, 255)) + '%',
        b: s(100 * P(this._b, 255)) + '%',
        a: this._a
      };
    },
    toPercentageRgbString: function () {
      return 1 == this._a ? 'rgb(' + s(100 * P(this._r, 255)) + '%, ' + s(100 * P(this._g, 255)) + '%, ' + s(100 * P(this._b, 255)) + '%)' : 'rgba(' + s(100 * P(this._r, 255)) + '%, ' + s(100 * P(this._g, 255)) + '%, ' + s(100 * P(this._b, 255)) + '%, ' + this._roundA + ')';
    },
    toName: function () {
      return 0 === this._a ? 'transparent' : !(this._a < 1) && (I[g(this._r, this._g, this._b, !0)] || !1);
    },
    toFilter: function (e) {
      var t = '#' + m(this._r, this._g, this._b, this._a), n = t, r = this._gradientType ? 'GradientType = 1, ' : '';
      if (e) {
        var o = d(e);
        n = '#' + m(o._r, o._g, o._b, o._a);
      }
      return 'progid:DXImageTransform.Microsoft.gradient(' + r + 'startColorstr=' + t + ',endColorstr=' + n + ')';
    },
    toString: function (e) {
      var t = !!e;
      e = e || this._format;
      var n = !1, r = this._a < 1 && this._a >= 0;
      return t || !r || 'hex' !== e && 'hex6' !== e && 'hex3' !== e && 'hex4' !== e && 'hex8' !== e && 'name' !== e ? ('rgb' === e && (n = this.toRgbString()), 'prgb' === e && (n = this.toPercentageRgbString()), 'hex' !== e && 'hex6' !== e || (n = this.toHexString()), 'hex3' === e && (n = this.toHexString(!0)), 'hex4' === e && (n = this.toHex8String(!0)), 'hex8' === e && (n = this.toHex8String()), 'name' === e && (n = this.toName()), 'hsl' === e && (n = this.toHslString()), 'hsv' === e && (n = this.toHsvString()), n || this.toHexString()) : 'name' === e && 0 === this._a ? this.toName() : this.toRgbString();
    },
    clone: function () {
      return d(this.toString());
    },
    _applyModification: function (e, t) {
      var n = e.apply(null, [this].concat([].slice.call(t)));
      return this._r = n._r, this._g = n._g, this._b = n._b, this.setAlpha(n._a), this;
    },
    lighten: function () {
      return this._applyModification(C, arguments);
    },
    brighten: function () {
      return this._applyModification(w, arguments);
    },
    darken: function () {
      return this._applyModification(x, arguments);
    },
    desaturate: function () {
      return this._applyModification(b, arguments);
    },
    saturate: function () {
      return this._applyModification(v, arguments);
    },
    greyscale: function () {
      return this._applyModification(y, arguments);
    },
    spin: function () {
      return this._applyModification(E, arguments);
    },
    _applyCombination: function (e, t) {
      return e.apply(null, [this].concat([].slice.call(t)));
    },
    analogous: function () {
      return this._applyCombination(A, arguments);
    },
    complement: function () {
      return this._applyCombination(_, arguments);
    },
    monochromatic: function () {
      return this._applyCombination(j, arguments);
    },
    splitcomplement: function () {
      return this._applyCombination(k, arguments);
    },
    triad: function () {
      return this._applyCombination(O, arguments);
    },
    tetrad: function () {
      return this._applyCombination(S, arguments);
    }
  }, d.fromRatio = function (e, t) {
    if ('object' == typeof e) {
      var n = {};
      for (var r in e)
        e.hasOwnProperty(r) && (n[r] = 'a' === r ? e[r] : z(e[r]));
      e = n;
    }
    return d(e, t);
  }, d.equals = function (e, t) {
    return !(!e || !t) && d(e).toRgbString() == d(t).toRgbString();
  }, d.random = function () {
    return d.fromRatio({
      r: f(),
      g: f(),
      b: f()
    });
  }, d.mix = function (e, t, n) {
    n = 0 === n ? 0 : n || 50;
    var r = d(e).toRgb(), o = d(t).toRgb(), a = n / 100;
    return d({
      r: (o.r - r.r) * a + r.r,
      g: (o.g - r.g) * a + r.g,
      b: (o.b - r.b) * a + r.b,
      a: (o.a - r.a) * a + r.a
    });
  }, d.readability = function (e, t) {
    var n = d(e), r = d(t);
    return (o.max(n.getLuminance(), r.getLuminance()) + 0.05) / (o.min(n.getLuminance(), r.getLuminance()) + 0.05);
  }, d.isReadable = function (e, t, n) {
    var r, o, a = d.readability(e, t);
    switch (o = !1, (r = function (e) {
        var t, n;
        t = ((e = e || {
          level: 'AA',
          size: 'small'
        }).level || 'AA').toUpperCase(), n = (e.size || 'small').toLowerCase(), 'AA' !== t && 'AAA' !== t && (t = 'AA');
        'small' !== n && 'large' !== n && (n = 'small');
        return {
          level: t,
          size: n
        };
      }(n)).level + r.size) {
    case 'AAsmall':
    case 'AAAlarge':
      o = a >= 4.5;
      break;
    case 'AAlarge':
      o = a >= 3;
      break;
    case 'AAAsmall':
      o = a >= 7;
    }
    return o;
  }, d.mostReadable = function (e, t, n) {
    var r, o, a, i, l = null, s = 0;
    o = (n = n || {}).includeFallbackColors, a = n.level, i = n.size;
    for (var c = 0; c < t.length; c++)
      (r = d.readability(e, t[c])) > s && (s = r, l = d(t[c]));
    return d.isReadable(e, l, {
      level: a,
      size: i
    }) || !o ? l : (n.includeFallbackColors = !1, d.mostReadable(e, [
      '#fff',
      '#000'
    ], n));
  };
  var M = d.names = {
      aliceblue: 'f0f8ff',
      antiquewhite: 'faebd7',
      aqua: '0ff',
      aquamarine: '7fffd4',
      azure: 'f0ffff',
      beige: 'f5f5dc',
      bisque: 'ffe4c4',
      black: '000',
      blanchedalmond: 'ffebcd',
      blue: '00f',
      blueviolet: '8a2be2',
      brown: 'a52a2a',
      burlywood: 'deb887',
      burntsienna: 'ea7e5d',
      cadetblue: '5f9ea0',
      chartreuse: '7fff00',
      chocolate: 'd2691e',
      coral: 'ff7f50',
      cornflowerblue: '6495ed',
      cornsilk: 'fff8dc',
      crimson: 'dc143c',
      cyan: '0ff',
      darkblue: '00008b',
      darkcyan: '008b8b',
      darkgoldenrod: 'b8860b',
      darkgray: 'a9a9a9',
      darkgreen: '006400',
      darkgrey: 'a9a9a9',
      darkkhaki: 'bdb76b',
      darkmagenta: '8b008b',
      darkolivegreen: '556b2f',
      darkorange: 'ff8c00',
      darkorchid: '9932cc',
      darkred: '8b0000',
      darksalmon: 'e9967a',
      darkseagreen: '8fbc8f',
      darkslateblue: '483d8b',
      darkslategray: '2f4f4f',
      darkslategrey: '2f4f4f',
      darkturquoise: '00ced1',
      darkviolet: '9400d3',
      deeppink: 'ff1493',
      deepskyblue: '00bfff',
      dimgray: '696969',
      dimgrey: '696969',
      dodgerblue: '1e90ff',
      firebrick: 'b22222',
      floralwhite: 'fffaf0',
      forestgreen: '228b22',
      fuchsia: 'f0f',
      gainsboro: 'dcdcdc',
      ghostwhite: 'f8f8ff',
      gold: 'ffd700',
      goldenrod: 'daa520',
      gray: '808080',
      green: '008000',
      greenyellow: 'adff2f',
      grey: '808080',
      honeydew: 'f0fff0',
      hotpink: 'ff69b4',
      indianred: 'cd5c5c',
      indigo: '4b0082',
      ivory: 'fffff0',
      khaki: 'f0e68c',
      lavender: 'e6e6fa',
      lavenderblush: 'fff0f5',
      lawngreen: '7cfc00',
      lemonchiffon: 'fffacd',
      lightblue: 'add8e6',
      lightcoral: 'f08080',
      lightcyan: 'e0ffff',
      lightgoldenrodyellow: 'fafad2',
      lightgray: 'd3d3d3',
      lightgreen: '90ee90',
      lightgrey: 'd3d3d3',
      lightpink: 'ffb6c1',
      lightsalmon: 'ffa07a',
      lightseagreen: '20b2aa',
      lightskyblue: '87cefa',
      lightslategray: '789',
      lightslategrey: '789',
      lightsteelblue: 'b0c4de',
      lightyellow: 'ffffe0',
      lime: '0f0',
      limegreen: '32cd32',
      linen: 'faf0e6',
      magenta: 'f0f',
      maroon: '800000',
      mediumaquamarine: '66cdaa',
      mediumblue: '0000cd',
      mediumorchid: 'ba55d3',
      mediumpurple: '9370db',
      mediumseagreen: '3cb371',
      mediumslateblue: '7b68ee',
      mediumspringgreen: '00fa9a',
      mediumturquoise: '48d1cc',
      mediumvioletred: 'c71585',
      midnightblue: '191970',
      mintcream: 'f5fffa',
      mistyrose: 'ffe4e1',
      moccasin: 'ffe4b5',
      navajowhite: 'ffdead',
      navy: '000080',
      oldlace: 'fdf5e6',
      olive: '808000',
      olivedrab: '6b8e23',
      orange: 'ffa500',
      orangered: 'ff4500',
      orchid: 'da70d6',
      palegoldenrod: 'eee8aa',
      palegreen: '98fb98',
      paleturquoise: 'afeeee',
      palevioletred: 'db7093',
      papayawhip: 'ffefd5',
      peachpuff: 'ffdab9',
      peru: 'cd853f',
      pink: 'ffc0cb',
      plum: 'dda0dd',
      powderblue: 'b0e0e6',
      purple: '800080',
      rebeccapurple: '663399',
      red: 'f00',
      rosybrown: 'bc8f8f',
      royalblue: '4169e1',
      saddlebrown: '8b4513',
      salmon: 'fa8072',
      sandybrown: 'f4a460',
      seagreen: '2e8b57',
      seashell: 'fff5ee',
      sienna: 'a0522d',
      silver: 'c0c0c0',
      skyblue: '87ceeb',
      slateblue: '6a5acd',
      slategray: '708090',
      slategrey: '708090',
      snow: 'fffafa',
      springgreen: '00ff7f',
      steelblue: '4682b4',
      tan: 'd2b48c',
      teal: '008080',
      thistle: 'd8bfd8',
      tomato: 'ff6347',
      turquoise: '40e0d0',
      violet: 'ee82ee',
      wheat: 'f5deb3',
      white: 'fff',
      whitesmoke: 'f5f5f5',
      yellow: 'ff0',
      yellowgreen: '9acd32'
    }, I = d.hexNames = function (e) {
      var t = {};
      for (var n in e)
        e.hasOwnProperty(n) && (t[e[n]] = n);
      return t;
    }(M);
  function T(e) {
    return e = parseFloat(e), (isNaN(e) || e < 0 || e > 1) && (e = 1), e;
  }
  function P(e, t) {
    (function (e) {
      return 'string' == typeof e && -1 != e.indexOf('.') && 1 === parseFloat(e);
    }(e) && (e = '100%'));
    var n = function (e) {
      return 'string' == typeof e && -1 != e.indexOf('%');
    }(e);
    return e = c(t, u(0, parseFloat(e))), n && (e = parseInt(e * t, 10) / 100), o.abs(e - t) < 0.000001 ? 1 : e % t / parseFloat(t);
  }
  function D(e) {
    return c(1, u(0, e));
  }
  function R(e) {
    return parseInt(e, 16);
  }
  function N(e) {
    return 1 == e.length ? '0' + e : '' + e;
  }
  function z(e) {
    return e <= 1 && (e = 100 * e + '%'), e;
  }
  function L(e) {
    return o.round(255 * parseFloat(e)).toString(16);
  }
  function B(e) {
    return R(e) / 255;
  }
  var F, H, U, W = (H = '[\\s|\\(]+(' + (F = '(?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?)') + ')[,|\\s]+(' + F + ')[,|\\s]+(' + F + ')\\s*\\)?', U = '[\\s|\\(]+(' + F + ')[,|\\s]+(' + F + ')[,|\\s]+(' + F + ')[,|\\s]+(' + F + ')\\s*\\)?', {
      CSS_UNIT: new RegExp(F),
      rgb: new RegExp('rgb' + H),
      rgba: new RegExp('rgba' + U),
      hsl: new RegExp('hsl' + H),
      hsla: new RegExp('hsla' + U),
      hsv: new RegExp('hsv' + H),
      hsva: new RegExp('hsva' + U),
      hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
      hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
      hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
      hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
    });
  function V(e) {
    return !!W.CSS_UNIT.exec(e);
  }
  e.exports ? e.exports = d : void 0 === (r = function () {
    return d;
  }.call(t, n, t, e)) || (e.exports = r);
}(Math);