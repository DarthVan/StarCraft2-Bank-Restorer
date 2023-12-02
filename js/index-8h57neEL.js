/*!
 * sc2-bank-generator v.1.1.0
 *
 * Compiled from:
 *
 * sc2-bank-generator/src/core/sc2/index.ts
 * sc2-bank-generator/src/utils/sha1.ts
 * sc2-bank-generator/src/core/bank/bank.ts
 * sc2-bank-generator/src/core/bank/bank-info.ts
 * sc2-bank-generator/src/core/bank/bank-key.ts
 * sc2-bank-generator/src/core/bank/bank-map.ts
 * sc2-bank-generator/src/core/bank/index.ts
 *
 * Сompiled on Sat, 02 Dec 2023 21:05:24 UTC
 */function O(r){return a(Math.round(a(r)))}function R(r,t){return a(Math.pow(a(r),a(t)))}function j(r){return a(Math.pow(a(r%1048576),.5))}function k(...r){let t=a(r[0]);if(r.length==1)return t;for(let e=1;e<r.length;e++)t=a(t*a(r[e]));return t}function q(r,t){return a(a(r)/a(t))}function H(r,t){return a(a(r)%a(t))}function F(r,t=4){let e=1;for(;t-- >0;)e*=10;return(Math.floor(r*e+.1)/e).toString()}function a(r){return V(r,4096)}function V(r,t=4096){return Math.floor(r*t)/t}const T=Math.pow(2,24),U=Math.pow(2,32);function w(r){let t="";for(let e=7;e>=0;--e){const s=r>>>(e<<2)&15;t+=s.toString(16)}return t}function B(r,t){return r<<t|r>>>32-t}class X{constructor(t){this.bytes=new Uint8Array(t<<2)}get(t){return t<<=2,this.bytes[t]*T+(this.bytes[t+1]<<16|this.bytes[t+2]<<8|this.bytes[t+3])}set(t,e){const s=Math.floor(e/T),n=e-s*T;t<<=2,this.bytes[t]=s,this.bytes[t+1]=n>>16,this.bytes[t+2]=n>>8&255,this.bytes[t+3]=n&255}}function G(r){r=r.replace(/[\u0080-\u07ff]/g,function(s){const n=s.charCodeAt(0);return String.fromCharCode(192|n>>6,128|n&63)}),r=r.replace(/[\u0080-\uffff]/g,function(s){const n=s.charCodeAt(0);return String.fromCharCode(224|n>>12,128|n>>6&63,128|n&63)});const t=r.length,e=new Uint8Array(t);for(let s=0;s<t;++s)e[s]=r.charCodeAt(s);return e.buffer}function K(r){let t;r instanceof ArrayBuffer?t=r:t=G(String(r));const e=t.byteLength,s=e<<3,n=s+65,m=Math.ceil(n/512)<<9>>>3>>>2,f=new X(m),p=f.bytes,c=new Uint32Array(80),A=new Uint8Array(t);let d=1732584193,N=4023233417,v=2562383102,S=271733878,M=3285377520,h,i;for(h=0;h<e;++h)p[h]=A[h];for(p[e]=128,f.set(m-2,Math.floor(s/U)),f.set(m-1,s&4294967295),h=0;h<m;h+=16){for(i=0;i<16;++i)c[i]=f.get(h+i);for(;i<80;++i)c[i]=B(c[i-3]^c[i-8]^c[i-14]^c[i-16],1);let C=d,u=N,g=v,_=S,D=M,b,y,x;for(i=0;i<80;++i)i<20?(b=u&g|~u&_,y=1518500249):i<40?(b=u^g^_,y=1859775393):i<60?(b=u&g^u&_^g&_,y=2400959708):(b=u^g^_,y=3395469782),x=B(C,5)+b+D+y+c[i]&4294967295,D=_,_=g,g=B(u,30),u=C,C=x;d=d+C&4294967295,N=N+u&4294967295,v=v+g&4294967295,S=S+_&4294967295,M=M+D&4294967295}return w(d)+w(N)+w(v)+w(S)+w(M)}class W{constructor(t,e,s,n){this._info=new L(t,e,s),this._version=n||"1",this.init()}parse(t){let e=null;const s=new DOMParser;try{if(typeof t=="string")e=s.parseFromString(t,"text/xml").firstElementChild;else throw new Error("Received data is not valid xml!")}catch{throw new Error("Received data is not valid xml!")}if(e==null)return;this._version=e.getAttribute("version"),e.firstChild.nodeName=="Bank"&&(e=e.firstElementChild),this._sections.clear();const n=e.getElementsByTagName("Section");for(let o=0;o<n.length;o++){const I=new E(n[o].getAttribute("name")),m=n[o].getElementsByTagName("Key");for(let f=0;f<m.length;f++){const p=m[f],c=p.getAttribute("name"),A=p.firstElementChild.attributes.item(0).name,d=p.firstElementChild.getAttribute(A);I.set(c,new P(c,A,d))}this._sections.set(I.name,I)}this._signature=null;try{this._signature=e.getElementsByTagName("Signature")[0].getAttribute("value")}catch{this._signature=null}}addSection(t){return this._sections.has(t)||this._sections.set(t,new E(t)),this._sections.get(t)}addKey(t,e,s,n){const o=this.addSection(n);switch(typeof s){case"boolean":s=s?"1":"0";break;case"number":s=s.toString();break;case"string":break;case"object":e=="POINT"&&(s=F(s.x)+","+F(s.y));break}return o.has(t)?o.get(t).update(s):o.set(t,new P(t,l[e],s)),o.get(t)}getKey(t,e){return this._sections.has(e)?this._sections.get(e).get(t):null}removeSection(t){return this._sections.delete(t)}removeKey(t,e){return this._sections.has(e)?this._sections.get(e).delete(t):!1}sort(){this._sections.forEach(t=>{this._sections.set(t.name,t.sort(),!0)}),this._sections=this._sections.sort()}getAsString(){let t=`<?xml version="1.0" encoding="utf-8"?>
<Bank version="`+this._version+`">
`;return this._sections.forEach(e=>{t+='	<Section name="'+e.name+`">
`,e.forEach(s=>{t+='		<Key name="'+s.name+`">
`,t+="			<Value "+s.type+'="'+s.stringValue+`"/>
`,t+=`		</Key>
`}),t+=`	</Section>
`}),this._signature&&(t+='	<Signature value="'+this._signature+`"/>
`),t+="</Bank>",t}updateSignature(){let t="";return t+=this._info.authorID,t+=this._info.playerID,t+=this._info.bankName,this._sections.forEach(e=>{t+=e.name,e.forEach(s=>{t+=s.name,t+="Value",t+=s.type,s.type!=l.TEXT&&(t+=s.stringValue)})}),this._signature=K(t).toUpperCase()}async openFile(t,e){const s=new XMLHttpRequest;s.onreadystatechange=()=>{s.readyState==4&&s.status==200&&(this.parse.call(this,s.response),e&&e())},s.open("GET",t,!0),s.send()}get info(){return this._info}get sections(){return this._sections}get signature(){return this._signature}get version(){return this._version}init(){this._sections=new E("Sections")}}class L{constructor(t,e,s){this._bankName=t,this._authorID=e,this._playerID=s}getAuthorNumber(){return parseInt(this._authorID.split("-")[3])}getPlayerNumber(){return parseInt(this._playerID.split("-")[3])}get bankName(){return this._bankName}get authorID(){return this._authorID}get playerID(){return this._playerID}}class P{constructor(t,e,s){this._name=t,this._type=e,this._value=s}update(t){this._value=t}get name(){return this._name}get type(){return this._type}get value(){switch(this._type){case l.STRING:return this._value;case l.TEXT:return this._value;case l.INT:return parseInt(this._value);case l.FLAG:return this._value=="1";case l.FIXED:return parseFloat(this._value);case l.POINT:const t=this._value.split(",");return{x:parseFloat(t[0]),y:parseFloat(t[1])}}return null}get stringValue(){return this._value}}class E extends Map{constructor(t,e){super(e),this._name=t}set(t,e,s=!1){return s||this.isValidName(e.name,t),super.set(t,e)}sort(){const t=new Intl.Collator("en",{numeric:!0,sensitivity:"base"});return new E(this._name,[...this.entries()].sort((e,s)=>t.compare(e[0],s[0])))}clear(){super.clear()}get name(){return this._name}isValidName(t,e){if(e&&e!=t)throw new Error("BankMap: Error! Key "+e+" and BankName are different!");return this.forEach((s,n)=>{if(n==t)throw new Error("BankMap: Error! Name "+t+" already used!")}),!0}}var l=(r=>(r.INT="int",r.FIXED="fixed",r.STRING="string",r.FLAG="flag",r.TEXT="text",r.POINT="point",r))(l||{});export{W as B,q as a,O as b,k as c,j as d,F as e,R as f,H as s};
