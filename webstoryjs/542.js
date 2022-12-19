'use strict';
var r = n('./56'), o = n('./110'), a = n('./257'), i = n('./9');
function l(e, t) {
  for (var n = 1 / 0, r = 1 / 0, o = -1 / 0, a = -1 / 0, i = 0; i < e.length; i++) {
    var l = e[i];
    0 !== l.width && 1 !== l.width && (n = Math.min(n, l.top), r = Math.min(r, l.bottom), o = Math.max(o, l.top), a = Math.max(a, l.bottom));
  }
  return o <= r && o - n < t && a - r < t;
}
function s(e) {
  switch (e.nodeType) {
  case Node.DOCUMENT_TYPE_NODE:
    return 0;
  case Node.TEXT_NODE:
  case Node.PROCESSING_INSTRUCTION_NODE:
  case Node.COMMENT_NODE:
    return e.length;
  default:
    return e.childNodes.length;
  }
}
e.exports = function (e) {
  e.collapsed || i(!1);
  var t = (e = e.cloneRange()).startContainer;
  1 !== t.nodeType && (t = t.parentNode);
  var n = function (e) {
      var t = getComputedStyle(e), n = o(e), r = n.createElement('div');
      r.style.fontFamily = t.fontFamily, r.style.fontSize = t.fontSize, r.style.fontStyle = t.fontStyle, r.style.fontWeight = t.fontWeight, r.style.lineHeight = t.lineHeight, r.style.position = 'absolute', r.textContent = 'M';
      var a = n.body;
      a || i(!1), a.appendChild(r);
      var l = r.getBoundingClientRect();
      return a.removeChild(r), l.height;
    }(t), c = e.endContainer, u = e.endOffset;
  for (e.setStart(e.startContainer, 0); l(a(e), n) && (c = e.startContainer, u = e.startOffset, c.parentNode || i(!1), e.setStartBefore(c), 1 !== c.nodeType || 'inline' === getComputedStyle(c).display););
  for (var f = c, d = u - 1;;) {
    for (var p = f.nodeValue, h = d; h >= 0; h--)
      if (!(null != p && h > 0 && r.isSurrogatePair(p, h - 1))) {
        if (e.setStart(f, h), !l(a(e), n))
          break;
        c = f, u = h;
      }
    if (-1 === h || 0 === f.childNodes.length)
      break;
    d = s(f = f.childNodes[h]);
  }
  return e.setStart(c, u), e;
};