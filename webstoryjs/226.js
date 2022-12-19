var r = n('./47'), o = n('./41');
e.exports = function (e) {
  if (void 0 === e)
    return 0;
  var t = r(e), n = o(t);
  if (t !== n)
    throw RangeError('Wrong length or index');
  return n;
};