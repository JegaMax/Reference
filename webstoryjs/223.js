(function (e) {
  !function (e) {
    'use strict';
    e.exports.is_uri = n, e.exports.is_http_uri = r, e.exports.is_https_uri = o, e.exports.is_web_uri = a, e.exports.isUri = n, e.exports.isHttpUri = r, e.exports.isHttpsUri = o, e.exports.isWebUri = a;
    var t = function (e) {
      return e.match(/(?:([^:\/?#]+):)?(?:\/\/([^\/?#]*))?([^?#]*)(?:\?([^#]*))?(?:#(.*))?/);
    };
    function n(e) {
      if (e && !/[^a-z0-9\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=\.\-\_\~\%]/i.test(e) && !/%[^0-9a-f]/i.test(e) && !/%[0-9a-f](:?[^0-9a-f]|$)/i.test(e)) {
        var n, r, o, a, i, l = '', s = '';
        if (l = (n = t(e))[1], r = n[2], o = n[3], a = n[4], i = n[5], l && l.length && o.length >= 0) {
          if (r && r.length) {
            if (0 !== o.length && !/^\//.test(o))
              return;
          } else if (/^\/\//.test(o))
            return;
          if (/^[a-z][a-z0-9\+\-\.]*$/.test(l.toLowerCase()))
            return s += l + ':', r && r.length && (s += '//' + r), s += o, a && a.length && (s += '?' + a), i && i.length && (s += '#' + i), s;
        }
      }
    }
    function r(e, r) {
      if (n(e)) {
        var o, a, i, l, s = '', c = '', u = '', f = '';
        if (s = (o = t(e))[1], c = o[2], a = o[3], i = o[4], l = o[5], s) {
          if (r) {
            if ('https' != s.toLowerCase())
              return;
          } else if ('http' != s.toLowerCase())
            return;
          if (c)
            return /:(\d+)$/.test(c) && (u = c.match(/:(\d+)$/)[0], c = c.replace(/:\d+$/, '')), f += s + ':', f += '//' + c, u && (f += u), f += a, i && i.length && (f += '?' + i), l && l.length && (f += '#' + l), f;
        }
      }
    }
    function o(e) {
      return r(e, !0);
    }
    function a(e) {
      return r(e) || o(e);
    }
  }(e);
}.call(this, n('./94')(e)));