<template>
<div v-if="role==='OM'">
<div class='employee-body'>
<div class='event_form-main'>
<div class='event_form-block'>
<div>
<Title
        class='event_emp-title'
        title="We're ready here..."
        titleText='event_titleStyle'/>
        
</div>
        <InputText 
                labelStyle='event_label_input'
                label='Your bithday'
                fieldStyle="field_input"                
        />
        <InputText
                labelStyle='event_label_input'
                label='When did you join the company'                
        /> 
        <Select
         label='Which holidays do u celebrate?'
         labelStyle='event_label_input'
         :data='data'
         />
        <Title
                title='The more we know about important dates, the more we can celebrate you.'
                titleBlock='event_titleBlock'
                titleText='event_title-span'                
                withSpan
                spanText='Add dates'
                spanStyles='event-title'                 
        /> 
</div>
<div class='event_button-block' @click='onSkip'>
        <ButtonDiv buttonStyle='event_buttonStyle' text='skip'/>
</div>
</div>
<div class='event_logo-main'>
<div>
        <img class='event_emp-logo' src="static/img/orical_power.png">
        <Title
                title='Save time by automating'
                titleBlock='event_titleBlock'
                titleText='event_titleStyle'
        />
        <Title  
                titleText='titleTextLogo'        
                titleBlock='event_titleBlock'
                title='Automate individual congratulation cards to help you give that personal touch your employees crave, without the usual efford that comes with it'
         />
</div>
</div>
</div>
</div>
<div v-else>
<div class='employee-body'>
<div class='event_form-main'>
<div class='event_form-block'>
<div>
<Title
        class='event_emp-title'
        title="We're ready here..."
        titleText='event_titleStyle'/>
</div>
        <InputText 
                labelStyle='event_label_input'
                label='Your bithday'
                fieldStyle="field_input"
                
        />
        <InputText
                labelStyle='event_label_input'
                label='When did you join the company'                
        />
        <Select
         label='Which holidays do u celebrate?'
          labelStyle='event_label_input'
          :data='data'
          /> 
        <Title
                title='The more we know about important dates, the more we can celebrate you.'
                titleBlock='event_titleBlock'
                titleText='event_title-span'
                withSpan
                spanText='Add dates'
                spanStyles='event-title'                              
        />       
</div>
<div class='event_button-block' @click='onSkip'>
        <ButtonDiv buttonStyle='event_buttonStyle' text='skip'/>
</div>
</div>
<div class='event_logo-main'>
<div>
<img class='event_emp-logo' src="static/img/orical_power.png">
        <Title
                title='Just give us a reason to selebrate'
                titleBlock='event_titleBlock'
                titleText='event_titleStyle'
        />
</div>
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
    props:{
       officeManager:String     
    },
    components:{
   InputText,
   Select,
   Title,
   ButtonDiv
        },
        data(){
                return {
                        role: null,
                        data:["Christian holidays", "Jewish holidays", "Muslim holidays", "Hindu holidays"]
                }
        }
        ,
                mounted:function(){
                const onboardingPath = this.$store.getters['user/getUser'].onboardingPath                
                this.role=onboardingPath  
        },
        methods: {
                onSkip:function(){
                    this.$router.push('/dietary')     
                }
        },
    
}
</script>
<style lang="scss">
.employee-body{
    display:flex;
    flex-direction:'column'      
}
.event_form-main {
        width:50%;
        height: 100vh; 
        background-color: white;
        display: flex;
        justify-content: center;
          
}
.event_logo-main {
        width:50%;
        height: 100vh;  
        background:  #23d0a1;
        display: flex;
        align-items: center;  
}
.event_form-block{
    width: 75%;
    display: flex;
    flex-direction: column;
    margin-top: 60px
}
.event_emp-logo{
        height: 100%;
        width: 100%;        
}
.event_emp-title{
        text-align: center;
        margin-bottom: 20px
}
.event_label_input{
        font-size: 20px !important;
        padding-left: 10px;
}
.event_titleStyle{
      font-size: 40px;
      font-weight: 700; 
}
.event_titleBlock{
       display:flex;
       justify-content: center; 
}
.event_title-span{
    color: #b6b6b6;
    font-size: 22px;
    margin-top: 20px;
}
.event_buttonStyle{        
        cursor: pointer;
        color: #23d0a1;
        font-size: 20px;
        margin-right: 20px;
        
}
.event_button-block{      
      display:flex;      
      justify-content: flex-end;
      align-items: flex-end; 
      margin-bottom: 45px;           
}
.event_event-title{
        color:red
}
.titleTextLogo{
    text-align: center;
    width: 70%;
    color: white;
    font-size: 26px;
    margin-top: 20px;
}
</style>