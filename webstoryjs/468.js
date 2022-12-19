var r = n('./469');
e.exports = function (e, t) {
  var n = r(e);
  if (n % t)
    throw RangeError('Wrong offset');
  return n;
};