<template>  
<div :class='inputBlock'>
<img :class="imgStyle" :src='srcLogo'>
<input :value='value' :type='type' @click='actionClick' :placeholder='placeholder' :class='inputStyle'/>
</div>
</template>
<script>
    export default {
        name: "InputWithIcon",
        data: () => ({
            value: null,
            required: null,            
        }),
        model: {
        },
        props: {
            srcLogo:String,
            value:String,
            type:String,
            actionClick: String,
            inputBlock: String,
            placeholder: String,
            inputStyle: String,
            disabled: Boolean,
            imgStyle: String,
            inputStyle: String
            
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


