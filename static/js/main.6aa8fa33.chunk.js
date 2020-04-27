(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{16:function(t,e,n){t.exports=n(24)},23:function(t,e,n){},24:function(t,e,n){"use strict";n.r(e);var r=n(1),i=n.n(r),o=n(13),a=n.n(o),u=n(9),c=n(15),s=n(2),l=n(0),f=35,h=window.innerWidth,d=window.innerHeight,v=.5,m={borderColor:"#000",blockColor:"#8080805c",startEndColor:["green","red"]},b={START_POSITION:"START_POSITION",END_POSITION:"END_POSITION",BARIER:"BARIER",EMPTY:"EMPTY",VISITED:"VISITED"};function p(t,e){return{w:Math.floor(t/f),h:Math.floor(e/f)}}function g(t,e){return{w:Math.floor(t*f),h:Math.floor(e*f)}}function E(t){var e=Object(s.a)(t,2),n=e[0],r=e[1];return[n*f,r*f]}function O(t){var e=t.color,n=void 0===e?"rgb(152, 251, 152)":e,r=t.position,i=t.context,o=E(r),a=Object(s.a)(o,2),u=a[0],c=a[1],l=f-2*v;i.fillStyle=n,i.fillRect(u+2*v,c+2*v,l,l)}function S(t){var e=Object(s.a)(t,2),n=e[0];return e[1]*p(h,d).w+n}function w(t){var e=p(h,d).w,n=Math.floor(t/e);return[t-n*e,n]}var A=n(4),y=n(5),T=n(7),k=new(function(){function t(e){var n=e.w,r=e.h;Object(A.a)(this,t),this.graph={},this.cellCount=n*r,this.lastIndex=null}return Object(y.a)(t,[{key:"createGraph",value:function(){this.clear();for(var t=0;t<this.cellCount;t++)this.graph[t]={type:b.EMPTY,siblings:[this.getLeftSibling(t),this.getTopSibling(t),this.getRightSibling(t),this.getDownSibling(t)].filter(function(t){return"undefined"!==typeof t})};return this}},{key:"getVertexByIndex",value:function(t){return this.graph[t]}},{key:"updateGraph",value:function(t){var e=t.index,n=t.type;this.graph[e]&&(this.graph[e]=Object(T.a)({},this.graph[e],{type:n}),n===b.BARIER&&(this.graph[e]=Object(T.a)({},this.graph[e],{type:n,siblings:[]})))}},{key:"getDownSibling",value:function(t){var e=p(h,d),n=e.w,r=e.h;if(Math.floor(t/n)<r-1)return t+n}},{key:"getTopSibling",value:function(t){var e=p(h,d).w;if(Math.floor(t/e)>0)return t-e}},{key:"getRightSibling",value:function(t){var e=p(h,d).w;if(t%e<e-1)return t+1}},{key:"getLeftSibling",value:function(t){if(t%p(h,d).w>0)return t-1}},{key:"getGraph",value:function(){return this.graph}},{key:"clear",value:function(){return this.graph={},this}}]),t}())(p(h,d)),M=n(3);function j(t,e){e.forEach(function(e){t.updateGraph({index:e,type:b.BARIER})})}function I(t,e){t.updateGraph({index:e,type:b.START_POSITION})}function R(t,e){t.updateGraph({index:e,type:b.END_POSITION})}var x=Object(l.d)("graph"),C=x.event(),P=x.event(),D=x.event(),N=x.event(),L=x.event(),G=x.event(),_=x.store([0,110]),V=x.store([]);x.onCreateStore(function(t){return t.reset(C)}),V.on(D,function(t,e){return t.includes(e)?t:[].concat(Object(M.a)(t),[e])}).on(N,function(t,e){return t.filter(function(t){return t!==e})}),_.on(L,function(t,e){return[e,t[1]]}).on(G,function(t,e){return[t[0],e]});var F=Object(l.b)({barrier:V,startEndPosition:_}).map(function(t){var e=Object(s.a)(t.startEndPosition,2),n=e[0],r=e[1],i=k.createGraph();return j(i,t.barrier),I(i,n),R(i,r),Object(T.a)({},t,{graph:i.graph})}),B=function(t){return t.type!==b.BARIER};function U(t,e,n){for(var r=[],i=n[t];i&&i!==e;)r.unshift(i),i=n[i];return r.length>0&&r.push(t),r.unshift(e),r}function $(){var t=[];return function(e){var n=e.filter(function(e){return!t.includes(e)});return t.push.apply(t,Object(M.a)(n)),n}}function Y(t,e,n){for(var r=ot(),i=$(),o=0,a=!0,u=[t],c=new Map([[t,!0]]),s={};a&&u.length>0;){r.setVertex(i(u));for(var l=u.shift(),f=0;f<n[l].siblings.length;f++){var h=n[l].siblings[f],d=k.getVertexByIndex(h);if(!c.has(h)&&B(d)&&(u.push(h),c.set(h,!0),s[h]=l,o++),h===e){a=!1;break}}}return r.setDrowAnimated(o),U(e,t,s)}function W(t,e,n){for(var r=ot(),i=$(),o=0,a=!0,u=[t],c=new Map([[t,!0]]),s={};a&&u.length>0;){r.setVertex(i(u));for(var l=u.shift(),f=0;f<n[l].siblings.length;f++){var h=n[l].siblings[f],d=k.getVertexByIndex(h);if(!c.has(h)&&B(d)&&(u.unshift(h),c.set(h,!0),s[h]=l,o++),h===e){a=!1;break}}}return r.setDrowAnimated(o),U(e,t,s)}var X=Object(l.d)(),J=Object(l.e)(),q=Object(l.e)(),H=Object(l.e)(),z=Object(l.e)(),K=Object(l.e)(),Q=X.store(0).on(K,function(t,e){return e}),Z=X.store(!1).on(z,function(){return!0}),tt=Object(l.l)(J,"bredth first search"),et=X.store([]).on(H,function(t,e){return[].concat(Object(M.a)(t),[e])}),nt=X.store(0).on(q,function(t){return t+1}),rt=Object(l.f)([{searchFunction:Y,name:"bredth first search"},{searchFunction:W,name:"depth first search"}]),it=Object(l.b)(tt,rt,function(t,e){return e.find(function(e){return e.name===t})}),ot=function(){return{setDrowAnimated:function(t){z(),K(t)},setVertex:function(t){H(t),q()}}};X.onCreateStore(function(t){return t.reset(P,C)}),J.watch(function(){return ct(at.END_GAME)});var at={START:"START",RESTART:"RESTART",PAUSE:"PAUSE",RESUME:"RESUME",CLEAR:"CLEAR",END_GAME:"END_GAME"},ut=Object(l.d)("game"),ct=ut.event(),st=ut.store([]).reset(C,P),lt=Object(l.l)(ct,at.END_GAME).reset(C),ft=Object(l.h)({source:lt,filter:lt.map(function(t){return t===at.START})});Object(l.h)({source:lt,filter:lt.map(function(t){return t===at.CLEAR}),target:C});var ht=Object(l.h)({source:lt,filter:lt.map(function(t){return t===at.END_GAME})});function dt(t){for(var e=arguments.length,n=new Array(e>1?e-1:0),r=1;r<e;r++)n[r-1]=arguments[r];return n.some(function(e){return t===e})}Object(l.m)({source:{graph:F,algoritm:it},clock:ft,target:st,fn:function(t){var e=t.graph,n=t.algoritm,r=Object(s.a)(e.startEndPosition,2),i=r[0],o=r[1];return P(),n.searchFunction(i,o,e.graph)}});var vt=new(function(){function t(){Object(A.a)(this,t),this.isMouseDown=!1,this.isMouseMove=!1,this.listeners=[],this.state={},this.lastIndex=null,this.disabledListeners=[]}return Object(y.a)(t,[{key:"init",value:function(){var t=this;return lt.watch(function(e){dt(e,at.START,at.PAUSE,at.RESUME)?t.disabledListener():t.includeListener()}),this}},{key:"registerClickEventToCanvas",value:function(t){var e=this;t.addEventListener("mousedown",function(t){e.listeners.filter(function(t){return"mousedown"===t.type}).forEach(function(t){return t.eventListener()}),e.isMouseDown=!0,e.isMouseMove=!1}),t.addEventListener("mouseup",function(t){e.isMouseDown=!1,e.listeners.filter(function(t){return"mouseup"===t.type}).forEach(function(n){return n.eventListener(t,e.state)})}),t.addEventListener("click",function(t){e.listeners.filter(function(t){return"click"===t.type}).forEach(function(n){e.isMouseMove||n.eventListener(t,e.state)})}),t.addEventListener("mousemove",function(t){var n=function(t){var e=p(t.clientX,t.clientY);return S([e.w,e.h])}(t);e.isMouseDown&&n!==e.lastIndex&&(e.lastIndex=n,e.isMouseMove=!0,e.listeners.filter(function(t){return"mousemove"===t.type}).forEach(function(n){return n.eventListener(t,e.state,e.lastIndex)}))})}},{key:"disabledListener",value:function(){this.clear()}},{key:"includeListener",value:function(){this.listeners=this.disabledListeners}},{key:"addMouseDownEvent",value:function(t){this.listeners.push({type:"mousedown",eventListener:t})}},{key:"addMouseUpEvent",value:function(t){this.listeners.push({type:"mouseup",eventListener:t})}},{key:"addMouseMoveEvent",value:function(t){this.listeners.push({type:"mousemove",eventListener:t})}},{key:"addMouseClickEvent",value:function(t){this.listeners.push({type:"click",eventListener:t})}},{key:"setState",value:function(t){return this.state=t,this}},{key:"clear",value:function(){this.listeners.length>0&&(this.disabledListeners=this.listeners,this.isMouseDown=!1,this.isMouseMove=!1,this.listeners=[],this.lastIndex=null)}}]),t}());vt.init();var mt=new(function(){function t(){Object(A.a)(this,t),this.count=0,this.animateId=null}return Object(y.a)(t,[{key:"start",value:function(t,e){var n=this,r=t.traversedVertexes,i=t.vertexesCount,o=lt.getState();o!==at.END_GAME&&(o!==at.PAUSE?this.count<i?(pt(r[this.count],e,"#ffff0061"),this.animateId=requestAnimationFrame(function(){return n.start({traversedVertexes:r,vertexesCount:i},e)}),P.watch(function(){return cancelAnimationFrame(n.animateId)}),this.count++):(ct(at.END_GAME),this.clear(),function(t){for(var e=t.context,n=t.path,r=void 0===n?[]:n,i=t.color,o=void 0===i?"blue":i,a=0;a<r.length;a++){var u=w(r[a]),c=E(u),l=Object(s.a)(c,2),h=l[0],d=l[1];St&&(e.beginPath(),e.strokeStyle=o,e.lineWidth=2,e.moveTo(St[0],St[1]),e.lineTo(h+f/2,d+f/2),e.stroke()),St=[h+f/2,d+f/2]}St=null}({path:st.getState(),context:e})):cancelAnimationFrame(this.animateId))}},{key:"clear",value:function(){cancelAnimationFrame(this.animateId),this.count=0,this.animateId=null}},{key:"removeAnimation",value:function(){cancelAnimationFrame(this.animateId)}}]),t}()),bt=Object(l.b)({canDrowAnimated:Z,traversedVertexes:et,vertexesCount:nt,gameState:lt});function pt(t,e){for(var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:m.blockColor,r=0;r<t.length;r++){var i=w(t[r]),o=Object(s.a)(i,2);O({position:[o[0],o[1]],context:e,color:n})}}function gt(t,e){var n=p(t.clientX,t.clientY),r=S([n.w,n.h]),i=Object(s.a)(e.startEndPosition,2),o=i[0],a=i[1];return{renderForMove:function(){r!==o&&r!==a&&D(r)},renderForClick:function(){r!==o&&r!==a&&N(r)}}}var Et=null;function Ot(t){var e=p(t.clientX,t.clientY),n=S([e.w,e.h]),r=F.getState();switch(Et||(Et=r.graph[n].type),Et){case b.BARIER:return gt(t,r).renderForClick();case b.START_POSITION:return function(t,e){var n=e.barrier.includes(t),r=Object(s.a)(e.startEndPosition,2)[1];n||t===r||L(t)}(n,r);case b.END_POSITION:return function(t,e,n){var r=e.barrier.includes(t),i=Object(s.a)(e.startEndPosition,1)[0];r||t===i||G(t)}(n,r);case b.EMPTY:return gt(t,r).renderForMove()}}var St=null;var wt=document.getElementById("viewport");if(wt){var At=wt.getContext("2d");!function(t,e){var n=p(h,d),r=g(n.w,n.h),i=function(t){for(var e=new Path2D,n=p(h,d),r=g(n.w,n.h),i=0;i<=n.w;i++)e.moveTo(i*f+v,0),e.lineTo(i*f+v,r.h);for(var o=0;o<=n.h;o++)e.moveTo(0,o*f+v),e.lineTo(r.w,o*f+v);return{grid:e,applyStyles:function(){t.lineWidth=v,t.strokeStyle=m.borderColor}}}(e);function o(n){!function(t,e){t.clearRect(0,0,e.width,e.height)}(e,t),vt.setState(n),function(t,e){for(var n=0;n<t.length;n++)O({position:w(t[n]),context:e,color:m.startEndColor[n]})}(n.startEndPosition,e),pt(n.barrier,e),i.applyStyles(),e.stroke(i.grid)}!function(t,e){var n=e.w,r=e.h;t.height=r,t.width=n}(t,r),vt.registerClickEventToCanvas(t),vt.addMouseMoveEvent(function(t,e){return Ot(t)}),vt.addMouseUpEvent(function(){return Et=null}),vt.addMouseClickEvent(function(t,e){return gt(t,e).renderForClick()}),F.watch(o),Object(l.m)({source:F,clock:Object(l.k)([C,P])}).watch(o),bt.watch(function(t){var n=t.canDrowAnimated,r=t.gameState,i=Object(c.a)(t,["canDrowAnimated","gameState"]);n&&(r===at.START&&mt.clear(),mt.removeAnimation(),mt.start(i,e))})}(wt,At)}n(23);var yt=Object(l.f)({});function Tt(){var t,e=Object(u.a)(rt),n=Object(u.a)(tt),r=Object(u.a)(lt),o=Object(u.a)(yt);return i.a.createElement("div",{className:"App"},i.a.createElement("div",{className:"select-bar"},i.a.createElement("h2",{className:"select-bar_title"},"Select algoritm"),i.a.createElement("h3",{className:"select-bar_title"},"\u041a\u043e\u043b\u0438\u0447\u0435\u0441\u0442\u0432\u043e \u0438\u0442\u0435\u0440\u0430\u0446\u0438\u0439: ",(null===o||void 0===o?void 0:o.numberOfIterations)||0),i.a.createElement("h3",{className:"select-bar_title"},"\u0414\u043b\u0438\u043d\u0430 \u043f\u0443\u0442\u0438: ",(null===o||void 0===o?void 0:null===(t=o.path)||void 0===t?void 0:t.length)||0),i.a.createElement("ul",null,e.map(function(t,e){return i.a.createElement("li",{onClick:function(){return J(t.name)},className:n===t.name?"isActive":"",key:t.name},t.name)})),i.a.createElement("div",{className:"btn-wrapper"},i.a.createElement("button",{className:"btn",onClick:function(){return ct(at.START)}},"start"),dt(r,at.START,at.PAUSE,at.RESUME)&&i.a.createElement(i.a.Fragment,null,i.a.createElement("button",{className:"btn",onClick:function(){return ct(at.PAUSE)}},"pause"),i.a.createElement("button",{className:"btn",onClick:function(){return ct(at.RESUME)}},"resume")),i.a.createElement("button",{className:"btn",onClick:function(){return ct(at.CLEAR)}},"clear"))))}Object(l.m)({source:{numberOfIterations:Q,path:st},clock:ht,target:yt}),n.d(e,"selectAlgoritm",function(){return J}),n.d(e,"incrementVertex",function(){return q}),n.d(e,"setVertex",function(){return H}),n.d(e,"setDrowAnimated",function(){return z}),n.d(e,"increment",function(){return K}),n.d(e,"$numberOfIterations",function(){return Q}),n.d(e,"$canDrowAnimated",function(){return Z}),n.d(e,"$currentAlgoritm",function(){return tt}),n.d(e,"$traversedVertexes",function(){return et}),n.d(e,"$vertexesCount",function(){return nt}),n.d(e,"$algoritms",function(){return rt}),n.d(e,"$searchAlgoritm",function(){return it}),n.d(e,"createLogger",function(){return ot}),n.d(e,"canVisitedVertex",function(){return B}),n.d(e,"restorePath",function(){return U}),n.d(e,"removeDoubleVertex",function(){return $}),n.d(e,"breadthFirstSearch",function(){return Y}),n.d(e,"depthFirstSearch",function(){return W}),n.d(e,"graphControll",function(){return k}),n.d(e,"resetStore",function(){return C}),n.d(e,"clearCanvas",function(){return P}),n.d(e,"setBarrier",function(){return D}),n.d(e,"removeBarrierItem",function(){return N}),n.d(e,"triggerStartPosition",function(){return L}),n.d(e,"triggerEndPosition",function(){return G}),n.d(e,"$startEndPosition",function(){return _}),n.d(e,"$barrier",function(){return V}),n.d(e,"$graph",function(){return F}),n.d(e,"setBarrierToGraph",function(){return j}),n.d(e,"setStartPositionToGraph",function(){return I}),n.d(e,"setEndPositionToGraph",function(){return R}),n.d(e,"gameStatus",function(){return at}),n.d(e,"setGameStatus",function(){return ct}),n.d(e,"$path",function(){return st}),n.d(e,"$gameState",function(){return lt}),n.d(e,"startGame",function(){return ft}),n.d(e,"endGame",function(){return ht});var kt=document.getElementById("root");a.a.render(i.a.createElement(Tt,null),kt)}},[[16,1,2]]]);
//# sourceMappingURL=main.6aa8fa33.chunk.js.map