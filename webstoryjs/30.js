'use strict';
var r = n('./29'), o = n('./76'), a = n('./8'), i = a.List, l = a.Map, s = a.OrderedSet, c = a.Record, u = a.Repeat, f = s(), d = {
    parent: null,
    characterList: i(),
    data: l(),
    depth: 0,
    key: '',
    text: '',
    type: 'unstyled',
    children: i(),
    prevSibling: null,
    nextSibling: null
  }, p = function (e, t) {
    return e.getStyle() === t.getStyle();
  }, h = function (e, t) {
    return e.getEntity() === t.getEntity();
  }, g = function (e) {
    if (!e)
      return e;
    var t = e.characterList, n = e.text;
    return n && !t && (e.characterList = i(u(r.EMPTY, n.length))), e;
  }, m = function (e) {
    var t, n;
    function ContentBlockNode() {
      var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : d;
      return e.call(this, g(t)) || this;
    }
    n = e, (t = ContentBlockNode).prototype = Object.create(n.prototype), t.prototype.constructor = t, t.__proto__ = n;
    var r = ContentBlockNode.prototype;
    return r.getKey = function () {
      return this.get('key');
    }, r.getType = function () {
      return this.get('type');
    }, r.getText = function () {
      return this.get('text');
    }, r.getCharacterList = function () {
      return this.get('characterList');
    }, r.getLength = function () {
      return this.getText().length;
    }, r.getDepth = function () {
      return this.get('depth');
    }, r.getData = function () {
      return this.get('data');
    }, r.getInlineStyleAt = function (e) {
      var t = this.getCharacterList().get(e);
      return t ? t.getStyle() : f;
    }, r.getEntityAt = function (e) {
      var t = this.getCharacterList().get(e);
      return t ? t.getEntity() : null;
    }, r.getChildKeys = function () {
      return this.get('children');
    }, r.getParentKey = function () {
      return this.get('parent');
    }, r.getPrevSiblingKey = function () {
      return this.get('prevSibling');
    }, r.getNextSiblingKey = function () {
      return this.get('nextSibling');
    }, r.findStyleRanges = function (e, t) {
      o(this.getCharacterList(), p, e, t);
    }, r.findEntityRanges = function (e, t) {
      o(this.getCharacterList(), h, e, t);
    }, ContentBlockNode;
  }(c(d));
e.exports = m;