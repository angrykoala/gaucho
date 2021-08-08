"use strict";(self.webpackChunkgaucho_website=self.webpackChunkgaucho_website||[]).push([[796],{3905:function(e,t,n){n.d(t,{Zo:function(){return c},kt:function(){return f}});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=r.createContext({}),u=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},c=function(e){var t=u(e.components);return r.createElement(l.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),m=u(n),f=a,h=m["".concat(l,".").concat(f)]||m[f]||p[f]||i;return n?r.createElement(h,o(o({ref:t},c),{},{components:n})):r.createElement(h,o({ref:t},c))}));function f(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=m;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:a,o[1]=s;for(var u=2;u<i;u++)o[u]=n[u];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},5457:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return s},contentTitle:function(){return l},metadata:function(){return u},toc:function(){return c},default:function(){return m}});var r=n(2122),a=n(9756),i=(n(7294),n(3905)),o=["components"],s={sidebar_position:2},l="Settings",u={unversionedId:"features/settings",id:"features/settings",isDocsHomePage:!1,title:"Settings",description:'Gaucho has some options and actions in the "Settings" menu, you can access this menu by clicking on the "Settings" option in the main main or the context menu.',source:"@site/docs/features/settings.md",sourceDirName:"features",slug:"/features/settings",permalink:"/gaucho/docs/features/settings",version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"Suites",permalink:"/gaucho/docs/features/suites"},next:{title:"Env Variables",permalink:"/gaucho/docs/features/env-variables"}},c=[{value:"Display",id:"display",children:[{value:"Themes",id:"themes",children:[]}]},{value:"Actions",id:"actions",children:[]},{value:"Global environment variables",id:"global-environment-variables",children:[]}],p={toc:c};function m(e){var t=e.components,s=(0,a.Z)(e,o);return(0,i.kt)("wrapper",(0,r.Z)({},p,s,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"settings"},"Settings"),(0,i.kt)("p",null,"Gaucho has some options and actions in the ",(0,i.kt)("em",{parentName:"p"},'"Settings"')," menu, you can access this menu by clicking on the ",(0,i.kt)("em",{parentName:"p"},'"Settings"')," option in the main main or the context menu."),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"Settings",src:n(360).Z})),(0,i.kt)("h2",{id:"display"},"Display"),(0,i.kt)("p",null,"In display options you can customize Gaucho interface."),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"Bottom Bar"),": Display the bottom bar with information about running and total tasks."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"Show Timer"),": Display each task execution time.")),(0,i.kt)("h3",{id:"themes"},"Themes"),(0,i.kt)("p",null,"Gaucho has 3 themes to choose from:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"Classic")," (default)"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"Light")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"Dark"))),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"Themes",src:n(8240).Z})),(0,i.kt)("p",null,"You can create custom themes by following the instructions in ",(0,i.kt)("a",{parentName:"p",href:"/docs/advanced-guides/custom-themes"},"Custom Themes")," and ",(0,i.kt)("a",{parentName:"p",href:"/docs/advanced-guides/build-from-source"},"rebuilding gaucho"),"."),(0,i.kt)("h2",{id:"actions"},"Actions"),(0,i.kt)("p",null,"The following actions can be performed from the buttons in the ",(0,i.kt)("em",{parentName:"p"},'"settings"')," menu:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Reset Settings to the default values."),(0,i.kt)("li",{parentName:"ul"},"Export/Import tasks and suites. Check ",(0,i.kt)("a",{parentName:"li",href:"/docs/features/export-tasks"},"Export Tasks")," for more details."),(0,i.kt)("li",{parentName:"ul"},"Clear Tasks. This will completely remove every task and suite you have in Gaucho.")),(0,i.kt)("h2",{id:"global-environment-variables"},"Global environment variables"),(0,i.kt)("p",null,"You can configure global ",(0,i.kt)("a",{parentName:"p",href:"/docs/features/env-variables"},"environment variables")," for all your tasks here. Variables defined on each task will have ",(0,i.kt)("strong",{parentName:"p"},"more")," priority than global variables."),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"Global Env Variables",src:n(80).Z})))}m.isMDXComponent=!0},360:function(e,t,n){t.Z=n.p+"assets/images/gaucho_settings-f5a0db32bc205ba67d64d94795316528.png"},80:function(e,t,n){t.Z=n.p+"assets/images/global_env_variables-8ace9977a13f52c0cb7333b622f2991e.png"},8240:function(e,t,n){t.Z=n.p+"assets/images/themes-153be1711b4863f5952e4b3a96bc198c.png"}}]);