'use strict';
Object.defineProperty(t, '__esModule', { value: !0 }), t.bodyOpenClassName = t.portalClassName = void 0;
var r = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, o = function () {
    function e(e, t) {
      for (var n = 0; n < t.length; n++) {
        var r = t[n];
        r.enumerable = r.enumerable || !1, r.configurable = !0, 'value' in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
      }
    }
    return function (t, n, r) {
      return n && e(t.prototype, n), r && e(t, r), t;
    };
  }(), a = n('./0'), i = h(a), l = h(n('./16')), s = h(n('./3')), c = h(n('./284')), u = function (e) {
    if (e && e.__esModule)
      return e;
    var t = {};
    if (null != e)
      for (var n in e)
        Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
    return t.default = e, t;
  }(n('./170')), f = n('./122'), d = h(f), p = n('./291');
function h(e) {
  return e && e.__esModule ? e : { default: e };
}
function g(e, t) {
  if (!(e instanceof t))
    throw new TypeError('Cannot call a class as a function');
}
function m(e, t) {
  if (!e)
    throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
  return !t || 'object' != typeof t && 'function' != typeof t ? e : t;
}
var b = t.portalClassName = 'ReactModalPortal', v = t.bodyOpenClassName = 'ReactModal__Body--open', y = void 0 !== l.default.createPortal, C = function () {
    return y ? l.default.createPortal : l.default.unstable_renderSubtreeIntoContainer;
  };
function w(e) {
  return e();
}
var x = function (e) {
  function Modal() {
    var e, t, n;
    g(this, Modal);
    for (var o = arguments.length, a = Array(o), s = 0; s < o; s++)
      a[s] = arguments[s];
    return t = n = m(this, (e = Modal.__proto__ || Object.getPrototypeOf(Modal)).call.apply(e, [this].concat(a))), n.removePortal = function () {
      !y && l.default.unmountComponentAtNode(n.node);
      var e = w(n.props.parentSelector);
      e ? e.removeChild(n.node) : console.warn('React-Modal: "parentSelector" prop did not returned any DOM element. Make sure that the parent element is unmounted to avoid any memory leaks.');
    }, n.portalRef = function (e) {
      n.portal = e;
    }, n.renderPortal = function (e) {
      var t = C()(n, i.default.createElement(c.default, r({ defaultStyles: Modal.defaultStyles }, e)), n.node);
      n.portalRef(t);
    }, m(n, t);
  }
  return function (e, t) {
    if ('function' != typeof t && null !== t)
      throw new TypeError('Super expression must either be null or a function, not ' + typeof t);
    e.prototype = Object.create(t && t.prototype, {
      constructor: {
        value: e,
        enumerable: !1,
        writable: !0,
        configurable: !0
      }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
  }(Modal, e), o(Modal, [
    {
      key: 'componentDidMount',
      value: function () {
        f.canUseDOM && (y || (this.node = document.createElement('div')), this.node.className = this.props.portalClassName, w(this.props.parentSelector).appendChild(this.node), !y && this.renderPortal(this.props));
      }
    },
    {
      key: 'getSnapshotBeforeUpdate',
      value: function (e) {
        return {
          prevParent: w(e.parentSelector),
          nextParent: w(this.props.parentSelector)
        };
      }
    },
    {
      key: 'componentDidUpdate',
      value: function (e, t, n) {
        if (f.canUseDOM) {
          var r = this.props, o = r.isOpen, a = r.portalClassName;
          e.portalClassName !== a && (this.node.className = a);
          var i = n.prevParent, l = n.nextParent;
          l !== i && (i.removeChild(this.node), l.appendChild(this.node)), (e.isOpen || o) && !y && this.renderPortal(this.props);
        }
      }
    },
    {
      key: 'componentWillUnmount',
      value: function () {
        if (f.canUseDOM && this.node && this.portal) {
          var e = this.portal.state, t = Date.now(), n = e.isOpen && this.props.closeTimeoutMS && (e.closesAt || t + this.props.closeTimeoutMS);
          n ? (e.beforeClose || this.portal.closeWithTimeout(), setTimeout(this.removePortal, n - t)) : this.removePortal();
        }
      }
    },
    {
      key: 'render',
      value: function () {
        return f.canUseDOM && y ? (!this.node && y && (this.node = document.createElement('div')), C()(i.default.createElement(c.default, r({
          ref: this.portalRef,
          defaultStyles: Modal.defaultStyles
        }, this.props)), this.node)) : null;
      }
    }
  ], [{
      key: 'setAppElement',
      value: function (e) {
        u.setElement(e);
      }
    }]), Modal;
}(a.Component);
x.propTypes = {
  isOpen: s.default.bool.isRequired,
  style: s.default.shape({
    content: s.default.object,
    overlay: s.default.object
  }),
  portalClassName: s.default.string,
  bodyOpenClassName: s.default.string,
  htmlOpenClassName: s.default.string,
  className: s.default.oneOfType([
    s.default.string,
    s.default.shape({
      base: s.default.string.isRequired,
      afterOpen: s.default.string.isRequired,
      beforeClose: s.default.string.isRequired
    })
  ]),
  overlayClassName: s.default.oneOfType([
    s.default.string,
    s.default.shape({
      base: s.default.string.isRequired,
      afterOpen: s.default.string.isRequired,
      beforeClose: s.default.string.isRequired
    })
  ]),
  appElement: s.default.instanceOf(d.default),
  onAfterOpen: s.default.func,
  onRequestClose: s.default.func,
  closeTimeoutMS: s.default.number,
  ariaHideApp: s.default.bool,
  shouldFocusAfterRender: s.default.bool,
  shouldCloseOnOverlayClick: s.default.bool,
  shouldReturnFocusAfterClose: s.default.bool,
  parentSelector: s.default.func,
  aria: s.default.object,
  data: s.default.object,
  role: s.default.string,
  contentLabel: s.default.string,
  shouldCloseOnEsc: s.default.bool,
  overlayRef: s.default.func,
  contentRef: s.default.func
}, x.defaultProps = {
  isOpen: !1,
  portalClassName: b,
  bodyOpenClassName: v,
  role: 'dialog',
  ariaHideApp: !0,
  closeTimeoutMS: 0,
  shouldFocusAfterRender: !0,
  shouldCloseOnEsc: !0,
  shouldCloseOnOverlayClick: !0,
  shouldReturnFocusAfterClose: !0,
  parentSelector: function () {
    return document.body;
  }
}, x.defaultStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.75)'
  },
  content: {
    position: 'absolute',
    top: '40px',
    left: '40px',
    right: '40px',
    bottom: '40px',
    border: '1px solid #ccc',
    background: '#fff',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '4px',
    outline: 'none',
    padding: '20px'
  }
}, (0, p.polyfill)(x), t.default = x;