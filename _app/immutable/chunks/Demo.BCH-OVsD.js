import{t as i,a as m}from"./disclose-version.DBoScU1a.js";import{i as c}from"./legacy.DQ5qgGTw.js";import{v as l,D as d,w as h,p as v,t as g,a as w,c as x,r as D}from"./runtime.BtYRUgJo.js";import{s as E}from"./render.B0azeTSR.js";import{o as L}from"./index-client.8TZSItko.js";import{h as u}from"./index.svelte.HebWSbtT.js";import{d as _}from"./configurable.BpG3mneI.js";function k(o={}){const{autoCleanup:r=!0,window:t=_}=o,e=[];let s=d(!1);const n=a=>{if(!t)return;a=a||t.event;const f=a.relatedTarget||a.toElement;h(s,!f)};t&&e.push(u(t,"mouseout",n,{autoCleanup:r,passive:!0}),u(document,["mouseleave","mouseenter"],n,{autoCleanup:r,passive:!0})),r&&L(()=>p());function p(){e.forEach(a=>a())}return{get current(){return l(s)},cleanup:p}}var y=i('<p class="dark:text-zinc-200"> </p>');function b(o,r){v(r,!1);const t=k();c();var e=y(),s=x(e);D(e),g(()=>E(s,`Has left page : ${t.current??""}`)),m(o,e),w()}export{b as default};
