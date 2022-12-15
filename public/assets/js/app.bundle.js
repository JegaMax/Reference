(() => {
    var __defineProperty = Object.defineProperty;
    var __hasOwnProperty = Object.prototype.hasOwnProperty;
    var __commonJS = (callback, module) => () => {
        if (!module) {
            module = {
                exports: {}
            };
            callback(module.exports, module);
        }
        return module.exports;
    };
    var __markAsModule = (target) => {
        return __defineProperty(target, "__esModule", {
            value: true
        });
    };
    var __exportStar = (target, module) => {
        __markAsModule(target);
        if (typeof module === "object" || typeof module === "function") {
            for (let key in module)
                if (!__hasOwnProperty.call(target, key) && key !== "default")
                    __defineProperty(target, key, {
                        get: () => module[key],
                        enumerable: true
                    });
        }
        return target;
    };
    var __toModule = (module) => {
        if (module && module.__esModule)
            return module;
        return __exportStar(__defineProperty({}, "default", {
            value: module,
            enumerable: true
        }), module);
    };

    // node_modules/clipboard/dist/clipboard.js
    var require_clipboard = __commonJS((exports, module) => {
        /*!
         * clipboard.js v2.0.6
         * https://clipboardjs.com/
         * 
         * Licensed MIT © Zeno Rocha
         */
        (function webpackUniversalModuleDefinition(root, factory) {
            if (typeof exports === "object" && typeof module === "object")
                module.exports = factory();
            else if (typeof define === "function" && define.amd)
                define([], factory);
            else if (typeof exports === "object")
                exports["ClipboardJS"] = factory();
            else
                root["ClipboardJS"] = factory();
        })(exports, function() {
            return function(modules) {
                var installedModules = {};

                function __webpack_require__(moduleId) {
                    if (installedModules[moduleId]) {
                        return installedModules[moduleId].exports;
                    }
                    var module2 = installedModules[moduleId] = {
                        i: moduleId,
                        l: false,
                        exports: {}
                    };
                    modules[moduleId].call(module2.exports, module2, module2.exports, __webpack_require__);
                    module2.l = true;
                    return module2.exports;
                }
                __webpack_require__.m = modules;
                __webpack_require__.c = installedModules;
                __webpack_require__.d = function(exports2, name2, getter) {
                    if (!__webpack_require__.o(exports2, name2)) {
                        Object.defineProperty(exports2, name2, {
                            enumerable: true,
                            get: getter
                        });
                    }
                };
                __webpack_require__.r = function(exports2) {
                    if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
                        Object.defineProperty(exports2, Symbol.toStringTag, {
                            value: "Module"
                        });
                    }
                    Object.defineProperty(exports2, "__esModule", {
                        value: true
                    });
                };
                __webpack_require__.t = function(value, mode) {
                    if (mode & 1)
                        value = __webpack_require__(value);
                    if (mode & 8)
                        return value;
                    if (mode & 4 && typeof value === "object" && value && value.__esModule)
                        return value;
                    var ns = Object.create(null);
                    __webpack_require__.r(ns);
                    Object.defineProperty(ns, "default", {
                        enumerable: true,
                        value
                    });
                    if (mode & 2 && typeof value != "string")
                        for (var key in value)
                            __webpack_require__.d(ns, key, function(key2) {
                                return value[key2];
                            }.bind(null, key));
                    return ns;
                };
                __webpack_require__.n = function(module2) {
                    var getter = module2 && module2.__esModule ? function getDefault() {
                        return module2["default"];
                    } : function getModuleExports() {
                        return module2;
                    };
                    __webpack_require__.d(getter, "a", getter);
                    return getter;
                };
                __webpack_require__.o = function(object, property) {
                    return Object.prototype.hasOwnProperty.call(object, property);
                };
                __webpack_require__.p = "";
                return __webpack_require__(__webpack_require__.s = 6);
            }([
                function(module2, exports2) {
                    function select(element) {
                        var selectedText;
                        if (element.nodeName === "SELECT") {
                            element.focus();
                            selectedText = element.value;
                        } else if (element.nodeName === "INPUT" || element.nodeName === "TEXTAREA") {
                            var isReadOnly = element.hasAttribute("readonly");
                            if (!isReadOnly) {
                                element.setAttribute("readonly", "");
                            }
                            element.select();
                            element.setSelectionRange(0, element.value.length);
                            if (!isReadOnly) {
                                element.removeAttribute("readonly");
                            }
                            selectedText = element.value;
                        } else {
                            if (element.hasAttribute("contenteditable")) {
                                element.focus();
                            }
                            var selection = window.getSelection();
                            var range = document.createRange();
                            range.selectNodeContents(element);
                            selection.removeAllRanges();
                            selection.addRange(range);
                            selectedText = selection.toString();
                        }
                        return selectedText;
                    }
                    module2.exports = select;
                },
                function(module2, exports2) {
                    function E() {}
                    E.prototype = {
                        on: function(name2, callback, ctx) {
                            var e = this.e || (this.e = {});
                            (e[name2] || (e[name2] = [])).push({
                                fn: callback,
                                ctx
                            });
                            return this;
                        },
                        once: function(name2, callback, ctx) {
                            var self2 = this;

                            function listener() {
                                self2.off(name2, listener);
                                callback.apply(ctx, arguments);
                            };
                            listener._ = callback;
                            return this.on(name2, listener, ctx);
                        },
                        emit: function(name2) {
                            var data = [].slice.call(arguments, 1);
                            var evtArr = ((this.e || (this.e = {}))[name2] || []).slice();
                            var i = 0;
                            var len = evtArr.length;
                            for (i; i < len; i++) {
                                evtArr[i].fn.apply(evtArr[i].ctx, data);
                            }
                            return this;
                        },
                        off: function(name2, callback) {
                            var e = this.e || (this.e = {});
                            var evts = e[name2];
                            var liveEvents = [];
                            if (evts && callback) {
                                for (var i = 0, len = evts.length; i < len; i++) {
                                    if (evts[i].fn !== callback && evts[i].fn._ !== callback)
                                        liveEvents.push(evts[i]);
                                }
                            }
                            liveEvents.length ? e[name2] = liveEvents : delete e[name2];
                            return this;
                        }
                    };
                    module2.exports = E;
                    module2.exports.TinyEmitter = E;
                },
                function(module2, exports2, __webpack_require__) {
                    var is = __webpack_require__(3);
                    var delegate = __webpack_require__(4);

                    function listen(target, type, callback) {
                        if (!target && !type && !callback) {
                            throw new Error("Missing required arguments");
                        }
                        if (!is.string(type)) {
                            throw new TypeError("Second argument must be a String");
                        }
                        if (!is.fn(callback)) {
                            throw new TypeError("Third argument must be a Function");
                        }
                        if (is.node(target)) {
                            return listenNode(target, type, callback);
                        } else if (is.nodeList(target)) {
                            return listenNodeList(target, type, callback);
                        } else if (is.string(target)) {
                            return listenSelector(target, type, callback);
                        } else {
                            throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList");
                        }
                    }

                    function listenNode(node, type, callback) {
                        node.addEventListener(type, callback);
                        return {
                            destroy: function() {
                                node.removeEventListener(type, callback);
                            }
                        };
                    }

                    function listenNodeList(nodeList, type, callback) {
                        Array.prototype.forEach.call(nodeList, function(node) {
                            node.addEventListener(type, callback);
                        });
                        return {
                            destroy: function() {
                                Array.prototype.forEach.call(nodeList, function(node) {
                                    node.removeEventListener(type, callback);
                                });
                            }
                        };
                    }

                    function listenSelector(selector, type, callback) {
                        return delegate(document.body, selector, type, callback);
                    }
                    module2.exports = listen;
                },
                function(module2, exports2) {
                    exports2.node = function(value) {
                        return value !== void 0 && value instanceof HTMLElement && value.nodeType === 1;
                    };
                    exports2.nodeList = function(value) {
                        var type = Object.prototype.toString.call(value);
                        return value !== void 0 && (type === "[object NodeList]" || type === "[object HTMLCollection]") && "length" in value && (value.length === 0 || exports2.node(value[0]));
                    };
                    exports2.string = function(value) {
                        return typeof value === "string" || value instanceof String;
                    };
                    exports2.fn = function(value) {
                        var type = Object.prototype.toString.call(value);
                        return type === "[object Function]";
                    };
                },
                function(module2, exports2, __webpack_require__) {
                    var closest = __webpack_require__(5);

                    function _delegate(element, selector, type, callback, useCapture) {
                        var listenerFn = listener.apply(this, arguments);
                        element.addEventListener(type, listenerFn, useCapture);
                        return {
                            destroy: function() {
                                element.removeEventListener(type, listenerFn, useCapture);
                            }
                        };
                    }

                    function delegate(elements, selector, type, callback, useCapture) {
                        if (typeof elements.addEventListener === "function") {
                            return _delegate.apply(null, arguments);
                        }
                        if (typeof type === "function") {
                            return _delegate.bind(null, document).apply(null, arguments);
                        }
                        if (typeof elements === "string") {
                            elements = document.querySelectorAll(elements);
                        }
                        return Array.prototype.map.call(elements, function(element) {
                            return _delegate(element, selector, type, callback, useCapture);
                        });
                    }

                    function listener(element, selector, type, callback) {
                        return function(e) {
                            e.delegateTarget = closest(e.target, selector);
                            if (e.delegateTarget) {
                                callback.call(element, e);
                            }
                        };
                    }
                    module2.exports = delegate;
                },
                function(module2, exports2) {
                    var DOCUMENT_NODE_TYPE = 9;
                    if (typeof Element !== "undefined" && !Element.prototype.matches) {
                        var proto = Element.prototype;
                        proto.matches = proto.matchesSelector || proto.mozMatchesSelector || proto.msMatchesSelector || proto.oMatchesSelector || proto.webkitMatchesSelector;
                    }

                    function closest(element, selector) {
                        while (element && element.nodeType !== DOCUMENT_NODE_TYPE) {
                            if (typeof element.matches === "function" && element.matches(selector)) {
                                return element;
                            }
                            element = element.parentNode;
                        }
                    }
                    module2.exports = closest;
                },
                function(module2, __webpack_exports__, __webpack_require__) {
                    "use strict";
                    __webpack_require__.r(__webpack_exports__);
                    var src_select = __webpack_require__(0);
                    var select_default = /* @__PURE__ */ __webpack_require__.n(src_select);
                    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
                        return typeof obj;
                    } : function(obj) {
                        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
                    };
                    var _createClass = function() {
                        function defineProperties(target, props) {
                            for (var i = 0; i < props.length; i++) {
                                var descriptor = props[i];
                                descriptor.enumerable = descriptor.enumerable || false;
                                descriptor.configurable = true;
                                if ("value" in descriptor)
                                    descriptor.writable = true;
                                Object.defineProperty(target, descriptor.key, descriptor);
                            }
                        }
                        return function(Constructor, protoProps, staticProps) {
                            if (protoProps)
                                defineProperties(Constructor.prototype, protoProps);
                            if (staticProps)
                                defineProperties(Constructor, staticProps);
                            return Constructor;
                        };
                    }();

                    function _classCallCheck(instance, Constructor) {
                        if (!(instance instanceof Constructor)) {
                            throw new TypeError("Cannot call a class as a function");
                        }
                    }
                    var clipboard_action_ClipboardAction = function() {
                        function ClipboardAction(options) {
                            _classCallCheck(this, ClipboardAction);
                            this.resolveOptions(options);
                            this.initSelection();
                        }
                        _createClass(ClipboardAction, [{
                            key: "resolveOptions",
                            value: function resolveOptions() {
                                var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
                                this.action = options.action;
                                this.container = options.container;
                                this.emitter = options.emitter;
                                this.target = options.target;
                                this.text = options.text;
                                this.trigger = options.trigger;
                                this.selectedText = "";
                            }
                        }, {
                            key: "initSelection",
                            value: function initSelection() {
                                if (this.text) {
                                    this.selectFake();
                                } else if (this.target) {
                                    this.selectTarget();
                                }
                            }
                        }, {
                            key: "selectFake",
                            value: function selectFake() {
                                var _this = this;
                                var isRTL = document.documentElement.getAttribute("dir") == "rtl";
                                this.removeFake();
                                this.fakeHandlerCallback = function() {
                                    return _this.removeFake();
                                };
                                this.fakeHandler = this.container.addEventListener("click", this.fakeHandlerCallback) || true;
                                this.fakeElem = document.createElement("textarea");
                                this.fakeElem.style.fontSize = "12pt";
                                this.fakeElem.style.border = "0";
                                this.fakeElem.style.padding = "0";
                                this.fakeElem.style.margin = "0";
                                this.fakeElem.style.position = "absolute";
                                this.fakeElem.style[isRTL ? "right" : "left"] = "-9999px";
                                var yPosition = window.pageYOffset || document.documentElement.scrollTop;
                                this.fakeElem.style.top = yPosition + "px";
                                this.fakeElem.setAttribute("readonly", "");
                                this.fakeElem.value = this.text;
                                this.container.appendChild(this.fakeElem);
                                this.selectedText = select_default()(this.fakeElem);
                                this.copyText();
                            }
                        }, {
                            key: "removeFake",
                            value: function removeFake() {
                                if (this.fakeHandler) {
                                    this.container.removeEventListener("click", this.fakeHandlerCallback);
                                    this.fakeHandler = null;
                                    this.fakeHandlerCallback = null;
                                }
                                if (this.fakeElem) {
                                    this.container.removeChild(this.fakeElem);
                                    this.fakeElem = null;
                                }
                            }
                        }, {
                            key: "selectTarget",
                            value: function selectTarget() {
                                this.selectedText = select_default()(this.target);
                                this.copyText();
                            }
                        }, {
                            key: "copyText",
                            value: function copyText() {
                                var succeeded = void 0;
                                try {
                                    succeeded = document.execCommand(this.action);
                                } catch (err) {
                                    succeeded = false;
                                }
                                this.handleResult(succeeded);
                            }
                        }, {
                            key: "handleResult",
                            value: function handleResult(succeeded) {
                                this.emitter.emit(succeeded ? "success" : "error", {
                                    action: this.action,
                                    text: this.selectedText,
                                    trigger: this.trigger,
                                    clearSelection: this.clearSelection.bind(this)
                                });
                            }
                        }, {
                            key: "clearSelection",
                            value: function clearSelection() {
                                if (this.trigger) {
                                    this.trigger.focus();
                                }
                                document.activeElement.blur();
                                window.getSelection().removeAllRanges();
                            }
                        }, {
                            key: "destroy",
                            value: function destroy() {
                                this.removeFake();
                            }
                        }, {
                            key: "action",
                            set: function set() {
                                var action = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "copy";
                                this._action = action;
                                if (this._action !== "copy" && this._action !== "cut") {
                                    throw new Error('Invalid "action" value, use either "copy" or "cut"');
                                }
                            },
                            get: function get() {
                                return this._action;
                            }
                        }, {
                            key: "target",
                            set: function set(target) {
                                if (target !== void 0) {
                                    if (target && (typeof target === "undefined" ? "undefined" : _typeof(target)) === "object" && target.nodeType === 1) {
                                        if (this.action === "copy" && target.hasAttribute("disabled")) {
                                            throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
                                        }
                                        if (this.action === "cut" && (target.hasAttribute("readonly") || target.hasAttribute("disabled"))) {
                                            throw new Error(`Invalid "target" attribute. You can't cut text from elements with "readonly" or "disabled" attributes`);
                                        }
                                        this._target = target;
                                    } else {
                                        throw new Error('Invalid "target" value, use a valid Element');
                                    }
                                }
                            },
                            get: function get() {
                                return this._target;
                            }
                        }]);
                        return ClipboardAction;
                    }();
                    var clipboard_action = clipboard_action_ClipboardAction;
                    var tiny_emitter = __webpack_require__(1);
                    var tiny_emitter_default = /* @__PURE__ */ __webpack_require__.n(tiny_emitter);
                    var listen = __webpack_require__(2);
                    var listen_default = /* @__PURE__ */ __webpack_require__.n(listen);
                    var clipboard_typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
                        return typeof obj;
                    } : function(obj) {
                        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
                    };
                    var clipboard_createClass = function() {
                        function defineProperties(target, props) {
                            for (var i = 0; i < props.length; i++) {
                                var descriptor = props[i];
                                descriptor.enumerable = descriptor.enumerable || false;
                                descriptor.configurable = true;
                                if ("value" in descriptor)
                                    descriptor.writable = true;
                                Object.defineProperty(target, descriptor.key, descriptor);
                            }
                        }
                        return function(Constructor, protoProps, staticProps) {
                            if (protoProps)
                                defineProperties(Constructor.prototype, protoProps);
                            if (staticProps)
                                defineProperties(Constructor, staticProps);
                            return Constructor;
                        };
                    }();

                    function clipboard_classCallCheck(instance, Constructor) {
                        if (!(instance instanceof Constructor)) {
                            throw new TypeError("Cannot call a class as a function");
                        }
                    }

                    function _possibleConstructorReturn(self2, call) {
                        if (!self2) {
                            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        }
                        return call && (typeof call === "object" || typeof call === "function") ? call : self2;
                    }

                    function _inherits(subClass, superClass) {
                        if (typeof superClass !== "function" && superClass !== null) {
                            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
                        }
                        subClass.prototype = Object.create(superClass && superClass.prototype, {
                            constructor: {
                                value: subClass,
                                enumerable: false,
                                writable: true,
                                configurable: true
                            }
                        });
                        if (superClass)
                            Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
                    }
                    var clipboard_Clipboard = function(_Emitter) {
                        _inherits(Clipboard, _Emitter);

                        function Clipboard(trigger, options) {
                            clipboard_classCallCheck(this, Clipboard);
                            var _this = _possibleConstructorReturn(this, (Clipboard.__proto__ || Object.getPrototypeOf(Clipboard)).call(this));
                            _this.resolveOptions(options);
                            _this.listenClick(trigger);
                            return _this;
                        }
                        clipboard_createClass(Clipboard, [{
                            key: "resolveOptions",
                            value: function resolveOptions() {
                                var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
                                this.action = typeof options.action === "function" ? options.action : this.defaultAction;
                                this.target = typeof options.target === "function" ? options.target : this.defaultTarget;
                                this.text = typeof options.text === "function" ? options.text : this.defaultText;
                                this.container = clipboard_typeof(options.container) === "object" ? options.container : document.body;
                            }
                        }, {
                            key: "listenClick",
                            value: function listenClick(trigger) {
                                var _this2 = this;
                                this.listener = listen_default()(trigger, "click", function(e) {
                                    return _this2.onClick(e);
                                });
                            }
                        }, {
                            key: "onClick",
                            value: function onClick(e) {
                                var trigger = e.delegateTarget || e.currentTarget;
                                if (this.clipboardAction) {
                                    this.clipboardAction = null;
                                }
                                this.clipboardAction = new clipboard_action({
                                    action: this.action(trigger),
                                    target: this.target(trigger),
                                    text: this.text(trigger),
                                    container: this.container,
                                    trigger,
                                    emitter: this
                                });
                            }
                        }, {
                            key: "defaultAction",
                            value: function defaultAction(trigger) {
                                return getAttributeValue("action", trigger);
                            }
                        }, {
                            key: "defaultTarget",
                            value: function defaultTarget(trigger) {
                                var selector = getAttributeValue("target", trigger);
                                if (selector) {
                                    return document.querySelector(selector);
                                }
                            }
                        }, {
                            key: "defaultText",
                            value: function defaultText(trigger) {
                                return getAttributeValue("text", trigger);
                            }
                        }, {
                            key: "destroy",
                            value: function destroy() {
                                this.listener.destroy();
                                if (this.clipboardAction) {
                                    this.clipboardAction.destroy();
                                    this.clipboardAction = null;
                                }
                            }
                        }], [{
                            key: "isSupported",
                            value: function isSupported() {
                                var action = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : ["copy", "cut"];
                                var actions = typeof action === "string" ? [action] : action;
                                var support = !!document.queryCommandSupported;
                                actions.forEach(function(action2) {
                                    support = support && !!document.queryCommandSupported(action2);
                                });
                                return support;
                            }
                        }]);
                        return Clipboard;
                    }(tiny_emitter_default.a);

                    function getAttributeValue(suffix, element) {
                        var attribute = "data-clipboard-" + suffix;
                        if (!element.hasAttribute(attribute)) {
                            return;
                        }
                        return element.getAttribute(attribute);
                    }
                    var clipboard2 = __webpack_exports__["default"] = clipboard_Clipboard;
                }
            ])["default"];
        });
    });

    // www/src/assets/editor/templates/blank.json
    var require_blank = __commonJS((exports, module) => {
        module.exports = {
            body: {
                id: 22,
                date: "2020-10-16T03:01:43",
                date_gmt: "2020-10-16T03:01:43",
                guid: {
                    rendered: "http://localhost:8899/?post_type=web-story&p=22",
                    raw: "http://localhost:8899/?post_type=web-story&p=22"
                },
                modified: "2020-10-16T03:01:43",
                modified_gmt: "2020-10-16T03:01:43",
                password: "",
                slug: "",
                status: "auto-draft",
                type: "web-story",
                link: "http://localhost:8899/?post_type=web-story&p=22",
                title: {
                    raw: "",
                    rendered: ""
                },
                content: {
                    raw: "",
                    rendered: "",
                    protected: false,
                    block_version: 0
                },
                excerpt: {
                    raw: "",
                    rendered: "",
                    protected: false
                },
                author: 1,
                featured_media: 0,
                template: "",
                permalink_template: "http://localhost:8899/web-stories/%pagename%",
                generated_slug: "22",
                story_data: [],
                featured_media_url: "",
                publisher_logo_url: null,
                style_presets: {
                    colors: [],
                    textStyles: []
                }
            }
        };
    });

    // node_modules/html2canvas/dist/html2canvas.js
    var require_html2canvas = __commonJS((exports, module) => {
        /*!
         * html2canvas 1.0.0-rc.7 <https://html2canvas.hertzen.com>
         * Copyright (c) 2020 Niklas von Hertzen <https://hertzen.com>
         * Released under MIT License
         */
        (function(global, factory) {
            typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global = global || self, global.html2canvas = factory());
        })(exports, function() {
            "use strict";
            /*! *****************************************************************************
                Copyright (c) Microsoft Corporation. All rights reserved.
                Licensed under the Apache License, Version 2.0 (the "License"); you may not use
                this file except in compliance with the License. You may obtain a copy of the
                License at http://www.apache.org/licenses/LICENSE-2.0
      
                THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
                KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
                WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
                MERCHANTABLITY OR NON-INFRINGEMENT.
      
                See the Apache Version 2.0 License for specific language governing permissions
                and limitations under the License.
                ***************************************************************************** */
            var extendStatics = function(d, b) {
                extendStatics = Object.setPrototypeOf || {
                    __proto__: []
                }
                instanceof Array && function(d2, b2) {
                    d2.__proto__ = b2;
                } || function(d2, b2) {
                    for (var p in b2)
                        if (b2.hasOwnProperty(p))
                            d2[p] = b2[p];
                };
                return extendStatics(d, b);
            };

            function __extends(d, b) {
                extendStatics(d, b);

                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            }
            var __assign = function() {
                __assign = Object.assign || function __assign2(t) {
                    for (var s, i2 = 1, n = arguments.length; i2 < n; i2++) {
                        s = arguments[i2];
                        for (var p in s)
                            if (Object.prototype.hasOwnProperty.call(s, p))
                                t[p] = s[p];
                    }
                    return t;
                };
                return __assign.apply(this, arguments);
            };

            function __awaiter(thisArg, _arguments, P, generator) {
                return new(P || (P = Promise))(function(resolve, reject) {
                    function fulfilled(value) {
                        try {
                            step(generator.next(value));
                        } catch (e2) {
                            reject(e2);
                        }
                    }

                    function rejected(value) {
                        try {
                            step(generator["throw"](value));
                        } catch (e2) {
                            reject(e2);
                        }
                    }

                    function step(result) {
                        result.done ? resolve(result.value) : new P(function(resolve2) {
                            resolve2(result.value);
                        }).then(fulfilled, rejected);
                    }
                    step((generator = generator.apply(thisArg, _arguments || [])).next());
                });
            }

            function __generator(thisArg, body) {
                var _ = {
                        label: 0,
                        sent: function() {
                            if (t[0] & 1)
                                throw t[1];
                            return t[1];
                        },
                        trys: [],
                        ops: []
                    },
                    f2, y, t, g;
                return g = {
                    next: verb(0),
                    throw: verb(1),
                    return: verb(2)
                }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
                    return this;
                }), g;

                function verb(n) {
                    return function(v) {
                        return step([n, v]);
                    };
                }

                function step(op) {
                    if (f2)
                        throw new TypeError("Generator is already executing.");
                    while (_)
                        try {
                            if (f2 = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                                return t;
                            if (y = 0, t)
                                op = [op[0] & 2, t.value];
                            switch (op[0]) {
                                case 0:
                                case 1:
                                    t = op;
                                    break;
                                case 4:
                                    _.label++;
                                    return {
                                        value: op[1],
                                        done: false
                                    };
                                case 5:
                                    _.label++;
                                    y = op[1];
                                    op = [0];
                                    continue;
                                case 7:
                                    op = _.ops.pop();
                                    _.trys.pop();
                                    continue;
                                default:
                                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                        _ = 0;
                                        continue;
                                    }
                                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                                        _.label = op[1];
                                        break;
                                    }
                                    if (op[0] === 6 && _.label < t[1]) {
                                        _.label = t[1];
                                        t = op;
                                        break;
                                    }
                                    if (t && _.label < t[2]) {
                                        _.label = t[2];
                                        _.ops.push(op);
                                        break;
                                    }
                                    if (t[2])
                                        _.ops.pop();
                                    _.trys.pop();
                                    continue;
                            }
                            op = body.call(thisArg, _);
                        } catch (e2) {
                            op = [6, e2];
                            y = 0;
                        } finally {
                            f2 = t = 0;
                        }
                    if (op[0] & 5)
                        throw op[1];
                    return {
                        value: op[0] ? op[1] : void 0,
                        done: true
                    };
                }
            }
            var Bounds = function() {
                function Bounds2(x, y, w, h) {
                    this.left = x;
                    this.top = y;
                    this.width = w;
                    this.height = h;
                }
                Bounds2.prototype.add = function(x, y, w, h) {
                    return new Bounds2(this.left + x, this.top + y, this.width + w, this.height + h);
                };
                Bounds2.fromClientRect = function(clientRect) {
                    return new Bounds2(clientRect.left, clientRect.top, clientRect.width, clientRect.height);
                };
                return Bounds2;
            }();
            var parseBounds = function(node) {
                return Bounds.fromClientRect(node.getBoundingClientRect());
            };
            var parseDocumentSize = function(document2) {
                var body = document2.body;
                var documentElement = document2.documentElement;
                if (!body || !documentElement) {
                    throw new Error("Unable to get document size");
                }
                var width = Math.max(Math.max(body.scrollWidth, documentElement.scrollWidth), Math.max(body.offsetWidth, documentElement.offsetWidth), Math.max(body.clientWidth, documentElement.clientWidth));
                var height = Math.max(Math.max(body.scrollHeight, documentElement.scrollHeight), Math.max(body.offsetHeight, documentElement.offsetHeight), Math.max(body.clientHeight, documentElement.clientHeight));
                return new Bounds(0, 0, width, height);
            };
            var toCodePoints = function(str) {
                var codePoints = [];
                var i2 = 0;
                var length = str.length;
                while (i2 < length) {
                    var value = str.charCodeAt(i2++);
                    if (value >= 55296 && value <= 56319 && i2 < length) {
                        var extra = str.charCodeAt(i2++);
                        if ((extra & 64512) === 56320) {
                            codePoints.push(((value & 1023) << 10) + (extra & 1023) + 65536);
                        } else {
                            codePoints.push(value);
                            i2--;
                        }
                    } else {
                        codePoints.push(value);
                    }
                }
                return codePoints;
            };
            var fromCodePoint = function() {
                var codePoints = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    codePoints[_i] = arguments[_i];
                }
                if (String.fromCodePoint) {
                    return String.fromCodePoint.apply(String, codePoints);
                }
                var length = codePoints.length;
                if (!length) {
                    return "";
                }
                var codeUnits = [];
                var index = -1;
                var result = "";
                while (++index < length) {
                    var codePoint = codePoints[index];
                    if (codePoint <= 65535) {
                        codeUnits.push(codePoint);
                    } else {
                        codePoint -= 65536;
                        codeUnits.push((codePoint >> 10) + 55296, codePoint % 1024 + 56320);
                    }
                    if (index + 1 === length || codeUnits.length > 16384) {
                        result += String.fromCharCode.apply(String, codeUnits);
                        codeUnits.length = 0;
                    }
                }
                return result;
            };
            var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
            var lookup = typeof Uint8Array === "undefined" ? [] : new Uint8Array(256);
            for (var i = 0; i < chars.length; i++) {
                lookup[chars.charCodeAt(i)] = i;
            }
            var decode = function(base642) {
                var bufferLength = base642.length * 0.75,
                    len = base642.length,
                    i2, p = 0,
                    encoded1, encoded2, encoded3, encoded4;
                if (base642[base642.length - 1] === "=") {
                    bufferLength--;
                    if (base642[base642.length - 2] === "=") {
                        bufferLength--;
                    }
                }
                var buffer = typeof ArrayBuffer !== "undefined" && typeof Uint8Array !== "undefined" && typeof Uint8Array.prototype.slice !== "undefined" ? new ArrayBuffer(bufferLength) : new Array(bufferLength);
                var bytes = Array.isArray(buffer) ? buffer : new Uint8Array(buffer);
                for (i2 = 0; i2 < len; i2 += 4) {
                    encoded1 = lookup[base642.charCodeAt(i2)];
                    encoded2 = lookup[base642.charCodeAt(i2 + 1)];
                    encoded3 = lookup[base642.charCodeAt(i2 + 2)];
                    encoded4 = lookup[base642.charCodeAt(i2 + 3)];
                    bytes[p++] = encoded1 << 2 | encoded2 >> 4;
                    bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
                    bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
                }
                return buffer;
            };
            var polyUint16Array = function(buffer) {
                var length = buffer.length;
                var bytes = [];
                for (var i2 = 0; i2 < length; i2 += 2) {
                    bytes.push(buffer[i2 + 1] << 8 | buffer[i2]);
                }
                return bytes;
            };
            var polyUint32Array = function(buffer) {
                var length = buffer.length;
                var bytes = [];
                for (var i2 = 0; i2 < length; i2 += 4) {
                    bytes.push(buffer[i2 + 3] << 24 | buffer[i2 + 2] << 16 | buffer[i2 + 1] << 8 | buffer[i2]);
                }
                return bytes;
            };
            var UTRIE2_SHIFT_2 = 5;
            var UTRIE2_SHIFT_1 = 6 + 5;
            var UTRIE2_INDEX_SHIFT = 2;
            var UTRIE2_SHIFT_1_2 = UTRIE2_SHIFT_1 - UTRIE2_SHIFT_2;
            var UTRIE2_LSCP_INDEX_2_OFFSET = 65536 >> UTRIE2_SHIFT_2;
            var UTRIE2_DATA_BLOCK_LENGTH = 1 << UTRIE2_SHIFT_2;
            var UTRIE2_DATA_MASK = UTRIE2_DATA_BLOCK_LENGTH - 1;
            var UTRIE2_LSCP_INDEX_2_LENGTH = 1024 >> UTRIE2_SHIFT_2;
            var UTRIE2_INDEX_2_BMP_LENGTH = UTRIE2_LSCP_INDEX_2_OFFSET + UTRIE2_LSCP_INDEX_2_LENGTH;
            var UTRIE2_UTF8_2B_INDEX_2_OFFSET = UTRIE2_INDEX_2_BMP_LENGTH;
            var UTRIE2_UTF8_2B_INDEX_2_LENGTH = 2048 >> 6;
            var UTRIE2_INDEX_1_OFFSET = UTRIE2_UTF8_2B_INDEX_2_OFFSET + UTRIE2_UTF8_2B_INDEX_2_LENGTH;
            var UTRIE2_OMITTED_BMP_INDEX_1_LENGTH = 65536 >> UTRIE2_SHIFT_1;
            var UTRIE2_INDEX_2_BLOCK_LENGTH = 1 << UTRIE2_SHIFT_1_2;
            var UTRIE2_INDEX_2_MASK = UTRIE2_INDEX_2_BLOCK_LENGTH - 1;
            var slice16 = function(view, start, end) {
                if (view.slice) {
                    return view.slice(start, end);
                }
                return new Uint16Array(Array.prototype.slice.call(view, start, end));
            };
            var slice32 = function(view, start, end) {
                if (view.slice) {
                    return view.slice(start, end);
                }
                return new Uint32Array(Array.prototype.slice.call(view, start, end));
            };
            var createTrieFromBase64 = function(base642) {
                var buffer = decode(base642);
                var view32 = Array.isArray(buffer) ? polyUint32Array(buffer) : new Uint32Array(buffer);
                var view16 = Array.isArray(buffer) ? polyUint16Array(buffer) : new Uint16Array(buffer);
                var headerLength = 24;
                var index = slice16(view16, headerLength / 2, view32[4] / 2);
                var data = view32[5] === 2 ? slice16(view16, (headerLength + view32[4]) / 2) : slice32(view32, Math.ceil((headerLength + view32[4]) / 4));
                return new Trie(view32[0], view32[1], view32[2], view32[3], index, data);
            };
            var Trie = function() {
                function Trie2(initialValue, errorValue, highStart, highValueIndex, index, data) {
                    this.initialValue = initialValue;
                    this.errorValue = errorValue;
                    this.highStart = highStart;
                    this.highValueIndex = highValueIndex;
                    this.index = index;
                    this.data = data;
                }
                Trie2.prototype.get = function(codePoint) {
                    var ix;
                    if (codePoint >= 0) {
                        if (codePoint < 55296 || codePoint > 56319 && codePoint <= 65535) {
                            ix = this.index[codePoint >> UTRIE2_SHIFT_2];
                            ix = (ix << UTRIE2_INDEX_SHIFT) + (codePoint & UTRIE2_DATA_MASK);
                            return this.data[ix];
                        }
                        if (codePoint <= 65535) {
                            ix = this.index[UTRIE2_LSCP_INDEX_2_OFFSET + (codePoint - 55296 >> UTRIE2_SHIFT_2)];
                            ix = (ix << UTRIE2_INDEX_SHIFT) + (codePoint & UTRIE2_DATA_MASK);
                            return this.data[ix];
                        }
                        if (codePoint < this.highStart) {
                            ix = UTRIE2_INDEX_1_OFFSET - UTRIE2_OMITTED_BMP_INDEX_1_LENGTH + (codePoint >> UTRIE2_SHIFT_1);
                            ix = this.index[ix];
                            ix += codePoint >> UTRIE2_SHIFT_2 & UTRIE2_INDEX_2_MASK;
                            ix = this.index[ix];
                            ix = (ix << UTRIE2_INDEX_SHIFT) + (codePoint & UTRIE2_DATA_MASK);
                            return this.data[ix];
                        }
                        if (codePoint <= 1114111) {
                            return this.data[this.highValueIndex];
                        }
                    }
                    return this.errorValue;
                };
                return Trie2;
            }();
            var base64 = "KwAAAAAAAAAACA4AIDoAAPAfAAACAAAAAAAIABAAGABAAEgAUABYAF4AZgBeAGYAYABoAHAAeABeAGYAfACEAIAAiACQAJgAoACoAK0AtQC9AMUAXgBmAF4AZgBeAGYAzQDVAF4AZgDRANkA3gDmAOwA9AD8AAQBDAEUARoBIgGAAIgAJwEvATcBPwFFAU0BTAFUAVwBZAFsAXMBewGDATAAiwGTAZsBogGkAawBtAG8AcIBygHSAdoB4AHoAfAB+AH+AQYCDgIWAv4BHgImAi4CNgI+AkUCTQJTAlsCYwJrAnECeQKBAk0CiQKRApkCoQKoArACuALAAsQCzAIwANQC3ALkAjAA7AL0AvwCAQMJAxADGAMwACADJgMuAzYDPgOAAEYDSgNSA1IDUgNaA1oDYANiA2IDgACAAGoDgAByA3YDfgOAAIQDgACKA5IDmgOAAIAAogOqA4AAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAK8DtwOAAIAAvwPHA88D1wPfAyAD5wPsA/QD/AOAAIAABAQMBBIEgAAWBB4EJgQuBDMEIAM7BEEEXgBJBCADUQRZBGEEaQQwADAAcQQ+AXkEgQSJBJEEgACYBIAAoASoBK8EtwQwAL8ExQSAAIAAgACAAIAAgACgAM0EXgBeAF4AXgBeAF4AXgBeANUEXgDZBOEEXgDpBPEE+QQBBQkFEQUZBSEFKQUxBTUFPQVFBUwFVAVcBV4AYwVeAGsFcwV7BYMFiwWSBV4AmgWgBacFXgBeAF4AXgBeAKsFXgCyBbEFugW7BcIFwgXIBcIFwgXQBdQF3AXkBesF8wX7BQMGCwYTBhsGIwYrBjMGOwZeAD8GRwZNBl4AVAZbBl4AXgBeAF4AXgBeAF4AXgBeAF4AXgBeAGMGXgBqBnEGXgBeAF4AXgBeAF4AXgBeAF4AXgB5BoAG4wSGBo4GkwaAAIADHgR5AF4AXgBeAJsGgABGA4AAowarBrMGswagALsGwwbLBjAA0wbaBtoG3QbaBtoG2gbaBtoG2gblBusG8wb7BgMHCwcTBxsHCwcjBysHMAc1BzUHOgdCB9oGSgdSB1oHYAfaBloHaAfaBlIH2gbaBtoG2gbaBtoG2gbaBjUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHbQdeAF4ANQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQd1B30HNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1B4MH2gaKB68EgACAAIAAgACAAIAAgACAAI8HlwdeAJ8HpweAAIAArwe3B14AXgC/B8UHygcwANAH2AfgB4AA6AfwBz4B+AcACFwBCAgPCBcIogEYAR8IJwiAAC8INwg/CCADRwhPCFcIXwhnCEoDGgSAAIAAgABvCHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIhAiLCI4IMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlggwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAANQc1BzUHNQc1BzUHNQc1BzUHNQc1B54INQc1B6II2gaqCLIIugiAAIAAvgjGCIAAgACAAIAAgACAAIAAgACAAIAAywiHAYAA0wiAANkI3QjlCO0I9Aj8CIAAgACAAAIJCgkSCRoJIgknCTYHLwk3CZYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiAAIAAAAFAAXgBeAGAAcABeAHwAQACQAKAArQC9AJ4AXgBeAE0A3gBRAN4A7AD8AMwBGgEAAKcBNwEFAUwBXAF4QkhCmEKnArcCgAHHAsABz4LAAcABwAHAAd+C6ABoAG+C/4LAAcABwAHAAc+DF4MAAcAB54M3gweDV4Nng3eDaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAEeDqABVg6WDqABoQ6gAaABoAHXDvcONw/3DvcO9w73DvcO9w73DvcO9w73DvcO9w73DvcO9w73DvcO9w73DvcO9w73DvcO9w73DvcO9w73DvcO9w73DncPAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcAB7cPPwlGCU4JMACAAIAAgABWCV4JYQmAAGkJcAl4CXwJgAkwADAAMAAwAIgJgACLCZMJgACZCZ8JowmrCYAAswkwAF4AXgB8AIAAuwkABMMJyQmAAM4JgADVCTAAMAAwADAAgACAAIAAgACAAIAAgACAAIAAqwYWBNkIMAAwADAAMADdCeAJ6AnuCR4E9gkwAP4JBQoNCjAAMACAABUK0wiAAB0KJAosCjQKgAAwADwKQwqAAEsKvQmdCVMKWwowADAAgACAALcEMACAAGMKgABrCjAAMAAwADAAMAAwADAAMAAwADAAMAAeBDAAMAAwADAAMAAwADAAMAAwADAAMAAwAIkEPQFzCnoKiQSCCooKkAqJBJgKoAqkCokEGAGsCrQKvArBCjAAMADJCtEKFQHZCuEK/gHpCvEKMAAwADAAMACAAIwE+QowAIAAPwEBCzAAMAAwADAAMACAAAkLEQswAIAAPwEZCyELgAAOCCkLMAAxCzkLMAAwADAAMAAwADAAXgBeAEELMAAwADAAMAAwADAAMAAwAEkLTQtVC4AAXAtkC4AAiQkwADAAMAAwADAAMAAwADAAbAtxC3kLgAuFC4sLMAAwAJMLlwufCzAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAApwswADAAMACAAIAAgACvC4AAgACAAIAAgACAALcLMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAvwuAAMcLgACAAIAAgACAAIAAyguAAIAAgACAAIAA0QswADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAANkLgACAAIAA4AswADAAMAAwADAAMAAwADAAMAAwADAAMAAwAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACJCR4E6AswADAAhwHwC4AA+AsADAgMEAwwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMACAAIAAGAwdDCUMMAAwAC0MNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQw1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHPQwwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADUHNQc1BzUHNQc1BzUHNQc2BzAAMAA5DDUHNQc1BzUHNQc1BzUHNQc1BzUHNQdFDDAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAgACAAIAATQxSDFoMMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAF4AXgBeAF4AXgBeAF4AYgxeAGoMXgBxDHkMfwxeAIUMXgBeAI0MMAAwADAAMAAwAF4AXgCVDJ0MMAAwADAAMABeAF4ApQxeAKsMswy7DF4Awgy9DMoMXgBeAF4AXgBeAF4AXgBeAF4AXgDRDNkMeQBqCeAM3Ax8AOYM7Az0DPgMXgBeAF4AXgBeAF4AXgBeAF4AXgBeAF4AXgBeAF4AXgCgAAANoAAHDQ4NFg0wADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAeDSYNMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAIAAgACAAIAAgACAAC4NMABeAF4ANg0wADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAD4NRg1ODVYNXg1mDTAAbQ0wADAAMAAwADAAMAAwADAA2gbaBtoG2gbaBtoG2gbaBnUNeg3CBYANwgWFDdoGjA3aBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gaUDZwNpA2oDdoG2gawDbcNvw3HDdoG2gbPDdYN3A3fDeYN2gbsDfMN2gbaBvoN/g3aBgYODg7aBl4AXgBeABYOXgBeACUG2gYeDl4AJA5eACwO2w3aBtoGMQ45DtoG2gbaBtoGQQ7aBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gZJDjUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1B1EO2gY1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQdZDjUHNQc1BzUHNQc1B2EONQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHaA41BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1B3AO2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gY1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1B2EO2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gZJDtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBkkOeA6gAKAAoAAwADAAMAAwAKAAoACgAKAAoACgAKAAgA4wADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAD//wQABAAEAAQABAAEAAQABAAEAA0AAwABAAEAAgAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAKABMAFwAeABsAGgAeABcAFgASAB4AGwAYAA8AGAAcAEsASwBLAEsASwBLAEsASwBLAEsAGAAYAB4AHgAeABMAHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAFgAbABIAHgAeAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQABYADQARAB4ABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAAUABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAkAFgAaABsAGwAbAB4AHQAdAB4ATwAXAB4ADQAeAB4AGgAbAE8ATwAOAFAAHQAdAB0ATwBPABcATwBPAE8AFgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAB4AHgAeAB4AUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AHgAeAFAATwBAAE8ATwBPAEAATwBQAFAATwBQAB4AHgAeAB4AHgAeAB0AHQAdAB0AHgAdAB4ADgBQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgBQAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAJAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAkACQAJAAkACQAJAAkABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgAeAFAAHgAeAB4AKwArAFAAUABQAFAAGABQACsAKwArACsAHgAeAFAAHgBQAFAAUAArAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAUAAeAB4AHgAeAB4AHgArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwAYAA0AKwArAB4AHgAbACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQADQAEAB4ABAAEAB4ABAAEABMABAArACsAKwArACsAKwArACsAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAKwArACsAKwArAFYAVgBWAB4AHgArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AGgAaABoAGAAYAB4AHgAEAAQABAAEAAQABAAEAAQABAAEAAQAEwAEACsAEwATAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABLAEsASwBLAEsASwBLAEsASwBLABoAGQAZAB4AUABQAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQABMAUAAEAAQABAAEAAQABAAEAB4AHgAEAAQABAAEAAQABABQAFAABAAEAB4ABAAEAAQABABQAFAASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUAAeAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAFAABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQAUABQAB4AHgAYABMAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAFAABAAEAAQABAAEAFAABAAEAAQAUAAEAAQABAAEAAQAKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAArACsAHgArAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAFAABAAEAAQABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAAQABAANAA0ASwBLAEsASwBLAEsASwBLAEsASwAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQAKwBQAFAAUABQAFAAUABQAFAAKwArAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUAArAFAAKwArACsAUABQAFAAUAArACsABABQAAQABAAEAAQABAAEAAQAKwArAAQABAArACsABAAEAAQAUAArACsAKwArACsAKwArACsABAArACsAKwArAFAAUAArAFAAUABQAAQABAArACsASwBLAEsASwBLAEsASwBLAEsASwBQAFAAGgAaAFAAUABQAFAAUABMAB4AGwBQAB4AKwArACsABAAEAAQAKwBQAFAAUABQAFAAUAArACsAKwArAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUAArAFAAUAArAFAAUAArAFAAUAArACsABAArAAQABAAEAAQABAArACsAKwArAAQABAArACsABAAEAAQAKwArACsABAArACsAKwArACsAKwArAFAAUABQAFAAKwBQACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwAEAAQAUABQAFAABAArACsAKwArACsAKwArACsAKwArACsABAAEAAQAKwBQAFAAUABQAFAAUABQAFAAUAArAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUAArAFAAUAArAFAAUABQAFAAUAArACsABABQAAQABAAEAAQABAAEAAQABAArAAQABAAEACsABAAEAAQAKwArAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAAQABAArACsASwBLAEsASwBLAEsASwBLAEsASwAeABsAKwArACsAKwArACsAKwBQAAQABAAEAAQABAAEACsABAAEAAQAKwBQAFAAUABQAFAAUABQAFAAKwArAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQAKwArAAQABAArACsABAAEAAQAKwArACsAKwArACsAKwArAAQABAArACsAKwArAFAAUAArAFAAUABQAAQABAArACsASwBLAEsASwBLAEsASwBLAEsASwAeAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwAEAFAAKwBQAFAAUABQAFAAUAArACsAKwBQAFAAUAArAFAAUABQAFAAKwArACsAUABQACsAUAArAFAAUAArACsAKwBQAFAAKwArACsAUABQAFAAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwAEAAQABAAEAAQAKwArACsABAAEAAQAKwAEAAQABAAEACsAKwBQACsAKwArACsAKwArAAQAKwArACsAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLAFAAUABQAB4AHgAeAB4AHgAeABsAHgArACsAKwArACsABAAEAAQABAArAFAAUABQAFAAUABQAFAAUAArAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAFAABAAEAAQABAAEAAQABAArAAQABAAEACsABAAEAAQABAArACsAKwArACsAKwArAAQABAArAFAAUABQACsAKwArACsAKwBQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAB4AUAAEAAQABAArAFAAUABQAFAAUABQAFAAUAArAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQACsAKwAEAFAABAAEAAQABAAEAAQABAArAAQABAAEACsABAAEAAQABAArACsAKwArACsAKwArAAQABAArACsAKwArACsAKwArAFAAKwBQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAFAABAAEAAQABAAEAAQABAArAAQABAAEACsABAAEAAQABABQAB4AKwArACsAKwBQAFAAUAAEAFAAUABQAFAAUABQAFAAUABQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAFAAUABQAFAAUABQAFAAUABQABoAUABQAFAAUABQAFAAKwArAAQABAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQACsAUAArACsAUABQAFAAUABQAFAAUAArACsAKwAEACsAKwArACsABAAEAAQABAAEAAQAKwAEACsABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArAAQABAAeACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAAqAFwAXAAqACoAKgAqACoAKgAqACsAKwArACsAGwBcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAeAEsASwBLAEsASwBLAEsASwBLAEsADQANACsAKwArACsAKwBcAFwAKwBcACsAKwBcAFwAKwBcACsAKwBcACsAKwArACsAKwArAFwAXABcAFwAKwBcAFwAXABcAFwAXABcACsAXABcAFwAKwBcACsAXAArACsAXABcACsAXABcAFwAXAAqAFwAXAAqACoAKgAqACoAKgArACoAKgBcACsAKwBcAFwAXABcAFwAKwBcACsAKgAqACoAKgAqACoAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArAFwAXABcAFwAUAAOAA4ADgAOAB4ADgAOAAkADgAOAA0ACQATABMAEwATABMACQAeABMAHgAeAB4ABAAEAB4AHgAeAB4AHgAeAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAUABQAFAAUABQAFAAUAANAAQAHgAEAB4ABAAWABEAFgARAAQABABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAANAAQABAAEAAQABAANAAQABABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsADQANAB4AHgAeAB4AHgAeAAQAHgAeAB4AHgAeAB4AKwAeAB4ADgAOAA0ADgAeAB4AHgAeAB4ACQAJACsAKwArACsAKwBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqAFwASwBLAEsASwBLAEsASwBLAEsASwANAA0AHgAeAB4AHgBcAFwAXABcAFwAXAAqACoAKgAqAFwAXABcAFwAKgAqACoAXAAqACoAKgBcAFwAKgAqACoAKgAqACoAKgBcAFwAXAAqACoAKgAqAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAKgAqACoAKgAqACoAKgAqACoAXAAqAEsASwBLAEsASwBLAEsASwBLAEsAKgAqACoAKgAqACoAUABQAFAAUABQAFAAKwBQACsAKwArACsAKwBQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQACsAUAArAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUAArACsAUABQAFAAUABQAFAAUAArAFAAKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwAEAAQABAAeAA0AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQACsAKwANAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQABYAEQArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAADQANAA0AUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAABAAEAAQAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAA0ADQArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQACsABAAEACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoADQANABUAXAANAB4ADQAbAFwAKgArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArAB4AHgATABMADQANAA4AHgATABMAHgAEAAQABAAJACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAUABQAFAAUABQAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABABQACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwAeACsAKwArABMAEwBLAEsASwBLAEsASwBLAEsASwBLAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACsAKwBcAFwAXABcAFwAKwArACsAKwArACsAKwArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcACsAKwArACsAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBcACsAKwArACoAKgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEACsAKwAeAB4AXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAKgAqACoAKgAqACoAKgArACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgArACsABABLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAKgAqACoAKgAqACoAKgBcACoAKgAqACoAKgAqACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArAAQABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQAUABQAFAAUABQAFAAUAArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsADQANAB4ADQANAA0ADQAeAB4AHgAeAB4AHgAeAB4AHgAeAAQABAAEAAQABAAEAAQABAAEAB4AHgAeAB4AHgAeAB4AHgAeACsAKwArAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAUABQAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArACsAKwArACsAHgAeAB4AHgBQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwANAA0ADQANAA0ASwBLAEsASwBLAEsASwBLAEsASwArACsAKwBQAFAAUABLAEsASwBLAEsASwBLAEsASwBLAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAANAA0AUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsABAAEAAQAHgAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAFAAUABQAFAABABQAFAAUABQAAQABAAEAFAAUAAEAAQABAArACsAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwAEAAQABAAEAAQAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUAArAFAAKwBQACsAUAArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAHgAeAB4AHgAeAB4AHgAeAFAAHgAeAB4AUABQAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAKwArAB4AHgAeAB4AHgAeACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAUABQAFAAKwAeAB4AHgAeAB4AHgAeAA4AHgArAA0ADQANAA0ADQANAA0ACQANAA0ADQAIAAQACwAEAAQADQAJAA0ADQAMAB0AHQAeABcAFwAWABcAFwAXABYAFwAdAB0AHgAeABQAFAAUAA0AAQABAAQABAAEAAQABAAJABoAGgAaABoAGgAaABoAGgAeABcAFwAdABUAFQAeAB4AHgAeAB4AHgAYABYAEQAVABUAFQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgANAB4ADQANAA0ADQAeAA0ADQANAAcAHgAeAB4AHgArAAQABAAEAAQABAAEAAQABAAEAAQAUABQACsAKwBPAFAAUABQAFAAUAAeAB4AHgAWABEATwBQAE8ATwBPAE8AUABQAFAAUABQAB4AHgAeABYAEQArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAGwAbABsAGwAbABsAGwAaABsAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGwAaABsAGwAbABsAGgAbABsAGgAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbABsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgBQABoAHgAdAB4AUAAeABoAHgAeAB4AHgAeAB4AHgAeAB4ATwAeAFAAGwAeAB4AUABQAFAAUABQAB4AHgAeAB0AHQAeAFAAHgBQAB4AUAAeAFAATwBQAFAAHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAB4AUABQAFAAUABPAE8AUABQAFAAUABQAE8AUABQAE8AUABPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBQAFAAUABQAE8ATwBPAE8ATwBPAE8ATwBPAE8AUABQAFAAUABQAFAAUABQAFAAHgAeAFAAUABQAFAATwAeAB4AKwArACsAKwAdAB0AHQAdAB0AHQAdAB0AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAeAB0AHQAeAB4AHgAdAB0AHgAeAB0AHgAeAB4AHQAeAB0AGwAbAB4AHQAeAB4AHgAeAB0AHgAeAB0AHQAdAB0AHgAeAB0AHgAdAB4AHQAdAB0AHQAdAB0AHgAdAB4AHgAeAB4AHgAdAB0AHQAdAB4AHgAeAB4AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAeAB4AHgAdAB4AHgAeAB4AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB4AHgAdAB0AHQAdAB4AHgAdAB0AHgAeAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHgAeAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AHQAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABQAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAWABEAFgARAB4AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAlACUAHgAeAB4AHgAeAB4AHgAeAB4AFgARAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBQAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB4AHgAeAB4AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHgAdAB0AHQAdAB0AHQAdAB4AHgAeAB4AHgAeAB4AHgAdAB0AHgAeAB0AHQAeAB4AHgAeAB0AHQAeAB4AHgAeAB0AHQAdAB4AHgAdAB4AHgAdAB0AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAeAB0AHQAeAB4AHQAeAB4AHgAeAB0AHQAeAB4AHgAeACUAJQAdAB0AJQAeACUAJQAlACAAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAHgAeAB4AHgAdAB4AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB4AHQAdAB0AHgAdACUAHQAdAB4AHQAdAB4AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAHQAdAB0AHQAlAB4AJQAlACUAHQAlACUAHQAdAB0AJQAlAB0AHQAlAB0AHQAlACUAJQAeAB0AHgAeAB4AHgAdAB0AJQAdAB0AHQAdAB0AHQAlACUAJQAlACUAHQAlACUAIAAlAB0AHQAlACUAJQAlACUAJQAlACUAHgAeAB4AJQAlACAAIAAgACAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHgAeABcAFwAXABcAFwAXAB4AEwATACUAHgAeAB4AFgARABYAEQAWABEAFgARABYAEQAWABEAFgARAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAWABEAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFgARABYAEQAWABEAFgARABYAEQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABYAEQAWABEAFgARABYAEQAWABEAFgARABYAEQAWABEAFgARABYAEQAWABEAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFgARABYAEQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABYAEQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB0AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAEAAQABAAeAB4AKwArACsAKwArABMADQANAA0AUAATAA0AUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAUAANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAA0ADQANAA0ADQANAA0ADQAeAA0AFgANAB4AHgAXABcAHgAeABcAFwAWABEAFgARABYAEQAWABEADQANAA0ADQATAFAADQANAB4ADQANAB4AHgAeAB4AHgAMAAwADQANAA0AHgANAA0AFgANAA0ADQANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAKwArACsAKwArACsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArAA0AEQARACUAJQBHAFcAVwAWABEAFgARABYAEQAWABEAFgARACUAJQAWABEAFgARABYAEQAWABEAFQAWABEAEQAlAFcAVwBXAFcAVwBXAFcAVwBXAAQABAAEAAQABAAEACUAVwBXAFcAVwA2ACUAJQBXAFcAVwBHAEcAJQAlACUAKwBRAFcAUQBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFEAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBRAFcAUQBXAFEAVwBXAFcAVwBXAFcAUQBXAFcAVwBXAFcAVwBRAFEAKwArAAQABAAVABUARwBHAFcAFQBRAFcAUQBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBRAFcAVwBXAFcAVwBXAFEAUQBXAFcAVwBXABUAUQBHAEcAVwArACsAKwArACsAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwArAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwArACUAJQBXAFcAVwBXACUAJQAlACUAJQAlACUAJQAlACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwArACsAKwArACUAJQAlACUAKwArACsAKwArACsAKwArACsAKwArACsAUQBRAFEAUQBRAFEAUQBRAFEAUQBRAFEAUQBRAFEAUQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACsAVwBXAFcAVwBXAFcAVwBXAFcAVwAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAE8ATwBPAE8ATwBPAE8ATwAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQAlACUAJQAlACUAJQAlACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAEcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAADQATAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABLAEsASwBLAEsASwBLAEsASwBLAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAABAAEAAQABAAeAAQABAAEAAQABAAEAAQABAAEAAQAHgBQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUABQAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAeAA0ADQANAA0ADQArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAB4AHgAeAB4AHgAeAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAAQAUABQAFAABABQAFAAUABQAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAeAB4AHgAeACsAKwArACsAUABQAFAAUABQAFAAHgAeABoAHgArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAADgAOABMAEwArACsAKwArACsAKwArACsABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwANAA0ASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAFAAUAAeAB4AHgBQAA4AUAArACsAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAA0ADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArAB4AWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYACsAKwArAAQAHgAeAB4AHgAeAB4ADQANAA0AHgAeAB4AHgArAFAASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArAB4AHgBcAFwAXABcAFwAKgBcAFwAXABcAFwAXABcAFwAXABcAEsASwBLAEsASwBLAEsASwBLAEsAXABcAFwAXABcACsAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArAFAAUABQAAQAUABQAFAAUABQAFAAUABQAAQABAArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAHgANAA0ADQBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAXAAqACoAKgBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAAqAFwAKgAqACoAXABcACoAKgBcAFwAXABcAFwAKgAqAFwAKgBcACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcACoAKgBQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAA0ADQBQAFAAUAAEAAQAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUAArACsAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQADQAEAAQAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAVABVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBUAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVACsAKwArACsAKwArACsAKwArACsAKwArAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAKwArACsAKwBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAKwArACsAKwAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAKwArACsAKwArAFYABABWAFYAVgBWAFYAVgBWAFYAVgBWAB4AVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgArAFYAVgBWAFYAVgArAFYAKwBWAFYAKwBWAFYAKwBWAFYAVgBWAFYAVgBWAFYAVgBWAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAEQAWAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUAAaAB4AKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAGAARABEAGAAYABMAEwAWABEAFAArACsAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACUAJQAlACUAJQAWABEAFgARABYAEQAWABEAFgARABYAEQAlACUAFgARACUAJQAlACUAJQAlACUAEQAlABEAKwAVABUAEwATACUAFgARABYAEQAWABEAJQAlACUAJQAlACUAJQAlACsAJQAbABoAJQArACsAKwArAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAcAKwATACUAJQAbABoAJQAlABYAEQAlACUAEQAlABEAJQBXAFcAVwBXAFcAVwBXAFcAVwBXABUAFQAlACUAJQATACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXABYAJQARACUAJQAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwAWACUAEQAlABYAEQARABYAEQARABUAVwBRAFEAUQBRAFEAUQBRAFEAUQBRAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAEcARwArACsAVwBXAFcAVwBXAFcAKwArAFcAVwBXAFcAVwBXACsAKwBXAFcAVwBXAFcAVwArACsAVwBXAFcAKwArACsAGgAbACUAJQAlABsAGwArAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwAEAAQABAAQAB0AKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsADQANAA0AKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsADQBQAFAAUABQACsAKwArACsAUABQAFAAUABQAFAAUABQAA0AUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUAArACsAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQACsAKwArAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgBQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwBQAFAAUABQAFAABAAEAAQAKwAEAAQAKwArACsAKwArAAQABAAEAAQAUABQAFAAUAArAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsABAAEAAQAKwArACsAKwAEAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsADQANAA0ADQANAA0ADQANAB4AKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AUABQAFAAUABQAFAAUABQAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEACsAKwArACsAUABQAFAAUABQAA0ADQANAA0ADQANABQAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwANAA0ADQANAA0ADQANAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwBQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAA0ADQAeAB4AHgAeAB4AKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsASwBLAEsASwBLAEsASwBLAEsASwANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAeAA4AUAArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAADQANAB4ADQAeAAQABAAEAB4AKwArAEsASwBLAEsASwBLAEsASwBLAEsAUAAOAFAADQANAA0AKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAANAA0AHgANAA0AHgAEACsAUABQAFAAUABQAFAAUAArAFAAKwBQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAA0AKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsABAAEAAQABAArAFAAUABQAFAAUABQAFAAUAArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAArACsABAAEACsAKwAEAAQABAArACsAUAArACsAKwArACsAKwAEACsAKwArACsAKwBQAFAAUABQAFAABAAEACsAKwAEAAQABAAEAAQABAAEACsAKwArAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAAQABABQAFAAUABQAA0ADQANAA0AHgBLAEsASwBLAEsASwBLAEsASwBLACsADQArAB4AKwArAAQABAAEAAQAUABQAB4AUAArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEACsAKwAEAAQABAAEAAQABAAEAAQABAAOAA0ADQATABMAHgAeAB4ADQANAA0ADQANAA0ADQANAA0ADQANAA0ADQANAA0AUABQAFAAUAAEAAQAKwArAAQADQANAB4AUAArACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAArACsAKwAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAXABcAA0ADQANACoASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwBQAFAABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAFAABAAEAAQABAAOAB4ADQANAA0ADQAOAB4ABAArACsAKwArACsAKwArACsAUAAEAAQABAAEAAQABAAEAAQABAAEAAQAUABQAFAAUAArACsAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAA0ADQANACsADgAOAA4ADQANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEACsABAAEAAQABAAEAAQABAAEAFAADQANAA0ADQANACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwAOABMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAArACsAKwAEACsABAAEACsABAAEAAQABAAEAAQABABQAAQAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsADQANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAASABIAEgAQwBDAEMAUABQAFAAUABDAFAAUABQAEgAQwBIAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAASABDAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABIAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwANAA0AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEAAQABAANACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAA0ADQANAB4AHgAeAB4AHgAeAFAAUABQAFAADQAeACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAEcARwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwArACsAKwArACsAKwArACsAKwArACsAKwArAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQACsAKwAeAAQABAANAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAB4AHgAeAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAHgAeAAQABAAEAAQABAAEAAQAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAEAAQABAAEAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgAEAAQABAAeACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAFAAUAArACsAUAArACsAUABQACsAKwBQAFAAUABQACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwBQACsAUABQAFAAUABQAFAAUAArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAKwAeAB4AUABQAFAAUABQACsAUAArACsAKwBQAFAAUABQAFAAUABQACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AKwArAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAB4AHgAeAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAB4AHgAeAB4AHgAeAB4AHgAEAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAeAB4ADQANAA0ADQAeACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAAQABAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsABAAEAAQABAAEAAQABAArAAQABAArAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAEAAQABAAEAAQABAAEACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAFgAWAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUAArAFAAKwArAFAAKwBQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUAArAFAAKwBQACsAKwArACsAKwArAFAAKwArACsAKwBQACsAUAArAFAAKwBQAFAAUAArAFAAUAArAFAAKwArAFAAKwBQACsAUAArAFAAKwBQACsAUABQACsAUAArACsAUABQAFAAUAArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQACsAUABQAFAAUAArAFAAKwBQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwBQAFAAUAArAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwAlACUAJQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAeACUAHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeACUAJQAlACUAHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQAlACUAJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeACUAJQAlACUAJQAeACUAJQAlACUAJQAgACAAIAAlACUAIAAlACUAIAAgACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAIQAhACEAIQAhACUAJQAgACAAJQAlACAAIAAgACAAIAAgACAAIAAgACAAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAIAAgACAAIAAlACUAJQAlACAAJQAgACAAIAAgACAAIAAgACAAIAAlACUAJQAgACUAJQAlACUAIAAgACAAJQAgACAAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeACUAHgAlAB4AJQAlACUAJQAlACAAJQAlACUAJQAeACUAHgAeACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAIAAgACUAJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAIAAlACUAJQAlACAAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAIAAgACAAJQAlACUAIAAgACAAIAAgAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFwAXABcAFQAVABUAHgAeAB4AHgAlACUAJQAgACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAIAAgACAAJQAlACUAJQAlACUAJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAgACAAIAAlACAAIAAlACUAJQAlACUAJQAgACUAJQAlACUAJQAlACUAJQAlACAAIAAgACAAIAAgACAAIAAgACAAJQAlACUAIAAgACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACsAKwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsA";
            var LETTER_NUMBER_MODIFIER = 50;
            var BK = 1;
            var CR = 2;
            var LF = 3;
            var CM = 4;
            var NL = 5;
            var WJ = 7;
            var ZW = 8;
            var GL = 9;
            var SP = 10;
            var ZWJ = 11;
            var B2 = 12;
            var BA = 13;
            var BB = 14;
            var HY = 15;
            var CB = 16;
            var CL = 17;
            var CP = 18;
            var EX = 19;
            var IN = 20;
            var NS = 21;
            var OP = 22;
            var QU = 23;
            var IS = 24;
            var NU = 25;
            var PO = 26;
            var PR = 27;
            var SY = 28;
            var AI = 29;
            var AL = 30;
            var CJ = 31;
            var EB = 32;
            var EM = 33;
            var H2 = 34;
            var H3 = 35;
            var HL = 36;
            var ID = 37;
            var JL = 38;
            var JV = 39;
            var JT = 40;
            var RI = 41;
            var SA = 42;
            var XX = 43;
            var BREAK_MANDATORY = "!";
            var BREAK_NOT_ALLOWED = "×";
            var BREAK_ALLOWED = "÷";
            var UnicodeTrie = createTrieFromBase64(base64);
            var ALPHABETICS = [AL, HL];
            var HARD_LINE_BREAKS = [BK, CR, LF, NL];
            var SPACE = [SP, ZW];
            var PREFIX_POSTFIX = [PR, PO];
            var LINE_BREAKS = HARD_LINE_BREAKS.concat(SPACE);
            var KOREAN_SYLLABLE_BLOCK = [JL, JV, JT, H2, H3];
            var HYPHEN = [HY, BA];
            var codePointsToCharacterClasses = function(codePoints, lineBreak2) {
                if (lineBreak2 === void 0) {
                    lineBreak2 = "strict";
                }
                var types = [];
                var indicies = [];
                var categories = [];
                codePoints.forEach(function(codePoint, index) {
                    var classType = UnicodeTrie.get(codePoint);
                    if (classType > LETTER_NUMBER_MODIFIER) {
                        categories.push(true);
                        classType -= LETTER_NUMBER_MODIFIER;
                    } else {
                        categories.push(false);
                    }
                    if (["normal", "auto", "loose"].indexOf(lineBreak2) !== -1) {
                        if ([8208, 8211, 12316, 12448].indexOf(codePoint) !== -1) {
                            indicies.push(index);
                            return types.push(CB);
                        }
                    }
                    if (classType === CM || classType === ZWJ) {
                        if (index === 0) {
                            indicies.push(index);
                            return types.push(AL);
                        }
                        var prev = types[index - 1];
                        if (LINE_BREAKS.indexOf(prev) === -1) {
                            indicies.push(indicies[index - 1]);
                            return types.push(prev);
                        }
                        indicies.push(index);
                        return types.push(AL);
                    }
                    indicies.push(index);
                    if (classType === CJ) {
                        return types.push(lineBreak2 === "strict" ? NS : ID);
                    }
                    if (classType === SA) {
                        return types.push(AL);
                    }
                    if (classType === AI) {
                        return types.push(AL);
                    }
                    if (classType === XX) {
                        if (codePoint >= 131072 && codePoint <= 196605 || codePoint >= 196608 && codePoint <= 262141) {
                            return types.push(ID);
                        } else {
                            return types.push(AL);
                        }
                    }
                    types.push(classType);
                });
                return [indicies, types, categories];
            };
            var isAdjacentWithSpaceIgnored = function(a2, b, currentIndex, classTypes) {
                var current = classTypes[currentIndex];
                if (Array.isArray(a2) ? a2.indexOf(current) !== -1 : a2 === current) {
                    var i2 = currentIndex;
                    while (i2 <= classTypes.length) {
                        i2++;
                        var next = classTypes[i2];
                        if (next === b) {
                            return true;
                        }
                        if (next !== SP) {
                            break;
                        }
                    }
                }
                if (current === SP) {
                    var i2 = currentIndex;
                    while (i2 > 0) {
                        i2--;
                        var prev = classTypes[i2];
                        if (Array.isArray(a2) ? a2.indexOf(prev) !== -1 : a2 === prev) {
                            var n = currentIndex;
                            while (n <= classTypes.length) {
                                n++;
                                var next = classTypes[n];
                                if (next === b) {
                                    return true;
                                }
                                if (next !== SP) {
                                    break;
                                }
                            }
                        }
                        if (prev !== SP) {
                            break;
                        }
                    }
                }
                return false;
            };
            var previousNonSpaceClassType = function(currentIndex, classTypes) {
                var i2 = currentIndex;
                while (i2 >= 0) {
                    var type = classTypes[i2];
                    if (type === SP) {
                        i2--;
                    } else {
                        return type;
                    }
                }
                return 0;
            };
            var _lineBreakAtIndex = function(codePoints, classTypes, indicies, index, forbiddenBreaks) {
                if (indicies[index] === 0) {
                    return BREAK_NOT_ALLOWED;
                }
                var currentIndex = index - 1;
                if (Array.isArray(forbiddenBreaks) && forbiddenBreaks[currentIndex] === true) {
                    return BREAK_NOT_ALLOWED;
                }
                var beforeIndex = currentIndex - 1;
                var afterIndex = currentIndex + 1;
                var current = classTypes[currentIndex];
                var before = beforeIndex >= 0 ? classTypes[beforeIndex] : 0;
                var next = classTypes[afterIndex];
                if (current === CR && next === LF) {
                    return BREAK_NOT_ALLOWED;
                }
                if (HARD_LINE_BREAKS.indexOf(current) !== -1) {
                    return BREAK_MANDATORY;
                }
                if (HARD_LINE_BREAKS.indexOf(next) !== -1) {
                    return BREAK_NOT_ALLOWED;
                }
                if (SPACE.indexOf(next) !== -1) {
                    return BREAK_NOT_ALLOWED;
                }
                if (previousNonSpaceClassType(currentIndex, classTypes) === ZW) {
                    return BREAK_ALLOWED;
                }
                if (UnicodeTrie.get(codePoints[currentIndex]) === ZWJ && (next === ID || next === EB || next === EM)) {
                    return BREAK_NOT_ALLOWED;
                }
                if (current === WJ || next === WJ) {
                    return BREAK_NOT_ALLOWED;
                }
                if (current === GL) {
                    return BREAK_NOT_ALLOWED;
                }
                if ([SP, BA, HY].indexOf(current) === -1 && next === GL) {
                    return BREAK_NOT_ALLOWED;
                }
                if ([CL, CP, EX, IS, SY].indexOf(next) !== -1) {
                    return BREAK_NOT_ALLOWED;
                }
                if (previousNonSpaceClassType(currentIndex, classTypes) === OP) {
                    return BREAK_NOT_ALLOWED;
                }
                if (isAdjacentWithSpaceIgnored(QU, OP, currentIndex, classTypes)) {
                    return BREAK_NOT_ALLOWED;
                }
                if (isAdjacentWithSpaceIgnored([CL, CP], NS, currentIndex, classTypes)) {
                    return BREAK_NOT_ALLOWED;
                }
                if (isAdjacentWithSpaceIgnored(B2, B2, currentIndex, classTypes)) {
                    return BREAK_NOT_ALLOWED;
                }
                if (current === SP) {
                    return BREAK_ALLOWED;
                }
                if (current === QU || next === QU) {
                    return BREAK_NOT_ALLOWED;
                }
                if (next === CB || current === CB) {
                    return BREAK_ALLOWED;
                }
                if ([BA, HY, NS].indexOf(next) !== -1 || current === BB) {
                    return BREAK_NOT_ALLOWED;
                }
                if (before === HL && HYPHEN.indexOf(current) !== -1) {
                    return BREAK_NOT_ALLOWED;
                }
                if (current === SY && next === HL) {
                    return BREAK_NOT_ALLOWED;
                }
                if (next === IN && ALPHABETICS.concat(IN, EX, NU, ID, EB, EM).indexOf(current) !== -1) {
                    return BREAK_NOT_ALLOWED;
                }
                if (ALPHABETICS.indexOf(next) !== -1 && current === NU || ALPHABETICS.indexOf(current) !== -1 && next === NU) {
                    return BREAK_NOT_ALLOWED;
                }
                if (current === PR && [ID, EB, EM].indexOf(next) !== -1 || [ID, EB, EM].indexOf(current) !== -1 && next === PO) {
                    return BREAK_NOT_ALLOWED;
                }
                if (ALPHABETICS.indexOf(current) !== -1 && PREFIX_POSTFIX.indexOf(next) !== -1 || PREFIX_POSTFIX.indexOf(current) !== -1 && ALPHABETICS.indexOf(next) !== -1) {
                    return BREAK_NOT_ALLOWED;
                }
                if ([PR, PO].indexOf(current) !== -1 && (next === NU || [OP, HY].indexOf(next) !== -1 && classTypes[afterIndex + 1] === NU) || [OP, HY].indexOf(current) !== -1 && next === NU || current === NU && [NU, SY, IS].indexOf(next) !== -1) {
                    return BREAK_NOT_ALLOWED;
                }
                if ([NU, SY, IS, CL, CP].indexOf(next) !== -1) {
                    var prevIndex = currentIndex;
                    while (prevIndex >= 0) {
                        var type = classTypes[prevIndex];
                        if (type === NU) {
                            return BREAK_NOT_ALLOWED;
                        } else if ([SY, IS].indexOf(type) !== -1) {
                            prevIndex--;
                        } else {
                            break;
                        }
                    }
                }
                if ([PR, PO].indexOf(next) !== -1) {
                    var prevIndex = [CL, CP].indexOf(current) !== -1 ? beforeIndex : currentIndex;
                    while (prevIndex >= 0) {
                        var type = classTypes[prevIndex];
                        if (type === NU) {
                            return BREAK_NOT_ALLOWED;
                        } else if ([SY, IS].indexOf(type) !== -1) {
                            prevIndex--;
                        } else {
                            break;
                        }
                    }
                }
                if (JL === current && [JL, JV, H2, H3].indexOf(next) !== -1 || [JV, H2].indexOf(current) !== -1 && [JV, JT].indexOf(next) !== -1 || [JT, H3].indexOf(current) !== -1 && next === JT) {
                    return BREAK_NOT_ALLOWED;
                }
                if (KOREAN_SYLLABLE_BLOCK.indexOf(current) !== -1 && [IN, PO].indexOf(next) !== -1 || KOREAN_SYLLABLE_BLOCK.indexOf(next) !== -1 && current === PR) {
                    return BREAK_NOT_ALLOWED;
                }
                if (ALPHABETICS.indexOf(current) !== -1 && ALPHABETICS.indexOf(next) !== -1) {
                    return BREAK_NOT_ALLOWED;
                }
                if (current === IS && ALPHABETICS.indexOf(next) !== -1) {
                    return BREAK_NOT_ALLOWED;
                }
                if (ALPHABETICS.concat(NU).indexOf(current) !== -1 && next === OP || ALPHABETICS.concat(NU).indexOf(next) !== -1 && current === CP) {
                    return BREAK_NOT_ALLOWED;
                }
                if (current === RI && next === RI) {
                    var i2 = indicies[currentIndex];
                    var count = 1;
                    while (i2 > 0) {
                        i2--;
                        if (classTypes[i2] === RI) {
                            count++;
                        } else {
                            break;
                        }
                    }
                    if (count % 2 !== 0) {
                        return BREAK_NOT_ALLOWED;
                    }
                }
                if (current === EB && next === EM) {
                    return BREAK_NOT_ALLOWED;
                }
                return BREAK_ALLOWED;
            };
            var cssFormattedClasses = function(codePoints, options) {
                if (!options) {
                    options = {
                        lineBreak: "normal",
                        wordBreak: "normal"
                    };
                }
                var _a = codePointsToCharacterClasses(codePoints, options.lineBreak),
                    indicies = _a[0],
                    classTypes = _a[1],
                    isLetterNumber = _a[2];
                if (options.wordBreak === "break-all" || options.wordBreak === "break-word") {
                    classTypes = classTypes.map(function(type) {
                        return [NU, AL, SA].indexOf(type) !== -1 ? ID : type;
                    });
                }
                var forbiddenBreakpoints = options.wordBreak === "keep-all" ? isLetterNumber.map(function(letterNumber, i2) {
                    return letterNumber && codePoints[i2] >= 19968 && codePoints[i2] <= 40959;
                }) : void 0;
                return [indicies, classTypes, forbiddenBreakpoints];
            };
            var Break = function() {
                function Break2(codePoints, lineBreak2, start, end) {
                    this.codePoints = codePoints;
                    this.required = lineBreak2 === BREAK_MANDATORY;
                    this.start = start;
                    this.end = end;
                }
                Break2.prototype.slice = function() {
                    return fromCodePoint.apply(void 0, this.codePoints.slice(this.start, this.end));
                };
                return Break2;
            }();
            var LineBreaker = function(str, options) {
                var codePoints = toCodePoints(str);
                var _a = cssFormattedClasses(codePoints, options),
                    indicies = _a[0],
                    classTypes = _a[1],
                    forbiddenBreakpoints = _a[2];
                var length = codePoints.length;
                var lastEnd = 0;
                var nextIndex = 0;
                return {
                    next: function() {
                        if (nextIndex >= length) {
                            return {
                                done: true,
                                value: null
                            };
                        }
                        var lineBreak2 = BREAK_NOT_ALLOWED;
                        while (nextIndex < length && (lineBreak2 = _lineBreakAtIndex(codePoints, classTypes, indicies, ++nextIndex, forbiddenBreakpoints)) === BREAK_NOT_ALLOWED) {}
                        if (lineBreak2 !== BREAK_NOT_ALLOWED || nextIndex === length) {
                            var value = new Break(codePoints, lineBreak2, lastEnd, nextIndex);
                            lastEnd = nextIndex;
                            return {
                                value,
                                done: false
                            };
                        }
                        return {
                            done: true,
                            value: null
                        };
                    }
                };
            };
            var TokenType;
            (function(TokenType2) {
                TokenType2[TokenType2["STRING_TOKEN"] = 0] = "STRING_TOKEN";
                TokenType2[TokenType2["BAD_STRING_TOKEN"] = 1] = "BAD_STRING_TOKEN";
                TokenType2[TokenType2["LEFT_PARENTHESIS_TOKEN"] = 2] = "LEFT_PARENTHESIS_TOKEN";
                TokenType2[TokenType2["RIGHT_PARENTHESIS_TOKEN"] = 3] = "RIGHT_PARENTHESIS_TOKEN";
                TokenType2[TokenType2["COMMA_TOKEN"] = 4] = "COMMA_TOKEN";
                TokenType2[TokenType2["HASH_TOKEN"] = 5] = "HASH_TOKEN";
                TokenType2[TokenType2["DELIM_TOKEN"] = 6] = "DELIM_TOKEN";
                TokenType2[TokenType2["AT_KEYWORD_TOKEN"] = 7] = "AT_KEYWORD_TOKEN";
                TokenType2[TokenType2["PREFIX_MATCH_TOKEN"] = 8] = "PREFIX_MATCH_TOKEN";
                TokenType2[TokenType2["DASH_MATCH_TOKEN"] = 9] = "DASH_MATCH_TOKEN";
                TokenType2[TokenType2["INCLUDE_MATCH_TOKEN"] = 10] = "INCLUDE_MATCH_TOKEN";
                TokenType2[TokenType2["LEFT_CURLY_BRACKET_TOKEN"] = 11] = "LEFT_CURLY_BRACKET_TOKEN";
                TokenType2[TokenType2["RIGHT_CURLY_BRACKET_TOKEN"] = 12] = "RIGHT_CURLY_BRACKET_TOKEN";
                TokenType2[TokenType2["SUFFIX_MATCH_TOKEN"] = 13] = "SUFFIX_MATCH_TOKEN";
                TokenType2[TokenType2["SUBSTRING_MATCH_TOKEN"] = 14] = "SUBSTRING_MATCH_TOKEN";
                TokenType2[TokenType2["DIMENSION_TOKEN"] = 15] = "DIMENSION_TOKEN";
                TokenType2[TokenType2["PERCENTAGE_TOKEN"] = 16] = "PERCENTAGE_TOKEN";
                TokenType2[TokenType2["NUMBER_TOKEN"] = 17] = "NUMBER_TOKEN";
                TokenType2[TokenType2["FUNCTION"] = 18] = "FUNCTION";
                TokenType2[TokenType2["FUNCTION_TOKEN"] = 19] = "FUNCTION_TOKEN";
                TokenType2[TokenType2["IDENT_TOKEN"] = 20] = "IDENT_TOKEN";
                TokenType2[TokenType2["COLUMN_TOKEN"] = 21] = "COLUMN_TOKEN";
                TokenType2[TokenType2["URL_TOKEN"] = 22] = "URL_TOKEN";
                TokenType2[TokenType2["BAD_URL_TOKEN"] = 23] = "BAD_URL_TOKEN";
                TokenType2[TokenType2["CDC_TOKEN"] = 24] = "CDC_TOKEN";
                TokenType2[TokenType2["CDO_TOKEN"] = 25] = "CDO_TOKEN";
                TokenType2[TokenType2["COLON_TOKEN"] = 26] = "COLON_TOKEN";
                TokenType2[TokenType2["SEMICOLON_TOKEN"] = 27] = "SEMICOLON_TOKEN";
                TokenType2[TokenType2["LEFT_SQUARE_BRACKET_TOKEN"] = 28] = "LEFT_SQUARE_BRACKET_TOKEN";
                TokenType2[TokenType2["RIGHT_SQUARE_BRACKET_TOKEN"] = 29] = "RIGHT_SQUARE_BRACKET_TOKEN";
                TokenType2[TokenType2["UNICODE_RANGE_TOKEN"] = 30] = "UNICODE_RANGE_TOKEN";
                TokenType2[TokenType2["WHITESPACE_TOKEN"] = 31] = "WHITESPACE_TOKEN";
                TokenType2[TokenType2["EOF_TOKEN"] = 32] = "EOF_TOKEN";
            })(TokenType || (TokenType = {}));
            var FLAG_UNRESTRICTED = 1 << 0;
            var FLAG_ID = 1 << 1;
            var FLAG_INTEGER = 1 << 2;
            var FLAG_NUMBER = 1 << 3;
            var LINE_FEED = 10;
            var SOLIDUS = 47;
            var REVERSE_SOLIDUS = 92;
            var CHARACTER_TABULATION = 9;
            var SPACE$1 = 32;
            var QUOTATION_MARK = 34;
            var EQUALS_SIGN = 61;
            var NUMBER_SIGN = 35;
            var DOLLAR_SIGN = 36;
            var PERCENTAGE_SIGN = 37;
            var APOSTROPHE = 39;
            var LEFT_PARENTHESIS = 40;
            var RIGHT_PARENTHESIS = 41;
            var LOW_LINE = 95;
            var HYPHEN_MINUS = 45;
            var EXCLAMATION_MARK = 33;
            var LESS_THAN_SIGN = 60;
            var GREATER_THAN_SIGN = 62;
            var COMMERCIAL_AT = 64;
            var LEFT_SQUARE_BRACKET = 91;
            var RIGHT_SQUARE_BRACKET = 93;
            var CIRCUMFLEX_ACCENT = 61;
            var LEFT_CURLY_BRACKET = 123;
            var QUESTION_MARK = 63;
            var RIGHT_CURLY_BRACKET = 125;
            var VERTICAL_LINE = 124;
            var TILDE = 126;
            var CONTROL = 128;
            var REPLACEMENT_CHARACTER = 65533;
            var ASTERISK = 42;
            var PLUS_SIGN = 43;
            var COMMA = 44;
            var COLON = 58;
            var SEMICOLON = 59;
            var FULL_STOP = 46;
            var NULL = 0;
            var BACKSPACE = 8;
            var LINE_TABULATION = 11;
            var SHIFT_OUT = 14;
            var INFORMATION_SEPARATOR_ONE = 31;
            var DELETE = 127;
            var EOF = -1;
            var ZERO = 48;
            var a = 97;
            var e = 101;
            var f = 102;
            var u = 117;
            var z = 122;
            var A = 65;
            var E = 69;
            var F = 70;
            var U = 85;
            var Z = 90;
            var isDigit = function(codePoint) {
                return codePoint >= ZERO && codePoint <= 57;
            };
            var isSurrogateCodePoint = function(codePoint) {
                return codePoint >= 55296 && codePoint <= 57343;
            };
            var isHex = function(codePoint) {
                return isDigit(codePoint) || codePoint >= A && codePoint <= F || codePoint >= a && codePoint <= f;
            };
            var isLowerCaseLetter = function(codePoint) {
                return codePoint >= a && codePoint <= z;
            };
            var isUpperCaseLetter = function(codePoint) {
                return codePoint >= A && codePoint <= Z;
            };
            var isLetter = function(codePoint) {
                return isLowerCaseLetter(codePoint) || isUpperCaseLetter(codePoint);
            };
            var isNonASCIICodePoint = function(codePoint) {
                return codePoint >= CONTROL;
            };
            var isWhiteSpace = function(codePoint) {
                return codePoint === LINE_FEED || codePoint === CHARACTER_TABULATION || codePoint === SPACE$1;
            };
            var isNameStartCodePoint = function(codePoint) {
                return isLetter(codePoint) || isNonASCIICodePoint(codePoint) || codePoint === LOW_LINE;
            };
            var isNameCodePoint = function(codePoint) {
                return isNameStartCodePoint(codePoint) || isDigit(codePoint) || codePoint === HYPHEN_MINUS;
            };
            var isNonPrintableCodePoint = function(codePoint) {
                return codePoint >= NULL && codePoint <= BACKSPACE || codePoint === LINE_TABULATION || codePoint >= SHIFT_OUT && codePoint <= INFORMATION_SEPARATOR_ONE || codePoint === DELETE;
            };
            var isValidEscape = function(c1, c2) {
                if (c1 !== REVERSE_SOLIDUS) {
                    return false;
                }
                return c2 !== LINE_FEED;
            };
            var isIdentifierStart = function(c1, c2, c3) {
                if (c1 === HYPHEN_MINUS) {
                    return isNameStartCodePoint(c2) || isValidEscape(c2, c3);
                } else if (isNameStartCodePoint(c1)) {
                    return true;
                } else if (c1 === REVERSE_SOLIDUS && isValidEscape(c1, c2)) {
                    return true;
                }
                return false;
            };
            var isNumberStart = function(c1, c2, c3) {
                if (c1 === PLUS_SIGN || c1 === HYPHEN_MINUS) {
                    if (isDigit(c2)) {
                        return true;
                    }
                    return c2 === FULL_STOP && isDigit(c3);
                }
                if (c1 === FULL_STOP) {
                    return isDigit(c2);
                }
                return isDigit(c1);
            };
            var stringToNumber = function(codePoints) {
                var c = 0;
                var sign = 1;
                if (codePoints[c] === PLUS_SIGN || codePoints[c] === HYPHEN_MINUS) {
                    if (codePoints[c] === HYPHEN_MINUS) {
                        sign = -1;
                    }
                    c++;
                }
                var integers = [];
                while (isDigit(codePoints[c])) {
                    integers.push(codePoints[c++]);
                }
                var int = integers.length ? parseInt(fromCodePoint.apply(void 0, integers), 10) : 0;
                if (codePoints[c] === FULL_STOP) {
                    c++;
                }
                var fraction = [];
                while (isDigit(codePoints[c])) {
                    fraction.push(codePoints[c++]);
                }
                var fracd = fraction.length;
                var frac = fracd ? parseInt(fromCodePoint.apply(void 0, fraction), 10) : 0;
                if (codePoints[c] === E || codePoints[c] === e) {
                    c++;
                }
                var expsign = 1;
                if (codePoints[c] === PLUS_SIGN || codePoints[c] === HYPHEN_MINUS) {
                    if (codePoints[c] === HYPHEN_MINUS) {
                        expsign = -1;
                    }
                    c++;
                }
                var exponent = [];
                while (isDigit(codePoints[c])) {
                    exponent.push(codePoints[c++]);
                }
                var exp = exponent.length ? parseInt(fromCodePoint.apply(void 0, exponent), 10) : 0;
                return sign * (int + frac * Math.pow(10, -fracd)) * Math.pow(10, expsign * exp);
            };
            var LEFT_PARENTHESIS_TOKEN = {
                type: TokenType.LEFT_PARENTHESIS_TOKEN
            };
            var RIGHT_PARENTHESIS_TOKEN = {
                type: TokenType.RIGHT_PARENTHESIS_TOKEN
            };
            var COMMA_TOKEN = {
                type: TokenType.COMMA_TOKEN
            };
            var SUFFIX_MATCH_TOKEN = {
                type: TokenType.SUFFIX_MATCH_TOKEN
            };
            var PREFIX_MATCH_TOKEN = {
                type: TokenType.PREFIX_MATCH_TOKEN
            };
            var COLUMN_TOKEN = {
                type: TokenType.COLUMN_TOKEN
            };
            var DASH_MATCH_TOKEN = {
                type: TokenType.DASH_MATCH_TOKEN
            };
            var INCLUDE_MATCH_TOKEN = {
                type: TokenType.INCLUDE_MATCH_TOKEN
            };
            var LEFT_CURLY_BRACKET_TOKEN = {
                type: TokenType.LEFT_CURLY_BRACKET_TOKEN
            };
            var RIGHT_CURLY_BRACKET_TOKEN = {
                type: TokenType.RIGHT_CURLY_BRACKET_TOKEN
            };
            var SUBSTRING_MATCH_TOKEN = {
                type: TokenType.SUBSTRING_MATCH_TOKEN
            };
            var BAD_URL_TOKEN = {
                type: TokenType.BAD_URL_TOKEN
            };
            var BAD_STRING_TOKEN = {
                type: TokenType.BAD_STRING_TOKEN
            };
            var CDO_TOKEN = {
                type: TokenType.CDO_TOKEN
            };
            var CDC_TOKEN = {
                type: TokenType.CDC_TOKEN
            };
            var COLON_TOKEN = {
                type: TokenType.COLON_TOKEN
            };
            var SEMICOLON_TOKEN = {
                type: TokenType.SEMICOLON_TOKEN
            };
            var LEFT_SQUARE_BRACKET_TOKEN = {
                type: TokenType.LEFT_SQUARE_BRACKET_TOKEN
            };
            var RIGHT_SQUARE_BRACKET_TOKEN = {
                type: TokenType.RIGHT_SQUARE_BRACKET_TOKEN
            };
            var WHITESPACE_TOKEN = {
                type: TokenType.WHITESPACE_TOKEN
            };
            var EOF_TOKEN = {
                type: TokenType.EOF_TOKEN
            };
            var Tokenizer = function() {
                function Tokenizer2() {
                    this._value = [];
                }
                Tokenizer2.prototype.write = function(chunk) {
                    this._value = this._value.concat(toCodePoints(chunk));
                };
                Tokenizer2.prototype.read = function() {
                    var tokens = [];
                    var token = this.consumeToken();
                    while (token !== EOF_TOKEN) {
                        tokens.push(token);
                        token = this.consumeToken();
                    }
                    return tokens;
                };
                Tokenizer2.prototype.consumeToken = function() {
                    var codePoint = this.consumeCodePoint();
                    switch (codePoint) {
                        case QUOTATION_MARK:
                            return this.consumeStringToken(QUOTATION_MARK);
                        case NUMBER_SIGN:
                            var c1 = this.peekCodePoint(0);
                            var c2 = this.peekCodePoint(1);
                            var c3 = this.peekCodePoint(2);
                            if (isNameCodePoint(c1) || isValidEscape(c2, c3)) {
                                var flags = isIdentifierStart(c1, c2, c3) ? FLAG_ID : FLAG_UNRESTRICTED;
                                var value = this.consumeName();
                                return {
                                    type: TokenType.HASH_TOKEN,
                                    value,
                                    flags
                                };
                            }
                            break;
                        case DOLLAR_SIGN:
                            if (this.peekCodePoint(0) === EQUALS_SIGN) {
                                this.consumeCodePoint();
                                return SUFFIX_MATCH_TOKEN;
                            }
                            break;
                        case APOSTROPHE:
                            return this.consumeStringToken(APOSTROPHE);
                        case LEFT_PARENTHESIS:
                            return LEFT_PARENTHESIS_TOKEN;
                        case RIGHT_PARENTHESIS:
                            return RIGHT_PARENTHESIS_TOKEN;
                        case ASTERISK:
                            if (this.peekCodePoint(0) === EQUALS_SIGN) {
                                this.consumeCodePoint();
                                return SUBSTRING_MATCH_TOKEN;
                            }
                            break;
                        case PLUS_SIGN:
                            if (isNumberStart(codePoint, this.peekCodePoint(0), this.peekCodePoint(1))) {
                                this.reconsumeCodePoint(codePoint);
                                return this.consumeNumericToken();
                            }
                            break;
                        case COMMA:
                            return COMMA_TOKEN;
                        case HYPHEN_MINUS:
                            var e1 = codePoint;
                            var e2 = this.peekCodePoint(0);
                            var e3 = this.peekCodePoint(1);
                            if (isNumberStart(e1, e2, e3)) {
                                this.reconsumeCodePoint(codePoint);
                                return this.consumeNumericToken();
                            }
                            if (isIdentifierStart(e1, e2, e3)) {
                                this.reconsumeCodePoint(codePoint);
                                return this.consumeIdentLikeToken();
                            }
                            if (e2 === HYPHEN_MINUS && e3 === GREATER_THAN_SIGN) {
                                this.consumeCodePoint();
                                this.consumeCodePoint();
                                return CDC_TOKEN;
                            }
                            break;
                        case FULL_STOP:
                            if (isNumberStart(codePoint, this.peekCodePoint(0), this.peekCodePoint(1))) {
                                this.reconsumeCodePoint(codePoint);
                                return this.consumeNumericToken();
                            }
                            break;
                        case SOLIDUS:
                            if (this.peekCodePoint(0) === ASTERISK) {
                                this.consumeCodePoint();
                                while (true) {
                                    var c = this.consumeCodePoint();
                                    if (c === ASTERISK) {
                                        c = this.consumeCodePoint();
                                        if (c === SOLIDUS) {
                                            return this.consumeToken();
                                        }
                                    }
                                    if (c === EOF) {
                                        return this.consumeToken();
                                    }
                                }
                            }
                            break;
                        case COLON:
                            return COLON_TOKEN;
                        case SEMICOLON:
                            return SEMICOLON_TOKEN;
                        case LESS_THAN_SIGN:
                            if (this.peekCodePoint(0) === EXCLAMATION_MARK && this.peekCodePoint(1) === HYPHEN_MINUS && this.peekCodePoint(2) === HYPHEN_MINUS) {
                                this.consumeCodePoint();
                                this.consumeCodePoint();
                                return CDO_TOKEN;
                            }
                            break;
                        case COMMERCIAL_AT:
                            var a1 = this.peekCodePoint(0);
                            var a2 = this.peekCodePoint(1);
                            var a3 = this.peekCodePoint(2);
                            if (isIdentifierStart(a1, a2, a3)) {
                                var value = this.consumeName();
                                return {
                                    type: TokenType.AT_KEYWORD_TOKEN,
                                    value
                                };
                            }
                            break;
                        case LEFT_SQUARE_BRACKET:
                            return LEFT_SQUARE_BRACKET_TOKEN;
                        case REVERSE_SOLIDUS:
                            if (isValidEscape(codePoint, this.peekCodePoint(0))) {
                                this.reconsumeCodePoint(codePoint);
                                return this.consumeIdentLikeToken();
                            }
                            break;
                        case RIGHT_SQUARE_BRACKET:
                            return RIGHT_SQUARE_BRACKET_TOKEN;
                        case CIRCUMFLEX_ACCENT:
                            if (this.peekCodePoint(0) === EQUALS_SIGN) {
                                this.consumeCodePoint();
                                return PREFIX_MATCH_TOKEN;
                            }
                            break;
                        case LEFT_CURLY_BRACKET:
                            return LEFT_CURLY_BRACKET_TOKEN;
                        case RIGHT_CURLY_BRACKET:
                            return RIGHT_CURLY_BRACKET_TOKEN;
                        case u:
                        case U:
                            var u1 = this.peekCodePoint(0);
                            var u2 = this.peekCodePoint(1);
                            if (u1 === PLUS_SIGN && (isHex(u2) || u2 === QUESTION_MARK)) {
                                this.consumeCodePoint();
                                this.consumeUnicodeRangeToken();
                            }
                            this.reconsumeCodePoint(codePoint);
                            return this.consumeIdentLikeToken();
                        case VERTICAL_LINE:
                            if (this.peekCodePoint(0) === EQUALS_SIGN) {
                                this.consumeCodePoint();
                                return DASH_MATCH_TOKEN;
                            }
                            if (this.peekCodePoint(0) === VERTICAL_LINE) {
                                this.consumeCodePoint();
                                return COLUMN_TOKEN;
                            }
                            break;
                        case TILDE:
                            if (this.peekCodePoint(0) === EQUALS_SIGN) {
                                this.consumeCodePoint();
                                return INCLUDE_MATCH_TOKEN;
                            }
                            break;
                        case EOF:
                            return EOF_TOKEN;
                    }
                    if (isWhiteSpace(codePoint)) {
                        this.consumeWhiteSpace();
                        return WHITESPACE_TOKEN;
                    }
                    if (isDigit(codePoint)) {
                        this.reconsumeCodePoint(codePoint);
                        return this.consumeNumericToken();
                    }
                    if (isNameStartCodePoint(codePoint)) {
                        this.reconsumeCodePoint(codePoint);
                        return this.consumeIdentLikeToken();
                    }
                    return {
                        type: TokenType.DELIM_TOKEN,
                        value: fromCodePoint(codePoint)
                    };
                };
                Tokenizer2.prototype.consumeCodePoint = function() {
                    var value = this._value.shift();
                    return typeof value === "undefined" ? -1 : value;
                };
                Tokenizer2.prototype.reconsumeCodePoint = function(codePoint) {
                    this._value.unshift(codePoint);
                };
                Tokenizer2.prototype.peekCodePoint = function(delta) {
                    if (delta >= this._value.length) {
                        return -1;
                    }
                    return this._value[delta];
                };
                Tokenizer2.prototype.consumeUnicodeRangeToken = function() {
                    var digits = [];
                    var codePoint = this.consumeCodePoint();
                    while (isHex(codePoint) && digits.length < 6) {
                        digits.push(codePoint);
                        codePoint = this.consumeCodePoint();
                    }
                    var questionMarks = false;
                    while (codePoint === QUESTION_MARK && digits.length < 6) {
                        digits.push(codePoint);
                        codePoint = this.consumeCodePoint();
                        questionMarks = true;
                    }
                    if (questionMarks) {
                        var start_1 = parseInt(fromCodePoint.apply(void 0, digits.map(function(digit) {
                            return digit === QUESTION_MARK ? ZERO : digit;
                        })), 16);
                        var end = parseInt(fromCodePoint.apply(void 0, digits.map(function(digit) {
                            return digit === QUESTION_MARK ? F : digit;
                        })), 16);
                        return {
                            type: TokenType.UNICODE_RANGE_TOKEN,
                            start: start_1,
                            end
                        };
                    }
                    var start = parseInt(fromCodePoint.apply(void 0, digits), 16);
                    if (this.peekCodePoint(0) === HYPHEN_MINUS && isHex(this.peekCodePoint(1))) {
                        this.consumeCodePoint();
                        codePoint = this.consumeCodePoint();
                        var endDigits = [];
                        while (isHex(codePoint) && endDigits.length < 6) {
                            endDigits.push(codePoint);
                            codePoint = this.consumeCodePoint();
                        }
                        var end = parseInt(fromCodePoint.apply(void 0, endDigits), 16);
                        return {
                            type: TokenType.UNICODE_RANGE_TOKEN,
                            start,
                            end
                        };
                    } else {
                        return {
                            type: TokenType.UNICODE_RANGE_TOKEN,
                            start,
                            end: start
                        };
                    }
                };
                Tokenizer2.prototype.consumeIdentLikeToken = function() {
                    var value = this.consumeName();
                    if (value.toLowerCase() === "url" && this.peekCodePoint(0) === LEFT_PARENTHESIS) {
                        this.consumeCodePoint();
                        return this.consumeUrlToken();
                    } else if (this.peekCodePoint(0) === LEFT_PARENTHESIS) {
                        this.consumeCodePoint();
                        return {
                            type: TokenType.FUNCTION_TOKEN,
                            value
                        };
                    }
                    return {
                        type: TokenType.IDENT_TOKEN,
                        value
                    };
                };
                Tokenizer2.prototype.consumeUrlToken = function() {
                    var value = [];
                    this.consumeWhiteSpace();
                    if (this.peekCodePoint(0) === EOF) {
                        return {
                            type: TokenType.URL_TOKEN,
                            value: ""
                        };
                    }
                    var next = this.peekCodePoint(0);
                    if (next === APOSTROPHE || next === QUOTATION_MARK) {
                        var stringToken = this.consumeStringToken(this.consumeCodePoint());
                        if (stringToken.type === TokenType.STRING_TOKEN) {
                            this.consumeWhiteSpace();
                            if (this.peekCodePoint(0) === EOF || this.peekCodePoint(0) === RIGHT_PARENTHESIS) {
                                this.consumeCodePoint();
                                return {
                                    type: TokenType.URL_TOKEN,
                                    value: stringToken.value
                                };
                            }
                        }
                        this.consumeBadUrlRemnants();
                        return BAD_URL_TOKEN;
                    }
                    while (true) {
                        var codePoint = this.consumeCodePoint();
                        if (codePoint === EOF || codePoint === RIGHT_PARENTHESIS) {
                            return {
                                type: TokenType.URL_TOKEN,
                                value: fromCodePoint.apply(void 0, value)
                            };
                        } else if (isWhiteSpace(codePoint)) {
                            this.consumeWhiteSpace();
                            if (this.peekCodePoint(0) === EOF || this.peekCodePoint(0) === RIGHT_PARENTHESIS) {
                                this.consumeCodePoint();
                                return {
                                    type: TokenType.URL_TOKEN,
                                    value: fromCodePoint.apply(void 0, value)
                                };
                            }
                            this.consumeBadUrlRemnants();
                            return BAD_URL_TOKEN;
                        } else if (codePoint === QUOTATION_MARK || codePoint === APOSTROPHE || codePoint === LEFT_PARENTHESIS || isNonPrintableCodePoint(codePoint)) {
                            this.consumeBadUrlRemnants();
                            return BAD_URL_TOKEN;
                        } else if (codePoint === REVERSE_SOLIDUS) {
                            if (isValidEscape(codePoint, this.peekCodePoint(0))) {
                                value.push(this.consumeEscapedCodePoint());
                            } else {
                                this.consumeBadUrlRemnants();
                                return BAD_URL_TOKEN;
                            }
                        } else {
                            value.push(codePoint);
                        }
                    }
                };
                Tokenizer2.prototype.consumeWhiteSpace = function() {
                    while (isWhiteSpace(this.peekCodePoint(0))) {
                        this.consumeCodePoint();
                    }
                };
                Tokenizer2.prototype.consumeBadUrlRemnants = function() {
                    while (true) {
                        var codePoint = this.consumeCodePoint();
                        if (codePoint === RIGHT_PARENTHESIS || codePoint === EOF) {
                            return;
                        }
                        if (isValidEscape(codePoint, this.peekCodePoint(0))) {
                            this.consumeEscapedCodePoint();
                        }
                    }
                };
                Tokenizer2.prototype.consumeStringSlice = function(count) {
                    var SLICE_STACK_SIZE = 6e4;
                    var value = "";
                    while (count > 0) {
                        var amount = Math.min(SLICE_STACK_SIZE, count);
                        value += fromCodePoint.apply(void 0, this._value.splice(0, amount));
                        count -= amount;
                    }
                    this._value.shift();
                    return value;
                };
                Tokenizer2.prototype.consumeStringToken = function(endingCodePoint) {
                    var value = "";
                    var i2 = 0;
                    do {
                        var codePoint = this._value[i2];
                        if (codePoint === EOF || codePoint === void 0 || codePoint === endingCodePoint) {
                            value += this.consumeStringSlice(i2);
                            return {
                                type: TokenType.STRING_TOKEN,
                                value
                            };
                        }
                        if (codePoint === LINE_FEED) {
                            this._value.splice(0, i2);
                            return BAD_STRING_TOKEN;
                        }
                        if (codePoint === REVERSE_SOLIDUS) {
                            var next = this._value[i2 + 1];
                            if (next !== EOF && next !== void 0) {
                                if (next === LINE_FEED) {
                                    value += this.consumeStringSlice(i2);
                                    i2 = -1;
                                    this._value.shift();
                                } else if (isValidEscape(codePoint, next)) {
                                    value += this.consumeStringSlice(i2);
                                    value += fromCodePoint(this.consumeEscapedCodePoint());
                                    i2 = -1;
                                }
                            }
                        }
                        i2++;
                    } while (true);
                };
                Tokenizer2.prototype.consumeNumber = function() {
                    var repr = [];
                    var type = FLAG_INTEGER;
                    var c1 = this.peekCodePoint(0);
                    if (c1 === PLUS_SIGN || c1 === HYPHEN_MINUS) {
                        repr.push(this.consumeCodePoint());
                    }
                    while (isDigit(this.peekCodePoint(0))) {
                        repr.push(this.consumeCodePoint());
                    }
                    c1 = this.peekCodePoint(0);
                    var c2 = this.peekCodePoint(1);
                    if (c1 === FULL_STOP && isDigit(c2)) {
                        repr.push(this.consumeCodePoint(), this.consumeCodePoint());
                        type = FLAG_NUMBER;
                        while (isDigit(this.peekCodePoint(0))) {
                            repr.push(this.consumeCodePoint());
                        }
                    }
                    c1 = this.peekCodePoint(0);
                    c2 = this.peekCodePoint(1);
                    var c3 = this.peekCodePoint(2);
                    if ((c1 === E || c1 === e) && ((c2 === PLUS_SIGN || c2 === HYPHEN_MINUS) && isDigit(c3) || isDigit(c2))) {
                        repr.push(this.consumeCodePoint(), this.consumeCodePoint());
                        type = FLAG_NUMBER;
                        while (isDigit(this.peekCodePoint(0))) {
                            repr.push(this.consumeCodePoint());
                        }
                    }
                    return [stringToNumber(repr), type];
                };
                Tokenizer2.prototype.consumeNumericToken = function() {
                    var _a = this.consumeNumber(),
                        number = _a[0],
                        flags = _a[1];
                    var c1 = this.peekCodePoint(0);
                    var c2 = this.peekCodePoint(1);
                    var c3 = this.peekCodePoint(2);
                    if (isIdentifierStart(c1, c2, c3)) {
                        var unit = this.consumeName();
                        return {
                            type: TokenType.DIMENSION_TOKEN,
                            number,
                            flags,
                            unit
                        };
                    }
                    if (c1 === PERCENTAGE_SIGN) {
                        this.consumeCodePoint();
                        return {
                            type: TokenType.PERCENTAGE_TOKEN,
                            number,
                            flags
                        };
                    }
                    return {
                        type: TokenType.NUMBER_TOKEN,
                        number,
                        flags
                    };
                };
                Tokenizer2.prototype.consumeEscapedCodePoint = function() {
                    var codePoint = this.consumeCodePoint();
                    if (isHex(codePoint)) {
                        var hex = fromCodePoint(codePoint);
                        while (isHex(this.peekCodePoint(0)) && hex.length < 6) {
                            hex += fromCodePoint(this.consumeCodePoint());
                        }
                        if (isWhiteSpace(this.peekCodePoint(0))) {
                            this.consumeCodePoint();
                        }
                        var hexCodePoint = parseInt(hex, 16);
                        if (hexCodePoint === 0 || isSurrogateCodePoint(hexCodePoint) || hexCodePoint > 1114111) {
                            return REPLACEMENT_CHARACTER;
                        }
                        return hexCodePoint;
                    }
                    if (codePoint === EOF) {
                        return REPLACEMENT_CHARACTER;
                    }
                    return codePoint;
                };
                Tokenizer2.prototype.consumeName = function() {
                    var result = "";
                    while (true) {
                        var codePoint = this.consumeCodePoint();
                        if (isNameCodePoint(codePoint)) {
                            result += fromCodePoint(codePoint);
                        } else if (isValidEscape(codePoint, this.peekCodePoint(0))) {
                            result += fromCodePoint(this.consumeEscapedCodePoint());
                        } else {
                            this.reconsumeCodePoint(codePoint);
                            return result;
                        }
                    }
                };
                return Tokenizer2;
            }();
            var Parser = function() {
                function Parser2(tokens) {
                    this._tokens = tokens;
                }
                Parser2.create = function(value) {
                    var tokenizer = new Tokenizer();
                    tokenizer.write(value);
                    return new Parser2(tokenizer.read());
                };
                Parser2.parseValue = function(value) {
                    return Parser2.create(value).parseComponentValue();
                };
                Parser2.parseValues = function(value) {
                    return Parser2.create(value).parseComponentValues();
                };
                Parser2.prototype.parseComponentValue = function() {
                    var token = this.consumeToken();
                    while (token.type === TokenType.WHITESPACE_TOKEN) {
                        token = this.consumeToken();
                    }
                    if (token.type === TokenType.EOF_TOKEN) {
                        throw new SyntaxError("Error parsing CSS component value, unexpected EOF");
                    }
                    this.reconsumeToken(token);
                    var value = this.consumeComponentValue();
                    do {
                        token = this.consumeToken();
                    } while (token.type === TokenType.WHITESPACE_TOKEN);
                    if (token.type === TokenType.EOF_TOKEN) {
                        return value;
                    }
                    throw new SyntaxError("Error parsing CSS component value, multiple values found when expecting only one");
                };
                Parser2.prototype.parseComponentValues = function() {
                    var values = [];
                    while (true) {
                        var value = this.consumeComponentValue();
                        if (value.type === TokenType.EOF_TOKEN) {
                            return values;
                        }
                        values.push(value);
                        values.push();
                    }
                };
                Parser2.prototype.consumeComponentValue = function() {
                    var token = this.consumeToken();
                    switch (token.type) {
                        case TokenType.LEFT_CURLY_BRACKET_TOKEN:
                        case TokenType.LEFT_SQUARE_BRACKET_TOKEN:
                        case TokenType.LEFT_PARENTHESIS_TOKEN:
                            return this.consumeSimpleBlock(token.type);
                        case TokenType.FUNCTION_TOKEN:
                            return this.consumeFunction(token);
                    }
                    return token;
                };
                Parser2.prototype.consumeSimpleBlock = function(type) {
                    var block = {
                        type,
                        values: []
                    };
                    var token = this.consumeToken();
                    while (true) {
                        if (token.type === TokenType.EOF_TOKEN || isEndingTokenFor(token, type)) {
                            return block;
                        }
                        this.reconsumeToken(token);
                        block.values.push(this.consumeComponentValue());
                        token = this.consumeToken();
                    }
                };
                Parser2.prototype.consumeFunction = function(functionToken) {
                    var cssFunction = {
                        name: functionToken.value,
                        values: [],
                        type: TokenType.FUNCTION
                    };
                    while (true) {
                        var token = this.consumeToken();
                        if (token.type === TokenType.EOF_TOKEN || token.type === TokenType.RIGHT_PARENTHESIS_TOKEN) {
                            return cssFunction;
                        }
                        this.reconsumeToken(token);
                        cssFunction.values.push(this.consumeComponentValue());
                    }
                };
                Parser2.prototype.consumeToken = function() {
                    var token = this._tokens.shift();
                    return typeof token === "undefined" ? EOF_TOKEN : token;
                };
                Parser2.prototype.reconsumeToken = function(token) {
                    this._tokens.unshift(token);
                };
                return Parser2;
            }();
            var isDimensionToken = function(token) {
                return token.type === TokenType.DIMENSION_TOKEN;
            };
            var isNumberToken = function(token) {
                return token.type === TokenType.NUMBER_TOKEN;
            };
            var isIdentToken = function(token) {
                return token.type === TokenType.IDENT_TOKEN;
            };
            var isStringToken = function(token) {
                return token.type === TokenType.STRING_TOKEN;
            };
            var isIdentWithValue = function(token, value) {
                return isIdentToken(token) && token.value === value;
            };
            var nonWhiteSpace = function(token) {
                return token.type !== TokenType.WHITESPACE_TOKEN;
            };
            var nonFunctionArgSeparator = function(token) {
                return token.type !== TokenType.WHITESPACE_TOKEN && token.type !== TokenType.COMMA_TOKEN;
            };
            var parseFunctionArgs = function(tokens) {
                var args = [];
                var arg = [];
                tokens.forEach(function(token) {
                    if (token.type === TokenType.COMMA_TOKEN) {
                        if (arg.length === 0) {
                            throw new Error("Error parsing function args, zero tokens for arg");
                        }
                        args.push(arg);
                        arg = [];
                        return;
                    }
                    if (token.type !== TokenType.WHITESPACE_TOKEN) {
                        arg.push(token);
                    }
                });
                if (arg.length) {
                    args.push(arg);
                }
                return args;
            };
            var isEndingTokenFor = function(token, type) {
                if (type === TokenType.LEFT_CURLY_BRACKET_TOKEN && token.type === TokenType.RIGHT_CURLY_BRACKET_TOKEN) {
                    return true;
                }
                if (type === TokenType.LEFT_SQUARE_BRACKET_TOKEN && token.type === TokenType.RIGHT_SQUARE_BRACKET_TOKEN) {
                    return true;
                }
                return type === TokenType.LEFT_PARENTHESIS_TOKEN && token.type === TokenType.RIGHT_PARENTHESIS_TOKEN;
            };
            var isLength = function(token) {
                return token.type === TokenType.NUMBER_TOKEN || token.type === TokenType.DIMENSION_TOKEN;
            };
            var isLengthPercentage = function(token) {
                return token.type === TokenType.PERCENTAGE_TOKEN || isLength(token);
            };
            var parseLengthPercentageTuple = function(tokens) {
                return tokens.length > 1 ? [tokens[0], tokens[1]] : [tokens[0]];
            };
            var ZERO_LENGTH = {
                type: TokenType.NUMBER_TOKEN,
                number: 0,
                flags: FLAG_INTEGER
            };
            var FIFTY_PERCENT = {
                type: TokenType.PERCENTAGE_TOKEN,
                number: 50,
                flags: FLAG_INTEGER
            };
            var HUNDRED_PERCENT = {
                type: TokenType.PERCENTAGE_TOKEN,
                number: 100,
                flags: FLAG_INTEGER
            };
            var getAbsoluteValueForTuple = function(tuple, width, height) {
                var x = tuple[0],
                    y = tuple[1];
                return [getAbsoluteValue(x, width), getAbsoluteValue(typeof y !== "undefined" ? y : x, height)];
            };
            var getAbsoluteValue = function(token, parent) {
                if (token.type === TokenType.PERCENTAGE_TOKEN) {
                    return token.number / 100 * parent;
                }
                if (isDimensionToken(token)) {
                    switch (token.unit) {
                        case "rem":
                        case "em":
                            return 16 * token.number;
                        case "px":
                        default:
                            return token.number;
                    }
                }
                return token.number;
            };
            var DEG = "deg";
            var GRAD = "grad";
            var RAD = "rad";
            var TURN = "turn";
            var angle = {
                name: "angle",
                parse: function(value) {
                    if (value.type === TokenType.DIMENSION_TOKEN) {
                        switch (value.unit) {
                            case DEG:
                                return Math.PI * value.number / 180;
                            case GRAD:
                                return Math.PI / 200 * value.number;
                            case RAD:
                                return value.number;
                            case TURN:
                                return Math.PI * 2 * value.number;
                        }
                    }
                    throw new Error("Unsupported angle type");
                }
            };
            var isAngle = function(value) {
                if (value.type === TokenType.DIMENSION_TOKEN) {
                    if (value.unit === DEG || value.unit === GRAD || value.unit === RAD || value.unit === TURN) {
                        return true;
                    }
                }
                return false;
            };
            var parseNamedSide = function(tokens) {
                var sideOrCorner = tokens.filter(isIdentToken).map(function(ident) {
                    return ident.value;
                }).join(" ");
                switch (sideOrCorner) {
                    case "to bottom right":
                    case "to right bottom":
                    case "left top":
                    case "top left":
                        return [ZERO_LENGTH, ZERO_LENGTH];
                    case "to top":
                    case "bottom":
                        return deg(0);
                    case "to bottom left":
                    case "to left bottom":
                    case "right top":
                    case "top right":
                        return [ZERO_LENGTH, HUNDRED_PERCENT];
                    case "to right":
                    case "left":
                        return deg(90);
                    case "to top left":
                    case "to left top":
                    case "right bottom":
                    case "bottom right":
                        return [HUNDRED_PERCENT, HUNDRED_PERCENT];
                    case "to bottom":
                    case "top":
                        return deg(180);
                    case "to top right":
                    case "to right top":
                    case "left bottom":
                    case "bottom left":
                        return [HUNDRED_PERCENT, ZERO_LENGTH];
                    case "to left":
                    case "right":
                        return deg(270);
                }
                return 0;
            };
            var deg = function(deg2) {
                return Math.PI * deg2 / 180;
            };
            var color = {
                name: "color",
                parse: function(value) {
                    if (value.type === TokenType.FUNCTION) {
                        var colorFunction = SUPPORTED_COLOR_FUNCTIONS[value.name];
                        if (typeof colorFunction === "undefined") {
                            throw new Error('Attempting to parse an unsupported color function "' + value.name + '"');
                        }
                        return colorFunction(value.values);
                    }
                    if (value.type === TokenType.HASH_TOKEN) {
                        if (value.value.length === 3) {
                            var r = value.value.substring(0, 1);
                            var g = value.value.substring(1, 2);
                            var b = value.value.substring(2, 3);
                            return pack(parseInt(r + r, 16), parseInt(g + g, 16), parseInt(b + b, 16), 1);
                        }
                        if (value.value.length === 4) {
                            var r = value.value.substring(0, 1);
                            var g = value.value.substring(1, 2);
                            var b = value.value.substring(2, 3);
                            var a2 = value.value.substring(3, 4);
                            return pack(parseInt(r + r, 16), parseInt(g + g, 16), parseInt(b + b, 16), parseInt(a2 + a2, 16) / 255);
                        }
                        if (value.value.length === 6) {
                            var r = value.value.substring(0, 2);
                            var g = value.value.substring(2, 4);
                            var b = value.value.substring(4, 6);
                            return pack(parseInt(r, 16), parseInt(g, 16), parseInt(b, 16), 1);
                        }
                        if (value.value.length === 8) {
                            var r = value.value.substring(0, 2);
                            var g = value.value.substring(2, 4);
                            var b = value.value.substring(4, 6);
                            var a2 = value.value.substring(6, 8);
                            return pack(parseInt(r, 16), parseInt(g, 16), parseInt(b, 16), parseInt(a2, 16) / 255);
                        }
                    }
                    if (value.type === TokenType.IDENT_TOKEN) {
                        var namedColor = COLORS[value.value.toUpperCase()];
                        if (typeof namedColor !== "undefined") {
                            return namedColor;
                        }
                    }
                    return COLORS.TRANSPARENT;
                }
            };
            var isTransparent = function(color2) {
                return (255 & color2) === 0;
            };
            var asString = function(color2) {
                var alpha = 255 & color2;
                var blue = 255 & color2 >> 8;
                var green = 255 & color2 >> 16;
                var red = 255 & color2 >> 24;
                return alpha < 255 ? "rgba(" + red + "," + green + "," + blue + "," + alpha / 255 + ")" : "rgb(" + red + "," + green + "," + blue + ")";
            };
            var pack = function(r, g, b, a2) {
                return (r << 24 | g << 16 | b << 8 | Math.round(a2 * 255) << 0) >>> 0;
            };
            var getTokenColorValue = function(token, i2) {
                if (token.type === TokenType.NUMBER_TOKEN) {
                    return token.number;
                }
                if (token.type === TokenType.PERCENTAGE_TOKEN) {
                    var max = i2 === 3 ? 1 : 255;
                    return i2 === 3 ? token.number / 100 * max : Math.round(token.number / 100 * max);
                }
                return 0;
            };
            var rgb = function(args) {
                var tokens = args.filter(nonFunctionArgSeparator);
                if (tokens.length === 3) {
                    var _a = tokens.map(getTokenColorValue),
                        r = _a[0],
                        g = _a[1],
                        b = _a[2];
                    return pack(r, g, b, 1);
                }
                if (tokens.length === 4) {
                    var _b = tokens.map(getTokenColorValue),
                        r = _b[0],
                        g = _b[1],
                        b = _b[2],
                        a2 = _b[3];
                    return pack(r, g, b, a2);
                }
                return 0;
            };

            function hue2rgb(t1, t2, hue) {
                if (hue < 0) {
                    hue += 1;
                }
                if (hue >= 1) {
                    hue -= 1;
                }
                if (hue < 1 / 6) {
                    return (t2 - t1) * hue * 6 + t1;
                } else if (hue < 1 / 2) {
                    return t2;
                } else if (hue < 2 / 3) {
                    return (t2 - t1) * 6 * (2 / 3 - hue) + t1;
                } else {
                    return t1;
                }
            }
            var hsl = function(args) {
                var tokens = args.filter(nonFunctionArgSeparator);
                var hue = tokens[0],
                    saturation = tokens[1],
                    lightness = tokens[2],
                    alpha = tokens[3];
                var h = (hue.type === TokenType.NUMBER_TOKEN ? deg(hue.number) : angle.parse(hue)) / (Math.PI * 2);
                var s = isLengthPercentage(saturation) ? saturation.number / 100 : 0;
                var l = isLengthPercentage(lightness) ? lightness.number / 100 : 0;
                var a2 = typeof alpha !== "undefined" && isLengthPercentage(alpha) ? getAbsoluteValue(alpha, 1) : 1;
                if (s === 0) {
                    return pack(l * 255, l * 255, l * 255, 1);
                }
                var t2 = l <= 0.5 ? l * (s + 1) : l + s - l * s;
                var t1 = l * 2 - t2;
                var r = hue2rgb(t1, t2, h + 1 / 3);
                var g = hue2rgb(t1, t2, h);
                var b = hue2rgb(t1, t2, h - 1 / 3);
                return pack(r * 255, g * 255, b * 255, a2);
            };
            var SUPPORTED_COLOR_FUNCTIONS = {
                hsl,
                hsla: hsl,
                rgb,
                rgba: rgb
            };
            var COLORS = {
                ALICEBLUE: 4042850303,
                ANTIQUEWHITE: 4209760255,
                AQUA: 16777215,
                AQUAMARINE: 2147472639,
                AZURE: 4043309055,
                BEIGE: 4126530815,
                BISQUE: 4293182719,
                BLACK: 255,
                BLANCHEDALMOND: 4293643775,
                BLUE: 65535,
                BLUEVIOLET: 2318131967,
                BROWN: 2771004159,
                BURLYWOOD: 3736635391,
                CADETBLUE: 1604231423,
                CHARTREUSE: 2147418367,
                CHOCOLATE: 3530104575,
                CORAL: 4286533887,
                CORNFLOWERBLUE: 1687547391,
                CORNSILK: 4294499583,
                CRIMSON: 3692313855,
                CYAN: 16777215,
                DARKBLUE: 35839,
                DARKCYAN: 9145343,
                DARKGOLDENROD: 3095837695,
                DARKGRAY: 2846468607,
                DARKGREEN: 6553855,
                DARKGREY: 2846468607,
                DARKKHAKI: 3182914559,
                DARKMAGENTA: 2332068863,
                DARKOLIVEGREEN: 1433087999,
                DARKORANGE: 4287365375,
                DARKORCHID: 2570243327,
                DARKRED: 2332033279,
                DARKSALMON: 3918953215,
                DARKSEAGREEN: 2411499519,
                DARKSLATEBLUE: 1211993087,
                DARKSLATEGRAY: 793726975,
                DARKSLATEGREY: 793726975,
                DARKTURQUOISE: 13554175,
                DARKVIOLET: 2483082239,
                DEEPPINK: 4279538687,
                DEEPSKYBLUE: 12582911,
                DIMGRAY: 1768516095,
                DIMGREY: 1768516095,
                DODGERBLUE: 512819199,
                FIREBRICK: 2988581631,
                FLORALWHITE: 4294635775,
                FORESTGREEN: 579543807,
                FUCHSIA: 4278255615,
                GAINSBORO: 3705462015,
                GHOSTWHITE: 4177068031,
                GOLD: 4292280575,
                GOLDENROD: 3668254975,
                GRAY: 2155905279,
                GREEN: 8388863,
                GREENYELLOW: 2919182335,
                GREY: 2155905279,
                HONEYDEW: 4043305215,
                HOTPINK: 4285117695,
                INDIANRED: 3445382399,
                INDIGO: 1258324735,
                IVORY: 4294963455,
                KHAKI: 4041641215,
                LAVENDER: 3873897215,
                LAVENDERBLUSH: 4293981695,
                LAWNGREEN: 2096890111,
                LEMONCHIFFON: 4294626815,
                LIGHTBLUE: 2916673279,
                LIGHTCORAL: 4034953471,
                LIGHTCYAN: 3774873599,
                LIGHTGOLDENRODYELLOW: 4210742015,
                LIGHTGRAY: 3553874943,
                LIGHTGREEN: 2431553791,
                LIGHTGREY: 3553874943,
                LIGHTPINK: 4290167295,
                LIGHTSALMON: 4288707327,
                LIGHTSEAGREEN: 548580095,
                LIGHTSKYBLUE: 2278488831,
                LIGHTSLATEGRAY: 2005441023,
                LIGHTSLATEGREY: 2005441023,
                LIGHTSTEELBLUE: 2965692159,
                LIGHTYELLOW: 4294959359,
                LIME: 16711935,
                LIMEGREEN: 852308735,
                LINEN: 4210091775,
                MAGENTA: 4278255615,
                MAROON: 2147483903,
                MEDIUMAQUAMARINE: 1724754687,
                MEDIUMBLUE: 52735,
                MEDIUMORCHID: 3126187007,
                MEDIUMPURPLE: 2473647103,
                MEDIUMSEAGREEN: 1018393087,
                MEDIUMSLATEBLUE: 2070474495,
                MEDIUMSPRINGGREEN: 16423679,
                MEDIUMTURQUOISE: 1221709055,
                MEDIUMVIOLETRED: 3340076543,
                MIDNIGHTBLUE: 421097727,
                MINTCREAM: 4127193855,
                MISTYROSE: 4293190143,
                MOCCASIN: 4293178879,
                NAVAJOWHITE: 4292783615,
                NAVY: 33023,
                OLDLACE: 4260751103,
                OLIVE: 2155872511,
                OLIVEDRAB: 1804477439,
                ORANGE: 4289003775,
                ORANGERED: 4282712319,
                ORCHID: 3664828159,
                PALEGOLDENROD: 4008225535,
                PALEGREEN: 2566625535,
                PALETURQUOISE: 2951671551,
                PALEVIOLETRED: 3681588223,
                PAPAYAWHIP: 4293907967,
                PEACHPUFF: 4292524543,
                PERU: 3448061951,
                PINK: 4290825215,
                PLUM: 3718307327,
                POWDERBLUE: 2967529215,
                PURPLE: 2147516671,
                REBECCAPURPLE: 1714657791,
                RED: 4278190335,
                ROSYBROWN: 3163525119,
                ROYALBLUE: 1097458175,
                SADDLEBROWN: 2336560127,
                SALMON: 4202722047,
                SANDYBROWN: 4104413439,
                SEAGREEN: 780883967,
                SEASHELL: 4294307583,
                SIENNA: 2689740287,
                SILVER: 3233857791,
                SKYBLUE: 2278484991,
                SLATEBLUE: 1784335871,
                SLATEGRAY: 1887473919,
                SLATEGREY: 1887473919,
                SNOW: 4294638335,
                SPRINGGREEN: 16744447,
                STEELBLUE: 1182971135,
                TAN: 3535047935,
                TEAL: 8421631,
                THISTLE: 3636451583,
                TOMATO: 4284696575,
                TRANSPARENT: 0,
                TURQUOISE: 1088475391,
                VIOLET: 4001558271,
                WHEAT: 4125012991,
                WHITE: 4294967295,
                WHITESMOKE: 4126537215,
                YELLOW: 4294902015,
                YELLOWGREEN: 2597139199
            };
            var PropertyDescriptorParsingType;
            (function(PropertyDescriptorParsingType2) {
                PropertyDescriptorParsingType2[PropertyDescriptorParsingType2["VALUE"] = 0] = "VALUE";
                PropertyDescriptorParsingType2[PropertyDescriptorParsingType2["LIST"] = 1] = "LIST";
                PropertyDescriptorParsingType2[PropertyDescriptorParsingType2["IDENT_VALUE"] = 2] = "IDENT_VALUE";
                PropertyDescriptorParsingType2[PropertyDescriptorParsingType2["TYPE_VALUE"] = 3] = "TYPE_VALUE";
                PropertyDescriptorParsingType2[PropertyDescriptorParsingType2["TOKEN_VALUE"] = 4] = "TOKEN_VALUE";
            })(PropertyDescriptorParsingType || (PropertyDescriptorParsingType = {}));
            var BACKGROUND_CLIP;
            (function(BACKGROUND_CLIP2) {
                BACKGROUND_CLIP2[BACKGROUND_CLIP2["BORDER_BOX"] = 0] = "BORDER_BOX";
                BACKGROUND_CLIP2[BACKGROUND_CLIP2["PADDING_BOX"] = 1] = "PADDING_BOX";
                BACKGROUND_CLIP2[BACKGROUND_CLIP2["CONTENT_BOX"] = 2] = "CONTENT_BOX";
            })(BACKGROUND_CLIP || (BACKGROUND_CLIP = {}));
            var backgroundClip = {
                name: "background-clip",
                initialValue: "border-box",
                prefix: false,
                type: PropertyDescriptorParsingType.LIST,
                parse: function(tokens) {
                    return tokens.map(function(token) {
                        if (isIdentToken(token)) {
                            switch (token.value) {
                                case "padding-box":
                                    return BACKGROUND_CLIP.PADDING_BOX;
                                case "content-box":
                                    return BACKGROUND_CLIP.CONTENT_BOX;
                            }
                        }
                        return BACKGROUND_CLIP.BORDER_BOX;
                    });
                }
            };
            var backgroundColor = {
                name: "background-color",
                initialValue: "transparent",
                prefix: false,
                type: PropertyDescriptorParsingType.TYPE_VALUE,
                format: "color"
            };
            var parseColorStop = function(args) {
                var color$12 = color.parse(args[0]);
                var stop = args[1];
                return stop && isLengthPercentage(stop) ? {
                    color: color$12,
                    stop
                } : {
                    color: color$12,
                    stop: null
                };
            };
            var processColorStops = function(stops, lineLength) {
                var first = stops[0];
                var last = stops[stops.length - 1];
                if (first.stop === null) {
                    first.stop = ZERO_LENGTH;
                }
                if (last.stop === null) {
                    last.stop = HUNDRED_PERCENT;
                }
                var processStops = [];
                var previous = 0;
                for (var i2 = 0; i2 < stops.length; i2++) {
                    var stop_1 = stops[i2].stop;
                    if (stop_1 !== null) {
                        var absoluteValue = getAbsoluteValue(stop_1, lineLength);
                        if (absoluteValue > previous) {
                            processStops.push(absoluteValue);
                        } else {
                            processStops.push(previous);
                        }
                        previous = absoluteValue;
                    } else {
                        processStops.push(null);
                    }
                }
                var gapBegin = null;
                for (var i2 = 0; i2 < processStops.length; i2++) {
                    var stop_2 = processStops[i2];
                    if (stop_2 === null) {
                        if (gapBegin === null) {
                            gapBegin = i2;
                        }
                    } else if (gapBegin !== null) {
                        var gapLength = i2 - gapBegin;
                        var beforeGap = processStops[gapBegin - 1];
                        var gapValue = (stop_2 - beforeGap) / (gapLength + 1);
                        for (var g = 1; g <= gapLength; g++) {
                            processStops[gapBegin + g - 1] = gapValue * g;
                        }
                        gapBegin = null;
                    }
                }
                return stops.map(function(_a, i3) {
                    var color2 = _a.color;
                    return {
                        color: color2,
                        stop: Math.max(Math.min(1, processStops[i3] / lineLength), 0)
                    };
                });
            };
            var getAngleFromCorner = function(corner, width, height) {
                var centerX = width / 2;
                var centerY = height / 2;
                var x = getAbsoluteValue(corner[0], width) - centerX;
                var y = centerY - getAbsoluteValue(corner[1], height);
                return (Math.atan2(y, x) + Math.PI * 2) % (Math.PI * 2);
            };
            var calculateGradientDirection = function(angle2, width, height) {
                var radian = typeof angle2 === "number" ? angle2 : getAngleFromCorner(angle2, width, height);
                var lineLength = Math.abs(width * Math.sin(radian)) + Math.abs(height * Math.cos(radian));
                var halfWidth = width / 2;
                var halfHeight = height / 2;
                var halfLineLength = lineLength / 2;
                var yDiff = Math.sin(radian - Math.PI / 2) * halfLineLength;
                var xDiff = Math.cos(radian - Math.PI / 2) * halfLineLength;
                return [lineLength, halfWidth - xDiff, halfWidth + xDiff, halfHeight - yDiff, halfHeight + yDiff];
            };
            var distance = function(a2, b) {
                return Math.sqrt(a2 * a2 + b * b);
            };
            var findCorner = function(width, height, x, y, closest) {
                var corners = [
                    [0, 0],
                    [0, height],
                    [width, 0],
                    [width, height]
                ];
                return corners.reduce(function(stat, corner) {
                    var cx = corner[0],
                        cy = corner[1];
                    var d = distance(x - cx, y - cy);
                    if (closest ? d < stat.optimumDistance : d > stat.optimumDistance) {
                        return {
                            optimumCorner: corner,
                            optimumDistance: d
                        };
                    }
                    return stat;
                }, {
                    optimumDistance: closest ? Infinity : -Infinity,
                    optimumCorner: null
                }).optimumCorner;
            };
            var calculateRadius = function(gradient, x, y, width, height) {
                var rx = 0;
                var ry = 0;
                switch (gradient.size) {
                    case CSSRadialExtent.CLOSEST_SIDE:
                        if (gradient.shape === CSSRadialShape.CIRCLE) {
                            rx = ry = Math.min(Math.abs(x), Math.abs(x - width), Math.abs(y), Math.abs(y - height));
                        } else if (gradient.shape === CSSRadialShape.ELLIPSE) {
                            rx = Math.min(Math.abs(x), Math.abs(x - width));
                            ry = Math.min(Math.abs(y), Math.abs(y - height));
                        }
                        break;
                    case CSSRadialExtent.CLOSEST_CORNER:
                        if (gradient.shape === CSSRadialShape.CIRCLE) {
                            rx = ry = Math.min(distance(x, y), distance(x, y - height), distance(x - width, y), distance(x - width, y - height));
                        } else if (gradient.shape === CSSRadialShape.ELLIPSE) {
                            var c = Math.min(Math.abs(y), Math.abs(y - height)) / Math.min(Math.abs(x), Math.abs(x - width));
                            var _a = findCorner(width, height, x, y, true),
                                cx = _a[0],
                                cy = _a[1];
                            rx = distance(cx - x, (cy - y) / c);
                            ry = c * rx;
                        }
                        break;
                    case CSSRadialExtent.FARTHEST_SIDE:
                        if (gradient.shape === CSSRadialShape.CIRCLE) {
                            rx = ry = Math.max(Math.abs(x), Math.abs(x - width), Math.abs(y), Math.abs(y - height));
                        } else if (gradient.shape === CSSRadialShape.ELLIPSE) {
                            rx = Math.max(Math.abs(x), Math.abs(x - width));
                            ry = Math.max(Math.abs(y), Math.abs(y - height));
                        }
                        break;
                    case CSSRadialExtent.FARTHEST_CORNER:
                        if (gradient.shape === CSSRadialShape.CIRCLE) {
                            rx = ry = Math.max(distance(x, y), distance(x, y - height), distance(x - width, y), distance(x - width, y - height));
                        } else if (gradient.shape === CSSRadialShape.ELLIPSE) {
                            var c = Math.max(Math.abs(y), Math.abs(y - height)) / Math.max(Math.abs(x), Math.abs(x - width));
                            var _b = findCorner(width, height, x, y, false),
                                cx = _b[0],
                                cy = _b[1];
                            rx = distance(cx - x, (cy - y) / c);
                            ry = c * rx;
                        }
                        break;
                }
                if (Array.isArray(gradient.size)) {
                    rx = getAbsoluteValue(gradient.size[0], width);
                    ry = gradient.size.length === 2 ? getAbsoluteValue(gradient.size[1], height) : rx;
                }
                return [rx, ry];
            };
            var linearGradient = function(tokens) {
                var angle$1 = deg(180);
                var stops = [];
                parseFunctionArgs(tokens).forEach(function(arg, i2) {
                    if (i2 === 0) {
                        var firstToken = arg[0];
                        if (firstToken.type === TokenType.IDENT_TOKEN && firstToken.value === "to") {
                            angle$1 = parseNamedSide(arg);
                            return;
                        } else if (isAngle(firstToken)) {
                            angle$1 = angle.parse(firstToken);
                            return;
                        }
                    }
                    var colorStop = parseColorStop(arg);
                    stops.push(colorStop);
                });
                return {
                    angle: angle$1,
                    stops,
                    type: CSSImageType.LINEAR_GRADIENT
                };
            };
            var prefixLinearGradient = function(tokens) {
                var angle$1 = deg(180);
                var stops = [];
                parseFunctionArgs(tokens).forEach(function(arg, i2) {
                    if (i2 === 0) {
                        var firstToken = arg[0];
                        if (firstToken.type === TokenType.IDENT_TOKEN && ["top", "left", "right", "bottom"].indexOf(firstToken.value) !== -1) {
                            angle$1 = parseNamedSide(arg);
                            return;
                        } else if (isAngle(firstToken)) {
                            angle$1 = (angle.parse(firstToken) + deg(270)) % deg(360);
                            return;
                        }
                    }
                    var colorStop = parseColorStop(arg);
                    stops.push(colorStop);
                });
                return {
                    angle: angle$1,
                    stops,
                    type: CSSImageType.LINEAR_GRADIENT
                };
            };
            var testRangeBounds = function(document2) {
                var TEST_HEIGHT = 123;
                if (document2.createRange) {
                    var range = document2.createRange();
                    if (range.getBoundingClientRect) {
                        var testElement = document2.createElement("boundtest");
                        testElement.style.height = TEST_HEIGHT + "px";
                        testElement.style.display = "block";
                        document2.body.appendChild(testElement);
                        range.selectNode(testElement);
                        var rangeBounds = range.getBoundingClientRect();
                        var rangeHeight = Math.round(rangeBounds.height);
                        document2.body.removeChild(testElement);
                        if (rangeHeight === TEST_HEIGHT) {
                            return true;
                        }
                    }
                }
                return false;
            };
            var testCORS = function() {
                return typeof new Image().crossOrigin !== "undefined";
            };
            var testResponseType = function() {
                return typeof new XMLHttpRequest().responseType === "string";
            };
            var testSVG = function(document2) {
                var img = new Image();
                var canvas = document2.createElement("canvas");
                var ctx = canvas.getContext("2d");
                if (!ctx) {
                    return false;
                }
                img.src = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'></svg>";
                try {
                    ctx.drawImage(img, 0, 0);
                    canvas.toDataURL();
                } catch (e2) {
                    return false;
                }
                return true;
            };
            var isGreenPixel = function(data) {
                return data[0] === 0 && data[1] === 255 && data[2] === 0 && data[3] === 255;
            };
            var testForeignObject = function(document2) {
                var canvas = document2.createElement("canvas");
                var size = 100;
                canvas.width = size;
                canvas.height = size;
                var ctx = canvas.getContext("2d");
                if (!ctx) {
                    return Promise.reject(false);
                }
                ctx.fillStyle = "rgb(0, 255, 0)";
                ctx.fillRect(0, 0, size, size);
                var img = new Image();
                var greenImageSrc = canvas.toDataURL();
                img.src = greenImageSrc;
                var svg = createForeignObjectSVG(size, size, 0, 0, img);
                ctx.fillStyle = "red";
                ctx.fillRect(0, 0, size, size);
                return loadSerializedSVG(svg).then(function(img2) {
                    ctx.drawImage(img2, 0, 0);
                    var data = ctx.getImageData(0, 0, size, size).data;
                    ctx.fillStyle = "red";
                    ctx.fillRect(0, 0, size, size);
                    var node = document2.createElement("div");
                    node.style.backgroundImage = "url(" + greenImageSrc + ")";
                    node.style.height = size + "px";
                    return isGreenPixel(data) ? loadSerializedSVG(createForeignObjectSVG(size, size, 0, 0, node)) : Promise.reject(false);
                }).then(function(img2) {
                    ctx.drawImage(img2, 0, 0);
                    return isGreenPixel(ctx.getImageData(0, 0, size, size).data);
                }).catch(function() {
                    return false;
                });
            };
            var createForeignObjectSVG = function(width, height, x, y, node) {
                var xmlns = "http://www.w3.org/2000/svg";
                var svg = document.createElementNS(xmlns, "svg");
                var foreignObject = document.createElementNS(xmlns, "foreignObject");
                svg.setAttributeNS(null, "width", width.toString());
                svg.setAttributeNS(null, "height", height.toString());
                foreignObject.setAttributeNS(null, "width", "100%");
                foreignObject.setAttributeNS(null, "height", "100%");
                foreignObject.setAttributeNS(null, "x", x.toString());
                foreignObject.setAttributeNS(null, "y", y.toString());
                foreignObject.setAttributeNS(null, "externalResourcesRequired", "true");
                svg.appendChild(foreignObject);
                foreignObject.appendChild(node);
                return svg;
            };
            var loadSerializedSVG = function(svg) {
                return new Promise(function(resolve, reject) {
                    var img = new Image();
                    img.onload = function() {
                        return resolve(img);
                    };
                    img.onerror = reject;
                    img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(new XMLSerializer().serializeToString(svg));
                });
            };
            var FEATURES = {
                get SUPPORT_RANGE_BOUNDS() {
                    var value = testRangeBounds(document);
                    Object.defineProperty(FEATURES, "SUPPORT_RANGE_BOUNDS", {
                        value
                    });
                    return value;
                },
                get SUPPORT_SVG_DRAWING() {
                    var value = testSVG(document);
                    Object.defineProperty(FEATURES, "SUPPORT_SVG_DRAWING", {
                        value
                    });
                    return value;
                },
                get SUPPORT_FOREIGNOBJECT_DRAWING() {
                    var value = typeof Array.from === "function" && typeof window.fetch === "function" ? testForeignObject(document) : Promise.resolve(false);
                    Object.defineProperty(FEATURES, "SUPPORT_FOREIGNOBJECT_DRAWING", {
                        value
                    });
                    return value;
                },
                get SUPPORT_CORS_IMAGES() {
                    var value = testCORS();
                    Object.defineProperty(FEATURES, "SUPPORT_CORS_IMAGES", {
                        value
                    });
                    return value;
                },
                get SUPPORT_RESPONSE_TYPE() {
                    var value = testResponseType();
                    Object.defineProperty(FEATURES, "SUPPORT_RESPONSE_TYPE", {
                        value
                    });
                    return value;
                },
                get SUPPORT_CORS_XHR() {
                    var value = "withCredentials" in new XMLHttpRequest();
                    Object.defineProperty(FEATURES, "SUPPORT_CORS_XHR", {
                        value
                    });
                    return value;
                }
            };
            var Logger = function() {
                function Logger2(_a) {
                    var id = _a.id,
                        enabled = _a.enabled;
                    this.id = id;
                    this.enabled = enabled;
                    this.start = Date.now();
                }
                Logger2.prototype.debug = function() {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    if (this.enabled) {
                        if (typeof window !== "undefined" && window.console && typeof console.debug === "function") {
                            console.debug.apply(console, [this.id, this.getTime() + "ms"].concat(args));
                        } else {
                            this.info.apply(this, args);
                        }
                    }
                };
                Logger2.prototype.getTime = function() {
                    return Date.now() - this.start;
                };
                Logger2.create = function(options) {
                    Logger2.instances[options.id] = new Logger2(options);
                };
                Logger2.destroy = function(id) {
                    delete Logger2.instances[id];
                };
                Logger2.getInstance = function(id) {
                    var instance = Logger2.instances[id];
                    if (typeof instance === "undefined") {
                        throw new Error("No logger instance found with id " + id);
                    }
                    return instance;
                };
                Logger2.prototype.info = function() {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    if (this.enabled) {
                        if (typeof window !== "undefined" && window.console && typeof console.info === "function") {
                            console.info.apply(console, [this.id, this.getTime() + "ms"].concat(args));
                        }
                    }
                };
                Logger2.prototype.error = function() {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    if (this.enabled) {
                        if (typeof window !== "undefined" && window.console && typeof console.error === "function") {
                            console.error.apply(console, [this.id, this.getTime() + "ms"].concat(args));
                        } else {
                            this.info.apply(this, args);
                        }
                    }
                };
                Logger2.instances = {};
                return Logger2;
            }();
            var CacheStorage = function() {
                function CacheStorage2() {}
                CacheStorage2.create = function(name2, options) {
                    return CacheStorage2._caches[name2] = new Cache(name2, options);
                };
                CacheStorage2.destroy = function(name2) {
                    delete CacheStorage2._caches[name2];
                };
                CacheStorage2.open = function(name2) {
                    var cache = CacheStorage2._caches[name2];
                    if (typeof cache !== "undefined") {
                        return cache;
                    }
                    throw new Error('Cache with key "' + name2 + '" not found');
                };
                CacheStorage2.getOrigin = function(url) {
                    var link = CacheStorage2._link;
                    if (!link) {
                        return "about:blank";
                    }
                    link.href = url;
                    link.href = link.href;
                    return link.protocol + link.hostname + link.port;
                };
                CacheStorage2.isSameOrigin = function(src) {
                    return CacheStorage2.getOrigin(src) === CacheStorage2._origin;
                };
                CacheStorage2.setContext = function(window2) {
                    CacheStorage2._link = window2.document.createElement("a");
                    CacheStorage2._origin = CacheStorage2.getOrigin(window2.location.href);
                };
                CacheStorage2.getInstance = function() {
                    var current = CacheStorage2._current;
                    if (current === null) {
                        throw new Error("No cache instance attached");
                    }
                    return current;
                };
                CacheStorage2.attachInstance = function(cache) {
                    CacheStorage2._current = cache;
                };
                CacheStorage2.detachInstance = function() {
                    CacheStorage2._current = null;
                };
                CacheStorage2._caches = {};
                CacheStorage2._origin = "about:blank";
                CacheStorage2._current = null;
                return CacheStorage2;
            }();
            var Cache = function() {
                function Cache2(id, options) {
                    this.id = id;
                    this._options = options;
                    this._cache = {};
                }
                Cache2.prototype.addImage = function(src) {
                    var result = Promise.resolve();
                    if (this.has(src)) {
                        return result;
                    }
                    if (isBlobImage(src) || isRenderable(src)) {
                        this._cache[src] = this.loadImage(src);
                        return result;
                    }
                    return result;
                };
                Cache2.prototype.match = function(src) {
                    return this._cache[src];
                };
                Cache2.prototype.loadImage = function(key) {
                    return __awaiter(this, void 0, void 0, function() {
                        var isSameOrigin, useCORS, useProxy, src;
                        var _this2 = this;
                        return __generator(this, function(_a) {
                            switch (_a.label) {
                                case 0:
                                    isSameOrigin = CacheStorage.isSameOrigin(key);
                                    useCORS = !isInlineImage(key) && this._options.useCORS === true && FEATURES.SUPPORT_CORS_IMAGES && !isSameOrigin;
                                    useProxy = !isInlineImage(key) && !isSameOrigin && typeof this._options.proxy === "string" && FEATURES.SUPPORT_CORS_XHR && !useCORS;
                                    if (!isSameOrigin && this._options.allowTaint === false && !isInlineImage(key) && !useProxy && !useCORS) {
                                        return [2];
                                    }
                                    src = key;
                                    if (!useProxy)
                                        return [3, 2];
                                    return [4, this.proxy(src)];
                                case 1:
                                    src = _a.sent();
                                    _a.label = 2;
                                case 2:
                                    Logger.getInstance(this.id).debug("Added image " + key.substring(0, 256));
                                    return [4, new Promise(function(resolve, reject) {
                                        var img = new Image();
                                        img.onload = function() {
                                            return resolve(img);
                                        };
                                        img.onerror = reject;
                                        if (isInlineBase64Image(src) || useCORS) {
                                            img.crossOrigin = "anonymous";
                                        }
                                        img.src = src;
                                        if (img.complete === true) {
                                            setTimeout(function() {
                                                return resolve(img);
                                            }, 500);
                                        }
                                        if (_this2._options.imageTimeout > 0) {
                                            setTimeout(function() {
                                                return reject("Timed out (" + _this2._options.imageTimeout + "ms) loading image");
                                            }, _this2._options.imageTimeout);
                                        }
                                    })];
                                case 3:
                                    return [2, _a.sent()];
                            }
                        });
                    });
                };
                Cache2.prototype.has = function(key) {
                    return typeof this._cache[key] !== "undefined";
                };
                Cache2.prototype.keys = function() {
                    return Promise.resolve(Object.keys(this._cache));
                };
                Cache2.prototype.proxy = function(src) {
                    var _this2 = this;
                    var proxy = this._options.proxy;
                    if (!proxy) {
                        throw new Error("No proxy defined");
                    }
                    var key = src.substring(0, 256);
                    return new Promise(function(resolve, reject) {
                        var responseType = FEATURES.SUPPORT_RESPONSE_TYPE ? "blob" : "text";
                        var xhr = new XMLHttpRequest();
                        xhr.onload = function() {
                            if (xhr.status === 200) {
                                if (responseType === "text") {
                                    resolve(xhr.response);
                                } else {
                                    var reader_1 = new FileReader();
                                    reader_1.addEventListener("load", function() {
                                        return resolve(reader_1.result);
                                    }, false);
                                    reader_1.addEventListener("error", function(e2) {
                                        return reject(e2);
                                    }, false);
                                    reader_1.readAsDataURL(xhr.response);
                                }
                            } else {
                                reject("Failed to proxy resource " + key + " with status code " + xhr.status);
                            }
                        };
                        xhr.onerror = reject;
                        xhr.open("GET", proxy + "?url=" + encodeURIComponent(src) + "&responseType=" + responseType);
                        if (responseType !== "text" && xhr instanceof XMLHttpRequest) {
                            xhr.responseType = responseType;
                        }
                        if (_this2._options.imageTimeout) {
                            var timeout_1 = _this2._options.imageTimeout;
                            xhr.timeout = timeout_1;
                            xhr.ontimeout = function() {
                                return reject("Timed out (" + timeout_1 + "ms) proxying " + key);
                            };
                        }
                        xhr.send();
                    });
                };
                return Cache2;
            }();
            var INLINE_SVG = /^data:image\/svg\+xml/i;
            var INLINE_BASE64 = /^data:image\/.*;base64,/i;
            var INLINE_IMG = /^data:image\/.*/i;
            var isRenderable = function(src) {
                return FEATURES.SUPPORT_SVG_DRAWING || !isSVG(src);
            };
            var isInlineImage = function(src) {
                return INLINE_IMG.test(src);
            };
            var isInlineBase64Image = function(src) {
                return INLINE_BASE64.test(src);
            };
            var isBlobImage = function(src) {
                return src.substr(0, 4) === "blob";
            };
            var isSVG = function(src) {
                return src.substr(-3).toLowerCase() === "svg" || INLINE_SVG.test(src);
            };
            var webkitGradient = function(tokens) {
                var angle2 = deg(180);
                var stops = [];
                var type = CSSImageType.LINEAR_GRADIENT;
                var shape = CSSRadialShape.CIRCLE;
                var size = CSSRadialExtent.FARTHEST_CORNER;
                var position2 = [];
                parseFunctionArgs(tokens).forEach(function(arg, i2) {
                    var firstToken = arg[0];
                    if (i2 === 0) {
                        if (isIdentToken(firstToken) && firstToken.value === "linear") {
                            type = CSSImageType.LINEAR_GRADIENT;
                            return;
                        } else if (isIdentToken(firstToken) && firstToken.value === "radial") {
                            type = CSSImageType.RADIAL_GRADIENT;
                            return;
                        }
                    }
                    if (firstToken.type === TokenType.FUNCTION) {
                        if (firstToken.name === "from") {
                            var color$12 = color.parse(firstToken.values[0]);
                            stops.push({
                                stop: ZERO_LENGTH,
                                color: color$12
                            });
                        } else if (firstToken.name === "to") {
                            var color$12 = color.parse(firstToken.values[0]);
                            stops.push({
                                stop: HUNDRED_PERCENT,
                                color: color$12
                            });
                        } else if (firstToken.name === "color-stop") {
                            var values = firstToken.values.filter(nonFunctionArgSeparator);
                            if (values.length === 2) {
                                var color$12 = color.parse(values[1]);
                                var stop_1 = values[0];
                                if (isNumberToken(stop_1)) {
                                    stops.push({
                                        stop: {
                                            type: TokenType.PERCENTAGE_TOKEN,
                                            number: stop_1.number * 100,
                                            flags: stop_1.flags
                                        },
                                        color: color$12
                                    });
                                }
                            }
                        }
                    }
                });
                return type === CSSImageType.LINEAR_GRADIENT ? {
                    angle: (angle2 + deg(180)) % deg(360),
                    stops,
                    type
                } : {
                    size,
                    shape,
                    stops,
                    position: position2,
                    type
                };
            };
            var CLOSEST_SIDE = "closest-side";
            var FARTHEST_SIDE = "farthest-side";
            var CLOSEST_CORNER = "closest-corner";
            var FARTHEST_CORNER = "farthest-corner";
            var CIRCLE = "circle";
            var ELLIPSE = "ellipse";
            var COVER = "cover";
            var CONTAIN = "contain";
            var radialGradient = function(tokens) {
                var shape = CSSRadialShape.CIRCLE;
                var size = CSSRadialExtent.FARTHEST_CORNER;
                var stops = [];
                var position2 = [];
                parseFunctionArgs(tokens).forEach(function(arg, i2) {
                    var isColorStop = true;
                    if (i2 === 0) {
                        var isAtPosition_1 = false;
                        isColorStop = arg.reduce(function(acc, token) {
                            if (isAtPosition_1) {
                                if (isIdentToken(token)) {
                                    switch (token.value) {
                                        case "center":
                                            position2.push(FIFTY_PERCENT);
                                            return acc;
                                        case "top":
                                        case "left":
                                            position2.push(ZERO_LENGTH);
                                            return acc;
                                        case "right":
                                        case "bottom":
                                            position2.push(HUNDRED_PERCENT);
                                            return acc;
                                    }
                                } else if (isLengthPercentage(token) || isLength(token)) {
                                    position2.push(token);
                                }
                            } else if (isIdentToken(token)) {
                                switch (token.value) {
                                    case CIRCLE:
                                        shape = CSSRadialShape.CIRCLE;
                                        return false;
                                    case ELLIPSE:
                                        shape = CSSRadialShape.ELLIPSE;
                                        return false;
                                    case "at":
                                        isAtPosition_1 = true;
                                        return false;
                                    case CLOSEST_SIDE:
                                        size = CSSRadialExtent.CLOSEST_SIDE;
                                        return false;
                                    case COVER:
                                    case FARTHEST_SIDE:
                                        size = CSSRadialExtent.FARTHEST_SIDE;
                                        return false;
                                    case CONTAIN:
                                    case CLOSEST_CORNER:
                                        size = CSSRadialExtent.CLOSEST_CORNER;
                                        return false;
                                    case FARTHEST_CORNER:
                                        size = CSSRadialExtent.FARTHEST_CORNER;
                                        return false;
                                }
                            } else if (isLength(token) || isLengthPercentage(token)) {
                                if (!Array.isArray(size)) {
                                    size = [];
                                }
                                size.push(token);
                                return false;
                            }
                            return acc;
                        }, isColorStop);
                    }
                    if (isColorStop) {
                        var colorStop = parseColorStop(arg);
                        stops.push(colorStop);
                    }
                });
                return {
                    size,
                    shape,
                    stops,
                    position: position2,
                    type: CSSImageType.RADIAL_GRADIENT
                };
            };
            var prefixRadialGradient = function(tokens) {
                var shape = CSSRadialShape.CIRCLE;
                var size = CSSRadialExtent.FARTHEST_CORNER;
                var stops = [];
                var position2 = [];
                parseFunctionArgs(tokens).forEach(function(arg, i2) {
                    var isColorStop = true;
                    if (i2 === 0) {
                        isColorStop = arg.reduce(function(acc, token) {
                            if (isIdentToken(token)) {
                                switch (token.value) {
                                    case "center":
                                        position2.push(FIFTY_PERCENT);
                                        return false;
                                    case "top":
                                    case "left":
                                        position2.push(ZERO_LENGTH);
                                        return false;
                                    case "right":
                                    case "bottom":
                                        position2.push(HUNDRED_PERCENT);
                                        return false;
                                }
                            } else if (isLengthPercentage(token) || isLength(token)) {
                                position2.push(token);
                                return false;
                            }
                            return acc;
                        }, isColorStop);
                    } else if (i2 === 1) {
                        isColorStop = arg.reduce(function(acc, token) {
                            if (isIdentToken(token)) {
                                switch (token.value) {
                                    case CIRCLE:
                                        shape = CSSRadialShape.CIRCLE;
                                        return false;
                                    case ELLIPSE:
                                        shape = CSSRadialShape.ELLIPSE;
                                        return false;
                                    case CONTAIN:
                                    case CLOSEST_SIDE:
                                        size = CSSRadialExtent.CLOSEST_SIDE;
                                        return false;
                                    case FARTHEST_SIDE:
                                        size = CSSRadialExtent.FARTHEST_SIDE;
                                        return false;
                                    case CLOSEST_CORNER:
                                        size = CSSRadialExtent.CLOSEST_CORNER;
                                        return false;
                                    case COVER:
                                    case FARTHEST_CORNER:
                                        size = CSSRadialExtent.FARTHEST_CORNER;
                                        return false;
                                }
                            } else if (isLength(token) || isLengthPercentage(token)) {
                                if (!Array.isArray(size)) {
                                    size = [];
                                }
                                size.push(token);
                                return false;
                            }
                            return acc;
                        }, isColorStop);
                    }
                    if (isColorStop) {
                        var colorStop = parseColorStop(arg);
                        stops.push(colorStop);
                    }
                });
                return {
                    size,
                    shape,
                    stops,
                    position: position2,
                    type: CSSImageType.RADIAL_GRADIENT
                };
            };
            var CSSImageType;
            (function(CSSImageType2) {
                CSSImageType2[CSSImageType2["URL"] = 0] = "URL";
                CSSImageType2[CSSImageType2["LINEAR_GRADIENT"] = 1] = "LINEAR_GRADIENT";
                CSSImageType2[CSSImageType2["RADIAL_GRADIENT"] = 2] = "RADIAL_GRADIENT";
            })(CSSImageType || (CSSImageType = {}));
            var isLinearGradient = function(background) {
                return background.type === CSSImageType.LINEAR_GRADIENT;
            };
            var isRadialGradient = function(background) {
                return background.type === CSSImageType.RADIAL_GRADIENT;
            };
            var CSSRadialShape;
            (function(CSSRadialShape2) {
                CSSRadialShape2[CSSRadialShape2["CIRCLE"] = 0] = "CIRCLE";
                CSSRadialShape2[CSSRadialShape2["ELLIPSE"] = 1] = "ELLIPSE";
            })(CSSRadialShape || (CSSRadialShape = {}));
            var CSSRadialExtent;
            (function(CSSRadialExtent2) {
                CSSRadialExtent2[CSSRadialExtent2["CLOSEST_SIDE"] = 0] = "CLOSEST_SIDE";
                CSSRadialExtent2[CSSRadialExtent2["FARTHEST_SIDE"] = 1] = "FARTHEST_SIDE";
                CSSRadialExtent2[CSSRadialExtent2["CLOSEST_CORNER"] = 2] = "CLOSEST_CORNER";
                CSSRadialExtent2[CSSRadialExtent2["FARTHEST_CORNER"] = 3] = "FARTHEST_CORNER";
            })(CSSRadialExtent || (CSSRadialExtent = {}));
            var image = {
                name: "image",
                parse: function(value) {
                    if (value.type === TokenType.URL_TOKEN) {
                        var image_1 = {
                            url: value.value,
                            type: CSSImageType.URL
                        };
                        CacheStorage.getInstance().addImage(value.value);
                        return image_1;
                    }
                    if (value.type === TokenType.FUNCTION) {
                        var imageFunction = SUPPORTED_IMAGE_FUNCTIONS[value.name];
                        if (typeof imageFunction === "undefined") {
                            throw new Error('Attempting to parse an unsupported image function "' + value.name + '"');
                        }
                        return imageFunction(value.values);
                    }
                    throw new Error("Unsupported image type");
                }
            };

            function isSupportedImage(value) {
                return value.type !== TokenType.FUNCTION || SUPPORTED_IMAGE_FUNCTIONS[value.name];
            }
            var SUPPORTED_IMAGE_FUNCTIONS = {
                "linear-gradient": linearGradient,
                "-moz-linear-gradient": prefixLinearGradient,
                "-ms-linear-gradient": prefixLinearGradient,
                "-o-linear-gradient": prefixLinearGradient,
                "-webkit-linear-gradient": prefixLinearGradient,
                "radial-gradient": radialGradient,
                "-moz-radial-gradient": prefixRadialGradient,
                "-ms-radial-gradient": prefixRadialGradient,
                "-o-radial-gradient": prefixRadialGradient,
                "-webkit-radial-gradient": prefixRadialGradient,
                "-webkit-gradient": webkitGradient
            };
            var backgroundImage = {
                name: "background-image",
                initialValue: "none",
                type: PropertyDescriptorParsingType.LIST,
                prefix: false,
                parse: function(tokens) {
                    if (tokens.length === 0) {
                        return [];
                    }
                    var first = tokens[0];
                    if (first.type === TokenType.IDENT_TOKEN && first.value === "none") {
                        return [];
                    }
                    return tokens.filter(function(value) {
                        return nonFunctionArgSeparator(value) && isSupportedImage(value);
                    }).map(image.parse);
                }
            };
            var backgroundOrigin = {
                name: "background-origin",
                initialValue: "border-box",
                prefix: false,
                type: PropertyDescriptorParsingType.LIST,
                parse: function(tokens) {
                    return tokens.map(function(token) {
                        if (isIdentToken(token)) {
                            switch (token.value) {
                                case "padding-box":
                                    return 1;
                                case "content-box":
                                    return 2;
                            }
                        }
                        return 0;
                    });
                }
            };
            var backgroundPosition = {
                name: "background-position",
                initialValue: "0% 0%",
                type: PropertyDescriptorParsingType.LIST,
                prefix: false,
                parse: function(tokens) {
                    return parseFunctionArgs(tokens).map(function(values) {
                        return values.filter(isLengthPercentage);
                    }).map(parseLengthPercentageTuple);
                }
            };
            var BACKGROUND_REPEAT;
            (function(BACKGROUND_REPEAT2) {
                BACKGROUND_REPEAT2[BACKGROUND_REPEAT2["REPEAT"] = 0] = "REPEAT";
                BACKGROUND_REPEAT2[BACKGROUND_REPEAT2["NO_REPEAT"] = 1] = "NO_REPEAT";
                BACKGROUND_REPEAT2[BACKGROUND_REPEAT2["REPEAT_X"] = 2] = "REPEAT_X";
                BACKGROUND_REPEAT2[BACKGROUND_REPEAT2["REPEAT_Y"] = 3] = "REPEAT_Y";
            })(BACKGROUND_REPEAT || (BACKGROUND_REPEAT = {}));
            var backgroundRepeat = {
                name: "background-repeat",
                initialValue: "repeat",
                prefix: false,
                type: PropertyDescriptorParsingType.LIST,
                parse: function(tokens) {
                    return parseFunctionArgs(tokens).map(function(values) {
                        return values.filter(isIdentToken).map(function(token) {
                            return token.value;
                        }).join(" ");
                    }).map(parseBackgroundRepeat);
                }
            };
            var parseBackgroundRepeat = function(value) {
                switch (value) {
                    case "no-repeat":
                        return BACKGROUND_REPEAT.NO_REPEAT;
                    case "repeat-x":
                    case "repeat no-repeat":
                        return BACKGROUND_REPEAT.REPEAT_X;
                    case "repeat-y":
                    case "no-repeat repeat":
                        return BACKGROUND_REPEAT.REPEAT_Y;
                    case "repeat":
                    default:
                        return BACKGROUND_REPEAT.REPEAT;
                }
            };
            var BACKGROUND_SIZE;
            (function(BACKGROUND_SIZE2) {
                BACKGROUND_SIZE2["AUTO"] = "auto";
                BACKGROUND_SIZE2["CONTAIN"] = "contain";
                BACKGROUND_SIZE2["COVER"] = "cover";
            })(BACKGROUND_SIZE || (BACKGROUND_SIZE = {}));
            var backgroundSize = {
                name: "background-size",
                initialValue: "0",
                prefix: false,
                type: PropertyDescriptorParsingType.LIST,
                parse: function(tokens) {
                    return parseFunctionArgs(tokens).map(function(values) {
                        return values.filter(isBackgroundSizeInfoToken);
                    });
                }
            };
            var isBackgroundSizeInfoToken = function(value) {
                return isIdentToken(value) || isLengthPercentage(value);
            };
            var borderColorForSide = function(side) {
                return {
                    name: "border-" + side + "-color",
                    initialValue: "transparent",
                    prefix: false,
                    type: PropertyDescriptorParsingType.TYPE_VALUE,
                    format: "color"
                };
            };
            var borderTopColor = borderColorForSide("top");
            var borderRightColor = borderColorForSide("right");
            var borderBottomColor = borderColorForSide("bottom");
            var borderLeftColor = borderColorForSide("left");
            var borderRadiusForSide = function(side) {
                return {
                    name: "border-radius-" + side,
                    initialValue: "0 0",
                    prefix: false,
                    type: PropertyDescriptorParsingType.LIST,
                    parse: function(tokens) {
                        return parseLengthPercentageTuple(tokens.filter(isLengthPercentage));
                    }
                };
            };
            var borderTopLeftRadius = borderRadiusForSide("top-left");
            var borderTopRightRadius = borderRadiusForSide("top-right");
            var borderBottomRightRadius = borderRadiusForSide("bottom-right");
            var borderBottomLeftRadius = borderRadiusForSide("bottom-left");
            var BORDER_STYLE;
            (function(BORDER_STYLE2) {
                BORDER_STYLE2[BORDER_STYLE2["NONE"] = 0] = "NONE";
                BORDER_STYLE2[BORDER_STYLE2["SOLID"] = 1] = "SOLID";
            })(BORDER_STYLE || (BORDER_STYLE = {}));
            var borderStyleForSide = function(side) {
                return {
                    name: "border-" + side + "-style",
                    initialValue: "solid",
                    prefix: false,
                    type: PropertyDescriptorParsingType.IDENT_VALUE,
                    parse: function(style) {
                        switch (style) {
                            case "none":
                                return BORDER_STYLE.NONE;
                        }
                        return BORDER_STYLE.SOLID;
                    }
                };
            };
            var borderTopStyle = borderStyleForSide("top");
            var borderRightStyle = borderStyleForSide("right");
            var borderBottomStyle = borderStyleForSide("bottom");
            var borderLeftStyle = borderStyleForSide("left");
            var borderWidthForSide = function(side) {
                return {
                    name: "border-" + side + "-width",
                    initialValue: "0",
                    type: PropertyDescriptorParsingType.VALUE,
                    prefix: false,
                    parse: function(token) {
                        if (isDimensionToken(token)) {
                            return token.number;
                        }
                        return 0;
                    }
                };
            };
            var borderTopWidth = borderWidthForSide("top");
            var borderRightWidth = borderWidthForSide("right");
            var borderBottomWidth = borderWidthForSide("bottom");
            var borderLeftWidth = borderWidthForSide("left");
            var color$1 = {
                name: "color",
                initialValue: "transparent",
                prefix: false,
                type: PropertyDescriptorParsingType.TYPE_VALUE,
                format: "color"
            };
            var display = {
                name: "display",
                initialValue: "inline-block",
                prefix: false,
                type: PropertyDescriptorParsingType.LIST,
                parse: function(tokens) {
                    return tokens.filter(isIdentToken).reduce(function(bit, token) {
                        return bit | parseDisplayValue(token.value);
                    }, 0);
                }
            };
            var parseDisplayValue = function(display2) {
                switch (display2) {
                    case "block":
                        return 2;
                    case "inline":
                        return 4;
                    case "run-in":
                        return 8;
                    case "flow":
                        return 16;
                    case "flow-root":
                        return 32;
                    case "table":
                        return 64;
                    case "flex":
                    case "-webkit-flex":
                        return 128;
                    case "grid":
                    case "-ms-grid":
                        return 256;
                    case "ruby":
                        return 512;
                    case "subgrid":
                        return 1024;
                    case "list-item":
                        return 2048;
                    case "table-row-group":
                        return 4096;
                    case "table-header-group":
                        return 8192;
                    case "table-footer-group":
                        return 16384;
                    case "table-row":
                        return 32768;
                    case "table-cell":
                        return 65536;
                    case "table-column-group":
                        return 131072;
                    case "table-column":
                        return 262144;
                    case "table-caption":
                        return 524288;
                    case "ruby-base":
                        return 1048576;
                    case "ruby-text":
                        return 2097152;
                    case "ruby-base-container":
                        return 4194304;
                    case "ruby-text-container":
                        return 8388608;
                    case "contents":
                        return 16777216;
                    case "inline-block":
                        return 33554432;
                    case "inline-list-item":
                        return 67108864;
                    case "inline-table":
                        return 134217728;
                    case "inline-flex":
                        return 268435456;
                    case "inline-grid":
                        return 536870912;
                }
                return 0;
            };
            var FLOAT;
            (function(FLOAT2) {
                FLOAT2[FLOAT2["NONE"] = 0] = "NONE";
                FLOAT2[FLOAT2["LEFT"] = 1] = "LEFT";
                FLOAT2[FLOAT2["RIGHT"] = 2] = "RIGHT";
                FLOAT2[FLOAT2["INLINE_START"] = 3] = "INLINE_START";
                FLOAT2[FLOAT2["INLINE_END"] = 4] = "INLINE_END";
            })(FLOAT || (FLOAT = {}));
            var float = {
                name: "float",
                initialValue: "none",
                prefix: false,
                type: PropertyDescriptorParsingType.IDENT_VALUE,
                parse: function(float2) {
                    switch (float2) {
                        case "left":
                            return FLOAT.LEFT;
                        case "right":
                            return FLOAT.RIGHT;
                        case "inline-start":
                            return FLOAT.INLINE_START;
                        case "inline-end":
                            return FLOAT.INLINE_END;
                    }
                    return FLOAT.NONE;
                }
            };
            var letterSpacing = {
                name: "letter-spacing",
                initialValue: "0",
                prefix: false,
                type: PropertyDescriptorParsingType.VALUE,
                parse: function(token) {
                    if (token.type === TokenType.IDENT_TOKEN && token.value === "normal") {
                        return 0;
                    }
                    if (token.type === TokenType.NUMBER_TOKEN) {
                        return token.number;
                    }
                    if (token.type === TokenType.DIMENSION_TOKEN) {
                        return token.number;
                    }
                    return 0;
                }
            };
            var LINE_BREAK;
            (function(LINE_BREAK2) {
                LINE_BREAK2["NORMAL"] = "normal";
                LINE_BREAK2["STRICT"] = "strict";
            })(LINE_BREAK || (LINE_BREAK = {}));
            var lineBreak = {
                name: "line-break",
                initialValue: "normal",
                prefix: false,
                type: PropertyDescriptorParsingType.IDENT_VALUE,
                parse: function(lineBreak2) {
                    switch (lineBreak2) {
                        case "strict":
                            return LINE_BREAK.STRICT;
                        case "normal":
                        default:
                            return LINE_BREAK.NORMAL;
                    }
                }
            };
            var lineHeight = {
                name: "line-height",
                initialValue: "normal",
                prefix: false,
                type: PropertyDescriptorParsingType.TOKEN_VALUE
            };
            var computeLineHeight = function(token, fontSize2) {
                if (isIdentToken(token) && token.value === "normal") {
                    return 1.2 * fontSize2;
                } else if (token.type === TokenType.NUMBER_TOKEN) {
                    return fontSize2 * token.number;
                } else if (isLengthPercentage(token)) {
                    return getAbsoluteValue(token, fontSize2);
                }
                return fontSize2;
            };
            var listStyleImage = {
                name: "list-style-image",
                initialValue: "none",
                type: PropertyDescriptorParsingType.VALUE,
                prefix: false,
                parse: function(token) {
                    if (token.type === TokenType.IDENT_TOKEN && token.value === "none") {
                        return null;
                    }
                    return image.parse(token);
                }
            };
            var LIST_STYLE_POSITION;
            (function(LIST_STYLE_POSITION2) {
                LIST_STYLE_POSITION2[LIST_STYLE_POSITION2["INSIDE"] = 0] = "INSIDE";
                LIST_STYLE_POSITION2[LIST_STYLE_POSITION2["OUTSIDE"] = 1] = "OUTSIDE";
            })(LIST_STYLE_POSITION || (LIST_STYLE_POSITION = {}));
            var listStylePosition = {
                name: "list-style-position",
                initialValue: "outside",
                prefix: false,
                type: PropertyDescriptorParsingType.IDENT_VALUE,
                parse: function(position2) {
                    switch (position2) {
                        case "inside":
                            return LIST_STYLE_POSITION.INSIDE;
                        case "outside":
                        default:
                            return LIST_STYLE_POSITION.OUTSIDE;
                    }
                }
            };
            var LIST_STYLE_TYPE;
            (function(LIST_STYLE_TYPE2) {
                LIST_STYLE_TYPE2[LIST_STYLE_TYPE2["NONE"] = -1] = "NONE";
                LIST_STYLE_TYPE2[LIST_STYLE_TYPE2["DISC"] = 0] = "DISC";
                LIST_STYLE_TYPE2[LIST_STYLE_TYPE2["CIRCLE"] = 1] = "CIRCLE";
                LIST_STYLE_TYPE2[LIST_STYLE_TYPE2["SQUARE"] = 2] = "SQUARE";
                LIST_STYLE_TYPE2[LIST_STYLE_TYPE2["DECIMAL"] = 3] = "DECIMAL";
                LIST_STYLE_TYPE2[LIST_STYLE_TYPE2["CJK_DECIMAL"] = 4] = "CJK_DECIMAL";
                LIST_STYLE_TYPE2[LIST_STYLE_TYPE2["DECIMAL_LEADING_ZERO"] = 5] = "DECIMAL_LEADING_ZERO";
                LIST_STYLE_TYPE2[LIST_STYLE_TYPE2["LOWER_ROMAN"] = 6] = "LOWER_ROMAN";
                LIST_STYLE_TYPE2[LIST_STYLE_TYPE2["UPPER_ROMAN"] = 7] = "UPPER_ROMAN";
                LIST_STYLE_TYPE2[LIST_STYLE_TYPE2["LOWER_GREEK"] = 8] = "LOWER_GREEK";
                LIST_STYLE_TYPE2[LIST_STYLE_TYPE2["LOWER_ALPHA"] = 9] = "LOWER_ALPHA";
                LIST_STYLE_TYPE2[LIST_STYLE_TYPE2["UPPER_ALPHA"] = 10] = "UPPER_ALPHA";
                LIST_STYLE_TYPE2[LIST_STYLE_TYPE2["ARABIC_INDIC"] = 11] = "ARABIC_INDIC";
                LIST_STYLE_TYPE2[LIST_STYLE_TYPE2["ARMENIAN"] = 12] = "ARMENIAN";
                LIST_STYLE_TYPE2[LIST_STYLE_TYPE2["BENGALI"] = 13] = "BENGALI";
                LIST_STYLE_TYPE2[LIST_STYLE_TYPE2["CAMBODIAN"] = 14] = "CAMBODIAN";
                LIST_STYLE_TYPE2[LIST_STYLE_TYPE2["CJK_EARTHLY_BRANCH"] = 15] = "CJK_EARTHLY_BRANCH";
                LIST_STYLE_TYPE2[LIST_STYLE_TYPE2["CJK_HEAVENLY_STEM"] = 16] = "CJK_HEAVENLY_STEM";
                LIST_STYLE_TYPE2[LIST_STYLE_TYPE2["CJK_IDEOGRAPHIC"] = 17] = "CJK_IDEOGRAPHIC";
                LIST_STYLE_TYPE2[LIST_STYLE_TYPE2["DEVANAGARI"] = 18] = "DEVANAGARI";
                LIST_STYLE_TYPE2[LIST_STYLE_TYPE2["ETHIOPIC_NUMERIC"] = 19] = "ETHIOPIC_NUMERIC";
                LIST_STYLE_TYPE2[LIST_STYLE_TYPE2["GEORGIAN"] = 20] = "GEORGIAN";
                LIST_STYLE_TYPE2[LIST_STYLE_TYPE2["GUJARATI"] = 21] = "GUJARATI";
                LIST_STYLE_TYPE2[LIST_STYLE_TYPE2["GURMUKHI"] = 22] = "GURMUKHI";
                LIST_STYLE_TYPE2[LIST_STYLE_TYPE2["HEBREW"] = 22] = "HEBREW";
                LIST_STYLE_TYPE2[LIST_STYLE_TYPE2["HIRAGANA"] = 23] = "HIRAGANA";
                LIST_STYLE_TYPE2[LIST_STYLE_TYPE2["HIRAGANA_IROHA"] = 24] = "HIRAGANA_IROHA";
                LIST_STYLE_TYPE2[LIST_STYLE_TYPE2["JAPANESE_FORMAL"] = 25] = "JAPANESE_FORMAL";
                LIST_STYLE_TYPE2[LIST_STYLE_TYPE2["JAPANESE_INFORMAL"] = 26] = "JAPANESE_INFORMAL";
                LIST_STYLE_TYPE2[LIST_STYLE_TYPE2["KANNADA"] = 27] = "KANNADA";
                LIST_STYLE_TYPE2[LIST_STYLE_TYPE2["KATAKANA"] = 28] = "KATAKANA";
                LIST_STYLE_TYPE2[LIST_STYLE_TYPE2["KATAKANA_IROHA"] = 29] = "KATAKANA_IROHA";
                LIST_STYLE_TYPE2[LIST_STYLE_TYPE2["KHMER"] = 30] = "KHMER";
                LIST_STYLE_TYPE2[LIST_STYLE_TYPE2["KOREAN_HANGUL_FORMAL"] = 31] = "KOREAN_HANGUL_FORMAL";
                LIST_STYLE_TYPE2[LIST_STYLE_TYPE2["KOREAN_HANJA_FORMAL"] = 32] = "KOREAN_HANJA_FORMAL";
                LIST_STYLE_TYPE2[LIST_STYLE_TYPE2["KOREAN_HANJA_INFORMAL"] = 33] = "KOREAN_HANJA_INFORMAL";
                LIST_STYLE_TYPE2[LIST_STYLE_TYPE2["LAO"] = 34] = "LAO";
                LIST_STYLE_TYPE2[LIST_STYLE_TYPE2["LOWER_ARMENIAN"] = 35] = "LOWER_ARMENIAN";
                LIST_STYLE_TYPE2[LIST_STYLE_TYPE2["MALAYALAM"] = 36] = "MALAYALAM";
                LIST_STYLE_TYPE2[LIST_STYLE_TYPE2["MONGOLIAN"] = 37] = "MONGOLIAN";
                LIST_STYLE_TYPE2[LIST_STYLE_TYPE2["MYANMAR"] = 38] = "MYANMAR";
                LIST_STYLE_TYPE2[LIST_STYLE_TYPE2["ORIYA"] = 39] = "ORIYA";
                LIST_STYLE_TYPE2[LIST_STYLE_TYPE2["PERSIAN"] = 40] = "PERSIAN";
                LIST_STYLE_TYPE2[LIST_STYLE_TYPE2["SIMP_CHINESE_FORMAL"] = 41] = "SIMP_CHINESE_FORMAL";
                LIST_STYLE_TYPE2[LIST_STYLE_TYPE2["SIMP_CHINESE_INFORMAL"] = 42] = "SIMP_CHINESE_INFORMAL";
                LIST_STYLE_TYPE2[LIST_STYLE_TYPE2["TAMIL"] = 43] = "TAMIL";
                LIST_STYLE_TYPE2[LIST_STYLE_TYPE2["TELUGU"] = 44] = "TELUGU";
                LIST_STYLE_TYPE2[LIST_STYLE_TYPE2["THAI"] = 45] = "THAI";
                LIST_STYLE_TYPE2[LIST_STYLE_TYPE2["TIBETAN"] = 46] = "TIBETAN";
                LIST_STYLE_TYPE2[LIST_STYLE_TYPE2["TRAD_CHINESE_FORMAL"] = 47] = "TRAD_CHINESE_FORMAL";
                LIST_STYLE_TYPE2[LIST_STYLE_TYPE2["TRAD_CHINESE_INFORMAL"] = 48] = "TRAD_CHINESE_INFORMAL";
                LIST_STYLE_TYPE2[LIST_STYLE_TYPE2["UPPER_ARMENIAN"] = 49] = "UPPER_ARMENIAN";
                LIST_STYLE_TYPE2[LIST_STYLE_TYPE2["DISCLOSURE_OPEN"] = 50] = "DISCLOSURE_OPEN";
                LIST_STYLE_TYPE2[LIST_STYLE_TYPE2["DISCLOSURE_CLOSED"] = 51] = "DISCLOSURE_CLOSED";
            })(LIST_STYLE_TYPE || (LIST_STYLE_TYPE = {}));
            var listStyleType = {
                name: "list-style-type",
                initialValue: "none",
                prefix: false,
                type: PropertyDescriptorParsingType.IDENT_VALUE,
                parse: function(type) {
                    switch (type) {
                        case "disc":
                            return LIST_STYLE_TYPE.DISC;
                        case "circle":
                            return LIST_STYLE_TYPE.CIRCLE;
                        case "square":
                            return LIST_STYLE_TYPE.SQUARE;
                        case "decimal":
                            return LIST_STYLE_TYPE.DECIMAL;
                        case "cjk-decimal":
                            return LIST_STYLE_TYPE.CJK_DECIMAL;
                        case "decimal-leading-zero":
                            return LIST_STYLE_TYPE.DECIMAL_LEADING_ZERO;
                        case "lower-roman":
                            return LIST_STYLE_TYPE.LOWER_ROMAN;
                        case "upper-roman":
                            return LIST_STYLE_TYPE.UPPER_ROMAN;
                        case "lower-greek":
                            return LIST_STYLE_TYPE.LOWER_GREEK;
                        case "lower-alpha":
                            return LIST_STYLE_TYPE.LOWER_ALPHA;
                        case "upper-alpha":
                            return LIST_STYLE_TYPE.UPPER_ALPHA;
                        case "arabic-indic":
                            return LIST_STYLE_TYPE.ARABIC_INDIC;
                        case "armenian":
                            return LIST_STYLE_TYPE.ARMENIAN;
                        case "bengali":
                            return LIST_STYLE_TYPE.BENGALI;
                        case "cambodian":
                            return LIST_STYLE_TYPE.CAMBODIAN;
                        case "cjk-earthly-branch":
                            return LIST_STYLE_TYPE.CJK_EARTHLY_BRANCH;
                        case "cjk-heavenly-stem":
                            return LIST_STYLE_TYPE.CJK_HEAVENLY_STEM;
                        case "cjk-ideographic":
                            return LIST_STYLE_TYPE.CJK_IDEOGRAPHIC;
                        case "devanagari":
                            return LIST_STYLE_TYPE.DEVANAGARI;
                        case "ethiopic-numeric":
                            return LIST_STYLE_TYPE.ETHIOPIC_NUMERIC;
                        case "georgian":
                            return LIST_STYLE_TYPE.GEORGIAN;
                        case "gujarati":
                            return LIST_STYLE_TYPE.GUJARATI;
                        case "gurmukhi":
                            return LIST_STYLE_TYPE.GURMUKHI;
                        case "hebrew":
                            return LIST_STYLE_TYPE.HEBREW;
                        case "hiragana":
                            return LIST_STYLE_TYPE.HIRAGANA;
                        case "hiragana-iroha":
                            return LIST_STYLE_TYPE.HIRAGANA_IROHA;
                        case "japanese-formal":
                            return LIST_STYLE_TYPE.JAPANESE_FORMAL;
                        case "japanese-informal":
                            return LIST_STYLE_TYPE.JAPANESE_INFORMAL;
                        case "kannada":
                            return LIST_STYLE_TYPE.KANNADA;
                        case "katakana":
                            return LIST_STYLE_TYPE.KATAKANA;
                        case "katakana-iroha":
                            return LIST_STYLE_TYPE.KATAKANA_IROHA;
                        case "khmer":
                            return LIST_STYLE_TYPE.KHMER;
                        case "korean-hangul-formal":
                            return LIST_STYLE_TYPE.KOREAN_HANGUL_FORMAL;
                        case "korean-hanja-formal":
                            return LIST_STYLE_TYPE.KOREAN_HANJA_FORMAL;
                        case "korean-hanja-informal":
                            return LIST_STYLE_TYPE.KOREAN_HANJA_INFORMAL;
                        case "lao":
                            return LIST_STYLE_TYPE.LAO;
                        case "lower-armenian":
                            return LIST_STYLE_TYPE.LOWER_ARMENIAN;
                        case "malayalam":
                            return LIST_STYLE_TYPE.MALAYALAM;
                        case "mongolian":
                            return LIST_STYLE_TYPE.MONGOLIAN;
                        case "myanmar":
                            return LIST_STYLE_TYPE.MYANMAR;
                        case "oriya":
                            return LIST_STYLE_TYPE.ORIYA;
                        case "persian":
                            return LIST_STYLE_TYPE.PERSIAN;
                        case "simp-chinese-formal":
                            return LIST_STYLE_TYPE.SIMP_CHINESE_FORMAL;
                        case "simp-chinese-informal":
                            return LIST_STYLE_TYPE.SIMP_CHINESE_INFORMAL;
                        case "tamil":
                            return LIST_STYLE_TYPE.TAMIL;
                        case "telugu":
                            return LIST_STYLE_TYPE.TELUGU;
                        case "thai":
                            return LIST_STYLE_TYPE.THAI;
                        case "tibetan":
                            return LIST_STYLE_TYPE.TIBETAN;
                        case "trad-chinese-formal":
                            return LIST_STYLE_TYPE.TRAD_CHINESE_FORMAL;
                        case "trad-chinese-informal":
                            return LIST_STYLE_TYPE.TRAD_CHINESE_INFORMAL;
                        case "upper-armenian":
                            return LIST_STYLE_TYPE.UPPER_ARMENIAN;
                        case "disclosure-open":
                            return LIST_STYLE_TYPE.DISCLOSURE_OPEN;
                        case "disclosure-closed":
                            return LIST_STYLE_TYPE.DISCLOSURE_CLOSED;
                        case "none":
                        default:
                            return LIST_STYLE_TYPE.NONE;
                    }
                }
            };
            var marginForSide = function(side) {
                return {
                    name: "margin-" + side,
                    initialValue: "0",
                    prefix: false,
                    type: PropertyDescriptorParsingType.TOKEN_VALUE
                };
            };
            var marginTop = marginForSide("top");
            var marginRight = marginForSide("right");
            var marginBottom = marginForSide("bottom");
            var marginLeft = marginForSide("left");
            var OVERFLOW;
            (function(OVERFLOW2) {
                OVERFLOW2[OVERFLOW2["VISIBLE"] = 0] = "VISIBLE";
                OVERFLOW2[OVERFLOW2["HIDDEN"] = 1] = "HIDDEN";
                OVERFLOW2[OVERFLOW2["SCROLL"] = 2] = "SCROLL";
                OVERFLOW2[OVERFLOW2["AUTO"] = 3] = "AUTO";
            })(OVERFLOW || (OVERFLOW = {}));
            var overflow = {
                name: "overflow",
                initialValue: "visible",
                prefix: false,
                type: PropertyDescriptorParsingType.LIST,
                parse: function(tokens) {
                    return tokens.filter(isIdentToken).map(function(overflow2) {
                        switch (overflow2.value) {
                            case "hidden":
                                return OVERFLOW.HIDDEN;
                            case "scroll":
                                return OVERFLOW.SCROLL;
                            case "auto":
                                return OVERFLOW.AUTO;
                            case "visible":
                            default:
                                return OVERFLOW.VISIBLE;
                        }
                    });
                }
            };
            var OVERFLOW_WRAP;
            (function(OVERFLOW_WRAP2) {
                OVERFLOW_WRAP2["NORMAL"] = "normal";
                OVERFLOW_WRAP2["BREAK_WORD"] = "break-word";
            })(OVERFLOW_WRAP || (OVERFLOW_WRAP = {}));
            var overflowWrap = {
                name: "overflow-wrap",
                initialValue: "normal",
                prefix: false,
                type: PropertyDescriptorParsingType.IDENT_VALUE,
                parse: function(overflow2) {
                    switch (overflow2) {
                        case "break-word":
                            return OVERFLOW_WRAP.BREAK_WORD;
                        case "normal":
                        default:
                            return OVERFLOW_WRAP.NORMAL;
                    }
                }
            };
            var paddingForSide = function(side) {
                return {
                    name: "padding-" + side,
                    initialValue: "0",
                    prefix: false,
                    type: PropertyDescriptorParsingType.TYPE_VALUE,
                    format: "length-percentage"
                };
            };
            var paddingTop = paddingForSide("top");
            var paddingRight = paddingForSide("right");
            var paddingBottom = paddingForSide("bottom");
            var paddingLeft = paddingForSide("left");
            var TEXT_ALIGN;
            (function(TEXT_ALIGN2) {
                TEXT_ALIGN2[TEXT_ALIGN2["LEFT"] = 0] = "LEFT";
                TEXT_ALIGN2[TEXT_ALIGN2["CENTER"] = 1] = "CENTER";
                TEXT_ALIGN2[TEXT_ALIGN2["RIGHT"] = 2] = "RIGHT";
            })(TEXT_ALIGN || (TEXT_ALIGN = {}));
            var textAlign = {
                name: "text-align",
                initialValue: "left",
                prefix: false,
                type: PropertyDescriptorParsingType.IDENT_VALUE,
                parse: function(textAlign2) {
                    switch (textAlign2) {
                        case "right":
                            return TEXT_ALIGN.RIGHT;
                        case "center":
                        case "justify":
                            return TEXT_ALIGN.CENTER;
                        case "left":
                        default:
                            return TEXT_ALIGN.LEFT;
                    }
                }
            };
            var POSITION;
            (function(POSITION2) {
                POSITION2[POSITION2["STATIC"] = 0] = "STATIC";
                POSITION2[POSITION2["RELATIVE"] = 1] = "RELATIVE";
                POSITION2[POSITION2["ABSOLUTE"] = 2] = "ABSOLUTE";
                POSITION2[POSITION2["FIXED"] = 3] = "FIXED";
                POSITION2[POSITION2["STICKY"] = 4] = "STICKY";
            })(POSITION || (POSITION = {}));
            var position = {
                name: "position",
                initialValue: "static",
                prefix: false,
                type: PropertyDescriptorParsingType.IDENT_VALUE,
                parse: function(position2) {
                    switch (position2) {
                        case "relative":
                            return POSITION.RELATIVE;
                        case "absolute":
                            return POSITION.ABSOLUTE;
                        case "fixed":
                            return POSITION.FIXED;
                        case "sticky":
                            return POSITION.STICKY;
                    }
                    return POSITION.STATIC;
                }
            };
            var textShadow = {
                name: "text-shadow",
                initialValue: "none",
                type: PropertyDescriptorParsingType.LIST,
                prefix: false,
                parse: function(tokens) {
                    if (tokens.length === 1 && isIdentWithValue(tokens[0], "none")) {
                        return [];
                    }
                    return parseFunctionArgs(tokens).map(function(values) {
                        var shadow = {
                            color: COLORS.TRANSPARENT,
                            offsetX: ZERO_LENGTH,
                            offsetY: ZERO_LENGTH,
                            blur: ZERO_LENGTH
                        };
                        var c = 0;
                        for (var i2 = 0; i2 < values.length; i2++) {
                            var token = values[i2];
                            if (isLength(token)) {
                                if (c === 0) {
                                    shadow.offsetX = token;
                                } else if (c === 1) {
                                    shadow.offsetY = token;
                                } else {
                                    shadow.blur = token;
                                }
                                c++;
                            } else {
                                shadow.color = color.parse(token);
                            }
                        }
                        return shadow;
                    });
                }
            };
            var TEXT_TRANSFORM;
            (function(TEXT_TRANSFORM2) {
                TEXT_TRANSFORM2[TEXT_TRANSFORM2["NONE"] = 0] = "NONE";
                TEXT_TRANSFORM2[TEXT_TRANSFORM2["LOWERCASE"] = 1] = "LOWERCASE";
                TEXT_TRANSFORM2[TEXT_TRANSFORM2["UPPERCASE"] = 2] = "UPPERCASE";
                TEXT_TRANSFORM2[TEXT_TRANSFORM2["CAPITALIZE"] = 3] = "CAPITALIZE";
            })(TEXT_TRANSFORM || (TEXT_TRANSFORM = {}));
            var textTransform = {
                name: "text-transform",
                initialValue: "none",
                prefix: false,
                type: PropertyDescriptorParsingType.IDENT_VALUE,
                parse: function(textTransform2) {
                    switch (textTransform2) {
                        case "uppercase":
                            return TEXT_TRANSFORM.UPPERCASE;
                        case "lowercase":
                            return TEXT_TRANSFORM.LOWERCASE;
                        case "capitalize":
                            return TEXT_TRANSFORM.CAPITALIZE;
                    }
                    return TEXT_TRANSFORM.NONE;
                }
            };
            var transform = {
                name: "transform",
                initialValue: "none",
                prefix: true,
                type: PropertyDescriptorParsingType.VALUE,
                parse: function(token) {
                    if (token.type === TokenType.IDENT_TOKEN && token.value === "none") {
                        return null;
                    }
                    if (token.type === TokenType.FUNCTION) {
                        var transformFunction = SUPPORTED_TRANSFORM_FUNCTIONS[token.name];
                        if (typeof transformFunction === "undefined") {
                            throw new Error('Attempting to parse an unsupported transform function "' + token.name + '"');
                        }
                        return transformFunction(token.values);
                    }
                    return null;
                }
            };
            var matrix = function(args) {
                var values = args.filter(function(arg) {
                    return arg.type === TokenType.NUMBER_TOKEN;
                }).map(function(arg) {
                    return arg.number;
                });
                return values.length === 6 ? values : null;
            };
            var matrix3d = function(args) {
                var values = args.filter(function(arg) {
                    return arg.type === TokenType.NUMBER_TOKEN;
                }).map(function(arg) {
                    return arg.number;
                });
                var a1 = values[0],
                    b1 = values[1],
                    _a = values[2],
                    _b = values[3],
                    a2 = values[4],
                    b2 = values[5],
                    _c = values[6],
                    _d = values[7],
                    _e = values[8],
                    _f = values[9],
                    _g = values[10],
                    _h = values[11],
                    a4 = values[12],
                    b4 = values[13],
                    _j = values[14],
                    _k = values[15];
                return values.length === 16 ? [a1, b1, a2, b2, a4, b4] : null;
            };
            var SUPPORTED_TRANSFORM_FUNCTIONS = {
                matrix,
                matrix3d
            };
            var DEFAULT_VALUE = {
                type: TokenType.PERCENTAGE_TOKEN,
                number: 50,
                flags: FLAG_INTEGER
            };
            var DEFAULT = [DEFAULT_VALUE, DEFAULT_VALUE];
            var transformOrigin = {
                name: "transform-origin",
                initialValue: "50% 50%",
                prefix: true,
                type: PropertyDescriptorParsingType.LIST,
                parse: function(tokens) {
                    var origins = tokens.filter(isLengthPercentage);
                    if (origins.length !== 2) {
                        return DEFAULT;
                    }
                    return [origins[0], origins[1]];
                }
            };
            var VISIBILITY;
            (function(VISIBILITY2) {
                VISIBILITY2[VISIBILITY2["VISIBLE"] = 0] = "VISIBLE";
                VISIBILITY2[VISIBILITY2["HIDDEN"] = 1] = "HIDDEN";
                VISIBILITY2[VISIBILITY2["COLLAPSE"] = 2] = "COLLAPSE";
            })(VISIBILITY || (VISIBILITY = {}));
            var visibility = {
                name: "visible",
                initialValue: "none",
                prefix: false,
                type: PropertyDescriptorParsingType.IDENT_VALUE,
                parse: function(visibility2) {
                    switch (visibility2) {
                        case "hidden":
                            return VISIBILITY.HIDDEN;
                        case "collapse":
                            return VISIBILITY.COLLAPSE;
                        case "visible":
                        default:
                            return VISIBILITY.VISIBLE;
                    }
                }
            };
            var WORD_BREAK;
            (function(WORD_BREAK2) {
                WORD_BREAK2["NORMAL"] = "normal";
                WORD_BREAK2["BREAK_ALL"] = "break-all";
                WORD_BREAK2["KEEP_ALL"] = "keep-all";
            })(WORD_BREAK || (WORD_BREAK = {}));
            var wordBreak = {
                name: "word-break",
                initialValue: "normal",
                prefix: false,
                type: PropertyDescriptorParsingType.IDENT_VALUE,
                parse: function(wordBreak2) {
                    switch (wordBreak2) {
                        case "break-all":
                            return WORD_BREAK.BREAK_ALL;
                        case "keep-all":
                            return WORD_BREAK.KEEP_ALL;
                        case "normal":
                        default:
                            return WORD_BREAK.NORMAL;
                    }
                }
            };
            var zIndex = {
                name: "z-index",
                initialValue: "auto",
                prefix: false,
                type: PropertyDescriptorParsingType.VALUE,
                parse: function(token) {
                    if (token.type === TokenType.IDENT_TOKEN) {
                        return {
                            auto: true,
                            order: 0
                        };
                    }
                    if (isNumberToken(token)) {
                        return {
                            auto: false,
                            order: token.number
                        };
                    }
                    throw new Error("Invalid z-index number parsed");
                }
            };
            var opacity = {
                name: "opacity",
                initialValue: "1",
                type: PropertyDescriptorParsingType.VALUE,
                prefix: false,
                parse: function(token) {
                    if (isNumberToken(token)) {
                        return token.number;
                    }
                    return 1;
                }
            };
            var textDecorationColor = {
                name: "text-decoration-color",
                initialValue: "transparent",
                prefix: false,
                type: PropertyDescriptorParsingType.TYPE_VALUE,
                format: "color"
            };
            var textDecorationLine = {
                name: "text-decoration-line",
                initialValue: "none",
                prefix: false,
                type: PropertyDescriptorParsingType.LIST,
                parse: function(tokens) {
                    return tokens.filter(isIdentToken).map(function(token) {
                        switch (token.value) {
                            case "underline":
                                return 1;
                            case "overline":
                                return 2;
                            case "line-through":
                                return 3;
                            case "none":
                                return 4;
                        }
                        return 0;
                    }).filter(function(line) {
                        return line !== 0;
                    });
                }
            };
            var fontFamily = {
                name: "font-family",
                initialValue: "",
                prefix: false,
                type: PropertyDescriptorParsingType.LIST,
                parse: function(tokens) {
                    var accumulator = [];
                    var results = [];
                    tokens.forEach(function(token) {
                        switch (token.type) {
                            case TokenType.IDENT_TOKEN:
                            case TokenType.STRING_TOKEN:
                                accumulator.push(token.value);
                                break;
                            case TokenType.NUMBER_TOKEN:
                                accumulator.push(token.number.toString());
                                break;
                            case TokenType.COMMA_TOKEN:
                                results.push(accumulator.join(" "));
                                accumulator.length = 0;
                                break;
                        }
                    });
                    if (accumulator.length) {
                        results.push(accumulator.join(" "));
                    }
                    return results.map(function(result) {
                        return result.indexOf(" ") === -1 ? result : "'" + result + "'";
                    });
                }
            };
            var fontSize = {
                name: "font-size",
                initialValue: "0",
                prefix: false,
                type: PropertyDescriptorParsingType.TYPE_VALUE,
                format: "length"
            };
            var fontWeight = {
                name: "font-weight",
                initialValue: "normal",
                type: PropertyDescriptorParsingType.VALUE,
                prefix: false,
                parse: function(token) {
                    if (isNumberToken(token)) {
                        return token.number;
                    }
                    if (isIdentToken(token)) {
                        switch (token.value) {
                            case "bold":
                                return 700;
                            case "normal":
                            default:
                                return 400;
                        }
                    }
                    return 400;
                }
            };
            var fontVariant = {
                name: "font-variant",
                initialValue: "none",
                type: PropertyDescriptorParsingType.LIST,
                prefix: false,
                parse: function(tokens) {
                    return tokens.filter(isIdentToken).map(function(token) {
                        return token.value;
                    });
                }
            };
            var FONT_STYLE;
            (function(FONT_STYLE2) {
                FONT_STYLE2["NORMAL"] = "normal";
                FONT_STYLE2["ITALIC"] = "italic";
                FONT_STYLE2["OBLIQUE"] = "oblique";
            })(FONT_STYLE || (FONT_STYLE = {}));
            var fontStyle = {
                name: "font-style",
                initialValue: "normal",
                prefix: false,
                type: PropertyDescriptorParsingType.IDENT_VALUE,
                parse: function(overflow2) {
                    switch (overflow2) {
                        case "oblique":
                            return FONT_STYLE.OBLIQUE;
                        case "italic":
                            return FONT_STYLE.ITALIC;
                        case "normal":
                        default:
                            return FONT_STYLE.NORMAL;
                    }
                }
            };
            var contains = function(bit, value) {
                return (bit & value) !== 0;
            };
            var content = {
                name: "content",
                initialValue: "none",
                type: PropertyDescriptorParsingType.LIST,
                prefix: false,
                parse: function(tokens) {
                    if (tokens.length === 0) {
                        return [];
                    }
                    var first = tokens[0];
                    if (first.type === TokenType.IDENT_TOKEN && first.value === "none") {
                        return [];
                    }
                    return tokens;
                }
            };
            var counterIncrement = {
                name: "counter-increment",
                initialValue: "none",
                prefix: true,
                type: PropertyDescriptorParsingType.LIST,
                parse: function(tokens) {
                    if (tokens.length === 0) {
                        return null;
                    }
                    var first = tokens[0];
                    if (first.type === TokenType.IDENT_TOKEN && first.value === "none") {
                        return null;
                    }
                    var increments = [];
                    var filtered = tokens.filter(nonWhiteSpace);
                    for (var i2 = 0; i2 < filtered.length; i2++) {
                        var counter = filtered[i2];
                        var next = filtered[i2 + 1];
                        if (counter.type === TokenType.IDENT_TOKEN) {
                            var increment = next && isNumberToken(next) ? next.number : 1;
                            increments.push({
                                counter: counter.value,
                                increment
                            });
                        }
                    }
                    return increments;
                }
            };
            var counterReset = {
                name: "counter-reset",
                initialValue: "none",
                prefix: true,
                type: PropertyDescriptorParsingType.LIST,
                parse: function(tokens) {
                    if (tokens.length === 0) {
                        return [];
                    }
                    var resets = [];
                    var filtered = tokens.filter(nonWhiteSpace);
                    for (var i2 = 0; i2 < filtered.length; i2++) {
                        var counter = filtered[i2];
                        var next = filtered[i2 + 1];
                        if (isIdentToken(counter) && counter.value !== "none") {
                            var reset = next && isNumberToken(next) ? next.number : 0;
                            resets.push({
                                counter: counter.value,
                                reset
                            });
                        }
                    }
                    return resets;
                }
            };
            var quotes = {
                name: "quotes",
                initialValue: "none",
                prefix: true,
                type: PropertyDescriptorParsingType.LIST,
                parse: function(tokens) {
                    if (tokens.length === 0) {
                        return null;
                    }
                    var first = tokens[0];
                    if (first.type === TokenType.IDENT_TOKEN && first.value === "none") {
                        return null;
                    }
                    var quotes2 = [];
                    var filtered = tokens.filter(isStringToken);
                    if (filtered.length % 2 !== 0) {
                        return null;
                    }
                    for (var i2 = 0; i2 < filtered.length; i2 += 2) {
                        var open_1 = filtered[i2].value;
                        var close_1 = filtered[i2 + 1].value;
                        quotes2.push({
                            open: open_1,
                            close: close_1
                        });
                    }
                    return quotes2;
                }
            };
            var getQuote = function(quotes2, depth, open) {
                if (!quotes2) {
                    return "";
                }
                var quote = quotes2[Math.min(depth, quotes2.length - 1)];
                if (!quote) {
                    return "";
                }
                return open ? quote.open : quote.close;
            };
            var boxShadow = {
                name: "box-shadow",
                initialValue: "none",
                type: PropertyDescriptorParsingType.LIST,
                prefix: false,
                parse: function(tokens) {
                    if (tokens.length === 1 && isIdentWithValue(tokens[0], "none")) {
                        return [];
                    }
                    return parseFunctionArgs(tokens).map(function(values) {
                        var shadow = {
                            color: 255,
                            offsetX: ZERO_LENGTH,
                            offsetY: ZERO_LENGTH,
                            blur: ZERO_LENGTH,
                            spread: ZERO_LENGTH,
                            inset: false
                        };
                        var c = 0;
                        for (var i2 = 0; i2 < values.length; i2++) {
                            var token = values[i2];
                            if (isIdentWithValue(token, "inset")) {
                                shadow.inset = true;
                            } else if (isLength(token)) {
                                if (c === 0) {
                                    shadow.offsetX = token;
                                } else if (c === 1) {
                                    shadow.offsetY = token;
                                } else if (c === 2) {
                                    shadow.blur = token;
                                } else {
                                    shadow.spread = token;
                                }
                                c++;
                            } else {
                                shadow.color = color.parse(token);
                            }
                        }
                        return shadow;
                    });
                }
            };
            var CSSParsedDeclaration = function() {
                function CSSParsedDeclaration2(declaration) {
                    this.backgroundClip = parse(backgroundClip, declaration.backgroundClip);
                    this.backgroundColor = parse(backgroundColor, declaration.backgroundColor);
                    this.backgroundImage = parse(backgroundImage, declaration.backgroundImage);
                    this.backgroundOrigin = parse(backgroundOrigin, declaration.backgroundOrigin);
                    this.backgroundPosition = parse(backgroundPosition, declaration.backgroundPosition);
                    this.backgroundRepeat = parse(backgroundRepeat, declaration.backgroundRepeat);
                    this.backgroundSize = parse(backgroundSize, declaration.backgroundSize);
                    this.borderTopColor = parse(borderTopColor, declaration.borderTopColor);
                    this.borderRightColor = parse(borderRightColor, declaration.borderRightColor);
                    this.borderBottomColor = parse(borderBottomColor, declaration.borderBottomColor);
                    this.borderLeftColor = parse(borderLeftColor, declaration.borderLeftColor);
                    this.borderTopLeftRadius = parse(borderTopLeftRadius, declaration.borderTopLeftRadius);
                    this.borderTopRightRadius = parse(borderTopRightRadius, declaration.borderTopRightRadius);
                    this.borderBottomRightRadius = parse(borderBottomRightRadius, declaration.borderBottomRightRadius);
                    this.borderBottomLeftRadius = parse(borderBottomLeftRadius, declaration.borderBottomLeftRadius);
                    this.borderTopStyle = parse(borderTopStyle, declaration.borderTopStyle);
                    this.borderRightStyle = parse(borderRightStyle, declaration.borderRightStyle);
                    this.borderBottomStyle = parse(borderBottomStyle, declaration.borderBottomStyle);
                    this.borderLeftStyle = parse(borderLeftStyle, declaration.borderLeftStyle);
                    this.borderTopWidth = parse(borderTopWidth, declaration.borderTopWidth);
                    this.borderRightWidth = parse(borderRightWidth, declaration.borderRightWidth);
                    this.borderBottomWidth = parse(borderBottomWidth, declaration.borderBottomWidth);
                    this.borderLeftWidth = parse(borderLeftWidth, declaration.borderLeftWidth);
                    this.boxShadow = parse(boxShadow, declaration.boxShadow);
                    this.color = parse(color$1, declaration.color);
                    this.display = parse(display, declaration.display);
                    this.float = parse(float, declaration.cssFloat);
                    this.fontFamily = parse(fontFamily, declaration.fontFamily);
                    this.fontSize = parse(fontSize, declaration.fontSize);
                    this.fontStyle = parse(fontStyle, declaration.fontStyle);
                    this.fontVariant = parse(fontVariant, declaration.fontVariant);
                    this.fontWeight = parse(fontWeight, declaration.fontWeight);
                    this.letterSpacing = parse(letterSpacing, declaration.letterSpacing);
                    this.lineBreak = parse(lineBreak, declaration.lineBreak);
                    this.lineHeight = parse(lineHeight, declaration.lineHeight);
                    this.listStyleImage = parse(listStyleImage, declaration.listStyleImage);
                    this.listStylePosition = parse(listStylePosition, declaration.listStylePosition);
                    this.listStyleType = parse(listStyleType, declaration.listStyleType);
                    this.marginTop = parse(marginTop, declaration.marginTop);
                    this.marginRight = parse(marginRight, declaration.marginRight);
                    this.marginBottom = parse(marginBottom, declaration.marginBottom);
                    this.marginLeft = parse(marginLeft, declaration.marginLeft);
                    this.opacity = parse(opacity, declaration.opacity);
                    var overflowTuple = parse(overflow, declaration.overflow);
                    this.overflowX = overflowTuple[0];
                    this.overflowY = overflowTuple[overflowTuple.length > 1 ? 1 : 0];
                    this.overflowWrap = parse(overflowWrap, declaration.overflowWrap);
                    this.paddingTop = parse(paddingTop, declaration.paddingTop);
                    this.paddingRight = parse(paddingRight, declaration.paddingRight);
                    this.paddingBottom = parse(paddingBottom, declaration.paddingBottom);
                    this.paddingLeft = parse(paddingLeft, declaration.paddingLeft);
                    this.position = parse(position, declaration.position);
                    this.textAlign = parse(textAlign, declaration.textAlign);
                    this.textDecorationColor = parse(textDecorationColor, declaration.textDecorationColor || declaration.color);
                    this.textDecorationLine = parse(textDecorationLine, declaration.textDecorationLine);
                    this.textShadow = parse(textShadow, declaration.textShadow);
                    this.textTransform = parse(textTransform, declaration.textTransform);
                    this.transform = parse(transform, declaration.transform);
                    this.transformOrigin = parse(transformOrigin, declaration.transformOrigin);
                    this.visibility = parse(visibility, declaration.visibility);
                    this.wordBreak = parse(wordBreak, declaration.wordBreak);
                    this.zIndex = parse(zIndex, declaration.zIndex);
                }
                CSSParsedDeclaration2.prototype.isVisible = function() {
                    return this.display > 0 && this.opacity > 0 && this.visibility === VISIBILITY.VISIBLE;
                };
                CSSParsedDeclaration2.prototype.isTransparent = function() {
                    return isTransparent(this.backgroundColor);
                };
                CSSParsedDeclaration2.prototype.isTransformed = function() {
                    return this.transform !== null;
                };
                CSSParsedDeclaration2.prototype.isPositioned = function() {
                    return this.position !== POSITION.STATIC;
                };
                CSSParsedDeclaration2.prototype.isPositionedWithZIndex = function() {
                    return this.isPositioned() && !this.zIndex.auto;
                };
                CSSParsedDeclaration2.prototype.isFloating = function() {
                    return this.float !== FLOAT.NONE;
                };
                CSSParsedDeclaration2.prototype.isInlineLevel = function() {
                    return contains(this.display, 4) || contains(this.display, 33554432) || contains(this.display, 268435456) || contains(this.display, 536870912) || contains(this.display, 67108864) || contains(this.display, 134217728);
                };
                return CSSParsedDeclaration2;
            }();
            var CSSParsedPseudoDeclaration = function() {
                function CSSParsedPseudoDeclaration2(declaration) {
                    this.content = parse(content, declaration.content);
                    this.quotes = parse(quotes, declaration.quotes);
                }
                return CSSParsedPseudoDeclaration2;
            }();
            var CSSParsedCounterDeclaration = function() {
                function CSSParsedCounterDeclaration2(declaration) {
                    this.counterIncrement = parse(counterIncrement, declaration.counterIncrement);
                    this.counterReset = parse(counterReset, declaration.counterReset);
                }
                return CSSParsedCounterDeclaration2;
            }();
            var parse = function(descriptor, style) {
                var tokenizer = new Tokenizer();
                var value = style !== null && typeof style !== "undefined" ? style.toString() : descriptor.initialValue;
                tokenizer.write(value);
                var parser = new Parser(tokenizer.read());
                switch (descriptor.type) {
                    case PropertyDescriptorParsingType.IDENT_VALUE:
                        var token = parser.parseComponentValue();
                        return descriptor.parse(isIdentToken(token) ? token.value : descriptor.initialValue);
                    case PropertyDescriptorParsingType.VALUE:
                        return descriptor.parse(parser.parseComponentValue());
                    case PropertyDescriptorParsingType.LIST:
                        return descriptor.parse(parser.parseComponentValues());
                    case PropertyDescriptorParsingType.TOKEN_VALUE:
                        return parser.parseComponentValue();
                    case PropertyDescriptorParsingType.TYPE_VALUE:
                        switch (descriptor.format) {
                            case "angle":
                                return angle.parse(parser.parseComponentValue());
                            case "color":
                                return color.parse(parser.parseComponentValue());
                            case "image":
                                return image.parse(parser.parseComponentValue());
                            case "length":
                                var length_1 = parser.parseComponentValue();
                                return isLength(length_1) ? length_1 : ZERO_LENGTH;
                            case "length-percentage":
                                var value_1 = parser.parseComponentValue();
                                return isLengthPercentage(value_1) ? value_1 : ZERO_LENGTH;
                        }
                }
                throw new Error("Attempting to parse unsupported css format type " + descriptor.format);
            };
            var ElementContainer = function() {
                function ElementContainer2(element) {
                    this.styles = new CSSParsedDeclaration(window.getComputedStyle(element, null));
                    this.textNodes = [];
                    this.elements = [];
                    if (this.styles.transform !== null && isHTMLElementNode(element)) {
                        element.style.transform = "none";
                    }
                    this.bounds = parseBounds(element);
                    this.flags = 0;
                }
                return ElementContainer2;
            }();
            var TextBounds = function() {
                function TextBounds2(text, bounds) {
                    this.text = text;
                    this.bounds = bounds;
                }
                return TextBounds2;
            }();
            var parseTextBounds = function(value, styles, node) {
                var textList = breakText(value, styles);
                var textBounds = [];
                var offset = 0;
                textList.forEach(function(text) {
                    if (styles.textDecorationLine.length || text.trim().length > 0) {
                        if (FEATURES.SUPPORT_RANGE_BOUNDS) {
                            textBounds.push(new TextBounds(text, getRangeBounds(node, offset, text.length)));
                        } else {
                            var replacementNode = node.splitText(text.length);
                            textBounds.push(new TextBounds(text, getWrapperBounds(node)));
                            node = replacementNode;
                        }
                    } else if (!FEATURES.SUPPORT_RANGE_BOUNDS) {
                        node = node.splitText(text.length);
                    }
                    offset += text.length;
                });
                return textBounds;
            };
            var getWrapperBounds = function(node) {
                var ownerDocument = node.ownerDocument;
                if (ownerDocument) {
                    var wrapper = ownerDocument.createElement("html2canvaswrapper");
                    wrapper.appendChild(node.cloneNode(true));
                    var parentNode = node.parentNode;
                    if (parentNode) {
                        parentNode.replaceChild(wrapper, node);
                        var bounds = parseBounds(wrapper);
                        if (wrapper.firstChild) {
                            parentNode.replaceChild(wrapper.firstChild, wrapper);
                        }
                        return bounds;
                    }
                }
                return new Bounds(0, 0, 0, 0);
            };
            var getRangeBounds = function(node, offset, length) {
                var ownerDocument = node.ownerDocument;
                if (!ownerDocument) {
                    throw new Error("Node has no owner document");
                }
                var range = ownerDocument.createRange();
                range.setStart(node, offset);
                range.setEnd(node, offset + length);
                return Bounds.fromClientRect(range.getBoundingClientRect());
            };
            var breakText = function(value, styles) {
                return styles.letterSpacing !== 0 ? toCodePoints(value).map(function(i2) {
                    return fromCodePoint(i2);
                }) : breakWords(value, styles);
            };
            var breakWords = function(str, styles) {
                var breaker = LineBreaker(str, {
                    lineBreak: styles.lineBreak,
                    wordBreak: styles.overflowWrap === OVERFLOW_WRAP.BREAK_WORD ? "break-word" : styles.wordBreak
                });
                var words = [];
                var bk;
                while (!(bk = breaker.next()).done) {
                    if (bk.value) {
                        words.push(bk.value.slice());
                    }
                }
                return words;
            };
            var TextContainer = function() {
                function TextContainer2(node, styles) {
                    this.text = transform$1(node.data, styles.textTransform);
                    this.textBounds = parseTextBounds(this.text, styles, node);
                }
                return TextContainer2;
            }();
            var transform$1 = function(text, transform2) {
                switch (transform2) {
                    case TEXT_TRANSFORM.LOWERCASE:
                        return text.toLowerCase();
                    case TEXT_TRANSFORM.CAPITALIZE:
                        return text.replace(CAPITALIZE, capitalize);
                    case TEXT_TRANSFORM.UPPERCASE:
                        return text.toUpperCase();
                    default:
                        return text;
                }
            };
            var CAPITALIZE = /(^|\s|:|-|\(|\))([a-z])/g;
            var capitalize = function(m, p1, p2) {
                if (m.length > 0) {
                    return p1 + p2.toUpperCase();
                }
                return m;
            };
            var ImageElementContainer = function(_super) {
                __extends(ImageElementContainer2, _super);

                function ImageElementContainer2(img) {
                    var _this2 = _super.call(this, img) || this;
                    _this2.src = img.currentSrc || img.src;
                    _this2.intrinsicWidth = img.naturalWidth;
                    _this2.intrinsicHeight = img.naturalHeight;
                    CacheStorage.getInstance().addImage(_this2.src);
                    return _this2;
                }
                return ImageElementContainer2;
            }(ElementContainer);
            var CanvasElementContainer = function(_super) {
                __extends(CanvasElementContainer2, _super);

                function CanvasElementContainer2(canvas) {
                    var _this2 = _super.call(this, canvas) || this;
                    _this2.canvas = canvas;
                    _this2.intrinsicWidth = canvas.width;
                    _this2.intrinsicHeight = canvas.height;
                    return _this2;
                }
                return CanvasElementContainer2;
            }(ElementContainer);
            var SVGElementContainer = function(_super) {
                __extends(SVGElementContainer2, _super);

                function SVGElementContainer2(img) {
                    var _this2 = _super.call(this, img) || this;
                    var s = new XMLSerializer();
                    _this2.svg = "data:image/svg+xml," + encodeURIComponent(s.serializeToString(img));
                    _this2.intrinsicWidth = img.width.baseVal.value;
                    _this2.intrinsicHeight = img.height.baseVal.value;
                    CacheStorage.getInstance().addImage(_this2.svg);
                    return _this2;
                }
                return SVGElementContainer2;
            }(ElementContainer);
            var LIElementContainer = function(_super) {
                __extends(LIElementContainer2, _super);

                function LIElementContainer2(element) {
                    var _this2 = _super.call(this, element) || this;
                    _this2.value = element.value;
                    return _this2;
                }
                return LIElementContainer2;
            }(ElementContainer);
            var OLElementContainer = function(_super) {
                __extends(OLElementContainer2, _super);

                function OLElementContainer2(element) {
                    var _this2 = _super.call(this, element) || this;
                    _this2.start = element.start;
                    _this2.reversed = typeof element.reversed === "boolean" && element.reversed === true;
                    return _this2;
                }
                return OLElementContainer2;
            }(ElementContainer);
            var CHECKBOX_BORDER_RADIUS = [{
                type: TokenType.DIMENSION_TOKEN,
                flags: 0,
                unit: "px",
                number: 3
            }];
            var RADIO_BORDER_RADIUS = [{
                type: TokenType.PERCENTAGE_TOKEN,
                flags: 0,
                number: 50
            }];
            var reformatInputBounds = function(bounds) {
                if (bounds.width > bounds.height) {
                    return new Bounds(bounds.left + (bounds.width - bounds.height) / 2, bounds.top, bounds.height, bounds.height);
                } else if (bounds.width < bounds.height) {
                    return new Bounds(bounds.left, bounds.top + (bounds.height - bounds.width) / 2, bounds.width, bounds.width);
                }
                return bounds;
            };
            var getInputValue = function(node) {
                var value = node.type === PASSWORD ? new Array(node.value.length + 1).join("•") : node.value;
                return value.length === 0 ? node.placeholder || "" : value;
            };
            var CHECKBOX = "checkbox";
            var RADIO = "radio";
            var PASSWORD = "password";
            var INPUT_COLOR = 707406591;
            var InputElementContainer = function(_super) {
                __extends(InputElementContainer2, _super);

                function InputElementContainer2(input) {
                    var _this2 = _super.call(this, input) || this;
                    _this2.type = input.type.toLowerCase();
                    _this2.checked = input.checked;
                    _this2.value = getInputValue(input);
                    if (_this2.type === CHECKBOX || _this2.type === RADIO) {
                        _this2.styles.backgroundColor = 3739148031;
                        _this2.styles.borderTopColor = _this2.styles.borderRightColor = _this2.styles.borderBottomColor = _this2.styles.borderLeftColor = 2779096575;
                        _this2.styles.borderTopWidth = _this2.styles.borderRightWidth = _this2.styles.borderBottomWidth = _this2.styles.borderLeftWidth = 1;
                        _this2.styles.borderTopStyle = _this2.styles.borderRightStyle = _this2.styles.borderBottomStyle = _this2.styles.borderLeftStyle = BORDER_STYLE.SOLID;
                        _this2.styles.backgroundClip = [BACKGROUND_CLIP.BORDER_BOX];
                        _this2.styles.backgroundOrigin = [0];
                        _this2.bounds = reformatInputBounds(_this2.bounds);
                    }
                    switch (_this2.type) {
                        case CHECKBOX:
                            _this2.styles.borderTopRightRadius = _this2.styles.borderTopLeftRadius = _this2.styles.borderBottomRightRadius = _this2.styles.borderBottomLeftRadius = CHECKBOX_BORDER_RADIUS;
                            break;
                        case RADIO:
                            _this2.styles.borderTopRightRadius = _this2.styles.borderTopLeftRadius = _this2.styles.borderBottomRightRadius = _this2.styles.borderBottomLeftRadius = RADIO_BORDER_RADIUS;
                            break;
                    }
                    return _this2;
                }
                return InputElementContainer2;
            }(ElementContainer);
            var SelectElementContainer = function(_super) {
                __extends(SelectElementContainer2, _super);

                function SelectElementContainer2(element) {
                    var _this2 = _super.call(this, element) || this;
                    var option = element.options[element.selectedIndex || 0];
                    _this2.value = option ? option.text || "" : "";
                    return _this2;
                }
                return SelectElementContainer2;
            }(ElementContainer);
            var TextareaElementContainer = function(_super) {
                __extends(TextareaElementContainer2, _super);

                function TextareaElementContainer2(element) {
                    var _this2 = _super.call(this, element) || this;
                    _this2.value = element.value;
                    return _this2;
                }
                return TextareaElementContainer2;
            }(ElementContainer);
            var parseColor = function(value) {
                return color.parse(Parser.create(value).parseComponentValue());
            };
            var IFrameElementContainer = function(_super) {
                __extends(IFrameElementContainer2, _super);

                function IFrameElementContainer2(iframe) {
                    var _this2 = _super.call(this, iframe) || this;
                    _this2.src = iframe.src;
                    _this2.width = parseInt(iframe.width, 10) || 0;
                    _this2.height = parseInt(iframe.height, 10) || 0;
                    _this2.backgroundColor = _this2.styles.backgroundColor;
                    try {
                        if (iframe.contentWindow && iframe.contentWindow.document && iframe.contentWindow.document.documentElement) {
                            _this2.tree = parseTree(iframe.contentWindow.document.documentElement);
                            var documentBackgroundColor = iframe.contentWindow.document.documentElement ? parseColor(getComputedStyle(iframe.contentWindow.document.documentElement).backgroundColor) : COLORS.TRANSPARENT;
                            var bodyBackgroundColor = iframe.contentWindow.document.body ? parseColor(getComputedStyle(iframe.contentWindow.document.body).backgroundColor) : COLORS.TRANSPARENT;
                            _this2.backgroundColor = isTransparent(documentBackgroundColor) ? isTransparent(bodyBackgroundColor) ? _this2.styles.backgroundColor : bodyBackgroundColor : documentBackgroundColor;
                        }
                    } catch (e2) {}
                    return _this2;
                }
                return IFrameElementContainer2;
            }(ElementContainer);
            var LIST_OWNERS = ["OL", "UL", "MENU"];
            var parseNodeTree = function(node, parent, root) {
                for (var childNode = node.firstChild, nextNode = void 0; childNode; childNode = nextNode) {
                    nextNode = childNode.nextSibling;
                    if (isTextNode(childNode) && childNode.data.trim().length > 0) {
                        parent.textNodes.push(new TextContainer(childNode, parent.styles));
                    } else if (isElementNode(childNode)) {
                        var container = createContainer(childNode);
                        if (container.styles.isVisible()) {
                            if (createsRealStackingContext(childNode, container, root)) {
                                container.flags |= 4;
                            } else if (createsStackingContext(container.styles)) {
                                container.flags |= 2;
                            }
                            if (LIST_OWNERS.indexOf(childNode.tagName) !== -1) {
                                container.flags |= 8;
                            }
                            parent.elements.push(container);
                            if (!isTextareaElement(childNode) && !isSVGElement(childNode) && !isSelectElement(childNode)) {
                                parseNodeTree(childNode, container, root);
                            }
                        }
                    }
                }
            };
            var createContainer = function(element) {
                if (isImageElement(element)) {
                    return new ImageElementContainer(element);
                }
                if (isCanvasElement(element)) {
                    return new CanvasElementContainer(element);
                }
                if (isSVGElement(element)) {
                    return new SVGElementContainer(element);
                }
                if (isLIElement(element)) {
                    return new LIElementContainer(element);
                }
                if (isOLElement(element)) {
                    return new OLElementContainer(element);
                }
                if (isInputElement(element)) {
                    return new InputElementContainer(element);
                }
                if (isSelectElement(element)) {
                    return new SelectElementContainer(element);
                }
                if (isTextareaElement(element)) {
                    return new TextareaElementContainer(element);
                }
                if (isIFrameElement(element)) {
                    return new IFrameElementContainer(element);
                }
                return new ElementContainer(element);
            };
            var parseTree = function(element) {
                var container = createContainer(element);
                container.flags |= 4;
                parseNodeTree(element, container, container);
                return container;
            };
            var createsRealStackingContext = function(node, container, root) {
                return container.styles.isPositionedWithZIndex() || container.styles.opacity < 1 || container.styles.isTransformed() || isBodyElement(node) && root.styles.isTransparent();
            };
            var createsStackingContext = function(styles) {
                return styles.isPositioned() || styles.isFloating();
            };
            var isTextNode = function(node) {
                return node.nodeType === Node.TEXT_NODE;
            };
            var isElementNode = function(node) {
                return node.nodeType === Node.ELEMENT_NODE;
            };
            var isHTMLElementNode = function(node) {
                return isElementNode(node) && typeof node.style !== "undefined" && !isSVGElementNode(node);
            };
            var isSVGElementNode = function(element) {
                return typeof element.className === "object";
            };
            var isLIElement = function(node) {
                return node.tagName === "LI";
            };
            var isOLElement = function(node) {
                return node.tagName === "OL";
            };
            var isInputElement = function(node) {
                return node.tagName === "INPUT";
            };
            var isHTMLElement = function(node) {
                return node.tagName === "HTML";
            };
            var isSVGElement = function(node) {
                return node.tagName === "svg";
            };
            var isBodyElement = function(node) {
                return node.tagName === "BODY";
            };
            var isCanvasElement = function(node) {
                return node.tagName === "CANVAS";
            };
            var isImageElement = function(node) {
                return node.tagName === "IMG";
            };
            var isIFrameElement = function(node) {
                return node.tagName === "IFRAME";
            };
            var isStyleElement = function(node) {
                return node.tagName === "STYLE";
            };
            var isScriptElement = function(node) {
                return node.tagName === "SCRIPT";
            };
            var isTextareaElement = function(node) {
                return node.tagName === "TEXTAREA";
            };
            var isSelectElement = function(node) {
                return node.tagName === "SELECT";
            };
            var CounterState = function() {
                function CounterState2() {
                    this.counters = {};
                }
                CounterState2.prototype.getCounterValue = function(name2) {
                    var counter = this.counters[name2];
                    if (counter && counter.length) {
                        return counter[counter.length - 1];
                    }
                    return 1;
                };
                CounterState2.prototype.getCounterValues = function(name2) {
                    var counter = this.counters[name2];
                    return counter ? counter : [];
                };
                CounterState2.prototype.pop = function(counters) {
                    var _this2 = this;
                    counters.forEach(function(counter) {
                        return _this2.counters[counter].pop();
                    });
                };
                CounterState2.prototype.parse = function(style) {
                    var _this2 = this;
                    var counterIncrement2 = style.counterIncrement;
                    var counterReset2 = style.counterReset;
                    var canReset = true;
                    if (counterIncrement2 !== null) {
                        counterIncrement2.forEach(function(entry) {
                            var counter = _this2.counters[entry.counter];
                            if (counter && entry.increment !== 0) {
                                canReset = false;
                                counter[Math.max(0, counter.length - 1)] += entry.increment;
                            }
                        });
                    }
                    var counterNames = [];
                    if (canReset) {
                        counterReset2.forEach(function(entry) {
                            var counter = _this2.counters[entry.counter];
                            counterNames.push(entry.counter);
                            if (!counter) {
                                counter = _this2.counters[entry.counter] = [];
                            }
                            counter.push(entry.reset);
                        });
                    }
                    return counterNames;
                };
                return CounterState2;
            }();
            var ROMAN_UPPER = {
                integers: [1e3, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1],
                values: ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"]
            };
            var ARMENIAN = {
                integers: [
                    9e3,
                    8e3,
                    7e3,
                    6e3,
                    5e3,
                    4e3,
                    3e3,
                    2e3,
                    1e3,
                    900,
                    800,
                    700,
                    600,
                    500,
                    400,
                    300,
                    200,
                    100,
                    90,
                    80,
                    70,
                    60,
                    50,
                    40,
                    30,
                    20,
                    10,
                    9,
                    8,
                    7,
                    6,
                    5,
                    4,
                    3,
                    2,
                    1
                ],
                values: [
                    "Ք",
                    "Փ",
                    "Ւ",
                    "Ց",
                    "Ր",
                    "Տ",
                    "Վ",
                    "Ս",
                    "Ռ",
                    "Ջ",
                    "Պ",
                    "Չ",
                    "Ո",
                    "Շ",
                    "Ն",
                    "Յ",
                    "Մ",
                    "Ճ",
                    "Ղ",
                    "Ձ",
                    "Հ",
                    "Կ",
                    "Ծ",
                    "Խ",
                    "Լ",
                    "Ի",
                    "Ժ",
                    "Թ",
                    "Ը",
                    "Է",
                    "Զ",
                    "Ե",
                    "Դ",
                    "Գ",
                    "Բ",
                    "Ա"
                ]
            };
            var HEBREW = {
                integers: [
                    1e4,
                    9e3,
                    8e3,
                    7e3,
                    6e3,
                    5e3,
                    4e3,
                    3e3,
                    2e3,
                    1e3,
                    400,
                    300,
                    200,
                    100,
                    90,
                    80,
                    70,
                    60,
                    50,
                    40,
                    30,
                    20,
                    19,
                    18,
                    17,
                    16,
                    15,
                    10,
                    9,
                    8,
                    7,
                    6,
                    5,
                    4,
                    3,
                    2,
                    1
                ],
                values: [
                    "י׳",
                    "ט׳",
                    "ח׳",
                    "ז׳",
                    "ו׳",
                    "ה׳",
                    "ד׳",
                    "ג׳",
                    "ב׳",
                    "א׳",
                    "ת",
                    "ש",
                    "ר",
                    "ק",
                    "צ",
                    "פ",
                    "ע",
                    "ס",
                    "נ",
                    "מ",
                    "ל",
                    "כ",
                    "יט",
                    "יח",
                    "יז",
                    "טז",
                    "טו",
                    "י",
                    "ט",
                    "ח",
                    "ז",
                    "ו",
                    "ה",
                    "ד",
                    "ג",
                    "ב",
                    "א"
                ]
            };
            var GEORGIAN = {
                integers: [
                    1e4,
                    9e3,
                    8e3,
                    7e3,
                    6e3,
                    5e3,
                    4e3,
                    3e3,
                    2e3,
                    1e3,
                    900,
                    800,
                    700,
                    600,
                    500,
                    400,
                    300,
                    200,
                    100,
                    90,
                    80,
                    70,
                    60,
                    50,
                    40,
                    30,
                    20,
                    10,
                    9,
                    8,
                    7,
                    6,
                    5,
                    4,
                    3,
                    2,
                    1
                ],
                values: [
                    "ჵ",
                    "ჰ",
                    "ჯ",
                    "ჴ",
                    "ხ",
                    "ჭ",
                    "წ",
                    "ძ",
                    "ც",
                    "ჩ",
                    "შ",
                    "ყ",
                    "ღ",
                    "ქ",
                    "ფ",
                    "ჳ",
                    "ტ",
                    "ს",
                    "რ",
                    "ჟ",
                    "პ",
                    "ო",
                    "ჲ",
                    "ნ",
                    "მ",
                    "ლ",
                    "კ",
                    "ი",
                    "თ",
                    "ჱ",
                    "ზ",
                    "ვ",
                    "ე",
                    "დ",
                    "გ",
                    "ბ",
                    "ა"
                ]
            };
            var createAdditiveCounter = function(value, min, max, symbols, fallback, suffix) {
                if (value < min || value > max) {
                    return createCounterText(value, fallback, suffix.length > 0);
                }
                return symbols.integers.reduce(function(string, integer, index) {
                    while (value >= integer) {
                        value -= integer;
                        string += symbols.values[index];
                    }
                    return string;
                }, "") + suffix;
            };
            var createCounterStyleWithSymbolResolver = function(value, codePointRangeLength, isNumeric, resolver) {
                var string = "";
                do {
                    if (!isNumeric) {
                        value--;
                    }
                    string = resolver(value) + string;
                    value /= codePointRangeLength;
                } while (value * codePointRangeLength >= codePointRangeLength);
                return string;
            };
            var createCounterStyleFromRange = function(value, codePointRangeStart, codePointRangeEnd, isNumeric, suffix) {
                var codePointRangeLength = codePointRangeEnd - codePointRangeStart + 1;
                return (value < 0 ? "-" : "") + (createCounterStyleWithSymbolResolver(Math.abs(value), codePointRangeLength, isNumeric, function(codePoint) {
                    return fromCodePoint(Math.floor(codePoint % codePointRangeLength) + codePointRangeStart);
                }) + suffix);
            };
            var createCounterStyleFromSymbols = function(value, symbols, suffix) {
                if (suffix === void 0) {
                    suffix = ". ";
                }
                var codePointRangeLength = symbols.length;
                return createCounterStyleWithSymbolResolver(Math.abs(value), codePointRangeLength, false, function(codePoint) {
                    return symbols[Math.floor(codePoint % codePointRangeLength)];
                }) + suffix;
            };
            var CJK_ZEROS = 1 << 0;
            var CJK_TEN_COEFFICIENTS = 1 << 1;
            var CJK_TEN_HIGH_COEFFICIENTS = 1 << 2;
            var CJK_HUNDRED_COEFFICIENTS = 1 << 3;
            var createCJKCounter = function(value, numbers, multipliers, negativeSign, suffix, flags) {
                if (value < -9999 || value > 9999) {
                    return createCounterText(value, LIST_STYLE_TYPE.CJK_DECIMAL, suffix.length > 0);
                }
                var tmp = Math.abs(value);
                var string = suffix;
                if (tmp === 0) {
                    return numbers[0] + string;
                }
                for (var digit = 0; tmp > 0 && digit <= 4; digit++) {
                    var coefficient = tmp % 10;
                    if (coefficient === 0 && contains(flags, CJK_ZEROS) && string !== "") {
                        string = numbers[coefficient] + string;
                    } else if (coefficient > 1 || coefficient === 1 && digit === 0 || coefficient === 1 && digit === 1 && contains(flags, CJK_TEN_COEFFICIENTS) || coefficient === 1 && digit === 1 && contains(flags, CJK_TEN_HIGH_COEFFICIENTS) && value > 100 || coefficient === 1 && digit > 1 && contains(flags, CJK_HUNDRED_COEFFICIENTS)) {
                        string = numbers[coefficient] + (digit > 0 ? multipliers[digit - 1] : "") + string;
                    } else if (coefficient === 1 && digit > 0) {
                        string = multipliers[digit - 1] + string;
                    }
                    tmp = Math.floor(tmp / 10);
                }
                return (value < 0 ? negativeSign : "") + string;
            };
            var CHINESE_INFORMAL_MULTIPLIERS = "十百千萬";
            var CHINESE_FORMAL_MULTIPLIERS = "拾佰仟萬";
            var JAPANESE_NEGATIVE = "マイナス";
            var KOREAN_NEGATIVE = "마이너스";
            var createCounterText = function(value, type, appendSuffix) {
                var defaultSuffix = appendSuffix ? ". " : "";
                var cjkSuffix = appendSuffix ? "、" : "";
                var koreanSuffix = appendSuffix ? ", " : "";
                var spaceSuffix = appendSuffix ? " " : "";
                switch (type) {
                    case LIST_STYLE_TYPE.DISC:
                        return "•" + spaceSuffix;
                    case LIST_STYLE_TYPE.CIRCLE:
                        return "◦" + spaceSuffix;
                    case LIST_STYLE_TYPE.SQUARE:
                        return "◾" + spaceSuffix;
                    case LIST_STYLE_TYPE.DECIMAL_LEADING_ZERO:
                        var string = createCounterStyleFromRange(value, 48, 57, true, defaultSuffix);
                        return string.length < 4 ? "0" + string : string;
                    case LIST_STYLE_TYPE.CJK_DECIMAL:
                        return createCounterStyleFromSymbols(value, "〇一二三四五六七八九", cjkSuffix);
                    case LIST_STYLE_TYPE.LOWER_ROMAN:
                        return createAdditiveCounter(value, 1, 3999, ROMAN_UPPER, LIST_STYLE_TYPE.DECIMAL, defaultSuffix).toLowerCase();
                    case LIST_STYLE_TYPE.UPPER_ROMAN:
                        return createAdditiveCounter(value, 1, 3999, ROMAN_UPPER, LIST_STYLE_TYPE.DECIMAL, defaultSuffix);
                    case LIST_STYLE_TYPE.LOWER_GREEK:
                        return createCounterStyleFromRange(value, 945, 969, false, defaultSuffix);
                    case LIST_STYLE_TYPE.LOWER_ALPHA:
                        return createCounterStyleFromRange(value, 97, 122, false, defaultSuffix);
                    case LIST_STYLE_TYPE.UPPER_ALPHA:
                        return createCounterStyleFromRange(value, 65, 90, false, defaultSuffix);
                    case LIST_STYLE_TYPE.ARABIC_INDIC:
                        return createCounterStyleFromRange(value, 1632, 1641, true, defaultSuffix);
                    case LIST_STYLE_TYPE.ARMENIAN:
                    case LIST_STYLE_TYPE.UPPER_ARMENIAN:
                        return createAdditiveCounter(value, 1, 9999, ARMENIAN, LIST_STYLE_TYPE.DECIMAL, defaultSuffix);
                    case LIST_STYLE_TYPE.LOWER_ARMENIAN:
                        return createAdditiveCounter(value, 1, 9999, ARMENIAN, LIST_STYLE_TYPE.DECIMAL, defaultSuffix).toLowerCase();
                    case LIST_STYLE_TYPE.BENGALI:
                        return createCounterStyleFromRange(value, 2534, 2543, true, defaultSuffix);
                    case LIST_STYLE_TYPE.CAMBODIAN:
                    case LIST_STYLE_TYPE.KHMER:
                        return createCounterStyleFromRange(value, 6112, 6121, true, defaultSuffix);
                    case LIST_STYLE_TYPE.CJK_EARTHLY_BRANCH:
                        return createCounterStyleFromSymbols(value, "子丑寅卯辰巳午未申酉戌亥", cjkSuffix);
                    case LIST_STYLE_TYPE.CJK_HEAVENLY_STEM:
                        return createCounterStyleFromSymbols(value, "甲乙丙丁戊己庚辛壬癸", cjkSuffix);
                    case LIST_STYLE_TYPE.CJK_IDEOGRAPHIC:
                    case LIST_STYLE_TYPE.TRAD_CHINESE_INFORMAL:
                        return createCJKCounter(value, "零一二三四五六七八九", CHINESE_INFORMAL_MULTIPLIERS, "負", cjkSuffix, CJK_TEN_COEFFICIENTS | CJK_TEN_HIGH_COEFFICIENTS | CJK_HUNDRED_COEFFICIENTS);
                    case LIST_STYLE_TYPE.TRAD_CHINESE_FORMAL:
                        return createCJKCounter(value, "零壹貳參肆伍陸柒捌玖", CHINESE_FORMAL_MULTIPLIERS, "負", cjkSuffix, CJK_ZEROS | CJK_TEN_COEFFICIENTS | CJK_TEN_HIGH_COEFFICIENTS | CJK_HUNDRED_COEFFICIENTS);
                    case LIST_STYLE_TYPE.SIMP_CHINESE_INFORMAL:
                        return createCJKCounter(value, "零一二三四五六七八九", CHINESE_INFORMAL_MULTIPLIERS, "负", cjkSuffix, CJK_TEN_COEFFICIENTS | CJK_TEN_HIGH_COEFFICIENTS | CJK_HUNDRED_COEFFICIENTS);
                    case LIST_STYLE_TYPE.SIMP_CHINESE_FORMAL:
                        return createCJKCounter(value, "零壹贰叁肆伍陆柒捌玖", CHINESE_FORMAL_MULTIPLIERS, "负", cjkSuffix, CJK_ZEROS | CJK_TEN_COEFFICIENTS | CJK_TEN_HIGH_COEFFICIENTS | CJK_HUNDRED_COEFFICIENTS);
                    case LIST_STYLE_TYPE.JAPANESE_INFORMAL:
                        return createCJKCounter(value, "〇一二三四五六七八九", "十百千万", JAPANESE_NEGATIVE, cjkSuffix, 0);
                    case LIST_STYLE_TYPE.JAPANESE_FORMAL:
                        return createCJKCounter(value, "零壱弐参四伍六七八九", "拾百千万", JAPANESE_NEGATIVE, cjkSuffix, CJK_ZEROS | CJK_TEN_COEFFICIENTS | CJK_TEN_HIGH_COEFFICIENTS);
                    case LIST_STYLE_TYPE.KOREAN_HANGUL_FORMAL:
                        return createCJKCounter(value, "영일이삼사오육칠팔구", "십백천만", KOREAN_NEGATIVE, koreanSuffix, CJK_ZEROS | CJK_TEN_COEFFICIENTS | CJK_TEN_HIGH_COEFFICIENTS);
                    case LIST_STYLE_TYPE.KOREAN_HANJA_INFORMAL:
                        return createCJKCounter(value, "零一二三四五六七八九", "十百千萬", KOREAN_NEGATIVE, koreanSuffix, 0);
                    case LIST_STYLE_TYPE.KOREAN_HANJA_FORMAL:
                        return createCJKCounter(value, "零壹貳參四五六七八九", "拾百千", KOREAN_NEGATIVE, koreanSuffix, CJK_ZEROS | CJK_TEN_COEFFICIENTS | CJK_TEN_HIGH_COEFFICIENTS);
                    case LIST_STYLE_TYPE.DEVANAGARI:
                        return createCounterStyleFromRange(value, 2406, 2415, true, defaultSuffix);
                    case LIST_STYLE_TYPE.GEORGIAN:
                        return createAdditiveCounter(value, 1, 19999, GEORGIAN, LIST_STYLE_TYPE.DECIMAL, defaultSuffix);
                    case LIST_STYLE_TYPE.GUJARATI:
                        return createCounterStyleFromRange(value, 2790, 2799, true, defaultSuffix);
                    case LIST_STYLE_TYPE.GURMUKHI:
                        return createCounterStyleFromRange(value, 2662, 2671, true, defaultSuffix);
                    case LIST_STYLE_TYPE.HEBREW:
                        return createAdditiveCounter(value, 1, 10999, HEBREW, LIST_STYLE_TYPE.DECIMAL, defaultSuffix);
                    case LIST_STYLE_TYPE.HIRAGANA:
                        return createCounterStyleFromSymbols(value, "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわゐゑをん");
                    case LIST_STYLE_TYPE.HIRAGANA_IROHA:
                        return createCounterStyleFromSymbols(value, "いろはにほへとちりぬるをわかよたれそつねならむうゐのおくやまけふこえてあさきゆめみしゑひもせす");
                    case LIST_STYLE_TYPE.KANNADA:
                        return createCounterStyleFromRange(value, 3302, 3311, true, defaultSuffix);
                    case LIST_STYLE_TYPE.KATAKANA:
                        return createCounterStyleFromSymbols(value, "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヰヱヲン", cjkSuffix);
                    case LIST_STYLE_TYPE.KATAKANA_IROHA:
                        return createCounterStyleFromSymbols(value, "イロハニホヘトチリヌルヲワカヨタレソツネナラムウヰノオクヤマケフコエテアサキユメミシヱヒモセス", cjkSuffix);
                    case LIST_STYLE_TYPE.LAO:
                        return createCounterStyleFromRange(value, 3792, 3801, true, defaultSuffix);
                    case LIST_STYLE_TYPE.MONGOLIAN:
                        return createCounterStyleFromRange(value, 6160, 6169, true, defaultSuffix);
                    case LIST_STYLE_TYPE.MYANMAR:
                        return createCounterStyleFromRange(value, 4160, 4169, true, defaultSuffix);
                    case LIST_STYLE_TYPE.ORIYA:
                        return createCounterStyleFromRange(value, 2918, 2927, true, defaultSuffix);
                    case LIST_STYLE_TYPE.PERSIAN:
                        return createCounterStyleFromRange(value, 1776, 1785, true, defaultSuffix);
                    case LIST_STYLE_TYPE.TAMIL:
                        return createCounterStyleFromRange(value, 3046, 3055, true, defaultSuffix);
                    case LIST_STYLE_TYPE.TELUGU:
                        return createCounterStyleFromRange(value, 3174, 3183, true, defaultSuffix);
                    case LIST_STYLE_TYPE.THAI:
                        return createCounterStyleFromRange(value, 3664, 3673, true, defaultSuffix);
                    case LIST_STYLE_TYPE.TIBETAN:
                        return createCounterStyleFromRange(value, 3872, 3881, true, defaultSuffix);
                    case LIST_STYLE_TYPE.DECIMAL:
                    default:
                        return createCounterStyleFromRange(value, 48, 57, true, defaultSuffix);
                }
            };
            var IGNORE_ATTRIBUTE = "data-html2canvas-ignore";
            var DocumentCloner = function() {
                function DocumentCloner2(element, options) {
                    this.options = options;
                    this.scrolledElements = [];
                    this.referenceElement = element;
                    this.counters = new CounterState();
                    this.quoteDepth = 0;
                    if (!element.ownerDocument) {
                        throw new Error("Cloned element does not have an owner document");
                    }
                    this.documentElement = this.cloneNode(element.ownerDocument.documentElement);
                }
                DocumentCloner2.prototype.toIFrame = function(ownerDocument, windowSize) {
                    var _this2 = this;
                    var iframe = createIFrameContainer(ownerDocument, windowSize);
                    if (!iframe.contentWindow) {
                        return Promise.reject("Unable to find iframe window");
                    }
                    var scrollX = ownerDocument.defaultView.pageXOffset;
                    var scrollY = ownerDocument.defaultView.pageYOffset;
                    var cloneWindow = iframe.contentWindow;
                    var documentClone = cloneWindow.document;
                    var iframeLoad = iframeLoader(iframe).then(function() {
                        return __awaiter(_this2, void 0, void 0, function() {
                            var onclone;
                            return __generator(this, function(_a) {
                                switch (_a.label) {
                                    case 0:
                                        this.scrolledElements.forEach(restoreNodeScroll);
                                        if (cloneWindow) {
                                            cloneWindow.scrollTo(windowSize.left, windowSize.top);
                                            if (/(iPad|iPhone|iPod)/g.test(navigator.userAgent) && (cloneWindow.scrollY !== windowSize.top || cloneWindow.scrollX !== windowSize.left)) {
                                                documentClone.documentElement.style.top = -windowSize.top + "px";
                                                documentClone.documentElement.style.left = -windowSize.left + "px";
                                                documentClone.documentElement.style.position = "absolute";
                                            }
                                        }
                                        onclone = this.options.onclone;
                                        if (typeof this.clonedReferenceElement === "undefined") {
                                            return [2, Promise.reject("Error finding the " + this.referenceElement.nodeName + " in the cloned document")];
                                        }
                                        if (!(documentClone.fonts && documentClone.fonts.ready))
                                            return [3, 2];
                                        return [4, documentClone.fonts.ready];
                                    case 1:
                                        _a.sent();
                                        _a.label = 2;
                                    case 2:
                                        if (typeof onclone === "function") {
                                            return [2, Promise.resolve().then(function() {
                                                return onclone(documentClone);
                                            }).then(function() {
                                                return iframe;
                                            })];
                                        }
                                        return [2, iframe];
                                }
                            });
                        });
                    });
                    documentClone.open();
                    documentClone.write(serializeDoctype(document.doctype) + "<html></html>");
                    restoreOwnerScroll(this.referenceElement.ownerDocument, scrollX, scrollY);
                    documentClone.replaceChild(documentClone.adoptNode(this.documentElement), documentClone.documentElement);
                    documentClone.close();
                    return iframeLoad;
                };
                DocumentCloner2.prototype.createElementClone = function(node) {
                    if (isCanvasElement(node)) {
                        return this.createCanvasClone(node);
                    }
                    if (isStyleElement(node)) {
                        return this.createStyleClone(node);
                    }
                    var clone = node.cloneNode(false);
                    if (isImageElement(clone) && clone.loading === "lazy") {
                        clone.loading = "eager";
                    }
                    return clone;
                };
                DocumentCloner2.prototype.createStyleClone = function(node) {
                    try {
                        var sheet = node.sheet;
                        if (sheet && sheet.cssRules) {
                            var css = [].slice.call(sheet.cssRules, 0).reduce(function(css2, rule) {
                                if (rule && typeof rule.cssText === "string") {
                                    return css2 + rule.cssText;
                                }
                                return css2;
                            }, "");
                            var style = node.cloneNode(false);
                            style.textContent = css;
                            return style;
                        }
                    } catch (e2) {
                        Logger.getInstance(this.options.id).error("Unable to access cssRules property", e2);
                        if (e2.name !== "SecurityError") {
                            throw e2;
                        }
                    }
                    return node.cloneNode(false);
                };
                DocumentCloner2.prototype.createCanvasClone = function(canvas) {
                    if (this.options.inlineImages && canvas.ownerDocument) {
                        var img = canvas.ownerDocument.createElement("img");
                        try {
                            img.src = canvas.toDataURL();
                            return img;
                        } catch (e2) {
                            Logger.getInstance(this.options.id).info("Unable to clone canvas contents, canvas is tainted");
                        }
                    }
                    var clonedCanvas = canvas.cloneNode(false);
                    try {
                        clonedCanvas.width = canvas.width;
                        clonedCanvas.height = canvas.height;
                        var ctx = canvas.getContext("2d");
                        var clonedCtx = clonedCanvas.getContext("2d");
                        if (clonedCtx) {
                            if (ctx) {
                                clonedCtx.putImageData(ctx.getImageData(0, 0, canvas.width, canvas.height), 0, 0);
                            } else {
                                clonedCtx.drawImage(canvas, 0, 0);
                            }
                        }
                        return clonedCanvas;
                    } catch (e2) {}
                    return clonedCanvas;
                };
                DocumentCloner2.prototype.cloneNode = function(node) {
                    if (isTextNode(node)) {
                        return document.createTextNode(node.data);
                    }
                    if (!node.ownerDocument) {
                        return node.cloneNode(false);
                    }
                    var window2 = node.ownerDocument.defaultView;
                    if (window2 && isElementNode(node) && (isHTMLElementNode(node) || isSVGElementNode(node))) {
                        var clone = this.createElementClone(node);
                        var style = window2.getComputedStyle(node);
                        var styleBefore = window2.getComputedStyle(node, ":before");
                        var styleAfter = window2.getComputedStyle(node, ":after");
                        if (this.referenceElement === node && isHTMLElementNode(clone)) {
                            this.clonedReferenceElement = clone;
                        }
                        if (isBodyElement(clone)) {
                            createPseudoHideStyles(clone);
                        }
                        var counters = this.counters.parse(new CSSParsedCounterDeclaration(style));
                        var before = this.resolvePseudoContent(node, clone, styleBefore, PseudoElementType.BEFORE);
                        for (var child = node.firstChild; child; child = child.nextSibling) {
                            if (!isElementNode(child) || !isScriptElement(child) && !child.hasAttribute(IGNORE_ATTRIBUTE) && (typeof this.options.ignoreElements !== "function" || !this.options.ignoreElements(child))) {
                                if (!this.options.copyStyles || !isElementNode(child) || !isStyleElement(child)) {
                                    clone.appendChild(this.cloneNode(child));
                                }
                            }
                        }
                        if (before) {
                            clone.insertBefore(before, clone.firstChild);
                        }
                        var after = this.resolvePseudoContent(node, clone, styleAfter, PseudoElementType.AFTER);
                        if (after) {
                            clone.appendChild(after);
                        }
                        this.counters.pop(counters);
                        if (style && (this.options.copyStyles || isSVGElementNode(node)) && !isIFrameElement(node)) {
                            copyCSSStyles(style, clone);
                        }
                        if (node.scrollTop !== 0 || node.scrollLeft !== 0) {
                            this.scrolledElements.push([clone, node.scrollLeft, node.scrollTop]);
                        }
                        if ((isTextareaElement(node) || isSelectElement(node)) && (isTextareaElement(clone) || isSelectElement(clone))) {
                            clone.value = node.value;
                        }
                        return clone;
                    }
                    return node.cloneNode(false);
                };
                DocumentCloner2.prototype.resolvePseudoContent = function(node, clone, style, pseudoElt) {
                    var _this2 = this;
                    if (!style) {
                        return;
                    }
                    var value = style.content;
                    var document2 = clone.ownerDocument;
                    if (!document2 || !value || value === "none" || value === "-moz-alt-content" || style.display === "none") {
                        return;
                    }
                    this.counters.parse(new CSSParsedCounterDeclaration(style));
                    var declaration = new CSSParsedPseudoDeclaration(style);
                    var anonymousReplacedElement = document2.createElement("html2canvaspseudoelement");
                    copyCSSStyles(style, anonymousReplacedElement);
                    declaration.content.forEach(function(token) {
                        if (token.type === TokenType.STRING_TOKEN) {
                            anonymousReplacedElement.appendChild(document2.createTextNode(token.value));
                        } else if (token.type === TokenType.URL_TOKEN) {
                            var img = document2.createElement("img");
                            img.src = token.value;
                            img.style.opacity = "1";
                            anonymousReplacedElement.appendChild(img);
                        } else if (token.type === TokenType.FUNCTION) {
                            if (token.name === "attr") {
                                var attr = token.values.filter(isIdentToken);
                                if (attr.length) {
                                    anonymousReplacedElement.appendChild(document2.createTextNode(node.getAttribute(attr[0].value) || ""));
                                }
                            } else if (token.name === "counter") {
                                var _a = token.values.filter(nonFunctionArgSeparator),
                                    counter = _a[0],
                                    counterStyle = _a[1];
                                if (counter && isIdentToken(counter)) {
                                    var counterState = _this2.counters.getCounterValue(counter.value);
                                    var counterType = counterStyle && isIdentToken(counterStyle) ? listStyleType.parse(counterStyle.value) : LIST_STYLE_TYPE.DECIMAL;
                                    anonymousReplacedElement.appendChild(document2.createTextNode(createCounterText(counterState, counterType, false)));
                                }
                            } else if (token.name === "counters") {
                                var _b = token.values.filter(nonFunctionArgSeparator),
                                    counter = _b[0],
                                    delim = _b[1],
                                    counterStyle = _b[2];
                                if (counter && isIdentToken(counter)) {
                                    var counterStates = _this2.counters.getCounterValues(counter.value);
                                    var counterType_1 = counterStyle && isIdentToken(counterStyle) ? listStyleType.parse(counterStyle.value) : LIST_STYLE_TYPE.DECIMAL;
                                    var separator = delim && delim.type === TokenType.STRING_TOKEN ? delim.value : "";
                                    var text = counterStates.map(function(value2) {
                                        return createCounterText(value2, counterType_1, false);
                                    }).join(separator);
                                    anonymousReplacedElement.appendChild(document2.createTextNode(text));
                                }
                            }
                        } else if (token.type === TokenType.IDENT_TOKEN) {
                            switch (token.value) {
                                case "open-quote":
                                    anonymousReplacedElement.appendChild(document2.createTextNode(getQuote(declaration.quotes, _this2.quoteDepth++, true)));
                                    break;
                                case "close-quote":
                                    anonymousReplacedElement.appendChild(document2.createTextNode(getQuote(declaration.quotes, --_this2.quoteDepth, false)));
                                    break;
                                default:
                                    anonymousReplacedElement.appendChild(document2.createTextNode(token.value));
                            }
                        }
                    });
                    anonymousReplacedElement.className = PSEUDO_HIDE_ELEMENT_CLASS_BEFORE + " " + PSEUDO_HIDE_ELEMENT_CLASS_AFTER;
                    var newClassName = pseudoElt === PseudoElementType.BEFORE ? " " + PSEUDO_HIDE_ELEMENT_CLASS_BEFORE : " " + PSEUDO_HIDE_ELEMENT_CLASS_AFTER;
                    if (isSVGElementNode(clone)) {
                        clone.className.baseValue += newClassName;
                    } else {
                        clone.className += newClassName;
                    }
                    return anonymousReplacedElement;
                };
                DocumentCloner2.destroy = function(container) {
                    if (container.parentNode) {
                        container.parentNode.removeChild(container);
                        return true;
                    }
                    return false;
                };
                return DocumentCloner2;
            }();
            var PseudoElementType;
            (function(PseudoElementType2) {
                PseudoElementType2[PseudoElementType2["BEFORE"] = 0] = "BEFORE";
                PseudoElementType2[PseudoElementType2["AFTER"] = 1] = "AFTER";
            })(PseudoElementType || (PseudoElementType = {}));
            var createIFrameContainer = function(ownerDocument, bounds) {
                var cloneIframeContainer = ownerDocument.createElement("iframe");
                cloneIframeContainer.className = "html2canvas-container";
                cloneIframeContainer.style.visibility = "hidden";
                cloneIframeContainer.style.position = "fixed";
                cloneIframeContainer.style.left = "-10000px";
                cloneIframeContainer.style.top = "0px";
                cloneIframeContainer.style.border = "0";
                cloneIframeContainer.width = bounds.width.toString();
                cloneIframeContainer.height = bounds.height.toString();
                cloneIframeContainer.scrolling = "no";
                cloneIframeContainer.setAttribute(IGNORE_ATTRIBUTE, "true");
                ownerDocument.body.appendChild(cloneIframeContainer);
                return cloneIframeContainer;
            };
            var iframeLoader = function(iframe) {
                return new Promise(function(resolve, reject) {
                    var cloneWindow = iframe.contentWindow;
                    if (!cloneWindow) {
                        return reject("No window assigned for iframe");
                    }
                    var documentClone = cloneWindow.document;
                    cloneWindow.onload = iframe.onload = documentClone.onreadystatechange = function() {
                        cloneWindow.onload = iframe.onload = documentClone.onreadystatechange = null;
                        var interval = setInterval(function() {
                            if (documentClone.body.childNodes.length > 0 && documentClone.readyState === "complete") {
                                clearInterval(interval);
                                resolve(iframe);
                            }
                        }, 50);
                    };
                });
            };
            var copyCSSStyles = function(style, target) {
                for (var i2 = style.length - 1; i2 >= 0; i2--) {
                    var property = style.item(i2);
                    if (property !== "content") {
                        target.style.setProperty(property, style.getPropertyValue(property));
                    }
                }
                return target;
            };
            var serializeDoctype = function(doctype) {
                var str = "";
                if (doctype) {
                    str += "<!DOCTYPE ";
                    if (doctype.name) {
                        str += doctype.name;
                    }
                    if (doctype.internalSubset) {
                        str += doctype.internalSubset;
                    }
                    if (doctype.publicId) {
                        str += '"' + doctype.publicId + '"';
                    }
                    if (doctype.systemId) {
                        str += '"' + doctype.systemId + '"';
                    }
                    str += ">";
                }
                return str;
            };
            var restoreOwnerScroll = function(ownerDocument, x, y) {
                if (ownerDocument && ownerDocument.defaultView && (x !== ownerDocument.defaultView.pageXOffset || y !== ownerDocument.defaultView.pageYOffset)) {
                    ownerDocument.defaultView.scrollTo(x, y);
                }
            };
            var restoreNodeScroll = function(_a) {
                var element = _a[0],
                    x = _a[1],
                    y = _a[2];
                element.scrollLeft = x;
                element.scrollTop = y;
            };
            var PSEUDO_BEFORE = ":before";
            var PSEUDO_AFTER = ":after";
            var PSEUDO_HIDE_ELEMENT_CLASS_BEFORE = "___html2canvas___pseudoelement_before";
            var PSEUDO_HIDE_ELEMENT_CLASS_AFTER = "___html2canvas___pseudoelement_after";
            var PSEUDO_HIDE_ELEMENT_STYLE = '{\n    content: "" !important;\n    display: none !important;\n}';
            var createPseudoHideStyles = function(body) {
                createStyles(body, "." + PSEUDO_HIDE_ELEMENT_CLASS_BEFORE + PSEUDO_BEFORE + PSEUDO_HIDE_ELEMENT_STYLE + "\n         ." + PSEUDO_HIDE_ELEMENT_CLASS_AFTER + PSEUDO_AFTER + PSEUDO_HIDE_ELEMENT_STYLE);
            };
            var createStyles = function(body, styles) {
                var document2 = body.ownerDocument;
                if (document2) {
                    var style = document2.createElement("style");
                    style.textContent = styles;
                    body.appendChild(style);
                }
            };
            var PathType;
            (function(PathType2) {
                PathType2[PathType2["VECTOR"] = 0] = "VECTOR";
                PathType2[PathType2["BEZIER_CURVE"] = 1] = "BEZIER_CURVE";
            })(PathType || (PathType = {}));
            var equalPath = function(a2, b) {
                if (a2.length === b.length) {
                    return a2.some(function(v, i2) {
                        return v === b[i2];
                    });
                }
                return false;
            };
            var transformPath = function(path, deltaX, deltaY, deltaW, deltaH) {
                return path.map(function(point, index) {
                    switch (index) {
                        case 0:
                            return point.add(deltaX, deltaY);
                        case 1:
                            return point.add(deltaX + deltaW, deltaY);
                        case 2:
                            return point.add(deltaX + deltaW, deltaY + deltaH);
                        case 3:
                            return point.add(deltaX, deltaY + deltaH);
                    }
                    return point;
                });
            };
            var Vector = function() {
                function Vector2(x, y) {
                    this.type = PathType.VECTOR;
                    this.x = x;
                    this.y = y;
                }
                Vector2.prototype.add = function(deltaX, deltaY) {
                    return new Vector2(this.x + deltaX, this.y + deltaY);
                };
                return Vector2;
            }();
            var lerp = function(a2, b, t) {
                return new Vector(a2.x + (b.x - a2.x) * t, a2.y + (b.y - a2.y) * t);
            };
            var BezierCurve = function() {
                function BezierCurve2(start, startControl, endControl, end) {
                    this.type = PathType.BEZIER_CURVE;
                    this.start = start;
                    this.startControl = startControl;
                    this.endControl = endControl;
                    this.end = end;
                }
                BezierCurve2.prototype.subdivide = function(t, firstHalf) {
                    var ab = lerp(this.start, this.startControl, t);
                    var bc = lerp(this.startControl, this.endControl, t);
                    var cd = lerp(this.endControl, this.end, t);
                    var abbc = lerp(ab, bc, t);
                    var bccd = lerp(bc, cd, t);
                    var dest = lerp(abbc, bccd, t);
                    return firstHalf ? new BezierCurve2(this.start, ab, abbc, dest) : new BezierCurve2(dest, bccd, cd, this.end);
                };
                BezierCurve2.prototype.add = function(deltaX, deltaY) {
                    return new BezierCurve2(this.start.add(deltaX, deltaY), this.startControl.add(deltaX, deltaY), this.endControl.add(deltaX, deltaY), this.end.add(deltaX, deltaY));
                };
                BezierCurve2.prototype.reverse = function() {
                    return new BezierCurve2(this.end, this.endControl, this.startControl, this.start);
                };
                return BezierCurve2;
            }();
            var isBezierCurve = function(path) {
                return path.type === PathType.BEZIER_CURVE;
            };
            var BoundCurves = function() {
                function BoundCurves2(element) {
                    var styles = element.styles;
                    var bounds = element.bounds;
                    var _a = getAbsoluteValueForTuple(styles.borderTopLeftRadius, bounds.width, bounds.height),
                        tlh = _a[0],
                        tlv = _a[1];
                    var _b = getAbsoluteValueForTuple(styles.borderTopRightRadius, bounds.width, bounds.height),
                        trh = _b[0],
                        trv = _b[1];
                    var _c = getAbsoluteValueForTuple(styles.borderBottomRightRadius, bounds.width, bounds.height),
                        brh = _c[0],
                        brv = _c[1];
                    var _d = getAbsoluteValueForTuple(styles.borderBottomLeftRadius, bounds.width, bounds.height),
                        blh = _d[0],
                        blv = _d[1];
                    var factors = [];
                    factors.push((tlh + trh) / bounds.width);
                    factors.push((blh + brh) / bounds.width);
                    factors.push((tlv + blv) / bounds.height);
                    factors.push((trv + brv) / bounds.height);
                    var maxFactor = Math.max.apply(Math, factors);
                    if (maxFactor > 1) {
                        tlh /= maxFactor;
                        tlv /= maxFactor;
                        trh /= maxFactor;
                        trv /= maxFactor;
                        brh /= maxFactor;
                        brv /= maxFactor;
                        blh /= maxFactor;
                        blv /= maxFactor;
                    }
                    var topWidth = bounds.width - trh;
                    var rightHeight = bounds.height - brv;
                    var bottomWidth = bounds.width - brh;
                    var leftHeight = bounds.height - blv;
                    var borderTopWidth2 = styles.borderTopWidth;
                    var borderRightWidth2 = styles.borderRightWidth;
                    var borderBottomWidth2 = styles.borderBottomWidth;
                    var borderLeftWidth2 = styles.borderLeftWidth;
                    var paddingTop2 = getAbsoluteValue(styles.paddingTop, element.bounds.width);
                    var paddingRight2 = getAbsoluteValue(styles.paddingRight, element.bounds.width);
                    var paddingBottom2 = getAbsoluteValue(styles.paddingBottom, element.bounds.width);
                    var paddingLeft2 = getAbsoluteValue(styles.paddingLeft, element.bounds.width);
                    this.topLeftBorderBox = tlh > 0 || tlv > 0 ? getCurvePoints(bounds.left, bounds.top, tlh, tlv, CORNER.TOP_LEFT) : new Vector(bounds.left, bounds.top);
                    this.topRightBorderBox = trh > 0 || trv > 0 ? getCurvePoints(bounds.left + topWidth, bounds.top, trh, trv, CORNER.TOP_RIGHT) : new Vector(bounds.left + bounds.width, bounds.top);
                    this.bottomRightBorderBox = brh > 0 || brv > 0 ? getCurvePoints(bounds.left + bottomWidth, bounds.top + rightHeight, brh, brv, CORNER.BOTTOM_RIGHT) : new Vector(bounds.left + bounds.width, bounds.top + bounds.height);
                    this.bottomLeftBorderBox = blh > 0 || blv > 0 ? getCurvePoints(bounds.left, bounds.top + leftHeight, blh, blv, CORNER.BOTTOM_LEFT) : new Vector(bounds.left, bounds.top + bounds.height);
                    this.topLeftPaddingBox = tlh > 0 || tlv > 0 ? getCurvePoints(bounds.left + borderLeftWidth2, bounds.top + borderTopWidth2, Math.max(0, tlh - borderLeftWidth2), Math.max(0, tlv - borderTopWidth2), CORNER.TOP_LEFT) : new Vector(bounds.left + borderLeftWidth2, bounds.top + borderTopWidth2);
                    this.topRightPaddingBox = trh > 0 || trv > 0 ? getCurvePoints(bounds.left + Math.min(topWidth, bounds.width + borderLeftWidth2), bounds.top + borderTopWidth2, topWidth > bounds.width + borderLeftWidth2 ? 0 : trh - borderLeftWidth2, trv - borderTopWidth2, CORNER.TOP_RIGHT) : new Vector(bounds.left + bounds.width - borderRightWidth2, bounds.top + borderTopWidth2);
                    this.bottomRightPaddingBox = brh > 0 || brv > 0 ? getCurvePoints(bounds.left + Math.min(bottomWidth, bounds.width - borderLeftWidth2), bounds.top + Math.min(rightHeight, bounds.height + borderTopWidth2), Math.max(0, brh - borderRightWidth2), brv - borderBottomWidth2, CORNER.BOTTOM_RIGHT) : new Vector(bounds.left + bounds.width - borderRightWidth2, bounds.top + bounds.height - borderBottomWidth2);
                    this.bottomLeftPaddingBox = blh > 0 || blv > 0 ? getCurvePoints(bounds.left + borderLeftWidth2, bounds.top + leftHeight, Math.max(0, blh - borderLeftWidth2), blv - borderBottomWidth2, CORNER.BOTTOM_LEFT) : new Vector(bounds.left + borderLeftWidth2, bounds.top + bounds.height - borderBottomWidth2);
                    this.topLeftContentBox = tlh > 0 || tlv > 0 ? getCurvePoints(bounds.left + borderLeftWidth2 + paddingLeft2, bounds.top + borderTopWidth2 + paddingTop2, Math.max(0, tlh - (borderLeftWidth2 + paddingLeft2)), Math.max(0, tlv - (borderTopWidth2 + paddingTop2)), CORNER.TOP_LEFT) : new Vector(bounds.left + borderLeftWidth2 + paddingLeft2, bounds.top + borderTopWidth2 + paddingTop2);
                    this.topRightContentBox = trh > 0 || trv > 0 ? getCurvePoints(bounds.left + Math.min(topWidth, bounds.width + borderLeftWidth2 + paddingLeft2), bounds.top + borderTopWidth2 + paddingTop2, topWidth > bounds.width + borderLeftWidth2 + paddingLeft2 ? 0 : trh - borderLeftWidth2 + paddingLeft2, trv - (borderTopWidth2 + paddingTop2), CORNER.TOP_RIGHT) : new Vector(bounds.left + bounds.width - (borderRightWidth2 + paddingRight2), bounds.top + borderTopWidth2 + paddingTop2);
                    this.bottomRightContentBox = brh > 0 || brv > 0 ? getCurvePoints(bounds.left + Math.min(bottomWidth, bounds.width - (borderLeftWidth2 + paddingLeft2)), bounds.top + Math.min(rightHeight, bounds.height + borderTopWidth2 + paddingTop2), Math.max(0, brh - (borderRightWidth2 + paddingRight2)), brv - (borderBottomWidth2 + paddingBottom2), CORNER.BOTTOM_RIGHT) : new Vector(bounds.left + bounds.width - (borderRightWidth2 + paddingRight2), bounds.top + bounds.height - (borderBottomWidth2 + paddingBottom2));
                    this.bottomLeftContentBox = blh > 0 || blv > 0 ? getCurvePoints(bounds.left + borderLeftWidth2 + paddingLeft2, bounds.top + leftHeight, Math.max(0, blh - (borderLeftWidth2 + paddingLeft2)), blv - (borderBottomWidth2 + paddingBottom2), CORNER.BOTTOM_LEFT) : new Vector(bounds.left + borderLeftWidth2 + paddingLeft2, bounds.top + bounds.height - (borderBottomWidth2 + paddingBottom2));
                }
                return BoundCurves2;
            }();
            var CORNER;
            (function(CORNER2) {
                CORNER2[CORNER2["TOP_LEFT"] = 0] = "TOP_LEFT";
                CORNER2[CORNER2["TOP_RIGHT"] = 1] = "TOP_RIGHT";
                CORNER2[CORNER2["BOTTOM_RIGHT"] = 2] = "BOTTOM_RIGHT";
                CORNER2[CORNER2["BOTTOM_LEFT"] = 3] = "BOTTOM_LEFT";
            })(CORNER || (CORNER = {}));
            var getCurvePoints = function(x, y, r1, r2, position2) {
                var kappa = 4 * ((Math.sqrt(2) - 1) / 3);
                var ox = r1 * kappa;
                var oy = r2 * kappa;
                var xm = x + r1;
                var ym = y + r2;
                switch (position2) {
                    case CORNER.TOP_LEFT:
                        return new BezierCurve(new Vector(x, ym), new Vector(x, ym - oy), new Vector(xm - ox, y), new Vector(xm, y));
                    case CORNER.TOP_RIGHT:
                        return new BezierCurve(new Vector(x, y), new Vector(x + ox, y), new Vector(xm, ym - oy), new Vector(xm, ym));
                    case CORNER.BOTTOM_RIGHT:
                        return new BezierCurve(new Vector(xm, y), new Vector(xm, y + oy), new Vector(x + ox, ym), new Vector(x, ym));
                    case CORNER.BOTTOM_LEFT:
                    default:
                        return new BezierCurve(new Vector(xm, ym), new Vector(xm - ox, ym), new Vector(x, y + oy), new Vector(x, y));
                }
            };
            var calculateBorderBoxPath = function(curves) {
                return [curves.topLeftBorderBox, curves.topRightBorderBox, curves.bottomRightBorderBox, curves.bottomLeftBorderBox];
            };
            var calculateContentBoxPath = function(curves) {
                return [
                    curves.topLeftContentBox,
                    curves.topRightContentBox,
                    curves.bottomRightContentBox,
                    curves.bottomLeftContentBox
                ];
            };
            var calculatePaddingBoxPath = function(curves) {
                return [
                    curves.topLeftPaddingBox,
                    curves.topRightPaddingBox,
                    curves.bottomRightPaddingBox,
                    curves.bottomLeftPaddingBox
                ];
            };
            var TransformEffect = function() {
                function TransformEffect2(offsetX, offsetY, matrix2) {
                    this.type = 0;
                    this.offsetX = offsetX;
                    this.offsetY = offsetY;
                    this.matrix = matrix2;
                    this.target = 2 | 4;
                }
                return TransformEffect2;
            }();
            var ClipEffect = function() {
                function ClipEffect2(path, target) {
                    this.type = 1;
                    this.target = target;
                    this.path = path;
                }
                return ClipEffect2;
            }();
            var isTransformEffect = function(effect) {
                return effect.type === 0;
            };
            var isClipEffect = function(effect) {
                return effect.type === 1;
            };
            var StackingContext = function() {
                function StackingContext2(container) {
                    this.element = container;
                    this.inlineLevel = [];
                    this.nonInlineLevel = [];
                    this.negativeZIndex = [];
                    this.zeroOrAutoZIndexOrTransformedOrOpacity = [];
                    this.positiveZIndex = [];
                    this.nonPositionedFloats = [];
                    this.nonPositionedInlineLevel = [];
                }
                return StackingContext2;
            }();
            var ElementPaint = function() {
                function ElementPaint2(element, parentStack) {
                    this.container = element;
                    this.effects = parentStack.slice(0);
                    this.curves = new BoundCurves(element);
                    if (element.styles.transform !== null) {
                        var offsetX = element.bounds.left + element.styles.transformOrigin[0].number;
                        var offsetY = element.bounds.top + element.styles.transformOrigin[1].number;
                        var matrix2 = element.styles.transform;
                        this.effects.push(new TransformEffect(offsetX, offsetY, matrix2));
                    }
                    if (element.styles.overflowX !== OVERFLOW.VISIBLE) {
                        var borderBox = calculateBorderBoxPath(this.curves);
                        var paddingBox2 = calculatePaddingBoxPath(this.curves);
                        if (equalPath(borderBox, paddingBox2)) {
                            this.effects.push(new ClipEffect(borderBox, 2 | 4));
                        } else {
                            this.effects.push(new ClipEffect(borderBox, 2));
                            this.effects.push(new ClipEffect(paddingBox2, 4));
                        }
                    }
                }
                ElementPaint2.prototype.getParentEffects = function() {
                    var effects = this.effects.slice(0);
                    if (this.container.styles.overflowX !== OVERFLOW.VISIBLE) {
                        var borderBox = calculateBorderBoxPath(this.curves);
                        var paddingBox2 = calculatePaddingBoxPath(this.curves);
                        if (!equalPath(borderBox, paddingBox2)) {
                            effects.push(new ClipEffect(paddingBox2, 2 | 4));
                        }
                    }
                    return effects;
                };
                return ElementPaint2;
            }();
            var parseStackTree = function(parent, stackingContext, realStackingContext, listItems) {
                parent.container.elements.forEach(function(child) {
                    var treatAsRealStackingContext = contains(child.flags, 4);
                    var createsStackingContext2 = contains(child.flags, 2);
                    var paintContainer = new ElementPaint(child, parent.getParentEffects());
                    if (contains(child.styles.display, 2048)) {
                        listItems.push(paintContainer);
                    }
                    var listOwnerItems = contains(child.flags, 8) ? [] : listItems;
                    if (treatAsRealStackingContext || createsStackingContext2) {
                        var parentStack = treatAsRealStackingContext || child.styles.isPositioned() ? realStackingContext : stackingContext;
                        var stack = new StackingContext(paintContainer);
                        if (child.styles.isPositioned() || child.styles.opacity < 1 || child.styles.isTransformed()) {
                            var order_1 = child.styles.zIndex.order;
                            if (order_1 < 0) {
                                var index_1 = 0;
                                parentStack.negativeZIndex.some(function(current, i2) {
                                    if (order_1 > current.element.container.styles.zIndex.order) {
                                        index_1 = i2;
                                        return false;
                                    } else if (index_1 > 0) {
                                        return true;
                                    }
                                    return false;
                                });
                                parentStack.negativeZIndex.splice(index_1, 0, stack);
                            } else if (order_1 > 0) {
                                var index_2 = 0;
                                parentStack.positiveZIndex.some(function(current, i2) {
                                    if (order_1 >= current.element.container.styles.zIndex.order) {
                                        index_2 = i2 + 1;
                                        return false;
                                    } else if (index_2 > 0) {
                                        return true;
                                    }
                                    return false;
                                });
                                parentStack.positiveZIndex.splice(index_2, 0, stack);
                            } else {
                                parentStack.zeroOrAutoZIndexOrTransformedOrOpacity.push(stack);
                            }
                        } else {
                            if (child.styles.isFloating()) {
                                parentStack.nonPositionedFloats.push(stack);
                            } else {
                                parentStack.nonPositionedInlineLevel.push(stack);
                            }
                        }
                        parseStackTree(paintContainer, stack, treatAsRealStackingContext ? stack : realStackingContext, listOwnerItems);
                    } else {
                        if (child.styles.isInlineLevel()) {
                            stackingContext.inlineLevel.push(paintContainer);
                        } else {
                            stackingContext.nonInlineLevel.push(paintContainer);
                        }
                        parseStackTree(paintContainer, stackingContext, realStackingContext, listOwnerItems);
                    }
                    if (contains(child.flags, 8)) {
                        processListItems(child, listOwnerItems);
                    }
                });
            };
            var processListItems = function(owner, elements) {
                var numbering = owner instanceof OLElementContainer ? owner.start : 1;
                var reversed = owner instanceof OLElementContainer ? owner.reversed : false;
                for (var i2 = 0; i2 < elements.length; i2++) {
                    var item = elements[i2];
                    if (item.container instanceof LIElementContainer && typeof item.container.value === "number" && item.container.value !== 0) {
                        numbering = item.container.value;
                    }
                    item.listValue = createCounterText(numbering, item.container.styles.listStyleType, true);
                    numbering += reversed ? -1 : 1;
                }
            };
            var parseStackingContexts = function(container) {
                var paintContainer = new ElementPaint(container, []);
                var root = new StackingContext(paintContainer);
                var listItems = [];
                parseStackTree(paintContainer, root, root, listItems);
                processListItems(paintContainer.container, listItems);
                return root;
            };
            var parsePathForBorder = function(curves, borderSide) {
                switch (borderSide) {
                    case 0:
                        return createPathFromCurves(curves.topLeftBorderBox, curves.topLeftPaddingBox, curves.topRightBorderBox, curves.topRightPaddingBox);
                    case 1:
                        return createPathFromCurves(curves.topRightBorderBox, curves.topRightPaddingBox, curves.bottomRightBorderBox, curves.bottomRightPaddingBox);
                    case 2:
                        return createPathFromCurves(curves.bottomRightBorderBox, curves.bottomRightPaddingBox, curves.bottomLeftBorderBox, curves.bottomLeftPaddingBox);
                    case 3:
                    default:
                        return createPathFromCurves(curves.bottomLeftBorderBox, curves.bottomLeftPaddingBox, curves.topLeftBorderBox, curves.topLeftPaddingBox);
                }
            };
            var createPathFromCurves = function(outer1, inner1, outer2, inner2) {
                var path = [];
                if (isBezierCurve(outer1)) {
                    path.push(outer1.subdivide(0.5, false));
                } else {
                    path.push(outer1);
                }
                if (isBezierCurve(outer2)) {
                    path.push(outer2.subdivide(0.5, true));
                } else {
                    path.push(outer2);
                }
                if (isBezierCurve(inner2)) {
                    path.push(inner2.subdivide(0.5, true).reverse());
                } else {
                    path.push(inner2);
                }
                if (isBezierCurve(inner1)) {
                    path.push(inner1.subdivide(0.5, false).reverse());
                } else {
                    path.push(inner1);
                }
                return path;
            };
            var paddingBox = function(element) {
                var bounds = element.bounds;
                var styles = element.styles;
                return bounds.add(styles.borderLeftWidth, styles.borderTopWidth, -(styles.borderRightWidth + styles.borderLeftWidth), -(styles.borderTopWidth + styles.borderBottomWidth));
            };
            var contentBox = function(element) {
                var styles = element.styles;
                var bounds = element.bounds;
                var paddingLeft2 = getAbsoluteValue(styles.paddingLeft, bounds.width);
                var paddingRight2 = getAbsoluteValue(styles.paddingRight, bounds.width);
                var paddingTop2 = getAbsoluteValue(styles.paddingTop, bounds.width);
                var paddingBottom2 = getAbsoluteValue(styles.paddingBottom, bounds.width);
                return bounds.add(paddingLeft2 + styles.borderLeftWidth, paddingTop2 + styles.borderTopWidth, -(styles.borderRightWidth + styles.borderLeftWidth + paddingLeft2 + paddingRight2), -(styles.borderTopWidth + styles.borderBottomWidth + paddingTop2 + paddingBottom2));
            };
            var calculateBackgroundPositioningArea = function(backgroundOrigin2, element) {
                if (backgroundOrigin2 === 0) {
                    return element.bounds;
                }
                if (backgroundOrigin2 === 2) {
                    return contentBox(element);
                }
                return paddingBox(element);
            };
            var calculateBackgroundPaintingArea = function(backgroundClip2, element) {
                if (backgroundClip2 === BACKGROUND_CLIP.BORDER_BOX) {
                    return element.bounds;
                }
                if (backgroundClip2 === BACKGROUND_CLIP.CONTENT_BOX) {
                    return contentBox(element);
                }
                return paddingBox(element);
            };
            var calculateBackgroundRendering = function(container, index, intrinsicSize) {
                var backgroundPositioningArea = calculateBackgroundPositioningArea(getBackgroundValueForIndex(container.styles.backgroundOrigin, index), container);
                var backgroundPaintingArea = calculateBackgroundPaintingArea(getBackgroundValueForIndex(container.styles.backgroundClip, index), container);
                var backgroundImageSize = calculateBackgroundSize(getBackgroundValueForIndex(container.styles.backgroundSize, index), intrinsicSize, backgroundPositioningArea);
                var sizeWidth = backgroundImageSize[0],
                    sizeHeight = backgroundImageSize[1];
                var position2 = getAbsoluteValueForTuple(getBackgroundValueForIndex(container.styles.backgroundPosition, index), backgroundPositioningArea.width - sizeWidth, backgroundPositioningArea.height - sizeHeight);
                var path = calculateBackgroundRepeatPath(getBackgroundValueForIndex(container.styles.backgroundRepeat, index), position2, backgroundImageSize, backgroundPositioningArea, backgroundPaintingArea);
                var offsetX = Math.round(backgroundPositioningArea.left + position2[0]);
                var offsetY = Math.round(backgroundPositioningArea.top + position2[1]);
                return [path, offsetX, offsetY, sizeWidth, sizeHeight];
            };
            var isAuto = function(token) {
                return isIdentToken(token) && token.value === BACKGROUND_SIZE.AUTO;
            };
            var hasIntrinsicValue = function(value) {
                return typeof value === "number";
            };
            var calculateBackgroundSize = function(size, _a, bounds) {
                var intrinsicWidth = _a[0],
                    intrinsicHeight = _a[1],
                    intrinsicProportion = _a[2];
                var first = size[0],
                    second = size[1];
                if (isLengthPercentage(first) && second && isLengthPercentage(second)) {
                    return [getAbsoluteValue(first, bounds.width), getAbsoluteValue(second, bounds.height)];
                }
                var hasIntrinsicProportion = hasIntrinsicValue(intrinsicProportion);
                if (isIdentToken(first) && (first.value === BACKGROUND_SIZE.CONTAIN || first.value === BACKGROUND_SIZE.COVER)) {
                    if (hasIntrinsicValue(intrinsicProportion)) {
                        var targetRatio = bounds.width / bounds.height;
                        return targetRatio < intrinsicProportion !== (first.value === BACKGROUND_SIZE.COVER) ? [bounds.width, bounds.width / intrinsicProportion] : [bounds.height * intrinsicProportion, bounds.height];
                    }
                    return [bounds.width, bounds.height];
                }
                var hasIntrinsicWidth = hasIntrinsicValue(intrinsicWidth);
                var hasIntrinsicHeight = hasIntrinsicValue(intrinsicHeight);
                var hasIntrinsicDimensions = hasIntrinsicWidth || hasIntrinsicHeight;
                if (isAuto(first) && (!second || isAuto(second))) {
                    if (hasIntrinsicWidth && hasIntrinsicHeight) {
                        return [intrinsicWidth, intrinsicHeight];
                    }
                    if (!hasIntrinsicProportion && !hasIntrinsicDimensions) {
                        return [bounds.width, bounds.height];
                    }
                    if (hasIntrinsicDimensions && hasIntrinsicProportion) {
                        var width_1 = hasIntrinsicWidth ? intrinsicWidth : intrinsicHeight * intrinsicProportion;
                        var height_1 = hasIntrinsicHeight ? intrinsicHeight : intrinsicWidth / intrinsicProportion;
                        return [width_1, height_1];
                    }
                    var width_2 = hasIntrinsicWidth ? intrinsicWidth : bounds.width;
                    var height_2 = hasIntrinsicHeight ? intrinsicHeight : bounds.height;
                    return [width_2, height_2];
                }
                if (hasIntrinsicProportion) {
                    var width_3 = 0;
                    var height_3 = 0;
                    if (isLengthPercentage(first)) {
                        width_3 = getAbsoluteValue(first, bounds.width);
                    } else if (isLengthPercentage(second)) {
                        height_3 = getAbsoluteValue(second, bounds.height);
                    }
                    if (isAuto(first)) {
                        width_3 = height_3 * intrinsicProportion;
                    } else if (!second || isAuto(second)) {
                        height_3 = width_3 / intrinsicProportion;
                    }
                    return [width_3, height_3];
                }
                var width = null;
                var height = null;
                if (isLengthPercentage(first)) {
                    width = getAbsoluteValue(first, bounds.width);
                } else if (second && isLengthPercentage(second)) {
                    height = getAbsoluteValue(second, bounds.height);
                }
                if (width !== null && (!second || isAuto(second))) {
                    height = hasIntrinsicWidth && hasIntrinsicHeight ? width / intrinsicWidth * intrinsicHeight : bounds.height;
                }
                if (height !== null && isAuto(first)) {
                    width = hasIntrinsicWidth && hasIntrinsicHeight ? height / intrinsicHeight * intrinsicWidth : bounds.width;
                }
                if (width !== null && height !== null) {
                    return [width, height];
                }
                throw new Error("Unable to calculate background-size for element");
            };
            var getBackgroundValueForIndex = function(values, index) {
                var value = values[index];
                if (typeof value === "undefined") {
                    return values[0];
                }
                return value;
            };
            var calculateBackgroundRepeatPath = function(repeat, _a, _b, backgroundPositioningArea, backgroundPaintingArea) {
                var x = _a[0],
                    y = _a[1];
                var width = _b[0],
                    height = _b[1];
                switch (repeat) {
                    case BACKGROUND_REPEAT.REPEAT_X:
                        return [
                            new Vector(Math.round(backgroundPositioningArea.left), Math.round(backgroundPositioningArea.top + y)),
                            new Vector(Math.round(backgroundPositioningArea.left + backgroundPositioningArea.width), Math.round(backgroundPositioningArea.top + y)),
                            new Vector(Math.round(backgroundPositioningArea.left + backgroundPositioningArea.width), Math.round(height + backgroundPositioningArea.top + y)),
                            new Vector(Math.round(backgroundPositioningArea.left), Math.round(height + backgroundPositioningArea.top + y))
                        ];
                    case BACKGROUND_REPEAT.REPEAT_Y:
                        return [
                            new Vector(Math.round(backgroundPositioningArea.left + x), Math.round(backgroundPositioningArea.top)),
                            new Vector(Math.round(backgroundPositioningArea.left + x + width), Math.round(backgroundPositioningArea.top)),
                            new Vector(Math.round(backgroundPositioningArea.left + x + width), Math.round(backgroundPositioningArea.height + backgroundPositioningArea.top)),
                            new Vector(Math.round(backgroundPositioningArea.left + x), Math.round(backgroundPositioningArea.height + backgroundPositioningArea.top))
                        ];
                    case BACKGROUND_REPEAT.NO_REPEAT:
                        return [
                            new Vector(Math.round(backgroundPositioningArea.left + x), Math.round(backgroundPositioningArea.top + y)),
                            new Vector(Math.round(backgroundPositioningArea.left + x + width), Math.round(backgroundPositioningArea.top + y)),
                            new Vector(Math.round(backgroundPositioningArea.left + x + width), Math.round(backgroundPositioningArea.top + y + height)),
                            new Vector(Math.round(backgroundPositioningArea.left + x), Math.round(backgroundPositioningArea.top + y + height))
                        ];
                    default:
                        return [
                            new Vector(Math.round(backgroundPaintingArea.left), Math.round(backgroundPaintingArea.top)),
                            new Vector(Math.round(backgroundPaintingArea.left + backgroundPaintingArea.width), Math.round(backgroundPaintingArea.top)),
                            new Vector(Math.round(backgroundPaintingArea.left + backgroundPaintingArea.width), Math.round(backgroundPaintingArea.height + backgroundPaintingArea.top)),
                            new Vector(Math.round(backgroundPaintingArea.left), Math.round(backgroundPaintingArea.height + backgroundPaintingArea.top))
                        ];
                }
            };
            var SMALL_IMAGE = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
            var SAMPLE_TEXT = "Hidden Text";
            var FontMetrics = function() {
                function FontMetrics2(document2) {
                    this._data = {};
                    this._document = document2;
                }
                FontMetrics2.prototype.parseMetrics = function(fontFamily2, fontSize2) {
                    var container = this._document.createElement("div");
                    var img = this._document.createElement("img");
                    var span = this._document.createElement("span");
                    var body = this._document.body;
                    container.style.visibility = "hidden";
                    container.style.fontFamily = fontFamily2;
                    container.style.fontSize = fontSize2;
                    container.style.margin = "0";
                    container.style.padding = "0";
                    body.appendChild(container);
                    img.src = SMALL_IMAGE;
                    img.width = 1;
                    img.height = 1;
                    img.style.margin = "0";
                    img.style.padding = "0";
                    img.style.verticalAlign = "baseline";
                    span.style.fontFamily = fontFamily2;
                    span.style.fontSize = fontSize2;
                    span.style.margin = "0";
                    span.style.padding = "0";
                    span.appendChild(this._document.createTextNode(SAMPLE_TEXT));
                    container.appendChild(span);
                    container.appendChild(img);
                    var baseline = img.offsetTop - span.offsetTop + 2;
                    container.removeChild(span);
                    container.appendChild(this._document.createTextNode(SAMPLE_TEXT));
                    container.style.lineHeight = "normal";
                    img.style.verticalAlign = "super";
                    var middle = img.offsetTop - container.offsetTop + 2;
                    body.removeChild(container);
                    return {
                        baseline,
                        middle
                    };
                };
                FontMetrics2.prototype.getMetrics = function(fontFamily2, fontSize2) {
                    var key = fontFamily2 + " " + fontSize2;
                    if (typeof this._data[key] === "undefined") {
                        this._data[key] = this.parseMetrics(fontFamily2, fontSize2);
                    }
                    return this._data[key];
                };
                return FontMetrics2;
            }();
            var MASK_OFFSET = 1e4;
            var CanvasRenderer = function() {
                function CanvasRenderer2(options) {
                    this._activeEffects = [];
                    this.canvas = options.canvas ? options.canvas : document.createElement("canvas");
                    this.ctx = this.canvas.getContext("2d");
                    this.options = options;
                    if (!options.canvas) {
                        this.canvas.width = Math.floor(options.width * options.scale);
                        this.canvas.height = Math.floor(options.height * options.scale);
                        this.canvas.style.width = options.width + "px";
                        this.canvas.style.height = options.height + "px";
                    }
                    this.fontMetrics = new FontMetrics(document);
                    this.ctx.scale(this.options.scale, this.options.scale);
                    this.ctx.translate(-options.x + options.scrollX, -options.y + options.scrollY);
                    this.ctx.textBaseline = "bottom";
                    this._activeEffects = [];
                    Logger.getInstance(options.id).debug("Canvas renderer initialized (" + options.width + "x" + options.height + " at " + options.x + "," + options.y + ") with scale " + options.scale);
                }
                CanvasRenderer2.prototype.applyEffects = function(effects, target) {
                    var _this2 = this;
                    while (this._activeEffects.length) {
                        this.popEffect();
                    }
                    effects.filter(function(effect) {
                        return contains(effect.target, target);
                    }).forEach(function(effect) {
                        return _this2.applyEffect(effect);
                    });
                };
                CanvasRenderer2.prototype.applyEffect = function(effect) {
                    this.ctx.save();
                    if (isTransformEffect(effect)) {
                        this.ctx.translate(effect.offsetX, effect.offsetY);
                        this.ctx.transform(effect.matrix[0], effect.matrix[1], effect.matrix[2], effect.matrix[3], effect.matrix[4], effect.matrix[5]);
                        this.ctx.translate(-effect.offsetX, -effect.offsetY);
                    }
                    if (isClipEffect(effect)) {
                        this.path(effect.path);
                        this.ctx.clip();
                    }
                    this._activeEffects.push(effect);
                };
                CanvasRenderer2.prototype.popEffect = function() {
                    this._activeEffects.pop();
                    this.ctx.restore();
                };
                CanvasRenderer2.prototype.renderStack = function(stack) {
                    return __awaiter(this, void 0, void 0, function() {
                        var styles;
                        return __generator(this, function(_a) {
                            switch (_a.label) {
                                case 0:
                                    styles = stack.element.container.styles;
                                    if (!styles.isVisible())
                                        return [3, 2];
                                    this.ctx.globalAlpha = styles.opacity;
                                    return [4, this.renderStackContent(stack)];
                                case 1:
                                    _a.sent();
                                    _a.label = 2;
                                case 2:
                                    return [2];
                            }
                        });
                    });
                };
                CanvasRenderer2.prototype.renderNode = function(paint) {
                    return __awaiter(this, void 0, void 0, function() {
                        return __generator(this, function(_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!paint.container.styles.isVisible())
                                        return [3, 3];
                                    return [4, this.renderNodeBackgroundAndBorders(paint)];
                                case 1:
                                    _a.sent();
                                    return [4, this.renderNodeContent(paint)];
                                case 2:
                                    _a.sent();
                                    _a.label = 3;
                                case 3:
                                    return [2];
                            }
                        });
                    });
                };
                CanvasRenderer2.prototype.renderTextWithLetterSpacing = function(text, letterSpacing2) {
                    var _this2 = this;
                    if (letterSpacing2 === 0) {
                        this.ctx.fillText(text.text, text.bounds.left, text.bounds.top + text.bounds.height);
                    } else {
                        var letters = toCodePoints(text.text).map(function(i2) {
                            return fromCodePoint(i2);
                        });
                        letters.reduce(function(left, letter) {
                            _this2.ctx.fillText(letter, left, text.bounds.top + text.bounds.height);
                            return left + _this2.ctx.measureText(letter).width;
                        }, text.bounds.left);
                    }
                };
                CanvasRenderer2.prototype.createFontStyle = function(styles) {
                    var fontVariant2 = styles.fontVariant.filter(function(variant) {
                        return variant === "normal" || variant === "small-caps";
                    }).join("");
                    var fontFamily2 = styles.fontFamily.join(", ");
                    var fontSize2 = isDimensionToken(styles.fontSize) ? "" + styles.fontSize.number + styles.fontSize.unit : styles.fontSize.number + "px";
                    return [
                        [styles.fontStyle, fontVariant2, styles.fontWeight, fontSize2, fontFamily2].join(" "),
                        fontFamily2,
                        fontSize2
                    ];
                };
                CanvasRenderer2.prototype.renderTextNode = function(text, styles) {
                    return __awaiter(this, void 0, void 0, function() {
                        var _a, font, fontFamily2, fontSize2;
                        var _this2 = this;
                        return __generator(this, function(_b) {
                            _a = this.createFontStyle(styles), font = _a[0], fontFamily2 = _a[1], fontSize2 = _a[2];
                            this.ctx.font = font;
                            text.textBounds.forEach(function(text2) {
                                _this2.ctx.fillStyle = asString(styles.color);
                                _this2.renderTextWithLetterSpacing(text2, styles.letterSpacing);
                                var textShadows = styles.textShadow;
                                if (textShadows.length && text2.text.trim().length) {
                                    textShadows.slice(0).reverse().forEach(function(textShadow2) {
                                        _this2.ctx.shadowColor = asString(textShadow2.color);
                                        _this2.ctx.shadowOffsetX = textShadow2.offsetX.number * _this2.options.scale;
                                        _this2.ctx.shadowOffsetY = textShadow2.offsetY.number * _this2.options.scale;
                                        _this2.ctx.shadowBlur = textShadow2.blur.number;
                                        _this2.ctx.fillText(text2.text, text2.bounds.left, text2.bounds.top + text2.bounds.height);
                                    });
                                    _this2.ctx.shadowColor = "";
                                    _this2.ctx.shadowOffsetX = 0;
                                    _this2.ctx.shadowOffsetY = 0;
                                    _this2.ctx.shadowBlur = 0;
                                }
                                if (styles.textDecorationLine.length) {
                                    _this2.ctx.fillStyle = asString(styles.textDecorationColor || styles.color);
                                    styles.textDecorationLine.forEach(function(textDecorationLine2) {
                                        switch (textDecorationLine2) {
                                            case 1:
                                                var baseline = _this2.fontMetrics.getMetrics(fontFamily2, fontSize2).baseline;
                                                _this2.ctx.fillRect(text2.bounds.left, Math.round(text2.bounds.top + baseline), text2.bounds.width, 1);
                                                break;
                                            case 2:
                                                _this2.ctx.fillRect(text2.bounds.left, Math.round(text2.bounds.top), text2.bounds.width, 1);
                                                break;
                                            case 3:
                                                var middle = _this2.fontMetrics.getMetrics(fontFamily2, fontSize2).middle;
                                                _this2.ctx.fillRect(text2.bounds.left, Math.ceil(text2.bounds.top + middle), text2.bounds.width, 1);
                                                break;
                                        }
                                    });
                                }
                            });
                            return [2];
                        });
                    });
                };
                CanvasRenderer2.prototype.renderReplacedElement = function(container, curves, image2) {
                    if (image2 && container.intrinsicWidth > 0 && container.intrinsicHeight > 0) {
                        var box = contentBox(container);
                        var path = calculatePaddingBoxPath(curves);
                        this.path(path);
                        this.ctx.save();
                        this.ctx.clip();
                        this.ctx.drawImage(image2, 0, 0, container.intrinsicWidth, container.intrinsicHeight, box.left, box.top, box.width, box.height);
                        this.ctx.restore();
                    }
                };
                CanvasRenderer2.prototype.renderNodeContent = function(paint) {
                    return __awaiter(this, void 0, void 0, function() {
                        var container, curves, styles, _i, _a, child, image2, e_1, image2, e_2, iframeRenderer, canvas, size, bounds, x, textBounds, img, image2, url, e_3, bounds;
                        return __generator(this, function(_b) {
                            switch (_b.label) {
                                case 0:
                                    this.applyEffects(paint.effects, 4);
                                    container = paint.container;
                                    curves = paint.curves;
                                    styles = container.styles;
                                    _i = 0, _a = container.textNodes;
                                    _b.label = 1;
                                case 1:
                                    if (!(_i < _a.length))
                                        return [3, 4];
                                    child = _a[_i];
                                    return [4, this.renderTextNode(child, styles)];
                                case 2:
                                    _b.sent();
                                    _b.label = 3;
                                case 3:
                                    _i++;
                                    return [3, 1];
                                case 4:
                                    if (!(container instanceof ImageElementContainer))
                                        return [3, 8];
                                    _b.label = 5;
                                case 5:
                                    _b.trys.push([5, 7, , 8]);
                                    return [4, this.options.cache.match(container.src)];
                                case 6:
                                    image2 = _b.sent();
                                    this.renderReplacedElement(container, curves, image2);
                                    return [3, 8];
                                case 7:
                                    e_1 = _b.sent();
                                    Logger.getInstance(this.options.id).error("Error loading image " + container.src);
                                    return [3, 8];
                                case 8:
                                    if (container instanceof CanvasElementContainer) {
                                        this.renderReplacedElement(container, curves, container.canvas);
                                    }
                                    if (!(container instanceof SVGElementContainer))
                                        return [3, 12];
                                    _b.label = 9;
                                case 9:
                                    _b.trys.push([9, 11, , 12]);
                                    return [4, this.options.cache.match(container.svg)];
                                case 10:
                                    image2 = _b.sent();
                                    this.renderReplacedElement(container, curves, image2);
                                    return [3, 12];
                                case 11:
                                    e_2 = _b.sent();
                                    Logger.getInstance(this.options.id).error("Error loading svg " + container.svg.substring(0, 255));
                                    return [3, 12];
                                case 12:
                                    if (!(container instanceof IFrameElementContainer && container.tree))
                                        return [3, 14];
                                    iframeRenderer = new CanvasRenderer2({
                                        id: this.options.id,
                                        scale: this.options.scale,
                                        backgroundColor: container.backgroundColor,
                                        x: 0,
                                        y: 0,
                                        scrollX: 0,
                                        scrollY: 0,
                                        width: container.width,
                                        height: container.height,
                                        cache: this.options.cache,
                                        windowWidth: container.width,
                                        windowHeight: container.height
                                    });
                                    return [4, iframeRenderer.render(container.tree)];
                                case 13:
                                    canvas = _b.sent();
                                    if (container.width && container.height) {
                                        this.ctx.drawImage(canvas, 0, 0, container.width, container.height, container.bounds.left, container.bounds.top, container.bounds.width, container.bounds.height);
                                    }
                                    _b.label = 14;
                                case 14:
                                    if (container instanceof InputElementContainer) {
                                        size = Math.min(container.bounds.width, container.bounds.height);
                                        if (container.type === CHECKBOX) {
                                            if (container.checked) {
                                                this.ctx.save();
                                                this.path([
                                                    new Vector(container.bounds.left + size * 0.39363, container.bounds.top + size * 0.79),
                                                    new Vector(container.bounds.left + size * 0.16, container.bounds.top + size * 0.5549),
                                                    new Vector(container.bounds.left + size * 0.27347, container.bounds.top + size * 0.44071),
                                                    new Vector(container.bounds.left + size * 0.39694, container.bounds.top + size * 0.5649),
                                                    new Vector(container.bounds.left + size * 0.72983, container.bounds.top + size * 0.23),
                                                    new Vector(container.bounds.left + size * 0.84, container.bounds.top + size * 0.34085),
                                                    new Vector(container.bounds.left + size * 0.39363, container.bounds.top + size * 0.79)
                                                ]);
                                                this.ctx.fillStyle = asString(INPUT_COLOR);
                                                this.ctx.fill();
                                                this.ctx.restore();
                                            }
                                        } else if (container.type === RADIO) {
                                            if (container.checked) {
                                                this.ctx.save();
                                                this.ctx.beginPath();
                                                this.ctx.arc(container.bounds.left + size / 2, container.bounds.top + size / 2, size / 4, 0, Math.PI * 2, true);
                                                this.ctx.fillStyle = asString(INPUT_COLOR);
                                                this.ctx.fill();
                                                this.ctx.restore();
                                            }
                                        }
                                    }
                                    if (isTextInputElement(container) && container.value.length) {
                                        this.ctx.font = this.createFontStyle(styles)[0];
                                        this.ctx.fillStyle = asString(styles.color);
                                        this.ctx.textBaseline = "middle";
                                        this.ctx.textAlign = canvasTextAlign(container.styles.textAlign);
                                        bounds = contentBox(container);
                                        x = 0;
                                        switch (container.styles.textAlign) {
                                            case TEXT_ALIGN.CENTER:
                                                x += bounds.width / 2;
                                                break;
                                            case TEXT_ALIGN.RIGHT:
                                                x += bounds.width;
                                                break;
                                        }
                                        textBounds = bounds.add(x, 0, 0, -bounds.height / 2 + 1);
                                        this.ctx.save();
                                        this.path([
                                            new Vector(bounds.left, bounds.top),
                                            new Vector(bounds.left + bounds.width, bounds.top),
                                            new Vector(bounds.left + bounds.width, bounds.top + bounds.height),
                                            new Vector(bounds.left, bounds.top + bounds.height)
                                        ]);
                                        this.ctx.clip();
                                        this.renderTextWithLetterSpacing(new TextBounds(container.value, textBounds), styles.letterSpacing);
                                        this.ctx.restore();
                                        this.ctx.textBaseline = "bottom";
                                        this.ctx.textAlign = "left";
                                    }
                                    if (!contains(container.styles.display, 2048))
                                        return [3, 20];
                                    if (!(container.styles.listStyleImage !== null))
                                        return [3, 19];
                                    img = container.styles.listStyleImage;
                                    if (!(img.type === CSSImageType.URL))
                                        return [3, 18];
                                    image2 = void 0;
                                    url = img.url;
                                    _b.label = 15;
                                case 15:
                                    _b.trys.push([15, 17, , 18]);
                                    return [4, this.options.cache.match(url)];
                                case 16:
                                    image2 = _b.sent();
                                    this.ctx.drawImage(image2, container.bounds.left - (image2.width + 10), container.bounds.top);
                                    return [3, 18];
                                case 17:
                                    e_3 = _b.sent();
                                    Logger.getInstance(this.options.id).error("Error loading list-style-image " + url);
                                    return [3, 18];
                                case 18:
                                    return [3, 20];
                                case 19:
                                    if (paint.listValue && container.styles.listStyleType !== LIST_STYLE_TYPE.NONE) {
                                        this.ctx.font = this.createFontStyle(styles)[0];
                                        this.ctx.fillStyle = asString(styles.color);
                                        this.ctx.textBaseline = "middle";
                                        this.ctx.textAlign = "right";
                                        bounds = new Bounds(container.bounds.left, container.bounds.top + getAbsoluteValue(container.styles.paddingTop, container.bounds.width), container.bounds.width, computeLineHeight(styles.lineHeight, styles.fontSize.number) / 2 + 1);
                                        this.renderTextWithLetterSpacing(new TextBounds(paint.listValue, bounds), styles.letterSpacing);
                                        this.ctx.textBaseline = "bottom";
                                        this.ctx.textAlign = "left";
                                    }
                                    _b.label = 20;
                                case 20:
                                    return [2];
                            }
                        });
                    });
                };
                CanvasRenderer2.prototype.renderStackContent = function(stack) {
                    return __awaiter(this, void 0, void 0, function() {
                        var _i, _a, child, _b, _c, child, _d, _e, child, _f, _g, child, _h, _j, child, _k, _l, child, _m, _o, child;
                        return __generator(this, function(_p) {
                            switch (_p.label) {
                                case 0:
                                    return [4, this.renderNodeBackgroundAndBorders(stack.element)];
                                case 1:
                                    _p.sent();
                                    _i = 0, _a = stack.negativeZIndex;
                                    _p.label = 2;
                                case 2:
                                    if (!(_i < _a.length))
                                        return [3, 5];
                                    child = _a[_i];
                                    return [4, this.renderStack(child)];
                                case 3:
                                    _p.sent();
                                    _p.label = 4;
                                case 4:
                                    _i++;
                                    return [3, 2];
                                case 5:
                                    return [4, this.renderNodeContent(stack.element)];
                                case 6:
                                    _p.sent();
                                    _b = 0, _c = stack.nonInlineLevel;
                                    _p.label = 7;
                                case 7:
                                    if (!(_b < _c.length))
                                        return [3, 10];
                                    child = _c[_b];
                                    return [4, this.renderNode(child)];
                                case 8:
                                    _p.sent();
                                    _p.label = 9;
                                case 9:
                                    _b++;
                                    return [3, 7];
                                case 10:
                                    _d = 0, _e = stack.nonPositionedFloats;
                                    _p.label = 11;
                                case 11:
                                    if (!(_d < _e.length))
                                        return [3, 14];
                                    child = _e[_d];
                                    return [4, this.renderStack(child)];
                                case 12:
                                    _p.sent();
                                    _p.label = 13;
                                case 13:
                                    _d++;
                                    return [3, 11];
                                case 14:
                                    _f = 0, _g = stack.nonPositionedInlineLevel;
                                    _p.label = 15;
                                case 15:
                                    if (!(_f < _g.length))
                                        return [3, 18];
                                    child = _g[_f];
                                    return [4, this.renderStack(child)];
                                case 16:
                                    _p.sent();
                                    _p.label = 17;
                                case 17:
                                    _f++;
                                    return [3, 15];
                                case 18:
                                    _h = 0, _j = stack.inlineLevel;
                                    _p.label = 19;
                                case 19:
                                    if (!(_h < _j.length))
                                        return [3, 22];
                                    child = _j[_h];
                                    return [4, this.renderNode(child)];
                                case 20:
                                    _p.sent();
                                    _p.label = 21;
                                case 21:
                                    _h++;
                                    return [3, 19];
                                case 22:
                                    _k = 0, _l = stack.zeroOrAutoZIndexOrTransformedOrOpacity;
                                    _p.label = 23;
                                case 23:
                                    if (!(_k < _l.length))
                                        return [3, 26];
                                    child = _l[_k];
                                    return [4, this.renderStack(child)];
                                case 24:
                                    _p.sent();
                                    _p.label = 25;
                                case 25:
                                    _k++;
                                    return [3, 23];
                                case 26:
                                    _m = 0, _o = stack.positiveZIndex;
                                    _p.label = 27;
                                case 27:
                                    if (!(_m < _o.length))
                                        return [3, 30];
                                    child = _o[_m];
                                    return [4, this.renderStack(child)];
                                case 28:
                                    _p.sent();
                                    _p.label = 29;
                                case 29:
                                    _m++;
                                    return [3, 27];
                                case 30:
                                    return [2];
                            }
                        });
                    });
                };
                CanvasRenderer2.prototype.mask = function(paths) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(0, 0);
                    this.ctx.lineTo(this.canvas.width, 0);
                    this.ctx.lineTo(this.canvas.width, this.canvas.height);
                    this.ctx.lineTo(0, this.canvas.height);
                    this.ctx.lineTo(0, 0);
                    this.formatPath(paths.slice(0).reverse());
                    this.ctx.closePath();
                };
                CanvasRenderer2.prototype.path = function(paths) {
                    this.ctx.beginPath();
                    this.formatPath(paths);
                    this.ctx.closePath();
                };
                CanvasRenderer2.prototype.formatPath = function(paths) {
                    var _this2 = this;
                    paths.forEach(function(point, index) {
                        var start = isBezierCurve(point) ? point.start : point;
                        if (index === 0) {
                            _this2.ctx.moveTo(start.x, start.y);
                        } else {
                            _this2.ctx.lineTo(start.x, start.y);
                        }
                        if (isBezierCurve(point)) {
                            _this2.ctx.bezierCurveTo(point.startControl.x, point.startControl.y, point.endControl.x, point.endControl.y, point.end.x, point.end.y);
                        }
                    });
                };
                CanvasRenderer2.prototype.renderRepeat = function(path, pattern, offsetX, offsetY) {
                    this.path(path);
                    this.ctx.fillStyle = pattern;
                    this.ctx.translate(offsetX, offsetY);
                    this.ctx.fill();
                    this.ctx.translate(-offsetX, -offsetY);
                };
                CanvasRenderer2.prototype.resizeImage = function(image2, width, height) {
                    if (image2.width === width && image2.height === height) {
                        return image2;
                    }
                    var canvas = this.canvas.ownerDocument.createElement("canvas");
                    canvas.width = width;
                    canvas.height = height;
                    var ctx = canvas.getContext("2d");
                    ctx.drawImage(image2, 0, 0, image2.width, image2.height, 0, 0, width, height);
                    return canvas;
                };
                CanvasRenderer2.prototype.renderBackgroundImage = function(container) {
                    return __awaiter(this, void 0, void 0, function() {
                        var index, _loop_1, this_1, _i, _a, backgroundImage2;
                        return __generator(this, function(_b) {
                            switch (_b.label) {
                                case 0:
                                    index = container.styles.backgroundImage.length - 1;
                                    _loop_1 = function(backgroundImage3) {
                                        var image2, url, e_4, _a2, path, x, y, width, height, pattern, _b2, path, x, y, width, height, _c, lineLength, x0, x1, y0, y1, canvas, ctx, gradient_1, pattern, _d, path, left, top_1, width, height, position2, x, y, _e, rx, ry, radialGradient_1, midX, midY, f2, invF;
                                        return __generator(this, function(_f) {
                                            switch (_f.label) {
                                                case 0:
                                                    if (!(backgroundImage3.type === CSSImageType.URL))
                                                        return [3, 5];
                                                    image2 = void 0;
                                                    url = backgroundImage3.url;
                                                    _f.label = 1;
                                                case 1:
                                                    _f.trys.push([1, 3, , 4]);
                                                    return [4, this_1.options.cache.match(url)];
                                                case 2:
                                                    image2 = _f.sent();
                                                    return [3, 4];
                                                case 3:
                                                    e_4 = _f.sent();
                                                    Logger.getInstance(this_1.options.id).error("Error loading background-image " + url);
                                                    return [3, 4];
                                                case 4:
                                                    if (image2) {
                                                        _a2 = calculateBackgroundRendering(container, index, [
                                                            image2.width,
                                                            image2.height,
                                                            image2.width / image2.height
                                                        ]), path = _a2[0], x = _a2[1], y = _a2[2], width = _a2[3], height = _a2[4];
                                                        pattern = this_1.ctx.createPattern(this_1.resizeImage(image2, width, height), "repeat");
                                                        this_1.renderRepeat(path, pattern, x, y);
                                                    }
                                                    return [3, 6];
                                                case 5:
                                                    if (isLinearGradient(backgroundImage3)) {
                                                        _b2 = calculateBackgroundRendering(container, index, [null, null, null]), path = _b2[0], x = _b2[1], y = _b2[2], width = _b2[3], height = _b2[4];
                                                        _c = calculateGradientDirection(backgroundImage3.angle, width, height), lineLength = _c[0], x0 = _c[1], x1 = _c[2], y0 = _c[3], y1 = _c[4];
                                                        canvas = document.createElement("canvas");
                                                        canvas.width = width;
                                                        canvas.height = height;
                                                        ctx = canvas.getContext("2d");
                                                        gradient_1 = ctx.createLinearGradient(x0, y0, x1, y1);
                                                        processColorStops(backgroundImage3.stops, lineLength).forEach(function(colorStop) {
                                                            return gradient_1.addColorStop(colorStop.stop, asString(colorStop.color));
                                                        });
                                                        ctx.fillStyle = gradient_1;
                                                        ctx.fillRect(0, 0, width, height);
                                                        if (width > 0 && height > 0) {
                                                            pattern = this_1.ctx.createPattern(canvas, "repeat");
                                                            this_1.renderRepeat(path, pattern, x, y);
                                                        }
                                                    } else if (isRadialGradient(backgroundImage3)) {
                                                        _d = calculateBackgroundRendering(container, index, [
                                                            null,
                                                            null,
                                                            null
                                                        ]), path = _d[0], left = _d[1], top_1 = _d[2], width = _d[3], height = _d[4];
                                                        position2 = backgroundImage3.position.length === 0 ? [FIFTY_PERCENT] : backgroundImage3.position;
                                                        x = getAbsoluteValue(position2[0], width);
                                                        y = getAbsoluteValue(position2[position2.length - 1], height);
                                                        _e = calculateRadius(backgroundImage3, x, y, width, height), rx = _e[0], ry = _e[1];
                                                        if (rx > 0 && rx > 0) {
                                                            radialGradient_1 = this_1.ctx.createRadialGradient(left + x, top_1 + y, 0, left + x, top_1 + y, rx);
                                                            processColorStops(backgroundImage3.stops, rx * 2).forEach(function(colorStop) {
                                                                return radialGradient_1.addColorStop(colorStop.stop, asString(colorStop.color));
                                                            });
                                                            this_1.path(path);
                                                            this_1.ctx.fillStyle = radialGradient_1;
                                                            if (rx !== ry) {
                                                                midX = container.bounds.left + 0.5 * container.bounds.width;
                                                                midY = container.bounds.top + 0.5 * container.bounds.height;
                                                                f2 = ry / rx;
                                                                invF = 1 / f2;
                                                                this_1.ctx.save();
                                                                this_1.ctx.translate(midX, midY);
                                                                this_1.ctx.transform(1, 0, 0, f2, 0, 0);
                                                                this_1.ctx.translate(-midX, -midY);
                                                                this_1.ctx.fillRect(left, invF * (top_1 - midY) + midY, width, height * invF);
                                                                this_1.ctx.restore();
                                                            } else {
                                                                this_1.ctx.fill();
                                                            }
                                                        }
                                                    }
                                                    _f.label = 6;
                                                case 6:
                                                    index--;
                                                    return [2];
                                            }
                                        });
                                    };
                                    this_1 = this;
                                    _i = 0, _a = container.styles.backgroundImage.slice(0).reverse();
                                    _b.label = 1;
                                case 1:
                                    if (!(_i < _a.length))
                                        return [3, 4];
                                    backgroundImage2 = _a[_i];
                                    return [5, _loop_1(backgroundImage2)];
                                case 2:
                                    _b.sent();
                                    _b.label = 3;
                                case 3:
                                    _i++;
                                    return [3, 1];
                                case 4:
                                    return [2];
                            }
                        });
                    });
                };
                CanvasRenderer2.prototype.renderBorder = function(color2, side, curvePoints) {
                    return __awaiter(this, void 0, void 0, function() {
                        return __generator(this, function(_a) {
                            this.path(parsePathForBorder(curvePoints, side));
                            this.ctx.fillStyle = asString(color2);
                            this.ctx.fill();
                            return [2];
                        });
                    });
                };
                CanvasRenderer2.prototype.renderNodeBackgroundAndBorders = function(paint) {
                    return __awaiter(this, void 0, void 0, function() {
                        var styles, hasBackground, borders, backgroundPaintingArea, side, _i, borders_1, border;
                        var _this2 = this;
                        return __generator(this, function(_a) {
                            switch (_a.label) {
                                case 0:
                                    this.applyEffects(paint.effects, 2);
                                    styles = paint.container.styles;
                                    hasBackground = !isTransparent(styles.backgroundColor) || styles.backgroundImage.length;
                                    borders = [{
                                            style: styles.borderTopStyle,
                                            color: styles.borderTopColor
                                        },
                                        {
                                            style: styles.borderRightStyle,
                                            color: styles.borderRightColor
                                        },
                                        {
                                            style: styles.borderBottomStyle,
                                            color: styles.borderBottomColor
                                        },
                                        {
                                            style: styles.borderLeftStyle,
                                            color: styles.borderLeftColor
                                        }
                                    ];
                                    backgroundPaintingArea = calculateBackgroundCurvedPaintingArea(getBackgroundValueForIndex(styles.backgroundClip, 0), paint.curves);
                                    if (!(hasBackground || styles.boxShadow.length))
                                        return [3, 2];
                                    this.ctx.save();
                                    this.path(backgroundPaintingArea);
                                    this.ctx.clip();
                                    if (!isTransparent(styles.backgroundColor)) {
                                        this.ctx.fillStyle = asString(styles.backgroundColor);
                                        this.ctx.fill();
                                    }
                                    return [4, this.renderBackgroundImage(paint.container)];
                                case 1:
                                    _a.sent();
                                    this.ctx.restore();
                                    styles.boxShadow.slice(0).reverse().forEach(function(shadow) {
                                        _this2.ctx.save();
                                        var borderBoxArea = calculateBorderBoxPath(paint.curves);
                                        var maskOffset = shadow.inset ? 0 : MASK_OFFSET;
                                        var shadowPaintingArea = transformPath(borderBoxArea, -maskOffset + (shadow.inset ? 1 : -1) * shadow.spread.number, (shadow.inset ? 1 : -1) * shadow.spread.number, shadow.spread.number * (shadow.inset ? -2 : 2), shadow.spread.number * (shadow.inset ? -2 : 2));
                                        if (shadow.inset) {
                                            _this2.path(borderBoxArea);
                                            _this2.ctx.clip();
                                            _this2.mask(shadowPaintingArea);
                                        } else {
                                            _this2.mask(borderBoxArea);
                                            _this2.ctx.clip();
                                            _this2.path(shadowPaintingArea);
                                        }
                                        _this2.ctx.shadowOffsetX = shadow.offsetX.number + maskOffset;
                                        _this2.ctx.shadowOffsetY = shadow.offsetY.number;
                                        _this2.ctx.shadowColor = asString(shadow.color);
                                        _this2.ctx.shadowBlur = shadow.blur.number;
                                        _this2.ctx.fillStyle = shadow.inset ? asString(shadow.color) : "rgba(0,0,0,1)";
                                        _this2.ctx.fill();
                                        _this2.ctx.restore();
                                    });
                                    _a.label = 2;
                                case 2:
                                    side = 0;
                                    _i = 0, borders_1 = borders;
                                    _a.label = 3;
                                case 3:
                                    if (!(_i < borders_1.length))
                                        return [3, 7];
                                    border = borders_1[_i];
                                    if (!(border.style !== BORDER_STYLE.NONE && !isTransparent(border.color)))
                                        return [3, 5];
                                    return [4, this.renderBorder(border.color, side, paint.curves)];
                                case 4:
                                    _a.sent();
                                    _a.label = 5;
                                case 5:
                                    side++;
                                    _a.label = 6;
                                case 6:
                                    _i++;
                                    return [3, 3];
                                case 7:
                                    return [2];
                            }
                        });
                    });
                };
                CanvasRenderer2.prototype.render = function(element) {
                    return __awaiter(this, void 0, void 0, function() {
                        var stack;
                        return __generator(this, function(_a) {
                            switch (_a.label) {
                                case 0:
                                    if (this.options.backgroundColor) {
                                        this.ctx.fillStyle = asString(this.options.backgroundColor);
                                        this.ctx.fillRect(this.options.x - this.options.scrollX, this.options.y - this.options.scrollY, this.options.width, this.options.height);
                                    }
                                    stack = parseStackingContexts(element);
                                    return [4, this.renderStack(stack)];
                                case 1:
                                    _a.sent();
                                    this.applyEffects([], 2);
                                    return [2, this.canvas];
                            }
                        });
                    });
                };
                return CanvasRenderer2;
            }();
            var isTextInputElement = function(container) {
                if (container instanceof TextareaElementContainer) {
                    return true;
                } else if (container instanceof SelectElementContainer) {
                    return true;
                } else if (container instanceof InputElementContainer && container.type !== RADIO && container.type !== CHECKBOX) {
                    return true;
                }
                return false;
            };
            var calculateBackgroundCurvedPaintingArea = function(clip, curves) {
                switch (clip) {
                    case BACKGROUND_CLIP.BORDER_BOX:
                        return calculateBorderBoxPath(curves);
                    case BACKGROUND_CLIP.CONTENT_BOX:
                        return calculateContentBoxPath(curves);
                    case BACKGROUND_CLIP.PADDING_BOX:
                    default:
                        return calculatePaddingBoxPath(curves);
                }
            };
            var canvasTextAlign = function(textAlign2) {
                switch (textAlign2) {
                    case TEXT_ALIGN.CENTER:
                        return "center";
                    case TEXT_ALIGN.RIGHT:
                        return "right";
                    case TEXT_ALIGN.LEFT:
                    default:
                        return "left";
                }
            };
            var ForeignObjectRenderer = function() {
                function ForeignObjectRenderer2(options) {
                    this.canvas = options.canvas ? options.canvas : document.createElement("canvas");
                    this.ctx = this.canvas.getContext("2d");
                    this.options = options;
                    this.canvas.width = Math.floor(options.width * options.scale);
                    this.canvas.height = Math.floor(options.height * options.scale);
                    this.canvas.style.width = options.width + "px";
                    this.canvas.style.height = options.height + "px";
                    this.ctx.scale(this.options.scale, this.options.scale);
                    this.ctx.translate(-options.x + options.scrollX, -options.y + options.scrollY);
                    Logger.getInstance(options.id).debug("EXPERIMENTAL ForeignObject renderer initialized (" + options.width + "x" + options.height + " at " + options.x + "," + options.y + ") with scale " + options.scale);
                }
                ForeignObjectRenderer2.prototype.render = function(element) {
                    return __awaiter(this, void 0, void 0, function() {
                        var svg, img;
                        return __generator(this, function(_a) {
                            switch (_a.label) {
                                case 0:
                                    svg = createForeignObjectSVG(Math.max(this.options.windowWidth, this.options.width) * this.options.scale, Math.max(this.options.windowHeight, this.options.height) * this.options.scale, this.options.scrollX * this.options.scale, this.options.scrollY * this.options.scale, element);
                                    return [4, loadSerializedSVG$1(svg)];
                                case 1:
                                    img = _a.sent();
                                    if (this.options.backgroundColor) {
                                        this.ctx.fillStyle = asString(this.options.backgroundColor);
                                        this.ctx.fillRect(0, 0, this.options.width * this.options.scale, this.options.height * this.options.scale);
                                    }
                                    this.ctx.drawImage(img, -this.options.x * this.options.scale, -this.options.y * this.options.scale);
                                    return [2, this.canvas];
                            }
                        });
                    });
                };
                return ForeignObjectRenderer2;
            }();
            var loadSerializedSVG$1 = function(svg) {
                return new Promise(function(resolve, reject) {
                    var img = new Image();
                    img.onload = function() {
                        resolve(img);
                    };
                    img.onerror = reject;
                    img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(new XMLSerializer().serializeToString(svg));
                });
            };
            var _this = void 0;
            var parseColor$1 = function(value) {
                return color.parse(Parser.create(value).parseComponentValue());
            };
            var html2canvas3 = function(element, options) {
                if (options === void 0) {
                    options = {};
                }
                return renderElement(element, options);
            };
            if (typeof window !== "undefined") {
                CacheStorage.setContext(window);
            }
            var renderElement = function(element, opts) {
                return __awaiter(_this, void 0, void 0, function() {
                    var ownerDocument, defaultView, instanceName, _a, width, height, left, top, defaultResourceOptions, resourceOptions, defaultOptions, options, windowBounds, documentCloner, clonedElement, container, documentBackgroundColor, bodyBackgroundColor, bgColor, defaultBackgroundColor, backgroundColor2, renderOptions, canvas, renderer, root, renderer;
                    return __generator(this, function(_b) {
                        switch (_b.label) {
                            case 0:
                                ownerDocument = element.ownerDocument;
                                if (!ownerDocument) {
                                    throw new Error("Element is not attached to a Document");
                                }
                                defaultView = ownerDocument.defaultView;
                                if (!defaultView) {
                                    throw new Error("Document is not attached to a Window");
                                }
                                instanceName = (Math.round(Math.random() * 1e3) + Date.now()).toString(16);
                                _a = isBodyElement(element) || isHTMLElement(element) ? parseDocumentSize(ownerDocument) : parseBounds(element), width = _a.width, height = _a.height, left = _a.left, top = _a.top;
                                defaultResourceOptions = {
                                    allowTaint: false,
                                    imageTimeout: 15e3,
                                    proxy: void 0,
                                    useCORS: false
                                };
                                resourceOptions = __assign({}, defaultResourceOptions, opts);
                                defaultOptions = {
                                    backgroundColor: "#ffffff",
                                    cache: opts.cache ? opts.cache : CacheStorage.create(instanceName, resourceOptions),
                                    logging: true,
                                    removeContainer: true,
                                    foreignObjectRendering: false,
                                    scale: defaultView.devicePixelRatio || 1,
                                    windowWidth: defaultView.innerWidth,
                                    windowHeight: defaultView.innerHeight,
                                    scrollX: defaultView.pageXOffset,
                                    scrollY: defaultView.pageYOffset,
                                    x: left,
                                    y: top,
                                    width: Math.ceil(width),
                                    height: Math.ceil(height),
                                    id: instanceName
                                };
                                options = __assign({}, defaultOptions, resourceOptions, opts);
                                windowBounds = new Bounds(options.scrollX, options.scrollY, options.windowWidth, options.windowHeight);
                                Logger.create({
                                    id: instanceName,
                                    enabled: options.logging
                                });
                                Logger.getInstance(instanceName).debug("Starting document clone");
                                documentCloner = new DocumentCloner(element, {
                                    id: instanceName,
                                    onclone: options.onclone,
                                    ignoreElements: options.ignoreElements,
                                    inlineImages: options.foreignObjectRendering,
                                    copyStyles: options.foreignObjectRendering
                                });
                                clonedElement = documentCloner.clonedReferenceElement;
                                if (!clonedElement) {
                                    return [2, Promise.reject("Unable to find element in cloned iframe")];
                                }
                                return [4, documentCloner.toIFrame(ownerDocument, windowBounds)];
                            case 1:
                                container = _b.sent();
                                documentBackgroundColor = ownerDocument.documentElement ? parseColor$1(getComputedStyle(ownerDocument.documentElement).backgroundColor) : COLORS.TRANSPARENT;
                                bodyBackgroundColor = ownerDocument.body ? parseColor$1(getComputedStyle(ownerDocument.body).backgroundColor) : COLORS.TRANSPARENT;
                                bgColor = opts.backgroundColor;
                                defaultBackgroundColor = typeof bgColor === "string" ? parseColor$1(bgColor) : bgColor === null ? COLORS.TRANSPARENT : 4294967295;
                                backgroundColor2 = element === ownerDocument.documentElement ? isTransparent(documentBackgroundColor) ? isTransparent(bodyBackgroundColor) ? defaultBackgroundColor : bodyBackgroundColor : documentBackgroundColor : defaultBackgroundColor;
                                renderOptions = {
                                    id: instanceName,
                                    cache: options.cache,
                                    canvas: options.canvas,
                                    backgroundColor: backgroundColor2,
                                    scale: options.scale,
                                    x: options.x,
                                    y: options.y,
                                    scrollX: options.scrollX,
                                    scrollY: options.scrollY,
                                    width: options.width,
                                    height: options.height,
                                    windowWidth: options.windowWidth,
                                    windowHeight: options.windowHeight
                                };
                                if (!options.foreignObjectRendering)
                                    return [3, 3];
                                Logger.getInstance(instanceName).debug("Document cloned, using foreign object rendering");
                                renderer = new ForeignObjectRenderer(renderOptions);
                                return [4, renderer.render(clonedElement)];
                            case 2:
                                canvas = _b.sent();
                                return [3, 5];
                            case 3:
                                Logger.getInstance(instanceName).debug("Document cloned, using computed rendering");
                                CacheStorage.attachInstance(options.cache);
                                Logger.getInstance(instanceName).debug("Starting DOM parsing");
                                root = parseTree(clonedElement);
                                CacheStorage.detachInstance();
                                if (backgroundColor2 === root.styles.backgroundColor) {
                                    root.styles.backgroundColor = COLORS.TRANSPARENT;
                                }
                                Logger.getInstance(instanceName).debug("Starting renderer");
                                renderer = new CanvasRenderer(renderOptions);
                                return [4, renderer.render(root)];
                            case 4:
                                canvas = _b.sent();
                                _b.label = 5;
                            case 5:
                                if (options.removeContainer === true) {
                                    if (!DocumentCloner.destroy(container)) {
                                        Logger.getInstance(instanceName).error("Cannot detach cloned iframe as it is not in the DOM anymore");
                                    }
                                }
                                Logger.getInstance(instanceName).debug("Finished rendering");
                                Logger.destroy(instanceName);
                                CacheStorage.destroy(instanceName);
                                return [2, canvas];
                        }
                    });
                });
            };
            return html2canvas3;
        });
    });

    // www/src/assets/js/@globals.js
    if (!window.wp) {
        window.wp = {};
    }
    window.Data = {};
    window.webStoriesTrackingSettings = {
        trackingAllowed: true,
        trackingId: "G-MQVJC0BGYK"
    };
    window.webStoriesEditorSettings = {
        id: "edit-story",
        config: {
            autoSaveInterval: 60,
            isRTL: false,
            locale: {
                locale: "en-US",
                dateFormat: "F j, Y",
                timeFormat: "g:i a",
                gmtOffset: "0",
                timezone: "",
                months: [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December"
                ],
                monthsShort: [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec"
                ],
                weekdays: [
                    "Sunday",
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday"
                ],
                weekdaysShort: [
                    "Sun",
                    "Mon",
                    "Tue",
                    "Wed",
                    "Thu",
                    "Fri",
                    "Sat"
                ],
                weekdaysInitials: [
                    "S",
                    "M",
                    "T",
                    "W",
                    "T",
                    "F",
                    "S"
                ],
                weekStartsOn: 1
            },
            allowedMimeTypes: {
                image: [
                    "image/png",
                    "image/jpeg",
                    "image/gif"
                ],
                audio: [],
                video: ["video/mp4", "video/webm"]
            },
            allowedFileTypes: [
                "gif",
                "jpeg",
                "jpg",
                "m4v",
                "mp4",
                "png",
                "webm"
            ],
            postType: "web-story",
            storyId: 22,
            previewLink: "http://localhost:8899/?post_type=web-story&p=22&preview_id=22&preview_nonce=5129460e1e&preview=true",
            maxUpload: 104857600,
            capabilities: {
                hasPublishAction: true,
                hasAssignAuthorAction: true,
                hasUploadMediaAction: true
            },
            api: {
                users: "/wp/v2/users",
                stories: "/web-stories/v1/web-story",
                media: "/web-stories/v1/media",
                link: "/web-stories/v1/link"
            },
            metadata: {
                publisher: {
                    name: "webStories.io",
                    logo: null
                }
            },
            version: ""
        },
        flags: {
            enableAnimation: false,
            showAnimationTab: false,
            showTextSets: false,
            showPrePublishTab: false,
            showTextMagicAndHelperMode: false,
            showTextAndShapesSearchInput: false,
            showElementsTab: false,
            incrementalSearchDebounceMedia: false,
            showGifTab: true
        },
        publicPath: "/assets/editor/js/"
    };

    // www/src/assets/js/@modal.js
    const clipboard = __toModule(require_clipboard());

    // www/src/assets/js/@utils.js
    var utils_default = (() => {
        const Utils = {
            popup(name2, url) {
                const winWidth = 600;
                const winHeight = 400;
                const winTop = screen.height / 2 - winHeight / 2;
                const winLeft = screen.width / 2 - winWidth / 2;
                window.open(url, name2, "top=" + winTop + ",left=" + winLeft + ",toolbar=0,status=0,width=" + winWidth + ",height=" + winHeight);
                return false;
            },
            uniqid() {
                return String.fromCharCode(65 + Math.floor(Math.random() * 26)) + new Date().getTime();
            },
            formatTime(seconds) {
                const h = Math.floor(seconds / 3600);
                const m = Math.floor(seconds % 3600 / 60);
                const s = Math.round(seconds % 60);
                return [
                    h,
                    m > 9 ? m : h ? "0" + m : m || "0",
                    s > 9 ? s : "0" + s
                ].filter(Boolean).join(":");
            },
            log(...args) {
                const mode = "dev";
                const configMode = "dev";
                if (window.document && configMode !== "dev" || true) {
                    return false;
                } else {
                    if (console) {
                        console.log.apply(null, args);
                    }
                }
            },
            storage: {
                get(key) {
                    return JSON.parse(window.localStorage.getItem(key));
                },
                set(key, value) {
                    window.localStorage.setItem(key, JSON.stringify(value));
                }
            },
            fromObj(vars, notation) {
                if (!vars || typeof notation !== "string") {
                    return false;
                }
                if (!notation) {
                    return vars;
                }
                const parts = notation.split(".");
                while (parts.length) {
                    if (!vars[parts[0]]) {
                        return false;
                    }
                    vars = vars[parts.shift()];
                }
                return vars;
            },
            setObj(obj, path, value, separator) {
                separator = separator || ".";
                if (!path) {
                    return value;
                }
                const pList = path.split(separator);
                const key = pList.pop();
                const pointer = pList.reduce((accumulator, currentValue) => {
                    if (accumulator[currentValue] === void 0) {
                        accumulator[currentValue] = {};
                    }
                    return accumulator[currentValue];
                }, obj);
                pointer[key] = value;
                return obj;
            }
        };
        window.Utils = Utils;
        return Utils;
    })();

    // www/src/assets/js/@user.js
    var user_default = (() => {
        const User = {
            store: false,
            data: {
                get(notation) {
                    User.sync();
                    return utils_default.fromObj(User.store, notation);
                },
                set(path, value, separator) {
                    const returnValue = utils_default.setObj(User.store, path, value, separator);
                    utils_default.storage.set("user", User.store);
                    return returnValue;
                }
            },
            sync() {
                if (!User.store) {
                    User.store = utils_default.storage.get("user") || {};
                }
            },
            init() {
                User.sync();
                window.User = User;
            }
        };
        return User;
    })();

    // www/src/assets/js/@editor.js
    var editor_default = (() => {
        const Editor = {
            availableTemplates: [{
                    id: "blank",
                    name: "Blank"
                },
                {
                    id: "beauty",
                    name: "Beauty"
                },
                {
                    id: "cooking",
                    name: "Cooking"
                },
                {
                    id: "diy",
                    name: "DIY"
                },
                {
                    id: "entertainment",
                    name: "Entertainment"
                },
                {
                    id: "fashion",
                    name: "Fashion"
                },
                {
                    id: "fitness",
                    name: "Fitness"
                },
                {
                    id: "travel",
                    name: "Travel"
                },
                {
                    id: "wellbeing",
                    name: "Wellbeing"
                }
            ],
            new(refresh, story_data) {
                const blankTemplate = require_blank();
                const uid = auth_default.get().uid || utils_default.uniqid();
                if (story_data) {
                    blankTemplate.body.story_data = story_data;
                }
                const newStory = blankTemplate.body;
                const newStoryId = `${uid}-${utils_default.uniqid()}`;
                newStory.id = newStoryId;
                if (newStory.title && !newStory || newStory.title || newStory.title.raw) {
                    newStory.title = "Untitled";
                }
                user_default.data.set("currentStoryPost", newStory);
                if (refresh) {
                    window.App.refresh();
                }
                return newStory;
            },
            template(id) {
                if (id === "blank") {
                    return Editor.new(true);
                }
                const filename = `/assets/editor/templates/${id}.json`;
                var xhr = new XMLHttpRequest();
                xhr.onload = function(event) {
                    if (xhr.readyState === xhr.DONE) {
                        if (xhr.status === 200) {
                            const story = JSON.parse(xhr.responseText);
                            Editor.new(true, story);
                        }
                    }
                };
                xhr.open("GET", filename);
                xhr.send();
            },
            select(storyId) {
                const storageRef = window.firebase.storage().ref();
                const userData = auth_default.get();
                const userId = userData.uid;
                const filename = `${window.STORAGE_PATH}user/${userId}/data/${storyId}.json`;
                storageRef.child(filename).getDownloadURL().then((url) => {
                    var xhr = new XMLHttpRequest();
                    xhr.onload = function(event) {
                        if (xhr.readyState === xhr.DONE) {
                            if (xhr.status === 200) {
                                const story = JSON.parse(xhr.responseText);
                                user_default.data.set("currentStoryPost", story);
                                window.App.refresh();
                            }
                        }
                    };
                    xhr.open("GET", url);
                    xhr.send();
                });
            },
            actions: {
                download() {
                    Editor.actions.save().then(function() {
                        const fullStoryData = user_default.data.get("currentStoryPost");
                        const storyLink = document.createElement("a");
                        const content = fullStoryData.content;
                        storyLink.href = `data:text/html,${encodeURIComponent(content)}`;
                        storyLink.download = "story.html";
                        storyLink.style.display = "none";
                        document.body.appendChild(storyLink);
                        storyLink.click();
                        document.body.removeChild(storyLink);
                    });
                },
                snackBar(options) {},
                preview() {},
                save() {}
            }
        };
        return Editor;
    })();

    // www/src/assets/js/@modal.js
    var modal_default = (() => {
        const Modal = {
            open(id) {
                const modals = document.querySelectorAll(".c-modal");
                modals.forEach((modal4) => {
                    if (modal4.id === id && !modal4.classList.contains("active")) {
                        modal4.classList.add("active");
                        Modal.header(id);
                        Modal.content(id);
                        Modal.events(id);
                        if (gtag) {
                            const title = modal4.getAttribute("title");
                            gtag("event", "screen_view", {
                                screen_name: title || id
                            });
                        }
                    } else if (modal4.id !== id) {
                        modal4.classList.remove("active");
                    }
                });
            },
            close(id) {
                const modals = document.querySelectorAll(".c-modal");
                modals.forEach((modal4) => {
                    if (modal4.id === id) {
                        modal4.classList.remove("active");
                    }
                });
            },
            events(id) {
                const modalId = id.replace("modal__", "");
                const modalElement = document.getElementById(id);
                const userData = auth_default.get();
                const userId = userData.uid;
                const setContent = (html) => {
                    if (modalElement) {
                        const modalContent = modalElement.querySelector(".c-modal__content");
                        modalContent.innerHTML = html;
                    }
                };
                switch (modalId) {
                    case "login":
                        break;
                    case "account":
                        const storageRef = window.firebase.storage().ref();
                        const accountPanel = `<div class="c-accountDetails">
            <div class="c-accountDetails__name">
              Logged in as <strong>${userData.displayName || userData.email}</strong>
            </div>

            <div class="c-accountDetails__actions">
              <button onclick="window.Auth.logout();" class="c-button mdl-button mdl-js-button mdl-button--raised mdl-button--colored">Logout</button>
            </div>
          </div>`;
                        const noContentMessage = `<div class="c-modal__message">
            You don't have any saved stories yet. <br><br>
            <button onclick="Modal.open('modal__templates');" class="c-button--auto mdl-button mdl-js-button mdl-js-ripple-effect">Create one!</button>
          </div>`;
                        storageRef.child(`${window.STORAGE_PATH}user/${userId}/thumbnail-story`).listAll().then((thumbnailResults) => {
                            storageRef.child(`${window.STORAGE_PATH}user/${userId}/data`).listAll().then((results) => {
                                const items = results.items;
                                const itemsThumbnail = thumbnailResults.items;
                                const urlPromises = [];
                                const thumbnailPromises = [];
                                const metadataPromises = [];
                                items.forEach((itemSnapshot) => {
                                    urlPromises.push(itemSnapshot.getDownloadURL());
                                    metadataPromises.push(itemSnapshot.getMetadata());
                                });
                                itemsThumbnail.forEach((itemSnapshot) => {
                                    thumbnailPromises.push(itemSnapshot.getDownloadURL());
                                });
                                Promise.allSettled(urlPromises).then((urlResults) => {
                                    Promise.allSettled(metadataPromises).then((metadataResults) => {
                                        Promise.allSettled(thumbnailPromises).then((thumbnailResults2) => {
                                            utils_default.log("[Modal] Story list results", thumbnailResults2, urlResults, metadataResults);
                                            const thumbnailList = {};
                                            thumbnailResults2.forEach((thumbnailResult) => {
                                                if (thumbnailResult.value) {
                                                    const id2 = thumbnailResult.value.split("thumbnail-story%2F")[1].split(".")[0];
                                                    thumbnailList[id2] = thumbnailResult.value;
                                                }
                                            });
                                            if (modalElement) {
                                                let html = "";
                                                if (urlResults.length > 0) {
                                                    html += '<div class="c-storyList">';
                                                    urlResults.forEach((urlResult, index) => {
                                                        const meta = metadataResults[index] ? metadataResults[index]: urlResult.value;
                                                        const id2 = urlResult.value.split("data%2F")[1].split(".")[0];
                                                        const title = meta ? urlResult.customMetadata : meta.title;
                                                        const date = new Date().toISOString().split(" GMT")[0];
                                                        utils_default.log("[Modal] Url results", urlResult, meta);
                                                        html += `<button onclick="Editor.select('${id2}');" type="button" class="c-storyList__item">

                                    <span class="c-storyList__itemPreview">
                                    ${thumbnailList[id2] ? `<img src="${thumbnailList[id2]}" width="100" />` : "<span>No preview available</span>"}
                                    </span>

                                    <span class="c-storyList__itemTitle">${title || date}</span>
                                  </button>`;
                                                    });
                                                    html += "</div>";
                                                } else {
                                                    html = noContentMessage;
                                                }
                                                html += accountPanel;
                                                setContent(html);
                                            }
                                        });
                                    });
                                });
                            }).catch((error) => {
                                let html = noContentMessage;
                                html += accountPanel;
                                setContent(html);
                            });
                        }).catch((error) => {
                            let html = noContentMessage;
                            html += accountPanel;
                            setContent(html);
                        });
                        break;
                    case "export":
                        if (userId) {
                            editor_default.actions.save();
                            const exportStory = () => {
                                const currentStory = user_default.data.get("currentStoryPost");
                                const content = currentStory.content;
                                const title = currentStory ? currentStory.title.raw : currentStory.title;
                                const filepath = `${window.STORAGE_PATH}user/${userId}/story/${currentStory.storyId}`;
                                const filename = `${filepath}/index.html`;
                                let file = new File([content], "index.html", {
                                    type: "text/html"
                                });
                                console.log("[API] Upload start", filename, title, currentStory);
                                api_default.upload(file, filename, {
                                    customMetadata: {
                                        title
                                    }
                                }).then((snapshot) => {
                                    snapshot.ref.getDownloadURL().then((exportedURL) => {
                                        console.log("[API] Upload complete", filename, exportedURL);
                                        const shareTitle = encodeURIComponent("");
                                        const shareUrl = encodeURIComponent(exportedURL);
                                        const html = `
                    <div class="c-content--left c-content--padding">
                      <p>Copy this link to share anywhere:</p>

                      <div id="export-link-form" class="flex items-center justify-center">
                        <div class="mdl-textfield mdl-js-textfield flex-grow">
                          <input id="export-link" class="mdl-textfield__input" type="text" value="${exportedURL}" readonly id="sample1">
                        </div>

                        <div class="items-center">
                          <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" data-clipboard-target="#export-link">
                            Copy
                          </button>
                        </div>
                      </div>

                      <p class="c-content__title">Or select an option below:</p>
                      <div class="flex justify-between">
                        <div class="items-center">
                          <a onclick="return Utils.popup('sharer', this.href);" href="https://www.facebook.com/dialog/share?app_id=140586622674265&display=popup&href=${shareUrl}" class="c-shareIcon">
                            <svg xmlns="http://www.w3.org/2000/svg"
                            aria-label="Facebook" role="img"
                            viewBox="0 0 512 512"><rect
                            width="512" height="512"
                            rx="15%"
                            fill="#1877f2"/><path d="M355.6 330l11.4-74h-71v-48c0-20.2 9.9-40 41.7-40H370v-63s-29.3-5-57.3-5c-58.5 0-96.7 35.4-96.7 99.6V256h-65v74h65v182h80V330h59.6z" fill="#fff"/></svg>
                          </a>
                          <a onclick="return Utils.popup('sharer', this.href);" href="https://twitter.com/intent/tweet?text=${shareTitle}${shareUrl}&related=" class="c-shareIcon">
                            <svg xmlns="http://www.w3.org/2000/svg"
                            aria-label="Twitter" role="img"
                            viewBox="0 0 512 512"><rect
                            width="512" height="512"
                            rx="15%"
                            fill="#1da1f2"/><path fill="#fff" d="M437 152a72 72 0 01-40 12a72 72 0 0032-40a72 72 0 01-45 17a72 72 0 00-122 65a200 200 0 01-145-74a72 72 0 0022 94a72 72 0 01-32-7a72 72 0 0056 69a72 72 0 01-32 1a72 72 0 0067 50a200 200 0 01-105 29a200 200 0 00309-179a200 200 0 0035-37"/></svg>
                          </a>
                          <a onclick="return Utils.popup('sharer', this.href);" href="https://linkedin.com/sharing/share-offsite/?url=${shareUrl}" class="c-shareIcon">
                            <svg xmlns="http://www.w3.org/2000/svg"
                            aria-label="LinkedIn" role="img"
                            viewBox="0 0 512 512"
                            fill="#fff"><rect
                            width="512" height="512"
                            rx="15%"
                            fill="#0077b5"/><circle cx="142" cy="138" r="37"/><path stroke="#fff" stroke-width="66" d="M244 194v198M142 194v198"/><path d="M276 282c0-20 13-40 36-40 24 0 33 18 33 45v105h66V279c0-61-32-89-76-89-34 0-51 19-59 32"/></svg>
                          </a>
                          <a onclick="return Utils.popup('sharer', this.href);" href="https://api.whatsapp.com/send?text=${shareTitle}${shareUrl}" class="c-shareIcon">
                            <svg xmlns="http://www.w3.org/2000/svg"
                            aria-label="WhatsApp" role="img"
                            viewBox="0 0 512 512"><rect
                            width="512" height="512"
                            rx="15%"
                            fill="#25d366"/><path fill="#25d366" stroke="#fff" stroke-width="26" d="M123 393l14-65a138 138 0 1150 47z"/><path fill="#fff" d="M308 273c-3-2-6-3-9 1l-12 16c-3 2-5 3-9 1-15-8-36-17-54-47-1-4 1-6 3-8l9-14c2-2 1-4 0-6l-12-29c-3-8-6-7-9-7h-8c-2 0-6 1-10 5-22 22-13 53 3 73 3 4 23 40 66 59 32 14 39 12 48 10 11-1 22-10 27-19 1-3 6-16 2-18"/></svg>
                          </a>
                          <a onclick="return Utils.popup('sharer', this.href);" href="https://telegram.me/share/url?url=${shareUrl}&text=${shareTitle}" class="c-shareIcon">
                            <svg xmlns="http://www.w3.org/2000/svg"
                            aria-label="Telegram" role="img"
                            viewBox="0 0 512 512"><rect
                            width="512" height="512"
                            rx="15%"
                            fill="#37aee2"/><path fill="#c8daea" d="M199 404c-11 0-10-4-13-14l-32-105 245-144"/><path fill="#a9c9dd" d="M199 404c7 0 11-4 16-8l45-43-56-34"/><path fill="#f6fbfe" d="M204 319l135 99c14 9 26 4 30-14l55-258c5-22-9-32-24-25L79 245c-21 8-21 21-4 26l83 26 190-121c9-5 17-3 11 4"/></svg>
                          </a>
                        </div>
                        <div class="items-center">
                          <button onClick="window.Editor.actions.download();" class="c-button--big mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
                            Download HTML file
                          </button>
                        </div>
                      </div>
                    </div>
                  `;
                                        setContent(html);
                                    });
                                }).catch(() => {
                                    editor_default.actions.snackBar({
                                        message: "Error while exporting your story. Are you logged in?"
                                    });
                                });
                            };
                            const checkId = () => {
                                window.clearTimeout(window.exportTime);
                                const currentStory = user_default.data.get("currentStoryPost");
                                if (currentStory.storyId) {
                                    console.log("[Story] Is Saved");
                                    exportStory();
                                } else {
                                    console.log("[Story] Not Saved");
                                    window.exportTime = setTimeout(() => {
                                        checkId();
                                    }, 500);
                                }
                            };
                            checkId();
                        }
                        break;
                }
                if (modalElement) {
                    const close = modalElement.querySelector(".c-modal__close");
                    if (close) {
                        close.onclick = () => {
                            Modal.close(modalElement.id);
                        };
                    }
                }
            },
            header(id) {
                let html = (title) => `
        <button class="mdl-button mdl-js-button mdl-button--icon c-modal__close">
          <i class="material-icons">&times;</i>
        </button>
        ${title ? `
        <div class="firebaseui-card-header">
          <span class="firebaseui-title">${title}</span>
        </div>` : ``}
      `;
                const modalElement = document.getElementById(id);
                const modalWindow = modalElement.querySelector(".c-modal__window--withHeader");
                const modalContent = modalElement.querySelector(".c-modal__content");
                const modalHeader = modalElement.querySelector(".c-modal__header");
                if (modalWindow && modalContent && !modalHeader) {
                    const title = modalWindow.getAttribute("title");
                    const div = document.createElement("div");
                    div.className = "c-modal__header";
                    div.innerHTML = html(title);
                    modalContent.parentNode.insertBefore(div, modalContent);
                }
            },
            content(id) {
                let html = null;
                const modalId = id.replace("modal__", "");
                const userData = auth_default.get();
                const userId = userData.uid;
                const loading = `
      <div class="c-modal__loading">
        <img class="c-modal__loadingImage" src="/assets/images/loader.svg" />
        <span>Loading...</span>
      </div>`;
                switch (modalId) {
                    case "export":
                        const downloadButton = `
          <button onClick="window.Editor.actions.download();" class="c-button--cta mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
            Download HTML file
          </button>`;
                        if (!userId) {
                            html = `
              <div class="c-content c-content--center">
                <img alt="Export file" src="/assets/images/undraw_download_files_aydf.svg" height="128"/>

                <p>You can download and edit only 1 story without an account.</p>
                <p>Create an account to upload assets and save multiple stories in the cloud!</p>
              </div>

              ${downloadButton}

              <div class="c-button--spacer">or</div>
              <button onclick="Modal.open('modal__login')" class="c-button--auto mdl-button mdl-js-button mdl-js-ripple-effect">
                Create an account
              </button>
            `;
                        } else {
                            html = loading;
                        }
                        break;
                    case "preview":
                        const currentStory = user_default.data.get("currentStoryPost");
                        const content = currentStory.content;
                        const updatedPreviewLink = `data:text/html,${encodeURIComponent(content)}`;
                        html = `<iframe src="${updatedPreviewLink}" border="0"></iframe>`;
                        break;
                    case "account":
                        html = loading;
                        break;
                    case "upload":
                        if (!userId) {
                            html = `
            <div class="c-content c-content--center c-content--textCenter">
              <img alt="Export file" src="/assets/images/undraw_upload_87y9.svg" height="128"/>

              <p>To upload media files you need to login.</p>

              <button onclick="Modal.open('modal__login')" class="c-button--auto c-button--modal c-button mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-button mdl-js-ripple-effect">
                Create an account
              </button>
            </div>
              `;
                        }
                        break;
                    case "templates":
                        html = "";
                        const availableTemplates = editor_default.availableTemplates;
                        if (availableTemplates.length > 0) {
                            html += '<div class="c-storyList c-storyList--visible">';
                            availableTemplates.forEach((template, index) => {
                                const id2 = template.id;
                                const title = template.name;
                                const thumb = `/assets/images/templates/${id2}.png`;
                                utils_default.log("[Modal] Url results", template);
                                html += `<button onclick="Editor.template('${id2}');" type="button" class="c-storyList__item">

                        <span class="c-storyList__itemPreview">
                        ${thumb ? `<img src="${thumb}" width="100" />` : "<span>No preview available</span>"}
                        </span>

                        <span class="c-storyList__itemTitle">${title}</span>
                      </button>`;
                            });
                            html += "</div>";
                        }
                        break;
                }
                if (html) {
                    const modalElement = document.getElementById(id);
                    const contentWrapper = modalElement ? modalElement.querySelector(".c-modal__content") : null;
                    if (contentWrapper) {
                        contentWrapper.innerHTML = html;
                    }
                    const clipboard2 = new clipboard.default("[data-clipboard-target]");
                    clipboard2.on("success", function(e) {
                        e.clearSelection();
                        editor_default.actions.snackBar({
                            message: "Link copied to your clipboard"
                        });
                    });
                }
            },
            init() {
                window.Modal = Modal;
            }
        };
        return Modal;
    })();

    // www/src/assets/js/@auth.js
    var auth_default = (() => {
        const Auth = {
            get() {
                return user_default.data.get("currentData");
            },
            update() {
                const documentClass = document.documentElement.classList;
                documentClass.remove("s-isPreloading");
                if (Auth.get().uid) {
                    documentClass.remove("s-isUnauthenticated");
                    documentClass.add("s-isAuthenticated");
                } else {
                    documentClass.remove("s-isAuthenticated");
                    documentClass.add("s-isUnauthenticated");
                }
            },
            logout() {
                user_default.data.set("currentStoryPost", null);
                user_default.data.set("currentData", null);
                user_default.data.set("currentInfo", null);
                Auth.update();
                window.App.refresh();
            },
            init() {
                Auth.update();
                var uiConfig = {
                    callbacks: {
                        signInSuccessWithAuthResult: function(authResult, redirectUrl) {
                            utils_default.log("[Auth] SIGN-IN SUCCESS", authResult);
                            utils_default.log("[Auth] SIGN-IN REDIRECT", redirectUrl);
                            user_default.data.set("currentData", {
                                displayName: authResult.user.displayName,
                                email: authResult.user.email,
                                emailVerified: authResult.user.emailVerified,
                                uid: authResult.user.uid,
                                phoneNumber: authResult.user.phoneNumber,
                                photoURL: authResult.user.photoURL,
                                metadata: authResult.user.metadata
                            });
                            user_default.data.set("currentInfo", {
                                isNewUser: authResult.additionalUserInfo.isNewUser,
                                providerId: authResult.additionalUserInfo.providerId,
                                profile: authResult.additionalUserInfo.profile
                            });
                            Auth.update();
                            modal_default.close("modal__login");
                            return false;
                        },
                        signInFailure: function(error) {
                            return false;
                        },
                        uiShown: function() {}
                    },
                    credentialHelper: firebaseui.auth.CredentialHelper.NONE,
                    queryParameterForWidgetMode: "mode",
                    queryParameterForSignInSuccessUrl: "signInSuccessUrl",
                    signInFlow: "popup",
                    signInSuccessUrl: "/",
                    signInOptions: [{
                            provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
                            requireDisplayName: false
                        },
                        firebase.auth.GoogleAuthProvider.PROVIDER_ID
                    ],
                    immediateFederatedRedirect: false,
                    tosUrl: "/terms",
                    privacyPolicyUrl: function() {
                        window.location.assign("/privacy");
                    }
                };
                var ui = new firebaseui.auth.AuthUI(firebase.auth());
                if (ui.isPendingRedirect()) {
                    ui.start("#firebaseui-auth-container", uiConfig);
                } else {
                    ui.start("#firebaseui-auth-container", uiConfig);
                }
                if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
                    ui.start("#firebaseui-auth-container", uiConfig);
                }
                window.Auth = Auth;
            }
        };
        return Auth;
    })();

    // www/src/assets/js/@media.js
    var media_default = (() => {
        const Media = {
            thumbnail(video, callback) {
                let canvas = document.querySelector("#media-canvas");
                let canvasObj = null;
                if (!canvas) {
                    canvasObj = document.createElement("canvas");
                    canvasObj.id = "media-canvas";
                    canvasObj.className = "visuallyHidden";
                    document.body.appendChild(canvasObj);
                } else {
                    canvasObj = canvas;
                }
                canvasObj.width = video.videoWidth;
                canvasObj.height = video.videoHeight;
                utils_default.log("[Media] Canvas draw", video, 0, 0, video.videoWidth, video.videoHeight);
                canvasObj.getContext("2d").drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
                video.hasThumbnail = true;
                canvasObj.toBlob(function(blob) {
                    callback(blob);
                    const canvasElement = document.querySelector("#media-canvas");
                    canvasElement.parentNode.removeChild(canvasElement);
                }, "image/jpeg");
            },
            reader(file, callback) {
                utils_default.log("[Media] Reader read", file, file.type);
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function(e) {
                    const result = e.target.result;
                    utils_default.log("[Media] Reader read result", file.type);
                    if (file.type.indexOf("image") !== -1) {
                        const image = new Image();
                        image.src = result;
                        image.onload = function() {
                            const height = image.height;
                            const width = image.width;
                            callback(file, {
                                data: result,
                                width,
                                height
                            });
                        };
                    } else if (file.type.indexOf("video") !== -1) {
                        const video = document.createElement("video");
                        video.className = "visuallyHidden";
                        video.setAttribute("src", result);
                        video.style.width = "auto";
                        video.style.height = "auto";
                        video.hasThumbnail = false;
                        utils_default.log("[Media] Reader read video create", file.type);
                        document.body.appendChild(video);
                        const seekTo = 1;
                        video.addEventListener("loadeddata", function(e2) {
                            if (video.duration < seekTo) {
                                return;
                            }
                            setTimeout(() => {
                                video.currentTime = seekTo;
                            }, 200);
                            video.addEventListener("seeked", () => {
                                if (!video.hasThumbnail) {
                                    utils_default.log("[Media] Reader read callback meta", video.videoWidth, video.videoHeight);
                                    const height = video.videoHeight;
                                    const width = video.videoWidth;
                                    const duration = video.duration;
                                    Media.thumbnail(video, (thumbnail) => {
                                        callback(file, {
                                            data: result,
                                            width,
                                            height,
                                            duration,
                                            thumbnail
                                        });
                                        video.parentNode.removeChild(video);
                                    });
                                }
                            });
                        });
                    } else {
                        callback(false);
                    }
                };
            },
            prepare(file, onSuccess, onError) {
                const userData = auth_default.get();
                const userId = userData.uid;
                const fileName = file.name;
                const fileType = file.type;
                utils_default.log("[Media] File", file);
                Media.reader(file, (fileMedia, fileObject) => {
                    utils_default.log("[Media] Reader callback", fileMedia, fileObject);
                    const uploadMedia = (thumbnailPath, downloadURLThumbnail) => {
                        const meta = {
                            customMetadata: {
                                width: fileObject.width,
                                height: fileObject.height
                            }
                        };
                        if (downloadURLThumbnail) {
                            meta.customMetadata.thumbnail = downloadURLThumbnail;
                            meta.customMetadata.thumbnailPath = thumbnailPath;
                        }
                        if (fileObject.duration) {
                            meta.customMetadata.duration = fileObject.duration;
                        }
                        api_default.upload(file, `${window.STORAGE_PATH}user/${userId}/media/${fileName}`, meta).then((snapshot) => {
                            utils_default.log("[Media] Uploader settled", snapshot);
                            snapshot.ref.getDownloadURL().then((downloadURL) => {
                                utils_default.log("[Media] Upload url", downloadURL);
                                const upload = {
                                    imageUrl: downloadURL,
                                    meta: {
                                        name: fileName,
                                        thumbnail: downloadURLThumbnail,
                                        contentType: fileType,
                                        ...meta
                                    }
                                };
                                onSuccess(upload);
                            }).catch((error) => {
                                onError(error);
                            });
                        }).catch((error) => {
                            onError(error);
                        });
                    };
                    if (fileMedia) {
                        if (fileObject.thumbnail) {
                            const thumbnailPath = `${window.STORAGE_PATH}user/${userId}/thumbnail/${fileName}.jpg`;
                            api_default.upload(fileObject.thumbnail, thumbnailPath).then((snapshot) => {
                                snapshot.ref.getDownloadURL().then((downloadURLThumbnail) => {
                                    uploadMedia(thumbnailPath, downloadURLThumbnail);
                                });
                            });
                        } else {
                            uploadMedia();
                        }
                    } else {
                        onError();
                    }
                });
            },
            uploader(options) {
                const callbacks = {};
                const lastUpload = {};
                const triggerEvent = (name2) => {
                    utils_default.log("[Media] Trigger", name2);
                    if (callbacks[name2]) {
                        callbacks[name2]();
                    }
                };
                return {
                    on(event, callback) {
                        callbacks[event] = callback;
                    },
                    open() {
                        const userData = auth_default.get();
                        const userId = userData.uid;
                        if (!userId) {
                            return modal_default.open("modal__upload");
                        }
                        let uploader = null;
                        const mediaUploader = document.querySelector("#media-uploader");
                        if (!mediaUploader) {
                            uploader = document.createElement("input");
                            uploader.type = "file";
                            uploader.className = "visuallyHidden";
                            uploader.id = "media-uploader";
                            document.body.appendChild(uploader);
                        } else {
                            uploader = mediaUploader;
                        }
                        if (uploader) {
                            uploader.click();
                            uploader.onchange = () => {
                                Media.prepare(uploader.files[0], (upload) => {
                                    lastUpload.imageUrl = upload.imageUrl;
                                    lastUpload.meta = upload.meta;
                                    triggerEvent("select");
                                    triggerEvent("close");
                                }, () => {
                                    triggerEvent("close");
                                });
                            };
                        }
                    },
                    state() {
                        return {
                            get(what) {
                                utils_default.log("[Media] State get", what);
                                if (what === "selection") {
                                    return {
                                        first() {
                                            utils_default.log("[Media] State first");
                                            return {
                                                toJSON() {
                                                    const uploadJSON = api_default.objects.upload(lastUpload.imageUrl, lastUpload.meta);
                                                    utils_default.log("[Media] Upload JSON", uploadJSON);
                                                    return uploadJSON;
                                                }
                                            };
                                        }
                                    };
                                }
                            }
                        };
                    }
                };
            },
            init() {
                if (window.wp) {
                    wp.media = Media.uploader;
                }
            }
        };
        return Media;
    })();

    // www/src/assets/js/@api.js
    const html2canvas = __toModule(require_html2canvas());
    var api_default = (() => {
        const API = {
            format: {
                storyPost(story) {
                    const currentStoryPost = user_default.data.get("currentStoryPost");
                    utils_default.log("[API] Format storyPost", story, currentStoryPost);
                    if (currentStoryPost.id) {
                        story.storyId = currentStoryPost.id;
                    } else if (currentStoryPost.storyId) {
                        story.storyId = currentStoryPost.storyId;
                    }
                    if (currentStoryPost.title && !currentStoryPost || currentStoryPost.title || currentStoryPost.title.raw) {
                        currentStoryPost.title = {
                            raw: currentStoryPost.title
                        };
                    }
                    return story;
                }
            },
            objects: {
                story(post) {
                    return {
                        title: {
                            raw: post.title
                        },
                        status: post.status,
                        author: post.author,
                        slug: post.slug,
                        date_gmt: post.date_gmt,
                        modified: post.modified,
                        excerpt: {
                            raw: post.excerpt
                        },
                        link: post.link,
                        story_data: post.storyDataRaw,
                        featured_media: post.featuredMedia,
                        featured_media_url: post.featuredMediaUrl,
                        publisher_logo_url: post.publisherLogoUrl,
                        permalink_template: post.permalinkTemplate,
                        style_presets: post.stylePresets,
                        password: post.password
                    };
                },
                upload(imageUrl, meta) {
                    const width = meta ? meta.width : meta.customMetadata ? meta.width : 200;
                const height = meta ? meta.height : meta.customMetadata ? meta.height : 200;
                const duration = meta ? meta.duration : meta.customMetadata ? meta.duration : 0;
                const fileSize = meta ? meta.size : 0;
                const filename = meta.name;
                const contentType = meta ? meta.contentType:"";
                const date = meta ? meta.timeCreated:"";
                const modified = meta ? meta.updated:"";
                const id = meta ? meta.md5Hash : imageUrl;
                const thumbnail = meta ? meta.thumbnail : meta.customMetadata ? meta.thumbnail : imageUrl;
                const link = imageUrl;
                const slug = `${id}-${filename}`.replace(/ /gi, "-");
                const mediaType = contentType ? contentType.split("/")[0] : "image";
                const extension = `${filename}`.split(".").pop();
                const orientation = "landscape";
                const size = meta ? contentType.size : 100;
                    const thumbObject = thumbnail ? {
                        src: thumbnail,
                        width,
                        height,
                        generated: true
                    } : {};
                    utils_default.log("[Upload] Single", imageUrl, width, height);
                    return {
                        uploading: false,
                        date,
                        filename: name,
                        menuOrder: 0,
                        uploadedTo: 0,
                        type: mediaType,
                        subtype: extension,
                        id,
                        title: filename,
                        url: imageUrl,
                        link,
                        alt: "",
                        author: "1",
                        description: "",
                        caption: "",
                        name: slug,
                        status: "inherit",
                        modified,
                        mime: contentType,
                        icon: "",
                        dateFormatted: date,
                        nonces: {
                            update: "b1d9bf6f20",
                            delete: "3e0b632e87",
                            edit: "576b4c46ae"
                        },
                        editLink: "",
                        meta: false,
                        authorName: "admin",
                        filesizeInBytes: size,
                        filesizeHumanReadable: `${size}`,
                        context: "",
                        height: width,
                        width: height,
                        orientation,
                        featured_media_src: thumbObject,
                        media_details: thumbnail ? {
                            filesize: fileSize,
                            mime_type: contentType,
                            length: duration,
                            length_formatted: utils_default.formatTime(duration),
                            width,
                            height,
                            fileformat: extension,
                            audio: {
                                dataformat: extension,
                                codec: "ISO/IEC 14496-3 AAC",
                                sample_rate: 48e3,
                                channels: 2,
                                bits_per_sample: 16,
                                lossless: false,
                                channelmode: "stereo"
                            },
                            created_timestamp: date,
                            sizes: {}
                        } : {},
                        sizes: {},
                        compat: {
                            item: "",
                            meta: ""
                        }
                    };
                },
                storyPost(id, template) {
                    if (id === "current") {
                        const story = user_default.data.get("currentStoryPost") || API.objects.storyPost();
                        if (!story.title) {
                            story.title = {
                                raw: ""
                            };
                        }
                        if (!story.excerpt) {
                            story.excerpt = {
                                raw: ""
                            };
                        }
                        if (story.title && !story || story.title || story.title.raw) {
                            story.title = {
                                raw: story.title
                            };
                        }
                        story.permalink_template = "https://webstories.io/story/%pagename%";
                        user_default.data.set("currentStoryPost", story);
                        return story;
                    } else {
                        return editor_default.new();
                    }
                },
                uploadPost(imageUrl, meta) {
                    const width = meta ? meta.width : meta.customMetadata ? meta.width : 200;
                const height = meta ? meta.height : meta.customMetadata ? meta.height : 200;
                const duration = meta ? meta.duration : meta.customMetadata ? meta.duration : 0;
                const fileSize = meta ? meta.size : 0;
                const filename = meta.name;
                const contentType = meta ? meta.contentType:"";
                const date = meta ? meta.timeCreated:"";
                const modified = meta ? meta.updated:"";
                const id = meta ? meta.md5Hash : imageUrl;
                const thumbnail = meta ? meta.thumbnail : meta.customMetadata ? meta.thumbnail : imageUrl;
                const link = imageUrl;
                const slug = `${id}-${filename}`.replace(/ /gi, "-");
                const mediaType = contentType ? contentType.split("/")[0] : "image";
                const extension = `${filename}`.split(".").pop();
                const orientation = "landscape";
                    const thumbObject = thumbnail ? {
                        src: thumbnail,
                        width,
                        height,
                        generated: true
                    } : {};
                    utils_default.log("[Upload] Post", imageUrl, width, height);
                    return {
                        id,
                        date,
                        date_gmt: date,
                        guid: {
                            rendered: imageUrl,
                            raw: imageUrl
                        },
                        modified,
                        modified_gmt: modified,
                        slug,
                        status: "inherit",
                        type: "attachment",
                        link,
                        title: {
                            raw: filename,
                            rendered: filename
                        },
                        author: 1,
                        featured_media: 0,
                        comment_status: "open",
                        ping_status: "closed",
                        template: "",
                        meta: {
                            web_stories_is_poster: false,
                            web_stories_poster_id: 0
                        },
                        permalink_template: link,
                        generated_slug: slug,
                        media_source: "editor",
                        description: {
                            raw: "",
                            rendered: ""
                        },
                        caption: {
                            raw: "",
                            rendered: ""
                        },
                        alt_text: "",
                        media_type: mediaType,
                        mime_type: contentType,
                        featured_media_src: thumbObject,
                        media_details: thumbnail ? {
                            filesize: fileSize,
                            length: duration,
                            length_formatted: utils_default.formatTime(duration),
                            mime_type: contentType,
                            width,
                            height,
                            fileformat: extension,
                            created_timestamp: date,
                            sizes: {}
                        } : {
                            width,
                            height,
                            file: imageUrl,
                            sizes: {
                                full: {
                                    file: filename,
                                    width,
                                    height,
                                    mime_type: contentType,
                                    source_url: imageUrl
                                }
                            }
                        },
                        source_url: imageUrl,
                        missing_image_sizes: []
                    };
                }
            },
            middlewares() {
                return {
                    "/web-stories/v1/web-story/22?context=edit": {
                        body: API.objects.storyPost("current"),
                        headers: {
                            Link: '<http://localhost:8899/?post_type=web-story&p=22>; rel="alternate"; type=text/html'
                        }
                    },
                    "/web-stories/v1/media?context=edit&per_page=100&page=1&_web_stories_envelope=true": {
                        body: {
                            body: [],
                            status: 200,
                            headers: {
                                "X-WP-Total": 4,
                                "X-WP-TotalPages": 1
                            }
                        },
                        headers: []
                    },
                    "/web-stories/v1/web-story/22": {
                        body: API.objects.storyPost("current"),
                        headers: {
                            Link: '<http://localhost:8899/?post_type=web-story&p=22>; rel="alternate"; type=text/html'
                        }
                    }
                };
            },
            refreshEditURL() {},
            upload(file, path, meta) {
                const storageRef = window.firebase.storage().ref();
                const mediaRef = storageRef.child(path);
                utils_default.log("[API] Upload", file, path, meta);
                return meta ? mediaRef.put(file, meta) : mediaRef.put(file);
            },
            fetch(...args) {
                const params = args[0];
                const pathMiddleware = params.path && API.middlewares()[params.path];
                const userData = auth_default.get();
                const userId = userData.uid;
                utils_default.log("[API] Request", params.path, params, userId);
                return new Promise((resolve, reject) => {
                    if (params.path.indexOf("/web-stories/v1/web-story/22") !== -1 && params.method === "GET") {
                        utils_default.log("[API] Get Story", params.path, params);
                        resolve(API.objects.storyPost("current"));
                    } else if (params.path.indexOf("/web-stories/v1/web-story/22") !== -1 && params.method === "POST") {
                        utils_default.log("[API] Save Story", params.path, { ...params.data
                        });
                        const data = API.format.storyPost(params.data);
                        const title = data.title ? data.title.raw : data.title;
                        utils_default.log("[API] Save Story Data", params.path, { ...data
                        });
                        user_default.data.set("currentStoryPost", data);
                        if (params.path.indexOf("/autosaves") !== -1 || !userId) {
                            editor_default.actions.snackBar({
                                message: "Changes saved locally"
                            });
                            resolve(data);
                        } else {
                            utils_default.log("[API] Get first page preview", data, data.storyId);
                            const firstPagePreview = document.querySelector('[class*="carousel__ItemContainer"] [class*="reorderableItem__Container"] button:first-child > div');
                            const filename = `${data.storyId.split(`-`)[1]}`;
                            utils_default.log("[API] Get first page preview 2", filename);
                            if (firstPagePreview) {
                                utils_default.log("[API] Shot page preview", firstPagePreview);
                                html2canvas.default(firstPagePreview, {
                                    useCORS: true,
                                    allowTaint: true,
                                    scale: 15,
                                    backgroundColor: null
                                }).then(function(canvas) {
                                    utils_default.log("[API] first page preview shot", canvas);
                                    canvas.className = "visuallyHidden";
                                    canvas.crossorigin = "anonymous";
                                    canvas.toBlob((blob) => {
                                        API.upload(blob, `${window.STORAGE_PATH}user/${userId}/thumbnail-story/${filename}.jpg`).then((status) => {
                                            utils_default.log("[API] Upload story thumb", status);
                                        });
                                    }, "image/jpeg", 0.8);
                                });
                            }
                            const file = new File([JSON.stringify(data)], `${filename}.json`, {
                                type: "application/json",
                                lastModified: new Date().getTime()
                            });
                            API.upload(file, `${window.STORAGE_PATH}user/${userId}/data/${filename}.json`, {
                                customMetadata: {
                                    title
                                }
                            }).then((status) => {
                                utils_default.log("[API] Upload", filename, status);
                                editor_default.actions.snackBar({
                                    message: "Story successfully saved"
                                });
                                resolve(data);
                            }).catch(() => {
                                reject({
                                    message: "Error while saving data. Are you logged in?"
                                });
                            });
                        }
                    } else if (params.path === "/web-stories/v1/media" && params.method === "POST") {
                        utils_default.log("[API] Upload image", params.path, params.body.entries());
                        for (const p of params.body.entries()) {
                            if (p[0] === "file") {
                                const file = p[1];
                                media_default.prepare(file, (upload) => {
                                    utils_default.log("[API] Upload success", upload);
                                    resolve(API.objects.uploadPost(upload.imageUrl, upload.meta));
                                }, () => {
                                    utils_default.log("[API] Upload reject");
                                    reject({
                                        message: "Error while uploading file. Are you logged in?"
                                    });
                                });
                            }
                        }
                    } else if (params.path.indexOf("/web-stories/v1/media") !== -1) {
                        utils_default.log("[API] List media", params.path);
                        const storageRef = window.firebase.storage().ref();
                        storageRef.child(`${window.STORAGE_PATH}user/${userId}/media`).listAll().then((results) => {
                            const items = results.items;
                            const urlPromises = [];
                            const metadataPromises = [];
                            items.forEach((itemSnapshot) => {
                                urlPromises.push(itemSnapshot.getDownloadURL());
                                metadataPromises.push(itemSnapshot.getMetadata());
                            });
                            Promise.allSettled(urlPromises).then((urlResults) => {
                                Promise.allSettled(metadataPromises).then((metadataResults) => {
                                    const apiResult = {
                                        body: [],
                                        status: 200,
                                        headers: {
                                            "X-WP-Total": items.length,
                                            "X-WP-TotalPages": 1
                                        }
                                    };
                                    utils_default.log("[API] List media meta", metadataResults);
                                    urlResults.forEach(({
                                        value
                                    }, index) => {
                                        apiResult.body.push(API.objects.uploadPost(value, metadataResults[index].value));
                                    });
                                    utils_default.log("[API] List media result", apiResult);
                                    resolve(apiResult);
                                });
                            });
                        }).catch((error) => {
                            reject({
                                message: "Error while listing media files. Are you logged in?"
                            });
                        });
                    } else if (pathMiddleware) {
                        resolve(pathMiddleware.body);
                    } else {
                        reject();
                    }
                });
            },
            init() {
                window.APIManager = API;
                window.API = API.fetch;
            }
        };
        API.init();
        return API;
    })();

    // www/src/assets/js/@services.js
    var services_default = (() => {
        const Services = {
            init() {
                var firebaseConfig = {
                    apiKey: "AIzaSyD6NNcn0mGCoIT_1o6kWDb0dGEo42eSiaM",
                    authDomain: "webstories.io",
                    databaseURL: "https://r82-corp.firebaseio.com",
                    projectId: "r82-corp",
                    storageBucket: "public.rcorp.xyz",
                    messagingSenderId: "512095715240",
                    appId: "1:512095715240:web:637362630566e357ef679d",
                    measurementId: "G-BLWGKR29TX"
                };
                firebase.initializeApp(firebaseConfig);
                firebase.analytics();
            }
        };
        return Services;
    })();

    // www/src/assets/js/app.js
    if (typeof window !== "undefined") {
        window.STORAGE_PATH = "webstories/";
    }
    const App = {
        actions() {
            const html = `
      <button onclick="Modal.open('modal__login')" class="c-header__actionsButton s-showUnauthenticated">
        <svg class="c-icon" xmlns="http://www.w3.org/2000/svg" height="24" viewbox="0 0 24 24" width="24">
          <g>
            <rect fill="none" height="24" width="24"/>
          </g>
          <g>
            <path d="M11,7L9.6,8.4l2.6,2.6H2v2h10.2l-2.6,2.6L11,17l5-5L11,7z M20,19h-8v2h8c1.1,0,2-0.9,2-2V5c0-1.1-0.9-2-2-2h-8v2h8V19z"/>
          </g>
        </svg>
        <span>Login</span>
      </button>

      <button onclick="Modal.open('modal__account')" class="c-header__actionsButton s-showAuthenticated">
        <svg class="c-icon" xmlns="http://www.w3.org/2000/svg" height="24" viewbox="0 0 24 24" width="24">
          <path d="M0 0h24v24H0V0z" fill="none"/>
          <path d="M10.25 13c0 .69-.56 1.25-1.25 1.25S7.75 13.69 7.75 13s.56-1.25 1.25-1.25 1.25.56 1.25 1.25zM15 11.75c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zm7 .25c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2s10 4.48 10 10zM10.66 4.12C12.06 6.44 14.6 8 17.5 8c.46 0 .91-.05 1.34-.12C17.44 5.56 14.9 4 12 4c-.46 0-.91.05-1.34.12zM4.42 9.47c1.71-.97 3.03-2.55 3.66-4.44C6.37 6 5.05 7.58 4.42 9.47zM20 12c0-.78-.12-1.53-.33-2.24-.7.15-1.42.24-2.17.24-3.13 0-5.92-1.44-7.76-3.69C8.69 8.87 6.6 10.88 4 11.86c.01.04 0 .09 0 .14 0 4.41 3.59 8 8 8s8-3.59 8-8z"/>
        </svg>
        <span>My Stories</span>
      </button>

      <button onclick="Modal.open('modal__templates');" class="c-header__actionsButton">
        <svg class="c-icon" xmlns="http://www.w3.org/2000/svg" height="24" viewbox="0 0 24 24" width="24">
          <path d="M0 0h24v24H0V0z" fill="none"/>
          <path d="M11.99 18.54l-7.37-5.73L3 14.07l9 7 9-7-1.63-1.27zM12 16l7.36-5.73L21 9l-9-7-9 7 1.63 1.27L12 16zm0-11.47L17.74 9 12 13.47 6.26 9 12 4.53z"/>
        </svg>
        <span>New Story</span>
      </button>

      <button onclick="Editor.actions.preview();" class="c-header__actionsButton">
        <svg class="c-icon" xmlns="http://www.w3.org/2000/svg" height="24" viewbox="0 0 24 24" width="24">
          <path d="M0 0h24v24H0V0z" fill="none"/>
          <path d="M12 6.5c3.79 0 7.17 2.13 8.82 5.5-1.65 3.37-5.02 5.5-8.82 5.5S4.83 15.37 3.18 12C4.83 8.63 8.21 6.5 12 6.5m0-2C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zm0 5c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5m0-2c-2.48 0-4.5 2.02-4.5 4.5s2.02 4.5 4.5 4.5 4.5-2.02 4.5-4.5-2.02-4.5-4.5-4.5z"/>
        </svg>
        <span>Preview</span>
      </button>

      <button onclick="Editor.actions.save();" class="c-header__actionsButton">
        <svg class="c-icon" xmlns="http://www.w3.org/2000/svg" height="24" viewbox="0 0 24 24" width="24">
          <path d="M0 0h24v24H0V0z" fill="none"/>
          <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm2 16H5V5h11.17L19 7.83V19zm-7-7c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zM6 6h9v4H6z"/>
        </svg>
        <span>Save</span>
      </button>

      <button onclick="Modal.open('modal__export')" class="c-header__actionsButton c-header__actionsButton--primary">
        <svg class="c-icon" xmlns="http://www.w3.org/2000/svg" height="24" viewbox="0 0 24 24" width="24">
          <path d="M0 0h24v24H0z" fill="none"/>
          <path d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67l2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2z"/>
        </svg>
        <span>Export</span>
      </button>
    `;
            const headerActions = document.querySelector(".c-header__actions");
            if (!headerActions.firstElementChild) {
                headerActions.innerHTML = html;
            }
        },
        welcome() {
            const welcome = user_default.data.get("welcome");
            modal_default.close("modal__welcome");
            if (!welcome) {
                modal_default.open("modal__templates");
                user_default.data.set("welcome", true);
            }
            const ctaLink = document.querySelector("#modal__welcome .c-button--cta");
            if (ctaLink) {
                ctaLink.textContent = ctaLink.getAttribute("data-text");
            }
            auth_default.update();
        },
        refresh() {
            window.location.reload();
        },
        init() {
            const welcome = user_default.data.get("welcome");
            modal_default.init();
            services_default.init();
            media_default.init();
            api_default.init();
            auth_default.init();
            user_default.init();
            App.actions();
            if (!welcome) {
                modal_default.open("modal__welcome");
            } else {
                App.welcome();
            }
        }
    };
    document.addEventListener("DOMContentLoaded", function(event) {
        window.App = App;
        window.Editor = editor_default;
        App.init();
    });
})();