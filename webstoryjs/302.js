var r = n('./37');
e.exports = function (e) {
  if (!r(e) && null !== e)
    throw TypeError('Can\'t set ' + String(e) + ' as a prototype');
  return e;
};