var r = n('./27');
e.exports = !r(function () {
  return 7 != Object.defineProperty({}, 1, {
    get: function () {
      return 7;
    }
  })[1];
});