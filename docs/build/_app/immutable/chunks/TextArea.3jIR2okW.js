import{R as p,v as c,_ as l,p as b,t as v,a as _}from"./runtime.BtYRUgJo.js";import{o as x}from"./index-client.8TZSItko.js";import{t as z,n as g}from"./utils.svelte.BDOzgmnI.js";import{i as w}from"./is.svelte.DhDKMixu.js";import{d as R}from"./configurable.BpG3mneI.js";import{t as h,a as k,j as y}from"./disclose-version.DBoScU1a.js";import{a as O}from"./attributes.yrSLWYUD.js";import{b as S}from"./input.ann5L3Tb.js";import{b as A}from"./this.Ckp3tthg.js";import{p as m,r as T}from"./props.k7mAL34f.js";import{c as j}from"./cn.Bjcfd9VR.js";function J(o,r,i={}){const{autoCleanup:n=!0,window:t=R,...d}=i;let e;const a=w(()=>t!==void 0&&"ResizeObserver"in t),s=l(()=>z(o).map(g));p(()=>{if(u(),a.current&&t){e=new ResizeObserver(r);for(const f of c(s))f&&e.observe(f,d)}}),n&&x(()=>{u()});function u(){e&&(e.disconnect(),e=void 0)}return{get isSupported(){return a.current},cleanup:u}}var C=h("<textarea></textarea>");function K(o,r){b(r,!0);let i=m(r,"class",3,void 0),n=m(r,"value",15),t=m(r,"el",15,void 0),d=T(r,["$$slots","$$events","$$legacy","class","value","el"]);var e=C();y(e);let a;A(e,s=>t(s),()=>t()),v(s=>a=O(e,a,{class:s,...d}),[()=>j("rounded-md border border-zinc-300 p-5 text-sm dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200",i())]),S(e,n),k(o,e),_()}export{K as T,J as o};
