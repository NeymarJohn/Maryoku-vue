<template>
<div class='employee-body'>
<div class='form-main'>
<div class='form-block'>
<div>
<Title
        class='emp-title'
        title='Oh,wow so thats you'
        titleText='titleStyle'/>
</div>
        <InputText 
                labelStyle='label_input'
                label='Full Name'
                fieldStyle="field_input"
                required
        />
        <InputText
                labelStyle='label_input'
                label='Email Address'
                required
        />
        <InputText 
                labelStyle='label_input'
                label='Phone Number'
                required
        />
        <Select 
                labelStyle='label_input'
                label="Branch" 
                required
        />
        <Select 
                labelStyle='label_input'
                label="Department" 
                required
        />
        <InputText 
                labelStyle='label_input'
                label='Marital status'
        />
        <InputText 
                labelStyle='label_input'
                label='Number of children'
         />
</div>
<div class='button-block'>
        <ButtonDiv buttonStyle='buttonStyle' text='skip'/>
</div>
</div>
<div class='logo-main'>
<div>
<img class='emp-logo' src="static/img/secure_booker.png">
        <Title
                title='Join the Hive'
                titleBlock='titleBlock'
                titleText='titleStyle'
        />
</div>
</div>
</div>
</template>
<script>
import InputText from '@/components/Inputs/InputText.vue'
import Select from '@/components/Select/Select.vue'
import Title from '@/components/Title/Title.vue'
export default {
    name:'Employee',
    components:{
   InputText,
   Select,
   Title
},
logo: {
      type: String,
      default: "static/img/secure_booker.png"
    }
}
</script>
<style lang="scss">
.employee-body{
    display:flex;
    flex-direction:'column'      
}
.form-main {
        width:50%;
        height: 100vh; 
        background-color: white;
        display: flex;
        justify-content: center;
        align-items: center;     
}
.logo-main {
        width:50%;
        height: 100vh;  
        background:  #ff527c;
        display: flex;
        align-items: center;  
}
.form-block{
    width: 75%;
    display: flex;
    flex-direction: column;
}
.emp-logo{
        height: 100%;
        width: 100%;        
}
.emp-title{
        text-align: center;
        margin-bottom: 20px
}
.label_input{
        font-size: 20px !important;
        padding-left: 10px;
}
.titleStyle{
      font-size: 40px;
      font-weight: 700; 
}
.titleBlock{
       display:flex;
       justify-content: center; 
}
.buttonStyle{
        position: absolute;
        cursor: pointer;
        color: #67b5dd;
        font-size: 20px;
        margin-right: 20px;
        top: 100px;
        right: 0px;
}
.button-block{
      width:100%;
      display:flex;      
      justify-content: flex-end;
      position:relative;        
}
</style>