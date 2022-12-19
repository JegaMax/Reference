'use strict';
n('./316');
var r = n('./49'), o = n('./27'), a = n('./19'), i = n('./133'), l = n('./35'), s = a('species'), c = !o(function () {
    var e = /./;
    return e.exec = function () {
      var e = [];
      return e.groups = { a: '7' }, e;
    }, '7' !== ''.replace(e, '$<a>');
  }), u = '$0' === 'a'.replace(/./, '$0'), f = a('replace'), d = !!/./[f] && '' === /./[f]('a', '$0'), p = !o(function () {
    var e = /(?:)/, t = e.exec;
    e.exec = function () {
      return t.apply(this, arguments);
    };
    var n = 'ab'.split(e);
    return 2 !== n.length || 'a' !== n[0] || 'b' !== n[1];
  });
e.exports = function (e, t, n, f) {
  var h = a(e), g = !o(function () {
      var t = {};
      return t[h] = function () {
        return 7;
      }, 7 != ''[e](t);
    }), m = g && !o(function () {
      var t = !1, n = /a/;
      return 'split' === e && ((n = {}).constructor = {}, n.constructor[s] = function () {
        return n;
      }, n.flags = '', n[h] = /./[h]), n.exec = function () {
        return t = !0, null;
      }, n[h](''), !t;
    });
  if (!g || !m || 'replace' === e && (!c || !u || d) || 'split' === e && !p) {
    var b = /./[h], v = n(h, ''[e], function (e, t, n, r, o) {
        return t.exec === i ? g && !o ? {
          done: !0,
          value: b.call(t, n, r)
        } : {
          done: !0,
          value: e.call(n, t, r)
        } : { done: !1 };
      }, {
        REPLACE_KEEPS_$0: u,
        REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE: d
      }), y = v[0], C = v[1];
    r(String.prototype, e, y), r(RegExp.prototype, h, 2 == t ? function (e, t) {
      return C.call(e, this, t);
    } : function (e) {
      return C.call(e, this);
    });
  }
  f && l(RegExp.prototype[h], 'sham', !0);
};