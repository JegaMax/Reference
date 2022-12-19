var r = n('./149'), o = n('./73'), a = Object.prototype.hasOwnProperty;
e.exports = function (e, t, n) {
  var i = e[t];
  a.call(e, t) && o(i, n) && (void 0 !== n || t in e) || r(e, t, n);
};