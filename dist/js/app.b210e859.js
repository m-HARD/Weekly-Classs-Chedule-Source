(function(e){function t(t){for(var i,r,l=t[0],u=t[1],c=t[2],o=0,h=[];o<l.length;o++)r=l[o],Object.prototype.hasOwnProperty.call(n,r)&&n[r]&&h.push(n[r][0]),n[r]=0;for(i in u)Object.prototype.hasOwnProperty.call(u,i)&&(e[i]=u[i]);d&&d(t);while(h.length)h.shift()();return s.push.apply(s,c||[]),a()}function a(){for(var e,t=0;t<s.length;t++){for(var a=s[t],i=!0,l=1;l<a.length;l++){var u=a[l];0!==n[u]&&(i=!1)}i&&(s.splice(t--,1),e=r(r.s=a[0]))}return e}var i={},n={app:0},s=[];function r(t){if(i[t])return i[t].exports;var a=i[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,r),a.l=!0,a.exports}r.m=e,r.c=i,r.d=function(e,t,a){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},r.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(r.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)r.d(a,i,function(t){return e[t]}.bind(null,i));return a},r.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="";var l=window["webpackJsonp"]=window["webpackJsonp"]||[],u=l.push.bind(l);l.push=t,l=l.slice();for(var c=0;c<l.length;c++)t(l[c]);var d=u;s.push([0,"chunk-vendors"]),a()})({0:function(e,t,a){e.exports=a("56d7")},"56d7":function(e,t,a){"use strict";a.r(t),a.d(t,"eventBus",(function(){return B}));a("e260"),a("e6cf"),a("cca6"),a("a79d");var i=a("2b0e"),n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{name:"App"}},[a("div",{staticClass:"bg-gray-100 min-h-screen",staticStyle:{width:"max-content"},attrs:{dir:"rtl"}},[a("div",{staticClass:"p-5 mx-10"},[a("nav",{staticClass:"w-full py-2 flex justify-center bg-gray-600"},[a("span",{staticClass:"mx-3 px-5 py-2 text-xl cursor-pointer bg-gray-400 rounded",on:{click:function(t){return e.navigate("app-main-ui")}}},[e._v("main")]),a("span",{staticClass:"mx-3 px-5 py-2 text-xl cursor-pointer bg-gray-400 rounded",on:{click:function(t){return e.navigate("app-user-config-ui")}}},[e._v("UserConfigUI")]),a("span",{staticClass:"mx-3 px-5 py-2 text-xl cursor-pointer bg-gray-400 rounded",on:{click:function(t){return e.navigate("app-view-some-data")}}},[e._v("some data")])]),a("keep-alive",[a(e.currentView,{tag:"component",attrs:{data:{subInClasses:e.subInClasses,userConfig:e.userConfig}}})],1)],1)])])},s=[],r=(a("4de4"),{data:function(){return{subInDay:["الأولى","التانية","التالتة","الرابعة","الخامسة","السادسة","السابعة","التامنة","الناسعة"],dayOfWeek:[{id:1,name:"السبت"},{id:2,name:"الأحد"},{id:3,name:"الأثنين"},{id:4,name:"الثلاثاء"},{id:5,name:"الأربعاء"},{id:6,name:"الخميس"}],classes:[{id:1,name:"الأول",subInDay:6},{id:2,name:"الثاني",subInDay:6},{id:3,name:"الثالث",subInDay:6},{id:4,name:"الرابع",subInDay:7},{id:5,name:"الخامس",subInDay:7},{id:6,name:"السادس",subInDay:7},{id:7,name:"السابع",subInDay:7},{id:8,name:"الثامن",subInDay:8}],subjects:[{id:1,name:"قران"},{id:2,name:"عربي"},{id:3,name:"رياضيات"},{id:4,name:"فقه"},{id:5,name:"احياء"},{id:6,name:"كيمياء"},{id:7,name:"حاسوب"},{id:8,name:"مسككننا"},{id:9,name:"ملبسنا"},{id:10,name:"العلم في حياتنا"},{id:11,name:"مهارات"},{id:12,name:"تاريخ"},{id:13,name:"جغرافيا"},{id:14,name:"نشاط"},{id:15,name:"علوم"},{id:16,name:"انجليزي"},{id:17,name:"قصة"},{id:18,name:"فنون"},{id:19,name:"اسلامي"},{id:20,name:"معاصر"},{id:21,name:"تقنية"},{id:22,name:"سلامتنا"}],teachers:[{id:1,name:"مصعب"},{id:2,name:"محمد"},{id:3,name:"ابو القاسم"},{id:4,name:"حسن"},{id:5,name:"احمد"},{id:6,name:"دعاء"},{id:7,name:"نون"},{id:8,name:"عمر"},{id:9,name:"حمادة"},{id:10,name:"فاروق"},{id:11,name:"روان"},{id:12,name:"صفاء"},{id:13,name:"ريان"},{id:14,name:"ماريا"},{id:15,name:"فاطمة صالح"},{id:16,name:"فاطمة اسحق"},{id:17,name:"انتصار"},{id:18,name:"الهام"},{id:19,name:"فاطمة آدم"},{id:20,name:"زينب ابراهيم"},{id:21,name:"تسابيح"},{id:22,name:"سحر"},{id:23,name:"بلابل"},{id:24,name:"خديجة"},{id:25,name:"منى"},{id:26,name:"ماجدة"},{id:27,name:"حياة"},{id:28,name:"هدى"},{id:29,name:"سهام"},{id:30,name:"وصال"},{id:31,name:"صدام"},{id:32,name:"زينب حسن"},{id:33,name:"1"},{id:34,name:"2"},{id:35,name:"3"},{id:36,name:"4"},{id:37,name:"5"},{id:38,name:"6"},{id:39,name:"7"},{id:40,name:"8"}],colors:["#B46EC75c","#6FC76E5c","#6EC6C75c","#6E98C75c","#6E6EC75c","#C76E6E5c","#C6C76E5c","#8EC76E5c","#C7A46E5c","#C79B6E5c","#896EC75c","#A76EC75c","#C76EA15c","#C76E8A5c","#C76E7A5c","#6E96C75c","#C76EB35c","#C7AD6E5c","#C6C76E5c","#98C76E5c","#6EC77A5c","#6EC7AB5c","#6EB3C75c","#6E91C75c","#C7C76E5c","#6EC77E5c","#6EC7B55c","#C7B06E5c","#FBBB035c","#BFFB035c"]}},methods:{userDataBy:function(e,t){return"class"==e?this.data.userConfig.filter((function(e){return e.theClass.id==t})):"teacher"==e?this.data.userConfig.filter((function(e){return e.teacher.id==t})):"subject"==e?this.data.userConfig.filter((function(e){return e.subject.id==t})):[]},svg:function(){return"\n                <div class='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>\n                    <svg class='fill-current h-4 w-4' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>\n                        <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z'/>\n                    </svg>\n                </div>\n              "}}}),l=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"l16 bg-gray-100 min-h-screen",attrs:{dir:"rtl"}},[a("div",{staticClass:"p-5 mx-10"},[a("div",{staticClass:"w-full flex justify-center"},[a("button",{staticClass:"p-2 mt-5 mx-5 bg-gray-400 rounded hover:bg-gray-500 focus:outline-none cursor-pointer",on:{click:function(t){return e.addSubjectToAllClass()}}},[e._v("Random")]),a("button",{staticClass:"p-2 mt-5 mx-5 bg-gray-400 rounded hover:bg-gray-500 focus:outline-none cursor-pointer",on:{click:function(t){return e.addSubjectToAllClassByFirstToEndClass()}}},[e._v("Random from first class to end")])]),a("div",{staticClass:"mt-64"},e._l(e.classes,(function(t,i){return a("div",{key:i},[e._v(" "+e._s(t.name)+" : "),e._l(e.iCanNotAddIt[t.id-1],(function(t,i){return a("ul",{key:i,staticClass:"mx-5"},[a("li",[e._v(e._s(t))])])}))],2)})),0),a("div",{staticClass:"w-full mt-20"},e._l(e.classes,(function(t){return a("table",{key:t.id,staticClass:"w-full table-auto mt-10"},[a("thead",[a("tr",{staticClass:"flex flex-wrap font-bold mb-1 border-b-2 border-gray-400"},[a("td",{staticClass:"w-64 font-extrabold text-xl"},[e._v("الصف "+e._s(t.name))]),e._l(t.subInDay,(function(t,i){return a("td",{key:i,staticClass:"w-56 font-semibold"},[e._v(e._s(e.subInDay[t-1]))])}))],2)]),a("tbody",e._l(e.dayOfWeek,(function(i){return a("tr",{key:i.id,staticClass:"flex flex-wrap border-b-2 border-gray-400"},[a("td",{staticClass:"w-64 font-semibold"},[e._v(e._s(i.name))]),e._l(e.data.subInClasses[t.id-1][i.id-1],(function(t,i){return a("td",{key:i,staticClass:"w-56",style:null!=t.subject.name?{"background-color":0==e.colorDefulte?e.colors[(t.subject.id-1)%30]:1==e.colorDefulte?e.colors[(t.teacher.id-1)%30]:22==t.teacher.id||"عربي"==t.subject.name?e.colors[0]:""}:""},[e._v(" "+e._s(t.subject.name)+" "+e._s(null!=t.teacher.name&&""!=t.teacher.name?"("+t.teacher.name+")":"")+" ")])}))],2)})),0)])})),0),a("div",{staticClass:"w-full flex justify-center"},[a("button",{staticClass:"p-2 mt-5 mx-5 bg-gray-400 rounded hover:bg-gray-500 focus:outline-none cursor-pointer",on:{click:function(t){e.colorDefulte=(e.colorDefulte+1)%3}}},[e._v("change color")])])])])},u=[],c=(a("4160"),a("a434"),a("b0c0"),a("159b"),{name:"mainUi",mixins:[r],props:{data:{type:Object,required:!0}},data:function(){return{iCanNotAddIt:[],bestDistribution:{data:null,canNotAddLength:null},colorDefulte:3}},created:function(){for(var e=0;e<this.classes.length;e++)this.iCanNotAddIt.push([])},methods:{emptySubInClass:function(e){for(var t=[],a=0;a<e.length;a++){for(var i=[],n=0;n<e[a].length;n++)null==e[a][n].subject.name&&i.push({data:e[a][n],loc:n});t.push({data:i,loc:a})}for(var s=0;s<t.length;s++)0==t[s].data.length&&(t.splice(s,1),s--);return t},teacherIsEmpty:function(e,t,a){var i=!0;return this.data.subInClasses.forEach((function(n){"undefined"!=typeof n[t][a]&&n[t][a].teacher.id==e&&(i=!1)})),i},nextLocIsEmpty:function(e,t,a,i){return"undefined"!=typeof e&&("undefined"!=typeof e.data&&("undefined"!=typeof e.data.subject.name&&(null==e.data.subject.name&&(e.loc==i+1&&this.teacherIsEmpty(t,a,e.loc)))))},DayHasNoThisSubject:function(e,t,a){var i=!0;return this.data.subInClasses[e-1][t].forEach((function(e){e.subject.id==a&&(i=!1)})),i},canAdd:function(e){var t=0,a=this.emptySubInClass(e.theClass),i=!1;if(a.length>0){i=!0;do{var n=Math.floor(Math.random()*a.length),s=Math.floor(Math.random()*a[n].data.length);if(500==t++){i=!1,this.iCanNotAddIt[e.data.theClass.id-1].push(e.data);break}var r=a[n],l=this.teacherIsEmpty(e.teacherId,r.loc,r.data[s].loc),u=null==r.data[s].data.subject.name&&l;2==e.data.size&&(u=u&&this.nextLocIsEmpty(r.data[s+1],e.teacherId,r.loc,r.data[s].loc)),2==e.data.duplication&&(u=u&&this.DayHasNoThisSubject(e.data.theClass.id,r.loc,e.data.subject.id))}while(!u)}else this.iCanNotAddIt[e.data.theClass.id-1].push(e.data);var c={iCan:!1,location:0,location2:0};return i&&u&&(c={iCan:i,location:a[n].data[s].data,location2:2==e.data.size?a[n].data[s+1].data:0}),c},addSubjectToClass:function(e,t){var a=this.data.subInClasses[e-1],i=this.canAdd({theClass:a,teacherId:t.teacher.id,data:t});i.iCan&&(i.location.subject=t.subject,i.location.teacher=t.teacher,2==t.size&&(i.location2.subject=t.subject,i.location2.teacher=t.teacher))},addSubjectToAllClass:function(){var e=this;this.restartData(),this.data.userConfig.forEach((function(t){e.addSubjectToClass(t.theClass.id,t)})),this.checkIfBestDistribution()},addSubjectToAllClassByFirstToEndClass:function(){var e=this;this.restartData(),this.classes.forEach((function(t){e.addSubjectToSpecificallyClass(t.id)})),this.checkIfBestDistribution()},addSubjectToSpecificallyClass:function(e){var t=this;this.iCanNotAddIt[e-1]=[],this.data.subInClasses[e-1].forEach((function(e){e.forEach((function(e){e.subject={id:null,name:null},e.teacher={id:null,name:null}}))})),this.userDataBy("class",e).forEach((function(e){t.addSubjectToClass(e.theClass.id,e)}))},addBestDistribution:function(e){(null==this.bestDistribution.canNotAddLength||this.iCanNotAddIt[e-1].length<this.bestDistribution.canNotAddLength)&&(this.bestDistribution.data=this.data.subInClasses[e-1],this.bestDistribution.canNotAddLength=this.iCanNotAddIt[e-1].length),this.iCanNotAddIt[e-1].length>this.bestDistribution.canNotAddLength&&null!=this.bestDistribution.canNotAddLength&&(this.data.subInClasses[e-1]=this.bestDistribution.data,this.iCanNotAddIt[e-1].length=this.bestDistribution.canNotAddLength)},addSubjectToAllClassWithOutCheck:function(){var e=this;this.restartData(),this.data.userConfig.forEach((function(t){e.addSubjectToClass(t.theClass.id,t)}))},checkIfBestDistribution:function(){var e=this,t=0;this.iCanNotAddIt.forEach((function(e){e.length>0&&(t+=e.length)}));var a=0;while(t>0){if(this.iCanNotAddIt.forEach((function(t){var a=0;if(t.length>0){var i=t[0].theClass.id;while(e.iCanNotAddIt[i-1].length>0)if(e.addSubjectToSpecificallyClass(i),e.addBestDistribution(i),400==a++)break;e.bestDistribution={data:null,canNotAddLength:null}}})),t=0,this.iCanNotAddIt.forEach((function(e){e.length>0&&(t+=e.length)})),20==++a)break;t>0&&a%5==0&&(console.log("change table"),this.addSubjectToAllClassWithOutCheck()),t>0&&a%10==0&&console.log("change user Config")}a=0},restartData:function(){for(var e=0;e<this.iCanNotAddIt.length;e++)this.iCanNotAddIt[e]=[];this.data.subInClasses.forEach((function(e){e.forEach((function(e){e.forEach((function(e){e.subject={id:null,name:null},e.teacher={id:null,name:null}}))}))}))}}}),d=c,o=a("2877"),h=Object(o["a"])(d,l,u,!1,null,null,null),m=h.exports,f=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"l16"},[a("div",{staticClass:"w-full flex justify-center"},[a("button",{staticClass:"p-2 mt-5 mx-5 bg-gray-400 rounded hover:bg-gray-500 focus:outline-none cursor-pointer",on:{click:function(t){return e.sortUserConfigBySubject()}}},[e._v("sort By Subject")]),a("button",{staticClass:"p-2 mt-5 mx-5 bg-gray-400 rounded hover:bg-gray-500 focus:outline-none cursor-pointer",on:{click:function(t){return e.sortUserConfigByClass()}}},[e._v("sort By Class")]),a("button",{staticClass:"p-2 mt-5 mx-5 bg-gray-400 rounded hover:bg-gray-500 focus:outline-none cursor-pointer",on:{click:function(t){return e.sortUserConfigByTeatcherCount()}}},[e._v("sort By Teacher")]),a("button",{staticClass:"p-2 mt-5 mx-5 bg-gray-400 rounded hover:bg-gray-500 focus:outline-none cursor-pointer",on:{click:function(t){return e.sortUserConfigByDuplication()}}},[e._v("sort by duplication")]),a("button",{staticClass:"p-2 mt-5 mx-5 bg-gray-400 rounded hover:bg-gray-500 focus:outline-none cursor-pointer",on:{click:function(t){return e.sortUserConfigBySize()}}},[e._v("sort by size")])]),a("div",{staticClass:"mt-64"},e._l(e.defultUserConfigBeforeChange,(function(t,i){return a("ul",{key:i},[a("li",[e._v(e._s(t))])])})),0),a("div",{staticClass:"w-full flex justify-center mt-10"},[a("button",{staticClass:"p-2 mt-5 mx-5 bg-gray-400 rounded hover:bg-gray-500 focus:outline-none cursor-pointer",on:{click:function(t){return e.retailUserConfig("all")}}},[e._v("retail user config")]),a("button",{staticClass:"p-2 mt-5 mx-5 bg-gray-400 rounded hover:bg-gray-500 focus:outline-none cursor-pointer",on:{click:function(t){return e.retailUserConfig("class",5)}}},[e._v("retail user config by class")])]),a("div",{staticClass:"mt-10"},[e._v(" after change : "),e._l(e.data.userConfig,(function(t,i){return a("ul",{key:i},[a("li",[e._v(e._s(t))])])}))],2),a("div",[a("div",{staticClass:"flex justify-center mt-20"},[a("div",{staticClass:"w-full max-w-2xl bg-white rounded-lg p-6"},[a("div",{staticClass:"flex flex-wrap -mx-3"},[a("div",{staticClass:"w-1/3 px-3 mb-6"},[a("label",{staticClass:"lableClasses"},[e._v("teachers")]),a("div",{staticClass:"relative"},[a("select",{directives:[{name:"model",rawName:"v-model",value:e.userTeacher,expression:"userTeacher"}],staticClass:"selectClasses",on:{change:function(t){var a=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.userTeacher=t.target.multiple?a:a[0]}}},e._l(e.teachers,(function(t,i){return a("option",{key:i,domProps:{value:t}},[e._v(e._s(t.name))])})),0),a("div",{domProps:{innerHTML:e._s(e.svg())}})])]),a("div",{staticClass:"w-1/3 px-3 mb-6"},[a("label",{staticClass:"lableClasses"},[e._v("subjects")]),a("div",{staticClass:"relative"},[a("select",{directives:[{name:"model",rawName:"v-model",value:e.userSubjects,expression:"userSubjects"}],staticClass:"selectClasses",on:{change:function(t){var a=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.userSubjects=t.target.multiple?a:a[0]}}},e._l(e.subjects,(function(t,i){return a("option",{key:i,domProps:{value:t,textContent:e._s(t.name)}})})),0),a("div",{domProps:{innerHTML:e._s(e.svg())}})])]),a("div",{staticClass:"w-1/3 px-3 mb-6"},[a("label",{staticClass:"lableClasses"},[e._v("class")]),a("div",{staticClass:"relative"},[a("select",{directives:[{name:"model",rawName:"v-model",value:e.userClass,expression:"userClass"}],staticClass:"selectClasses",on:{change:function(t){var a=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.userClass=t.target.multiple?a:a[0]}}},e._l(e.classes,(function(t,i){return a("option",{key:i,domProps:{value:t,textContent:e._s(t.name)}})})),0),a("div",{domProps:{innerHTML:e._s(e.svg())}})])]),a("div",{staticClass:"w-full px-3"},[a("button",{staticClass:"btnClasses bg-green-400",on:{click:function(t){return e.addToUserConfig()}}},[e._v("add")])])])])])])])},b=[],C=[{theClass:{id:2,name:"الثاني",subInDay:6},teacher:{id:21,name:"تسابيح"},subject:{id:1,name:"قران"},size:5,duplication:0,retail:0},{theClass:{id:2,name:"الثاني",subInDay:6},teacher:{id:19,name:"فاطمة آدم"},subject:{id:16,name:"انجليزي"},size:3,duplication:0,retail:1},{theClass:{id:2,name:"الثاني",subInDay:6},teacher:{id:24,name:"خديجة"},subject:{id:17,name:"قصة"},size:3,duplication:0,retail:1},{theClass:{id:2,name:"الثاني",subInDay:6},teacher:{id:21,name:"تسابيح"},subject:{id:4,name:"فقه"},size:2,duplication:0,retail:1},{theClass:{id:2,name:"الثاني",subInDay:6},teacher:{id:23,name:"بلابل"},subject:{id:18,name:"فنون"},size:2,duplication:0,retail:1},{theClass:{id:2,name:"الثاني",subInDay:6},teacher:{id:34,name:"2"},subject:{id:14,name:"نشاط"},size:2,duplication:0,retail:2},{theClass:{id:2,name:"الثاني",subInDay:6},teacher:{id:22,name:"سحر"},subject:{id:3,name:"رياضيات"},size:8,duplication:0,retail:4},{theClass:{id:2,name:"الثاني",subInDay:6},teacher:{id:22,name:"سحر"},subject:{id:2,name:"عربي"},size:11,duplication:0,retail:4},{theClass:{id:3,name:"الثالث",subInDay:6},teacher:{id:16,name:"فاطمة اسحق"},subject:{id:16,name:"انجليزي"},size:4,duplication:0,retail:0},{theClass:{id:3,name:"الثالث",subInDay:6},teacher:{id:17,name:"انتصار"},subject:{id:18,name:"فنون"},size:1,duplication:0,retail:0},{theClass:{id:3,name:"الثالث",subInDay:6},teacher:{id:15,name:"فاطمة صالح"},subject:{id:1,name:"قران"},size:5,duplication:0,retail:1},{theClass:{id:3,name:"الثالث",subInDay:6},teacher:{id:17,name:"انتصار"},subject:{id:13,name:"جغرافيا"},size:2,duplication:0,retail:1},{theClass:{id:3,name:"الثالث",subInDay:6},teacher:{id:14,name:"ماريا"},subject:{id:12,name:"تاريخ"},size:3,duplication:0,retail:1},{theClass:{id:3,name:"الثالث",subInDay:6},teacher:{id:17,name:"انتصار"},subject:{id:15,name:"علوم"},size:3,duplication:0,retail:1},{theClass:{id:3,name:"الثالث",subInDay:6},teacher:{id:27,name:"حياة"},subject:{id:4,name:"فقه"},size:3,duplication:0,retail:1},{theClass:{id:3,name:"الثالث",subInDay:6},teacher:{id:26,name:"ماجدة"},subject:{id:3,name:"رياضيات"},size:5,duplication:0,retail:2},{theClass:{id:3,name:"الثالث",subInDay:6},teacher:{id:35,name:"3"},subject:{id:14,name:"نشاط"},size:2,duplication:0,retail:2},{theClass:{id:3,name:"الثالث",subInDay:6},teacher:{id:22,name:"سحر"},subject:{id:2,name:"عربي"},size:8,duplication:0,retail:3},{theClass:{id:4,name:"الرابع",subInDay:7},teacher:{id:16,name:"فاطمة اسحق"},subject:{id:16,name:"انجليزي"},size:3,duplication:2,retail:1},{theClass:{id:4,name:"الرابع",subInDay:7},teacher:{id:15,name:"فاطمة صالح"},subject:{id:1,name:"قران"},size:5,duplication:2,retail:1},{theClass:{id:4,name:"الرابع",subInDay:7},teacher:{id:14,name:"ماريا"},subject:{id:13,name:"جغرافيا"},size:2,duplication:2,retail:1},{theClass:{id:4,name:"الرابع",subInDay:7},teacher:{id:17,name:"انتصار"},subject:{id:15,name:"علوم"},size:3,duplication:2,retail:1},{theClass:{id:4,name:"الرابع",subInDay:7},teacher:{id:14,name:"ماريا"},subject:{id:12,name:"تاريخ"},size:3,duplication:2,retail:1},{theClass:{id:4,name:"الرابع",subInDay:7},teacher:{id:11,name:"روان"},subject:{id:11,name:"مهارات"},size:2,duplication:0,retail:1},{theClass:{id:4,name:"الرابع",subInDay:7},teacher:{id:11,name:"روان"},subject:{id:7,name:"حاسوب"},size:2,duplication:0,retail:1},{theClass:{id:4,name:"الرابع",subInDay:7},teacher:{id:14,name:"ماريا"},subject:{id:4,name:"فقه"},size:2,duplication:0,retail:1},{theClass:{id:4,name:"الرابع",subInDay:7},teacher:{id:13,name:"ريان"},subject:{id:3,name:"رياضيات"},size:7,duplication:2,retail:2},{theClass:{id:4,name:"الرابع",subInDay:7},teacher:{id:18,name:""},subject:{id:14,name:"نشاط"},size:2,duplication:0,retail:2},{theClass:{id:4,name:"الرابع",subInDay:7},teacher:{id:12,name:"صفاء"},subject:{id:2,name:"عربي"},size:9,duplication:2,retail:3},{theClass:{id:5,name:"الخامس",subInDay:7},teacher:{id:16,name:"فاطمة اسحق"},subject:{id:16,name:"انجليزي"},size:6,duplication:2,retail:0},{theClass:{id:5,name:"الخامس",subInDay:7},teacher:{id:27,name:"حياة"},subject:{id:4,name:"فقه"},size:2,duplication:2,retail:1},{theClass:{id:5,name:"الخامس",subInDay:7},teacher:{id:11,name:"روان"},subject:{id:7,name:"حاسوب"},size:2,duplication:2,retail:1},{theClass:{id:5,name:"الخامس",subInDay:7},teacher:{id:17,name:"انتصار"},subject:{id:15,name:"علوم"},size:5,duplication:2,retail:1},{theClass:{id:5,name:"الخامس",subInDay:7},teacher:{id:14,name:"ماريا"},subject:{id:12,name:"تاريخ"},size:2,duplication:0,retail:1},{theClass:{id:5,name:"الخامس",subInDay:7},teacher:{id:15,name:"فاطمة صالح"},subject:{id:1,name:"قران"},size:4,duplication:0,retail:1},{theClass:{id:5,name:"الخامس",subInDay:7},teacher:{id:17,name:"انتصار"},subject:{id:13,name:"جغرافيا"},size:2,duplication:0,retail:1},{theClass:{id:5,name:"الخامس",subInDay:7},teacher:{id:37,name:"5"},subject:{id:14,name:"نشاط"},size:2,duplication:2,retail:2},{theClass:{id:5,name:"الخامس",subInDay:7},teacher:{id:12,name:"صفاء"},subject:{id:2,name:"عربي"},size:9,duplication:2,retail:3},{theClass:{id:5,name:"الخامس",subInDay:7},teacher:{id:28,name:"هدى"},subject:{id:3,name:"رياضيات"},size:7,duplication:2,retail:3},{theClass:{id:6,name:"السادس",subInDay:7},teacher:{id:31,name:"صدام"},subject:{id:1,name:"قران"},size:5,duplication:0,retail:0},{theClass:{id:6,name:"السادس",subInDay:7},teacher:{id:14,name:"ماريا"},subject:{id:22,name:"سلامتنا"},size:3,duplication:2,retail:1},{theClass:{id:6,name:"السادس",subInDay:7},teacher:{id:30,name:"وصال"},subject:{id:15,name:"علوم"},size:4,duplication:2,retail:1},{theClass:{id:6,name:"السادس",subInDay:7},teacher:{id:21,name:"تسابيح"},subject:{id:4,name:"فقه"},size:3,duplication:2,retail:1},{theClass:{id:6,name:"السادس",subInDay:7},teacher:{id:38,name:"6"},subject:{id:14,name:"نشاط"},size:2,duplication:0,retail:2},{theClass:{id:6,name:"السادس",subInDay:7},teacher:{id:29,name:"سهام"},subject:{id:16,name:"انجليزي"},size:7,duplication:2,retail:3},{theClass:{id:6,name:"السادس",subInDay:7},teacher:{id:26,name:"ماجدة"},subject:{id:3,name:"رياضيات"},size:7,duplication:2,retail:3},{theClass:{id:6,name:"السادس",subInDay:7},teacher:{id:24,name:"خديجة"},subject:{id:2,name:"عربي"},size:9,duplication:2,retail:3},{theClass:{id:7,name:"السابع",subInDay:8},teacher:{id:31,name:"صدام"},subject:{id:1,name:"قران"},size:5,duplication:2,retail:0},{theClass:{id:7,name:"السابع",subInDay:8},teacher:{id:19,name:"فاطمة آدم"},subject:{id:21,name:"تقنية"},size:2,duplication:0,retail:1},{theClass:{id:7,name:"السابع",subInDay:8},teacher:{id:23,name:"بلابل"},subject:{id:19,name:"اسلامي"},size:3,duplication:0,retail:1},{theClass:{id:7,name:"السابع",subInDay:8},teacher:{id:21,name:"تسابيح"},subject:{id:4,name:"فقه"},size:2,duplication:0,retail:1},{theClass:{id:7,name:"السابع",subInDay:8},teacher:{id:30,name:"وصال"},subject:{id:15,name:"علوم"},size:4,duplication:2,retail:1},{theClass:{id:7,name:"السابع",subInDay:8},teacher:{id:19,name:"فاطمة آدم"},subject:{id:16,name:"انجليزي"},size:7,duplication:2,retail:2},{theClass:{id:7,name:"السابع",subInDay:8},teacher:{id:28,name:"هدى"},subject:{id:3,name:"رياضيات"},size:7,duplication:2,retail:2},{theClass:{id:7,name:"السابع",subInDay:8},teacher:{id:39,name:"7"},subject:{id:14,name:"نشاط"},size:2,duplication:0,retail:2},{theClass:{id:7,name:"السابع",subInDay:8},teacher:{id:27,name:"حياة"},subject:{id:2,name:"عربي"},size:9,duplication:2,retail:3},{theClass:{id:8,name:"الثامن",subInDay:8},teacher:{id:30,name:"وصال"},subject:{id:15,name:"علوم"},size:5,duplication:2,retail:0},{theClass:{id:8,name:"الثامن",subInDay:8},teacher:{id:31,name:"صدام"},subject:{id:1,name:"قران"},size:5,duplication:2,retail:0},{theClass:{id:8,name:"الثامن",subInDay:8},teacher:{id:26,name:"ماجدة"},subject:{id:21,name:"تقنية"},size:4,duplication:2,retail:1},{theClass:{id:8,name:"الثامن",subInDay:8},teacher:{id:13,name:"ريان"},subject:{id:20,name:"معاصر"},size:4,duplication:0,retail:1},{theClass:{id:8,name:"الثامن",subInDay:8},teacher:{id:7,name:"نون"},subject:{id:4,name:"فقه"},size:3,duplication:0,retail:1},{theClass:{id:8,name:"الثامن",subInDay:8},teacher:{id:32,name:"زينب حسن"},subject:{id:3,name:"رياضيات"},size:4,duplication:2,retail:2},{theClass:{id:8,name:"الثامن",subInDay:8},teacher:{id:2,name:"محمد"},subject:{id:3,name:"رياضيات"},size:2,duplication:2,retail:2},{theClass:{id:8,name:"الثامن",subInDay:8},teacher:{id:24,name:"خديجة"},subject:{id:2,name:"عربي"},size:4,duplication:2,retail:2},{theClass:{id:8,name:"الثامن",subInDay:8},teacher:{id:23,name:"بلابل"},subject:{id:2,name:"عربي"},size:6,duplication:2,retail:2},{theClass:{id:8,name:"الثامن",subInDay:8},teacher:{id:29,name:"سهام"},subject:{id:16,name:"انجليزي"},size:7,duplication:2,retail:3}],p={name:"viewSomeData",mixins:[r],props:{data:{type:Object,required:!0}},data:function(){return{defultUserConfigBeforeChange:C,userClass:null,userTeacher:null,userSubjects:null}},methods:{checkIfFoundError:function(){var e=this,t=!1;return this.defultUserConfigBeforeChange.forEach((function(a){a.size>2*e.dayOfWeek.length&&(t=!0)})),t},retailUserConfig:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,i=[];if(!this.checkIfFoundError()){var n=this.defultUserConfigBeforeChange;if("class"==t&&null!=a){var s=this.defultUserConfigBeforeChange.filter((function(e){return e.theClass.id==a}));n=s}n.forEach((function(t){var a=e.retailSingleUserConfig(t);a.forEach((function(e){i.push({theClass:t.theClass,teacher:t.teacher,subject:t.subject,size:e,duplication:t.duplication})}))})),B.$emit("retailUserConfig",i)}},retailSingleUserConfig:function(e){var t=[],a=e.retail;if(0==a){for(var i=0;i<this.dayOfWeek.length;i++)t.push(0);var n=e.size;while(n>0){do{var s=Math.floor(Math.random()*t.length)}while(t[s]+1>2);t[s]+=1,n-=1}for(var r=0;r<t.length;r++)0==t[r]&&(t.splice(r,1),r--);t.sort((function(e,t){return e==t?0:e<t?1:-1}))}if(1==a||3==a){var l=e.size,u=0;while(l>0)t.length<this.dayOfWeek.length?(t.push(1),l-=1):(t[t.length%this.dayOfWeek.length+u++]+=1,l-=1)}if(2==a){var c=e.size;while(c>0)c%2==0?(t.push(2),c-=2):(t.push(1),c-=1);t.sort((function(e,t){return e==t?0:e<t?1:-1}))}if(4==a){var d=e.size;while(d>0)if(1==d)t.push(1),d-=1;else{var o=Math.floor(2*Math.random()+1);t.push(o),d-=o}t.sort((function(e,t){return e==t?0:e<t?1:-1}))}return t},sortUserConfigBySubject:function(){this.data.userConfig.sort(function(e,t){return e.subject.id==t.subject.id?0:e.subject.id>t.subject.id?1:-1}.bind(this))},sortUserConfigByClass:function(){this.data.userConfig.sort(function(e,t){return e.theClass.id==t.theClass.id?0:e.theClass.id>t.theClass.id?1:-1}.bind(this))},addToUserConfig:function(){null!=this.userClass&&null!=this.userTeacher&&null!=this.userSubjects&&(this.data.userConfig.push({theClass:this.userClass,teacher:this.userTeacher,subject:this.userSubjects}),this.userTeacher=null,this.userSubjects=null)},sortUserConfigByTeatcherCount:function(){this.data.userConfig.sort(function(e,t){var a=this.userDataBy("teacher",e.teacher.id).length,i=this.userDataBy("teacher",t.teacher.id).length;return a==i?0:a<i?1:-1}.bind(this))},sortUserConfigByDuplication:function(){this.data.userConfig.sort(function(e,t){return e.duplication==t.duplication?0:e.duplication<t.duplication?1:-1}.bind(this))},sortUserConfigBySize:function(){this.data.userConfig.sort(function(e,t){return e.size==t.size?0:e.size<t.size?1:-1}.bind(this))}}},y=p,g=Object(o["a"])(y,f,b,!1,null,null,null),v=g.exports,j=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"l16"},[a("div",{staticClass:"w-full mt-20"},[a("table",{staticClass:"w-full table-auto mt-10"},[a("thead",[a("tr",{staticClass:"flex flex-wrap font-bold mb-1"},[a("td",{staticClass:"w-20 font-extrabold text-xl"},[e._v("الأستاذ")]),e._l(e.teachers,(function(t){return a("td",{key:t.id,staticClass:"w-16 font-semibold"},[e._v(e._s(t.name))])}))],2)]),a("tbody",[a("tr",{staticClass:"flex flex-wrap"},[a("td",{staticClass:"w-20 font-semibold"},[e._v(" عدد الحصص")]),e._l(e.teachers,(function(t){return a("td",{key:t.id,staticClass:"w-16"},[e._v(e._s(e.userDataBy("teacher",t.id).length))])}))],2)])])]),a("div",{staticClass:"w-full mt-20"},[a("table",{staticClass:"w-full table-auto mt-10"},[a("thead",[a("tr",{staticClass:"flex flex-wrap font-bold mb-1"},[a("td",{staticClass:"w-20 font-extrabold text-xl"},[e._v("الفصل")]),e._l(e.classes,(function(t){return a("td",{key:t.id,staticClass:"w-16 font-semibold"},[e._v(e._s(t.name))])}))],2)]),a("tbody",[a("tr",{staticClass:"flex flex-wrap"},[a("td",{staticClass:"w-20 font-semibold"},[e._v(" عدد الحصص")]),e._l(e.classes,(function(t){return a("td",{key:t.id,staticClass:"w-16"},[e._v(e._s(e.userDataBy("class",t.id).length))])}))],2)])])]),a("div",{staticClass:"w-full mt-20"},e._l(e.teachers,(function(t){return a("table",{key:t.id,staticClass:"w-full table-auto mt-10"},[a("thead",[a("tr",{staticClass:"flex flex-wrap font-bold mb-1 border-b-2 border-gray-400"},[a("td",{staticClass:"w-64 font-extrabold text-xl"},[e._v("استاذ "+e._s(t.name))]),e._l(8,(function(t,i){return a("td",{key:i,staticClass:"w-56 font-semibold"},[e._v(e._s(e.subInDay[t-1]))])}))],2)]),a("tbody",e._l(e.dayOfWeek,(function(i){return a("tr",{key:i.id,staticClass:"flex flex-wrap border-b-2 border-gray-400"},[a("td",{staticClass:"w-64 font-semibold"},[e._v(e._s(i.name))]),e._l(8,(function(n,s){return a("td",{key:s,staticClass:"w-56"},e._l(e.getSubsOfTeacher(t.id,i.id-1,n-1),(function(t,i){return a("span",{key:i},[e._v(e._s(t))])})),0)}))],2)})),0)])})),0)])},I=[],D={name:"viewSomeData",mixins:[r],props:{data:{type:Object,required:!0}},data:function(){return{userClass:null,userTeacher:null,userSubjects:null}},methods:{getSubsOfTeacher:function(e,t,a){var i=[];return this.data.subInClasses.forEach((function(n){"undefined"!=typeof n[t][a]&&n[t][a].teacher.id==e&&i.push(n[t][a].subject.name+" ("+(n[t][a].oId[0]+1)+")")})),i},userDataBy:function(e,t){return"class"==e?this.data.userConfig.filter((function(e){return e.theClass.id==t})):"teacher"==e?this.data.userConfig.filter((function(e){return e.teacher.id==t})):"subject"==e?this.data.userConfig.filter((function(e){return e.subject.id==t})):[]}}},_=D,x=Object(o["a"])(_,j,I,!1,null,null,null),z=x.exports;i["a"].component("app-main-ui",m),i["a"].component("app-user-config-ui",v),i["a"].component("app-view-some-data",z);var w={name:"App",mixins:[r],data:function(){return{currentView:"app-main-ui",subInClasses:[],userConfig:[]}},created:function(){var e=this;this.addSubInClass(),B.$on("retailUserConfig",(function(t){e.userConfig=t}))},methods:{navigate:function(e){this.currentView=e},addSubInClass:function(){for(var e=0,t=0;t<this.classes.length;t++){for(var a=this.classes[t],i=[],n=0;n<this.dayOfWeek.length;n++){for(var s=[],r=0;r<a.subInDay;r++)s.push({id:e,sId:r+","+n+","+t,oId:[t,n,r],subject:{id:null,name:null},teacher:{id:null,name:null}}),e++;i.push(s)}this.subInClasses.push(i)}}}},E=w,k=Object(o["a"])(E,n,s,!1,null,null,null),S=k.exports,B=(a("def6"),new i["a"]);i["a"].config.productionTip=!1,new i["a"]({render:function(e){return e(S)}}).$mount("#app")},def6:function(e,t,a){}});
//# sourceMappingURL=app.b210e859.js.map