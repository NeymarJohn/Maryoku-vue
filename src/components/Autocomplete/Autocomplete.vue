<template>
    <md-autocomplete @input="triggerFunc($event,name)" :value='value' :md-input-id='id' md-input-placeholder="" :md-options="data" :class='autocompleteStyle'>
      <label  :class='styleLabel'>{{label}} <span class='required-logo' v-if='required'>*</span></label>
      <span class='md-error'>{{isErrors?'Required':''}}</span>
    </md-autocomplete>
</template>

<script>
  export default {
    name: 'Autocomplete',
    data(){
      return{
        selectIndustry:null
      }
    },
   props:{
        label:String,
        data:Array,
        styleLabel:String,
        autocompleteStyle:String,
        required:Boolean,
        value:String,
        type:String,
        title: String,
        placeholder: String,
         icon: String,
        disabled: Boolean,
        labelStyle:String,
        fieldStyle:String,
        name:String,
        onChange:Function,
         isErrors: Boolean,
         id:String,
         name:String
   },
   methods: {
          triggerFunc:function($event,name){
              console.log($event,name)
              this.onChange($event,name)
          }
        }
  }
</script>
