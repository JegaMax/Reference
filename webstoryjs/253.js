'use strict';
function r(e) {
  return function () {
    return e;
  };
}
var o = function () {
};
o.thatReturns = r, o.thatReturnsFalse = r(!1), o.thatReturnsTrue = r(!0), o.thatReturnsNull = r(null), o.thatReturnsThis = function () {
  return this;
}, o.thatReturnsArgument = function (e) {
  return e;
}, e.exports = o;