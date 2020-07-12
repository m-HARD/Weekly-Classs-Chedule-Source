<template>
  <div class="l16">

      <div class="w-full flex justify-center">
        <button class="p-2 mt-5 mx-5 bg-gray-400 rounded hover:bg-gray-500 focus:outline-none cursor-pointer"
          @click="sortUserConfigBySubject()">sort By Subject</button>
        <button class="p-2 mt-5 mx-5 bg-gray-400 rounded hover:bg-gray-500 focus:outline-none cursor-pointer"
          @click="sortUserConfigByClass()">sort By Class</button>
        <button class="p-2 mt-5 mx-5 bg-gray-400 rounded hover:bg-gray-500 focus:outline-none cursor-pointer"
          @click="sortUserConfigByTeatcherCount()">sort By Teacher</button>
        <button class="p-2 mt-5 mx-5 bg-gray-400 rounded hover:bg-gray-500 focus:outline-none cursor-pointer"
          @click="sortUserConfigByDuplication()">sort by duplication</button>
        <button class="p-2 mt-5 mx-5 bg-gray-400 rounded hover:bg-gray-500 focus:outline-none cursor-pointer"
          @click="sortUserConfigBySize()">sort by size</button>
      </div>
      
      <div class="mt-64">
        <ul v-for="(userconfig,i) in defultUserConfigBeforeChange" :key="i">
          <li>{{ userconfig }}</li>
        </ul>
      </div>
      <div class="w-full flex justify-center mt-10">
        <button class="p-2 mt-5 mx-5 bg-gray-400 rounded hover:bg-gray-500 focus:outline-none cursor-pointer"
          @click="retailUserConfig('all')">retail user config</button>
        <button class="p-2 mt-5 mx-5 bg-gray-400 rounded hover:bg-gray-500 focus:outline-none cursor-pointer"
          @click="retailUserConfig('class',5)">retail user config by class</button>
      </div>
      <div class="mt-10">
        after change :
        <ul v-for="(userconfig,i) in data.userConfig" :key="i">
          <li>{{ userconfig }}</li>
        </ul>
      </div>




      <div>
        <div class='flex justify-center mt-20'>
            <div class='w-full max-w-2xl bg-white rounded-lg p-6'>
                <div class='flex flex-wrap -mx-3'>
        
                    <div class='w-1/3 px-3 mb-6'>
                        <label class='lableClasses'>teachers</label>
                        <div class='relative'>
                            <select v-model="userTeacher" class='selectClasses'>
                                <option v-for="(teacher,index) in teachers" :value="teacher" :key="index">{{ teacher.name }}</option>
                            </select>
                            <div v-html="svg()" />
                        </div>
                    </div>
                    <div class='w-1/3 px-3 mb-6'>
                        <label class='lableClasses'>subjects</label>
                        <div class='relative'>
                            <select v-model="userSubjects" class='selectClasses'>
                                <option v-for="(subject,index) in subjects" :key="index" :value="subject" v-text="subject.name"></option>
                            </select>
                            <div v-html="svg()" />
                        </div>
                    </div>
                    <div class='w-1/3 px-3 mb-6'>
                        <label class='lableClasses'>class</label>
                        <div class='relative'>
                            <select v-model="userClass" class='selectClasses'>
                                <option v-for="(theClass,index) in classes" :key="index" :value="theClass" v-text="theClass.name"></option>
                            </select>
                            <div v-html="svg()" />
                        </div>
                    </div>
                    <!-- <div class='w-1/3 px-3 mb-6'>
                        <label class='lableClasses'>الكمية</label>
                        <input v-model.number="wardCountInput" class='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500' type='number' >
                    </div> -->


                    <div class='w-full px-3'>
                        <button class='btnClasses bg-green-400' @click="addToUserConfig()">add</button>
                    </div>

        
                </div>
            </div>
        </div>
      </div>

  </div>
</template>

<script>
import DefulteUserConfig from './data/DefulteUserConfig'
import { eventBus } from '@/main'
import data from '@/data/data'

export default {
  name: 'viewSomeData',
  mixins:[data],
  props:{
    data:{
      type:Object,
      required:true
    }
  },
  data() {
    return {
      defultUserConfigBeforeChange:DefulteUserConfig,

      userClass:null,
      userTeacher:null,
      userSubjects:null
    }
  },
  methods: {
    checkIfFoundError(){
      var returnVal = false

      this.defultUserConfigBeforeChange.forEach(singleUserConfig => {
        if (singleUserConfig.size > this.dayOfWeek.length * 2) {
          returnVal = true
        }  
      });

      return returnVal
    },
    
    retailUserConfig(mode = null, theClass = null){
      var endArray = []
      if (this.checkIfFoundError())return

      var userConfigAfterFilter = this.defultUserConfigBeforeChange;

      if (mode == "class" && theClass != null) {
        var userConfigOfClass =  this.defultUserConfigBeforeChange.filter(singleUserConfig => {
          return singleUserConfig.theClass.id == theClass
        })
        userConfigAfterFilter = userConfigOfClass;
      }
      
      userConfigAfterFilter.forEach(singleUserConfig => {
        let retailArray = this.retailSingleUserConfig(singleUserConfig)
        retailArray.forEach(theSize => {
          endArray.push({
            "theClass":singleUserConfig.theClass,
            "teacher":singleUserConfig.teacher,
            "subject":singleUserConfig.subject,
            "size":theSize,
            "duplication":singleUserConfig.duplication
          })
        });
      })

      eventBus.$emit('retailUserConfig',endArray)
    },
    retailSingleUserConfig(singleUserConfig){

      var retailArray = []
      var retail = singleUserConfig.retail

      if (retail == 0) {

        for (let i = 0; i < this.dayOfWeek.length; i++) {
          retailArray.push(0)
        }
        let size = singleUserConfig.size

        while (size > 0) {
          do {
            var randomLocation = Math.floor(Math.random() * retailArray.length)
          } while (retailArray[randomLocation] + 1 > 2);

          retailArray[randomLocation] += 1;
          size -= 1;
        }



        for (let index = 0; index < retailArray.length; index++) {
          if (retailArray[index] == 0) {
            retailArray.splice(index,1);
            index--
          }
        }
        retailArray.sort(function (a,b) {
          return (a == b ? 0 : (a < b ? 1 : -1 ));       
        });
      }
      if (retail == 1 || retail == 3) {

        let size = singleUserConfig.size
        let duplicate = 0
        while (size > 0) {
          if (retailArray.length < this.dayOfWeek.length) {
            retailArray.push(1)
            size -= 1;
          } else {
            retailArray[retailArray.length % this.dayOfWeek.length + duplicate++] += 1;
            size -= 1;
          }
        }
      }
      if (retail == 2) {

        let size = singleUserConfig.size
        while (size > 0) {
          if(size % 2 == 0){
            retailArray.push(2)
            size -= 2;
          }else{
            retailArray.push(1)
            size -= 1;
          }
        }

        retailArray.sort(function (a,b) {
          return (a == b ? 0 : (a < b ? 1 : -1 ));       
        });
      }
      if (retail == 4) {

        let size = singleUserConfig.size
        while (size > 0) {
          if(size == 1){
            retailArray.push(1);
            size -= 1;
          }else{
              let randomNumber = Math.floor((Math.random() * 2)+1)
              retailArray.push(randomNumber);
              size -= randomNumber;
          }
        }

        retailArray.sort(function (a,b) {
          return (a == b ? 0 : (a < b ? 1 : -1 ));       
        });
      }

      return retailArray

    },
    sortUserConfigBySubject(){
      this.data.userConfig.sort(function (a,b) {
          return ((a.subject.id == b.subject.id) ? 0 : ((a.subject.id > b.subject.id) ? 1 : -1 ));       
      }.bind(this));
    },
    sortUserConfigByClass(){
      this.data.userConfig.sort(function (a,b) {
          return ((a.theClass.id == b.theClass.id) ? 0 : ((a.theClass.id > b.theClass.id) ? 1 : -1 ));       
      }.bind(this));
    },
    addToUserConfig(){
        if(this.userClass == null || this.userTeacher == null || this.userSubjects == null) return
        this.data.userConfig.push({
            theClass:this.userClass,
            teacher:this.userTeacher,
            subject:this.userSubjects
        })
        this.userTeacher = null;this.userSubjects = null;
    },
    sortUserConfigByTeatcherCount(){
      this.data.userConfig.sort(function (a,b) {

          var sortA = this.userDataBy('teacher',a.teacher.id).length
          var sortB = this.userDataBy('teacher',b.teacher.id).length

          return ((sortA == sortB) ? 0 : ((sortA < sortB) ? 1 : -1 ));                    
          
          /* if (this.sortDirection == 'DESC') {
              return ((a.id == b.id) ? 0 : ((a.id < b.id) ? 1 : -1 ));                    
          } */
      }.bind(this));
    },
    sortUserConfigByDuplication(){
      this.data.userConfig.sort(function (a,b) {
          return ((a.duplication == b.duplication) ? 0 : ((a.duplication < b.duplication) ? 1 : -1 ));       
      }.bind(this));
    },
    sortUserConfigBySize(){
      this.data.userConfig.sort(function (a,b) {
          return ((a.size == b.size) ? 0 : ((a.size < b.size) ? 1 : -1 ));       
      }.bind(this));
    },
  }
}
</script>

<style>

</style>
