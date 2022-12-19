'use strict';
var r = n('./50'), o = n('./179'), a = n('./41');
e.exports = function (e) {
  for (var t = r(this), n = a(t.length), i = arguments.length, l = o(i > 1 ? arguments[1] : void 0, n), s = i > 2 ? arguments[2] : void 0, c = void 0 === s ? n : o(s, n); c > l;)
    t[l++] = e;
  return t;
};