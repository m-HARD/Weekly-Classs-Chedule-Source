<template>
  <div class="l16">


      <div class="w-full mt-20">

        <table class="w-full table-auto mt-10">
          <thead>
            <tr class="flex flex-wrap font-bold mb-1">
              <td class="w-20 font-extrabold text-xl">الأستاذ</td>
              <td class="w-16 font-semibold" v-for="teacher in data.mainData.teachers" :key="teacher.id">{{ teacher.name }}</td>
            </tr>
          </thead>
          <tbody>
            <tr class="flex flex-wrap">
              <td class="w-20 font-semibold"> عدد الحصص</td>
              <td class="w-16" v-for="teacher in data.mainData.teachers" :key="teacher.id">{{ getSubCount('teacher',teacher.id) }}</td>
            </tr>
          </tbody>
        </table>

      </div>
      <div class="w-full mt-20">

        <table class="w-full table-auto mt-10">
          <thead>
            <tr class="flex flex-wrap font-bold mb-1">
              <td class="w-20 font-extrabold text-xl">الفصل</td>
              <td class="w-16 font-semibold" v-for="theClass in data.mainData.classes" :key="theClass.id">{{ theClass.name }}</td>
            </tr>
          </thead>
          <tbody>
            <tr class="flex flex-wrap">
              <td class="w-20 font-semibold"> عدد الحصص</td>
              <td class="w-16" v-for="theClass in data.mainData.classes" :key="theClass.id">{{ getSubCount('class',theClass.id) }}</td>
            </tr>
          </tbody>
        </table>

      </div>



      <div class="w-full mt-20">
        <table class="w-full table-auto mt-10" v-for="teacher in data.mainData.teachers" :key="teacher.id">
          <thead>
            <tr class="flex flex-wrap font-bold mb-1 border-b-2 border-gray-400">
              <td class="w-64 font-extrabold text-xl">استاذ {{ teacher.name }}</td>
              <td class="w-56 font-semibold" v-for="(sub,subIndex) in 8" :key="subIndex">{{ data.mainData.subInDay[subIndex] }}</td>
            </tr>
          </thead>
          <tbody>
            <tr class="flex flex-wrap border-b-2 border-gray-400" v-for="(day,dauIndex) in data.mainData.dayOfWeek" :key="day.id">
              <td class="w-64 font-semibold">{{ day.name }}</td>
              <td class="w-56" v-for="(sub,i) in 8" :key="i">
                <span v-for="(subF,i) in getSubsOfTeacher(teacher.id,dauIndex,sub-1)" :key="i">{{ subF }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

  </div>
</template>

<script>
export default {
  name: 'viewSomeData',
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
          if(typeof theClass[theDay] != 'undefined'){
            if(typeof theClass[theDay][theSubInDay] != 'undefined'){
              if (theClass[theDay][theSubInDay].teacher.id == teacherId) {
                let className = this.data.mainData.classes[theClass[theDay][theSubInDay].oId[0]].name
                console.log(className);
                  done.push(theClass[theDay][theSubInDay].subject.name + ' ('+ className +')')
                }
            }
          }
        })
        return done
    },
    getSubCount(by,id){
      let count = 0
      let subjects = this.userDataBy(by,id)

      subjects.forEach(singleSubject => {
        count += singleSubject.size
      });

      return count
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
