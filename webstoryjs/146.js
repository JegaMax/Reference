var r = n('./362'), o = n('./369'), a = n('./371'), i = n('./372'), l = n('./373');
function MapCache(e) {
  var t = -1, n = null == e ? 0 : e.length;
  for (this.clear(); ++t < n;) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
MapCache.prototype.clear = r, MapCache.prototype.delete = o, MapCache.prototype.get = a, MapCache.prototype.has = i, MapCache.prototype.set = l, e.exports = MapCache;