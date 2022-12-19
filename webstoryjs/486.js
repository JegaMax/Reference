'use strict';
var r = n('./75'), o = n('./30'), a = n('./8'), i = n('./229'), l = n('./9'), s = n('./227'), c = a.List, u = function (e, t, n, r, o, a) {
    var l = arguments.length > 6 && void 0 !== arguments[6] ? arguments[6] : 'REPLACE_WITH_NEW_DATA', s = n.get(o), c = s.getText(), u = s.getCharacterList(), f = o, d = a + r.getText().length, p = null;
    switch (l) {
    case 'MERGE_OLD_DATA_TO_NEW_DATA':
      p = r.getData().merge(s.getData());
      break;
    case 'REPLACE_WITH_NEW_DATA':
      p = r.getData();
    }
    var h = s.getType();
    c && 'unstyled' === h && (h = r.getType());
    var g = s.merge({
      text: c.slice(0, a) + r.getText() + c.slice(a),
      characterList: i(u, r.getCharacterList(), a),
      type: h,
      data: p
    });
    return e.merge({
      blockMap: n.set(o, g),
      selectionBefore: t,
      selectionAfter: t.merge({
        anchorKey: f,
        anchorOffset: d,
        focusKey: f,
        focusOffset: d,
        isBackward: !1
      })
    });
  }, f = function (e, t, n, a, i, l) {
    var s = n.first() instanceof o, u = [], f = a.size, d = n.get(i), p = a.first(), h = a.last(), g = h.getLength(), m = h.getKey(), b = s && (!d.getChildKeys().isEmpty() || !p.getChildKeys().isEmpty());
    n.forEach(function (e, t) {
      t === i ? (b ? u.push(e) : u.push(function (e, t, n) {
        var r = e.getText(), o = e.getCharacterList(), a = r.slice(0, t), i = o.slice(0, t), l = n.first();
        return e.merge({
          text: a + l.getText(),
          characterList: i.concat(l.getCharacterList()),
          type: a ? e.getType() : l.getType(),
          data: l.getData()
        });
      }(e, l, a)), a.slice(b ? 0 : 1, f - 1).forEach(function (e) {
        return u.push(e);
      }), u.push(function (e, t, n) {
        var r = e.getText(), o = e.getCharacterList(), a = r.length, i = r.slice(t, a), l = o.slice(t, a), s = n.last();
        return s.merge({
          text: s.getText() + i,
          characterList: s.getCharacterList().concat(l),
          data: s.getData()
        });
      }(e, l, a))) : u.push(e);
    });
    var v = r.createFromArray(u);
    return s && (v = function (e, t, n, r) {
      return e.withMutations(function (t) {
        var o = n.getKey(), a = r.getKey(), i = n.getNextSiblingKey(), l = n.getParentKey(), s = function (e, t) {
            var n = e.getKey(), r = e, o = [];
            for (t.get(n) && o.push(n); r && r.getNextSiblingKey();) {
              var a = r.getNextSiblingKey();
              if (!a)
                break;
              o.push(a), r = t.get(a);
            }
            return o;
          }(r, e), u = s[s.length - 1];
        if (t.get(a) ? (t.setIn([
            o,
            'nextSibling'
          ], a), t.setIn([
            a,
            'prevSibling'
          ], o)) : (t.setIn([
            o,
            'nextSibling'
          ], r.getNextSiblingKey()), t.setIn([
            r.getNextSiblingKey(),
            'prevSibling'
          ], o)), t.setIn([
            u,
            'nextSibling'
          ], i), i && t.setIn([
            i,
            'prevSibling'
          ], u), s.forEach(function (e) {
            return t.setIn([
              e,
              'parent'
            ], l);
          }), l) {
          var f = e.get(l).getChildKeys(), d = f.indexOf(o) + 1, p = f.toArray();
          p.splice.apply(p, [
            d,
            0
          ].concat(s)), t.setIn([
            l,
            'children'
          ], c(p));
        }
      });
    }(v, 0, d, p)), e.merge({
      blockMap: v,
      selectionBefore: t,
      selectionAfter: t.merge({
        anchorKey: m,
        anchorOffset: g,
        focusKey: m,
        focusOffset: g,
        isBackward: !1
      })
    });
  };
e.exports = function (e, t, n) {
  var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 'REPLACE_WITH_NEW_DATA';
  t.isCollapsed() || l(!1);
  var a = e.getBlockMap(), i = s(n), c = t.getStartKey(), d = t.getStartOffset(), p = a.get(c);
  return p instanceof o && (p.getChildKeys().isEmpty() || l(!1)), 1 === i.size ? u(e, t, a, i.first(), c, d, r) : f(e, t, a, i, c, d);
};