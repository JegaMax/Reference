'use strict';
function r(e) {
  if (void 0 === e)
    throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
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
var a = n('./0'), i = n('./23'), l = n('./9'), s = n('./55'), c = i.isBrowser('IE <= 11');
var u = function (e) {
  var t, n;
  function DraftEditorTextNode(t) {
    var n;
    return o(r(n = e.call(this, t) || this), '_forceFlag', void 0), o(r(n), '_node', void 0), n._forceFlag = !1, n;
  }
  n = e, (t = DraftEditorTextNode).prototype = Object.create(n.prototype), t.prototype.constructor = t, t.__proto__ = n;
  var i = DraftEditorTextNode.prototype;
  return i.shouldComponentUpdate = function (e) {
    var t = this._node, n = '' === e.children;
    s(t) || l(!1);
    var r = t;
    return n ? !function (e) {
      return c ? '\n' === e.textContent : 'BR' === e.tagName;
    }(r) : r.textContent !== e.children;
  }, i.componentDidMount = function () {
    this._forceFlag = !this._forceFlag;
  }, i.componentDidUpdate = function () {
    this._forceFlag = !this._forceFlag;
  }, i.render = function () {
    var e = this;
    return '' === this.props.children ? this._forceFlag ? function NEWLINE_A(e) {
      return c ? a.createElement('span', {
        key: 'A',
        'data-text': 'true',
        ref: e
      }, '\n') : a.createElement('br', {
        key: 'A',
        'data-text': 'true',
        ref: e
      });
    }(function (t) {
      return e._node = t;
    }) : function NEWLINE_B(e) {
      return c ? a.createElement('span', {
        key: 'B',
        'data-text': 'true',
        ref: e
      }, '\n') : a.createElement('br', {
        key: 'B',
        'data-text': 'true',
        ref: e
      });
    }(function (t) {
      return e._node = t;
    }) : a.createElement('span', {
      key: this._forceFlag ? 'A' : 'B',
      'data-text': 'true',
      ref: function (t) {
        return e._node = t;
      }
    }, this.props.children);
  }, DraftEditorTextNode;
}(a.Component);
e.exports = u;