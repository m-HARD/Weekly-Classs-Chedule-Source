<template>
    <div name="pagenatio" class="flex justify-center">
        <div v-if="showPagenation" class="flex">
            <span class="o" :class="{'bg-yellow-500 border-yellow-500 text-white':pageNumber == 1,'bg-green-500 border-green-500 text-white':pageNumber > 1}">
                <span v-if="pageNumber == 1">أضافة المعلومات الأساسية</span>
                <span v-else>1</span>
            </span>
            <span class="s" :class="{'bg-green-500':pageNumber > 1}"></span>
            <span class="o" :class="{'bg-yellow-500 border-yellow-500 text-white':pageNumber == 2,'bg-green-500 border-green-500 text-white':pageNumber > 2}">
                <span v-if="pageNumber == 2">أدخال البيانات</span>
                <span v-else>2</span>
            </span>
            <span class="s" :class="{'bg-green-500':pageNumber > 2}"></span>
            <span class="o" :class="{'bg-yellow-500 border-yellow-500 text-white':pageNumber == 3,'bg-green-500 border-green-500 text-white':pageNumber > 3}">
                <span v-if="pageNumber == 3">أضافة المواد الثابتة</span>
                <span v-else>3</span>
            </span>
            <span class="s" :class="{'bg-green-500':pageNumber > 3}"></span>
            <span class="o" :class="{'bg-yellow-500 border-yellow-500 text-white':pageNumber == 4,'bg-green-500 border-green-500 text-white':pageNumber > 4}">
                <span v-if="pageNumber == 4">أضافة اعفاءات و ارتباطات المعلمين</span>
                <span v-else>4</span>
            </span>
            <span class="s" :class="{'bg-green-500':pageNumber > 4}"></span>
            <span class="o" :class="{'bg-yellow-500 border-yellow-500 text-white':pageNumber == 5,'bg-green-500 border-green-500 text-white':pageNumber > 5}">
                <span v-if="pageNumber == 5">التحقق من المدخلات</span>
                <span v-else>5</span>
            </span>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        currentPage:{
            type:String
        }
    },
    data() {
        return {
            pageNumber:0,
            showPagenation:true,

            unShowPages:[
                "home-page",
                "app-main-ui"
            ],
            pages:[
                "add-main-data",
                "app-user-config-ui",
                "fixed-subjects",
                "teacher-exemptions",
                "initial-table"
            ]
        }
    },
    created() {
        this.currentPageF()
    },
    methods: {
        currentPageF(){
            if (this.unShowPages.indexOf(this.currentPage) != -1) {
                this.showPagenation = false
            }else{
                this.showPagenation = true
            }

            this.pageNumber = this.pages.indexOf(this.currentPage) +1
        }
    },
    watch: {
        currentPage(){
            this.currentPageF()
        }
    },
}
</script>