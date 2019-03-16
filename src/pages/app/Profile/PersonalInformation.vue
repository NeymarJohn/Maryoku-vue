<template>
    <div class="main-personal">
    
            <div class="md-layout">
           
                <md-card>
    
                    <md-card-header class="md-card-header-icon ">
                        <div class="md-layout">
                        <div class="card-icon  header-icon">
                            <md-icon  style=" text-align: center;">perm_identity</md-icon>
                        </div>
                        
                        <div class="md-layout-item  Personal-Information">
                            Personal Information 
                            </div>
                                 
                        </div>
                    </md-card-header>
                    <md-card-content>
                        
                        <div class="md-layout">
                            <div class="md-layout-item">
    
                            </div>
                            <div class="md-layout-item">
    
                                <div class="img-circle">
                                    <template>
                                            <div class="image-container">
                                                <img src="static/img/profile-picture.png"> </div>
                                    </template>
                                </div>
                               
                                 <div >
                                    <button class="profile-button" ><span >Change Profile Picture</span></button>
                                </div>
                            </div>
                            <div class="md-layout-item">
                                
                            </div>
                        </div>
                        <div class="md-layout ">
                            <label style="text-align: left" class="md-layout-item md-size-22 md-form-label">
                                    Name :
                                </label>
                            <div class="md-layout-item">
                                
                                <span></span>
                            </div>
                        </div>
                        <div class="md-layout ">
                            <label style="text-align: left" class="md-layout-item md-size-22 md-form-label">
                                    Email :
                                </label>
                            <div class="md-layout-item">
                               
                                <span></span>
                            </div>
                        </div>
                        <div class="md-layout ">
                            <label style="text-align: left" class="md-layout-item md-size-22 md-form-label">
                                    Role :
                                </label>
                            <div class="md-layout-item">
                                
                                <span></span>
                            </div>
                        </div>
                        <div class="md-layout ">
                            <label style="text-align: left" class="md-layout-item md-size-22 md-form-label">
                                    Department :
                                </label>
                            <div class="md-layout-item">
                                
                                <span></span>
                            </div>
                        </div>
                        <div class="md-layout ">
                            <label style="text-align: left" class="md-layout-item md-size-22 md-form-label">
                                    Branch : 
                                </label>
                            <div class="md-layout-item">
                               
                                <span></span>
                            </div>
                        </div>
                    </md-card-content>
    
                </md-card>
          
                <div class="md-layout">
                
                <MySpecialDates></MySpecialDates>
            </div>
            </div>
    </div>
</template>
<script>
import MySpecialDates from "./MySpecialDates";
export default {
    components:{
        MySpecialDates
    }
}
</script>

<style lang="scss">
    .Personal-Information {
        text-align: center;
        font-family: Roboto;
        font-size: 18px;
        font-weight: 300;
        font-style: normal;
        font-stretch: normal;
        line-height: 1.33;
        letter-spacing: normal;
        text-align: left;
        color: #000000;
        padding-top: 20px;
    }
    
    .header-icon {
        width: 63px;
        height: 64px;
        border-radius: 3px;
        box-shadow: 0px 4px 20px 0 rgba(0, 0, 0, 0.14);
        background-image: linear-gradient(to right, #eb3e79, #d81b60);
    }
    .card-icon{
        padding: 16px 16px 16px 15px;
    }
    
    
    .profile-picture {
        box-shadow: 0px 4px 25px 0 rgba(0, 0, 0, 0.12);
        background-color: #999999;
    }
    
    .profile-button{
         width: 170px;
        height: 33px;
        box-shadow: 0px 4px 20px 0 rgba(0, 0, 0, 0.14);
        background-color: #9c27b0;
    }

    .profile-button span{
         width: 141px;
        height: 14px;
        font-family: Roboto;
        font-size: 14px;
        font-weight: bold;
        font-style: normal;
        font-stretch: normal;
        letter-spacing: normal;
        text-align: center;
        color: #ffffff;
    }

    .main-personal {
        width: 349px;
        height: 485px;
        border-radius: 6px;
        // box-shadow: 0px 1px 4px 0 rgba(0, 0, 0, 0.14);
        // background-color: #ffffff;
    }
</style>
