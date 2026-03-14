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
      bestDistribution:{data:null,canNotAddLength:null,canNotAddList:null},
      bestAttemptState:null,
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
    shuffleArray(arr){
      var a = arr.slice()
      for (var i = a.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var t = a[i]; a[i] = a[j]; a[j] = t
      }
      return a
    },
    getTotalCanNotAdd(){
      var total = 0
      this.iCanNotAddIt.forEach(function (list) { total += list.length })
      return total
    },
    getClassesAffectedCount(){
      var n = 0
      this.iCanNotAddIt.forEach(function (list) { if (list.length > 0) n++ })
      return n
    },
    getTeachersAffectedCount(){
      var ids = {}
      this.iCanNotAddIt.forEach(function (list) {
        list.forEach(function (item) {
          if (item.teacher && item.teacher.id != null) ids[item.teacher.id] = true
        })
      })
      return Object.keys(ids).length
    },
    orderListByShuffledTeachers(list){
      if (!list || list.length === 0) return list
      var byTeacher = {}
      list.forEach(function (item) {
        var tid = item.teacher.id
        if (!byTeacher[tid]) byTeacher[tid] = []
        byTeacher[tid].push(item)
      })
      var teacherIds = this.shuffleArray(Object.keys(byTeacher).map(Number))
      var out = []
      teacherIds.forEach(function (tid) {
        byTeacher[tid].forEach(function (item) { out.push(item) })
      })
      return out
    },
    cloneScheduleState(){
      var subInClasses = this.data.subInClasses
      var copy = []
      for (var ci = 0; ci < subInClasses.length; ci++) {
        copy[ci] = []
        for (var di = 0; di < subInClasses[ci].length; di++) {
          copy[ci][di] = []
          for (var si = 0; si < subInClasses[ci][di].length; si++) {
            var c = subInClasses[ci][di][si]
            copy[ci][di][si] = {
              subject: c.subject && c.subject.id != null ? { id: c.subject.id, name: c.subject.name } : { id: null, name: null },
              teacher: c.teacher && c.teacher.id != null ? { id: c.teacher.id, name: c.teacher.name } : { id: null, name: null }
            }
          }
        }
      }
      var canNotAddCopy = this.iCanNotAddIt.map(function (list) { return list.slice() })
      return { subInClasses: copy, iCanNotAddIt: canNotAddCopy }
    },
    restoreScheduleState(state){
      var subInClasses = this.data.subInClasses
      var copy = state.subInClasses
      for (var ci = 0; ci < copy.length; ci++) {
        for (var di = 0; di < copy[ci].length; di++) {
          for (var si = 0; si < copy[ci][di].length; si++) {
            subInClasses[ci][di][si].subject = copy[ci][di][si].subject
            subInClasses[ci][di][si].teacher = copy[ci][di][si].teacher
          }
        }
      }
      for (var i = 0; i < state.iCanNotAddIt.length; i++) {
        this.iCanNotAddIt[i] = state.iCanNotAddIt[i].slice()
      }
    },
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
    countTeacherFreeSlotsOnDay(teacherId, dayIndex) {
      var count = 0
      this.data.subInClasses.forEach(function (row) {
        if (row[dayIndex]) {
          row[dayIndex].forEach(function (cell) {
            if (cell.teacher.id === null || cell.teacher.id === 0) count++
          })
        }
      })
      return count
    },
    countClassFreeSlotsOnDay(classIndex, dayIndex) {
      if (!this.data.subInClasses[classIndex] || !this.data.subInClasses[classIndex][dayIndex]) return 0
      var count = 0
      this.data.subInClasses[classIndex][dayIndex].forEach(function (cell) {
        if (cell.subject.name == null) count++
      })
      return count
    },
    scoreSlotForPlacement(data, dayIndex, subIdx, emptyInClassEntry, classIndex) {
      var teacherId = data.teacherId
      var slotsInDay = this.data.subInClasses[classIndex][dayIndex]
        ? this.data.subInClasses[classIndex][dayIndex].length
        : 0
      var teacherFlex = this.countTeacherFreeSlotsOnDay(teacherId, dayIndex)
      var classFlex = this.countClassFreeSlotsOnDay(classIndex, dayIndex)
      var score = teacherFlex + classFlex
      if (data.data.size === 2 && slotsInDay > 1) {
        var mid = (slotsInDay - 1) / 2
        var subLoc = emptyInClassEntry.data[subIdx].loc
        score += (slotsInDay - Math.abs(subLoc - mid))
      }
      return score
    },
    canAdd(data){
      if (data.data.fixed.status)return {iCan:false,location:0,location2:0}

      var emptyInClass = this.emptySubInClass(data.theClass)
      var classIndex = -1
      for (var c = 0; c < this.data.mainData.classes.length; c++) {
        if (this.data.mainData.classes[c].id === data.data.theClass.id) {
          classIndex = c
          break
        }
      }
      var validSlots = []

      if (emptyInClass.length > 0 && classIndex >= 0) {
        for (var dayIdx = 0; dayIdx < emptyInClass.length; dayIdx++) {
          var sc1 = emptyInClass[dayIdx]
          var dayIndex = sc1.loc
          var maxSub = data.data.size === 2 ? sc1.data.length - 1 : sc1.data.length
          for (var subIdx = 0; subIdx < maxSub; subIdx++) {
            var teacherIsEmpty = this.teacherIsEmpty(data.teacherId, sc1.loc, sc1.data[subIdx].loc)
            var validation = sc1.data[subIdx].data.subject.name == null && teacherIsEmpty
            if (data.data.size === 2) {
              validation = validation && this.nextLocIsEmpty(sc1.data[subIdx + 1], data.teacherId, sc1.loc, sc1.data[subIdx].loc)
              var firstSlotLoc = sc1.data[subIdx].loc
              if (firstSlotLoc === 2) validation = false
            }
            if (!data.data.duplication) {
              validation = validation && this.DayHasNoThisSubject(data.data.theClass.id, sc1.loc, data.data.subject.id)
            }
            if (typeof data.data.isExemptions !== 'undefined' && data.data.isExemptions) {
              validation = validation && this.locationIsAnExemption(data.teacherId, sc1.loc, sc1.data[subIdx].loc)
              if (data.data.size === 2) {
                validation = validation && this.locationIsAnExemption(data.teacherId, sc1.loc, sc1.data[subIdx + 1].loc)
              }
            }
            if (validation) {
              var score = this.scoreSlotForPlacement(data, dayIndex, subIdx, sc1, classIndex)
              validSlots.push({ dayIdx: dayIdx, subIdx: subIdx, score: score })
            }
          }
        }
      }

      var found = validSlots.length > 0
      if (found) {
        validSlots.sort(function (a, b) { return b.score - a.score })
        var best = validSlots[0]
        var sel = emptyInClass[best.dayIdx]
        return {
          iCan: true,
          location: sel.data[best.subIdx].data,
          location2: data.data.size === 2 ? sel.data[best.subIdx + 1].data : 0
        }
      }

      this.iCanNotAddIt[data.data.theClass.id - 1].push(data.data)
      return { iCan: false, location: 0, location2: 0 }
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
      var self = this
      this.showLoad = true
      setTimeout(function () {
        var numAttempts = 6
        var bestTotal = Infinity
        var bestClassesAffected = Infinity
        var bestTeachersAffected = Infinity
        var bestState = null

        for (var attempt = 0; attempt < numAttempts; attempt++) {
          self.restartData()
          var classOrder = self.data.mainData.classes.slice()
          if (attempt > 0) classOrder = self.shuffleArray(classOrder)

          var useTeacherOrder = attempt === 2 || attempt === 4

          classOrder.forEach(function (theClass) {
            var list = self.userDataBy('class', theClass.id)
            if (attempt > 0) {
              list = useTeacherOrder ? self.orderListByShuffledTeachers(list) : self.shuffleArray(list)
            }
            list.forEach(function (data) {
              self.addSubjectToClass(data.theClass.id, data)
            })
          })

          self.checkIfBestDistribution()

          var total = self.getTotalCanNotAdd()
          var classesAffected = self.getClassesAffectedCount()
          var teachersAffected = self.getTeachersAffectedCount()
          var isBetter = total < bestTotal ||
            (total === bestTotal && classesAffected < bestClassesAffected) ||
            (total === bestTotal && classesAffected === bestClassesAffected && teachersAffected < bestTeachersAffected)
          if (isBetter) {
            bestTotal = total
            bestClassesAffected = classesAffected
            bestTeachersAffected = teachersAffected
            bestState = self.cloneScheduleState()
          }
        }

        if (bestState != null) self.restoreScheduleState(bestState)
        self.showLoad = false
      }, 50)
    },
    addSubjectToSpecificallyClass(classId, useShuffleOrder){
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

      var list = this.userDataBy('class', classId)
      if (useShuffleOrder && list.length > 0) list = this.shuffleArray(list)
      list.forEach((data)=>{
        this.addSubjectToClass(data.theClass.id, data)
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
      var idx = canNotAddID - 1
      var currentLen = this.iCanNotAddIt[idx].length
      if (this.bestDistribution.canNotAddLength == null || currentLen < this.bestDistribution.canNotAddLength) {
        var src = this.data.subInClasses[idx]
        var copy = []
        for (var d = 0; d < src.length; d++) {
          copy[d] = []
          for (var s = 0; s < src[d].length; s++) {
            var c = src[d][s]
            copy[d][s] = {
              subject: c.subject && c.subject.id != null ? { id: c.subject.id, name: c.subject.name } : { id: null, name: null },
              teacher: c.teacher && c.teacher.id != null ? { id: c.teacher.id, name: c.teacher.name } : { id: null, name: null }
            }
          }
        }
        this.bestDistribution.data = copy
        this.bestDistribution.canNotAddLength = currentLen
        this.bestDistribution.canNotAddList = this.iCanNotAddIt[idx].slice()
      }
      if (currentLen > this.bestDistribution.canNotAddLength && this.bestDistribution.canNotAddLength != null) {
        var best = this.bestDistribution.data
        for (var dd = 0; dd < best.length; dd++) {
          for (var ss = 0; ss < best[dd].length; ss++) {
            this.data.subInClasses[idx][dd][ss].subject = best[dd][ss].subject
            this.data.subInClasses[idx][dd][ss].teacher = best[dd][ss].teacher
          }
        }
        this.iCanNotAddIt[idx] = this.bestDistribution.canNotAddList.slice()
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

          var useShuffle = theAllSubjectTry > 0 && theAllSubjectTry % 10 === 0
          this.iCanNotAddIt.forEach(inClassNotAdd => {
            let theClassTry = 0
            if (inClassNotAdd.length > 0) {
              let id = inClassNotAdd[0].theClass.id
              while (this.iCanNotAddIt[id - 1].length > 0) {
                this.addSubjectToSpecificallyClass(id, useShuffle)
                this.addBestDistribution(id)
                if (theClassTry++ === 400) break
              }
              this.bestDistribution = { data: null, canNotAddLength: null, canNotAddList: null }
            }
          })

          canNotAddClassCount = 0
          this.iCanNotAddIt.forEach(inClassNotAdd => {
            if (inClassNotAdd.length > 0) {
              canNotAddClassCount += inClassNotAdd.length
            }
          })
          
          
          if (++theAllSubjectTry == this.data.possibilityLevel * 20) {
            break
          }
          if (canNotAddClassCount > 0 && theAllSubjectTry % 5 === 0) {
            this.addSubjectToAllClassWithOutCheck()
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
