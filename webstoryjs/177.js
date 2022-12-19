'use strict';
var r = {}.propertyIsEnumerable, o = Object.getOwnPropertyDescriptor, a = o && !r.call({ 1: 2 }, 1);
t.f = a ? function (e) {
  var t = o(this, e);
  return !!t && t.enumerable;
} : r;