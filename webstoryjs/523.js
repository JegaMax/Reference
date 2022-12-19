'use strict';
var r = n('./9');
e.exports = function (e) {
  return function (e) {
    return !!e && ('object' == typeof e || 'function' == typeof e) && 'length' in e && !('setInterval' in e) && 'number' != typeof e.nodeType && (Array.isArray(e) || 'callee' in e || 'item' in e);
  }(e) ? Array.isArray(e) ? e.slice() : function (e) {
    var t = e.length;
    if ((Array.isArray(e) || 'object' != typeof e && 'function' != typeof e) && r(!1), 'number' != typeof t && r(!1), 0 === t || t - 1 in e || r(!1), 'function' == typeof e.callee && r(!1), e.hasOwnProperty)
      try {
        return Array.prototype.slice.call(e);
      } catch (e) {
      }
    for (var n = Array(t), o = 0; o < t; o++)
      n[o] = e[o];
    return n;
  }(e) : [e];
};