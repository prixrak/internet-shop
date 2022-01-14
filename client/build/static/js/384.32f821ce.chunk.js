"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[384],{7384:function(e,t,n){n.r(t);var i=n(5861),r=n(885),c=n(7757),s=n.n(c),a=n(2791),d=n(7022),o=n(9743),u=n(2677),h=n(2592),x=n(9140),l=n(3360),A=n(2469),m=n(2926),z=n(4712),f=n(6871),P=n(7469),W=n(2300),C=n(32),j=n(184),L=(0,C.Pi)((function(){var e=(0,a.useState)({info:[]}),t=(0,r.Z)(e,2),n=t[0],c=t[1],C=(0,f.UO)().id,L=(0,a.useContext)(P._),v=L.userStore,D=L.basketStore,g=(0,a.useState)({show:!1,message:""}),Z=(0,r.Z)(g,2),p=Z[0],J=Z[1],M=(0,a.useCallback)((function(){(0,W.YT)(null,null,null,-1).then((function(e){D.setTotalCount(e.count),D.setDevices(e.rows)}))}),[]);return(0,a.useEffect)((function(){(0,z.u_)(C).then((function(e){return c(e)})),v.currentUser&&M()}),[]),(0,j.jsxs)(d.Z,{className:"mt-3",style:{position:"relative"},children:[(0,j.jsxs)(o.Z,{children:[(0,j.jsx)(u.Z,{md:4,children:(0,j.jsx)(h.Z,{width:300,height:300,src:"http://localhost:5000/"+n.img})}),(0,j.jsx)(u.Z,{md:4,children:(0,j.jsxs)(o.Z,{className:"d-flex flex-column align-items-center",children:[(0,j.jsx)("h2",{children:n.name}),(0,j.jsx)("div",{className:"d-flex align-items-center justify-content-center",style:{background:"url(".concat(m,") no-repeat center center"),width:240,height:240,backgroundSize:"cover",fontSize:64},children:n.rating})]})}),(0,j.jsx)(u.Z,{md:4,children:(0,j.jsxs)(x.Z,{className:"d-flex flex-column align-items-center justify-content-around",style:{width:300,height:300,fontSize:32,border:"5px solid lightgray"},children:[(0,j.jsxs)("h3",{children:["\u0412\u0456\u0434: ",n.price," \u0433\u0440\u043d."]}),D.devices.some((function(e){return(null===e||void 0===e?void 0:e.id)===n.id}))?(0,j.jsx)(l.Z,{variant:"outline-dark",onClick:function(){var e=(0,i.Z)(s().mark((function e(t){return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,W.WC)({userId:v.currentUser.id,deviceId:n.id});case 2:M();case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),children:"\u0412\u0438\u0434\u0430\u043b\u0438\u0442\u0438 \u0437 \u043a\u043e\u0448\u0438\u043a\u0443"}):(0,j.jsx)(l.Z,{variant:"outline-dark",onClick:function(){var e=(0,i.Z)(s().mark((function e(t){return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!v.currentUser){e.next=6;break}return e.next=3,(0,W.kK)({userId:v.currentUser.id,deviceId:n.id});case 3:M(),e.next=7;break;case 6:!0!==p.show&&(J({show:!0,message:"\u0429\u043e\u0431 \u0434\u043e\u0434\u0430\u0442\u0438 \u0440\u0456\u0447 \u0443 \u043a\u043e\u0448\u0438\u043a - \u0430\u0432\u0442\u043e\u0440\u0438\u0437\u0443\u0439\u0442\u0435\u0441\u044c."}),setTimeout((function(){J({show:!1,message:""})}),2e3));case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),children:"\u0414\u043e\u0434\u0430\u0442\u0438 \u0443 \u043a\u043e\u0448\u0438\u043a"}),p.show&&(0,j.jsx)(A.Z,{variant:"danger",className:"mt-2 alertCustom tinyAlert",children:p.message})]})})]}),(0,j.jsxs)(o.Z,{className:"d-flex flex-column m-3",children:[(0,j.jsx)("h1",{children:"\u0425\u0430\u0440\u0430\u043a\u0442\u0435\u0440\u0438\u0441\u0442\u0438\u043a\u0438"}),n.info.map((function(e,t){return(0,j.jsxs)(o.Z,{style:{background:t%2===0?"lightgray":"transparent",padding:10},children:[e.title,": ",e.description]},e.id)}))]})]})}));t.default=L},2926:function(e){e.exports="data:image/png;base64,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"}}]);
//# sourceMappingURL=384.32f821ce.chunk.js.map