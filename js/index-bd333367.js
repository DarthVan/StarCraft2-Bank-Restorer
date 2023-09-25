import{R as f,o as x,u as D,r as e,m as b,M as y,d as I,c as A,j as u,C as B,L as N,T as R,B as M,E as T}from"./index-882dd049.js";import{B as j}from"./index-39ef68a1.js";/*!
 * sc2-bank-generator v.1.0.8
 *
 * Compiled from:
 *
 * sc2-bank-generator/src/components/maps/any-simple/index.tsx
 *
 * Сompiled on Mon, 25 Sep 2023 23:07:02 UTC
 */const v=x(w=>{const{accountStore:c,menuStore:r,mapStore:m,modalStore:g}=D(),[s,p]=e.useState(""),[l,C]=e.useState(""),[a,i]=e.useState(""),k=b.get(y.ANY_SIMPLE).title,n=e.useMemo(()=>new j(s,l,r.playerID,"1"),[c.current,r.playerID,s,l]);e.useEffect(()=>{var d;const t=(d=m.list[c.current])==null?void 0:d[k];if(!t){o.onResetClick();return}p(t.bankName),C(t.authorID),i(t.xml)},[c.current]);const h=()=>{!a||!a.length||m.setMapData(c.current,k,{bankName:s,authorID:l,xml:a})};e.useEffect(()=>{r.autoSave&&h()},[s,l,a]);const o={onBankNameChange:e.useCallback(t=>{p(t)},[]),onAuthorIdChange:e.useCallback(t=>{C(t)},[]),onFileDrop:e.useCallback((t,d)=>{n.parse(d),n.sort(),p(t),i(n.getAsString())},[]),onDownloadClick:e.useCallback(()=>{if(r.playerID.split("-").length!=4||l.split("-").length!=4||s.length<1){g.setModal("WARN","This map need a BankName, AuthorID and PlayerID to generate valid signature! Read Help for details.");return}I(a,s+".SC2Bank",!0),r.autoSave||h()},[n,a]),onCopyCodeClick:e.useCallback(()=>{if(r.playerID.split("-").length!=4||l.split("-").length!=4||s.length<1){g.setModal("WARN","This map need a BankName, AuthorID and PlayerID to generate valid signature! Read Help for details.");return}A(a,!0),r.autoSave||h()},[n,a]),onResetClick:e.useCallback(()=>{p(""),C(""),i("")},[]),onFieldChange:e.useCallback(t=>{i(t)},[]),updateSignature:e.useCallback(()=>{n.parse(a),n.sort(),n.updateSignature(),i(n.getAsString())},[n,a])},S=e.useMemo(()=>u.jsxs(B,{style:{flexDirection:"column"},children:[u.jsx(N,{children:"Simple text editor for any banks, that protected with signature only. Drop file to edit it."}),u.jsx(R,{text:a,onChange:o.onFieldChange}),u.jsx(M,{onClick:o.updateSignature,style:{width:"150px"},children:"Update Signature"})]}),[n,a]);return u.jsx(T,{bankName:s,authorID:l,onBankNameChange:o.onBankNameChange,onAuthorIdChange:o.onAuthorIdChange,onFileDrop:o.onFileDrop,onDownload:o.onDownloadClick,onCopy:o.onCopyCodeClick,onReset:o.onResetClick,children:S})}),P=f.memo(v);export{P as default};
