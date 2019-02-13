<template>  
    <md-autocomplete v-model="selectedCountry" :id='id' :md-options="data" :class='autocompleteStyle'>
      <label :class='styleLabel'>{{label}} <span class='required-logo' v-if='required'>*</span></label>
      <span class='md-error'>{{isErrors?'Required':''}}</span>
    </md-autocomplete> 
</template>

<script>
  export default {
    name: 'Autocomplete',
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
         id:String
   },
   methods: {
          triggerFunc:function(value,name){
              console.log(this)                                       
              this.onChange(value,name)
          }
        } 
  }
</script>