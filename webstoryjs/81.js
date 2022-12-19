e.exports = function (e) {
  if (null == e)
    throw TypeError('Can\'t call method on ' + e);
  return e;
};