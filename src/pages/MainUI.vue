<template>
  <div class="l16 bg-gray-100 min-h-screen" dir="rtl">
    <div class="p-5 mx-10">

      <div v-show="showLoad" class="fixed inset-0 bg-black opacity-50"></div>

      <div class="w-full flex justify-center">
        <button class="p-2 mt-5 mx-5 bg-gray-400 rounded hover:bg-gray-500 focus:outline-none cursor-pointer"
          @click="addSubjectToAllClass()">Random</button>
        <button class="p-2 mt-5 mx-5 bg-gray-400 rounded hover:bg-gray-500 focus:outline-none cursor-pointer"
          @click="addSubjectToAllClassByFirstToEndClass()">Random from first class to end</button>
      </div>

      <div class="mt-64">
        <div v-for="(theClass,i) in classes" :key="i">
          {{ theClass.name }} :

          <ul class="mx-5" v-for="(notAdd,i) in iCanNotAddIt[theClass.id - 1]" :key="i">
            <li>{{ notAdd }}</li>
          </ul>
        </div>
      </div>

      <div class="w-full mt-20">

        <table class="table-auto mt-10" v-for="theClass in classes" :key="theClass.id">
          <thead>
            <tr class="flex flex-wrap font-bold mb-1 border-b-2 border-gray-400">
              <td class="w-64 font-extrabold text-xl">الصف {{ theClass.name }}</td>
              <td class="w-56 font-semibold" v-for="(sub,i) in theClass.subInDay" :key="i">{{ subInDay[sub-1] }}</td>
            </tr>
          </thead>
          <tbody>
            <tr class="flex flex-wrap border-b-2 border-gray-400" v-for="day in dayOfWeek" :key="day.id">
              <td class="w-64 font-semibold">{{ day.name }}</td>
              <td class="w-56" :style="sub.subject.name != null ?{'background-color':colorDefulte == 0 ? colors[(sub.subject.id -1) %30]:colorDefulte == 1 ? colors[(sub.teacher.id -1) %30]:sub.teacher.id == 22  || sub.subject.name == 'عربي' ? colors[0]:''}:''"
               v-for="(sub,i) in data.subInClasses[theClass.id -1][day.id-1]" :key="i">
                {{ sub.subject.name }} {{ sub.teacher.name != null && sub.teacher.name != "" ? '('+sub.teacher.name+')':'' }}
              </td>
            </tr>
          </tbody>
        </table>

      </div>
      

      <div class="w-full flex justify-center">
        <button class="p-2 mt-5 mx-5 bg-gray-400 rounded hover:bg-gray-500 focus:outline-none cursor-pointer"
          @click="colorDefulte = (colorDefulte + 1) %3">change color</button>
      </div>

    </div>
  </div>
</template>

<script>
import data from '@/data/data'
export default {
  name: 'mainUi',
  mixins:[data],
  props:{
    data:{
      type:Object,
      required:true
    }
  },
  data() {
    return {
      showLoad:false,
      iCanNotAddIt:[],
      bestDistribution:{data:null,canNotAddLength:null},

      colorDefulte:3
    }
  },
  created() {
    for (let i = 0; i < this.classes.length; i++) {
      this.iCanNotAddIt.push([])
    }
  },
  methods: {
    emptySubInClass(theClass){
      var newVal = []
      for (let subInDay = 0; subInDay < theClass.length; subInDay++) {
        var subInClass = []
        for (let sub = 0; sub < theClass[subInDay].length; sub++) {
          if(theClass[subInDay][sub].subject.name == null){
            subInClass.push({data:theClass[subInDay][sub],loc:sub})
          }
        }
          newVal.push({data:subInClass,loc:subInDay})
      }

      for (let subInDay = 0; subInDay < newVal.length; subInDay++) {
        if (newVal[subInDay].data.length == 0) {
          newVal.splice(subInDay,1);
          subInDay--
        }
      }
      return newVal
    },
    teacherIsEmpty(teacherId,theDay,theSubInDay){
      var empty = true;
      this.data.subInClasses.forEach(theClass => {
        if(typeof theClass[theDay][theSubInDay] != 'undefined'){
          if (theClass[theDay][theSubInDay].teacher.id == teacherId) {
            empty = false
          }
        }
      })
      return empty
    },
    nextLocIsEmpty(nextLoc,teacherId,loc1,prevLoc){
      if (typeof nextLoc != 'undefined') {
        if (typeof nextLoc.data != 'undefined') {
          if (typeof nextLoc.data.subject.name != 'undefined') {
            if (nextLoc.data.subject.name == null) {
              if(nextLoc.loc == prevLoc + 1){
                
                return this.teacherIsEmpty(teacherId,loc1,nextLoc.loc)
              
              }else return false
            }else return false
          }else return false
        }else return false
      }else return false
    },
    DayHasNoThisSubject(theClass,theDay,theSubject){
      var hasNot = true;
      this.data.subInClasses[theClass -1][theDay].forEach(subInDay => {
        if (subInDay.subject.id == theSubject) {
          hasNot = false
        }
      });
      return hasNot;
    },
    locationIsAnExemption(teacherId, day, sub){
      let returnVal = true
      let teacherExemptions = this.data.teacherExemptions.filter(teacherExemption => {
        return teacherExemption.teacher.id == teacherId
      });
      teacherExemptions[0].locations.forEach(singleTeacherExemption => {
        if (singleTeacherExemption.day == day && singleTeacherExemption.sub == sub) {
          returnVal = false
        }
      })
      
      return returnVal
    },
    addFixedSubjectsToClasses(){
      this.data.userConfig.filter(isFixed => {
        return isFixed.fixed.status
      }).forEach((data)=>{
        var theClass = this.data.subInClasses[data.theClass.id -1]
        theClass[data.fixed.location.day][data.fixed.location.sub].subject = data.subject
        theClass[data.fixed.location.day][data.fixed.location.sub].teacher = data.teacher
      })
    },
    canAdd(data){
      if (data.data.fixed.status)return {iCan:false,location:0,location2:0}

      var theTry = 0;
      var emptyInClass = this.emptySubInClass(data.theClass);
      var canAdd = false

      if (emptyInClass.length > 0){
        canAdd = true
        var randomDay,randomSubInDay,validation = true;

        do {
          randomDay = Math.floor(Math.random() * emptyInClass.length)
          randomSubInDay = Math.floor(Math.random() * emptyInClass[randomDay].data.length)

          if(theTry++ == 500){
            canAdd = false;
            this.iCanNotAddIt[data.data.theClass.id -1].push(data.data)
            break
          }

          var sc1 = emptyInClass[randomDay]

          var teacherIsEmpty = this.teacherIsEmpty(data.teacherId, sc1.loc, sc1.data[randomSubInDay].loc)
          validation = sc1.data[randomSubInDay].data.subject.name == null && teacherIsEmpty
          
          if (data.data.size == 2) {
            validation = validation && this.nextLocIsEmpty(sc1.data[randomSubInDay + 1], data.teacherId, sc1.loc, sc1.data[randomSubInDay].loc)
          }
          if (!data.data.duplication) {
            validation = validation && this.DayHasNoThisSubject(data.data.theClass.id, sc1.loc, data.data.subject.id)
          }
          if (typeof data.data.isExemptions != 'undefined' && data.data.isExemptions) {
            validation = validation && this.locationIsAnExemption(data.teacherId, sc1.loc, sc1.data[randomSubInDay].loc)
            if (data.data.size == 2) {
              validation = validation && this.locationIsAnExemption(data.teacherId, sc1.loc, sc1.data[randomSubInDay +1].loc)
            }
          }
        } while (!(validation));


      }else{
        this.iCanNotAddIt[data.data.theClass.id -1].push(data.data)
      }

      var youCanAdd = {iCan:false,location:0,location2:0}
      if (canAdd && validation) {
        youCanAdd = {
          iCan:canAdd,
          location:emptyInClass[randomDay].data[randomSubInDay].data,
          location2:data.data.size == 2  ? emptyInClass[randomDay].data[randomSubInDay + 1].data : 0
        }
      }
      return youCanAdd
    },

    addSubjectToClass(id,data){
      var theClass = this.data.subInClasses[id -1]

      var canAdd = this.canAdd({theClass:theClass,teacherId:data.teacher.id,data:data})

      if (canAdd.iCan) {
        canAdd.location.subject = data.subject
        canAdd.location.teacher = data.teacher

        if (data.size == 2) {
          canAdd.location2.subject = data.subject
          canAdd.location2.teacher = data.teacher
        }
      }
    },
    addSubjectToAllClass(){
      this.showLoad = true;
      setTimeout(() => {
        this.restartData();
  
        //this.addSubjectToSpecificallyClass(5)
        
        this.data.userConfig.forEach((data)=>{
          this.addSubjectToClass(data.theClass.id,data)
        })
  
        this.checkIfBestDistribution();
      }, 50);
    },
    addSubjectToAllClassByFirstToEndClass(){
      this.restartData();

      this.classes.forEach(theClass => {
        this.addSubjectToSpecificallyClass(theClass.id)
      })
      this.checkIfBestDistribution();
    },
    addSubjectToSpecificallyClass(classId){
      this.iCanNotAddIt[classId - 1] = []
      this.data.subInClasses[classId - 1].forEach(day => {
        day.forEach(subInDay => {
          subInDay.subject = {id:null,name:null};
          subInDay.teacher = {id:null,name:null}
        })
      });
      this.addFixedSubjectsToClasses()

      this.userDataBy('class',classId).forEach((data)=>{
        this.addSubjectToClass(data.theClass.id,data)
      })

    },
    addBestDistribution(canNotAddID){      
      if(this.bestDistribution.canNotAddLength == null || this.iCanNotAddIt[canNotAddID - 1].length < this.bestDistribution.canNotAddLength){
        this.bestDistribution.data = this.data.subInClasses[canNotAddID - 1];
        this.bestDistribution.canNotAddLength = this.iCanNotAddIt[canNotAddID - 1].length
      }
      
      if(this.iCanNotAddIt[canNotAddID - 1].length > this.bestDistribution.canNotAddLength && this.bestDistribution.canNotAddLength != null){
        this.data.subInClasses[canNotAddID - 1] = this.bestDistribution.data;
        this.iCanNotAddIt[canNotAddID - 1].length = this.bestDistribution.canNotAddLength
      }
    },
    addSubjectToAllClassWithOutCheck(){
      this.restartData();

      this.data.userConfig.forEach((data)=>{
        this.addSubjectToClass(data.theClass.id,data)
      })
    },
    checkIfBestDistribution(){
      var canNotAddClassCount = 0
      this.iCanNotAddIt.forEach(inClassNotAdd => {
        if (inClassNotAdd.length > 0) {
          canNotAddClassCount += inClassNotAdd.length
        }
      })

      var theAllSubjectTry = 0
      while (canNotAddClassCount > 0) {

          this.iCanNotAddIt.forEach(inClassNotAdd => {
            let theClassTry = 0
            if (inClassNotAdd.length > 0) {
              let id = inClassNotAdd[0].theClass.id;
              while (this.iCanNotAddIt[id - 1].length > 0) {
                this.addSubjectToSpecificallyClass(id)
                this.addBestDistribution(id)
      
                if (theClassTry++ == 400) {
                  break
                }
              }
                this.bestDistribution={data:null,canNotAddLength:null}
            }
          });

          canNotAddClassCount = 0
          this.iCanNotAddIt.forEach(inClassNotAdd => {
            if (inClassNotAdd.length > 0) {
              canNotAddClassCount += inClassNotAdd.length
            }
          })
          
          
          if (++theAllSubjectTry == 20) {
            break
          }
          if (canNotAddClassCount > 0 && theAllSubjectTry % 5 == 0) {
            console.log("change table");
            this.addSubjectToAllClassWithOutCheck()
          }
          if (canNotAddClassCount > 0 && theAllSubjectTry % 10 == 0) {
            console.log("change user Config");
          }
      }
      theAllSubjectTry = 0
      this.showLoad = false;
    },
    restartData(){
      for (let i = 0; i < this.iCanNotAddIt.length; i++) {
        this.iCanNotAddIt[i] = []
      }

      this.data.subInClasses.forEach(theClass => {
        theClass.forEach(day => {
          day.forEach(subInDay => {
            subInDay.subject = {id:null,name:null};
            subInDay.teacher = {id:null,name:null}
          })
        });
      })
      
      this.addFixedSubjectsToClasses()
    }
  },
}
</script>

<style>

</style>
