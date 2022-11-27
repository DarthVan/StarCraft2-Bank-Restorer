/*!
 * sc2-bank-generator - v1.0.0
 * Compiled Sun, 27 Nov 2022 18:18:46 UTC
 */
(function (React, mobxReactLite, require$$0, mobx, mui, filesaver) {
  'use strict';

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

  (function (module) {

  	{
  	  module.exports = requireReactJsxRuntime_production_min();
  	}
  } (jsxRuntime));

  var createRoot;

  var m = require$$0;
  {
    createRoot = m.createRoot;
    m.hydrateRoot;
  }

  const Slideshow = (props) => {
      const ref = React.useRef(null);
      let { type } = props;
      if (!type)
          type = 'random';
      let n = 0;
      const nextBG = (n, ref, type) => {
          n = type == 'random' ? Math.floor(Math.random() * 8) + 1 : n > 8 ? 1 : n + 1;
          ref.current.style.backgroundImage = "url('./assets/pics/bg" + n + ".jpg')";
          return n;
      };
      const interval = setInterval(() => {
          n = nextBG(n, ref, type);
      }, 60000);
      window.onbeforeunload = () => {
          clearInterval(interval);
      };
      React.useEffect(() => { n = nextBG(n, ref, type); }, []);
      return (jsxRuntime.exports.jsx("div", { className: 'Slideshow', ref: ref, children: props.children }));
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

  class MapStore extends BasicStore {
      reset() {
          this.list = {};
      }
      setMapData(id, data) {
          this.list[id] = data;
          localStorage.setItem("MapsData", JSON.stringify(this.list));
      }
      clearMapData(id) {
          if (!this.list[id])
              return;
          this.list[id] = null;
          delete (this.list[id]);
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
          localStorage.removeItem("ShowCode");
          this.showCode = false;
      }
      setPlayerID(value) {
          this.playerID = value;
          localStorage.setItem("PlayerID", value);
      }
      setSelectedMap(value) {
          this.selectedMap = value;
          localStorage.setItem("SelectedMap", value.toString());
      }
      setShowCode(value) {
          this.showCode = value;
          localStorage.setItem("ShowCode", value ? 'true' : 'false');
      }
      init() {
          this.playerID = localStorage.getItem("PlayerID") || '';
          this.selectedMap = parseInt(localStorage.getItem("SelectedMap")) || 0;
          this.showCode = localStorage.getItem("ShowCode") == 'true' || false;
      }
  }

  var Modals;
  (function (Modals) {
      Modals[Modals["NONE"] = 0] = "NONE";
      Modals[Modals["HELP"] = 1] = "HELP";
      Modals[Modals["WARN"] = 2] = "WARN";
      Modals[Modals["CONFIRM"] = 3] = "CONFIRM";
  })(Modals || (Modals = {}));
  class ModalStore extends BasicStore {
      setModal(id, message) {
          this.current = Modals[id];
          this.message = message;
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
      mapStore: new MapStore(),
      menuStore: new MenuStore(),
      modalStore: new ModalStore()
  };

  const configureMobX = () => {
      setTimeout(() => {
          mobx.configure({
              reactionScheduler: (f) => {
                  setTimeout(f, 1);
              },
          });
      }, 1);
  };
  configureMobX();
  const storeContext = React.createContext(null);
  const StoreProvider = ({ children }) => {
      const store = mobxReactLite.useLocalObservable(() => rootStore);
      return jsxRuntime.exports.jsx(storeContext.Provider, { value: store, children: children });
  };
  const useStore = () => {
      const store = React.useContext(storeContext);
      if (!store)
          throw new Error('useStore must be used within a StoreProvider.');
      return store;
  };

  const Button = (props) => {
      return (jsxRuntime.exports.jsx("button", { className: 'Button', style: props.style, onClick: (e) => { e.stopPropagation(); e.preventDefault(); props.onClick(); }, children: props.children }));
  };
  var Button$1 = React.memo(Button);

  const FlexContainer = (props) => {
      let className = 'Container';
      if (props.style?.overflow == 'auto' || props.style?.overflowX == 'auto' || props.style?.overflowY == 'auto')
          className += ' ScrollContainer';
      else {
          if ((!props.style?.flexWrap || props.style?.flexWrap == 'nowrap') &&
              (!props.style?.flexFlow || props.style?.flexFlow?.split(' ')[1] == 'nowrap'))
              className += (props.style?.flexDirection == 'column' || props.style?.flexFlow?.split(' ')[0] == 'column')
                  ? ' ColumnContainer' : ' RowContainer';
          else
              className += ' WrapContainer';
          className += props.alignInputs ? ' TextFieldsContainer' : '';
      }
      return (jsxRuntime.exports.jsx("div", { className: className, style: props.style, children: props.children }));
  };
  var Flex = React.memo(FlexContainer);

  const GlassWrapper = (props) => {
      return (jsxRuntime.exports.jsx("div", { className: 'GlassWrapper' + (props.border ? ' GlassWrapperBordered' : ''), style: props.style, children: jsxRuntime.exports.jsx("div", { className: 'GlassWrapper-content', children: props.children }) }));
  };
  var GlassWrapper$1 = React.memo(GlassWrapper);

  const Label = (props) => {
      const [first, other] = React.useMemo(() => {
          return [props.children.charAt(0), props.children.substring(1)];
      }, [props.children]);
      return (jsxRuntime.exports.jsxs("label", { htmlFor: props.for, className: 'Label', children: [jsxRuntime.exports.jsx("span", { className: 'Label-start', style: props.style, children: first }), jsxRuntime.exports.jsx("span", { className: 'Label-other', style: props.style, children: other })] }));
  };
  var Label$1 = React.memo(Label);

  const Line = (props) => {
      return (jsxRuntime.exports.jsx("hr", { className: "Line", style: props.style }));
  };
  var Line$1 = React.memo(Line);

  const Text = (props) => {
      return (jsxRuntime.exports.jsx("span", { className: 'Text', style: props.style, children: props.children }));
  };
  var Text$1 = React.memo(Text);

  const Help = mobxReactLite.observer((props) => {
      const { modalStore } = useStore();
      const callbacks = {
          onCloseClick: React.useCallback(() => {
              modalStore.setModal('NONE');
          }, [])
      };
      return (jsxRuntime.exports.jsx(Flex, { style: { flexFlow: 'row wrap', width: '100vw', height: '100vh', zIndex: '9999', position: 'fixed', left: '0', top: '0', background: '#000000AA', alignItems: 'center', justifyContent: 'center', padding: '5px' }, children: jsxRuntime.exports.jsx(GlassWrapper$1, { border: true, children: jsxRuntime.exports.jsx(Flex, { style: { overflow: 'auto', width: 'calc(100vw - 40px)', height: 'calc(100vh - 40px)', maxWidth: '650px', maxHeight: '870px' }, children: jsxRuntime.exports.jsxs(Flex, { style: { flexDirection: 'column', padding: '10px', minWidth: '100%', minHeight: 'max-content' }, children: [jsxRuntime.exports.jsxs(Flex, { style: { flexDirection: 'row', justifyContent: 'space-between', height: 'min-content', minWidth: 'max-content' }, children: [jsxRuntime.exports.jsx(Label$1, { style: { fontSize: '20px' }, children: "What is this?\u00BF" }), jsxRuntime.exports.jsx(Button$1, { onClick: callbacks.onCloseClick, children: "Close" })] }), jsxRuntime.exports.jsx(Line$1, { style: { margin: '10px 0 0 0' } }), jsxRuntime.exports.jsxs(Flex, { style: { flexDirection: 'column', minWidth: '100%' }, children: [jsxRuntime.exports.jsxs(Text$1, { children: ["Hi!", jsxRuntime.exports.jsx("br", {}), jsxRuntime.exports.jsx("br", {}), "Reinstalled Windows? Playing Starcraft2 from another PC? Lost your save?", jsxRuntime.exports.jsx("br", {}), "This service can restore some top-secured SC2 banks (Starcode + signature + anticheats).", jsxRuntime.exports.jsx("br", {}), jsxRuntime.exports.jsx("br", {})] }), jsxRuntime.exports.jsx(Label$1, { children: "1. What bank can be restored here?" }), jsxRuntime.exports.jsxs(Text$1, { children: ["All available maps can be selected in the menu selector. If your map is not there, then you can't :(", jsxRuntime.exports.jsx("br", {}), jsxRuntime.exports.jsx("br", {})] }), jsxRuntime.exports.jsx(Label$1, { children: "2. I found my map, how to restore the bank?" }), jsxRuntime.exports.jsxs(Text$1, { children: ["First make sure you have played this map and that the bank file folder exists. You don't have to be in the game, be offline, or go to the menu. Otherwise the game will overwrite the bank and you will not see any changes.", jsxRuntime.exports.jsx("b", { children: " Dont forget to make backup of your original bank file!!11" }), jsxRuntime.exports.jsx("br", {}), "Some banks are verified with a signature that requires the player id and map author id to generate. They are in the path to the file:"] }), jsxRuntime.exports.jsx("img", { src: "./assets/help.png", alt: "help.png", width: 629, height: 191 }), jsxRuntime.exports.jsxs(Text$1, { children: ["Usually the file name and author id are entered automatically, you don't need to change them unless you have to.", jsxRuntime.exports.jsx("br", {}), "Just set other bank's options or drop your bank file to the rect \"Drop file here\" to read and edit it.", jsxRuntime.exports.jsx("br", {}), "And pick 'Download bank' or 'Copy code'.", jsxRuntime.exports.jsx("br", {}), jsxRuntime.exports.jsx("br", {})] }), jsxRuntime.exports.jsx(Label$1, { children: "Found a bug or wanna add new map?" }), jsxRuntime.exports.jsxs(Text$1, { children: ["Post issues or pull requests ", jsxRuntime.exports.jsx("a", { href: "https://github.com/DarthVan/StarCraft2-Bank-Restorer", target: '_blank', children: "here" }), jsxRuntime.exports.jsx("br", {}), jsxRuntime.exports.jsx("br", {}), "gg hf!", jsxRuntime.exports.jsx("br", {}), jsxRuntime.exports.jsx("br", {})] })] })] }) }) }) }));
  });
  var Help$1 = React.memo(Help);

  const Info = () => {
      return (jsxRuntime.exports.jsx(GlassWrapper$1, { children: jsxRuntime.exports.jsx(Flex, { style: { overflow: 'auto' }, children: jsxRuntime.exports.jsx(Flex, { style: { justifyContent: 'center', alignItems: 'center', padding: '20px', minWidth: 'max-content' }, children: jsxRuntime.exports.jsx(Label$1, { children: "Powered by React 18" }) }) }) }));
  };
  var Info$1 = React.memo(Info);

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
      return (jsxRuntime.exports.jsx("div", { className: 'DropZone' + (isDragActive ? ' DropZone-active' : ''), style: props.style, ref: dropZoneRef, children: props.children ? props.children : "Drop file here!" }));
  };
  var Drop = React.memo(DropZone);

  const Input = (props) => {
      const ref = React.useRef(null);
      if (!props.type)
          props.type = 'text';
      else
          props.pattern = props.pattern ? props.pattern : '^[-\d]\d*$';
      const id = React.useMemo(() => {
          return props.label ? props.label + Math.random() * 100000 : null;
      }, [props.label]);
      const [value, setValue] = React.useState(props.value);
      React.useEffect(() => {
          setValue(props.value);
      }, [props.value]);
      const onChange = React.useCallback((e) => {
          const value = props.type == 'text' ? e.target.value : checkOnMinMax(e.target.value);
          setValue(value);
          props.onChange(value, props.index, props.group);
      }, [setValue]);
      const checkOnMinMax = (value) => {
          let intValue = value ? parseInt(value) : 0;
          const minInt = props.min ? parseInt(props.min) : 0;
          const maxInt = props.max ? parseInt(props.max) : 999999999;
          if (intValue < minInt)
              intValue = minInt;
          if (intValue > maxInt)
              intValue = maxInt;
          return intValue.toString();
      };
      const intRx = /\d/;
      const integerChange = (e) => {
          if (intRx.test(e.key) || e.key == 'Backspace')
              return;
          e.preventDefault();
      };
      React.useEffect(() => {
          const input = ref?.current;
          if (props.type == 'number')
              input.addEventListener("keydown", integerChange);
          return () => {
              input?.removeEventListener("keydown", integerChange);
          };
      }, []);
      return (jsxRuntime.exports.jsxs("div", { ref: ref, className: 'Input', "data-tooltip": props.tip, children: [props.label ? jsxRuntime.exports.jsx(Label$1, { for: id, children: props.label }) : null, jsxRuntime.exports.jsx("input", { className: 'Input-field', id: id, style: props.style, placeholder: props.placeholder, pattern: props.pattern, value: value, onChange: (e) => onChange(e) })] }));
  };
  var Input$1 = React.memo(Input);

  const Editor = mobxReactLite.observer((props) => {
      const callbacks = {
          onBankNameChange: React.useCallback((value) => {
              props.onBankNameChange?.(value);
          }, []),
          onAuthorIdChange: React.useCallback((value) => {
              props.onAuthorIdChange?.(value);
          }, []),
          onFilesDrop: React.useCallback((files) => {
              files[0].text().then((value) => { props.onFileDrop?.(files[0].name.split('.')[0], value); });
          }, [props]),
          onDownloadClick: React.useCallback(() => {
              props.onDownload?.();
          }, [props]),
          onCopyCodeClick: React.useCallback(() => {
              props.onCopy?.();
          }, [props]),
          onResetClick: React.useCallback(() => {
              props.onReset?.();
          }, [props])
      };
      return (jsxRuntime.exports.jsx(GlassWrapper$1, { border: true, style: { minWidth: 'max-content', minHeight: 'max-content' }, children: jsxRuntime.exports.jsxs(Flex, { style: { flexDirection: 'column', padding: '10px', width: 'max-content', height: 'max-content', minWidth: 'max-content', minHeight: 'max-content' }, children: [jsxRuntime.exports.jsxs(Flex, { style: { flexDirection: 'row' }, children: [jsxRuntime.exports.jsxs(Flex, { style: { flexDirection: 'column', width: 'min-content' }, alignInputs: true, children: [jsxRuntime.exports.jsx(Input$1, { label: "BankName:", placeholder: "BankFileName", onChange: callbacks.onBankNameChange, tip: "Bank filename without *.SC2Bank extension", value: props.bankName }), jsxRuntime.exports.jsx(Input$1, { label: "Author id:", placeholder: "X-SX-X-XXXXXXX", onChange: callbacks.onAuthorIdChange, tip: "Author ID from bank's path", value: props.authorID })] }), jsxRuntime.exports.jsx(Drop, { onFilesDrop: callbacks.onFilesDrop })] }), jsxRuntime.exports.jsx(Line$1, { style: { margin: '10px 0 0 0' } }), props.children, jsxRuntime.exports.jsx(Line$1, { style: { margin: '10px 0 0 0' } }), jsxRuntime.exports.jsxs(Flex, { style: { flexDirection: 'row', justifyContent: 'flex-end' }, children: [jsxRuntime.exports.jsx(Button$1, { onClick: callbacks.onDownloadClick, children: "Download bank" }), jsxRuntime.exports.jsx(Button$1, { onClick: callbacks.onCopyCodeClick, children: "Copy code" }), jsxRuntime.exports.jsx(Button$1, { onClick: callbacks.onResetClick, children: "Reset" })] })] }) }));
  });
  var Editor$1 = React.memo(Editor);

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
          if (!s.has(key))
              s.set(key, new BankKey(key, BankKeyType[type], value));
          else
              s.get(key).update(value);
          return s.get(key);
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

  const AnySimple = mobxReactLite.observer((props) => {
      const { menuStore, mapStore, modalStore } = useStore();
      const [bankName, setBankName] = React.useState('');
      const [authorID, setAuthorID] = React.useState('');
      const [sxml, setSXML] = React.useState('');
      const mapTitle = mapProps.get(Maps.ANY_SIMPLE).title;
      const bank = new Bank(bankName, authorID, menuStore.playerID, '1');
      React.useMemo(() => {
          const storeParams = mapStore.list[mapTitle];
          if (!storeParams)
              return;
          setBankName(storeParams.bankName);
          setAuthorID(storeParams.authorID);
          setSXML(storeParams.xml);
          console.log('update data from store');
      }, [mapStore]);
      const callbacks = {
          onBankNameChange: React.useCallback((value) => {
              setBankName(value);
              mapStore.setMapData(mapTitle, { bankName: value, authorID, xml: sxml });
          }, [authorID, sxml]),
          onAuthorIdChange: React.useCallback((value) => {
              setAuthorID(value);
              mapStore.setMapData(mapTitle, { bankName, authorID: value, xml: sxml });
          }, [bankName, sxml]),
          onFileDrop: React.useCallback((name, value) => {
              bank.parse(value);
              bank.sort();
              const xml = bank.getAsString();
              setBankName(name);
              setSXML(xml);
              mapStore.setMapData(mapTitle, { bankName: name, authorID, xml });
          }, [bankName, authorID]),
          onDownloadClick: React.useCallback(() => {
              if (menuStore.playerID.length < 12 || authorID.length < 12 || bankName.length < 1)
                  modalStore.setModal('WARN', 'This map need a BankName, AuthorID and PlayerID to generate valid signature! Read Help for details.');
              console.log('download bank file:', sxml);
              const blob = new Blob([sxml], { type: 'application/octet-stream' });
              filesaver.saveAs(blob, bankName + '.SC2Bank');
          }, [bankName, authorID, sxml]),
          onCopyCodeClick: React.useCallback(() => {
              if (menuStore.playerID.length < 12 || authorID.length < 12 || bankName.length < 1)
                  modalStore.setModal('WARN', 'This map need a BankName, AuthorID and PlayerID to generate valid signature! Read Help for details.');
              window.navigator['clipboard'].writeText(sxml).then(() => {
                  console.log("Copied to clipboard:\n", sxml);
              });
          }, [bankName, authorID, sxml]),
          onResetClick: React.useCallback(() => {
              setTimeout(() => {
                  setBankName('');
                  setAuthorID('');
                  setSXML('');
              }, 1);
              mapStore.setMapData(mapTitle, null);
          }, []),
          onFieldChange: React.useCallback((value) => {
              setSXML(value);
              mapStore.setMapData(mapTitle, { bankName, authorID, xml: value });
          }, [bankName, authorID]),
          updateSignature: React.useCallback(() => {
              bank.parse(sxml);
              bank.sort();
              bank.updateSignature();
              const xml = bank.getAsString();
              setSXML(xml);
              mapStore.setMapData(mapTitle, { bankName, authorID, xml });
          }, [bankName, authorID, sxml]),
      };
      return (jsxRuntime.exports.jsx(Editor$1, { bankName: bankName, authorID: authorID, onBankNameChange: callbacks.onBankNameChange, onAuthorIdChange: callbacks.onAuthorIdChange, onFileDrop: callbacks.onFileDrop, onDownload: callbacks.onDownloadClick, onCopy: callbacks.onCopyCodeClick, onReset: callbacks.onResetClick, children: jsxRuntime.exports.jsxs(Flex, { style: { flexDirection: 'column' }, children: [jsxRuntime.exports.jsx(Label$1, { children: "Simple text editor for any banks, that protected with signature only." }), jsxRuntime.exports.jsx(mui.TextField, { sx: {
                          width: '900px',
                          "& .MuiInputBase-root": {
                              color: '#FFFFFF',
                              fontFamily: 'Consolas',
                              fontSize: '12px'
                          },
                          "& .MuiFormLabel-root": {
                              color: '#CCCCFF'
                          },
                          "& .MuiFormLabel-root.Mui-focused": {
                              color: '#FFFF00'
                          }
                      }, id: "standard-multiline-flexible", label: "XML Bank Data", multiline: true, minRows: 10, maxRows: 30, value: sxml, onChange: (e) => callbacks.onFieldChange(e.target.value), variant: "standard", InputProps: { disableUnderline: true, spellCheck: 'false' } }), jsxRuntime.exports.jsx(Button$1, { onClick: callbacks.updateSignature, style: { width: '150px' }, children: "Update Signature" })] }) }));
  });
  var AnySimple$1 = React.memo(AnySimple);

  const Checkbox = (props) => {
      const id = React.useMemo(() => {
          return props.label ? props.label + Math.random() * 100000 : null;
      }, [props.label]);
      return (jsxRuntime.exports.jsxs("div", { className: 'Checkbox', children: [props.label ? jsxRuntime.exports.jsx(Label$1, { for: id, children: props.label }) : null, jsxRuntime.exports.jsx("input", { className: 'Checkbox-rect', style: props.style, type: "checkbox", id: id, checked: props.value, onChange: e => props.onChange(e.target.checked, props.index, props.group) })] }));
  };
  var Checkbox$1 = React.memo(Checkbox);

  const Select = (props) => {
      const id = React.useMemo(() => {
          return props.label ? props.label + Math.random() * 100000 : null;
      }, [props.label]);
      const options = React.useMemo(() => {
          return jsxRuntime.exports.jsx(jsxRuntime.exports.Fragment, { children: props.children.map((item, index) => {
                  return jsxRuntime.exports.jsx("option", { value: item.value, selected: props.selected == item.value, className: "Select-option", children: item.label }, index);
              }) });
      }, [props.children, props.selected]);
      return (jsxRuntime.exports.jsxs("div", { className: 'Select', children: [props.label ? jsxRuntime.exports.jsx(Label$1, { for: id, children: props.label }) : null, jsxRuntime.exports.jsx("select", { id: id, className: 'Select-box', style: props.style, placeholder: props.placeholder, onChange: (e) => props.onChange(e.target.value, props.index, props.group), children: options })] }));
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

  class SCModule {
      constructor() {
          this.init();
      }
      checkData() {
          return false;
      }
      reset() {
          this.init();
      }
      write(starCode, key) {
          starCode.reset();
          const length = this._queue.length;
          for (let i = 0; i < length; i++)
              starCode.setInt(this._queue[i].current, this._queue[i].max);
          return starCode.compressAndEncrypt(key);
      }
      read(starCode, key) {
          starCode.decryptAndDecompress(starCode.code, key);
          let i = this._queue.length - 1;
          while (i >= 0) {
              this._queue[i].update(starCode.getInt(this._queue[i].max));
              i--;
          }
      }
      get queue() {
          return this._queue;
      }
      init() {
          this._queue = new Array();
      }
  }

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

  class RR4Camera extends SCModule {
      init() {
          super.init();
          this._queue = [
              new SCParam(0, 99000000, 'Sum of all stats'),
              new SCParam(0, 98000000, 'Sum of all units and account')
          ];
      }
  }

  class RR4Info extends SCModule {
      getSum() {
          let sum = 0;
          for (let i = 0; i < 17; i++)
              if (i < 10 || i > 12)
                  sum += this._queue[i].current;
          return sum;
      }
      init() {
          super.init();
          this._queue = [
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
      }
  }

  class RR4Slots extends SCModule {
      enableAll() {
          this._queue.forEach((p) => {
              p.update(1);
          });
      }
      disableAll() {
          this._queue.forEach((p) => {
              p.update(0);
          });
      }
      setSlot(index, enabled = true) {
          this._queue[index].update(enabled ? 1 : 0);
      }
      init() {
          super.init();
          this._queue = [
              new SCParam(1, 425, 'Slot 1'),
              new SCParam(1, 426, 'Slot 2'),
              new SCParam(1, 427, 'Slot 3'),
              new SCParam(1, 428, 'Slot 4'),
              new SCParam(1, 429, 'Slot 5'),
              new SCParam(1, 430, 'Slot 6'),
              new SCParam(1, 431, 'Slot 7'),
              new SCParam(1, 432, 'Slot 8')
          ];
      }
  }

  class RR4Unit extends SCModule {
      constructor(type, level = 75) {
          super();
          this._queue[0].update(type);
          this._queue[1].update(this._exps.get(level));
          this._queue[7].update(level);
          this._queue[8].update(level * 4);
      }
      checkData() {
          const q = this._queue;
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
          return true;
      }
      getSum() {
          let sum = 0;
          for (let i = 1; i < 9; i++)
              if (i != 7)
                  sum += this._queue[i].current;
          return sum;
      }
      setLevel(value) {
          this._queue[1].update(this._exps.get(value));
          this._queue[7].update(value);
          this._queue[8].update(value * 4);
      }
      init() {
          super.init();
          this._exps = new Map([
              [1, 0], [2, 2], [3, 6], [4, 13], [5, 24], [6, 40], [7, 62], [8, 92], [9, 131], [10, 180],
              [11, 240], [12, 312], [13, 397], [14, 498], [15, 612], [16, 742], [17, 889], [18, 1054], [19, 1238], [20, 1442],
              [21, 1667], [22, 1914], [23, 2184], [24, 2478], [25, 2797], [26, 3142], [27, 3514], [28, 3914], [29, 4343], [30, 4802],
              [31, 5292], [32, 5814], [33, 6369], [34, 6958], [35, 7582], [36, 8242], [37, 8939], [38, 9674], [39, 10448], [40, 11262],
              [41, 12117], [42, 13014], [43, 13954], [44, 14938], [45, 15969], [46, 17042], [47, 18164], [48, 19334], [49, 20553], [50, 21820],
              [51, 23140], [52, 24512], [53, 25937], [54, 27416], [55, 28950], [56, 30540], [57, 32187], [58, 33892], [59, 35656], [60, 37480],
              [61, 39365], [62, 41312], [63, 43322], [64, 45396], [65, 47535], [66, 49739], [67, 52009], [68, 54346], [69, 56751], [70, 59225],
              [71, 61769], [72, 64384], [73, 67072], [74, 69834], [75, 72671]
          ]);
          this._queue = [
              new SCParam(2, 300000, 'Unit Type'),
              new SCParam(this._exps.get(75), 8100000, 'Exp'),
              new SCParam(0, 320000, 'Regen'),
              new SCParam(0, 330000, 'Energy'),
              new SCParam(0, 340000, 'Speed'),
              new SCParam(0, 350000, 'Skill 1'),
              new SCParam(0, 360000, 'Skill 2'),
              new SCParam(75, 370000, 'Level'),
              new SCParam(75 * 4, 380000, 'Free Points')
          ];
      }
  }

  const RunlingRun4Form = mobxReactLite.observer((props) => {
      const { menuStore, mapStore, modalStore } = useStore();
      const [bankName, setBankName] = React.useState(props.bankName);
      const [authorID, setAuthorID] = React.useState(mapProps.get(Maps.RUNLING_RUN_4).authorID);
      const mapTitle = mapProps.get(Maps.RUNLING_RUN_4).title;
      const RR4_KEY = 'WalkerKey';
      const bank = new Bank(bankName, authorID, menuStore.playerID, '1');
      const units = [
          new RR4Unit(1, 75),
          new RR4Unit(2, 75),
          new RR4Unit(3, 75),
          new RR4Unit(4, 75),
          new RR4Unit(5, 75),
          new RR4Unit(0, 75),
          new RR4Unit(0, 75),
          new RR4Unit(0, 75)
      ];
      const slots = new RR4Slots();
      const info = new RR4Info();
      const camera = new RR4Camera();
      const prefix = parseInt(menuStore.playerID.split('-')[3]);
      const unitSelectorData = [
          { value: '0', label: 'Empty' },
          { value: '1', label: 'Ling' },
          { value: '2', label: 'Bane' },
          { value: '3', label: 'Hydra' },
          { value: '4', label: 'Ultra' },
          { value: '5', label: 'Roach' }
      ];
      React.useMemo(() => {
          const storeParams = mapStore.list[mapTitle];
          if (!storeParams)
              return;
          storeParams.units.forEach((unit, i) => {
              unit.forEach((param, j) => {
                  units[i].queue[j].update(param._current);
              });
          });
          storeParams.slots.forEach((param, i) => {
              slots.queue[i].update(param._current);
          });
          storeParams.info.forEach((param, i) => {
              info.queue[i].update(param._current);
          });
          storeParams.camera.forEach((param, i) => {
              camera.queue[i].update(param._current);
          });
          console.log('update data from store');
      }, [mapStore]);
      const xmlBank = React.useMemo(() => {
          if (!bank.info.playerID || bank.info.playerID.length < 12)
              return '';
          const section = { unit: 'unit', account: 'account' };
          const key = { info: 'info', camera: 'camera' };
          if (!bank.sections.has(section.unit))
              bank.sections.set(section.unit, new BankMap(section.unit));
          let unitSum = 0;
          const bsu = bank.sections.get(section.unit);
          units.forEach((unit, index) => {
              const k = '0' + (index + 1);
              if (unit.queue[0].current > 0) {
                  if (!bsu.has(k))
                      bsu.set(k, new BankKey(k, BankKeyType.STRING, ''));
                  bsu.get(k).update(unit.write(starcode, RR4_KEY));
                  unitSum += unit.getSum();
                  slots.setSlot(index, true);
              }
              else {
                  if (bsu.has(k))
                      bsu.delete(k);
                  slots.setSlot(index, false);
              }
          });
          if (!bsu.has(key.info))
              bsu.set(key.info, new BankKey(key.info, BankKeyType.STRING, ''));
          bsu.get(key.info).update(slots.write(starcode, RR4_KEY));
          if (!bank.sections.has(section.account))
              bank.sections.set(section.account, new BankMap(section.account));
          const bsa = bank.sections.get(section.account);
          if (!bsa.has(key.info))
              bsa.set(key.info, new BankKey(key.info, BankKeyType.STRING, ''));
          bsa.get(key.info).update(info.write(starcode, RR4_KEY));
          if (!bsa.has(key.camera))
              bsa.set(key.camera, new BankKey(key.camera, BankKeyType.STRING, ''));
          camera.queue[0].update(info.getSum());
          camera.queue[1].update(unitSum + prefix);
          bsa.get(key.camera).update(camera.write(starcode, RR4_KEY));
          bank.sort();
          bank.updateSignature();
          console.log("bank const updated:", bank.signature);
          return bank.getAsString();
      }, [units, slots, info, camera]);
      const makeSaveObject = () => {
          const unitsArray = [[], [], [], [], [], [], [], []];
          units.forEach((unit, index) => {
              unitsArray[index] = unit.queue;
          });
          return { units: unitsArray, slots: slots.queue, info: info.queue, camera: camera.queue };
      };
      const callbacks = {
          onBankNameChange: React.useCallback((value) => {
              setBankName(value);
          }, []),
          onAuthorIdChange: React.useCallback((value) => {
              setAuthorID(value);
          }, []),
          onFileDrop: React.useCallback((name, value) => {
              const section = { unit: 'unit', account: 'account' };
              const key = { info: 'info', camera: 'camera' };
              bank.parse(value);
              if (bank.sections.size != 2 || bank.sections.get('unit') == null || bank.sections.get('account') == null)
                  throw new Error('wrong bank file!');
              starcode.reset();
              const bsu = bank.sections.get(section.unit);
              for (let i = 0; i < 8; i++) {
                  const k = '0' + (i + 1);
                  if (bsu.has(k)) {
                      starcode.code = bsu.get(k).value;
                      units[i].read(starcode, RR4_KEY);
                  }
                  else
                      units[i].queue[0].update(0);
              }
              starcode.code = bsu.get(key.info).value;
              slots.read(starcode, RR4_KEY);
              const bsa = bank.sections.get(section.account);
              starcode.code = bsa.get(key.info).value;
              info.read(starcode, RR4_KEY);
              starcode.code = bsa.get(key.camera).value;
              camera.read(starcode, RR4_KEY);
              mapStore.setMapData(mapTitle, makeSaveObject());
          }, []),
          onDownloadClick: React.useCallback(() => {
              if (menuStore.playerID.length < 12) {
                  modalStore.setModal('WARN', 'This map requires a player id to generate valid bank! Use Help for details.');
                  return;
              }
              console.log('download bank file:', xmlBank);
              const blob = new Blob([xmlBank], { type: 'application/octet-stream' });
              filesaver.saveAs(blob, bankName + '.SC2Bank');
          }, [xmlBank]),
          onCopyCodeClick: React.useCallback(() => {
              if (menuStore.playerID.length < 12) {
                  modalStore.setModal('WARN', 'This map requires a player id to generate valid bank! Use Help for details.');
                  return;
              }
              window.navigator['clipboard'].writeText(xmlBank).then(() => {
                  console.log("Copied to clipboard:\n", xmlBank);
              });
          }, [xmlBank]),
          onResetClick: React.useCallback(() => {
              setTimeout(() => {
                  setBankName(props.bankName);
                  setAuthorID(mapProps.get(Maps.RUNLING_RUN_4).authorID);
              }, 1);
              units.forEach((unit) => {
                  unit.reset();
              });
              slots.reset();
              info.reset();
              camera.reset();
              mapStore.setMapData(mapTitle, makeSaveObject());
          }, []),
          onUnitTypeChange: React.useCallback((value, index) => {
              const intValue = parseInt(value);
              units[index].queue[0].update(intValue);
              slots.setSlot(index, intValue == 1);
              mapStore.setMapData(mapTitle, makeSaveObject());
          }, []),
          onUnitLevelChange: React.useCallback((value, index) => {
              const intValue = parseInt(value);
              units[index].setLevel(intValue);
              mapStore.setMapData(mapTitle, makeSaveObject());
          }, []),
          onStatChange: React.useCallback((value, index) => {
              info.queue[index].update(parseInt(value));
              camera.queue[0].update(info.getSum());
              mapStore.setMapData(mapTitle, makeSaveObject());
          }, []),
          onSettingChange: React.useCallback((value, index) => {
              if (index < 20)
                  info.queue[index].update(parseInt(value));
              else
                  info.queue[index].update(value ? 1 : 0);
              mapStore.setMapData(mapTitle, makeSaveObject());
          }, []),
      };
      return (jsxRuntime.exports.jsx(Editor$1, { bankName: bankName, authorID: authorID, onBankNameChange: callbacks.onBankNameChange, onAuthorIdChange: callbacks.onAuthorIdChange, onFileDrop: callbacks.onFileDrop, onDownload: callbacks.onDownloadClick, onCopy: callbacks.onCopyCodeClick, onReset: callbacks.onResetClick, children: jsxRuntime.exports.jsxs(Flex, { style: { flexDirection: 'row', padding: '0' }, children: [jsxRuntime.exports.jsx(Flex, { style: { flexFlow: 'column', padding: '0', justifyContent: 'space-around', border: '1px solid #ffffff40' }, children: units.map((unit, index) => {
                          return (jsxRuntime.exports.jsxs(Flex, { style: { flexDirection: 'row', padding: '10px' }, children: [jsxRuntime.exports.jsx(Select$1, { label: 'Unit ' + (index + 1) + ':', index: index, style: { width: '90px' }, onChange: callbacks.onUnitTypeChange, selected: unit.queue[0].current.toString(), children: unitSelectorData }), jsxRuntime.exports.jsx(Input$1, { label: 'Level:', index: index, type: 'number', min: '1', style: { width: '30px' }, onChange: callbacks.onUnitLevelChange, max: '75', placeholder: 'Level of unit (1-75)', value: unit.queue[7].current.toString() })] }));
                      }) }), jsxRuntime.exports.jsx(Flex, { style: { flexDirection: 'column', padding: '10px', border: '1px solid #ffffff40' }, alignInputs: true, children: info.queue.map((param, index) => {
                          if (index != 12 && index < 17)
                              return (jsxRuntime.exports.jsx(Input$1, { label: param.description + ':', index: index, type: 'number', min: '0', style: { width: '45px' }, onChange: callbacks.onStatChange, max: param.max.toString(), value: param.current.toString() }));
                          else
                              return null;
                      }) }), jsxRuntime.exports.jsx(Flex, { style: { flexDirection: 'column', padding: '10px', border: '1px solid #ffffff40' }, alignInputs: true, children: info.queue.map((param, index) => {
                          if (index < 17)
                              return null;
                          if (index < 20)
                              return (jsxRuntime.exports.jsx(Input$1, { label: param.description + ':', index: index, type: 'number', min: '1', style: { width: '45px' }, onChange: callbacks.onSettingChange, max: param.max.toString(), value: param.current.toString() }));
                          else
                              return (jsxRuntime.exports.jsx(Checkbox$1, { label: param.description + ':', index: index, onChange: callbacks.onSettingChange, value: param.current == 1 }));
                      }) })] }) }));
  });
  var RunlingRun4 = React.memo(RunlingRun4Form);

  class RR8Camera extends SCModule {
      init() {
          super.init();
          this._queue = [
              new SCParam(0, 99000000, 'Sum of all stats'),
              new SCParam(0, 98000000, 'Sum of all units and account')
          ];
      }
  }

  class RR8Info extends SCModule {
      getSum() {
          let sum = 0;
          for (let i = 0; i < 16; i++)
              if (i < 10 || i > 12)
                  sum += this._queue[i].current;
          return sum;
      }
      init() {
          super.init();
          this._queue = [
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
      }
  }

  class RR8Set2 extends SCModule {
      constructor(playerPrfxNumber) {
          super();
          this._queue[0].update(playerPrfxNumber);
      }
      init() {
          super.init();
          this._queue = [
              new SCParam(1, 97000000, 'PlayerID last number'),
          ];
      }
  }

  class RR8Slots extends SCModule {
      enableAll() {
          this._queue.forEach((p) => {
              p.update(1);
          });
      }
      disableAll() {
          this._queue.forEach((p) => {
              p.update(0);
          });
      }
      setSlot(index, enabled = true) {
          this._queue[index].update(enabled ? 1 : 0);
      }
      init() {
          super.init();
          this._queue = [
              new SCParam(1, 425, 'Slot 1'),
              new SCParam(1, 426, 'Slot 2'),
              new SCParam(1, 427, 'Slot 3'),
              new SCParam(1, 428, 'Slot 4'),
              new SCParam(1, 429, 'Slot 5'),
              new SCParam(1, 430, 'Slot 6'),
              new SCParam(1, 431, 'Slot 7'),
              new SCParam(1, 432, 'Slot 8')
          ];
      }
  }

  class RR8Unit extends SCModule {
      constructor(type, level = 100) {
          super();
          this._queue[0].update(type);
          this._queue[1].update(this._exps[level - 1]);
          this._queue[7].update(level);
          this._queue[8].update(level * 4);
      }
      checkData() {
          const q = this._queue;
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
          return true;
      }
      getSum() {
          let sum = 0;
          for (let i = 1; i < 9; i++)
              if (i != 7)
                  sum += this._queue[i].current;
          return sum;
      }
      setLevel(value) {
          this._queue[1].update(this._exps[value - 1]);
          this._queue[7].update(value);
          this._queue[8].update(value * 4);
      }
      init() {
          super.init();
          this._exps = [
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
          this._queue = [
              new SCParam(2, 300000, 'Unit Type'),
              new SCParam(this._exps[99], 8100000, 'Exp'),
              new SCParam(0, 320000, 'Regen'),
              new SCParam(0, 330000, 'Energy'),
              new SCParam(0, 340000, 'Speed'),
              new SCParam(0, 350000, 'Skill 1'),
              new SCParam(0, 360000, 'Skill 2'),
              new SCParam(100, 370000, 'Level'),
              new SCParam(100 * 4, 380000, 'Free Points')
          ];
      }
  }

  const RunlingRun8ILovePie = mobxReactLite.observer((props) => {
      const { menuStore, mapStore, modalStore } = useStore();
      const [bankName, setBankName] = React.useState(props.bankName);
      const [authorID, setAuthorID] = React.useState(mapProps.get(Maps.RUNLING_RUN_8).authorID);
      const mapTitle = mapProps.get(Maps.RUNLING_RUN_8).title;
      const RR8_KEY = 'Ks8N10dj6L3M';
      const bank = new Bank(bankName, authorID, menuStore.playerID, '1');
      const units = [
          new RR8Unit(1, 100),
          new RR8Unit(2, 100),
          new RR8Unit(3, 100),
          new RR8Unit(4, 100),
          new RR8Unit(5, 100),
          new RR8Unit(6, 100),
          new RR8Unit(7, 100),
          new RR8Unit(8, 100)
      ];
      const playerNumber = parseInt(menuStore.playerID.split('-')[3]);
      const set2 = new RR8Set2(playerNumber);
      const slots = new RR8Slots();
      const info = new RR8Info();
      const camera = new RR8Camera();
      const unitSelectorData = [
          { value: '0', label: 'Empty' },
          { value: '1', label: 'Ling' },
          { value: '2', label: 'Bane' },
          { value: '3', label: 'Hydra' },
          { value: '4', label: 'Ultra' },
          { value: '5', label: 'Roach' },
          { value: '6', label: 'Impaler' },
          { value: '7', label: 'Infested' },
          { value: '8', label: 'Drone' },
      ];
      React.useMemo(() => {
          const storeParams = mapStore.list[mapTitle]?.ilovepie;
          if (!storeParams)
              return;
          storeParams.units.forEach((unit, i) => {
              unit.forEach((param, j) => {
                  units[i].queue[j].update(param._current);
              });
          });
          storeParams.slots.forEach((param, i) => {
              slots.queue[i].update(param._current);
          });
          storeParams.info.forEach((param, i) => {
              info.queue[i].update(param._current);
          });
          storeParams.camera.forEach((param, i) => {
              camera.queue[i].update(param._current);
          });
      }, [mapStore, units, slots, info, camera, set2]);
      const xmlBank = React.useMemo(() => {
          if (!bank.info.playerID || bank.info.playerID.length < 12)
              return '';
          const section = { unit: 'unit', account: 'account' };
          const key = { info: 'info', camera: 'camera', set2: 'set2' };
          let unitSum = 0;
          units.forEach((unit, index) => {
              const k = '0' + (index + 1);
              if (unit.queue[0].current > 0) {
                  bank.addKey(k, 'STRING', unit.write(starcode, RR8_KEY), section.unit);
                  unitSum += unit.getSum();
                  slots.setSlot(index, true);
              }
              else {
                  bank.removeKey(k, section.unit);
                  slots.setSlot(index, false);
              }
          });
          bank.addKey(key.info, 'STRING', slots.write(starcode, RR8_KEY), section.unit);
          bank.addKey(key.info, 'STRING', info.write(starcode, RR8_KEY), section.account);
          camera.queue[0].update(info.getSum());
          camera.queue[1].update(unitSum + playerNumber);
          bank.addKey(key.camera, 'STRING', camera.write(starcode, RR8_KEY), section.account);
          set2.queue[0].update(playerNumber);
          bank.addKey(key.set2, 'STRING', set2.write(starcode, RR8_KEY), section.account);
          bank.sort();
          bank.updateSignature();
          return bank.getAsString();
      }, [units, slots, info, camera]);
      const makeSaveObject = () => {
          const unitsArray = [[], [], [], [], [], [], [], []];
          units.forEach((unit, index) => {
              unitsArray[index] = unit.queue;
          });
          const prestige = mapStore.list[mapTitle]?.prestige;
          return { ilovepie: { units: unitsArray, slots: slots.queue, info: info.queue, camera: camera.queue, set2: set2.queue }, prestige };
      };
      const callbacks = {
          onBankNameChange: React.useCallback((value) => {
              setBankName(value);
          }, []),
          onAuthorIdChange: React.useCallback((value) => {
              setAuthorID(value);
          }, []),
          onFileDrop: React.useCallback((name, value) => {
              const section = { unit: 'unit', account: 'account' };
              const key = { info: 'info', camera: 'camera', set2: 'set2' };
              bank.parse(value);
              if (bank.sections.size != 2 || bank.sections.get('unit') == null || bank.sections.get('account') == null)
                  throw new Error('wrong bank file!');
              starcode.reset();
              const bsu = bank.sections.get(section.unit);
              for (let i = 0; i < 8; i++) {
                  const k = '0' + (i + 1);
                  if (bsu.has(k)) {
                      starcode.code = bsu.get(k).value;
                      units[i].read(starcode, RR8_KEY);
                  }
                  else
                      units[i].queue[0].update(0);
              }
              starcode.code = bsu.get(key.info).value;
              slots.read(starcode, RR8_KEY);
              const bsa = bank.sections.get(section.account);
              starcode.code = bsa.get(key.info).value;
              info.read(starcode, RR8_KEY);
              starcode.code = bsa.get(key.camera).value;
              camera.read(starcode, RR8_KEY);
              starcode.code = bsa.get(key.set2).value;
              set2.read(starcode, RR8_KEY);
              mapStore.setMapData(mapTitle, makeSaveObject());
          }, []),
          onDownloadClick: React.useCallback(() => {
              if (menuStore.playerID.length < 12) {
                  modalStore.setModal('WARN', 'This map requires a player id to generate valid bank! Use Help for details.');
                  return;
              }
              console.log('download bank file:', xmlBank);
              const blob = new Blob([xmlBank], { type: 'application/octet-stream' });
              filesaver.saveAs(blob, bankName + '.SC2Bank');
          }, [xmlBank]),
          onCopyCodeClick: React.useCallback(() => {
              if (menuStore.playerID.length < 12) {
                  modalStore.setModal('WARN', 'This map requires a player id to generate valid bank! Use Help for details.');
                  return;
              }
              window.navigator['clipboard'].writeText(xmlBank).then(() => {
                  console.log("Copied to clipboard:\n", xmlBank);
              });
          }, [xmlBank]),
          onResetClick: React.useCallback(() => {
              setTimeout(() => {
                  setBankName(props.bankName);
                  setAuthorID(mapProps.get(Maps.RUNLING_RUN_8).authorID);
              }, 1);
              units.forEach((unit) => {
                  unit.reset();
              });
              slots.reset();
              info.reset();
              camera.reset();
              set2.reset();
              mapStore.setMapData(mapTitle, makeSaveObject());
          }, []),
          onUnitTypeChange: React.useCallback((value, index) => {
              const intValue = parseInt(value);
              units[index].queue[0].update(intValue);
              slots.setSlot(index, intValue == 1);
              mapStore.setMapData(mapTitle, makeSaveObject());
          }, []),
          onUnitLevelChange: React.useCallback((value, index) => {
              const intValue = parseInt(value);
              units[index].setLevel(intValue);
              mapStore.setMapData(mapTitle, makeSaveObject());
          }, []),
          onStatChange: React.useCallback((value, index) => {
              info.queue[index].update(parseInt(value));
              camera.queue[0].update(info.getSum());
              mapStore.setMapData(mapTitle, makeSaveObject());
          }, []),
          onSettingChange: React.useCallback((value, index) => {
              if (index < 19)
                  info.queue[index].update(parseInt(value));
              else
                  info.queue[index].update(value ? 1 : 0);
              mapStore.setMapData(mapTitle, makeSaveObject());
          }, []),
      };
      return (jsxRuntime.exports.jsx(Editor$1, { bankName: bankName, authorID: authorID, onBankNameChange: callbacks.onBankNameChange, onAuthorIdChange: callbacks.onAuthorIdChange, onFileDrop: callbacks.onFileDrop, onDownload: callbacks.onDownloadClick, onCopy: callbacks.onCopyCodeClick, onReset: callbacks.onResetClick, children: jsxRuntime.exports.jsxs(Flex, { style: { flexDirection: 'row', padding: '0' }, children: [jsxRuntime.exports.jsx(Flex, { style: { flexFlow: 'column', padding: '0', justifyContent: 'space-around', border: '1px solid #ffffff40' }, children: units.map((unit, index) => {
                          return (jsxRuntime.exports.jsxs(Flex, { style: { flexDirection: 'row', padding: '10px' }, children: [jsxRuntime.exports.jsx(Select$1, { label: 'Unit ' + (index + 1) + ':', index: index, style: { width: '90px' }, onChange: callbacks.onUnitTypeChange, selected: unit.queue[0].current.toString(), children: unitSelectorData }), jsxRuntime.exports.jsx(Input$1, { label: 'Level:', index: index, type: 'number', min: '1', style: { width: '30px' }, onChange: callbacks.onUnitLevelChange, max: '100', placeholder: 'Level of unit (1-100)', value: unit.queue[7].current.toString() })] }));
                      }) }), jsxRuntime.exports.jsx(Flex, { style: { flexDirection: 'column', padding: '10px', border: '1px solid #ffffff40' }, alignInputs: true, children: info.queue.map((param, index) => {
                          if (index != 12 && index < 16)
                              return (jsxRuntime.exports.jsx(Input$1, { label: param.description + ':', index: index, type: 'number', min: '0', style: { width: '45px' }, onChange: callbacks.onStatChange, max: param.max.toString(), value: param.current.toString() }));
                          else
                              return null;
                      }) }), jsxRuntime.exports.jsx(Flex, { style: { flexDirection: 'column', padding: '10px', border: '1px solid #ffffff40' }, alignInputs: true, children: info.queue.map((param, index) => {
                          if (index < 16)
                              return null;
                          if (index < 19)
                              return (jsxRuntime.exports.jsx(Input$1, { label: param.description + ':', index: index, type: 'number', min: '1', style: { width: '45px' }, onChange: callbacks.onSettingChange, max: param.max.toString(), value: param.current.toString() }));
                          else
                              return (jsxRuntime.exports.jsx(Checkbox$1, { label: param.description + ':', index: index, onChange: callbacks.onSettingChange, value: param.current == 1 }));
                      }) })] }) }));
  });
  var RunlingRun8ilovePie = React.memo(RunlingRun8ILovePie);

  const RunLingRun8Prestige = mobxReactLite.observer((props) => {
      const { mapStore, menuStore } = useStore();
      const [bankName, setBankName] = React.useState(props.bankName);
      const [authorID, setAuthorID] = React.useState(mapProps.get(Maps.RUNLING_RUN_8).authorID);
      const mapTitle = mapProps.get(Maps.RUNLING_RUN_8).title;
      const bank = new Bank(bankName, authorID, menuStore.playerID, '1');
      const params = { active: false, hide: false };
      React.useMemo(() => {
          const storeParams = mapStore.list[mapTitle]?.prestige;
          if (!storeParams)
              return;
          params.active = storeParams.active;
          params.hide = storeParams.hide;
      }, [mapStore, params]);
      const xmlBank = React.useMemo(() => {
          const section = 'HUD';
          const key = { active: 'Active', hide: 'Hide' };
          if (!bank.sections.has(section))
              bank.sections.set(section, new BankMap(section));
          const s = bank.sections.get(section);
          if (!s.has(key.active))
              s.set(key.active, new BankKey(key.active, BankKeyType.FLAG, ''));
          s.get(key.active).update(params.active ? '1' : '0');
          if (!s.has(key.hide))
              s.set(key.hide, new BankKey(key.hide, BankKeyType.FLAG, ''));
          s.get(key.hide).update(params.hide ? '1' : '0');
          return bank.getAsString();
      }, [params]);
      const makeSaveObject = () => {
          const ilovepie = mapStore.list[mapTitle]?.ilovepie;
          return { ilovepie, prestige: params };
      };
      const callbacks = {
          onBankNameChange: React.useCallback((value) => {
              setBankName(value);
          }, []),
          onAuthorIdChange: React.useCallback((value) => {
              setAuthorID(value);
          }, []),
          onFileDrop: React.useCallback((name, value) => {
              const section = 'HUD';
              const key = { active: 'Active', hide: 'Hide' };
              bank.parse(value);
              if (bank.sections.size != 1 || bank.sections.get(section) == null)
                  throw new Error('wrong bank file!');
              params.active = bank.sections.get(section).get(key.active).value == '1';
              params.hide = bank.sections.get(section).get(key.hide).value == '1';
              mapStore.setMapData(mapTitle, makeSaveObject());
          }, []),
          onDownloadClick: React.useCallback(() => {
              console.log('download bank file:', xmlBank);
              const blob = new Blob([xmlBank], { type: 'application/octet-stream' });
              filesaver.saveAs(blob, bankName + '.SC2Bank');
          }, [xmlBank]),
          onCopyCodeClick: React.useCallback(() => {
              window.navigator['clipboard'].writeText(xmlBank).then(() => {
                  console.log("Copied to clipboard:\n", xmlBank);
              });
          }, [xmlBank]),
          onResetClick: React.useCallback(() => {
              setTimeout(() => {
                  setBankName(props.bankName);
                  setAuthorID(mapProps.get(Maps.RUNLING_RUN_8).authorID);
              }, 1);
              params.active = false;
              params.hide = false;
              mapStore.setMapData(mapTitle, makeSaveObject());
          }, []),
          onSettingChange: React.useCallback((value, index) => {
              index == 0 ? params.active = value : params.hide = value;
              mapStore.setMapData(mapTitle, makeSaveObject());
          }, []),
      };
      return (jsxRuntime.exports.jsx(Editor$1, { bankName: bankName, authorID: authorID, onBankNameChange: callbacks.onBankNameChange, onAuthorIdChange: callbacks.onAuthorIdChange, onFileDrop: callbacks.onFileDrop, onDownload: callbacks.onDownloadClick, onCopy: callbacks.onCopyCodeClick, onReset: callbacks.onResetClick, children: jsxRuntime.exports.jsxs(Flex, { style: { flexDirection: 'column' }, children: [jsxRuntime.exports.jsx(Text$1, { children: "This bank file is for HUD only" }), jsxRuntime.exports.jsxs(Flex, { style: { flexDirection: 'row', padding: '10' }, children: [jsxRuntime.exports.jsx(Checkbox$1, { label: 'Active' + ':', index: 0, onChange: callbacks.onSettingChange, value: params.active }), jsxRuntime.exports.jsx(Checkbox$1, { label: 'Hide' + ':', index: 1, onChange: callbacks.onSettingChange, value: params.hide })] })] }) }));
  });
  var RunlingRun8Prestige = React.memo(RunLingRun8Prestige);

  const SSFPartElement = (props) => {
      let title;
      switch (props.j) {
          case 0:
              title = 'Terran';
              break;
          case 1:
              title = 'Protoss';
              break;
          case 2:
              title = 'Mecha';
              break;
      }
      const callbacks = {
          onFieldChange: React.useCallback((value, index) => {
              props.onChange(props.i, props.j, index, value);
          }, [])
      };
      return (jsxRuntime.exports.jsxs(Flex, { style: { flexDirection: 'column' }, children: [jsxRuntime.exports.jsx(Label$1, { children: title + ' part:' }), jsxRuntime.exports.jsx(Flex, { style: { flexDirection: 'column' }, children: props.array.map((param, index) => {
                      if (param.hidden)
                          return null;
                      return (jsxRuntime.exports.jsx(Input$1, { label: index == 0 ? 'Solo' : 'Team', index: index, type: 'text', style: { width: '70px' }, onChange: callbacks.onFieldChange, value: param.value.toString() }));
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
      return (jsxRuntime.exports.jsxs(jsxRuntime.exports.Fragment, { children: [jsxRuntime.exports.jsx(Label$1, { children: title + ' speedruns:' }), jsxRuntime.exports.jsx(Flex, { style: { flexDirection: 'row', border: '1px solid #ffffff40', padding: '10px' }, children: props.array.map((params, index) => {
                      return (jsxRuntime.exports.jsx(SSFPartElement$1, { onChange: props.onChange, array: params, i: props.i, j: index }));
                  }) })] }));
  };
  var SsfDiff = React.memo(SSFDiffElement);

  class SSFStorage {
      constructor() {
          this.reset();
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

  class SSFData {
      constructor(playerID, skipGenerating) {
          this.playerID = playerID;
          this.init(skipGenerating);
      }
      read(bank) {
          this.reloadStorage(bank, 'lightData');
          for (let i = 0; i < 6; i++)
              this.lightData[i].value = this._storage.getInt();
          this._storage.getInt();
          if (this._storage.getInt() != this.version)
              throw new Error('Invaliid version in lightData');
          this.reloadStorage(bank, 'heavyData');
          for (let i = 0; i < this._parts; i++)
              this.heavyData[i].value = this._storage.getInt();
          for (let i = 0; i < this._bosses; i++)
              this.heavyData[i + this._parts].value = this._storage.getInt();
          this.heavyData[this._parts + this._bosses].value = this._storage.getInt();
          this.heavyData[this._parts + this._bosses + 1].value = this._storage.getBool();
          this.heavyData[this._parts + this._bosses + 2].value = this._storage.getInt();
          this._storage.getInt();
          if (this._storage.getInt() != this.version)
              throw new Error('Invaliid version in heavyData');
          this.reloadStorage(bank, 'speedrunsData');
          for (let i = 0; i < this._difficults; i++)
              for (let j = 0; j < this._parts; j++) {
                  let solo = 0;
                  let team = 0;
                  for (let k = 0; k < this._players; k++) {
                      const v = this._storage.getInt();
                      k < 2 ? solo = Math.max(solo, v) : team = Math.max(team, v);
                  }
                  this.speedruns[i][j][0].value = this.n2t(solo);
                  this.speedruns[i][j][1].value = this.n2t(team);
              }
          this._storage.getInt();
          if (this._storage.getInt() != this.version)
              throw new Error('Invaliid version in speedrunsData');
          this._storage.data = bank.sections.get('stats').get('options').value;
          for (let i = 0; i < 6; i++)
              if (i > 0 && i < 5)
                  this.options[i].value = this._storage.getBool();
              else
                  this.options[i].value = this._storage.getInt();
          for (let i = 0; i < 10; i += 2) {
              this.options[i + 6].value = this._storage.getBool();
              this.options[i + 7].value = this._storage.getInt();
          }
          return { lightData: this.lightData, heavyData: this.heavyData, speedruns: this.speedruns, options: this.options };
      }
      storageToSC() {
          return starcode.encrypt(starcode.addHash(starcode.compress(this._storage.data), this._hashLevel), this._scKey);
      }
      save(bank) {
          bank.addSection('stats');
          bank.addKey('version', 'FIXED', '2.01', 'stats');
          this._storage.reset();
          for (let i = 0; i < 6; i++)
              this._storage.addInt(this.lightData[i].value);
          this._storage.addInt(this.r(1, 500));
          this._storage.addInt(this.version);
          bank.addKey('lightData', 'STRING', this.storageToSC(), 'stats');
          this._storage.reset();
          for (let i = 0; i < 10; i++)
              if (this.heavyData[i].type == 'number')
                  this._storage.addInt(this.heavyData[i].value);
              else
                  this._storage.addBool(this.heavyData[i].value);
          this._storage.addInt(this.r(1, 500));
          this._storage.addInt(this.version);
          bank.addKey('heavyData', 'STRING', this.storageToSC(), 'stats');
          this._storage.reset();
          for (let i = 0; i < this._difficults; i++)
              for (let j = 0; j < this._parts; j++)
                  for (let k = 0; k < this._players; k++)
                      this._storage.addInt(this.t2n(k < 2 ? this.speedruns[i][j][0].value : this.speedruns[i][j][1].value));
          this._storage.addInt(this.r(1, 500));
          this._storage.addInt(this.version);
          bank.addKey('speedrunsData', 'STRING', this.storageToSC(), 'stats');
          this._storage.reset();
          for (let i = 0; i < 6; i++)
              if (i > 0 && i < 5)
                  this._storage.addBool(this.options[i].value);
              else
                  this._storage.addInt(this.options[i].value);
          for (let i = 0; i < 10; i += 2) {
              this._storage.addBool(this.options[i + 6].value);
              this._storage.addInt(this.options[i + 7].value);
          }
          bank.addKey('options', 'STRING', this._storage.data, 'stats');
          bank.sort();
          bank.updateSignature();
          return bank.getAsString();
      }
      generateDefault(myKillz) {
          const killz = myKillz ? myKillz : this.r(500000, 9000000);
          this.lightData = [
              { type: 'number', value: killz, description: 'Kills' },
              { type: 'number', value: Math.floor(killz / this.r(180, 220)), description: 'Points' },
              { type: 'number', value: Math.floor(killz / this.r(3200, 3500)), description: 'Scientists' },
              { type: 'number', value: Math.floor(killz / this.r(1500, 1800)), description: 'Essences' },
              { type: 'number', value: Math.floor(killz / this.r(8000, 12000)), description: 'Psi Orbs' },
              { type: 'number', value: Math.floor(killz / this.r(14000, 16000)), description: 'MoopyHats' }
          ];
          this.heavyData = [];
          for (let i = 0; i < this._parts; i++) {
              const wins = Math.floor(killz / this.r(1200 * (i + 1), 2000 * (i + 1)));
              this.heavyData.push({ type: 'number', value: wins, description: 'Wins ' + (i + 1) });
          }
          for (let i = 0; i < this._bosses; i++) {
              const bkillz = Math.floor(killz / this.r(800, 3200));
              this.heavyData.push({ type: 'number', value: bkillz, description: 'Boss ' + (i + 1) + ' kills', hidden: false });
          }
          this.heavyData.push({ type: 'number', value: this.r(10, 50), description: 'Flawless' }, { type: 'boolean', value: true, description: 'Tutorial' }, { type: 'number', value: this.r(0, 10), description: 'ArchivedAcv' });
          this.speedruns = [];
          for (let i = 0; i < this._difficults; i++) {
              this.speedruns.push([]);
              for (let j = 0; j < this._parts; j++) {
                  this.speedruns[i].push([]);
                  for (let k = 0; k < 2; k++) {
                      this.speedruns[i][j].push({ type: 'string', value: this.n2t(this.r(250, 500) * Math.pow((i + 1), 1.5) / (k + 1)), description: 'time ' });
                  }
              }
          }
          this.options = [
              { type: 'number', value: 0, description: 'Hero type' },
              { type: 'boolean', value: false, description: 'Hero selected' },
              { type: 'boolean', value: false, description: 'Speedrun details' },
              { type: 'boolean', value: true, description: 'Hero panel' },
              { type: 'boolean', value: false, description: 'Hive panel' },
              { type: 'number', value: 0, description: 'Unit selection' },
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
          return { lightData: this.lightData, heavyData: this.heavyData, speedruns: this.speedruns, options: this.options };
      }
      get fullData() {
          return { lightData: this.lightData, heavyData: this.heavyData, speedruns: this.speedruns, options: this.options };
      }
      set playerID(value) {
          this._playerID = value;
          this._scKey = 'gehkaggen11' + this._playerID;
      }
      init(skipGenerating) {
          this.version = 2011;
          this.lightData = [];
          this.heavyData = [];
          this.speedruns = [];
          this.options = [];
          this._storage = new SSFStorage();
          this._scKey = this._playerID + 'gehkaggen11';
          this._hashLevel = 4;
          this._parts = 3;
          this._bosses = 4;
          this._difficults = 6;
          this._players = 6;
          if (skipGenerating)
              return;
          this.generateDefault();
      }
      r(min, max) {
          return Math.round(Math.random() * (max - min)) + min;
      }
      t2n(value = '00:10:00') {
          const a = value.split(':');
          return parseInt(a[0]) * 3600 + parseInt(a[1]) * 60 + parseInt(a[2]);
      }
      n2t(value) {
          return new Date(1000 * value).toISOString().substring(11, 19);
      }
      reloadStorage(bank, key, section = 'stats') {
          const stats = bank.sections.get(section);
          let s = starcode.decrypt(stats.get(key).value, this._scKey);
          if (!starcode.validate(s, this._hashLevel))
              throw new Error('Invaliid data in ' + section + ' → ' + key + '!');
          s = starcode.decompress(starcode.removeHash(s, this._hashLevel));
          this._storage.data = s;
      }
  }

  const SwarmSpecialForcesForm = mobxReactLite.observer((props) => {
      const { menuStore, mapStore, modalStore } = useStore();
      const [bankName, setBankName] = React.useState(props.bankName);
      const [authorID, setAuthorID] = React.useState(mapProps.get(Maps.SWARM_SCPECIAL_FORCES).authorID);
      const mapTitle = mapProps.get(Maps.SWARM_SCPECIAL_FORCES).title;
      const bank = new Bank(bankName, authorID, menuStore.playerID, '1');
      const ssfData = new SSFData(menuStore.playerID, true);
      React.useMemo(() => {
          const storeParams = mapStore.list[mapTitle];
          if (!storeParams) {
              ssfData.generateDefault();
              return;
          }
          ssfData.lightData = storeParams.lightData;
          ssfData.heavyData = storeParams.heavyData;
          ssfData.speedruns = storeParams.speedruns;
          ssfData.options = storeParams.options;
          console.log('update data from store');
      }, [mapStore, ssfData]);
      const callbacks = {
          onBankNameChange: React.useCallback((value) => {
              setBankName(value);
          }, []),
          onAuthorIdChange: React.useCallback((value) => {
              setAuthorID(value);
          }, []),
          onFileDrop: React.useCallback((name, value) => {
              bank.parse(value);
              if (bank.sections.size != 1 || !bank.sections.has('stats'))
                  throw new Error('wrong bank file!');
              mapStore.setMapData(mapTitle, ssfData.read(bank));
          }, []),
          onDownloadClick: React.useCallback(() => {
              if (menuStore.playerID.length < 12) {
                  modalStore.setModal('WARN', 'This map requires a player id to generate valid bank! Use Help for details.');
                  return;
              }
              const xml = ssfData.save(bank);
              console.log('download bank file:', xml);
              const blob = new Blob([xml], { type: 'application/octet-stream' });
              filesaver.saveAs(blob, bankName + '.SC2Bank');
          }, [ssfData]),
          onCopyCodeClick: React.useCallback(() => {
              if (menuStore.playerID.length < 12) {
                  modalStore.setModal('WARN', 'This map requires a player id to generate valid bank! Use Help for details.');
                  return;
              }
              const xml = ssfData.save(bank);
              window.navigator['clipboard'].writeText(xml).then(() => {
                  console.log("Copied to clipboard:\n", xml);
              });
          }, [ssfData]),
          onResetClick: React.useCallback(() => {
              setTimeout(() => {
                  setBankName(props.bankName);
                  setAuthorID(mapProps.get(Maps.SWARM_SCPECIAL_FORCES).authorID);
              }, 1);
              mapStore.setMapData(mapTitle, ssfData.generateDefault());
          }, []),
          onFieldChange: React.useCallback((value, index, group) => {
              switch (group) {
                  case 'lightData':
                      ssfData.lightData[index].value = parseInt(value);
                      break;
                  case 'heavyData':
                      ssfData.heavyData[index].value = ssfData.heavyData[index].type == 'number' ? parseInt(value) : value;
                      break;
                  case 'options':
                      ssfData.options[index].value = ssfData.options[index].type == 'number' ? parseInt(value) : value;
                      break;
              }
              mapStore.setMapData(mapTitle, ssfData.fullData);
          }, []),
          onSpeedrunsChange: React.useCallback((i, j, k, value) => {
              ssfData.speedruns[i][j][k].value = value;
              mapStore.setMapData(mapTitle, ssfData.fullData);
          }, [])
      };
      return (jsxRuntime.exports.jsx(Editor$1, { bankName: bankName, authorID: authorID, onBankNameChange: callbacks.onBankNameChange, onAuthorIdChange: callbacks.onAuthorIdChange, onFileDrop: callbacks.onFileDrop, onDownload: callbacks.onDownloadClick, onCopy: callbacks.onCopyCodeClick, onReset: callbacks.onResetClick, children: jsxRuntime.exports.jsxs(Flex, { style: { flexDirection: 'column' }, children: [jsxRuntime.exports.jsx(Label$1, { children: "Please note that the map has a votekick system." }), jsxRuntime.exports.jsxs(Text$1, { style: { width: '670px' }, children: ["If other players suspect inconsistencies in your statistics or values like 123456789, you can be kicked from the lobby.", jsxRuntime.exports.jsx("br", {}), "To prevent this, use ", jsxRuntime.exports.jsx("b", { children: "Reset" }), " button to generate random realistic statistics.", jsxRuntime.exports.jsx("br", {})] }), jsxRuntime.exports.jsxs(Flex, { style: { flexDirection: 'row' }, children: [jsxRuntime.exports.jsxs(Flex, { style: { flexDirection: 'column' }, children: [jsxRuntime.exports.jsx(Label$1, { children: "Main settings:" }), jsxRuntime.exports.jsxs(Flex, { style: { flexDirection: 'column', border: '1px solid #ffffff40', padding: '10px' }, children: [jsxRuntime.exports.jsx(Flex, { style: { flexDirection: 'column' }, alignInputs: true, children: ssfData.lightData.map((param, index) => {
                                                  if (param.hidden)
                                                      return null;
                                                  return (jsxRuntime.exports.jsx(Input$1, { label: param.description + ':', index: index, group: 'lightData', type: 'number', min: '0', style: { width: '75px' }, onChange: callbacks.onFieldChange, max: '999999999', value: param.value.toString() }));
                                              }) }), jsxRuntime.exports.jsx(Flex, { style: { flexDirection: 'column' }, alignInputs: true, children: ssfData.heavyData.map((param, index) => {
                                                  if (param.hidden)
                                                      return null;
                                                  if (param.type == 'number')
                                                      return (jsxRuntime.exports.jsx(Input$1, { label: param.description + ':', index: index, group: 'heavyData', type: 'number', min: '0', style: { width: '75px' }, onChange: callbacks.onFieldChange, max: '999999999', value: param.value.toString() }));
                                                  else
                                                      return (jsxRuntime.exports.jsx(Checkbox$1, { label: param.description + ':', index: index, group: 'heavyData', onChange: callbacks.onFieldChange, value: param.value }));
                                              }) })] }), jsxRuntime.exports.jsx(Label$1, { children: "Options:" }), jsxRuntime.exports.jsx(Flex, { style: { flexDirection: 'column', border: '1px solid #ffffff40', padding: '10px' }, alignInputs: true, children: ssfData.options.map((param, index) => {
                                          if (param.hidden)
                                              return null;
                                          if (param.type == 'number')
                                              return (jsxRuntime.exports.jsx(Input$1, { label: param.description + ':', index: index, group: 'options', type: 'number', min: '0', style: { width: '30px' }, onChange: callbacks.onFieldChange, max: '999', value: param.value.toString() }));
                                          else
                                              return (jsxRuntime.exports.jsx(Checkbox$1, { label: param.description + ':', index: index, group: 'options', onChange: callbacks.onFieldChange, value: param.value }));
                                      }) })] }), jsxRuntime.exports.jsx(Flex, { style: { flexDirection: 'column' }, children: ssfData.speedruns.map((params, index) => {
                                  return (jsxRuntime.exports.jsx(SsfDiff, { onChange: callbacks.onSpeedrunsChange, array: params, i: index }));
                              }) })] })] }) }));
  });
  var SwarmSpecialForces = React.memo(SwarmSpecialForcesForm);

  class ZcStats extends SCModule {
      init() {
          super.init();
          this._queue = [
              new SCParam(666, 1000, 'Waves'),
              new SCParam(66666666, 99000000, 'Kills'),
              new SCParam(1, 100000, 'Deaths'),
              new SCParam(666, 50000, 'Games'),
              new SCParam(39960, 1000000, 'Minutes')
          ];
      }
  }

  const ZombieCityForm = mobxReactLite.observer((props) => {
      const { menuStore, mapStore } = useStore();
      const [bankName, setBankName] = React.useState(props.bankName);
      const [authorID, setAuthorID] = React.useState(mapProps.get(Maps.ZOMBIE_CITY).authorID);
      const mapTitle = mapProps.get(Maps.ZOMBIE_CITY).title;
      const ZC_KEY = 'OnFbXRyxYzPuv7of(v5v7[zdvUiDzXO]gVb9FVI9b>M>l}Gt6L';
      const bank = new Bank(bankName, authorID, menuStore.playerID, '1');
      const zcStats = new ZcStats();
      React.useMemo(() => {
          const storeParams = mapStore.list[mapTitle];
          if (!storeParams)
              return;
          storeParams.forEach((value, i) => {
              zcStats.queue[i].update(value._current);
          });
      }, [mapStore, zcStats]);
      const xmlBank = React.useMemo(() => {
          const sID = '23EGWEG234AG4';
          const kID = 'AWEO322AOIGWE3wqogej23';
          if (!bank.sections.has(sID))
              bank.sections.set(sID, new BankMap(sID));
          if (!bank.sections.get(sID).has(kID))
              bank.sections.get(sID).set(kID, new BankKey(kID, BankKeyType.STRING, ''));
          bank.sections.get(sID).get(kID).update(zcStats.write(starcode, ZC_KEY));
          bank.updateSignature();
          return bank.getAsString();
      }, [zcStats]);
      const callbacks = {
          onBankNameChange: React.useCallback((value) => {
              setBankName(value);
          }, []),
          onAuthorIdChange: React.useCallback((value) => {
              setAuthorID(value);
          }, []),
          onFileDrop: React.useCallback((name, value) => {
              bank.parse(value);
              if (bank.sections.size != 1 || bank.sections.get('23EGWEG234AG4') == null)
                  throw new Error('wrong bank file!');
              starcode.reset();
              starcode.code = bank.sections.get('23EGWEG234AG4').get('AWEO322AOIGWE3wqogej23').value;
              zcStats.read(starcode, ZC_KEY);
              mapStore.setMapData(mapTitle, [...zcStats.queue]);
          }, []),
          onDownloadClick: React.useCallback(() => {
              console.log('download bank file:', xmlBank);
              const blob = new Blob([xmlBank], { type: 'application/octet-stream' });
              filesaver.saveAs(blob, bankName + '.SC2Bank');
          }, [xmlBank]),
          onCopyCodeClick: React.useCallback(() => {
              window.navigator['clipboard'].writeText(xmlBank).then(() => {
                  console.log("Copied to clipboard:\n", xmlBank);
              });
          }, [xmlBank]),
          onResetClick: React.useCallback(() => {
              setTimeout(() => {
                  setBankName(props.bankName);
                  setAuthorID(mapProps.get(Maps.ZOMBIE_CITY).authorID);
              }, 1);
              zcStats.reset();
              mapStore.setMapData(mapTitle, [...zcStats.queue]);
          }, []),
          onFieldChange: React.useCallback((value, index) => {
              zcStats.queue[index].update(parseInt(value));
              mapStore.setMapData(mapTitle, [...zcStats.queue]);
          }, [])
      };
      return (jsxRuntime.exports.jsx(Editor$1, { bankName: bankName, authorID: authorID, onBankNameChange: callbacks.onBankNameChange, onAuthorIdChange: callbacks.onAuthorIdChange, onFileDrop: callbacks.onFileDrop, onDownload: callbacks.onDownloadClick, onCopy: callbacks.onCopyCodeClick, onReset: callbacks.onResetClick, children: jsxRuntime.exports.jsx(Flex, { style: { flexDirection: 'column' }, alignInputs: true, children: zcStats.queue.map((param, index) => {
                  return (jsxRuntime.exports.jsx(Input$1, { label: param.description + ':', index: index, type: 'number', min: '0', onChange: callbacks.onFieldChange, max: param.max.toString(), value: param.current.toString() }));
              }) }) }));
  });
  var ZombieCity = React.memo(ZombieCityForm);

  var Maps;
  (function (Maps) {
      Maps[Maps["ANY_SIMPLE"] = 0] = "ANY_SIMPLE";
      Maps[Maps["RUNLING_RUN_4"] = 1] = "RUNLING_RUN_4";
      Maps[Maps["RUNLING_RUN_8"] = 2] = "RUNLING_RUN_8";
      Maps[Maps["SWARM_SCPECIAL_FORCES"] = 3] = "SWARM_SCPECIAL_FORCES";
      Maps[Maps["ZOMBIE_CITY"] = 4] = "ZOMBIE_CITY";
      Maps[Maps["STAR_CODE_LAB"] = 5] = "STAR_CODE_LAB";
  })(Maps || (Maps = {}));
  const mapProps = new Map([
      [Maps.ANY_SIMPLE, {
              title: 'Any Simple',
              authorID: '',
              forms: [jsxRuntime.exports.jsx(AnySimple$1, {})]
          }],
      [Maps.RUNLING_RUN_4, {
              title: 'Runling Run 4',
              authorID: '2-S2-1-3564862',
              forms: [jsxRuntime.exports.jsx(RunlingRun4, { bankName: 'RunlingRun004' })]
          }],
      [Maps.RUNLING_RUN_8, {
              title: 'Runling Run 8',
              authorID: '2-S2-1-5734972',
              forms: [jsxRuntime.exports.jsx(RunlingRun8ilovePie, { bankName: 'ILovePie' }), jsxRuntime.exports.jsx(RunlingRun8Prestige, { bankName: 'Prestige' })]
          }],
      [Maps.SWARM_SCPECIAL_FORCES, {
              title: 'Swarm Special Forces',
              authorID: '2-S2-1-1066242',
              forms: [jsxRuntime.exports.jsx(SwarmSpecialForces, { bankName: 'SwarmSpecialForces' })]
          }],
      [Maps.ZOMBIE_CITY, {
              title: 'Zombie City',
              authorID: '2-S2-1-1687296',
              forms: [jsxRuntime.exports.jsx(ZombieCity, { bankName: 'AMMMAAKDAS39349' })]
          }],
      [Maps.STAR_CODE_LAB, {
              title: 'Star Code Lab (PRO only)',
              authorID: '',
              forms: [jsxRuntime.exports.jsx(Editor$1, {})]
          }]
  ]);

  const Menu = mobxReactLite.observer((props) => {
      const { mapStore, menuStore, modalStore } = useStore();
      const callbacks = {
          onPlayerIdChange: React.useCallback((value) => {
              menuStore.setPlayerID(value);
          }, []),
          onHelpClick: React.useCallback(() => {
              modalStore.setModal('HELP');
          }, []),
          onMapSelect: React.useCallback((value) => {
              menuStore.setSelectedMap(parseInt(value));
          }, []),
          onShowCodeChange: React.useCallback((value) => {
              menuStore.setShowCode(value);
          }, []),
          onFullReset: React.useCallback(() => {
              mapStore.reset();
              menuStore.reset();
              modalStore.reset();
          }, [])
      };
      const mapList = React.useMemo(() => {
          const result = [];
          mapProps.forEach((value, key) => {
              result.push({ value: key.toString(), label: value.title });
          });
          return result;
      }, [menuStore.selectedMap]);
      return (jsxRuntime.exports.jsx(GlassWrapper$1, { children: jsxRuntime.exports.jsx(Flex, { style: { overflow: 'auto' }, children: jsxRuntime.exports.jsxs(Flex, { style: { flexDirection: 'column', padding: '10px' }, children: [jsxRuntime.exports.jsxs(Flex, { style: { flexDirection: 'row', justifyContent: 'space-between' }, children: [jsxRuntime.exports.jsx(Label$1, { style: { fontSize: '20px' }, children: "SC2 Bank Generator" }), jsxRuntime.exports.jsxs(Flex, { style: { flexDirection: 'row', justifyContent: 'flex-end' }, children: [jsxRuntime.exports.jsx(Input$1, { label: "Player id:", placeholder: "X-SX-X-XXXXXXX", onChange: callbacks.onPlayerIdChange, tip: "Player ID from bank's path", value: menuStore.playerID }), jsxRuntime.exports.jsx(Button$1, { style: { width: '50px' }, onClick: callbacks.onHelpClick, children: "Help" })] })] }), jsxRuntime.exports.jsx(Line$1, { style: { margin: '10px 0 0 0' } }), jsxRuntime.exports.jsxs(Flex, { style: { flexDirection: 'row', justifyContent: 'flex-end' }, children: [jsxRuntime.exports.jsx(Select$1, { onChange: callbacks.onMapSelect, label: "Select map:", selected: menuStore.selectedMap.toString(), children: mapList }), jsxRuntime.exports.jsx(Checkbox$1, { label: 'Show Code', onChange: callbacks.onShowCodeChange }), jsxRuntime.exports.jsx(Button$1, { onClick: callbacks.onFullReset, children: "Clear Cache" })] })] }) }) }));
  });
  var Menu$1 = React.memo(Menu);

  const Warn = mobxReactLite.observer((props) => {
      const { modalStore } = useStore();
      const callbacks = {
          onCloseClick: React.useCallback(() => {
              modalStore.setModal('NONE');
          }, [])
      };
      return (jsxRuntime.exports.jsx(Flex, { style: { flexFlow: 'row wrap', width: '100vw', height: '100vh', zIndex: '9999', position: 'fixed', left: '0', top: '0', background: '#000000AA', alignItems: 'center', justifyContent: 'center', padding: '5px' }, children: jsxRuntime.exports.jsx(GlassWrapper$1, { border: true, children: jsxRuntime.exports.jsx(Flex, { style: { overflow: 'auto', width: 'calc(100vw - 40px)', height: 'calc(100vh - 40px)', maxWidth: '500px', maxHeight: '200px' }, children: jsxRuntime.exports.jsxs(Flex, { style: { flexDirection: 'column', padding: '10px', minWidth: '100%', minHeight: 'max-content' }, children: [jsxRuntime.exports.jsxs(Flex, { style: { flexDirection: 'row', justifyContent: 'space-between', height: 'min-content', minWidth: 'max-content' }, children: [jsxRuntime.exports.jsx(Label$1, { style: { fontSize: '20px' }, children: "Warning" }), jsxRuntime.exports.jsx(Button$1, { onClick: callbacks.onCloseClick, children: "Close" })] }), jsxRuntime.exports.jsx(Line$1, { style: { margin: '10px 0 0 0' } }), jsxRuntime.exports.jsx(Flex, { style: { flexDirection: 'column', minWidth: '100%', justifyContent: 'center' }, children: jsxRuntime.exports.jsx(Text$1, { style: { textAlign: 'center', marginTop: '-20px' }, children: modalStore.message }) })] }) }) }) }));
  });
  var Warn$1 = React.memo(Warn);

  const Workspace = mobxReactLite.observer((props) => {
      const { menuStore } = useStore();
      const editors = React.useMemo(() => {
          const result = [];
          const mapData = mapProps.get(menuStore.selectedMap);
          mapData.forms.forEach((form, index) => {
              result.push(form);
          });
          return result;
      }, [menuStore.selectedMap]);
      return (jsxRuntime.exports.jsx(Flex, { style: { overflow: 'auto' }, children: jsxRuntime.exports.jsx(Flex, { style: { flexFlow: 'row wrap', alignItems: 'center', justifyContent: 'space-around' }, children: editors }) }));
  });
  var Workspace$1 = React.memo(Workspace);

  const App = mobxReactLite.observer(() => {
      const { modalStore } = useStore();
      return (jsxRuntime.exports.jsxs("div", { className: "App", children: [jsxRuntime.exports.jsx(Menu$1, {}), jsxRuntime.exports.jsx(Workspace$1, {}), jsxRuntime.exports.jsx(Info$1, {}), modalStore.current == Modals.HELP && jsxRuntime.exports.jsx(Help$1, {}), modalStore.current == Modals.WARN && jsxRuntime.exports.jsx(Warn$1, {})] }));
  });
  const root = createRoot(document.getElementById('root'));
  root.render(jsxRuntime.exports.jsx(React.StrictMode, { children: jsxRuntime.exports.jsx(Slideshow$1, { type: 'random', children: jsxRuntime.exports.jsx(StoreProvider, { children: jsxRuntime.exports.jsx(App, {}) }) }) }));

})(React, mobxReactLite, ReactDOM, mobx, MaterialUI, saveAs);
