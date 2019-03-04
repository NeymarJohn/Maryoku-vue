<template>  
<md-field :class='fieldStyle' :editebleMode='editebleMode'>
      <label v-if='!editebleMode' key='label-editable' :class='labelStyle'>{{label}}<span class='required-logo' v-if='required'>*</span></label>
      <label v-if='editebleMode' key='label-noeditable'  style="cursor: pointer !important;" @click='toggleEditableComponent'>{{label}}</label>
      <md-input
        class='input-default'
        :id='id'
        :type='type'
        :placeholder='placeholder'
        :value='value'
        @input='triggerFunc($event,name,count)'
        @change='changeFunc($event,name)'
        @:keyup.enter='autoSubmit($event,name)'
        :name='name'
        :disabled='disabled'></md-input>       
    <span v-if='!editebleMode' key='input-noeditable' class='md-error'>{{isErrors?'Required':''}}</span>
    <span v-if='editebleMode' class="md-suffix" key='input-editable' style="display: inline-block; white-space: nowrap;">
       <md-button @click.prevent="makeAction" v-show="isEditable" class="md-simple md-just-icon md-round md-sm md-success" style="padding: 0; margin: 0; text-align: right;"><md-icon>check</md-icon></md-button>
       <md-button @click.prevent="toggleEditableComponent" v-show="isEditable" class="md-simple md-just-icon md-round md-sm md-rose" style="padding: 0; margin: 0; text-align: right;"><md-icon>close</md-icon></md-button>
       <md-button v-show="!isEditable" class="inline-edit md-simple md-just-icon md-round fa fa-edit button-height" @click='toggleEditableComponent'>
       <md-icon>edit</md-icon>
       </md-button>
      </span>
    </md-field>    
</template>
<script>
    export default {
        name: "InputText",        
        model: {
        },
        data(){
            return{
                vm:{
                  searchPlace:''
                }
            }
        }        
        ,
        props: {
            required:Boolean,
            value:String,
            type:String,
            label: String,
            title: String,
            placeholder: {
                type:String,
                default:''
            },
            icon: String,
            disabled: Boolean,
            labelStyle:String,
            fieldStyle:String,
            name:String,
            onChange:Function,
            isErrors: Boolean,
            id:String,
            onChangeInput:Function,
            disabled:Boolean,
            count:Boolean,
            isEditable:Boolean,
            editebleMode:Boolean,
            actionFunc:Function,
            ctx:Object,
            googleSearch:Boolean
        },
        methods: {
          triggerFunc:function(value,name,count){
            console.log(this.id)                       
              if(this.onChange){
                 this.onChange(value,name,count) 
              }                                      
              
          },
          changeFunc:function(e,name){                                                                  
            this.onChange(e.target.value,name) 
          },
          autoSubmit:function($event,name){
              if(this.onBlur){
                 this.onBlur(value,name) 
              }
          },
          toggleEditableComponent(){
              this.isEditable=!this.isEditable
          },
          makeAction(){
             this.actionFunc(this.ctx,this.name)
        
        }           
        } 
    };

 </script>
<style lang="scss" scoped>
    .input-default{
        font-size: 18px !important;
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
     .md-disabled {
    cursor: pointer;
  }

  .md-field .inline-edit {
    visibility: hidden;
  }

  .md-field:hover {
    .inline-edit {
      visibility: visible;
    }
  }

  .md-input {    
    width: 80% !important;
    padding: 0 !important;
    margin-top: auto !important;
    margin-bottom: auto !important;
    cursor: pointer !important;
   
    
  }

  .md-select >.md-icon {
    display: none !important;
  }
  .md-field.without-border:after {
     height: 0px; 
}
.button-height{
      height: 20px;
}
.hidden-input{
  display: none;
}      
</style>



