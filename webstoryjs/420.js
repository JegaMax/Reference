var r = n('./28'), o = Object.create, a = function () {
    function e() {
    }
    return function (t) {
      if (!r(t))
        return {};
      if (o)
        return o(t);
      e.prototype = t;
      var n = new e();
      return e.prototype = void 0, n;
    };
  }();
e.exports = a;