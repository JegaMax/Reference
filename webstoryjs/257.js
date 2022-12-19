'use strict';
var r = n('./23'), o = n('./9');
var a = r.isBrowser('Chrome') ? function (e) {
  for (var t = e.cloneRange(), n = [], r = e.endContainer; null != r; r = r.parentNode) {
    var a = r === e.commonAncestorContainer;
    a ? t.setStart(e.startContainer, e.startOffset) : t.setStart(t.endContainer, 0);
    var i, l = Array.from(t.getClientRects());
    if (n.push(l), a)
      return n.reverse(), (i = []).concat.apply(i, n);
    t.setEndBefore(r);
  }
  o(!1);
} : function (e) {
  return Array.from(e.getClientRects());
};
e.exports = a;