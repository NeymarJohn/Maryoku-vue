<template>
<div v-if="role==='OM'">
<div class='dietery_employee-body'>
<div class='dietary_form-main'>
<div class='dietary_form-block'>
<div>
        <Title
                class='emp-title'
                title="It's time to come clean"
                titleText='titleStyle'
        />
        <Title        
            title="Mark you dietary constrints, so that we'll know to order for you"
            titleBlock='event_titleBlock'
            titleText='event_title-span'
        />
</div>
       <div class='dietary-check-block'>
       <Icon
            iconSourceOne="static/img/lock.jpg"
            iconSourceTwo="static/img/login.jpg"
            imageStyle='dietary-icon_logo'
            title='cluten free' 
            titleStyle='dietary_icon-title'
            :onClick='onSelect'
            name='cluten'

       />
       <Icon
            iconSourceOne="static/img/lock.jpg"
            iconSourceTwo="static/img/login.jpg"
            imageStyle='dietary-icon_logo'
            title='lactuz free'
            titleStyle='dietary_icon-title'
            :onClick='onSelect'
            name='lactuz' 
       />
       <Icon
            iconSourceOne="static/img/lock.jpg"
            iconSourceTwo="static/img/login.jpg"
            imageStyle='dietary-icon_logo'
            title='gmo free'
            titleStyle='dietary_icon-title'
            :onClick='onSelect'
            name='gmo'
       />
       <Icon
            iconSourceOne="static/img/lock.jpg"
            iconSourceTwo="static/img/login.jpg"
            imageStyle='dietary-icon_logo'
            title='egg free'
            titleStyle='dietary_icon-title'
            :onClick='onSelect'
            name='egg'
       />
       </div> 
        <div class='dietary-check-block'>
       <Icon
            iconSourceOne="static/img/lock.jpg"
            iconSourceTwo="static/img/login.jpg"
            imageStyle='dietary-icon_logo' 
            title='sugar free'
            titleStyle='dietary_icon-title'
            :onClick='onSelect'
            name='sugar'      
       />
       <Icon
            iconSourceOne="static/img/lock.jpg"
            iconSourceTwo="static/img/login.jpg"
            imageStyle='dietary-icon_logo'
            title='peanut free'
            titleStyle='dietary_icon-title'
            :onClick='onSelect'
            name='peanut'
       />
       <Icon
            iconSourceOne="static/img/lock.jpg"
            iconSourceTwo="static/img/login.jpg"
            imageStyle='dietary-icon_logo'
            title='kosher'
            titleStyle='dietary_icon-title'
            :onClick='onSelect'
            name='kosher'
       />
       <Icon
            iconSourceOne="static/img/lock.jpg"
            iconSourceTwo="static/img/login.jpg"
            imageStyle='dietary-icon_logo'
            title='organic'
            titleStyle='dietary_icon-title'
            :onClick='onSelect'
            name='organic'
       />
       </div> 
       <div class='dietary-check-block'>
       <Icon
            iconSourceOne="static/img/lock.jpg"
            iconSourceTwo="static/img/login.jpg"
            imageStyle='dietary-icon_logo'
            title='ecofood'
            titleStyle='dietary_icon-title'
            :onClick='onSelect'
            name='ecofood'
       />
       <div class='dietary_other-options'>
       <InputText 
                labelStyle='label_input'
                label='Other'
                fieldStyle="field_input"
                :value='another_food'
                name='another_food'
                :onChange='onChange'                
        />
         </div>
       </div>        
</div>
<div class='button-block'>
        <ButtonDiv buttonStyle='dietary_buttonStyle' text='skip' :onClick='onSkip'/>
</div>
</div>
<div class='dietary_logo-main'>
<div>
        <img class='emp-logo' src="static/img/syncer.png">
        <Title
                title='All Employees Preferences in one place'
                titleBlock='titleBlock'
                titleText='titleStyle'
        />
        <Title  
                titleText='titleTextLogo'        
                titleBlock='titleBlock'
                title="Keeping track on everyone's dietory preferences can be a hassle, when each employee manages their personal preferences, all you have to do is lay back and enjoy"
         />
</div>
</div>
</div>
</div>
<div v-else>
<div class='dietery_employee-body'>
<div class='dietary_form-main'>
<div class='dietary_form-block'>
<div>
         <Title
        class='emp-title'
        title="It's time to come clean"
        titleText='titleStyle'/>
        <Title        
        title="Mark you dietary constrints, so that we'll know to order for you"
        titleBlock='event_titleBlock'
        titleText='dietary_title-span'/>
</div>
<div >
        <div class='dietary-check-block'>
       <Icon
            iconSourceOne="static/img/lock.jpg"
            iconSourceTwo="static/img/login.jpg"
            imageStyle='dietary-icon_logo'
            title='cluten free' 
            titleStyle='dietary_icon-title'
            :onClick='onSelect'
            name='cluten'

       />
       <Icon
            iconSourceOne="static/img/lock.jpg"
            iconSourceTwo="static/img/login.jpg"
            imageStyle='dietary-icon_logo'
            title='lactuz free'
            titleStyle='dietary_icon-title'
            :onClick='onSelect'
            name='lactuz'
       />
       <Icon
            iconSourceOne="static/img/lock.jpg"
            iconSourceTwo="static/img/login.jpg"
            imageStyle='dietary-icon_logo'
            title='gmo free'
            titleStyle='dietary_icon-title'
            :onClick='onSelect'
            name='gmo'
       />
       <Icon
            iconSourceOne="static/img/lock.jpg"
            iconSourceTwo="static/img/login.jpg"
            imageStyle='dietary-icon_logo'
            title='egg free'
            titleStyle='dietary_icon-title'
            :onClick='onSelect'
            name='egg'
       />
       </div> 
        <div class='dietary-check-block'>
        <Icon
            iconSourceOne="static/img/lock.jpg"
            iconSourceTwo="static/img/login.jpg"
            imageStyle='dietary-icon_logo'
            title='sugar free'
            titleStyle='dietary_icon-title'
            :onClick='onSelect'
            name='sugar'       
       />
       <Icon
            iconSourceOne="static/img/lock.jpg"
            iconSourceTwo="static/img/login.jpg"
            imageStyle='dietary-icon_logo'
            title='peanut free'
            titleStyle='dietary_icon-title'
            :onClick='onSelect'
            name='peanut'
       />
       <Icon
            iconSourceOne="static/img/lock.jpg"
            iconSourceTwo="static/img/login.jpg"
            imageStyle='dietary-icon_logo'
            title='kosher'
            titleStyle='dietary_icon-title'
            :onClick='onSelect'
            name='kosher'
       />
       <Icon
            iconSourceOne="static/img/lock.jpg"
            iconSourceTwo="static/img/login.jpg"
            imageStyle='dietary-icon_logo'
            title='organic'
            titleStyle='dietary_icon-title'
            :onClick='onSelect'
            name='organic'
       />
       </div> 
       <div  class='dietary-check-block'>
       <Icon
            iconSourceOne="static/img/lock.jpg"
            iconSourceTwo="static/img/login.jpg"
            imageStyle='dietary-icon_logo'
            title='ecofood'
            titleStyle='dietary_icon-title'
            :onClick='onSelect'
            name='ecofood'
       />
       <div class='dietary_other-options'>
       <InputText 
                labelStyle='label_input'
                label='Other'
                fieldStyle="field_input"
                :value='another_food'
                name='another_food'
                :onChange='onChange'                
        />
        </div>
       </div> 
  </div>             
</div>
<div class='button-block' >
        <ButtonDiv buttonStyle='dietary_buttonStyle' text='skip' :onClick='onSkip'/>
</div>
</div>
<div class='dietary_logo-main'>
<div>
<img class='emp-logo' src="static/img/syncer.png">
        <Title
                title='You gutta eat, right?'
                titleBlock='titleBlock'
                titleText='titleStyle'
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
import Icon from '@/components/Icon/Icon.vue'

export default {
    name:'Employee',
    props:{
       officeManager:String     
    },
    components:{
   InputText,
   Select,
   Title,
   ButtonDiv,
   Icon
},
     data(){
                return {
                        role: null,
                        dietary:[],
                        another_food:''
                }
        }
        ,
        mounted:function(){
                const onboardingPath= this.$store.getters['user/getUser'].onboardingPath                
                this.role=onboardingPath                  
        },
        methods: {
                onSkip:function(){
                        const data={}
                        data['dietary']= this.dietary 
                        data['another_food']=this.another_food                
                        this.$store.dispatch("user/sendCompanyInfo",data) 
                        this.$router.push('/company')     
                },
                onSelect:function(food){
                        if(!this.dietary.includes(food)){
                              this.dietary.push(food)  
                        }else{
                             this.dietary=this.dietary.filter(item=>item!==food)

                        }
                        
                },
                onChange:function(value, name){                                   
                 this[name]=value                    
         },
        }
    
}
</script>
<style lang="scss">
.dietery_employee-body{
    display:flex;
    flex-direction:'column'      
}
.dietary_form-main {
        width:50%;
        height: 100vh; 
        background-color: white;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;     
}
.dietary_logo-main {
        width:50%;
        height: 100vh;  
        background:  #67b5dd;
        display: flex;
        align-items: center;  
}
.dietary_form-block{
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
.dietary_buttonStyle{        
        cursor: pointer;
        color: #67b5dd;
        font-size: 20px;
        margin-right: 20px;        
}
.button-block{
      width:100%;
      display:flex;      
      justify-content: flex-start; 
      margin-left: 100px;            
}
.dietary_addition-text{

}
.dietary-icon_logo{
    width: 100px;
    border-radius: 100px;
    height: 100px !important;
}
.dietary-check-block{
    display:flex;
    justify-content:space-between;
    margin-bottom: 50px;
}
.dietary_other-options{
    padding-top: 30px;
    width: 75%;
}
.dietary_icon-title{
    font-weight:800;
    color: #b6b6b6;
}
.dietary_title-span{
    color: #b6b6b6;
    font-size: 22px;
    margin-top: 20px;
}
</style>