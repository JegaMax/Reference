'use strict';
var r = n('./109'), o = n('./236'), a = n('./243'), i = n('./9'), l = n('./55'), s = n('./22');
function c(e, t, n) {
  var a = t, c = r(a);
  (null != c || e && (e === a || e.firstChild === a) || i(!1), e === a) && (a = a.firstChild, l(a) || i(!1), 'true' !== (a = a).getAttribute('data-contents') && i(!1), n > 0 && (n = a.childNodes.length));
  if (0 === n) {
    var f = null;
    if (null != c)
      f = c;
    else {
      var d = function (e) {
        for (; e.firstChild && (l(e.firstChild) && 'true' === e.firstChild.getAttribute('data-blocks') || o(e.firstChild));)
          e = e.firstChild;
        return e;
      }(a);
      f = s(o(d));
    }
    return {
      key: f,
      offset: 0
    };
  }
  var p = a.childNodes[n - 1], h = null, g = null;
  if (o(p)) {
    var m = function (e) {
      for (; e.lastChild && (l(e.lastChild) && 'true' === e.lastChild.getAttribute('data-blocks') || o(e.lastChild));)
        e = e.lastChild;
      return e;
    }(p);
    h = s(o(m)), g = u(m);
  } else
    h = s(c), g = u(p);
  return {
    key: h,
    offset: g
  };
}
function u(e) {
  var t = e.textContent;
  return '\n' === t ? 0 : t.length;
}
e.exports = function (e, t, n, o, i, l) {
  var u = n.nodeType === Node.TEXT_NODE, f = i.nodeType === Node.TEXT_NODE;
  if (u && f)
    return {
      selectionState: a(e, s(r(n)), o, s(r(i)), l),
      needsRecovery: !1
    };
  var d = null, p = null, h = !0;
  return u ? (d = {
    key: s(r(n)),
    offset: o
  }, p = c(t, i, l)) : f ? (p = {
    key: s(r(i)),
    offset: l
  }, d = c(t, n, o)) : (d = c(t, n, o), p = c(t, i, l), n === i && o === l && (h = !!n.firstChild && 'BR' !== n.firstChild.nodeName)), {
    selectionState: a(e, d.key, d.offset, p.key, p.offset),
    needsRecovery: h
  };
};