<template>  
   <div :class='titleBlock'>
   <p :class="titleText">{{title}}<span :style='spanStyles'>{{spanText}}</span></p>
   </div>      
</template>
<script>
    export default {
        name: "Title",        
        model: {
        },
        props: {
            title:String,
            titleText:String,
            titleBlock:String,
            withSpan:Boolean,
            spanText:String,
            spanStyles:String
        },
        methods: {

        }
    };
</script>
<style lang="scss">    
</style>
