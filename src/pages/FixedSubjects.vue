<template>
    <div name="InitialTable">
      <Select v-if="select.showSelect" type="fixedSub" :data="{target:select.target,options:select.options,optionsShow:select.optionsShow,from:select.from}" @end="endSelect()"/>

      <div class="w-full mt-20">

        <div class="flex justify-center">
          <div class="w-2/3 py-3 px-5 bg-gray-300 rounded shadow flex justify-between items-center">
            <span>
              في هذه المرحلة يرجي تحديد الحصص المراد ان تكون ثابتة عند انشاء الجدول مثلا النشاطات او غيرها<br>
              في حالة لا توجد اي مواد او حصص ثابتة اضغط تم للمواصلة
            </span>
            <div>
              <span class="bg-red-500 hover:bg-red-600 py-1 mx-1 px-10 rounded cursor-pointer" @click="GoToUrl('app-user-config-ui')">رجوع</span>
              <span class="bg-green-500 hover:bg-green-600 py-1 px-10 rounded cursor-pointer" @click="GoToUrl('teacher-exemptions')">تم</span>
            </div>
          </div>
        </div>

        <table class="table-auto mt-10" v-for="theClass in data.mainData.classes" :key="theClass.id">
          <thead>
            <tr class="flex flex-wrap font-bold border-b-2 border-gray-400">
              <td class="w-64 font-extrabold text-xl">الصف {{ theClass.name }}</td>
              <td class="w-56 font-semibold" v-for="(sub,i) in theClass.subInDay" :key="i">{{ data.mainData.subInDay[sub-1] }}</td>
            </tr>
          </thead>
          <tbody>
            <tr class="flex flex-wrap border-b-2 border-gray-400" v-for="day in data.mainData.dayOfWeek" :key="day.id">
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
import Select from '../components/Select'
import { eventBus } from '@/main'

export default {
    name:"FixedSubject",
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
      GoToUrl(url){
        eventBus.$emit('ChangeUrl',url)
      },
      addSubject(theClass,day,sub){
        this.select.showSelect=true
        this.select.target = this.data.userConfigBeforeChange
        this.select.from = {theClass:theClass,day:day.id-1,sub:sub}
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
        for (let y = 0; y < this.data.mainData.classes.length; y++) {
          var theClass = this.data.mainData.classes[y];
          var subInClass = []
          
          for (let x = 0; x < this.data.mainData.dayOfWeek.length; x++) {
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