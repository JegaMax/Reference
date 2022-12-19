'use strict';
function r() {
  var e = this.constructor.getDerivedStateFromProps(this.props, this.state);
  null != e && this.setState(e);
}
function o(e) {
  this.setState(function (t) {
    var n = this.constructor.getDerivedStateFromProps(e, t);
    return null != n ? n : null;
  }.bind(this));
}
function a(e, t) {
  try {
    var n = this.props, r = this.state;
    this.props = e, this.state = t, this.__reactInternalSnapshotFlag = !0, this.__reactInternalSnapshot = this.getSnapshotBeforeUpdate(n, r);
  } finally {
    this.props = n, this.state = r;
  }
}
function i(e) {
  var t = e.prototype;
  if (!t || !t.isReactComponent)
    throw new Error('Can only polyfill class components');
  if ('function' != typeof e.getDerivedStateFromProps && 'function' != typeof t.getSnapshotBeforeUpdate)
    return e;
  var n = null, i = null, l = null;
  if ('function' == typeof t.componentWillMount ? n = 'componentWillMount' : 'function' == typeof t.UNSAFE_componentWillMount && (n = 'UNSAFE_componentWillMount'), 'function' == typeof t.componentWillReceiveProps ? i = 'componentWillReceiveProps' : 'function' == typeof t.UNSAFE_componentWillReceiveProps && (i = 'UNSAFE_componentWillReceiveProps'), 'function' == typeof t.componentWillUpdate ? l = 'componentWillUpdate' : 'function' == typeof t.UNSAFE_componentWillUpdate && (l = 'UNSAFE_componentWillUpdate'), null !== n || null !== i || null !== l) {
    var s = e.displayName || e.name, c = 'function' == typeof e.getDerivedStateFromProps ? 'getDerivedStateFromProps()' : 'getSnapshotBeforeUpdate()';
    throw Error('Unsafe legacy lifecycles will not be called for components using new component APIs.\n\n' + s + ' uses ' + c + ' but also contains the following legacy lifecycles:' + (null !== n ? '\n  ' + n : '') + (null !== i ? '\n  ' + i : '') + (null !== l ? '\n  ' + l : '') + '\n\nThe above lifecycles should be removed. Learn more about this warning here:\nhttps://fb.me/react-async-component-lifecycle-hooks');
  }
  if ('function' == typeof e.getDerivedStateFromProps && (t.componentWillMount = r, t.componentWillReceiveProps = o), 'function' == typeof t.getSnapshotBeforeUpdate) {
    if ('function' != typeof t.componentDidUpdate)
      throw new Error('Cannot polyfill getSnapshotBeforeUpdate() for components that do not define componentDidUpdate() on the prototype');
    t.componentWillUpdate = a;
    var u = t.componentDidUpdate;
    t.componentDidUpdate = function (e, t, n) {
      var r = this.__reactInternalSnapshotFlag ? this.__reactInternalSnapshot : n;
      u.call(this, e, t, r);
    };
  }
  return e;
}
n.r(t), n.d(t, 'polyfill', function () {
  return i;
}), r.__suppressDeprecationWarning = !0, o.__suppressDeprecationWarning = !0, a.__suppressDeprecationWarning = !0;