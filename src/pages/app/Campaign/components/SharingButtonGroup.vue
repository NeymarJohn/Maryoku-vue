<template>
  <div class="d-flex sharing-button-group-content">
    <ul class="d-flex sharing-button-group">
      <li v-for="social in Object.keys(socialLinks)"
          :key="social"
          :data-social="social"
          @click="shareSocial(social)"
      >
        <img :src="`/static/icons/${social}.svg`">
      </li>
    </ul>
    <md-button
      v-if="copyLink"
      class="md-simple md-red normal-btn copy-link-button"
      @click="clinkButtonCopyLink"
    >
      <img :src="`${$iconURL}Campaign/Path 2639.svg`"><span class="ml-10 mr-20">Copy Link</span>
    </md-button>
  </div>
</template>
<script>

import Swal from "sweetalert2";

export default {
  props: {
    copyLink: {
      type: Boolean,
      default: true,
    },
    link: {
      type: String,
      default: "",
    },
    sharingData: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      socialLinks: {
        linkedin: "https://linkedin.com",
        pinterest: "https://pinterest.com",
        gmail: "https://gmail.com",
        whatsapp: "https://www.whatsapp.com/",
        outlook: "https://outlook.live.com/mail/0/",
        facebook: "https://facebook.com",
      },
    };
  },
  computed: {
    campaignTitle() {
      const campaignData = this.$store.state.campaign.FEEDBACK;
      return campaignData && campaignData.title ? campaignData.title : "Maryoku";
    }
  },
  methods: {
    shareSocial(socialType) {
      let url = encodeURIComponent(this.link);
      const title = `${this.campaignTitle} RSVP`;
      switch(socialType) {
        case "linkedin":
          this.openShareWindow(`http://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`);
          break;
        case "facebook":
          this.openShareWindow(`https://www.facebook.com/sharer/sharer.php?u=${url}&amp;src=sdkpreparse"`);
          break;
        case "pinterest":
          this.openShareWindow(`http://pinterest.com/pin/create/button/?url=${url}&description=${title}`);
          break;
        case "gmail":
          this.openShareWindow(`https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=&su=${title}&body=${url}&ui=2&tf=1&pli=1`);
          break;
        case "outlook":
          this.openShareWindow(`https://outlook.live.com/mail/0/deeplink/compose?mailtouri=mailto:?body=${url}%26subject=${title}`);
          break;
        case "whatsapp":
          window.open(`whatsapp://send?text=${this.link}`);
          break;
        default:
          const win = window.open(this.socialLinks[socialType], "_blank");
          win.focus();
      }
    },
    openShareWindow(link) {
      window.open(link, "", "left=0,top=0,width=650,height=420,personalbar=0,toolbar=0,scrollbars=0,resizable=0");
    },
    clinkButtonCopyLink() {
      const tempInput = document.createElement("input");
      tempInput.value = this.link;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand("copy");
      document.body.removeChild(tempInput);
      Swal.fire({
        title: "The link successfully copied to your clipboard!",
        buttonsStyling: false,
        type: "success",
        confirmButtonClass: "md-button md-success",
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.sharing-button-group {
  padding: 0;
  list-style: none;
  border-radius: 3px;
  width: max-content;
  li {
    width: 61px;
    text-align: center;
    height: 68px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
}
.copy-link-button{
  height: 43px;
  width: 149px;
  border: solid 1px #f51355;
  margin-top: 30px;
  margin-left: 10px;
}
@media only screen and (max-width: 959px) {
  .sharing-button-group {
    width: 100%;
    flex-flow: wrap;
    li {
      border: none !important;
      width: 33%;
    }
  }
}
</style>
