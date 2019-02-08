<template>  
<md-button :class='buttonStyle'>{{text}}</md-button>
</template>
<script>
    export default {
        name: "Button",        
        model: {
        },
        props: {
            text:String,
            buttonStyle:String
        },
        methods: {

        }
    };
</script>
<style lang="scss">
    .input-default{
        border: none;
        padding: 15px;
        width: 100%;
        border-bottom: 1px solid #e4e4e4
    }
    .required-logo{
        color:red;
    }
</style>

