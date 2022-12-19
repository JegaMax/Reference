var r = n('./71'), o = n('./335'), a = n('./336'), i = r ? r.toStringTag : void 0;
e.exports = function (e) {
  return null == e ? void 0 === e ? '[object Undefined]' : '[object Null]' : i && i in Object(e) ? o(e) : a(e);
};