<template>  
    <md-field>
        <label :class='labelStyle'>{{label}}<span class='required-logo' v-if='required'>*</span></label>
        <md-select   :name="name" :id="id" @change='triggerFunc(seleced)'>
            <md-option v-for='(value,index) in data' key=value value>{{value}}</md-option>
        </md-select >   
    </md-field>        
</template>
<script>
    export default {
        name: "Select",
        // data: () => ({
        //     value: null,                       
        // }),
        model: {
        },
        props: {
            data:Array,
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
            triggerFunc:function(value,name){
              console.log(value,name)                                       
            //   this.onChange(value,name)
          }
        }
    };
</script>
<style lang="scss">
.required-logo{
        color:red;
    }    
</style>












 