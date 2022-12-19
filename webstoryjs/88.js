var r, o = n('./32'), a = n('./184'), i = n('./132'), l = n('./128'), s = n('./301'), c = n('./174'), u = n('./126'), f = u('IE_PROTO'), EmptyConstructor = function () {
  }, d = function (e) {
    return '<script>' + e + '</' + 'script>';
  }, NullProtoObject = function () {
    try {
      r = document.domain && new ActiveXObject('htmlfile');
    } catch (e) {
    }
    var e, t;
    NullProtoObject = r ? function (e) {
      e.write(d('')), e.close();
      var t = e.parentWindow.Object;
      return e = null, t;
    }(r) : ((t = c('iframe')).style.display = 'none', s.appendChild(t), t.src = String('javascript:'), (e = t.contentWindow.document).open(), e.write(d('document.F=Object')), e.close(), e.F);
    for (var n = i.length; n--;)
      delete NullProtoObject.prototype[i[n]];
    return NullProtoObject();
  };
l[f] = !0, e.exports = Object.create || function (e, t) {
  var n;
  return null !== e ? (EmptyConstructor.prototype = o(e), n = new EmptyConstructor(), EmptyConstructor.prototype = null, n[f] = e) : n = NullProtoObject(), void 0 === t ? n : a(n, t);
};