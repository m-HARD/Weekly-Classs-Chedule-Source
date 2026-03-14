<template>
  <div name="App" style="min-width: -webkit-fill-available;width: max-content;">
    <div class="bg-gray-200 min-h-screen pt-10" dir="rtl">
        
        <nav class="w-full py-2 flex justify-center bg-gray-600">
          <span @click="currentView ='test'" class="mx-3 px-5 py-2 text-xl cursor-pointer bg-gray-400 rounded">test</span>
          <span @click="currentView ='app-main-ui'" class="mx-3 px-5 py-2 text-xl cursor-pointer bg-gray-400 rounded">Main</span>
          <span @click="currentView ='add-main-data'" class="mx-3 px-5 py-2 text-xl cursor-pointer bg-gray-400 rounded">Add Main Data</span>
          <span @click="currentView ='app-user-config-ui'" class="mx-3 px-5 py-2 text-xl cursor-pointer bg-gray-400 rounded">User ConfigUI</span>
          <span @click="currentView ='fixed-subjects'" class="mx-3 px-5 py-2 text-xl cursor-pointer bg-gray-400 rounded">Fixed Subjects</span>
          <span @click="currentView ='teacher-exemptions'" class="mx-3 px-5 py-2 text-xl cursor-pointer bg-gray-400 rounded">Teacher Exemptions</span>
          <span @click="currentView ='initial-table'" class="mx-3 px-5 py-2 text-xl cursor-pointer bg-gray-400 rounded">Initial Table</span>
          <span @click="currentView ='app-view-some-data'" class="mx-3 px-5 py-2 text-xl cursor-pointer bg-gray-400 rounded">some data</span>
        </nav>
       

        <pagenation :currentPage="currentView"/>
        
        
        <keep-alive>
          <component :is="currentView"
           :data="{
             subInClasses:subInClasses,
             userConfig:userConfig,
             userConfigBeforeChange:userConfigBeforeChange,
             teacherExemptions:teacherExemptions,
             mainData:mainData,
             possibilityLevel:possibilityLevel
            }">
          </component>
        </keep-alive>

    </div>
  </div>
</template>


<script>
import { eventBus } from './main'
import Pagenation from './components/Pagenation'
//import DefulteUserConfig from '@/data/NoonSchool'
//import DefulteUserConfig from '@/data/new'
import HomePage from './pages/HomePage'
import Test from './pages/Test'
import MainUI from './pages/MainUI'
import AddMainData from './pages/AddMainData'
import UserConfigUI from './pages/UserConfigUI'
import viewSomeData from './pages/ViewSomeData'
import FixedSubjects from './pages/FixedSubjects'
import TeacherExemptions from './pages/TeacherExemptions'
import InitialTable from './pages/InitialTable'
import Vue from 'vue'


Vue.component('pagenation',Pagenation)
Vue.component('home-page',HomePage)
Vue.component('test',Test)
Vue.component('app-main-ui',MainUI)
Vue.component('add-main-data',AddMainData)
Vue.component('app-user-config-ui',UserConfigUI)
Vue.component('fixed-subjects',FixedSubjects)
Vue.component('teacher-exemptions',TeacherExemptions)
Vue.component('initial-table',InitialTable)
Vue.component('app-view-some-data',viewSomeData)
export default {
  name: 'App',
  data() {
    return {
      currentView:'home-page',
      subInClasses:[],
      userConfig:[],
      userConfigBeforeChange:[],
      teacherExemptions:[],
      possibilityLevel:1,
      mainData:{
        subInDay:['الأولى','التانية','التالتة','الرابعة','الخامسة','السادسة','السابعة','التامنة','الناسعة'],
        dayOfWeek:[
          {id:2,name:'الأحد'},
          {id:3,name:'الاثنين'},
          {id:4,name:'الثلاثاء'},
          {id:5,name:'الاربعاء'},
          {id:6,name:'الخميس'},
        ],
        classes:[
          {id:1,name:'الأول أ',subInDay:6},
          {id:2,name:'الاول ب',subInDay:6},
          {id:3,name:'الثاني أ',subInDay:6},
          {id:4,name:'الثاني ب',subInDay:6},
          {id:5,name:'الثالث أ',subInDay:6},
          {id:6,name:'الثالث ب',subInDay:6},
          {id:7,name:'الرابع',subInDay:7},
          {id:8,name:'الخامس',subInDay:7},
          {id:9,name:'السادس أ',subInDay:7},
          {id:10,name:'السادس ب',subInDay:7},
          {id:11,name:'الأول المتوسط',subInDay:7},
          {id:12,name:'الثاني متوسط',subInDay:7},
          {id:13,name:'الثالث متوسط',subInDay:7}
        ],
        subjects:[
            {id:1,name:'اسلامية'},
            {id:2,name:'عربي'},
            {id:3,name:'رياضيات'},
            {id:4,name:'انجليزي'},
            {id:5,name:'تكنولوجيا'},
            {id:6,name:'علوم'},
            {id:7,name:'تاريخ'},
            {id:8,name:'جغرافيا'},
            {id:9,name:'تقنية'},
            {id:10,name:'حاسوب'},
            {id:11,name:'تسميع'},
            {id:12,name:'فنون'},
            {id:13,name:'مكتبة'},
            {id:14,name:'نشاط'},
            {id:15,name:'احتياطي'}
        ],
        teachers:[
          {id:1,name:'لا يوجد'},
          {id:2,name:'ماجدة اولى'},
          {id:3,name:'حورية عبدالجليل'},
          {id:4,name:'دعاء محمد'},
          {id:5,name:'سهير حسن'},
          {id:6,name:'سحر محمد'},
          {id:7,name:'مناهل عباس'},
          {id:8,name:'ام المؤمنين'},
          {id:9,name:'الشيماء احمد'},
          {id:10,name:'صفاء الحافظ'},
          {id:11,name:'درية'},
          {id:12,name:'ماجدة تاور'},
          {id:13,name:'إسراء صديق'},
          {id:14,name:'شادية الريح'},
          {id:15,name:'عازة عمر'},
          {id:16,name:'رشدي محمد'},
          {id:17,name:'حسين حسن'},
          {id:18,name:'م مرافي'},
          {id:19,name:'م ماثر'},
          {id:20,name:'م رهام'}
        ],
        colors:["#B46EC75c","#6FC76E5c","#6EC6C75c","#6E98C75c","#6E6EC75c","#C76E6E5c","#C6C76E5c","#8EC76E5c","#C7A46E5c","#C79B6E5c","#896EC75c","#A76EC75c","#C76EA15c","#C76E8A5c","#C76E7A5c",
                    "#6E96C75c","#C76EB35c","#C7AD6E5c","#C6C76E5c","#98C76E5c","#6EC77A5c","#6EC7AB5c","#6EB3C75c","#6E91C75c","#C7C76E5c","#6EC77E5c","#6EC7B55c","#C7B06E5c","#FBBB035c","#BFFB035c"]
      }
    }
  },
  created() {
    this.addSubInClass()
    eventBus.$on('ChangeUrl',(data)=>{
      this.currentView = data
    })
    eventBus.$on('retailUserConfig',(data)=>{
      this.userConfig = data
      this.runSortFunctions()
    })
    eventBus.$on('changePossibilityLevel',(data)=>{
      this.possibilityLevel = data
    })
    eventBus.$on('dataImported', () => {
      this.addSubInClass()
    })
  },
  methods: {
    addSubInClass(){
      this.subInClasses = []
      var id=0
      for (let y = 0; y < this.mainData.classes.length; y++) {
        var theClass = this.mainData.classes[y];
        var subInClass = []
        
        for (let x = 0; x < this.mainData.dayOfWeek.length; x++) {
          var sub = []
          for (let i = 0; i < theClass.subInDay; i++) {
            sub.push({
                id:id,
                sId:i+','+x+','+y,
                oId:[y,x,i],
                subject:{id:null,name:null},
                teacher:{id:null,name:null}
              })
            id++;
          }
          subInClass.push(sub)
        }
        this.subInClasses.push(subInClass)
      }
    },



    runSortFunctions(){
        this.sortUserConfigBySubject()
        this.sortUserConfigByClass()
        this.sortUserConfigByTeatcherCount()
        this.sortUserConfigByDuplication()
        this.sortUserConfigBySizeDesc()
        this.sortUserConfigByExemptionsFirst()
        this.sortUserConfigByFixed()
    },
    
    sortUserConfigBySubject(){
      this.userConfig.sort(function (a,b) {
          return ((a.subject.id == b.subject.id) ? 0 : ((a.subject.id > b.subject.id) ? 1 : -1 ));       
      }.bind(this));
    },
    sortUserConfigByClass(){
      this.userConfig.sort(function (a,b) {
          return ((a.theClass.id == b.theClass.id) ? 0 : ((a.theClass.id > b.theClass.id) ? 1 : -1 ));       
      }.bind(this));
    },
    userDataBy(by,id){
        if (by == "class") {
          return this.userConfig.filter((data)=>{
            return data.theClass.id == id
          })
        }else if (by == "teacher") {
          return this.userConfig.filter((data)=>{
            return data.teacher.id == id
          })
        }else if (by == "subject") {
          return this.userConfig.filter((data)=>{
            return data.subject.id == id
          })
        }
  
        return []
      },
    sortUserConfigByTeatcherCount(){
      this.userConfig.sort(function (a,b) {

          var sortA = this.userDataBy('teacher',a.teacher.id).length
          var sortB = this.userDataBy('teacher',b.teacher.id).length

          return ((sortA == sortB) ? 0 : ((sortA < sortB) ? 1 : -1 ));
      }.bind(this));
    },
    sortUserConfigByDuplication(){
      this.userConfig.sort(function (a,b) {
          return ((a.duplication == b.duplication) ? 0 : ((a.duplication > b.duplication) ? 1 : -1 ));       
      }.bind(this));
    },
    sortUserConfigBySize(){
      this.userConfig.sort(function (a,b) {
          return ((a.size == b.size) ? 0 : ((a.size < b.size) ? 1 : -1 ));       
      }.bind(this));
    },
    sortUserConfigBySizeDesc(){
      this.userConfig.sort(function (a,b) {
          return ((a.size == b.size) ? 0 : ((a.size > b.size) ? -1 : 1 ));
      }.bind(this));
    },
    sortUserConfigByExemptions(){
      this.userConfig.sort(function (a,b) {
          return ((a.isExemptions == b.isExemptions) ? 0 : ((a.isExemptions < b.isExemptions) ? 1 : -1 ));       
      }.bind(this));
    },
    sortUserConfigByExemptionsFirst(){
      this.userConfig.sort(function (a,b) {
          return ((a.isExemptions == b.isExemptions) ? 0 : ((a.isExemptions > b.isExemptions) ? -1 : 1 ));
      }.bind(this));
    },
    sortUserConfigByFixed(){
      this.userConfig.sort(function (a,b) {
          return ((a.fixed.status == b.fixed.status) ? 0 : ((a.fixed.status < b.fixed.status) ? 1 : -1 ));       
      }.bind(this));
    },
  },
  watch: {
    'mainData.dayOfWeek'(){
      this.addSubInClass()
    },
    'mainData.classes'(){
      this.addSubInClass()
    },
  },
}
</script>