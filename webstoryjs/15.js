'use strict';
n.d(t, 'a', function () {
  return i;
}), n.d(t, 'c', function () {
  return c;
}), n.d(t, 'b', function () {
  return u;
});
var r = n('./12'), o = (n('./46'), n('./64'));
var a = async function (e) {
  return r.a.trackingAllowed ? (r.a.trackingEnabled = !0, await function (e = !0) {
    const t = 'data-web-stories-tracking';
    return document.querySelector(`script[${ t }]`) ? Promise.resolve() : new Promise((n, a) => {
      const i = document.createElement('script');
      i.setAttribute(t, ''), i.async = !0, i.src = `https://www.googletagmanager.com/gtag/js?id=${ r.a.trackingId }&l=${ o.a }`, i.addEventListener('load', n), i.addEventListener('error', a), document.head.appendChild(i), Object(r.b)('js', new Date()), Object(r.b)('config', r.a.trackingId, {
        anonymize_ip: !0,
        app_name: r.a.appName,
        send_page_view: e,
        transport_type: 'beacon'
      });
      const l = new URL(window.location.href);
      l.searchParams.delete('paged'), l.searchParams.delete('plugin_status'), l.searchParams.delete('post'), l.searchParams.delete('s'), Object(r.b)('set', 'location', l.toString());
    });
  }(e)) : Promise.resolve();
};
var i = async function (e, t = !0) {
  r.a.appName = e, await a(t);
};
var l = function () {
    return Boolean(r.a.trackingEnabled);
  }, s = n('./45');
var c = async function (e, t, n = '', o = '', a = {}) {
  if (!l())
    return Promise.resolve();
  const i = {
    send_to: r.a.trackingId,
    event_category: t,
    event_label: n,
    event_value: o,
    ...a
  };
  return Object(s.a)(e, i);
};
var u = async function (e, t, n, o) {
  if (!l())
    return Promise.resolve();
  e.preventDefault();
  const a = {
    send_to: r.a.trackingId,
    event_category: n,
    event_label: o
  };
  return Object(s.a)(t, a).finally(() => {
    document.location = o;
  });
};