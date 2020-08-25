<template>
    <div name="InitialTable">

      <div class="w-full mt-20">

        <div class="flex justify-center">
          <div class="w-2/3 py-3 px-5 bg-gray-300 rounded shadow flex justify-between items-center">
            <span>
              في هذه المرحلة يرجي تحديد اعفاءات المعلمين او الحصص التي لا يستطيع المعلم الحضور اليها ليتم تجنب ادخال المعلم في هذه الحصص عند انشاء الجدول<br>
              في حالة لا توجد تعديلات اضغط تم للمواصلة
            </span>
            <div>
              <span class="bg-red-500 hover:bg-red-600 py-1 mx-1 px-10 rounded cursor-pointer" @click="GoToUrl('fixed-subjects')">رجوع</span>
              <span class="bg-green-500 hover:bg-green-600 py-1 px-10 rounded cursor-pointer" @click="GoToUrl('initial-table')">تم</span>
            </div>
          </div>
        </div>

        <table class="table-auto mt-10" v-for="(teacher,teacherIndex) in data.mainData.teachers" :key="teacher.id">
          <thead>
            <tr class="flex flex-wrap font-bold mb-1 border-b-2 border-gray-400">
              <td class="w-64 font-extrabold text-xl">استاذ {{ teacher.name }}</td>
              <td class="w-56 font-semibold hover:bg-gray-200 cursor-pointer" @click.stop="exemptionReservationAllSub(teacher,subIndex)" v-for="(sub,subIndex) in maxSubInDay" :key="subIndex" >{{ data.mainData.subInDay[subIndex] }}</td>
            </tr>
          </thead>
          <tbody>
            <tr class="flex flex-wrap border-b-2 border-gray-400" v-for="(day,dayIndex) in data.mainData.dayOfWeek" :key="day.id">
              <td class="w-64 font-semibold hover:bg-gray-200 cursor-pointer" @click.stop="exemptionReservationAllDay(teacher,dayIndex)">{{ day.name }}</td>
              <td class="w-56" v-for="(sub,subIndex) in maxSubInDay" :key="subIndex">
                <button class="btnClasses h-10" :class="TeachersExemptionsShow[teacherIndex][dayIndex][subIndex]? 'bg-red-300 hover:bg-red-400':'bg-gray-300 hover:bg-gray-400'"
                      @click.stop="exemptionReservation(teacher,dayIndex,subIndex)" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
</template>

<script>
import { eventBus } from '@/main'
export default {
    name:"TeacherExemptions",
    props:{
      data:{
        type:Object,
        required:true
      }
    },
    data() {
        return {
          TeachersExemptions:[],
          TeachersExemptionsShow:[],
          maxSubInDay:0
        }
    },
    created() {
      this.TeachersExemptions = [...this.data.teacherExemptions]
      for (let y = 0; y < this.data.mainData.teachers.length; y++) {
        var theDay = []
          
          for (let x = 0; x < this.data.mainData.dayOfWeek.length; x++) {
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
      this.maxSubInDay = Math.max(...this.data.mainData.classes.map(data => {return data.subInDay}))
    },
    methods: {
      GoToUrl(url){
        eventBus.$emit('ChangeUrl',url)
      },
      TeacherExemptionsIsFound(teacherId){
        let teacherExemptions = this.data.teacherExemptions.filter(teacherExemption => {
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
        this.data.mainData.teachers.forEach(teacher => {
          let teacherExemptions = this.TeacherExemptionsIsFound(teacher.id)
  
          if (teacherExemptions) {
            teacherExemptions.locations.forEach(singleExemption => {
              this.TeachersExemptionsShow[teacher.id -1][singleExemption.day][singleExemption.sub] = true
            })
          }
        })
      },
      exemptionReservationAllDay(teacher,day){
        for (let sub = 0; sub < 8; sub++) {
          this.exemptionReservation(teacher,day,sub)
        }
      },
      exemptionReservationAllSub(teacher,sub){
        this.data.mainData.dayOfWeek.forEach(day => {
          this.exemptionReservation(teacher,day.id -1,sub)
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
        }else{
          this.data.userConfigBeforeChange.filter(data => {
            return data.teacher.id == teacher.id
          }).map(data => {
            data.isExemptions = true
          })

          this.$set(this.TeachersExemptionsShow[teacher.id -1][day], sub, true)
          this.data.teacherExemptions.push({
            teacher:teacher,
            locations:[{"day":day,"sub":sub}]
          })

        }

      }
    }
}
</script>