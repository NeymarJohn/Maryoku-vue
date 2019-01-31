<template>
<div class='employee-body'>
<div class='form-main'>
<inputText></inputText>
</div>
<div class='logo-main'>
</div>
</div>
</template>
<script>
import InputText from '@/components/Inputs/InputText.vue'

export default {
    name:'Employee',
    component:{
   "inputText":InputText
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
        background-color: white    
}
.logo-main {
        width:50%;
        height: 100vh;  
        background:  #ff527c  
}

</style>