<template>  
<div @click.prevent='triggerFunc' :class='buttonStyle'>{{text}}</div>
</template>
<script>
    export default {
        name: "Button",        
        model: {
        },
        props: {
            text:String,
            buttonStyle:String,
            onClick:Function
        },   
        methods:{
            triggerFunc:function(){
                this.onClick()
            }
        }     
        
    };
</script>
<style lang="scss">
    
</style>
