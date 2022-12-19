var r = n('./364'), o = n('./365'), a = n('./366'), i = n('./367'), l = n('./368');
function Hash(e) {
  var t = -1, n = null == e ? 0 : e.length;
  for (this.clear(); ++t < n;) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
Hash.prototype.clear = r, Hash.prototype.delete = o, Hash.prototype.get = a, Hash.prototype.has = i, Hash.prototype.set = l, e.exports = Hash;