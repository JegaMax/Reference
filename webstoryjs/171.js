'use strict';
Object.defineProperty(t, '__esModule', { value: !0 });
var r = new function PortalOpenInstances() {
  var e = this;
  !function (e, t) {
    if (!(e instanceof t))
      throw new TypeError('Cannot call a class as a function');
  }(this, PortalOpenInstances), this.register = function (t) {
    -1 === e.openInstances.indexOf(t) && (e.openInstances.push(t), e.emit('register'));
  }, this.deregister = function (t) {
    var n = e.openInstances.indexOf(t);
    -1 !== n && (e.openInstances.splice(n, 1), e.emit('deregister'));
  }, this.subscribe = function (t) {
    e.subscribers.push(t);
  }, this.emit = function (t) {
    e.subscribers.forEach(function (n) {
      return n(t, e.openInstances.slice());
    });
  }, this.openInstances = [], this.subscribers = [];
}();
t.default = r, e.exports = t.default;