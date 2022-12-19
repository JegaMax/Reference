var r = n('./97'), o = n('./145'), a = n('./146');
e.exports = function (e, t) {
  var n = this.__data__;
  if (n instanceof r) {
    var i = n.__data__;
    if (!o || i.length < 199)
      return i.push([
        e,
        t
      ]), this.size = ++n.size, this;
    n = this.__data__ = new a(i);
  }
  return n.set(e, t), this.size = n.size, this;
};