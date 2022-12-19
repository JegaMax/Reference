var r = n('./37');
e.exports = function (e) {
  if (!r(e))
    throw TypeError(String(e) + ' is not an object');
  return e;
};