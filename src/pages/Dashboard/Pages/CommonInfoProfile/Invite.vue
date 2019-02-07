<template>
<div class='invite_body'>
<div class='invite_form-main'>
<div class='invite_form-block'>
<div>
<Title
        class='invite_emp-title'
        title="Time to say hello"
        titleText='invite_titleStyle'/>
        
</div>
        <InputWithIcon 
                labelStyle='invite_label_input'
                placeholder='Invite by email address'
                type='email'
                imgStyle="invite_input-img"
                srcLogo="static/img/envelopment.png" 
                inputStyle="invite_input"  
                inputBlock='invite_input-block'
                name="employee_email"
                :onChange='onChange'          
        />        
        <Title
                title="Or upload employees' emails from csv file."
                titleBlock='invite_titleBlock'
                titleText='invite_title-span'                
                withSpan
                spanText='Browse file'
                spanStyles='invite_event-title'                 
        /> 
</div>
<div class='invite_button-block'>
        <ButtonDiv buttonStyle='invite_buttonStyle' text='skip' :onClick='onSkip'/>
</div>
</div>
<div class='invite_logo-main'>
<div>
        <img class='invite_emp-logo' src="static/img/propasal_manager.png">
        <Title
                title='Come on, introduce us'
                titleBlock='invite_titleBlock'
                titleText='invite_titleStyle'
        />
        <Title  
                titleText='invite_titleTextLogo'        
                titleBlock='invite_titleBlock'
                title='Enchance the experience for your employees using variouns Participants Tools such as RSVP, Feedback, Group Segregation, After party options and so much more'
         />
</div>
</div>
</div>
</template>
<script>
import InputWithIcon from '@/components/Inputs/InputWithIcon.vue'
import Select from '@/components/Select/Select.vue'
import Title from '@/components/Title/Title.vue'
import ButtonDiv from '@/components/Button/ButtonDiv.vue'

export default {
    name:'Employee',
    props:{
       officeManager:String     
    },
    components:{
   InputWithIcon,
   Select,
   Title,
   ButtonDiv
},
data(){
        return{
               employee_email:'',
               isErrors:false               
        }
}
,
 methods: {
         onSkip:function(){                        
            this.$router.push('/officeManager-form')          
         }
         ,
         onChange:function(value, name){                 
                 this[name]=value
                 
         }
 },
    
}
</script>
<style lang="scss">
.invite_body{
    display:flex;
    flex-direction:'column'      
}
.invite_form-main {
        width:50%;
        height: 100vh; 
        background-color: white;
        display: flex;
        justify-content: center;
          
}
.invite_logo-main {
        width:50%;
        height: 100vh;  
        background:  #23d0a1;
        display: flex;
        align-items: center;  
}
.invite_form-block{
    width: 75%;
    display: flex;
    flex-direction: column;
    margin-top: 60px
}
.invite_emp-logo{
        height: 100%;
        width: 100%;        
}
.invite_emp-title{
        text-align: center;
        margin-bottom: 20px
}
.invite_label_input{
        font-size: 20px !important;
        padding-left: 10px;
}
.invite_titleStyle{
      font-size: 40px;
      font-weight: 700; 
}
.invite_titleBlock{
       display:flex;
       justify-content: center; 
}
.invite_title-span{
    color: #b6b6b6;
    font-size: 22px;
    margin-top: 20px;
}
.invite_buttonStyle{        
        cursor: pointer;
        color: #23d0a1;
        font-size: 20px;
        margin-right: 20px;
        
}
.invite_button-block{      
      display:flex;      
      justify-content: flex-end;
      align-items: flex-end; 
      margin-bottom: 45px;           
}
.invite_event-title{
        color:#23d0a1
}
.invite_titleTextLogo{
    text-align: center;
    width: 70%;
    color: white;
    font-size: 26px;
    margin-top: 20px;
}
.invite_input-img{
        width: 36px;
}
.invite_input{
    border: none;
    width: 75%;
    font-size: 20px;
    color: #b6b6b6;
}
.invite_input-block{
    border: 1.5px solid #b6b6b6;
    padding: 10px;
}
</style>