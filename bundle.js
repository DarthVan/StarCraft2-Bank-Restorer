/*!
 * sc2-bank-generator - v1.0.0
 * Compiled Fri, 21 Apr 2023 22:28:27 UTC
 */
(function (React, mobxReactLite, require$$0, filesaver, mobx, mui) {
	'use strict';

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	var jsxRuntime = {exports: {}};

	var reactJsxRuntime_production_min = {};

	/**
	 * @license React
	 * react-jsx-runtime.production.min.js
	 *
	 * Copyright (c) Facebook, Inc. and its affiliates.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	var hasRequiredReactJsxRuntime_production_min;

	function requireReactJsxRuntime_production_min () {
		if (hasRequiredReactJsxRuntime_production_min) return reactJsxRuntime_production_min;
		hasRequiredReactJsxRuntime_production_min = 1;
	var f=React,k=Symbol.for("react.element"),l=Symbol.for("react.fragment"),m=Object.prototype.hasOwnProperty,n=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:!0,ref:!0,__self:!0,__source:!0};
		function q(c,a,g){var b,d={},e=null,h=null;void 0!==g&&(e=""+g);void 0!==a.key&&(e=""+a.key);void 0!==a.ref&&(h=a.ref);for(b in a)m.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps,a)void 0===d[b]&&(d[b]=a[b]);return {$$typeof:k,type:c,key:e,ref:h,props:d,_owner:n.current}}reactJsxRuntime_production_min.Fragment=l;reactJsxRuntime_production_min.jsx=q;reactJsxRuntime_production_min.jsxs=q;
		return reactJsxRuntime_production_min;
	}

	{
	  jsxRuntime.exports = requireReactJsxRuntime_production_min();
	}

	var jsxRuntimeExports = jsxRuntime.exports;

	var createRoot;

	var m = require$$0;
	{
	  createRoot = m.createRoot;
	  m.hydrateRoot;
	}

	const APP_VERSION = '1.04 (20.04.2023)';
	const CHECK_UPDATES_DELAY = 3600000;
	const TOTAL_BG_PICTURES = 4;
	const CHANGE_BG_DELAY = 120000;

	function r(min, max) {
	    return Math.round(Math.random() * (max - min + 1) - 0.5) + min;
	}
	function t2n(value = '00:10:00') {
	    const a = value.split(':');
	    return parseInt(a[0]) * 3600 + parseInt(a[1]) * 60 + parseInt(a[2]);
	}
	function n2t(value) {
	    return new Date(1000 * value).toISOString().substring(11, 19);
	}
	function dateID(removeSymbols = 2) {
	    return (Date.now() + Math.random()).toString(32).replace('.', '').substring(removeSymbols).toUpperCase();
	}
	function copyTextToClipboard(data, log) {
	    window.navigator['clipboard'].writeText(data).then(() => {
	        if (log)
	            console.log('Copied to clipboard:\n' + data);
	    });
	}
	function downloadTextAsFile(data, fileName, log) {
	    const blob = new Blob([data], { type: 'application/octet-stream' });
	    filesaver.saveAs(blob, fileName);
	    if (log)
	        console.log('download bank file:' + data);
	}

	const Slideshow = (props) => {
	    const ref = React.useRef(null);
	    let { type } = props;
	    if (!type)
	        type = 'random';
	    let n = 0;
	    const nextBG = (n, ref, type) => {
	        n = type == 'random' ? r(1, TOTAL_BG_PICTURES) : n > TOTAL_BG_PICTURES ? 1 : n + 1;
	        ref.current.style.backgroundImage = "url('./assets/images/backgrounds/bg" + n + ".jpg')";
	        return n;
	    };
	    React.useEffect(() => {
	        n = nextBG(n, ref, type);
	        const interval = window.setInterval(() => {
	            n = nextBG(n, ref, type);
	        }, CHANGE_BG_DELAY);
	        return () => window.clearInterval(interval);
	    }, []);
	    return (jsxRuntimeExports.jsx("div", { className: 'Slideshow', ref: ref, children: props.children }));
	};
	var Slideshow$1 = React.memo(Slideshow);

	class BasicStore {
	    constructor() {
	        this.init();
	        mobx.makeAutoObservable(this);
	    }
	    reset() {
	    }
	    init() {
	    }
	}

	class AccountStore extends BasicStore {
	    reset() {
	        this.list = [{ id: 'DEFAULT', name: 'Noob', playerID: '' }];
	        this.current = 'DEFAULT';
	        localStorage.setItem("AccountData", JSON.stringify({ list: this.list, selected: this.current }));
	    }
	    add(name = '', playerID = '') {
	        const account = { id: dateID(), name, playerID };
	        this.list = [...this.list, account];
	        localStorage.setItem("AccountData", JSON.stringify({ list: this.list, selected: this.current }));
	        return account;
	    }
	    change(id, params) {
	        for (let i = 0; i < this.list.length; i++) {
	            const account = this.list[i];
	            if (account.id == id) {
	                if (params.name)
	                    account.name = params.name;
	                if (params.playerID)
	                    account.playerID = params.playerID;
	                break;
	            }
	        }
	        this.list = [...this.list];
	        localStorage.setItem("AccountData", JSON.stringify({ list: this.list, selected: this.current }));
	    }
	    remove(id) {
	        if (this.list.length <= 1)
	            return;
	        this.list = this.list.filter((account) => account.id != id);
	        if (this.current == id)
	            this.current = this.list[0].id;
	        localStorage.setItem("AccountData", JSON.stringify({ list: this.list, selected: this.current }));
	    }
	    setSelected(value) {
	        this.current = value;
	        localStorage.setItem("AccountData", JSON.stringify({ list: this.list, selected: this.current }));
	    }
	    get currentAccount() {
	        for (let i = 0; i < this.list.length; i++)
	            if (this.list[i].id == this.current)
	                return this.list[i];
	        return null;
	    }
	    init() {
	        const json = JSON.parse(localStorage.getItem("AccountData"));
	        this.list = json?.list;
	        if (!this.list || !this.list.length)
	            this.reset();
	        this.current = json?.selected;
	        if (!this.current)
	            this.setSelected(this.list[0].id);
	    }
	}

	class MapStore extends BasicStore {
	    reset() {
	        this.list = {};
	        localStorage.removeItem("MapsData");
	    }
	    setMapData(accountID, mapID, data) {
	        this.list[accountID] = { ...this.list[accountID], [mapID]: data };
	        localStorage.setItem("MapsData", JSON.stringify(this.list));
	    }
	    clearMapData(accountID, mapID) {
	        if (mapID) {
	            if (!this.list[accountID]?.[mapID])
	                return;
	            this.list[accountID][mapID] = null;
	            delete (this.list[accountID][mapID]);
	        }
	        else {
	            this.list[accountID] = null;
	            delete (this.list[accountID]);
	        }
	        localStorage.setItem("MapsData", JSON.stringify(this.list));
	    }
	    init() {
	        this.list = JSON.parse(localStorage.getItem("MapsData")) || {};
	    }
	}

	class MenuStore extends BasicStore {
	    reset() {
	        localStorage.removeItem("PlayerID");
	        this.playerID = '';
	        localStorage.removeItem("SelectedMap");
	        this.selectedMap = 0;
	        localStorage.removeItem("AutoSave");
	        this.autoSave = true;
	        localStorage.removeItem("Sounds");
	        this.sounds = true;
	    }
	    setPlayerID(value) {
	        this.playerID = value;
	        localStorage.setItem("PlayerID", value);
	    }
	    setSelectedMap(value) {
	        this.selectedMap = value;
	        localStorage.setItem("SelectedMap", value.toString());
	    }
	    setAutoSave(value) {
	        this.autoSave = value;
	        localStorage.setItem("AutoSave", value ? 'true' : 'false');
	    }
	    setSounds(value) {
	        this.sounds = value;
	        localStorage.setItem("Sounds", value ? 'true' : 'false');
	    }
	    init() {
	        this.playerID = localStorage.getItem("PlayerID") || '';
	        this.selectedMap = parseInt(localStorage.getItem("SelectedMap")) || 0;
	        this.autoSave = localStorage.getItem("AutoSave") == 'false' ? false : true;
	        this.sounds = localStorage.getItem("Sounds") == 'false' ? false : true;
	    }
	}

	var Modals;
	(function (Modals) {
	    Modals[Modals["NONE"] = 0] = "NONE";
	    Modals[Modals["HELP"] = 1] = "HELP";
	    Modals[Modals["WARN"] = 2] = "WARN";
	    Modals[Modals["CONFIRM"] = 3] = "CONFIRM";
	    Modals[Modals["ACCOUNTS"] = 4] = "ACCOUNTS";
	    Modals[Modals["UPDATES"] = 5] = "UPDATES";
	})(Modals || (Modals = {}));
	class ModalStore extends BasicStore {
	    setModal(id, message, actions, data) {
	        this.current = Modals[id];
	        this.message = message;
	        if (id == "NONE") {
	            this.actions = [];
	            this.data = null;
	            return;
	        }
	        this.actions = actions;
	        this.data = data;
	    }
	    reset() {
	        this.current = 0;
	        localStorage.removeItem("FirstHelp");
	    }
	    init() {
	        if (localStorage.getItem("FirstHelp") == 'true') {
	            this.current = Modals.NONE;
	            return;
	        }
	        this.current = Modals.HELP;
	        localStorage.setItem("FirstHelp", 'true');
	    }
	}

	const rootStore = {
	    accountStore: new AccountStore(),
	    mapStore: new MapStore(),
	    menuStore: new MenuStore(),
	    modalStore: new ModalStore()
	};

	const storeContext = React.createContext(null);
	const StoreProvider = ({ children }) => {
	    const store = mobxReactLite.useLocalObservable(() => rootStore);
	    return jsxRuntimeExports.jsx(storeContext.Provider, { value: store, children: children });
	};
	const useStore = () => {
	    const store = React.useContext(storeContext);
	    if (!store)
	        throw new Error('useStore must be used within a StoreProvider.');
	    return store;
	};

	const Button = (props) => {
	    return (jsxRuntimeExports.jsx("button", { className: 'Button', style: props.style, onClick: (e) => { e.stopPropagation(); e.preventDefault(); props.onClick(); }, children: props.children }));
	};
	var Button$1 = React.memo(Button);

	const Text = (props) => {
	    return (jsxRuntimeExports.jsx("span", { className: 'Text', style: props.style, children: props.children }));
	};
	var Text$1 = React.memo(Text);

	var dist = {};

	var ga4 = {};

	var gtag = {};

	(function (exports) {

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports["default"] = void 0;
		var gtag = function gtag() {
		  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
		    args[_key] = arguments[_key];
		  }
		  if (typeof window !== "undefined") {
		    var _window;
		    if (typeof window.gtag === "undefined") {
		      window.dataLayer = window.dataLayer || [];
		      window.gtag = function gtag() {
		        window.dataLayer.push(arguments);
		      };
		    }
		    (_window = window).gtag.apply(_window, args);
		  }
		};
		var _default = gtag;
		exports["default"] = _default; 
	} (gtag));

	var format = {};

	(function (exports) {

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports["default"] = format;
		var smallWords = /^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|vs?\.?|via)$/i;
		function toTitleCase(string) {
		  return string.toString().trim().replace(/[A-Za-z0-9\u00C0-\u00FF]+[^\s-]*/g, function (match, index, title) {
		    if (index > 0 && index + match.length !== title.length && match.search(smallWords) > -1 && title.charAt(index - 2) !== ":" && (title.charAt(index + match.length) !== "-" || title.charAt(index - 1) === "-") && title.charAt(index - 1).search(/[^\s-]/) < 0) {
		      return match.toLowerCase();
		    }
		    if (match.substr(1).search(/[A-Z]|\../) > -1) {
		      return match;
		    }
		    return match.charAt(0).toUpperCase() + match.substr(1);
		  });
		}

		// See if s could be an email address. We don't want to send personal data like email.
		// https://support.google.com/analytics/answer/2795983?hl=en
		function mightBeEmail(s) {
		  // There's no point trying to validate rfc822 fully, just look for ...@...
		  return typeof s === "string" && s.indexOf("@") !== -1;
		}
		var redacted = "REDACTED (Potential Email Address)";
		function redactEmail(string) {
		  if (mightBeEmail(string)) {
		    console.warn("This arg looks like an email address, redacting.");
		    return redacted;
		  }
		  return string;
		}
		function format() {
		  var s = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
		  var titleCase = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
		  var redactingEmail = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
		  var _str = s || "";
		  if (titleCase) {
		    _str = toTitleCase(s);
		  }
		  if (redactingEmail) {
		    _str = redactEmail(_str);
		  }
		  return _str;
		} 
	} (format));

	(function (exports) {

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports["default"] = exports.GA4 = void 0;
		var _gtag = _interopRequireDefault(gtag);
		var _format = _interopRequireDefault(format);
		var _excluded = ["eventCategory", "eventAction", "eventLabel", "eventValue", "hitType"],
		  _excluded2 = ["title", "location"],
		  _excluded3 = ["page", "hitType"];
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
		function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
		function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
		function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
		function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
		function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
		function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
		function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
		function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
		function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
		function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
		function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
		function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
		function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
		function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
		function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
		function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
		function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
		function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
		function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
		function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
		function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
		/*
		Links
		https://developers.google.com/gtagjs/reference/api
		https://developers.google.com/tag-platform/gtagjs/reference
		*/
		/**
		 * @typedef GaOptions
		 * @type {Object}
		 * @property {boolean} [cookieUpdate=true]
		 * @property {number} [cookieExpires=63072000] Default two years
		 * @property {string} [cookieDomain="auto"]
		 * @property {string} [cookieFlags]
		 * @property {string} [userId]
		 * @property {string} [clientId]
		 * @property {boolean} [anonymizeIp]
		 * @property {string} [contentGroup1]
		 * @property {string} [contentGroup2]
		 * @property {string} [contentGroup3]
		 * @property {string} [contentGroup4]
		 * @property {string} [contentGroup5]
		 * @property {boolean} [allowAdFeatures=true]
		 * @property {boolean} [allowAdPersonalizationSignals]
		 * @property {boolean} [nonInteraction]
		 * @property {string} [page]
		 */
		/**
		 * @typedef UaEventOptions
		 * @type {Object}
		 * @property {string} action
		 * @property {string} category
		 * @property {string} [label]
		 * @property {number} [value]
		 * @property {boolean} [nonInteraction]
		 * @property {('beacon'|'xhr'|'image')} [transport]
		 */
		/**
		 * @typedef InitOptions
		 * @type {Object}
		 * @property {string} trackingId
		 * @property {GaOptions|any} [gaOptions]
		 * @property {Object} [gtagOptions] New parameter
		 */
		var GA4 = /*#__PURE__*/function () {
		  function GA4() {
		    var _this = this;
		    _classCallCheck(this, GA4);
		    _defineProperty(this, "reset", function () {
		      _this.isInitialized = false;
		      _this._testMode = false;
		      _this._currentMeasurementId;
		      _this._hasLoadedGA = false;
		      _this._isQueuing = false;
		      _this._queueGtag = [];
		    });
		    _defineProperty(this, "_gtag", function () {
		      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
		        args[_key] = arguments[_key];
		      }
		      if (!_this._testMode) {
		        if (_this._isQueuing) {
		          _this._queueGtag.push(args);
		        } else {
		          _gtag["default"].apply(void 0, args);
		        }
		      } else {
		        _this._queueGtag.push(args);
		      }
		    });
		    _defineProperty(this, "_loadGA", function (GA_MEASUREMENT_ID, nonce) {
		      var gtagUrl = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "https://www.googletagmanager.com/gtag/js";
		      if (typeof window === "undefined" || typeof document === "undefined") {
		        return;
		      }
		      if (!_this._hasLoadedGA) {
		        // Global Site Tag (gtag.js) - Google Analytics
		        var script = document.createElement("script");
		        script.async = true;
		        script.src = "".concat(gtagUrl, "?id=").concat(GA_MEASUREMENT_ID);
		        if (nonce) {
		          script.setAttribute("nonce", nonce);
		        }
		        document.body.appendChild(script);
		        window.dataLayer = window.dataLayer || [];
		        window.gtag = function gtag() {
		          window.dataLayer.push(arguments);
		        };
		        _this._hasLoadedGA = true;
		      }
		    });
		    _defineProperty(this, "_toGtagOptions", function (gaOptions) {
		      if (!gaOptions) {
		        return;
		      }
		      var mapFields = {
		        // Old https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference#cookieUpdate
		        // New https://developers.google.com/analytics/devguides/collection/gtagjs/cookies-user-id#cookie_update
		        cookieUpdate: "cookie_update",
		        cookieExpires: "cookie_expires",
		        cookieDomain: "cookie_domain",
		        cookieFlags: "cookie_flags",
		        // must be in set method?
		        userId: "user_id",
		        clientId: "client_id",
		        anonymizeIp: "anonymize_ip",
		        // https://support.google.com/analytics/answer/2853546?hl=en#zippy=%2Cin-this-article
		        contentGroup1: "content_group1",
		        contentGroup2: "content_group2",
		        contentGroup3: "content_group3",
		        contentGroup4: "content_group4",
		        contentGroup5: "content_group5",
		        // https://support.google.com/analytics/answer/9050852?hl=en
		        allowAdFeatures: "allow_google_signals",
		        allowAdPersonalizationSignals: "allow_ad_personalization_signals",
		        nonInteraction: "non_interaction",
		        page: "page_path",
		        hitCallback: "event_callback"
		      };
		      var gtagOptions = Object.entries(gaOptions).reduce(function (prev, _ref) {
		        var _ref2 = _slicedToArray(_ref, 2),
		          key = _ref2[0],
		          value = _ref2[1];
		        if (mapFields[key]) {
		          prev[mapFields[key]] = value;
		        } else {
		          prev[key] = value;
		        }
		        return prev;
		      }, {});
		      return gtagOptions;
		    });
		    _defineProperty(this, "initialize", function (GA_MEASUREMENT_ID) {
		      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
		      if (!GA_MEASUREMENT_ID) {
		        throw new Error("Require GA_MEASUREMENT_ID");
		      }
		      var initConfigs = typeof GA_MEASUREMENT_ID === "string" ? [{
		        trackingId: GA_MEASUREMENT_ID
		      }] : GA_MEASUREMENT_ID;
		      _this._currentMeasurementId = initConfigs[0].trackingId;
		      var gaOptions = options.gaOptions,
		        gtagOptions = options.gtagOptions,
		        nonce = options.nonce,
		        _options$testMode = options.testMode,
		        testMode = _options$testMode === void 0 ? false : _options$testMode,
		        gtagUrl = options.gtagUrl;
		      _this._testMode = testMode;
		      if (!testMode) {
		        _this._loadGA(_this._currentMeasurementId, nonce, gtagUrl);
		      }
		      if (!_this.isInitialized) {
		        _this._gtag("js", new Date());
		        initConfigs.forEach(function (config) {
		          var mergedGtagOptions = _objectSpread(_objectSpread(_objectSpread({}, _this._toGtagOptions(_objectSpread(_objectSpread({}, gaOptions), config.gaOptions))), gtagOptions), config.gtagOptions);
		          if (Object.keys(mergedGtagOptions).length) {
		            _this._gtag("config", config.trackingId, mergedGtagOptions);
		          } else {
		            _this._gtag("config", config.trackingId);
		          }
		        });
		      }
		      _this.isInitialized = true;
		      if (!testMode) {
		        var queues = _toConsumableArray(_this._queueGtag);
		        _this._queueGtag = [];
		        _this._isQueuing = false;
		        while (queues.length) {
		          var queue = queues.shift();
		          _this._gtag.apply(_this, _toConsumableArray(queue));
		          if (queue[0] === "get") {
		            _this._isQueuing = true;
		          }
		        }
		      }
		    });
		    _defineProperty(this, "set", function (fieldsObject) {
		      if (!fieldsObject) {
		        console.warn("`fieldsObject` is required in .set()");
		        return;
		      }
		      if (_typeof(fieldsObject) !== "object") {
		        console.warn("Expected `fieldsObject` arg to be an Object");
		        return;
		      }
		      if (Object.keys(fieldsObject).length === 0) {
		        console.warn("empty `fieldsObject` given to .set()");
		      }
		      _this._gaCommand("set", fieldsObject);
		    });
		    _defineProperty(this, "_gaCommandSendEvent", function (eventCategory, eventAction, eventLabel, eventValue, fieldsObject) {
		      _this._gtag("event", eventAction, _objectSpread(_objectSpread({
		        event_category: eventCategory,
		        event_label: eventLabel,
		        value: eventValue
		      }, fieldsObject && {
		        non_interaction: fieldsObject.nonInteraction
		      }), _this._toGtagOptions(fieldsObject)));
		    });
		    _defineProperty(this, "_gaCommandSendEventParameters", function () {
		      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
		        args[_key2] = arguments[_key2];
		      }
		      if (typeof args[0] === "string") {
		        _this._gaCommandSendEvent.apply(_this, _toConsumableArray(args.slice(1)));
		      } else {
		        var _args$ = args[0],
		          eventCategory = _args$.eventCategory,
		          eventAction = _args$.eventAction,
		          eventLabel = _args$.eventLabel,
		          eventValue = _args$.eventValue;
		          _args$.hitType;
		          var rest = _objectWithoutProperties(_args$, _excluded);
		        _this._gaCommandSendEvent(eventCategory, eventAction, eventLabel, eventValue, rest);
		      }
		    });
		    _defineProperty(this, "_gaCommandSendTiming", function (timingCategory, timingVar, timingValue, timingLabel) {
		      _this._gtag("event", "timing_complete", {
		        name: timingVar,
		        value: timingValue,
		        event_category: timingCategory,
		        event_label: timingLabel
		      });
		    });
		    _defineProperty(this, "_gaCommandSendPageview", function (page, fieldsObject) {
		      if (fieldsObject && Object.keys(fieldsObject).length) {
		        var _this$_toGtagOptions = _this._toGtagOptions(fieldsObject),
		          title = _this$_toGtagOptions.title,
		          location = _this$_toGtagOptions.location,
		          rest = _objectWithoutProperties(_this$_toGtagOptions, _excluded2);
		        _this._gtag("event", "page_view", _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, page && {
		          page_path: page
		        }), title && {
		          page_title: title
		        }), location && {
		          page_location: location
		        }), rest));
		      } else if (page) {
		        _this._gtag("event", "page_view", {
		          page_path: page
		        });
		      } else {
		        _this._gtag("event", "page_view");
		      }
		    });
		    _defineProperty(this, "_gaCommandSendPageviewParameters", function () {
		      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
		        args[_key3] = arguments[_key3];
		      }
		      if (typeof args[0] === "string") {
		        _this._gaCommandSendPageview.apply(_this, _toConsumableArray(args.slice(1)));
		      } else {
		        var _args$2 = args[0],
		          page = _args$2.page;
		          _args$2.hitType;
		          var rest = _objectWithoutProperties(_args$2, _excluded3);
		        _this._gaCommandSendPageview(page, rest);
		      }
		    });
		    _defineProperty(this, "_gaCommandSend", function () {
		      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
		        args[_key4] = arguments[_key4];
		      }
		      var hitType = typeof args[0] === "string" ? args[0] : args[0].hitType;
		      switch (hitType) {
		        case "event":
		          _this._gaCommandSendEventParameters.apply(_this, args);
		          break;
		        case "pageview":
		          _this._gaCommandSendPageviewParameters.apply(_this, args);
		          break;
		        case "timing":
		          _this._gaCommandSendTiming.apply(_this, _toConsumableArray(args.slice(1)));
		          break;
		        case "screenview":
		        case "transaction":
		        case "item":
		        case "social":
		        case "exception":
		          console.warn("Unsupported send command: ".concat(hitType));
		          break;
		        default:
		          console.warn("Send command doesn't exist: ".concat(hitType));
		      }
		    });
		    _defineProperty(this, "_gaCommandSet", function () {
		      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
		        args[_key5] = arguments[_key5];
		      }
		      if (typeof args[0] === "string") {
		        args[0] = _defineProperty({}, args[0], args[1]);
		      }
		      _this._gtag("set", _this._toGtagOptions(args[0]));
		    });
		    _defineProperty(this, "_gaCommand", function (command) {
		      for (var _len6 = arguments.length, args = new Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
		        args[_key6 - 1] = arguments[_key6];
		      }
		      switch (command) {
		        case "send":
		          _this._gaCommandSend.apply(_this, args);
		          break;
		        case "set":
		          _this._gaCommandSet.apply(_this, args);
		          break;
		        default:
		          console.warn("Command doesn't exist: ".concat(command));
		      }
		    });
		    _defineProperty(this, "ga", function () {
		      for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
		        args[_key7] = arguments[_key7];
		      }
		      if (typeof args[0] === "string") {
		        _this._gaCommand.apply(_this, args);
		      } else {
		        var readyCallback = args[0];
		        _this._gtag("get", _this._currentMeasurementId, "client_id", function (clientId) {
		          _this._isQueuing = false;
		          var queues = _this._queueGtag;
		          readyCallback({
		            get: function get(property) {
		              return property === "clientId" ? clientId : property === "trackingId" ? _this._currentMeasurementId : property === "apiVersion" ? "1" : undefined;
		            }
		          });
		          while (queues.length) {
		            var queue = queues.shift();
		            _this._gtag.apply(_this, _toConsumableArray(queue));
		          }
		        });
		        _this._isQueuing = true;
		      }
		      return _this.ga;
		    });
		    _defineProperty(this, "event", function (optionsOrName, params) {
		      if (typeof optionsOrName === "string") {
		        _this._gtag("event", optionsOrName, _this._toGtagOptions(params));
		      } else {
		        var action = optionsOrName.action,
		          category = optionsOrName.category,
		          label = optionsOrName.label,
		          value = optionsOrName.value,
		          nonInteraction = optionsOrName.nonInteraction,
		          transport = optionsOrName.transport;
		        if (!category || !action) {
		          console.warn("args.category AND args.action are required in event()");
		          return;
		        }

		        // Required Fields
		        var fieldObject = {
		          hitType: "event",
		          eventCategory: (0, _format["default"])(category),
		          eventAction: (0, _format["default"])(action)
		        };

		        // Optional Fields
		        if (label) {
		          fieldObject.eventLabel = (0, _format["default"])(label);
		        }
		        if (typeof value !== "undefined") {
		          if (typeof value !== "number") {
		            console.warn("Expected `args.value` arg to be a Number.");
		          } else {
		            fieldObject.eventValue = value;
		          }
		        }
		        if (typeof nonInteraction !== "undefined") {
		          if (typeof nonInteraction !== "boolean") {
		            console.warn("`args.nonInteraction` must be a boolean.");
		          } else {
		            fieldObject.nonInteraction = nonInteraction;
		          }
		        }
		        if (typeof transport !== "undefined") {
		          if (typeof transport !== "string") {
		            console.warn("`args.transport` must be a string.");
		          } else {
		            if (["beacon", "xhr", "image"].indexOf(transport) === -1) {
		              console.warn("`args.transport` must be either one of these values: `beacon`, `xhr` or `image`");
		            }
		            fieldObject.transport = transport;
		          }
		        }
		        _this._gaCommand("send", fieldObject);
		      }
		    });
		    _defineProperty(this, "send", function (fieldObject) {
		      _this._gaCommand("send", fieldObject);
		    });
		    this.reset();
		  }
		  _createClass(GA4, [{
		    key: "gtag",
		    value: function gtag() {
		      this._gtag.apply(this, arguments);
		    }
		  }]);
		  return GA4;
		}();
		exports.GA4 = GA4;
		var _default = new GA4();
		exports["default"] = _default; 
	} (ga4));

	(function (exports) {

		function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports["default"] = exports.ReactGAImplementation = void 0;
		var _ga = _interopRequireWildcard(ga4);
		function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
		function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
		var ReactGAImplementation = _ga.GA4;
		exports.ReactGAImplementation = ReactGAImplementation;
		var _default = _ga["default"];
		exports["default"] = _default; 
	} (dist));

	var ReactGA = /*@__PURE__*/getDefaultExportFromCjs(dist);

	function gaInit(localhost) {
	    if (location.hostname == '127.0.0.1' && !localhost) {
	        console.log('Google analytics is disabled on this host');
	        return;
	    }
	    ReactGA.initialize("G-F9Y8FZ0KFE", {
	        gtagOptions: {
	            cookie_flags: 'max-age=7200;Secure=true;SameSite=none'
	        },
	        gaOptions: { cookieDomain: 'none' }
	    });
	}
	function gaEvent(category, action, label, value) {
	    ReactGA.event({
	        category,
	        action,
	        label,
	        value,
	    });
	}

	const FlexContainer = (props) => {
	    const className = React.useMemo(() => {
	        let str = 'Container';
	        if (props.style?.overflow == 'auto' || props.style?.overflowX == 'auto' || props.style?.overflowY == 'auto')
	            str += ' ScrollContainer';
	        else {
	            if ((!props.style?.flexWrap || props.style?.flexWrap == 'nowrap') &&
	                (!props.style?.flexFlow || props.style?.flexFlow?.split(' ')[1] == 'nowrap'))
	                str += (props.style?.flexDirection == 'column' || props.style?.flexFlow?.split(' ')[0] == 'column')
	                    ? ' ColumnContainer' : ' RowContainer';
	            else
	                str += ' WrapContainer';
	            str += props.alignInputs ? ' TextFieldsContainer' : '';
	        }
	        return str;
	    }, []);
	    return (jsxRuntimeExports.jsx("div", { className: className, style: props.style, children: props.children }));
	};
	var Flex = React.memo(FlexContainer);

	const GlassWrapper = (props) => {
	    return (jsxRuntimeExports.jsx("div", { className: 'GlassWrapper' + (props.border ? ' GlassWrapperBordered' : ''), style: props.style, children: jsxRuntimeExports.jsx("div", { className: 'GlassWrapper-content', children: props.children }) }));
	};
	var GlassWrapper$1 = React.memo(GlassWrapper);

	const Label = (props) => {
	    const [first, other] = React.useMemo(() => {
	        return [props.children.charAt(0), props.children.substring(1)];
	    }, [props.children]);
	    return (jsxRuntimeExports.jsxs("label", { htmlFor: props.for, className: 'Label', children: [jsxRuntimeExports.jsx("span", { className: 'Label-start', style: props.style, children: first }), jsxRuntimeExports.jsx("span", { className: 'Label-other', style: props.style, children: other })] }));
	};
	var Label$1 = React.memo(Label);

	const Line = (props) => {
	    return (jsxRuntimeExports.jsx("hr", { className: "Line", style: props.style }));
	};
	var Line$1 = React.memo(Line);

	const Popup = (props) => {
	    const minWidth = (props.minWidth || 250) + 'px';
	    const maxWidth = (props.maxWidth || 500) + 'px';
	    const maxHeight = (props.maxHeight || 200) + 'px';
	    const header = React.useMemo(() => {
	        return (jsxRuntimeExports.jsxs(Flex, { style: { flexDirection: 'column', padding: '10px', height: 'min-content', minWidth }, children: [jsxRuntimeExports.jsxs(Flex, { style: { flexDirection: 'row', justifyContent: 'space-between' }, children: [jsxRuntimeExports.jsx(Label$1, { style: { fontSize: '20px' }, children: props.label }), jsxRuntimeExports.jsx(Button$1, { onClick: props.onClose, children: "Close" })] }), jsxRuntimeExports.jsx(Line$1, { style: { margin: '10px 0 0 0' } })] }));
	    }, []);
	    return (jsxRuntimeExports.jsx(Flex, { style: { flexFlow: 'row wrap', width: '100vw', height: '100vh', zIndex: '9999', position: 'fixed', left: '0', top: '0', background: '#000000AA', alignItems: 'center', justifyContent: 'center', padding: '5px' }, children: jsxRuntimeExports.jsx(GlassWrapper$1, { border: true, children: jsxRuntimeExports.jsxs(Flex, { style: {
	                    overflowX: 'auto',
	                    flexDirection: 'column',
	                    width: 'calc(100vw - 40px)',
	                    maxWidth,
	                    height: 'calc(100vh - 40px)',
	                    maxHeight,
	                    minWidth: '100%',
	                    minHeight: 'max-content'
	                }, children: [header, jsxRuntimeExports.jsx(Flex, { style: { flexDirection: 'column', overflowY: 'auto', overflowX: 'hidden', padding: '0 0 10px 10px', minWidth }, children: props.children })] }) }) }));
	};
	var Popup$1 = React.memo(Popup);

	const Input = (props) => {
	    const ref = React.useRef(null);
	    const type = props.type ? props.type : 'text';
	    const id = React.useMemo(() => {
	        return props.label ? props.label + Math.random() * 100000 : null;
	    }, [props.label]);
	    const [value, setValue] = React.useState(props.value);
	    React.useEffect(() => {
	        setValue(props.value);
	    }, [props.value]);
	    const onChange = React.useCallback((e) => {
	        const value = type == 'text' ? e.target.value : checkOnRange(e.target.value);
	        setValue(value);
	        props.onChange(value, props.index, props.group);
	    }, [props.min, props.max]);
	    const checkOnRange = (value) => {
	        if (!value)
	            return props.min ? props.min : '';
	        let intValue = value ? parseInt(value) : 0;
	        const minInt = props.min ? parseInt(props.min) : 0;
	        const maxInt = props.max ? parseInt(props.max) : 999999999;
	        if (intValue < minInt)
	            intValue = minInt;
	        if (intValue > maxInt)
	            intValue = maxInt;
	        return intValue.toString();
	    };
	    const intRx = /^-?\d+\.?\d*$/;
	    const onKeyDown = (e) => {
	        if (intRx.test(e.key) || e.key == 'Backspace')
	            return;
	        e.preventDefault();
	    };
	    React.useEffect(() => {
	        const input = ref?.current;
	        if (type == 'number')
	            input.addEventListener("keydown", onKeyDown);
	        return () => {
	            input?.removeEventListener("keydown", onKeyDown);
	        };
	    }, []);
	    return (jsxRuntimeExports.jsxs("div", { ref: ref, className: 'Input', "data-tooltip": props.tip, children: [props.label ? jsxRuntimeExports.jsx(Label$1, { for: id, children: props.label }) : null, jsxRuntimeExports.jsx("input", { className: 'Input-field', id: id, style: props.style, placeholder: props.placeholder, value: value, onChange: onChange })] }));
	};
	var Input$1 = React.memo(Input);

	const AccountItem = (props) => {
	    const [state, setState] = React.useState('default');
	    const callbacks = {
	        onMouseEnter: React.useCallback(() => {
	            setState('hover');
	        }, []),
	        onMouseLeave: React.useCallback(() => {
	            setState('default');
	        }, [])
	    };
	    const getStyle = () => {
	        let color = '#00000000';
	        const style = {
	            flexDirection: 'row',
	            justifyContent: 'space-around',
	            alignItems: 'center',
	            height: '70px',
	            width: 'calc(100% - 10px)',
	            minWidth: '620px',
	            cursor: 'pointer',
	            backgroundColor: '#00000000',
	            transition: '0.4s'
	        };
	        switch (state) {
	            case 'default':
	                color = props.selected ? '#00CCFF44' : '#00000000';
	                break;
	            case 'hover':
	                color = props.selected ? '#00CCFF44' : '#00CCFF22';
	                break;
	        }
	        style.backgroundColor = color;
	        return style;
	    };
	    const elements = React.useMemo(() => {
	        return (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx("img", { src: 'assets/images/noob.png', width: '59', height: '59' }), jsxRuntimeExports.jsx(Input$1, { onChange: (value) => props.onNameChange(props.id, value), label: 'Name:', placeholder: 'Noob', value: props.name, tip: "Any nick name" }), jsxRuntimeExports.jsx(Input$1, { onChange: (value) => props.onPlayerIDChange(props.id, value), label: 'Palyer ID:', tip: "Player ID from account path", placeholder: 'X-S2-X-XXXXXXX', value: props.playerID }), jsxRuntimeExports.jsx(Button$1, { onClick: () => props.onRemove(props.id), style: { width: '100px' }, children: "Remove" })] }));
	    }, []);
	    return (jsxRuntimeExports.jsx("div", { onMouseEnter: callbacks.onMouseEnter, onMouseLeave: callbacks.onMouseLeave, onClick: e => props.onSelect(props.id, props.playerID), children: jsxRuntimeExports.jsx(Flex, { style: getStyle(), children: elements }) }));
	};
	var AccountItem$1 = React.memo(AccountItem);

	const Accounts = mobxReactLite.observer((props) => {
	    const { accountStore, menuStore, modalStore, mapStore } = useStore();
	    const callbacks = {
	        onCloseClick: React.useCallback(() => {
	            modalStore.setModal('NONE');
	        }, []),
	        onAddNewAccount: React.useCallback(() => {
	            accountStore.add('Nick Name');
	            gaEvent("Accounts", "Added new account", '', accountStore.list.length);
	        }, []),
	        onRemoveAccount: React.useCallback((id) => {
	            mapStore.clearMapData(id);
	            accountStore.remove(id);
	            menuStore.setPlayerID(accountStore.currentAccount.playerID);
	            gaEvent("Accounts", "Remove account");
	        }, []),
	        onAccountSelect: React.useCallback((id, playerID) => {
	            if (accountStore.current == id)
	                return;
	            accountStore.setSelected(id);
	            menuStore.setPlayerID(playerID);
	            gaEvent("Accounts", "Select account", playerID);
	        }, []),
	        onNameChange: React.useCallback((id, name) => {
	            accountStore.change(id, { name });
	        }, []),
	        onPlayerIDChange: React.useCallback((id, playerID) => {
	            accountStore.change(id, { playerID });
	            if (id == accountStore.current)
	                menuStore.setPlayerID(playerID);
	        }, []),
	    };
	    const header = React.useMemo(() => {
	        return (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsxs(Text$1, { style: { textAlign: 'center', marginTop: '10px' }, children: ["If you have more accounts, you can add them here for quick switching. ", jsxRuntimeExports.jsx("br", {}), jsxRuntimeExports.jsx("br", {})] }), jsxRuntimeExports.jsx(Button$1, { style: { width: '200px', alignSelf: 'center', marginBottom: '20px' }, onClick: callbacks.onAddNewAccount, children: "Add new account" })] }));
	    }, []);
	    return (jsxRuntimeExports.jsxs(Popup$1, { label: 'Accounts', minWidth: 800, maxWidth: 800, maxHeight: 400, onClose: callbacks.onCloseClick, children: [header, jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: accountStore.list.map((account) => {
	                    return (jsxRuntimeExports.jsx(AccountItem$1, { id: account.id, name: account.name, playerID: account.playerID, selected: accountStore.current == account.id, onSelect: callbacks.onAccountSelect, onNameChange: callbacks.onNameChange, onPlayerIDChange: callbacks.onPlayerIDChange, onRemove: callbacks.onRemoveAccount }, account.id));
	                }) })] }));
	});
	var Accounts$1 = React.memo(Accounts);

	const Confirm = mobxReactLite.observer((props) => {
	    const { modalStore } = useStore();
	    const callbacks = {
	        onCloseClick: React.useCallback(() => {
	            modalStore.setModal('NONE');
	        }, []),
	        onYesClick: React.useCallback(() => {
	            modalStore.actions[0]?.();
	            modalStore.setModal('NONE');
	        }, []),
	        onNoClick: React.useCallback(() => {
	            modalStore.actions[1]?.();
	            modalStore.setModal('NONE');
	        }, [])
	    };
	    return (jsxRuntimeExports.jsx(Popup$1, { label: '?¿', onClose: callbacks.onCloseClick, maxWidth: 500, minWidth: 500, maxHeight: 200, children: jsxRuntimeExports.jsxs(Flex, { style: { flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '500px', minWidth: '500px' }, children: [jsxRuntimeExports.jsx(Text$1, { style: { textAlign: 'center', marginTop: '20px', marginRight: '20px' }, children: modalStore.message }), jsxRuntimeExports.jsxs(Flex, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginRight: '20px' }, children: [jsxRuntimeExports.jsx(Button$1, { onClick: callbacks.onYesClick, style: { width: '100px', minWidth: '100px' }, children: "Yes" }), jsxRuntimeExports.jsx(Button$1, { onClick: callbacks.onNoClick, style: { width: '100px', minWidth: '100px' }, children: "No" })] })] }) }));
	});
	var Confirm$1 = React.memo(Confirm);

	const Help = mobxReactLite.observer((props) => {
	    const { modalStore } = useStore();
	    const callbacks = {
	        onCloseClick: React.useCallback(() => {
	            modalStore.setModal('NONE');
	        }, [])
	    };
	    return (jsxRuntimeExports.jsxs(Popup$1, { label: 'What is this?¿', maxWidth: 900, minWidth: 900, maxHeight: 600, onClose: callbacks.onCloseClick, children: [jsxRuntimeExports.jsxs(Text$1, { children: ["Hi!", jsxRuntimeExports.jsx("br", {}), jsxRuntimeExports.jsx("br", {}), "Reinstalled Windows? Playing Starcraft2 from another PC? Lost your save?", jsxRuntimeExports.jsx("br", {}), "This service can restore some top-secured SC2 banks (Starcode + signature + anticheats).", jsxRuntimeExports.jsx("br", {}), jsxRuntimeExports.jsx("br", {})] }), jsxRuntimeExports.jsx(Label$1, { children: "1. What bank can be restored here?" }), jsxRuntimeExports.jsxs(Text$1, { children: ["All available maps can be selected in the menu selector. If your map is not there, then you can't :(", jsxRuntimeExports.jsx("br", {}), jsxRuntimeExports.jsx("br", {})] }), jsxRuntimeExports.jsx(Label$1, { children: "2. I found my map, how to restore the bank?" }), jsxRuntimeExports.jsxs(Text$1, { children: ["First make sure you have played this map and that the bank file folder exists. You don't have to be in the game, be offline, or go to the menu. Otherwise the game will overwrite the bank and you will not see any changes.", jsxRuntimeExports.jsx("b", { children: " Dont forget to make backup of your original bank file!!11" }), jsxRuntimeExports.jsx("br", {}), "Some banks are verified with a signature that requires the player id and map author id to generate. They are in the path to the file:", jsxRuntimeExports.jsx("br", {}), jsxRuntimeExports.jsx("br", {}), jsxRuntimeExports.jsx("br", {})] }), jsxRuntimeExports.jsx("img", { src: "./assets/images/help.png", alt: "help.png", width: 629, height: 191, style: { alignSelf: 'center' } }), jsxRuntimeExports.jsxs(Text$1, { style: { alignSelf: 'center' }, children: ["Variables for Generator", jsxRuntimeExports.jsx("br", {}), jsxRuntimeExports.jsx("br", {}), jsxRuntimeExports.jsx("br", {})] }), jsxRuntimeExports.jsxs(Text$1, { children: ["Usually the file name and author id are entered automatically, you don't need to change them unless you have to.", jsxRuntimeExports.jsx("br", {}), "Just set other bank's options or drop your bank file to the rect \"Drop file here\" to read and edit it.", jsxRuntimeExports.jsx("br", {}), "And pick 'Download bank' or 'Copy code'.", jsxRuntimeExports.jsx("br", {}), jsxRuntimeExports.jsx("br", {})] }), jsxRuntimeExports.jsx(Label$1, { children: "Found a bug or wanna add new map?" }), jsxRuntimeExports.jsxs(Text$1, { children: ["Post issues or pull requests ", jsxRuntimeExports.jsx("a", { href: "https://github.com/DarthVan/StarCraft2-Bank-Restorer", target: '_blank', children: "here" }), jsxRuntimeExports.jsx("br", {}), jsxRuntimeExports.jsx("br", {}), "gg hf!", jsxRuntimeExports.jsx("br", {}), jsxRuntimeExports.jsx("br", {})] })] }));
	});
	var Help$1 = React.memo(Help);

	const Info = mobxReactLite.observer(() => {
	    const { modalStore } = useStore();
	    const loadUpdatesList = (forceShow) => {
	        console.log('Checking updates...');
	        fetch('./updates.json' + '?' + Date.now(), { cache: 'no-cache' })
	            .then((response) => response.json(), () => console.error('Info: cant load updates list!'))
	            .then((json) => {
	            const list = json.updates;
	            if (!list || !list.length) {
	                console.error('Info: updates list is null or empty');
	                return;
	            }
	            if (list[0].version != APP_VERSION) {
	                modalStore.setModal('UPDATES', 'There is a new update! Refresh your tab.', null, list);
	                return;
	            }
	            if (forceShow) {
	                modalStore.setModal('UPDATES', 'Your tab is up to date!', null, list);
	            }
	        });
	    };
	    React.useEffect(() => {
	        loadUpdatesList();
	        const interval = window.setInterval(() => loadUpdatesList(), CHECK_UPDATES_DELAY);
	        return () => window.clearInterval(interval);
	    }, []);
	    const callbacks = {
	        onVersionClick: React.useCallback(() => {
	            loadUpdatesList(true);
	            gaEvent("Info", "Version", APP_VERSION);
	        }, [])
	    };
	    return (jsxRuntimeExports.jsx(GlassWrapper$1, { children: jsxRuntimeExports.jsx(Flex, { style: { overflow: 'auto' }, children: jsxRuntimeExports.jsxs(Flex, { style: { flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '10px', minWidth: 'max-content' }, children: [jsxRuntimeExports.jsx(Label$1, { children: "Powered by React 18" }), jsxRuntimeExports.jsx("div", { onClick: callbacks.onVersionClick, style: { cursor: 'pointer' }, children: jsxRuntimeExports.jsxs(Text$1, { style: { textDecoration: 'underline', fontSize: '12px' }, children: ["Version ", APP_VERSION] }) })] }) }) }));
	});
	var Info$1 = React.memo(Info);

	const POW_2_24 = Math.pow(2, 24);
	const POW_2_32 = Math.pow(2, 32);
	function hex(n) {
	    let s = "";
	    for (let i = 7; i >= 0; --i) {
	        const v = (n >>> (i << 2)) & 0xF;
	        s += v.toString(16);
	    }
	    return s;
	}
	function lrot(n, bits) {
	    return ((n << bits) | (n >>> (32 - bits)));
	}
	class Uint32ArrayBigEndian {
	    constructor(length) {
	        this.bytes = new Uint8Array(length << 2);
	    }
	    get(index) {
	        index <<= 2;
	        return (this.bytes[index] * POW_2_24)
	            + ((this.bytes[index + 1] << 16)
	                | (this.bytes[index + 2] << 8)
	                | this.bytes[index + 3]);
	    }
	    set(index, value) {
	        const high = Math.floor(value / POW_2_24);
	        const rest = value - (high * POW_2_24);
	        index <<= 2;
	        this.bytes[index] = high;
	        this.bytes[index + 1] = rest >> 16;
	        this.bytes[index + 2] = (rest >> 8) & 0xFF;
	        this.bytes[index + 3] = rest & 0xFF;
	    }
	}
	function string2ArrayBuffer(s) {
	    s = s.replace(/[\u0080-\u07ff]/g, function (c) {
	        const code = c.charCodeAt(0);
	        return String.fromCharCode(0xC0 | code >> 6, 0x80 | code & 0x3F);
	    });
	    s = s.replace(/[\u0080-\uffff]/g, function (c) {
	        const code = c.charCodeAt(0);
	        return String.fromCharCode(0xE0 | code >> 12, 0x80 | code >> 6 & 0x3F, 0x80 | code & 0x3F);
	    });
	    const n = s.length;
	    const array = new Uint8Array(n);
	    for (let i = 0; i < n; ++i)
	        array[i] = s.charCodeAt(i);
	    return array.buffer;
	}
	function hashSHA1(bufferOrString) {
	    let source;
	    if (bufferOrString instanceof ArrayBuffer)
	        source = bufferOrString;
	    else
	        source = string2ArrayBuffer(String(bufferOrString));
	    const sbytes = source.byteLength;
	    const sbits = sbytes << 3;
	    const minbits = sbits + 65;
	    const bits = Math.ceil(minbits / 512) << 9;
	    const bytes = bits >>> 3;
	    const slen = bytes >>> 2;
	    const s = new Uint32ArrayBigEndian(slen);
	    const s8 = s.bytes;
	    const w = new Uint32Array(80);
	    const sourceArray = new Uint8Array(source);
	    let h0 = 0x67452301;
	    let h1 = 0xEFCDAB89;
	    let h2 = 0x98BADCFE;
	    let h3 = 0x10325476;
	    let h4 = 0xC3D2E1F0;
	    let i;
	    let j;
	    for (i = 0; i < sbytes; ++i)
	        s8[i] = sourceArray[i];
	    s8[sbytes] = 0x80;
	    s.set(slen - 2, Math.floor(sbits / POW_2_32));
	    s.set(slen - 1, sbits & 0xFFFFFFFF);
	    for (i = 0; i < slen; i += 16) {
	        for (j = 0; j < 16; ++j)
	            w[j] = s.get(i + j);
	        for (; j < 80; ++j)
	            w[j] = lrot(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);
	        let a = h0;
	        let b = h1;
	        let c = h2;
	        let d = h3;
	        let e = h4;
	        let f;
	        let k;
	        let temp;
	        for (j = 0; j < 80; ++j) {
	            if (j < 20) {
	                f = (b & c) | ((~b) & d);
	                k = 0x5A827999;
	            }
	            else if (j < 40) {
	                f = b ^ c ^ d;
	                k = 0x6ED9EBA1;
	            }
	            else if (j < 60) {
	                f = (b & c) ^ (b & d) ^ (c & d);
	                k = 0x8F1BBCDC;
	            }
	            else {
	                f = b ^ c ^ d;
	                k = 0xCA62C1D6;
	            }
	            temp = (lrot(a, 5) + f + e + k + w[j]) & 0xFFFFFFFF;
	            e = d;
	            d = c;
	            c = lrot(b, 30);
	            b = a;
	            a = temp;
	        }
	        h0 = (h0 + a) & 0xFFFFFFFF;
	        h1 = (h1 + b) & 0xFFFFFFFF;
	        h2 = (h2 + c) & 0xFFFFFFFF;
	        h3 = (h3 + d) & 0xFFFFFFFF;
	        h4 = (h4 + e) & 0xFFFFFFFF;
	    }
	    return hex(h0) + hex(h1) + hex(h2) + hex(h3) + hex(h4);
	}

	class BankInfo {
	    constructor(bankName, authorID, playerID) {
	        this._bankName = bankName;
	        this._authorID = authorID;
	        this._playerID = playerID;
	    }
	    getAuthorNumber() {
	        return parseInt(this._authorID.split('-')[3]);
	    }
	    getPlayerNumber() {
	        return parseInt(this._playerID.split('-')[3]);
	    }
	    get bankName() {
	        return this._bankName;
	    }
	    get authorID() {
	        return this._authorID;
	    }
	    get playerID() {
	        return this._playerID;
	    }
	}

	var BankKeyType;
	(function (BankKeyType) {
	    BankKeyType["INT"] = "int";
	    BankKeyType["FIXED"] = "fixed";
	    BankKeyType["STRING"] = "string";
	    BankKeyType["FLAG"] = "flag";
	    BankKeyType["TEXT"] = "text";
	})(BankKeyType || (BankKeyType = {}));

	class BankKey {
	    constructor(name, type, value) {
	        this._name = name;
	        this._type = type;
	        this._value = value;
	    }
	    getTypedValue() {
	        switch (this._type) {
	            case BankKeyType.STRING:
	            case BankKeyType.TEXT:
	                return this._value;
	            case BankKeyType.INT:
	            case BankKeyType.FLAG:
	                return parseInt(this._value);
	            case BankKeyType.FIXED:
	                return parseFloat(this._value);
	        }
	        return null;
	    }
	    update(value) {
	        this._value = value;
	    }
	    get name() {
	        return this._name;
	    }
	    get type() {
	        return this._type;
	    }
	    get value() {
	        return this._value;
	    }
	}

	class BankMap extends Map {
	    constructor(name, iterable) {
	        super(iterable);
	        this._name = name;
	    }
	    set(key, value, update = false) {
	        if (!update)
	            this.isValidName(value.name, key);
	        return super.set(key, value);
	    }
	    sort() {
	        const collator = new Intl.Collator('en', { numeric: true, sensitivity: 'base' });
	        return new BankMap(this._name, [...this.entries()].sort((a, b) => collator.compare(a[0], b[0])));
	    }
	    clear() {
	        super.clear();
	    }
	    get name() {
	        return this._name;
	    }
	    isValidName(name, key) {
	        if (key && key != name)
	            throw new Error('BankMap: Error! Key ' + key + ' and BankName are different!');
	        this.forEach((v, k) => {
	            if (k == name)
	                throw new Error('BankMap: Error! Name ' + name + ' already used!');
	        });
	        return true;
	    }
	}

	class Bank {
	    constructor(bankName, authorID, playerID, version) {
	        this._info = new BankInfo(bankName, authorID, playerID);
	        this._version = version ? version : '1';
	        this.init();
	    }
	    parse(data) {
	        let xml = null;
	        const parser = new DOMParser();
	        try {
	            if (typeof data == "string")
	                xml = parser.parseFromString(data, "text/xml").firstElementChild;
	            else
	                throw new Error('Received data is not valid xml!');
	        }
	        catch (error) {
	            throw new Error('Received data is not valid xml!');
	        }
	        if (xml == null)
	            return;
	        this._version = xml.getAttribute('version');
	        if (xml.firstChild.nodeName == 'Bank')
	            xml = xml.firstElementChild;
	        this._sections.clear();
	        const xmlsections = xml.getElementsByTagName('Section');
	        for (let i = 0; i < xmlsections.length; i++) {
	            const section = new BankMap(xmlsections[i].getAttribute('name'));
	            const xmlkeys = xmlsections[i].getElementsByTagName('Key');
	            for (let j = 0; j < xmlkeys.length; j++) {
	                const xmlKey = xmlkeys[j];
	                const name = xmlKey.getAttribute('name');
	                const type = xmlKey.firstElementChild.attributes.item(0).name;
	                const value = xmlKey.firstElementChild.getAttribute(type);
	                section.set(name, new BankKey(name, type, value));
	            }
	            this._sections.set(section.name, section);
	        }
	        this._signature = null;
	        try {
	            this._signature = xml.getElementsByTagName('Signature')[0].getAttribute('value');
	        }
	        catch (error) {
	            this._signature = null;
	        }
	    }
	    addSection(name) {
	        if (!this._sections.has(name))
	            this._sections.set(name, new BankMap(name));
	        return this._sections.get(name);
	    }
	    addKey(key, type, value, section) {
	        const s = this.addSection(section);
	        switch (typeof value) {
	            case 'boolean':
	                value = value ? '1' : '0';
	                break;
	            case 'number':
	                value = value.toString();
	                break;
	        }
	        if (!s.has(key))
	            s.set(key, new BankKey(key, BankKeyType[type], value));
	        else
	            s.get(key).update(value);
	        return s.get(key);
	    }
	    getKey(key, section) {
	        if (this._sections.has(section))
	            return this._sections.get(section).get(key);
	        return null;
	    }
	    removeSection(name) {
	        return this._sections.delete(name);
	    }
	    removeKey(key, section) {
	        if (!this._sections.has(section))
	            return false;
	        return this._sections.get(section).delete(key);
	    }
	    sort() {
	        this._sections.forEach((section) => {
	            this._sections.set(section.name, section.sort(), true);
	        });
	        this._sections = this._sections.sort();
	    }
	    getAsString() {
	        let s = '<?xml version="1.0" encoding="utf-8"?>\n<Bank version="' + this._version + '">\n';
	        this._sections.forEach((section) => {
	            s += '\t<Section name="' + section.name + '">\n';
	            section.forEach((key) => {
	                s += '\t\t<Key name="' + key.name + '">\n';
	                s += '\t\t\t<Value ' + key.type + '="' + key.value + '"/>\n';
	                s += '\t\t</Key>\n';
	            });
	            s += '\t</Section>\n';
	        });
	        if (this._signature)
	            s += '\t<Signature value="' + this._signature + '"/>\n';
	        s += '</Bank>';
	        return s;
	    }
	    updateSignature() {
	        let s = '';
	        s += this._info.authorID;
	        s += this._info.playerID;
	        s += this._info.bankName;
	        this._sections.forEach((section) => {
	            s += section.name;
	            section.forEach((key) => {
	                s += key.name;
	                s += 'Value';
	                s += key.type;
	                if (key.type != BankKeyType.TEXT)
	                    s += key.value;
	            });
	        });
	        return this._signature = hashSHA1(s).toUpperCase();
	    }
	    async openFile(url, onReady) {
	        const xmlhttp = new XMLHttpRequest();
	        xmlhttp.onreadystatechange = () => {
	            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	                this.parse.call(this, xmlhttp.response);
	                if (onReady)
	                    onReady();
	            }
	        };
	        xmlhttp.open("GET", url, true);
	        xmlhttp.send();
	    }
	    get info() {
	        return this._info;
	    }
	    get sections() {
	        return this._sections;
	    }
	    get signature() {
	        return this._signature;
	    }
	    get version() {
	        return this._version;
	    }
	    init() {
	        this._sections = new BankMap("Sections");
	    }
	}

	const DropZone = (props) => {
	    const [isDragActive, setIsDragActive] = React.useState(false);
	    const dropZoneRef = React.useRef(null);
	    const mapFileListToArray = (files) => {
	        const array = [];
	        for (let i = 0; i < files.length; i++)
	            array.push(files.item(i));
	        return array;
	    };
	    const callbacks = {
	        onDragStart: React.useCallback((e) => {
	            e.preventDefault();
	            e.stopPropagation();
	            e.dataTransfer.clearData();
	            e.dataTransfer.setData('text/plain', e.target.dataset.item);
	        }, []),
	        onDragEnter: React.useCallback((e) => {
	            e.preventDefault();
	            e.stopPropagation();
	            props.onDragEnter?.();
	            if (e.dataTransfer.items && e.dataTransfer.items.length > 0)
	                setIsDragActive(true);
	        }, [props.onDragEnter]),
	        onDragLeave: React.useCallback((e) => {
	            e.preventDefault();
	            e.stopPropagation();
	            props.onDragLeave?.();
	            setIsDragActive(false);
	        }, [props.onDragLeave]),
	        onDragOver: React.useCallback((e) => {
	            e.preventDefault();
	            e.stopPropagation();
	            props.onDragOver?.();
	            if (!isDragActive)
	                setIsDragActive(true);
	        }, [isDragActive, props.onDragOver]),
	        onDrop: React.useCallback((e) => {
	            e.preventDefault();
	            e.stopPropagation();
	            setIsDragActive(false);
	            props.onDrop?.();
	            if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
	                props.onFilesDrop?.(mapFileListToArray(e.dataTransfer.files));
	            }
	        }, [props.onDrop, props.onFilesDrop])
	    };
	    React.useEffect(() => {
	        props.onDragStateChange?.(isDragActive);
	    }, [isDragActive]);
	    React.useEffect(() => {
	        const zoneRef = dropZoneRef?.current;
	        if (zoneRef) {
	            zoneRef.addEventListener('dragstart', callbacks.onDragStart);
	            zoneRef.addEventListener('dragenter', callbacks.onDragEnter);
	            zoneRef.addEventListener('dragleave', callbacks.onDragLeave);
	            zoneRef.addEventListener('dragover', callbacks.onDragOver);
	            zoneRef.addEventListener('drop', callbacks.onDrop);
	        }
	        return () => {
	            zoneRef?.removeEventListener('dragstart', callbacks.onDragStart);
	            zoneRef?.removeEventListener('dragenter', callbacks.onDragEnter);
	            zoneRef?.removeEventListener('dragleave', callbacks.onDragLeave);
	            zoneRef?.removeEventListener('dragover', callbacks.onDragOver);
	            zoneRef?.removeEventListener('drop', callbacks.onDrop);
	        };
	    }, []);
	    return (jsxRuntimeExports.jsx("div", { className: 'DropZone' + (isDragActive ? ' DropZone-active' : ''), style: props.style, ref: dropZoneRef, children: props.children ? props.children : "Drop file here!" }));
	};
	var Drop = React.memo(DropZone);

	const Editor = mobxReactLite.observer((props) => {
	    const { menuStore } = useStore();
	    const mapTitle = React.useMemo(() => {
	        return mapProps.get(menuStore.selectedMap).title;
	    }, [menuStore.selectedMap]);
	    const callbacks = {
	        onFilesDrop: React.useCallback((files) => {
	            files[0].text().then((value) => props.onFileDrop?.(files[0].name.split('.')[0], value));
	            gaEvent("Editor", "Drop file", mapTitle);
	        }, []),
	        onDownload: React.useCallback(() => {
	            props.onDownload();
	            gaEvent("Editor", "Download bank", mapTitle);
	        }, []),
	        onCopy: React.useCallback(() => {
	            props.onCopy();
	            gaEvent("Editor", "Copy code", mapTitle);
	        }, []),
	        onReset: React.useCallback(() => {
	            props.onReset();
	            gaEvent("Editor", "Reset", mapTitle);
	        }, []),
	    };
	    const header = React.useMemo(() => {
	        return (jsxRuntimeExports.jsxs(Flex, { style: { flexDirection: 'row' }, children: [jsxRuntimeExports.jsxs(Flex, { style: { flexDirection: 'column', width: '250px' }, alignInputs: true, children: [jsxRuntimeExports.jsx(Input$1, { label: "BankName:", placeholder: "BankFileName", onChange: props.onBankNameChange, tip: "Bank filename without *.SC2Bank extension", value: props.bankName }), jsxRuntimeExports.jsx(Input$1, { label: "Author id:", placeholder: "X-S2-X-XXXXXXX", onChange: props.onAuthorIdChange, tip: "Author ID from bank's path", value: props.authorID })] }), jsxRuntimeExports.jsx(Drop, { onFilesDrop: callbacks.onFilesDrop })] }));
	    }, [props.bankName, props.authorID]);
	    const line = React.useMemo(() => {
	        return (jsxRuntimeExports.jsx(Line$1, { style: { margin: '10px 0 0 0' } }));
	    }, []);
	    const buttons = React.useMemo(() => {
	        return (jsxRuntimeExports.jsxs(Flex, { style: { flexDirection: 'row', justifyContent: 'flex-end' }, children: [jsxRuntimeExports.jsx(Button$1, { onClick: callbacks.onDownload, children: "Download bank" }), jsxRuntimeExports.jsx(Button$1, { onClick: callbacks.onCopy, children: "Copy code" }), jsxRuntimeExports.jsx(Button$1, { onClick: callbacks.onReset, children: "Reset" })] }));
	    }, [props.onDownload, props.onCopy]);
	    return (jsxRuntimeExports.jsxs(Flex, { style: { flexDirection: 'column', padding: '10px', width: 'max-content', height: 'max-content', minWidth: 'max-content', minHeight: 'max-content' }, children: [header, line, props.children, line, buttons] }));
	});
	var Editor$1 = React.memo(Editor);

	const AnySimple = mobxReactLite.observer((props) => {
	    const { accountStore, menuStore, mapStore, modalStore } = useStore();
	    const [bankName, setBankName] = React.useState('');
	    const [authorID, setAuthorID] = React.useState('');
	    const [sxml, setSXML] = React.useState('');
	    const mapTitle = mapProps.get(Maps.ANY_SIMPLE).title;
	    const bank = React.useMemo(() => {
	        return new Bank(bankName, authorID, menuStore.playerID, '1');
	    }, [accountStore.current, menuStore.playerID, bankName, authorID]);
	    React.useEffect(() => {
	        const storeParams = mapStore.list[accountStore.current]?.[mapTitle];
	        if (!storeParams) {
	            callbacks.onResetClick();
	            return;
	        }
	        setBankName(storeParams.bankName);
	        setAuthorID(storeParams.authorID);
	        setSXML(storeParams.xml);
	    }, [accountStore.current]);
	    const save = () => {
	        mapStore.setMapData(accountStore.current, mapTitle, { bankName, authorID, xml: sxml });
	    };
	    React.useEffect(() => {
	        if (menuStore.autoSave)
	            save();
	    }, [bankName, authorID, sxml]);
	    const callbacks = {
	        onBankNameChange: React.useCallback((value) => {
	            setBankName(value);
	        }, []),
	        onAuthorIdChange: React.useCallback((value) => {
	            setAuthorID(value);
	        }, []),
	        onFileDrop: React.useCallback((name, value) => {
	            bank.parse(value);
	            bank.sort();
	            setBankName(name);
	            setSXML(bank.getAsString());
	        }, []),
	        onDownloadClick: React.useCallback(() => {
	            if (menuStore.playerID.split('-').length != 4 || authorID.split('-').length != 4 || bankName.length < 1)
	                modalStore.setModal('WARN', 'This map need a BankName, AuthorID and PlayerID to generate valid signature! Read Help for details.');
	            downloadTextAsFile(sxml, bankName + '.SC2Bank', true);
	            if (!menuStore.autoSave)
	                save();
	        }, [bank, sxml]),
	        onCopyCodeClick: React.useCallback(() => {
	            if (menuStore.playerID.split('-').length != 4 || authorID.split('-').length != 4 || bankName.length < 1)
	                modalStore.setModal('WARN', 'This map need a BankName, AuthorID and PlayerID to generate valid signature! Read Help for details.');
	            copyTextToClipboard(sxml, true);
	            if (!menuStore.autoSave)
	                save();
	        }, [bank, sxml]),
	        onResetClick: React.useCallback(() => {
	            setBankName('');
	            setAuthorID('');
	            setSXML('');
	        }, []),
	        onFieldChange: React.useCallback((value) => {
	            setSXML(value);
	        }, []),
	        updateSignature: React.useCallback(() => {
	            bank.parse(sxml);
	            bank.sort();
	            bank.updateSignature();
	            setSXML(bank.getAsString());
	        }, [bank, sxml]),
	    };
	    const form = React.useMemo(() => {
	        return (jsxRuntimeExports.jsxs(Flex, { style: { flexDirection: 'column' }, children: [jsxRuntimeExports.jsx(Label$1, { children: "Simple text editor for any banks, that protected with signature only. Drop file to edit it." }), jsxRuntimeExports.jsx(mui.TextField, { sx: {
	                        width: '900px',
	                        "& .MuiInputBase-root": {
	                            color: '#CCCCFF',
	                            fontFamily: 'Consolas',
	                            fontSize: '12px'
	                        },
	                        "& .MuiFormLabel-root": {
	                            color: '#7777FF',
	                            fontFamily: 'Consolas'
	                        },
	                        "& .MuiFormLabel-root.Mui-focused": {
	                            color: '#CCCCFF',
	                            fontFamily: 'Consolas'
	                        }
	                    }, id: "standard-multiline-flexible", label: "XML Bank Data", multiline: true, minRows: 10, maxRows: 30, value: sxml, onChange: (e) => callbacks.onFieldChange(e.target.value), variant: "standard", InputProps: { disableUnderline: true, spellCheck: 'false' } }), jsxRuntimeExports.jsx(Button$1, { onClick: callbacks.updateSignature, style: { width: '150px' }, children: "Update Signature" })] }));
	    }, [bank, sxml]);
	    return (jsxRuntimeExports.jsx(Editor$1, { bankName: bankName, authorID: authorID, onBankNameChange: callbacks.onBankNameChange, onAuthorIdChange: callbacks.onAuthorIdChange, onFileDrop: callbacks.onFileDrop, onDownload: callbacks.onDownloadClick, onCopy: callbacks.onCopyCodeClick, onReset: callbacks.onResetClick, children: form }));
	});
	var AnySimple$1 = React.memo(AnySimple);

	const Checkbox = (props) => {
	    const id = React.useMemo(() => {
	        return props.label ? props.label + Math.random() * 100000 : null;
	    }, [props.label]);
	    const [value, setValue] = React.useState(props.value);
	    React.useEffect(() => {
	        setValue(props.value);
	    }, [props.value]);
	    const onChange = React.useCallback((e) => {
	        const value = e.target.checked;
	        setValue(value);
	        props.onChange(value, props.index, props.group);
	    }, []);
	    return (jsxRuntimeExports.jsxs("div", { className: 'Checkbox', "data-tooltip": props.tip, children: [props.label ? jsxRuntimeExports.jsx(Label$1, { for: id, children: props.label }) : null, jsxRuntimeExports.jsx("input", { className: 'Checkbox-rect', style: props.style, type: "checkbox", id: id, checked: value, onChange: onChange })] }));
	};
	var Checkbox$1 = React.memo(Checkbox);

	const Select = (props) => {
	    const id = React.useMemo(() => {
	        return props.label ? props.label + Math.random() * 100000 : null;
	    }, [props.label]);
	    const options = React.useMemo(() => {
	        return jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: props.children.map((item, index) => {
	                return jsxRuntimeExports.jsx("option", { value: item.value, selected: props.selected == item.value, className: "Select-option", children: item.label }, index);
	            }) });
	    }, [props.children, props.selected]);
	    return (jsxRuntimeExports.jsxs("div", { className: 'Select', children: [props.label ? jsxRuntimeExports.jsx(Label$1, { for: id, children: props.label }) : null, jsxRuntimeExports.jsx("select", { id: id, className: 'Select-box', style: props.style, placeholder: props.placeholder, onChange: (e) => props.onChange(e.target.value, props.index, props.group), children: options })] }));
	};
	var Select$1 = React.memo(Select);

	class StarCode {
	    constructor() {
	        this.ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!$%/()=?,.-;:_^#+* @{[]}|~`';
	        this.ALENGTH = this.ALPHABET.length;
	        this.AMAP = new Map();
	        for (let i = 0; i < this.ALENGTH; i++)
	            this.AMAP.set(this.ALPHABET.charAt(i), i);
	        this.reset();
	        console.log('starcode initialized.');
	    }
	    encrypt(s, key) {
	        const ls = s.length;
	        const lk = key.length;
	        let out = '';
	        for (let i = 0; i < ls; i++)
	            out += this.shift(s.charAt(i), key.charAt(i % lk), true);
	        return out;
	    }
	    decrypt(s, key) {
	        const ls = s.length;
	        const lk = key.length;
	        let out = '';
	        for (let i = 0; i < ls; i++)
	            out += this.shift(s.charAt(i), key.charAt(i % lk), false);
	        return out;
	    }
	    compress(s) {
	        const n = this.ALENGTH.toString();
	        let out = '';
	        while (s != '0') {
	            out = this.chr(parseInt(this.modulo(s, n))) + out;
	            s = this.divide(s, n);
	        }
	        return out;
	    }
	    decompress(s) {
	        const n = this.ALENGTH.toString();
	        const sl = s.length;
	        let out = '0';
	        for (let i = 0; i < sl; i++)
	            out = this.add(out, this.multiply(this.power(n, sl - (i + 1)), this.ord(s.charAt(i)).toString()));
	        return out;
	    }
	    getInt(maxValue) {
	        const value = parseInt(this.modulo(this.code, (maxValue + 1).toString()));
	        this.code = this.divide(this.code, (maxValue + 1).toString());
	        return value;
	    }
	    setInt(value, maxValue) {
	        if (value > maxValue)
	            throw new Error('STARCODE: value must be less or equal to maxValue!');
	        this.code = this.add(this.multiply(this.code, (maxValue + 1).toString()), value.toString());
	    }
	    addHash(s, n) {
	        return this.hash(s, n) + s;
	    }
	    removeHash(s, n) {
	        return s.substring(n);
	    }
	    validate(s, level, useTest = false) {
	        const test = useTest ? s.substring(0, level) : null;
	        return this.hash(s.substring(level), level, test) == s.substring(0, level);
	    }
	    reset() {
	        this.code = '0';
	    }
	    compressAndEncrypt(key) {
	        return this.code = this.encrypt(this.compress(this.code), key);
	    }
	    decryptAndDecompress(s, key) {
	        return this.code = this.decompress(this.decrypt(s, key));
	    }
	    add(a, b) {
	        b.length > a.length ? a = this.fill(a, b.length) : b = this.fill(b, a.length);
	        let carry = 0;
	        let out = '';
	        for (let i = a.length - 1; i >= 0; i--) {
	            const c = parseInt(a.charAt(i)) + parseInt(b.charAt(i));
	            out = ((c + carry) % 10).toString() + out;
	            carry = Math.floor((c + carry) / 10);
	        }
	        return carry ? carry.toString() + out : out;
	    }
	    subtract(a, b) {
	        b.length > a.length ? a = this.fill(a, b.length) : b = this.fill(b, a.length);
	        let out = '';
	        let carry = 0;
	        for (let i = a.length - 1; i >= 0; i--) {
	            let c = parseInt(a.charAt(i)) - parseInt(b.charAt(i)) - carry;
	            if (c < 0) {
	                carry = 1;
	                c += 10;
	            }
	            else
	                carry = 0;
	            out = c.toString() + out;
	        }
	        return this.cut(out);
	    }
	    multiply(a, b) {
	        if (b == '0')
	            return '0';
	        const m = parseInt(b);
	        let carry = 0;
	        let out = '';
	        for (let i = a.length - 1; i >= 0; i--) {
	            const c = parseInt(a.charAt(i)) * m + carry;
	            out = (c % 10).toString() + out;
	            carry = Math.floor(c / 10);
	        }
	        if (carry > 0)
	            out = carry.toString() + out;
	        return out;
	    }
	    divide(a, b) {
	        const d = parseInt(b);
	        const la = a.length;
	        let carry = 0;
	        let out = '';
	        for (let i = 0; i < la; i++) {
	            const c = (parseInt(a.charAt(i))) + carry * 10;
	            out += Math.floor(c / d).toString();
	            carry = c % d;
	        }
	        return this.cut(out);
	    }
	    modulo(a, b) {
	        const d = parseInt(b);
	        const la = a.length;
	        let carry = 0;
	        for (let i = 0; i < la; i++)
	            carry = (parseInt(a.charAt(i)) + carry * 10) % d;
	        return carry.toString();
	    }
	    cut(s) {
	        const n = s.length - 1;
	        let i = 0;
	        while (i < n && s.charAt(i) == '0')
	            i++;
	        return s.substring(i);
	    }
	    power(a, pow) {
	        if (pow <= 0)
	            return '1';
	        let out = a;
	        while (pow > 1) {
	            out = this.multiply(out, a);
	            pow--;
	        }
	        return out;
	    }
	    chr(i) {
	        return this.ALPHABET.charAt(i);
	    }
	    ord(i) {
	        return this.AMAP.get(i);
	    }
	    shift(s, k, forward = true) {
	        if (forward)
	            return this.chr((this.ord(s) + this.ord(k)) % this.ALENGTH);
	        const c = this.ord(s) - this.ord(k);
	        if (c < 0)
	            return this.chr((c + this.ALENGTH) % this.ALENGTH);
	        return this.chr(c % this.ALENGTH);
	    }
	    fill(s, i) {
	        i -= s.length;
	        let t = '';
	        while (i > 0) {
	            t += '0';
	            i--;
	        }
	        return t + s;
	    }
	    hash(s, v, test) {
	        let out = '0';
	        for (let i = s.length - 1; i >= 0; i--)
	            out = this.add(out, (this.ord(s.charAt(i)) * (i + 1)).toString());
	        if (!test)
	            return this.fill(this.compress(this.modulo(out, this.int(Math.pow(this.ALENGTH, v)).toString())), v);
	        let max = 172319;
	        const nextTest = (origin) => {
	            max++;
	            let pow = Math.pow(this.ALENGTH, v);
	            pow = pow > max ? pow = max : pow;
	            const hash = this.fill(this.compress(this.modulo(out, pow.toString())), v);
	            if (max % 1000 == 0)
	                console.log('max:', max, '; hash:', hash, '; origin:', origin);
	            if (hash != origin)
	                setTimeout(test, 5, out, v);
	            else
	                console.log('max found!:', max, '; hash:', hash, '; origin:', origin);
	        };
	        nextTest(test);
	        return 'test';
	    }
	    int(n) {
	        const sc2FixedMax = 172319;
	        if (n > sc2FixedMax)
	            return sc2FixedMax;
	        return Math.floor(n);
	    }
	}
	var starcode = new StarCode();

	class SCService {
	    write(queue, key, options) {
	        starcode.reset();
	        const length = queue.length;
	        for (let i = 0; i < length; i++)
	            starcode.setInt(queue[i].current, queue[i].max);
	        if (options) {
	            options.compress ? starcode.code = starcode.compress(starcode.code) : starcode.code;
	            options.hash ? starcode.code = starcode.addHash(starcode.code, options.hash) : starcode.code;
	            options.encrypt ? starcode.code = starcode.encrypt(starcode.code, key) : starcode.code;
	        }
	        else
	            starcode.compressAndEncrypt(key);
	        return starcode.code;
	    }
	    read(code, queue, key, options) {
	        starcode.code = code;
	        if (options) {
	            options.decrypt ? starcode.code = starcode.decrypt(starcode.code, key) : starcode.code;
	            options.dehash ? starcode.code = starcode.removeHash(starcode.code, options.dehash) : starcode.code;
	            options.decompress ? starcode.code = starcode.decompress(starcode.code) : starcode.code;
	        }
	        else
	            starcode.decryptAndDecompress(starcode.code, key);
	        let i = queue.length - 1;
	        while (i >= 0) {
	            queue[i].update(starcode.getInt(queue[i].max));
	            i--;
	        }
	    }
	}
	var sc = new SCService();

	class SCParam {
	    constructor(current, max, description = '') {
	        this._current = current;
	        this._max = max;
	        this._description = description;
	    }
	    update(current) {
	        this._current = current;
	        return this;
	    }
	    writeTo(starCode) {
	        starCode.setInt(this._current, this._max);
	    }
	    get current() {
	        return this._current;
	    }
	    get max() {
	        return this._max;
	    }
	    get description() {
	        return this._description;
	    }
	}

	let Store$6 = class Store extends BasicStore {
	    setFields(fields) {
	        this.info = fields?.info ? [...fields.info] : [];
	        this.units = fields?.units ? [...fields.units] : [];
	    }
	    updateAt(field, index, value, mutation) {
	        if (field != 'units' && typeof value == 'number') {
	            if (mutation) {
	                this[field][index].update(value);
	                return;
	            }
	            const p = [...this[field]];
	            p[index].update(value);
	            this[field] = p;
	            return;
	        }
	        if (field == 'units' && typeof value == 'object') {
	            if (mutation) {
	                if (!value) {
	                    this.units[index][0].update(0);
	                    return;
	                }
	                this.units[index][value.param].update(value.value);
	                return;
	            }
	            const p = [...this.units];
	            if (!value)
	                p[index][0].update(0);
	            else
	                p[index][value.param].update(value.value);
	            this[field] = p;
	        }
	    }
	    setUnit(slot, unit, mutation) {
	        if (slot < 0 || slot > 7)
	            throw new Error('RLR4 Store: setUnit: slot is out of range!');
	        if (!unit) {
	            this.updateAt('units', slot, null, mutation);
	            return;
	        }
	        if (typeof unit.type == 'number') {
	            this.updateAt('units', slot, { param: 0, value: unit.type }, mutation);
	        }
	        if (unit.level) {
	            this.updateAt('units', slot, { param: 1, value: this._exp[unit.level - 1] }, mutation);
	            this.updateAt('units', slot, { param: 7, value: unit.level }, mutation);
	            this.updateAt('units', slot, { param: 8, value: unit.level * 4 }, mutation);
	        }
	    }
	    fromLocalStorage(fields) {
	        if (!fields)
	            return;
	        const units = [];
	        fields.units.forEach((unit, i) => {
	            const params = [];
	            unit.forEach((param, j) => {
	                params.push(new SCParam(param._current, param._max, param._description));
	            });
	            units.push(params);
	        });
	        this.units = units;
	        const info = [];
	        fields.info.forEach((param, i) => {
	            info.push(new SCParam(param._current, param._max, param._description));
	        });
	        this.info = info;
	    }
	    updateChecksums(paylerNumber, mutation) {
	        for (let i; i < 8; i++)
	            this.updateAt('slots', i, this.units[i][0] ? 1 : 0, mutation);
	        this.updateAt('camera', 0, this.sumOfStats, mutation);
	        this.updateAt('camera', 1, this.sumOfUnits + paylerNumber, mutation);
	    }
	    reset() {
	        this.init();
	    }
	    get sumOfStats() {
	        let sum = 0;
	        for (let i = 0; i < 17; i++)
	            if (i < 10 || i > 12)
	                sum += this.info[i].current;
	        return sum;
	    }
	    get sumOfUnits() {
	        let sum = 0;
	        this.units.forEach((unit) => {
	            if (unit[0].current > 0)
	                for (let i = 1; i < 9; i++)
	                    if (i != 7)
	                        sum += unit[i].current;
	        });
	        return sum;
	    }
	    init() {
	        this.camera = [
	            new SCParam(0, 99000000, 'Sum of all stats'),
	            new SCParam(0, 98000000, 'Sum of all units and account')
	        ];
	        this.info = [
	            new SCParam(500, 190000, 'Normal games'),
	            new SCParam(25, 100000, 'Normal games won'),
	            new SCParam(55, 110000, 'Hard games'),
	            new SCParam(5, 120000, 'Hard games won'),
	            new SCParam(12000, 90300000, 'Total saves'),
	            new SCParam(99999, 94000000, 'Total score'),
	            new SCParam(2000, 96000000, 'Total deaths'),
	            new SCParam(200, 150000, 'Boss1 kills'),
	            new SCParam(100, 160000, 'Boss2 kills'),
	            new SCParam(25, 170000, 'Boss3 kills'),
	            new SCParam(25, 180000, 'Insane games'),
	            new SCParam(2, 190000, 'Insane games won'),
	            new SCParam(1, 200000, 'Not used'),
	            new SCParam(5, 210000, 'Time mode games'),
	            new SCParam(1, 220000, 'Time mode games won'),
	            new SCParam(99999, 230000, 'Minigame high score'),
	            new SCParam(999, 240000, 'Time mode best score'),
	            new SCParam(72, 1000, 'Distance'),
	            new SCParam(90, 1001, 'Rotation'),
	            new SCParam(90, 1002, 'Angle'),
	            new SCParam(1, 1003, 'Camera follow unit'),
	            new SCParam(0, 1004, 'Hide tips'),
	            new SCParam(1, 1005, 'Hud on'),
	            new SCParam(0, 1006, 'Mini map'),
	            new SCParam(0, 1007, 'Energy bar'),
	            new SCParam(0, 1008, 'Exp bar'),
	            new SCParam(0, 1009, 'Menu'),
	            new SCParam(1, 1010, 'WASD'),
	            new SCParam(0, 10, 'Increase distance'),
	            new SCParam(0, 11, 'Decrease distance'),
	            new SCParam(0, 12, 'Rotation right'),
	            new SCParam(0, 13, 'Rotation left'),
	            new SCParam(1, 14, 'Follow runling')
	        ];
	        this.slots = [
	            new SCParam(1, 425, 'Slot 1'),
	            new SCParam(1, 426, 'Slot 2'),
	            new SCParam(1, 427, 'Slot 3'),
	            new SCParam(1, 428, 'Slot 4'),
	            new SCParam(1, 429, 'Slot 5'),
	            new SCParam(1, 430, 'Slot 6'),
	            new SCParam(1, 431, 'Slot 7'),
	            new SCParam(1, 432, 'Slot 8')
	        ];
	        this.units = [];
	        for (let i = 0; i < 8; i++)
	            this.units.push([
	                new SCParam(2, 300000, 'Unit Type'),
	                new SCParam(300000, 8100000, 'Exp'),
	                new SCParam(0, 320000, 'Regen'),
	                new SCParam(0, 330000, 'Energy'),
	                new SCParam(0, 340000, 'Speed'),
	                new SCParam(0, 350000, 'Skill 1'),
	                new SCParam(0, 360000, 'Skill 2'),
	                new SCParam(75, 370000, 'Level'),
	                new SCParam(300, 380000, 'Free Points')
	            ]);
	        this._exp = [0, 2, 6, 13, 24, 40, 62, 92, 131, 180,
	            240, 312, 397, 498, 612, 742, 889, 1054, 1238, 1442,
	            1667, 1914, 2184, 2478, 2797, 3142, 3514, 3914, 4343, 4802,
	            5292, 5814, 6369, 6958, 7582, 8242, 8939, 9674, 10448, 11262,
	            12117, 13014, 13954, 14938, 15969, 17042, 18164, 19334, 20553, 21820,
	            23140, 24512, 25937, 27416, 28950, 30540, 32187, 33892, 35656, 37480,
	            39365, 41312, 43322, 45396, 47535, 49739, 52009, 54346, 56751, 59225,
	            61769, 64384, 67072, 69834, 72671];
	    }
	    get isUnitsCorrect() {
	        this.units.forEach((q) => {
	            const p = q[2].current + q[3].current + q[4].current + q[8].current + (q[5].current + q[6].current) * 4;
	            if (p < 0 || p > 300)
	                throw new Error('Points out of range (0-300)!');
	            if (q[0].current < 1 || q[0].current > 5)
	                throw new Error('Undefined unit type! Use 1, 2, 3, 4 or 5');
	            if (q[7].current < 1 || q[7].current > 75)
	                throw new Error('Unit level out of range (1-75)!');
	            if (q[7].current * 4 != p)
	                throw new Error('level or scores are incorrect!');
	            if (q[2].current > 200 || q[3].current > 200 || q[4].current > 200)
	                throw new Error('Energy, regen, speed: 200 max');
	            if (q[5].current > 20 || q[6].current > 20)
	                throw new Error('Skill: 20 max');
	        });
	        return true;
	    }
	};
	var store$6 = new Store$6();

	let Functions$6 = class Functions {
	    constructor() {
	        this.STARCODE_KEY = 'WalkerKey';
	    }
	    generateXML(bank) {
	        store$6.updateChecksums(bank.info.getPlayerNumber(), true);
	        store$6.units.forEach((queue, index) => {
	            if (queue[0].current > 0)
	                bank.addKey('0' + (index + 1), 'STRING', sc.write(queue, this.STARCODE_KEY), 'unit');
	        });
	        bank.addKey('info', 'STRING', sc.write(store$6.slots, this.STARCODE_KEY), 'unit');
	        bank.addKey('info', 'STRING', sc.write(store$6.info, this.STARCODE_KEY), 'account');
	        bank.addKey('camera', 'STRING', sc.write(store$6.camera, this.STARCODE_KEY), 'account');
	        bank.sort();
	        bank.updateSignature();
	        return bank.getAsString();
	    }
	    parse(bank, value) {
	        bank.parse(value);
	        if (bank.sections.size != 2 || bank.sections.get('unit') == null || bank.sections.get('account') == null) {
	            console.error('wrong bank file!');
	            return null;
	        }
	        const units = [];
	        for (let i = 0; i < 8; i++)
	            units.push([...store$6.units[i]]);
	        for (let i = 0; i < 8; i++) {
	            const code = bank.getKey('0' + (i + 1), 'unit')?.value;
	            if (code)
	                sc.read(code, units[i], this.STARCODE_KEY);
	            else
	                units[i][0].update(0);
	        }
	        const info = [...store$6.info];
	        sc.read(bank.getKey('info', 'account').value, info, this.STARCODE_KEY);
	        return { info, units };
	    }
	};
	var functions$6 = new Functions$6();

	const RunlingRun4Form = mobxReactLite.observer((props) => {
	    const { accountStore, menuStore, mapStore, modalStore } = useStore();
	    const [bankName, setBankName] = React.useState(props.bankName);
	    const [authorID, setAuthorID] = React.useState(mapProps.get(Maps.RUNLING_RUN_4).authorID);
	    const mapTitle = mapProps.get(Maps.RUNLING_RUN_4).title;
	    const bank = React.useMemo(() => {
	        return new Bank(bankName, authorID, menuStore.playerID, '1');
	    }, [accountStore.current, menuStore.playerID, bankName, authorID]);
	    const unitSelectorData = React.useMemo(() => {
	        return [
	            { value: '0', label: 'Empty' },
	            { value: '1', label: 'Ling' },
	            { value: '2', label: 'Bane' },
	            { value: '3', label: 'Hydra' },
	            { value: '4', label: 'Ultra' },
	            { value: '5', label: 'Roach' }
	        ];
	    }, []);
	    React.useEffect(() => {
	        const fields = mapStore.list[accountStore.current]?.[mapTitle];
	        if (fields)
	            store$6.fromLocalStorage(fields);
	        else
	            setTimeout(callbacks.onResetClick);
	    }, [accountStore.current]);
	    const save = () => {
	        mapStore.setMapData(accountStore.current, mapTitle, { units: store$6.units, info: store$6.info });
	    };
	    const callbacks = {
	        onBankNameChange: React.useCallback((value) => {
	            setBankName(value);
	        }, []),
	        onAuthorIdChange: React.useCallback((value) => {
	            setAuthorID(value);
	        }, []),
	        onFileDrop: React.useCallback((name, value) => {
	            const fields = functions$6.parse(bank, value);
	            if (!fields)
	                return;
	            require$$0.flushSync(() => store$6.setFields());
	            store$6.setFields(fields);
	        }, []),
	        onDownloadClick: React.useCallback(() => {
	            if (menuStore.playerID.split('-').length != 4) {
	                modalStore.setModal('WARN', 'This map requires a player id to generate valid bank! Use Help for details.');
	                return;
	            }
	            downloadTextAsFile(functions$6.generateXML(bank), bankName + '.SC2Bank', true);
	            if (!menuStore.autoSave)
	                save();
	        }, [bank]),
	        onCopyCodeClick: React.useCallback(() => {
	            if (menuStore.playerID.split('-').length != 4) {
	                modalStore.setModal('WARN', 'This map requires a player id to generate valid bank! Use Help for details.');
	                return;
	            }
	            copyTextToClipboard(functions$6.generateXML(bank), true);
	            if (!menuStore.autoSave)
	                save();
	        }, [bank]),
	        onResetClick: React.useCallback(() => {
	            setBankName(props.bankName);
	            setAuthorID(mapProps.get(Maps.RUNLING_RUN_4).authorID);
	            require$$0.flushSync(() => store$6.setFields());
	            store$6.reset();
	        }, []),
	        onUnitTypeChange: React.useCallback((value, index) => {
	            store$6.setUnit(index, { type: parseInt(value) }, true);
	            if (menuStore.autoSave)
	                save();
	        }, []),
	        onUnitLevelChange: React.useCallback((value, index) => {
	            store$6.setUnit(index, { level: parseInt(value) }, true);
	            if (menuStore.autoSave)
	                save();
	        }, []),
	        onStatChange: React.useCallback((value, index) => {
	            store$6.updateAt('info', index, parseInt(value), true);
	            if (menuStore.autoSave)
	                save();
	        }, []),
	        onSettingChange: React.useCallback((value, index) => {
	            store$6.updateAt('info', index, index < 20 ? parseInt(value) : (value ? 1 : 0), true);
	            if (menuStore.autoSave)
	                save();
	        }, []),
	    };
	    const units = React.useMemo(() => {
	        return (jsxRuntimeExports.jsx(Flex, { style: { flexFlow: 'column', padding: '0', justifyContent: 'space-around', border: '1px solid #ffffff40' }, children: store$6.units.map((unit, index) => {
	                return (jsxRuntimeExports.jsxs(Flex, { style: { flexDirection: 'row', padding: '10px' }, children: [jsxRuntimeExports.jsx(Select$1, { label: 'Slot ' + (index + 1) + ':', index: index, style: { width: '90px' }, onChange: callbacks.onUnitTypeChange, selected: unit[0].current.toString(), children: unitSelectorData }), jsxRuntimeExports.jsx(Input$1, { label: 'Level:', index: index, type: 'number', min: '1', style: { width: '30px' }, onChange: callbacks.onUnitLevelChange, max: '75', tip: 'Level of unit (1-75)', value: unit[7].current.toString() })] }));
	            }) }));
	    }, [store$6.units]);
	    const stats = React.useMemo(() => {
	        return (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx(Flex, { style: { flexDirection: 'column', padding: '10px', border: '1px solid #ffffff40' }, alignInputs: true, children: store$6.info.map((param, index) => {
	                        if (index != 12 && index < 17)
	                            return (jsxRuntimeExports.jsx(Input$1, { label: param.description + ':', index: index, type: 'number', min: '0', style: { width: '45px' }, onChange: callbacks.onStatChange, max: param.max.toString(), value: param.current.toString() }));
	                        else
	                            return null;
	                    }) }), jsxRuntimeExports.jsx(Flex, { style: { flexDirection: 'column', padding: '10px', border: '1px solid #ffffff40' }, alignInputs: true, children: store$6.info.map((param, index) => {
	                        if (index < 17)
	                            return null;
	                        if (index < 20)
	                            return (jsxRuntimeExports.jsx(Input$1, { label: param.description + ':', index: index, type: 'number', min: '1', style: { width: '45px' }, onChange: callbacks.onSettingChange, max: param.max.toString(), value: param.current.toString() }));
	                        else
	                            return (jsxRuntimeExports.jsx(Checkbox$1, { label: param.description + ':', index: index, onChange: callbacks.onSettingChange, value: param.current == 1 }));
	                    }) })] }));
	    }, [store$6.info]);
	    const form = React.useMemo(() => {
	        return (jsxRuntimeExports.jsxs(Flex, { style: { flexDirection: 'row', padding: '0' }, children: [units, stats] }));
	    }, [store$6.units, store$6.info]);
	    return (jsxRuntimeExports.jsx(Editor$1, { bankName: bankName, authorID: authorID, onBankNameChange: callbacks.onBankNameChange, onAuthorIdChange: callbacks.onAuthorIdChange, onFileDrop: callbacks.onFileDrop, onDownload: callbacks.onDownloadClick, onCopy: callbacks.onCopyCodeClick, onReset: callbacks.onResetClick, children: form }));
	});
	var RunlingRun4 = React.memo(RunlingRun4Form);

	let Store$5 = class Store extends BasicStore {
	    setFields(fields) {
	        this.info = fields?.info ? [...fields.info] : [];
	        this.units = fields?.units ? [...fields.units] : [];
	    }
	    updateAt(field, index, value, mutation) {
	        if (field != 'units' && typeof value == 'number') {
	            if (mutation) {
	                this[field][index].update(value);
	                return;
	            }
	            const p = [...this[field]];
	            p[index].update(value);
	            this[field] = p;
	            return;
	        }
	        if (field == 'units' && typeof value == 'object') {
	            if (mutation) {
	                if (!value) {
	                    this.units[index][0].update(0);
	                    return;
	                }
	                this.units[index][value.param].update(value.value);
	                return;
	            }
	            const p = [...this.units];
	            if (!value)
	                p[index][0].update(0);
	            else
	                p[index][value.param].update(value.value);
	            this[field] = p;
	        }
	    }
	    setUnit(slot, unit, mutation) {
	        if (slot < 0 || slot > 7)
	            throw new Error('RLR8 Store: setUnit: slot is out of range!');
	        if (!unit) {
	            this.updateAt('units', slot, null, mutation);
	            return;
	        }
	        if (typeof unit.type == 'number') {
	            this.updateAt('units', slot, { param: 0, value: unit.type }, mutation);
	        }
	        if (unit.level) {
	            this.updateAt('units', slot, { param: 1, value: this._exp[unit.level - 1] }, mutation);
	            this.updateAt('units', slot, { param: 7, value: unit.level }, mutation);
	            this.updateAt('units', slot, { param: 8, value: unit.level * 4 }, mutation);
	        }
	    }
	    fromLocalStorage(fields) {
	        if (!fields)
	            return;
	        const units = [];
	        fields.units.forEach((unit, i) => {
	            const params = [];
	            unit.forEach((param, j) => {
	                params.push(new SCParam(param._current, param._max, param._description));
	            });
	            units.push(params);
	        });
	        this.units = units;
	        const info = [];
	        fields.info.forEach((param, i) => {
	            info.push(new SCParam(param._current, param._max, param._description));
	        });
	        this.info = info;
	    }
	    updateChecksums(paylerNumber, mutation) {
	        for (let i; i < 8; i++)
	            this.updateAt('slots', i, this.units[i][0] ? 1 : 0, mutation);
	        this.updateAt('camera', 0, this.sumOfStats, mutation);
	        this.updateAt('camera', 1, this.sumOfUnits + paylerNumber, mutation);
	        this.updateAt('set2', 0, paylerNumber, mutation);
	    }
	    reset() {
	        this.init();
	    }
	    get sumOfStats() {
	        let sum = 0;
	        for (let i = 0; i < 16; i++)
	            if (i < 10 || i > 12)
	                sum += this.info[i].current;
	        return sum;
	    }
	    get sumOfUnits() {
	        let sum = 0;
	        this.units.forEach((unit) => {
	            if (unit[0].current > 0)
	                for (let i = 1; i < 9; i++)
	                    if (i != 7)
	                        sum += unit[i].current;
	        });
	        return sum;
	    }
	    init() {
	        this.camera = [
	            new SCParam(0, 99000000, 'Sum of all stats'),
	            new SCParam(0, 98000000, 'Sum of all units and account')
	        ];
	        this.info = [
	            new SCParam(500, 90000, 'Normal games'),
	            new SCParam(25, 100000, 'Normal games won'),
	            new SCParam(55, 110000, 'Hard games'),
	            new SCParam(5, 120000, 'Hard games won'),
	            new SCParam(12000, 93000000, 'Total saves'),
	            new SCParam(99999, 94000000, 'Total score'),
	            new SCParam(2000, 96000000, 'Total deaths'),
	            new SCParam(200, 150000, 'Boss1 kills'),
	            new SCParam(100, 160000, 'Boss2 kills'),
	            new SCParam(25, 170000, 'Boss3 kills'),
	            new SCParam(25, 180000, 'Insane games'),
	            new SCParam(2, 190000, 'Insane games won'),
	            new SCParam(1, 200000, 'Not used'),
	            new SCParam(10, 210000, 'Chaos mode games'),
	            new SCParam(1, 220000, 'Chaos mode games won'),
	            new SCParam(25, 230000, 'Prestige'),
	            new SCParam(72, 1000, 'Distance'),
	            new SCParam(90, 1001, 'Rotation'),
	            new SCParam(90, 1002, 'Angle'),
	            new SCParam(1, 1003, 'Camera follow unit'),
	            new SCParam(0, 1004, 'Hide tips'),
	            new SCParam(1, 1005, 'Hud on'),
	            new SCParam(0, 1006, 'Mini map'),
	            new SCParam(0, 1007, 'Energy bar'),
	            new SCParam(0, 1008, 'Exp bar'),
	            new SCParam(0, 1009, 'Menu'),
	            new SCParam(1, 1010, 'WASD'),
	            new SCParam(0, 10, 'Increase distance'),
	            new SCParam(0, 11, 'Decrease distance'),
	            new SCParam(0, 12, 'Rotation right'),
	            new SCParam(0, 13, 'Rotation left'),
	            new SCParam(1, 14, 'Follow runling')
	        ];
	        this.slots = [
	            new SCParam(1, 425, 'Slot 1'),
	            new SCParam(1, 426, 'Slot 2'),
	            new SCParam(1, 427, 'Slot 3'),
	            new SCParam(1, 428, 'Slot 4'),
	            new SCParam(1, 429, 'Slot 5'),
	            new SCParam(1, 430, 'Slot 6'),
	            new SCParam(1, 431, 'Slot 7'),
	            new SCParam(1, 432, 'Slot 8')
	        ];
	        this.units = [];
	        for (let i = 0; i < 8; i++)
	            this.units.push([
	                new SCParam(i + 1, 300000, 'Unit Type'),
	                new SCParam(200000, 8100000, 'Exp'),
	                new SCParam(0, 320000, 'Regen'),
	                new SCParam(0, 330000, 'Energy'),
	                new SCParam(0, 340000, 'Speed'),
	                new SCParam(0, 350000, 'Skill 1'),
	                new SCParam(0, 360000, 'Skill 2'),
	                new SCParam(100, 370000, 'Level'),
	                new SCParam(400, 380000, 'Free Points')
	            ]);
	        this.set2 = [
	            new SCParam(0, 97000000, 'PlayerID numeric part'),
	        ];
	        this._exp = [
	            0, 3, 10, 22, 40, 65, 98, 140, 192, 255,
	            330, 418, 520, 637, 770, 920, 1088, 1275, 1482, 1710,
	            1960, 2233, 2530, 2852, 3200, 3575, 3978, 4410, 4872, 5365,
	            5890, 6448, 7040, 7667, 8330, 9030, 9768, 10545, 11362, 12220,
	            13120, 14063, 15095, 16173, 17298, 18471, 19693, 20965, 22288, 23663,
	            25091, 26573, 28110, 29703, 31353, 33061, 34828, 36655, 38543, 40493,
	            42506, 44583, 46725, 48933, 51208, 53551, 55963, 58445, 60998, 63623,
	            66321, 69093, 72016, 75016, 78094, 81251, 84488, 87806, 91206, 94689,
	            98256, 101908, 105646, 109471, 113384, 117386, 121478, 125661, 129936, 134304,
	            138766, 143323, 147976, 152726, 157574, 162521, 167568, 172716, 177966, 183319
	        ];
	    }
	    get isUnitsCorrect() {
	        this.units.forEach((q) => {
	            const p = q[2].current + q[3].current + q[4].current + q[8].current + (q[5].current + q[6].current) * 4;
	            if (p < 0 || p > 400)
	                throw new Error('Points out of range (0-300)!');
	            if (q[0].current < 0 || q[0].current > 8)
	                throw new Error('Undefined unit type! Use 0, 1, 2, 3, 4, 5, 6, 7, 8');
	            if (q[7].current < 1 || q[7].current > 100)
	                throw new Error('Unit level out of range (1-100)!');
	            if (q[7].current * 4 != p)
	                throw new Error('level or scores are incorrect!');
	            if (q[2].current > 200 || q[3].current > 200 || q[4].current > 200)
	                throw new Error('Energy, regen, speed: 200 max');
	            if (q[5].current > 20 || q[6].current > 20)
	                throw new Error('Skill: 20 max');
	        });
	        return true;
	    }
	};
	var store$5 = new Store$5();

	let Functions$5 = class Functions {
	    constructor() {
	        this.STARCODE_KEY = 'Ks8N10dj6L3M';
	    }
	    generateXML(bank) {
	        store$5.updateChecksums(bank.info.getPlayerNumber(), true);
	        store$5.units.forEach((queue, index) => {
	            if (queue[0].current > 0)
	                bank.addKey('0' + (index + 1), 'STRING', sc.write(queue, this.STARCODE_KEY), 'unit');
	        });
	        bank.addKey('info', 'STRING', sc.write(store$5.slots, this.STARCODE_KEY), 'unit');
	        bank.addKey('info', 'STRING', sc.write(store$5.info, this.STARCODE_KEY), 'account');
	        bank.addKey('camera', 'STRING', sc.write(store$5.camera, this.STARCODE_KEY), 'account');
	        bank.addKey('set2', 'STRING', sc.write(store$5.set2, this.STARCODE_KEY), 'account');
	        bank.sort();
	        bank.updateSignature();
	        return bank.getAsString();
	    }
	    parse(bank, value) {
	        bank.parse(value);
	        if (bank.sections.size != 2 || bank.sections.get('unit') == null || bank.sections.get('account') == null) {
	            console.error('wrong bank file!');
	            return null;
	        }
	        const units = [];
	        for (let i = 0; i < 8; i++)
	            units.push([...store$5.units[i]]);
	        for (let i = 0; i < 8; i++) {
	            const code = bank.getKey('0' + (i + 1), 'unit')?.value;
	            if (code)
	                sc.read(code, units[i], this.STARCODE_KEY);
	            else
	                units[i][0].update(0);
	        }
	        const info = [...store$5.info];
	        sc.read(bank.getKey('info', 'account').value, info, this.STARCODE_KEY);
	        return { info, units };
	    }
	};
	var functions$5 = new Functions$5();

	const RunlingRun8ILovePie = mobxReactLite.observer((props) => {
	    const { accountStore, menuStore, mapStore, modalStore } = useStore();
	    const [bankName, setBankName] = React.useState(props.bankName);
	    const [authorID, setAuthorID] = React.useState(mapProps.get(Maps.RUNLING_RUN_8).authorID);
	    const mapTitle = mapProps.get(Maps.RUNLING_RUN_8).title;
	    const bank = React.useMemo(() => {
	        return new Bank(bankName, authorID, menuStore.playerID, '1');
	    }, [accountStore.current, menuStore.playerID, bankName, authorID]);
	    const unitSelectorData = React.useMemo(() => {
	        return [
	            { value: '0', label: 'Empty' },
	            { value: '1', label: 'Ling' },
	            { value: '2', label: 'Bane' },
	            { value: '3', label: 'Hydra' },
	            { value: '4', label: 'Ultra' },
	            { value: '5', label: 'Roach' },
	            { value: '6', label: 'Impaler' },
	            { value: '7', label: 'Infested' },
	            { value: '8', label: 'Drone' }
	        ];
	    }, []);
	    React.useEffect(() => {
	        const fields = mapStore.list[accountStore.current]?.[mapTitle]?.ilovepie;
	        if (fields)
	            store$5.fromLocalStorage(fields);
	        else
	            setTimeout(callbacks.onResetClick);
	    }, [accountStore.current]);
	    const save = () => {
	        const prestige = mapStore.list[accountStore.current]?.[mapTitle]?.prestige;
	        mapStore.setMapData(accountStore.current, mapTitle, {
	            ilovepie: { units: store$5.units, info: store$5.info },
	            prestige
	        });
	    };
	    const callbacks = {
	        onBankNameChange: React.useCallback((value) => {
	            setBankName(value);
	        }, []),
	        onAuthorIdChange: React.useCallback((value) => {
	            setAuthorID(value);
	        }, []),
	        onFileDrop: React.useCallback((name, value) => {
	            const fields = functions$5.parse(bank, value);
	            if (!fields)
	                return;
	            require$$0.flushSync(() => store$5.setFields());
	            store$5.setFields(fields);
	        }, []),
	        onDownloadClick: React.useCallback(() => {
	            if (menuStore.playerID.split('-').length != 4) {
	                modalStore.setModal('WARN', 'This map requires a player id to generate valid bank! Use Help for details.');
	                return;
	            }
	            downloadTextAsFile(functions$5.generateXML(bank), bankName + '.SC2Bank', true);
	            if (!menuStore.autoSave)
	                save();
	        }, [bank]),
	        onCopyCodeClick: React.useCallback(() => {
	            if (menuStore.playerID.split('-').length != 4) {
	                modalStore.setModal('WARN', 'This map requires a player id to generate valid bank! Use Help for details.');
	                return;
	            }
	            copyTextToClipboard(functions$5.generateXML(bank), true);
	            if (!menuStore.autoSave)
	                save();
	        }, [bank]),
	        onResetClick: React.useCallback(() => {
	            setBankName(props.bankName);
	            setAuthorID(mapProps.get(Maps.RUNLING_RUN_8).authorID);
	            require$$0.flushSync(() => store$5.setFields());
	            store$5.reset();
	        }, []),
	        onUnitTypeChange: React.useCallback((value, index) => {
	            store$5.setUnit(index, { type: parseInt(value) }, true);
	            if (menuStore.autoSave)
	                save();
	        }, []),
	        onUnitLevelChange: React.useCallback((value, index) => {
	            store$5.setUnit(index, { level: parseInt(value) }, true);
	            if (menuStore.autoSave)
	                save();
	        }, []),
	        onStatChange: React.useCallback((value, index) => {
	            store$5.updateAt('info', index, parseInt(value), true);
	            if (menuStore.autoSave)
	                save();
	        }, []),
	        onSettingChange: React.useCallback((value, index) => {
	            store$5.updateAt('info', index, index < 19 ? parseInt(value) : (value ? 1 : 0), true);
	            if (menuStore.autoSave)
	                save();
	        }, []),
	    };
	    const [unitsStyle, unitTypeStlye, unitLevelStyle, statInputStyle] = React.useMemo(() => {
	        return [
	            { flexDirection: 'row', padding: '10px' },
	            { width: '90px' },
	            { width: '30px' },
	            { width: '45px' }
	        ];
	    }, []);
	    const units = React.useMemo(() => {
	        return (jsxRuntimeExports.jsx(Flex, { style: { flexFlow: 'column', padding: '0', justifyContent: 'space-around', border: '1px solid #ffffff40' }, children: store$5.units.map((unit, index) => {
	                return (jsxRuntimeExports.jsxs(Flex, { style: unitsStyle, children: [jsxRuntimeExports.jsx(Select$1, { label: 'Slot ' + (index + 1) + ':', index: index, style: unitTypeStlye, onChange: callbacks.onUnitTypeChange, selected: unit[0].current.toString(), children: unitSelectorData }), jsxRuntimeExports.jsx(Input$1, { label: 'Level:', index: index, type: 'number', min: '1', style: unitLevelStyle, onChange: callbacks.onUnitLevelChange, max: '100', placeholder: 'Level of unit (1-100)', value: unit[7].current.toString() })] }));
	            }) }));
	    }, [store$5.units]);
	    const stats = React.useMemo(() => {
	        return (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx(Flex, { style: { flexDirection: 'column', padding: '10px', border: '1px solid #ffffff40' }, alignInputs: true, children: store$5.info.map((param, index) => {
	                        if (index != 12 && index < 16)
	                            return (jsxRuntimeExports.jsx(Input$1, { label: param.description + ':', index: index, type: 'number', min: '0', style: statInputStyle, onChange: callbacks.onStatChange, max: param.max.toString(), value: param.current.toString() }));
	                        else
	                            return null;
	                    }) }), jsxRuntimeExports.jsx(Flex, { style: { flexDirection: 'column', padding: '10px', border: '1px solid #ffffff40' }, alignInputs: true, children: store$5.info.map((param, index) => {
	                        if (index < 16)
	                            return null;
	                        if (index < 19)
	                            return (jsxRuntimeExports.jsx(Input$1, { label: param.description + ':', index: index, type: 'number', min: '1', style: statInputStyle, onChange: callbacks.onSettingChange, max: param.max.toString(), value: param.current.toString() }));
	                        else
	                            return (jsxRuntimeExports.jsx(Checkbox$1, { label: param.description + ':', index: index, onChange: callbacks.onSettingChange, value: param.current == 1 }));
	                    }) })] }));
	    }, [store$5.info]);
	    const form = React.useMemo(() => {
	        return (jsxRuntimeExports.jsxs(Flex, { style: { flexDirection: 'row', padding: '0' }, children: [units, stats] }));
	    }, [store$5.units, store$5.info]);
	    return (jsxRuntimeExports.jsx(Editor$1, { bankName: bankName, authorID: authorID, onBankNameChange: callbacks.onBankNameChange, onAuthorIdChange: callbacks.onAuthorIdChange, onFileDrop: callbacks.onFileDrop, onDownload: callbacks.onDownloadClick, onCopy: callbacks.onCopyCodeClick, onReset: callbacks.onResetClick, children: form }));
	});
	var RunlingRun8ilovePie = React.memo(RunlingRun8ILovePie);

	let Store$4 = class Store extends BasicStore {
	    setFields(fields) {
	        this.active = fields?.active ? fields.active : false;
	        this.hide = fields?.hide ? fields.hide : false;
	    }
	    updateAt(field, value) {
	        this[field] = value;
	    }
	    reset() {
	        this.init();
	    }
	    init() {
	        this.active = false;
	        this.hide = false;
	    }
	};
	var store$4 = new Store$4();

	let Functions$4 = class Functions {
	    generateXML(bank) {
	        bank.addKey('Active', 'STRING', store$4.active ? '1' : '0', 'HUD');
	        bank.addKey('Hide', 'STRING', store$4.hide ? '1' : '0', 'HUD');
	        return bank.getAsString();
	    }
	    parse(bank, value) {
	        bank.parse(value);
	        if (bank.sections.size != 1 || bank.sections.get('HUD') == null)
	            throw new Error('Wrong bank file!');
	        const active = bank.getKey('Active', 'HUD').value == '1';
	        const hide = bank.getKey('Hide', 'HUD').value == '1';
	        return { active, hide };
	    }
	};
	var functions$4 = new Functions$4();

	const RunLingRun8Prestige = mobxReactLite.observer((props) => {
	    const { accountStore, mapStore, menuStore } = useStore();
	    const [bankName, setBankName] = React.useState(props.bankName);
	    const [authorID, setAuthorID] = React.useState(mapProps.get(Maps.RUNLING_RUN_8).authorID);
	    const mapTitle = mapProps.get(Maps.RUNLING_RUN_8).title;
	    const bank = React.useMemo(() => {
	        return new Bank(bankName, authorID, menuStore.playerID, '1');
	    }, [accountStore.current, menuStore.playerID, bankName, authorID]);
	    React.useEffect(() => {
	        const fields = mapStore.list[accountStore.current]?.[mapTitle]?.prestige;
	        if (fields)
	            store$4.setFields(fields);
	        else
	            setTimeout(callbacks.onResetClick);
	    }, [accountStore.current]);
	    const save = () => {
	        const ilovepie = mapStore.list[accountStore.current]?.[mapTitle]?.ilovepie;
	        mapStore.setMapData(accountStore.current, mapTitle, {
	            ilovepie,
	            prestige: { active: store$4.active, hide: store$4.hide }
	        });
	    };
	    const callbacks = {
	        onBankNameChange: React.useCallback((value) => {
	            setBankName(value);
	        }, []),
	        onAuthorIdChange: React.useCallback((value) => {
	            setAuthorID(value);
	        }, []),
	        onFileDrop: React.useCallback((name, value) => {
	            store$4.setFields(functions$4.parse(bank, value));
	        }, []),
	        onDownloadClick: React.useCallback(() => {
	            downloadTextAsFile(functions$4.generateXML(bank), bankName + '.SC2Bank', true);
	            if (!menuStore.autoSave)
	                save();
	        }, [bank]),
	        onCopyCodeClick: React.useCallback(() => {
	            copyTextToClipboard(functions$4.generateXML(bank), true);
	            if (!menuStore.autoSave)
	                save();
	        }, [bank]),
	        onResetClick: React.useCallback(() => {
	            setBankName(props.bankName);
	            setAuthorID(mapProps.get(Maps.RUNLING_RUN_8).authorID);
	            store$4.reset();
	        }, []),
	        onSettingChange: React.useCallback((value, index) => {
	            index == 0 ? store$4.updateAt('active', value) : store$4.updateAt('hide', value);
	            if (menuStore.autoSave)
	                save();
	        }, []),
	    };
	    const form = React.useMemo(() => {
	        return (jsxRuntimeExports.jsxs(Flex, { style: { flexDirection: 'column' }, children: [jsxRuntimeExports.jsx(Text$1, { children: "This bank file is for HUD only" }), jsxRuntimeExports.jsxs(Flex, { style: { flexDirection: 'row', padding: '10px' }, children: [jsxRuntimeExports.jsx(Checkbox$1, { label: 'Active' + ':', index: 0, onChange: callbacks.onSettingChange, value: store$4.active }), jsxRuntimeExports.jsx(Checkbox$1, { label: 'Hide' + ':', index: 1, onChange: callbacks.onSettingChange, value: store$4.hide })] })] }));
	    }, [store$4.active, store$4.hide]);
	    return (jsxRuntimeExports.jsx(Editor$1, { bankName: bankName, authorID: authorID, onBankNameChange: callbacks.onBankNameChange, onAuthorIdChange: callbacks.onAuthorIdChange, onFileDrop: callbacks.onFileDrop, onDownload: callbacks.onDownloadClick, onCopy: callbacks.onCopyCodeClick, onReset: callbacks.onResetClick, children: form }));
	});
	var RunlingRun8Prestige = React.memo(RunLingRun8Prestige);

	class SSFStorage {
	    constructor() {
	        this.data = '';
	    }
	    reset() {
	        this.data = '';
	    }
	    addInt(value) {
	        if (value < 0)
	            throw new Error('SSF Storage Error! Value negative.');
	        const sv = value.toString();
	        const sl = sv.length;
	        this.data += sl > 9 ? '9999999999' : sl + sv;
	    }
	    addBool(value) {
	        this.data += value ? '1' : '0';
	    }
	    getInt() {
	        if (this.data == '')
	            throw new Error('SSF Storage Error! Empty data.');
	        let s = this.data.substring(0, 1);
	        const n = parseInt(s);
	        if (n == 0 || n > this.data.length)
	            throw new Error('SSF Storage Error! Wrong length: ' + n + '; use data length: 1-' + this.data.length);
	        s = this.data.substring(1, n + 1);
	        this.data = this.data.substring(n + 1);
	        return parseInt(s);
	    }
	    getBool() {
	        if (this.data == '')
	            throw new Error('SSF Storage Error! Empty data.');
	        const s = this.data.substring(0, 1);
	        if (s != '0' && s != '1')
	            throw new Error('SSF Storage Error! Expected boolean (0 or 1).');
	        this.data = this.data.substring(1);
	        return s == '1' ? true : false;
	    }
	}
	var storage = new SSFStorage();

	let Store$3 = class Store extends BasicStore {
	    setFields(fields) {
	        this.light = fields?.light ? [...fields.light] : [];
	        this.heavy = fields?.heavy ? [...fields.heavy] : [];
	        this.speed = fields?.speed ? [...fields.speed] : [];
	        this.options = fields?.options ? [...fields.options] : [];
	        this.bools = fields?.bools ? [...fields.bools] : [];
	    }
	    updateAt(field, index, value, mutation) {
	        if (field != 'speed' && typeof index == 'number') {
	            if (mutation) {
	                this[field][index].value = value;
	                return;
	            }
	            const p = [...this[field]];
	            p[index].value = value;
	            this[field] = p;
	            return;
	        }
	        if (field == 'speed' && typeof index == 'object') {
	            if (mutation) {
	                this.speed[index.i][index.j][index.k].value = value;
	                return;
	            }
	            const p = [...this.speed];
	            p[index.i][index.j][index.k].value = value;
	            this[field] = p;
	        }
	        if (field == 'bools' && typeof index == 'object') {
	            if (mutation) {
	                this.bools[index.i].flags[index.j].value = value;
	                return;
	            }
	            const p = [...this.bools];
	            p[index.i].flags[index.j].value = value;
	            this[field] = p;
	        }
	    }
	    reset() {
	        this.init();
	    }
	    init() {
	        this.light = [];
	        this.heavy = [];
	        this.speed = [];
	        this.options = [];
	        this.bools = [
	            { part: 0, offset: 0, name: 'Flamer', flags: [] },
	            { part: 0, offset: 1, name: 'Hammer', flags: [] },
	            { part: 0, offset: 2, name: 'Fortress', flags: [] },
	            { part: 1, offset: 0, name: 'Madness', flags: [] },
	            { part: 1, offset: 1, name: 'Atlantis', flags: [] },
	            { part: 1, offset: 2, name: 'Lightning', flags: [] },
	            { part: 1, offset: 3, name: 'Thunder', flags: [] },
	            { part: 2, offset: 0, name: 'Raynor', flags: [] },
	            { part: 2, offset: 1, name: 'Kerrigan', flags: [] },
	            { part: 2, offset: 2, name: 'Artanis', flags: [] },
	            { part: 2, offset: 3, name: 'Cybermind', flags: [] },
	            { part: 3, offset: 0, name: 'Gary', flags: [] },
	            { part: 3, offset: 1, name: 'Stetmann', flags: [] },
	            { part: 3, offset: 2, name: 'Moopy', flags: [] },
	            { part: 0, name: 'FlawlessT', flags: [] },
	            { part: 1, name: 'FlawlessP', flags: [] },
	            { part: 2, name: 'FlawlessM', flags: [] }
	        ];
	    }
	};
	var store$3 = new Store$3();

	let Functions$3 = class Functions {
	    constructor() {
	        this.STARCODE_PART = 'gehkaggen11';
	        this.STARCODE_HASH = 4;
	        this.VERSION = 2011;
	    }
	    generateDefault(myKillz) {
	        const killz = myKillz ? myKillz : r(500000, 9000000);
	        const light = [
	            { type: 'number', value: killz, description: 'Kills' },
	            { type: 'number', value: Math.floor(killz / r(180, 220)), description: 'Points' },
	            { type: 'number', value: Math.floor(killz / r(3200, 3500)), description: 'Scientists' },
	            { type: 'number', value: Math.floor(killz / r(1500, 1800)), description: 'Essences' },
	            { type: 'number', value: Math.floor(killz / r(8000, 12000)), description: 'Psi Orbs' },
	            { type: 'number', value: Math.floor(killz / r(14000, 16000)), description: 'MoopyHats' }
	        ];
	        const heavy = [];
	        for (let i = 0; i < 3; i++) {
	            const wins = Math.floor(killz / r(1200 * (i + 1), 2000 * (i + 1)));
	            heavy.push({ type: 'number', value: wins, description: 'Wins ' + (i + 1) });
	        }
	        for (let i = 0; i < 4; i++)
	            heavy.push({ type: 'number', value: 0, description: 'Boss ' + (i + 1) + ' crypted', hidden: true });
	        heavy.push({ type: 'number', value: 0, description: 'Flawless crypted', hidden: true }, { type: 'boolean', value: true, description: 'Tutorial' }, { type: 'number', value: r(0, 10), description: 'ArchivedAcv' });
	        const speed = [];
	        for (let i = 0; i < 6; i++) {
	            speed.push([]);
	            for (let j = 0; j < 3; j++) {
	                speed[i].push([]);
	                for (let k = 0; k < 2; k++) {
	                    speed[i][j].push({ type: 'string', value: n2t(r(250, 500) * Math.pow((i + 1), 1.5) / (k + 1)), description: 'time ' });
	                }
	            }
	        }
	        const options = [
	            { type: 'number', value: 0, description: 'Hero type', hidden: true },
	            { type: 'boolean', value: false, description: 'Hero selected', hidden: true },
	            { type: 'boolean', value: false, description: 'Speedrun details', hidden: true },
	            { type: 'boolean', value: true, description: 'Hero panel' },
	            { type: 'boolean', value: false, description: 'Hive panel' },
	            { type: 'number', value: 0, description: 'Unit selection', hidden: true },
	            { type: 'boolean', value: true, description: 'Control group 1b', hidden: true },
	            { type: 'number', value: 1, description: 'Control group 1n', hidden: true },
	            { type: 'boolean', value: true, description: 'Control group 2b', hidden: true },
	            { type: 'number', value: 2, description: 'Control group 2n', hidden: true },
	            { type: 'boolean', value: true, description: 'Control group 3b', hidden: true },
	            { type: 'number', value: 3, description: 'Control group 3n', hidden: true },
	            { type: 'boolean', value: true, description: 'Control group 4b', hidden: true },
	            { type: 'number', value: 3, description: 'Control group 4n', hidden: true },
	            { type: 'boolean', value: true, description: 'Control group 5b', hidden: true },
	            { type: 'number', value: 3, description: 'Control group 5n', hidden: true }
	        ];
	        const bools = [...store$3.bools];
	        const totalBools = bools.length;
	        for (let i = 0; i < totalBools; i++)
	            bools[i].flags = this.makeSixBoolsFor(bools[i].name);
	        return { light, heavy, speed, options, bools };
	    }
	    parse(bank, value) {
	        bank.parse(value);
	        if (bank.sections.size != 1 || !bank.sections.has('stats')) {
	            console.error('Wrong bank file!');
	            return null;
	        }
	        this.reloadStorage(bank, 'lightData');
	        const light = [
	            { type: 'number', value: storage.getInt(), description: 'Kills' },
	            { type: 'number', value: storage.getInt(), description: 'Points' },
	            { type: 'number', value: storage.getInt(), description: 'Scientists' },
	            { type: 'number', value: storage.getInt(), description: 'Essences' },
	            { type: 'number', value: storage.getInt(), description: 'Psi Orbs' },
	            { type: 'number', value: storage.getInt(), description: 'MoopyHats' }
	        ];
	        storage.getInt();
	        if (storage.getInt() != this.VERSION)
	            throw new Error('Invaliid version in lightData');
	        this.reloadStorage(bank, 'heavyData');
	        const heavy = [];
	        for (let i = 0; i < 3; i++)
	            heavy.push({ type: 'number', value: storage.getInt(), description: 'Wins ' + (i + 1) });
	        for (let i = 0; i < 4; i++)
	            heavy.push({ type: 'number', value: storage.getInt(), description: 'Boss ' + (i + 1) + ' crypted', hidden: true });
	        heavy.push({ type: 'number', value: storage.getInt(), description: 'Flawless crypted', hidden: true }, { type: 'boolean', value: storage.getBool(), description: 'Tutorial' }, { type: 'number', value: storage.getInt(), description: 'ArchivedAcv' });
	        storage.getInt();
	        if (storage.getInt() != this.VERSION)
	            throw new Error('Invaliid version in heavyData');
	        this.reloadStorage(bank, 'speedrunsData');
	        const speed = [];
	        for (let i = 0; i < 6; i++) {
	            speed.push([]);
	            for (let j = 0; j < 3; j++) {
	                speed[i].push([]);
	                let solo = 0;
	                let team = 0;
	                for (let k = 0; k < 6; k++) {
	                    const v = storage.getInt();
	                    k < 4 ? solo = Math.max(solo, v) : team = Math.max(team, v);
	                }
	                speed[i][j].push({ type: 'string', value: n2t(solo), description: 'time ' });
	                speed[i][j].push({ type: 'string', value: n2t(team), description: 'time ' });
	            }
	        }
	        storage.getInt();
	        if (storage.getInt() != this.VERSION)
	            throw new Error('Invaliid version in speedrunsData');
	        storage.data = bank.getKey('options', 'stats').value;
	        const options = [
	            { type: 'number', value: storage.getInt(), description: 'Hero type', hidden: true },
	            { type: 'boolean', value: storage.getBool(), description: 'Hero selected', hidden: true },
	            { type: 'boolean', value: storage.getBool(), description: 'Speedrun details', hidden: true },
	            { type: 'boolean', value: storage.getBool(), description: 'Hero panel' },
	            { type: 'boolean', value: storage.getBool(), description: 'Hive panel' },
	            { type: 'number', value: storage.getInt(), description: 'Unit selection', hidden: true },
	            { type: 'boolean', value: storage.getBool(), description: 'Control group 1b', hidden: true },
	            { type: 'number', value: storage.getInt(), description: 'Control group 1n', hidden: true },
	            { type: 'boolean', value: storage.getBool(), description: 'Control group 2b', hidden: true },
	            { type: 'number', value: storage.getInt(), description: 'Control group 2n', hidden: true },
	            { type: 'boolean', value: storage.getBool(), description: 'Control group 3b', hidden: true },
	            { type: 'number', value: storage.getInt(), description: 'Control group 3n', hidden: true },
	            { type: 'boolean', value: storage.getBool(), description: 'Control group 4b', hidden: true },
	            { type: 'number', value: storage.getInt(), description: 'Control group 4n', hidden: true },
	            { type: 'boolean', value: storage.getBool(), description: 'Control group 5b', hidden: true },
	            { type: 'number', value: storage.getInt(), description: 'Control group 5n', hidden: true }
	        ];
	        return { light, heavy, speed, options, bools: store$3.bools };
	    }
	    generateXML(bank) {
	        bank.addSection('stats');
	        bank.addKey('version', 'FIXED', '2.01', 'stats');
	        storage.reset();
	        for (let i = 0; i < 6; i++)
	            storage.addInt(store$3.light[i].value);
	        storage.addInt(r(1, 500));
	        storage.addInt(this.VERSION);
	        bank.addKey('lightData', 'STRING', this.storageToSC(), 'stats');
	        storage.reset();
	        for (let i = 0; i < 10; i++)
	            if (store$3.heavy[i].type == 'number')
	                storage.addInt(store$3.heavy[i].value);
	            else
	                storage.addBool(store$3.heavy[i].value);
	        storage.addInt(r(1, 500));
	        storage.addInt(this.VERSION);
	        bank.addKey('heavyData', 'STRING', this.storageToSC(), 'stats');
	        storage.reset();
	        for (let i = 0; i < 6; i++)
	            for (let j = 0; j < 3; j++)
	                for (let k = 0; k < 6; k++)
	                    storage.addInt(t2n(k < 4 ? store$3.speed[i][j][0].value : store$3.speed[i][j][1].value));
	        storage.addInt(r(1, 500));
	        storage.addInt(this.VERSION);
	        bank.addKey('speedrunsData', 'STRING', this.storageToSC(), 'stats');
	        storage.reset();
	        for (let i = 0; i < 6; i++)
	            if (i > 0 && i < 5)
	                storage.addBool(store$3.options[i].value);
	            else
	                storage.addInt(store$3.options[i].value);
	        for (let i = 0; i < 10; i += 2) {
	            storage.addBool(store$3.options[i + 6].value);
	            storage.addInt(store$3.options[i + 7].value);
	        }
	        bank.addKey('options', 'STRING', storage.data, 'stats');
	        bank.sort();
	        bank.updateSignature();
	        return bank.getAsString();
	    }
	    recryptAchives() {
	        const crypto = [0, 0, 0, 0, 0];
	        for (let diff = 0; diff < 6; diff++)
	            for (let boss = 0; boss < 14; boss++)
	                if (store$3.bools[boss].flags[diff].value == true)
	                    crypto[store$3.bools[boss].part] ^= 1 << (diff + 6 * store$3.bools[boss].offset);
	        for (let diff = 0; diff < 6; diff++)
	            for (let part = 14; part < 17; part++)
	                if (store$3.bools[part].flags[diff].value == true)
	                    crypto[4] ^= 1 << (diff + 6 * store$3.bools[part].part);
	        for (let i = 0; i < 4; i++)
	            store$3.updateAt('heavy', i + 3, crypto[i], true);
	        store$3.updateAt('heavy', 7, crypto[4], true);
	    }
	    updateKey(playerID) {
	        this._scKey = playerID + this.STARCODE_PART;
	    }
	    storageToSC() {
	        return starcode.encrypt(starcode.addHash(starcode.compress(storage.data), this.STARCODE_HASH), this._scKey);
	    }
	    reloadStorage(bank, key, section = 'stats') {
	        let s = starcode.decrypt(bank.getKey(key, section).value, this._scKey);
	        if (!starcode.validate(s, this.STARCODE_HASH))
	            throw new Error('Invaliid data in ' + section + ' → ' + key + '!');
	        s = starcode.decompress(starcode.removeHash(s, this.STARCODE_HASH));
	        storage.data = s;
	    }
	    makeSixBoolsFor(name) {
	        const diffs = ['Easy', 'Normal', 'Hard', 'Brutal', 'Insane', 'Hardcore'];
	        const array = [];
	        for (let i = 0; i < 6; i++)
	            array.push({ type: 'boolean', value: Math.random() > 0.5, description: name + ' ' + diffs[i] });
	        return array;
	    }
	};
	var functions$3 = new Functions$3();

	const SSFSixBoolsItem = (props) => {
	    const group = props.array[0].description.split(' ')[0];
	    const callbacks = {
	        onChange: React.useCallback((value, index) => {
	            props.onChange(props.i, index, value);
	        }, [])
	    };
	    return (jsxRuntimeExports.jsxs(Flex, { style: { flexDirection: 'row', justifyContent: 'space-between', width: '200px' }, children: [jsxRuntimeExports.jsx(Label$1, { children: group + ':' }), jsxRuntimeExports.jsx(Flex, { style: { flexDirection: 'row', justifyContent: 'flex-end' }, children: props.array.map((param, index) => {
	                    return (jsxRuntimeExports.jsx(Checkbox$1, { index: index, onChange: callbacks.onChange, value: param.value, style: { margin: '4px -3px -4px -3px' } }));
	                }) })] }));
	};
	var SsfSixBoolsItem = React.memo(SSFSixBoolsItem);

	const SSFPartElement = (props) => {
	    const callbacks = {
	        onFieldChange: React.useCallback((value, index) => {
	            props.onChange(props.i, props.j, index, value);
	        }, [])
	    };
	    return (jsxRuntimeExports.jsxs(Flex, { style: { flexDirection: 'column' }, children: [props.j > 0 ? jsxRuntimeExports.jsx("br", {}) : null, jsxRuntimeExports.jsx(Flex, { style: { flexDirection: 'column' }, children: props.array.map((param, index) => {
	                    if (param.hidden)
	                        return null;
	                    return (jsxRuntimeExports.jsx(Input$1, { index: index, type: 'text', style: { width: '70px' }, onChange: callbacks.onFieldChange, value: param.value.toString() }));
	                }) })] }));
	};
	var SSFPartElement$1 = React.memo(SSFPartElement);

	const SSFDiffElement = (props) => {
	    let title;
	    switch (props.i) {
	        case 0:
	            title = 'Easy';
	            break;
	        case 1:
	            title = 'Normal';
	            break;
	        case 2:
	            title = 'Hard';
	            break;
	        case 3:
	            title = 'Brutal';
	            break;
	        case 4:
	            title = 'Insane';
	            break;
	        case 5:
	            title = 'Hardcore';
	            break;
	    }
	    return (jsxRuntimeExports.jsxs(Flex, { style: { flexDirection: 'column' }, children: [jsxRuntimeExports.jsx(Label$1, { children: title + ':' }), jsxRuntimeExports.jsx(Flex, { style: { flexDirection: 'column' }, children: props.array.map((params, index) => {
	                    return (jsxRuntimeExports.jsx(SSFPartElement$1, { onChange: props.onChange, array: params, i: props.i, j: index }));
	                }) })] }));
	};
	var SsfDiff = React.memo(SSFDiffElement);

	const SwarmSpecialForcesForm = mobxReactLite.observer((props) => {
	    const { accountStore, menuStore, mapStore, modalStore } = useStore();
	    const [bankName, setBankName] = React.useState(props.bankName);
	    const [authorID, setAuthorID] = React.useState(mapProps.get(Maps.SWARM_SCPECIAL_FORCES).authorID);
	    const mapTitle = mapProps.get(Maps.SWARM_SCPECIAL_FORCES).title;
	    const bank = React.useMemo(() => {
	        return new Bank(bankName, authorID, menuStore.playerID, '1');
	    }, [accountStore.current, menuStore.playerID, bankName, authorID]);
	    React.useEffect(() => {
	        functions$3.updateKey(menuStore.playerID);
	    }, [bank]);
	    React.useEffect(() => {
	        const fields = mapStore.list[accountStore.current]?.[mapTitle];
	        require$$0.flushSync(() => store$3.setFields());
	        if (fields)
	            setTimeout(() => store$3.setFields(fields));
	        else
	            setTimeout(() => {
	                store$3.reset();
	                store$3.setFields(functions$3.generateDefault());
	            });
	    }, [accountStore.current]);
	    const save = () => {
	        mapStore.setMapData(accountStore.current, mapTitle, {
	            light: store$3.light,
	            heavy: store$3.heavy,
	            speed: store$3.speed,
	            options: store$3.options,
	            bools: store$3.bools
	        });
	    };
	    const callbacks = {
	        onBankNameChange: React.useCallback((value) => {
	            setBankName(value);
	        }, []),
	        onAuthorIdChange: React.useCallback((value) => {
	            setAuthorID(value);
	        }, []),
	        onFileDrop: React.useCallback((name, value) => {
	            const fields = functions$3.parse(bank, value);
	            if (!fields)
	                return;
	            require$$0.flushSync(() => store$3.setFields());
	            store$3.setFields(fields);
	        }, []),
	        onDownloadClick: React.useCallback(() => {
	            if (menuStore.playerID.split('-').length != 4) {
	                modalStore.setModal('WARN', 'This map requires a player id to generate valid bank! Use Help for details.');
	                return;
	            }
	            functions$3.recryptAchives();
	            downloadTextAsFile(functions$3.generateXML(bank), bankName + '.SC2Bank', true);
	            if (!menuStore.autoSave)
	                save();
	        }, [bank]),
	        onCopyCodeClick: React.useCallback(() => {
	            if (menuStore.playerID.split('-').length != 4) {
	                modalStore.setModal('WARN', 'This map requires a player id to generate valid bank! Use Help for details.');
	                return;
	            }
	            functions$3.recryptAchives();
	            copyTextToClipboard(functions$3.generateXML(bank), true);
	            if (!menuStore.autoSave)
	                save();
	        }, [bank]),
	        onResetClick: React.useCallback(() => {
	            setBankName(props.bankName);
	            setAuthorID(mapProps.get(Maps.SWARM_SCPECIAL_FORCES).authorID);
	            require$$0.flushSync(() => store$3.reset());
	            store$3.setFields(functions$3.generateDefault());
	        }, []),
	        onFieldChange: React.useCallback((value, index, group) => {
	            switch (group) {
	                case 'lightData':
	                    store$3.updateAt('light', index, parseInt(value), true);
	                    break;
	                case 'heavyData':
	                    store$3.updateAt('heavy', index, store$3.heavy[index].type == 'number' ? parseInt(value) : value, true);
	                    break;
	                case 'options':
	                    store$3.updateAt('options', index, store$3.heavy[index].type == 'number' ? parseInt(value) : value, true);
	                    break;
	            }
	            if (menuStore.autoSave)
	                save();
	        }, []),
	        onSpeedrunsChange: React.useCallback((i, j, k, value) => {
	            store$3.updateAt('speed', { i, j, k }, value, true);
	            if (menuStore.autoSave)
	                save();
	        }, []),
	        onBoolsChange: React.useCallback((i, j, value) => {
	            store$3.updateAt('bools', { i, j }, value, true);
	            if (menuStore.autoSave)
	                save();
	        }, [])
	    };
	    const info = React.useMemo(() => {
	        return (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx(Label$1, { children: "Please note that the map has a votekick system." }), jsxRuntimeExports.jsxs(Text$1, { style: { width: '1000px' }, children: ["If other players suspect inconsistencies in your stats or values like 9999999, you can be kicked from the lobby.", jsxRuntimeExports.jsx("br", {}), "To prevent this, use ", jsxRuntimeExports.jsx("b", { children: "Reset" }), " button to generate random realistic statistics.", jsxRuntimeExports.jsx("br", {})] })] }));
	    }, []);
	    const main = React.useMemo(() => {
	        return (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx(Label$1, { children: "Main stats:" }), jsxRuntimeExports.jsxs(Flex, { style: { flexDirection: 'column', border: '1px solid #ffffff40', padding: '10px' }, children: [jsxRuntimeExports.jsx(Flex, { style: { flexDirection: 'column' }, alignInputs: true, children: store$3.light.map((param, index) => {
	                                if (param.hidden)
	                                    return null;
	                                return (jsxRuntimeExports.jsx(Input$1, { label: param.description + ':', index: index, group: 'lightData', type: 'number', min: '0', style: { width: '75px' }, onChange: callbacks.onFieldChange, max: '999999999', value: param.value.toString() }));
	                            }) }), jsxRuntimeExports.jsx(Flex, { style: { flexDirection: 'column' }, alignInputs: true, children: store$3.heavy.map((param, index) => {
	                                if (param.hidden)
	                                    return null;
	                                if (param.type == 'number')
	                                    return (jsxRuntimeExports.jsx(Input$1, { label: param.description + ':', index: index, group: 'heavyData', type: 'number', min: '0', style: { width: '75px' }, onChange: callbacks.onFieldChange, max: '999999999', value: param.value.toString() }));
	                                else
	                                    return (jsxRuntimeExports.jsx(Checkbox$1, { label: param.description + ':', index: index, group: 'heavyData', onChange: callbacks.onFieldChange, value: param.value }));
	                            }) })] })] }));
	    }, [store$3.light, store$3.heavy]);
	    const options = React.useMemo(() => {
	        return (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx(Label$1, { style: { marginTop: '15px' }, children: "Options:" }), jsxRuntimeExports.jsx(Flex, { style: { flexDirection: 'column', border: '1px solid #ffffff40', padding: '10px' }, alignInputs: true, children: store$3.options.map((param, index) => {
	                        if (param.hidden)
	                            return null;
	                        if (param.type == 'number')
	                            return (jsxRuntimeExports.jsx(Input$1, { label: param.description + ':', index: index, group: 'options', type: 'number', min: '0', style: { width: '30px' }, onChange: callbacks.onFieldChange, max: '999', value: param.value.toString() }));
	                        else
	                            return (jsxRuntimeExports.jsx(Checkbox$1, { label: param.description + ':', index: index, group: 'options', onChange: callbacks.onFieldChange, value: param.value }));
	                    }) })] }));
	    }, [store$3.options]);
	    const speedruns = React.useMemo(() => {
	        return (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx(Label$1, { children: "Speedruns:" }), jsxRuntimeExports.jsxs(Flex, { style: { flexDirection: 'row', border: '1px solid #ffffff40', padding: '10px' }, children: [jsxRuntimeExports.jsxs(Flex, { style: { flexDirection: 'column', marginTop: '5px' }, children: [jsxRuntimeExports.jsx(Label$1, { style: { marginTop: '45px' }, children: "Terran:" }), jsxRuntimeExports.jsx(Label$1, { style: { marginTop: '45px' }, children: "Protoss:" }), jsxRuntimeExports.jsx(Label$1, { style: { marginTop: '45px' }, children: "Mecha:" })] }), jsxRuntimeExports.jsxs(Flex, { style: { flexDirection: 'column', margin: '32px 0 0 20px' }, children: [jsxRuntimeExports.jsx(Label$1, { children: "Solo:" }), jsxRuntimeExports.jsx(Label$1, { children: "Team:" }), jsxRuntimeExports.jsx(Label$1, { style: { marginTop: '20px' }, children: "Solo:" }), jsxRuntimeExports.jsx(Label$1, { children: "Team:" }), jsxRuntimeExports.jsx(Label$1, { style: { marginTop: '20px' }, children: "Solo:" }), jsxRuntimeExports.jsx(Label$1, { children: "Team:" })] }), jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: store$3.speed.map((params, index) => {
	                                return (jsxRuntimeExports.jsx(SsfDiff, { onChange: callbacks.onSpeedrunsChange, array: params, i: index }));
	                            }) })] })] }));
	    }, [store$3.speed]);
	    const bools = React.useMemo(() => {
	        return (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx(Label$1, { children: "Achives (Easy, Normal, Hard, Brutal, Insane, Hardcore):" }), jsxRuntimeExports.jsx(Flex, { style: { flexFlow: 'column wrap', justifyContent: 'space-around', border: '1px solid #ffffff40', maxHeight: '200px' }, children: store$3.bools.map((params, index) => {
	                        return (params.flags?.length ? jsxRuntimeExports.jsx(SsfSixBoolsItem, { onChange: callbacks.onBoolsChange, array: params.flags, i: index }) : null);
	                    }) })] }));
	    }, [store$3.bools]);
	    return (jsxRuntimeExports.jsx(Editor$1, { bankName: bankName, authorID: authorID, onBankNameChange: callbacks.onBankNameChange, onAuthorIdChange: callbacks.onAuthorIdChange, onFileDrop: callbacks.onFileDrop, onDownload: callbacks.onDownloadClick, onCopy: callbacks.onCopyCodeClick, onReset: callbacks.onResetClick, children: jsxRuntimeExports.jsxs(Flex, { style: { flexDirection: 'column' }, children: [info, jsxRuntimeExports.jsxs(Flex, { style: { flexDirection: 'row' }, children: [jsxRuntimeExports.jsxs(Flex, { style: { flexDirection: 'column' }, children: [main, options] }), jsxRuntimeExports.jsxs(Flex, { style: { flexDirection: 'column' }, children: [speedruns, bools] })] })] }) }));
	});
	var SwarmSpecialForces = React.memo(SwarmSpecialForcesForm);

	let Store$2 = class Store extends BasicStore {
	    setFields(queue) {
	        this.queue = queue ? [...queue] : [];
	    }
	    updateAt(index, value, mutation) {
	        if (mutation) {
	            this.queue[index].update(value);
	            return;
	        }
	        const q = [...this.queue];
	        q[index].update(value);
	        this.queue = q;
	    }
	    fromLocalStorage(params) {
	        if (!params)
	            return;
	        const q = [];
	        params.forEach((value, index) => {
	            q.push(new SCParam(value._current, value._max, value._description));
	        });
	        this.queue = q;
	    }
	    reset() {
	        this.init();
	    }
	    init() {
	        this.queue = [
	            new SCParam(666, 1000, 'Waves'),
	            new SCParam(66666666, 99000000, 'Kills'),
	            new SCParam(1, 100000, 'Deaths'),
	            new SCParam(666, 50000, 'Games'),
	            new SCParam(39960, 1000000, 'Minutes')
	        ];
	    }
	};
	var store$2 = new Store$2();

	let Functions$2 = class Functions {
	    constructor() {
	        this.STARCODE_KEY = 'OnFbXRyxYzPuv7of(v5v7[zdvUiDzXO]gVb9FVI9b>M>l}Gt6L';
	        this.SECTION = '23EGWEG234AG4';
	        this.KEY = 'AWEO322AOIGWE3wqogej23';
	    }
	    generateXML(bank) {
	        bank.addKey(this.KEY, 'STRING', sc.write(store$2.queue, this.STARCODE_KEY), this.SECTION);
	        bank.updateSignature();
	        return bank.getAsString();
	    }
	    parse(bank, value) {
	        bank.parse(value);
	        if (bank.sections.size != 1 || bank.sections.get(this.SECTION) == null) {
	            console.error('Wrong bank file!');
	            return null;
	        }
	        const code = bank.sections.get(this.SECTION).get(this.KEY).value;
	        const queue = [...store$2.queue];
	        sc.read(code, queue, this.STARCODE_KEY);
	        return queue;
	    }
	};
	var functions$2 = new Functions$2();

	const ZombieCityForm = mobxReactLite.observer((props) => {
	    const { accountStore, menuStore, mapStore } = useStore();
	    const [bankName, setBankName] = React.useState(props.bankName);
	    const [authorID, setAuthorID] = React.useState(mapProps.get(Maps.ZOMBIE_CITY).authorID);
	    const mapTitle = mapProps.get(Maps.ZOMBIE_CITY).title;
	    const bank = React.useMemo(() => {
	        return new Bank(bankName, authorID, menuStore.playerID, '1');
	    }, [accountStore.current, menuStore.playerID, bankName, authorID]);
	    const save = () => {
	        mapStore.setMapData(accountStore.current, mapTitle, store$2.queue);
	    };
	    React.useEffect(() => {
	        const fields = mapStore.list[accountStore.current]?.[mapTitle];
	        if (fields)
	            store$2.fromLocalStorage(fields);
	        else
	            setTimeout(callbacks.onResetClick);
	    }, [accountStore.current]);
	    const callbacks = {
	        onBankNameChange: React.useCallback((value) => {
	            setBankName(value);
	        }, []),
	        onAuthorIdChange: React.useCallback((value) => {
	            setAuthorID(value);
	        }, []),
	        onFileDrop: React.useCallback((name, value) => {
	            const fields = functions$2.parse(bank, value);
	            if (!fields)
	                return;
	            require$$0.flushSync(() => store$2.setFields());
	            store$2.setFields(fields);
	        }, []),
	        onDownloadClick: React.useCallback(() => {
	            downloadTextAsFile(functions$2.generateXML(bank), bankName + '.SC2Bank', true);
	            if (!menuStore.autoSave)
	                save();
	        }, [bank]),
	        onCopyCodeClick: React.useCallback(() => {
	            copyTextToClipboard(functions$2.generateXML(bank), true);
	            if (!menuStore.autoSave)
	                save();
	        }, [bank]),
	        onResetClick: React.useCallback(() => {
	            setBankName(props.bankName);
	            setAuthorID(mapProps.get(Maps.ZOMBIE_CITY).authorID);
	            require$$0.flushSync(() => store$2.setFields());
	            store$2.reset();
	        }, []),
	        onFieldChange: React.useCallback((value, index) => {
	            store$2.updateAt(index, parseInt(value), true);
	            if (menuStore.autoSave)
	                save();
	        }, [])
	    };
	    const form = React.useMemo(() => {
	        return (jsxRuntimeExports.jsx(Flex, { style: { flexDirection: 'column' }, alignInputs: true, children: store$2.queue.map((param, index) => {
	                return (jsxRuntimeExports.jsx(Input$1, { index: index, type: 'number', style: { width: '80px' }, label: param.description + ':', onChange: callbacks.onFieldChange, min: '0', max: param.max.toString(), value: param.current.toString() }));
	            }) }));
	    }, [store$2.queue]);
	    return (jsxRuntimeExports.jsx(Editor$1, { bankName: bankName, authorID: authorID, onBankNameChange: callbacks.onBankNameChange, onAuthorIdChange: callbacks.onAuthorIdChange, onFileDrop: callbacks.onFileDrop, onDownload: callbacks.onDownloadClick, onCopy: callbacks.onCopyCodeClick, onReset: callbacks.onResetClick, children: form }));
	});
	var ZombieCity = React.memo(ZombieCityForm);

	function gsSqrt(value, type) {
	    if (type == 'int') {
	        return Math.ceil(Math.sqrt(value));
	    }
	    else {
	        value = value % 1048576.2;
	        return Math.floor(Math.sqrt(value) * 100) / 100;
	    }
	}
	function gsPow(a, b) {
	    return Math.floor(Math.pow(a, b) * 100) / 100;
	}
	function gsDivide(a, b) {
	    return Math.floor((a / b) * 10000) / 10000;
	}

	let Store$1 = class Store extends BasicStore {
	    setFields(fields) {
	        this.stats = fields?.stats ? [...fields.stats] : [];
	        this.heroes = fields?.heroes ? [...fields.heroes] : [];
	        this.jewels = fields?.jewels ? [...fields.jewels] : [];
	    }
	    addJewel(bugged = false) {
	        const jew = {
	            type: 1,
	            minerals: 5,
	            damage: 5,
	            life: 5,
	            armor: 5,
	            speed: 5,
	            unique: 0,
	            upgrade: 0
	        };
	        this.jewels = [...this.jewels, jew];
	    }
	    removeJewel(index) {
	        this.jewels = [...this.jewels.filter((jewel, i) => { return i == index ? false : true; })];
	    }
	    clearJewels() {
	        this.jewels = [];
	    }
	    selectAllHero() {
	        const active = this.heroes[1].active;
	        const heroes = [...this.heroes];
	        heroes.forEach((hero, index) => {
	            heroes[index] = { ...hero };
	            heroes[index].active = !active;
	        });
	        this.heroes = [...heroes];
	    }
	    updateAt(field, index, value, mutation) {
	        if (mutation) {
	            if (field == 'stats' && typeof index == 'number') {
	                this[field][index].value = value;
	                return;
	            }
	            if (field != 'stats' && typeof index == 'object') {
	                this[field][index.i][index.key] = value;
	                return;
	            }
	        }
	        if (field == 'stats' && typeof index == 'number') {
	            const stats = [...this.stats];
	            stats[index].value = value;
	            this.stats = stats;
	            return;
	        }
	        if (field != 'stats' && typeof index == 'object') {
	            const array = [...this[field]];
	            const obj = { ...array[index.i] };
	            obj[index.key] = value;
	            if (field == 'jewels' && index.key == 'type') {
	                const jewel = obj;
	                const { min, max } = functions$1.getJewelRange(jewel.type);
	                jewel.minerals = r(min, max) * 10;
	                jewel.damage = r(min, max);
	                jewel.life = r(min, max);
	                jewel.armor = r(min, max);
	                jewel.speed = r(min, max);
	            }
	            array[index.i] = obj;
	            this[field] = array;
	            return;
	        }
	    }
	    reset() {
	        this.init();
	    }
	    init() {
	        this.stats = [
	            { type: "number", value: 1500000000, description: 'Total Kills' },
	            { type: "number", value: 8, description: 'Best Solo' },
	            { type: "number", value: 1000, description: 'Jewel Dust' },
	            { type: "number", value: 300, description: 'Skip Wave At' }
	        ];
	        this.heroes = [
	            { active: true, name: 'Sniper', type: 1, kills: 5000, level: 20, prestige: 16 },
	            { active: true, name: 'Adept', type: 2, kills: 5000, level: 20, prestige: 16 },
	            { active: false, name: 'Zeloat', type: 3, kills: 5000, level: 20, prestige: 16 },
	            { active: false, name: 'Archon', type: 4, kills: 5000, level: 20, prestige: 16 },
	            { active: false, name: 'Marine', type: 5, kills: 5000, level: 20, prestige: 16 },
	            { active: false, name: 'Medic', type: 6, kills: 5000, level: 20, prestige: 16 },
	            { active: false, name: 'Probe', type: 7, kills: 5000, level: 20, prestige: 16 },
	            { active: false, name: 'Dark Templar', type: 8, kills: 5000, level: 20, prestige: 16 }
	        ];
	        this.jewels = [
	            {
	                type: 12,
	                minerals: 1250,
	                damage: 125,
	                life: 125,
	                armor: 125,
	                speed: 125,
	                unique: 1,
	                upgrade: 0
	            },
	            {
	                type: 12,
	                minerals: 1250,
	                damage: 125,
	                life: 125,
	                armor: 125,
	                speed: 125,
	                unique: 2,
	                upgrade: 0
	            },
	            {
	                type: 12,
	                minerals: 1250,
	                damage: 125,
	                life: 125,
	                armor: 125,
	                speed: 125,
	                unique: 3,
	                upgrade: 0
	            },
	            {
	                type: 12,
	                minerals: 1250,
	                damage: 125,
	                life: 125,
	                armor: 125,
	                speed: 125,
	                unique: 4,
	                upgrade: 0
	            },
	            {
	                type: 12,
	                minerals: 1250,
	                damage: 125,
	                life: 125,
	                armor: 125,
	                speed: 125,
	                unique: 5,
	                upgrade: 0
	            },
	            {
	                type: 11,
	                minerals: 1250,
	                damage: -5000,
	                life: 125,
	                armor: 125,
	                speed: -1000,
	                unique: 0,
	                upgrade: -200
	            },
	            {
	                type: 11,
	                minerals: 1250,
	                damage: -5000,
	                life: 125,
	                armor: 125,
	                speed: -1000,
	                unique: 0,
	                upgrade: -200
	            }
	        ];
	    }
	};
	var store$1 = new Store$1();

	let Functions$1 = class Functions {
	    generateXML(bank) {
	        bank.removeSection("Purchases");
	        bank.removeSection("Primary");
	        bank.removeSection("SoulStat");
	        bank.removeSection("SoulType");
	        const killz = store$1.stats[0].value;
	        bank.addKey("Primary", 'INT', killz, "Primary");
	        const pd_8_11 = parseInt(bank.info.playerID.substring(7, 11));
	        bank.addKey("Version", 'FIXED', gsDivide(gsSqrt(killz, 'fixed'), pd_8_11 + 1), "Version");
	        if (store$1.stats[1].value > 0) {
	            const bestSolo = store$1.stats[1].value;
	            bank.addKey("BS", 'INT', bestSolo, "Primary");
	            const pd_10_11 = parseInt(bank.info.playerID.substring(9, 11));
	            bank.addKey("BC", 'FIXED', gsDivide(gsPow(bestSolo, 2), pd_10_11 + 1), "Primary");
	        }
	        const dust = store$1.stats[2].value;
	        bank.addKey("Ratio", 'INT', dust * 13, "Settings");
	        let dustSoulsSum = dust * 10;
	        bank.addKey("skipwavethreshold", 'INT', store$1.stats[3].value, "Settings");
	        let combined = 0;
	        let intComb = 0;
	        const totalHeroes = store$1.heroes.length;
	        for (let i = 0; i < totalHeroes; i++) {
	            const hero = store$1.heroes[i];
	            if (!hero.active && i > 0)
	                continue;
	            const index = hero.type;
	            bank.addKey("H" + index, 'FLAG', true, "Purchases");
	            bank.addKey("H" + index + "K", 'INT', hero.kills, "Primary");
	            bank.addKey("H" + index + "L", 'INT', hero.level, "Primary");
	            bank.addKey("H" + index + "P", 'INT', hero.prestige, "Primary");
	            intComb += (index * (index + 1));
	            combined += hero.kills;
	            combined += hero.level - 1;
	            combined += hero.prestige;
	        }
	        bank.addKey("Previous", 'FIXED', gsDivide(gsSqrt(combined, 'fixed'), pd_8_11 + 2), "Version");
	        const pd_8_10 = parseInt(bank.info.playerID.substring(7, 10));
	        bank.addKey("Upcoming", 'FIXED', gsDivide(gsSqrt(intComb, 'int'), pd_8_10 + 3.25), "Version");
	        const totalJewels = store$1.jewels.length;
	        for (let i = 0; i < totalJewels; i++) {
	            const jewel = store$1.jewels[i];
	            bank.addKey("Soul" + (i + 1), 'INT', jewel.type, "SoulType");
	            bank.addKey("Soul" + (i + 1) + "Stat1", 'FIXED', jewel.minerals, "SoulStat");
	            bank.addKey("Soul" + (i + 1) + "Stat2", 'FIXED', jewel.damage, "SoulStat");
	            bank.addKey("Soul" + (i + 1) + "Stat3", 'FIXED', jewel.life, "SoulStat");
	            bank.addKey("Soul" + (i + 1) + "Stat4", 'FIXED', jewel.armor, "SoulStat");
	            bank.addKey("Soul" + (i + 1) + "Stat5", 'FIXED', jewel.speed, "SoulStat");
	            bank.addKey("Soul" + (i + 1) + "Stat6", 'FIXED', jewel.unique, "SoulStat");
	            bank.addKey("Soul" + (i + 1) + "Stat7", 'FIXED', jewel.upgrade, "SoulStat");
	            dustSoulsSum += jewel.minerals + jewel.damage + jewel.life + jewel.armor + jewel.speed + jewel.unique + jewel.upgrade;
	        }
	        const pd_9_11 = parseInt(bank.info.playerID.substring(8, 11));
	        const time = gsDivide(gsSqrt(dustSoulsSum, 'fixed'), pd_9_11 + gsSqrt(dustSoulsSum, 'fixed') + 1);
	        bank.addKey("Time", 'FIXED', time, "TimePlayed");
	        bank.sort();
	        bank.updateSignature();
	        return bank.getAsString();
	    }
	    parse(bank, value) {
	        bank.parse(value);
	        if (bank.sections.size < 4 || bank.sections.get("jjj") == null || bank.sections.get("jj") == null
	            || bank.sections.get("TP") == null || bank.sections.get("PlayerIDNumber") == null) {
	            console.error('Wrong bank file!');
	            return null;
	        }
	        return null;
	    }
	    getJewelTypes() {
	        return [
	            { value: '1', label: 'Simple' },
	            { value: '2', label: 'Regular' },
	            { value: '3', label: 'Advanced' },
	            { value: '4', label: 'Brutality' },
	            { value: '5', label: 'Insanity' },
	            { value: '6', label: 'Nightmare' },
	            { value: '7', label: 'Chaos' },
	            { value: '8', label: 'Agonizing' },
	            { value: '9', label: 'Inferno' },
	            { value: '10', label: 'Tormented' },
	            { value: '11', label: 'Death' },
	            { value: '12', label: 'Unique' }
	        ];
	    }
	    getJewelRange(type) {
	        switch (type) {
	            case 1:
	                return { min: 1, max: 5 };
	            case 2:
	                return { min: 5, max: 10 };
	            case 3:
	                return { min: 5, max: 20 };
	            case 4:
	                return { min: 10, max: 30 };
	            case 5:
	                return { min: 15, max: 40 };
	            case 6:
	                return { min: 20, max: 50 };
	            case 7:
	                return { min: 25, max: 60 };
	            case 8:
	                return { min: 30, max: 75 };
	            case 9:
	                return { min: 35, max: 90 };
	            case 10:
	                return { min: 40, max: 90 };
	            case 11:
	                return { min: 50, max: 125 };
	            case 12:
	                return { min: 50, max: 125 };
	        }
	        return null;
	    }
	    getUniqueJewelsTypes() {
	        return [
	            { value: '1', label: 'Marine buff' },
	            { value: '2', label: 'Cooldowns 10%' },
	            { value: '3', label: 'Adept buff' },
	            { value: '4', label: 'Ghost buff' },
	            { value: '5', label: 'Dark Templar buff' }
	        ];
	    }
	    getDifficultTypes() {
	        return [
	            { value: '0', label: 'None' },
	            { value: '1', label: 'Easy' },
	            { value: '2', label: 'Normal' },
	            { value: '3', label: 'Hard' },
	            { value: '4', label: 'Brutal' },
	            { value: '5', label: 'Insane' },
	            { value: '6', label: 'Nightmare' },
	            { value: '7', label: 'Chaotic' },
	            { value: '8', label: 'Torture' },
	            { value: '9', label: 'Inferno' }
	        ];
	    }
	};
	var functions$1 = new Functions$1();

	const ZWLHero = (props) => {
	    return (jsxRuntimeExports.jsxs(Flex, { style: { flexDirection: 'column', border: '1px solid #ffffff40', padding: '10px', width: '200px', marginBottom: '10px' }, children: [props.index > 0 ?
	                jsxRuntimeExports.jsx(Checkbox$1, { onChange: (value) => props.onChange(value, props.index, 'active'), value: props.hero.active, label: props.hero.name, tip: 'Activate this hero?' }) : jsxRuntimeExports.jsx(Label$1, { children: props.hero.name }), jsxRuntimeExports.jsxs(Flex, { style: { flexDirection: 'row' }, children: [jsxRuntimeExports.jsx(Input$1, { type: 'number', min: '0', max: '1500000000', style: { width: '80px' }, tip: 'Kills', onChange: (value) => props.onChange(value, props.index, 'kills'), value: props.hero.kills.toString() }), jsxRuntimeExports.jsx(Input$1, { type: 'number', min: '1', max: '50', style: { width: '20px' }, tip: 'Level', onChange: (value) => props.onChange(value, props.index, 'level'), value: props.hero.level.toString() }), jsxRuntimeExports.jsx(Input$1, { type: 'number', min: '0', max: '16', style: { width: '20px' }, tip: 'Prestige', onChange: (value) => props.onChange(value, props.index, 'prestige'), value: props.hero.prestige.toString() })] })] }));
	};
	var Hero = React.memo(ZWLHero);

	const ZWLJewel = (props) => {
	    const types = functions$1.getJewelTypes();
	    const unics = functions$1.getUniqueJewelsTypes();
	    const { min, max } = functions$1.getJewelRange(props.jewel.type);
	    return (jsxRuntimeExports.jsxs(Flex, { style: { flexDirection: 'row', border: '1px solid #ffffff40', padding: '10px', width: '570px', height: 'min-content', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }, children: [jsxRuntimeExports.jsxs(Flex, { style: { flexDirection: 'row' }, children: [jsxRuntimeExports.jsx(Select$1, { style: { width: '100px', margin: '0' }, onChange: (value) => props.onChange(value, props.index, 'type'), selected: props.jewel.type.toString(), children: types }), jsxRuntimeExports.jsx(Input$1, { type: 'number', style: { width: '35px' }, onChange: (value) => props.onChange(value, props.index, 'minerals'), value: props.jewel.minerals.toString(), min: (min * 10).toString(), max: (max * 10).toString(), tip: 'Minerals:' + (min * 10) + '-' + (max * 10) }), jsxRuntimeExports.jsx(Input$1, { type: 'number', style: { width: '25px' }, onChange: (value) => props.onChange(value, props.index, 'damage'), value: props.jewel.damage.toString(), min: min.toString(), max: max.toString(), tip: 'Damage:' + min + '-' + max }), jsxRuntimeExports.jsx(Input$1, { type: 'number', style: { width: '25px' }, onChange: (value) => props.onChange(value, props.index, 'life'), value: props.jewel.life.toString(), min: min.toString(), max: max.toString(), tip: 'Life:' + min + '-' + max }), jsxRuntimeExports.jsx(Input$1, { type: 'number', style: { width: '25px' }, onChange: (value) => props.onChange(value, props.index, 'armor'), value: props.jewel.armor.toString(), min: min.toString(), max: max.toString(), tip: 'Armor:' + min + '-' + max }), jsxRuntimeExports.jsx(Input$1, { type: 'number', style: { width: '25px' }, onChange: (value) => props.onChange(value, props.index, 'speed'), value: props.jewel.speed.toString(), min: min.toString(), max: max.toString(), tip: 'Speed:' + min + '-' + max }), props.jewel.type == 12 ?
	                        jsxRuntimeExports.jsx(Select$1, { style: { width: '160px', margin: '0' }, onChange: (value) => props.onChange(value, props.index, 'unique'), selected: props.jewel.unique.toString(), children: unics })
	                        : null] }), jsxRuntimeExports.jsx(Button$1, { onClick: () => props.onRemove(props.index), style: { width: '25px' }, children: "\u00D7" })] }));
	};
	var Jewel = React.memo(ZWLJewel);

	const ZWLForm = mobxReactLite.observer((props) => {
	    const { accountStore, menuStore, mapStore, modalStore } = useStore();
	    const [bankName, setBankName] = React.useState(props.bankName);
	    const [authorID, setAuthorID] = React.useState(mapProps.get(Maps.ZOMBIE_WORLD_LIBERTY).authorID);
	    const mapTitle = mapProps.get(Maps.ZOMBIE_WORLD_LIBERTY).title;
	    const bank = React.useMemo(() => {
	        return new Bank(bankName, authorID, menuStore.playerID, '1');
	    }, [accountStore.current, menuStore.playerID, bankName, authorID]);
	    const save = () => {
	        mapStore.setMapData(accountStore.current, mapTitle, { stats: store$1.stats, heroes: store$1.heroes, jewels: store$1.jewels });
	    };
	    React.useEffect(() => {
	        const fields = mapStore.list[accountStore.current]?.[mapTitle];
	        if (fields) {
	            require$$0.flushSync(() => store$1.setFields());
	            setTimeout(() => store$1.setFields(fields));
	        }
	        else
	            setTimeout(callbacks.onResetClick);
	    }, [accountStore.current]);
	    const callbacks = {
	        onBankNameChange: React.useCallback((value) => {
	            setBankName(value);
	        }, []),
	        onAuthorIdChange: React.useCallback((value) => {
	            setAuthorID(value);
	        }, []),
	        onFileDrop: React.useCallback((name, value) => {
	            const fields = functions$1.parse(bank, value);
	            if (!fields)
	                return;
	            require$$0.flushSync(() => store$1.setFields());
	            store$1.setFields(fields);
	        }, []),
	        onDownloadClick: React.useCallback(() => {
	            if (menuStore.playerID.split('-').length != 4) {
	                modalStore.setModal('WARN', 'This map requires a player id to generate valid bank! Use Help for details.');
	                return;
	            }
	            downloadTextAsFile(functions$1.generateXML(bank), bankName + '.SC2Bank', true);
	            if (!menuStore.autoSave)
	                save();
	        }, [bank]),
	        onCopyCodeClick: React.useCallback(() => {
	            if (menuStore.playerID.split('-').length != 4) {
	                modalStore.setModal('WARN', 'This map requires a player id to generate valid bank! Use Help for details.');
	                return;
	            }
	            copyTextToClipboard(functions$1.generateXML(bank), true);
	            if (!menuStore.autoSave)
	                save();
	        }, [bank]),
	        onResetClick: React.useCallback(() => {
	            setBankName(props.bankName);
	            setAuthorID(mapProps.get(Maps.ZOMBIE_WORLD_LIBERTY).authorID);
	            require$$0.flushSync(() => store$1.setFields());
	            store$1.reset();
	        }, []),
	        onFieldChange: React.useCallback((value, index) => {
	            store$1.updateAt('stats', index, parseInt(value), true);
	            if (menuStore.autoSave)
	                save();
	        }, []),
	        onHeroChange: React.useCallback((value, i, key) => {
	            const mutation = key == 'active' ? false : true;
	            store$1.updateAt('heroes', { i, key }, key == 'active' ? value : parseInt(value), mutation);
	            if (menuStore.autoSave)
	                save();
	        }, []),
	        onAllHeroSelect: React.useCallback(() => {
	            store$1.selectAllHero();
	        }, []),
	        onJewelAdd: React.useCallback(() => {
	            store$1.addJewel();
	            if (menuStore.autoSave)
	                save();
	        }, []),
	        onJewelsClear: React.useCallback(() => {
	            store$1.clearJewels();
	            if (menuStore.autoSave)
	                save();
	        }, []),
	        onJewelRemove: React.useCallback((index) => {
	            store$1.removeJewel(index);
	            if (menuStore.autoSave)
	                save();
	        }, []),
	        onJewelChange: React.useCallback((value, i, key) => {
	            store$1.updateAt('jewels', { i, key }, parseInt(value), false);
	            if (menuStore.autoSave)
	                save();
	        }, [])
	    };
	    const stats = React.useMemo(() => {
	        return (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx(Label$1, { style: { paddingTop: '5px' }, children: "Stats:" }), jsxRuntimeExports.jsx(Flex, { style: { flexDirection: 'column', border: '1px solid #ffffff40', padding: '10px', width: '230px', height: '145px' }, alignInputs: true, children: store$1.stats.map((param, index) => {
	                        if (index == 1)
	                            return jsxRuntimeExports.jsx(Select$1, { label: 'Best Solo:', onChange: callbacks.onFieldChange, selected: store$1.stats[1].value.toString(), index: index, style: { width: '100px' }, children: functions$1.getDifficultTypes() });
	                        return jsxRuntimeExports.jsx(Input$1, { label: param.description + ':', index: index, type: 'number', style: index == 0 ? { width: '80px' } : { width: '50px' }, onChange: callbacks.onFieldChange, min: index < 3 ? '0' : '100', max: index == 0 ? '1500000000' : (index == 2 ? '500000' : '300'), value: param.value.toString() });
	                    }) })] }));
	    }, [store$1.stats]);
	    const heroes = React.useMemo(() => {
	        return (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsxs(Flex, { style: { flexDirection: 'row', alignItems: 'center', paddingTop: '24px' }, children: [jsxRuntimeExports.jsx(Label$1, { children: "Heroes:" }), jsxRuntimeExports.jsx(Flex, { style: { flexDirection: 'row', justifyContent: 'flex-end' }, children: jsxRuntimeExports.jsx(Button$1, { onClick: callbacks.onAllHeroSelect, children: "Select all" }) })] }), jsxRuntimeExports.jsx(Flex, { style: { flexDirection: 'column', border: '1px solid #ffffff40', padding: '10px', width: '230px', height: '300px', overflowY: 'auto' }, children: store$1.heroes.map((hero, index) => {
	                        return jsxRuntimeExports.jsx(Hero, { hero: hero, onChange: callbacks.onHeroChange, index: index });
	                    }) })] }));
	    }, [store$1.heroes]);
	    const Jewels = React.useMemo(() => {
	        return (jsxRuntimeExports.jsxs(Flex, { style: { flexDirection: 'column' }, children: [jsxRuntimeExports.jsxs(Flex, { style: { flexDirection: 'row', alignItems: 'center' }, children: [jsxRuntimeExports.jsx(Label$1, { style: { paddingTop: '5px' }, children: "Jewels:" }), jsxRuntimeExports.jsxs(Flex, { style: { flexDirection: 'row', justifyContent: 'flex-end' }, children: [jsxRuntimeExports.jsx(Button$1, { onClick: callbacks.onJewelAdd, children: "Add" }), jsxRuntimeExports.jsx(Button$1, { onClick: callbacks.onJewelsClear, children: "Clear" })] })] }), jsxRuntimeExports.jsx(Flex, { style: { flexDirection: 'column', border: '1px solid #ffffff40', padding: '10px', width: '600px', height: '508px', overflowY: 'auto' }, children: store$1.jewels.map((jewel, index) => {
	                        return jsxRuntimeExports.jsx(Jewel, { jewel: jewel, index: index, onChange: callbacks.onJewelChange, onRemove: callbacks.onJewelRemove });
	                    }) })] }));
	    }, [store$1.jewels]);
	    return (jsxRuntimeExports.jsx(Editor$1, { bankName: bankName, authorID: authorID, onBankNameChange: callbacks.onBankNameChange, onAuthorIdChange: callbacks.onAuthorIdChange, onFileDrop: callbacks.onFileDrop, onDownload: callbacks.onDownloadClick, onCopy: callbacks.onCopyCodeClick, onReset: callbacks.onResetClick, children: jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsxs(Text$1, { children: ["Note: avoid to set Inferno for BestSolo, it can be bugged.", jsxRuntimeExports.jsx("br", {}), "Also try different combinations if your stats reset."] }), jsxRuntimeExports.jsxs(Flex, { style: { flexDirection: 'row' }, children: [jsxRuntimeExports.jsxs(Flex, { style: { flexDirection: 'column' }, children: [stats, heroes] }), Jewels] })] }) }));
	});
	var ZombieWorldLiberty = React.memo(ZWLForm);

	class Store extends BasicStore {
	    setFields(fields) {
	        this.params = fields ? [...fields] : [];
	    }
	    updateAt(index, value, mutation) {
	        if (mutation) {
	            this.params[index].value = value;
	            return;
	        }
	        const p = [...this.params];
	        p[index].value = value;
	        this.params = p;
	    }
	    reset() {
	        this.init();
	    }
	    init() {
	        this.params = [
	            { type: "number", value: 16999, description: 'Waves' },
	            { type: "number", value: 45000, description: 'Talent points' },
	            { type: "boolean", value: true, description: 'Fill all talents' },
	            { type: "boolean", value: true, description: 'Get all challenges' },
	            { type: "boolean", value: true, description: 'Upgrade all units' },
	            { type: "number", value: 1500000000, description: 'Assassin' },
	            { type: "number", value: 1500000000, description: 'Builder' },
	            { type: "number", value: 1500000000, description: 'Singletarget' },
	            { type: "number", value: 1500000000, description: 'Specialist' },
	            { type: "number", value: 1500000000, description: 'Splash' },
	            { type: "number", value: 1500000000, description: 'Support' },
	            { type: "number", value: 1500000000, description: 'Tank' },
	        ];
	    }
	}
	var store = new Store();

	class Functions {
	    generateXML(bank) {
	        bank.addKey("wave", 'INT', store.params[0].value, "number");
	        bank.addKey("assassinkills", 'INT', store.params[5].value, "jjj");
	        bank.addKey("assassinkills", 'INT', store.params[5].value, "jj");
	        bank.addKey("builderkills", 'INT', store.params[6].value, "jjj");
	        bank.addKey("builderkills", 'INT', store.params[6].value, "jj");
	        bank.addKey("singletargetkills", 'INT', store.params[7].value, "jjj");
	        bank.addKey("singletargetkills", 'INT', store.params[7].value, "jj");
	        bank.addKey("specialistkills", 'INT', store.params[8].value, "jjj");
	        bank.addKey("specialistkills", 'INT', store.params[8].value, "jj");
	        bank.addKey("splashkills", 'INT', store.params[9].value, "jjj");
	        bank.addKey("splashkills", 'INT', store.params[9].value, "jj");
	        bank.addKey("supportkills", 'INT', store.params[10].value, "jjj");
	        bank.addKey("supportkills", 'INT', store.params[10].value, "jj");
	        bank.addKey("tankkills", 'INT', store.params[11].value, "jjj");
	        bank.addKey("tankkills", 'INT', store.params[11].value, "jj");
	        if (store.params[4].value) {
	            const unstaged = 0;
	            bank.addKey("adeptstage", 'INT', 4, "j");
	            bank.addKey("archonstage", 'INT', 9, "j");
	            bank.addKey("dtstage", 'INT', unstaged, "j");
	            bank.addKey("dynomito", 'INT', 9, "j");
	            bank.addKey("elecstage", 'INT', unstaged, "j");
	            bank.addKey("goliathstage", 'INT', 10, "j");
	            bank.addKey("highstage", 'INT', unstaged, "j");
	            bank.addKey("hotshotstage", 'INT', 3, "j");
	            bank.addKey("hybridstage", 'INT', 9, "j");
	            bank.addKey("immostage", 'INT', unstaged, "j");
	            bank.addKey("marinestage", 'INT', 9, "j");
	            bank.addKey("medicstage", 'INT', 9, "j");
	            bank.addKey("paragon", 'INT', unstaged, "j");
	            bank.addKey("paragond", 'INT', unstaged, "j");
	            bank.addKey("metalmans", 'INT', 9, "j");
	            bank.addKey("reaperstage", 'INT', 9, "j");
	            bank.addKey("scvstage", 'INT', 9, "j");
	            bank.addKey("siegestage", 'INT', unstaged, "j");
	            bank.addKey("sniperstage", 'INT', 9, "j");
	            bank.addKey("specstage", 'INT', unstaged, "j");
	            bank.addKey("stalkerstage", 'INT', 9, "j");
	            bank.addKey("tempstage", 'INT', unstaged, "j");
	            bank.addKey("thorstage", 'INT', unstaged, "j");
	            bank.addKey("vultures", 'INT', 9, "j");
	            bank.addKey("KillReducerForBounty", 'FLAG', true, "j");
	            bank.addKey("unlockhero", 'FLAG', true, "j");
	            bank.addKey("UnlockHydralisk2", 'FLAG', true, "j");
	        }
	        else
	            bank.removeSection('j');
	        if (store.params[3].value) {
	            const challenges = 100;
	            bank.addKey("GCLInfantry", 'INT', challenges, "Challenges");
	            bank.addKey("GCLTeamGame", 'INT', challenges, "Challenges");
	            bank.addKey("GCLConstructor", 'INT', challenges, "Challenges");
	            bank.addKey("GCLShieldProblems", 'INT', challenges, "Challenges");
	            bank.addKey("GCLNext2Ded", 'INT', challenges, "Challenges");
	            bank.addKey("GCLWarpSpeed", 'INT', challenges, "Challenges");
	            bank.addKey("GCLTorture", 'INT', challenges, "Challenges");
	            bank.addKey("CLEvasive", 'FLAG', true, "Challenges");
	        }
	        else
	            bank.removeSection('Challenges');
	        const points = store.params[1].value;
	        bank.addKey("PlayerID", 'INT', points * 5, "PlayerIDNumber");
	        if (store.params[2].value) {
	            this.setTPKey("DamagePoints", 100, points, bank);
	            this.setTPKey("MoveSpeedPoints", 10, points, bank);
	            this.setTPKey("LifePoints", 100, points, bank);
	            this.setTPKey("LifeRegenPoints", 100, points, bank);
	            this.setTPKey("LifeArmorBonusPoints", 10, points, bank);
	            this.setTPKey("LifeArmorMultiplyPoints", 10, points, bank);
	            this.setTPKey("ShieldPoints", 100, points, bank);
	            this.setTPKey("ShieldRegenerationPoints", 100, points, bank);
	            this.setTPKey("ShieldArmorBonusPoints", 10, points, bank);
	            this.setTPKey("ShieldArmorMultiplyPoints", 10, points, bank);
	            this.setTPKey("EnergyPoints", 10, points, bank);
	            this.setTPKey("EnergyRegenPoints", 10, points, bank);
	            this.setTPKey("CooldownPoints", 25, points, bank);
	            this.setTPKey("BuildPoints", 25, points, bank);
	            this.setTPKey("DamageReductionPoints", 10, points, bank);
	            this.setTPKey("MineralStartPoints", 5000, points, bank);
	            this.setTPKey("VespeneStartPoints", 500, points, bank);
	            this.setTPKey("RespawnSpeedPoints", 20, points, bank);
	            this.setTPKey("ExpPoints", 100, points, bank);
	            this.setTPKey("MasteryPoints", 100, points, bank);
	            const plays = 10;
	            bank.addKey("Plays", 'INT', plays * (505 - (16 + points)), "TP");
	        }
	        else
	            bank.removeSection('TP');
	        bank.addKey("InfoNumber", 'INT', points * (9999 - (16 + points)), "PlayerIDNumber");
	        bank.sort();
	        bank.updateSignature();
	        return bank.getAsString();
	    }
	    parse(bank, value) {
	        bank.parse(value);
	        if (bank.sections.size < 4 || bank.sections.get("jjj") == null || bank.sections.get("jj") == null
	            || bank.sections.get("TP") == null || bank.sections.get("PlayerIDNumber") == null) {
	            console.error('Wrong bank file!');
	            return null;
	        }
	        return [
	            { type: "number", value: parseInt(bank.getKey("wave", "number").value), description: 'Waves' },
	            { type: "number", value: parseInt(bank.getKey("PlayerID", "PlayerIDNumber").value) / 5, description: 'Talent points' },
	            { type: "boolean", value: store.params[2].value, description: 'Fill all talents' },
	            { type: "boolean", value: store.params[3].value, description: 'Get all challanges' },
	            { type: "boolean", value: store.params[4].value, description: 'Upgrade all units' },
	            { type: "number", value: parseInt(bank.getKey("assassinkills", "jjj").value), description: 'Assassin kills' },
	            { type: "number", value: parseInt(bank.getKey("builderkills", "jjj").value), description: 'Builder kills' },
	            { type: "number", value: parseInt(bank.getKey("singletargetkills", "jjj").value), description: 'Singletarget kills' },
	            { type: "number", value: parseInt(bank.getKey("specialistkills", "jjj").value), description: 'Specialist kills' },
	            { type: "number", value: parseInt(bank.getKey("splashkills", "jjj").value), description: 'Splash kills' },
	            { type: "number", value: parseInt(bank.getKey("supportkills", "jjj").value), description: 'Support kills' },
	            { type: "number", value: parseInt(bank.getKey("tankkills", "jjj").value), description: 'Tank kills' },
	        ];
	    }
	    setTPKey(key, value, points, bank) {
	        bank.addKey(key, 'INT', value * (999 - (16 + points)), "TP");
	    }
	}
	var functions = new Functions();

	const ZWUForm = mobxReactLite.observer((props) => {
	    const { accountStore, menuStore, mapStore, modalStore } = useStore();
	    const [bankName, setBankName] = React.useState(props.bankName);
	    const [authorID, setAuthorID] = React.useState(mapProps.get(Maps.ZOMBIE_WORLD_UNITY).authorID);
	    const mapTitle = mapProps.get(Maps.ZOMBIE_WORLD_UNITY).title;
	    const bank = React.useMemo(() => {
	        return new Bank(bankName, authorID, menuStore.playerID, '1');
	    }, [accountStore.current, menuStore.playerID, bankName, authorID]);
	    const save = () => {
	        mapStore.setMapData(accountStore.current, mapTitle, store.params);
	    };
	    React.useEffect(() => {
	        const fields = mapStore.list[accountStore.current]?.[mapTitle];
	        if (fields) {
	            require$$0.flushSync(() => store.setFields());
	            setTimeout(() => store.setFields(fields));
	        }
	        else
	            setTimeout(callbacks.onResetClick);
	    }, [accountStore.current]);
	    const callbacks = {
	        onBankNameChange: React.useCallback((value) => {
	            setBankName(value);
	        }, []),
	        onAuthorIdChange: React.useCallback((value) => {
	            setAuthorID(value);
	        }, []),
	        onFileDrop: React.useCallback((name, value) => {
	            const fields = functions.parse(bank, value);
	            if (!fields)
	                return;
	            require$$0.flushSync(() => store.setFields());
	            store.setFields(fields);
	        }, []),
	        onDownloadClick: React.useCallback(() => {
	            if (menuStore.playerID.split('-').length != 4) {
	                modalStore.setModal('WARN', 'This map requires a player id to generate valid bank! Use Help for details.');
	                return;
	            }
	            downloadTextAsFile(functions.generateXML(bank), bankName + '.SC2Bank', true);
	            if (!menuStore.autoSave)
	                save();
	        }, [bank]),
	        onCopyCodeClick: React.useCallback(() => {
	            if (menuStore.playerID.split('-').length != 4) {
	                modalStore.setModal('WARN', 'This map requires a player id to generate valid bank! Use Help for details.');
	                return;
	            }
	            copyTextToClipboard(functions.generateXML(bank), true);
	            if (!menuStore.autoSave)
	                save();
	        }, [bank]),
	        onResetClick: React.useCallback(() => {
	            setBankName(props.bankName);
	            setAuthorID(mapProps.get(Maps.ZOMBIE_WORLD_UNITY).authorID);
	            require$$0.flushSync(() => store.setFields());
	            store.reset();
	        }, []),
	        onFieldChange: React.useCallback((value, index) => {
	            store.updateAt(index, store.params[index].type == 'number' ? parseInt(value) : value, true);
	            if (menuStore.autoSave)
	                save();
	        }, [])
	    };
	    const form = React.useMemo(() => {
	        return (jsxRuntimeExports.jsxs(Flex, { style: { flexDirection: 'row' }, children: [jsxRuntimeExports.jsxs(Flex, { style: { flexDirection: 'column' }, children: [jsxRuntimeExports.jsx(Label$1, { children: "Stats:" }), jsxRuntimeExports.jsx(Flex, { style: { flexDirection: 'column', border: '1px solid #ffffff40', padding: '10px' }, alignInputs: true, children: store.params.map((param, index) => {
	                                if (param.hidden)
	                                    return null;
	                                if (index < 2)
	                                    return (jsxRuntimeExports.jsx(Input$1, { label: param.description + ':', index: index, type: 'number', min: '0', style: { width: '40px' }, onChange: callbacks.onFieldChange, max: index == 0 ? '16999' : '45000', value: param.value.toString() }));
	                                else
	                                    return null;
	                            }) }), jsxRuntimeExports.jsx(Label$1, { style: { paddingTop: '24px' }, children: "Options:" }), jsxRuntimeExports.jsx(Flex, { style: { flexDirection: 'column', border: '1px solid #ffffff40', padding: '10px' }, alignInputs: true, children: store.params.map((param, index) => {
	                                if (param.hidden)
	                                    return null;
	                                if (index > 1 && index < 5)
	                                    return (jsxRuntimeExports.jsx(Checkbox$1, { label: param.description + ':', index: index, onChange: callbacks.onFieldChange, value: param.value }));
	                                else
	                                    return null;
	                            }) })] }), jsxRuntimeExports.jsxs(Flex, { style: { flexDirection: 'column' }, children: [jsxRuntimeExports.jsx(Label$1, { children: "Kills:" }), jsxRuntimeExports.jsx(Flex, { style: { flexDirection: 'column', border: '1px solid #ffffff40', padding: '10px' }, alignInputs: true, children: store.params.map((param, index) => {
	                                if (param.hidden)
	                                    return null;
	                                if (index > 4)
	                                    return (jsxRuntimeExports.jsx(Input$1, { label: param.description + ':', index: index, type: 'number', min: '0', style: { width: '80px' }, onChange: callbacks.onFieldChange, max: '1500000000', value: param.value.toString() }));
	                                else
	                                    return null;
	                            }) })] })] }));
	    }, [store.params]);
	    return (jsxRuntimeExports.jsx(Editor$1, { bankName: bankName, authorID: authorID, onBankNameChange: callbacks.onBankNameChange, onAuthorIdChange: callbacks.onAuthorIdChange, onFileDrop: callbacks.onFileDrop, onDownload: callbacks.onDownloadClick, onCopy: callbacks.onCopyCodeClick, onReset: callbacks.onResetClick, children: form }));
	});
	var ZombieWorldUnity = React.memo(ZWUForm);

	var Maps;
	(function (Maps) {
	    Maps[Maps["NONE"] = 0] = "NONE";
	    Maps[Maps["ANY_SIMPLE"] = 1] = "ANY_SIMPLE";
	    Maps[Maps["RUNLING_RUN_4"] = 2] = "RUNLING_RUN_4";
	    Maps[Maps["RUNLING_RUN_8"] = 3] = "RUNLING_RUN_8";
	    Maps[Maps["SWARM_SCPECIAL_FORCES"] = 4] = "SWARM_SCPECIAL_FORCES";
	    Maps[Maps["ZOMBIE_CITY"] = 5] = "ZOMBIE_CITY";
	    Maps[Maps["ZOMBIE_WORLD_LIBERTY"] = 6] = "ZOMBIE_WORLD_LIBERTY";
	    Maps[Maps["ZOMBIE_WORLD_UNITY"] = 7] = "ZOMBIE_WORLD_UNITY";
	})(Maps || (Maps = {}));
	const mapProps = new Map([
	    [Maps.NONE, {
	            title: 'None',
	            authorID: '',
	            forms: [jsxRuntimeExports.jsx(Text$1, { style: { display: "block", fontSize: '80px', margin: '60px 100px', fontStyle: 'italic', color: '#CCCCFF77' }, children: "Select map" })]
	        }],
	    [Maps.ANY_SIMPLE, {
	            title: 'Any Simple Map',
	            authorID: '',
	            forms: [jsxRuntimeExports.jsx(AnySimple$1, {})]
	        }],
	    [Maps.RUNLING_RUN_4, {
	            title: 'Runling Run 4',
	            authorID: '2-S2-1-3564862',
	            forms: [jsxRuntimeExports.jsx(RunlingRun4, { bankName: 'RunlingRun004' })]
	        }],
	    [Maps.RUNLING_RUN_8, {
	            title: 'Runling Run 8',
	            authorID: '2-S2-1-5734972',
	            forms: [jsxRuntimeExports.jsx(RunlingRun8ilovePie, { bankName: 'ILovePie' }), jsxRuntimeExports.jsx(RunlingRun8Prestige, { bankName: 'Prestige' })]
	        }],
	    [Maps.SWARM_SCPECIAL_FORCES, {
	            title: 'Swarm Special Forces',
	            authorID: '2-S2-1-1066242',
	            forms: [jsxRuntimeExports.jsx(SwarmSpecialForces, { bankName: 'SwarmSpecialForces' })]
	        }],
	    [Maps.ZOMBIE_CITY, {
	            title: 'Zombie City',
	            authorID: '2-S2-1-1687296',
	            forms: [jsxRuntimeExports.jsx(ZombieCity, { bankName: 'AMMMAAKDAS39349' })]
	        }],
	    [Maps.ZOMBIE_WORLD_LIBERTY, {
	            title: 'Zombie World Liberty',
	            authorID: '2-S2-1-7593740',
	            forms: [jsxRuntimeExports.jsx(ZombieWorldLiberty, { bankName: 'DirectStrike' })]
	        }],
	    [Maps.ZOMBIE_WORLD_UNITY, {
	            title: 'Zombie World Unity',
	            authorID: '2-S2-1-7593740',
	            forms: [jsxRuntimeExports.jsx(ZombieWorldUnity, { bankName: 'zombieworldu' })]
	        }],
	]);

	const AudioLoop = mobxReactLite.observer((props) => {
	    const { menuStore } = useStore();
	    const audio = new Audio();
	    const interactionType = 'mousedown';
	    let volumeInterval = 0;
	    audio.volume = 0;
	    if (menuStore.sounds)
	        audio.autoplay = true;
	    const nextTrack = (function () {
	        const soundPath = 'assets/sound/';
	        const playlist = [
	            'Motherchip & Malmen - A Thousand Sunflowers.mp3',
	            'ko0x - Galaxy Guppy.mp3',
	            'DDRKirby(ISQ) - Starlight Festival.mp3',
	            'Toni Leys - Through A Cardboard World.mp3',
	            'laamaa - nuri brut.mp3',
	            'Funky Fish - Shadow of my Angel.mp3',
	            'Vince Kaichan - the Zubmarine Zone.mp3'
	        ];
	        let index = r(0, playlist.length - 1);
	        return () => {
	            audio.src = soundPath + playlist[index];
	            audio.title = playlist[index];
	            index = index < playlist.length - 1 ? ++index : 0;
	        };
	    }());
	    const volumeUp = () => {
	        if (audio.volume > 0 || volumeInterval)
	            return;
	        volumeInterval = window.setInterval(() => {
	            audio.volume += 0.05;
	            if (audio.volume > 0.80)
	                window.clearInterval(volumeInterval);
	        }, 500);
	    };
	    const onInteraction = () => {
	        setTimeout(() => {
	            if (menuStore.sounds) {
	                audio.play();
	                volumeUp();
	            }
	            else
	                audio.pause();
	        }, 500);
	        window.removeEventListener(interactionType, onInteraction);
	    };
	    const onTrackEnded = () => {
	        gaEvent("Audio", "Track Ended", audio.title);
	        nextTrack();
	        audio.play();
	    };
	    const callbacks = {
	        onButtonClick: React.useCallback(() => {
	            if (menuStore.sounds) {
	                audio.pause();
	                gaEvent("Audio", "Sound OFF", audio.title);
	            }
	            else {
	                audio.play();
	                volumeUp();
	                gaEvent("Audio", "Sound ON", audio.title);
	            }
	            menuStore.setSounds(!menuStore.sounds);
	        }, [])
	    };
	    React.useEffect(() => {
	        audio.addEventListener('ended', onTrackEnded);
	        window.addEventListener(interactionType, onInteraction);
	        nextTrack();
	        return () => {
	            audio.removeEventListener('ended', onTrackEnded);
	            window.removeEventListener(interactionType, onInteraction);
	            window.clearInterval(volumeInterval);
	        };
	    }, []);
	    return (jsxRuntimeExports.jsx(Flex, { style: { width: '30px', height: '23px', padding: '0' }, children: jsxRuntimeExports.jsx(Button$1, { onClick: callbacks.onButtonClick, style: { width: '30px', color: menuStore.sounds ? '#FFFFFF' : '#FF0000' }, children: "\u266B\u266A" }) }));
	});
	var AudioLoop$1 = React.memo(AudioLoop);

	const Menu = mobxReactLite.observer((props) => {
	    const { accountStore, mapStore, menuStore, modalStore } = useStore();
	    const callbacks = {
	        onPlayerIdChange: React.useCallback((value) => {
	            menuStore.setPlayerID(value);
	        }, []),
	        onAccountClick: React.useCallback(() => {
	            modalStore.setModal('ACCOUNTS');
	        }, []),
	        onHelpClick: React.useCallback(() => {
	            modalStore.setModal('HELP');
	            gaEvent("Menu", "Help");
	        }, []),
	        onMapSelect: React.useCallback((value) => {
	            menuStore.setSelectedMap(parseInt(value));
	            gaEvent("Menu", "Select Map", mapProps.get(parseInt(value)).title);
	        }, []),
	        onAutoSaveChange: React.useCallback((value) => {
	            menuStore.setAutoSave(value);
	            gaEvent("Menu", "Autosave Changed");
	        }, []),
	        onFullReset: React.useCallback(() => {
	            modalStore.setModal('CONFIRM', 'Are you sure you want to delete all accounts and saved banks from here?', [
	                () => {
	                    accountStore.reset();
	                    mapStore.reset();
	                    menuStore.reset();
	                    modalStore.reset();
	                }
	            ]);
	            gaEvent("Menu", "Full Reset");
	        }, [])
	    };
	    const mapList = React.useMemo(() => {
	        const result = [];
	        mapProps.forEach((value, key) => {
	            result.push({ value: key.toString(), label: value.title });
	        });
	        return result;
	    }, [menuStore.selectedMap]);
	    const [btnAccountsStyle, btnHelpStyle] = React.useMemo(() => {
	        return [
	            { width: '80px' },
	            { width: '50px' }
	        ];
	    }, []);
	    const logo = React.useMemo(() => {
	        return (jsxRuntimeExports.jsxs(Flex, { style: { flexDirection: 'row', alignItems: 'center' }, children: [jsxRuntimeExports.jsx("img", { src: 'assets/icons/sc2.ico', width: '30', height: '30' }), jsxRuntimeExports.jsx(Label$1, { style: { fontSize: '20px' }, children: "Bank Generator" })] }));
	    }, []);
	    const top = React.useMemo(() => {
	        return (jsxRuntimeExports.jsxs(Flex, { style: { flexDirection: 'row', justifyContent: 'space-between' }, children: [logo, jsxRuntimeExports.jsxs(Flex, { style: { flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }, children: [jsxRuntimeExports.jsx(Input$1, { label: "Player id:", placeholder: "X-S2-X-XXXXXXX", onChange: callbacks.onPlayerIdChange, tip: "Player ID from bank's path", value: menuStore.playerID }), jsxRuntimeExports.jsx(Button$1, { style: btnAccountsStyle, onClick: callbacks.onAccountClick, children: "Accounts" }), jsxRuntimeExports.jsx(Button$1, { style: btnHelpStyle, onClick: callbacks.onHelpClick, children: "Help" }), jsxRuntimeExports.jsx(AudioLoop$1, {})] })] }));
	    }, [menuStore.playerID]);
	    const line = React.useMemo(() => {
	        return (jsxRuntimeExports.jsx(Line$1, { style: { margin: '10px 0 0 0' } }));
	    }, []);
	    const bottom = React.useMemo(() => {
	        return (jsxRuntimeExports.jsxs(Flex, { style: { flexDirection: 'row', justifyContent: 'flex-end' }, children: [jsxRuntimeExports.jsx(Select$1, { onChange: callbacks.onMapSelect, label: "Select map:", selected: menuStore.selectedMap.toString(), children: mapList }), jsxRuntimeExports.jsx(Checkbox$1, { label: 'Auto Save', onChange: callbacks.onAutoSaveChange, value: menuStore.autoSave }), jsxRuntimeExports.jsx(Button$1, { onClick: callbacks.onFullReset, children: "Clear Cache" })] }));
	    }, [menuStore.selectedMap, menuStore.autoSave]);
	    return (jsxRuntimeExports.jsx(GlassWrapper$1, { children: jsxRuntimeExports.jsx(Flex, { style: { overflow: 'auto' }, children: jsxRuntimeExports.jsxs(Flex, { style: { flexDirection: 'column', padding: '10px' }, children: [top, line, bottom] }) }) }));
	});
	var Menu$1 = React.memo(Menu);

	const Updates = mobxReactLite.observer((props) => {
	    const { modalStore } = useStore();
	    const callbacks = {
	        onCloseClick: React.useCallback(() => {
	            modalStore.setModal('NONE');
	        }, [])
	    };
	    const list = modalStore.data;
	    return (jsxRuntimeExports.jsxs(Popup$1, { label: 'Updates', onClose: callbacks.onCloseClick, minWidth: 800, maxWidth: 800, maxHeight: 400, children: [jsxRuntimeExports.jsxs(Text$1, { style: { textAlign: 'center', marginTop: '20px', marginRight: '20px', marginBottom: '20px' }, children: [modalStore.message, jsxRuntimeExports.jsx("br", {})] }), jsxRuntimeExports.jsx(Flex, { style: { flexDirection: 'column' }, children: list.map((note) => {
	                    return (jsxRuntimeExports.jsxs(Flex, { style: { flexDirection: 'column', width: '780px', minWidth: '780px', height: 'auto', marginBottom: '20px' }, children: [jsxRuntimeExports.jsx(Text$1, { style: { textAlign: 'left', fontSize: '20px', textDecoration: 'underline' }, children: note.version }), jsxRuntimeExports.jsx(Text$1, { style: { textAlign: 'left', fontSize: '14px' }, children: note.description })] }));
	                }) })] }));
	});
	var Updates$1 = React.memo(Updates);

	const Warn = mobxReactLite.observer((props) => {
	    const { modalStore } = useStore();
	    const callbacks = {
	        onCloseClick: React.useCallback(() => {
	            modalStore.setModal('NONE');
	        }, [])
	    };
	    return (jsxRuntimeExports.jsx(Popup$1, { label: 'Warning', onClose: callbacks.onCloseClick, children: jsxRuntimeExports.jsx(Text$1, { style: { textAlign: 'center', marginTop: '20px' }, children: modalStore.message }) }));
	});
	var Warn$1 = React.memo(Warn);

	const Workspace = mobxReactLite.observer((props) => {
	    const { menuStore } = useStore();
	    const editors = React.useMemo(() => {
	        const mapData = mapProps.get(menuStore.selectedMap);
	        return mapData?.forms ? mapData.forms.map((form) => {
	            return (jsxRuntimeExports.jsx(GlassWrapper$1, { border: true, style: { minWidth: 'max-content', minHeight: 'max-content' }, children: form }));
	        }) : [];
	    }, [menuStore.selectedMap]);
	    return (jsxRuntimeExports.jsx(Flex, { style: { overflow: 'auto' }, children: jsxRuntimeExports.jsx(Flex, { style: { flexFlow: 'row wrap', alignItems: 'center', justifyContent: 'space-around' }, children: editors }) }));
	});
	var Workspace$1 = React.memo(Workspace);

	const App = mobxReactLite.observer(() => {
	    const { modalStore } = useStore();
	    React.useEffect(() => {
	        gaInit();
	    }, []);
	    return (jsxRuntimeExports.jsxs("div", { className: "App", children: [jsxRuntimeExports.jsx(Menu$1, {}), jsxRuntimeExports.jsx(Workspace$1, {}), jsxRuntimeExports.jsx(Info$1, {}), modalStore.current == Modals.HELP && jsxRuntimeExports.jsx(Help$1, {}), modalStore.current == Modals.WARN && jsxRuntimeExports.jsx(Warn$1, {}), modalStore.current == Modals.ACCOUNTS && jsxRuntimeExports.jsx(Accounts$1, {}), modalStore.current == Modals.CONFIRM && jsxRuntimeExports.jsx(Confirm$1, {}), modalStore.current == Modals.UPDATES && jsxRuntimeExports.jsx(Updates$1, {})] }));
	});
	const root = createRoot(document.getElementById('root'));
	root.render(jsxRuntimeExports.jsx(React.StrictMode, { children: jsxRuntimeExports.jsx(Slideshow$1, { type: 'random', children: jsxRuntimeExports.jsx(StoreProvider, { children: jsxRuntimeExports.jsx(App, {}) }) }) }));

})(React, mobxReactLite, ReactDOM, saveAs, mobx, MaterialUI);
