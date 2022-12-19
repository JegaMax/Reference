'use strict';
var r = n('./55');
e.exports = function (e) {
  return !(!e || !e.ownerDocument) && r(e) && 'IMG' === e.nodeName;
};