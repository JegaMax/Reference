'use strict';
function r(e, t) {
  if (!(e instanceof t))
    throw new TypeError('Cannot call a class as a function');
}
t.__esModule = !0;
var o, a = n('./134'), i = (o = a) && o.__esModule ? o : { default: o }, l = function (e) {
    function PureComponent() {
      r(this, PureComponent), null != e && e.apply(this, arguments);
    }
    return function (e, t) {
      if ('function' != typeof t && null !== t)
        throw new TypeError('Super expression must either be null or a function, not ' + typeof t);
      e.prototype = Object.create(t && t.prototype, {
        constructor: {
          value: e,
          enumerable: !1,
          writable: !0,
          configurable: !0
        }
      }), t && (e.__proto__ = t);
    }(PureComponent, e), PureComponent;
  }(n('./0').Component);
t.default = l, l.prototype.shouldComponentUpdate = i.default, e.exports = t.default;