var r = n('./296'), o = n('./18'), a = function (e) {
    return 'function' == typeof e ? e : void 0;
  };
e.exports = function (e, t) {
  return arguments.length < 2 ? a(r[e]) || a(o[e]) : r[e] && r[e][t] || o[e] && o[e][t];
};