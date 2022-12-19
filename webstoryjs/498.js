'use strict';
function r(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
var o = n('./23'), a = n('./109'), i = n('./237'), l = n('./8'), s = n('./9'), c = n('./22'), u = l.Map, f = {
    subtree: !0,
    characterData: !0,
    childList: !0,
    characterDataOldValue: !1,
    attributes: !1
  }, d = o.isBrowser('IE <= 11'), p = function () {
    function DOMObserver(e) {
      var t = this;
      r(this, 'observer', void 0), r(this, 'container', void 0), r(this, 'mutations', void 0), r(this, 'onCharData', void 0), this.container = e, this.mutations = u();
      var n = i(e);
      n.MutationObserver && !d ? this.observer = new n.MutationObserver(function (e) {
        return t.registerMutations(e);
      }) : this.onCharData = function (e) {
        e.target instanceof Node || s(!1), t.registerMutation({
          type: 'characterData',
          target: e.target
        });
      };
    }
    var e = DOMObserver.prototype;
    return e.start = function () {
      this.observer ? this.observer.observe(this.container, f) : this.container.addEventListener('DOMCharacterDataModified', this.onCharData);
    }, e.stopAndFlushMutations = function () {
      var e = this.observer;
      e ? (this.registerMutations(e.takeRecords()), e.disconnect()) : this.container.removeEventListener('DOMCharacterDataModified', this.onCharData);
      var t = this.mutations;
      return this.mutations = u(), t;
    }, e.registerMutations = function (e) {
      for (var t = 0; t < e.length; t++)
        this.registerMutation(e[t]);
    }, e.getMutationTextContent = function (e) {
      var t = e.type, n = e.target, r = e.removedNodes;
      if ('characterData' === t) {
        if ('' !== n.textContent)
          return d ? n.textContent.replace('\n', '') : n.textContent;
      } else if ('childList' === t) {
        if (r && r.length)
          return '';
        if ('' !== n.textContent)
          return n.textContent;
      }
      return null;
    }, e.registerMutation = function (e) {
      var t = this.getMutationTextContent(e);
      if (null != t) {
        var n = c(a(e.target));
        this.mutations = this.mutations.set(n, t);
      }
    }, DOMObserver;
  }();
e.exports = p;