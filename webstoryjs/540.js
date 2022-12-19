'use strict';
var r = n('./21'), o = n('./11'), a = n('./105'), i = n('./22'), l = null, s = {
    cut: function (e) {
      var t = e.getCurrentContent(), n = e.getSelection(), s = null;
      if (n.isCollapsed()) {
        var c = n.getAnchorKey(), u = t.getBlockForKey(c).getLength();
        if (u === n.getAnchorOffset()) {
          var f = t.getKeyAfter(c);
          if (null == f)
            return e;
          s = n.set('focusKey', f).set('focusOffset', 0);
        } else
          s = n.set('focusOffset', u);
      } else
        s = n;
      s = i(s), l = a(t, s);
      var d = r.removeRange(t, s, 'forward');
      return d === t ? e : o.push(e, d, 'remove-range');
    },
    paste: function (e) {
      if (!l)
        return e;
      var t = r.replaceWithFragment(e.getCurrentContent(), e.getSelection(), l);
      return o.push(e, t, 'insert-fragment');
    }
  };
e.exports = s;