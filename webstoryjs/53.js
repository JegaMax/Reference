'use strict';
var r = n('./29'), o = n('./76'), a = n('./8'), i = a.List, l = a.Map, s = a.OrderedSet, c = a.Record, u = a.Repeat, f = s(), d = c({
    key: '',
    type: 'unstyled',
    text: '',
    characterList: i(),
    depth: 0,
    data: l()
  }), p = function (e) {
    var t, n;
    function ContentBlock(t) {
      return e.call(this, function (e) {
        if (!e)
          return e;
        var t = e.characterList, n = e.text;
        return n && !t && (e.characterList = i(u(r.EMPTY, n.length))), e;
      }(t)) || this;
    }
    n = e, (t = ContentBlock).prototype = Object.create(n.prototype), t.prototype.constructor = t, t.__proto__ = n;
    var a = ContentBlock.prototype;
    return a.getKey = function () {
      return this.get('key');
    }, a.getType = function () {
      return this.get('type');
    }, a.getText = function () {
      return this.get('text');
    }, a.getCharacterList = function () {
      return this.get('characterList');
    }, a.getLength = function () {
      return this.getText().length;
    }, a.getDepth = function () {
      return this.get('depth');
    }, a.getData = function () {
      return this.get('data');
    }, a.getInlineStyleAt = function (e) {
      var t = this.getCharacterList().get(e);
      return t ? t.getStyle() : f;
    }, a.getEntityAt = function (e) {
      var t = this.getCharacterList().get(e);
      return t ? t.getEntity() : null;
    }, a.findStyleRanges = function (e, t) {
      o(this.getCharacterList(), h, e, t);
    }, a.findEntityRanges = function (e, t) {
      o(this.getCharacterList(), g, e, t);
    }, ContentBlock;
  }(d);
function h(e, t) {
  return e.getStyle() === t.getStyle();
}
function g(e, t) {
  return e.getEntity() === t.getEntity();
}
e.exports = p;