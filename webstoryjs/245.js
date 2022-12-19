'use strict';
var r = n('./34');
function o(e) {
  if (void 0 === e)
    throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
  return e;
}
function a(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
var i = n('./509'), l = n('./0'), s = n('./9'), c = n('./246'), u = n('./510').setDraftEditorSelection, f = function (e) {
    var t, n;
    function DraftEditorLeaf() {
      for (var t, n = arguments.length, r = new Array(n), i = 0; i < n; i++)
        r[i] = arguments[i];
      return a(o(t = e.call.apply(e, [this].concat(r)) || this), 'leaf', void 0), t;
    }
    n = e, (t = DraftEditorLeaf).prototype = Object.create(n.prototype), t.prototype.constructor = t, t.__proto__ = n;
    var f = DraftEditorLeaf.prototype;
    return f._setSelection = function () {
      var e = this.props.selection;
      if (null != e && e.getHasFocus()) {
        var t = this.props, n = t.block, r = t.start, o = t.text, a = n.getKey(), i = r + o.length;
        if (e.hasEdgeWithin(a, r, i)) {
          var l = this.leaf;
          l || s(!1);
          var f, d = l.firstChild;
          d || s(!1), d.nodeType === Node.TEXT_NODE ? f = d : c(d) ? f = l : (f = d.firstChild) || s(!1), u(e, f, a, r, i);
        }
      }
    }, f.shouldComponentUpdate = function (e) {
      var t = this.leaf;
      return t || s(!1), t.textContent !== e.text || e.styleSet !== this.props.styleSet || e.forceSelection;
    }, f.componentDidUpdate = function () {
      this._setSelection();
    }, f.componentDidMount = function () {
      this._setSelection();
    }, f.render = function () {
      var e = this, t = this.props.block, n = this.props.text;
      n.endsWith('\n') && this.props.isLast && (n += '\n');
      var o = this.props, a = o.customStyleMap, s = o.customStyleFn, c = o.offsetKey, u = o.styleSet, f = u.reduce(function (e, t) {
          var n = {}, o = a[t];
          return void 0 !== o && e.textDecoration !== o.textDecoration && (n.textDecoration = [
            e.textDecoration,
            o.textDecoration
          ].join(' ').trim()), r(e, o, n);
        }, {});
      if (s) {
        var d = s(u, t);
        f = r(f, d);
      }
      return l.createElement('span', {
        'data-offset-key': c,
        ref: function (t) {
          return e.leaf = t;
        },
        style: f
      }, l.createElement(i, null, n));
    }, DraftEditorLeaf;
  }(l.Component);
e.exports = f;