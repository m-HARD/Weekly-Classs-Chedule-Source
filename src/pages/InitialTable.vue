<template>
    <div name="InitialTable">

      <div class="w-full mt-20 pb-20 px-10" v-if="showTable">

        <div class="flex justify-center">
          <div class="w-2/3 py-3 px-5 bg-gray-300 rounded shadow flex justify-between items-center">
            <div>
              في هذه المرحلة يتم فيها التحقق من المدخلات لا يمكنك المتابعة الا عند اصلاح الأخطاء ان وجدت : <br>
              1- الخلفيةالحمراء تعني *هذه الحصة فارغة<br>
              2- الخلفية الخضراء تعني *هذه الحصة ادخلت على انها ثابتة<br>
              *- في حالة تحول خلفية الفصل الي اللون الأحمر فهذا يعني ان عدد المواد اكبر من عدد حصص الأسبوع<br>
              *- في حالة وجود اخطاء يتم عرض الخطأ ليتم حله<br>
              *- ما زال العمل جار على عملية كشف الأخطاء لذلك لا تعطيك هذه النتائج جميع الأخطاء<br>
              *- في حالة كان الفصل به عدة فراغات ينصح بوضع الحصص الأخيرة من اليوم الدراسي ك فراغات ثابتة في صفحة الحصص الثابتة
            </div>
            <div>
              <span class="bg-red-500 hover:bg-red-600 py-1 mx-1 px-10 rounded cursor-pointer" @click="GoToUrl('teacher-exemptions')">رجوع</span>
              <span v-if="errorsFound.length > 0" class="bg-green-300 py-1 mx-1 px-10 rounded cursor-not-allowed">تم</span>
              <span v-else class="bg-green-500 hover:bg-green-600 py-1 mx-1 px-10 rounded cursor-pointer" @click="GoToUrlP('app-main-ui')">تم</span>
              <span class="bg-green-500 hover:bg-green-600 py-1 mx-1 px-10 rounded cursor-pointer" @click="GoToUrlP('app-main-ui')">تم</span>
            </div>
          </div>
        </div>

        <div class="mt-64">
          <ul class="mx-5" v-for="(error,i) in errorsFound" :key="i">
            <li>{{ error.details }}</li>
          </ul>
        </div>

        <table class="table-auto mt-10" v-for="(theClass,classIndex) in data.mainData.classes" :key="classIndex">
          <thead>
            <tr class="flex flex-wrap font-bold border-b-2 border-gray-400">
              <td class="w-64 font-extrabold text-xl">الصف {{ theClass.name }}</td>
              <td class="w-56 font-semibold" v-for="(sub,subIndex) in theClass.subInDay" :key="subIndex">{{ data.mainData.subInDay[subIndex] }}</td>
            </tr>
          </thead>
          <tbody>
            <tr class="flex flex-wrap border-b-2 border-gray-400" v-for="(day,dayIndex) in data.mainData.dayOfWeek" :key="dayIndex">
              <td class="w-64 font-semibold">{{ day.name }}</td>
              <td class="w-56" v-for="(sub,i) in fullInitialTable[classIndex][dayIndex]" :key="i"
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
import { eventBus } from '@/main'
export default {
    name:"InitialTable",
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
      this.startCheckStetment();
    },
    deactivated(){
      this.showTable = false
      this.restartData()
    },
    methods: {
      GoToUrlP(url){
        this.retailUserConfig('all')
        this.GoToUrl(url)
      },
      GoToUrl(url){
        eventBus.$emit('ChangeUrl',url)
      },
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
        for (let y = 0; y < this.data.mainData.classes.length; y++) {
          var theClass = this.data.mainData.classes[y];
          var subInClass = []
          
          for (let x = 0; x < this.data.mainData.dayOfWeek.length; x++) {
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
              details:"المادة : "+singleSub.theClass.name + " ,لا يمكن اضافة هذه المادة",
              data:singleSub
            })
          }
        });
      },
      chaeckTeacher(){
        this.data.mainData.teachers.forEach(teacher => {
          let teacherTable = this.initialTable.filter(data => {
            return data.teacher.id == teacher.id
          });
          let totalExemptions = 0
          let teacherExemptions = this.data.teacherExemptions.filter(data => {
            return data.teacher.id == teacher.id
          });
          if (teacherExemptions.length > 0) {
            totalExemptions = teacherExemptions[0].locations.length
          }

          let maxSubInDay = Math.max(...this.data.mainData.classes.map(data => {return data.subInDay}))
          let dayLen = this.data.mainData.dayOfWeek.length
          if (teacherTable.length + totalExemptions > maxSubInDay*dayLen) {
            this.errorsFound.push({
              type:'Overloaded',
              from:'teachers',
              details:"الأستاذ : "+teacher.name + " ,لا يمكن أضافة حصة لهذا الأستاذ بسبب ان عدد حصصه اكبر من المطلوب او ايام تغيبه كثيرة"
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
      },


      
      retailUserConfig(mode = null, theClass = null){
        var endArray = []
  
        var userConfigAfterFilter = this.data.userConfigBeforeChange;
  
        if (mode == "class" && theClass != null) {
          var userConfigOfClass =  this.data.userConfigBeforeChange.filter(singleUserConfig => {
            return singleUserConfig.theClass.id == theClass
          })
          userConfigAfterFilter = userConfigOfClass;
        }
        
        userConfigAfterFilter.forEach(singleUserConfig => {
          let retailArray = this.retailSingleUserConfig(singleUserConfig)
          retailArray.forEach(theSize => {
            endArray.push({
              "theClass":singleUserConfig.theClass,
              "teacher":singleUserConfig.teacher,
              "subject":singleUserConfig.subject,
              "size":theSize,
              "duplication":singleUserConfig.duplication,
              "fixed":singleUserConfig.fixed,
              "isExemptions":singleUserConfig.isExemptions
            })
          });
        })
  
        eventBus.$emit('retailUserConfig',endArray)
      },
      retailSingleUserConfig(singleUserConfig){
  
        var retailArray = []
        var retail = singleUserConfig.retail
  
        if (retail == 0) {
  
          for (let i = 0; i < this.data.mainData.dayOfWeek.length; i++) {
            retailArray.push(0)
          }
          let size = singleUserConfig.size
  
          while (size > 0) {
            do {
              var randomLocation = Math.floor(Math.random() * retailArray.length)
            } while (retailArray[randomLocation] + 1 > 2);
  
            retailArray[randomLocation] += 1;
            size -= 1;
          }
  
  
  
          for (let index = 0; index < retailArray.length; index++) {
            if (retailArray[index] == 0) {
              retailArray.splice(index,1);
              index--
            }
          }
          retailArray.sort(function (a,b) {
            return (a == b ? 0 : (a < b ? 1 : -1 ));       
          });
        }
        if (retail == 1 || retail == 3) {
  
          let size = singleUserConfig.size
          let duplicate = 0
          while (size > 0) {
            if (retailArray.length < this.data.mainData.dayOfWeek.length) {
              retailArray.push(1)
              size -= 1;
            } else {
              retailArray[retailArray.length % this.data.mainData.dayOfWeek.length + duplicate++] += 1;
              size -= 1;
            }
          }
        }
        if (retail == 2) {
  
          let size = singleUserConfig.size
          while (size > 0) {
            if(size % 2 == 0){
              retailArray.push(2)
              size -= 2;
            }else{
              retailArray.push(1)
              size -= 1;
            }
          }
  
          retailArray.sort(function (a,b) {
            return (a == b ? 0 : (a < b ? 1 : -1 ));       
          });
        }
        if (retail == 4) {
  
          let size = singleUserConfig.size
          while (size > 0) {
            if(size == 1){
              retailArray.push(1);
              size -= 1;
            }else{
                let randomNumber = Math.floor((Math.random() * 2)+1)
                retailArray.push(randomNumber);
                size -= randomNumber;
            }
          }
  
          retailArray.sort(function (a,b) {
            return (a == b ? 0 : (a < b ? 1 : -1 ));       
          });
        }
  
        return retailArray
  
      }
    },
}
</script>