<template>
    <div name="InitialTable">

      <div class="w-full mt-20">
        <table class="table-auto mt-10" v-for="teacher in teachers" :key="teacher.id">
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
                <button class="btnClasses bg-gray-300 h-10" :class="{'bg-red-300':TeachersExemptionsShow[teacher.id -1][day.id-1][sub-1]}"
                      @click="exemptionReservation(teacher,day.id-1,sub-1)" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
</template>

<script>
import data from '@/data/data'
export default {
    name:"InitialTable",
    mixins:[data],
    props:{
      data:{
        type:Object,
        required:true
      }
    },
    data() {
        return {
          TeachersExemptions:[],
          TeachersExemptionsShow:[]
        }
    },
    created() {
      this.TeachersExemptions = [...this.data.teacherExemptions]
      for (let y = 0; y < this.teachers.length; y++) {
        var theDay = []
          
          for (let x = 0; x < this.dayOfWeek.length; x++) {
            var sub = []
            for (let i = 0; i < 8; i++) {
              sub.push(false)
            }
            theDay.push(sub)
          }
          this.TeachersExemptionsShow.push(theDay)
        }
      this.TeacherExemptions()
    },
    activated() {
    },
    methods: {
      TeacherExemptionsIsFound(teacherId){
        let teacherExemptions = this.TeachersExemptions.filter(teacherExemption => {
          return teacherExemption.teacher.id == teacherId
        });
        if (teacherExemptions.length >= 1) {
          return teacherExemptions[0]
        }

        return false
      },
      ifExempyionIsExist(teacherExemption, day, sub){
        let returnVal = false
        teacherExemption.forEach((element,i) => {
          if (element.day == day && element.sub == sub) {
            returnVal = i
          }
        });
        return returnVal
      },
      TeacherExemptions(){
        this.teachers.forEach(teacher => {
          let teacherExemptions = this.TeacherExemptionsIsFound(teacher.id)
  
          if (teacherExemptions) {
            teacherExemptions.locations.forEach(singleExemption => {
              this.TeachersExemptionsShow[teacher.id -1][singleExemption.day][singleExemption.sub] = true
            })
          }
        })
      },
      exemptionReservation(teacher,day,sub){
        let teacherExemptions = this.TeacherExemptionsIsFound(teacher.id)

        if (teacherExemptions) {
          let ifExempyionIsExist = this.ifExempyionIsExist(teacherExemptions.locations, day, sub)
          if (ifExempyionIsExist !== false) {
            this.$set(this.TeachersExemptionsShow[teacher.id -1][day], sub, false)
            teacherExemptions.locations.splice(ifExempyionIsExist,1)

            if(teacherExemptions.locations.length == 0){
              this.data.userConfigBeforeChange.filter(data => {
                return data.teacher.id == teacher.id
              }).map(data => {
                data.isExemptions = false
              })

              let index = this.data.teacherExemptions.indexOf(teacherExemptions)
              if (index != -1) {
                this.data.teacherExemptions.splice(index,1)
              }
            }
          }else{
            this.$set(this.TeachersExemptionsShow[teacher.id -1][day], sub, true)
            teacherExemptions.locations.push({day:day,sub:sub})
          }
        }

      }
    }
}
</script>