'use strict';
var r = n('./34'), o = n('./0');
function a(e) {
  for (var t = 'https://reactjs.org/docs/error-decoder.html?invariant=' + e, n = 1; n < arguments.length; n++)
    t += '&args[]=' + encodeURIComponent(arguments[n]);
  return 'Minified React error #' + e + '; visit ' + t + ' for the full message or use the non-minified dev environment for full errors and additional helpful warnings.';
}
var i = 'function' == typeof Symbol && Symbol.for, l = i ? Symbol.for('react.portal') : 60106, s = i ? Symbol.for('react.fragment') : 60107, c = i ? Symbol.for('react.strict_mode') : 60108, u = i ? Symbol.for('react.profiler') : 60114, f = i ? Symbol.for('react.provider') : 60109, d = i ? Symbol.for('react.context') : 60110, p = i ? Symbol.for('react.concurrent_mode') : 60111, h = i ? Symbol.for('react.forward_ref') : 60112, g = i ? Symbol.for('react.suspense') : 60113, m = i ? Symbol.for('react.suspense_list') : 60120, b = i ? Symbol.for('react.memo') : 60115, v = i ? Symbol.for('react.lazy') : 60116, y = i ? Symbol.for('react.block') : 60121, C = i ? Symbol.for('react.fundamental') : 60117, w = i ? Symbol.for('react.scope') : 60119;
function x(e) {
  if (null == e)
    return null;
  if ('function' == typeof e)
    return e.displayName || e.name || null;
  if ('string' == typeof e)
    return e;
  switch (e) {
  case s:
    return 'Fragment';
  case l:
    return 'Portal';
  case u:
    return 'Profiler';
  case c:
    return 'StrictMode';
  case g:
    return 'Suspense';
  case m:
    return 'SuspenseList';
  }
  if ('object' == typeof e)
    switch (e.$$typeof) {
    case d:
      return 'Context.Consumer';
    case f:
      return 'Context.Provider';
    case h:
      var t = e.render;
      return t = t.displayName || t.name || '', e.displayName || ('' !== t ? 'ForwardRef(' + t + ')' : 'ForwardRef');
    case b:
      return x(e.type);
    case y:
      return x(e.render);
    case v:
      if (e = 1 === e._status ? e._result : null)
        return x(e);
    }
  return null;
}
var E = o.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
E.hasOwnProperty('ReactCurrentDispatcher') || (E.ReactCurrentDispatcher = { current: null }), E.hasOwnProperty('ReactCurrentBatchConfig') || (E.ReactCurrentBatchConfig = { suspense: null });
var _ = {};
function O(e, t) {
  for (var n = 0 | e._threadCount; n <= t; n++)
    e[n] = e._currentValue2, e._threadCount = n + 1;
}
for (var S = new Uint16Array(16), k = 0; 15 > k; k++)
  S[k] = k + 1;
S[15] = 0;
var A = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, j = Object.prototype.hasOwnProperty, M = {}, I = {};
function T(e) {
  return !!j.call(I, e) || !j.call(M, e) && (A.test(e) ? I[e] = !0 : (M[e] = !0, !1));
}
function P(e, t, n, r, o, a) {
  this.acceptsBooleans = 2 === t || 3 === t || 4 === t, this.attributeName = r, this.attributeNamespace = o, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = a;
}
var D = {};
'children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style'.split(' ').forEach(function (e) {
  D[e] = new P(e, 0, !1, e, null, !1);
}), [
  [
    'acceptCharset',
    'accept-charset'
  ],
  [
    'className',
    'class'
  ],
  [
    'htmlFor',
    'for'
  ],
  [
    'httpEquiv',
    'http-equiv'
  ]
].forEach(function (e) {
  var t = e[0];
  D[t] = new P(t, 1, !1, e[1], null, !1);
}), [
  'contentEditable',
  'draggable',
  'spellCheck',
  'value'
].forEach(function (e) {
  D[e] = new P(e, 2, !1, e.toLowerCase(), null, !1);
}), [
  'autoReverse',
  'externalResourcesRequired',
  'focusable',
  'preserveAlpha'
].forEach(function (e) {
  D[e] = new P(e, 2, !1, e, null, !1);
}), 'allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope'.split(' ').forEach(function (e) {
  D[e] = new P(e, 3, !1, e.toLowerCase(), null, !1);
}), [
  'checked',
  'multiple',
  'muted',
  'selected'
].forEach(function (e) {
  D[e] = new P(e, 3, !0, e, null, !1);
}), [
  'capture',
  'download'
].forEach(function (e) {
  D[e] = new P(e, 4, !1, e, null, !1);
}), [
  'cols',
  'rows',
  'size',
  'span'
].forEach(function (e) {
  D[e] = new P(e, 6, !1, e, null, !1);
}), [
  'rowSpan',
  'start'
].forEach(function (e) {
  D[e] = new P(e, 5, !1, e.toLowerCase(), null, !1);
});
var R = /[\-:]([a-z])/g;
function N(e) {
  return e[1].toUpperCase();
}
'accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height'.split(' ').forEach(function (e) {
  var t = e.replace(R, N);
  D[t] = new P(t, 1, !1, e, null, !1);
}), 'xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type'.split(' ').forEach(function (e) {
  var t = e.replace(R, N);
  D[t] = new P(t, 1, !1, e, 'http://www.w3.org/1999/xlink', !1);
}), [
  'xml:base',
  'xml:lang',
  'xml:space'
].forEach(function (e) {
  var t = e.replace(R, N);
  D[t] = new P(t, 1, !1, e, 'http://www.w3.org/XML/1998/namespace', !1);
}), [
  'tabIndex',
  'crossOrigin'
].forEach(function (e) {
  D[e] = new P(e, 1, !1, e.toLowerCase(), null, !1);
}), D.xlinkHref = new P('xlinkHref', 1, !1, 'xlink:href', 'http://www.w3.org/1999/xlink', !0), [
  'src',
  'href',
  'action',
  'formAction'
].forEach(function (e) {
  D[e] = new P(e, 1, !1, e.toLowerCase(), null, !0);
});
var z = /["'&<>]/;
function L(e) {
  if ('boolean' == typeof e || 'number' == typeof e)
    return '' + e;
  e = '' + e;
  var t = z.exec(e);
  if (t) {
    var n, r = '', o = 0;
    for (n = t.index; n < e.length; n++) {
      switch (e.charCodeAt(n)) {
      case 34:
        t = '&quot;';
        break;
      case 38:
        t = '&amp;';
        break;
      case 39:
        t = '&#x27;';
        break;
      case 60:
        t = '&lt;';
        break;
      case 62:
        t = '&gt;';
        break;
      default:
        continue;
      }
      o !== n && (r += e.substring(o, n)), o = n + 1, r += t;
    }
    e = o !== n ? r + e.substring(o, n) : r;
  }
  return e;
}
function B(e, t) {
  var n, r = D.hasOwnProperty(e) ? D[e] : null;
  return (n = 'style' !== e) && (n = null !== r ? 0 === r.type : 2 < e.length && ('o' === e[0] || 'O' === e[0]) && ('n' === e[1] || 'N' === e[1])), n || function (e, t, n, r) {
    if (null == t || function (e, t, n, r) {
        if (null !== n && 0 === n.type)
          return !1;
        switch (typeof t) {
        case 'function':
        case 'symbol':
          return !0;
        case 'boolean':
          return !r && (null !== n ? !n.acceptsBooleans : 'data-' !== (e = e.toLowerCase().slice(0, 5)) && 'aria-' !== e);
        default:
          return !1;
        }
      }(e, t, n, r))
      return !0;
    if (r)
      return !1;
    if (null !== n)
      switch (n.type) {
      case 3:
        return !t;
      case 4:
        return !1 === t;
      case 5:
        return isNaN(t);
      case 6:
        return isNaN(t) || 1 > t;
      }
    return !1;
  }(e, t, r, !1) ? '' : null !== r ? (e = r.attributeName, 3 === (n = r.type) || 4 === n && !0 === t ? e + '=""' : (r.sanitizeURL && (t = '' + t), e + '="' + L(t) + '"')) : T(e) ? e + '="' + L(t) + '"' : '';
}
var F = 'function' == typeof Object.is ? Object.is : function (e, t) {
    return e === t && (0 !== e || 1 / e == 1 / t) || e != e && t != t;
  }, H = null, U = null, W = null, V = !1, K = !1, q = null, G = 0;
function Z() {
  if (null === H)
    throw Error(a(321));
  return H;
}
function Ba() {
  if (0 < G)
    throw Error(a(312));
  return {
    memoizedState: null,
    queue: null,
    next: null
  };
}
function Ca() {
  return null === W ? null === U ? (V = !1, U = W = Ba()) : (V = !0, W = U) : null === W.next ? (V = !1, W = W.next = Ba()) : (V = !0, W = W.next), W;
}
function Da(e, t, n, r) {
  for (; K;)
    K = !1, G += 1, W = null, n = e(t, r);
  return U = H = null, G = 0, W = q = null, n;
}
function Ea(e, t) {
  return 'function' == typeof t ? t(e) : t;
}
function Fa(e, t, n) {
  if (H = Z(), W = Ca(), V) {
    var r = W.queue;
    if (t = r.dispatch, null !== q && void 0 !== (n = q.get(r))) {
      q.delete(r), r = W.memoizedState;
      do {
        r = e(r, n.action), n = n.next;
      } while (null !== n);
      return W.memoizedState = r, [
        r,
        t
      ];
    }
    return [
      W.memoizedState,
      t
    ];
  }
  return e = e === Ea ? 'function' == typeof t ? t() : t : void 0 !== n ? n(t) : t, W.memoizedState = e, e = (e = W.queue = {
    last: null,
    dispatch: null
  }).dispatch = Ga.bind(null, H, e), [
    W.memoizedState,
    e
  ];
}
function Ga(e, t, n) {
  if (!(25 > G))
    throw Error(a(301));
  if (e === H)
    if (K = !0, e = {
        action: n,
        next: null
      }, null === q && (q = new Map()), void 0 === (n = q.get(t)))
      q.set(t, e);
    else {
      for (t = n; null !== t.next;)
        t = t.next;
      t.next = e;
    }
}
function Ha() {
}
var Y = 0, Q = {
    readContext: function (e) {
      var t = Y;
      return O(e, t), e[t];
    },
    useContext: function (e) {
      Z();
      var t = Y;
      return O(e, t), e[t];
    },
    useMemo: function (e, t) {
      if (H = Z(), t = void 0 === t ? null : t, null !== (W = Ca())) {
        var n = W.memoizedState;
        if (null !== n && null !== t) {
          e: {
            var r = n[1];
            if (null === r)
              r = !1;
            else {
              for (var o = 0; o < r.length && o < t.length; o++)
                if (!F(t[o], r[o])) {
                  r = !1;
                  break e;
                }
              r = !0;
            }
          }
          if (r)
            return n[0];
        }
      }
      return e = e(), W.memoizedState = [
        e,
        t
      ], e;
    },
    useReducer: Fa,
    useRef: function (e) {
      H = Z();
      var t = (W = Ca()).memoizedState;
      return null === t ? (e = { current: e }, W.memoizedState = e) : t;
    },
    useState: function (e) {
      return Fa(Ea, e);
    },
    useLayoutEffect: function () {
    },
    useCallback: function (e) {
      return e;
    },
    useImperativeHandle: Ha,
    useEffect: Ha,
    useDebugValue: Ha,
    useResponder: function (e, t) {
      return {
        props: t,
        responder: e
      };
    },
    useDeferredValue: function (e) {
      return Z(), e;
    },
    useTransition: function () {
      return Z(), [
        function (e) {
          e();
        },
        !1
      ];
    }
  }, $ = 'http://www.w3.org/1999/xhtml';
function Ka(e) {
  switch (e) {
  case 'svg':
    return 'http://www.w3.org/2000/svg';
  case 'math':
    return 'http://www.w3.org/1998/Math/MathML';
  default:
    return 'http://www.w3.org/1999/xhtml';
  }
}
var X = {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0
  }, J = r({ menuitem: !0 }, X), ee = {
    animationIterationCount: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0
  }, te = [
    'Webkit',
    'ms',
    'Moz',
    'O'
  ];
Object.keys(ee).forEach(function (e) {
  te.forEach(function (t) {
    t = t + e.charAt(0).toUpperCase() + e.substring(1), ee[t] = ee[e];
  });
});
var ne = /([A-Z])/g, re = /^ms-/, oe = o.Children.toArray, ae = E.ReactCurrentDispatcher, ie = {
    listing: !0,
    pre: !0,
    textarea: !0
  }, le = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/, se = {}, ce = {};
var ue = Object.prototype.hasOwnProperty, fe = {
    children: null,
    dangerouslySetInnerHTML: null,
    suppressContentEditableWarning: null,
    suppressHydrationWarning: null
  };
function Ya(e, t) {
  if (void 0 === e)
    throw Error(a(152, x(t) || 'Component'));
}
function Za(e, t, n) {
  function i(o, i) {
    var l = i.prototype && i.prototype.isReactComponent, s = function (e, t, n, r) {
        if (r && 'object' == typeof (r = e.contextType) && null !== r)
          return O(r, n), r[n];
        if (e = e.contextTypes) {
          for (var o in (n = {}, e))
            n[o] = t[o];
          t = n;
        } else
          t = _;
        return t;
      }(i, t, n, l), c = [], u = !1, f = {
        isMounted: function () {
          return !1;
        },
        enqueueForceUpdate: function () {
          if (null === c)
            return null;
        },
        enqueueReplaceState: function (e, t) {
          u = !0, c = [t];
        },
        enqueueSetState: function (e, t) {
          if (null === c)
            return null;
          c.push(t);
        }
      };
    if (l) {
      if (l = new i(o.props, s, f), 'function' == typeof i.getDerivedStateFromProps) {
        var d = i.getDerivedStateFromProps.call(null, o.props, l.state);
        null != d && (l.state = r({}, l.state, d));
      }
    } else if (H = {}, l = i(o.props, s, f), null == (l = Da(i, o.props, l, s)) || null == l.render)
      return void Ya(e = l, i);
    if (l.props = o.props, l.context = s, l.updater = f, void 0 === (f = l.state) && (l.state = f = null), 'function' == typeof l.UNSAFE_componentWillMount || 'function' == typeof l.componentWillMount)
      if ('function' == typeof l.componentWillMount && 'function' != typeof i.getDerivedStateFromProps && l.componentWillMount(), 'function' == typeof l.UNSAFE_componentWillMount && 'function' != typeof i.getDerivedStateFromProps && l.UNSAFE_componentWillMount(), c.length) {
        f = c;
        var p = u;
        if (c = null, u = !1, p && 1 === f.length)
          l.state = f[0];
        else {
          d = p ? f[0] : l.state;
          var h = !0;
          for (p = p ? 1 : 0; p < f.length; p++) {
            var g = f[p];
            null != (g = 'function' == typeof g ? g.call(l, d, o.props, s) : g) && (h ? (h = !1, d = r({}, d, g)) : r(d, g));
          }
          l.state = d;
        }
      } else
        c = null;
    if (Ya(e = l.render(), i), 'function' == typeof l.getChildContext && 'object' == typeof (o = i.childContextTypes)) {
      var m = l.getChildContext();
      for (var b in m)
        if (!(b in o))
          throw Error(a(108, x(i) || 'Unknown', b));
    }
    m && (t = r({}, t, m));
  }
  for (; o.isValidElement(e);) {
    var l = e, s = l.type;
    if ('function' != typeof s)
      break;
    i(l, s);
  }
  return {
    child: e,
    context: t
  };
}
var de = function () {
    function e(e, t) {
      o.isValidElement(e) ? e.type !== s ? e = [e] : (e = e.props.children, e = o.isValidElement(e) ? [e] : oe(e)) : e = oe(e), e = {
        type: null,
        domNamespace: $,
        children: e,
        childIndex: 0,
        context: _,
        footer: ''
      };
      var n = S[0];
      if (0 === n) {
        var r = S, i = 2 * (n = r.length);
        if (!(65536 >= i))
          throw Error(a(304));
        var l = new Uint16Array(i);
        for (l.set(r), (S = l)[0] = n + 1, r = n; r < i - 1; r++)
          S[r] = r + 1;
        S[i - 1] = 0;
      } else
        S[0] = S[n];
      this.threadID = n, this.stack = [e], this.exhausted = !1, this.currentSelectValue = null, this.previousWasTextNode = !1, this.makeStaticMarkup = t, this.suspenseDepth = 0, this.contextIndex = -1, this.contextStack = [], this.contextValueStack = [];
    }
    var t = e.prototype;
    return t.destroy = function () {
      if (!this.exhausted) {
        this.exhausted = !0, this.clearProviders();
        var e = this.threadID;
        S[e] = S[0], S[0] = e;
      }
    }, t.pushProvider = function (e) {
      var t = ++this.contextIndex, n = e.type._context, r = this.threadID;
      O(n, r);
      var o = n[r];
      this.contextStack[t] = n, this.contextValueStack[t] = o, n[r] = e.props.value;
    }, t.popProvider = function () {
      var e = this.contextIndex, t = this.contextStack[e], n = this.contextValueStack[e];
      this.contextStack[e] = null, this.contextValueStack[e] = null, this.contextIndex--, t[this.threadID] = n;
    }, t.clearProviders = function () {
      for (var e = this.contextIndex; 0 <= e; e--)
        this.contextStack[e][this.threadID] = this.contextValueStack[e];
    }, t.read = function (e) {
      if (this.exhausted)
        return null;
      var t = Y;
      Y = this.threadID;
      var n = ae.current;
      ae.current = Q;
      try {
        for (var r = [''], o = !1; r[0].length < e;) {
          if (0 === this.stack.length) {
            this.exhausted = !0;
            var i = this.threadID;
            S[i] = S[0], S[0] = i;
            break;
          }
          var l = this.stack[this.stack.length - 1];
          if (o || l.childIndex >= l.children.length) {
            var s = l.footer;
            if ('' !== s && (this.previousWasTextNode = !1), this.stack.pop(), 'select' === l.type)
              this.currentSelectValue = null;
            else if (null != l.type && null != l.type.type && l.type.type.$$typeof === f)
              this.popProvider(l.type);
            else if (l.type === g) {
              this.suspenseDepth--;
              var c = r.pop();
              if (o) {
                o = !1;
                var u = l.fallbackFrame;
                if (!u)
                  throw Error(a(303));
                this.stack.push(u), r[this.suspenseDepth] += '<!--$!-->';
                continue;
              }
              r[this.suspenseDepth] += c;
            }
            r[this.suspenseDepth] += s;
          } else {
            var d = l.children[l.childIndex++], p = '';
            try {
              p += this.render(d, l.context, l.domNamespace);
            } catch (e) {
              if (null != e && 'function' == typeof e.then)
                throw Error(a(294));
              throw e;
            }
            r.length <= this.suspenseDepth && r.push(''), r[this.suspenseDepth] += p;
          }
        }
        return r[0];
      } finally {
        ae.current = n, Y = t;
      }
    }, t.render = function (e, t, n) {
      if ('string' == typeof e || 'number' == typeof e)
        return '' === (n = '' + e) ? '' : this.makeStaticMarkup ? L(n) : this.previousWasTextNode ? '<!-- -->' + L(n) : (this.previousWasTextNode = !0, L(n));
      if (e = (t = Za(e, t, this.threadID)).child, t = t.context, null === e || !1 === e)
        return '';
      if (!o.isValidElement(e)) {
        if (null != e && null != e.$$typeof) {
          if ((n = e.$$typeof) === l)
            throw Error(a(257));
          throw Error(a(258, n.toString()));
        }
        return e = oe(e), this.stack.push({
          type: null,
          domNamespace: n,
          children: e,
          childIndex: 0,
          context: t,
          footer: ''
        }), '';
      }
      var i = e.type;
      if ('string' == typeof i)
        return this.renderDOM(e, t, n);
      switch (i) {
      case c:
      case p:
      case u:
      case m:
      case s:
        return e = oe(e.props.children), this.stack.push({
          type: null,
          domNamespace: n,
          children: e,
          childIndex: 0,
          context: t,
          footer: ''
        }), '';
      case g:
        throw Error(a(294));
      }
      if ('object' == typeof i && null !== i)
        switch (i.$$typeof) {
        case h:
          H = {};
          var y = i.render(e.props, e.ref);
          return y = Da(i.render, e.props, y, e.ref), y = oe(y), this.stack.push({
            type: null,
            domNamespace: n,
            children: y,
            childIndex: 0,
            context: t,
            footer: ''
          }), '';
        case b:
          return e = [o.createElement(i.type, r({ ref: e.ref }, e.props))], this.stack.push({
            type: null,
            domNamespace: n,
            children: e,
            childIndex: 0,
            context: t,
            footer: ''
          }), '';
        case f:
          return n = {
            type: e,
            domNamespace: n,
            children: i = oe(e.props.children),
            childIndex: 0,
            context: t,
            footer: ''
          }, this.pushProvider(e), this.stack.push(n), '';
        case d:
          i = e.type, y = e.props;
          var x = this.threadID;
          return O(i, x), i = oe(y.children(i[x])), this.stack.push({
            type: e,
            domNamespace: n,
            children: i,
            childIndex: 0,
            context: t,
            footer: ''
          }), '';
        case C:
          throw Error(a(338));
        case v:
          switch (function (e) {
              if (-1 === e._status) {
                e._status = 0;
                var t = e._ctor;
                t = t(), e._result = t, t.then(function (t) {
                  0 === e._status && (t = t.default, e._status = 1, e._result = t);
                }, function (t) {
                  0 === e._status && (e._status = 2, e._result = t);
                });
              }
            }(i = e.type), i._status) {
          case 1:
            return e = [o.createElement(i._result, r({ ref: e.ref }, e.props))], this.stack.push({
              type: null,
              domNamespace: n,
              children: e,
              childIndex: 0,
              context: t,
              footer: ''
            }), '';
          case 2:
            throw i._result;
          default:
            throw Error(a(295));
          }
        case w:
          throw Error(a(343));
        }
      throw Error(a(130, null == i ? i : typeof i, ''));
    }, t.renderDOM = function (e, t, n) {
      var i = e.type.toLowerCase();
      if (n === $ && Ka(i), !se.hasOwnProperty(i)) {
        if (!le.test(i))
          throw Error(a(65, i));
        se[i] = !0;
      }
      var l = e.props;
      if ('input' === i)
        l = r({ type: void 0 }, l, {
          defaultChecked: void 0,
          defaultValue: void 0,
          value: null != l.value ? l.value : l.defaultValue,
          checked: null != l.checked ? l.checked : l.defaultChecked
        });
      else if ('textarea' === i) {
        var s = l.value;
        if (null == s) {
          s = l.defaultValue;
          var c = l.children;
          if (null != c) {
            if (null != s)
              throw Error(a(92));
            if (Array.isArray(c)) {
              if (!(1 >= c.length))
                throw Error(a(93));
              c = c[0];
            }
            s = '' + c;
          }
          null == s && (s = '');
        }
        l = r({}, l, {
          value: void 0,
          children: '' + s
        });
      } else if ('select' === i)
        this.currentSelectValue = null != l.value ? l.value : l.defaultValue, l = r({}, l, { value: void 0 });
      else if ('option' === i) {
        c = this.currentSelectValue;
        var u = function Va(e) {
          if (null == e)
            return e;
          var t = '';
          return o.Children.forEach(e, function (e) {
            null != e && (t += e);
          }), t;
        }(l.children);
        if (null != c) {
          var f = null != l.value ? l.value + '' : u;
          if (s = !1, Array.isArray(c)) {
            for (var d = 0; d < c.length; d++)
              if ('' + c[d] === f) {
                s = !0;
                break;
              }
          } else
            s = '' + c === f;
          l = r({
            selected: void 0,
            children: void 0
          }, l, {
            selected: s,
            children: u
          });
        }
      }
      if (s = l) {
        if (J[i] && (null != s.children || null != s.dangerouslySetInnerHTML))
          throw Error(a(137, i, ''));
        if (null != s.dangerouslySetInnerHTML) {
          if (null != s.children)
            throw Error(a(60));
          if ('object' != typeof s.dangerouslySetInnerHTML || !('__html' in s.dangerouslySetInnerHTML))
            throw Error(a(61));
        }
        if (null != s.style && 'object' != typeof s.style)
          throw Error(a(62, ''));
      }
      for (C in (s = l, c = this.makeStaticMarkup, u = 1 === this.stack.length, f = '<' + e.type, s))
        if (ue.call(s, C)) {
          var p = s[C];
          if (null != p) {
            if ('style' === C) {
              d = void 0;
              var h = '', g = '';
              for (d in p)
                if (p.hasOwnProperty(d)) {
                  var m = 0 === d.indexOf('--'), b = p[d];
                  if (null != b) {
                    if (m)
                      var v = d;
                    else if (v = d, ce.hasOwnProperty(v))
                      v = ce[v];
                    else {
                      var y = v.replace(ne, '-$1').toLowerCase().replace(re, '-ms-');
                      v = ce[v] = y;
                    }
                    h += g + v + ':', g = d, h += m = null == b || 'boolean' == typeof b || '' === b ? '' : m || 'number' != typeof b || 0 === b || ee.hasOwnProperty(g) && ee[g] ? ('' + b).trim() : b + 'px', g = ';';
                  }
                }
              p = h || null;
            }
            d = null;
            e:
              if (m = i, b = s, -1 === m.indexOf('-'))
                m = 'string' == typeof b.is;
              else
                switch (m) {
                case 'annotation-xml':
                case 'color-profile':
                case 'font-face':
                case 'font-face-src':
                case 'font-face-uri':
                case 'font-face-format':
                case 'font-face-name':
                case 'missing-glyph':
                  m = !1;
                  break e;
                default:
                  m = !0;
                }
            m ? fe.hasOwnProperty(C) || (d = T(d = C) && null != p ? d + '="' + L(p) + '"' : '') : d = B(C, p), d && (f += ' ' + d);
          }
        }
      c || u && (f += ' data-reactroot=""');
      var C = f;
      s = '', X.hasOwnProperty(i) ? C += '/>' : (C += '>', s = '</' + e.type + '>');
      e: {
        if (null != (c = l.dangerouslySetInnerHTML)) {
          if (null != c.__html) {
            c = c.__html;
            break e;
          }
        } else if ('string' == typeof (c = l.children) || 'number' == typeof c) {
          c = L(c);
          break e;
        }
        c = null;
      }
      return null != c ? (l = [], ie.hasOwnProperty(i) && '\n' === c.charAt(0) && (C += '\n'), C += c) : l = oe(l.children), e = e.type, n = null == n || 'http://www.w3.org/1999/xhtml' === n ? Ka(e) : 'http://www.w3.org/2000/svg' === n && 'foreignObject' === e ? 'http://www.w3.org/1999/xhtml' : n, this.stack.push({
        domNamespace: n,
        type: i,
        children: l,
        childIndex: 0,
        context: t,
        footer: s
      }), this.previousWasTextNode = !1, C;
    }, e;
  }(), pe = {
    renderToString: function (e) {
      e = new de(e, !1);
      try {
        return e.read(1 / 0);
      } finally {
        e.destroy();
      }
    },
    renderToStaticMarkup: function (e) {
      e = new de(e, !0);
      try {
        return e.read(1 / 0);
      } finally {
        e.destroy();
      }
    },
    renderToNodeStream: function () {
      throw Error(a(207));
    },
    renderToStaticNodeStream: function () {
      throw Error(a(208));
    },
    version: '16.13.1'
  };
e.exports = pe.default || pe;