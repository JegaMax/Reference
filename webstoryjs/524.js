'use strict';
var r = n('./23'), o = n('./525'), a = n('./529'), i = n('./530'), l = n('./531'), s = n('./532'), c = n('./534'), u = n('./535'), f = n('./536'), d = n('./537'), p = n('./538'), h = n('./552'), g = n('./238'), m = r.isBrowser('Chrome'), b = r.isBrowser('Firefox'), v = m || b ? g : function (e) {
  }, y = {
    onBeforeInput: o,
    onBlur: a,
    onCompositionStart: i,
    onCopy: l,
    onCut: s,
    onDragOver: c,
    onDragStart: u,
    onFocus: f,
    onInput: d,
    onKeyDown: p,
    onPaste: h,
    onSelect: g,
    onMouseUp: v,
    onKeyUp: v
  };
e.exports = y;