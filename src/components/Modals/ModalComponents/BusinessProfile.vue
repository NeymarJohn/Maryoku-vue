<template>
  <div>
    <div class="item-wrap">
      <img class="item-icon-vendor" src="/static/icons/Building.svg" style="  width:36px;"/>
      <div class="content-wrap">
        <span class="content-wrap-header">Company Name</span>
        <span class="content-wrap-content">{{ vendorData.companyName }}</span>
      </div>
      <md-button class="md-simple md-vendor edit-btn">
        <span class="edit-btn-content">Edit</span>
      </md-button>
    </div>
    <div class="item-wrap">
      <img class="item-icon" :src="`${$iconURL}common/email-gray.svg`" style="width:26px; margin-right: 10px"/>
      <div class="content-wrap">
        <span class="content-wrap-header">Business Email address</span>
        <span class="content-wrap-content">{{ vendorData.vendorMainEmail }}</span>
      </div>
      <md-button class="md-simple md-vendor edit-btn">
        <span class="edit-btn-content">Edit</span>
      </md-button>
    </div>
    <div class="item-wrap">
      <img class="item-icon" :src="`${$iconURL}common/phone-gray.svg`" style="width:26px; margin-right: 10px"/>
      <div class="content-wrap">
        <span class="content-wrap-header">Phone number</span>
        <span class="content-wrap-content">{{ vendorData.vendorMainPhoneNumber }}</span>
      </div>
      <md-button class="md-simple md-vendor edit-btn">
        <span class="edit-btn-content">Edit</span>
      </md-button>
    </div>
    <div class="item-wrap">
      <img class="item-icon" :src="`${$iconURL}common/location-gray.svg`" style="width:26px; margin-right: 10px"/>
      <div class="content-wrap">
        <span class="content-wrap-header">Address</span>
        <span class="content-wrap-content">{{ vendorData.vendorAddressLine1 }}</span>
      </div>
      <md-button class="md-simple md-vendor edit-btn">
        <span class="edit-btn-content">Edit</span>
      </md-button>
    </div>
    <div class="item-wrap" style="border-bottom: none">
      <img class="item-icon" :src="`${$iconURL}common/email-gray.svg`" style="width:26px; margin-right: 10px"/>
      <div class="content-wrap">
        <span class="content-wrap-header">Website & social media</span>
        <div class="social-value-wrap d-flex align-center">
          <a :href="link">{{link}}</a>
          <div class="social-value d-flex align-center">
            <div
              v-for="(s, sIndex) in socialMediaBlocks.filter((item) => vendorData.social[item.name])"
              :key="sIndex"
              class="item mr-20"
            >
              <a @click="setLink(vendorData.social[s.name])">
                <img :class="{active: vendorData.social[s.name] === link}"
                     :src="`${$iconURL}Vendor Signup/${s.icon}`">
              </a>
            </div>
          </div>
        </div>
      </div>
      <md-button class="md-simple md-vendor edit-btn">
        <span class="edit-btn-content">Edit</span>
      </md-button>
    </div>
  </div>
</template>

<script>
import {socialIcons} from "../../../constants/links";

export default {
  name: "BusinessProfile",
  data() {
    return {
      socialMediaBlocks: socialIcons,
      link: "",
    };
  },
  computed: {
    vendorData() {
      return this.$store.state.vendor.profile;
    },
  },
  created() {
    this.link = this.vendorData.social["facebook"];
  },
  methods: {
    setLink(link) {
      this.link = link;
    },
    saveProfileField(profileData) {
      let updateData;
      if (profileData.name === "aboutCompany") {
        updateData = {about: {company: profileData.value}, id: this.vendorData.id};
      } else {
        updateData = {[profileData.name]: profileData.value, id: this.vendorData.id};
      }
      this.$store.dispatch("vendor/updateProfile", updateData);
    },
  }
};
</script>

<style scoped lang="scss">
.item-wrap {
  position: relative;
  display: flex;
  flex-direction: row;
  padding: 20px;
  border-bottom: 1px solid #a0a0a0;
  .item-icon-vendor{
    filter: invert(46%) sepia(2%) saturate(2%) hue-rotate(9deg) brightness(115%) contrast(81%);
  }
  .content-wrap {
    width: 100%;
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: space-between;
    .content-wrap-header {
      font-weight: bold;
    }
    .content-wrap-content {
    }
  }
  .edit-btn {
    display: none;
    position: absolute;
    top: 20px;
    right: 20px;
    .edit-btn-content {
      font-weight: bold;
      text-decoration: underline;
    }
  }
  .social-value-wrap {
    width: 100%;
    justify-content: space-between;
    .social-value {
      img {
        width: 15px;
        max-height: 30px;
        &.active{
          filter: invert(12%) sepia(96%) saturate(1650%) hue-rotate(287deg) brightness(67%) contrast(97%);
        }
      }
    }
  }
}

.item-wrap:hover .edit-btn {
  display: block;
}

.item-wrap:hover {
  background-color: #e9dfe8;
}
.item-wrap:hover .item-icon {
  filter: invert(12%) sepia(96%) saturate(1650%) hue-rotate(287deg) brightness(48%) contrast(97%);
}
.item-wrap:hover .item-icon-vendor {
  filter: unset;
}
</style>
