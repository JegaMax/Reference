var r = n('./146'), o = n('./376'), a = n('./377');
function SetCache(e) {
  var t = -1, n = null == e ? 0 : e.length;
  for (this.__data__ = new r(); ++t < n;)
    this.add(e[t]);
}
SetCache.prototype.add = SetCache.prototype.push = o, SetCache.prototype.has = a, e.exports = SetCache;