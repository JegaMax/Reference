'use strict';
var r = n('./283');
function o() {
}
function a() {
}
a.resetWarningCache = o, e.exports = function () {
  function e(e, t, n, o, a, i) {
    if (i !== r) {
      var l = new Error('Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types');
      throw l.name = 'Invariant Violation', l;
    }
  }
  function t() {
    return e;
  }
  e.isRequired = e;
  var n = {
    array: e,
    bool: e,
    func: e,
    number: e,
    object: e,
    string: e,
    symbol: e,
    any: e,
    arrayOf: t,
    element: e,
    elementType: e,
    instanceOf: t,
    node: e,
    objectOf: t,
    oneOf: t,
    oneOfType: t,
    shape: t,
    exact: t,
    checkPropTypes: a,
    resetWarningCache: o
  };
  return n.PropTypes = n, n;
};