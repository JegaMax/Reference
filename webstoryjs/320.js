var r = n('./85'), o = n('./133');
e.exports = function (e, t) {
  var n = e.exec;
  if ('function' == typeof n) {
    var a = n.call(e, t);
    if ('object' != typeof a)
      throw TypeError('RegExp exec method returned something other than an Object or null');
    return a;
  }
  if ('RegExp' !== r(e))
    throw TypeError('RegExp#exec called on incompatible receiver');
  return o.call(e, t);
};