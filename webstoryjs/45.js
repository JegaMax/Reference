'use strict';
(function (e) {
  var r = n('./12');
  t.a = async function (t, n) {
    return new Promise(o => {
      const a = setTimeout(() => {
        e.console.warn(`[Web Stories] Tracking event "${ t }" took too long to fire.`), o();
      }, 1000);
      Object(r.b)('event', t, {
        ...n,
        event_callback: () => {
          clearTimeout(a), o();
        }
      });
    });
  };
}.call(this, n('./26')));