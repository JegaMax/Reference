var r = n('./338'), o = n('./136'), a = n('./25'), i = n('./93'), l = n('./137'), s = n('./138'), c = Object.prototype.hasOwnProperty;
e.exports = function (e, t) {
  var n = a(e), u = !n && o(e), f = !n && !u && i(e), d = !n && !u && !f && s(e), p = n || u || f || d, h = p ? r(e.length, String) : [], g = h.length;
  for (var m in e)
    !t && !c.call(e, m) || p && ('length' == m || f && ('offset' == m || 'parent' == m) || d && ('buffer' == m || 'byteLength' == m || 'byteOffset' == m) || l(m, g)) || h.push(m);
  return h;
};