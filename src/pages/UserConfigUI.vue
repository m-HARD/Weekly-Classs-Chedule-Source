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
        <button class="p-2 mt-5 mx-5 bg-gray-400 rounded hover:bg-gray-500 focus:outline-none cursor-pointer"
          @click="sortUserConfigByExemptions()">sort by Exemptions</button>
        <button class="p-2 mt-5 mx-5 bg-gray-400 rounded hover:bg-gray-500 focus:outline-none cursor-pointer"
          @click="sortUserConfigByFixed()">sort by Fixed</button>
      </div>
  
      <div class="w-full mt-20">

        <table class="table-auto mt-10">
          <thead>
            <tr class="flex flex-wrap font-bold mb-1 border-b-2 border-gray-400 items-center">
              <td class="w-20 font-extrabold text-xl"></td>
              <td class="w-32 font-extrabold text-xl">الصف</td>
              <td class="w-32 font-extrabold text-xl">المادة</td>
              <td class="w-32 font-extrabold text-xl">الأستاذ</td>
              <td class="w-32 font-extrabold text-xl text-center">العدد</td>
              <td class="w-32 font-extrabold text-xl">طريقة التوزيع</td>
              <td class="w-48 font-extrabold text-xl">امكانية وجود نفس المادة في مكانين مختلفين ويوم واحد</td>
              <td class="w-32 font-extrabold text-xl text-center">حذف</td>
            </tr>
          </thead>
          <tbody>
            <tr class="flex flex-wrap border-b-2 border-gray-400" v-for="(userconfig,i) in data.userConfigBeforeChange" :key="i">
              <td class="w-20 font-semibold">{{ i+1 }}</td>
              <td class="w-32 font-semibold">{{ userconfig.theClass.name }}</td>
              <td class="w-32 font-semibold">{{ userconfig.subject.name }}</td>
              <td class="w-32 font-semibold">{{ userconfig.teacher.name }}</td>
              <td class="w-32 font-semibold text-center">{{ userconfig.size }}</td>
              <td class="w-32 font-semibold">{{ retailTypes[userconfig.retail] }}</td>
              <td class="w-48 font-semibold text-center">{{ userconfig.duplication ? 'نعم':'لا' }}</td>
              <td class="w-32 font-semibold text-center">
                <span @click="DeleteFromuserConfigBeforeChange(i)" class="text-red-500 cursor-pointer">X</span>
              </td>
            </tr>
          </tbody>
        </table>

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
        <form class='flex justify-center mt-20' @submit.prevent="addToUserConfig()">
            <div class='w-full max-w-2xl bg-white rounded-lg p-6'>
                <div class='flex flex-wrap -mx-3'>
        
                    <div class='w-full px-3 mb-6'>
                        <label class='lableClasses'>الأستاذ</label>
                        <div class='relative'>
                            <select v-model="userInput.teacher" class='selectClasses'>
                                <option v-for="(teacher,index) in teachers" :value="teacher" :key="index">{{ teacher.name }}</option>
                            </select>
                            <div v-html="svg()" />
                        </div>
                    </div>
                    <div class='w-1/3 px-3 mb-6'>
                        <label class='lableClasses'>المادة</label>
                        <div class='relative'>
                            <select v-model="userInput.subject" class='selectClasses'>
                                <option v-for="(subject,index) in subjects" :key="index" :value="subject" v-text="subject.name"></option>
                            </select>
                            <div v-html="svg()" />
                        </div>
                    </div>
                    <div class='w-1/3 px-3 mb-6'>
                        <label class='lableClasses'>الفصل</label>
                        <div class='relative'>
                            <select v-model="userInput.theClass" class='selectClasses'>
                                <option v-for="(theClass,index) in classes" :key="index" :value="theClass" v-text="theClass.name"></option>
                            </select>
                            <div v-html="svg()" />
                        </div>
                    </div>
                    <div class='w-1/3 px-3 mb-6'>
                        <label class='lableClasses'>عدد الحصص</label>
                        <div class='relative'>
                          <input type="number" v-model.number="userInput.size" class='selectClasses'>
                        </div>
                    </div>
                    <div class='w-full px-3 mb-6'>
                        <label class='lableClasses'>طريقة التوزيع</label>
                        <div class='relative'>
                          <div class="block">
                            <input type="radio" v-model.number="userInput.retailType" name="retail" value="0" class="mx-2 my-2 py-1 cursor-pointer">
                            <label for="retail">{{ retailTypes[0] }}</label>
                          </div>
                          <div class="block">
                            <input type="radio" v-model.number="userInput.retailType" name="retail" value="1" class="mx-2 my-2 py-1 cursor-pointer">
                            <label for="retail">{{ retailTypes[1] }}</label>
                          </div>
                          <div class="block">
                            <input type="radio" v-model.number="userInput.retailType" name="retail" value="2" class="mx-2 my-2 py-1 cursor-pointer">
                            <label for="retail">{{ retailTypes[2] }}</label>
                          </div>
                          <div class="block">
                            <input type="radio" v-model.number="userInput.retailType" name="retail" value="3" class="mx-2 my-2 py-1 cursor-pointer">
                            <label for="retail">{{ retailTypes[3] }}</label>
                          </div>
                          <div class="block">
                            <input type="radio" v-model.number="userInput.retailType" name="retail" value="4" class="mx-2 my-2 py-1 cursor-pointer">
                            <label for="retail">
                              {{ retailTypes[4] }}
                              <span class="text-xs text-red-400">*يرجى اختيار هذا الخيار في حالة المادة للفصول الصغيرة أولى تانية.. والتي نقبل عدة حصص في نقس اليوم</span>
                            </label>
                          </div>
                        </div>
                    </div>
                    <div class='w-full px-3 mb-6'>
                      <div class="w-full flex items-center">
                        <input type="checkbox" v-model.number="userInput.duplication" name="duplication" class="mx-2 my-2 py-1 cursor-pointer">
                        <label class='lableClasses'>امكانية وجود نفس المادة في مكانين مختلفين ويوم واحد</label>
                      </div>
                        <span class="block text-xs text-red-400">*يرجى اختيار هذا الخيار في حالة المادة للفصول الصغيرة أولى تانية.. والتي نقبل عدة حصص في نقس اليوم</span>
                    </div>

                    <!-- <div class='w-1/3 px-3 mb-6'>
                        <label class='lableClasses'>الكمية</label>
                        <input v-model.number="wardCountInput" class='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500' type='number' >
                    </div> -->


                    <div class='w-full px-3'>
                      <input class='btnClasses py-4 bg-green-400' type="submit" value="add">
                    </div>

        
                </div>
            </div>
        </form>
      </div>

  </div>
</template>

<script>
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
      userInput:{
        theClass:null,
        teacher:null,
        subject:null,
        size:null,
        retailType:null,
        duplication:false
      },


      retailTypes:["التوزيع الذكي","1.1.1...","2.2.2....","ملء الجدول","عشوائي"]
    }
  },
  methods: {
    checkIfFoundError(){
      var returnVal = false

      this.data.userConfigBeforeChange.forEach(singleUserConfig => {
        if (singleUserConfig.size > this.dayOfWeek.length * 2) {
          returnVal = true
        }  
      });

      return returnVal
    },
    
    retailUserConfig(mode = null, theClass = null){
      var endArray = []
      if (this.checkIfFoundError())return

      var userConfigAfterFilter = this.data.userConfigBeforeChange;

      if (mode == "class" && theClass != null) {
        var userConfigOfClass =  this.data.userConfigBeforeChange.filter(singleUserConfig => {
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
            "duplication":singleUserConfig.duplication,
            "fixed":singleUserConfig.fixed,
            "isExemptions":singleUserConfig.isExemptions
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
    DeleteFromuserConfigBeforeChange(index){
          this.data.userConfigBeforeChange.splice(index,1);
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
      var Input = this.userInput
        if(Input.theClass == null || Input.teacher == null || Input.subject == null) return
        this.data.userConfigBeforeChange.push({
            theClass: Input.theClass,
            teacher: Input.teacher,
            subject: Input.subject,
            size: Input.size,
            duplication: Input.duplication,
            retail: Input.retailType
        })
        Input.teacher = null;
        Input.subject = null;
        Input.size = null;
        Input.duplication = null;
        Input.retailType = null
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
          return ((a.duplication == b.duplication) ? 0 : ((a.duplication > b.duplication) ? 1 : -1 ));       
      }.bind(this));
    },
    sortUserConfigBySize(){
      this.data.userConfig.sort(function (a,b) {
          return ((a.size == b.size) ? 0 : ((a.size < b.size) ? 1 : -1 ));       
      }.bind(this));
    },
    sortUserConfigByExemptions(){
      this.data.userConfig.sort(function (a,b) {
          return ((a.isExemptions == b.isExemptions) ? 0 : ((a.isExemptions < b.isExemptions) ? 1 : -1 ));       
      }.bind(this));
    },
    sortUserConfigByFixed(){
      this.data.userConfig.sort(function (a,b) {
          return ((a.fixed.status == b.fixed.status) ? 0 : ((a.fixed.status < b.fixed.status) ? 1 : -1 ));       
      }.bind(this));
    },
  }
}
</script>

<style>

</style>
