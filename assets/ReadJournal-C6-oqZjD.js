import{_ as d,l as u,R as _,w as p}from"./_plugin-vue_export-helper-CygJQMMC.js";import{u as h,i as v,r as m,l as f,c as n,a as s,F as b,m as y,o as a,t as e,b as c,p as g,h as k}from"./index-HEQPfwm7.js";h();v();const l=m([]),C=u("https://admin.roteirosurbanos.com.br/").with(_());f(async()=>{try{const o=await C.request(p("journals"));console.log("Full response:",o),l.value=o,console.log("journals value from readjournal:",l.value)}catch(o){console.error("Error fetching journals:",o)}});const $={},r=o=>(g("data-v-e26a5f59"),o=o(),k(),o),w={class:"read-journal-container"},I={class:"journal-list"},R={class:"content"},j={class:"content"},J={class:"content"},S=r(()=>s("b",null,"City",-1)),B=r(()=>s("b",null,"Country",-1)),E={class:"content"},F=["src"],D={class:"journal-actions"},N=["onClick"],V=["onClick"];function q(o,L,M,P,T,U){return a(),n("div",w,[s("div",I,[(a(!0),n(b,null,y(o.journals,t=>(a(),n("div",{key:t.id,class:"journal-entry card"},[s("div",R,[s("h3",null,e(t.title),1)]),s("div",j,e(t.description),1),s("div",J,[s("p",null,[S,c(": "+e(t.city),1)]),s("p",null,[B,c(": "+e(t.country),1)])]),s("div",E,[s("img",{src:o.getImageUrl(t.photo),alt:"Journal Photo",class:"journal-photo"},null,8,F)]),s("div",D,[s("button",{onClick:i=>o.editJournal(t),class:"edit-button"}," Edit ",8,N),s("button",{onClick:i=>o.deleteJournal(t.id),class:"delete-button"}," Delete ",8,V)])]))),128))])])}const A=d($,[["render",q],["__scopeId","data-v-e26a5f59"]]);export{A as default};
