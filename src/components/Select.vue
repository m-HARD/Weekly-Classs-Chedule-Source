<template>
    <div name="select" class="fixed inset-0" >
        <div class="w-full h-full bg-gray-800 bg-opacity-50 relative flex justify-center items-center">
            <span class="absolute top-0 right-0 m-16 text-5xl font-bold cursor-pointer" @click="$emit('end')">X</span>
            <div class="w-1/2 font-semibold overflow-y-auto" style="max-height: 60vh;">
                <div>
                    <div class="w-full py-3 px-6 rounded cursor-pointer bg-gray-200 hover:bg-gray-300"
                        @click="SpecialFixedTable(null)">
                        فراغ
                    </div>
                    <hr class="border border-gray-400">
                </div>
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
            let isExist = this.data.target.filter(data => {
                if (data.fixed.location != null) {
                    console.log('Hi : ' , data.fixed.location.day , this.data.from.day , data.fixed.location.sub , this.data.from.sub);
                    return data.theClass.id == this.data.from.theClass && data.fixed.location.day == this.data.from.day && data.fixed.location.sub == this.data.from.sub
                }
            })

            console.log('Ex : ',isExist);
            if (isExist.length == 1) {
                console.log('I Found It');

                let theParent = this.data.options.filter(data => {
                    return data.subject.id == isExist[0].subject.id && data.teacher.id == isExist[0].teacher.id
                })
                let index = this.data.target.indexOf(isExist[0])

                if (id != null) {
                    if (theParent.length == 1) {
                        theParent[0].size += 1
                    }else{
                        isExist[0].fixed ={"status":false,"location":null}
                        this.data.target.push(isExist[0])
                    }
                }
                
                this.data.target.splice(index,1)
            }
            
            if (id == null && isExist.length == 1) {
                console.log("Delete Successfully");
                console.log("#1");
            }else if (id == null) {
                console.log("#2");
                let itemAdd = Object.assign({}, this.data.options[0])
                if (typeof itemAdd != 'undefined') {
                    itemAdd.subject = {"id":0,"name":"فراغ"}
                    itemAdd.teacher = {"id":0,"name":""}
                    itemAdd.size = 1
                    itemAdd.duplication = true
                    itemAdd.retail = 0
                    itemAdd.fixed={"status":true,"location":{"day":this.data.from.day,"sub":this.data.from.sub}}
                    this.data.target.push(itemAdd)
                }
            }else{
                console.log('#3');
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
            }

            this.$emit('end')
        }
    },
}
</script>