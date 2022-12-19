'use strict';
var r = n('./21'), o = n('./11'), a = n('./557'), i = n('./22'), l = {
    currentBlockContainsLink: function (e) {
      var t = e.getSelection(), n = e.getCurrentContent(), r = n.getEntityMap();
      return n.getBlockForKey(t.getAnchorKey()).getCharacterList().slice(t.getStartOffset(), t.getEndOffset()).some(function (e) {
        var t = e.getEntity();
        return !!t && 'LINK' === r.__get(t).getType();
      });
    },
    getCurrentBlockType: function (e) {
      var t = e.getSelection();
      return e.getCurrentContent().getBlockForKey(t.getStartKey()).getType();
    },
    getDataObjectForLinkURL: function (e) {
      return { url: e.toString() };
    },
    handleKeyCommand: function (e, t, n) {
      switch (t) {
      case 'bold':
        return l.toggleInlineStyle(e, 'BOLD');
      case 'italic':
        return l.toggleInlineStyle(e, 'ITALIC');
      case 'underline':
        return l.toggleInlineStyle(e, 'UNDERLINE');
      case 'code':
        return l.toggleCode(e);
      case 'backspace':
      case 'backspace-word':
      case 'backspace-to-start-of-line':
        return l.onBackspace(e);
      case 'delete':
      case 'delete-word':
      case 'delete-to-end-of-block':
        return l.onDelete(e);
      default:
        return null;
      }
    },
    insertSoftNewline: function (e) {
      var t = r.insertText(e.getCurrentContent(), e.getSelection(), '\n', e.getCurrentInlineStyle(), null), n = o.push(e, t, 'insert-characters');
      return o.forceSelection(n, t.getSelectionAfter());
    },
    onBackspace: function (e) {
      var t = e.getSelection();
      if (!t.isCollapsed() || t.getAnchorOffset() || t.getFocusOffset())
        return null;
      var n = e.getCurrentContent(), r = t.getStartKey(), a = n.getBlockBefore(r);
      if (a && 'atomic' === a.getType()) {
        var i = n.getBlockMap().delete(a.getKey()), s = n.merge({
            blockMap: i,
            selectionAfter: t
          });
        if (s !== n)
          return o.push(e, s, 'remove-range');
      }
      var c = l.tryToRemoveBlockStyle(e);
      return c ? o.push(e, c, 'change-block-type') : null;
    },
    onDelete: function (e) {
      var t = e.getSelection();
      if (!t.isCollapsed())
        return null;
      var n = e.getCurrentContent(), a = t.getStartKey(), i = n.getBlockForKey(a).getLength();
      if (t.getStartOffset() < i)
        return null;
      var l = n.getBlockAfter(a);
      if (!l || 'atomic' !== l.getType())
        return null;
      var s = t.merge({
          focusKey: l.getKey(),
          focusOffset: l.getLength()
        }), c = r.removeRange(n, s, 'forward');
      return c !== n ? o.push(e, c, 'remove-range') : null;
    },
    onTab: function (e, t, n) {
      var r = t.getSelection(), i = r.getAnchorKey();
      if (i !== r.getFocusKey())
        return t;
      var l = t.getCurrentContent(), s = l.getBlockForKey(i), c = s.getType();
      if ('unordered-list-item' !== c && 'ordered-list-item' !== c)
        return t;
      e.preventDefault();
      var u = s.getDepth();
      if (!e.shiftKey && u === n)
        return t;
      var f = a(l, r, e.shiftKey ? -1 : 1, n);
      return o.push(t, f, 'adjust-depth');
    },
    toggleBlockType: function (e, t) {
      var n = e.getSelection(), a = n.getStartKey(), l = n.getEndKey(), s = e.getCurrentContent(), c = n;
      if (a !== l && 0 === n.getEndOffset()) {
        var u = i(s.getBlockBefore(l));
        l = u.getKey(), c = c.merge({
          anchorKey: a,
          anchorOffset: n.getStartOffset(),
          focusKey: l,
          focusOffset: u.getLength(),
          isBackward: !1
        });
      }
      if (s.getBlockMap().skipWhile(function (e, t) {
          return t !== a;
        }).reverse().skipWhile(function (e, t) {
          return t !== l;
        }).some(function (e) {
          return 'atomic' === e.getType();
        }))
        return e;
      var f = s.getBlockForKey(a).getType() === t ? 'unstyled' : t;
      return o.push(e, r.setBlockType(s, c, f), 'change-block-type');
    },
    toggleCode: function (e) {
      var t = e.getSelection(), n = t.getAnchorKey(), r = t.getFocusKey();
      return t.isCollapsed() || n !== r ? l.toggleBlockType(e, 'code-block') : l.toggleInlineStyle(e, 'CODE');
    },
    toggleInlineStyle: function (e, t) {
      var n = e.getSelection(), a = e.getCurrentInlineStyle();
      if (n.isCollapsed())
        return o.setInlineStyleOverride(e, a.has(t) ? a.remove(t) : a.add(t));
      var i, l = e.getCurrentContent();
      return i = a.has(t) ? r.removeInlineStyle(l, n, t) : r.applyInlineStyle(l, n, t), o.push(e, i, 'change-inline-style');
    },
    toggleLink: function (e, t, n) {
      var a = r.applyEntity(e.getCurrentContent(), t, n);
      return o.push(e, a, 'apply-entity');
    },
    tryToRemoveBlockStyle: function (e) {
      var t = e.getSelection(), n = t.getAnchorOffset();
      if (t.isCollapsed() && 0 === n) {
        var o = t.getAnchorKey(), a = e.getCurrentContent(), i = a.getBlockForKey(o).getType(), l = a.getBlockBefore(o);
        if ('code-block' === i && l && 'code-block' === l.getType() && 0 !== l.getLength())
          return null;
        if ('unstyled' !== i)
          return r.setBlockType(a, t, 'unstyled');
      }
      return null;
    }
  };
e.exports = l;