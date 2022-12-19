'use strict';
var r = n('./21'), o = n('./44')('draft_tree_data_support');
e.exports = function (e, t, n) {
  var a = e.getSelection(), i = e.getCurrentContent(), l = a, s = a.getAnchorKey(), c = a.getFocusKey(), u = i.getBlockForKey(s);
  if (o && 'forward' === n && s !== c)
    return i;
  if (a.isCollapsed()) {
    if ('forward' === n) {
      if (e.isSelectionAtEndOfContent())
        return i;
      if (o)
        if (a.getAnchorOffset() === i.getBlockForKey(s).getLength()) {
          var f = i.getBlockForKey(u.nextSibling);
          if (!f || 0 === f.getLength())
            return i;
        }
    } else if (e.isSelectionAtStartOfContent())
      return i;
    if ((l = t(e)) === a)
      return i;
  }
  return r.removeRange(i, l, n);
};