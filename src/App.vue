<template>
  <div name="App" style="min-width: -webkit-fill-available;width: max-content;">
    <div class="bg-gray-200 min-h-screen" dir="rtl">
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
        
        
        <keep-alive>
          <component :is="currentView" :data="{subInClasses:subInClasses,userConfig:userConfig,userConfigBeforeChange:userConfigBeforeChange,teacherExemptions:teacherExemptions,mainData:mainData}"></component>
        </keep-alive>

    </div>
  </div>
</template>


<script>
import { eventBus } from './main'
import DefulteUserConfig from '@/data/DefulteUserConfig'
import data from './data/data'
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
  mixins:[data],
  data() {
    return {
      currentView:'home-page',
      subInClasses:[],
      userConfig:[],
      userConfigBeforeChange:DefulteUserConfig,
      teacherExemptions:[{teacher:{id:22,name:'سحر'},locations:[{"day":5,"sub":3},{"day":5,"sub":2},{"day":5,"sub":1}]}],
      mainData:{
        dayOfWeek:[
          {id:1,name:'السبت'},
          {id:2,name:'الأحد'},
          {id:3,name:'الأثنين'},
          {id:4,name:'الثلاثاء'},
          {id:5,name:'الأربعاء'},
          {id:6,name:'الخميس'},
        ],
        classes:[
          {id:1,name:'الأول',subInDay:6},
          {id:2,name:'الثاني',subInDay:6},
          {id:3,name:'الثالث',subInDay:6},
          {id:4,name:'الرابع',subInDay:7},
          {id:5,name:'الخامس',subInDay:7},
          {id:6,name:'السادس',subInDay:7},
          {id:7,name:'السابع',subInDay:7},
          {id:8,name:'الثامن',subInDay:8},
        ],
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
  },
  methods: {
    addSubInClass(){
      var id=0
      for (let y = 0; y < this.classes.length; y++) {
        var theClass = this.classes[y];
        var subInClass = []
        
        for (let x = 0; x < this.dayOfWeek.length; x++) {
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
        this.sortUserConfigBySize()
        this.sortUserConfigByExemptions()
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
    sortUserConfigByExemptions(){
      this.userConfig.sort(function (a,b) {
          return ((a.isExemptions == b.isExemptions) ? 0 : ((a.isExemptions < b.isExemptions) ? 1 : -1 ));       
      }.bind(this));
    },
    sortUserConfigByFixed(){
      this.userConfig.sort(function (a,b) {
          return ((a.fixed.status == b.fixed.status) ? 0 : ((a.fixed.status < b.fixed.status) ? 1 : -1 ));       
      }.bind(this));
    },
  },
}
</script>