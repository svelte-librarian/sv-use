import{t as F,a as H,f as L}from"./disclose-version.DBoScU1a.js";import{R as z,T as O,v as e,_ as C,w as u,D as m,p as R,s as r,c as n,t as X,a as Y,r as l}from"./runtime.BtYRUgJo.js";import{s as j}from"./render.B0azeTSR.js";import{r as T,b as W}from"./attributes.yrSLWYUD.js";import{p as A}from"./proxy.pxA-SMcc.js";import{c as I}from"./cn.Bjcfd9VR.js";import{o as M,T as N}from"./TextArea.3jIR2okW.js";import{h as V}from"./index.svelte.HebWSbtT.js";import{o as B}from"./index.svelte.uLKYNkMg.js";import{n as G}from"./utils.svelte.BDOzgmnI.js";function J(s){let t=[],o=m(0),c=m(0);const a=C(()=>G(s));z(()=>O(()=>i())),z(()=>(e(a)&&t.push(V("resize",i)),d)),t.push(M(()=>e(a),i,{autoCleanup:!1}).cleanup,B(()=>e(a),i,{autoCleanup:!1,attributes:!0}).cleanup);function i(){e(a)&&(u(o,e(a).offsetWidth-e(a).clientWidth),u(c,e(a).offsetHeight-e(a).clientHeight))}function d(){t.forEach(p=>p()),t=[]}return{get x(){return e(o)},get y(){return e(c)},cleanup:d}}function K(s,t){u(t,A(s.currentTarget.value))}var P=(s,t)=>u(t,"x"),Q=(s,t)=>u(t,"y"),U=F('<div id="get-scrollbar-width-container" class="relative flex w-full flex-col items-start justify-center gap-5 overflow-hidden"><p class="dark:text-zinc-200"> </p> <div class="flex items-center gap-5 dark:text-zinc-200">Scrollbar thickness ? <select class="rounded-md px-3 py-2 text-sm dark:bg-zinc-800"><option>Auto</option><option>Thin</option><option>None</option></select></div> <div class="flex items-center gap-5 dark:text-zinc-200">Overflow axis ? <label>X <input type="radio"></label> <label>Y <input type="radio"></label></div> <!></div>');function ue(s,t){R(t,!0);let o=m(void 0);const c=J(()=>e(o));let a=m("auto"),i=m("y");const d="Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta itaque repudiandae vel sint iure pariatur illum nesciunt iste, voluptate atque unde illo mollitia expedita dolor veniam magnam minus, cum rem non deleniti officiis laudantium ut minima. Ipsum corrupti, inventore, earum tempora accusantium quasi commodi, ducimus illum eum nam harum voluptates est? Facilis ullam, adipisci maiores, veniam tempora animi voluptatum quae, repudiandae corrupti cum dolorum. Odio, iste. Cupiditate assumenda, quae quasi quia eum autem exercitationem, culpa adipisci laborum reiciendis est aspernatur delectus minima ad harum veritatis. Fuga et magnam recusandae asperiores similique aspernatur, officia quibusdam esse impedit neque animi veniam earum.";var p=U(),v=n(p),S=n(v);l(v);var f=r(v,2),_=r(n(f));_.__change=[K,a];var h=n(_);h.value=(h.__value="auto")==null?"":"auto";var x=r(h);x.value=(x.__value="thin")==null?"":"thin";var q=r(x);q.value=(q.__value="none")==null?"":"none",l(_),l(f);var g=r(f,2),b=r(n(g)),k=r(n(b));T(k),k.__click=[P,i],l(b);var w=r(b,2),y=r(n(w));T(y),y.__click=[Q,i],l(w),l(g);var $=r(g,2);const D=C(()=>I("relative h-40 w-40 resize dark:text-zinc-200",e(i)==="y"?"":"whitespace-pre"));N($,{value:d,get style(){return`scrollbar-width: ${e(a)??""};`},get class(){return e(D)},get el(){return e(o)},set el(E){u(o,A(E))}}),l(p),X(()=>{j(S,`Current Width : X = ${c.x??""}px | Y = ${c.y??""}px`),W(k,e(i)==="x"),W(y,e(i)==="y")}),H(s,p),Y()}L(["change","click"]);export{ue as default};
