'use strict';
(function (t) {
  var r = n('./34');
  function o() {
    return (o = r || function (e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t];
        for (var r in n)
          Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
      }
      return e;
    }).apply(this, arguments);
  }
  function a(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = null != arguments[t] ? arguments[t] : {}, r = Object.keys(n);
      'function' == typeof Object.getOwnPropertySymbols && (r = r.concat(Object.getOwnPropertySymbols(n).filter(function (e) {
        return Object.getOwnPropertyDescriptor(n, e).enumerable;
      }))), r.forEach(function (t) {
        l(e, t, n[t]);
      });
    }
    return e;
  }
  function i(e) {
    if (void 0 === e)
      throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
    return e;
  }
  function l(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
      value: n,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[t] = n, e;
  }
  function s(e, t) {
    e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.__proto__ = t;
  }
  var c = n('./156'), u = n('./235'), f = n('./497'), d = n('./504'), p = n('./521'), h = n('./524'), g = n('./559'), m = n('./560'), b = n('./247'), v = n('./11'), y = n('./0'), C = n('./159'), w = n('./112'), x = n('./23'), E = n('./54'), _ = n('./39'), O = n('./263'), S = n('./113'), k = n('./44'), A = n('./9'), j = n('./77'), M = n('./22'), I = x.isBrowser('IE'), T = !I, P = {
      edit: h,
      composite: f,
      drag: p,
      cut: null,
      render: null
    }, D = !1, R = function (e) {
      function UpdateDraftEditorFlags() {
        return e.apply(this, arguments) || this;
      }
      s(UpdateDraftEditorFlags, e);
      var t = UpdateDraftEditorFlags.prototype;
      return t.render = function () {
        return null;
      }, t.componentDidMount = function () {
        this._update();
      }, t.componentDidUpdate = function () {
        this._update();
      }, t._update = function () {
        var e = this.props.editor;
        e._latestEditorState = this.props.editorState, e._blockSelectEvents = !0;
      }, UpdateDraftEditorFlags;
    }(y.Component), N = function (e) {
      function DraftEditor(t) {
        var n;
        return l(i(n = e.call(this, t) || this), '_blockSelectEvents', void 0), l(i(n), '_clipboard', void 0), l(i(n), '_handler', void 0), l(i(n), '_dragCount', void 0), l(i(n), '_internalDrag', void 0), l(i(n), '_editorKey', void 0), l(i(n), '_placeholderAccessibilityID', void 0), l(i(n), '_latestEditorState', void 0), l(i(n), '_latestCommittedEditorState', void 0), l(i(n), '_pendingStateFromBeforeInput', void 0), l(i(n), '_onBeforeInput', void 0), l(i(n), '_onBlur', void 0), l(i(n), '_onCharacterData', void 0), l(i(n), '_onCompositionEnd', void 0), l(i(n), '_onCompositionStart', void 0), l(i(n), '_onCopy', void 0), l(i(n), '_onCut', void 0), l(i(n), '_onDragEnd', void 0), l(i(n), '_onDragOver', void 0), l(i(n), '_onDragStart', void 0), l(i(n), '_onDrop', void 0), l(i(n), '_onInput', void 0), l(i(n), '_onFocus', void 0), l(i(n), '_onKeyDown', void 0), l(i(n), '_onKeyPress', void 0), l(i(n), '_onKeyUp', void 0), l(i(n), '_onMouseDown', void 0), l(i(n), '_onMouseUp', void 0), l(i(n), '_onPaste', void 0), l(i(n), '_onSelect', void 0), l(i(n), 'editor', void 0), l(i(n), 'editorContainer', void 0), l(i(n), 'focus', void 0), l(i(n), 'blur', void 0), l(i(n), 'setMode', void 0), l(i(n), 'exitCurrentMode', void 0), l(i(n), 'restoreEditorDOM', void 0), l(i(n), 'setClipboard', void 0), l(i(n), 'getClipboard', void 0), l(i(n), 'getEditorKey', void 0), l(i(n), 'update', void 0), l(i(n), 'onDragEnter', void 0), l(i(n), 'onDragLeave', void 0), l(i(n), '_handleEditorContainerRef', function (e) {
          n.editorContainer = e, n.editor = null !== e ? e.firstChild : null;
        }), l(i(n), 'focus', function (e) {
          var t = n.props.editorState, r = t.getSelection().getHasFocus(), o = n.editor;
          if (o) {
            var a = w.getScrollParent(o), i = e || S(a), l = i.x, s = i.y;
            j(o) || A(!1), o.focus(), a === window ? window.scrollTo(l, s) : C.setTop(a, s), r || n.update(v.forceSelection(t, t.getSelection()));
          }
        }), l(i(n), 'blur', function () {
          var e = n.editor;
          e && (j(e) || A(!1), e.blur());
        }), l(i(n), 'setMode', function (e) {
          var t = n.props, r = t.onPaste, o = t.onCut, i = t.onCopy, l = a({}, P.edit);
          r && (l.onPaste = r), o && (l.onCut = o), i && (l.onCopy = i);
          var s = a({}, P, { edit: l });
          n._handler = s[e];
        }), l(i(n), 'exitCurrentMode', function () {
          n.setMode('edit');
        }), l(i(n), 'restoreEditorDOM', function (e) {
          n.setState({ contentsKey: n.state.contentsKey + 1 }, function () {
            n.focus(e);
          });
        }), l(i(n), 'setClipboard', function (e) {
          n._clipboard = e;
        }), l(i(n), 'getClipboard', function () {
          return n._clipboard;
        }), l(i(n), 'update', function (e) {
          n._latestEditorState = e, n.props.onChange(e);
        }), l(i(n), 'onDragEnter', function () {
          n._dragCount++;
        }), l(i(n), 'onDragLeave', function () {
          n._dragCount--, 0 === n._dragCount && n.exitCurrentMode();
        }), n._blockSelectEvents = !1, n._clipboard = null, n._handler = null, n._dragCount = 0, n._editorKey = t.editorKey || _(), n._placeholderAccessibilityID = 'placeholder-' + n._editorKey, n._latestEditorState = t.editorState, n._latestCommittedEditorState = t.editorState, n._onBeforeInput = n._buildHandler('onBeforeInput'), n._onBlur = n._buildHandler('onBlur'), n._onCharacterData = n._buildHandler('onCharacterData'), n._onCompositionEnd = n._buildHandler('onCompositionEnd'), n._onCompositionStart = n._buildHandler('onCompositionStart'), n._onCopy = n._buildHandler('onCopy'), n._onCut = n._buildHandler('onCut'), n._onDragEnd = n._buildHandler('onDragEnd'), n._onDragOver = n._buildHandler('onDragOver'), n._onDragStart = n._buildHandler('onDragStart'), n._onDrop = n._buildHandler('onDrop'), n._onInput = n._buildHandler('onInput'), n._onFocus = n._buildHandler('onFocus'), n._onKeyDown = n._buildHandler('onKeyDown'), n._onKeyPress = n._buildHandler('onKeyPress'), n._onKeyUp = n._buildHandler('onKeyUp'), n._onMouseDown = n._buildHandler('onMouseDown'), n._onMouseUp = n._buildHandler('onMouseUp'), n._onPaste = n._buildHandler('onPaste'), n._onSelect = n._buildHandler('onSelect'), n.getEditorKey = function () {
          return n._editorKey;
        }, n.state = { contentsKey: 0 }, n;
      }
      s(DraftEditor, e);
      var n = DraftEditor.prototype;
      return n._buildHandler = function (e) {
        var t = this;
        return function (n) {
          if (!t.props.readOnly) {
            var r = t._handler && t._handler[e];
            r && (g ? g(function () {
              return r(t, n);
            }) : r(t, n));
          }
        };
      }, n._showPlaceholder = function () {
        return !!this.props.placeholder && !this.props.editorState.isInCompositionMode() && !this.props.editorState.getCurrentContent().hasText();
      }, n._renderPlaceholder = function () {
        if (this._showPlaceholder()) {
          var e = {
            text: M(this.props.placeholder),
            editorState: this.props.editorState,
            textAlignment: this.props.textAlignment,
            accessibilityID: this._placeholderAccessibilityID
          };
          return y.createElement(m, e);
        }
        return null;
      }, n._renderARIADescribedBy = function () {
        var e = this.props.ariaDescribedBy || '', t = this._showPlaceholder() ? this._placeholderAccessibilityID : '';
        return e.replace('{{editor_id_placeholder}}', t) || void 0;
      }, n.render = function () {
        var e = this.props, t = e.blockRenderMap, n = e.blockRendererFn, r = e.blockStyleFn, i = e.customStyleFn, l = e.customStyleMap, s = e.editorState, c = e.preventScroll, f = e.readOnly, p = e.textAlignment, h = e.textDirectionality, g = E({
            'DraftEditor/root': !0,
            'DraftEditor/alignLeft': 'left' === p,
            'DraftEditor/alignRight': 'right' === p,
            'DraftEditor/alignCenter': 'center' === p
          }), m = this.props.role || 'textbox', b = 'combobox' === m ? !!this.props.ariaExpanded : null, v = {
            blockRenderMap: t,
            blockRendererFn: n,
            blockStyleFn: r,
            customStyleMap: a({}, u, l),
            customStyleFn: i,
            editorKey: this._editorKey,
            editorState: s,
            preventScroll: c,
            textDirectionality: h
          };
        return y.createElement('div', { className: g }, this._renderPlaceholder(), y.createElement('div', {
          className: E('DraftEditor/editorContainer'),
          ref: this._handleEditorContainerRef
        }, y.createElement('div', {
          'aria-activedescendant': f ? null : this.props.ariaActiveDescendantID,
          'aria-autocomplete': f ? null : this.props.ariaAutoComplete,
          'aria-controls': f ? null : this.props.ariaControls,
          'aria-describedby': this._renderARIADescribedBy(),
          'aria-expanded': f ? null : b,
          'aria-label': this.props.ariaLabel,
          'aria-labelledby': this.props.ariaLabelledBy,
          'aria-multiline': this.props.ariaMultiline,
          'aria-owns': f ? null : this.props.ariaOwneeID,
          autoCapitalize: this.props.autoCapitalize,
          autoComplete: this.props.autoComplete,
          autoCorrect: this.props.autoCorrect,
          className: E({
            notranslate: !f,
            'public/DraftEditor/content': !0
          }),
          contentEditable: !f,
          'data-testid': this.props.webDriverTestID,
          onBeforeInput: this._onBeforeInput,
          onBlur: this._onBlur,
          onCompositionEnd: this._onCompositionEnd,
          onCompositionStart: this._onCompositionStart,
          onCopy: this._onCopy,
          onCut: this._onCut,
          onDragEnd: this._onDragEnd,
          onDragEnter: this.onDragEnter,
          onDragLeave: this.onDragLeave,
          onDragOver: this._onDragOver,
          onDragStart: this._onDragStart,
          onDrop: this._onDrop,
          onFocus: this._onFocus,
          onInput: this._onInput,
          onKeyDown: this._onKeyDown,
          onKeyPress: this._onKeyPress,
          onKeyUp: this._onKeyUp,
          onMouseUp: this._onMouseUp,
          onPaste: this._onPaste,
          onSelect: this._onSelect,
          ref: this.props.editorRef,
          role: f ? null : m,
          spellCheck: T && this.props.spellCheck,
          style: {
            outline: 'none',
            userSelect: 'text',
            WebkitUserSelect: 'text',
            whiteSpace: 'pre-wrap',
            wordWrap: 'break-word'
          },
          suppressContentEditableWarning: !0,
          tabIndex: this.props.tabIndex
        }, y.createElement(R, {
          editor: this,
          editorState: s
        }), y.createElement(d, o({}, v, { key: 'contents' + this.state.contentsKey })))));
      }, n.componentDidMount = function () {
        this._blockSelectEvents = !1, !D && k('draft_ods_enabled') && (D = !0, b.initODS()), this.setMode('edit'), I && (this.editor ? this.editor.ownerDocument.execCommand('AutoUrlDetect', !1, !1) : t.execCommand('AutoUrlDetect', !1, !1));
      }, n.componentDidUpdate = function () {
        this._blockSelectEvents = !1, this._latestEditorState = this.props.editorState, this._latestCommittedEditorState = this.props.editorState;
      }, DraftEditor;
    }(y.Component);
  l(N, 'defaultProps', {
    ariaDescribedBy: '{{editor_id_placeholder}}',
    blockRenderMap: c,
    blockRendererFn: function () {
      return null;
    },
    blockStyleFn: function () {
      return '';
    },
    keyBindingFn: O,
    readOnly: !1,
    spellCheck: !1,
    stripPastedStyles: !1
  }), e.exports = N;
}.call(this, n('./26')));