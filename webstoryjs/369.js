var r = n('./100');
e.exports = function (e) {
  var t = r(this, e).delete(e);
  return this.size -= t ? 1 : 0, t;
};