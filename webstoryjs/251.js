'use strict';
var r = n('./34');
function o() {
  return (o = r || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }).apply(this, arguments);
}
function a(e) {
  if (void 0 === e)
    throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
  return e;
}
function i(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
var l = n('./245'), s = n('./42'), c = n('./0'), u = n('./159'), f = n('./112'), d = n('./155'), p = n('./108'), h = n('./54'), g = n('./249'), m = n('./113'), b = n('./250'), v = n('./9'), y = n('./77'), C = n('./22'), w = function (e, t) {
    return e.getAnchorKey() === t || e.getFocusKey() === t;
  }, x = function (e) {
    var t, n;
    function DraftEditorBlock() {
      for (var t, n = arguments.length, r = new Array(n), o = 0; o < n; o++)
        r[o] = arguments[o];
      return i(a(t = e.call.apply(e, [this].concat(r)) || this), '_node', void 0), t;
    }
    n = e, (t = DraftEditorBlock).prototype = Object.create(n.prototype), t.prototype.constructor = t, t.__proto__ = n;
    var r = DraftEditorBlock.prototype;
    return r.shouldComponentUpdate = function (e) {
      return this.props.block !== e.block || this.props.tree !== e.tree || this.props.direction !== e.direction || w(e.selection, e.block.getKey()) && e.forceSelection;
    }, r.componentDidMount = function () {
      if (!this.props.preventScroll) {
        var e = this.props.selection, t = e.getEndKey();
        if (e.getHasFocus() && t === this.props.block.getKey()) {
          var n = this._node;
          if (null != n) {
            var r, o = f.getScrollParent(n), a = m(o);
            if (o === window) {
              var i = g(n);
              (r = i.y + i.height - b().height) > 0 && window.scrollTo(a.x, a.y + r + 10);
            } else {
              y(n) || v(!1), (r = n.offsetHeight + n.offsetTop - (o.offsetTop + o.offsetHeight + a.y)) > 0 && u.setTop(o, u.getTop(o) + r + 10);
            }
          }
        }
      }
    }, r._renderChildren = function () {
      var e = this, t = this.props.block, n = t.getKey(), r = t.getText(), a = this.props.tree.size - 1, i = w(this.props.selection, n);
      return this.props.tree.map(function (u, f) {
        var h = u.get('leaves');
        if (0 === h.size)
          return null;
        var g = h.size - 1, m = h.map(function (o, u) {
            var d = s.encode(n, f, u), p = o.get('start'), h = o.get('end');
            return c.createElement(l, {
              key: d,
              offsetKey: d,
              block: t,
              start: p,
              selection: i ? e.props.selection : null,
              forceSelection: e.props.forceSelection,
              text: r.slice(p, h),
              styleSet: t.getInlineStyleAt(p),
              customStyleMap: e.props.customStyleMap,
              customStyleFn: e.props.customStyleFn,
              isLast: f === a && u === g
            });
          }).toArray(), b = u.get('decoratorKey');
        if (null == b)
          return m;
        if (!e.props.decorator)
          return m;
        var v = C(e.props.decorator), y = v.getComponentForKey(b);
        if (!y)
          return m;
        var w = v.getPropsForKey(b), x = s.encode(n, f, 0), E = h.first().get('start'), _ = h.last().get('end'), O = r.slice(E, _), S = t.getEntityAt(u.get('start')), k = p.getHTMLDirIfDifferent(d.getDirection(O), e.props.direction), A = {
            contentState: e.props.contentState,
            decoratedText: O,
            dir: k,
            start: E,
            end: _,
            blockKey: n,
            entityKey: S,
            offsetKey: x
          };
        return c.createElement(y, o({}, w, A, { key: x }), m);
      }).toArray();
    }, r.render = function () {
      var e = this, t = this.props, n = t.direction, r = t.offsetKey, o = h({
          'public/DraftStyleDefault/block': !0,
          'public/DraftStyleDefault/ltr': 'LTR' === n,
          'public/DraftStyleDefault/rtl': 'RTL' === n
        });
      return c.createElement('div', {
        'data-offset-key': r,
        className: o,
        ref: function (t) {
          return e._node = t;
        }
      }, this._renderChildren());
    }, DraftEditorBlock;
  }(c.Component);
e.exports = x;