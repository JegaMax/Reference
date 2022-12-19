'use strict';
function r(e, t) {
  return !!t && (e === t.documentElement || e === t.body);
}
var o = {
  getTop: function (e) {
    var t = e.ownerDocument;
    return r(e, t) ? t.body.scrollTop || t.documentElement.scrollTop : e.scrollTop;
  },
  setTop: function (e, t) {
    var n = e.ownerDocument;
    r(e, n) ? n.body.scrollTop = n.documentElement.scrollTop = t : e.scrollTop = t;
  },
  getLeft: function (e) {
    var t = e.ownerDocument;
    return r(e, t) ? t.body.scrollLeft || t.documentElement.scrollLeft : e.scrollLeft;
  },
  setLeft: function (e, t) {
    var n = e.ownerDocument;
    r(e, n) ? n.body.scrollLeft = n.documentElement.scrollLeft = t : e.scrollLeft = t;
  }
};
e.exports = o;