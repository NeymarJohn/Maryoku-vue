<template>
<div class='company_body'>
<div class='company_form-main'>
<div class='company_form-block'>
<div>
<Title
        class='company_emp-title'
        title="Hey,it's your company"
        titleText='company_titleStyle'/>
</div>
        <InputText 
                labelStyle='company_label_input'
                label='Company Name'
                fieldStyle="field_input"
                :value='company_name'
                name='company_name'
                :onChange='onChange'
                :isErrors= 'errors'
                required
        />
        <InputText
                labelStyle='company_label_input'
                label='Upload Logo'
                name='upload_logo'
                type='file'                
        />
        <InputText 
                labelStyle='company_label_input'
                label='Main office Address'
                :value='main_office_adddress'
                required
                name='main_office_adddress'
                :onChange='onChange'
                :isErrors='errors'
        />
        <InputText 
                labelStyle='company_label_input'
                label='Number of Employees'
                name='number_of_employee'
                :value='number_of_employee'
                :onChange='onChange'
                
        />        
        <InputText 
                labelStyle='company_label_input'
                label='Industry'
                name='industry'
                :value='industry'
                :onChange='onChange'
                
        />
        <InputText 
                labelStyle='company_label_input'
                label='Website'
                name='website'
                :value='website'
                :onChange='onChange'
         />
         <InputText 
                labelStyle='company_label_input'
                label='Address'
                name='address'
                :value='address'
                :onChange='onChange'
         />
</div>
<div class='company_button-block' >
        <ButtonDiv buttonStyle='company_buttonStyle' text='next' :onClick='submitForm'/>
</div>
</div>
<div class='company_logo-main'>
<div>
<img class='company_emp-logo' src="static/img/culture_builder.png">
        <Title
                title='Discover the power of community'
                titleBlock='company_titleBlock'
                titleText='company_titleStyle'
        />
        <Title  
                titleText='company_titleTextLogo'        
                titleBlock='company_titleBlock'
                title='Leverage a Network of professional office managers collaborating on ideas, vendors and market trens'
         />
</div>
</div>
</div>
</template>
<script>
import InputText from '@/components/Inputs/InputText.vue'
import Select from '@/components/Select/Select.vue'
import Title from '@/components/Title/Title.vue'
import ButtonDiv from '@/components/Button/ButtonDiv.vue'

export default {
    name:'Employee',
    components:{
   InputText,
   Select,
   Title,
   ButtonDiv
},
data(){
        return{
                company_name:'',
                upload_logo:null,
                main_office_adddress:'',
                number_of_employee:null,
                industry:'',
                website:'',
                address:'',
                errors:false
        }
}
,
 methods: {
         submitForm:function(){                                    
            this.validFunc(this)                         
            if(this.errors==false){                    
                this.$router.push('/invite')     
            }
              
         },
         onChange:function(value, name){                
                 this[name]=value                    
         },
         validFunc:function(ctx,required){
                
                 const errorsObj=[]
            if(ctx['company_name']===''){
                errorsObj.push('company_name')
            }
            if(ctx['main_office_adddress']===''){
                errorsObj.push('main_office_adddress')
            }             
            if(errorsObj.length!==0){                    
              ctx.errors=true
            }else{                    
                 ctx.errors=false   
            }
         }
         
 },
}
</script>
<style lang="scss">
.company_body{
    display:flex;
    flex-direction:'column'      
}
.company_form-main {
        width:50%;
        height: 100vh; 
        background-color: white;
        display: flex;
        justify-content: center;
        align-items: center; 
        flex-direction: column;
}
.company_logo-main {
        width:50%;
        height: 100vh;  
        background:  #ff527c;
        display: flex;
        align-items: center;  
}
.company_form-block{
    width: 75%;
    display: flex;
    flex-direction: column;
}
.company_emp-logo{
        height: 100%;
        width: 100%;        
}
.company_emp-title{
        text-align: center;
        margin-bottom: 20px
}
.company_label_input{
        font-size: 20px !important;
        padding-left: 10px;
}
.company_titleStyle{
      font-size: 40px;
      font-weight: 700; 
}
.company_titleBlock{
       display:flex;
       justify-content: center; 
}
.company_titleTextLogo{
    text-align: center;
    width: 70%;
    color: white;
    font-size: 26px;
    margin-top: 20px;
}
.company_buttonStyle{
        position: absolute;
        cursor: pointer;
        color: #ff527c;
        font-size: 20px;
        margin-right: 20px;
        top: 100px;
        right: 0px;
}
.company_button-block{
      width:100%;
      display:flex;      
      justify-content: flex-end;
      position:relative;        
}
</style>