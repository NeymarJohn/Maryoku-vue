<template>  
<md-field>
      <label>Initial Value</label>
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
            required:String,
            value:String,
            type:String,
            label: String,
            title: String,
            placeholder: String,
            icon: String,
            disabled: Boolean
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
</style>


