var r = n('./393'), o = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, a = /\\(\\)?/g, i = r(function (e) {
    var t = [];
    return 46 === e.charCodeAt(0) && t.push(''), e.replace(o, function (e, n, r, o) {
      t.push(r ? o.replace(a, '$1') : n || e);
    }), t;
  });
e.exports = i;