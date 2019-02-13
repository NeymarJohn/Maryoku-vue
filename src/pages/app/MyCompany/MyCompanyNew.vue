<template>
  <div class="md-layout">
    <div class="md-layout-item md-size-30">
      <md-card class="md-card-profile">
        <div class="md-card-avatar" style="background-color: white; padding: 18px; border-radius: 8px;">
          <img class="img" src="static/img/reinhart-foodservice-logo.jpg" style="width: 80%; height: 80%;">
        </div>
        <md-card-content>
          <div class="md-layout">
            <div class="md-layout-item md-size-100">
              <h4 class="title text-gray" style="font-weight: 500;">Reynholm Industries</h4>
              <md-button class="md-rose md-sm">Edit Profile</md-button>
            </div>
            <div class="md-layout-item md-size-100">
              <div class="fc-divider" style="color: #eeeeee; margin: 15px;"></div>
            </div>
            <div class="md-layout-item md-size-100">
              <div class="md-layout">
                <div class="md-layout-item md-size-50" style="text-align: left;">
                  <h5 class="title text-bold text-gray info-text-size">Main Office</h5>
                </div>
                <div class="md-layout-item md-size-50" style="text-align: left;">
                  <h5 class="title info-text-size">San Diego, CA</h5>
                </div>

                <div class="md-layout-item md-size-50" style="text-align: left;">
                  <h5 class="title text-bold text-gray info-text-size">Number of Employees</h5>
                </div>
                <div class="md-layout-item md-size-50" style="text-align: left;">
                  <h5 class="title info-text-size">+500 employees</h5>
                </div>

                <div class="md-layout-item md-size-50" style="text-align: left;">
                  <h5 class="title text-bold text-gray info-text-size">Industry</h5>
                </div>
                <div class="md-layout-item md-size-50" style="text-align: left;">
                  <h5 class="title info-text-size">Logistics</h5>
                </div>
              </div>
            </div>
            <div class="md-layout-item md-size-100">
              <div class="fc-divider" style="color: #eeeeee; margin: 15px;"></div>
            </div>
            <div class="md-layout-item md-size-100">
              <div class="header text-bold text-gray " style="text-align: left; margin-bottom: 8px;">Contact Information</div>
              <div class="md-layout">
                <div class="md-layout-item md-size-100" style="text-align: left;">
                  <md-icon class="text-gray" style="margin-right: 12px; margin-bottom: 12px;">pin_drop</md-icon> 5th Ave, Corner Pine st. San Diego, CA 19082
                </div>
                <div class="md-layout-item md-size-100" style="text-align: left;">
                  <md-icon class="text-gray" style="margin-right: 12px; margin-bottom: 12px;">call</md-icon> + 12 345 0987
                </div>

                <div class="md-layout-item md-size-100" style="text-align: left;">
                  <md-icon class="text-gray" style="margin-right: 12px; margin-bottom: 12px;">mail_outline</md-icon> reynholmn@industries.com
                </div>

                <div class="md-layout-item md-size-100" style="text-align: left;">
                  <md-icon class="text-gray" style="margin-right: 12px; margin-bottom: 12px;">web_asset</md-icon> www.reyholmnindustries.com
                </div>
              </div>
            </div>

            <div class="md-layout-item md-size-100">
              <div class="fc-divider" style="color: #eeeeee; margin: 15px;"></div>
            </div>
            <div class="md-layout-item md-size-100">
              <div class="header text-bold text-gray " style="text-align: left; margin-bottom: 8px;">Branches</div>
              <div class="md-layout">
                <div class="md-layout-item md-size-100" style="text-align: left;">
                  <md-icon class="text-gray" style="margin-right: 12px; margin-bottom: 12px;">pin_drop</md-icon> Peninsula ave. 15 street, North Drive
                </div>
                <div class="md-layout-item md-size-100" style="text-align: left;">
                  <md-icon class="text-gray" style="margin-right: 12px; margin-bottom: 12px;">pin_drop</md-icon> Upper Lake street, corner Crest village
                </div>
                <div class="md-layout-item md-size-100" style="text-align: left;">
                  <md-icon class="text-gray" style="margin-right: 12px; margin-bottom: 12px;">pin_drop</md-icon> 75 ave. Darktown 19880
                </div>
              </div>
            </div>

            <div class="md-layout-item md-size-100">
              <div class="fc-divider" style="color: #eeeeee; margin: 15px;"></div>
            </div>
            <div class="md-layout-item md-size-100">
              <div class="header text-bold text-gray " style="text-align: left; margin-bottom: 8px;">Additional Infromation</div>

            </div>
          </div>
        </md-card-content>
      </md-card>
    </div>
    <div class="md-layout-item md-size-33">
      <md-card>
        <md-card-content>
          <div class="title text-bold">Number of events</div>
        </md-card-content>
      </md-card>
      <md-card>
        <md-card-content>
          <div class="title text-bold">Average number of participants per event</div>
        </md-card-content>
      </md-card>
      <md-card>
        <md-card-content>
          <div class="title text-bold">Indoor VS Outdoor events</div>
        </md-card-content>
      </md-card>
    </div>
    <div class="md-layout-item md-size-33">
      <md-card>
        <md-card-content>
          <div class="title text-bold">Attendants satisfaction rate</div>
        </md-card-content>
      </md-card>
      <md-card>
        <md-card-content>
          <div class="title text-bold">Average event cost per employee</div>
        </md-card-content>
      </md-card>
    </div>
  </div>
</template>

<script>
  import { Tabs, NavTabsCard } from "@/components";
  import MyCompanyDashboard from "src/pages/app/MyCompany/MyCompanyDashboard.vue";
  import MyCompanyApprovals from "src/pages/app/MyCompany/MyCompanyApprovals.vue";
  import MyCompanyProfile from "src/pages/app/MyCompany/MyCompanyProfile.vue";
  import MyCompanyBilling from "src/pages/app/MyCompany/MyCompanyBilling.vue";
  import MyCompanySettings from "src/pages/app/MyCompany/MyCompanySettings.vue";

  export default {
    components: {
      Tabs,
      NavTabsCard,
      MyCompanyDashboard,
      MyCompanyApprovals,
      MyCompanyProfile,
      MyCompanyBilling,
      MyCompanySettings
    },
    data() {
      return {
        firstTabs: [
          {
            tab: 'Sign contract for "What are conference organizers afraid of?"'
          },
          {
            tab: "Lines From Great Russian Literature? Or E-mails From My Boss?"
          },
          {
            tab:
              "Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit"
          }
        ],
      };
    },
    methods: {
      onSelect: function(items) {
        this.selected = items;
      },
    }
  };
</script>
<style>
  .text-bold {
    font-weight: 600;
  }
  .info-text-size {
    font-size: 14px;
    margin-top: 12px;
  }
</style>
