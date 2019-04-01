<template>
  <md-card>
    <md-card-header class="md-card-header-icon md-card-header-white" @mouseleave.native="onMouseLeave" @mouseenter.native="onMouseOver">
      <div class="card-icon" style="width: 96px; height: 96px; padding: 0; object-fit: contain;" >
        <img src="/static/img/reinhart-foodservice-logo.jpg" style="object-fit: scale-down; padding: 4px; width: 100%; height: 100%;"/>
        <div v-show="logoButtonsVisible" style="margin-top: -15%; text-align: center;">
          <md-button class="md-xs md-just-icon md-round md-info md-icon-button"><md-icon>edit</md-icon></md-button>
          <md-button class="md-xs md-just-icon md-round md-danger md-icon-button"><md-icon>close</md-icon></md-button>
        </div>
      </div>
      <h4 class="title company-title" style="padding-top: 24px;">
        <label-edit v-bind:text="companyName"></label-edit>
      </h4>
    </md-card-header>
    <md-card-content class="company-profile-section">
      <div class="separator">&nbsp;</div>
      <div class="md-layout">
        <div class="md-layout-item md-size-33"><span class="text-gray" style="font-weight: 500;">Main Office</span></div>
        <div class="md-layout-item md-size-66 text-right">
          <h6 style="padding: 0;margin: 4px 0; text-transform: none !important;">
            <label-edit v-bind:text="companyProfile.mainAddress" placeholder="Your Main Location"></label-edit>
          </h6>
        </div>
        <div class="md-layout-item md-size-60"><span class="text-gray" style="font-weight: 500;">Number of Employees</span></div>
        <div class="md-layout-item md-size-40 text-right">
          <h6 style="padding: 0;margin: 4px 0; text-transform: none !important;">
            <label-edit v-bind:text="companyProfile.mainAddress" placeholder="1"></label-edit>
          </h6>
        </div>
        <div class="md-layout-item md-size-33"><span class="text-gray" style="font-weight: 500;">Industry</span></div>
        <div class="md-layout-item md-size-66 text-right">
          <h6 style="padding: 0;margin: 4px 0; text-transform: none !important;">
          <label-edit v-bind:text="companyProfile.mainAddress" placeholder="Your Industry"></label-edit>
        </h6>
        </div>
      </div>
      <hr class="divider"/>
      <h6 style="margin: 16px 0;" class="">Contact Information</h6>
      <div class="md-layout">
        <div class="md-layout-item md-size-10"><i class="fa fa-map-marker-alt text-gray"></i></div>
        <div class="md-layout-item md-size-90">
          <span class="text-gray" style="font-weight: 500;">
          <label-edit v-bind:text="companyProfile.mainAddress" placeholder="Your Main Office Address"></label-edit>
        </span>
        </div>
        <div class="md-layout-item md-size-10"><i class="fa fa-phone-volume text-gray"></i></div>
        <div class="md-layout-item md-size-90">
          <span class="text-gray" style="font-weight: 500;">
            <label-edit v-bind:text="companyProfile.mainAddress" placeholder="Phone Number"></label-edit>
          </span>
        </div>
        <div class="md-layout-item md-size-10"><i class="fa fa-envelope text-gray"></i></div>
        <div class="md-layout-item md-size-90">
          <span class="text-gray" style="font-weight: 500;">
            <label-edit v-bind:text="companyProfile.mainAddress" placeholder="Email Address"></label-edit>
          </span>
        </div>
        <div class="md-layout-item md-size-10"><i class="fa fa-globe text-gray"></i></div>
        <div class="md-layout-item md-size-90">
          <span class="text-gray" style="font-weight: 500;">
            <label-edit v-bind:text="companyProfile.mainAddress" placeholder="Website address"></label-edit>
          </span>
        </div>
      </div>
      <hr class="divider"/>
      <h6 style="margin: 16px 0;">Branches</h6>
      <div class="md-layout">
        <div class="md-layout-item md-size-33"><span class="text-gray" style="font-weight: 500;">Branch 1</span></div>
        <div class="md-layout-item md-size-66 text-right"><h6 style="padding: 0;margin: 4px 0; text-transform: none !important;">San Diego, CA</h6></div>
        <div class="md-layout-item md-size-50"><span class="text-gray" style="font-weight: 500;">Branch 2</span></div>
        <div class="md-layout-item md-size-50 text-right"><h6 style="padding: 0;margin: 4px 0; text-transform: none !important;">Seatle, WA</h6></div>
        <div class="md-layout-item md-size-33"><span class="text-gray" style="font-weight: 500;">Branch 3</span></div>
        <div class="md-layout-item md-size-66 text-right"><h6 style="padding: 0;margin: 4px 0; text-transform: none !important;">New York, NY</h6></div>
      </div>
      <hr class="divider"/>
      <h6 style="margin: 4px 0;">Custom Information</h6>
      <div style="min-height: 140px"></div>
    </md-card-content>
  </md-card>
</template>
<script>
  import auth from "@/auth";
  import LabelEdit from 'label-edit';

  export default {
    name: "company-dashboard-info",
    components: {
      LabelEdit
    },
    data() {
      return {
        auth: auth,
        logoButtonsVisible: false,
        companyName: "",
        companyProfile: {
          mainOffice: "",
          numberOfEmployees: "",
          industry: "",
          mainAddress: "",
          mainPhoneNumber: "",
          mainEmailAddress: "",
          mainWebSiteAddress: "",
        }
      };
    },
    mounted(){
      this.auth.currentUser(this, true, () => {
        this.companyName = this.auth.user.customer.name;
      });
    },
    methods: {
      onMouseOver: function() {
        this.logoButtonsVisible = true;
      },
      onMouseLeave: function() {
        this.logoButtonsVisible = false;
      },
    }
  };
</script>
<style lang="scss" scoped>
  .divider {
    margin-top: 12px; margin-bottom: 12px; border-color: #ccc; border-top: none; border-left: none; border-right: none;
  }
</style>
