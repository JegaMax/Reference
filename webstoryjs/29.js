'use strict';
var r = n('./8'), o = r.Map, a = r.OrderedSet, i = r.Record, l = a(), s = {
    style: l,
    entity: null
  }, c = function (e) {
    var t, n;
    function CharacterMetadata() {
      return e.apply(this, arguments) || this;
    }
    n = e, (t = CharacterMetadata).prototype = Object.create(n.prototype), t.prototype.constructor = t, t.__proto__ = n;
    var r = CharacterMetadata.prototype;
    return r.getStyle = function () {
      return this.get('style');
    }, r.getEntity = function () {
      return this.get('entity');
    }, r.hasStyle = function (e) {
      return this.getStyle().includes(e);
    }, CharacterMetadata.applyStyle = function (e, t) {
      var n = e.set('style', e.getStyle().add(t));
      return CharacterMetadata.create(n);
    }, CharacterMetadata.removeStyle = function (e, t) {
      var n = e.set('style', e.getStyle().remove(t));
      return CharacterMetadata.create(n);
    }, CharacterMetadata.applyEntity = function (e, t) {
      var n = e.getEntity() === t ? e : e.set('entity', t);
      return CharacterMetadata.create(n);
    }, CharacterMetadata.create = function (e) {
      if (!e)
        return u;
      var t = o({
          style: l,
          entity: null
        }).merge(e), n = f.get(t);
      if (n)
        return n;
      var r = new CharacterMetadata(t);
      return f = f.set(t, r), r;
    }, CharacterMetadata.fromJS = function (e) {
      var t = e.style, n = e.entity;
      return new CharacterMetadata({
        style: Array.isArray(t) ? a(t) : t,
        entity: Array.isArray(n) ? a(n) : n
      });
    }, CharacterMetadata;
  }(i(s)), u = new c(), f = o([[
      o(s),
      u
    ]]);
c.EMPTY = u, e.exports = c;