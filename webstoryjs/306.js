var r = n('./32'), o = n('./307');
e.exports = function (e, t, n, a) {
  try {
    return a ? t(r(n)[0], n[1]) : t(n);
  } catch (t) {
    throw o(e), t;
  }
};