var r = n('./19')('iterator'), o = !1;
try {
  var a = 0, i = {
      next: function () {
        return { done: !!a++ };
      },
      return: function () {
        o = !0;
      }
    };
  i[r] = function () {
    return this;
  }, Array.from(i, function () {
    throw 2;
  });
} catch (e) {
}
e.exports = function (e, t) {
  if (!t && !o)
    return !1;
  var n = !1;
  try {
    var a = {};
    a[r] = function () {
      return {
        next: function () {
          return { done: n = !0 };
        }
      };
    }, e(a);
  } catch (e) {
  }
  return n;
};