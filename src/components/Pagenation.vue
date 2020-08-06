<template>
    <div name="pagenatio" class="flex justify-center">
        <div v-if="showPagenation" class="flex">
            <span class="o" :class="{'bg-yellow-500 border-yellow-500 text-white':pageNumber == 1,'bg-green-500 border-green-500 text-white':pageNumber > 1}">
                1
            </span>
            <span class="s" :class="{'bg-green-500':pageNumber > 1}"></span>
            <span class="o" :class="{'bg-yellow-500 border-yellow-500 text-white':pageNumber == 2,'bg-green-500 border-green-500 text-white':pageNumber > 2}">
                2
            </span>
            <span class="s" :class="{'bg-green-500':pageNumber > 2}"></span>
            <span class="o" :class="{'bg-yellow-500 border-yellow-500 text-white':pageNumber == 3,'bg-green-500 border-green-500 text-white':pageNumber > 3}">
                3
            </span>
            <span class="s" :class="{'bg-green-500':pageNumber > 3}"></span>
            <span class="o" :class="{'bg-yellow-500 border-yellow-500 text-white':pageNumber == 4,'bg-green-500 border-green-500 text-white':pageNumber > 4}">
                4
            </span>
            <span class="s" :class="{'bg-green-500':pageNumber > 4}"></span>
            <span class="o" :class="{'bg-yellow-500 border-yellow-500 text-white':pageNumber == 5,'bg-green-500 border-green-500 text-white':pageNumber > 5}">
                5
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
            showPagenation:true
        }
    },
    created() {
        this.currentPageF()
    },
    methods: {
        currentPageF(){
            let cpage = this.currentPage
            if (cpage == "home-page") {
                this.showPagenation = false
                return
            }else{
                this.showPagenation = true
            }

            if (cpage == "add-main-data") {
                this.pageNumber = 1
            }else if(cpage == "app-user-config-ui"){
                this.pageNumber = 2
            }else if(cpage == "fixed-subjects"){
                this.pageNumber = 3
            }else if(cpage == "teacher-exemptions"){
                this.pageNumber = 4
            }else if(cpage == "initial-table"){
                this.pageNumber = 5
            }
        }
    },
    watch: {
        currentPage(){
            this.currentPageF()
        }
        /*
        Vue.component('pagenation',Pagenation)
        Vue.component('home-page',HomePage)
        Vue.component('test',Test)
        Vue.component('app-main-ui',MainUI)
        Vue.component('add-main-data',AddMainData)
        Vue.component('app-user-config-ui',UserConfigUI)
        Vue.component('fixed-subjects',FixedSubjects)
        Vue.component('teacher-exemptions',TeacherExemptions)
        Vue.component('initial-table',InitialTable)
        Vue.component('app-view-some-data',viewSomeData)
        */
    },
}
</script>