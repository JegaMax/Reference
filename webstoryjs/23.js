'use strict';
var r = n('./499'), o = n('./501'), a = n('./502'), i = n('./503');
function l(e, t, n, r) {
  if (e === n)
    return !0;
  if (!n.startsWith(e))
    return !1;
  var a = n.slice(e.length);
  return !!t && (a = r ? r(a) : a, o.contains(a, t));
}
function s(e) {
  return 'Windows' === r.platformName ? e.replace(/^\s*NT/, '') : e;
}
var c = {
  isBrowser: function (e) {
    return l(r.browserName, r.browserFullVersion, e);
  },
  isBrowserArchitecture: function (e) {
    return l(r.browserArchitecture, null, e);
  },
  isDevice: function (e) {
    return l(r.deviceName, null, e);
  },
  isEngine: function (e) {
    return l(r.engineName, r.engineVersion, e);
  },
  isPlatform: function (e) {
    return l(r.platformName, r.platformFullVersion, e, s);
  },
  isPlatformArchitecture: function (e) {
    return l(r.platformArchitecture, null, e);
  }
};
e.exports = a(c, i);