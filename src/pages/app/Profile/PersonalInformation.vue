<template>
  <md-card>
    <md-card-header class="md-card-header-icon md-card-header-blue">
      <div class="card-icon">
        <md-icon>person</md-icon>
      </div>
      <h5 class="title profile-title">
        Personal Information
      </h5>
    </md-card-header>
    <md-card-content class="company-profile-section">
      <div class="md-layout">
        <div class="md-layout-item md-size-33" style="text-align: left;"><span class="text-gray" style="font-weight: 500;">Name</span></div>
        <div class="md-layout-item md-size-66 text-right">
          <h6 style="padding: 0;margin: 4px 0; text-transform: none !important;">
            <label-edit  field-name="firstName"  @text-updated-blur="companyValueChanged" @text-updated-enter="companyValueChanged"></label-edit>
          </h6>
        </div>
        <div class="md-layout-item md-size-33" style="text-align: left;"><span class="text-gray" style="font-weight: 500;">Email</span></div>
        <div class="md-layout-item md-size-66 text-right">
          <h6 style="padding: 0;margin: 4px 0; text-transform: none !important;">
            <label-edit  field-name="firstName"  @text-updated-blur="companyValueChanged" @text-updated-enter="companyValueChanged"></label-edit>
          </h6>
        </div>
        <div class="md-layout-item md-size-33" style="text-align: left;"><span class="text-gray" style="font-weight: 500;">Role</span></div>
        <div class="md-layout-item md-size-66 text-right">
          <h6 style="padding: 0;margin: 4px 0; text-transform: none !important;">
            <label-edit  field-name="firstName"  @text-updated-blur="companyValueChanged" @text-updated-enter="companyValueChanged"></label-edit>
          </h6>
        </div>
        <div class="md-layout-item md-size-33" style="text-align: left;"><span class="text-gray" style="font-weight: 500;">Department</span></div>
        <div class="md-layout-item md-size-66 text-right">
          <h6 style="padding: 0;margin: 4px 0; text-transform: none !important;">
            <label-edit  field-name="firstName"  @text-updated-blur="companyValueChanged" @text-updated-enter="companyValueChanged"></label-edit>
          </h6>
        </div>
        <div class="md-layout-item md-size-33" style="text-align: left;"><span class="text-gray" style="font-weight: 500;">Branch</span></div>
        <div class="md-layout-item md-size-66 text-right">
          <h6 style="padding: 0;margin: 4px 0; text-transform: none !important;">
            <label-edit  field-name="firstName"  @text-updated-blur="companyValueChanged" @text-updated-enter="companyValueChanged"></label-edit>
          </h6>
        </div>
      </div>
    </md-card-content>
    <!--  <div class="md-layout" style="width:100%">

        &lt;!&ndash; <div class="md-layout-item md-size-100"> &ndash;&gt;
        <md-card>
          <md-card-header class="md-card-header-icon md-card-header-rose">
            <div class="card-icon" style="padding: 12px;">
              <md-icon>person</md-icon>
            </div>
            <div class="md-layout" style="width: 70%;">
              <div class="md-layout-item" style="padding-right: 0px;padding-left: 0px;">
                <div class="md-layout">
                    <div class="md-layout-item md-size-90"  style="padding-left: 0px;padding-right: 0px;">
                      <h4 class="title"><span style="font-size:18px;">Personal Information</span></h4>
                    </div>
                    <div class="md-layout-item md-size-10 edit-modal" style="padding-left: 10px;padding-right: 0px;" @click="showPersonalModal">
                        <md-icon style="font-size: 15px !important;" >edit</md-icon>
                    </div>
                </div>
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
                    <div class="md-layout">
                     <div class="md-layout-item md-size-95"  style="padding-right: 0px;padding-left: 0px;">
                        <div class="image-container">
                          <img style ="width:100px; height: 100px" src="static/img/placeholder.jpg" v-if="imageUrl === null ">
                          <img style ="width:100px; height: 100px" :src="imageUrl" v-if="imageUrl !=null">
                          </div> &lt;!&ndash;profile-picture.png&ndash;&gt;
                     </div>
                     <div class="md-layout-item md-size-5 hover-clear" style="padding-right: 0px;padding-left: 0px;" @click="showRemoveConfirmDialog">
                         <md-icon style="font-size: 15px !important;" v-if="imageUrl !=null">clear</md-icon>
                     </div>
                    </div>
                  </template>
                  </div>

                  <div >
                    <button  class="profile-button" @click="uploadImage"><span >Change Profile Picture</span></button>
                    <input type="file" style="display: none;" ref="inputFile" accept="image/gif, image/jpg, image/png" @change="onFilePicked">
                  </div>
                </div>
                <div class="md-layout-item">

                </div>
              </div>
              <div class="md-layout " style="margin-top: 15%">
                <div class="md-layout-item md-size-20" style="padding-left: 0px;padding-right: 0px;">
                  <label style="text-align: left" class="md-form-label">
                    Name :
                  </label>
                </div>
                <div class="md-layout-item md-size-80" style="text-align: left;padding-left: 0px;">

                  <span style="font-size: 14px;">{{userInfo.displayName}}</span>
                </div>
              </div>
              <div class="md-layout " style="margin-top: 5%">
                <div class="md-layout-item md-size-20" style="padding-left: 0px;padding-right: 0px;">
                  <label style="text-align: left" class=" md-form-label">
                    Email :
                  </label>
                </div>
                <div class="md-layout-item md-size-80" style="text-align: left;padding-left: 0px;">

                  <span style="font-size: 14px;">{{userInfo.email}}</span>
                </div>
              </div>
              <div class="md-layout " style="margin-top: 5%">
                <div class="md-layout-item md-size-20" style="padding-left: 0px;padding-right: 0px;">
                  <label style="text-align: left" class=" md-form-label">
                    Role :
                  </label>
                </div>
                <div class="md-layout-item md-size-80" style="text-align: left;padding-left: 0px;">

                  <span></span>
                </div>
              </div>
              <div class="md-layout " style="margin-top: 5%">
                <div class="md-layout-item md-size-35" style="padding-left: 0px;padding-right: 0px;">
                  <label style="text-align: left" class="md-form-label">
                    Department :
                  </label>
                </div>
                <div class="md-layout-item md-size-65" style="text-align: left;padding-left: 0px;">

                  <span></span>
                </div>
              </div>
              <div class="md-layout " style="margin-top: 5%">
                <div class="md-layout-item md-size-35" style="padding-left: 0px;padding-right: 0px;">
                  <label style="text-align: left" class=" md-form-label">
                    Branch :
                  </label>
                </div>
                <div class="md-layout-item md-size-80" style="text-align: left;padding-left: 0px;">

                  <span></span>
                </div>
              </div>
            </md-card-content>

          </md-card>
        &lt;!&ndash; </div> &ndash;&gt;
      </div>

    <personal-information-modal @closePersonalInformationModal="hidePersonalInfoModal" :showModal="flag"></personal-information-modal>
    <md-dialog-confirm
          :md-active.sync="dialogConfirmFlag"
          md-title="remove profile picture"
          :md-content="dialogMessage"
          md-confirm-text="Agree"
          md-cancel-text="Disagree"
          @md-cancel="onCancel"
          @md-confirm="confirmDelete" />
    <md-dialog-alert
        :md-active.sync="alretExceedPictureSize"
        md-content="Your Profile Picture should be less 500K !"
        md-confirm-text="ok !" />-->

  </md-card>
</template>

<script>
  import StatsCard from '../../../components/Cards/StatsCard';
  import personalInformationModal from './ProfileModal';
  import {LabelEdit} from '@/components';
  export default {
    components: {
      StatsCard,
      personalInformationModal,
      LabelEdit
    },
    mounted(){
      this.imageUrl = userInfo.me.pictureUrl
    },
    props: {
      userInfo: Object
    },

    data() {
      return {
        imageUrl: null,
        personalModalFlag: false,
        flag: false,
        dialogConfirmFlag:false,
        dialogMessage:"",
        alretExceedPictureSize:false
      }
    },
    methods: {
      uploadImage() {
        this.$refs.inputFile.click();

      },

      onFilePicked(event) {
        let file = event.target.files || event.dataTransfer.files;
        if (!file.length) {
          return;
        }
        if (file[0].size <= 500000){
          let url = URL.createObjectURL(file[0]);
          this.imageUrl = url

        const formData = new FormData();
        formData.append("images", file[0], file[0].name) // TODO :: send this object once we have api for userPorfile photo
      }else{
        this.alretExceedPictureSize = true
      }

      },

      hidePersonalInfoModal() {

        this.flag = !this.flag

      },

      showPersonalModal(){

        this.flag = true
      },

      showRemoveConfirmDialog(){
        this.dialogMessage="Are you sure you want delete profile picture ?"
        this.dialogConfirmFlag =  true
      },

      confirmDelete(){
        this.imageUrl = null
        this.dialogConfirmFlag = false
      },
      onCancel(){
        this.dialogConfirmFlag = false
      }

    }

  }
</script>

<style lang="scss" scoped>
  /*.personal-Information {
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

  .card-icon {
    padding: 16px 16px 16px 15px;
  }

  .profile-picture {
    box-shadow: 0px 4px 25px 0 rgba(0, 0, 0, 0.12);
    background-color: #999999;
  }

  .profile-button {
    width: 170px;
    height: 33px;
    box-shadow: 0px 4px 20px 0 rgba(0, 0, 0, 0.14);
    background-color: #9c27b0;
    cursor: pointer;
  }

  .profile-button:hover {
    background-color: #999999;
    color: white
  }

  .edit-modal:hover{
    cursor: pointer;
  }

  .hover-clear:hover{
    cursor: pointer;
  }
  .profile-button span {
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
  }*/
</style>
