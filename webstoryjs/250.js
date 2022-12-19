'use strict';
function r() {
  var e;
  return document.documentElement && (e = document.documentElement.clientWidth), !e && document.body && (e = document.body.clientWidth), e || 0;
}
function o() {
  var e;
  return document.documentElement && (e = document.documentElement.clientHeight), !e && document.body && (e = document.body.clientHeight), e || 0;
}
function a() {
  return {
    width: window.innerWidth || r(),
    height: window.innerHeight || o()
  };
}
a.withoutScrollbars = function () {
  return {
    width: r(),
    height: o()
  };
}, e.exports = a;