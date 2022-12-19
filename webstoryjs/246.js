'use strict';
var r = n('./55');
e.exports = function (e) {
  return !(!e || !e.ownerDocument) && r(e) && 'BR' === e.nodeName;
};