"use strict";(self.webpackChunkgaucho_website=self.webpackChunkgaucho_website||[]).push([[360],{3905:function(e,n,t){t.d(n,{Zo:function(){return d},kt:function(){return m}});var r=t(7294);function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function a(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function o(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?a(Object(t),!0).forEach((function(n){i(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,r,i=function(e,n){if(null==e)return{};var t,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||(i[t]=e[t]);return i}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}var s=r.createContext({}),u=function(e){var n=r.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):o(o({},n),e)),t},d=function(e){var n=u(e.components);return r.createElement(s.Provider,{value:n},e.children)},p={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},c=r.forwardRef((function(e,n){var t=e.components,i=e.mdxType,a=e.originalType,s=e.parentName,d=l(e,["components","mdxType","originalType","parentName"]),c=u(t),m=i,g=c["".concat(s,".").concat(m)]||c[m]||p[m]||a;return t?r.createElement(g,o(o({ref:n},d),{},{components:t})):r.createElement(g,o({ref:n},d))}));function m(e,n){var t=arguments,i=n&&n.mdxType;if("string"==typeof e||i){var a=t.length,o=new Array(a);o[0]=c;var l={};for(var s in n)hasOwnProperty.call(n,s)&&(l[s]=n[s]);l.originalType=e,l.mdxType="string"==typeof e?e:i,o[1]=l;for(var u=2;u<a;u++)o[u]=t[u];return r.createElement.apply(null,o)}return r.createElement.apply(null,t)}c.displayName="MDXCreateElement"},1416:function(e,n,t){t.r(n),t.d(n,{frontMatter:function(){return l},contentTitle:function(){return s},metadata:function(){return u},toc:function(){return d},default:function(){return c}});var r=t(2122),i=t(9756),a=(t(7294),t(3905)),o=["components"],l={sidebar_position:5},s="Troubleshooting",u={unversionedId:"troubleshooting",id:"troubleshooting",isDocsHomePage:!1,title:"Troubleshooting",description:"This document details known errors and problems that may happen when building, running and testing Gaucho.",source:"@site/docs/troubleshooting.md",sourceDirName:".",slug:"/troubleshooting",permalink:"/gaucho/docs/troubleshooting",version:"current",sidebarPosition:5,frontMatter:{sidebar_position:5},sidebar:"tutorialSidebar",previous:{title:"Custom Themes",permalink:"/gaucho/docs/advanced-guides/custom-themes"},next:{title:"License",permalink:"/gaucho/docs/license"}},d=[{value:"Using Gaucho",id:"using-gaucho",children:[]},{value:"Task fails with message: Error: spawn /bin/sh ENOENT",id:"task-fails-with-message-error-spawn-binsh-enoent",children:[]},{value:"Building",id:"building",children:[{value:"Error while building deb: spawn icn2png",id:"error-while-building-deb-spawn-icn2png",children:[]},{value:"Error building rpm: Missing &#39;rpmbuild&#39;",id:"error-building-rpm-missing-rpmbuild",children:[]},{value:"Error with module rabin-bindings",id:"error-with-module-rabin-bindings",children:[]},{value:"Error building pacman",id:"error-building-pacman",children:[]},{value:"Cannot check wine version",id:"cannot-check-wine-version",children:[]}]},{value:"Running tests",id:"running-tests",children:[{value:"Test coverage problem in windows",id:"test-coverage-problem-in-windows",children:[]},{value:"SyntaxError: Unexpected token",id:"syntaxerror-unexpected-token",children:[]}]}],p={toc:d};function c(e){var n=e.components,t=(0,i.Z)(e,o);return(0,a.kt)("wrapper",(0,r.Z)({},p,t,{components:n,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"troubleshooting"},"Troubleshooting"),(0,a.kt)("p",null,"This document details known errors and problems that may happen when building, running and testing Gaucho."),(0,a.kt)("h2",{id:"using-gaucho"},"Using Gaucho"),(0,a.kt)("h2",{id:"task-fails-with-message-error-spawn-binsh-enoent"},"Task fails with message: Error: spawn /bin/sh ENOENT"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Problem"),": When running a task, it fails with the message ",(0,a.kt)("inlineCode",{parentName:"li"},"Error: spawn /bin/sh ENOENT"),"."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Solution"),": This error message may appear when the path of the task is not valid (e.g. it does not exists or user does not have enough permissions).")),(0,a.kt)("h2",{id:"building"},"Building"),(0,a.kt)("p",null,"Some problems that may happen while executing ",(0,a.kt)("inlineCode",{parentName:"p"},"npm run dist"),":"),(0,a.kt)("h3",{id:"error-while-building-deb-spawn-icn2png"},"Error while building deb: spawn icn2png"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Problem"),": While building, the process fails with the message ",(0,a.kt)("inlineCode",{parentName:"li"},"Unhandled rejection Error: Exit code: ENOENT. spawn icns2png ENOENT"),"\t\t"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Solution"),": Install ",(0,a.kt)("inlineCode",{parentName:"li"},"icnsutils")," and ",(0,a.kt)("inlineCode",{parentName:"li"},"graphicsmagick"),"\t\t")),(0,a.kt)("h3",{id:"error-building-rpm-missing-rpmbuild"},"Error building rpm: Missing 'rpmbuild'"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Problem"),": Message ",(0,a.kt)("inlineCode",{parentName:"li"},"Need executable 'rpmbuild' to convert dir to rpm")," while building with rpm\t\t"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Solution"),": Install ",(0,a.kt)("inlineCode",{parentName:"li"},"rpm")," package")),(0,a.kt)("h3",{id:"error-with-module-rabin-bindings"},"Error with module rabin-bindings"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Problem"),": Error: ",(0,a.kt)("inlineCode",{parentName:"li"},"The module '/home/andrew/Git/gaucho/node_modules/rabin-bindings/build/Release/rabin-bindings.node' was compiled against a different Node.js version")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Solution"),": Remove ",(0,a.kt)("inlineCode",{parentName:"li"},"node_modules")," folder and execute ",(0,a.kt)("inlineCode",{parentName:"li"},"npm install"))),(0,a.kt)("h3",{id:"error-building-pacman"},"Error building pacman"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Problem"),": Trying to build for Pacman throws ",(0,a.kt)("inlineCode",{parentName:"li"},"Error: Exit code: 1. Command failed")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Solution"),": Install ",(0,a.kt)("inlineCode",{parentName:"li"},"bsdtar")," package")),(0,a.kt)("h3",{id:"cannot-check-wine-version"},"Cannot check wine version"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Problem"),": While building for windows ",(0,a.kt)("inlineCode",{parentName:"li"},"Error: Exit code: ENOENT. spawn wine ENOENT")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Solution"),": If you are in Linux or Mac, install ",(0,a.kt)("a",{parentName:"li",href:"https://www.winehq.org/"},"wine"))),(0,a.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,a.kt)("div",{parentName:"div",className:"admonition-heading"},(0,a.kt)("h5",{parentName:"div"},(0,a.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,a.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,a.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,a.kt)("div",{parentName:"div",className:"admonition-content"},(0,a.kt)("p",{parentName:"div"},"Other building problems can be found documented in the ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/electron-userland/electron-builder/blob/master/docs/multi-platform-build.md#linux"},"official documentation of electron-builder")))),(0,a.kt)("h2",{id:"running-tests"},"Running tests"),(0,a.kt)("p",null,"Problems that may appear while running the automatic tests"),(0,a.kt)("h3",{id:"test-coverage-problem-in-windows"},"Test coverage problem in windows"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Problem"),": Message ",(0,a.kt)("inlineCode",{parentName:"li"},"No coverage information was collected, exit without writing coverage information")," appears while trying to run ",(0,a.kt)("inlineCode",{parentName:"li"},"npm test")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Solution"),": Run ",(0,a.kt)("inlineCode",{parentName:"li"},"istanbul cover node_modules/mocha/bin/_mocha -- -R spec")," instead")),(0,a.kt)("h3",{id:"syntaxerror-unexpected-token"},"SyntaxError: Unexpected token"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Problem"),": Executing tests or running Gaucho will fail with an error ",(0,a.kt)("inlineCode",{parentName:"li"},"SyntaxError: Unexpected token...")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Solution"),": Make sure you are running Gaucho with a supported node version (8.9.3 or higher)")))}c.isMDXComponent=!0}}]);