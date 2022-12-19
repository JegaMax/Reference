'use strict';
var r, o = n('./493'), a = n('./8'), i = n('./22'), l = a.OrderedMap, s = {
    getDirectionMap: function (e, t) {
      r ? r.reset() : r = new o();
      var n = e.getBlockMap(), s = n.valueSeq().map(function (e) {
          return i(r).getDirection(e.getText());
        }), c = l(n.keySeq().zip(s));
      return null != t && a.is(t, c) ? t : c;
    }
  };
e.exports = s;