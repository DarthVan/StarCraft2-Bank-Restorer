/*!
 * sc2-bank-generator - v1.0.0
 * Compiled Thu, 10 Nov 2022 01:41:07 UTC
 */
(function (React, mobxReactLite, require$$0, mobx, filesaver) {
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
      Modals[Modals["CONFIRM"] = 2] = "CONFIRM";
  })(Modals || (Modals = {}));
  class ModalStore extends BasicStore {
      setModal(id) {
          this.current = id;
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
              modalStore.setModal(Modals.NONE);
          }, [])
      };
      return (jsxRuntime.exports.jsx(Flex, { style: { flexFlow: 'row wrap', width: '100vw', height: '100vh', zIndex: '9999', position: 'fixed', left: '0', top: '0', background: '#000000AA', alignItems: 'center', justifyContent: 'center', padding: '5px' }, children: jsxRuntime.exports.jsx(GlassWrapper$1, { border: true, children: jsxRuntime.exports.jsx(Flex, { style: { overflow: 'auto', width: 'calc(100vw - 40px)', height: 'calc(100vh - 40px)', maxWidth: '650px', maxHeight: '850px' }, children: jsxRuntime.exports.jsxs(Flex, { style: { flexDirection: 'column', padding: '10px', minWidth: '100%', minHeight: 'max-content' }, children: [jsxRuntime.exports.jsxs(Flex, { style: { flexDirection: 'row', justifyContent: 'space-between', height: 'min-content', minWidth: 'max-content' }, children: [jsxRuntime.exports.jsx(Label$1, { style: { fontSize: '20px' }, children: "What is this?\u00BF" }), jsxRuntime.exports.jsx(Button$1, { onClick: callbacks.onCloseClick, children: "Close" })] }), jsxRuntime.exports.jsx(Line$1, { style: { margin: '10px 0 0 0' } }), jsxRuntime.exports.jsxs(Flex, { style: { flexDirection: 'column', minWidth: '100%' }, children: [jsxRuntime.exports.jsxs(Text$1, { children: ["Hi!", jsxRuntime.exports.jsx("br", {}), jsxRuntime.exports.jsx("br", {}), "Reinstalled Windows? Playing Starcraft2 from another PC? Lost your save?", jsxRuntime.exports.jsx("br", {}), "This service can restore some top-secured SC2 banks (Starcode + signature + anticheats).", jsxRuntime.exports.jsx("br", {}), jsxRuntime.exports.jsx("br", {})] }), jsxRuntime.exports.jsx(Label$1, { children: "What bank can i restore here?" }), jsxRuntime.exports.jsxs(Text$1, { children: ["All available cards can be selected in the menu selector. If your card is not there, then you can't :(", jsxRuntime.exports.jsx("br", {}), jsxRuntime.exports.jsx("br", {})] }), jsxRuntime.exports.jsx(Label$1, { children: "I found my map, how to restore the bank?" }), jsxRuntime.exports.jsxs(Text$1, { children: ["First make sure you have played this map and that the bank file folder exists.", jsxRuntime.exports.jsx("b", { children: "Dont forget to make backup of your original bank file!!11" }), jsxRuntime.exports.jsx("br", {}), "Some banks are verified with a signature that requires the player id and map author id to generate. They are in the path to the file:"] }), jsxRuntime.exports.jsx("img", { src: "./assets/help.png", alt: "help.png", width: 629, height: 191 }), jsxRuntime.exports.jsxs(Text$1, { children: ["Usually the file name and author id are entered automatically, you don't need to change them unless you have to.", jsxRuntime.exports.jsx("br", {}), "Just set other bank's options or drop your bank life to the rect \"Drop file here\" to read and edit it.", jsxRuntime.exports.jsx("br", {}), "And pick 'Download bank' or 'Copy code'.", jsxRuntime.exports.jsx("br", {}), jsxRuntime.exports.jsx("br", {})] }), jsxRuntime.exports.jsx(Label$1, { children: "Found a bug or wanna add new map?" }), jsxRuntime.exports.jsxs(Text$1, { children: ["Post issues or pull requests ", jsxRuntime.exports.jsx("a", { href: "https://github.com/DarthVan/StarCraft2-Bank-Restorer", target: '_blank', children: "here" }), jsxRuntime.exports.jsx("br", {}), jsxRuntime.exports.jsx("br", {}), "gg hf!", jsxRuntime.exports.jsx("br", {}), jsxRuntime.exports.jsx("br", {})] })] })] }) }) }) }));
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
          props.onChange(value, props.index);
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
              files[0].text().then((value) => { props.onFileDrop?.(value); });
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

  const Checkbox = (props) => {
      const id = React.useMemo(() => {
          return props.label ? props.label + Math.random() * 100000 : null;
      }, [props.label]);
      return (jsxRuntime.exports.jsxs("div", { className: 'Checkbox', children: [props.label ? jsxRuntime.exports.jsx(Label$1, { for: id, children: props.label }) : null, jsxRuntime.exports.jsx("input", { className: 'Checkbox-rect', style: props.style, type: "checkbox", id: id, checked: props.value, onChange: e => props.onChange(e.target.checked, props.index) })] }));
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
      return (jsxRuntime.exports.jsxs("div", { className: 'Select', children: [props.label ? jsxRuntime.exports.jsx(Label$1, { for: id, children: props.label }) : null, jsxRuntime.exports.jsx("select", { id: id, className: 'Select-box', style: props.style, placeholder: props.placeholder, onChange: (e) => props.onChange(e.target.value, props.index), children: options })] }));
  };
  var Select$1 = React.memo(Select);

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
      constructor(name, authorAccount, playerAccount) {
          this._name = name;
          this._authorAccount = authorAccount;
          this._playerAccount = playerAccount;
      }
      getAuthorNumber() {
          return parseInt(this._authorAccount.split('-')[3]);
      }
      getPlayerNumber() {
          return parseInt(this._playerAccount.split('-')[3]);
      }
      get name() {
          return this._name;
      }
      get authorAccount() {
          return this._authorAccount;
      }
      get playerAccount() {
          return this._playerAccount;
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
      constructor(name, authorAccount, playerAccount, version) {
          this._info = new BankInfo(name, authorAccount, playerAccount);
          this._version = version;
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
          this._signature = xml.getElementsByTagName('Signature')[0].getAttribute('value');
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
          s += '\t<Signature value="' + this._signature + '"/>\n';
          s += '</Bank>';
          return s;
      }
      updateSignature() {
          let s = '';
          s += this._info.authorAccount;
          s += this._info.playerAccount;
          s += this._info.name;
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

  class StarCode {
      constructor() {
          this.ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!$%/()=?,.-;:_^#+* @{[]}|~`';
          this.ZERO_CODE = 48;
          this.init();
      }
      get currentCode() {
          return this._currentCode;
      }
      set currentCode(value) {
          this._currentCode = value;
      }
      encrypt(s, key) {
          let result = '';
          const length = s.length;
          for (let i = 0; i < length; i++) {
              const key_index = i % key.length;
              result += this.shift(s.charAt(i), key.charAt(key_index), true);
          }
          return result;
      }
      decrypt(s, key) {
          let result = '';
          const length = s.length;
          for (let i = 0; i < length; i++) {
              const key_index = i % key.length;
              result += this.shift(s.charAt(i), key.charAt(key_index), false);
          }
          return result;
      }
      compress(s) {
          if (s == '')
              return s;
          const base = this.ALPHABET.length.toString();
          let result = '';
          while (s != '0') {
              const remainder = this.modulo(s, base);
              result = this.ALPHABET.charAt(parseInt(remainder)) + result;
              s = this.divide(s, base);
          }
          return result;
      }
      decompress(s) {
          const base = this.ALPHABET.length.toString();
          let power = '1';
          let result = '0';
          let i = s.length - 1;
          while (i >= 0) {
              const index = this._map.get(s.charAt(i));
              const digit_value = this.multiply(power, index.toString());
              result = this.add(result, digit_value);
              power = this.multiply(power, base);
              i--;
          }
          return result;
      }
      getInt(maxValue) {
          const value = this.decodenumber(this._currentCode, maxValue + 1);
          this._currentCode = this.decodestring(this._currentCode, maxValue + 1);
          return value;
      }
      setInt(value, maxValue) {
          if (value <= maxValue)
              this._currentCode = this.encodenumber(this._currentCode, value, maxValue + 1);
      }
      addHash(s, level) {
          return this.hash(s, level) + s;
      }
      removeHash(s, level) {
          return s.substring(level, level + s.length);
      }
      validate(s, level) {
          return this.hash(s.substring(level, level + s.length), level) == s.substring(0, level);
      }
      reset() {
          this._currentCode = '0';
      }
      compressAndEncrypt(key) {
          return this._currentCode = this.encrypt(this.compress(this._currentCode), key);
      }
      decryptAndDecompress(s, key) {
          return this._currentCode = this.decompress(this.decrypt(s, key));
      }
      init() {
          this._currentCode = '0';
          this._map = new Map();
          const length = this.ALPHABET.length;
          for (let i = 0; i < length; i++)
              this._map.set(this.ALPHABET.charAt(i), i);
      }
      encodenumber(s, value, maxValue) {
          return this.add(this.multiply(s, maxValue.toString()), value.toString());
      }
      decodenumber(s, max) {
          return parseInt(this.modulo(s, max.toString()));
      }
      decodestring(s, max) {
          return this.divide(s, max.toString());
      }
      add(a, b) {
          let len_a = a.length;
          let len_b = b.length;
          if (len_a < len_b) {
              a = this.fill(a, len_b);
              len_a = len_b;
          }
          else {
              b = this.fill(b, len_a);
              len_b = len_a;
          }
          let carry = 0;
          let result = this.fillWithSymbol('0', len_a);
          let i = len_a - 1;
          while (i >= 0) {
              const digit_a = a.charCodeAt(i) - this.ZERO_CODE;
              const digit_b = b.charCodeAt(i) - this.ZERO_CODE;
              const sum = digit_a + digit_b + carry;
              const digit_result = sum % 10;
              carry = Math.floor(sum / 10);
              result = this.replaceCharAt(result, i, String.fromCharCode(this.ZERO_CODE + digit_result));
              i--;
          }
          if (carry > 0)
              result = String.fromCharCode(this.ZERO_CODE + carry) + result;
          return result;
      }
      multiply(a, b) {
          const len_a = a.length;
          const number_b = parseFloat(b);
          if (number_b == 0)
              return '0';
          let carry = 0;
          let result = '';
          let i = len_a - 1;
          while (i >= 0) {
              const digit_a = a.charCodeAt(i) - this.ZERO_CODE;
              const tmp = digit_a * number_b + carry;
              result = String.fromCharCode(this.ZERO_CODE + (tmp % 10)) + result;
              carry = Math.floor(tmp / 10);
              i--;
          }
          if (carry > 0)
              result = carry.toString() + result;
          return result;
      }
      divide(a, b) {
          const len_a = a.length;
          const number_b = parseFloat(b);
          if (number_b == 0)
              return '0';
          let carry = 0;
          let result = '';
          for (let i = 0; i < len_a; i++) {
              const digit_a = a.charCodeAt(i) - this.ZERO_CODE;
              const dividend = digit_a + 10 * carry;
              const quotient = Math.floor(dividend / number_b);
              result += quotient.toString();
              carry = dividend % number_b;
          }
          return this.cut(result);
      }
      modulo(a, b) {
          const len_a = a.length;
          const number_b = parseFloat(b);
          if (number_b == 0)
              return '0';
          let carry = 0;
          for (let i = 0; i < len_a; i++) {
              const digit_a = a.charCodeAt(i) - this.ZERO_CODE;
              const dividend = digit_a + 10 * carry;
              carry = dividend % number_b;
          }
          return carry.toString();
      }
      cut(s) {
          let start = 0;
          while ((start + 1 < s.length) && (s.charAt(start) == '0'))
              start++;
          return s.substring(start);
      }
      power(s, power) {
          if (power == 0)
              return '1';
          let result = s;
          while (power > 1) {
              result = this.multiply(result, s);
              power--;
          }
          return result;
      }
      shift(a, b, forward = true) {
          const index1 = this._map.get(a);
          const index2 = this._map.get(b);
          let result_index;
          if (forward)
              result_index = (index1 + index2) % this.ALPHABET.length;
          else
              result_index = (index1 - index2 + this.ALPHABET.length) % this.ALPHABET.length;
          return this.ALPHABET.charAt(result_index);
      }
      fill(s, i) {
          if (s.length >= i)
              return s;
          let n = i - s.length;
          return this.fillWithSymbol('0', n) + s;
      }
      fillWithSymbol(s, n) {
          let result = '';
          for (let i = 0; i < n; i++)
              result += s;
          return result;
      }
      replaceCharAt(s, index, value) {
          const before = s.substring(0, index);
          const after = s.substring(index + 1);
          return before + value + after;
      }
      hash(s, length) {
          let i = s.length - 1;
          let out = '0';
          while (i >= 0) {
              const index = this._map.get(s.charAt(i));
              out = this.add(out, (index * (i + 1)).toString());
              i--;
          }
          return this.fill(this.compress(this.modulo(out, Math.pow(this.ALPHABET.length, length).toString())), length);
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
          starCode.decryptAndDecompress(starCode.currentCode, key);
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
      const { menuStore, mapStore } = useStore();
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
      const camera = new RR4Camera;
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
      }, [mapStore, units, slots, info, camera]);
      const xmlBank = React.useMemo(() => {
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
          onFileDrop: React.useCallback((value) => {
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
                      starcode.currentCode = bsu.get(k).value;
                      units[i].read(starcode, RR4_KEY);
                  }
                  else
                      units[i].queue[0].update(0);
              }
              starcode.currentCode = bsu.get(key.info).value;
              slots.read(starcode, RR4_KEY);
              const bsa = bank.sections.get(section.account);
              starcode.currentCode = bsa.get(key.info).value;
              info.read(starcode, RR4_KEY);
              starcode.currentCode = bsa.get(key.camera).value;
              camera.read(starcode, RR4_KEY);
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
                              return (jsxRuntime.exports.jsx(Input$1, { label: param.description + ':', index: index, type: 'number', min: '1', style: { width: '45px' }, onChange: callbacks.onStatChange, max: param.max.toString(), value: param.current.toString() }));
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

  class ZCModule extends SCModule {
      init() {
          super.init();
          this._queue = [
              new SCParam(666, 1000, 'Waves'),
              new SCParam(66666666, 99000000, 'Kills'),
              new SCParam(666, 100000, 'Deaths'),
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
      const starCodeKey = 'OnFbXRyxYzPuv7of(v5v7[zdvUiDzXO]gVb9FVI9b>M>l}Gt6L';
      const bank = new Bank(bankName, authorID, menuStore.playerID, '1');
      const zcModule = new ZCModule();
      React.useMemo(() => {
          const storeParams = mapStore.list[mapTitle];
          if (!storeParams)
              return;
          storeParams.forEach((value, i) => {
              zcModule.queue[i].update(value._current);
          });
      }, [mapStore, zcModule]);
      const xmlBank = React.useMemo(() => {
          const sID = '23EGWEG234AG4';
          const kID = 'AWEO322AOIGWE3wqogej23';
          if (!bank.sections.has(sID))
              bank.sections.set(sID, new BankMap(sID));
          if (!bank.sections.get(sID).has(kID))
              bank.sections.get(sID).set(kID, new BankKey(kID, BankKeyType.STRING, ''));
          bank.sections.get(sID).get(kID).update(zcModule.write(starcode, starCodeKey));
          bank.updateSignature();
          console.log("bank const updated:", bank.signature);
          return bank.getAsString();
      }, [zcModule]);
      const callbacks = {
          onBankNameChange: React.useCallback((value) => {
              setBankName(value);
          }, []),
          onAuthorIdChange: React.useCallback((value) => {
              setAuthorID(value);
          }, []),
          onFileDrop: React.useCallback((value) => {
              bank.parse(value);
              if (bank.sections.size != 1 || bank.sections.get('23EGWEG234AG4') == null)
                  throw new Error('wrong bank file!');
              starcode.reset();
              starcode.currentCode = bank.sections.get('23EGWEG234AG4').get('AWEO322AOIGWE3wqogej23').value;
              zcModule.read(starcode, starCodeKey);
              mapStore.setMapData(mapTitle, [...zcModule.queue]);
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
              zcModule.reset();
              mapStore.setMapData(mapTitle, [...zcModule.queue]);
          }, []),
          onFieldChange: React.useCallback((value, index) => {
              zcModule.queue[index].update(parseInt(value));
              mapStore.setMapData(mapTitle, [...zcModule.queue]);
          }, [])
      };
      return (jsxRuntime.exports.jsx(Editor$1, { bankName: bankName, authorID: authorID, onBankNameChange: callbacks.onBankNameChange, onAuthorIdChange: callbacks.onAuthorIdChange, onFileDrop: callbacks.onFileDrop, onDownload: callbacks.onDownloadClick, onCopy: callbacks.onCopyCodeClick, onReset: callbacks.onResetClick, children: jsxRuntime.exports.jsx(Flex, { style: { flexDirection: 'column' }, alignInputs: true, children: zcModule.queue.map((param, index) => {
                  return (jsxRuntime.exports.jsx(Input$1, { label: param.description + ':', index: index, type: 'number', min: '0', onChange: callbacks.onFieldChange, max: param.max.toString(), value: param.current.toString() }));
              }) }) }));
  });
  var ZombieCity = React.memo(ZombieCityForm);

  var Maps;
  (function (Maps) {
      Maps[Maps["RUNLING_RUN_4"] = 0] = "RUNLING_RUN_4";
      Maps[Maps["RUNLING_RUN_8"] = 1] = "RUNLING_RUN_8";
      Maps[Maps["ZOMBIE_CITY"] = 2] = "ZOMBIE_CITY";
      Maps[Maps["STAR_CODE_LAB"] = 3] = "STAR_CODE_LAB";
  })(Maps || (Maps = {}));
  const mapProps = new Map([
      [Maps.RUNLING_RUN_4, {
              title: 'Runling Run 4',
              authorID: '2-S2-1-3564862',
              forms: [jsxRuntime.exports.jsx(RunlingRun4, { bankName: 'RunlingRun004' })]
          }],
      [Maps.RUNLING_RUN_8, {
              title: 'Runling Run 8',
              authorID: '???',
              forms: [jsxRuntime.exports.jsx(Editor$1, {}), jsxRuntime.exports.jsx(Editor$1, {})]
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
              modalStore.setModal(Modals.HELP);
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
      return (jsxRuntime.exports.jsxs(Slideshow$1, { type: 'random', children: [jsxRuntime.exports.jsxs("div", { className: "App", children: [jsxRuntime.exports.jsx(Menu$1, {}), jsxRuntime.exports.jsx(Workspace$1, {}), jsxRuntime.exports.jsx(Info$1, {})] }), modalStore.current == Modals.HELP && jsxRuntime.exports.jsx(Help$1, {})] }));
  });
  const root = createRoot(document.getElementById('root'));
  root.render(jsxRuntime.exports.jsx(React.StrictMode, { children: jsxRuntime.exports.jsx(StoreProvider, { children: jsxRuntime.exports.jsx(App, {}) }) }));

})(React, mobxReactLite, ReactDOM, mobx, saveAs);
