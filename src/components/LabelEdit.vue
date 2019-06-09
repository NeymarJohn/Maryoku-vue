<template>
  <div class="vlabeledit">
    <div class="vlabeledit-label" :class="{'vlabeledit-empty' : this.vlabel === empty}" @click="onLabelClick" v-if="!edit">{{vlabel}} <md-icon class="pull-right text-gray small md-sm vlabeledit-label-icon">edit</md-icon></div>
    <input type="text" v-if="edit && !mask" v-model="label" v-on:blur="updateTextBlur" ref="labeledit" :placeholder="vplaceholder" class="vlabeledit-input" @keyup.enter="updateTextEnter"/>
    <input-mask type="text" v-if="edit && mask" :mask="mask" maskChar="_" v-model="label" v-on:blur="updateTextBlur" ref="labeledit" :placeholder="vplaceholder" class="vlabeledit-input" @keyup.enter="updateTextEnter"/>
  </div>
</template>
<script>
  import InputMask from 'vue-input-mask';
  export default{
    name: 'LabelEdit',
    components: {
      InputMask
    },
    data: function(){
      return {
        edit: false, // define whether it is in edit mode or not
        label: '', // v-bind data model for input text
        empty: 'Click to set', // empty place holder .. replace with your own localization for default
      }
    },
    props: ['text','placeholder', 'required', 'fieldName', 'mask'], // parent should provide :text or :placeholder
    methods: {
      initText: function(){
        if(this.text==''||this.text==undefined){
          this.label = this.vlabel
        }else{
          this.label = this.text
        }
      },
      // when the div label got clicked and trigger the text box
      onLabelClick: function(){
        this.edit = true;
        this.label = this.text;
        setTimeout(()=>{
          this.$refs.labeledit.select();
        },100);
      },
      // trigger when textbox got lost focus
      updateTextBlur: function(){
        // update the edit mode to false .. display div label text
        this.edit = false;
        if (this.label === this.text) {
          this.$emit('no-change',this.text, this.fieldName);
          return;
        }
        // emit text updated callback
        if (this.required && this.label === ''){
          this.label = this.text;
          this.$emit('no-change',this.text, this.fieldName);
        } else {
          this.$emit('text-updated-blur',this.label, this.fieldName);
        }
      },
      updateTextEnter: function(){
        this.edit = false;
        if (this.label === this.text) {
          this.$emit('no-change',this.text, this.fieldName);
          return;
        }
        if (this.required && this.label === ''){
          this.label = this.text;
          this.$emit('no-change',this.text, this.fieldName);
        } else {
          this.$emit('text-updated-enter',this.label, this.fieldName);
        }
      }
    },
    computed: {
      vplaceholder: function(){
        // check if the placeholder is undefined or empty
        if(this.placeholder==undefined || this.placeholder==''){
          // if it is empty or undefined, pre-populate with built-in place holder text
          return this.empty
        }else{
          return this.placeholder
        }
      },
      vlabel: function(){
        // after text has been updated
        // return text value or place holder value depends on value of the text
        if(this.text==undefined||this.text==''){
          return this.vplaceholder
        }else{
          return this.label
        }
      }
    },
    mounted: function(){
      // initiate the label view
      this.initText();
    },
    updated: function(){
      var ed = this.$refs.labeledit;
      if(ed!=null){
        ed.focus();
      }
    },
    watch: {
      text: function(newVal, oldValue){
        console.log(`'text' changed from ${oldValue} to ${newVal}`);
        if(newVal==''||newVal==undefined){
          this.label = this.vplaceholder
        }
        this.initText();
      }
    }
  }
</script>
<style>
  .vlabeledit-empty {
    color: #ccc !important;
  }
  .vlabeledit-label-icon{
    font-size: 16px !important;
  }
</style>
