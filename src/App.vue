<template>
  <div name="App" style="min-width: -webkit-fill-available;width: max-content;">
    <div class="bg-gray-100 min-h-screen" dir="rtl">
      <div class="p-5 mx-10">
        <nav class="w-full py-2 flex justify-center bg-gray-600">
          <span @click="currentView ='app-main-ui'" class="mx-3 px-5 py-2 text-xl cursor-pointer bg-gray-400 rounded">Main</span>
          <span @click="currentView ='app-user-config-ui'" class="mx-3 px-5 py-2 text-xl cursor-pointer bg-gray-400 rounded">User ConfigUI</span>
          <span @click="currentView ='initial-table'" class="mx-3 px-5 py-2 text-xl cursor-pointer bg-gray-400 rounded">Initial Table</span>
          <span @click="currentView ='app-view-some-data'" class="mx-3 px-5 py-2 text-xl cursor-pointer bg-gray-400 rounded">some data</span>
        </nav>
        
        <keep-alive>
          <component :is="currentView" :data="{subInClasses:subInClasses,userConfig:userConfig,userConfigBeforeChange:userConfigBeforeChange}"></component>
        </keep-alive>


      </div>
    </div>
  </div>
</template>

<script>
import { eventBus } from './main'
import DefulteUserConfig from '@/data/DefulteUserConfig'
import data from './data/data'
import MainUI from './pages/MainUI'
import UserConfigUI from './pages/UserConfigUI'
import viewSomeData from './pages/ViewSomeData'
import InitialTable from './pages/InitialTable'
import Vue from 'vue'


Vue.component('app-main-ui',MainUI)
Vue.component('app-user-config-ui',UserConfigUI)
Vue.component('initial-table',InitialTable)
Vue.component('app-view-some-data',viewSomeData)
export default {
  name: 'App',
  mixins:[data],
  data() {
    return {
      currentView:'app-main-ui',
      subInClasses:[],
      userConfig:[],
      userConfigBeforeChange:DefulteUserConfig,
    }
  },
  created() {
    this.addSubInClass()
    eventBus.$on('retailUserConfig',(data)=>{
      this.userConfig = data
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
  },
}
</script>