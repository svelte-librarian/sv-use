import{S as h,F as D,G as K,I as d,J as L,v as c,U as u,w as l,K as x,L as M,M as S,N as T,O as j}from"./runtime.BtYRUgJo.js";function g(s,I=null,A){if(typeof s!="object"||s===null||h in s)return s;const N=T(s);if(N!==D&&N!==K)return s;var i=new Map,b=j(s),o=d(0);b&&i.set("length",d(s.length));var y;return new Proxy(s,{defineProperty(f,e,t){(!("value"in t)||t.configurable===!1||t.enumerable===!1||t.writable===!1)&&S();var n=i.get(e);return n===void 0?(n=d(t.value),i.set(e,n)):l(n,g(t.value,y)),!0},deleteProperty(f,e){var t=i.get(e);if(t===void 0)e in f&&i.set(e,d(u));else{if(b&&typeof e=="string"){var n=i.get("length"),r=Number(e);Number.isInteger(r)&&r<n.v&&l(n,r)}l(t,u),R(o)}return!0},get(f,e,t){var v;if(e===h)return s;var n=i.get(e),r=e in f;if(n===void 0&&(!r||(v=x(f,e))!=null&&v.writable)&&(n=d(g(r?f[e]:u,y)),i.set(e,n)),n!==void 0){var a=c(n);return a===u?void 0:a}return Reflect.get(f,e,t)},getOwnPropertyDescriptor(f,e){var t=Reflect.getOwnPropertyDescriptor(f,e);if(t&&"value"in t){var n=i.get(e);n&&(t.value=c(n))}else if(t===void 0){var r=i.get(e),a=r==null?void 0:r.v;if(r!==void 0&&a!==u)return{enumerable:!0,configurable:!0,value:a,writable:!0}}return t},has(f,e){var a;if(e===h)return!0;var t=i.get(e),n=t!==void 0&&t.v!==u||Reflect.has(f,e);if(t!==void 0||M!==null&&(!n||(a=x(f,e))!=null&&a.writable)){t===void 0&&(t=d(n?g(f[e],y):u),i.set(e,t));var r=c(t);if(r===u)return!1}return n},set(f,e,t,n){var O;var r=i.get(e),a=e in f;if(b&&e==="length")for(var v=t;v<r.v;v+=1){var w=i.get(v+"");w!==void 0?l(w,u):v in f&&(w=d(u),i.set(v+"",w))}r===void 0?(!a||(O=x(f,e))!=null&&O.writable)&&(r=d(void 0),l(r,g(t,y)),i.set(e,r)):(a=r.v!==u,l(r,g(t,y)));var _=Reflect.getOwnPropertyDescriptor(f,e);if(_!=null&&_.set&&_.set.call(n,t),!a){if(b&&typeof e=="string"){var P=i.get("length"),m=Number(e);Number.isInteger(m)&&m>=P.v&&l(P,m+1)}R(o)}return!0},ownKeys(f){c(o);var e=Reflect.ownKeys(f).filter(r=>{var a=i.get(r);return a===void 0||a.v!==u});for(var[t,n]of i)n.v!==u&&!(t in f)&&e.push(t);return e},setPrototypeOf(){L()}})}function R(s,I=1){l(s,s.v+I)}export{g as p};
