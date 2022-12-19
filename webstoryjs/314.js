var r = n('./32'), o = n('./91');
e.exports = function (e) {
  var t = o(e);
  if ('function' != typeof t)
    throw TypeError(String(e) + ' is not iterable');
  return r(t.call(e));
};