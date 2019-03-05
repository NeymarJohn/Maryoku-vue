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
            onClick:Function,
            filter:String
        },   
        methods:{
            triggerFunc:function(){
                if(this.filter){this.onClick(this.filter)}
                this.onClick()
            }
        }     
        
    };
</script>
<style lang="scss">
    
</style>
