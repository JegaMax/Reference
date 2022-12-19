'use strict';
var r = n('./32');
e.exports = function () {
  var e = r(this), t = '';
  return e.global && (t += 'g'), e.ignoreCase && (t += 'i'), e.multiline && (t += 'm'), e.dotAll && (t += 's'), e.unicode && (t += 'u'), e.sticky && (t += 'y'), t;
};