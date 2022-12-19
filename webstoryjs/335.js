var r = n('./71'), o = Object.prototype, a = o.hasOwnProperty, i = o.toString, l = r ? r.toStringTag : void 0;
e.exports = function (e) {
  var t = a.call(e, l), n = e[l];
  try {
    e[l] = void 0;
    var r = !0;
  } catch (e) {
  }
  var o = i.call(e);
  return r && (t ? e[l] = n : delete e[l]), o;
};