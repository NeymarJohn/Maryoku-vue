<template v-if='officeManager'>
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
       <div>
       <Icon
            iconSourceOne="static/img/lock.jpg"
            iconSourceTwo="static/img/login.jpg"
            imageStyle='dietary-icon_logo'       
       />
       <Icon
            iconSourceOne="static/img/lock.jpg"
            iconSourceTwo="static/img/login.jpg"
            imageStyle='dietary-icon_logo'
       />
       <Icon
            iconSourceOne="static/img/lock.jpg"
            iconSourceTwo="static/img/login.jpg"
            imageStyle='dietary-icon_logo'
       />
       <Icon
            iconSourceOne="static/img/lock.jpg"
            iconSourceTwo="static/img/login.jpg"
            imageStyle='dietary-icon_logo'
       />
       </div> 
        <div>
       <Icon
            iconSourceOne="static/img/lock.jpg"
            iconSourceTwo="static/img/login.jpg"
            imageStyle='dietary-icon_logo'       
       />
       <Icon
            iconSourceOne="static/img/lock.jpg"
            iconSourceTwo="static/img/login.jpg"
            imageStyle='dietary-icon_logo'
       />
       <Icon
            iconSourceOne="static/img/lock.jpg"
            iconSourceTwo="static/img/login.jpg"
            imageStyle='dietary-icon_logo'
       />
       <Icon
            iconSourceOne="static/img/lock.jpg"
            iconSourceTwo="static/img/login.jpg"
            imageStyle='dietary-icon_logo'
       />
       </div> 
       <div>
       <Icon
            iconSourceOne="static/img/lock.jpg"
            iconSourceTwo="static/img/login.jpg"
            imageStyle='dietary-icon_logo'
       />
       <InputText 
                labelStyle='label_input'
                label='Other'
                fieldStyle="field_input"                
        />
       </div>        
</div>
<div class='button-block'>
        <ButtonDiv buttonStyle='dietary_buttonStyle' text='skip'/>
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
</template>
<template v-else>
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

       />
       <Icon
            iconSourceOne="static/img/lock.jpg"
            iconSourceTwo="static/img/login.jpg"
            imageStyle='dietary-icon_logo'
            title='lactuz free'
            titleStyle='dietary_icon-title' 
       />
       <Icon
            iconSourceOne="static/img/lock.jpg"
            iconSourceTwo="static/img/login.jpg"
            imageStyle='dietary-icon_logo'
            title='gmo free'
            titleStyle='dietary_icon-title'
       />
       <Icon
            iconSourceOne="static/img/lock.jpg"
            iconSourceTwo="static/img/login.jpg"
            imageStyle='dietary-icon_logo'
            title='egg free'
            titleStyle='dietary_icon-title'
       />
       </div> 
        <div class='dietary-check-block'>
        <Icon
            iconSourceOne="static/img/lock.jpg"
            iconSourceTwo="static/img/login.jpg"
            imageStyle='dietary-icon_logo'
            title='sugar free'
            titleStyle='dietary_icon-title'       
       />
       <Icon
            iconSourceOne="static/img/lock.jpg"
            iconSourceTwo="static/img/login.jpg"
            imageStyle='dietary-icon_logo'
            title='peanut free'
            titleStyle='dietary_icon-title'
       />
       <Icon
            iconSourceOne="static/img/lock.jpg"
            iconSourceTwo="static/img/login.jpg"
            imageStyle='dietary-icon_logo'
            title='kosher'
            titleStyle='dietary_icon-title'
       />
       <Icon
            iconSourceOne="static/img/lock.jpg"
            iconSourceTwo="static/img/login.jpg"
            imageStyle='dietary-icon_logo'
            title='organic'
            titleStyle='dietary_icon-title'
       />
       </div> 
       <div  class='dietary-check-block'>
       <Icon
            iconSourceOne="static/img/lock.jpg"
            iconSourceTwo="static/img/login.jpg"
            imageStyle='dietary-icon_logo'
            title='ecofood'
            titleStyle='dietary_icon-title'
       />
       <div class='dietary_other-options'>
       <InputText 
                labelStyle='label_input'
                label='Other'
                fieldStyle="field_input"                
        />
        </div>
       </div> 
  </div>             
</div>
<div class='button-block'>
        <ButtonDiv buttonStyle='dietary_buttonStyle' text='skip'/>
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
data:{
    cheched:true
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
      justify-content: flex-end;             
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