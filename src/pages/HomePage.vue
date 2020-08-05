<template>
  <div name="Home" class="">
    <div class="w-full flex justify-center items-center text-center">
        <div class="pt-20 w-3/4 flex flex-col items-center">
            <span class="text-6xl">مدرستي</span>
            <span class="mt-6">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic beatae, libero expedita aut quae sequi doloremque earum autem sapiente, neque quasi quidem id commodi, illum excepturi cumque quisquam aliquid fuga.</span>
            <span class="p-20 mt-6 bg-gray-500 hover:bg-gray-600 cursor-pointer rounded-full" style="width:max-content" @click="GoToUrl('add-main-data')"> Go </span>
        </div>  
    </div>
  </div>
</template>

<script>
import { eventBus } from '@/main'

export default {
    methods: {
        GoToUrl(url){
            eventBus.$emit('ChangeUrl',url)
        }
    },  
}
</script>