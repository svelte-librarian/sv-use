import{K as w,Y as D,Z as T,_ as A,a0 as Y,a1 as q,a2 as B,v as _,w as K,T as x,a3 as M,S as N,a4 as U,a5 as C,a6 as G,a7 as Z,u as $,a8 as y}from"./runtime.BtYRUgJo.js";import{p as z}from"./proxy.pxA-SMcc.js";import{c as V}from"./store.DmMBW3zv.js";const j={get(e,r){if(!e.exclude.includes(r))return e.props[r]},set(e,r){return!1},getOwnPropertyDescriptor(e,r){if(!e.exclude.includes(r)&&r in e.props)return{enumerable:!0,configurable:!0,value:e.props[r]}},has(e,r){return e.exclude.includes(r)?!1:r in e.props},ownKeys(e){return Reflect.ownKeys(e.props).filter(r=>!e.exclude.includes(r))}};function Q(e,r,u){return new Proxy({props:e,exclude:r},j)}function W(e,r,u,d){var O;var I=(u&Z)!==0,v=!C||(u&G)!==0,c=(u&M)!==0,L=(u&y)!==0,R=!1,i;c?[i,R]=V(()=>e[r]):i=e[r];var g=N in e||U in e,f=c&&(((O=w(e,r))==null?void 0:O.set)??(g&&r in e&&(a=>e[r]=a)))||void 0,n=d,o=!0,P=!1,b=()=>(P=!0,o&&(o=!1,L?n=x(d):n=d),n);i===void 0&&d!==void 0&&(f&&v&&D(),i=b(),f&&f(i));var s;if(v)s=()=>{var a=e[r];return a===void 0?b():(o=!0,P=!1,a)};else{var E=(I?A:Y)(()=>e[r]);E.f|=T,s=()=>{var a=_(E);return a!==void 0&&(n=void 0),a===void 0?n:a}}if(!(u&q))return s;if(f){var h=e.$$legacy;return function(a,t){return arguments.length>0?((!v||!t||h||R)&&f(t?s():a),a):s()}}var p=!1,S=$(i),l=A(()=>{var a=s(),t=_(S);return p?(p=!1,t):S.v=a});return I||(l.equals=B),function(a,t){if(arguments.length>0){const m=t?_(l):v&&c?z(a):a;return l.equals(m)||(p=!0,K(S,m),P&&n!==void 0&&(n=m),x(()=>_(l))),a}return _(l)}}export{W as p,Q as r};
