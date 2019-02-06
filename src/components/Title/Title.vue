<template>  
   <div  :class='titleBlock' >
   <p :class="titleText">{{title}}<span :class='spanStyles'>{{spanText}}</span></p>
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
           onClick:function(event){
              console.log(this,event) 
             
           }
        }
    };
</script>
<style lang="scss">    
</style>
