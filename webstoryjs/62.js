'use strict';
(function (e) {
  var n = function () {
      if ('undefined' != typeof Map)
        return Map;
      function e(e, t) {
        var n = -1;
        return e.some(function (e, r) {
          return e[0] === t && (n = r, !0);
        }), n;
      }
      return function () {
        function t() {
          this.__entries__ = [];
        }
        return Object.defineProperty(t.prototype, 'size', {
          get: function () {
            return this.__entries__.length;
          },
          enumerable: !0,
          configurable: !0
        }), t.prototype.get = function (t) {
          var n = e(this.__entries__, t), r = this.__entries__[n];
          return r && r[1];
        }, t.prototype.set = function (t, n) {
          var r = e(this.__entries__, t);
          ~r ? this.__entries__[r][1] = n : this.__entries__.push([
            t,
            n
          ]);
        }, t.prototype.delete = function (t) {
          var n = this.__entries__, r = e(n, t);
          ~r && n.splice(r, 1);
        }, t.prototype.has = function (t) {
          return !!~e(this.__entries__, t);
        }, t.prototype.clear = function () {
          this.__entries__.splice(0);
        }, t.prototype.forEach = function (e, t) {
          void 0 === t && (t = null);
          for (var n = 0, r = this.__entries__; n < r.length; n++) {
            var o = r[n];
            e.call(t, o[1], o[0]);
          }
        }, t;
      }();
    }(), r = 'undefined' != typeof window && 'undefined' != typeof document && window.document === document, o = void 0 !== e && e.Math === Math ? e : 'undefined' != typeof self && self.Math === Math ? self : 'undefined' != typeof window && window.Math === Math ? window : Function('return this')(), a = 'function' == typeof requestAnimationFrame ? requestAnimationFrame.bind(o) : function (e) {
      return setTimeout(function () {
        return e(Date.now());
      }, 1000 / 60);
    };
  var i = [
      'top',
      'right',
      'bottom',
      'left',
      'width',
      'height',
      'size',
      'weight'
    ], l = 'undefined' != typeof MutationObserver, s = function () {
      function ResizeObserverController() {
        this.connected_ = !1, this.mutationEventsAdded_ = !1, this.mutationsObserver_ = null, this.observers_ = [], this.onTransitionEnd_ = this.onTransitionEnd_.bind(this), this.refresh = function (e, t) {
          var n = !1, r = !1, o = 0;
          function i() {
            n && (n = !1, e()), r && s();
          }
          function l() {
            a(i);
          }
          function s() {
            var e = Date.now();
            if (n) {
              if (e - o < 2)
                return;
              r = !0;
            } else
              n = !0, r = !1, setTimeout(l, t);
            o = e;
          }
          return s;
        }(this.refresh.bind(this), 20);
      }
      return ResizeObserverController.prototype.addObserver = function (e) {
        ~this.observers_.indexOf(e) || this.observers_.push(e), this.connected_ || this.connect_();
      }, ResizeObserverController.prototype.removeObserver = function (e) {
        var t = this.observers_, n = t.indexOf(e);
        ~n && t.splice(n, 1), !t.length && this.connected_ && this.disconnect_();
      }, ResizeObserverController.prototype.refresh = function () {
        this.updateObservers_() && this.refresh();
      }, ResizeObserverController.prototype.updateObservers_ = function () {
        var e = this.observers_.filter(function (e) {
          return e.gatherActive(), e.hasActive();
        });
        return e.forEach(function (e) {
          return e.broadcastActive();
        }), e.length > 0;
      }, ResizeObserverController.prototype.connect_ = function () {
        r && !this.connected_ && (document.addEventListener('transitionend', this.onTransitionEnd_), window.addEventListener('resize', this.refresh), l ? (this.mutationsObserver_ = new MutationObserver(this.refresh), this.mutationsObserver_.observe(document, {
          attributes: !0,
          childList: !0,
          characterData: !0,
          subtree: !0
        })) : (document.addEventListener('DOMSubtreeModified', this.refresh), this.mutationEventsAdded_ = !0), this.connected_ = !0);
      }, ResizeObserverController.prototype.disconnect_ = function () {
        r && this.connected_ && (document.removeEventListener('transitionend', this.onTransitionEnd_), window.removeEventListener('resize', this.refresh), this.mutationsObserver_ && this.mutationsObserver_.disconnect(), this.mutationEventsAdded_ && document.removeEventListener('DOMSubtreeModified', this.refresh), this.mutationsObserver_ = null, this.mutationEventsAdded_ = !1, this.connected_ = !1);
      }, ResizeObserverController.prototype.onTransitionEnd_ = function (e) {
        var t = e.propertyName, n = void 0 === t ? '' : t;
        i.some(function (e) {
          return !!~n.indexOf(e);
        }) && this.refresh();
      }, ResizeObserverController.getInstance = function () {
        return this.instance_ || (this.instance_ = new ResizeObserverController()), this.instance_;
      }, ResizeObserverController.instance_ = null, ResizeObserverController;
    }(), c = function (e, t) {
      for (var n = 0, r = Object.keys(t); n < r.length; n++) {
        var o = r[n];
        Object.defineProperty(e, o, {
          value: t[o],
          enumerable: !1,
          writable: !1,
          configurable: !0
        });
      }
      return e;
    }, u = function (e) {
      return e && e.ownerDocument && e.ownerDocument.defaultView || o;
    }, f = b(0, 0, 0, 0);
  function d(e) {
    return parseFloat(e) || 0;
  }
  function p(e) {
    for (var t = [], n = 1; n < arguments.length; n++)
      t[n - 1] = arguments[n];
    return t.reduce(function (t, n) {
      return t + d(e['border-' + n + '-width']);
    }, 0);
  }
  function h(e) {
    var t = e.clientWidth, n = e.clientHeight;
    if (!t && !n)
      return f;
    var r = u(e).getComputedStyle(e), o = function (e) {
        for (var t = {}, n = 0, r = [
              'top',
              'right',
              'bottom',
              'left'
            ]; n < r.length; n++) {
          var o = r[n], a = e['padding-' + o];
          t[o] = d(a);
        }
        return t;
      }(r), a = o.left + o.right, i = o.top + o.bottom, l = d(r.width), s = d(r.height);
    if ('border-box' === r.boxSizing && (Math.round(l + a) !== t && (l -= p(r, 'left', 'right') + a), Math.round(s + i) !== n && (s -= p(r, 'top', 'bottom') + i)), !function (e) {
        return e === u(e).document.documentElement;
      }(e)) {
      var c = Math.round(l + a) - t, h = Math.round(s + i) - n;
      1 !== Math.abs(c) && (l -= c), 1 !== Math.abs(h) && (s -= h);
    }
    return b(o.left, o.top, l, s);
  }
  var g = 'undefined' != typeof SVGGraphicsElement ? function (e) {
    return e instanceof u(e).SVGGraphicsElement;
  } : function (e) {
    return e instanceof u(e).SVGElement && 'function' == typeof e.getBBox;
  };
  function m(e) {
    return r ? g(e) ? function (e) {
      var t = e.getBBox();
      return b(0, 0, t.width, t.height);
    }(e) : h(e) : f;
  }
  function b(e, t, n, r) {
    return {
      x: e,
      y: t,
      width: n,
      height: r
    };
  }
  var v = function () {
      function ResizeObservation(e) {
        this.broadcastWidth = 0, this.broadcastHeight = 0, this.contentRect_ = b(0, 0, 0, 0), this.target = e;
      }
      return ResizeObservation.prototype.isActive = function () {
        var e = m(this.target);
        return this.contentRect_ = e, e.width !== this.broadcastWidth || e.height !== this.broadcastHeight;
      }, ResizeObservation.prototype.broadcastRect = function () {
        var e = this.contentRect_;
        return this.broadcastWidth = e.width, this.broadcastHeight = e.height, e;
      }, ResizeObservation;
    }(), y = function y(e, t) {
      var n, r, o, a, i, l, s, u = (r = (n = t).x, o = n.y, a = n.width, i = n.height, l = 'undefined' != typeof DOMRectReadOnly ? DOMRectReadOnly : Object, s = Object.create(l.prototype), c(s, {
          x: r,
          y: o,
          width: a,
          height: i,
          top: o,
          right: r + a,
          bottom: i + o,
          left: r
        }), s);
      c(this, {
        target: e,
        contentRect: u
      });
    }, C = function () {
      function ResizeObserverSPI(e, t, r) {
        if (this.activeObservations_ = [], this.observations_ = new n(), 'function' != typeof e)
          throw new TypeError('The callback provided as parameter 1 is not a function.');
        this.callback_ = e, this.controller_ = t, this.callbackCtx_ = r;
      }
      return ResizeObserverSPI.prototype.observe = function (e) {
        if (!arguments.length)
          throw new TypeError('1 argument required, but only 0 present.');
        if ('undefined' != typeof Element && Element instanceof Object) {
          if (!(e instanceof u(e).Element))
            throw new TypeError('parameter 1 is not of type "Element".');
          var t = this.observations_;
          t.has(e) || (t.set(e, new v(e)), this.controller_.addObserver(this), this.controller_.refresh());
        }
      }, ResizeObserverSPI.prototype.unobserve = function (e) {
        if (!arguments.length)
          throw new TypeError('1 argument required, but only 0 present.');
        if ('undefined' != typeof Element && Element instanceof Object) {
          if (!(e instanceof u(e).Element))
            throw new TypeError('parameter 1 is not of type "Element".');
          var t = this.observations_;
          t.has(e) && (t.delete(e), t.size || this.controller_.removeObserver(this));
        }
      }, ResizeObserverSPI.prototype.disconnect = function () {
        this.clearActive(), this.observations_.clear(), this.controller_.removeObserver(this);
      }, ResizeObserverSPI.prototype.gatherActive = function () {
        var e = this;
        this.clearActive(), this.observations_.forEach(function (t) {
          t.isActive() && e.activeObservations_.push(t);
        });
      }, ResizeObserverSPI.prototype.broadcastActive = function () {
        if (this.hasActive()) {
          var e = this.callbackCtx_, t = this.activeObservations_.map(function (e) {
              return new y(e.target, e.broadcastRect());
            });
          this.callback_.call(e, t, e), this.clearActive();
        }
      }, ResizeObserverSPI.prototype.clearActive = function () {
        this.activeObservations_.splice(0);
      }, ResizeObserverSPI.prototype.hasActive = function () {
        return this.activeObservations_.length > 0;
      }, ResizeObserverSPI;
    }(), w = 'undefined' != typeof WeakMap ? new WeakMap() : new n(), x = function ResizeObserver(e) {
      if (!(this instanceof ResizeObserver))
        throw new TypeError('Cannot call a class as a function.');
      if (!arguments.length)
        throw new TypeError('1 argument required, but only 0 present.');
      var t = s.getInstance(), n = new C(e, t, this);
      w.set(this, n);
    };
  [
    'observe',
    'unobserve',
    'disconnect'
  ].forEach(function (e) {
    x.prototype[e] = function () {
      var t;
      return (t = w.get(this))[e].apply(t, arguments);
    };
  });
  var E = void 0 !== o.ResizeObserver ? o.ResizeObserver : x;
  t.a = E;
}.call(this, n('./26')));