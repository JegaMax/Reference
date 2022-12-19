(function (e, t) {
  !function (e, n) {
    'use strict';
    if (!e.setImmediate) {
      var r, o, a, i, l, s = 1, c = {}, u = !1, f = e.document, d = Object.getPrototypeOf && Object.getPrototypeOf(e);
      d = d && d.setTimeout ? d : e, '[object process]' === {}.toString.call(e.process) ? r = function (e) {
        t.nextTick(function () {
          h(e);
        });
      } : !function () {
        if (e.postMessage && !e.importScripts) {
          var t = !0, n = e.onmessage;
          return e.onmessage = function () {
            t = !1;
          }, e.postMessage('', '*'), e.onmessage = n, t;
        }
      }() ? e.MessageChannel ? ((a = new MessageChannel()).port1.onmessage = function (e) {
        h(e.data);
      }, r = function (e) {
        a.port2.postMessage(e);
      }) : f && 'onreadystatechange' in f.createElement('script') ? (o = f.documentElement, r = function (e) {
        var t = f.createElement('script');
        t.onreadystatechange = function () {
          h(e), t.onreadystatechange = null, o.removeChild(t), t = null;
        }, o.appendChild(t);
      }) : r = function (e) {
        setTimeout(h, 0, e);
      } : (i = 'setImmediate$' + Math.random() + '$', l = function (t) {
        t.source === e && 'string' == typeof t.data && 0 === t.data.indexOf(i) && h(+t.data.slice(i.length));
      }, e.addEventListener ? e.addEventListener('message', l, !1) : e.attachEvent('onmessage', l), r = function (t) {
        e.postMessage(i + t, '*');
      }), d.setImmediate = function (e) {
        'function' != typeof e && (e = new Function('' + e));
        for (var t = new Array(arguments.length - 1), n = 0; n < t.length; n++)
          t[n] = arguments[n + 1];
        var o = {
          callback: e,
          args: t
        };
        return c[s] = o, r(s), s++;
      }, d.clearImmediate = p;
    }
    function p(e) {
      delete c[e];
    }
    function h(e) {
      if (u)
        setTimeout(h, 0, e);
      else {
        var t = c[e];
        if (t) {
          u = !0;
          try {
            !function (e) {
              var t = e.callback, n = e.args;
              switch (n.length) {
              case 0:
                t();
                break;
              case 1:
                t(n[0]);
                break;
              case 2:
                t(n[0], n[1]);
                break;
              case 3:
                t(n[0], n[1], n[2]);
                break;
              default:
                t.apply(void 0, n);
              }
            }(t);
          } finally {
            p(e), u = !1;
          }
        }
      }
    }
  }('undefined' == typeof self ? void 0 === e ? this : e : self);
}.call(this, n('./26'), n('./189')));