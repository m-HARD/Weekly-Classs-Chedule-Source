<template>
  <div name="Home" class="">
    <div class="w-full flex justify-center items-center text-center">
        <div class="pt-20 w-3/4 flex flex-col items-center">
            <span class="p-20 mt-6 bg-gray-500 hover:bg-gray-600 cursor-pointer rounded-full" style="width:max-content" @click="retailUserConfig('all')"> Go </span>
            <div class="mt-10">
                after change :
                <ul v-for="(userconfig,i) in data.userConfig" :key="i">
                <li>{{ userconfig }}</li>
                </ul>
            </div>
        </div>  
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

    }
  }
}
</script>