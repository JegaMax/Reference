'use strict';
(function (t) {
  var r = n('./9'), o = /\.textClipping$/, a = {
      'text/plain': !0,
      'text/html': !0,
      'text/rtf': !0
    };
  e.exports = function (e, n) {
    var i = 0, l = [];
    e.forEach(function (s) {
      !function (e, n) {
        if (!t.FileReader || e.type && !(e.type in a))
          return void n('');
        if ('' === e.type) {
          var i = '';
          return o.test(e.name) && (i = e.name.replace(o, '')), void n(i);
        }
        var l = new FileReader();
        l.onload = function () {
          var e = l.result;
          'string' != typeof e && r(!1), n(e);
        }, l.onerror = function () {
          n('');
        }, l.readAsText(e);
      }(s, function (t) {
        i++, t && l.push(t.slice(0, 5000)), i == e.length && n;
      });
    });
  };
}.call(this, n('./26')));