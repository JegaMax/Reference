var r = n('./37');
e.exports = function (e, t) {
  if (!r(e))
    return e;
  var n, o;
  if (t && 'function' == typeof (n = e.toString) && !r(o = n.call(e)))
    return o;
  if ('function' == typeof (n = e.valueOf) && !r(o = n.call(e)))
    return o;
  if (!t && 'function' == typeof (n = e.toString) && !r(o = n.call(e)))
    return o;
  throw TypeError('Can\'t convert object to primitive value');
};