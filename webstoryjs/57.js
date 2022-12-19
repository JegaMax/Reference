'use strict';
n.d(t, 'a', function () {
  return h;
}), n.d(t, 'b', function () {
  return b;
}), n.d(t, 'c', function () {
  return g;
});
var r = n('./0'), o = n.n(r), a = n('./116'), i = n('./16');
const l = 'v', s = 'p', c = 'l', u = 'u', f = Symbol(), d = Symbol(), p = 'undefined' == typeof window || /ServerSideRendering/.test(window.navigator && window.navigator.userAgent) ? o.a.useEffect : o.a.useLayoutEffect, h = e => {
    const t = o.a.createContext({
      [f]: {
        [l]: e,
        [s]: -1,
        [c]: new Set(),
        [u]: e => e()
      }
    }, () => 0);
    var n;
    return t[d] = t.Provider, t.Provider = (n = t.Provider, o.a.memo(({
      value: e,
      children: t
    }) => {
      const [r, d] = o.a.useState(0), h = o.a.useRef(0), g = o.a.useRef();
      g.current || (g.current = new Set());
      const m = o.a.useCallback(e => {
        Object(i.unstable_batchedUpdates)(() => {
          h.current += 1, d(h.current), g.current.forEach(e => e(h.current)), e();
        });
      }, []);
      return p(() => {
        h.current += 1, d(h.current), Object(a.unstable_runWithPriority)(a.unstable_NormalPriority, () => {
          g.current.forEach(t => {
            t(h.current, e);
          });
        });
      }, [e]), o.a.createElement(n, {
        value: {
          [f]: {
            [l]: e,
            [s]: r,
            [c]: g.current,
            [u]: m
          }
        }
      }, t);
    })), delete t.Consumer, t;
  }, g = (e, t) => {
    const n = o.a.useContext(e)[f];
    const {
        [l]: r,
        [s]: a,
        [c]: i
      } = n, u = t(r), d = o.a.useRef(null);
    p(() => {
      d.current = {
        f: t,
        v: r,
        s: u
      };
    });
    const [, h] = o.a.useReducer((e, t) => {
      if (a < t)
        return e + 1;
      try {
        if (d.current.v === r || Object.is(d.current.s, d.current.f(r)))
          return e;
      } catch (e) {
      }
      return e + 1;
    }, 0);
    return p(() => {
      const e = (e, t) => {
        try {
          if (t && (d.current.v === t || Object.is(d.current.s, d.current.f(t))))
            return;
        } catch (e) {
        }
        h(e);
      };
      return i.add(e), () => {
        i.delete(e);
      };
    }, [i]), u;
  }, m = e => e, b = e => g(e, m);