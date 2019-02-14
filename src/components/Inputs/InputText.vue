<template>  
<md-field :class='fieldStyle'>
      <label :class='labelStyle'>{{label}}<span class='required-logo' v-if='required'>*</span></label>
      <md-input
        class='input-default'
        :type='type'
        :placeholder='placeholder'
        :value='value'
        @input='triggerFunc($event,name)'
        :name='name'        
       ></md-input> 
    <span class='md-error'>{{isErrors?'Required':''}}</span>
    </md-field>    
</template>
<script>
    export default {
        name: "inputText",        
        model: {
        }        
        ,
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
            fieldStyle:String,
            name:String,
            onChange:Function,
            isErrors: Boolean
        },
        methods: {
          triggerFunc:function(value,name){
              console.log(this)                                       
              this.onChange(value,name)
          }
        }           
        
    };
</script>
<style lang="scss">
    .input-default{
        font-size:20px!important
    }
    .required-logo{
        color:red;
    }
    .md-focused label{
        top:-20px
    }
    .display{
        display:none
    }    
</style>


