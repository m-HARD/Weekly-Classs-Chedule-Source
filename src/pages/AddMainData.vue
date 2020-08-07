<template>
  <div class="l16">
  
      <div class="w-full mt-20">

        <div class="flex justify-center">
          <div class="w-2/3 py-3 px-5 bg-gray-300 rounded shadow flex justify-between items-center">
            <span>في هذه المرحلة يجب ادخال جميع البيانات الأساسية من عدد ايام الأسبوع والفصول وكل المواد وكل المعلمين</span>
            <span class="bg-green-500 hover:bg-green-600 py-1 px-10 rounded cursor-pointer" @click="GoToUrl('app-user-config-ui')">تم</span>
          </div>
        </div>

        <div class="flex justify-center py-10">
          <table class="table-auto mt-10 rounded shadow-xl overflow-hidden">
            <thead>
              <tr class="flex flex-wrap font-bold border-b-2 border-gray-400 items-center bg-gray-400">
                <td class="w-20 font-extrabold text-xl"></td>
                <td class="w-32 font-extrabold text-xl">عدد ايام الأسبوع</td>
                <td class="w-32 font-extrabold text-xl text-center">حذف</td>
              </tr>
            </thead>
            <tbody>
              <tr class="flex flex-wrap border-b-2 border-gray-300 bg-white hover:bg-gray-300" v-for="(day,i) in data.mainData.dayOfWeek" :key="i">
                <td class="w-20 font-semibold px-2">{{ i+1 }}</td>
                <td class="w-32 font-semibold">{{ day.name }}</td>
                <td class="w-32 font-semibold text-center">
                  <span @click="data.mainData.dayOfWeek.splice(i,1)" class="text-red-500 cursor-pointer">X</span>
                </td>
              </tr>
              <tr class="flex flex-wrap border-b-2 border-gray-300 bg-white">
                <td class="w-20 font-semibold px-2"></td>
                <td class="w-32 font-semibold"><input type="text" v-model="userInput.dayInput" class="w-full h-full bg-gray-400 p-1"></td>
                <td class="w-32 font-semibold text-center flex items-center">
                  <span @click="AddDay" class="bg-green-400 hover:bg-green-500 w-full py-1 rounded-md cursor-pointer">أضافة</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="flex justify-center py-10">
          <table class="table-auto mt-10 rounded shadow-xl overflow-hidden">
            <thead>
              <tr class="flex flex-wrap font-bold border-b-2 border-gray-400 items-center bg-gray-400">
                <td class="w-20 font-extrabold text-xl"></td>
                <td class="w-32 font-extrabold text-xl">الصف</td>
                <td class="w-32 font-extrabold text-xl">عدد الحصص في اليوم</td>
                <td class="w-32 font-extrabold text-xl text-center">حذف</td>
              </tr>
            </thead>
            <tbody>
              <tr class="flex flex-wrap border-b-2 border-gray-300 bg-white hover:bg-gray-300" v-for="(day,i) in data.mainData.classes" :key="i">
                <td class="w-20 font-semibold px-2">{{ i+1 }}</td>
                <td class="w-32 font-semibold">{{ day.name }}</td>
                <td class="w-32 font-semibold">{{ day.subInDay }}</td>
                <td class="w-32 font-semibold text-center">
                  <span @click="data.mainData.classes.splice(i,1)" class="text-red-500 cursor-pointer">X</span>
                </td>
              </tr>
              <tr class="flex flex-wrap border-b-2 border-gray-300 bg-white">
                <td class="w-20 font-semibold px-2"></td>
                <td class="w-32 font-semibold"><input type="text" v-model="userInput.classInput" class="w-full h-full bg-gray-400 p-1"></td>
                <td class="w-32 font-semibold"><input type="text" v-model.number="userInput.classsubInDayInput" class="w-full h-full bg-gray-400 p-1"></td>
                <td class="w-32 font-semibold text-center flex items-center">
                  <span @click="AddClass" class="bg-green-400 hover:bg-green-500 w-full py-1 rounded-md cursor-pointer">أضافة</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="flex justify-center py-10">
          <table class="table-auto mt-10 rounded shadow-xl overflow-hidden">
            <thead>
              <tr class="flex flex-wrap font-bold border-b-2 border-gray-400 items-center bg-gray-400">
                <td class="w-20 font-extrabold text-xl"></td>
                <td class="w-32 font-extrabold text-xl">المادة</td>
                <td class="w-32 font-extrabold text-xl text-center">حذف</td>
              </tr>
            </thead>
            <tbody>
              <tr class="flex flex-wrap border-b-2 border-gray-300 bg-white hover:bg-gray-300" v-for="(day,i) in data.mainData.subjects" :key="i">
                <td class="w-20 font-semibold px-2">{{ i+1 }}</td>
                <td class="w-32 font-semibold">{{ day.name }}</td>
                <td class="w-32 font-semibold text-center">
                  <span @click="data.mainData.subjects.splice(i,1)" class="text-red-500 cursor-pointer">X</span>
                </td>
              </tr>
              <tr class="flex flex-wrap border-b-2 border-gray-300 bg-white">
                <td class="w-20 font-semibold px-2"></td>
                <td class="w-32 font-semibold"><input type="text" v-model="userInput.subjectInput" class="w-full h-full bg-gray-400 p-1"></td>
                <td class="w-32 font-semibold text-center flex items-center">
                  <span @click="AddSubject" class="bg-green-400 hover:bg-green-500 w-full py-1 rounded-md cursor-pointer">أضافة</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="flex justify-center py-10">
          <table class="table-auto mt-10 rounded shadow-xl overflow-hidden">
            <thead>
              <tr class="flex flex-wrap font-bold border-b-2 border-gray-400 items-center bg-gray-400">
                <td class="w-20 font-extrabold text-xl"></td>
                <td class="w-32 font-extrabold text-xl">الأستاذ</td>
                <td class="w-32 font-extrabold text-xl text-center">حذف</td>
              </tr>
            </thead>
            <tbody>
              <tr class="flex flex-wrap border-b-2 border-gray-300 bg-white hover:bg-gray-300" v-for="(day,i) in data.mainData.teachers" :key="i">
                <td class="w-20 font-semibold px-2">{{ i+1 }}</td>
                <td class="w-32 font-semibold">{{ day.name }}</td>
                <td class="w-32 font-semibold text-center">
                  <span @click="data.mainData.teachers.splice(i,1)" class="text-red-500 cursor-pointer">X</span>
                </td>
              </tr>
              <tr class="flex flex-wrap border-b-2 border-gray-300 bg-white">
                <td class="w-20 font-semibold px-2"></td>
                <td class="w-32 font-semibold"><input type="text" v-model="userInput.teacherInput" class="w-full h-full bg-gray-400 p-1"></td>
                <td class="w-32 font-semibold text-center flex items-center">
                  <span @click="AddTeacher" class="bg-green-400 hover:bg-green-500 w-full py-1 rounded-md cursor-pointer">أضافة</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>


  </div>
</template>

<script>
import { eventBus } from '@/main'

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
      userInput:{
          dayInput:null,
          classInput:null,
          classsubInDayInput:null,
          subjectInput:null,
          teacherInput:null
      },
    }
  },
  methods: {
      GoToUrl(url){
        eventBus.$emit('ChangeUrl',url)
      },
      AddDay(){
        if(this.userInput.dayInput == null)return
        let lastId = Math.max(...this.data.mainData.dayOfWeek.map(day=>{
            return day.id
        }))
        this.data.mainData.dayOfWeek.push({
              id:lastId+1,
              name:this.userInput.dayInput
        })
        this.userInput.dayInput = null
      },
      AddClass(){
        if(this.userInput.classInput == null || this.userInput.classsubInDayInput == null)return
        let lastId = Math.max(...this.data.mainData.classes.map(theClass=>{
            return theClass.id
        }))
        this.data.mainData.classes.push({
              id:lastId+1,
              name:this.userInput.classInput,
              subInDay:this.userInput.classsubInDayInput
        })
        this.userInput.classInput = null
        this.userInput.classsubInDayInput = null
      },
      AddSubject(){
        if(this.userInput.subjectInput == null)return
        let lastId = Math.max(...this.data.mainData.subjects.map(subject=>{
            return subject.id
        }))
        this.data.mainData.subjects.push({
              id:lastId+1,
              name:this.userInput.subjectInput
        })
        this.userInput.subjectInput = null
      },
      AddTeacher(){
        if(this.userInput.teacherInput == null)return
        let lastId = Math.max(...this.data.mainData.teachers.map(teacher=>{
            return teacher.id
        }))
        this.data.mainData.teachers.push({
              id:lastId+1,
              name:this.userInput.teacherInput
        })
        this.userInput.teacherInput = null
      }
  },
}
</script>