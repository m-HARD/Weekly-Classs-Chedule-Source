<template>
  <div class="l16 bg-gray-100 min-h-screen" dir="rtl">
    <div class="p-5 mx-10">

      <div v-show="showLoad" class="fixed inset-0 bg-black opacity-50"></div>

      <div class="flex justify-center">
          <div class="w-2/3 py-3 px-5 bg-gray-300 rounded shadow flex justify-between items-center">
            <div>
              المرحلة الأخيرة اضغط على انشاء الجدول ليتم انشاء الجدول بناءا على المدخلات الخاصة بك<br>
              *.سيتم عرض كافة الحصص والمواد التي لم يستطع النظام اضافتها في قائمة خاصة نظرا لوجود تضارب او عدم تفرغ المعلم<br>
              *.في حالة كانت المدخلات خالية من التعقيد سيتم انشاء الجدول خلال ثانية<br>
              *.يمكن أعادة ادخال البيانات عبر الضغط على زر العودة
            </div>
            <div>
              <span class="bg-red-500 hover:bg-red-600 py-1 mx-1 px-10 rounded cursor-pointer" @click="GoToUrl('add-main-data')">رجوع</span>
              <span class="bg-green-300 py-1 mx-1 px-10 rounded cursor-not-allowed">طباعة النتائج</span>
            </div>
          </div>
        </div>

      <div class="w-full flex justify-center">
        <button class="p-2 mt-5 mx-5 bg-gray-400 rounded hover:bg-gray-500 focus:outline-none cursor-pointer"
          @click="addSubjectToAllClass()">Random</button>
        <button class="p-2 mt-5 mx-5 bg-gray-400 rounded hover:bg-gray-500 focus:outline-none cursor-pointer"
          @click="addSubjectToAllClassByFirstToEndClass()">أنشاء الجدول</button>
      </div>

      <div class="mt-40">
        <span class="font-bold">قائمة بالحصص التي لم يتم اضافتها : </span>
        <div v-for="(theClass,i) in data.mainData.classes" :key="i">
          {{ theClass.name }} :

          <ul class="mx-5" v-for="(notAdd,i) in iCanNotAddIt[theClass.id - 1]" :key="i">
            <li><span class="font-bold">المادة : </span>{{ notAdd.subject.name }}
                <span class="font-bold">الأستاذ : </span> {{ notAdd.teacher.name }}
                <span class="font-bold">عدد الحصص : </span>{{ notAdd.size }}</li>
          </ul>
        </div>
      </div>

      <div class="w-full flex justify-center mt-20">
        <button class="p-2 mt-5 mx-5 bg-gray-400 rounded hover:bg-gray-500 focus:outline-none cursor-pointer"
          @click="showMainUi = true">عرض جدول حصص الفصول</button>
        <button class="p-2 mt-5 mx-5 bg-gray-400 rounded hover:bg-gray-500 focus:outline-none cursor-pointer"
          @click="showMainUi = false">عرض جدول حصص المعلمين</button>
      </div>



      <div v-if="showMainUi" class="w-full mt-20">

        <table class="table-auto mt-10" v-for="(theClass,theClassIndex) in data.mainData.classes" :key="theClassIndex">
          <thead>
            <tr class="flex flex-wrap font-bold border-b-2 border-gray-400">
              <td class="w-64 font-extrabold text-xl">الصف {{ theClass.name }}</td>
              <td class="w-56 font-semibold" v-for="(sub,i) in theClass.subInDay" :key="i">{{ data.mainData.subInDay[sub-1] }}</td>
            </tr>
          </thead>
          <tbody>
            <tr class="flex flex-wrap border-b-2 border-gray-400" v-for="(day,dayIndex) in data.mainData.dayOfWeek" :key="dayIndex">
              <td class="w-64 font-semibold">{{ day.name }}</td>
              <td class="w-56" :style="sub.subject.name != null ?{'background-color':colorDefulte == 0 ? data.mainData.colors[(sub.subject.id -1) %30]:colorDefulte == 1 ? data.mainData.colors[(sub.teacher.id -1) %30]:sub.teacher.id == 22  || sub.subject.name == customSubjectColor ? data.mainData.colors[0]:''}:''"
               v-for="(sub,i) in data.subInClasses[theClassIndex][dayIndex]" :key="i">
                {{ sub.subject.name }} {{ sub.teacher.name != null && sub.teacher.name != "" ? '('+sub.teacher.name+')':'' }}
              </td>
            </tr>
          </tbody>
        </table>

      </div>

      <viewSomeData v-if="!showMainUi" :data="data"/>
      

      <div class="w-full flex justify-center">
        <button class="p-2 mt-5 mx-5 bg-gray-400 rounded hover:bg-gray-500 focus:outline-none cursor-pointer"
          @click="colorDefulte = (colorDefulte + 1) %3">change color</button>
      </div>

    </div>
  </div>
</template>

<script>
import { eventBus } from '@/main'
import viewSomeData from './ViewSomeData'
export default {
  name: 'mainUi',
  components:{
    viewSomeData
  },
  props:{
    data:{
      type:Object,
      required:true
    }
  },
  data() {
    return {
      showMainUi:true,
      showLoad:false,
      iCanNotAddIt:[],
      bestDistribution:{data:null,canNotAddLength:null},

      colorDefulte:3,
      customSubjectColor:''
    }
  },
  created() {
    for (let i = 0; i < this.data.mainData.classes.length; i++) {
      this.iCanNotAddIt.push([])
    }
  },
  methods: {
    GoToUrl(url){
      eventBus.$emit('ChangeUrl',url)
    },
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
      if (teacherId == 0) return empty


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
      }).forEach(data =>{
        var classIndex;
        for (classIndex = 0; classIndex < this.data.mainData.classes.length; classIndex++) {
          if (this.data.mainData.classes[classIndex].id == data.theClass.id) {
            break
          }
        }

        var theClass = this.data.subInClasses[classIndex]
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
      var classIndex;
      for (classIndex = 0; classIndex < this.data.mainData.classes.length; classIndex++) {
        if (this.data.mainData.classes[classIndex].id == id) {
          break
        }
      }

      var theClass = this.data.subInClasses[classIndex]

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
      this.showLoad = true;
      setTimeout(() => {
        this.restartData();
  
        this.data.mainData.classes.forEach((theClass) => {
          this.addSubjectToSpecificallyClass(theClass.id)
        })
        this.checkIfBestDistribution();
      }, 50);
    },
    addSubjectToSpecificallyClass(classId){
      var classIndex;
      for (classIndex = 0; classIndex < this.data.mainData.classes.length; classIndex++) {
        if (this.data.mainData.classes[classIndex].id == classId) {
          break
        }
      }

      this.iCanNotAddIt[classIndex] = []
      this.data.subInClasses[classIndex].forEach(day => {
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
    userDataBy(by,id){
      if (by == "class") {
        return this.data.userConfig.filter((data)=>{
          return data.theClass.id == id
        })
      }else if (by == "teacher") {
        return this.data.userConfig.filter((data)=>{
          return data.teacher.id == id
        })
      }else if (by == "subject") {
        return this.data.userConfig.filter((data)=>{
          return data.subject.id == id
        })
      }

      return []
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
          
          
          if (++theAllSubjectTry == this.data.possibilityLevel * 20) {
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
