'use strict';
var r, o, a, i, l;
if ('undefined' == typeof window || 'function' != typeof MessageChannel) {
  var s = null, c = null, u = function () {
      if (null !== s)
        try {
          var e = t.unstable_now();
          s(!0, e), s = null;
        } catch (e) {
          throw setTimeout(u, 0), e;
        }
    }, f = Date.now();
  t.unstable_now = function () {
    return Date.now() - f;
  }, r = function (e) {
    null !== s ? setTimeout(r, 0, e) : (s = e, setTimeout(u, 0));
  }, o = function (e, t) {
    c = setTimeout(e, t);
  }, a = function () {
    clearTimeout(c);
  }, i = function () {
    return !1;
  }, l = t.unstable_forceFrameRate = function () {
  };
} else {
  var d = window.performance, p = window.Date, h = window.setTimeout, g = window.clearTimeout;
  if ('undefined' != typeof console) {
    var m = window.cancelAnimationFrame;
    'function' != typeof window.requestAnimationFrame && console.error('This browser doesn\'t support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills'), 'function' != typeof m && console.error('This browser doesn\'t support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills');
  }
  if ('object' == typeof d && 'function' == typeof d.now)
    t.unstable_now = function () {
      return d.now();
    };
  else {
    var b = p.now();
    t.unstable_now = function () {
      return p.now() - b;
    };
  }
  var v = !1, y = null, C = -1, w = 5, x = 0;
  i = function () {
    return t.unstable_now() >= x;
  }, l = function () {
  }, t.unstable_forceFrameRate = function (e) {
    0 > e || 125 < e ? console.error('forceFrameRate takes a positive int between 0 and 125, forcing framerates higher than 125 fps is not unsupported') : w = 0 < e ? Math.floor(1000 / e) : 5;
  };
  var E = new MessageChannel(), _ = E.port2;
  E.port1.onmessage = function () {
    if (null !== y) {
      var e = t.unstable_now();
      x = e + w;
      try {
        y(!0, e) ? _.postMessage(null) : (v = !1, y = null);
      } catch (e) {
        throw _.postMessage(null), e;
      }
    } else
      v = !1;
  }, r = function (e) {
    y = e, v || (v = !0, _.postMessage(null));
  }, o = function (e, n) {
    C = h(function () {
      e(t.unstable_now());
    }, n);
  }, a = function () {
    g(C), C = -1;
  };
}
function O(e, t) {
  var n = e.length;
  e.push(t);
  e:
    for (;;) {
      var r = n - 1 >>> 1, o = e[r];
      if (!(void 0 !== o && 0 < A(o, t)))
        break e;
      e[r] = t, e[n] = o, n = r;
    }
}
function S(e) {
  return void 0 === (e = e[0]) ? null : e;
}
function k(e) {
  var t = e[0];
  if (void 0 !== t) {
    var n = e.pop();
    if (n !== t) {
      e[0] = n;
      e:
        for (var r = 0, o = e.length; r < o;) {
          var a = 2 * (r + 1) - 1, i = e[a], l = a + 1, s = e[l];
          if (void 0 !== i && 0 > A(i, n))
            void 0 !== s && 0 > A(s, i) ? (e[r] = s, e[l] = n, r = l) : (e[r] = i, e[a] = n, r = a);
          else {
            if (!(void 0 !== s && 0 > A(s, n)))
              break e;
            e[r] = s, e[l] = n, r = l;
          }
        }
    }
    return t;
  }
  return null;
}
function A(e, t) {
  var n = e.sortIndex - t.sortIndex;
  return 0 !== n ? n : e.id - t.id;
}
var j = [], M = [], I = 1, T = null, P = 3, D = !1, R = !1, N = !1;
function z(e) {
  for (var t = S(M); null !== t;) {
    if (null === t.callback)
      k(M);
    else {
      if (!(t.startTime <= e))
        break;
      k(M), t.sortIndex = t.expirationTime, O(j, t);
    }
    t = S(M);
  }
}
function L(e) {
  if (N = !1, z(e), !R)
    if (null !== S(j))
      R = !0, r(B);
    else {
      var t = S(M);
      null !== t && o(L, t.startTime - e);
    }
}
function B(e, n) {
  R = !1, N && (N = !1, a()), D = !0;
  var r = P;
  try {
    for (z(n), T = S(j); null !== T && (!(T.expirationTime > n) || e && !i());) {
      var l = T.callback;
      if (null !== l) {
        T.callback = null, P = T.priorityLevel;
        var s = l(T.expirationTime <= n);
        n = t.unstable_now(), 'function' == typeof s ? T.callback = s : T === S(j) && k(j), z(n);
      } else
        k(j);
      T = S(j);
    }
    if (null !== T)
      var c = !0;
    else {
      var u = S(M);
      null !== u && o(L, u.startTime - n), c = !1;
    }
    return c;
  } finally {
    T = null, P = r, D = !1;
  }
}
function F(e) {
  switch (e) {
  case 1:
    return -1;
  case 2:
    return 250;
  case 5:
    return 1073741823;
  case 4:
    return 10000;
  default:
    return 5000;
  }
}
var H = l;
t.unstable_IdlePriority = 5, t.unstable_ImmediatePriority = 1, t.unstable_LowPriority = 4, t.unstable_NormalPriority = 3, t.unstable_Profiling = null, t.unstable_UserBlockingPriority = 2, t.unstable_cancelCallback = function (e) {
  e.callback = null;
}, t.unstable_continueExecution = function () {
  R || D || (R = !0, r(B));
}, t.unstable_getCurrentPriorityLevel = function () {
  return P;
}, t.unstable_getFirstCallbackNode = function () {
  return S(j);
}, t.unstable_next = function (e) {
  switch (P) {
  case 1:
  case 2:
  case 3:
    var t = 3;
    break;
  default:
    t = P;
  }
  var n = P;
  P = t;
  try {
    return e();
  } finally {
    P = n;
  }
}, t.unstable_pauseExecution = function () {
}, t.unstable_requestPaint = H, t.unstable_runWithPriority = function (e, t) {
  switch (e) {
  case 1:
  case 2:
  case 3:
  case 4:
  case 5:
    break;
  default:
    e = 3;
  }
  var n = P;
  P = e;
  try {
    return t();
  } finally {
    P = n;
  }
}, t.unstable_scheduleCallback = function (e, n, i) {
  var l = t.unstable_now();
  if ('object' == typeof i && null !== i) {
    var s = i.delay;
    s = 'number' == typeof s && 0 < s ? l + s : l, i = 'number' == typeof i.timeout ? i.timeout : F(e);
  } else
    i = F(e), s = l;
  return e = {
    id: I++,
    callback: n,
    priorityLevel: e,
    startTime: s,
    expirationTime: i = s + i,
    sortIndex: -1
  }, s > l ? (e.sortIndex = s, O(M, e), null === S(j) && e === S(M) && (N ? a() : N = !0, o(L, s - l))) : (e.sortIndex = i, O(j, e), R || D || (R = !0, r(B))), e;
}, t.unstable_shouldYield = function () {
  var e = t.unstable_now();
  z(e);
  var n = S(j);
  return n !== T && null !== T && null !== n && null !== n.callback && n.startTime <= e && n.expirationTime < T.expirationTime || i();
}, t.unstable_wrapCallback = function (e) {
  var t = P;
  return function () {
    var n = P;
    P = t;
    try {
      return e.apply(this, arguments);
    } finally {
      P = n;
    }
  };
};