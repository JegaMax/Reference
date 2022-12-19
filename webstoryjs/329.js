var r;
function Tokenizer(e, t) {
  var n = [], r = 0;
  function o(e) {
    return n.push(e), t;
  }
  function a() {
    return n[r++];
  }
  return {
    tokenize: function (t) {
      return t.replace(e, o);
    },
    detokenize: function (e) {
      return e.replace(new RegExp('(' + t + ')', 'g'), a);
    }
  };
}
r = new function CSSJanus() {
  var e = '(?:[0-9]*\\.[0-9]+|[0-9]+)', t = '\\/\\*\\!?\\s*@noflip\\s*\\*\\/', n = '(?:(?:(?:\\\\[0-9a-f]{1,6})(?:\\r\\n|\\s)?)|\\\\[^\\r\\n\\f0-9a-f])', r = '(?:[_a-z0-9-]|[^\\u0020-\\u007e]|' + n + ')', o = e + '(?:\\s*(?:em|ex|px|cm|mm|in|pt|pc|deg|rad|grad|ms|s|hz|khz|%)|-?(?:[_a-z]|[^\\u0020-\\u007e]|(?:(?:(?:\\\\[0-9a-f]{1,6})(?:\\r\\n|\\s)?)|\\\\[^\\r\\n\\f0-9a-f]))(?:[_a-z0-9-]|[^\\u0020-\\u007e]|(?:(?:(?:\\\\[0-9a-f]{1,6})(?:\\r\\n|\\s)?)|\\\\[^\\r\\n\\f0-9a-f]))*)?', a = '((?:-?' + o + ')|(?:inherit|auto))', i = '(#?' + r + '+|(?:rgba?|hsla?)\\([ \\d.,%-]+\\))', l = '(?:[!#$%&*-~]|[^\\u0020-\\u007e]|' + n + ')*?', s = '(?!(' + r + '|\\r?\\n|\\s|#|\\:|\\.|\\,|\\+|>|\\(|\\)|\\[|\\]|=|\\*=|~=|\\^=|\'[^\']*\'])*?{)', c = '(?!' + l + '[\'"]?\\s*\\))', u = '(?=' + l + '[\'"]?\\s*\\))', f = '(\\s*(?:!important\\s*)?[;}])', d = new RegExp('`TMP`', 'g'), p = new RegExp('\\/\\*[^*]*\\*+([^\\/*][^*]*\\*+)*\\/', 'gi'), h = new RegExp('(' + t + s + '[^;}]+;?)', 'gi'), g = new RegExp('(' + t + '[^\\}]*?})', 'gi'), m = new RegExp('(direction\\s*:\\s*)ltr', 'gi'), b = new RegExp('(direction\\s*:\\s*)rtl', 'gi'), v = new RegExp('(^|[^a-zA-Z])(left)(?![a-zA-Z])' + c + s, 'gi'), y = new RegExp('(^|[^a-zA-Z])(right)(?![a-zA-Z])' + c + s, 'gi'), C = new RegExp('(^|[^a-zA-Z])(left)' + u, 'gi'), w = new RegExp('(^|[^a-zA-Z])(right)' + u, 'gi'), x = new RegExp('(^|[^a-zA-Z])(ltr)' + u, 'gi'), E = new RegExp('(^|[^a-zA-Z])(rtl)' + u, 'gi'), _ = new RegExp('(^|[^a-zA-Z])([ns]?)e-resize', 'gi'), O = new RegExp('(^|[^a-zA-Z])([ns]?)w-resize', 'gi'), S = new RegExp('((?:margin|padding|border-width)\\s*:\\s*)' + a + '(\\s+)' + a + '(\\s+)' + a + '(\\s+)' + a + f, 'gi'), k = new RegExp('((?:-color|border-style)\\s*:\\s*)' + i + '(\\s+)' + i + '(\\s+)' + i + '(\\s+)' + i + f, 'gi'), A = new RegExp('(background(?:-position)?\\s*:\\s*(?:[^:;}\\s]+\\s+)*?)(' + o + ')', 'gi'), j = new RegExp('(background-position-x\\s*:\\s*)(-?' + e + '%)', 'gi'), M = new RegExp('(border-radius\\s*:\\s*)' + a + '(?:(?:\\s+' + a + ')(?:\\s+' + a + ')?(?:\\s+' + a + ')?)?(?:(?:(?:\\s*\\/\\s*)' + a + ')(?:\\s+' + a + ')?(?:\\s+' + a + ')?(?:\\s+' + a + ')?)?' + f, 'gi'), I = new RegExp('(box-shadow\\s*:\\s*(?:inset\\s*)?)' + a, 'gi'), T = new RegExp('(text-shadow\\s*:\\s*)' + a + '(\\s*)' + i, 'gi'), P = new RegExp('(text-shadow\\s*:\\s*)' + i + '(\\s*)' + a, 'gi'), D = new RegExp('(text-shadow\\s*:\\s*)' + a, 'gi'), R = new RegExp('(transform\\s*:[^;}]*)(translateX\\s*\\(\\s*)' + a + '(\\s*\\))', 'gi'), N = new RegExp('(transform\\s*:[^;}]*)(translate\\s*\\(\\s*)' + a + '((?:\\s*,\\s*' + a + '){0,2}\\s*\\))', 'gi');
  function z(e, t, n) {
    var r, o;
    return '%' === n.slice(-1) && (-1 !== (r = n.indexOf('.')) ? (o = n.length - r - 2, n = (n = 100 - parseFloat(n)).toFixed(o) + '%') : n = 100 - parseFloat(n) + '%'), t + n;
  }
  function L(e) {
    switch (e.length) {
    case 4:
      e = [
        e[1],
        e[0],
        e[3],
        e[2]
      ];
      break;
    case 3:
      e = [
        e[1],
        e[0],
        e[1],
        e[2]
      ];
      break;
    case 2:
      e = [
        e[1],
        e[0]
      ];
      break;
    case 1:
      e = [e[0]];
    }
    return e.join(' ');
  }
  function B(e, t) {
    var n = [].slice.call(arguments), r = n.slice(2, 6).filter(function (e) {
        return e;
      }), o = n.slice(6, 10).filter(function (e) {
        return e;
      }), a = n[10] || '';
    return t + (o.length ? L(r) + ' / ' + L(o) : L(r)) + a;
  }
  function F(e) {
    return 0 === parseFloat(e) ? e : '-' === e[0] ? e.slice(1) : '-' + e;
  }
  function H(e, t, n) {
    return t + F(n);
  }
  function U(e, t, n, r, o) {
    return t + n + F(r) + o;
  }
  function W(e, t, n, r, o) {
    return t + n + r + F(o);
  }
  return {
    transform: function (e, t) {
      var n = new Tokenizer(h, '`NOFLIP_SINGLE`'), r = new Tokenizer(g, '`NOFLIP_CLASS`'), o = new Tokenizer(p, '`COMMENT`');
      return e = o.tokenize(r.tokenize(n.tokenize(e.replace('`', '%60')))), t.transformDirInUrl && (e = e.replace(x, '$1`TMP`').replace(E, '$1ltr').replace(d, 'rtl')), t.transformEdgeInUrl && (e = e.replace(C, '$1`TMP`').replace(w, '$1left').replace(d, 'right')), e = e.replace(m, '$1`TMP`').replace(b, '$1ltr').replace(d, 'rtl').replace(v, '$1`TMP`').replace(y, '$1left').replace(d, 'right').replace(_, '$1$2`TMP`').replace(O, '$1$2e-resize').replace(d, 'w-resize').replace(M, B).replace(I, H).replace(T, W).replace(P, W).replace(D, H).replace(R, U).replace(N, U).replace(S, '$1$2$3$8$5$6$7$4$9').replace(k, '$1$2$3$8$5$6$7$4$9').replace(A, z).replace(j, z), e = n.detokenize(r.detokenize(o.detokenize(e)));
    }
  };
}(), e.exports ? t.transform = function (e, t, n) {
  var o;
  return 'object' == typeof t ? o = t : (o = {}, 'boolean' == typeof t && (o.transformDirInUrl = t), 'boolean' == typeof n && (o.transformEdgeInUrl = n)), r.transform(e, o);
} : 'undefined' != typeof window && (window.cssjanus = r);