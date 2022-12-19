e.exports = function () {
  'use strict';
  var e = Array.prototype.slice;
  function t(e, t) {
    t && (e.prototype = Object.create(t.prototype)), e.prototype.constructor = e;
  }
  function Iterable(e) {
    return n(e) ? e : Seq(e);
  }
  function KeyedIterable(e) {
    return r(e) ? e : KeyedSeq(e);
  }
  function IndexedIterable(e) {
    return o(e) ? e : IndexedSeq(e);
  }
  function SetIterable(e) {
    return n(e) && !a(e) ? e : SetSeq(e);
  }
  function n(e) {
    return !(!e || !e[l]);
  }
  function r(e) {
    return !(!e || !e[s]);
  }
  function o(e) {
    return !(!e || !e[c]);
  }
  function a(e) {
    return r(e) || o(e);
  }
  function i(e) {
    return !(!e || !e[u]);
  }
  t(KeyedIterable, Iterable), t(IndexedIterable, Iterable), t(SetIterable, Iterable), Iterable.isIterable = n, Iterable.isKeyed = r, Iterable.isIndexed = o, Iterable.isAssociative = a, Iterable.isOrdered = i, Iterable.Keyed = KeyedIterable, Iterable.Indexed = IndexedIterable, Iterable.Set = SetIterable;
  var l = '@@__IMMUTABLE_ITERABLE__@@', s = '@@__IMMUTABLE_KEYED__@@', c = '@@__IMMUTABLE_INDEXED__@@', u = '@@__IMMUTABLE_ORDERED__@@', f = 'delete', d = 5, p = 1 << d, h = p - 1, g = {}, m = { value: !1 }, b = { value: !1 };
  function MakeRef(e) {
    return e.value = !1, e;
  }
  function SetRef(e) {
    e && (e.value = !0);
  }
  function OwnerID() {
  }
  function v(e, t) {
    t = t || 0;
    for (var n = Math.max(0, e.length - t), r = new Array(n), o = 0; o < n; o++)
      r[o] = e[o + t];
    return r;
  }
  function y(e) {
    return void 0 === e.size && (e.size = e.__iterate(w)), e.size;
  }
  function C(e, t) {
    if ('number' != typeof t) {
      var n = t >>> 0;
      if ('' + n !== t || 4294967295 === n)
        return NaN;
      t = n;
    }
    return t < 0 ? y(e) + t : t;
  }
  function w() {
    return !0;
  }
  function x(e, t, n) {
    return (0 === e || void 0 !== n && e <= -n) && (void 0 === t || void 0 !== n && t >= n);
  }
  function E(e, t) {
    return O(e, t, 0);
  }
  function _(e, t) {
    return O(e, t, t);
  }
  function O(e, t, n) {
    return void 0 === e ? n : e < 0 ? Math.max(0, t + e) : void 0 === t ? e : Math.min(t, e);
  }
  var S = 0, k = 1, A = 2, j = 'function' == typeof Symbol && Symbol.iterator, M = '@@iterator', I = j || M;
  function Iterator(e) {
    this.next = e;
  }
  function T(e, t, n, r) {
    var o = 0 === e ? t : 1 === e ? n : [
      t,
      n
    ];
    return r ? r.value = o : r = {
      value: o,
      done: !1
    }, r;
  }
  function P() {
    return {
      value: void 0,
      done: !0
    };
  }
  function D(e) {
    return !!z(e);
  }
  function R(e) {
    return e && 'function' == typeof e.next;
  }
  function N(e) {
    var t = z(e);
    return t && t.call(e);
  }
  function z(e) {
    var t = e && (j && e[j] || e[M]);
    if ('function' == typeof t)
      return t;
  }
  function L(e) {
    return e && 'number' == typeof e.length;
  }
  function Seq(e) {
    return null == e ? V() : n(e) ? e.toSeq() : G(e);
  }
  function KeyedSeq(e) {
    return null == e ? V().toKeyedSeq() : n(e) ? r(e) ? e.toSeq() : e.fromEntrySeq() : K(e);
  }
  function IndexedSeq(e) {
    return null == e ? V() : n(e) ? r(e) ? e.entrySeq() : e.toIndexedSeq() : q(e);
  }
  function SetSeq(e) {
    return (null == e ? V() : n(e) ? r(e) ? e.entrySeq() : e : q(e)).toSetSeq();
  }
  Iterator.prototype.toString = function () {
    return '[Iterator]';
  }, Iterator.KEYS = S, Iterator.VALUES = k, Iterator.ENTRIES = A, Iterator.prototype.inspect = Iterator.prototype.toSource = function () {
    return this.toString();
  }, Iterator.prototype[I] = function () {
    return this;
  }, t(Seq, Iterable), Seq.of = function () {
    return Seq(arguments);
  }, Seq.prototype.toSeq = function () {
    return this;
  }, Seq.prototype.toString = function () {
    return this.__toString('Seq {', '}');
  }, Seq.prototype.cacheResult = function () {
    return !this._cache && this.__iterateUncached && (this._cache = this.entrySeq().toArray(), this.size = this._cache.length), this;
  }, Seq.prototype.__iterate = function (e, t) {
    return Y(this, e, t, !0);
  }, Seq.prototype.__iterator = function (e, t) {
    return Q(this, e, t, !0);
  }, t(KeyedSeq, Seq), KeyedSeq.prototype.toKeyedSeq = function () {
    return this;
  }, t(IndexedSeq, Seq), IndexedSeq.of = function () {
    return IndexedSeq(arguments);
  }, IndexedSeq.prototype.toIndexedSeq = function () {
    return this;
  }, IndexedSeq.prototype.toString = function () {
    return this.__toString('Seq [', ']');
  }, IndexedSeq.prototype.__iterate = function (e, t) {
    return Y(this, e, t, !1);
  }, IndexedSeq.prototype.__iterator = function (e, t) {
    return Q(this, e, t, !1);
  }, t(SetSeq, Seq), SetSeq.of = function () {
    return SetSeq(arguments);
  }, SetSeq.prototype.toSetSeq = function () {
    return this;
  }, Seq.isSeq = W, Seq.Keyed = KeyedSeq, Seq.Set = SetSeq, Seq.Indexed = IndexedSeq;
  var B, F, H, U = '@@__IMMUTABLE_SEQ__@@';
  function ArraySeq(e) {
    this._array = e, this.size = e.length;
  }
  function ObjectSeq(e) {
    var t = Object.keys(e);
    this._object = e, this._keys = t, this.size = t.length;
  }
  function IterableSeq(e) {
    this._iterable = e, this.size = e.length || e.size;
  }
  function IteratorSeq(e) {
    this._iterator = e, this._iteratorCache = [];
  }
  function W(e) {
    return !(!e || !e[U]);
  }
  function V() {
    return B || (B = new ArraySeq([]));
  }
  function K(e) {
    var t = Array.isArray(e) ? new ArraySeq(e).fromEntrySeq() : R(e) ? new IteratorSeq(e).fromEntrySeq() : D(e) ? new IterableSeq(e).fromEntrySeq() : 'object' == typeof e ? new ObjectSeq(e) : void 0;
    if (!t)
      throw new TypeError('Expected Array or iterable object of [k, v] entries, or keyed object: ' + e);
    return t;
  }
  function q(e) {
    var t = Z(e);
    if (!t)
      throw new TypeError('Expected Array or iterable object of values: ' + e);
    return t;
  }
  function G(e) {
    var t = Z(e) || 'object' == typeof e && new ObjectSeq(e);
    if (!t)
      throw new TypeError('Expected Array or iterable object of values, or keyed object: ' + e);
    return t;
  }
  function Z(e) {
    return L(e) ? new ArraySeq(e) : R(e) ? new IteratorSeq(e) : D(e) ? new IterableSeq(e) : void 0;
  }
  function Y(e, t, n, r) {
    var o = e._cache;
    if (o) {
      for (var a = o.length - 1, i = 0; i <= a; i++) {
        var l = o[n ? a - i : i];
        if (!1 === t(l[1], r ? l[0] : i, e))
          return i + 1;
      }
      return i;
    }
    return e.__iterateUncached(t, n);
  }
  function Q(e, t, n, r) {
    var o = e._cache;
    if (o) {
      var a = o.length - 1, i = 0;
      return new Iterator(function () {
        var e = o[n ? a - i : i];
        return i++ > a ? P() : T(t, r ? e[0] : i - 1, e[1]);
      });
    }
    return e.__iteratorUncached(t, n);
  }
  function $(e, t) {
    return t ? X(t, e, '', { '': e }) : J(e);
  }
  function X(e, t, n, r) {
    return Array.isArray(t) ? e.call(r, n, IndexedSeq(t).map(function (n, r) {
      return X(e, n, r, t);
    })) : ee(t) ? e.call(r, n, KeyedSeq(t).map(function (n, r) {
      return X(e, n, r, t);
    })) : t;
  }
  function J(e) {
    return Array.isArray(e) ? IndexedSeq(e).map(J).toList() : ee(e) ? KeyedSeq(e).map(J).toMap() : e;
  }
  function ee(e) {
    return e && (e.constructor === Object || void 0 === e.constructor);
  }
  function te(e, t) {
    if (e === t || e != e && t != t)
      return !0;
    if (!e || !t)
      return !1;
    if ('function' == typeof e.valueOf && 'function' == typeof t.valueOf) {
      if ((e = e.valueOf()) === (t = t.valueOf()) || e != e && t != t)
        return !0;
      if (!e || !t)
        return !1;
    }
    return !('function' != typeof e.equals || 'function' != typeof t.equals || !e.equals(t));
  }
  function ne(e, t) {
    if (e === t)
      return !0;
    if (!n(t) || void 0 !== e.size && void 0 !== t.size && e.size !== t.size || void 0 !== e.__hash && void 0 !== t.__hash && e.__hash !== t.__hash || r(e) !== r(t) || o(e) !== o(t) || i(e) !== i(t))
      return !1;
    if (0 === e.size && 0 === t.size)
      return !0;
    var l = !a(e);
    if (i(e)) {
      var s = e.entries();
      return t.every(function (e, t) {
        var n = s.next().value;
        return n && te(n[1], e) && (l || te(n[0], t));
      }) && s.next().done;
    }
    var c = !1;
    if (void 0 === e.size)
      if (void 0 === t.size)
        'function' == typeof e.cacheResult && e.cacheResult();
      else {
        c = !0;
        var u = e;
        e = t, t = u;
      }
    var f = !0, d = t.__iterate(function (t, n) {
        if (l ? !e.has(t) : c ? !te(t, e.get(n, g)) : !te(e.get(n, g), t))
          return f = !1, !1;
      });
    return f && e.size === d;
  }
  function Repeat(e, t) {
    if (!(this instanceof Repeat))
      return new Repeat(e, t);
    if (this._value = e, this.size = void 0 === t ? 1 / 0 : Math.max(0, t), 0 === this.size) {
      if (F)
        return F;
      F = this;
    }
  }
  function re(e, t) {
    if (!e)
      throw new Error(t);
  }
  function Range(e, t, n) {
    if (!(this instanceof Range))
      return new Range(e, t, n);
    if (re(0 !== n, 'Cannot step a Range by 0'), e = e || 0, void 0 === t && (t = 1 / 0), n = void 0 === n ? 1 : Math.abs(n), t < e && (n = -n), this._start = e, this._end = t, this._step = n, this.size = Math.max(0, Math.ceil((t - e) / n - 1) + 1), 0 === this.size) {
      if (H)
        return H;
      H = this;
    }
  }
  function Collection() {
    throw TypeError('Abstract');
  }
  function KeyedCollection() {
  }
  function IndexedCollection() {
  }
  function SetCollection() {
  }
  Seq.prototype[U] = !0, t(ArraySeq, IndexedSeq), ArraySeq.prototype.get = function (e, t) {
    return this.has(e) ? this._array[C(this, e)] : t;
  }, ArraySeq.prototype.__iterate = function (e, t) {
    for (var n = this._array, r = n.length - 1, o = 0; o <= r; o++)
      if (!1 === e(n[t ? r - o : o], o, this))
        return o + 1;
    return o;
  }, ArraySeq.prototype.__iterator = function (e, t) {
    var n = this._array, r = n.length - 1, o = 0;
    return new Iterator(function () {
      return o > r ? P() : T(e, o, n[t ? r - o++ : o++]);
    });
  }, t(ObjectSeq, KeyedSeq), ObjectSeq.prototype.get = function (e, t) {
    return void 0 === t || this.has(e) ? this._object[e] : t;
  }, ObjectSeq.prototype.has = function (e) {
    return this._object.hasOwnProperty(e);
  }, ObjectSeq.prototype.__iterate = function (e, t) {
    for (var n = this._object, r = this._keys, o = r.length - 1, a = 0; a <= o; a++) {
      var i = r[t ? o - a : a];
      if (!1 === e(n[i], i, this))
        return a + 1;
    }
    return a;
  }, ObjectSeq.prototype.__iterator = function (e, t) {
    var n = this._object, r = this._keys, o = r.length - 1, a = 0;
    return new Iterator(function () {
      var i = r[t ? o - a : a];
      return a++ > o ? P() : T(e, i, n[i]);
    });
  }, ObjectSeq.prototype[u] = !0, t(IterableSeq, IndexedSeq), IterableSeq.prototype.__iterateUncached = function (e, t) {
    if (t)
      return this.cacheResult().__iterate(e, t);
    var n = N(this._iterable), r = 0;
    if (R(n))
      for (var o; !(o = n.next()).done && !1 !== e(o.value, r++, this););
    return r;
  }, IterableSeq.prototype.__iteratorUncached = function (e, t) {
    if (t)
      return this.cacheResult().__iterator(e, t);
    var n = N(this._iterable);
    if (!R(n))
      return new Iterator(P);
    var r = 0;
    return new Iterator(function () {
      var t = n.next();
      return t.done ? t : T(e, r++, t.value);
    });
  }, t(IteratorSeq, IndexedSeq), IteratorSeq.prototype.__iterateUncached = function (e, t) {
    if (t)
      return this.cacheResult().__iterate(e, t);
    for (var n, r = this._iterator, o = this._iteratorCache, a = 0; a < o.length;)
      if (!1 === e(o[a], a++, this))
        return a;
    for (; !(n = r.next()).done;) {
      var i = n.value;
      if (o[a] = i, !1 === e(i, a++, this))
        break;
    }
    return a;
  }, IteratorSeq.prototype.__iteratorUncached = function (e, t) {
    if (t)
      return this.cacheResult().__iterator(e, t);
    var n = this._iterator, r = this._iteratorCache, o = 0;
    return new Iterator(function () {
      if (o >= r.length) {
        var t = n.next();
        if (t.done)
          return t;
        r[o] = t.value;
      }
      return T(e, o, r[o++]);
    });
  }, t(Repeat, IndexedSeq), Repeat.prototype.toString = function () {
    return 0 === this.size ? 'Repeat []' : 'Repeat [ ' + this._value + ' ' + this.size + ' times ]';
  }, Repeat.prototype.get = function (e, t) {
    return this.has(e) ? this._value : t;
  }, Repeat.prototype.includes = function (e) {
    return te(this._value, e);
  }, Repeat.prototype.slice = function (e, t) {
    var n = this.size;
    return x(e, t, n) ? this : new Repeat(this._value, _(t, n) - E(e, n));
  }, Repeat.prototype.reverse = function () {
    return this;
  }, Repeat.prototype.indexOf = function (e) {
    return te(this._value, e) ? 0 : -1;
  }, Repeat.prototype.lastIndexOf = function (e) {
    return te(this._value, e) ? this.size : -1;
  }, Repeat.prototype.__iterate = function (e, t) {
    for (var n = 0; n < this.size; n++)
      if (!1 === e(this._value, n, this))
        return n + 1;
    return n;
  }, Repeat.prototype.__iterator = function (e, t) {
    var n = this, r = 0;
    return new Iterator(function () {
      return r < n.size ? T(e, r++, n._value) : P();
    });
  }, Repeat.prototype.equals = function (e) {
    return e instanceof Repeat ? te(this._value, e._value) : ne(e);
  }, t(Range, IndexedSeq), Range.prototype.toString = function () {
    return 0 === this.size ? 'Range []' : 'Range [ ' + this._start + '...' + this._end + (this._step > 1 ? ' by ' + this._step : '') + ' ]';
  }, Range.prototype.get = function (e, t) {
    return this.has(e) ? this._start + C(this, e) * this._step : t;
  }, Range.prototype.includes = function (e) {
    var t = (e - this._start) / this._step;
    return t >= 0 && t < this.size && t === Math.floor(t);
  }, Range.prototype.slice = function (e, t) {
    return x(e, t, this.size) ? this : (e = E(e, this.size), (t = _(t, this.size)) <= e ? new Range(0, 0) : new Range(this.get(e, this._end), this.get(t, this._end), this._step));
  }, Range.prototype.indexOf = function (e) {
    var t = e - this._start;
    if (t % this._step == 0) {
      var n = t / this._step;
      if (n >= 0 && n < this.size)
        return n;
    }
    return -1;
  }, Range.prototype.lastIndexOf = function (e) {
    return this.indexOf(e);
  }, Range.prototype.__iterate = function (e, t) {
    for (var n = this.size - 1, r = this._step, o = t ? this._start + n * r : this._start, a = 0; a <= n; a++) {
      if (!1 === e(o, a, this))
        return a + 1;
      o += t ? -r : r;
    }
    return a;
  }, Range.prototype.__iterator = function (e, t) {
    var n = this.size - 1, r = this._step, o = t ? this._start + n * r : this._start, a = 0;
    return new Iterator(function () {
      var i = o;
      return o += t ? -r : r, a > n ? P() : T(e, a++, i);
    });
  }, Range.prototype.equals = function (e) {
    return e instanceof Range ? this._start === e._start && this._end === e._end && this._step === e._step : ne(this, e);
  }, t(Collection, Iterable), t(KeyedCollection, Collection), t(IndexedCollection, Collection), t(SetCollection, Collection), Collection.Keyed = KeyedCollection, Collection.Indexed = IndexedCollection, Collection.Set = SetCollection;
  var oe = 'function' == typeof Math.imul && -2 === Math.imul(4294967295, 2) ? Math.imul : function (e, t) {
    var n = 65535 & (e |= 0), r = 65535 & (t |= 0);
    return n * r + ((e >>> 16) * r + n * (t >>> 16) << 16 >>> 0) | 0;
  };
  function ae(e) {
    return e >>> 1 & 1073741824 | 3221225471 & e;
  }
  function ie(e) {
    if (!1 === e || null == e)
      return 0;
    if ('function' == typeof e.valueOf && (!1 === (e = e.valueOf()) || null == e))
      return 0;
    if (!0 === e)
      return 1;
    var t = typeof e;
    if ('number' === t) {
      var n = 0 | e;
      for (n !== e && (n ^= 4294967295 * e); e > 4294967295;)
        n ^= e /= 4294967295;
      return ae(n);
    }
    if ('string' === t)
      return e.length > be ? le(e) : se(e);
    if ('function' == typeof e.hashCode)
      return e.hashCode();
    if ('object' === t)
      return ce(e);
    if ('function' == typeof e.toString)
      return se(e.toString());
    throw new Error('Value type ' + t + ' cannot be hashed.');
  }
  function le(e) {
    var t = we[e];
    return void 0 === t && (t = se(e), ye === ve && (ye = 0, we = {}), ye++, we[e] = t), t;
  }
  function se(e) {
    for (var t = 0, n = 0; n < e.length; n++)
      t = 31 * t + e.charCodeAt(n) | 0;
    return ae(t);
  }
  function ce(e) {
    var t;
    if (he && void 0 !== (t = pe.get(e)))
      return t;
    if (void 0 !== (t = e[me]))
      return t;
    if (!fe) {
      if (void 0 !== (t = e.propertyIsEnumerable && e.propertyIsEnumerable[me]))
        return t;
      if (void 0 !== (t = de(e)))
        return t;
    }
    if (t = ++ge, 1073741824 & ge && (ge = 0), he)
      pe.set(e, t);
    else {
      if (void 0 !== ue && !1 === ue(e))
        throw new Error('Non-extensible objects are not allowed as keys.');
      if (fe)
        Object.defineProperty(e, me, {
          enumerable: !1,
          configurable: !1,
          writable: !1,
          value: t
        });
      else if (void 0 !== e.propertyIsEnumerable && e.propertyIsEnumerable === e.constructor.prototype.propertyIsEnumerable)
        e.propertyIsEnumerable = function () {
          return this.constructor.prototype.propertyIsEnumerable.apply(this, arguments);
        }, e.propertyIsEnumerable[me] = t;
      else {
        if (void 0 === e.nodeType)
          throw new Error('Unable to set a non-enumerable property on object.');
        e[me] = t;
      }
    }
    return t;
  }
  var ue = Object.isExtensible, fe = function () {
      try {
        return Object.defineProperty({}, '@', {}), !0;
      } catch (e) {
        return !1;
      }
    }();
  function de(e) {
    if (e && e.nodeType > 0)
      switch (e.nodeType) {
      case 1:
        return e.uniqueID;
      case 9:
        return e.documentElement && e.documentElement.uniqueID;
      }
  }
  var pe, he = 'function' == typeof WeakMap;
  he && (pe = new WeakMap());
  var ge = 0, me = '__immutablehash__';
  'function' == typeof Symbol && (me = Symbol(me));
  var be = 16, ve = 255, ye = 0, we = {};
  function xe(e) {
    re(e !== 1 / 0, 'Cannot perform this action with an infinite size.');
  }
  function Map(e) {
    return null == e ? Ue() : _e(e) && !i(e) ? e : Ue().withMutations(function (t) {
      var n = KeyedIterable(e);
      xe(n.size), n.forEach(function (e, n) {
        return t.set(n, e);
      });
    });
  }
  function _e(e) {
    return !(!e || !e[ke]);
  }
  t(Map, KeyedCollection), Map.prototype.toString = function () {
    return this.__toString('Map {', '}');
  }, Map.prototype.get = function (e, t) {
    return this._root ? this._root.get(0, void 0, e, t) : t;
  }, Map.prototype.set = function (e, t) {
    return qe(this, e, t);
  }, Map.prototype.setIn = function (e, t) {
    return this.updateIn(e, g, function () {
      return t;
    });
  }, Map.prototype.remove = function (e) {
    return qe(this, e, g);
  }, Map.prototype.deleteIn = function (e) {
    return this.updateIn(e, function () {
      return g;
    });
  }, Map.prototype.update = function (e, t, n) {
    return 1 === arguments.length ? e(this) : this.updateIn([e], t, n);
  }, Map.prototype.updateIn = function (e, t, n) {
    n || (n = t, t = void 0);
    var r = st(this, ln(e), t, n);
    return r === g ? void 0 : r;
  }, Map.prototype.clear = function () {
    return 0 === this.size ? this : this.__ownerID ? (this.size = 0, this._root = null, this.__hash = void 0, this.__altered = !0, this) : Ue();
  }, Map.prototype.merge = function () {
    return ot(this, void 0, arguments);
  }, Map.prototype.mergeWith = function (t) {
    return ot(this, t, e.call(arguments, 1));
  }, Map.prototype.mergeIn = function (t) {
    var n = e.call(arguments, 1);
    return this.updateIn(t, Ue(), function (e) {
      return 'function' == typeof e.merge ? e.merge.apply(e, n) : n[n.length - 1];
    });
  }, Map.prototype.mergeDeep = function () {
    return ot(this, at, arguments);
  }, Map.prototype.mergeDeepWith = function (t) {
    var n = e.call(arguments, 1);
    return ot(this, it(t), n);
  }, Map.prototype.mergeDeepIn = function (t) {
    var n = e.call(arguments, 1);
    return this.updateIn(t, Ue(), function (e) {
      return 'function' == typeof e.mergeDeep ? e.mergeDeep.apply(e, n) : n[n.length - 1];
    });
  }, Map.prototype.sort = function (e) {
    return OrderedMap(Yt(this, e));
  }, Map.prototype.sortBy = function (e, t) {
    return OrderedMap(Yt(this, t, e));
  }, Map.prototype.withMutations = function (e) {
    var t = this.asMutable();
    return e(t), t.wasAltered() ? t.__ensureOwner(this.__ownerID) : this;
  }, Map.prototype.asMutable = function () {
    return this.__ownerID ? this : this.__ensureOwner(new OwnerID());
  }, Map.prototype.asImmutable = function () {
    return this.__ensureOwner();
  }, Map.prototype.wasAltered = function () {
    return this.__altered;
  }, Map.prototype.__iterator = function (e, t) {
    return new MapIterator(this, e, t);
  }, Map.prototype.__iterate = function (e, t) {
    var n = this, r = 0;
    return this._root && this._root.iterate(function (t) {
      return r++, e(t[1], t[0], n);
    }, t), r;
  }, Map.prototype.__ensureOwner = function (e) {
    return e === this.__ownerID ? this : e ? Fe(this.size, this._root, e, this.__hash) : (this.__ownerID = e, this.__altered = !1, this);
  }, Map.isMap = _e;
  var Se, ke = '@@__IMMUTABLE_MAP__@@', je = Map.prototype;
  function ArrayMapNode(e, t) {
    this.ownerID = e, this.entries = t;
  }
  function BitmapIndexedNode(e, t, n) {
    this.ownerID = e, this.bitmap = t, this.nodes = n;
  }
  function HashArrayMapNode(e, t, n) {
    this.ownerID = e, this.count = t, this.nodes = n;
  }
  function HashCollisionNode(e, t, n) {
    this.ownerID = e, this.keyHash = t, this.entries = n;
  }
  function ValueNode(e, t, n) {
    this.ownerID = e, this.keyHash = t, this.entry = n;
  }
  function MapIterator(e, t, n) {
    this._type = t, this._reverse = n, this._stack = e._root && ze(e._root);
  }
  function Re(e, t) {
    return T(e, t[0], t[1]);
  }
  function ze(e, t) {
    return {
      node: e,
      index: 0,
      __prev: t
    };
  }
  function Fe(e, t, n, r) {
    var o = Object.create(je);
    return o.size = e, o._root = t, o.__ownerID = n, o.__hash = r, o.__altered = !1, o;
  }
  function Ue() {
    return Se || (Se = Fe(0));
  }
  function qe(e, t, n) {
    var r, o;
    if (e._root) {
      var a = MakeRef(m), i = MakeRef(b);
      if (r = $e(e._root, e.__ownerID, 0, void 0, t, n, a, i), !i.value)
        return e;
      o = e.size + (a.value ? n === g ? -1 : 1 : 0);
    } else {
      if (n === g)
        return e;
      o = 1, r = new ArrayMapNode(e.__ownerID, [[
          t,
          n
        ]]);
    }
    return e.__ownerID ? (e.size = o, e._root = r, e.__hash = void 0, e.__altered = !0, e) : r ? Fe(o, r) : Ue();
  }
  function $e(e, t, n, r, o, a, i, l) {
    return e ? e.update(t, n, r, o, a, i, l) : a === g ? e : (SetRef(l), SetRef(i), new ValueNode(t, r, [
      o,
      a
    ]));
  }
  function Xe(e) {
    return e.constructor === ValueNode || e.constructor === HashCollisionNode;
  }
  function et(e, t, n, r, o) {
    if (e.keyHash === r)
      return new HashCollisionNode(t, r, [
        e.entry,
        o
      ]);
    var a, i = (0 === n ? e.keyHash : e.keyHash >>> n) & h, l = (0 === n ? r : r >>> n) & h;
    return new BitmapIndexedNode(t, 1 << i | 1 << l, i === l ? [et(e, t, n + d, r, o)] : (a = new ValueNode(t, r, o), i < l ? [
      e,
      a
    ] : [
      a,
      e
    ]));
  }
  function tt(e, t, n, r) {
    e || (e = new OwnerID());
    for (var o = new ValueNode(e, ie(n), [
          n,
          r
        ]), a = 0; a < t.length; a++) {
      var i = t[a];
      o = o.update(e, 0, void 0, i[0], i[1]);
    }
    return o;
  }
  function nt(e, t, n, r) {
    for (var o = 0, a = 0, i = new Array(n), l = 0, s = 1, c = t.length; l < c; l++, s <<= 1) {
      var u = t[l];
      void 0 !== u && l !== r && (o |= s, i[a++] = u);
    }
    return new BitmapIndexedNode(e, o, i);
  }
  function rt(e, t, n, r, o) {
    for (var a = 0, i = new Array(p), l = 0; 0 !== n; l++, n >>>= 1)
      i[l] = 1 & n ? t[a++] : void 0;
    return i[r] = o, new HashArrayMapNode(e, a + 1, i);
  }
  function ot(e, t, r) {
    for (var o = [], a = 0; a < r.length; a++) {
      var i = r[a], l = KeyedIterable(i);
      n(i) || (l = l.map(function (e) {
        return $(e);
      })), o.push(l);
    }
    return lt(e, t, o);
  }
  function at(e, t, r) {
    return e && e.mergeDeep && n(t) ? e.mergeDeep(t) : te(e, t) ? e : t;
  }
  function it(e) {
    return function (t, r, o) {
      if (t && t.mergeDeepWith && n(r))
        return t.mergeDeepWith(e, r);
      var a = e(t, r, o);
      return te(t, a) ? t : a;
    };
  }
  function lt(e, t, n) {
    return 0 === (n = n.filter(function (e) {
      return 0 !== e.size;
    })).length ? e : 0 !== e.size || e.__ownerID || 1 !== n.length ? e.withMutations(function (e) {
      for (var r = t ? function (n, r) {
            e.update(r, g, function (e) {
              return e === g ? n : t(e, n, r);
            });
          } : function (t, n) {
            e.set(n, t);
          }, o = 0; o < n.length; o++)
        n[o].forEach(r);
    }) : e.constructor(n[0]);
  }
  function st(e, t, n, r) {
    var o = e === g, a = t.next();
    if (a.done) {
      var i = o ? n : e, l = r(i);
      return l === i ? e : l;
    }
    re(o || e && e.set, 'invalid keyPath');
    var s = a.value, c = o ? g : e.get(s, g), u = st(c, t, n, r);
    return u === c ? e : u === g ? e.remove(s) : (o ? Ue() : e).set(s, u);
  }
  function ct(e) {
    return e = (e = (858993459 & (e -= e >> 1 & 1431655765)) + (e >> 2 & 858993459)) + (e >> 4) & 252645135, e += e >> 8, 127 & (e += e >> 16);
  }
  function ut(e, t, n, r) {
    var o = r ? e : v(e);
    return o[t] = n, o;
  }
  function ft(e, t, n, r) {
    var o = e.length + 1;
    if (r && t + 1 === o)
      return e[t] = n, e;
    for (var a = new Array(o), i = 0, l = 0; l < o; l++)
      l === t ? (a[l] = n, i = -1) : a[l] = e[l + i];
    return a;
  }
  function dt(e, t, n) {
    var r = e.length - 1;
    if (n && t === r)
      return e.pop(), e;
    for (var o = new Array(r), a = 0, i = 0; i < r; i++)
      i === t && (a = 1), o[i] = e[i + a];
    return o;
  }
  je[ke] = !0, je[f] = je.remove, je.removeIn = je.deleteIn, ArrayMapNode.prototype.get = function (e, t, n, r) {
    for (var o = this.entries, a = 0, i = o.length; a < i; a++)
      if (te(n, o[a][0]))
        return o[a][1];
    return r;
  }, ArrayMapNode.prototype.update = function (e, t, n, r, o, a, i) {
    for (var l = o === g, s = this.entries, c = 0, u = s.length; c < u && !te(r, s[c][0]); c++);
    var f = c < u;
    if (f ? s[c][1] === o : l)
      return this;
    if (SetRef(i), (l || !f) && SetRef(a), !l || 1 !== s.length) {
      if (!f && !l && s.length >= pt)
        return tt(e, s, r, o);
      var d = e && e === this.ownerID, p = d ? s : v(s);
      return f ? l ? c === u - 1 ? p.pop() : p[c] = p.pop() : p[c] = [
        r,
        o
      ] : p.push([
        r,
        o
      ]), d ? (this.entries = p, this) : new ArrayMapNode(e, p);
    }
  }, BitmapIndexedNode.prototype.get = function (e, t, n, r) {
    void 0 === t && (t = ie(n));
    var o = 1 << ((0 === e ? t : t >>> e) & h), a = this.bitmap;
    return 0 == (a & o) ? r : this.nodes[ct(a & o - 1)].get(e + d, t, n, r);
  }, BitmapIndexedNode.prototype.update = function (e, t, n, r, o, a, i) {
    void 0 === n && (n = ie(r));
    var l = (0 === t ? n : n >>> t) & h, s = 1 << l, c = this.bitmap, u = 0 != (c & s);
    if (!u && o === g)
      return this;
    var f = ct(c & s - 1), p = this.nodes, m = u ? p[f] : void 0, b = $e(m, e, t + d, n, r, o, a, i);
    if (b === m)
      return this;
    if (!u && b && p.length >= ht)
      return rt(e, p, c, l, b);
    if (u && !b && 2 === p.length && Xe(p[1 ^ f]))
      return p[1 ^ f];
    if (u && b && 1 === p.length && Xe(b))
      return b;
    var v = e && e === this.ownerID, y = u ? b ? c : c ^ s : c | s, C = u ? b ? ut(p, f, b, v) : dt(p, f, v) : ft(p, f, b, v);
    return v ? (this.bitmap = y, this.nodes = C, this) : new BitmapIndexedNode(e, y, C);
  }, HashArrayMapNode.prototype.get = function (e, t, n, r) {
    void 0 === t && (t = ie(n));
    var o = (0 === e ? t : t >>> e) & h, a = this.nodes[o];
    return a ? a.get(e + d, t, n, r) : r;
  }, HashArrayMapNode.prototype.update = function (e, t, n, r, o, a, i) {
    void 0 === n && (n = ie(r));
    var l = (0 === t ? n : n >>> t) & h, s = o === g, c = this.nodes, u = c[l];
    if (s && !u)
      return this;
    var f = $e(u, e, t + d, n, r, o, a, i);
    if (f === u)
      return this;
    var p = this.count;
    if (u) {
      if (!f && --p < gt)
        return nt(e, c, p, l);
    } else
      p++;
    var m = e && e === this.ownerID, b = ut(c, l, f, m);
    return m ? (this.count = p, this.nodes = b, this) : new HashArrayMapNode(e, p, b);
  }, HashCollisionNode.prototype.get = function (e, t, n, r) {
    for (var o = this.entries, a = 0, i = o.length; a < i; a++)
      if (te(n, o[a][0]))
        return o[a][1];
    return r;
  }, HashCollisionNode.prototype.update = function (e, t, n, r, o, a, i) {
    void 0 === n && (n = ie(r));
    var l = o === g;
    if (n !== this.keyHash)
      return l ? this : (SetRef(i), SetRef(a), et(this, e, t, n, [
        r,
        o
      ]));
    for (var s = this.entries, c = 0, u = s.length; c < u && !te(r, s[c][0]); c++);
    var f = c < u;
    if (f ? s[c][1] === o : l)
      return this;
    if (SetRef(i), (l || !f) && SetRef(a), l && 2 === u)
      return new ValueNode(e, this.keyHash, s[1 ^ c]);
    var d = e && e === this.ownerID, p = d ? s : v(s);
    return f ? l ? c === u - 1 ? p.pop() : p[c] = p.pop() : p[c] = [
      r,
      o
    ] : p.push([
      r,
      o
    ]), d ? (this.entries = p, this) : new HashCollisionNode(e, this.keyHash, p);
  }, ValueNode.prototype.get = function (e, t, n, r) {
    return te(n, this.entry[0]) ? this.entry[1] : r;
  }, ValueNode.prototype.update = function (e, t, n, r, o, a, i) {
    var l = o === g, s = te(r, this.entry[0]);
    return (s ? o === this.entry[1] : l) ? this : (SetRef(i), l ? void SetRef(a) : s ? e && e === this.ownerID ? (this.entry[1] = o, this) : new ValueNode(e, this.keyHash, [
      r,
      o
    ]) : (SetRef(a), et(this, e, t, ie(r), [
      r,
      o
    ])));
  }, ArrayMapNode.prototype.iterate = HashCollisionNode.prototype.iterate = function (e, t) {
    for (var n = this.entries, r = 0, o = n.length - 1; r <= o; r++)
      if (!1 === e(n[t ? o - r : r]))
        return !1;
  }, BitmapIndexedNode.prototype.iterate = HashArrayMapNode.prototype.iterate = function (e, t) {
    for (var n = this.nodes, r = 0, o = n.length - 1; r <= o; r++) {
      var a = n[t ? o - r : r];
      if (a && !1 === a.iterate(e, t))
        return !1;
    }
  }, ValueNode.prototype.iterate = function (e, t) {
    return e(this.entry);
  }, t(MapIterator, Iterator), MapIterator.prototype.next = function () {
    for (var e = this._type, t = this._stack; t;) {
      var n, r = t.node, o = t.index++;
      if (r.entry) {
        if (0 === o)
          return Re(e, r.entry);
      } else if (r.entries) {
        if (o <= (n = r.entries.length - 1))
          return Re(e, r.entries[this._reverse ? n - o : o]);
      } else if (o <= (n = r.nodes.length - 1)) {
        var a = r.nodes[this._reverse ? n - o : o];
        if (a) {
          if (a.entry)
            return Re(e, a.entry);
          t = this._stack = ze(a, t);
        }
        continue;
      }
      t = this._stack = this._stack.__prev;
    }
    return P();
  };
  var pt = p / 4, ht = p / 2, gt = p / 4;
  function List(e) {
    var t = _t();
    if (null == e)
      return t;
    if (mt(e))
      return e;
    var n = IndexedIterable(e), r = n.size;
    return 0 === r ? t : (xe(r), r > 0 && r < p ? Et(0, r, d, null, new VNode(n.toArray())) : t.withMutations(function (e) {
      e.setSize(r), n.forEach(function (t, n) {
        return e.set(n, t);
      });
    }));
  }
  function mt(e) {
    return !(!e || !e[bt]);
  }
  t(List, IndexedCollection), List.of = function () {
    return this(arguments);
  }, List.prototype.toString = function () {
    return this.__toString('List [', ']');
  }, List.prototype.get = function (e, t) {
    if ((e = C(this, e)) >= 0 && e < this.size) {
      var n = At(this, e += this._origin);
      return n && n.array[e & h];
    }
    return t;
  }, List.prototype.set = function (e, t) {
    return Ot(this, e, t);
  }, List.prototype.remove = function (e) {
    return this.has(e) ? 0 === e ? this.shift() : e === this.size - 1 ? this.pop() : this.splice(e, 1) : this;
  }, List.prototype.insert = function (e, t) {
    return this.splice(e, 0, t);
  }, List.prototype.clear = function () {
    return 0 === this.size ? this : this.__ownerID ? (this.size = this._origin = this._capacity = 0, this._level = d, this._root = this._tail = null, this.__hash = void 0, this.__altered = !0, this) : _t();
  }, List.prototype.push = function () {
    var e = arguments, t = this.size;
    return this.withMutations(function (n) {
      jt(n, 0, t + e.length);
      for (var r = 0; r < e.length; r++)
        n.set(t + r, e[r]);
    });
  }, List.prototype.pop = function () {
    return jt(this, 0, -1);
  }, List.prototype.unshift = function () {
    var e = arguments;
    return this.withMutations(function (t) {
      jt(t, -e.length);
      for (var n = 0; n < e.length; n++)
        t.set(n, e[n]);
    });
  }, List.prototype.shift = function () {
    return jt(this, 1);
  }, List.prototype.merge = function () {
    return Mt(this, void 0, arguments);
  }, List.prototype.mergeWith = function (t) {
    return Mt(this, t, e.call(arguments, 1));
  }, List.prototype.mergeDeep = function () {
    return Mt(this, at, arguments);
  }, List.prototype.mergeDeepWith = function (t) {
    var n = e.call(arguments, 1);
    return Mt(this, it(t), n);
  }, List.prototype.setSize = function (e) {
    return jt(this, 0, e);
  }, List.prototype.slice = function (e, t) {
    var n = this.size;
    return x(e, t, n) ? this : jt(this, E(e, n), _(t, n));
  }, List.prototype.__iterator = function (e, t) {
    var n = 0, r = xt(this, t);
    return new Iterator(function () {
      var t = r();
      return t === wt ? P() : T(e, n++, t);
    });
  }, List.prototype.__iterate = function (e, t) {
    for (var n, r = 0, o = xt(this, t); (n = o()) !== wt && !1 !== e(n, r++, this););
    return r;
  }, List.prototype.__ensureOwner = function (e) {
    return e === this.__ownerID ? this : e ? Et(this._origin, this._capacity, this._level, this._root, this._tail, e, this.__hash) : (this.__ownerID = e, this);
  }, List.isList = mt;
  var bt = '@@__IMMUTABLE_LIST__@@', vt = List.prototype;
  function VNode(e, t) {
    this.array = e, this.ownerID = t;
  }
  vt[bt] = !0, vt[f] = vt.remove, vt.setIn = je.setIn, vt.deleteIn = vt.removeIn = je.removeIn, vt.update = je.update, vt.updateIn = je.updateIn, vt.mergeIn = je.mergeIn, vt.mergeDeepIn = je.mergeDeepIn, vt.withMutations = je.withMutations, vt.asMutable = je.asMutable, vt.asImmutable = je.asImmutable, vt.wasAltered = je.wasAltered, VNode.prototype.removeBefore = function (e, t, n) {
    if (n === t ? 1 << t : 0 === this.array.length)
      return this;
    var r = n >>> t & h;
    if (r >= this.array.length)
      return new VNode([], e);
    var o, a = 0 === r;
    if (t > 0) {
      var i = this.array[r];
      if ((o = i && i.removeBefore(e, t - d, n)) === i && a)
        return this;
    }
    if (a && !o)
      return this;
    var l = kt(this, e);
    if (!a)
      for (var s = 0; s < r; s++)
        l.array[s] = void 0;
    return o && (l.array[r] = o), l;
  }, VNode.prototype.removeAfter = function (e, t, n) {
    if (n === (t ? 1 << t : 0) || 0 === this.array.length)
      return this;
    var r, o = n - 1 >>> t & h;
    if (o >= this.array.length)
      return this;
    if (t > 0) {
      var a = this.array[o];
      if ((r = a && a.removeAfter(e, t - d, n)) === a && o === this.array.length - 1)
        return this;
    }
    var i = kt(this, e);
    return i.array.splice(o + 1), r && (i.array[o] = r), i;
  };
  var yt, Ct, wt = {};
  function xt(e, t) {
    var n = e._origin, r = e._capacity, o = It(r), a = e._tail;
    return i(e._root, e._level, 0);
    function i(e, t, n) {
      return 0 === t ? l(e, n) : s(e, t, n);
    }
    function l(e, i) {
      var l = i === o ? a && a.array : e && e.array, s = i > n ? 0 : n - i, c = r - i;
      return c > p && (c = p), function () {
        if (s === c)
          return wt;
        var e = t ? --c : s++;
        return l && l[e];
      };
    }
    function s(e, o, a) {
      var l, s = e && e.array, c = a > n ? 0 : n - a >> o, u = 1 + (r - a >> o);
      return u > p && (u = p), function () {
        for (;;) {
          if (l) {
            var e = l();
            if (e !== wt)
              return e;
            l = null;
          }
          if (c === u)
            return wt;
          var n = t ? --u : c++;
          l = i(s && s[n], o - d, a + (n << o));
        }
      };
    }
  }
  function Et(e, t, n, r, o, a, i) {
    var l = Object.create(vt);
    return l.size = t - e, l._origin = e, l._capacity = t, l._level = n, l._root = r, l._tail = o, l.__ownerID = a, l.__hash = i, l.__altered = !1, l;
  }
  function _t() {
    return yt || (yt = Et(0, 0, d));
  }
  function Ot(e, t, n) {
    if ((t = C(e, t)) != t)
      return e;
    if (t >= e.size || t < 0)
      return e.withMutations(function (e) {
        t < 0 ? jt(e, t).set(0, n) : jt(e, 0, t + 1).set(t, n);
      });
    t += e._origin;
    var r = e._tail, o = e._root, a = MakeRef(b);
    return t >= It(e._capacity) ? r = St(r, e.__ownerID, 0, t, n, a) : o = St(o, e.__ownerID, e._level, t, n, a), a.value ? e.__ownerID ? (e._root = o, e._tail = r, e.__hash = void 0, e.__altered = !0, e) : Et(e._origin, e._capacity, e._level, o, r) : e;
  }
  function St(e, t, n, r, o, a) {
    var i, l = r >>> n & h, s = e && l < e.array.length;
    if (!s && void 0 === o)
      return e;
    if (n > 0) {
      var c = e && e.array[l], u = St(c, t, n - d, r, o, a);
      return u === c ? e : ((i = kt(e, t)).array[l] = u, i);
    }
    return s && e.array[l] === o ? e : (SetRef(a), i = kt(e, t), void 0 === o && l === i.array.length - 1 ? i.array.pop() : i.array[l] = o, i);
  }
  function kt(e, t) {
    return t && e && t === e.ownerID ? e : new VNode(e ? e.array.slice() : [], t);
  }
  function At(e, t) {
    if (t >= It(e._capacity))
      return e._tail;
    if (t < 1 << e._level + d) {
      for (var n = e._root, r = e._level; n && r > 0;)
        n = n.array[t >>> r & h], r -= d;
      return n;
    }
  }
  function jt(e, t, n) {
    void 0 !== t && (t |= 0), void 0 !== n && (n |= 0);
    var r = e.__ownerID || new OwnerID(), o = e._origin, a = e._capacity, i = o + t, l = void 0 === n ? a : n < 0 ? a + n : o + n;
    if (i === o && l === a)
      return e;
    if (i >= l)
      return e.clear();
    for (var s = e._level, c = e._root, u = 0; i + u < 0;)
      c = new VNode(c && c.array.length ? [
        void 0,
        c
      ] : [], r), u += 1 << (s += d);
    u && (i += u, o += u, l += u, a += u);
    for (var f = It(a), p = It(l); p >= 1 << s + d;)
      c = new VNode(c && c.array.length ? [c] : [], r), s += d;
    var g = e._tail, m = p < f ? At(e, l - 1) : p > f ? new VNode([], r) : g;
    if (g && p > f && i < a && g.array.length) {
      for (var b = c = kt(c, r), v = s; v > d; v -= d) {
        var y = f >>> v & h;
        b = b.array[y] = kt(b.array[y], r);
      }
      b.array[f >>> d & h] = g;
    }
    if (l < a && (m = m && m.removeAfter(r, 0, l)), i >= p)
      i -= p, l -= p, s = d, c = null, m = m && m.removeBefore(r, 0, i);
    else if (i > o || p < f) {
      for (u = 0; c;) {
        var C = i >>> s & h;
        if (C !== p >>> s & h)
          break;
        C && (u += (1 << s) * C), s -= d, c = c.array[C];
      }
      c && i > o && (c = c.removeBefore(r, s, i - u)), c && p < f && (c = c.removeAfter(r, s, p - u)), u && (i -= u, l -= u);
    }
    return e.__ownerID ? (e.size = l - i, e._origin = i, e._capacity = l, e._level = s, e._root = c, e._tail = m, e.__hash = void 0, e.__altered = !0, e) : Et(i, l, s, c, m);
  }
  function Mt(e, t, r) {
    for (var o = [], a = 0, i = 0; i < r.length; i++) {
      var l = r[i], s = IndexedIterable(l);
      s.size > a && (a = s.size), n(l) || (s = s.map(function (e) {
        return $(e);
      })), o.push(s);
    }
    return a > e.size && (e = e.setSize(a)), lt(e, t, o);
  }
  function It(e) {
    return e < p ? 0 : e - 1 >>> d << d;
  }
  function OrderedMap(e) {
    return null == e ? Dt() : Tt(e) ? e : Dt().withMutations(function (t) {
      var n = KeyedIterable(e);
      xe(n.size), n.forEach(function (e, n) {
        return t.set(n, e);
      });
    });
  }
  function Tt(e) {
    return _e(e) && i(e);
  }
  function Pt(e, t, n, r) {
    var o = Object.create(OrderedMap.prototype);
    return o.size = e ? e.size : 0, o._map = e, o._list = t, o.__ownerID = n, o.__hash = r, o;
  }
  function Dt() {
    return Ct || (Ct = Pt(Ue(), _t()));
  }
  function Rt(e, t, n) {
    var r, o, a = e._map, i = e._list, l = a.get(t), s = void 0 !== l;
    if (n === g) {
      if (!s)
        return e;
      i.size >= p && i.size >= 2 * a.size ? (r = (o = i.filter(function (e, t) {
        return void 0 !== e && l !== t;
      })).toKeyedSeq().map(function (e) {
        return e[0];
      }).flip().toMap(), e.__ownerID && (r.__ownerID = o.__ownerID = e.__ownerID)) : (r = a.remove(t), o = l === i.size - 1 ? i.pop() : i.set(l, void 0));
    } else if (s) {
      if (n === i.get(l)[1])
        return e;
      r = a, o = i.set(l, [
        t,
        n
      ]);
    } else
      r = a.set(t, i.size), o = i.set(i.size, [
        t,
        n
      ]);
    return e.__ownerID ? (e.size = r.size, e._map = r, e._list = o, e.__hash = void 0, e) : Pt(r, o);
  }
  function ToKeyedSequence(e, t) {
    this._iter = e, this._useKeys = t, this.size = e.size;
  }
  function ToIndexedSequence(e) {
    this._iter = e, this.size = e.size;
  }
  function ToSetSequence(e) {
    this._iter = e, this.size = e.size;
  }
  function FromEntriesSequence(e) {
    this._iter = e, this.size = e.size;
  }
  function Nt(e) {
    var t = rn(e);
    return t._iter = e, t.size = e.size, t.flip = function () {
      return e;
    }, t.reverse = function () {
      var t = e.reverse.apply(this);
      return t.flip = function () {
        return e.reverse();
      }, t;
    }, t.has = function (t) {
      return e.includes(t);
    }, t.includes = function (t) {
      return e.has(t);
    }, t.cacheResult = on, t.__iterateUncached = function (t, n) {
      var r = this;
      return e.__iterate(function (e, n) {
        return !1 !== t(n, e, r);
      }, n);
    }, t.__iteratorUncached = function (t, n) {
      if (t === A) {
        var r = e.__iterator(t, n);
        return new Iterator(function () {
          var e = r.next();
          if (!e.done) {
            var t = e.value[0];
            e.value[0] = e.value[1], e.value[1] = t;
          }
          return e;
        });
      }
      return e.__iterator(t === k ? S : k, n);
    }, t;
  }
  function zt(e, t, n) {
    var r = rn(e);
    return r.size = e.size, r.has = function (t) {
      return e.has(t);
    }, r.get = function (r, o) {
      var a = e.get(r, g);
      return a === g ? o : t.call(n, a, r, e);
    }, r.__iterateUncached = function (r, o) {
      var a = this;
      return e.__iterate(function (e, o, i) {
        return !1 !== r(t.call(n, e, o, i), o, a);
      }, o);
    }, r.__iteratorUncached = function (r, o) {
      var a = e.__iterator(A, o);
      return new Iterator(function () {
        var o = a.next();
        if (o.done)
          return o;
        var i = o.value, l = i[0];
        return T(r, l, t.call(n, i[1], l, e), o);
      });
    }, r;
  }
  function Lt(e, t) {
    var n = rn(e);
    return n._iter = e, n.size = e.size, n.reverse = function () {
      return e;
    }, e.flip && (n.flip = function () {
      var t = Nt(e);
      return t.reverse = function () {
        return e.flip();
      }, t;
    }), n.get = function (n, r) {
      return e.get(t ? n : -1 - n, r);
    }, n.has = function (n) {
      return e.has(t ? n : -1 - n);
    }, n.includes = function (t) {
      return e.includes(t);
    }, n.cacheResult = on, n.__iterate = function (t, n) {
      var r = this;
      return e.__iterate(function (e, n) {
        return t(e, n, r);
      }, !n);
    }, n.__iterator = function (t, n) {
      return e.__iterator(t, !n);
    }, n;
  }
  function Bt(e, t, n, r) {
    var o = rn(e);
    return r && (o.has = function (r) {
      var o = e.get(r, g);
      return o !== g && !!t.call(n, o, r, e);
    }, o.get = function (r, o) {
      var a = e.get(r, g);
      return a !== g && t.call(n, a, r, e) ? a : o;
    }), o.__iterateUncached = function (o, a) {
      var i = this, l = 0;
      return e.__iterate(function (e, a, s) {
        if (t.call(n, e, a, s))
          return l++, o(e, r ? a : l - 1, i);
      }, a), l;
    }, o.__iteratorUncached = function (o, a) {
      var i = e.__iterator(A, a), l = 0;
      return new Iterator(function () {
        for (;;) {
          var a = i.next();
          if (a.done)
            return a;
          var s = a.value, c = s[0], u = s[1];
          if (t.call(n, u, c, e))
            return T(o, r ? c : l++, u, a);
        }
      });
    }, o;
  }
  function Ft(e, t, n) {
    var r = Map().asMutable();
    return e.__iterate(function (o, a) {
      r.update(t.call(n, o, a, e), 0, function (e) {
        return e + 1;
      });
    }), r.asImmutable();
  }
  function Ht(e, t, n) {
    var o = r(e), a = (i(e) ? OrderedMap() : Map()).asMutable();
    e.__iterate(function (r, i) {
      a.update(t.call(n, r, i, e), function (e) {
        return (e = e || []).push(o ? [
          i,
          r
        ] : r), e;
      });
    });
    var l = nn(e);
    return a.map(function (t) {
      return Jt(e, l(t));
    });
  }
  function Ut(e, t, n, r) {
    var o = e.size;
    if (void 0 !== t && (t |= 0), void 0 !== n && (n |= 0), x(t, n, o))
      return e;
    var a = E(t, o), i = _(n, o);
    if (a != a || i != i)
      return Ut(e.toSeq().cacheResult(), t, n, r);
    var l, s = i - a;
    s == s && (l = s < 0 ? 0 : s);
    var c = rn(e);
    return c.size = 0 === l ? l : e.size && l || void 0, !r && W(e) && l >= 0 && (c.get = function (t, n) {
      return (t = C(this, t)) >= 0 && t < l ? e.get(t + a, n) : n;
    }), c.__iterateUncached = function (t, n) {
      var o = this;
      if (0 === l)
        return 0;
      if (n)
        return this.cacheResult().__iterate(t, n);
      var i = 0, s = !0, c = 0;
      return e.__iterate(function (e, n) {
        if (!s || !(s = i++ < a))
          return c++, !1 !== t(e, r ? n : c - 1, o) && c !== l;
      }), c;
    }, c.__iteratorUncached = function (t, n) {
      if (0 !== l && n)
        return this.cacheResult().__iterator(t, n);
      var o = 0 !== l && e.__iterator(t, n), i = 0, s = 0;
      return new Iterator(function () {
        for (; i++ < a;)
          o.next();
        if (++s > l)
          return P();
        var e = o.next();
        return r || t === k ? e : T(t, s - 1, t === S ? void 0 : e.value[1], e);
      });
    }, c;
  }
  function Wt(e, t, n) {
    var r = rn(e);
    return r.__iterateUncached = function (r, o) {
      var a = this;
      if (o)
        return this.cacheResult().__iterate(r, o);
      var i = 0;
      return e.__iterate(function (e, o, l) {
        return t.call(n, e, o, l) && ++i && r(e, o, a);
      }), i;
    }, r.__iteratorUncached = function (r, o) {
      var a = this;
      if (o)
        return this.cacheResult().__iterator(r, o);
      var i = e.__iterator(A, o), l = !0;
      return new Iterator(function () {
        if (!l)
          return P();
        var e = i.next();
        if (e.done)
          return e;
        var o = e.value, s = o[0], c = o[1];
        return t.call(n, c, s, a) ? r === A ? e : T(r, s, c, e) : (l = !1, P());
      });
    }, r;
  }
  function Vt(e, t, n, r) {
    var o = rn(e);
    return o.__iterateUncached = function (o, a) {
      var i = this;
      if (a)
        return this.cacheResult().__iterate(o, a);
      var l = !0, s = 0;
      return e.__iterate(function (e, a, c) {
        if (!l || !(l = t.call(n, e, a, c)))
          return s++, o(e, r ? a : s - 1, i);
      }), s;
    }, o.__iteratorUncached = function (o, a) {
      var i = this;
      if (a)
        return this.cacheResult().__iterator(o, a);
      var l = e.__iterator(A, a), s = !0, c = 0;
      return new Iterator(function () {
        var e, a, u;
        do {
          if ((e = l.next()).done)
            return r || o === k ? e : T(o, c++, o === S ? void 0 : e.value[1], e);
          var f = e.value;
          a = f[0], u = f[1], s && (s = t.call(n, u, a, i));
        } while (s);
        return o === A ? e : T(o, a, u, e);
      });
    }, o;
  }
  function Kt(e, t) {
    var a = r(e), i = [e].concat(t).map(function (e) {
        return n(e) ? a && (e = KeyedIterable(e)) : e = a ? K(e) : q(Array.isArray(e) ? e : [e]), e;
      }).filter(function (e) {
        return 0 !== e.size;
      });
    if (0 === i.length)
      return e;
    if (1 === i.length) {
      var l = i[0];
      if (l === e || a && r(l) || o(e) && o(l))
        return l;
    }
    var s = new ArraySeq(i);
    return a ? s = s.toKeyedSeq() : o(e) || (s = s.toSetSeq()), (s = s.flatten(!0)).size = i.reduce(function (e, t) {
      if (void 0 !== e) {
        var n = t.size;
        if (void 0 !== n)
          return e + n;
      }
    }, 0), s;
  }
  function qt(e, t, r) {
    var o = rn(e);
    return o.__iterateUncached = function (o, a) {
      var i = 0, l = !1;
      function s(e, c) {
        var u = this;
        e.__iterate(function (e, a) {
          return (!t || c < t) && n(e) ? s(e, c + 1) : !1 === o(e, r ? a : i++, u) && (l = !0), !l;
        }, a);
      }
      return s(e, 0), i;
    }, o.__iteratorUncached = function (o, a) {
      var i = e.__iterator(o, a), l = [], s = 0;
      return new Iterator(function () {
        for (; i;) {
          var e = i.next();
          if (!1 === e.done) {
            var c = e.value;
            if (o === A && (c = c[1]), t && !(l.length < t) || !n(c))
              return r ? e : T(o, s++, c, e);
            l.push(i), i = c.__iterator(o, a);
          } else
            i = l.pop();
        }
        return P();
      });
    }, o;
  }
  function Gt(e, t, n) {
    var r = nn(e);
    return e.toSeq().map(function (o, a) {
      return r(t.call(n, o, a, e));
    }).flatten(!0);
  }
  function Zt(e, t) {
    var n = rn(e);
    return n.size = e.size && 2 * e.size - 1, n.__iterateUncached = function (n, r) {
      var o = this, a = 0;
      return e.__iterate(function (e, r) {
        return (!a || !1 !== n(t, a++, o)) && !1 !== n(e, a++, o);
      }, r), a;
    }, n.__iteratorUncached = function (n, r) {
      var o, a = e.__iterator(k, r), i = 0;
      return new Iterator(function () {
        return (!o || i % 2) && (o = a.next()).done ? o : i % 2 ? T(n, i++, t) : T(n, i++, o.value, o);
      });
    }, n;
  }
  function Yt(e, t, n) {
    t || (t = an);
    var a = r(e), i = 0, l = e.toSeq().map(function (t, r) {
        return [
          r,
          t,
          i++,
          n ? n(t, r, e) : t
        ];
      }).toArray();
    return l.sort(function (e, n) {
      return t(e[3], n[3]) || e[2] - n[2];
    }).forEach(a ? function (e, t) {
      l[t].length = 2;
    } : function (e, t) {
      l[t] = e[1];
    }), a ? KeyedSeq(l) : o(e) ? IndexedSeq(l) : SetSeq(l);
  }
  function Qt(e, t, n) {
    if (t || (t = an), n) {
      var r = e.toSeq().map(function (t, r) {
        return [
          t,
          n(t, r, e)
        ];
      }).reduce(function (e, n) {
        return $t(t, e[1], n[1]) ? n : e;
      });
      return r && r[0];
    }
    return e.reduce(function (e, n) {
      return $t(t, e, n) ? n : e;
    });
  }
  function $t(e, t, n) {
    var r = e(n, t);
    return 0 === r && n !== t && (null == n || n != n) || r > 0;
  }
  function Xt(e, t, n) {
    var r = rn(e);
    return r.size = new ArraySeq(n).map(function (e) {
      return e.size;
    }).min(), r.__iterate = function (e, t) {
      for (var n, r = this.__iterator(k, t), o = 0; !(n = r.next()).done && !1 !== e(n.value, o++, this););
      return o;
    }, r.__iteratorUncached = function (e, r) {
      var o = n.map(function (e) {
          return e = Iterable(e), N(r ? e.reverse() : e);
        }), a = 0, i = !1;
      return new Iterator(function () {
        var n;
        return i || (n = o.map(function (e) {
          return e.next();
        }), i = n.some(function (e) {
          return e.done;
        })), i ? P() : T(e, a++, t.apply(null, n.map(function (e) {
          return e.value;
        })));
      });
    }, r;
  }
  function Jt(e, t) {
    return W(e) ? t : e.constructor(t);
  }
  function en(e) {
    if (e !== Object(e))
      throw new TypeError('Expected [K, V] tuple: ' + e);
  }
  function tn(e) {
    return xe(e.size), y(e);
  }
  function nn(e) {
    return r(e) ? KeyedIterable : o(e) ? IndexedIterable : SetIterable;
  }
  function rn(e) {
    return Object.create((r(e) ? KeyedSeq : o(e) ? IndexedSeq : SetSeq).prototype);
  }
  function on() {
    return this._iter.cacheResult ? (this._iter.cacheResult(), this.size = this._iter.size, this) : Seq.prototype.cacheResult.call(this);
  }
  function an(e, t) {
    return e > t ? 1 : e < t ? -1 : 0;
  }
  function ln(e) {
    var t = N(e);
    if (!t) {
      if (!L(e))
        throw new TypeError('Expected iterable or array-like: ' + e);
      t = N(Iterable(e));
    }
    return t;
  }
  function Record(e, t) {
    var n, r = function Record(a) {
        if (a instanceof r)
          return a;
        if (!(this instanceof r))
          return new r(a);
        if (!n) {
          n = !0;
          var i = Object.keys(e);
          fn(o, i), o.size = i.length, o._name = t, o._keys = i, o._defaultValues = e;
        }
        this._map = Map(a);
      }, o = r.prototype = Object.create(sn);
    return o.constructor = r, r;
  }
  t(OrderedMap, Map), OrderedMap.of = function () {
    return this(arguments);
  }, OrderedMap.prototype.toString = function () {
    return this.__toString('OrderedMap {', '}');
  }, OrderedMap.prototype.get = function (e, t) {
    var n = this._map.get(e);
    return void 0 !== n ? this._list.get(n)[1] : t;
  }, OrderedMap.prototype.clear = function () {
    return 0 === this.size ? this : this.__ownerID ? (this.size = 0, this._map.clear(), this._list.clear(), this) : Dt();
  }, OrderedMap.prototype.set = function (e, t) {
    return Rt(this, e, t);
  }, OrderedMap.prototype.remove = function (e) {
    return Rt(this, e, g);
  }, OrderedMap.prototype.wasAltered = function () {
    return this._map.wasAltered() || this._list.wasAltered();
  }, OrderedMap.prototype.__iterate = function (e, t) {
    var n = this;
    return this._list.__iterate(function (t) {
      return t && e(t[1], t[0], n);
    }, t);
  }, OrderedMap.prototype.__iterator = function (e, t) {
    return this._list.fromEntrySeq().__iterator(e, t);
  }, OrderedMap.prototype.__ensureOwner = function (e) {
    if (e === this.__ownerID)
      return this;
    var t = this._map.__ensureOwner(e), n = this._list.__ensureOwner(e);
    return e ? Pt(t, n, e, this.__hash) : (this.__ownerID = e, this._map = t, this._list = n, this);
  }, OrderedMap.isOrderedMap = Tt, OrderedMap.prototype[u] = !0, OrderedMap.prototype[f] = OrderedMap.prototype.remove, t(ToKeyedSequence, KeyedSeq), ToKeyedSequence.prototype.get = function (e, t) {
    return this._iter.get(e, t);
  }, ToKeyedSequence.prototype.has = function (e) {
    return this._iter.has(e);
  }, ToKeyedSequence.prototype.valueSeq = function () {
    return this._iter.valueSeq();
  }, ToKeyedSequence.prototype.reverse = function () {
    var e = this, t = Lt(this, !0);
    return this._useKeys || (t.valueSeq = function () {
      return e._iter.toSeq().reverse();
    }), t;
  }, ToKeyedSequence.prototype.map = function (e, t) {
    var n = this, r = zt(this, e, t);
    return this._useKeys || (r.valueSeq = function () {
      return n._iter.toSeq().map(e, t);
    }), r;
  }, ToKeyedSequence.prototype.__iterate = function (e, t) {
    var n, r = this;
    return this._iter.__iterate(this._useKeys ? function (t, n) {
      return e(t, n, r);
    } : (n = t ? tn(this) : 0, function (o) {
      return e(o, t ? --n : n++, r);
    }), t);
  }, ToKeyedSequence.prototype.__iterator = function (e, t) {
    if (this._useKeys)
      return this._iter.__iterator(e, t);
    var n = this._iter.__iterator(k, t), r = t ? tn(this) : 0;
    return new Iterator(function () {
      var o = n.next();
      return o.done ? o : T(e, t ? --r : r++, o.value, o);
    });
  }, ToKeyedSequence.prototype[u] = !0, t(ToIndexedSequence, IndexedSeq), ToIndexedSequence.prototype.includes = function (e) {
    return this._iter.includes(e);
  }, ToIndexedSequence.prototype.__iterate = function (e, t) {
    var n = this, r = 0;
    return this._iter.__iterate(function (t) {
      return e(t, r++, n);
    }, t);
  }, ToIndexedSequence.prototype.__iterator = function (e, t) {
    var n = this._iter.__iterator(k, t), r = 0;
    return new Iterator(function () {
      var t = n.next();
      return t.done ? t : T(e, r++, t.value, t);
    });
  }, t(ToSetSequence, SetSeq), ToSetSequence.prototype.has = function (e) {
    return this._iter.includes(e);
  }, ToSetSequence.prototype.__iterate = function (e, t) {
    var n = this;
    return this._iter.__iterate(function (t) {
      return e(t, t, n);
    }, t);
  }, ToSetSequence.prototype.__iterator = function (e, t) {
    var n = this._iter.__iterator(k, t);
    return new Iterator(function () {
      var t = n.next();
      return t.done ? t : T(e, t.value, t.value, t);
    });
  }, t(FromEntriesSequence, KeyedSeq), FromEntriesSequence.prototype.entrySeq = function () {
    return this._iter.toSeq();
  }, FromEntriesSequence.prototype.__iterate = function (e, t) {
    var r = this;
    return this._iter.__iterate(function (t) {
      if (t) {
        en(t);
        var o = n(t);
        return e(o ? t.get(1) : t[1], o ? t.get(0) : t[0], r);
      }
    }, t);
  }, FromEntriesSequence.prototype.__iterator = function (e, t) {
    var r = this._iter.__iterator(k, t);
    return new Iterator(function () {
      for (;;) {
        var t = r.next();
        if (t.done)
          return t;
        var o = t.value;
        if (o) {
          en(o);
          var a = n(o);
          return T(e, a ? o.get(0) : o[0], a ? o.get(1) : o[1], t);
        }
      }
    });
  }, ToIndexedSequence.prototype.cacheResult = ToKeyedSequence.prototype.cacheResult = ToSetSequence.prototype.cacheResult = FromEntriesSequence.prototype.cacheResult = on, t(Record, KeyedCollection), Record.prototype.toString = function () {
    return this.__toString(un(this) + ' {', '}');
  }, Record.prototype.has = function (e) {
    return this._defaultValues.hasOwnProperty(e);
  }, Record.prototype.get = function (e, t) {
    if (!this.has(e))
      return t;
    var n = this._defaultValues[e];
    return this._map ? this._map.get(e, n) : n;
  }, Record.prototype.clear = function () {
    if (this.__ownerID)
      return this._map && this._map.clear(), this;
    var e = this.constructor;
    return e._empty || (e._empty = cn(this, Ue()));
  }, Record.prototype.set = function (e, t) {
    if (!this.has(e))
      throw new Error('Cannot set unknown key "' + e + '" on ' + un(this));
    var n = this._map && this._map.set(e, t);
    return this.__ownerID || n === this._map ? this : cn(this, n);
  }, Record.prototype.remove = function (e) {
    if (!this.has(e))
      return this;
    var t = this._map && this._map.remove(e);
    return this.__ownerID || t === this._map ? this : cn(this, t);
  }, Record.prototype.wasAltered = function () {
    return this._map.wasAltered();
  }, Record.prototype.__iterator = function (e, t) {
    var n = this;
    return KeyedIterable(this._defaultValues).map(function (e, t) {
      return n.get(t);
    }).__iterator(e, t);
  }, Record.prototype.__iterate = function (e, t) {
    var n = this;
    return KeyedIterable(this._defaultValues).map(function (e, t) {
      return n.get(t);
    }).__iterate(e, t);
  }, Record.prototype.__ensureOwner = function (e) {
    if (e === this.__ownerID)
      return this;
    var t = this._map && this._map.__ensureOwner(e);
    return e ? cn(this, t, e) : (this.__ownerID = e, this._map = t, this);
  };
  var sn = Record.prototype;
  function cn(e, t, n) {
    var r = Object.create(Object.getPrototypeOf(e));
    return r._map = t, r.__ownerID = n, r;
  }
  function un(e) {
    return e._name || e.constructor.name || 'Record';
  }
  function fn(e, t) {
    try {
      t.forEach(dn.bind(void 0, e));
    } catch (e) {
    }
  }
  function dn(e, t) {
    Object.defineProperty(e, t, {
      get: function () {
        return this.get(t);
      },
      set: function (e) {
        re(this.__ownerID, 'Cannot set on an immutable record.'), this.set(t, e);
      }
    });
  }
  function Set(e) {
    return null == e ? yn() : pn(e) && !i(e) ? e : yn().withMutations(function (t) {
      var n = SetIterable(e);
      xe(n.size), n.forEach(function (e) {
        return t.add(e);
      });
    });
  }
  function pn(e) {
    return !(!e || !e[gn]);
  }
  sn[f] = sn.remove, sn.deleteIn = sn.removeIn = je.removeIn, sn.merge = je.merge, sn.mergeWith = je.mergeWith, sn.mergeIn = je.mergeIn, sn.mergeDeep = je.mergeDeep, sn.mergeDeepWith = je.mergeDeepWith, sn.mergeDeepIn = je.mergeDeepIn, sn.setIn = je.setIn, sn.update = je.update, sn.updateIn = je.updateIn, sn.withMutations = je.withMutations, sn.asMutable = je.asMutable, sn.asImmutable = je.asImmutable, t(Set, SetCollection), Set.of = function () {
    return this(arguments);
  }, Set.fromKeys = function (e) {
    return this(KeyedIterable(e).keySeq());
  }, Set.prototype.toString = function () {
    return this.__toString('Set {', '}');
  }, Set.prototype.has = function (e) {
    return this._map.has(e);
  }, Set.prototype.add = function (e) {
    return bn(this, this._map.set(e, !0));
  }, Set.prototype.remove = function (e) {
    return bn(this, this._map.remove(e));
  }, Set.prototype.clear = function () {
    return bn(this, this._map.clear());
  }, Set.prototype.union = function () {
    var t = e.call(arguments, 0);
    return 0 === (t = t.filter(function (e) {
      return 0 !== e.size;
    })).length ? this : 0 !== this.size || this.__ownerID || 1 !== t.length ? this.withMutations(function (e) {
      for (var n = 0; n < t.length; n++)
        SetIterable(t[n]).forEach(function (t) {
          return e.add(t);
        });
    }) : this.constructor(t[0]);
  }, Set.prototype.intersect = function () {
    var t = e.call(arguments, 0);
    if (0 === t.length)
      return this;
    t = t.map(function (e) {
      return SetIterable(e);
    });
    var n = this;
    return this.withMutations(function (e) {
      n.forEach(function (n) {
        t.every(function (e) {
          return e.includes(n);
        }) || e.remove(n);
      });
    });
  }, Set.prototype.subtract = function () {
    var t = e.call(arguments, 0);
    if (0 === t.length)
      return this;
    t = t.map(function (e) {
      return SetIterable(e);
    });
    var n = this;
    return this.withMutations(function (e) {
      n.forEach(function (n) {
        t.some(function (e) {
          return e.includes(n);
        }) && e.remove(n);
      });
    });
  }, Set.prototype.merge = function () {
    return this.union.apply(this, arguments);
  }, Set.prototype.mergeWith = function (t) {
    var n = e.call(arguments, 1);
    return this.union.apply(this, n);
  }, Set.prototype.sort = function (e) {
    return OrderedSet(Yt(this, e));
  }, Set.prototype.sortBy = function (e, t) {
    return OrderedSet(Yt(this, t, e));
  }, Set.prototype.wasAltered = function () {
    return this._map.wasAltered();
  }, Set.prototype.__iterate = function (e, t) {
    var n = this;
    return this._map.__iterate(function (t, r) {
      return e(r, r, n);
    }, t);
  }, Set.prototype.__iterator = function (e, t) {
    return this._map.map(function (e, t) {
      return t;
    }).__iterator(e, t);
  }, Set.prototype.__ensureOwner = function (e) {
    if (e === this.__ownerID)
      return this;
    var t = this._map.__ensureOwner(e);
    return e ? this.__make(t, e) : (this.__ownerID = e, this._map = t, this);
  }, Set.isSet = pn;
  var hn, gn = '@@__IMMUTABLE_SET__@@', mn = Set.prototype;
  function bn(e, t) {
    return e.__ownerID ? (e.size = t.size, e._map = t, e) : t === e._map ? e : 0 === t.size ? e.__empty() : e.__make(t);
  }
  function vn(e, t) {
    var n = Object.create(mn);
    return n.size = e ? e.size : 0, n._map = e, n.__ownerID = t, n;
  }
  function yn() {
    return hn || (hn = vn(Ue()));
  }
  function OrderedSet(e) {
    return null == e ? _n() : Cn(e) ? e : _n().withMutations(function (t) {
      var n = SetIterable(e);
      xe(n.size), n.forEach(function (e) {
        return t.add(e);
      });
    });
  }
  function Cn(e) {
    return pn(e) && i(e);
  }
  mn[gn] = !0, mn[f] = mn.remove, mn.mergeDeep = mn.merge, mn.mergeDeepWith = mn.mergeWith, mn.withMutations = je.withMutations, mn.asMutable = je.asMutable, mn.asImmutable = je.asImmutable, mn.__empty = yn, mn.__make = vn, t(OrderedSet, Set), OrderedSet.of = function () {
    return this(arguments);
  }, OrderedSet.fromKeys = function (e) {
    return this(KeyedIterable(e).keySeq());
  }, OrderedSet.prototype.toString = function () {
    return this.__toString('OrderedSet {', '}');
  }, OrderedSet.isOrderedSet = Cn;
  var wn, xn = OrderedSet.prototype;
  function En(e, t) {
    var n = Object.create(xn);
    return n.size = e ? e.size : 0, n._map = e, n.__ownerID = t, n;
  }
  function _n() {
    return wn || (wn = En(Dt()));
  }
  function Stack(e) {
    return null == e ? Mn() : On(e) ? e : Mn().unshiftAll(e);
  }
  function On(e) {
    return !(!e || !e[kn]);
  }
  xn[u] = !0, xn.__empty = _n, xn.__make = En, t(Stack, IndexedCollection), Stack.of = function () {
    return this(arguments);
  }, Stack.prototype.toString = function () {
    return this.__toString('Stack [', ']');
  }, Stack.prototype.get = function (e, t) {
    var n = this._head;
    for (e = C(this, e); n && e--;)
      n = n.next;
    return n ? n.value : t;
  }, Stack.prototype.peek = function () {
    return this._head && this._head.value;
  }, Stack.prototype.push = function () {
    if (0 === arguments.length)
      return this;
    for (var e = this.size + arguments.length, t = this._head, n = arguments.length - 1; n >= 0; n--)
      t = {
        value: arguments[n],
        next: t
      };
    return this.__ownerID ? (this.size = e, this._head = t, this.__hash = void 0, this.__altered = !0, this) : jn(e, t);
  }, Stack.prototype.pushAll = function (e) {
    if (0 === (e = IndexedIterable(e)).size)
      return this;
    xe(e.size);
    var t = this.size, n = this._head;
    return e.reverse().forEach(function (e) {
      t++, n = {
        value: e,
        next: n
      };
    }), this.__ownerID ? (this.size = t, this._head = n, this.__hash = void 0, this.__altered = !0, this) : jn(t, n);
  }, Stack.prototype.pop = function () {
    return this.slice(1);
  }, Stack.prototype.unshift = function () {
    return this.push.apply(this, arguments);
  }, Stack.prototype.unshiftAll = function (e) {
    return this.pushAll(e);
  }, Stack.prototype.shift = function () {
    return this.pop.apply(this, arguments);
  }, Stack.prototype.clear = function () {
    return 0 === this.size ? this : this.__ownerID ? (this.size = 0, this._head = void 0, this.__hash = void 0, this.__altered = !0, this) : Mn();
  }, Stack.prototype.slice = function (e, t) {
    if (x(e, t, this.size))
      return this;
    var n = E(e, this.size);
    if (_(t, this.size) !== this.size)
      return IndexedCollection.prototype.slice.call(this, e, t);
    for (var r = this.size - n, o = this._head; n--;)
      o = o.next;
    return this.__ownerID ? (this.size = r, this._head = o, this.__hash = void 0, this.__altered = !0, this) : jn(r, o);
  }, Stack.prototype.__ensureOwner = function (e) {
    return e === this.__ownerID ? this : e ? jn(this.size, this._head, e, this.__hash) : (this.__ownerID = e, this.__altered = !1, this);
  }, Stack.prototype.__iterate = function (e, t) {
    if (t)
      return this.reverse().__iterate(e);
    for (var n = 0, r = this._head; r && !1 !== e(r.value, n++, this);)
      r = r.next;
    return n;
  }, Stack.prototype.__iterator = function (e, t) {
    if (t)
      return this.reverse().__iterator(e);
    var n = 0, r = this._head;
    return new Iterator(function () {
      if (r) {
        var t = r.value;
        return r = r.next, T(e, n++, t);
      }
      return P();
    });
  }, Stack.isStack = On;
  var Sn, kn = '@@__IMMUTABLE_STACK__@@', An = Stack.prototype;
  function jn(e, t, n, r) {
    var o = Object.create(An);
    return o.size = e, o._head = t, o.__ownerID = n, o.__hash = r, o.__altered = !1, o;
  }
  function Mn() {
    return Sn || (Sn = jn(0));
  }
  function In(e, t) {
    var n = function (n) {
      e.prototype[n] = t[n];
    };
    return Object.keys(t).forEach(n), Object.getOwnPropertySymbols && Object.getOwnPropertySymbols(t).forEach(n), e;
  }
  An[kn] = !0, An.withMutations = je.withMutations, An.asMutable = je.asMutable, An.asImmutable = je.asImmutable, An.wasAltered = je.wasAltered, Iterable.Iterator = Iterator, In(Iterable, {
    toArray: function () {
      xe(this.size);
      var e = new Array(this.size || 0);
      return this.valueSeq().__iterate(function (t, n) {
        e[n] = t;
      }), e;
    },
    toIndexedSeq: function () {
      return new ToIndexedSequence(this);
    },
    toJS: function () {
      return this.toSeq().map(function (e) {
        return e && 'function' == typeof e.toJS ? e.toJS() : e;
      }).__toJS();
    },
    toJSON: function () {
      return this.toSeq().map(function (e) {
        return e && 'function' == typeof e.toJSON ? e.toJSON() : e;
      }).__toJS();
    },
    toKeyedSeq: function () {
      return new ToKeyedSequence(this, !0);
    },
    toMap: function () {
      return Map(this.toKeyedSeq());
    },
    toObject: function () {
      xe(this.size);
      var e = {};
      return this.__iterate(function (t, n) {
        e[n] = t;
      }), e;
    },
    toOrderedMap: function () {
      return OrderedMap(this.toKeyedSeq());
    },
    toOrderedSet: function () {
      return OrderedSet(r(this) ? this.valueSeq() : this);
    },
    toSet: function () {
      return Set(r(this) ? this.valueSeq() : this);
    },
    toSetSeq: function () {
      return new ToSetSequence(this);
    },
    toSeq: function () {
      return o(this) ? this.toIndexedSeq() : r(this) ? this.toKeyedSeq() : this.toSetSeq();
    },
    toStack: function () {
      return Stack(r(this) ? this.valueSeq() : this);
    },
    toList: function () {
      return List(r(this) ? this.valueSeq() : this);
    },
    toString: function () {
      return '[Iterable]';
    },
    __toString: function (e, t) {
      return 0 === this.size ? e + t : e + ' ' + this.toSeq().map(this.__toStringMapper).join(', ') + ' ' + t;
    },
    concat: function () {
      return Jt(this, Kt(this, e.call(arguments, 0)));
    },
    includes: function (e) {
      return this.some(function (t) {
        return te(t, e);
      });
    },
    entries: function () {
      return this.__iterator(A);
    },
    every: function (e, t) {
      xe(this.size);
      var n = !0;
      return this.__iterate(function (r, o, a) {
        if (!e.call(t, r, o, a))
          return n = !1, !1;
      }), n;
    },
    filter: function (e, t) {
      return Jt(this, Bt(this, e, t, !0));
    },
    find: function (e, t, n) {
      var r = this.findEntry(e, t);
      return r ? r[1] : n;
    },
    findEntry: function (e, t) {
      var n;
      return this.__iterate(function (r, o, a) {
        if (e.call(t, r, o, a))
          return n = [
            o,
            r
          ], !1;
      }), n;
    },
    findLastEntry: function (e, t) {
      return this.toSeq().reverse().findEntry(e, t);
    },
    forEach: function (e, t) {
      return xe(this.size), this.__iterate(t ? e.bind(t) : e);
    },
    join: function (e) {
      xe(this.size), e = void 0 !== e ? '' + e : ',';
      var t = '', n = !0;
      return this.__iterate(function (r) {
        n ? n = !1 : t += e, t += null != r ? r.toString() : '';
      }), t;
    },
    keys: function () {
      return this.__iterator(S);
    },
    map: function (e, t) {
      return Jt(this, zt(this, e, t));
    },
    reduce: function (e, t, n) {
      var r, o;
      return xe(this.size), arguments.length < 2 ? o = !0 : r = t, this.__iterate(function (t, a, i) {
        o ? (o = !1, r = t) : r = e.call(n, r, t, a, i);
      }), r;
    },
    reduceRight: function (e, t, n) {
      var r = this.toKeyedSeq().reverse();
      return r.reduce.apply(r, arguments);
    },
    reverse: function () {
      return Jt(this, Lt(this, !0));
    },
    slice: function (e, t) {
      return Jt(this, Ut(this, e, t, !0));
    },
    some: function (e, t) {
      return !this.every(Nn(e), t);
    },
    sort: function (e) {
      return Jt(this, Yt(this, e));
    },
    values: function () {
      return this.__iterator(k);
    },
    butLast: function () {
      return this.slice(0, -1);
    },
    isEmpty: function () {
      return void 0 !== this.size ? 0 === this.size : !this.some(function () {
        return !0;
      });
    },
    count: function (e, t) {
      return y(e ? this.toSeq().filter(e, t) : this);
    },
    countBy: function (e, t) {
      return Ft(this, e, t);
    },
    equals: function (e) {
      return ne(this, e);
    },
    entrySeq: function () {
      var e = this;
      if (e._cache)
        return new ArraySeq(e._cache);
      var t = e.toSeq().map(Rn).toIndexedSeq();
      return t.fromEntrySeq = function () {
        return e.toSeq();
      }, t;
    },
    filterNot: function (e, t) {
      return this.filter(Nn(e), t);
    },
    findLast: function (e, t, n) {
      return this.toKeyedSeq().reverse().find(e, t, n);
    },
    first: function () {
      return this.find(w);
    },
    flatMap: function (e, t) {
      return Jt(this, Gt(this, e, t));
    },
    flatten: function (e) {
      return Jt(this, qt(this, e, !0));
    },
    fromEntrySeq: function () {
      return new FromEntriesSequence(this);
    },
    get: function (e, t) {
      return this.find(function (t, n) {
        return te(n, e);
      }, void 0, t);
    },
    getIn: function (e, t) {
      for (var n, r = this, o = ln(e); !(n = o.next()).done;) {
        var a = n.value;
        if ((r = r && r.get ? r.get(a, g) : g) === g)
          return t;
      }
      return r;
    },
    groupBy: function (e, t) {
      return Ht(this, e, t);
    },
    has: function (e) {
      return this.get(e, g) !== g;
    },
    hasIn: function (e) {
      return this.getIn(e, g) !== g;
    },
    isSubset: function (e) {
      return e = 'function' == typeof e.includes ? e : Iterable(e), this.every(function (t) {
        return e.includes(t);
      });
    },
    isSuperset: function (e) {
      return (e = 'function' == typeof e.isSubset ? e : Iterable(e)).isSubset(this);
    },
    keySeq: function () {
      return this.toSeq().map(Dn).toIndexedSeq();
    },
    last: function () {
      return this.toSeq().reverse().first();
    },
    max: function (e) {
      return Qt(this, e);
    },
    maxBy: function (e, t) {
      return Qt(this, t, e);
    },
    min: function (e) {
      return Qt(this, e ? zn(e) : Fn);
    },
    minBy: function (e, t) {
      return Qt(this, t ? zn(t) : Fn, e);
    },
    rest: function () {
      return this.slice(1);
    },
    skip: function (e) {
      return this.slice(Math.max(0, e));
    },
    skipLast: function (e) {
      return Jt(this, this.toSeq().reverse().skip(e).reverse());
    },
    skipWhile: function (e, t) {
      return Jt(this, Vt(this, e, t, !0));
    },
    skipUntil: function (e, t) {
      return this.skipWhile(Nn(e), t);
    },
    sortBy: function (e, t) {
      return Jt(this, Yt(this, t, e));
    },
    take: function (e) {
      return this.slice(0, Math.max(0, e));
    },
    takeLast: function (e) {
      return Jt(this, this.toSeq().reverse().take(e).reverse());
    },
    takeWhile: function (e, t) {
      return Jt(this, Wt(this, e, t));
    },
    takeUntil: function (e, t) {
      return this.takeWhile(Nn(e), t);
    },
    valueSeq: function () {
      return this.toIndexedSeq();
    },
    hashCode: function () {
      return this.__hash || (this.__hash = Hn(this));
    }
  });
  var Tn = Iterable.prototype;
  Tn[l] = !0, Tn[I] = Tn.values, Tn.__toJS = Tn.toArray, Tn.__toStringMapper = Ln, Tn.inspect = Tn.toSource = function () {
    return this.toString();
  }, Tn.chain = Tn.flatMap, Tn.contains = Tn.includes, function () {
    try {
      Object.defineProperty(Tn, 'length', {
        get: function () {
          if (!Iterable.noLengthWarning) {
            var e;
            try {
              throw new Error();
            } catch (t) {
              e = t.stack;
            }
            if (-1 === e.indexOf('_wrapObject'))
              return console && console.warn && console.warn('iterable.length has been deprecated, use iterable.size or iterable.count(). This warning will become a silent error in a future version. ' + e), this.size;
          }
        }
      });
    } catch (e) {
    }
  }(), In(KeyedIterable, {
    flip: function () {
      return Jt(this, Nt(this));
    },
    findKey: function (e, t) {
      var n = this.findEntry(e, t);
      return n && n[0];
    },
    findLastKey: function (e, t) {
      return this.toSeq().reverse().findKey(e, t);
    },
    keyOf: function (e) {
      return this.findKey(function (t) {
        return te(t, e);
      });
    },
    lastKeyOf: function (e) {
      return this.findLastKey(function (t) {
        return te(t, e);
      });
    },
    mapEntries: function (e, t) {
      var n = this, r = 0;
      return Jt(this, this.toSeq().map(function (o, a) {
        return e.call(t, [
          a,
          o
        ], r++, n);
      }).fromEntrySeq());
    },
    mapKeys: function (e, t) {
      var n = this;
      return Jt(this, this.toSeq().flip().map(function (r, o) {
        return e.call(t, r, o, n);
      }).flip());
    }
  });
  var Pn = KeyedIterable.prototype;
  function Dn(e, t) {
    return t;
  }
  function Rn(e, t) {
    return [
      t,
      e
    ];
  }
  function Nn(e) {
    return function () {
      return !e.apply(this, arguments);
    };
  }
  function zn(e) {
    return function () {
      return -e.apply(this, arguments);
    };
  }
  function Ln(e) {
    return 'string' == typeof e ? JSON.stringify(e) : e;
  }
  function Bn() {
    return v(arguments);
  }
  function Fn(e, t) {
    return e < t ? 1 : e > t ? -1 : 0;
  }
  function Hn(e) {
    if (e.size === 1 / 0)
      return 0;
    var t = i(e), n = r(e), o = t ? 1 : 0;
    return Un(e.__iterate(n ? t ? function (e, t) {
      o = 31 * o + Wn(ie(e), ie(t)) | 0;
    } : function (e, t) {
      o = o + Wn(ie(e), ie(t)) | 0;
    } : t ? function (e) {
      o = 31 * o + ie(e) | 0;
    } : function (e) {
      o = o + ie(e) | 0;
    }), o);
  }
  function Un(e, t) {
    return t = oe(t, 3432918353), t = oe(t << 15 | t >>> -15, 461845907), t = oe(t << 13 | t >>> -13, 5), t = oe((t = (t + 3864292196 | 0) ^ e) ^ t >>> 16, 2246822507), t = ae((t = oe(t ^ t >>> 13, 3266489909)) ^ t >>> 16);
  }
  function Wn(e, t) {
    return e ^ t + 2654435769 + (e << 6) + (e >> 2) | 0;
  }
  return Pn[s] = !0, Pn[I] = Tn.entries, Pn.__toJS = Tn.toObject, Pn.__toStringMapper = function (e, t) {
    return JSON.stringify(t) + ': ' + Ln(e);
  }, In(IndexedIterable, {
    toKeyedSeq: function () {
      return new ToKeyedSequence(this, !1);
    },
    filter: function (e, t) {
      return Jt(this, Bt(this, e, t, !1));
    },
    findIndex: function (e, t) {
      var n = this.findEntry(e, t);
      return n ? n[0] : -1;
    },
    indexOf: function (e) {
      var t = this.toKeyedSeq().keyOf(e);
      return void 0 === t ? -1 : t;
    },
    lastIndexOf: function (e) {
      var t = this.toKeyedSeq().reverse().keyOf(e);
      return void 0 === t ? -1 : t;
    },
    reverse: function () {
      return Jt(this, Lt(this, !1));
    },
    slice: function (e, t) {
      return Jt(this, Ut(this, e, t, !1));
    },
    splice: function (e, t) {
      var n = arguments.length;
      if (t = Math.max(0 | t, 0), 0 === n || 2 === n && !t)
        return this;
      e = E(e, e < 0 ? this.count() : this.size);
      var r = this.slice(0, e);
      return Jt(this, 1 === n ? r : r.concat(v(arguments, 2), this.slice(e + t)));
    },
    findLastIndex: function (e, t) {
      var n = this.toKeyedSeq().findLastKey(e, t);
      return void 0 === n ? -1 : n;
    },
    first: function () {
      return this.get(0);
    },
    flatten: function (e) {
      return Jt(this, qt(this, e, !1));
    },
    get: function (e, t) {
      return (e = C(this, e)) < 0 || this.size === 1 / 0 || void 0 !== this.size && e > this.size ? t : this.find(function (t, n) {
        return n === e;
      }, void 0, t);
    },
    has: function (e) {
      return (e = C(this, e)) >= 0 && (void 0 !== this.size ? this.size === 1 / 0 || e < this.size : -1 !== this.indexOf(e));
    },
    interpose: function (e) {
      return Jt(this, Zt(this, e));
    },
    interleave: function () {
      var e = [this].concat(v(arguments)), t = Xt(this.toSeq(), IndexedSeq.of, e), n = t.flatten(!0);
      return t.size && (n.size = t.size * e.length), Jt(this, n);
    },
    last: function () {
      return this.get(-1);
    },
    skipWhile: function (e, t) {
      return Jt(this, Vt(this, e, t, !1));
    },
    zip: function () {
      return Jt(this, Xt(this, Bn, [this].concat(v(arguments))));
    },
    zipWith: function (e) {
      var t = v(arguments);
      return t[0] = this, Jt(this, Xt(this, e, t));
    }
  }), IndexedIterable.prototype[c] = !0, IndexedIterable.prototype[u] = !0, In(SetIterable, {
    get: function (e, t) {
      return this.has(e) ? e : t;
    },
    includes: function (e) {
      return this.has(e);
    },
    keySeq: function () {
      return this.valueSeq();
    }
  }), SetIterable.prototype.has = Tn.includes, In(KeyedSeq, KeyedIterable.prototype), In(IndexedSeq, IndexedIterable.prototype), In(SetSeq, SetIterable.prototype), In(KeyedCollection, KeyedIterable.prototype), In(IndexedCollection, IndexedIterable.prototype), In(SetCollection, SetIterable.prototype), {
    Iterable: Iterable,
    Seq: Seq,
    Collection: Collection,
    Map: Map,
    OrderedMap: OrderedMap,
    List: List,
    Stack: Stack,
    Set: Set,
    OrderedSet: OrderedSet,
    Record: Record,
    Range: Range,
    Repeat: Repeat,
    is: te,
    fromJS: $
  };
}();