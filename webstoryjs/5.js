'use strict';
(function (e) {
  n.d(t, 'g', function () {
    return g;
  }), n.d(t, 'f', function () {
    return m;
  }), n.d(t, 'e', function () {
    return v;
  }), n.d(t, 'd', function () {
    return y;
  }), n.d(t, 'c', function () {
    return C;
  }), n.d(t, 'a', function () {
    return x;
  }), n.d(t, 'b', function () {
    return E;
  });
  n('./20');
  var r = n('./269'), o = n.n(r), a = n('./0'), i = n('./17'), l = n('./4'), s = n('./275');
  const c = '__WEB_STORIES_MT__', u = [
      'submit',
      'button',
      'checkbox',
      'radio',
      'image',
      'file',
      'range',
      'reset',
      'hidden'
    ], f = [
      'submit',
      'button',
      'checkbox',
      'radio',
      'image',
      'file',
      'reset'
    ], d = Object(a.createRef)();
  function p() {
    d.current || (d.current = document.documentElement);
  }
  function h(e, t, n, r, d) {
    const {keys: p} = Object(l.c)(s.a), h = Object(i.a)(r, d || []);
    Object(a.useEffect)(() => {
      const r = void 0 !== e.current ? e.current : e;
      if (!r)
        return;
      if (1 !== r.nodeType && 9 !== r.nodeType)
        throw new Error('only an element or a document node can be used');
      const a = function (e, t) {
        const n = 'string' == typeof t || Array.isArray(t) ? { key: t } : t, {
            key: r,
            shift: o = !1,
            repeat: a = !0,
            clickable: i = !0,
            editable: l = !1,
            dialog: s = !1,
            allowDefault: c = !1
          } = n, u = [].concat(r).map(t => e[t] || t).flat();
        return {
          key: w(u, o),
          shift: o,
          clickable: i,
          repeat: a,
          editable: l,
          dialog: s,
          allowDefault: c
        };
      }(p, t);
      if (1 === a.key.length && '' === a.key[0])
        return;
      const i = function (e) {
          return e[c] || (e[c] = new o.a(e));
        }(r), l = function (e, {
          repeat: t,
          editable: n,
          clickable: r,
          dialog: o,
          allowDefault: a = !1
        }, i) {
          return l => {
            const {
              repeat: s,
              target: c
            } = l;
            if ((t || !s) && (n || !function ({
                tagName: e,
                isContentEditable: t,
                type: n,
                readOnly: r
              }) {
                if (!0 === r)
                  return !1;
                if (t || 'TEXTAREA' === e)
                  return !0;
                if ('INPUT' === e)
                  return !u.includes(n);
                return !1;
              }(c)) && (r || !function ({
                tagName: e,
                type: t
              }) {
                if ([
                    'BUTTON',
                    'A'
                  ].includes(e))
                  return !0;
                if ('INPUT' === e)
                  return f.includes(t);
                return !1;
              }(c)) && (o || !function (e, t) {
                if (1 !== e.nodeType)
                  return !1;
                const n = e.closest('dialog,[role="dialog"]');
                return n && t !== n && t.contains(n);
              }(c, e)))
              return i(l), a;
          };
        }(r, a, h);
      return i.bind(a.key, l, n), () => {
        i.unbind(a.key, n);
      };
    }, [
      h,
      p
    ]);
  }
  function g(e, t, n, r) {
    h(e, t, void 0, n, r);
  }
  function m(e, t, n, r) {
    h(e, t, 'keydown', n, r);
  }
  function b(e, t, n, r) {
    h(e, t, 'keyup', n, r);
  }
  function v(e, t, n) {
    p(), m(d, e, t, n);
  }
  function y(e, t) {
    return p(), function (e, t, n) {
      const [r, o] = Object(a.useState)(!1);
      return m(e, t, () => o(!0), n), b(e, t, () => o(!1), n), r;
    }(d, e, t);
  }
  function C(e, t) {
    m(e, {
      key: 'esc',
      editable: !0
    }, () => {
      const {current: t} = e, {activeElement: n} = document;
      t.contains(n) && n.blur();
    }, t);
  }
  function w(e, t) {
    return t ? e.concat(e.map(e => 'shift+' + e)) : e;
  }
  function x() {
    const {platform: t} = e.navigator;
    return t.includes('Mac') || [
      'iPad',
      'iPhone'
    ].includes(t);
  }
  function E(e) {
    const t = x(), n = {
        alt: t ? '\u2325' : 'Alt',
        ctrl: t ? '^' : 'Ctrl',
        mod: t ? '\u2318' : 'Ctrl',
        cmd: '\u2318',
        shift: t ? '\u21E7' : 'Shift'
      }, r = t ? '' : '+';
    return e.toLowerCase().replace('alt', n.alt).replace('ctrl', n.ctrl).replace('mod', n.mod).replace('cmd', n.cmd).replace('shift', n.shift).replace('left', '\u2190').replace('up', '\u2191').replace('right', '\u2192').replace('down', '\u2193').replace('delete', '\u232B').split('+').map(e => e.charAt(0).toUpperCase() + e.slice(1)).join(r);
  }
}.call(this, n('./26')));