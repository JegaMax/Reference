'use strict';
Object.defineProperty(t, '__esModule', { value: !0 });
var r = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, o = 'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? 'symbol' : typeof e;
  }, a = function () {
    function e(e, t) {
      for (var n = 0; n < t.length; n++) {
        var r = t[n];
        r.enumerable = r.enumerable || !1, r.configurable = !0, 'value' in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
      }
    }
    return function (t, n, r) {
      return n && e(t.prototype, n), r && e(t, r), t;
    };
  }(), i = n('./0'), l = m(i), s = m(n('./3')), c = g(n('./285')), u = m(n('./286')), f = g(n('./170')), d = g(n('./289')), p = m(n('./122')), h = m(n('./171'));
function g(e) {
  if (e && e.__esModule)
    return e;
  var t = {};
  if (null != e)
    for (var n in e)
      Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
  return t.default = e, t;
}
function m(e) {
  return e && e.__esModule ? e : { default: e };
}
n('./290');
var b = {
    overlay: 'ReactModal__Overlay',
    content: 'ReactModal__Content'
  }, v = 0, y = function (e) {
    function ModalPortal(e) {
      !function (e, t) {
        if (!(e instanceof t))
          throw new TypeError('Cannot call a class as a function');
      }(this, ModalPortal);
      var t = function (e, t) {
        if (!e)
          throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
        return !t || 'object' != typeof t && 'function' != typeof t ? e : t;
      }(this, (ModalPortal.__proto__ || Object.getPrototypeOf(ModalPortal)).call(this, e));
      return t.setOverlayRef = function (e) {
        t.overlay = e, t.props.overlayRef && t.props.overlayRef(e);
      }, t.setContentRef = function (e) {
        t.content = e, t.props.contentRef && t.props.contentRef(e);
      }, t.afterClose = function () {
        var e = t.props, n = e.appElement, r = e.ariaHideApp, o = e.htmlOpenClassName, a = e.bodyOpenClassName;
        a && d.remove(document.body, a), o && d.remove(document.getElementsByTagName('html')[0], o), r && v > 0 && 0 === (v -= 1) && f.show(n), t.props.shouldFocusAfterRender && (t.props.shouldReturnFocusAfterClose ? (c.returnFocus(), c.teardownScopedFocus()) : c.popWithoutFocus()), t.props.onAfterClose && t.props.onAfterClose(), h.default.deregister(t);
      }, t.open = function () {
        t.beforeOpen(), t.state.afterOpen && t.state.beforeClose ? (clearTimeout(t.closeTimer), t.setState({ beforeClose: !1 })) : (t.props.shouldFocusAfterRender && (c.setupScopedFocus(t.node), c.markForFocusLater()), t.setState({ isOpen: !0 }, function () {
          t.setState({ afterOpen: !0 }), t.props.isOpen && t.props.onAfterOpen && t.props.onAfterOpen({
            overlayEl: t.overlay,
            contentEl: t.content
          });
        }));
      }, t.close = function () {
        t.props.closeTimeoutMS > 0 ? t.closeWithTimeout() : t.closeWithoutTimeout();
      }, t.focusContent = function () {
        return t.content && !t.contentHasFocus() && t.content.focus();
      }, t.closeWithTimeout = function () {
        var e = Date.now() + t.props.closeTimeoutMS;
        t.setState({
          beforeClose: !0,
          closesAt: e
        }, function () {
          t.closeTimer = setTimeout(t.closeWithoutTimeout, t.state.closesAt - Date.now());
        });
      }, t.closeWithoutTimeout = function () {
        t.setState({
          beforeClose: !1,
          isOpen: !1,
          afterOpen: !1,
          closesAt: null
        }, t.afterClose);
      }, t.handleKeyDown = function (e) {
        9 === e.keyCode && (0, u.default)(t.content, e), t.props.shouldCloseOnEsc && 27 === e.keyCode && (e.stopPropagation(), t.requestClose(e));
      }, t.handleOverlayOnClick = function (e) {
        null === t.shouldClose && (t.shouldClose = !0), t.shouldClose && t.props.shouldCloseOnOverlayClick && (t.ownerHandlesClose() ? t.requestClose(e) : t.focusContent()), t.shouldClose = null;
      }, t.handleContentOnMouseUp = function () {
        t.shouldClose = !1;
      }, t.handleOverlayOnMouseDown = function (e) {
        t.props.shouldCloseOnOverlayClick || e.target != t.overlay || e.preventDefault();
      }, t.handleContentOnClick = function () {
        t.shouldClose = !1;
      }, t.handleContentOnMouseDown = function () {
        t.shouldClose = !1;
      }, t.requestClose = function (e) {
        return t.ownerHandlesClose() && t.props.onRequestClose(e);
      }, t.ownerHandlesClose = function () {
        return t.props.onRequestClose;
      }, t.shouldBeClosed = function () {
        return !t.state.isOpen && !t.state.beforeClose;
      }, t.contentHasFocus = function () {
        return document.activeElement === t.content || t.content.contains(document.activeElement);
      }, t.buildClassName = function (e, n) {
        var r = 'object' === (void 0 === n ? 'undefined' : o(n)) ? n : {
            base: b[e],
            afterOpen: b[e] + '--after-open',
            beforeClose: b[e] + '--before-close'
          }, a = r.base;
        return t.state.afterOpen && (a = a + ' ' + r.afterOpen), t.state.beforeClose && (a = a + ' ' + r.beforeClose), 'string' == typeof n && n ? a + ' ' + n : a;
      }, t.attributesFromObject = function (e, t) {
        return Object.keys(t).reduce(function (n, r) {
          return n[e + '-' + r] = t[r], n;
        }, {});
      }, t.state = {
        afterOpen: !1,
        beforeClose: !1
      }, t.shouldClose = null, t.moveFromContentToOverlay = null, t;
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
    }(ModalPortal, e), a(ModalPortal, [
      {
        key: 'componentDidMount',
        value: function () {
          this.props.isOpen && this.open();
        }
      },
      {
        key: 'componentDidUpdate',
        value: function (e, t) {
          this.props.isOpen && !e.isOpen ? this.open() : !this.props.isOpen && e.isOpen && this.close(), this.props.shouldFocusAfterRender && this.state.isOpen && !t.isOpen && this.focusContent();
        }
      },
      {
        key: 'componentWillUnmount',
        value: function () {
          this.state.isOpen && this.afterClose(), clearTimeout(this.closeTimer);
        }
      },
      {
        key: 'beforeOpen',
        value: function () {
          var e = this.props, t = e.appElement, n = e.ariaHideApp, r = e.htmlOpenClassName, o = e.bodyOpenClassName;
          o && d.add(document.body, o), r && d.add(document.getElementsByTagName('html')[0], r), n && (v += 1, f.hide(t)), h.default.register(this);
        }
      },
      {
        key: 'render',
        value: function () {
          var e = this.props, t = e.id, n = e.className, o = e.overlayClassName, a = e.defaultStyles, i = n ? {} : a.content, s = o ? {} : a.overlay;
          return this.shouldBeClosed() ? null : l.default.createElement('div', {
            ref: this.setOverlayRef,
            className: this.buildClassName('overlay', o),
            style: r({}, s, this.props.style.overlay),
            onClick: this.handleOverlayOnClick,
            onMouseDown: this.handleOverlayOnMouseDown
          }, l.default.createElement('div', r({
            id: t,
            ref: this.setContentRef,
            style: r({}, i, this.props.style.content),
            className: this.buildClassName('content', n),
            tabIndex: '-1',
            onKeyDown: this.handleKeyDown,
            onMouseDown: this.handleContentOnMouseDown,
            onMouseUp: this.handleContentOnMouseUp,
            onClick: this.handleContentOnClick,
            role: this.props.role,
            'aria-label': this.props.contentLabel
          }, this.attributesFromObject('aria', this.props.aria || {}), this.attributesFromObject('data', this.props.data || {}), { 'data-testid': this.props.testId }), this.props.children));
        }
      }
    ]), ModalPortal;
  }(i.Component);
y.defaultProps = {
  style: {
    overlay: {},
    content: {}
  },
  defaultStyles: {}
}, y.propTypes = {
  isOpen: s.default.bool.isRequired,
  defaultStyles: s.default.shape({
    content: s.default.object,
    overlay: s.default.object
  }),
  style: s.default.shape({
    content: s.default.object,
    overlay: s.default.object
  }),
  className: s.default.oneOfType([
    s.default.string,
    s.default.object
  ]),
  overlayClassName: s.default.oneOfType([
    s.default.string,
    s.default.object
  ]),
  bodyOpenClassName: s.default.string,
  htmlOpenClassName: s.default.string,
  ariaHideApp: s.default.bool,
  appElement: s.default.instanceOf(p.default),
  onAfterOpen: s.default.func,
  onAfterClose: s.default.func,
  onRequestClose: s.default.func,
  closeTimeoutMS: s.default.number,
  shouldFocusAfterRender: s.default.bool,
  shouldCloseOnOverlayClick: s.default.bool,
  shouldReturnFocusAfterClose: s.default.bool,
  role: s.default.string,
  contentLabel: s.default.string,
  aria: s.default.object,
  data: s.default.object,
  children: s.default.node,
  shouldCloseOnEsc: s.default.bool,
  overlayRef: s.default.func,
  contentRef: s.default.func,
  id: s.default.string,
  testId: s.default.string
}, t.default = y, e.exports = t.default;