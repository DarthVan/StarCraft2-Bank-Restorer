import{a as U,b as d,R as V,o as W,u as Z,r as c,m as L,M as T,e as P,d as _,c as z,j as a,C as E,f as Q,L as B,I as X,E as q}from"./index-4d524e0e.js";import{s as t,a as i,B as Y}from"./index-a3010d25.js";/*!
 * sc2-bank-generator v.1.0.8
 *
 * Compiled from:
 *
 * sc2-bank-generator/src/components/maps/mineralz-evolution/store.ts
 * sc2-bank-generator/src/components/maps/mineralz-evolution/functions.ts
 * sc2-bank-generator/src/components/maps/mineralz-evolution/index.tsx
 *
 * Сompiled on Thu, 24 Aug 2023 10:42:33 UTC
 */class J{constructor(){this.init(),U(this)}setFields(e){this.params=e?[...e]:[]}updateAt(e,n,m){if(m){this.params[e].value=n;return}const u=[...this.params];u[e].value=n,this.params=u}reset(){this.init()}init(){this.params=[{type:"number",value:d(1,40),description:"Prestige",min:0,max:40,tip:"0 - 40"},{type:"number",value:d(100,200),description:"Level",min:1,max:200,tip:"1 - 200"},{type:"number",value:d(50,100),description:"Wins",min:0,max:999999},{type:"number",value:35,description:"Nights",min:0,max:35,tip:"0 - 35"},{type:"number",value:35,description:"Elite",min:0,max:35,tip:"0 - 35"},{type:"number",value:35,description:"Nightmare",min:0,max:35,tip:"0 - 35"},{type:"number",value:35,description:"Hell",min:0,max:35,tip:"0 - 35"},{type:"number",value:35,description:"Impossible",min:0,max:35,tip:"0 - 35"},{type:"number",value:d(25,125),description:"Wall",min:0,max:999999},{type:"number",value:d(25,125),description:"Cannons",min:0,max:999999},{type:"number",value:d(25,125),description:"Healer",min:0,max:999999},{type:"number",value:d(25,125),description:"Generator",min:0,max:999999},{type:"number",value:d(25,125),description:"Economy",min:0,max:999999}]}}const r=new J;class ${generateXML(e){const n=58.7077197265625,m=12,u=22,S=2,y=26,I=18,f=40,p=662,v=1,l=parseInt(e.info.playerID.substring(7)),g=r.params[0].value;if(g>0){e.addKey("PHR","INT",g,"Sec");let K=0;for(let F=0;F<g;F++)K=(K+39)*1.2;e.addKey("PR","FIXED",K,"Sec")}else e.removeKey("PR","Sec"),e.removeKey("PHR","Sec");const s=r.params[1].value;e.addKey("NIVO","FIXED",s,"Sec"),e.addKey("NIVEXP","FIXED",s*1224,"Sec");const o=r.params[2].value;e.addKey("WINS","FIXED",o,"Sec");const h=r.params[3].value;h>0?(e.addKey("NIGHTMNHD","FIXED",h,"Sec"),e.addKey("KILLED","FIXED",h*4788,"Sec"),h>=35?e.addKey("ZUHIB","FIXED",121186,"Sec"):e.removeKey("ZUHIB","Sec")):(e.removeKey("NIGHTMNHD","Sec"),e.removeKey("KILLED","Sec"),e.removeKey("ZUHIB","Sec"));const H=r.params[4].value;H>0?(e.addKey("NIGHTELITE","FIXED",H,"Sec"),H>=35&&e.addKey("HEAL","FIXED",21634,"Sec")):(e.removeKey("NIGHTELITE","Sec"),e.removeKey("HEAL","Sec"));const D=r.params[5].value;D>0?(e.addKey("NIGHTNMAR","FIXED",D,"Sec"),e.addKey("XPNB","FIXED",D*1655,"Sec"),D>=35&&e.addKey("XPNQ","FIXED",59120,"Sec")):(e.removeKey("NIGHTNMAR","Sec"),e.removeKey("XPNB","Sec"),e.removeKey("XPNQ","Sec"));const C=r.params[6].value;C>0?(e.addKey("HL","FIXED",C,"Sec"),e.addKey("HAL","FIXED",C*1631,"Sec"),C>=35&&e.addKey("HLO","FIXED",25265,"Sec")):(e.removeKey("HL","Sec"),e.removeKey("HAL","Sec"),e.removeKey("HLO","Sec"));const x=r.params[7].value;if(x>0){e.addKey("ims","INT",x,"Sec");const K=Math.abs(t(x*10,Math.abs(t(Math.round(t(t(n,i(5))*t(86,i(8))*t(m,i(3))*t(u,i(2))*t(S,i(7))*t(y,i(3))*t(I,i(6))*t(f,i(7))*t(p,i(5))*t(v,i(3))*t(l,65537),i(3))*1e4)/1e3,10))));if(e.addKey("im","FIXED",K+x*10,"Sec"),x>=35){const F=Math.round(t(t(n,i(3))*t(86,i(2))*t(m,i(7))*t(u,i(8))*t(S,i(17))*t(y,i(3))*t(I,i(2))*t(f,i(5))*t(p,i(11))*t(v,i(5))*t(l,65537),i(10))*1e4)/1e3;e.addKey("is","FIXED",K/F*3.4,"Sec");const G=Math.round(t(t(n,i(2))*t(86,i(3))*t(m,i(6))*t(u,i(5))*t(S,i(7))*t(y,i(3))*t(I,i(2))*t(f,i(5))*t(p,i(11))*t(v,i(5))*t(l,65537),i(10))*1e4)/1e3;e.addKey("imval","FIXED",G,"Sec")}else e.removeKey("imval","Sec")}else e.removeKey("HL","Sec"),e.removeKey("HAL","Sec"),e.removeKey("HLO","Sec"),e.removeKey("imval","Sec");const A=r.params[8].value;A>0?e.addKey("a","INT",A*4,"Sec"):e.removeKey("a","Sec");const j=r.params[9].value;j>0?e.addKey("e","INT",j*7,"Sec"):e.removeKey("e","Sec");const R=r.params[10].value;R>0?e.addKey("i","INT",R*9,"Sec"):e.removeKey("i","Sec");const w=r.params[11].value;w>0?e.addKey("f","INT",w*5,"Sec"):e.removeKey("f","Sec");const O=r.params[12].value;return O>0?e.addKey("o","INT",O*13,"Sec"):e.removeKey("o","Sec"),e.addKey("EASY","FIXED",35,"Sec"),e.addKey("VERSION","FIXED",6,"Sec"),e.updateSignature(),e.getAsString()}parse(e,n){return e.parse(n),e.sections.size!=1||e.sections.get("Sec")==null?(console.error("Wrong bank file!"),null):[{type:"number",value:this.getKey(e,"PHR"),description:"Prestige",min:0,max:40,tip:"0 - 40"},{type:"number",value:this.getKey(e,"NIVO"),description:"Level",min:1,max:200,tip:"1 - 200"},{type:"number",value:this.getKey(e,"WINS"),description:"Wins",min:0,max:999999},{type:"number",value:this.getKey(e,"NIGHTMNHD"),description:"Nights",min:0,max:35,tip:"0 - 35"},{type:"number",value:this.getKey(e,"NIGHTELITE"),description:"Elite",min:0,max:35,tip:"0 - 35"},{type:"number",value:this.getKey(e,"NIGHTNMAR"),description:"Nightmare",min:0,max:35,tip:"0 - 35"},{type:"number",value:this.getKey(e,"HL"),description:"Hell",min:0,max:35,tip:"0 - 35"},{type:"number",value:this.getKey(e,"ims"),description:"Impossible",min:0,max:35,tip:"0 - 35"},{type:"number",value:this.getKey(e,"a")/4,description:"Wall",min:0,max:999999},{type:"number",value:this.getKey(e,"e")/7,description:"Cannons",min:0,max:999999},{type:"number",value:this.getKey(e,"i")/9,description:"Healer",min:0,max:999999},{type:"number",value:this.getKey(e,"f")/5,description:"Generator",min:0,max:999999},{type:"number",value:this.getKey(e,"o")/13,description:"Economy",min:0,max:999999}]}getKey(e,n){const m=e.getKey(n,"Sec");return m?parseInt(m.value):0}}const M=new $,b=W(N=>{const{accountStore:e,menuStore:n,mapStore:m}=Z(),[u,S]=c.useState(N.bankName),[y,I]=c.useState(L.get(T.MINERALZ_EVOLUTION).authorID),f=L.get(T.MINERALZ_EVOLUTION).title,p=c.useMemo(()=>new Y(u,y,n.playerID,"1"),[e.current,n.playerID,u,y]),v=()=>{m.setMapData(e.current,f,r.params)};c.useEffect(()=>{var o;const s=(o=m.list[e.current])==null?void 0:o[f];s?r.setFields(s):setTimeout(l.onResetClick)},[e.current]);const l={onBankNameChange:c.useCallback(s=>{S(s)},[]),onAuthorIdChange:c.useCallback(s=>{I(s)},[]),onFileDrop:c.useCallback((s,o)=>{const h=M.parse(p,o);h&&(P.flushSync(()=>r.setFields()),r.setFields(h))},[]),onDownloadClick:c.useCallback(()=>{_(M.generateXML(p),u+".SC2Bank",!0),n.autoSave||v()},[p]),onCopyCodeClick:c.useCallback(()=>{z(M.generateXML(p),!0),n.autoSave||v()},[p]),onResetClick:c.useCallback(()=>{S(N.bankName),I(L.get(T.MINERALZ_EVOLUTION).authorID),P.flushSync(()=>r.setFields()),r.reset()},[]),onFieldChange:c.useCallback((s,o)=>{r.updateAt(o,parseInt(s),!0),n.autoSave&&v()},[])},g=c.useMemo(()=>a.jsxs(E,{style:{flexDirection:"column"},children:[a.jsxs(Q,{style:{width:"500px"},children:["Note: the community of this map closely monitors the statistics of the players and their skills.",a.jsx("br",{}),a.jsx("br",{}),a.jsx("b",{children:"Use the hack wisely, be prepared for a skill test!"}),a.jsx("br",{})]}),a.jsx(B,{children:"Main stats:"}),a.jsx(E,{style:{flexDirection:"row",border:"1px solid #ffffff40",padding:"10px",justifyContent:"space-around"},alignInputs:!0,children:r.params.map((s,o)=>o<3?a.jsx(X,{index:o,type:"number",style:{width:"50px"},label:s.description+":",onChange:l.onFieldChange,min:s.min.toString(),max:s.max.toString(),value:s.value.toString(),tip:s.tip?s.tip:null},o):null)}),a.jsx(B,{children:"Survived nights and roles:"}),a.jsxs(E,{style:{flexDirection:"row"},children:[a.jsx(E,{style:{flexDirection:"column",border:"1px solid #ffffff40",padding:"10px"},alignInputs:!0,children:r.params.map((s,o)=>o>=3&&o<8?a.jsx(X,{index:o,type:"number",style:{width:"30px"},label:s.description+":",onChange:l.onFieldChange,min:s.min.toString(),max:s.max.toString(),value:s.value.toString(),tip:s.tip?s.tip:null},o):null)}),a.jsx(E,{style:{flexDirection:"column",border:"1px solid #ffffff40",padding:"10px"},alignInputs:!0,children:r.params.map((s,o)=>o>=8?a.jsx(X,{index:o,type:"number",style:{width:"50px"},label:s.description+":",onChange:l.onFieldChange,min:s.min.toString(),max:s.max.toString(),value:s.value.toString(),tip:s.tip?s.tip:null},o):null)})]})]}),[r.params]);return a.jsx(q,{bankName:u,authorID:y,onBankNameChange:l.onBankNameChange,onAuthorIdChange:l.onAuthorIdChange,onFileDrop:l.onFileDrop,onDownload:l.onDownloadClick,onCopy:l.onCopyCodeClick,onReset:l.onResetClick,children:g})}),te=V.memo(b);export{te as default};
