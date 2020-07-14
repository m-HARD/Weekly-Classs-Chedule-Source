<template>
    <div name="select" class="fixed inset-0" >
        <div class="w-full h-full bg-gray-800 bg-opacity-50 relative flex justify-center items-center">
            <span class="absolute top-0 right-0 m-16 text-5xl font-bold cursor-pointer" @click="$emit('end')">X</span>
            <div class="w-1/2 font-semibold overflow-y-auto" style="max-height: 60vh;">
                <div v-for="(item,i) in data.optionsShow" :key="i">
                    <div class="w-full py-3 px-6 rounded cursor-pointer bg-gray-200 hover:bg-gray-300"
                        @click="SpecialFixedTable(i)">
                        {{ item }}
                    </div>
                    <hr class="border border-gray-400">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"Select",
    props:{
        data:{
            type:Object,
            required:true
        },
        type:{
            type:String,
            default:"normal"
        }
    },
    methods: {
        chengeValue(){
            if(this.type == "fixedSub"){
                this.SpecialFixedTable();
                return
            }
        },
        SpecialFixedTable(id){
            let theOption = this.data.options[id]
            let itemAdd = Object.assign({}, theOption)

            if (theOption.size > 1) {
                theOption.size -=1
            }else{
                let index = this.data.target.indexOf(theOption)
                if (index != -1) {
                    this.data.target.splice(index,1)
                }
            }
            
            itemAdd.size = 1
            itemAdd.fixed={"status":true,"location":{"day":this.data.from.day,"sub":this.data.from.sub}}
            this.data.target.push(itemAdd)
            this.$emit('end')
        }
    },
}
</script>