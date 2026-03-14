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
            <div class="flex flex-wrap items-center">
              <span class="bg-blue-500 hover:bg-blue-600 py-1 mx-1 px-4 rounded cursor-pointer" @click="exportToExcel">تصدير Excel</span>
              <label class="bg-blue-500 hover:bg-blue-600 py-1 mx-1 px-4 rounded cursor-pointer">استيراد Excel
                <input ref="importFileInput" type="file" accept=".xlsx,.xls" class="hidden" @change="onImportFileSelected($event)">
              </label>
              <div v-if="showImportChoice" class="fixed inset-0 flex justify-center items-center z-50" style="background: rgba(0,0,0,0.5)" @click.self="cancelImport">
                <div class="bg-white rounded-lg p-6 shadow-xl max-w-md mx-4">
                  <p class="text-lg font-semibold mb-4">كيف تريد معالجة البيانات المستوردة؟</p>
                  <div class="flex flex-wrap justify-center">
                    <button type="button" class="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded cursor-pointer m-2" @click="doImport(true, false)">استبدال البيانات الحالية</button>
                    <button type="button" class="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded cursor-pointer m-2" @click="doImport(false, false)">إضافة إلى البيانات الموجودة</button>
                    <button type="button" class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded cursor-pointer m-2" @click="doImport(true, true)">استيراد التوزيع فقط</button>
                    <button type="button" class="bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded cursor-pointer m-2" @click="cancelImport">إلغاء</button>
                  </div>
                </div>
              </div>
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
import * as XLSX from 'xlsx'

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


      retailTypes:["التوزيع الذكي","1.1.1...","2.2.2....","ملء الجدول","عشوائي"],
      showImportChoice: false,
      importPendingFile: null
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
    exportToExcel(){
      var wb = XLSX.utils.book_new()
      var days = [['id','اسم اليوم']].concat(this.data.mainData.dayOfWeek.map(function(d){ return [d.id, d.name] }))
      XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(days), 'أيام')
      var classes = [['id','الفصل','عدد الحصص في اليوم']].concat(this.data.mainData.classes.map(function(c){ return [c.id, c.name, c.subInDay] }))
      XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(classes), 'فصول')
      var subjects = [['id','المادة']].concat(this.data.mainData.subjects.map(function(s){ return [s.id, s.name] }))
      XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(subjects), 'مواد')
      var teachers = [['id','المعلم']].concat(this.data.mainData.teachers.map(function(t){ return [t.id, t.name] }))
      XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(teachers), 'معلمون')
      var config = [['الفصل','المادة','الأستاذ','عدد الحصص','طريقة التوزيع','تكرار']].concat(
        this.data.userConfigBeforeChange.map(function(r){
          return [r.theClass.name, r.subject.name, r.teacher.name, r.size, r.retail, r.duplication ? 'نعم' : 'لا']
        })
      )
      XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(config), 'التوزيع')
      XLSX.writeFile(wb, 'جدول_البيانات.xlsx')
    },
    onImportFileSelected(ev){
      var file = ev.target.files && ev.target.files[0]
      if (!file) return
      this.importPendingFile = file
      this.showImportChoice = true
    },
    cancelImport(){
      this.showImportChoice = false
      this.importPendingFile = null
      if (this.$refs.importFileInput) this.$refs.importFileInput.value = ''
    },
    doImport(replace, distributionOnly){
      var file = this.importPendingFile
      if (!file) {
        this.cancelImport()
        return
      }
      var self = this
      var reader = new FileReader()
      reader.onload = function(e){
        function normVal (v) { return v != null ? String(v).trim() : '' }
        function normId (v) { return typeof v === 'number' ? v : (parseInt(v, 10) || 0) }
        try {
          var data = new Uint8Array(e.target.result)
          var wb = XLSX.read(data, { type: 'array' })

          if (!distributionOnly && wb.SheetNames.indexOf('أيام') >= 0) {
            var daysSheet = XLSX.utils.sheet_to_json(wb.Sheets['أيام'], { header: 1 })
            if (daysSheet.length > 1) {
              var importedDays = daysSheet.slice(1).map(function(row){
                var id = row[0]
                var name = row[1] != null ? String(row[1]).trim() : ''
                if (name === '') return null
                return { id: typeof id === 'number' ? id : parseInt(id, 10) || 0, name: name }
              }).filter(Boolean)
              if (importedDays.length > 0) {
                if (replace) {
                  self.data.mainData.dayOfWeek = importedDays
                } else {
                  var existingNames = self.data.mainData.dayOfWeek.map(function(d){ return d.name })
                  importedDays.forEach(function(d){
                    if (existingNames.indexOf(d.name) < 0) {
                      self.data.mainData.dayOfWeek.push(d)
                      existingNames.push(d.name)
                    }
                  })
                }
                eventBus.$emit('syncDayOfWeekFromMainData')
              }
            }
          }

          if (!distributionOnly && wb.SheetNames.indexOf('فصول') >= 0) {
            var classesSheet = XLSX.utils.sheet_to_json(wb.Sheets['فصول'], { header: 1 })
            if (classesSheet.length > 1) {
              var importedClasses = classesSheet.slice(1).map(function(row){
                var name = normVal(row[1])
                if (!name) return null
                return {
                  id: normId(row[0]) || 1,
                  name: name,
                  subInDay: row[2] != null ? (typeof row[2] === 'number' ? row[2] : parseInt(row[2], 10) || 6) : 6
                }
              }).filter(Boolean)
              if (importedClasses.length > 0) {
                if (replace) {
                  self.data.mainData.classes = importedClasses
                } else {
                var maxId = Math.max(0, ...self.data.mainData.classes.map(function(c){ return normId(c.id) }))
                importedClasses.forEach(function(c){
                  var found = self.data.mainData.classes.find(function(x){ return normVal(x.name) === c.name })
                  if (!found) {
                    maxId++
                    self.data.mainData.classes.push({ id: maxId, name: c.name, subInDay: c.subInDay })
                  }
                })
              }
            }
          }
          }

          if (!distributionOnly && wb.SheetNames.indexOf('مواد') >= 0) {
            var subjectsSheet = XLSX.utils.sheet_to_json(wb.Sheets['مواد'], { header: 1 })
            if (subjectsSheet.length > 1) {
              var importedSubjects = subjectsSheet.slice(1).map(function(row){
                var name = normVal(row[1])
                if (!name) return null
                return { id: normId(row[0]) || 1, name: name }
              }).filter(Boolean)
              if (importedSubjects.length > 0) {
                if (replace) {
                  self.data.mainData.subjects = importedSubjects
                } else {
                  var maxSId = Math.max(0, ...self.data.mainData.subjects.map(function(s){ return normId(s.id) }))
                  importedSubjects.forEach(function(s){
                    var found = self.data.mainData.subjects.find(function(x){ return normVal(x.name) === s.name })
                    if (!found) {
                      maxSId++
                      self.data.mainData.subjects.push({ id: maxSId, name: s.name })
                    }
                  })
                }
              }
            }
          }

          if (!distributionOnly && wb.SheetNames.indexOf('معلمون') >= 0) {
            var teachersSheet = XLSX.utils.sheet_to_json(wb.Sheets['معلمون'], { header: 1 })
            if (teachersSheet.length > 1) {
              var importedTeachers = teachersSheet.slice(1).map(function(row){
                var name = normVal(row[1])
                if (name === '' && row[0] == null) return null
                return { id: normId(row[0]) || 1, name: name }
              }).filter(function(t){ return t !== null })
              if (importedTeachers.length > 0) {
                if (replace) {
                  self.data.mainData.teachers = importedTeachers
                } else {
                  var maxTId = Math.max(0, ...self.data.mainData.teachers.map(function(t){ return normId(t.id) }))
                  importedTeachers.forEach(function(t){
                    var found = self.data.mainData.teachers.find(function(x){ return normVal(x.name) === t.name })
                    if (!found) {
                      maxTId++
                      self.data.mainData.teachers.push({ id: maxTId, name: t.name })
                    }
                  })
                }
              }
            }
          }

          if (wb.SheetNames.indexOf('التوزيع') >= 0) {
            var configSheet = XLSX.utils.sheet_to_json(wb.Sheets['التوزيع'], { header: 1 })
            if (configSheet.length > 1) {
              var list = []
              for (var i = 1; i < configSheet.length; i++) {
                var row = configSheet[i]
                var className = normVal(row[0])
                var subjectName = normVal(row[1])
                var teacherName = normVal(row[2])
                var size = row[3]
                var retail = row[4]
                var dup = row[5]
                if (!className || !subjectName || size == null) continue
                var theClass = self.data.mainData.classes.find(function(c){ return normVal(c.name) === className })
                var subject = self.data.mainData.subjects.find(function(s){ return normVal(s.name) === subjectName })
                var teacher = self.data.mainData.teachers.find(function(t){
                  var tn = normVal(t.name)
                  if (teacherName === '') return tn === '' || tn === 'لا يوجد'
                  return tn === teacherName
                })
                if (!theClass || !subject || !teacher) continue
                list.push({
                  theClass: theClass,
                  teacher: teacher,
                  subject: subject,
                  size: typeof size === 'number' ? size : parseInt(size, 10) || 0,
                  duplication: dup === 'نعم' || dup === true || dup === 1,
                  retail: typeof retail === 'number' ? retail : (parseInt(retail, 10) || 0),
                  fixed: { status: false, location: null },
                  isExemptions: false
                })
              }
              if (replace) {
                // تحديث المصفوفة في المكان لضمان تفاعل App.vue مع التغيير
                self.data.userConfigBeforeChange.splice(0, self.data.userConfigBeforeChange.length, ...list)
              } else {
                list.forEach(function(item){ self.data.userConfigBeforeChange.push(item) })
              }
            }
          }

          eventBus.$emit('dataImported')
        } catch (err) {
          alert('خطأ في قراءة الملف: ' + (err.message || err))
        } finally {
          self.cancelImport()
        }
      }
      reader.readAsArrayBuffer(file)
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