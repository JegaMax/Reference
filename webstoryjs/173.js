var r = n('./31'), o = n('./27'), a = n('./174');
e.exports = !r && !o(function () {
  return 7 != Object.defineProperty(a('div'), 'a', {
    get: function () {
      return 7;
    }
  }).a;
});