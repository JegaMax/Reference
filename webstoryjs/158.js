'use strict';
var r = n('./511');
e.exports = function e(t, n) {
  return !(!t || !n) && (t === n || !r(t) && (r(n) ? e(t, n.parentNode) : 'contains' in t ? t.contains(n) : !!t.compareDocumentPosition && !!(16 & t.compareDocumentPosition(n))));
};