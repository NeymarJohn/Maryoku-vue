<template>  
    <md-field >
        <label :class='labelStyle'>{{label}}<span class='required-logo' v-if='required'>*</span></label>
        <md-select   :name="name"  @input="triggerFunc($event,name)">
            <md-option v-for='(value,index) in data' :key='index' :value="value">{{value}}</md-option>
        </md-select >   
    </md-field>        
</template>
<script>
    export default {
        name: "Select",
        
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
            for:String,
            name:String,
            onChange:Function
        },
        methods: {
            triggerFunc:function(value,name){
              this.onChange(value,name)      
          }
        }
    };
</script>
<style lang="scss">
.required-logo{
        color:red;
    }    
</style>












 