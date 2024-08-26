function v(e){return e?`/auth/login/${e}`:"/auth/login"}var d="/",x=(e,t)=>(e.endsWith(d)&&(e=e.slice(0,-1)),t.startsWith(d)||(t=d+t),e+t),g=(e,t,r)=>{let s=e.pathname===d?t:x(e.pathname,t),a=new globalThis.URL(s,e);if(r)for(let[o,n]of Object.entries(B(r)))if(n&&typeof n=="object"&&!Array.isArray(n))for(let[l,u]of Object.entries(n))a.searchParams.set(`${o}[${l}]`,String(u));else a.searchParams.set(o,n);return a};function C(e){return typeof e!="object"||!e?!1:"headers"in e&&"ok"in e&&"json"in e&&typeof e.json=="function"&&"text"in e&&typeof e.json=="function"}async function N(e){var t;if(!(typeof e!="object"||!e)){if(C(e)){let r=(t=e.headers.get("Content-Type"))==null?void 0:t.toLowerCase();if(r!=null&&r.startsWith("application/json")||r!=null&&r.startsWith("application/health+json")){let s=await e.json();if(!e.ok)throw s;return"data"in s?s.data:s}if(r!=null&&r.startsWith("text/html")||r!=null&&r.startsWith("text/plain")){let s=await e.text();if(!e.ok)throw s;return s}return e}return"data"in e?e.data:e}}var y=async(e,t,r=globalThis.fetch)=>(t.headers=typeof t.headers=="object"&&!Array.isArray(t.headers)?t.headers:{},r(e,t).then(s=>N(s).catch(a=>{let o=typeof a=="object"&&"errors"in a?a.errors:a;return Promise.reject({errors:o,response:s})}))),E=()=>{let e=null;return{get:async()=>e,set:async t=>{e=t}}},J={msRefreshBeforeExpires:3e4,autoRefresh:!0},$=2**31-1,W=(e="cookie",t={})=>r=>{let s={...J,...t},a=null,o=null,n=s.storage??E(),l=async()=>n.set({access_token:null,refresh_token:null,expires:null,expires_at:null}),u=async()=>{try{await a}finally{a=null}},m=async()=>{let i=await n.get();return a||!(i!=null&&i.expires_at)||i.expires_at<new Date().getTime()+s.msRefreshBeforeExpires&&b().catch(c=>{}),u()},w=async i=>{let c=i.expires??0;i.expires_at=new Date().getTime()+c,await n.set(i),s.autoRefresh&&c>s.msRefreshBeforeExpires&&c<$&&(o&&clearTimeout(o),o=setTimeout(()=>{o=null,b().catch(f=>{})},c-s.msRefreshBeforeExpires))},b=async()=>(a=(async()=>{let i=await n.get();await l();let c={method:"POST",headers:{"Content-Type":"application/json"}};"credentials"in s&&(c.credentials=s.credentials);let f={mode:e};e==="json"&&(i!=null&&i.refresh_token)&&(f.refresh_token=i.refresh_token),c.body=JSON.stringify(f);let h=g(r.url,"/auth/refresh");return y(h.toString(),c,r.globals.fetch).then(p=>w(p).then(()=>p))})(),a);return{refresh:b,async login(i,c,f={}){await l();let h={email:i,password:c};"otp"in f&&(h.otp=f.otp),h.mode=f.mode??e;let p=v(f.provider),R=g(r.url,p),S={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(h)};"credentials"in s&&(S.credentials=s.credentials);let j=await y(R.toString(),S,r.globals.fetch);return await w(j),j},async logout(){let i=await n.get(),c={method:"POST",headers:{"Content-Type":"application/json"}};"credentials"in s&&(c.credentials=s.credentials);let f={mode:e};e==="json"&&(i!=null&&i.refresh_token)&&(f.refresh_token=i.refresh_token),c.body=JSON.stringify(f);let h=g(r.url,"/auth/logout");await y(h.toString(),c,r.globals.fetch),this.stopRefreshing(),await l()},stopRefreshing(){o&&clearTimeout(o)},async getToken(){var i;return await m().catch(()=>{}),((i=await n.get())==null?void 0:i.access_token)??null},async setToken(i){return n.set({access_token:i,refresh_token:null,expires:null,expires_at:null})}}},T={fetch:globalThis.fetch,WebSocket:globalThis.WebSocket,URL:globalThis.URL,logger:globalThis.console},L=(e,t={})=>{let r=t.globals?{...T,...t.globals}:T;return{globals:r,url:new r.URL(e),with(s){return{...this,...s(this)}}}},q=(e,t)=>()=>({path:"/files",method:"POST",body:e,params:t??{},headers:{"Content-Type":"multipart/form-data"}});function k(e){return["directus_access","directus_activity","directus_collections","directus_fields","directus_files","directus_folders","directus_migrations","directus_permissions","directus_policies","directus_presets","directus_relations","directus_revisions","directus_roles","directus_sessions","directus_settings","directus_users","directus_webhooks","directus_dashboards","directus_panels","directus_notifications","directus_shares","directus_flows","directus_operations","directus_translations","directus_versions","directus_extensions"].includes(e)}var U=(e,t,r)=>()=>{let s=String(e);if(k(s))throw new Error("Cannot use createItems for core collections");return{path:`/items/${s}`,params:r??{},body:JSON.stringify(t),method:"POST"}},I=(e,t)=>()=>({path:"/users",params:t??{},body:JSON.stringify(e),method:"POST"}),A=e=>{let t=(r,s=[])=>{if(typeof r=="object"){let a=[];for(let o in r){let n=r[o]??[];if(Array.isArray(n))for(let l of n)a.push(t(l,[...s,o]));else if(typeof n=="object")for(let l of Object.keys(n)){let u=n[l];for(let m of u)a.push(t(m,[...s,`${o}:${l}`]))}}return a.flatMap(o=>o)}return[...s,String(r)].join(".")};return e.flatMap(r=>t(r))},B=e=>{let t={};Array.isArray(e.fields)&&e.fields.length>0&&(t.fields=A(e.fields).join(",")),e.filter&&Object.keys(e.filter).length>0&&(t.filter=JSON.stringify(e.filter)),e.search&&(t.search=e.search),"sort"in e&&e.sort&&(t.sort=typeof e.sort=="string"?e.sort:e.sort.join(",")),typeof e.limit=="number"&&e.limit>=-1&&(t.limit=String(e.limit)),typeof e.offset=="number"&&e.offset>=0&&(t.offset=String(e.offset)),typeof e.page=="number"&&e.page>=1&&(t.page=String(e.page)),e.deep&&Object.keys(e.deep).length>0&&(t.deep=JSON.stringify(e.deep)),e.alias&&Object.keys(e.alias).length>0&&(t.alias=JSON.stringify(e.alias)),e.aggregate&&Object.keys(e.aggregate).length>0&&(t.aggregate=JSON.stringify(e.aggregate)),e.groupBy&&e.groupBy.length>0&&(t.groupBy=e.groupBy.join(","));for(let[r,s]of Object.entries(e))r in t||(typeof s=="string"||typeof s=="number"||typeof s=="boolean"?t[r]=String(s):t[r]=JSON.stringify(s));return t},_=(e,t)=>{if(e.length===0)throw new Error(t)},O=(e,t)=>{if(k(String(e)))throw new Error(t)},D=(e,t)=>()=>(_(String(e),"Collection cannot be empty"),O(e,"Cannot use readItems for core collections"),{path:`/items/${e}`,params:t??{},method:"GET"}),G=(e,t,r,s)=>()=>(_(String(t),"Key cannot be empty"),_(String(e),"Collection cannot be empty"),O(e,"Cannot use updateItem for core collections"),{path:`/items/${e}/${t}`,params:s??{},body:JSON.stringify(r),method:"PATCH"}),P={},H=(e={})=>t=>{let r={...P,...e};return{async request(s){let a=s();if(a.headers||(a.headers={}),"Content-Type"in a.headers?a.headers["Content-Type"]==="multipart/form-data"&&delete a.headers["Content-Type"]:a.headers["Content-Type"]="application/json","getToken"in this){let u=await this.getToken();u&&(a.headers||(a.headers={}),a.headers.Authorization=`Bearer ${u}`)}let o=g(t.url,a.path,a.params),n={method:a.method??"GET",headers:a.headers??{}};"credentials"in r&&(n.credentials=r.credentials),a.body&&(n.body=a.body),a.onRequest&&(n=await a.onRequest(n)),r.onRequest&&(n=await r.onRequest(n));let l=await y(o.toString(),n,t.globals.fetch);return"onResponse"in a&&(l=await a.onResponse(l,n)),"onResponse"in e&&(l=await e.onResponse(l,n)),l}}};const K=(e,t)=>{const r=e.__vccOpts||e;for(const[s,a]of t)r[s]=a;return r};export{G as E,U as N,H as R,K as _,q as g,L as l,W as n,D as w,I as y};
