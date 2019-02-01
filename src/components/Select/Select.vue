<template>  
    <md-field>
        <label :class='labelStyle'>{{label}}<span class='required-logo' v-if='required'>*</span></label>
            <md-select :value='value'  :name="name" :id="id">
            <md-option v-for='(value,index) in data' key=index >{{value}}</md-option>
        </md-select >   
    </md-field>        
</template>
<script>
    export default {
        name: "Select",
        data: () => ({
            value: null,                       
        }),
        model: {
        },
        props: {
            required:Boolean,            
            type:String,
            label: String,
            title: String,
            placeholder: String,
            icon: String,
            disabled: Boolean,
            labelStyle: String,
            for:String
        },
        methods: {

        }
    };
</script>
<style lang="scss">
.required-logo{
        color:red;
    }    
</style>












 