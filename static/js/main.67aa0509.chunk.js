(this.webpackJsonpweb=this.webpackJsonpweb||[]).push([[0],{302:function(e,t,a){e.exports=a(357)},307:function(e,t,a){},357:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(11),l=a.n(o),i=(a(307),a(247)),s=a(382),c=a(291),u=a(60),m=a(193),p=a(273),d=a(19);m.a.use(p.a).use(d.a).init({lng:"zh-TW",backend:{loadPath:"".concat("/awesome-g0v-projects","/assets/i18n/{{ns}}/{{lng}}.json")},fallbackLng:"zh-TW",debug:!1,ns:["translations"],defaultNS:"translations",keySeparator:!1,interpolation:{escapeValue:!1,formatSeparator:","},react:{wait:!0}});m.a;var b=a(14),f=a.n(b),g=a(24),v=a(20),h=a(289),E=a.n(h),y=a(381),j=a(264),w=a(252),O=a(61),x=a(188),k=a.n(x),R=a(40),C=a.n(R),B=a(250),J=a(184),N=a(189),S=a(370),z=Object(i.a)((function(e){return{formControl:{margin:e.spacing(1),minWidth:120,backgroundColor:"#fff",borderRadius:5},input:{padding:"10px 14px"}}})),Y=[{value:"zh-TW",title:"\u4e2d\u6587",isDefault:!0},{value:"en-US",title:"English"}],_=function(){var e=z(),t=Object(d.b)().i18n,a=Object(n.useState)(Y[0].value),o=Object(v.a)(a,2),l=o[0],i=o[1];return Object(n.useEffect)((function(){var e=window.localStorage.getItem("language");e&&(i(e),t.changeLanguage(e))}),[t]),r.a.createElement(J.a,{variant:"outlined",className:e.formControl},r.a.createElement(N.a,{labelId:"translation",id:"translation",value:l,onChange:function(e){t.changeLanguage(e.target.value),i(e.target.value),window.localStorage.setItem("language",e.target.value)},label:"Language",size:"small",input:r.a.createElement(S.a,{classes:{input:e.input}})},Y.map((function(e){var t=e.value,a=e.title;return r.a.createElement(B.a,{key:t,value:t},a)}))))},A=a(186),D=a(251);var M=function(e){var t=e.url,a=e.title,n=void 0===a?"Visit":a,o=e.tooltip,l=e.icon,i=e.className,s=!t||""===t||!t.startsWith("http"),c=o||(s?"":n);return l?r.a.createElement(D.a,{title:c},r.a.createElement("span",null,r.a.createElement(A.a,{className:i,disabled:s,"aria-label":n,target:"_blank",href:t,size:"small"},l))):r.a.createElement(w.a,{className:i,variant:"outlined",color:"primary",size:"small",target:"_blank",href:t,disabled:s},n)},T=a(280),I=a.n(T);var L=function(e){var t=e.url,a=e.title,n=void 0===a?"GitHub":a,o=e.className,l=t?t.startsWith("https://github.com/")?t:"https://github.com/".concat(t):void 0;return r.a.createElement(M,{className:o,disabled:!0,url:l,title:n,icon:r.a.createElement(I.a,null)})},U=a(65),W=a.n(U),H=a(286),P=a.n(H),F=a(292),G=a(281),K=a.n(G),V=a(89),$=a(380),q={maxWidth:150,minWidth:32,wordBreak:"break-word",overflowWrap:"break-word",padding:"4px 4px 4px 8px",cursor:"pointer",fontSize:12},Q=Object(V.a)({overrides:{MUIDataTableToolbar:{root:{}},MUIDataTable:{paper:{padding:0},responsiveScrollMaxHeight:{maxHeight:"calc(100vh - 170px) !important"}},MUIDataTableHeadCell:{root:Object(F.a)({},q,{fontWeight:"bold"})},MUIDataTableBodyCell:{root:q},MUIDataTableSelectCell:{expandDisabled:{visibility:"hidden"}},MUIDataTableFilter:{root:{minWidth:400}}}});var X=function(e){var t=e.title,a=e.data,n=e.columns,o=e.options,l=e.nested,i=void 0!==l&&l,s=Object.assign({pagination:!0,responsive:i?"stacked":"scrollMaxHeight",rowsPerPageOptions:i?[10,50,100,1e3]:[50,100,500,1e3],rowsPerPage:i?10:50,filterType:"multiselect",fixedHeader:!0,resizableColumns:!1,selectableRows:"none",isRowSelectable:function(){return!1},onRowClick:function(e,t){var n=a[t.dataIndex];console.log(n)},print:!0},o);return r.a.createElement($.a,{theme:Q},r.a.createElement(K.a,{className:"data-table",title:t,data:a,columns:n,options:s}))},Z=a(293),ee=a(387);var te=function(e){var t=e.url,a=e.title,n=void 0===a?"link":a,o=Object(Z.a)(e,["url","title"]);return r.a.createElement(ee.a,Object.assign({variant:"body2",color:"primary"},o,{target:"_blank",href:t,style:{fontSize:12}}),n)},ae=Object(i.a)((function(e){return{list:{paddingInlineStart:"20px"}}}));var ne=function(e){var t=e.value,a=void 0===t?[]:t,n=e.targetKey,o=ae();if("string"===typeof a||!a)return a=a||"",r.a.createElement("span",null,a.startsWith("http")?r.a.createElement(te,{url:a,title:a}):a);var l=Array.isArray(a)?a:Object.keys(a);return r.a.createElement("ul",{className:o.list},l.filter((function(e,t){return t<3})).map((function(e,t){var a=e;return"object"===typeof e&&(a=n&&e[n]?e[n]:JSON.stringify(e)),r.a.createElement("li",{key:t},a.startsWith("http")?r.a.createElement(te,{url:a,title:a}):a)})))};var re=function(e){var t=e.value,a=void 0===t?"":t,n=e.length,o=void 0===n?25:n;return r.a.createElement("span",null,"".concat(a.substring(0,o)).concat(a.length>o?"...":""))},oe=a(386),le=Object(i.a)((function(e){return{img:{maxHeight:65,maxWidth:"100%"}}}));var ie=function(e){var t=e.value,a=void 0===t?"":t,n=e.alt,o=void 0===n?"-":n,l=le();return r.a.createElement(oe.a,{container:!0,justify:"center",align:"center"},a&&r.a.createElement("img",{src:a,alt:o,className:l.img}))},se=a(116),ce=a(363),ue=a(364),me=a(267),pe=Object(i.a)((function(e){return{container:{padding:e.spacing(2)},listContainer:{maxHeight:480,overflow:"auto"},list:{width:"100%",backgroundColor:e.palette.background.paper},inline:{display:"inline"},image:{maxHeight:480}}}));var de=function(e){var t=e.project,a=void 0===t?{}:t,n=pe(),o=Object(d.b)().t;return r.a.createElement(se.a,{className:n.container},r.a.createElement(oe.a,{container:!0,spacing:2},r.a.createElement(oe.a,{item:!0,xs:4},r.a.createElement(oe.a,{container:!0,justify:"center",alignItems:"center"},r.a.createElement("img",{src:a.g0vJson.thumbnail,className:n.image,alt:"thumbnail"}))),r.a.createElement(oe.a,{item:!0,xs:8,className:n.listContainer},r.a.createElement(ce.a,{className:n.list},Object.keys(a.g0vJson).map((function(e,t){return r.a.createElement(ue.a,{alignItems:"flex-start",divider:!0,key:t},r.a.createElement(me.a,{primary:r.a.createElement(O.a,{component:"span",variant:"body2",color:"textSecondary"},o("table.project.".concat(e))),secondary:r.a.createElement(r.a.Fragment,null,r.a.createElement(O.a,{component:"span",variant:"body2",className:n.inline,color:"textPrimary"},r.a.createElement(ne,{value:a.g0vJson[e],targetKey:"type"})))}))}))))))},be=a(284),fe=a.n(be),ge=a(283),ve=a.n(ge),he=a(285),Ee=a.n(he),ye=a(383),je=a(385),we=a(384),Oe=a(282),xe=Object(i.a)((function(e){return{iframe:{width:500,height:450,border:"none",marginBottom:e.spacing(2)},closeButton:{position:"absolute",right:e.spacing(1),top:e.spacing(1),color:e.palette.grey[500]}}}));var ke=function(e){var t=e.url,a=e.repo,o=e.className,l=xe(),i=Object(d.b)().t,s=Object(n.useState)(!1),c=Object(v.a)(s,2),u=c[0],m=c[1],p=i(t?"g0vJson.helpEdit":"g0vJson.helpAdd"),b=["repo=".concat(a)],f="https://g0v.github.io/editor?".concat(b.join("&"));return r.a.createElement(r.a.Fragment,null,r.a.createElement(D.a,{title:p},r.a.createElement(A.a,{className:o,"aria-label":p,size:"small",onClick:function(){return m(!0)}},t?r.a.createElement(ve.a,null):r.a.createElement(fe.a,null))),r.a.createElement(ye.a,{open:u,onBackdropClick:function(){},"aria-labelledby":"form-dialog-title"},r.a.createElement(je.a,{id:"customized-dialog-title"},i("g0vJson.editor")," (",r.a.createElement(te,{url:"https://github.com/g0v/editor",title:"GitHub",variant:"h6"}),")",r.a.createElement(A.a,{"aria-label":"close",className:l.closeButton,onClick:function(){return m(!1)}},r.a.createElement(Ee.a,null))),r.a.createElement(we.a,null,r.a.createElement(Oe.a,{url:f,width:"500px",className:l.iframe,display:"initial",position:"relative"}))))},Re=a(261),Ce=a(260),Be=Object(i.a)((function(e){return{nestedContainer:{backgroundColor:"rgba(0,0,0,0.1)"}}}));var Je=function(e){var t=e.columns,a=void 0===t?[]:t,n=e.children,o=Be();return r.a.createElement(Re.a,null,r.a.createElement(Ce.a,{colSpan:a.length+1,className:o.nestedContainer},n))},Ne=a(192),Se=window.location.hostname.includes("-prd-")?"prd":"dev",ze={},Ye=function(){return"https://awesome-g0v-projects-".concat(Se,"-data.s3.amazonaws.com/data.json")},_e=function(){var e=Object(g.a)(f.a.mark((function e(){var t,a,n,r;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!ze[t="hackmd"]){e.next=3;break}return e.abrupt("return",ze[t]);case 3:return a="https://awesome-g0v-projects-".concat(Se,"-data.s3.amazonaws.com/hackmd.json"),e.next=6,fetch(a);case 6:return n=e.sent,e.next=9,n.json();case 9:return r=e.sent,ze[t]=r,e.abrupt("return",r);case 12:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),Ae=function(){var e=Object(g.a)(f.a.mark((function e(t){var a,n,r,o,l;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!ze[a="hackmd-byTag"]){e.next=3;break}return e.abrupt("return",ze[a]);case 3:return e.next=5,_e();case 5:if(n=e.sent,r={},n.forEach((function(e){var t=e.lastchangeAt,a=e.title;e.tags=e.tags||[],e.tags.forEach((function(n){var o=r[n]||{tag:n,tagUrl:'https://g0v.hackmd.io/?nav=overview&tags=%5B"'.concat(n,'"%5D'),recentTitle:"",recentLastChangedAt:void 0,records:[],githubRepoUrl:""};o.records.push(e),(!o.recentLastChangedAt||o.recentLastChangedAt<t)&&(o.recentLastChangedAt=t,o.recentTitle=a),r[n]=o}))})),e.t0=t,e.t0){e.next=13;break}return e.next=12,Te();case 12:e.t0=e.sent;case 13:return o=e.t0,l=Object.keys(r).map((function(e){var t=r[e],a=o.find((function(e){var a=t.tag.toLowerCase();return"g0v"!==a&&(e.owner.login.toLowerCase()===a||e.name.toLowerCase()===a||e.name.toLowerCase().startsWith(a)||a.startsWith(e.name.toLowerCase()))}));return a&&(t.githubRepoUrl=a.html_url,a.hackmdUrl=t.tagUrl),t})).sort((function(e,t){return e.recentLastChangedAt>t.recentLastChangedAt?-1:1})),ze[a]=l,e.abrupt("return",l);case 17:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),De=function(){var e=Object(g.a)(f.a.mark((function e(){var t,a,n,r;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!ze[t="github"]){e.next=3;break}return e.abrupt("return",ze[t]);case 3:return a=Ye(),e.next=6,fetch(a);case 6:return n=e.sent,e.next=9,n.json();case 9:return r=e.sent,ze[t]=r,e.abrupt("return",r);case 12:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),Me=function(){var e=Object(g.a)(f.a.mark((function e(){var t,a;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,De();case 2:return t=e.sent,a=t.data,e.abrupt("return",a.filter((function(e){return"Organization"===e.githubInfo.type})).sort((function(e,t){return e.name>t.name?1:-1})));case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),Te=function(){var e=Object(g.a)(f.a.mark((function e(){var t,a,n;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,De();case 2:return t=e.sent,a=t.data,n=a.reduce((function(e,t){return[].concat(Object(Ne.a)(e),Object(Ne.a)(t.repos))}),[]).filter((function(e){return!e.fork})).sort((function(e,t){return e.pushed_at<t.pushed_at?1:-1})).map((function(e){return e.languages=Object.keys(e.languages).map((function(e){return e})),e})),e.next=7,Ae(n);case 7:return e.abrupt("return",n);case 8:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),Ie=function(){var e=Object(g.a)(f.a.mark((function e(){var t;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Te();case 2:return t=e.sent,e.abrupt("return",t.filter((function(e){return e.g0vJsonUrl})).map((function(e){return e.g0vJson.name_zh=e.g0vJson.name_zh||e.g0vJson.name,e.g0vJson.description_zh=e.g0vJson.description_zh||e.g0vJson.description,e})));case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),Le=Object(i.a)((function(e){return{badget:{border:"1px solid rgba(0,0,0,0.1)",borderRadius:3,backgroundColor:"rgba(0,0,0,0.1)",textAlign:"center"}}}));var Ue=function(e){var t=e.value,a=Le();return t?r.a.createElement("div",{className:a.badget},r.a.createElement(O.a,{color:"textPrimary",variant:"inherit"},t.toLowerCase())):null};var We=function(e){var t=e.data,a=Object(d.b)().t,o=Object(n.useState)([]),l=Object(v.a)(o,2),i=l[0],s=l[1],c=Object(n.useState)({status:[],keywords:[],needs:[],languages:[]}),u=Object(v.a)(c,2),m=u[0],p=u[1],b=a("table.project.title"),h=[{name:"g0vJson.status",label:a("table.project.status"),options:{filter:!0,filterOptions:{names:m.status},sort:!0,customBodyRender:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return r.a.createElement(Ue,{value:e})}}},{name:"owner.login",label:a("table.project.org"),options:{filter:!0,sort:!0,customBodyRender:function(e){return r.a.createElement(te,{title:e,url:"https://github.com/".concat(e)})}}},{name:"g0vJson.author",label:a("table.project.author"),options:{filter:!1,sort:!0}},{name:"g0vJson.thumbnail",label:a("table.project.thumbnail"),options:{filter:!1,sort:!1,display:!1,customBodyRender:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return r.a.createElement(ie,{value:e[0]})}}},{name:"name",label:a("table.project.repo"),options:{filter:!1,sort:!0}},{name:"g0vJson.name",label:a("table.project.name"),options:{display:!1,filter:!1,sort:!0}},{name:"g0vJson.name_zh",label:a("table.project.name_zh"),options:{filter:!1,sort:!0}},{name:"g0vJson.description",label:a("table.project.description"),options:{display:!1,filter:!1,sort:!1,customBodyRender:function(e){return r.a.createElement(re,{value:e})}}},{name:"g0vJson.description_zh",label:a("table.project.description_zh"),options:{filter:!1,sort:!1,customBodyRender:function(e){return r.a.createElement(re,{value:e})}}},{name:"g0vJson.keywords",label:a("table.project.keywords"),options:{filter:!0,filterOptions:{names:m.keywords},sort:!0,customBodyRender:function(e){return r.a.createElement(ne,{value:e})}}},{name:"g0vJson.needs",label:a("table.project.needs"),options:{filter:!0,filterOptions:{names:m.needs},sort:!0,customBodyRender:function(e){return r.a.createElement(ne,{value:e})}}},{name:"g0vJson.licenses",label:a("table.project.licenses"),options:{display:!1,filter:!1,sort:!0,customBodyRender:function(e){return r.a.createElement(ne,{value:e,targetKey:"type"})}}},{name:"languagePrimary",label:a("table.project.language"),options:{display:!1,filter:!1,sort:!0}},{name:"languageSecondary",label:a("table.project.language2"),options:{display:!1,filter:!1,sort:!0}},{name:"languages",label:a("table.project.allLanguages"),options:{filter:!0,filterOptions:{names:m.languages},sort:!1,display:!0,customBodyRender:function(e){return r.a.createElement(ne,{value:e})}}},{name:"open_issues",label:a("table.project.issues"),options:{filter:!1,sort:!0}},{name:"contributors.length",label:a("table.project.contributors"),options:{filter:!1,sort:!0}},{name:"created_at",label:a("table.project.createdAt"),options:{filter:!1,sort:!0,customBodyRender:function(e){return C()(e).format("YYYY/MM/DD")}}},{name:"pushed_at",label:a("table.project.pushedAt"),options:{filter:!1,sort:!0,customBodyRender:function(e){return C()(e).format("YYYY/MM/DD")}}},{name:"g0vJsonUrl",label:" ",options:{filter:!1,sort:!0,customBodyRender:function(e,t){var a=t.rowData,n="".concat(a[1],"/").concat(a[4]);return r.a.createElement(ke,{url:e,repo:n})}}},{name:"g0vJson.homepage",label:" ",options:{filter:!1,customBodyRender:function(e){return r.a.createElement(M,{url:e,title:a("table.project.homepage"),icon:r.a.createElement(P.a,null)})}}},{name:"g0vJson.document",label:" ",options:{filter:!1,customBodyRender:function(e){return r.a.createElement(M,{url:e,title:a("table.project.documents"),icon:r.a.createElement(W.a,null)})}}},{name:"html_url",label:" ",options:{filter:!1,sort:!1,customBodyRender:function(e){return r.a.createElement(L,{url:e})}}}],E={expandableRows:!0,renderExpandableRow:function(e,t){var a=i[t.dataIndex];return r.a.createElement(Je,{columns:h},r.a.createElement(de,{project:a}))}};return Object(n.useEffect)((function(){var e=[],t=[],a=[],n=[];i.forEach((function(r){r.languages.forEach((function(e){n.includes(e)||n.push(e)})),Array.isArray(r.g0vJson.keywords)&&r.g0vJson.keywords.forEach((function(e){t.includes(e)||t.push(e)})),Array.isArray(r.g0vJson.needs)&&r.g0vJson.needs.forEach((function(e){a.includes(e)||a.push(e)})),r.g0vJson.status&&(e.includes(r.g0vJson.status.toLowerCase())||e.push(r.g0vJson.status.toLowerCase()))})),p({languages:n,keywords:t,needs:a,status:e})}),[i]),Object(n.useEffect)((function(){t?s(t):Object(g.a)(f.a.mark((function e(){return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=s,e.next=3,Ie();case 3:e.t1=e.sent,(0,e.t0)(e.t1);case 5:case"end":return e.stop()}}),e)})))()}),[t]),r.a.createElement(X,{title:b,data:i,columns:h,options:E})},He=a(98),Pe=a(287),Fe=a.n(Pe),Ge=a(288),Ke=a.n(Ge);var Ve=function(e){var t=e.data,a=e.nested,o=void 0!==a&&a,l=Object(d.b)().t,i=Object(n.useState)([]),s=Object(v.a)(i,2),c=s[0],u=s[1],m=Object(n.useState)([]),p=Object(v.a)(m,2),b=p[0],h=p[1],E=l("table.repo.title"),y=[{name:"archived",label:l("table.repo.activity"),options:{filter:!1,sort:!0,customBodyRender:function(e){return e?r.a.createElement(Fe.a,{color:"secondary"}):r.a.createElement(Ke.a,{style:{color:He.a[500]}})}}},{name:"owner.login",label:l("table.repo.org"),options:{filter:!1,sort:!0,customBodyRender:function(e){return r.a.createElement(te,{title:e,url:"https://github.com/".concat(e)})}}},{name:"name",label:l("table.repo.name"),options:{filter:!1,sort:!0}},{name:"description",label:l("table.repo.description"),options:{filter:!1,sort:!1}},{name:"languagePrimary",label:l("table.repo.language"),options:{filter:!1,sort:!0}},{name:"languageSecondary",label:l("table.repo.language2"),options:{filter:!1,sort:!0}},{name:"languages",label:l("table.repo.allLanguages"),options:{filter:!0,filterOptions:{names:b},sort:!1,display:!1,customBodyRender:function(e){return r.a.createElement(ne,{value:e})}}},{name:"open_issues",label:l("table.repo.issues"),options:{filter:!1,sort:!0}},{name:"contributors.length",label:l("table.repo.contributors"),options:{filter:!1,sort:!0}},{name:"created_at",label:l("table.repo.createdAt"),options:{filter:!1,sort:!0,customBodyRender:function(e){return C()(e).format("YYYY/MM/DD")}}},{name:"pushed_at",label:l("table.repo.pushedAt"),options:{filter:!1,sort:!0,customBodyRender:function(e){return C()(e).format("YYYY/MM/DD")}}},{name:"license.spdx_id",label:l("table.repo.license"),options:{display:!1,filter:!0,sort:!0}},{name:"g0vJsonUrl",label:l("table.repo.g0vJsonProvided"),options:{filter:!1,sort:!0,customBodyRender:function(e,t){var a=t.rowData,n="".concat(a[1],"/").concat(a[2]);return r.a.createElement(ke,{url:e,repo:n})}}},{name:"hackmdUrl",label:" ",options:{filter:!1,customBodyRender:function(e){return r.a.createElement(M,{url:e,title:l("table.repo.hackmdUrl"),icon:r.a.createElement(W.a,null)})}}},{name:"html_url",label:" ",options:{filter:!1,customBodyRender:function(e){return r.a.createElement(L,{url:e})}}}],j={filterType:"multiselect",expandableRows:!0,isRowExpandable:function(e){return c[e].g0vJsonUrl},renderExpandableRow:function(e,t){var a=c[t.dataIndex];return r.a.createElement(Je,{columns:y},r.a.createElement(de,{project:a}))}};return Object(n.useEffect)((function(){var e=[];c.forEach((function(t){t.languages.forEach((function(t){e.includes(t)||e.push(t)}))})),h(e)}),[c]),Object(n.useEffect)((function(){t?u(t):Object(g.a)(f.a.mark((function e(){return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=u,e.next=3,Te();case 3:e.t1=e.sent,(0,e.t0)(e.t1);case 5:case"end":return e.stop()}}),e)})))()}),[t]),r.a.createElement(X,{title:E,data:c,columns:y,options:j,nested:o})};var $e=function(e){var t=e.data,a=e.nested,o=void 0!==a&&a,l=Object(d.b)().t,i=Object(n.useState)([]),s=Object(v.a)(i,2),c=s[0],u=s[1],m=l("table.hackmd.listTitle"),p=[{name:"title",label:l("table.hackmd.title"),options:{filter:!1,sort:!0}},{name:"userpath",label:l("table.hackmd.user"),options:{filter:!1,sort:!0}},{name:"tags",label:l("table.hackmd.tags"),options:{display:!o,filter:!0,filterOptions:{names:c},sort:!0,customBodyRender:function(e){return r.a.createElement(ne,{value:e})}}},{name:"publishType",label:l("table.hackmd.publishType"),options:{filter:!0,sort:!0}},{name:"publishedAt",label:l("table.hackmd.publishedAt"),options:{filter:!1,sort:!0,customBodyRender:function(e){return e?C()(e).format("YYYY/MM/DD"):""}}},{name:"createdAt",label:l("table.hackmd.createdAt"),options:{filter:!1,sort:!0,customBodyRender:function(e){return C()(e).format("YYYY/MM/DD")}}},{name:"lastchangeAt",label:l("table.hackmd.lastchangeAt"),options:{filter:!1,sort:!0,customBodyRender:function(e){return C()(e).format("YYYY/MM/DD HH:MM")}}},{name:"id",label:" ",options:{filter:!1,sort:!1,customBodyRender:function(e){return r.a.createElement(M,{url:"https://g0v.hackmd.io/".concat(e),title:l("table.hackmd.hackmd"),icon:r.a.createElement(W.a,null)})}}}];return Object(n.useEffect)((function(){var e=[];t.forEach((function(t){var a=t.tags;(void 0===a?[]:a).forEach((function(t){e.includes(t)||e.push(t)}))})),u(e)}),[t]),r.a.createElement(X,{title:m,data:t,s:!0,columns:p,options:{expandableRows:!0,isRowExpandable:function(){return!1}},nested:o})};var qe=[{title:"header.findProjects",path:"/",component:We},{title:"header.findOrganizations",path:"/organizations",component:function(e){var t=e.data,a=Object(d.b)().t,o=Object(n.useState)([]),l=Object(v.a)(o,2),i=l[0],s=l[1],c=a("table.organization.title"),u=[{name:"githubInfo.type",label:a("table.organization.type"),options:{filter:!1,sort:!0,display:!1}},{name:"githubInfo.avatar_url",label:a("table.organization.avatar"),options:{filter:!1,sort:!1,customBodyRender:function(e){return r.a.createElement(ie,{value:e})}}},{name:"name",label:a("table.organization.name"),options:{filter:!1,sort:!0}},{name:"githubInfo.login",label:a("table.organization.id"),options:{filter:!1,sort:!0}},{name:"githubInfo.description",label:a("table.organization.description"),options:{filter:!1,sort:!1}},{name:"repos.length",label:a("table.organization.repos"),options:{filter:!1,sort:!0}},{name:"githubInfo.html_url",label:" ",options:{filter:!1,customBodyRender:function(e){return r.a.createElement(L,{url:e})}}}],m={expandableRows:!0,renderExpandableRow:function(e,t){var a=i[t.dataIndex].repos.sort((function(e,t){return e.pushed_at>t.pushed_at?-1:1}));return r.a.createElement(Je,{columns:u},r.a.createElement(Ve,{data:a,nested:!0}))}};return Object(n.useEffect)((function(){t?s(t):Object(g.a)(f.a.mark((function e(){return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=s,e.next=3,Me();case 3:e.t1=e.sent,(0,e.t0)(e.t1);case 5:case"end":return e.stop()}}),e)})))()}),[t]),r.a.createElement(X,{title:c,data:i,columns:u,options:m})}},{title:"header.findRepositories",path:"/repositories",component:Ve},{title:"header.findDevelopers",path:"/developers",component:function(e){var t=e.repos,a=e.nested,o=void 0!==a&&a,l=Object(d.b)().t,i=Object(n.useState)([]),s=Object(v.a)(i,2),c=s[0],u=s[1],m=Object(n.useState)([]),p=Object(v.a)(m,2),b=p[0],h=p[1],E=l("table.developer.title"),y=[{name:"details.type",label:l("table.developer.type"),options:{filter:!0,sort:!0,display:!1}},{name:"details.avatar_url",label:l("table.developer.avatar"),options:{filter:!1,sort:!1,customBodyRender:function(e){return r.a.createElement(ie,{value:e})}}},{name:"details.login",label:l("table.developer.githubId"),options:{filter:!1,sort:!0}},{name:"majorRepoName",label:l("table.developer.majorRepoName"),options:{filter:!1,sort:!0,customBodyRender:function(e){return r.a.createElement(te,{title:e,url:"https://github.com/".concat(e)})}}},{name:"majorContributions",label:l("table.developer.majorContributions"),options:{display:!1,filter:!1,sort:!0}},{name:"repos.length",label:l("table.developer.repos"),options:{filter:!1,sort:!0}},{name:"averageContributions",label:l("table.developer.averageContributions"),options:{filter:!1,sort:!0}},{name:"details.html_url",label:" ",options:{filter:!1,sort:!1,customBodyRender:function(e){return r.a.createElement(L,{url:e})}}}],j={expandableRows:!0,renderExpandableRow:function(e,t){var a=b[t.dataIndex];return r.a.createElement(Je,{columns:y},r.a.createElement(Ve,{data:a.repos,nested:!0}))}};return Object(n.useEffect)((function(){h(function(e){var t={};return e.forEach((function(e){e.contributors.forEach((function(a){var n=a.contributions,r="".concat(a.type,"-").concat(a.login),o=t[r]||{details:a,repos:[],majorRepoName:"",majorContributions:0,totalContributions:0,averageContributions:0};o.repos.push(e),o.totalContributions+=n,n>o.majorContributions&&(o.majorContributions=n,o.majorRepoName=e.name),t[r]=o}))})),Object.keys(t).map((function(e){var a=t[e],n=a.details,r=a.totalContributions,o=a.repos;return t[e].averageContributions=parseInt((r/o.length).toFixed(0)),"Anonymous"===n.type&&(n.login="\u6c92\u6709\u4eba",n.avatar_url="https://avatars1.githubusercontent.com/u/2668086?s=200&v=4",n.html_url="https://github.com/g0v"),t[e]})).sort((function(e,t){return e.repos.length>t.repos.length?-1:1}))}(c))}),[c]),Object(n.useEffect)((function(){t?u(t):Object(g.a)(f.a.mark((function e(){return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=u,e.next=3,Te();case 3:e.t1=e.sent,(0,e.t0)(e.t1);case 5:case"end":return e.stop()}}),e)})))()}),[t]),r.a.createElement(X,{title:E,data:b,columns:y,options:j,nested:o})}},{title:"header.findCowriting",path:"/cowriting",component:function(){var e=Object(d.b)().t,t=Object(n.useState)([]),a=Object(v.a)(t,2),o=a[0],l=a[1],i=e("table.hackmdTag.listTitle"),s=[{name:"tag",label:e("table.hackmdTag.tag"),options:{filter:!1,sort:!0}},{name:"recentTitle",label:e("table.hackmdTag.recentTitle"),options:{filter:!1,sort:!0}},{name:"recentLastChangedAt",label:e("table.hackmdTag.recentLastChangedAt"),options:{filter:!1,sort:!0,customBodyRender:function(e){return C()(e).format("YYYY/MM/DD HH:MM")}}},{name:"records.length",label:e("table.hackmdTag.records"),options:{filter:!1,sort:!0}},{name:"githubRepoUrl",label:" ",options:{filter:!1,sort:!1,customBodyRender:function(e){return r.a.createElement(L,{url:e})}}},{name:"tagUrl",label:" ",options:{filter:!1,sort:!1,customBodyRender:function(t){return r.a.createElement(M,{url:t,title:e("table.hackmdTag.hackmd"),icon:r.a.createElement(W.a,null)})}}}],c={expandableRows:!0,renderExpandableRow:function(e,t){var a=o[t.dataIndex];return r.a.createElement(Je,{columns:s},r.a.createElement($e,{data:a.records,nested:!0}))}};return Object(n.useEffect)((function(){Object(g.a)(f.a.mark((function e(){return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=l,e.next=3,Ae();case 3:e.t1=e.sent,(0,e.t0)(e.t1);case 5:case"end":return e.stop()}}),e)})))()}),[]),r.a.createElement(X,{title:i,data:o,columns:s,options:c})}}],Qe=Object(i.a)((function(e){return{title:{marginRight:e.spacing(1)},space:{flexGrow:1},button:{marginLeft:e.spacing(1),marginRight:e.spacing(1)}}}));var Xe=function(){var e=Qe(),t=Object(d.b)().t,a=Object(n.useState)(!0),o=Object(v.a)(a,2),l=o[0],i=o[1],c=Object(n.useState)(""),u=Object(v.a)(c,2),m=u[0],p=u[1];return Object(n.useEffect)((function(){setTimeout(Object(g.a)(f.a.mark((function e(){var t,a;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,De();case 2:t=e.sent,a=t.updatedAt,p(a),i(!1);case 6:case"end":return e.stop()}}),e)}))),5e3)}),[]),r.a.createElement(y.a,{position:"fixed",color:"default"},r.a.createElement(j.a,{variant:"dense"},r.a.createElement(O.a,{variant:"h6",className:e.title},t("app.name")),qe.map((function(e){var a=e.title,n=e.path;return r.a.createElement(w.a,{to:n,key:a,component:E.a},t(a))})),r.a.createElement("div",{className:e.space}),l&&r.a.createElement(s.a,{size:20,color:"inherit",className:e.button}),m&&r.a.createElement(O.a,{variant:"body2",color:"textSecondary"},t("app.updatedAt")," ",C()(m).fromNow()),r.a.createElement(M,{className:e.button,url:Ye(),title:"Download JSON",icon:r.a.createElement(k.a,null)}),r.a.createElement(L,{className:e.button,url:"chunyenHuang/awesome-g0v-projects"}),r.a.createElement(_,null)))},Ze=Object(i.a)((function(e){return{main:{},spinner:{position:"absolute",top:150,left:"calc(50% - 20px)"},container:{paddingTop:55}}}));var et=function(){var e=Ze();return r.a.createElement("div",{className:e.main},r.a.createElement(c.a,{basename:window.location.pathname||""},r.a.createElement(r.a.Suspense,{fallback:r.a.createElement(s.a,{className:e.spinner})},r.a.createElement(Xe,null),r.a.createElement("div",{className:e.container},qe.map((function(e,t){return r.a.createElement(u.Route,{path:e.path,exact:!0,key:t},r.a.createElement(e.component,null))}))))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(et,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[302,1,2]]]);
//# sourceMappingURL=main.67aa0509.chunk.js.map