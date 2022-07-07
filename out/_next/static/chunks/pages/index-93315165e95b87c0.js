(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{53341:function(e,t,n){"use strict";n.d(t,{Z:function(){return C}});var r=n(67294),a=n(3857),o=n(69199),i=n(58067),s=(0,i.k)(((e,{padding:t,first:n,last:r})=>({cardSection:{display:"block",marginLeft:-1*e.fn.size({size:t,sizes:e.spacing}),marginRight:-1*e.fn.size({size:t,sizes:e.spacing}),marginTop:n?-1*e.fn.size({size:t,sizes:e.spacing}):void 0,marginBottom:r?-1*e.fn.size({size:t,sizes:e.spacing}):void 0}}))),c=n(10745),u=Object.defineProperty,l=Object.getOwnPropertySymbols,f=Object.prototype.hasOwnProperty,d=Object.prototype.propertyIsEnumerable,m=(e,t,n)=>t in e?u(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;const p=(0,r.forwardRef)(((e,t)=>{var n=e,{className:a,padding:o=0,component:i,first:u,last:p}=n,v=((e,t)=>{var n={};for(var r in e)f.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&l)for(var r of l(e))t.indexOf(r)<0&&d.call(e,r)&&(n[r]=e[r]);return n})(n,["className","padding","component","first","last"]);const{classes:h,cx:g}=s({padding:o,first:u,last:p},{name:"Card"});return r.createElement(c.x,((e,t)=>{for(var n in t||(t={}))f.call(t,n)&&m(e,n,t[n]);if(l)for(var n of l(t))d.call(t,n)&&m(e,n,t[n]);return e})({component:i||"div",className:g(h.cardSection,a),ref:t},v))}));p.displayName="@mantine/core/CardSection";var v=(0,i.k)((e=>({root:{position:"relative",overflow:"hidden",backgroundColor:"dark"===e.colorScheme?e.colors.dark[6]:e.white}}))),h=Object.defineProperty,g=Object.getOwnPropertySymbols,w=Object.prototype.hasOwnProperty,b=Object.prototype.propertyIsEnumerable,y=(e,t,n)=>t in e?h(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;const N={p:"md"},C=(0,r.forwardRef)(((e,t)=>{const n=(0,a.Z3)("Card",N,e),{component:i,className:s,p:c,radius:u,children:l,classNames:f,styles:d}=n,m=((e,t)=>{var n={};for(var r in e)w.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&g)for(var r of g(e))t.indexOf(r)<0&&b.call(e,r)&&(n[r]=e[r]);return n})(n,["component","className","p","radius","children","classNames","styles"]),{classes:h,cx:C}=v(null,{name:"Card",classNames:f,styles:d}),O=r.Children.toArray(l),x=O.map(((e,t)=>"object"===typeof e&&e&&"type"in e&&e.type===p?(0,r.cloneElement)(e,{padding:c,first:0===t,last:t===O.length-1}):e));return r.createElement(o.X,((e,t)=>{for(var n in t||(t={}))w.call(t,n)&&y(e,n,t[n]);if(g)for(var n of g(t))b.call(t,n)&&y(e,n,t[n]);return e})({className:C(h.root,s),radius:u,p:c,component:i,ref:t},m),x)}));C.Section=p,C.displayName="@mantine/core/Card"},45301:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n(22670)}])},22670:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return y}});var r=n(34051),a=n.n(r),o=n(85893),i=n(67294),s=n(40861),c=n(71217),u=n(11163),l=n(83025),f=n(83078),d=n(9669),m=n.n(d),p=n(68949);var v=new(function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.db={},(0,p.ky)(this,{},{autoBind:!0})}var t=e.prototype;return t.getItem=function(e){var t=this.db[e];return t||null},t.setItem=function(e,t){this.db[e]=t},t.removeItem=function(e){delete this.db[e]},t.clear=function(){this.db={}},t.getAll=function(){return this.db},e}());function h(e){v.setItem("scrollPos:".concat(e),JSON.stringify({x:window.scrollX,y:window.scrollY}))}function g(e){var t=v.getItem("scrollPos:".concat(e)),n=t?JSON.parse(t):void 0;n&&window.scrollTo(n.x,n.y)}function w(e,t,n,r,a,o,i){try{var s=e[o](i),c=s.value}catch(u){return void n(u)}s.done?t(c):Promise.resolve(c).then(r,a)}function b(e){return function(){var t=this,n=arguments;return new Promise((function(r,a){var o=e.apply(t,n);function i(e){w(o,r,a,i,s,"next",e)}function s(e){w(o,r,a,i,s,"throw",e)}i(void 0)}))}}var y=(0,c.Pi)((function(){!function(e){(0,i.useEffect)((function(){if("scrollRestoration"in window.history){var t=!1;window.history.scrollRestoration="manual",g(e.asPath);var n=function(t){h(e.asPath),delete t.returnValue},r=function(){h(e.asPath)},a=function(e){t&&(t=!1,g(e))};return window.addEventListener("beforeunload",n),u.default.events.on("routeChangeStart",r),u.default.events.on("routeChangeComplete",a),u.default.beforePopState((function(){return t=!0,!0})),function(){window.removeEventListener("beforeunload",n),u.default.events.off("routeChangeStart",r),u.default.events.off("routeChangeComplete",a),u.default.beforePopState((function(){return!0}))}}}),[e])}((0,u.useRouter)());var e=(0,i.useState)(),t=(e[0],e[1]),n=(0,f.Nr)(),r=n.Moralis,c=(n.isInitialized,(0,i.useState)(1)),d=(c[0],c[1],(0,i.useState)("")),p=d[0],v=(d[1],(0,f.Oc)("NewGreet",(function(e){return e.descending("timestamp_decimal").notEqualTo("uri","").limit(10)}),[]).data),w=((0,f.Oc)("NewGreet",(function(e){return e.descending("timestamp_decimal").notEqualTo("uri","").greaterThan("objectid",p).limit(10)})),(0,i.useCallback)(b(a().mark((function e(){var n,r,o,i;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Promise.all(v.map((function(e){return m().get(e.get("uri"))})));case 2:n=e.sent,r=v.map((function(e){return e.get("uid")})),o=v.map((function(e){return e.get("timestamp")})),i=n.map((function(e,t){var n,a=e.data;return{userName:a.creatorName,id:r[t],images:null===(n=a.images)||void 0===n?void 0:n.map((function(e){return e.URI})),textContent:a.text,timestamp:o[t]}})),t(i);case 7:case"end":return e.stop()}}),e)}))),[v]));(0,i.useEffect)((function(){return console.log(v),w(),function(){t([])}}),[v,w]),(0,i.useEffect)((function(){var e=function(){var e=b(a().mark((function e(){var t;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,r.Cloud.run("test");case 2:t=e.sent,alert(t);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();e()}),[]);var y=["https://picsum.photos/id/1018/1000/600/"],N=[{userName:"YC",id:"1",timestamp:"timestamp",textContent:"test",images:y},{userName:"YC",id:"2",timestamp:"timestamp",textContent:"test",images:y}];return(0,o.jsx)(o.Fragment,{children:(0,o.jsx)(s.Z,{feeds:N||[],filter:l.D.Trending,isFollowing:!1,hasMore:!1,fetchMore:function(){}})})}))}},function(e){e.O(0,[617,228,445,885,437,50,774,888,179],(function(){return t=45301,e(e.s=t);var t}));var t=e.O();_N_E=t}]);