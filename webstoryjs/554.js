'use strict';
var r = function () {
  function URI(e) {
    var t, n, r;
    r = void 0, (n = '_uri') in (t = this) ? Object.defineProperty(t, n, {
      value: r,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : t[n] = r, this._uri = e;
  }
  return URI.prototype.toString = function () {
    return this._uri;
  }, URI;
}();
e.exports = r;