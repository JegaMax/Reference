var r = n('./18'), o = n('./27'), a = n('./464'), i = n('./153').NATIVE_ARRAY_BUFFER_VIEWS, l = r.ArrayBuffer, s = r.Int8Array;
e.exports = !i || !o(function () {
  s(1);
}) || !o(function () {
  new s(-1);
}) || !a(function (e) {
  new s(), new s(null), new s(1.5), new s(e);
}, !0) || o(function () {
  return 1 !== new s(new l(2), 1, void 0).length;
});