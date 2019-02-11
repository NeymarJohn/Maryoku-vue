<template>
<div class='company_body'>
<div class='company_form-main'>
<div class='company_form-block'>
<div>
<Title
        class='company_emp-title'
        title="Hey, it's your company"
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
        <Autocomplete
                label='Main office Address'
                styleLabel='company_label_input'
                id='city_getter'
                required
                :value='main_office_adddress'                
                :data='autocomplete'
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
       <Select
         label='Industry'
          labelStyle='company_label_input'
          :data='industryList'
          name='industry'
          :onChange="onChange"
          /> 
        <InputText 
                labelStyle='company_label_input'
                label='Website'
                name='website'
                :value='website'
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
<div>
</div>
<div>
</div>
</div>
</template>
<script>
import { mapGetters } from 'vuex'

import {isWrong} from '@/utils/helperFunction'

import InputText from '@/components/Inputs/InputText.vue'
import Select from '@/components/Select/Select.vue'
import Title from '@/components/Title/Title.vue'
import ButtonDiv from '@/components/Button/ButtonDiv.vue'
import Autocomplete from '@/components/Autocomplete/Autocomplete.vue'

export default {
    name:'Employee',
    components:{
   InputText,
   Select,
   Title,
   ButtonDiv,
   Autocomplete
},
data(){
        return{
                company_name:'',
                upload_logo:null,
                main_office_adddress:'',
                number_of_employee:'',
                industry:'',
                website:'',                
                errors:false,
                        }
},
mounted:function(){        
        this.$store.dispatch("user/getIndustry");
        const auto =document.getElementById('city_getter');       
        this.autocomplete = new google.maps.places.Autocomplete(auto,{types: ['geocode']});     
},
computed:{
     ...mapGetters({  
  industryList: 'user/getIndustryList'
}),  
},

 methods: {
         submitForm:function(){                                    
            this.validFunc(this)  
            console.log('@')                       
            if(this.errors==false){
                     console.log('@@')
                const info=isWrong(this,['company_name','main_office_adddress','number_of_employee','industry','website'])
                this.$store.dispatch("user/sendCompanyInfo",info)                    
                this.$router.push('/invite')     
            }
              
         },
         onChange:function(value, name){    
                 console.log(this)                           
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

// const auto =document.getElementById('auto')
// var autocomplete = new google.maps.places.Autocomplete(auto)
// autocomplete.addListener('place_changed', function() {
          
//           var place = autocomplete.getPlace();
//           if (!place.geometry) {
//             // User entered the name of a Place that was not suggested and
//             // pressed the Enter key, or the Place Details request failed.
//             window.alert("No details available for input: '" + place.name + "'");
//             return;
//           })
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
        flex-direction: row;
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
    line-height: normal;
}
.company_buttonStyle{        
        cursor: pointer;
        color: #ff527c;
        font-size: 20px;        
        border: 1px solid;
        padding: 10px 15px;
        border-radius: 10px;
        height: max-content;       
}
.company_button-block{      
      display:flex;     
      align-items: flex-end;
      margin-bottom: 45px; 
}
</style>