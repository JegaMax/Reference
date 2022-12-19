'use strict';
var r = n('./29'), o = n('./76'), a = n('./9');
function i(e, t, n) {
  var i = t.getCharacterList(), l = n > 0 ? i.get(n - 1) : void 0, s = n < i.count() ? i.get(n) : void 0, c = l ? l.getEntity() : void 0, u = s ? s.getEntity() : void 0;
  if (u && u === c && 'MUTABLE' !== e.__get(u).getMutability()) {
    for (var f, d = function (e, t, n) {
          var r;
          return o(e, function (e, t) {
            return e.getEntity() === t.getEntity();
          }, function (e) {
            return e.getEntity() === t;
          }, function (e, t) {
            e <= n && t >= n && (r = {
              start: e,
              end: t
            });
          }), 'object' != typeof r && a(!1), r;
        }(i, u, n), p = d.start, h = d.end; p < h;)
      f = i.get(p), i = i.set(p, r.applyEntity(f, null)), p++;
    return t.set('characterList', i);
  }
  return t;
}
e.exports = function (e, t) {
  var n = e.getBlockMap(), r = e.getEntityMap(), o = {}, a = t.getStartKey(), l = t.getStartOffset(), s = n.get(a), c = i(r, s, l);
  c !== s && (o[a] = c);
  var u = t.getEndKey(), f = t.getEndOffset(), d = n.get(u);
  a === u && (d = c);
  var p = i(r, d, f);
  return p !== d && (o[u] = p), Object.keys(o).length ? e.merge({
    blockMap: n.merge(o),
    selectionAfter: t
  }) : e.set('selectionAfter', t);
};