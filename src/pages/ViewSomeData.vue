<template>
  <div class="l16">


      <div class="w-full mt-20">

        <table class="w-full table-auto mt-10">
          <thead>
            <tr class="flex flex-wrap font-bold mb-1">
              <td class="w-20 font-extrabold text-xl">الأستاذ</td>
              <td class="w-16 font-semibold" v-for="teacher in teachers" :key="teacher.id">{{ teacher.name }}</td>
            </tr>
          </thead>
          <tbody>
            <tr class="flex flex-wrap">
              <td class="w-20 font-semibold"> عدد الحصص</td>
              <td class="w-16" v-for="teacher in teachers" :key="teacher.id">{{ userDataBy('teacher',teacher.id).length }}</td>
            </tr>
          </tbody>
        </table>

      </div>
      <div class="w-full mt-20">

        <table class="w-full table-auto mt-10">
          <thead>
            <tr class="flex flex-wrap font-bold mb-1">
              <td class="w-20 font-extrabold text-xl">الفصل</td>
              <td class="w-16 font-semibold" v-for="theClass in classes" :key="theClass.id">{{ theClass.name }}</td>
            </tr>
          </thead>
          <tbody>
            <tr class="flex flex-wrap">
              <td class="w-20 font-semibold"> عدد الحصص</td>
              <td class="w-16" v-for="theClass in classes" :key="theClass.id">{{ userDataBy('class',theClass.id).length }}</td>
            </tr>
          </tbody>
        </table>

      </div>



      <div class="w-full mt-20">
        <table class="w-full table-auto mt-10" v-for="teacher in teachers" :key="teacher.id">
          <thead>
            <tr class="flex flex-wrap font-bold mb-1 border-b-2 border-gray-400">
              <td class="w-64 font-extrabold text-xl">استاذ {{ teacher.name }}</td>
              <td class="w-56 font-semibold" v-for="(sub,i) in 8" :key="i">{{ subInDay[sub-1] }}</td>
            </tr>
          </thead>
          <tbody>
            <tr class="flex flex-wrap border-b-2 border-gray-400" v-for="day in dayOfWeek" :key="day.id">
              <td class="w-64 font-semibold">{{ day.name }}</td>
              <td class="w-56" v-for="(sub,i) in 8" :key="i">
                <span v-for="(sub,i) in getSubsOfTeacher(teacher.id,day.id-1,sub-1)" :key="i">{{ sub }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

  </div>
</template>

<script>
import data from './data/data'
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
      userClass:null,
      userTeacher:null,
      userSubjects:null
    }
  },
  methods: {    
    getSubsOfTeacher(teacherId,theDay,theSubInDay){
        var done = [];
        this.data.subInClasses.forEach(theClass => {
        if(typeof theClass[theDay][theSubInDay] != 'undefined'){
            if (theClass[theDay][theSubInDay].teacher.id == teacherId) {
              done.push(theClass[theDay][theSubInDay].subject.name + ' ('+ (theClass[theDay][theSubInDay].oId[0]+1) +')')
            }
        }
        })
        return done
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
    }
  },
}
</script>

<style>

</style>
