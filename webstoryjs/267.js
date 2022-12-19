'use strict';
t.a = function (e) {
  function t(e, r, s, c, d) {
    for (var p, h, g, m, C, x = 0, E = 0, _ = 0, O = 0, S = 0, T = 0, D = g = p = 0, N = 0, z = 0, L = 0, B = 0, F = s.length, H = F - 1, U = '', W = '', V = '', K = ''; N < F;) {
      if (h = s.charCodeAt(N), N === H && 0 !== E + O + _ + x && (0 !== E && (h = 47 === E ? 10 : 47), O = _ = x = 0, F++, H++), 0 === E + O + _ + x) {
        if (N === H && (0 < z && (U = U.replace(f, '')), 0 < U.trim().length)) {
          switch (h) {
          case 32:
          case 9:
          case 59:
          case 13:
          case 10:
            break;
          default:
            U += s.charAt(N);
          }
          h = 59;
        }
        switch (h) {
        case 123:
          for (p = (U = U.trim()).charCodeAt(0), g = 1, B = ++N; N < F;) {
            switch (h = s.charCodeAt(N)) {
            case 123:
              g++;
              break;
            case 125:
              g--;
              break;
            case 47:
              switch (h = s.charCodeAt(N + 1)) {
              case 42:
              case 47:
                e: {
                  for (D = N + 1; D < H; ++D)
                    switch (s.charCodeAt(D)) {
                    case 47:
                      if (42 === h && 42 === s.charCodeAt(D - 1) && N + 2 !== D) {
                        N = D + 1;
                        break e;
                      }
                      break;
                    case 10:
                      if (47 === h) {
                        N = D + 1;
                        break e;
                      }
                    }
                  N = D;
                }
              }
              break;
            case 91:
              h++;
            case 40:
              h++;
            case 34:
            case 39:
              for (; N++ < H && s.charCodeAt(N) !== h;);
            }
            if (0 === g)
              break;
            N++;
          }
          switch (g = s.substring(B, N), 0 === p && (p = (U = U.replace(u, '').trim()).charCodeAt(0)), p) {
          case 64:
            switch (0 < z && (U = U.replace(f, '')), h = U.charCodeAt(1)) {
            case 100:
            case 109:
            case 115:
            case 45:
              z = r;
              break;
            default:
              z = I;
            }
            if (B = (g = t(r, z, g, h, d + 1)).length, 0 < P && (C = l(3, g, z = n(I, U, L), r, A, k, B, h, d, c), U = z.join(''), void 0 !== C && 0 === (B = (g = C.trim()).length) && (h = 0, g = '')), 0 < B)
              switch (h) {
              case 115:
                U = U.replace(w, i);
              case 100:
              case 109:
              case 45:
                g = U + '{' + g + '}';
                break;
              case 107:
                g = (U = U.replace(b, '$1 $2')) + '{' + g + '}', g = 1 === M || 2 === M && a('@' + g, 3) ? '@-webkit-' + g + '@' + g : '@' + g;
                break;
              default:
                g = U + g, 112 === c && (W += g, g = '');
              }
            else
              g = '';
            break;
          default:
            g = t(r, n(r, U, L), g, c, d + 1);
          }
          V += g, g = L = z = D = p = 0, U = '', h = s.charCodeAt(++N);
          break;
        case 125:
        case 59:
          if (1 < (B = (U = (0 < z ? U.replace(f, '') : U).trim()).length))
            switch (0 === D && (p = U.charCodeAt(0), 45 === p || 96 < p && 123 > p) && (B = (U = U.replace(' ', ':')).length), 0 < P && void 0 !== (C = l(1, U, r, e, A, k, W.length, c, d, c)) && 0 === (B = (U = C.trim()).length) && (U = '\0\0'), p = U.charCodeAt(0), h = U.charCodeAt(1), p) {
            case 0:
              break;
            case 64:
              if (105 === h || 99 === h) {
                K += U + s.charAt(N);
                break;
              }
            default:
              58 !== U.charCodeAt(B - 1) && (W += o(U, p, h, U.charCodeAt(2)));
            }
          L = z = D = p = 0, U = '', h = s.charCodeAt(++N);
        }
      }
      switch (h) {
      case 13:
      case 10:
        47 === E ? E = 0 : 0 === 1 + p && 107 !== c && 0 < U.length && (z = 1, U += '\0'), 0 < P * R && l(0, U, r, e, A, k, W.length, c, d, c), k = 1, A++;
        break;
      case 59:
      case 125:
        if (0 === E + O + _ + x) {
          k++;
          break;
        }
      default:
        switch (k++, m = s.charAt(N), h) {
        case 9:
        case 32:
          if (0 === O + x + E)
            switch (S) {
            case 44:
            case 58:
            case 9:
            case 32:
              m = '';
              break;
            default:
              32 !== h && (m = ' ');
            }
          break;
        case 0:
          m = '\\0';
          break;
        case 12:
          m = '\\f';
          break;
        case 11:
          m = '\\v';
          break;
        case 38:
          0 === O + E + x && (z = L = 1, m = '\f' + m);
          break;
        case 108:
          if (0 === O + E + x + j && 0 < D)
            switch (N - D) {
            case 2:
              112 === S && 58 === s.charCodeAt(N - 3) && (j = S);
            case 8:
              111 === T && (j = T);
            }
          break;
        case 58:
          0 === O + E + x && (D = N);
          break;
        case 44:
          0 === E + _ + O + x && (z = 1, m += '\r');
          break;
        case 34:
        case 39:
          0 === E && (O = O === h ? 0 : 0 === O ? h : O);
          break;
        case 91:
          0 === O + E + _ && x++;
          break;
        case 93:
          0 === O + E + _ && x--;
          break;
        case 41:
          0 === O + E + x && _--;
          break;
        case 40:
          if (0 === O + E + x) {
            if (0 === p)
              switch (2 * S + 3 * T) {
              case 533:
                break;
              default:
                p = 1;
              }
            _++;
          }
          break;
        case 64:
          0 === E + _ + O + x + D + g && (g = 1);
          break;
        case 42:
        case 47:
          if (!(0 < O + x + _))
            switch (E) {
            case 0:
              switch (2 * h + 3 * s.charCodeAt(N + 1)) {
              case 235:
                E = 47;
                break;
              case 220:
                B = N, E = 42;
              }
              break;
            case 42:
              47 === h && 42 === S && B + 2 !== N && (33 === s.charCodeAt(B + 2) && (W += s.substring(B, N + 1)), m = '', E = 0);
            }
        }
        0 === E && (U += m);
      }
      T = S, S = h, N++;
    }
    if (0 < (B = W.length)) {
      if (z = r, 0 < P && void 0 !== (C = l(2, W, z, e, A, k, B, c, d, c)) && 0 === (W = C).length)
        return K + W + V;
      if (W = z.join(',') + '{' + W + '}', 0 != M * j) {
        switch (2 !== M || a(W, 2) || (j = 0), j) {
        case 111:
          W = W.replace(y, ':-moz-$1') + W;
          break;
        case 112:
          W = W.replace(v, '::-webkit-input-$1') + W.replace(v, '::-moz-$1') + W.replace(v, ':-ms-input-$1') + W;
        }
        j = 0;
      }
    }
    return K + W + V;
  }
  function n(e, t, n) {
    var o = t.trim().split(g);
    t = o;
    var a = o.length, i = e.length;
    switch (i) {
    case 0:
    case 1:
      var l = 0;
      for (e = 0 === i ? '' : e[0] + ' '; l < a; ++l)
        t[l] = r(e, t[l], n).trim();
      break;
    default:
      var s = l = 0;
      for (t = []; l < a; ++l)
        for (var c = 0; c < i; ++c)
          t[s++] = r(e[c] + ' ', o[l], n).trim();
    }
    return t;
  }
  function r(e, t, n) {
    var r = t.charCodeAt(0);
    switch (33 > r && (r = (t = t.trim()).charCodeAt(0)), r) {
    case 38:
      return t.replace(m, '$1' + e.trim());
    case 58:
      return e.trim() + t.replace(m, '$1' + e.trim());
    default:
      if (0 < 1 * n && 0 < t.indexOf('\f'))
        return t.replace(m, (58 === e.charCodeAt(0) ? '' : '$1') + e.trim());
    }
    return e + t;
  }
  function o(e, t, n, r) {
    var i = e + ';', l = 2 * t + 3 * n + 4 * r;
    if (944 === l) {
      e = i.indexOf(':', 9) + 1;
      var s = i.substring(e, i.length - 1).trim();
      return s = i.substring(0, e).trim() + s + ';', 1 === M || 2 === M && a(s, 1) ? '-webkit-' + s + s : s;
    }
    if (0 === M || 2 === M && !a(i, 1))
      return i;
    switch (l) {
    case 1015:
      return 97 === i.charCodeAt(10) ? '-webkit-' + i + i : i;
    case 951:
      return 116 === i.charCodeAt(3) ? '-webkit-' + i + i : i;
    case 963:
      return 110 === i.charCodeAt(5) ? '-webkit-' + i + i : i;
    case 1009:
      if (100 !== i.charCodeAt(4))
        break;
    case 969:
    case 942:
      return '-webkit-' + i + i;
    case 978:
      return '-webkit-' + i + '-moz-' + i + i;
    case 1019:
    case 983:
      return '-webkit-' + i + '-moz-' + i + '-ms-' + i + i;
    case 883:
      if (45 === i.charCodeAt(8))
        return '-webkit-' + i + i;
      if (0 < i.indexOf('image-set(', 11))
        return i.replace(S, '$1-webkit-$2') + i;
      break;
    case 932:
      if (45 === i.charCodeAt(4))
        switch (i.charCodeAt(5)) {
        case 103:
          return '-webkit-box-' + i.replace('-grow', '') + '-webkit-' + i + '-ms-' + i.replace('grow', 'positive') + i;
        case 115:
          return '-webkit-' + i + '-ms-' + i.replace('shrink', 'negative') + i;
        case 98:
          return '-webkit-' + i + '-ms-' + i.replace('basis', 'preferred-size') + i;
        }
      return '-webkit-' + i + '-ms-' + i + i;
    case 964:
      return '-webkit-' + i + '-ms-flex-' + i + i;
    case 1023:
      if (99 !== i.charCodeAt(8))
        break;
      return '-webkit-box-pack' + (s = i.substring(i.indexOf(':', 15)).replace('flex-', '').replace('space-between', 'justify')) + '-webkit-' + i + '-ms-flex-pack' + s + i;
    case 1005:
      return p.test(i) ? i.replace(d, ':-webkit-') + i.replace(d, ':-moz-') + i : i;
    case 1000:
      switch (t = (s = i.substring(13).trim()).indexOf('-') + 1, s.charCodeAt(0) + s.charCodeAt(t)) {
      case 226:
        s = i.replace(C, 'tb');
        break;
      case 232:
        s = i.replace(C, 'tb-rl');
        break;
      case 220:
        s = i.replace(C, 'lr');
        break;
      default:
        return i;
      }
      return '-webkit-' + i + '-ms-' + s + i;
    case 1017:
      if (-1 === i.indexOf('sticky', 9))
        break;
    case 975:
      switch (t = (i = e).length - 10, l = (s = (33 === i.charCodeAt(t) ? i.substring(0, t) : i).substring(e.indexOf(':', 7) + 1).trim()).charCodeAt(0) + (0 | s.charCodeAt(7))) {
      case 203:
        if (111 > s.charCodeAt(8))
          break;
      case 115:
        i = i.replace(s, '-webkit-' + s) + ';' + i;
        break;
      case 207:
      case 102:
        i = i.replace(s, '-webkit-' + (102 < l ? 'inline-' : '') + 'box') + ';' + i.replace(s, '-webkit-' + s) + ';' + i.replace(s, '-ms-' + s + 'box') + ';' + i;
      }
      return i + ';';
    case 938:
      if (45 === i.charCodeAt(5))
        switch (i.charCodeAt(6)) {
        case 105:
          return s = i.replace('-items', ''), '-webkit-' + i + '-webkit-box-' + s + '-ms-flex-' + s + i;
        case 115:
          return '-webkit-' + i + '-ms-flex-item-' + i.replace(E, '') + i;
        default:
          return '-webkit-' + i + '-ms-flex-line-pack' + i.replace('align-content', '').replace(E, '') + i;
        }
      break;
    case 973:
    case 989:
      if (45 !== i.charCodeAt(3) || 122 === i.charCodeAt(4))
        break;
    case 931:
    case 953:
      if (!0 === O.test(e))
        return 115 === (s = e.substring(e.indexOf(':') + 1)).charCodeAt(0) ? o(e.replace('stretch', 'fill-available'), t, n, r).replace(':fill-available', ':stretch') : i.replace(s, '-webkit-' + s) + i.replace(s, '-moz-' + s.replace('fill-', '')) + i;
      break;
    case 962:
      if (i = '-webkit-' + i + (102 === i.charCodeAt(5) ? '-ms-' + i : '') + i, 211 === n + r && 105 === i.charCodeAt(13) && 0 < i.indexOf('transform', 10))
        return i.substring(0, i.indexOf(';', 27) + 1).replace(h, '$1-webkit-$2') + i;
    }
    return i;
  }
  function a(e, t) {
    var n = e.indexOf(1 === t ? ':' : '{'), r = e.substring(0, 3 !== t ? n : 10);
    return n = e.substring(n + 1, e.length - 1), D(2 !== t ? r : r.replace(_, '$1'), n, t);
  }
  function i(e, t) {
    var n = o(t, t.charCodeAt(0), t.charCodeAt(1), t.charCodeAt(2));
    return n !== t + ';' ? n.replace(x, ' or ($1)').substring(4) : '(' + t + ')';
  }
  function l(e, t, n, r, o, a, i, l, s, u) {
    for (var f, d = 0, p = t; d < P; ++d)
      switch (f = T[d].call(c, e, p, n, r, o, a, i, l, s, u)) {
      case void 0:
      case !1:
      case !0:
      case null:
        break;
      default:
        p = f;
      }
    if (p !== t)
      return p;
  }
  function s(e) {
    return void 0 !== (e = e.prefix) && (D = null, e ? 'function' != typeof e ? M = 1 : (M = 2, D = e) : M = 0), s;
  }
  function c(e, n) {
    var r = e;
    if (33 > r.charCodeAt(0) && (r = r.trim()), r = [r], 0 < P) {
      var o = l(-1, n, r, r, A, k, 0, 0, 0, 0);
      void 0 !== o && 'string' == typeof o && (n = o);
    }
    var a = t(I, r, n, 0, 0);
    return 0 < P && void 0 !== (o = l(-2, a, r, r, A, k, a.length, 0, 0, 0)) && (a = o), '', j = 0, k = A = 1, a;
  }
  var u = /^\0+/g, f = /[\0\r\f]/g, d = /: */g, p = /zoo|gra/, h = /([,: ])(transform)/g, g = /,\r+?/g, m = /([\t\r\n ])*\f?&/g, b = /@(k\w+)\s*(\S*)\s*/, v = /::(place)/g, y = /:(read-only)/g, C = /[svh]\w+-[tblr]{2}/, w = /\(\s*(.*)\s*\)/g, x = /([\s\S]*?);/g, E = /-self|flex-/g, _ = /[^]*?(:[rp][el]a[\w-]+)[^]*/, O = /stretch|:\s*\w+\-(?:conte|avail)/, S = /([^-])(image-set\()/, k = 1, A = 1, j = 0, M = 1, I = [], T = [], P = 0, D = null, R = 0;
  return c.use = function e(t) {
    switch (t) {
    case void 0:
    case null:
      P = T.length = 0;
      break;
    default:
      if ('function' == typeof t)
        T[P++] = t;
      else if ('object' == typeof t)
        for (var n = 0, r = t.length; n < r; ++n)
          e(t[n]);
      else
        R = 0 | !!t;
    }
    return e;
  }, c.set = s, void 0 !== e && s(e), c;
};