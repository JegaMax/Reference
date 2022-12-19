'use strict';
function r(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = null != arguments[t] ? arguments[t] : {}, r = Object.keys(n);
    'function' == typeof Object.getOwnPropertySymbols && (r = r.concat(Object.getOwnPropertySymbols(n).filter(function (e) {
      return Object.getOwnPropertyDescriptor(n, e).enumerable;
    }))), r.forEach(function (t) {
      o(e, t, n[t]);
    });
  }
  return e;
}
function o(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
var a = n('./75'), i = n('./29'), l = n('./53'), s = n('./30'), c = n('./106'), u = n('./107'), f = n('./39'), d = n('./232'), p = n('./44'), h = n('./8'), g = n('./234'), m = h.List, b = h.Record, v = h.Repeat, y = h.Map, C = h.OrderedMap, w = b({
    entityMap: null,
    blockMap: null,
    selectionBefore: null,
    selectionAfter: null
  }), x = p('draft_tree_data_support') ? s : l, E = function (e) {
    var t, n;
    function ContentState() {
      return e.apply(this, arguments) || this;
    }
    n = e, (t = ContentState).prototype = Object.create(n.prototype), t.prototype.constructor = t, t.__proto__ = n;
    var o = ContentState.prototype;
    return o.getEntityMap = function () {
      return c;
    }, o.getBlockMap = function () {
      return this.get('blockMap');
    }, o.getSelectionBefore = function () {
      return this.get('selectionBefore');
    }, o.getSelectionAfter = function () {
      return this.get('selectionAfter');
    }, o.getBlockForKey = function (e) {
      return this.getBlockMap().get(e);
    }, o.getKeyBefore = function (e) {
      return this.getBlockMap().reverse().keySeq().skipUntil(function (t) {
        return t === e;
      }).skip(1).first();
    }, o.getKeyAfter = function (e) {
      return this.getBlockMap().keySeq().skipUntil(function (t) {
        return t === e;
      }).skip(1).first();
    }, o.getBlockAfter = function (e) {
      return this.getBlockMap().skipUntil(function (t, n) {
        return n === e;
      }).skip(1).first();
    }, o.getBlockBefore = function (e) {
      return this.getBlockMap().reverse().skipUntil(function (t, n) {
        return n === e;
      }).skip(1).first();
    }, o.getBlocksAsArray = function () {
      return this.getBlockMap().toArray();
    }, o.getFirstBlock = function () {
      return this.getBlockMap().first();
    }, o.getLastBlock = function () {
      return this.getBlockMap().last();
    }, o.getPlainText = function (e) {
      return this.getBlockMap().map(function (e) {
        return e ? e.getText() : '';
      }).join(e || '\n');
    }, o.getLastCreatedEntityKey = function () {
      return c.__getLastCreatedEntityKey();
    }, o.hasText = function () {
      var e = this.getBlockMap();
      return e.size > 1 || escape(e.first().getText()).replace(/%u200B/g, '').length > 0;
    }, o.createEntity = function (e, t, n) {
      return c.__create(e, t, n), this;
    }, o.mergeEntityData = function (e, t) {
      return c.__mergeData(e, t), this;
    }, o.replaceEntityData = function (e, t) {
      return c.__replaceData(e, t), this;
    }, o.addEntity = function (e) {
      return c.__add(e), this;
    }, o.getEntity = function (e) {
      return c.__get(e);
    }, o.getAllEntities = function () {
      return c.__getAll();
    }, o.loadWithEntities = function (e) {
      return c.__loadWithEntities(e);
    }, ContentState.createFromBlockArray = function (e, t) {
      var n = Array.isArray(e) ? e : e.contentBlocks, r = a.createFromArray(n), o = r.isEmpty() ? new u() : u.createEmpty(r.first().getKey());
      return new ContentState({
        blockMap: r,
        entityMap: t || c,
        selectionBefore: o,
        selectionAfter: o
      });
    }, ContentState.createFromText = function (e) {
      var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : /\r\n?|\n/g, n = e.split(t), r = n.map(function (e) {
          return e = g(e), new x({
            key: f(),
            text: e,
            type: 'unstyled',
            characterList: m(v(i.EMPTY, e.length))
          });
        });
      return ContentState.createFromBlockArray(r);
    }, ContentState.fromJS = function (e) {
      return new ContentState(r({}, e, {
        blockMap: C(e.blockMap).map(ContentState.createContentBlockFromJS),
        selectionBefore: new u(e.selectionBefore),
        selectionAfter: new u(e.selectionAfter)
      }));
    }, ContentState.createContentBlockFromJS = function (e) {
      var t = e.characterList;
      return new x(r({}, e, {
        data: y(e.data),
        characterList: null != t ? m((Array.isArray(t) ? t : d(t)).map(function (e) {
          return i.fromJS(e);
        })) : void 0
      }));
    }, ContentState;
  }(w);
e.exports = E;