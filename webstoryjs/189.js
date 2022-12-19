var n, r, o = e.exports = {};
function a() {
  throw new Error('setTimeout has not been defined');
}
function i() {
  throw new Error('clearTimeout has not been defined');
}
function l(e) {
  if (n === setTimeout)
    return setTimeout(e, 0);
  if ((n === a || !n) && setTimeout)
    return n = setTimeout, setTimeout(e, 0);
  try {
    return n(e, 0);
  } catch (t) {
    try {
      return n.call(null, e, 0);
    } catch (t) {
      return n.call(this, e, 0);
    }
  }
}
!function () {
  try {
    n = 'function' == typeof setTimeout ? setTimeout : a;
  } catch (e) {
    n = a;
  }
  try {
    r = 'function' == typeof clearTimeout ? clearTimeout : i;
  } catch (e) {
    r = i;
  }
}();
var s, c = [], u = !1, f = -1;
function d() {
  u && s && (u = !1, s.length ? c = s.concat(c) : f = -1, c.length && p());
}
function p() {
  if (!u) {
    var e = l(d);
    u = !0;
    for (var t = c.length; t;) {
      for (s = c, c = []; ++f < t;)
        s && s[f].run();
      f = -1, t = c.length;
    }
    s = null, u = !1, function (e) {
      if (r === clearTimeout)
        return clearTimeout(e);
      if ((r === i || !r) && clearTimeout)
        return r = clearTimeout, clearTimeout(e);
      try {
        r(e);
      } catch (t) {
        try {
          return r.call(null, e);
        } catch (t) {
          return r.call(this, e);
        }
      }
    }(e);
  }
}
function Item(e, t) {
  this.fun = e, this.array = t;
}
function h() {
}
o.nextTick = function (e) {
  var t = new Array(arguments.length - 1);
  if (arguments.length > 1)
    for (var n = 1; n < arguments.length; n++)
      t[n - 1] = arguments[n];
  c.push(new Item(e, t)), 1 !== c.length || u || l(p);
}, Item.prototype.run = function () {
  this.fun.apply(null, this.array);
}, o.title = 'browser', o.browser = !0, o.env = {}, o.argv = [], o.version = '', o.versions = {}, o.on = h, o.addListener = h, o.once = h, o.off = h, o.removeListener = h, o.removeAllListeners = h, o.emit = h, o.prependListener = h, o.prependOnceListener = h, o.listeners = function (e) {
  return [];
}, o.binding = function (e) {
  throw new Error('process.binding is not supported');
}, o.cwd = function () {
  return '/';
}, o.chdir = function (e) {
  throw new Error('process.chdir is not supported');
}, o.umask = function () {
  return 0;
};