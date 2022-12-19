var r, o = n('./360'), a = (r = /[^.]+$/.exec(o && o.keys && o.keys.IE_PROTO || '')) ? 'Symbol(src)_1.' + r : '';
e.exports = function (e) {
  return !!a && a in e;
};