<template>
    <div name="InitialTable">
      <Select v-if="select.showSelect" type="fixedSub" :data="{target:select.target,options:select.options,optionsShow:select.optionsShow,from:select.from}" @end="endSelect()"/>

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
              <td class="w-56" v-for="(sub,i) in fullInitialTable[theClass.id -1][day.id-1]" :key="i">
                <button @click="addSubject(theClass, day, i)" class="btnClasses bg-gray-300 h-10">
                  {{ sub.subject }} {{ sub.teacher != null && sub.teacher != "" ? '('+sub.teacher+')':'' }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
</template>

<script>
import data from '@/data/data'
import Select from '../components/Select'
export default {
    name:"InitialTable",
    mixins:[data],
    components:{Select},
    props:{
      data:{
        type:Object,
        required:true
      }
    },
    data() {
        return {
          initialTable:[],
          fullInitialTable:[],


          select:{showSelect:false,target:null,options:[],optionsShow:[],from:{day:null,sub:null}},
          toSelectData:[]
        }
    },
    created() {
      this.addFullInitialTable();
    },
    activated(){
      this.addToTable();
    },
    methods: {
      addSubject(theClass,day,sub){
        this.select.showSelect=true
        this.select.target = this.data.userConfigBeforeChange
        this.select.from = {day:day.id-1,sub:sub}
        this.select.options = this.data.userConfigBeforeChange.filter(single => {
          return single.theClass.id == theClass.id && !single.fixed.status
        })
        this.select.optionsShow = this.select.options.map(single => {
          return single.subject.name + " ("+ single.teacher.name +")" + " ("+ single.size +")"
        })
      },
      endSelect(){
        Object.assign(this.$data.select,this.$options.data.call(this).select)
        this.addToTable();
      },
      addFullInitialTable(){
        for (let y = 0; y < this.classes.length; y++) {
          var theClass = this.classes[y];
          var subInClass = []
          
          for (let x = 0; x < this.dayOfWeek.length; x++) {
            var sub = []
            for (let i = 0; i < theClass.subInDay; i++) {
              sub.push({
                  oId:[y,x,i],
                  subject:null,
                  teacher:null
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
            }
          }
        })
      },
      addSubjectsToFullArray(){
        this.initialTable.forEach(singleSub => {
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
        });
      },
      restartData(){
        this.fullInitialTable.forEach(theClass => {
          theClass.forEach(day => {
            day.forEach(subInDay => {
              subInDay.subject = null;
              subInDay.teacher = null
            })
          });
        })
      },
      addToTable(){
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
      }
    }

}
</script>