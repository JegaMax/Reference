var r = n('./142'), o = n('./343'), a = Object.prototype.hasOwnProperty;
e.exports = function (e) {
  if (!r(e))
    return o(e);
  var t = [];
  for (var n in Object(e))
    a.call(e, n) && 'constructor' != n && t.push(n);
  return t;
};