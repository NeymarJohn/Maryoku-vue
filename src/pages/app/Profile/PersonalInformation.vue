<template>
  <div class="">

    <div class="md-layout">

      <div class="md-layout-item md-size-100">
        <md-card>
          <md-card-header class="md-card-header-icon md-card-header-rose">
            <div class="card-icon" style="padding: 12px;">
              <md-icon>person</md-icon>
            </div>
            <h4 class="title">Personal Information</h4>
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
              <label style="text-align: left" class="md-form-label">
                Name :
              </label>
              <div class="md-layout-item" style="padding-top:20px;">

                <span>{{userInfo.displayName}}</span>
              </div>
            </div>
            <div class="md-layout ">
              <label style="text-align: left" class=" md-form-label">
                Email :
              </label>
              <div class="md-layout-item" style="padding-top:20px;text-align: left">

                <span>{{userInfo.email}}</span>
              </div>
            </div>
            <div class="md-layout ">
              <label style="text-align: left" class=" md-form-label">
                Role :
              </label>
              <div class="md-layout-item" style="padding-top:20px">

                <span></span>
              </div>
            </div>
            <div class="md-layout ">
              <label style="text-align: left" class="md-form-label">
                Department :
              </label>
              <div class="md-layout-item" style="padding-top:20px">

                <span></span>
              </div>
            </div>
            <div class="md-layout ">
              <label style="text-align: left" class=" md-form-label">
                Branch :
              </label>
              <div class="md-layout-item" style="padding-top:20px">

                <span></span>
              </div>
            </div>
          </md-card-content>

        </md-card>
      </div>
    </div>

    <div class="md-layout">

      <div class="md-layout-item md-size-100">
        <MySpecialDates :birthDate="userInfo.me.birthday" :workingSince="userInfo.me.companyStartDate"></MySpecialDates>
      </div>
    </div>
  </div>
</template>
<script>
  import MySpecialDates from "./MySpecialDates";
  import StatsCard from '../../../components/Cards/StatsCard';
  export default {
    components:{
      StatsCard,
      MySpecialDates
    },
    props:{
      userInfo:Object
    },
    mounted(){
    }
  }
</script>

<style lang="scss">
  .personal-Information {
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
