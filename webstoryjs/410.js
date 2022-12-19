var r = n('./28'), o = n('./142'), a = n('./411'), i = Object.prototype.hasOwnProperty;
e.exports = function (e) {
  if (!r(e))
    return a(e);
  var t = o(e), n = [];
  for (var l in e)
    ('constructor' != l || !t && i.call(e, l)) && n.push(l);
  return n;
};