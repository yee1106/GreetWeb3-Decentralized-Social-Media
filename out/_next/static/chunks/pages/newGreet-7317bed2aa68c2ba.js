(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[594],{54366:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/newGreet",function(){return n(73816)}])},73816:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return X}});var a=n(34051),r=n.n(a),i=n(85893),s=n(41664),o=n(3857),u=n(38090),l=n(19236),d=n(54685),p=n(74459),c=n(20966),y=n(86462),m=n(67841),f=n(95117),h=n(66137),b=n(49737),g=n(49834),x=n(39954),T=n(26102),v=n(44765),w=n(22167),j=n(29355),C=n(74922),k=n(8193),A=n(47516),M=n(67294),S=n(34766),P=n.n(S),U=n(83078),_=JSON.parse('{"Mt":[{"inputs":[{"internalType":"address","name":"_greetUserContractAddress","type":"address"},{"internalType":"address","name":"_trustedForwarder","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"timestamp","type":"uint256"},{"indexed":true,"internalType":"address","name":"creator","type":"address"},{"indexed":false,"internalType":"string","name":"uri","type":"string"}],"name":"GreetCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256[]","name":"ids","type":"uint256[]"},{"indexed":false,"internalType":"uint256[]","name":"values","type":"uint256[]"}],"name":"TransferBatch","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"TransferSingle","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"value","type":"string"},{"indexed":true,"internalType":"uint256","name":"id","type":"uint256"}],"name":"URI","type":"event"},{"inputs":[],"name":"admin","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"id","type":"uint256"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"accounts","type":"address[]"},{"internalType":"uint256[]","name":"ids","type":"uint256[]"}],"name":"balanceOfBatch","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256[]","name":"ids","type":"uint256[]"},{"internalType":"uint256[]","name":"values","type":"uint256[]"}],"name":"burnBatch","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"greetCreators","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"greetUserContractAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"forwarder","type":"address"}],"name":"isTrustedForwarder","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"string","name":"_tokenUri","type":"string"}],"name":"mint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"mintedTimestamp","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256[]","name":"ids","type":"uint256[]"},{"internalType":"uint256[]","name":"amounts","type":"uint256[]"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"safeBatchTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"setGreetUserContractAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"string","name":"_tokenURI","type":"string"}],"name":"setTokenUri","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_trustedForwarder","type":"address"}],"name":"setTrustedForwarder","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"trustedForwarder","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"uri","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"versionRecipient","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"}]}'),I=n(48444),O=n(77216),D=n(31304),z=n.n(D),E=n(52402),F=n(11466);function Z(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}function N(e,t,n,a,r,i,s){try{var o=e[i](s),u=o.value}catch(l){return void n(l)}o.done?t(u):Promise.resolve(u).then(a,r)}function R(e){return function(){var t=this,n=arguments;return new Promise((function(a,r){var i=e.apply(t,n);function s(e){N(i,a,r,s,o,"next",e)}function o(e){N(i,a,r,s,o,"throw",e)}s(void 0)}))}}function G(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function K(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},a=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(a=a.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),a.forEach((function(t){G(e,t,n[t])}))}return e}function B(e){return function(e){if(Array.isArray(e))return Z(e)}(e)||function(e){if("undefined"!==typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"===typeof e)return Z(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return Z(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}new(P())({accessKeyId:"Dq0ZpApBahokC9ay18xsfA==",secretAccessKey:"9skXksR4oooCeTrYrLI48oe0tKV80hihipE4mje5Km4=",region:"us-east-1",endpoint:"https://storageapi.fleek.co",s3ForcePathStyle:!0});var L={apiKey:"Dq0ZpApBahokC9ay18xsfA==",apiSecret:"9skXksR4oooCeTrYrLI48oe0tKV80hihipE4mje5Km4="},H=function(e){return new Promise((function(t,n){var a=new FileReader;a.readAsDataURL(e),a.onload=function(){return t(a.result)},a.onerror=function(e){return n(e)}}))},V=function(){var e=R(r().mark((function e(t){return r().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,O.upload)(K({},L,{key:"mediaFile/".concat((new Date).getTime().toString()).concat(z()(t.name,{remove:/"<>#%\{\}\|\\\^~\[\]`;\?:@=&/g}).toLowerCase()),data:t,httpUploadProgressCallback:function(e){var n=Math.round(e.loaded/e.total*100);(0,C.wD)({id:"uploading",message:"".concat(t.name," uploaded ").concat(n,"%")})}})));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),X=function(){var e=(0,o.rZ)(),t=(0,j.n)().width,n=(0,M.useState)(""),a=n[0],S=n[1],P=(0,M.useState)([]),D=(P[0],P[1]),z=(0,M.useState)(!1),Z=z[0],N=z[1],G=(0,M.useState)([]),X=G[0],q=G[1],J=(0,M.useState)(""),Y=(J[0],J[1]),$=(0,U.Nr)(),Q=$.web3,W=$.Moralis,ee=$.user,te=($.isAuthenticated,$.isAuthenticating,W.web3Library),ne=(0,U.Ab)().account,ae=(0,M.useState)(!1),re=(ae[0],ae[1]),ie=(0,M.useState)(!1),se=ie[0],oe=ie[1],ue=(0,M.useState)(""),le=ue[0],de=ue[1],pe=(0,E.Z)(I.i.j,_.Mt),ce=(0,U.Oc)("NewUser",(function(e){return e.equalTo("userAddress",null===ee||void 0===ee?void 0:ee.get("ethAddress")).limit(1)}),[null===ee||void 0===ee?void 0:ee.get("ethAddress")]),ye=ce.data,me=(ce.error,ce.isLoading),fe=ce.isFetching,he=(ce.fetch,(0,M.useMemo)((function(){return t<=e.breakpoints.sm?"100px":"160px"}),[t,e.breakpoints.sm])),be=function(){var e=R(r().mark((function e(){var t,n,s,o,u,l,d,p,c;return r().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a||0!==X.length){e.next=4;break}return(0,C.yK)("empty"),(0,C.c0)({id:"empty",title:"Error",message:"Please upload image or fill the content",autoClose:2500,disallowClose:!0,color:"red",icon:(0,i.jsx)(A.Cw1,{size:"100%"})}),e.abrupt("return");case 4:if(!(X.length>0)){e.next=9;break}return e.next=8,ge();case 8:t=e.sent;case 9:return n=!me&&!fe&&ye[0].get("userName"),s={creatorName:n,creatorAddress:ne||"",images:t,text:a},o="",e.prev=12,(0,C.c0)({id:"uploadingMetaData",title:"Uploading Greet metadata...",message:"",autoClose:!1,disallowClose:!0,loading:!0}),e.next=16,(0,O.upload)(K({},L,{key:"metadata/".concat(n,"_").concat((new Date).getTime().toString(),".json"),data:JSON.stringify(s),httpUploadProgressCallback:function(e){(0,C.wD)({id:"uploadingMetaData",loading:!0,message:"Greet uploaded: ".concat(Math.round(e.loaded/e.total*100),"%")})}}));case 16:u=e.sent,Y(u.publicUrl),o=u.publicUrl,(0,C.wD)({id:"uploadingMetaData",loading:!1,message:"Greet uploaded",autoClose:2e3}),e.next=25;break;case 22:e.prev=22,e.t0=e.catch(12),(0,C.c0)({id:"metadataError",title:"Error",message:"Upload failed, please try again",autoClose:2500,disallowClose:!0,color:"red",icon:(0,i.jsx)(A.Cw1,{size:"100%"})});case 25:return l=new F.CH(I.i.j,_.Mt,null===Q||void 0===Q?void 0:Q.getSigner()),e.next=28,null===Q||void 0===Q?void 0:Q.getGasPrice();case 28:if(d=e.sent,p=te.utils.hexlify((null===d||void 0===d?void 0:d.mul(120).div(100))||0),e.prev=30,!(pe.ready&&pe.contract&&ne)){e.next=41;break}return oe(!0),e.next=35,l.mint(1,o,{gasLimit:te.utils.hexlify(5e5),gasPrice:p});case 35:return c=e.sent,de(c.hash),e.next=39,c.wait();case 39:oe(!1),(0,C.c0)({title:"Success",message:"Greet Posted",autoClose:2500,disallowClose:!0,color:"green"});case 41:e.next=47;break;case 43:e.prev=43,e.t1=e.catch(30),oe(!1),(0,C.c0)({title:"Error",message:"Create Greet failed, please try again",autoClose:2500,disallowClose:!0,color:"red",icon:(0,i.jsx)(A.Cw1,{size:"100%"})});case 47:case"end":return e.stop()}}),e,null,[[12,22],[30,43]])})));return function(){return e.apply(this,arguments)}}(),ge=function(){var e=R(r().mark((function e(){var t,n;return r().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,N(!0),(0,C.c0)({id:"uploading",title:"Uploading...",message:"",autoClose:!1,disallowClose:!0,loading:!0}),e.next=5,Promise.all(X.map((function(e){return V(e.file)})));case 5:return t=e.sent,(0,C.wD)({id:"uploading",loading:!1,message:"All file uploaded",autoClose:2e3}),N(!1),n=t.map((function(e){return{URI:e.publicUrl,IpfsHash:e.hashV0}})),D(t.map((function(e){return{URI:e.publicUrl,IpfsHash:e.hashV0}}))),e.abrupt("return",new Promise((function(e){e(n)})));case 13:e.prev=13,e.t0=e.catch(0),(0,C.yK)("uploading"),(0,C.c0)({id:"error",title:"Error",message:"Upload failed, please try again",autoClose:2500,disallowClose:!0,color:"red",icon:(0,i.jsx)(A.Cw1,{size:"100%"})});case 17:case"end":return e.stop()}}),e,null,[[0,13]])})));return function(){return e.apply(this,arguments)}}();return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(u.u,{opened:se,title:(0,i.jsx)(l.D,{order:3,children:"Creating New Greet"}),centered:!0,size:"lg",withCloseButton:!0,onClose:function(){return!se&&re(!1)},children:(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(l.D,{order:4,children:"Transaction Hash :"}),(0,i.jsx)(d.e,{href:"https://mumbai.polygonscan.com/tx/".concat(le),target:"_blank",rel:"noreferrer",children:le}),(0,i.jsx)(p.x,{mt:"sm",children:se&&(0,i.jsx)(c.a,{})})]})}),(0,i.jsxs)(y.Z,{p:"lg",style:{backgroundColor:"dark"===e.colorScheme?e.colors.dark[9]:e.white,border:"1px solid",borderColor:e.colors.gray[7],height:"100%"},children:[(0,i.jsx)(l.D,{order:2,mb:"sm",children:"Publish a Greet"}),(0,i.jsx)(s.default,{href:"/",passHref:!0,children:(0,i.jsx)(m.z,{variant:"outline",children:"Back"})}),(0,i.jsxs)(f.x,{my:"sm",weight:"bold",children:["Add images ",X.length,"/100"]}),(0,i.jsxs)(h.Z,{mt:"sm",children:[X.map((function(e,t){return(0,i.jsxs)(p.x,{sx:{width:he,height:he},style:{position:"relative"},children:[(0,i.jsx)(b.f,{visible:Z}),(0,i.jsx)(h.Z,{position:"right",children:(0,i.jsx)(g.A,{color:"red",size:"lg",radius:"xl",variant:"filled",disabled:Z,style:{position:"absolute",zIndex:1},onClick:function(){q(X.filter((function(t){return t!=e})))},children:(0,i.jsx)(k.oHP,{size:"50%"})})}),(0,i.jsx)(x.E,{src:e.image,alt:"image",width:he,height:he,sx:{display:"block"}}),(0,i.jsx)(f.x,{size:"sm",style:{width:he,overflow:"hidden",textOverflow:"ellipsis"},children:e.file.name})]},t)})),(0,i.jsxs)(v.fh,{onDrop:function(){var e=R(r().mark((function e(t){var n,a;return r().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Promise.all(t.map((function(e){return H(e)})));case 2:n=e.sent,a=t.map((function(e,t){return{file:e,image:n[t]}})),q((function(e){return B(e).concat(B(a))}));case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),onReject:function(e){return console.log("rejected files",e)},accept:B(w.d1),disabled:Z,style:{width:he,height:he,display:"flex",justifyContent:"center"},children:[(0,i.jsx)(v.fh.Idle,{children:(0,i.jsx)(h.Z,{children:(0,i.jsx)(p.x,{children:(0,i.jsx)(A.Zw4,{size:"100%"})})})}),(0,i.jsx)(v.fh.Accept,{children:(0,i.jsx)(h.Z,{children:(0,i.jsx)(p.x,{children:(0,i.jsx)(A.Zw4,{size:"100%",color:e.colors.green[9]})})})}),(0,i.jsx)(v.fh.Reject,{children:(0,i.jsx)(h.Z,{children:(0,i.jsx)(p.x,{children:(0,i.jsx)(A.Zw4,{size:"100%",color:e.colors.red[9]})})})})]})]}),(0,i.jsx)(p.x,{mt:"lg",children:(0,i.jsx)(T.g,{placeholder:"Please Enter Text",label:"Content",autosize:!0,minRows:8,variant:"default",onChange:function(e){return S(e.target.value)},pt:"xl"})}),(0,i.jsx)(h.Z,{mt:"40px",position:"center",style:{position:"relative"},children:(0,i.jsx)(m.z,{size:"lg",onClick:be,loading:Z||se,children:"Publish"})})]})]})}},28022:function(){}},function(e){e.O(0,[617,586,464,48,96,557,774,888,179],(function(){return t=54366,e(e.s=t);var t}));var t=e.O();_N_E=t}]);