<template>  
    <md-field >
        <label :class='labelStyle'>{{label}}<span class='required-logo' v-if='required'>*</span></label>
        <md-select v-if='typeof list[0]==="object"'  :name="name"  @input="triggerFunc($event,name)">
            <md-option v-for='item of list' :key='item[valueName[0]]' :value="item[valueName[1]]">{{`${trim?'':item[valueName[0]]} ${withSpan?item[valueName[1]]:''}`}}</md-option>             
        </md-select > 
        <md-select v-else  :name="name"  @input="triggerFunc($event,name)">
            <md-option v-for='(item,index) of list' :key='index' :value="item">{{item}}</md-option>             
        </md-select > 
         <span class='md-error'>{{isErrors?'Required':''}}</span>  
    </md-field>        
</template>
<script>
    export default {
        name: "Select",
        
        model: {
        },        
        props: {
            list:Array,
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
            onChange:Function,
            valueName:Array,
             isErrors: Boolean,
             withSpan:Boolean,
             trim:Boolean
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












 