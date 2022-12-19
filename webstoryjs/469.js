var r = n('./47');
e.exports = function (e) {
  var t = r(e);
  if (t < 0)
    throw RangeError('The argument can\'t be less than 0');
  return t;
};