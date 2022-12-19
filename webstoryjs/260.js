'use strict';
var r;
function o(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = null != arguments[t] ? arguments[t] : {}, r = Object.keys(n);
    'function' == typeof Object.getOwnPropertySymbols && (r = r.concat(Object.getOwnPropertySymbols(n).filter(function (e) {
      return Object.getOwnPropertyDescriptor(n, e).enumerable;
    }))), r.forEach(function (t) {
      a(e, t, n[t]);
    });
  }
  return e;
}
function a(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
var i = n('./29'), l = n('./53'), s = n('./30'), c = n('./156'), u = n('./106'), f = n('./554'), d = n('./54'), p = n('./39'), h = n('./261'), g = n('./44'), m = n('./8'), b = m.List, v = m.Map, y = m.OrderedSet, C = n('./555'), w = n('./246'), x = n('./77'), E = n('./556'), _ = g('draft_tree_data_support'), O = new RegExp('\r', 'g'), S = new RegExp('\n', 'g'), k = new RegExp('^\n', 'g'), A = new RegExp('&nbsp;', 'g'), j = new RegExp('&#13;?', 'g'), M = new RegExp('&#8203;?', 'g'), I = [
    'bold',
    'bolder',
    '500',
    '600',
    '700',
    '800',
    '900'
  ], T = [
    'light',
    'lighter',
    'normal',
    '100',
    '200',
    '300',
    '400'
  ], P = [
    'className',
    'href',
    'rel',
    'target',
    'title'
  ], D = [
    'alt',
    'className',
    'height',
    'src',
    'width'
  ], R = (a(r = {}, d('public/DraftStyleDefault/depth0'), 0), a(r, d('public/DraftStyleDefault/depth1'), 1), a(r, d('public/DraftStyleDefault/depth2'), 2), a(r, d('public/DraftStyleDefault/depth3'), 3), a(r, d('public/DraftStyleDefault/depth4'), 4), r), N = v({
    b: 'BOLD',
    code: 'CODE',
    del: 'STRIKETHROUGH',
    em: 'ITALIC',
    i: 'ITALIC',
    s: 'STRIKETHROUGH',
    strike: 'STRIKETHROUGH',
    strong: 'BOLD',
    u: 'UNDERLINE',
    mark: 'HIGHLIGHT'
  }), z = function (e) {
    var t = {};
    return e.mapKeys(function (e, n) {
      var r = [n.element];
      void 0 !== n.aliasedElements && r.push.apply(r, n.aliasedElements), r.forEach(function (n) {
        void 0 === t[n] ? t[n] = e : 'string' == typeof t[n] ? t[n] = [
          t[n],
          e
        ] : t[n].push(e);
      });
    }), v(t);
  }, L = function (e) {
    if (x(e) && e.style.fontFamily.includes('monospace'))
      return 'CODE';
    return null;
  }, B = function (e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
    return Object.keys(R).some(function (n) {
      e.classList.contains(n) && (t = R[n]);
    }), t;
  }, F = function (e) {
    if (!C(e))
      return !1;
    var t = e;
    if (!t.href || 'http:' !== t.protocol && 'https:' !== t.protocol && 'mailto:' !== t.protocol && 'tel:' !== t.protocol)
      return !1;
    try {
      new f(t.href);
      return !0;
    } catch (e) {
      return !1;
    }
  }, H = function (e) {
    if (!E(e))
      return !1;
    var t = e;
    return !(!t.attributes.getNamedItem('src') || !t.attributes.getNamedItem('src').value);
  }, U = function (e, t) {
    if (!x(e))
      return t;
    var n = e, r = n.style.fontWeight, o = n.style.fontStyle, a = n.style.textDecoration;
    return t.withMutations(function (e) {
      I.indexOf(r) >= 0 ? e.add('BOLD') : T.indexOf(r) >= 0 && e.remove('BOLD'), 'italic' === o ? e.add('ITALIC') : 'normal' === o && e.remove('ITALIC'), 'underline' === a && e.add('UNDERLINE'), 'line-through' === a && e.add('STRIKETHROUGH'), 'none' === a && (e.remove('UNDERLINE'), e.remove('STRIKETHROUGH'));
    });
  }, W = function (e) {
    return 'ul' === e || 'ol' === e;
  }, V = function () {
    function ContentBlocksBuilder(e, t) {
      a(this, 'characterList', b()), a(this, 'currentBlockType', 'unstyled'), a(this, 'currentDepth', 0), a(this, 'currentEntity', null), a(this, 'currentText', ''), a(this, 'wrapper', null), a(this, 'blockConfigs', []), a(this, 'contentBlocks', []), a(this, 'entityMap', u), a(this, 'blockTypeMap', void 0), a(this, 'disambiguate', void 0), this.clear(), this.blockTypeMap = e, this.disambiguate = t;
    }
    var e = ContentBlocksBuilder.prototype;
    return e.clear = function () {
      this.characterList = b(), this.blockConfigs = [], this.currentBlockType = 'unstyled', this.currentDepth = 0, this.currentEntity = null, this.currentText = '', this.entityMap = u, this.wrapper = null, this.contentBlocks = [];
    }, e.addDOMNode = function (e) {
      var t;
      return this.contentBlocks = [], this.currentDepth = 0, (t = this.blockConfigs).push.apply(t, this._toBlockConfigs([e], y())), this._trimCurrentText(), '' !== this.currentText && this.blockConfigs.push(this._makeBlockConfig()), this;
    }, e.getContentBlocks = function () {
      return 0 === this.contentBlocks.length && (_ ? this._toContentBlocks(this.blockConfigs) : this._toFlatContentBlocks(this.blockConfigs)), {
        contentBlocks: this.contentBlocks,
        entityMap: this.entityMap
      };
    }, e._makeBlockConfig = function () {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = e.key || p(), n = o({
          key: t,
          type: this.currentBlockType,
          text: this.currentText,
          characterList: this.characterList,
          depth: this.currentDepth,
          parent: null,
          children: b(),
          prevSibling: null,
          nextSibling: null,
          childConfigs: []
        }, e);
      return this.characterList = b(), this.currentBlockType = 'unstyled', this.currentText = '', n;
    }, e._toBlockConfigs = function (e, t) {
      for (var n = [], r = 0; r < e.length; r++) {
        var o = e[r], a = o.nodeName.toLowerCase();
        if ('body' === a || W(a)) {
          this._trimCurrentText(), '' !== this.currentText && n.push(this._makeBlockConfig());
          var i = this.currentDepth, l = this.wrapper;
          W(a) && (this.wrapper = a, W(l) && this.currentDepth++), n.push.apply(n, this._toBlockConfigs(Array.from(o.childNodes), t)), this.currentDepth = i, this.wrapper = l;
        } else {
          var s = this.blockTypeMap.get(a);
          if (void 0 === s)
            if ('#text' !== a)
              if ('br' !== a)
                if (H(o))
                  this._addImgNode(o, t);
                else if (F(o))
                  this._addAnchorNode(o, n, t);
                else {
                  var c = t;
                  N.has(a) && (c = c.add(N.get(a))), c = U(o, c);
                  var u = L(o);
                  null != u && (c = c.add(u)), n.push.apply(n, this._toBlockConfigs(Array.from(o.childNodes), c));
                }
              else
                this._addBreakNode(o, t);
            else
              this._addTextNode(o, t);
          else {
            this._trimCurrentText(), '' !== this.currentText && n.push(this._makeBlockConfig());
            var f = this.currentDepth, d = this.wrapper;
            if (this.wrapper = 'pre' === a ? 'pre' : this.wrapper, 'string' != typeof s && (s = this.disambiguate(a, this.wrapper) || s[0] || 'unstyled'), !_ && x(o) && ('unordered-list-item' === s || 'ordered-list-item' === s)) {
              var h = o;
              this.currentDepth = B(h, this.currentDepth);
            }
            var g = p(), m = this._toBlockConfigs(Array.from(o.childNodes), t);
            this._trimCurrentText(), n.push(this._makeBlockConfig({
              key: g,
              childConfigs: m,
              type: s
            })), this.currentDepth = f, this.wrapper = d;
          }
        }
      }
      return n;
    }, e._appendText = function (e, t) {
      var n;
      this.currentText += e;
      var r = i.create({
        style: t,
        entity: this.currentEntity
      });
      this.characterList = (n = this.characterList).push.apply(n, Array(e.length).fill(r));
    }, e._trimCurrentText = function () {
      var e = this.currentText.length, t = e - this.currentText.trimLeft().length, n = this.currentText.trimRight().length, r = this.characterList.findEntry(function (e) {
          return null !== e.getEntity();
        });
      (t = void 0 !== r ? Math.min(t, r[0]) : t) > (n = void 0 !== (r = this.characterList.reverse().findEntry(function (e) {
        return null !== e.getEntity();
      })) ? Math.max(n, e - r[0]) : n) ? (this.currentText = '', this.characterList = b()) : (this.currentText = this.currentText.slice(t, n), this.characterList = this.characterList.slice(t, n));
    }, e._addTextNode = function (e, t) {
      var n = e.textContent;
      '' === n.trim() && 'pre' !== this.wrapper && (n = ' '), 'pre' !== this.wrapper && (n = (n = n.replace(k, '')).replace(S, ' ')), this._appendText(n, t);
    }, e._addBreakNode = function (e, t) {
      w(e) && this._appendText('\n', t);
    }, e._addImgNode = function (e, t) {
      if (E(e)) {
        var n = e, r = {};
        D.forEach(function (e) {
          var t = n.getAttribute(e);
          t && (r[e] = t);
        }), this.currentEntity = this.entityMap.__create('IMAGE', 'IMMUTABLE', r), g('draftjs_fix_paste_for_img') ? 'presentation' !== n.getAttribute('role') && this._appendText('\uD83D\uDCF7', t) : this._appendText('\uD83D\uDCF7', t), this.currentEntity = null;
      }
    }, e._addAnchorNode = function (e, t, n) {
      if (C(e)) {
        var r = e, o = {};
        P.forEach(function (e) {
          var t = r.getAttribute(e);
          t && (o[e] = t);
        }), o.url = new f(r.href).toString(), this.currentEntity = this.entityMap.__create('LINK', 'MUTABLE', o || {}), t.push.apply(t, this._toBlockConfigs(Array.from(e.childNodes), n)), this.currentEntity = null;
      }
    }, e._toContentBlocks = function (e) {
      for (var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null, n = e.length - 1, r = 0; r <= n; r++) {
        var a = e[r];
        a.parent = t, a.prevSibling = r > 0 ? e[r - 1].key : null, a.nextSibling = r < n ? e[r + 1].key : null, a.children = b(a.childConfigs.map(function (e) {
          return e.key;
        })), this.contentBlocks.push(new s(o({}, a))), this._toContentBlocks(a.childConfigs, a.key);
      }
    }, e._hoistContainersInBlockConfigs = function (e) {
      var t = this;
      return b(e).flatMap(function (e) {
        return 'unstyled' !== e.type || '' !== e.text ? [e] : t._hoistContainersInBlockConfigs(e.childConfigs);
      });
    }, e._toFlatContentBlocks = function (e) {
      var t = this;
      this._hoistContainersInBlockConfigs(e).forEach(function (e) {
        var n = t._extractTextFromBlockConfigs(e.childConfigs), r = n.text, a = n.characterList;
        t.contentBlocks.push(new l(o({}, e, {
          text: e.text + r,
          characterList: e.characterList.concat(a)
        })));
      });
    }, e._extractTextFromBlockConfigs = function (e) {
      for (var t = e.length - 1, n = '', r = b(), o = 0; o <= t; o++) {
        var a = e[o];
        n += a.text, r = r.concat(a.characterList), '' !== n && 'unstyled' !== a.type && (n += '\n', r = r.push(r.last()));
        var i = this._extractTextFromBlockConfigs(a.childConfigs);
        n += i.text, r = r.concat(i.characterList);
      }
      return {
        text: n,
        characterList: r
      };
    }, ContentBlocksBuilder;
  }();
e.exports = function (e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : h, n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : c, r = t(e = e.trim().replace(O, '').replace(A, ' ').replace(j, '').replace(M, ''));
  if (!r)
    return null;
  var o = z(n), a = function (e, t) {
      return 'li' === e ? 'ol' === t ? 'ordered-list-item' : 'unordered-list-item' : null;
    };
  return new V(o, a).addDOMNode(r).getContentBlocks();
};