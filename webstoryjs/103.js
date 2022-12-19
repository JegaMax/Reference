var r = n('./102');
e.exports = function (e) {
  if ('string' == typeof e || r(e))
    return e;
  var t = e + '';
  return '0' == t && 1 / e == -Infinity ? '-0' : t;
};