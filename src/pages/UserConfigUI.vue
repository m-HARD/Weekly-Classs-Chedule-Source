<template>
  <div class="l16">
  
      <div class="w-full mt-20">

        <div class="flex justify-center">
          <div class="w-2/3 py-3 px-5 bg-gray-300 rounded shadow flex justify-between items-center">
            <span>
              في هذه المرحلة يجب ادخال كافة البيانات اسم المعلم والمواد وعدد الحصص في الأسبوع واختيار احد الطرق ليتم التوزيع عليها : <br>
              1- التوزيع الذكي : يتم التوزيع فيها بشكل عشوائي حصة او حصتين في اليوم<br>
              2- 1.1.1 يتم فيها توزيع بوضع حصة واحدة في اليوم الواحد<br>
              3- 2.2.2 يتم فيها توزيع بوضع حصتين متجاورتين في اليوم الواحد<br>
              4- ملء الجدول يتم فيها توزيع بحيث تتوزعفي كامل الأسبوع سواءا حصة او حصتين<br>
              *- يرجى اختيار خيار التعدد في حالة المواد التي متكررة في نفس اليوم في نقس اليوم<br>
              *- في حالة وجود مادة فرعية ك النشاطات وغيرها يرجي وضع المعلم في خيار لا يوجد<br>
            </span>
            <div>
              <span class="bg-red-500 hover:bg-red-600 py-1 mx-1 px-10 rounded cursor-pointer" @click="GoToUrl('add-main-data')">رجوع</span>
              <span class="bg-green-500 hover:bg-green-600 py-1 px-10 rounded cursor-pointer" @click="GoToUrl('fixed-subjects')">تم</span>
            </div>
          </div>
        </div>

        <form class='flex justify-center mt-20' @submit.prevent="addToUserConfig()">
            <div class='w-full max-w-2xl bg-white rounded-lg p-6 shadow-xl'>
                <div class='flex flex-wrap -mx-3'>
        
                    <div class='w-full px-3 mb-6'>
                        <label class='lableClasses'>الأستاذ</label>
                        <div class='relative'>
                            <select v-model="userInput.teacher" class='selectClasses'>
                                <option v-for="(teacher,index) in data.mainData.teachers" :value="teacher" :key="index">{{ teacher.name }}</option>
                            </select>
                            <div v-html="svg()" />
                        </div>
                    </div>
                    <div class='w-1/3 px-3 mb-6'>
                        <label class='lableClasses'>المادة</label>
                        <div class='relative'>
                            <select v-model="userInput.subject" class='selectClasses'>
                                <option v-for="(subject,index) in data.mainData.subjects" :key="index" :value="subject" v-text="subject.name"></option>
                            </select>
                            <div v-html="svg()" />
                        </div>
                    </div>
                    <div class='w-1/3 px-3 mb-6'>
                        <label class='lableClasses'>الفصل</label>
                        <div class='relative'>
                            <select v-model="userInput.theClass" class='selectClasses'>
                                <option v-for="(theClass,index) in data.mainData.classes" :key="index" :value="theClass" v-text="theClass.name"></option>
                            </select>
                            <div v-html="svg()" />
                        </div>
                    </div>
                    <div class='w-1/3 px-3 mb-6'>
                        <label class='lableClasses'>عدد الحصص</label>
                        <div class='relative'>
                          <input type="number" v-model.number="userInput.size" class='selectClasses'>
                        </div>
                    </div>
                    <div class='w-full px-3 mb-6'>
                        <label class='lableClasses'>طريقة التوزيع</label>
                        <div class='relative'>
                          <div class="block">
                            <input type="radio" v-model.number="userInput.retailType" name="retail" value="0" class="mx-2 my-2 py-1 cursor-pointer">
                            <label for="retail">{{ retailTypes[0] }}</label>
                          </div>
                          <div class="block">
                            <input type="radio" v-model.number="userInput.retailType" name="retail" value="1" class="mx-2 my-2 py-1 cursor-pointer">
                            <label for="retail">{{ retailTypes[1] }}</label>
                          </div>
                          <div class="block">
                            <input type="radio" v-model.number="userInput.retailType" name="retail" value="2" class="mx-2 my-2 py-1 cursor-pointer">
                            <label for="retail">{{ retailTypes[2] }}</label>
                          </div>
                          <div class="block">
                            <input type="radio" v-model.number="userInput.retailType" name="retail" value="3" class="mx-2 my-2 py-1 cursor-pointer">
                            <label for="retail">{{ retailTypes[3] }}</label>
                          </div>
                          <div class="block">
                            <input type="radio" v-model.number="userInput.retailType" name="retail" value="4" class="mx-2 my-2 py-1 cursor-pointer">
                            <label for="retail">
                              {{ retailTypes[4] }}
                              <span class="text-xs text-red-400">*يرجى اختيار هذا الخيار في حالة المادة للفصول الصغيرة أولى تانية.. والتي نقبل عدة حصص في نقس اليوم</span>
                            </label>
                          </div>
                        </div>
                    </div>
                    <div class='w-full px-3 mb-6'>
                      <div class="w-full flex items-center">
                        <input type="checkbox" v-model.number="userInput.duplication" name="duplication" class="mx-2 my-2 py-1 cursor-pointer">
                        <label class='lableClasses'>امكانية وجود نفس المادة في مكانين مختلفين ويوم واحد</label>
                      </div>
                        <span class="block text-xs text-red-400">*يرجى اختيار هذا الخيار في حالة المادة للفصول الصغيرة أولى تانية.. والتي نقبل عدة حصص في نقس اليوم</span>
                    </div>

                    <div class='w-full px-3'>
                      <input class='btnClasses py-4 bg-green-400' type="submit" value="add">
                    </div>

        
                </div>
            </div>
        </form>

      <div class="flex justify-center py-20">
        <table class="table-auto mt-10 rounded shadow-2xl overflow-hidden">
          <thead>
            <tr class="flex flex-wrap font-bold border-b-2 border-gray-400 items-center bg-gray-400">
              <td class="w-20 font-extrabold text-xl"></td>
              <td class="w-32 font-extrabold text-xl">الصف</td>
              <td class="w-32 font-extrabold text-xl">المادة</td>
              <td class="w-32 font-extrabold text-xl">الأستاذ</td>
              <td class="w-32 font-extrabold text-xl text-center">العدد</td>
              <td class="w-32 font-extrabold text-xl">طريقة التوزيع</td>
              <td class="w-48 font-extrabold text-xl">امكانية وجود نفس المادة في مكانين مختلفين ويوم واحد</td>
              <td class="w-32 font-extrabold text-xl text-center">حذف</td>
            </tr>
          </thead>
          <tbody>
            <tr class="flex flex-wrap border-b-2 border-gray-300 bg-white hover:bg-gray-300" v-for="(userconfig,i) in data.userConfigBeforeChange" :key="i">
              <td class="w-20 font-semibold px-2">{{ i+1 }}</td>
              <td class="w-32 font-semibold">{{ userconfig.theClass.name }}</td>
              <td class="w-32 font-semibold">{{ userconfig.subject.name }}</td>
              <td class="w-32 font-semibold">{{ userconfig.teacher.name }}</td>
              <td class="w-32 font-semibold text-center">{{ userconfig.size }}</td>
              <td class="w-32 font-semibold">{{ retailTypes[userconfig.retail] }}</td>
              <td class="w-48 font-semibold text-center">{{ userconfig.duplication ? 'نعم':'لا' }}</td>
              <td class="w-32 font-semibold text-center">
                <span @click="DeleteFromuserConfigBeforeChange(i)" class="text-red-500 cursor-pointer">X</span>
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
  name: 'userConfigUi',
  props:{
    data:{
      type:Object,
      required:true
    }
  },
  data() {
    return {
      userInput:{
        theClass:null,
        teacher:null,
        subject:null,
        size:null,
        retailType:null,
        duplication:false
      },


      retailTypes:["التوزيع الذكي","1.1.1...","2.2.2....","ملء الجدول","عشوائي"]
    }
  },
  methods: {
    GoToUrl(url){
      eventBus.$emit('ChangeUrl',url)
    },
    DeleteFromuserConfigBeforeChange(index){
          this.data.userConfigBeforeChange.splice(index,1);
    },
    addToUserConfig(){
      var Input = this.userInput
        if(Input.theClass == null || Input.teacher == null || Input.subject == null || Input.size == null || Input.retailType == null) return
        this.data.userConfigBeforeChange.push({
            theClass: Input.theClass,
            teacher: Input.teacher,
            subject: Input.subject,
            size: Input.size,
            duplication: Input.duplication,
            retail: Input.retailType,
            fixed: {"status":false,"location":null},
            isExemptions:false
        })
        Input.subject = null;
        Input.size = null;
        Input.duplication = null;
        Input.retailType = null;
        Input.duplication = false;
    },
    svg(){
      return `
        <div class='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
            <svg class='fill-current h-4 w-4' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
                <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z'/>
            </svg>
        </div>
      `;
    }
  }
}
</script>