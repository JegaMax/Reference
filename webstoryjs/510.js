'use strict';
var r = n('./247'), o = n('./239'), a = n('./23'), i = n('./158'), l = n('./248'), s = n('./110'), c = n('./9'), u = n('./55'), f = a.isBrowser('IE');
function d(e, t) {
  if (!e)
    return '[empty]';
  var n = p(e, t);
  return n.nodeType === Node.TEXT_NODE ? n.textContent : (u(n) || c(!1), n.outerHTML);
}
function p(e, t) {
  var n = void 0 !== t ? t(e) : [];
  if (e.nodeType === Node.TEXT_NODE) {
    var r = e.textContent.length;
    return s(e).createTextNode('[text ' + r + (n.length ? ' | ' + n.join(', ') : '') + ']');
  }
  var o = e.cloneNode();
  1 === o.nodeType && n.length && o.setAttribute('data-labels', n.join(', '));
  for (var a = e.childNodes, i = 0; i < a.length; i++)
    o.appendChild(p(a[i], t));
  return o;
}
function h(e, t) {
  for (var n = e, r = n; n;) {
    if (u(n) && r.hasAttribute('contenteditable'))
      return d(n, t);
    r = n = n.parentNode;
  }
  return 'Could not find contentEditable parent of node';
}
function g(e) {
  return null === e.nodeValue ? e.childNodes.length : e.nodeValue.length;
}
function m(e, t, n, r) {
  var a = l();
  if (e.extend && null != t && i(a, t)) {
    n > g(t) && o.logSelectionStateFailure({
      anonymizedDom: h(t),
      extraParams: JSON.stringify({ offset: n }),
      selectionState: JSON.stringify(r.toJS())
    });
    var s = t === e.focusNode;
    try {
      e.rangeCount > 0 && e.extend && e.extend(t, n);
    } catch (i) {
      throw o.logSelectionStateFailure({
        anonymizedDom: h(t, function (t) {
          var n = [];
          return t === a && n.push('active element'), t === e.anchorNode && n.push('selection anchor node'), t === e.focusNode && n.push('selection focus node'), n;
        }),
        extraParams: JSON.stringify({
          activeElementName: a ? a.nodeName : null,
          nodeIsFocus: t === e.focusNode,
          nodeWasFocus: s,
          selectionRangeCount: e.rangeCount,
          selectionAnchorNodeName: e.anchorNode ? e.anchorNode.nodeName : null,
          selectionAnchorOffset: e.anchorOffset,
          selectionFocusNodeName: e.focusNode ? e.focusNode.nodeName : null,
          selectionFocusOffset: e.focusOffset,
          message: i ? '' + i : null,
          offset: n
        }, null, 2),
        selectionState: JSON.stringify(r.toJS(), null, 2)
      }), i;
    }
  } else if (t && e.rangeCount > 0) {
    var c = e.getRangeAt(0);
    c.setEnd(t, n), e.addRange(c.cloneRange());
  }
}
function b(e, t, n, a) {
  var i = s(t).createRange();
  if (n > g(t) && (o.logSelectionStateFailure({
      anonymizedDom: h(t),
      extraParams: JSON.stringify({ offset: n }),
      selectionState: JSON.stringify(a.toJS())
    }), r.handleExtensionCausedError()), i.setStart(t, n), f)
    try {
      e.addRange(i);
    } catch (e) {
      0;
    }
  else
    e.addRange(i);
}
e.exports = {
  setDraftEditorSelection: function (e, t, n, r, o) {
    var a = s(t);
    if (i(a.documentElement, t)) {
      var l = a.defaultView.getSelection(), c = e.getAnchorKey(), u = e.getAnchorOffset(), f = e.getFocusKey(), d = e.getFocusOffset(), p = e.getIsBackward();
      if (!l.extend && p) {
        var h = c, g = u;
        c = f, u = d, f = h, d = g, p = !1;
      }
      var v = c === n && r <= u && o >= u, y = f === n && r <= d && o >= d;
      if (v && y)
        return l.removeAllRanges(), b(l, t, u - r, e), void m(l, t, d - r, e);
      if (p) {
        if (y && (l.removeAllRanges(), b(l, t, d - r, e)), v) {
          var C = l.focusNode, w = l.focusOffset;
          l.removeAllRanges(), b(l, t, u - r, e), m(l, C, w, e);
        }
      } else
        v && (l.removeAllRanges(), b(l, t, u - r, e)), y && m(l, t, d - r, e);
    }
  },
  addFocusToSelection: m
};