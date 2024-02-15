import{s as e}from"./starcode-HjYOyHTl.js";/*!
 * sc2-bank-generator v.1.1.4
 *
 * Compiled from:
 *
 * sc2-bank-generator/src/core/starcode/sc-param.ts
 * sc2-bank-generator/src/core/starcode/sc-service.ts
 *
 * Сompiled on Thu, 15 Feb 2024 22:31:30 UTC
 */class n{constructor(r,d,c=""){this._current=r,this._max=d,this._description=c}update(r){return this._current=r,this}get current(){return this._current}get max(){return this._max}get description(){return this._description}}class a{write(r,d,c){e.reset();const s=r.length;for(let t=0;t<s;t++)e.setInt(r[t].current,r[t].max);return c?(c.compress?e.code=e.compress(e.code):e.code,c.hash?e.code=e.addHash(e.code,c.hash):e.code,c.encrypt?e.code=e.encrypt(e.code,d):e.code):e.compressAndEncrypt(d),e.code}read(r,d,c,s){e.code=r,s?(s.decrypt?e.code=e.decrypt(e.code,c):e.code,s.dehash?e.code=e.removeHash(e.code,s.dehash):e.code,s.decompress?e.code=e.decompress(e.code):e.code):e.decryptAndDecompress(e.code,c);let t=d.length-1;for(;t>=0;)d[t].update(e.getInt(d[t].max)),t--}}const m=new a;export{n as S,m as s};
