var r;
!function (o, a, i) {
  if (o) {
    for (var l, s = {
          8: 'backspace',
          9: 'tab',
          13: 'enter',
          16: 'shift',
          17: 'ctrl',
          18: 'alt',
          20: 'capslock',
          27: 'esc',
          32: 'space',
          33: 'pageup',
          34: 'pagedown',
          35: 'end',
          36: 'home',
          37: 'left',
          38: 'up',
          39: 'right',
          40: 'down',
          45: 'ins',
          46: 'del',
          91: 'meta',
          93: 'meta',
          224: 'meta'
        }, c = {
          106: '*',
          107: '+',
          109: '-',
          110: '.',
          111: '/',
          186: ';',
          187: '=',
          188: ',',
          189: '-',
          190: '.',
          191: '/',
          192: '`',
          219: '[',
          220: '\\',
          221: ']',
          222: '\''
        }, u = {
          '~': '`',
          '!': '1',
          '@': '2',
          '#': '3',
          $: '4',
          '%': '5',
          '^': '6',
          '&': '7',
          '*': '8',
          '(': '9',
          ')': '0',
          _: '-',
          '+': '=',
          ':': ';',
          '"': '\'',
          '<': ',',
          '>': '.',
          '?': '/',
          '|': '\\'
        }, f = {
          option: 'alt',
          command: 'meta',
          return: 'enter',
          escape: 'esc',
          plus: '+',
          mod: /Mac|iPod|iPhone|iPad/.test(navigator.platform) ? 'meta' : 'ctrl'
        }, d = 1; d < 20; ++d)
      s[111 + d] = 'f' + d;
    for (d = 0; d <= 9; ++d)
      s[d + 96] = d.toString();
    Mousetrap.prototype.bind = function (e, t, n) {
      var r = this;
      return e = e instanceof Array ? e : [e], r._bindMultiple.call(r, e, t, n), r;
    }, Mousetrap.prototype.unbind = function (e, t) {
      return this.bind.call(this, e, function () {
      }, t);
    }, Mousetrap.prototype.trigger = function (e, t) {
      var n = this;
      return n._directMap[e + ':' + t] && n._directMap[e + ':' + t]({}, e), n;
    }, Mousetrap.prototype.reset = function () {
      var e = this;
      return e._callbacks = {}, e._directMap = {}, e;
    }, Mousetrap.prototype.stopCallback = function (e, t) {
      if ((' ' + t.className + ' ').indexOf(' mousetrap ') > -1)
        return !1;
      if (v(t, this.target))
        return !1;
      if ('composedPath' in e && 'function' == typeof e.composedPath) {
        var n = e.composedPath()[0];
        n !== e.target && (t = n);
      }
      return 'INPUT' == t.tagName || 'SELECT' == t.tagName || 'TEXTAREA' == t.tagName || t.isContentEditable;
    }, Mousetrap.prototype.handleKey = function () {
      var e = this;
      return e._handleKey.apply(e, arguments);
    }, Mousetrap.addKeycodes = function (e) {
      for (var t in e)
        e.hasOwnProperty(t) && (s[t] = e[t]);
      l = null;
    }, Mousetrap.init = function () {
      var e = Mousetrap(a);
      for (var t in e)
        '_' !== t.charAt(0) && (Mousetrap[t] = function (t) {
          return function () {
            return e[t].apply(e, arguments);
          };
        }(t));
    }, Mousetrap.init(), o.Mousetrap = Mousetrap, e.exports && (e.exports = Mousetrap), void 0 === (r = function () {
      return Mousetrap;
    }.call(t, n, t, e)) || (e.exports = r);
  }
  function p(e, t, n) {
    e.addEventListener ? e.addEventListener(t, n, !1) : e.attachEvent('on' + t, n);
  }
  function h(e) {
    if ('keypress' == e.type) {
      var t = String.fromCharCode(e.which);
      return e.shiftKey || (t = t.toLowerCase()), t;
    }
    return s[e.which] ? s[e.which] : c[e.which] ? c[e.which] : String.fromCharCode(e.which).toLowerCase();
  }
  function g(e) {
    return 'shift' == e || 'ctrl' == e || 'alt' == e || 'meta' == e;
  }
  function m(e, t, n) {
    return n || (n = function () {
      if (!l)
        for (var e in (l = {}, s))
          e > 95 && e < 112 || s.hasOwnProperty(e) && (l[s[e]] = e);
      return l;
    }()[e] ? 'keydown' : 'keypress'), 'keypress' == n && t.length && (n = 'keydown'), n;
  }
  function b(e, t) {
    var n, r, o, a = [];
    for (n = function (e) {
        return '+' === e ? ['+'] : (e = e.replace(/\+{2}/g, '+plus')).split('+');
      }(e), o = 0; o < n.length; ++o)
      r = n[o], f[r] && (r = f[r]), t && 'keypress' != t && u[r] && (r = u[r], a.push('shift')), g(r) && a.push(r);
    return {
      key: r,
      modifiers: a,
      action: t = m(r, a, t)
    };
  }
  function v(e, t) {
    return null !== e && e !== a && (e === t || v(e.parentNode, t));
  }
  function Mousetrap(e) {
    var t = this;
    if (e = e || a, !(t instanceof Mousetrap))
      return new Mousetrap(e);
    t.target = e, t._callbacks = {}, t._directMap = {};
    var n, r = {}, o = !1, i = !1, l = !1;
    function s(e) {
      e = e || {};
      var t, n = !1;
      for (t in r)
        e[t] ? n = !0 : r[t] = 0;
      n || (l = !1);
    }
    function c(e, n, o, a, i, l) {
      var s, c, u, f, d = [], p = o.type;
      if (!t._callbacks[e])
        return [];
      for ('keyup' == p && g(e) && (n = [e]), s = 0; s < t._callbacks[e].length; ++s)
        if (c = t._callbacks[e][s], (a || !c.seq || r[c.seq] == c.level) && p == c.action && ('keypress' == p && !o.metaKey && !o.ctrlKey || (u = n, f = c.modifiers, u.sort().join(',') === f.sort().join(',')))) {
          var h = !a && c.combo == i, m = a && c.seq == a && c.level == l;
          (h || m) && t._callbacks[e].splice(s, 1), d.push(c);
        }
      return d;
    }
    function u(e, n, r, o) {
      t.stopCallback(n, n.target || n.srcElement, r, o) || !1 === e(n, r) && (function (e) {
        e.preventDefault ? e.preventDefault() : e.returnValue = !1;
      }(n), function (e) {
        e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0;
      }(n));
    }
    function f(e) {
      'number' != typeof e.which && (e.which = e.keyCode);
      var n = h(e);
      n && ('keyup' != e.type || o !== n ? t.handleKey(n, function (e) {
        var t = [];
        return e.shiftKey && t.push('shift'), e.altKey && t.push('alt'), e.ctrlKey && t.push('ctrl'), e.metaKey && t.push('meta'), t;
      }(e), e) : o = !1);
    }
    function d(e, t, a, i) {
      function c(t) {
        return function () {
          l = t, ++r[e], clearTimeout(n), n = setTimeout(s, 1000);
        };
      }
      function f(t) {
        u(a, t, e), 'keyup' !== i && (o = h(t)), setTimeout(s, 10);
      }
      r[e] = 0;
      for (var d = 0; d < t.length; ++d) {
        var p = d + 1 === t.length ? f : c(i || b(t[d + 1]).action);
        m(t[d], p, i, e, d);
      }
    }
    function m(e, n, r, o, a) {
      t._directMap[e + ':' + r] = n;
      var i, l = (e = e.replace(/\s+/g, ' ')).split(' ');
      l.length > 1 ? d(e, l, n, r) : (i = b(e, r), t._callbacks[i.key] = t._callbacks[i.key] || [], c(i.key, i.modifiers, { type: i.action }, o, e, a), t._callbacks[i.key][o ? 'unshift' : 'push']({
        callback: n,
        modifiers: i.modifiers,
        action: i.action,
        seq: o,
        level: a,
        combo: e
      }));
    }
    t._handleKey = function (e, t, n) {
      var r, o = c(e, t, n), a = {}, f = 0, d = !1;
      for (r = 0; r < o.length; ++r)
        o[r].seq && (f = Math.max(f, o[r].level));
      for (r = 0; r < o.length; ++r)
        if (o[r].seq) {
          if (o[r].level != f)
            continue;
          d = !0, a[o[r].seq] = 1, u(o[r].callback, n, o[r].combo, o[r].seq);
        } else
          d || u(o[r].callback, n, o[r].combo);
      var p = 'keypress' == n.type && i;
      n.type != l || g(e) || p || s(a), i = d && 'keydown' == n.type;
    }, t._bindMultiple = function (e, t, n) {
      for (var r = 0; r < e.length; ++r)
        m(e[r], t, n);
    }, p(e, 'keypress', f), p(e, 'keydown', f), p(e, 'keyup', f);
  }
}('undefined' != typeof window ? window : null, 'undefined' != typeof window ? document : null);