import{t as x,a as b,f as q}from"./disclose-version.DBoScU1a.js";import{i as L}from"./legacy.DQ5qgGTw.js";import{v as t,_ as y,D as A,w as l,p as S,a as z,c as k,r as g,f as C,s as I,t as V}from"./runtime.BtYRUgJo.js";import{s as D}from"./render.B0azeTSR.js";import{i as W}from"./if.DKS3FxwI.js";import{p as _}from"./proxy.pxA-SMcc.js";import{o as E}from"./index-client.8TZSItko.js";import{g as N}from"./index.svelte.7Zrl-UXY.js";import{w as P}from"./index.svelte.BnyKxUim.js";import{h as R}from"./index.svelte.HebWSbtT.js";import{a as T}from"./utils.svelte.BDOzgmnI.js";import{a as Y,b as j}from"./configurable.BpG3mneI.js";function B(v={}){const{autoCleanup:r=!0,navigator:i=j,document:c=Y}=v;let m=T,n=A(!1),a=A(null);const e=N({autoCleanup:r,document:c}),o=y(()=>!!i&&"wakeLock"in i),u=y(()=>!!t(a)&&e.current==="visible");t(o)&&(m=R(t(a),"release",()=>{var s;l(n,_(((s=t(a))==null?void 0:s.type)??!1))},{autoCleanup:r,passive:!0}),P(()=>e.current==="visible"&&!!t(n),()=>{l(n,!1),p("screen")})),r&&E(()=>h());async function p(s){var w;await((w=t(a))==null?void 0:w.release()),l(a,_(t(o)?await i.wakeLock.request(s):null))}async function f(s){e.current==="visible"?await p(s):l(n,_(s))}async function d(){var s;l(n,!1),(s=t(a))==null||s.release().then(()=>{l(a,null)})}function h(){e.cleanup(),m()}return{get isSupported(){return t(o)},get isActive(){return t(u)},sentinel:t(a),request:f,forceRequest:p,release:d,cleanup:h}}function F(v,r){return r.isActive?r.release():r.request("screen")}var G=x('<p class="dark:text-zinc-200"> </p> <button class="bg-svelte dark:bg-darksvelte rounded-md px-3 py-1 text-white"> </button>',1),H=x(`<p class="dark:text-zinc-200">Your browser doesn't support the Screen Wake Lock API :(</p>`),J=x('<div class="relative flex w-full flex-col gap-2"><!></div>');function re(v,r){S(r,!1);const i=B();L();var c=J(),m=k(c);{var n=e=>{var o=G(),u=C(o),p=k(u);g(u);var f=I(u,2);f.__click=[F,i];var d=k(f,!0);g(f),V(()=>{D(p,`Is Active: ${i.isActive??""}`),D(d,i.isActive?"Deactivate":"Activate")}),b(e,o)},a=e=>{var o=H();b(e,o)};W(m,e=>{i.isSupported?e(n):e(a,!1)})}g(c),b(v,c),z()}q(["click"]);export{re as default};
