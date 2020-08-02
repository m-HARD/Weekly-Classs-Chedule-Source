<template>
  <div class="l16">
  
      <div class="w-full mt-20">

      <div class="flex justify-center py-20">
        <table class="table-auto mt-10 rounded shadow-2xl overflow-hidden">
          <thead>
            <tr class="flex flex-wrap font-bold border-b-2 border-gray-400 items-center bg-gray-400">
              <td class="w-20 font-extrabold text-xl"></td>
              <td class="w-32 font-extrabold text-xl">عدد ايام الأسبوع</td>
              <td class="w-32 font-extrabold text-xl text-center">حذف</td>
            </tr>
          </thead>
          <tbody>
            <tr class="flex flex-wrap border-b-2 border-gray-300 bg-white hover:bg-gray-300" v-for="(day,i) in dayOfWeek" :key="i">
              <td class="w-20 font-semibold px-2">{{ i+1 }}</td>
              <td class="w-32 font-semibold">{{ day.name }}</td>
              <td class="w-32 font-semibold text-center">
                <span @click="dayOfWeek.splice(index,1)" class="text-red-500 cursor-pointer">X</span>
              </td>
            </tr>
            <tr class="flex flex-wrap border-b-2 border-gray-300 bg-white">
              <td class="w-20 font-semibold px-2"></td>
              <td class="w-32 font-semibold"><input type="text" v-model="dayInput" class="w-full h-full bg-gray-400 p-1"></td>
              <td class="w-32 font-semibold text-center flex items-center">
                <span @click="AddDay" class="bg-green-400 hover:bg-green-500 w-full py-1 rounded-md cursor-pointer">أضافة</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      </div>


  </div>
</template>

<script>
import data from '@/data/data'

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
      userInput:{
          dayInput:null
      },
    }
  },
  methods: {
      AddDay(){
        if(this.dayInput == null)return
        let lastId = Math.max(...this.dayOfWeek.map(day=>{
            return day.id
        }))
        console.log(this.dayOfWeek.map(day=>{
            return day.id
        }));
        alert(lastId)
        this.dayOfWeek.push({
              id:lastId+1,
              name:this.dayInput
        })
        this.dayInput = null
      }
  },
}
</script>