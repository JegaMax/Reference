'use strict';
function r(e) {
  return e.replace(/\//g, '-');
}
e.exports = function (e) {
  return 'object' == typeof e ? Object.keys(e).filter(function (t) {
    return e[t];
  }).map(r).join(' ') : Array.prototype.map.call(arguments, r).join(' ');
};