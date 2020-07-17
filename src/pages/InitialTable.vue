<template>
    <div name="InitialTable">
      <div class="w-full flex justify-center">
        <button class="p-2 mt-5 mx-5 bg-gray-400 rounded hover:bg-gray-500 focus:outline-none cursor-pointer"
          @click="startCheckStetment()">Start Check</button>
      </div>

      <div class="w-full mt-20" v-if="showTable">
        <div class="mt-64">
          <ul class="mx-5" v-for="(error,i) in errorsFound" :key="i">
            <li>{{ error.details }}</li>
          </ul>
        </div>

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
              <td class="w-56" v-for="(sub,i) in fullInitialTable[theClass.id -1][day.id-1]" :key="i"
                :class="{'bg-red-200':sub.subject == null,'bg-green-300':sub.fixed,'bg-red-500':theClassHasError(theClass.id)}">
                <span :class="{'opacity-75':!sub.fixed}">{{ sub.subject }} {{ sub.teacher != null && sub.teacher != "" ? '('+sub.teacher+')':'' }}</span>
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
          showTable:false,
          initialTable:[],

          fullInitialTable:[],

          errorsFound:[]
        }
    },
    activated() {
      this.addFullInitialTable();
    },
    methods: {
      theClassHasError(classId){
        let returnVal = false
        this.errorsFound.forEach(element => {
          if (typeof element.data != 'undefined' && element.data.theClass.id == classId) {
            returnVal = true
          }
        });

        return returnVal
      },
      addFullInitialTable(){
        this.fullInitialTable=[]
        for (let y = 0; y < this.classes.length; y++) {
          var theClass = this.classes[y];
          var subInClass = []
          
          for (let x = 0; x < this.dayOfWeek.length; x++) {
            var sub = []
            for (let i = 0; i < theClass.subInDay; i++) {
              sub.push({
                  oId:[y,x,i],
                  subject:null,
                  teacher:null,
                  fixed:false
                })
            }
            subInClass.push(sub)
          }
          this.fullInitialTable.push(subInClass)
        }
      },
      addFixedSubjects(){
        this.initialTable.forEach(singleSub => {
          if (typeof singleSub.fixed != 'undefined') {
            if (singleSub.fixed.status) {
              let subject = this.fullInitialTable[singleSub.theClass.id -1][singleSub.fixed.location.day][singleSub.fixed.location.sub]
  
              subject.subject = singleSub.subject.name
              subject.teacher = singleSub.teacher.name
              subject.fixed = true
            }
          }
        })
      },
      addSubjectsToFullArray(){
        this.initialTable.forEach(singleSub => {
          if(typeof singleSub.fixed != 'undefined' && singleSub.fixed.status)return true
          let notBreak = true

          this.fullInitialTable[singleSub.theClass.id -1].every(day => {
            day.every(sub => {
              if (sub.subject == null) {
                sub.subject = singleSub.subject.name
                sub.teacher = singleSub.teacher.name

                notBreak = false
              }
              return notBreak
            })
              return notBreak
          });
          if(notBreak){
            this.errorsFound.push({
              type:'Overloaded',
              from:'subjects',
              details:"class : "+singleSub.theClass.name + " ,Can't add to the table",
              data:singleSub
            })
          }
        });
      },
      chaeckTeacher(){
        this.teachers.forEach(teacher => {
          let teacherTable = this.initialTable.filter(data => {
            return data.teacher.id == teacher.id
          });
          if (teacherTable.length > 30) {
            this.errorsFound.push({
              type:'Overloaded',
              from:'teachers',
              details:"teacher : "+teacher.name + " ,Can't add to the table",
              data:teacher
            })
          }
        });
      },
      restartData(){
        this.errorsFound = []
        
        this.fullInitialTable.forEach(theClass => {
          theClass.forEach(day => {
            day.forEach(subInDay => {
              subInDay.subject = null;
              subInDay.teacher = null
            })
          });
        })
      },
      startCheckStetment(){
        var endArray = []
        this.data.userConfigBeforeChange.forEach(element => {
          let size = element.size
          while (size > 1) {
            endArray.push(element);
            size -= 1
          }
            endArray.push(element);
        });
        this.initialTable = endArray
        this.restartData();
        this.addFixedSubjects();
        this.addSubjectsToFullArray();
        this.chaeckTeacher();
        this.showTable = true
      }
    },
    deactivated(){
      this.showTable = false
      this.restartData()
    }

}
</script>