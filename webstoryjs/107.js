'use strict';
var r = function (e) {
  var t, n;
  function SelectionState() {
    return e.apply(this, arguments) || this;
  }
  n = e, (t = SelectionState).prototype = Object.create(n.prototype), t.prototype.constructor = t, t.__proto__ = n;
  var r = SelectionState.prototype;
  return r.serialize = function () {
    return 'Anchor: ' + this.getAnchorKey() + ':' + this.getAnchorOffset() + ', Focus: ' + this.getFocusKey() + ':' + this.getFocusOffset() + ', Is Backward: ' + String(this.getIsBackward()) + ', Has Focus: ' + String(this.getHasFocus());
  }, r.getAnchorKey = function () {
    return this.get('anchorKey');
  }, r.getAnchorOffset = function () {
    return this.get('anchorOffset');
  }, r.getFocusKey = function () {
    return this.get('focusKey');
  }, r.getFocusOffset = function () {
    return this.get('focusOffset');
  }, r.getIsBackward = function () {
    return this.get('isBackward');
  }, r.getHasFocus = function () {
    return this.get('hasFocus');
  }, r.hasEdgeWithin = function (e, t, n) {
    var r = this.getAnchorKey(), o = this.getFocusKey();
    if (r === o && r === e) {
      var a = this.getStartOffset(), i = this.getEndOffset();
      return t <= a && a <= n || t <= i && i <= n;
    }
    if (e !== r && e !== o)
      return !1;
    var l = e === r ? this.getAnchorOffset() : this.getFocusOffset();
    return t <= l && n >= l;
  }, r.isCollapsed = function () {
    return this.getAnchorKey() === this.getFocusKey() && this.getAnchorOffset() === this.getFocusOffset();
  }, r.getStartKey = function () {
    return this.getIsBackward() ? this.getFocusKey() : this.getAnchorKey();
  }, r.getStartOffset = function () {
    return this.getIsBackward() ? this.getFocusOffset() : this.getAnchorOffset();
  }, r.getEndKey = function () {
    return this.getIsBackward() ? this.getAnchorKey() : this.getFocusKey();
  }, r.getEndOffset = function () {
    return this.getIsBackward() ? this.getAnchorOffset() : this.getFocusOffset();
  }, SelectionState.createEmpty = function (e) {
    return new SelectionState({
      anchorKey: e,
      anchorOffset: 0,
      focusKey: e,
      focusOffset: 0,
      isBackward: !1,
      hasFocus: !1
    });
  }, SelectionState;
}((0, n('./8').Record)({
  anchorKey: '',
  anchorOffset: 0,
  focusKey: '',
  focusOffset: 0,
  isBackward: !1,
  hasFocus: !1
}));
e.exports = r;