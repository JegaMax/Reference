'use strict';
Object.defineProperty(t, '__esModule', { value: !0 }), t.EditableInput = void 0;
var r = function () {
    function e(e, t) {
      for (var n = 0; n < t.length; n++) {
        var r = t[n];
        r.enumerable = r.enumerable || !1, r.configurable = !0, 'value' in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
      }
    }
    return function (t, n, r) {
      return n && e(t.prototype, n), r && e(t, r), t;
    };
  }(), o = n('./0'), a = l(o), i = l(n('./6'));
function l(e) {
  return e && e.__esModule ? e : { default: e };
}
var s = [
    38,
    40
  ], c = 1, u = t.EditableInput = function (e) {
    function EditableInput(e) {
      !function (e, t) {
        if (!(e instanceof t))
          throw new TypeError('Cannot call a class as a function');
      }(this, EditableInput);
      var t = function (e, t) {
        if (!e)
          throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
        return !t || 'object' != typeof t && 'function' != typeof t ? e : t;
      }(this, (EditableInput.__proto__ || Object.getPrototypeOf(EditableInput)).call(this));
      return t.handleBlur = function () {
        t.state.blurValue && t.setState({
          value: t.state.blurValue,
          blurValue: null
        });
      }, t.handleChange = function (e) {
        t.setUpdatedValue(e.target.value, e);
      }, t.handleKeyDown = function (e) {
        var n, r = function (e) {
            return Number(String(e).replace(/%/g, ''));
          }(e.target.value);
        if (!isNaN(r) && (n = e.keyCode, s.indexOf(n) > -1)) {
          var o = t.getArrowOffset(), a = 38 === e.keyCode ? r + o : r - o;
          t.setUpdatedValue(a, e);
        }
      }, t.handleDrag = function (e) {
        if (t.props.dragLabel) {
          var n = Math.round(t.props.value + e.movementX);
          n >= 0 && n <= t.props.dragMax && t.props.onChange && t.props.onChange(t.getValueObjectWithLabel(n), e);
        }
      }, t.handleMouseDown = function (e) {
        t.props.dragLabel && (e.preventDefault(), t.handleDrag(e), window.addEventListener('mousemove', t.handleDrag), window.addEventListener('mouseup', t.handleMouseUp));
      }, t.handleMouseUp = function () {
        t.unbindEventListeners();
      }, t.unbindEventListeners = function () {
        window.removeEventListener('mousemove', t.handleDrag), window.removeEventListener('mouseup', t.handleMouseUp);
      }, t.state = {
        value: String(e.value).toUpperCase(),
        blurValue: String(e.value).toUpperCase()
      }, t.inputId = 'rc-editable-input-' + c++, t;
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
    }(EditableInput, e), r(EditableInput, [
      {
        key: 'componentDidUpdate',
        value: function (e, t) {
          this.props.value === this.state.value || e.value === this.props.value && t.value === this.state.value || (this.input === document.activeElement ? this.setState({ blurValue: String(this.props.value).toUpperCase() }) : this.setState({
            value: String(this.props.value).toUpperCase(),
            blurValue: !this.state.blurValue && String(this.props.value).toUpperCase()
          }));
        }
      },
      {
        key: 'componentWillUnmount',
        value: function () {
          this.unbindEventListeners();
        }
      },
      {
        key: 'getValueObjectWithLabel',
        value: function (e) {
          return function (e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
              value: n,
              enumerable: !0,
              configurable: !0,
              writable: !0
            }) : e[t] = n, e;
          }({}, this.props.label, e);
        }
      },
      {
        key: 'getArrowOffset',
        value: function () {
          return this.props.arrowOffset || 1;
        }
      },
      {
        key: 'setUpdatedValue',
        value: function (e, t) {
          var n = this.props.label ? this.getValueObjectWithLabel(e) : e;
          this.props.onChange && this.props.onChange(n, t), this.setState({ value: e });
        }
      },
      {
        key: 'render',
        value: function () {
          var e = this, t = (0, i.default)({
              default: { wrap: { position: 'relative' } },
              'user-override': {
                wrap: this.props.style && this.props.style.wrap ? this.props.style.wrap : {},
                input: this.props.style && this.props.style.input ? this.props.style.input : {},
                label: this.props.style && this.props.style.label ? this.props.style.label : {}
              },
              'dragLabel-true': { label: { cursor: 'ew-resize' } }
            }, { 'user-override': !0 }, this.props);
          return a.default.createElement('div', { style: t.wrap }, a.default.createElement('input', {
            id: this.inputId,
            style: t.input,
            ref: function (t) {
              return e.input = t;
            },
            value: this.state.value,
            onKeyDown: this.handleKeyDown,
            onChange: this.handleChange,
            onBlur: this.handleBlur,
            placeholder: this.props.placeholder,
            spellCheck: 'false'
          }), this.props.label && !this.props.hideLabel ? a.default.createElement('label', {
            htmlFor: this.inputId,
            style: t.label,
            onMouseDown: this.handleMouseDown
          }, this.props.label) : null);
        }
      }
    ]), EditableInput;
  }(o.PureComponent || o.Component);
t.default = u;