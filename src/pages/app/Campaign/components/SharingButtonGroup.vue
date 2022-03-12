<template>
  <div class="d-flex sharing-button-group-content">
    <ul class="d-flex sharing-button-group">
      <li @click="shareSocial('linkedin')" data-social="linkedin"><img src="/static/icons/linkedin.svg" /></li>
      <li @click="shareSocial('pinterest')" data-social="pinterest"><img src="/static/icons/pintrerst.svg" /></li>
      <li @click="shareSocial('gmail')" data-social="gmail"><img src="/static/icons/gmail.svg" /></li>
      <li @click="shareSocial('whatsapp')" data-social="whatsapp"><img src="/static/icons/whatsapp.svg" /></li>
      <li @click="shareSocial('outlook')" data-social="outlook"><img src="/static/icons/outlook.svg" /></li>
      <li @click="shareSocial('facebook')" data-social="facebook"><img src="/static/icons/facebook.svg" /></li>
    </ul>
    <md-button class="md-simple md-red normal-btn copy-link-button" v-if="copyLink">
      <img :src="`${$iconURL}Campaign/Path 2639.svg`" /><span class="ml-10 mr-20">Copy Link</span>
    </md-button>
  </div>
</template>
<script>
export default {
  props: {
    copyLink: {
      type: Boolean,
      default: true,
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
        whatsapp: "whatsapp://send?text=The text to share!",
        outlook: "https://outlook.com",
        facebook: "https://facebook.com",
      },
    };
  },
  methods: {
    shareSocial(socialType) {
      if (socialType === "linkedin") {
        var title = "Maryoku RSVP";
        var text = "Replace this with your share copy.";
        window.open(
          `http://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
            sharingData.pageUrl,
          )}&title=${title}`,
          "",
          "left=0,top=0,width=650,height=420,personalbar=0,toolbar=0,scrollbars=0,resizable=0",
        );
      } else if (socialType === "whatsapp") {
        window.open(`whatsapp://send?text=${this.sharingData.pageUrl}`);
      } else {
        var win = window.open(this.socialLinks[socialType], "_blank");
        win.focus();
      }
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
