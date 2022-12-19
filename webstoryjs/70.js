var r = n('./32'), o = n('./302');
e.exports = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var e, t = !1, n = {};
  try {
    (e = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set).call(n, []), t = n instanceof Array;
  } catch (e) {
  }
  return function (n, a) {
    return r(n), o(a), t ? e.call(n, a) : n.__proto__ = a, n;
  };
}() : void 0);