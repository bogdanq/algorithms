(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{15:function(t,e,n){t.exports=n(23)},22:function(t,e,n){},23:function(t,e,n){"use strict";n.r(e);var r=n(1),i=n.n(r),o=n(13),u=n.n(o),a=n(11),c=n(2),s=n(0),f=35,l=window.innerWidth,h=window.innerHeight,d=.5,v={borderColor:"#000",blockColor:"#8080805c",startEndColor:["green","red"]},b={START_POSITION:"START_POSITION",END_POSITION:"END_POSITION",BARIER:"BARIER",EMPTY:"EMPTY",VISITED:"VISITED"};function p(t,e){return{w:Math.floor(t/f),h:Math.floor(e/f)}}function g(t,e){return{w:Math.floor(t*f),h:Math.floor(e*f)}}function m(t){var e=Object(c.a)(t,2),n=e[0],r=e[1];return[n*f,r*f]}function O(t){var e=t.color,n=void 0===e?"rgb(152, 251, 152)":e,r=t.position,i=t.context,o=m(r),u=Object(c.a)(o,2),a=u[0],s=u[1],l=f-2*d;i.fillStyle=n,i.fillRect(a+2*d,s+2*d,l,l)}function E(t){var e=Object(c.a)(t,2),n=e[0];return e[1]*p(l,h).w+n}function w(t){var e=p(l,h).w,n=Math.floor(t/e);return[t-n*e,n]}var S=n(4),j=n(5),T=new(function(){function t(){Object(S.a)(this,t),this.isMouseDown=!1,this.isMouseMove=!1,this.listeners=[],this.state={},this.lastIndex=null}return Object(j.a)(t,[{key:"registerClickEventToCanvas",value:function(t){var e=this;t.addEventListener("mousedown",function(t){e.listeners.filter(function(t){return"mousedown"===t.type}).forEach(function(t){return t.eventListener()}),e.isMouseDown=!0,e.isMouseMove=!1}),t.addEventListener("mouseup",function(t){e.isMouseDown=!1,e.listeners.filter(function(t){return"mouseup"===t.type}).forEach(function(n){return n.eventListener(t,e.state)})}),t.addEventListener("click",function(t){e.listeners.filter(function(t){return"click"===t.type}).forEach(function(n){e.isMouseMove||n.eventListener(t,e.state)})}),t.addEventListener("mousemove",function(t){var n=function(t){var e=p(t.clientX,t.clientY);return E([e.w,e.h])}(t);e.isMouseDown&&n!==e.lastIndex&&(e.lastIndex=n,e.isMouseMove=!0,e.listeners.filter(function(t){return"mousemove"===t.type}).forEach(function(n){return n.eventListener(t,e.state,e.lastIndex)}))})}},{key:"addMouseDownEvent",value:function(t){this.listeners.push({type:"mousedown",eventListener:t})}},{key:"addMouseUpEvent",value:function(t){this.listeners.push({type:"mouseup",eventListener:t})}},{key:"addMouseMoveEvent",value:function(t){this.listeners.push({type:"mousemove",eventListener:t})}},{key:"addMouseClickEvent",value:function(t){this.listeners.push({type:"click",eventListener:t})}},{key:"setState",value:function(t){return this.state=t,this}}]),t}()),y=n(7),k=n(3),P=new(function(){function t(e){var n=e.w,r=e.h;Object(S.a)(this,t),this.graph={},this.cellCount=n*r,this.lastIndex=null}return Object(j.a)(t,[{key:"createGraph",value:function(){for(var t=0;t<this.cellCount;t++)this.graph[t]={type:b.EMPTY,siblings:[this.getLeftSibling(t),this.getTopSibling(t),this.getRightSibling(t),this.getDownSibling(t)].filter(function(t){return"undefined"!==typeof t})};return this}},{key:"getVertexByIndex",value:function(t){return this.graph[t]}},{key:"updateGraph",value:function(t){var e=t.index,n=t.type;this.graph[e]&&(this.graph[e]=Object(y.a)({},this.graph[e],{type:n}),n===b.BARIER&&(this.graph[e]=Object(y.a)({},this.graph[e],{type:n,siblings:[]})))}},{key:"getDownSibling",value:function(t){var e=p(l,h),n=e.w,r=e.h;if(Math.floor(t/n)<r-1)return t+n}},{key:"getTopSibling",value:function(t){var e=p(l,h).w;if(Math.floor(t/e)>0)return t-e}},{key:"getRightSibling",value:function(t){var e=p(l,h).w;if(t%e<e-1)return t+1}},{key:"getLeftSibling",value:function(t){if(t%p(l,h).w>0)return t-1}},{key:"getGraph",value:function(){return this.graph}},{key:"clear",value:function(){return this.graph={},this}}]),t}())(p(l,h)),I=Object(s.e)(),M=Object(s.e)(),R=Object(s.e)(),A=Object(s.e)(),C=Object(s.e)(),x=Object(s.e)(),L=Object(s.e)(),N=Object(s.f)([0,110]),V=Object(s.f)([]);V.on(A,function(t,e){return t.includes(e)?t:[].concat(Object(k.a)(t),[e])}).on(C,function(t,e){return t.filter(function(t){return t!==e})}).reset(I),N.on(x,function(t,e){return[e,t[1]]}).on(L,function(t,e){return[t[0],e]}).reset(I);var D=Object(s.b)({barrier:V,startEndPosition:N}).map(function(t){P.clear();var e=Object(c.a)(t.startEndPosition,2),n=e[0],r=e[1],i=P.createGraph();return function(t,e){e.forEach(function(e){t.updateGraph({index:e,type:b.BARIER})})}(i,t.barrier),function(t,e){t.updateGraph({index:e,type:b.START_POSITION})}(i,n),function(t,e){t.updateGraph({index:e,type:b.END_POSITION})}(i,r),Object(y.a)({},t,{graph:i.graph})});function $(t,e,n){for(var r=[],i=n[t];i&&i!==e;)r.unshift(i),i=n[i];return r.length>0&&r.push(t),r.unshift(e),r}D.watch(M);var B=Object(s.d)(),G=Object(s.e)(),_=Object(s.e)(),F=Object(s.e)(),Y=Object(s.e)(),U=B.store(!1).on(Y,function(){return!0}),H=Object(s.m)(G,"bredth first search"),W=B.store([]).on(F,function(t,e){return[].concat(Object(k.a)(t),[e])}),X=B.store(0).on(_,function(t){return t+1});B.onCreateStore(function(t){return t.reset(M,I)});var J=Object(s.b)({isValidEndProcess:U,traversedVertices:W,numberOfPasses:X});G.watch(M);var q=Object(s.f)([{searchFunction:function(t,e,n){for(var r=!0,i=[t],o=new Map([[t,!0]]),u={};r&&i.length>0;){_(),F(i.map(function(t){return t}));for(var a=i.shift(),c=0;c<n[a].siblings.length;c++){var s=n[a].siblings[c],f=P.getVertexByIndex(s);if(!o.has(s)&&z(f)&&(i.push(s),o.set(s,!0),u[s]=a),s===e){r=!1;break}}}return Y(),$(e,t,u)},name:"bredth first search"},{searchFunction:function(t,e,n){for(var r=!0,i=[t],o=new Map([[t,!0]]),u={};r&&i.length>0;){_(),F(i.map(function(t){return t}));for(var a=i.shift(),c=0;c<n[a].siblings.length;c++){var s=n[a].siblings[c],f=P.getVertexByIndex(s);if(!o.has(s)&&z(f)&&(i.unshift(s),o.set(s,!0),u[s]=a),s===e){r=!1;break}}}return Y(),$(e,t,u)},name:"depth first search"}]),z=function(t){return t.type!==b.BARIER},K=Object(s.b)(H,q,function(t,e){return e.find(function(e){return e.name===t})}),Q={START:"START",PAUSE:"PAUSE",STOP:"STOP",CLEAR:"CLEAR",RESTART:"RESTART",CLEAR_PATH:"CLEAR_PATH"},Z=Object(s.e)(),tt=Object(s.f)([]).reset(I,M),et=Object(s.m)(Z,{ref:Q.STOP}).reset(I),nt=et.map(function(t){return t.ref===Q.START}),rt=et.map(function(t){return t.ref===Q.CLEAR}),it=Object(s.i)({source:et,filter:nt}),ot=Object(s.i)({source:et,filter:rt});Object(s.h)({from:ot,to:I}),Object(s.n)({source:{graph:D,algoritm:K},clock:it,target:tt,fn:function(t){var e=t.graph,n=t.algoritm,r=Object(c.a)(e.startEndPosition,2),i=r[0],o=r[1];return M(),n.searchFunction(i,o,e.graph)}});Object(s.b)(nt,D);function ut(t,e){for(var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:v.blockColor,r=0;r<t.length;r++){var i=w(t[r]),o=Object(c.a)(i,2);O({position:[o[0],o[1]],context:e,color:n})}}function at(t,e){var n=p(t.clientX,t.clientY),r=E([n.w,n.h]),i=Object(c.a)(e.startEndPosition,2),o=i[0],u=i[1];return{renderForMove:function(){r!==o&&r!==u&&A(r)},renderForClick:function(){r!==o&&r!==u&&C(r)}}}var ct=null;function st(t){var e=p(t.clientX,t.clientY),n=E([e.w,e.h]),r=D.getState();switch(ct||(ct=r.graph[n].type),ct){case b.BARIER:return at(t,r).renderForClick();case b.START_POSITION:return function(t,e){var n=e.barrier.includes(t),r=Object(c.a)(e.startEndPosition,2)[1];n||t===r||x(t)}(n,r);case b.END_POSITION:return function(t,e,n){var r=e.barrier.includes(t),i=Object(c.a)(e.startEndPosition,1)[0];r||t===i||L(t)}(n,r);case b.EMPTY:return at(t,r).renderForMove()}}var ft=null;var lt=document.getElementById("viewport");if(lt){var ht=lt.getContext("2d");!function(t,e){var n=p(l,h),r=g(n.w,n.h),i=function(t){for(var e=new Path2D,n=p(l,h),r=g(n.w,n.h),i=0;i<=n.w;i++)e.moveTo(i*f+d,0),e.lineTo(i*f+d,r.h);for(var o=0;o<=n.h;o++)e.moveTo(0,o*f+d),e.lineTo(r.w,o*f+d);return{grid:e,applyStyles:function(){t.lineWidth=d,t.strokeStyle=v.borderColor}}}(e);function o(n){!function(t,e){t.clearRect(0,0,e.width,e.height)}(e,t),T.setState(n),function(t,e){for(var n=0;n<t.length;n++)O({position:w(t[n]),context:e,color:v.startEndColor[n]})}(n.startEndPosition,e),ut(n.barrier,e),i.applyStyles(),e.stroke(i.grid)}function u(t,n,r){if(r<n){ut(t[r],e,"#ffff0061");var i=requestAnimationFrame(function(){return u(t,n,r)});M.watch(function(){return cancelAnimationFrame(i)}),r++}else!function(t){for(var e=t.context,n=t.path,r=void 0===n?[]:n,i=t.color,o=void 0===i?"blue":i,u=0;u<r.length;u++){var a=w(r[u]),s=m(a),l=Object(c.a)(s,2),h=l[0],d=l[1];ft&&(e.beginPath(),e.strokeStyle=o,e.lineWidth=2,e.moveTo(ft[0],ft[1]),e.lineTo(h+f/2,d+f/2),e.stroke()),ft=[h+f/2,d+f/2]}ft=null}({path:tt.getState(),context:e})}!function(t,e){var n=e.w,r=e.h;t.height=r,t.width=n}(t,r),T.registerClickEventToCanvas(t),T.addMouseMoveEvent(function(t,e){return st(t)}),T.addMouseUpEvent(function(){return ct=null}),T.addMouseClickEvent(function(t,e){return at(t,e).renderForClick()}),D.watch(o),Object(s.n)({source:D,clock:Object(s.l)([I,M])}).watch(o),J.watch(function(t){var e=t.isValidEndProcess,n=t.traversedVertices,r=t.numberOfPasses;e&&function(t,e){u(t,e,0)}(n,r)})}(lt,ht)}n(22);function dt(){var t=Object(a.a)(q),e=Object(a.a)(H);return i.a.createElement("div",{className:"App"},i.a.createElement("div",{className:"select-bar"},i.a.createElement("h2",{className:"select-bar_title"},"Select algoritm"),i.a.createElement("ul",null,t.map(function(t,n){return i.a.createElement("li",{onClick:function(){return G(t.name)},className:e===t.name?"isActive":"",key:t.name},t.name)})),i.a.createElement("div",{className:"btn-wrapper"},i.a.createElement("button",{className:"btn",onClick:function(){return Z({ref:Q.START})}},"start"),i.a.createElement("button",{className:"btn",onClick:M},"reset"),i.a.createElement("button",{className:"btn",onClick:function(){return Z({ref:Q.CLEAR})}},"clear"))))}n.d(e,"resetStore",function(){return I}),n.d(e,"resetPath",function(){return M}),n.d(e,"setGraph",function(){return R}),n.d(e,"setBarrier",function(){return A}),n.d(e,"removeBarrierItem",function(){return C}),n.d(e,"triggerStartPosition",function(){return x}),n.d(e,"triggerEndPosition",function(){return L}),n.d(e,"$startEndPosition",function(){return N}),n.d(e,"$barrier",function(){return V}),n.d(e,"$graph",function(){return D}),n.d(e,"gameStatus",function(){return Q}),n.d(e,"setGameStatus",function(){return Z}),n.d(e,"$path",function(){return tt}),n.d(e,"$gameState",function(){return et}),n.d(e,"$isValidGameState",function(){return nt}),n.d(e,"$clearGameState",function(){return rt}),n.d(e,"startGame",function(){return it}),n.d(e,"selectAlgoritm",function(){return G}),n.d(e,"incrementStep",function(){return _}),n.d(e,"setVertices",function(){return F}),n.d(e,"endProcess",function(){return Y}),n.d(e,"$isValidEndProcess",function(){return U}),n.d(e,"$currentAlgoritm",function(){return H}),n.d(e,"$traversedVertices",function(){return W}),n.d(e,"$numberOfPasses",function(){return X}),n.d(e,"$algoritState",function(){return J}),n.d(e,"$algoritms",function(){return q}),n.d(e,"canVisitedVertex",function(){return z}),n.d(e,"$searchAlgoritm",function(){return K});var vt=document.getElementById("root");u.a.render(i.a.createElement(dt,null),vt)}},[[15,1,2]]]);
//# sourceMappingURL=main.b1d15171.chunk.js.map