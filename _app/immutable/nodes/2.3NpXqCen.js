import{f as ke,t as n,a as o}from"../chunks/disclose-version.DBoScU1a.js";import{p as ne,R as be,f as xe,w as L,D as X,c as r,t as k,a as ve,v as e,s as v,r as t,_ as Z,a0 as ue}from"../chunks/runtime.BtYRUgJo.js";import{s as R,h as we}from"../chunks/render.B0azeTSR.js";import{i as Q}from"../chunks/if.DKS3FxwI.js";import{s as ze}from"../chunks/snippet.BeX-8KhM.js";import{c as H,s as T}from"../chunks/attributes.yrSLWYUD.js";import{s as ce,a as de}from"../chunks/store.DmMBW3zv.js";import{b as ee}from"../chunks/paths.Dg793Ica.js";import{p as fe}from"../chunks/stores.BWSfkRzD.js";import{e as J,i as K}from"../chunks/each.Jod9iOwd.js";import{s as A,a as ye}from"../chunks/class.G-P-aYEK.js";import{t as ie,f as ge,a as $e}from"../chunks/index.B_qMPhmv.js";import{b as oe}from"../chunks/this.Ckp3tthg.js";import{h as Te}from"../chunks/index.svelte.HebWSbtT.js";import{o as te}from"../chunks/navigation.svelte.BJouD9He.js";import{t as _e}from"../chunks/text-transform.9MCF2ngc.js";import{c as E}from"../chunks/cn.Bjcfd9VR.js";import{i as je}from"../chunks/legacy.DQ5qgGTw.js";var Oe=(j,c)=>L(c,!0),Me=(j,c)=>L(c,!1),Pe=(j,c)=>L(c,!1),Ne=n("<a> </a>"),Be=n('<div class="relative flex w-full flex-col gap-5"><h3 class="text-sm font-semibold text-zinc-900 dark:text-zinc-200"> </h3> <div class="relative flex w-full flex-col gap-1"></div></div>'),He=n('<div class="contents"><div class="fixed left-0 top-0 z-10 h-full w-full bg-black/50"></div> <menu></menu></div>'),Ee=()=>window.scrollTo(0,0),Le=n("<a> </a>"),Re=n('<hr class="w-full border-zinc-300 dark:border-zinc-600"> <!>',1),Ce=n('<menu class="absolute z-20 flex w-full flex-col items-start gap-3 bg-[#fafafa] p-5 shadow-md dark:bg-zinc-900 dark:shadow-xl"><button class="text-svelte dark:text-darksvelte font-medium">Return to top</button> <!></menu>'),qe=n("<a> </a>"),Ae=n('<div class="relative flex flex-col gap-5"><h3 class="font-semibold dark:text-zinc-200"> </h3> <div class="relatve flex w-full flex-col gap-1"></div></div>'),De=n('<div class="sticky left-0 top-0 z-10 flex w-full items-center justify-between lg:hidden"><nav><button class="relative flex items-center gap-5"><div class="relative flex flex-col gap-1"><div class="h-[2px] w-4 bg-black dark:bg-zinc-50"></div> <div class="h-[2px] w-4 bg-black dark:bg-zinc-50"></div></div> <span class="text-sm dark:text-zinc-200">Menu</span></button> <button class="flex items-center gap-3 [&amp;>*]:pointer-events-none"><span class="text-sm dark:text-zinc-200">On this page</span> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke"><path d="M0 0h24v24H0z" stroke="none" fill="none"></path><path d="M9 6l6 6l-6 6"></path></svg></button></nav> <!> <!></div> <nav><div class="relative flex flex-col items-start gap-5"></div></nav>',1);function Se(j,c){ne(c,!0);const[U,V]=ce(),C=()=>de(fe,"$page",U);let d=X(void 0),b=X(void 0),O=X(void 0),p=X(!1),u=X(!1);Te("click",l=>{var x;const s=l.target;s===e(b)||(x=e(b))!=null&&x.contains(s)&&!(s instanceof HTMLButtonElement||s instanceof HTMLAnchorElement)||(s===e(O)?L(u,!e(u)):L(u,!1))}),be(()=>{document.body.style.overflow=e(p)?"hidden":"auto"});var M=De(),P=xe(M),g=r(P),m=r(g);m.__click=[Oe,p];var N=v(m,2),W=v(r(N),2);t(N),oe(N,l=>L(O,l),()=>e(O)),t(g),oe(g,l=>L(d,l),()=>e(d));var D=v(g,2);{var ae=l=>{var s=He(),x=r(s);x.__click=[Me,p];var B=v(x,2);J(B,21,()=>Object.entries(c.docs),K,(y,f)=>{let S=()=>e(f)[0],F=()=>e(f)[1];var $=Be(),_=r($),z=r(_,!0);t(_);var G=v(_,2);J(G,21,F,K,(q,h)=>{let Y=()=>e(h).slug,le=()=>e(h).label,se=()=>e(h).package;var I=Ne();const pe=Z(()=>`${ee}/docs/${se()}/${Y()}`);I.__click=[Pe,p];var me=r(I,!0);t(I),k(he=>{T(I,"href",e(pe)),A(I,H(he)),R(me,le())},[()=>E("text-sm font-medium",C().url.pathname===e(pe)?"text-svelte dark:text-darksvelte":"text-zinc-500 dark:text-zinc-400")]),o(q,I)}),t(G),t($),k(q=>R(z,q),[()=>_e(S())]),o(y,$)}),t(B),t(s),k(y=>A(B,H(y)),[()=>E("fixed left-0 top-0 z-20 flex h-full w-4/5 flex-col gap-5 overflow-auto p-5 shadow-[4px_0_8px_8px_rgba(0,0,0,0.1)]","bg-zinc-50 dark:bg-zinc-800")]),ie(3,x,()=>ge),ie(3,B,()=>$e,()=>({x:-200})),o(l,s)};Q(D,l=>{e(p)&&l(ae)})}var re=v(D,2);{var i=l=>{var s=Ce(),x=r(s);x.__click=[Ee];var B=v(x,2);{var y=f=>{var S=Re(),F=v(xe(S),2);J(F,17,()=>te.current,K,($,_)=>{var z=Le();const G=Z(()=>`#${e(_).data.id}`);var q=r(z,!0);t(z),k(h=>{T(z,"href",`#${e(_).data.id??""}`),T(z,"style",`padding-left: ${(e(_).depth-2)*20}px`),A(z,H(h)),R(q,e(_).value)},[()=>E("relative font-medium",C().url.hash===e(G)?"text-svelte dark:text-darksvelte":"text-zinc-500 dark:text-zinc-400")]),o($,z)}),o(f,S)};Q(B,f=>{te.current.length>0&&f(y)})}t(s),oe(s,f=>L(b,f),()=>e(b)),k(f=>T(s,"style",`top: ${f??""}px`),[()=>e(d).getBoundingClientRect().height]),ie(3,s,()=>ge,()=>({duration:150})),o(l,s)};Q(re,l=>{e(u)&&l(i)})}t(P);var a=v(P,2),w=r(a);J(w,21,()=>Object.entries(c.docs),K,(l,s)=>{let x=()=>e(s)[0],B=()=>e(s)[1];var y=Ae(),f=r(y),S=r(f,!0);t(f);var F=v(f,2);J(F,21,B,K,($,_)=>{let z=()=>e(_).slug,G=()=>e(_).label,q=()=>e(_).package;var h=qe();const Y=Z(()=>`${ee}/docs/${q()}/${z()}`);var le=r(h,!0);t(h),k(se=>{T(h,"href",e(Y)),A(h,H(se)),R(le,G())},[()=>E("font-medium",C().url.pathname===e(Y)?"text-svelte dark:text-darksvelte":"text-zinc-500 dark:text-zinc-400")]),o($,h)}),t(F),t(y),k($=>R(S,$),[()=>_e(x())]),o(l,y)}),t(w),t(a),k((l,s,x)=>{A(g,H(l)),ye(W,H(s)),A(a,H(x))},[()=>E("relative flex w-full items-center justify-between px-5 py-[15px]","border-b border-zinc-300 bg-[#fafafa] dark:border-zinc-600 dark:bg-zinc-900"),()=>E("icon icon-tabler icons-tabler-outline icon-tabler-chevron-right duration-150","stroke-black dark:stroke-zinc-50",e(u)&&"rotate-90"),()=>E("sticky left-0 top-[65px] hidden h-[calc(100dvh-65px)] flex-1 flex-col items-center justify-start gap-5 overflow-y-scroll p-8 lg:flex","bg-zinc-100 dark:bg-zinc-800")]),o(j,M),ve(),V()}ke(["click"]);var Fe=n("<a> </a>"),Ge=n('<div class="relative flex max-w-60 flex-col gap-5"><span class="dark:text-zinc-200">On this page</span> <div class="relative flex flex-col gap-[10px]"></div></div>'),Ie=n('<aside class="sticky right-0 top-[65px] hidden h-full flex-1 flex-col items-center p-8 pt-40 xl:flex"><!></aside>');function Je(j,c){ne(c,!1);const[U,V]=ce(),C=()=>de(fe,"$page",U);je();var d=Ie(),b=r(d);{var O=p=>{var u=Ge(),M=v(r(u),2);J(M,5,()=>te.current,K,(P,g)=>{var m=Fe();const N=ue(()=>`#${e(g).data.id}`);var W=r(m,!0);t(m),k(D=>{T(m,"href",e(N)),T(m,"style",`padding-left: ${(e(g).depth-2)*20}px`),A(m,H(D)),R(W,e(g).value)},[()=>E("relative font-medium",C().url.hash===e(N)?"text-svelte dark:text-darksvelte":"text-zinc-500 dark:text-zinc-400")],ue),o(P,m)}),t(M),t(u),o(p,u)};Q(b,p=>{te.current.length>0&&p(O)})}t(d),o(j,d),ve(),V()}var Ke=n('<link rel="stylesheet" href="https://fonts.cdnfonts.com/css/cascadia-code">'),Qe=n('<a class="relative flex w-full flex-col items-start gap-1 rounded-md border border-zinc-200 p-4 dark:border-zinc-800"><span class="text-sm text-zinc-500 dark:text-zinc-400">Previous page</span> <span class="text-svelte dark:text-darksvelte"> </span></a>'),Ue=n('<div class="relative w-full"></div>'),Ve=n('<a class="relative flex w-full flex-col items-end gap-1 rounded-md border border-zinc-200 p-4 dark:border-zinc-800"><span class="text-sm text-zinc-500 dark:text-zinc-400">Next page</span> <span class="text-svelte dark:text-darksvelte"> </span></a>'),We=n('<div class="relative w-full"></div>'),Xe=n('<div class="relative flex w-full flex-col lg:flex-row lg:justify-center lg:gap-10 2xl:gap-20"><!> <div class="relative w-full lg:w-auto lg:flex-[2_1_0%] xl:flex-none"><div class="relative mx-auto w-full max-w-[760px] p-5 lg:py-10 xl:w-[760px]"><!> <div class="relative mt-10 flex w-full flex-col gap-2 md:flex-row"><!> <!></div></div></div> <!></div>');function gt(j,c){ne(c,!0);const[U,V]=ce(),C=()=>de(fe,"$page",U);let d=Z(()=>{var a;const i=C().url.pathname.split("/").at(-1);return(a=Object.values(c.data.docs).flat().find(w=>w.slug===i))==null?void 0:a.meta});var b=Xe();we(i=>{var a=Ke();o(i,a)});var O=r(b);Se(O,{get docs(){return c.data.docs}});var p=v(O,2),u=r(p),M=r(u);ze(M,()=>c.children);var P=v(M,2),g=r(P);{var m=i=>{var a=Qe(),w=v(r(a),2),l=r(w,!0);t(w),t(a),k(()=>{T(a,"href",`${ee??""}/docs/${e(d).previous.package??""}/${e(d).previous.slug??""}`),R(l,e(d).previous.label)}),o(i,a)},N=i=>{var a=Ue();o(i,a)};Q(g,i=>{var a;(a=e(d))!=null&&a.previous?i(m):i(N,!1)})}var W=v(g,2);{var D=i=>{var a=Ve(),w=v(r(a),2),l=r(w,!0);t(w),t(a),k(()=>{T(a,"href",`${ee??""}/docs/${e(d).next.package??""}/${e(d).next.slug??""}`),R(l,e(d).next.label)}),o(i,a)},ae=i=>{var a=We();o(i,a)};Q(W,i=>{var a;(a=e(d))!=null&&a.next?i(D):i(ae,!1)})}t(P),t(u),t(p);var re=v(p,2);Je(re,{}),t(b),o(j,b),ve(),V()}export{gt as component};
