'use strict';
var r = n('./8').List, o = function () {
    function CompositeDraftDecorator(e) {
      var t, n, r;
      r = void 0, (n = '_decorators') in (t = this) ? Object.defineProperty(t, n, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }) : t[n] = r, this._decorators = e.slice();
    }
    var e = CompositeDraftDecorator.prototype;
    return e.getDecorations = function (e, t) {
      var n = Array(e.getText().length).fill(null);
      return this._decorators.forEach(function (r, o) {
        var a = 0;
        (0, r.strategy)(e, function (e, t) {
          (function (e, t, n) {
            for (var r = t; r < n; r++)
              if (null != e[r])
                return !1;
            return !0;
          }(n, e, t) && (!function (e, t, n, r) {
            for (var o = t; o < n; o++)
              e[o] = r;
          }(n, e, t, o + '.' + a), a++));
        }, t);
      }), r(n);
    }, e.getComponentForKey = function (e) {
      var t = parseInt(e.split('.')[0], 10);
      return this._decorators[t].component;
    }, e.getPropsForKey = function (e) {
      var t = parseInt(e.split('.')[0], 10);
      return this._decorators[t].props;
    }, CompositeDraftDecorator;
  }();
e.exports = o;