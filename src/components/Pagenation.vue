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