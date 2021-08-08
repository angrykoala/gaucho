"use strict";(self.webpackChunkgaucho_website=self.webpackChunkgaucho_website||[]).push([[290],{3905:function(e,t,n){n.d(t,{Zo:function(){return s},kt:function(){return m}});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function u(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=r.createContext({}),c=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},s=function(e){var t=c(e.components);return r.createElement(l.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},p=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,l=e.parentName,s=u(e,["components","mdxType","originalType","parentName"]),p=c(n),m=o,f=p["".concat(l,".").concat(m)]||p[m]||d[m]||i;return n?r.createElement(f,a(a({ref:t},s),{},{components:n})):r.createElement(f,a({ref:t},s))}));function m(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,a=new Array(i);a[0]=p;var u={};for(var l in t)hasOwnProperty.call(t,l)&&(u[l]=t[l]);u.originalType=e,u.mdxType="string"==typeof e?e:o,a[1]=u;for(var c=2;c<i;c++)a[c]=n[c];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}p.displayName="MDXCreateElement"},7334:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return u},contentTitle:function(){return l},metadata:function(){return c},toc:function(){return s},default:function(){return p}});var r=n(2122),o=n(9756),i=(n(7294),n(3905)),a=["components"],u={},l="Build from source code",c={unversionedId:"advanced-guides/build-from-source",id:"advanced-guides/build-from-source",isDocsHomePage:!1,title:"Build from source code",description:"Gaucho is built using Vue, Electron  and packaged with Electron Builder. If you plan on modifying or rebuilding electron for a different platform, some knowledge on these tools is recommended.",source:"@site/docs/advanced-guides/build-from-source.md",sourceDirName:"advanced-guides",slug:"/advanced-guides/build-from-source",permalink:"/gaucho/docs/advanced-guides/build-from-source",version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Python",permalink:"/gaucho/docs/examples/python"},next:{title:"Custom Themes",permalink:"/gaucho/docs/advanced-guides/custom-themes"}},s=[{value:"Requirements",id:"requirements",children:[]},{value:"Building for your system",id:"building-for-your-system",children:[]}],d={toc:s};function p(e){var t=e.components,n=(0,o.Z)(e,a);return(0,i.kt)("wrapper",(0,r.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"build-from-source-code"},"Build from source code"),(0,i.kt)("p",null,"Gaucho is built using ",(0,i.kt)("a",{parentName:"p",href:"https://vuejs.org/"},"Vue"),", ",(0,i.kt)("a",{parentName:"p",href:"https://www.electronjs.org/"},"Electron"),"  and packaged with ",(0,i.kt)("a",{parentName:"p",href:"https://www.electron.build/"},"Electron Builder"),". If you plan on modifying or rebuilding electron for a different platform, some knowledge on these tools is recommended."),(0,i.kt)("h2",{id:"requirements"},"Requirements"),(0,i.kt)("p",null,"To build Gaucho from source code, you will need a recent version of ",(0,i.kt)("a",{parentName:"p",href:"https://nodejs.org/en/"},"Node.js")," and ",(0,i.kt)("a",{parentName:"p",href:"https://www.npmjs.com/"},"npm")," in your system. Depending on your system, other dependencies may be needed to build ",(0,i.kt)("a",{parentName:"p",href:"https://www.electronjs.org/"},"electron"),"."),(0,i.kt)("h2",{id:"building-for-your-system"},"Building for your system"),(0,i.kt)("p",null,"Once the repository is cloned:"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("inlineCode",{parentName:"li"},"npm install"),".")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Optionally ",(0,i.kt)("inlineCode",{parentName:"li"},"npm test")," to run tests.")),(0,i.kt)("ol",{start:2},(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("inlineCode",{parentName:"li"},"npm run dist"),"."),(0,i.kt)("li",{parentName:"ol"},"Any build will be available in the ",(0,i.kt)("inlineCode",{parentName:"li"},"dist")," folder. Check")),(0,i.kt)("div",{className:"admonition admonition-caution alert alert--warning"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 16 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"}))),"caution")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"If you encounter any problem, remember to check the ",(0,i.kt)("a",{parentName:"p",href:"/docs/troubleshooting#building"},"Troubleshooting")," page. If the solution is not there, consider ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/angrykoala/gaucho/issues/new"},"opening an issue")))))}p.isMDXComponent=!0}}]);