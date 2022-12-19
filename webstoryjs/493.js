'use strict';
function r(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
var o = n('./155'), a = n('./108'), i = n('./9'), l = function () {
    function UnicodeBidiService(e) {
      r(this, '_defaultDir', void 0), r(this, '_lastDir', void 0), e ? a.isStrong(e) || i(!1) : e = a.getGlobalDir(), this._defaultDir = e, this.reset();
    }
    var e = UnicodeBidiService.prototype;
    return e.reset = function () {
      this._lastDir = this._defaultDir;
    }, e.getDirection = function (e) {
      return this._lastDir = o.getDirection(e, this._lastDir), this._lastDir;
    }, UnicodeBidiService;
  }();
e.exports = l;