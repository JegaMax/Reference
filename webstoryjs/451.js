var r = n('./222'), o = n('./28');
e.exports = function (e, t, n) {
  var a = !0, i = !0;
  if ('function' != typeof e)
    throw new TypeError('Expected a function');
  return o(n) && (a = 'leading' in n ? !!n.leading : a, i = 'trailing' in n ? !!n.trailing : i), r(e, t, {
    leading: a,
    maxWait: t,
    trailing: i
  });
};