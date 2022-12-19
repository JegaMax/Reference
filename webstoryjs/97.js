var r = n('./348'), o = n('./349'), a = n('./350'), i = n('./351'), l = n('./352');
function ListCache(e) {
  var t = -1, n = null == e ? 0 : e.length;
  for (this.clear(); ++t < n;) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
ListCache.prototype.clear = r, ListCache.prototype.delete = o, ListCache.prototype.get = a, ListCache.prototype.has = i, ListCache.prototype.set = l, e.exports = ListCache;