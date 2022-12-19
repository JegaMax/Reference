'use strict';
var r = 'function' == typeof Symbol && Symbol.for, o = r ? Symbol.for('react.element') : 60103, a = r ? Symbol.for('react.portal') : 60106, i = r ? Symbol.for('react.fragment') : 60107, l = r ? Symbol.for('react.strict_mode') : 60108, s = r ? Symbol.for('react.profiler') : 60114, c = r ? Symbol.for('react.provider') : 60109, u = r ? Symbol.for('react.context') : 60110, f = r ? Symbol.for('react.async_mode') : 60111, d = r ? Symbol.for('react.concurrent_mode') : 60111, p = r ? Symbol.for('react.forward_ref') : 60112, h = r ? Symbol.for('react.suspense') : 60113, g = r ? Symbol.for('react.suspense_list') : 60120, m = r ? Symbol.for('react.memo') : 60115, b = r ? Symbol.for('react.lazy') : 60116, v = r ? Symbol.for('react.block') : 60121, y = r ? Symbol.for('react.fundamental') : 60117, C = r ? Symbol.for('react.responder') : 60118, w = r ? Symbol.for('react.scope') : 60119;
function x(e) {
  if ('object' == typeof e && null !== e) {
    var t = e.$$typeof;
    switch (t) {
    case o:
      switch (e = e.type) {
      case f:
      case d:
      case i:
      case s:
      case l:
      case h:
        return e;
      default:
        switch (e = e && e.$$typeof) {
        case u:
        case p:
        case b:
        case m:
        case c:
          return e;
        default:
          return t;
        }
      }
    case a:
      return t;
    }
  }
}
function E(e) {
  return x(e) === d;
}
t.AsyncMode = f, t.ConcurrentMode = d, t.ContextConsumer = u, t.ContextProvider = c, t.Element = o, t.ForwardRef = p, t.Fragment = i, t.Lazy = b, t.Memo = m, t.Portal = a, t.Profiler = s, t.StrictMode = l, t.Suspense = h, t.isAsyncMode = function (e) {
  return E(e) || x(e) === f;
}, t.isConcurrentMode = E, t.isContextConsumer = function (e) {
  return x(e) === u;
}, t.isContextProvider = function (e) {
  return x(e) === c;
}, t.isElement = function (e) {
  return 'object' == typeof e && null !== e && e.$$typeof === o;
}, t.isForwardRef = function (e) {
  return x(e) === p;
}, t.isFragment = function (e) {
  return x(e) === i;
}, t.isLazy = function (e) {
  return x(e) === b;
}, t.isMemo = function (e) {
  return x(e) === m;
}, t.isPortal = function (e) {
  return x(e) === a;
}, t.isProfiler = function (e) {
  return x(e) === s;
}, t.isStrictMode = function (e) {
  return x(e) === l;
}, t.isSuspense = function (e) {
  return x(e) === h;
}, t.isValidElementType = function (e) {
  return 'string' == typeof e || 'function' == typeof e || e === i || e === d || e === s || e === l || e === h || e === g || 'object' == typeof e && null !== e && (e.$$typeof === b || e.$$typeof === m || e.$$typeof === c || e.$$typeof === u || e.$$typeof === p || e.$$typeof === y || e.$$typeof === C || e.$$typeof === w || e.$$typeof === v);
}, t.typeOf = x;