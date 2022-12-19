'use strict';
function r(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = null != arguments[t] ? arguments[t] : {}, r = Object.keys(n);
    'function' == typeof Object.getOwnPropertySymbols && (r = r.concat(Object.getOwnPropertySymbols(n).filter(function (e) {
      return Object.getOwnPropertyDescriptor(n, e).enumerable;
    }))), r.forEach(function (t) {
      o(e, t, n[t]);
    });
  }
  return e;
}
function o(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
var a = n('./490'), i = n('./154'), l = n('./492'), s = n('./107'), c = n('./8'), u = c.OrderedSet, f = c.Record, d = c.Stack, p = c.OrderedMap, h = c.List, g = f({
    allowUndo: !0,
    currentContent: null,
    decorator: null,
    directionMap: null,
    forceSelection: !1,
    inCompositionMode: !1,
    inlineStyleOverride: null,
    lastChangeType: null,
    nativelyRenderedContent: null,
    redoStack: d(),
    selection: null,
    treeMap: null,
    undoStack: d()
  }), m = function () {
    EditorState.createEmpty = function (e) {
      return this.createWithText('', e);
    }, EditorState.createWithText = function (e, t) {
      return EditorState.createWithContent(i.createFromText(e), t);
    }, EditorState.createWithContent = function (e, t) {
      if (0 === e.getBlockMap().count())
        return EditorState.createEmpty(t);
      var n = e.getBlockMap().first().getKey();
      return EditorState.create({
        currentContent: e,
        undoStack: d(),
        redoStack: d(),
        decorator: t || null,
        selection: s.createEmpty(n)
      });
    }, EditorState.create = function (e) {
      var t = e.currentContent, n = r({}, e, {
          treeMap: v(t, e.decorator),
          directionMap: l.getDirectionMap(t)
        });
      return new EditorState(new g(n));
    }, EditorState.fromJS = function (e) {
      return new EditorState(new g(r({}, e, {
        directionMap: null != e.directionMap ? p(e.directionMap) : e.directionMap,
        inlineStyleOverride: null != e.inlineStyleOverride ? u(e.inlineStyleOverride) : e.inlineStyleOverride,
        nativelyRenderedContent: null != e.nativelyRenderedContent ? i.fromJS(e.nativelyRenderedContent) : e.nativelyRenderedContent,
        redoStack: null != e.redoStack ? d(e.redoStack.map(function (e) {
          return i.fromJS(e);
        })) : e.redoStack,
        selection: null != e.selection ? new s(e.selection) : e.selection,
        treeMap: null != e.treeMap ? p(e.treeMap).map(function (e) {
          return h(e).map(function (e) {
            return a.fromJS(e);
          });
        }) : e.treeMap,
        undoStack: null != e.undoStack ? d(e.undoStack.map(function (e) {
          return i.fromJS(e);
        })) : e.undoStack,
        currentContent: i.fromJS(e.currentContent)
      })));
    }, EditorState.set = function (e, t) {
      return new EditorState(e.getImmutable().withMutations(function (n) {
        var r = n.get('decorator'), o = r;
        null === t.decorator ? o = null : t.decorator && (o = t.decorator);
        var i = t.currentContent || e.getCurrentContent();
        if (o !== r) {
          var l, s = n.get('treeMap');
          return l = o && r ? function (e, t, n, r, o) {
            return n.merge(t.toSeq().filter(function (t) {
              return r.getDecorations(t, e) !== o.getDecorations(t, e);
            }).map(function (t) {
              return a.generate(e, t, r);
            }));
          }(i, i.getBlockMap(), s, o, r) : v(i, o), void n.merge({
            decorator: o,
            treeMap: l,
            nativelyRenderedContent: null
          });
        }
        i !== e.getCurrentContent() && n.set('treeMap', function (e, t, n, r) {
          var o = e.getCurrentContent().set('entityMap', n), i = o.getBlockMap();
          return e.getImmutable().get('treeMap').merge(t.toSeq().filter(function (e, t) {
            return e !== i.get(t);
          }).map(function (e) {
            return a.generate(o, e, r);
          }));
        }(e, i.getBlockMap(), i.getEntityMap(), o)), n.merge(t);
      }));
    };
    var e = EditorState.prototype;
    function EditorState(e) {
      o(this, '_immutable', void 0), this._immutable = e;
    }
    return e.toJS = function () {
      return this.getImmutable().toJS();
    }, e.getAllowUndo = function () {
      return this.getImmutable().get('allowUndo');
    }, e.getCurrentContent = function () {
      return this.getImmutable().get('currentContent');
    }, e.getUndoStack = function () {
      return this.getImmutable().get('undoStack');
    }, e.getRedoStack = function () {
      return this.getImmutable().get('redoStack');
    }, e.getSelection = function () {
      return this.getImmutable().get('selection');
    }, e.getDecorator = function () {
      return this.getImmutable().get('decorator');
    }, e.isInCompositionMode = function () {
      return this.getImmutable().get('inCompositionMode');
    }, e.mustForceSelection = function () {
      return this.getImmutable().get('forceSelection');
    }, e.getNativelyRenderedContent = function () {
      return this.getImmutable().get('nativelyRenderedContent');
    }, e.getLastChangeType = function () {
      return this.getImmutable().get('lastChangeType');
    }, e.getInlineStyleOverride = function () {
      return this.getImmutable().get('inlineStyleOverride');
    }, EditorState.setInlineStyleOverride = function (e, t) {
      return EditorState.set(e, { inlineStyleOverride: t });
    }, e.getCurrentInlineStyle = function () {
      var e = this.getInlineStyleOverride();
      if (null != e)
        return e;
      var t = this.getCurrentContent(), n = this.getSelection();
      return n.isCollapsed() ? function (e, t) {
        var n = t.getStartKey(), r = t.getStartOffset(), o = e.getBlockForKey(n);
        if (r > 0)
          return o.getInlineStyleAt(r - 1);
        if (o.getLength())
          return o.getInlineStyleAt(0);
        return C(e, n);
      }(t, n) : function (e, t) {
        var n = t.getStartKey(), r = t.getStartOffset(), o = e.getBlockForKey(n);
        if (r < o.getLength())
          return o.getInlineStyleAt(r);
        if (r > 0)
          return o.getInlineStyleAt(r - 1);
        return C(e, n);
      }(t, n);
    }, e.getBlockTree = function (e) {
      return this.getImmutable().getIn([
        'treeMap',
        e
      ]);
    }, e.isSelectionAtStartOfContent = function () {
      var e = this.getCurrentContent().getBlockMap().first().getKey();
      return this.getSelection().hasEdgeWithin(e, 0, 0);
    }, e.isSelectionAtEndOfContent = function () {
      var e = this.getCurrentContent().getBlockMap().last(), t = e.getLength();
      return this.getSelection().hasEdgeWithin(e.getKey(), t, t);
    }, e.getDirectionMap = function () {
      return this.getImmutable().get('directionMap');
    }, EditorState.acceptSelection = function (e, t) {
      return b(e, t, !1);
    }, EditorState.forceSelection = function (e, t) {
      return t.getHasFocus() || (t = t.set('hasFocus', !0)), b(e, t, !0);
    }, EditorState.moveSelectionToEnd = function (e) {
      var t = e.getCurrentContent().getLastBlock(), n = t.getKey(), r = t.getLength();
      return EditorState.acceptSelection(e, new s({
        anchorKey: n,
        anchorOffset: r,
        focusKey: n,
        focusOffset: r,
        isBackward: !1
      }));
    }, EditorState.moveFocusToEnd = function (e) {
      var t = EditorState.moveSelectionToEnd(e);
      return EditorState.forceSelection(t, t.getSelection());
    }, EditorState.push = function (e, t, n) {
      var r = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3];
      if (e.getCurrentContent() === t)
        return e;
      var o = l.getDirectionMap(t, e.getDirectionMap());
      if (!e.getAllowUndo())
        return EditorState.set(e, {
          currentContent: t,
          directionMap: o,
          lastChangeType: n,
          selection: t.getSelectionAfter(),
          forceSelection: r,
          inlineStyleOverride: null
        });
      var a = e.getSelection(), i = e.getCurrentContent(), s = e.getUndoStack(), c = t;
      a !== i.getSelectionAfter() || y(e, n) ? (s = s.push(i), c = c.set('selectionBefore', a)) : 'insert-characters' !== n && 'backspace-character' !== n && 'delete-character' !== n || (c = c.set('selectionBefore', i.getSelectionBefore()));
      var u = e.getInlineStyleOverride(), f = [
          'adjust-depth',
          'change-block-type',
          'split-block'
        ];
      -1 === f.indexOf(n) && (u = null);
      var p = {
        currentContent: c,
        directionMap: o,
        undoStack: s,
        redoStack: d(),
        lastChangeType: n,
        selection: t.getSelectionAfter(),
        forceSelection: r,
        inlineStyleOverride: u
      };
      return EditorState.set(e, p);
    }, EditorState.undo = function (e) {
      if (!e.getAllowUndo())
        return e;
      var t = e.getUndoStack(), n = t.peek();
      if (!n)
        return e;
      var r = e.getCurrentContent(), o = l.getDirectionMap(n, e.getDirectionMap());
      return EditorState.set(e, {
        currentContent: n,
        directionMap: o,
        undoStack: t.shift(),
        redoStack: e.getRedoStack().push(r),
        forceSelection: !0,
        inlineStyleOverride: null,
        lastChangeType: 'undo',
        nativelyRenderedContent: null,
        selection: r.getSelectionBefore()
      });
    }, EditorState.redo = function (e) {
      if (!e.getAllowUndo())
        return e;
      var t = e.getRedoStack(), n = t.peek();
      if (!n)
        return e;
      var r = e.getCurrentContent(), o = l.getDirectionMap(n, e.getDirectionMap());
      return EditorState.set(e, {
        currentContent: n,
        directionMap: o,
        undoStack: e.getUndoStack().push(r),
        redoStack: t.shift(),
        forceSelection: !0,
        inlineStyleOverride: null,
        lastChangeType: 'redo',
        nativelyRenderedContent: null,
        selection: n.getSelectionAfter()
      });
    }, e.getImmutable = function () {
      return this._immutable;
    }, EditorState;
  }();
function b(e, t, n) {
  return m.set(e, {
    selection: t,
    forceSelection: n,
    nativelyRenderedContent: null,
    inlineStyleOverride: null
  });
}
function v(e, t) {
  return e.getBlockMap().map(function (n) {
    return a.generate(e, n, t);
  }).toOrderedMap();
}
function y(e, t) {
  return t !== e.getLastChangeType() || 'insert-characters' !== t && 'backspace-character' !== t && 'delete-character' !== t;
}
function C(e, t) {
  var n = e.getBlockMap().reverse().skipUntil(function (e, n) {
    return n === t;
  }).skip(1).skipUntil(function (e, t) {
    return e.getLength();
  }).first();
  return n ? n.getInlineStyleAt(n.getLength() - 1) : u();
}
e.exports = m;