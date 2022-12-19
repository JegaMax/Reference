'use strict';
n.r(t), function (e) {
  var t = n('./0'), r = n.n(t), o = n('./115'), a = n.n(o), i = n('./16'), l = n('./10'), s = n('./15'), c = n('./40'), u = n('./274');
  n('./574');
  n.p = e.webStoriesEditorSettings.publicPath;
  const f = () => {
    const {
      id: e,
      config: n,
      flags: o
    } = window.webStoriesEditorSettings;
    ((e, n, o) => {
      const f = document.getElementById(e);
      a.a.setAppElement(f), Object(c.g)(n.locale), Object(s.a)('Editor'), Object(i.render)(r.a.createElement(l.a, { features: o }, r.a.createElement(t.StrictMode, null, r.a.createElement(u.a, { config: n }))), f);
    })(e, n, o);
  };
  'loading' === document.readyState ? document.addEventListener('DOMContentLoaded', f) : f();
}.call(this, n('./26'));