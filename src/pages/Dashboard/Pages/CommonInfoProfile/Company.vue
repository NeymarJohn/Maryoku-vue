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
                :isErrors= 'isError'
                required
        />
        <div class='company-logo_name'>
        <div class='company-logo_name-input'>
        <InputText 
                labelStyle='company_label_input'
                label='Logo Name'
                fieldStyle="field_input"
                :value='logo_name'
                name='logo_name'
                disabled               
        />
        </div>
        <md-button :style="'background :'+'#ff527c '+ ' !important'"class="md-success md-round md-fileinput button-md-common">
                <template>Upload  logo</template>
                <input type="file" @change="onFileChange($event)">
        </md-button> 
        </div>     
         <InputText 
                labelStyle='company_label_input'
                label='Main office address'
                id='city_getter'
                required
                name='main_office_adddress'
                :value='main_office_adddress'
                :onChange='onChange'
                :isErrors='isError'
                
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
          :list='industryList'
          :valueName="['title','id']"
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
        <Button text='next' :onClick='submitForm' class="md-success md-fileinput button-md-common"/>
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
<LightBox v-show='isImageShow' :images="images"></LightBox>
</div>
</template>
<script>
//MAIN MODULES
import LightBox from 'vue-image-lightbox'
import { mapGetters } from 'vuex'

//HELPER FUNC
import {isWrong} from '@/utils/helperFunction'

//MODELS
import CalendarEvent from '@/models/CalendarEvent';
import CalendarEventImage from '@/models/CalendarEventImage';
import Calendar from '@/models/Calendar';
import CustomerFile from '@/models/CustomerFile';

//COMPONENTS
import InputText from '@/components/Inputs/InputText.vue'
import Select from '@/components/Select/Select.vue'
import Title from '@/components/Title/Title.vue'
import Button from '@/components/Button/Button.vue'
import Autocomplete from '@/components/Autocomplete/Autocomplete.vue'

export default {
    name:'Employee',
    components:{
   InputText,
   Select,
   Title,
   Button,
   Autocomplete,
   LightBox
},
data(){
        return{
                company_name:'',
                upload_logo:null,
                main_office_adddress:'',
                number_of_employee:'',
                industry:'',
                website:'',                
                isError:false,
                logo_name:'',
                images:[],
                isImageShow:false
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
            if(this.isError==false){                     
                const info=isWrong(this,['company_name','main_office_adddress','number_of_employee','industry','website'])
                this.$store.dispatch("user/sendCompanyInfo",info)                    
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
              ctx.isError=true
            }else{                    
                 ctx.isError=false   
            }
         },
         onFileChange(e) {
        let files = e.target.files || e.dataTransfer.files;

        if (!files.length) return;
        this.createImage(files[0]);
      },
      createImage(file) {
        let reader = new FileReader();
        let _this = this;
        console.log(file)
        reader.onload = e => {
          if (true) {              
                  this.isImageShow = true;
               this.logo_name=file.name
               const newImage={
                       src:e.target.result,
                       thumb:e.target.result
               }
               this.images.push(newImage)

        //     this.isModalLoading = true;
        //     let _calendar = new Calendar({id: this.$store.state.calendarId});
        //     let editedEvent = new CalendarEvent({id: this.event.id});
        this.logo_name=file.name
        console.log(e.target)
            return new CustomerFile({customerFile: e.target.result}).save().then(result => {
              _this.uploadedImages.push({src: e.target.result, thumb: e.target.result, id: result.id});
                 this.isImageShow = true;
               this.logo_name=file.name
               const newImage={
                       src:e.target.result,
                       thumb:e.target.result
               }
               this.images.push(newImage)
               

            })
              .catch((error) => {
                console.log(error);             
              });

          } else {
            _this.uploadedImages.push({ src: e.target.result, thumb: e.target.result });
          }
        }
        reader.readAsDataURL(file);
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
    justify-content: center;
    
}
.company_emp-logo{
        height: 100%;
        width: 100%;
        margin-bottom: -10%;        
}
.company_emp-title{
        text-align: center;
        margin-bottom: 20px
}
.company_label_input{ 
        font-size:15px;       
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
        line-height: 147%;

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
.button-md-common{
        width:25%; 
        background:  #ff527c !important;      
}
.company-logo_name{
    display:flex;
    justify-content: space-between;    
}
.company-logo_name-input{
        width: 60%
}
</style>