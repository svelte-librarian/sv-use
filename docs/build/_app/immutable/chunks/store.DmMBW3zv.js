import{s as c,g as l}from"./index.CIPX0LKA.js";import{q as o,n as a,u as b,v as p,w as d,x as _}from"./runtime.BtYRUgJo.js";let s=!1,i=Symbol();function y(e,n,r){const u=r[n]??(r[n]={store:null,source:b(void 0),unsubscribe:a});if(u.store!==e&&!(i in r))if(u.unsubscribe(),u.store=e??null,e==null)u.source.v=void 0,u.unsubscribe=a;else{var t=!0;u.unsubscribe=c(e,f=>{t?u.source.v=f:d(u.source,f)}),t=!1}return e&&i in r?l(e):p(u.source)}function m(){const e={};function n(){o(()=>{for(var r in e)e[r].unsubscribe();_(e,i,{enumerable:!1,value:!0})})}return[e,n]}function w(e){var n=s;try{return s=!1,[e(),s]}finally{s=n}}export{y as a,w as c,m as s};
