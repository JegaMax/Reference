'use strict';
var r = 'undefined' != typeof navigator && navigator.userAgent.indexOf('AppleWebKit') > -1;
e.exports = function (e) {
  return (e = e || document).scrollingElement ? e.scrollingElement : r || 'CSS1Compat' !== e.compatMode ? e.body : e.documentElement;
};