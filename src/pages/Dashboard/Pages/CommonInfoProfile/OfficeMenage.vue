<template>
<div class='om-body'>
<div class='om_form-main'>
<div class='om_form-block'>
<div>
<Title
        class='emp-title'
        title='Oh,wow so thats you'
        titleText='om_titleStyle'/>
</div>
        <InputText 
                labelStyle='om_label_input'
                label='Full Name'
                fieldStyle="field_input"
                required
        />
        <InputText
                labelStyle='om_label_input'
                label='Email Address'
                required
        />
        <InputText 
                labelStyle='om_label_input'
                label='Phone Number'
                required
        />        
</div>
<div class='om_button-block'>
        <ButtonDiv buttonStyle='om_buttonStyle' text='next' :onClick='onNext'/>
</div>
</div>
<div class='om_logo-main'>
<div>
<img class='om_form-block' src="static/img/secure_booker.png">
        <Title
                title='Smart Leadership'
                titleBlock='om_titleStyle'
                titleText='om_titleStyle'
        />
        <Title  
                titleText='om_titleTextLogo'        
                titleBlock='om_titleStyle'
                title='We help you collect all events data, from participation rate to feedback and budget frends. Evething you need to lead'
         />
</div>
</div>
</div>
</template>
<script>
//MAIN MODULES
import {mapGetters} from 'vuex'

//COMPONETS
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
                        
                }
        },
                computed:{
                ...mapGetters({})
        },
                methods:{
                        onNext:function(){
                              this.$router.push('/events-data')
                        }
        }

}
</script>
<style lang="scss">
.om-body{
    display:flex;
    flex-direction:'column'      
}
.om_form-main {
        width:50%;
        height: 100vh; 
        background-color: white;
        display: flex;
        justify-content: center;        
}
.om_logo-main {
        width:50%;
        height: 100vh;  
        background:  #ff527c;
        display: flex;
        align-items: center;  
}
.om_form-block{
    width: 75%;
    display: flex;
    flex-direction: column;
    margin-top: 60px
}
.om_form-block{
                
}
.emp-title{
        text-align: center;
        margin-bottom: 20px
}
.om_label_input{
        font-size: 20px !important;
        padding-left: 10px;
}
.om_titleStyle{
      font-size: 40px;
      font-weight: 700; 
}
.om_titleStyle{
       display:flex;
       justify-content: center; 
}
.om_titleTextLogo{
    text-align: center;
    width: 70%;
    color: white;
    font-size: 26px;
    margin-top: 20px;
}
.om_buttonStyle{        
        cursor: pointer;
        color: #ff527c;
        font-size: 20px;
        margin-right: 20px;       
}
.om_button-block{      
      display:flex;      
      justify-content: flex-end;
      align-items: flex-end;
      margin-bottom: 45px;               
}
</style>