(self.webpackChunkgaucho_website=self.webpackChunkgaucho_website||[]).push([[119],{7757:function(e,t,n){e.exports=n(5666)},2674:function(e,t,n){"use strict";n.d(t,{Z:function(){return u}});var r=n(2122),a=n(7294),o=n(6010),i="features_pzNA",c="featureImage_1bM1",l=[{title:"Remove unnecessary terminals",img:n(8481).Z,description:a.createElement(a.Fragment,null,"With Gaucho you can organize all your day-to-day tasks, scripts and server to run them quickly, no extra annoying terminals."),wide:!0},{title:"Execute commands with one click",img:n(8565).Z,description:a.createElement(a.Fragment,null,"Run and stop your commands, apps and scripts from Gaucho with a single click.")},{title:"Create your tasks",img:n(2536).Z,description:a.createElement(a.Fragment,null,"Easily create and configure your tasks.")}];function s(e){var t=e.img,n=e.title,r=e.description,i=e.wide?"col--12":"col--6";return a.createElement("div",{className:(0,o.Z)("col",i)},a.createElement("div",{className:"text--center padding-horiz--md"},a.createElement("h3",null,n),a.createElement("p",null,r)),a.createElement("div",{className:"text--center"},a.createElement("img",{className:c,alt:n,src:t})))}function u(){return a.createElement("section",{className:i},a.createElement("div",{className:"container"},a.createElement("div",{className:"row"},l.map((function(e,t){return a.createElement(s,(0,r.Z)({key:t},e))})))))}},8123:function(e,t,n){"use strict";function r(e,t,n,r,a,o,i){try{var c=e[o](i),l=c.value}catch(s){return void n(s)}c.done?t(l):Promise.resolve(l).then(r,a)}function a(e){return function(){var t=this,n=arguments;return new Promise((function(a,o){var i=e.apply(t,n);function c(e){r(i,a,o,c,l,"next",e)}function l(e){r(i,a,o,c,l,"throw",e)}c(void 0)}))}}n.r(t),n.d(t,{default:function(){return A}});var o=n(2122),i=n(7757),c=n.n(i),l=n(7294),s=n(6010),u=n(2273),f=n(6742),h=n(2263);n(2674);function m(){return l.createElement("div",{className:"loader"})}var d=function(){return fetch("https://api.github.com/repos/angrykoala/gaucho/releases/latest",{headers:{Accept:"application/vnd.github.v3+json",Authorization:"Basic YW5ncnlrb2FsYTpnaHBfTVNsRGIyV1FSazdkc1FuUTdvd3FPbURsNjFzZXltM2trT1Ru"}})},p="downloadMain_y1IO",v="heroBanner_2lAm",g="bannerTitleContainer_3G87",y="heroBannerSubtitle_b3xC",w="heroBannerTitle_1Ag7",E="downloadTabs_1oSV",b="downloadButtonsList_21qN",x="otherDownloadsList_SCcj",_="downloadButton_1UbS",k=n(9443);var N=function(){var e=(0,l.useContext)(k.Z);if(null==e)throw new Error('"useUserPreferencesContext" is used outside of "Layout" component.');return e},L="tabItem_1uMI",Z="tabItemActive_2DSg";var O=37,S=39;var G=function(e){var t=e.lazy,n=e.block,r=e.defaultValue,a=e.values,o=e.groupId,i=e.className,c=N(),u=c.tabGroupChoices,f=c.setTabGroupChoices,h=(0,l.useState)(r),m=h[0],d=h[1],p=l.Children.toArray(e.children),v=[];if(null!=o){var g=u[o];null!=g&&g!==m&&a.some((function(e){return e.value===g}))&&d(g)}var y=function(e){var t=e.currentTarget,n=v.indexOf(t),r=a[n].value;d(r),null!=o&&(f(o,r),setTimeout((function(){var e,n,r,a,o,i,c,l;(e=t.getBoundingClientRect(),n=e.top,r=e.left,a=e.bottom,o=e.right,i=window,c=i.innerHeight,l=i.innerWidth,n>=0&&o<=l&&a<=c&&r>=0)||(t.scrollIntoView({block:"center",behavior:"smooth"}),t.classList.add(Z),setTimeout((function(){return t.classList.remove(Z)}),2e3))}),150))},w=function(e){var t,n;switch(e.keyCode){case S:var r=v.indexOf(e.target)+1;n=v[r]||v[0];break;case O:var a=v.indexOf(e.target)-1;n=v[a]||v[v.length-1]}null==(t=n)||t.focus()};return l.createElement("div",{className:"tabs-container"},l.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,s.Z)("tabs",{"tabs--block":n},i)},a.map((function(e){var t=e.value,n=e.label;return l.createElement("li",{role:"tab",tabIndex:m===t?0:-1,"aria-selected":m===t,className:(0,s.Z)("tabs__item",L,{"tabs__item--active":m===t}),key:t,ref:function(e){return v.push(e)},onKeyDown:w,onFocus:y,onClick:y},n)}))),t?(0,l.cloneElement)(p.filter((function(e){return e.props.value===m}))[0],{className:"margin-vert--md"}):l.createElement("div",{className:"margin-vert--md"},p.map((function(e,t){return(0,l.cloneElement)(e,{key:t,hidden:e.props.value!==m})}))))};var C=function(e){var t=e.children,n=e.hidden,r=e.className;return l.createElement("div",{role:"tabpanel",hidden:n,className:r},t)};function F(e){var t=e.name,n=e.browser_download_url;return l.createElement("li",null,l.createElement(f.Z,{className:(0,s.Z)("button primary-button button--lg",_),to:n},t))}function T(e){var t=e.linuxAssets,n=e.windowsAssets,r=e.macAssets,a=function(){var e=void 0;return-1!=navigator.appVersion.indexOf("Win")&&(e="windows"),-1!=navigator.appVersion.indexOf("Mac")&&(e="mac"),-1!=navigator.appVersion.indexOf("X11")&&(e="linux"),-1!=navigator.appVersion.indexOf("Linux")&&(e="linux"),e}()||"linux";return l.createElement(G,{defaultValue:a,className:(0,s.Z)(E),values:[{label:"Linux",value:"linux"},{label:"Windows",value:"windows"},{label:"Mac",value:"mac"},{label:"Other",value:"other"}]},l.createElement(C,{value:"linux"},l.createElement("ul",{className:(0,s.Z)(b)},t.map((function(e,t){return l.createElement(F,(0,o.Z)({key:t},e))})))),l.createElement(C,{value:"windows"},l.createElement("ul",{className:(0,s.Z)(b)},n.map((function(e,t){return l.createElement(F,(0,o.Z)({key:t},e))})))),l.createElement(C,{value:"mac"},l.createElement("ul",{className:(0,s.Z)(b)},r.map((function(e,t){return l.createElement(F,(0,o.Z)({key:t},e))})))),l.createElement(C,{value:"other"},l.createElement("ul",{className:(0,s.Z)(x)},l.createElement("li",null,l.createElement("a",{href:"https://snapcraft.io/gaucho",target:"_blank",rel:"noopener noreferrer"},l.createElement("img",{src:"https://snapcraft.io/static/images/badges/en/snap-store-black.svg",alt:"Get it from the Snap Store"}))),l.createElement("li",null,l.createElement("a",{href:"https://www.softpedia.com/get/System/System-Miscellaneous/Gaucho.shtml"},"Softpedia")))))}function j(e){var t=e.version,n=e.downloadCount,r=((0,h.Z)().siteConfig,t?"Version "+t:"");return l.createElement("header",{className:(0,s.Z)("hero hero--primary",v)},l.createElement("div",{className:(0,s.Z)("container",g)},l.createElement("h1",{className:(0,s.Z)("hero__title",w)},"Download"),l.createElement("i",{className:(0,s.Z)("hero__subtitle",y),title:n+" Downloads"},r)))}function A(){var e=(0,l.useState)({}),t=e[0],n=e[1],r=(0,l.useState)(!1),o=r[0],i=r[1],f=(0,l.useState)(!1),v=f[0],g=f[1];(0,l.useEffect)(a(c().mark((function e(){var t,r;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,d();case 2:if(!(t=e.sent).ok){e.next=11;break}return e.next=6,t.json();case 6:r=e.sent,n(r),g(!0),e.next=12;break;case 11:i(!0);case 12:case"end":return e.stop()}}),e)}))),[]);var y=t.assets||[],w=t.tag_name||void 0,E={linuxAssets:y.filter((function(e){return/linux|\.deb|\.snap|\.AppImage|\.rpm/i.test(e.name)})),windowsAssets:y.filter((function(e){return/windows|dos|\.exe/i.test(e.name)})),macAssets:y.filter((function(e){return/mac/i.test(e.name)}))},b=y.map((function(e){return e.download_count||0})).reduce((function(e,t){return e+t}),0),x=(0,h.Z)().siteConfig;return l.createElement(u.Z,{title:x.title+" Download",description:x.tagline},l.createElement(j,{version:w,downloadCount:b}),l.createElement("main",{className:(0,s.Z)(p)},l.createElement("div",{className:"row"},l.createElement("div",{className:(0,s.Z)("col col--6")},!v&&!o&&l.createElement(m,null),o&&l.createElement(l.Fragment,null,l.createElement("p",null,"Error loading versions, click ",l.createElement("a",{href:"https://github.com/angrykoala/gaucho/releases"},"here")," to download Gaucho")),v&&l.createElement(l.Fragment,null,l.createElement("div",{className:"container"},l.createElement(T,E)))),l.createElement("div",{className:(0,s.Z)("col col--6")},l.createElement("p",null,"Gaucho is available for Linux, Windows and Mac."),l.createElement("p",null,"For instructions on how to install and the differences between versions, please check the ",l.createElement("a",{href:"docs/getting-started/installation"},"Installation Guide"),"."),l.createElement("p",null,"If you need a different version, you can compile Gaucho following the instructions at ",l.createElement("a",{href:"docs/advanced-guides/build-from-source"},"Build from source code")," guide."),l.createElement("a",{href:"https://github.com/angrykoala/gaucho/releases"},"Check other releases")))))}},5666:function(e){var t=function(e){"use strict";var t,n=Object.prototype,r=n.hasOwnProperty,a="function"==typeof Symbol?Symbol:{},o=a.iterator||"@@iterator",i=a.asyncIterator||"@@asyncIterator",c=a.toStringTag||"@@toStringTag";function l(e,t,n){return Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{l({},"")}catch(C){l=function(e,t,n){return e[t]=n}}function s(e,t,n,r){var a=t&&t.prototype instanceof v?t:v,o=Object.create(a.prototype),i=new O(r||[]);return o._invoke=function(e,t,n){var r=f;return function(a,o){if(r===m)throw new Error("Generator is already running");if(r===d){if("throw"===a)throw o;return G()}for(n.method=a,n.arg=o;;){var i=n.delegate;if(i){var c=N(i,n);if(c){if(c===p)continue;return c}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(r===f)throw r=d,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r=m;var l=u(e,t,n);if("normal"===l.type){if(r=n.done?d:h,l.arg===p)continue;return{value:l.arg,done:n.done}}"throw"===l.type&&(r=d,n.method="throw",n.arg=l.arg)}}}(e,n,i),o}function u(e,t,n){try{return{type:"normal",arg:e.call(t,n)}}catch(C){return{type:"throw",arg:C}}}e.wrap=s;var f="suspendedStart",h="suspendedYield",m="executing",d="completed",p={};function v(){}function g(){}function y(){}var w={};l(w,o,(function(){return this}));var E=Object.getPrototypeOf,b=E&&E(E(S([])));b&&b!==n&&r.call(b,o)&&(w=b);var x=y.prototype=v.prototype=Object.create(w);function _(e){["next","throw","return"].forEach((function(t){l(e,t,(function(e){return this._invoke(t,e)}))}))}function k(e,t){function n(a,o,i,c){var l=u(e[a],e,o);if("throw"!==l.type){var s=l.arg,f=s.value;return f&&"object"==typeof f&&r.call(f,"__await")?t.resolve(f.__await).then((function(e){n("next",e,i,c)}),(function(e){n("throw",e,i,c)})):t.resolve(f).then((function(e){s.value=e,i(s)}),(function(e){return n("throw",e,i,c)}))}c(l.arg)}var a;this._invoke=function(e,r){function o(){return new t((function(t,a){n(e,r,t,a)}))}return a=a?a.then(o,o):o()}}function N(e,n){var r=e.iterator[n.method];if(r===t){if(n.delegate=null,"throw"===n.method){if(e.iterator.return&&(n.method="return",n.arg=t,N(e,n),"throw"===n.method))return p;n.method="throw",n.arg=new TypeError("The iterator does not provide a 'throw' method")}return p}var a=u(r,e.iterator,n.arg);if("throw"===a.type)return n.method="throw",n.arg=a.arg,n.delegate=null,p;var o=a.arg;return o?o.done?(n[e.resultName]=o.value,n.next=e.nextLoc,"return"!==n.method&&(n.method="next",n.arg=t),n.delegate=null,p):o:(n.method="throw",n.arg=new TypeError("iterator result is not an object"),n.delegate=null,p)}function L(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function Z(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function O(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(L,this),this.reset(!0)}function S(e){if(e){var n=e[o];if(n)return n.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var a=-1,i=function n(){for(;++a<e.length;)if(r.call(e,a))return n.value=e[a],n.done=!1,n;return n.value=t,n.done=!0,n};return i.next=i}}return{next:G}}function G(){return{value:t,done:!0}}return g.prototype=y,l(x,"constructor",y),l(y,"constructor",g),g.displayName=l(y,c,"GeneratorFunction"),e.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===g||"GeneratorFunction"===(t.displayName||t.name))},e.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,y):(e.__proto__=y,l(e,c,"GeneratorFunction")),e.prototype=Object.create(x),e},e.awrap=function(e){return{__await:e}},_(k.prototype),l(k.prototype,i,(function(){return this})),e.AsyncIterator=k,e.async=function(t,n,r,a,o){void 0===o&&(o=Promise);var i=new k(s(t,n,r,a),o);return e.isGeneratorFunction(n)?i:i.next().then((function(e){return e.done?e.value:i.next()}))},_(x),l(x,c,"Generator"),l(x,o,(function(){return this})),l(x,"toString",(function(){return"[object Generator]"})),e.keys=function(e){var t=[];for(var n in e)t.push(n);return t.reverse(),function n(){for(;t.length;){var r=t.pop();if(r in e)return n.value=r,n.done=!1,n}return n.done=!0,n}},e.values=S,O.prototype={constructor:O,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=t,this.done=!1,this.delegate=null,this.method="next",this.arg=t,this.tryEntries.forEach(Z),!e)for(var n in this)"t"===n.charAt(0)&&r.call(this,n)&&!isNaN(+n.slice(1))&&(this[n]=t)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var n=this;function a(r,a){return c.type="throw",c.arg=e,n.next=r,a&&(n.method="next",n.arg=t),!!a}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],c=i.completion;if("root"===i.tryLoc)return a("end");if(i.tryLoc<=this.prev){var l=r.call(i,"catchLoc"),s=r.call(i,"finallyLoc");if(l&&s){if(this.prev<i.catchLoc)return a(i.catchLoc,!0);if(this.prev<i.finallyLoc)return a(i.finallyLoc)}else if(l){if(this.prev<i.catchLoc)return a(i.catchLoc,!0)}else{if(!s)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return a(i.finallyLoc)}}}},abrupt:function(e,t){for(var n=this.tryEntries.length-1;n>=0;--n){var a=this.tryEntries[n];if(a.tryLoc<=this.prev&&r.call(a,"finallyLoc")&&this.prev<a.finallyLoc){var o=a;break}}o&&("break"===e||"continue"===e)&&o.tryLoc<=t&&t<=o.finallyLoc&&(o=null);var i=o?o.completion:{};return i.type=e,i.arg=t,o?(this.method="next",this.next=o.finallyLoc,p):this.complete(i)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),p},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.finallyLoc===e)return this.complete(n.completion,n.afterLoc),Z(n),p}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.tryLoc===e){var r=n.completion;if("throw"===r.type){var a=r.arg;Z(n)}return a}}throw new Error("illegal catch attempt")},delegateYield:function(e,n,r){return this.delegate={iterator:S(e),resultName:n,nextLoc:r},"next"===this.method&&(this.arg=t),p}},e}(e.exports);try{regeneratorRuntime=t}catch(n){"object"==typeof globalThis?globalThis.regeneratorRuntime=t:Function("r","regeneratorRuntime = r")(t)}},2536:function(e,t,n){"use strict";t.Z=n.p+"assets/images/edit_task-f0c28199c6f510d55976a7a94c6b0e80.png"},8565:function(e,t,n){"use strict";t.Z=n.p+"assets/images/tasks-68678e6867dbd7d0c35968665eb6a886.png"},8481:function(e,t,n){"use strict";t.Z=n.p+"assets/images/terminals_to_gaucho-6738a9cd44c64bfc1543394d6024563c.png"}}]);