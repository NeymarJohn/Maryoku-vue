<template>  
    <md-field class="without-border">
      <div style="width:100%;display:flex;align-items:center;justify-content: space-between;">
        <p>
          <md-icon>
            {{icon}}
          </md-icon>
          {{value}}
        </p>
        <v-popover
          offset="16"
          hideOnTargetClick
          placement='right'>
          <md-button class="tooltip-target b3 inline-edit md-simple md-just-icon md-round fa fa-edit button-height">
            <md-icon>edit</md-icon>
          </md-button>

          <template slot="popover">
            <label v-if="label">{{label}}</label>
            <md-input 
              class="tooltip-content"
              :id='id'
              :type='type'
              :placeholder='placeholder'
              :value='value'
              @input='triggerFunc($event,name,count)'
              @change='changeFunc($event,name)'
              @:keyup.enter='autoSubmit($event,name)'
              :name='name'/>
            
            <div class="action-block">
              <a v-close-popover>Close</a>
              <md-button class="md-simple md-sm md-success"  @click.prevent="makeAction">
                Save
              </md-button>
            </div>
          </template>
        </v-popover>
      </div>
    </md-field>    
</template>
<script>
    export default {
        name: "PopoverInput",        
        model: {
        },
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
            name:String,
            onChange:Function,
            isErrors: Boolean,
            id:String,
            onChangeInput:Function,
            count:Boolean,
            actionFunc:Function,
            ctx:Object,
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
          makeAction(){
             console.log('@@')
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



