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
function i(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = null != arguments[t] ? arguments[t] : {}, r = Object.keys(n);
    'function' == typeof Object.getOwnPropertySymbols && (r = r.concat(Object.getOwnPropertySymbols(n).filter(function (e) {
      return Object.getOwnPropertyDescriptor(n, e).enumerable;
    }))), r.forEach(function (t) {
      l(e, t, n[t]);
    });
  }
  return e;
}
function l(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
var s = n('./507'), c = n('./42'), u = n('./0'), f = n('./159'), d = n('./112'), p = n('./249'), h = n('./113'), g = n('./250'), m = n('./8'), b = n('./9'), v = n('./77'), y = (m.List, function (e, t) {
    return e.getAnchorKey() === t || e.getFocusKey() === t;
  }), C = function (e, t) {
    var n = t.get(e.getType()) || t.get('unstyled'), r = n.wrapper;
    return {
      Element: n.element || t.get('unstyled').element,
      wrapperTemplate: r
    };
  }, w = function (e, t) {
    var n = t(e);
    return n ? {
      CustomComponent: n.component,
      customProps: n.props,
      customEditable: n.editable
    } : {};
  }, x = function (e, t, n, r, o, a) {
    var l = {
        'data-block': !0,
        'data-editor': t,
        'data-offset-key': n,
        key: e.getKey(),
        ref: a
      }, s = r(e);
    return s && (l.className = s), void 0 !== o.customEditable && (l = i({}, l, {
      contentEditable: o.customEditable,
      suppressContentEditableWarning: !0
    })), l;
  }, E = function (e) {
    var t, n;
    function DraftEditorBlockNode() {
      for (var t, n = arguments.length, r = new Array(n), o = 0; o < n; o++)
        r[o] = arguments[o];
      return l(a(t = e.call.apply(e, [this].concat(r)) || this), 'wrapperRef', u.createRef()), t;
    }
    n = e, (t = DraftEditorBlockNode).prototype = Object.create(n.prototype), t.prototype.constructor = t, t.__proto__ = n;
    var r = DraftEditorBlockNode.prototype;
    return r.shouldComponentUpdate = function (e) {
      var t = this.props, n = t.block, r = t.direction, o = t.tree, a = !n.getChildKeys().isEmpty(), i = n !== e.block || o !== e.tree || r !== e.direction || y(e.selection, e.block.getKey()) && e.forceSelection;
      return a || i;
    }, r.componentDidMount = function () {
      var e = this.props.selection, t = e.getEndKey();
      if (e.getHasFocus() && t === this.props.block.getKey()) {
        var n = this.wrapperRef.current;
        if (n) {
          var r, o = d.getScrollParent(n), a = h(o);
          if (o === window) {
            var i = p(n);
            (r = i.y + i.height - g().height) > 0 && window.scrollTo(a.x, a.y + r + 10);
          } else {
            v(n) || b(!1);
            var l = n;
            (r = l.offsetHeight + l.offsetTop - (o.offsetHeight + a.y)) > 0 && f.setTop(o, f.getTop(o) + r + 10);
          }
        }
      }
    }, r.render = function () {
      var e = this, t = this.props, n = t.block, r = t.blockRenderMap, a = t.blockRendererFn, l = t.blockStyleFn, f = t.contentState, d = t.decorator, p = t.editorKey, h = t.editorState, g = t.customStyleFn, m = t.customStyleMap, b = t.direction, v = t.forceSelection, E = t.selection, _ = t.tree, O = null;
      n.children.size && (O = n.children.reduce(function (t, n) {
        var o = c.encode(n, 0, 0), s = f.getBlockForKey(n), d = w(s, a), g = d.CustomComponent || DraftEditorBlockNode, m = C(s, r), b = m.Element, v = m.wrapperTemplate, y = x(s, p, o, l, d, null), E = i({}, e.props, {
            tree: h.getBlockTree(n),
            blockProps: d.customProps,
            offsetKey: o,
            block: s
          });
        return t.push(u.createElement(b, y, u.createElement(g, E))), !v || function (e, t) {
          var n = e.getNextSiblingKey();
          return !!n && t.getBlockForKey(n).getType() === e.getType();
        }(s, f) || function (e, t, n) {
          var r = [], o = !0, a = !1, i = void 0;
          try {
            for (var l, s = n.reverse()[Symbol.iterator](); !(o = (l = s.next()).done); o = !0) {
              var f = l.value;
              if (f.type !== t)
                break;
              r.push(f);
            }
          } catch (e) {
            a = !0, i = e;
          } finally {
            try {
              o || null == s.return || s.return();
            } finally {
              if (a)
                throw i;
            }
          }
          n.splice(n.indexOf(r[0]), r.length + 1);
          var d = r.reverse(), p = d[0].key;
          n.push(u.cloneElement(e, {
            key: ''.concat(p, '-wrap'),
            'data-offset-key': c.encode(p, 0, 0)
          }, d));
        }(v, b, t), t;
      }, []));
      var S = n.getKey(), k = c.encode(S, 0, 0), A = w(n, a), j = A.CustomComponent, M = null != j ? u.createElement(j, o({}, this.props, {
          tree: h.getBlockTree(S),
          blockProps: A.customProps,
          offsetKey: k,
          block: n
        })) : u.createElement(s, {
          block: n,
          children: O,
          contentState: f,
          customStyleFn: g,
          customStyleMap: m,
          decorator: d,
          direction: b,
          forceSelection: v,
          hasSelection: y(E, S),
          selection: E,
          tree: _
        });
      if (n.getParentKey())
        return M;
      var I = C(n, r).Element, T = x(n, p, k, l, A, this.wrapperRef);
      return u.createElement(I, T, M);
    }, DraftEditorBlockNode;
  }(u.Component);
e.exports = E;