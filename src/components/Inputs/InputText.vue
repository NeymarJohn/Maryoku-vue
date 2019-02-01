<template>  
<md-field :class='fieldStyle'>
      <label :class='labelStyle'>{{label}}<span class='required-logo' v-if='required'>*</span></label>
      <md-input v-model="initial"></md-input>
    </md-field>
</template>
<script>
    export default {
        name: "inputText",
        data: () => ({
            value: null,
            required: null,            
        }),
        model: {
        },
        props: {
            required:Boolean,
            value:String,
            type:String,
            label: String,
            title: String,
            placeholder: String,
            icon: String,
            disabled: Boolean,
            labelStyle:String,
            fieldStyle:String
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


