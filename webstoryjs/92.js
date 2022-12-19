var r = n('./309'), o = n('./85'), a = n('./19')('toStringTag'), i = 'Arguments' == o(function () {
    return arguments;
  }());
e.exports = r ? o : function (e) {
  var t, n, r;
  return void 0 === e ? 'Undefined' : null === e ? 'Null' : 'string' == typeof (n = function (e, t) {
    try {
      return e[t];
    } catch (e) {
    }
  }(t = Object(e), a)) ? n : i ? o(t) : 'Object' == (r = o(t)) && 'function' == typeof t.callee ? 'Arguments' : r;
};