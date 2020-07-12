<template>
  <div name="App" style="min-width: -webkit-fill-available;width: max-content;">
    <div class="bg-gray-100 min-h-screen" dir="rtl">
      <div class="p-5 mx-10">
        <nav class="w-full py-2 flex justify-center bg-gray-600">
          <span @click="navigate('app-main-ui')" class="mx-3 px-5 py-2 text-xl cursor-pointer bg-gray-400 rounded">main</span>
          <span @click="navigate('app-user-config-ui')" class="mx-3 px-5 py-2 text-xl cursor-pointer bg-gray-400 rounded">UserConfigUI</span>
          <span @click="navigate('app-view-some-data')" class="mx-3 px-5 py-2 text-xl cursor-pointer bg-gray-400 rounded">some data</span>
        </nav>
        
        <keep-alive>
          <component :is="currentView" :data="{subInClasses:subInClasses,userConfig:userConfig}"></component>
        </keep-alive>


      </div>
    </div>
  </div>
</template>

<script>
import { eventBus } from './main'
import data from './data/data'
import MainUI from './pages/MainUI'
import UserConfigUI from './pages/UserConfigUI'
import viewSomeData from './pages/ViewSomeData'
import Vue from 'vue'


Vue.component('app-main-ui',MainUI)
Vue.component('app-user-config-ui',UserConfigUI)
Vue.component('app-view-some-data',viewSomeData)
export default {
  name: 'App',
  mixins:[data],
  data() {
    return {
      currentView:'app-main-ui',
      subInClasses:[],
      userConfig:[],
    }
  },
  created() {
    this.addSubInClass()
    eventBus.$on('retailUserConfig',(data)=>{
      this.userConfig = data
    })
  },
  methods: {
    navigate(nextUrl){
      this.currentView = nextUrl
    },
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