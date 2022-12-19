'use strict';
var r = function (e) {
  var t, n;
  function DraftEntityInstance() {
    return e.apply(this, arguments) || this;
  }
  n = e, (t = DraftEntityInstance).prototype = Object.create(n.prototype), t.prototype.constructor = t, t.__proto__ = n;
  var r = DraftEntityInstance.prototype;
  return r.getType = function () {
    return this.get('type');
  }, r.getMutability = function () {
    return this.get('mutability');
  }, r.getData = function () {
    return this.get('data');
  }, DraftEntityInstance;
}((0, n('./8').Record)({
  type: 'TOKEN',
  mutability: 'IMMUTABLE',
  data: Object
}));
e.exports = r;