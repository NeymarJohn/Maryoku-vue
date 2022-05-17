<template>
  <div class="coundown-campaign">
    <div class="p-50">
      <div class="font-size-30 font-bold-extra text-transform-capitalize">
        send your guests a fun countdown
      </div>
      <div />
      <div class="countdown-cover-image mt-50">
        <img v-if="coverImage" :src="coverImage">
        <div v-else-if="concept.images && concept.images.length > 0" class="d-flex justify-content-center align-center">
          <concept-image-block
            class="change-cover-concept"
            :images="concept.images"
            :colors="concept.colors"
            border="no-border"
          />
        </div>
        <img v-else :src="defaultCoverImage" alt="default cover image">
        <div class="countdown-guests d-flex align-center p-20">
          <span class="font-size-30 font-bold-extra mr-10">{{ Math.ceil(event.numberOfParticipants) || 0 }}</span>
          <span class="font-size-22 font-bold color-dark-gray">Guests are {{ isLaunched ? "Attending" : "Invited" }}</span>
          <hide-switch
            :value="campaignVisibleSettings.showComing"
            class="ml-20"
            label="coming"
            @input="handleChangeCampaignVisibleSettings('showComing', $event)"
          />
        </div>
        <div class="d-flex countdown-time-panel align-end justify-content-center">
          <countdown-time class="countdown-time" :event="event" />
          <hide-switch
            :value="campaignVisibleSettings.showCountdown"
            class="ml-20"
            label="countdown"
            @input="handleChangeCampaignVisibleSettings('showCountdown', $event)"
          />
        </div>
        <div class="cover-image-button">
          <md-button id="ChangeCoverImage" class="md-button md-red maryoku-btn md-theme-default change-cover-btn" @click="handleChangeCoverImage">
            <img :src="`${$iconURL}Campaign/Group 2344.svg`" class="mr-10" style="width: 20px">Change Cover
          </md-button>
        </div>
      </div>
      <title-editor
        :default-value="campaignTitle"
        class="font-size-50 font-bold-extra text-center line-height-1 mb-60"
        @change="handleChangeCampaignTitle"
      />
      <hr>
      <div class="d-flex mt-60">
        <maryoku-textarea
          :value="campaignDescription"
          :placeholder="placeholder"
          class="mr-60 flex-1"
          style="padding: 40px 60px 40px 40px"
          @input="handleChangeCampaignDescription"
        />
        <rsvp-event-info-panel class="flex-1" :event="event" />
      </div>
      <div class="mt-60 logo-section d-flex align-center justify-content-center">
        <campaign-logo
          class="d-flex justify-content-center"
          :logo-url="campaignLogoUrl"
          :show-logo="campaignData.visibleSettings.showLogo"
          @change-logo="handleChangeCampaignLogo"
          @change-show-logo="handleChangeCampaignVisibleSettings('showLogo', $event)"
        />
      </div>
    </div>
  </div>
</template>
<script>
import Swal from "sweetalert2";

// components
// global
import MaryokuTextarea   from "@/components/Inputs/MaryokuTextarea";
import ConceptImageBlock from "@/components/ConceptImageBlock";
import HideSwitch        from "@/components/HideSwitch";
// local
import CountdownTime from "./components/CountdownTime";
import TitleEditor   from "./components/TitleEditor";
import CampaignLogo  from "./components/CampaignLogo/index.vue";

// pages
import RsvpEventInfoPanel from "@/pages/app/RSVP/RSVPEventInfoPanel/index.vue";


// dependencies
import { getBase64 } from "@/utils/file.util";

export default {
  components: {
    CountdownTime,
    CampaignLogo,
    RsvpEventInfoPanel,
    ConceptImageBlock,
    MaryokuTextarea,
    TitleEditor,
    HideSwitch,
  },
  props: {
    info: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      isLaunched     : false,
      placeholder    : "It's now time to get super exited! The event of the year is almost here( and it even rhymes). What to expect? out of this world live shows amazing food refreshing cocktail bar best employee award see u soon",
      originContent  : {},
      editingContent : {
        coverImage: "",
      },
      defaultCoverImage: null,
    };
  },
  computed: {
    event() {
      return this.$store.state.event.eventData;
    },
    concept() {
      return this.event.concept || {};
    },
    campaignData() {
      return this.$store.state.campaign.COMING_SOON || {};
    },
    campaignTitle() {
      return this.campaignData.title || this.event.title;
    },
    campaignLogoUrl() {
      return this.campaignData.logoUrl || "";
    },
    coverImage() {
      return this.campaignData.coverImage || "";
    },
    campaignDescription() {
      return this.campaignData.description || "";
    },
    campaignVisibleSettings() {
      const visibleSettings = this.campaignData.visibleSettings;
      return {
        showComing    : false,
        showCountdown : false,
        showLogo      : false,
        ...visibleSettings,
      };
    }
  },
  created() {
    const defaultCoverImage = `https://static-maryoku.s3.amazonaws.com/storage/Campaign+Headers/coming-soon${
      (new Date().getDate() % 4) + 1
    }.png`;
    this.defaultCoverImage = defaultCoverImage;
    if (this.$store.state.campaign.COMING_SOON) {
      this.editingContent = this.$store.state.campaign.COMING_SOON;
      this.editingContent.coverImage = this.event.concept ? this.event.concept.images[1].url : defaultCoverImage;
    } else {
      this.editingContent.title = this.info.conceptName;
      this.editingContent.coverImage = this.event.concept ? this.event.concept.images[1].url : defaultCoverImage;
      this.$store.commit("campaign/setCampaign", {
        name: "COMING_SOON",
        data: this.editingContent,
      });
    }
  },
  methods: {
    saveData() {
      this.$store.commit("campaign/setCampaign", {
        name: "COMING_SOON",
        data: this.editingContent,
      });
    },
    setDefault() {
      Swal.fire({
        title              : "Are you sure?",
        text               : "You won't be able to revert this!",
        showCancelButton   : true,
        confirmButtonClass : "md-button md-success btn-fill",
        cancelButtonClass  : "md-button md-danger btn-fill",
        confirmButtonText  : "Yes, revert it!",
        buttonsStyling     : false,
      }).then((result) => {
        if (result.value) {
          this.editingContent = Object.assign({}, this.originContent);
        }
      });
    },
    handleChangeCampaignTitle(newTitle) {
      this.$store.commit("campaign/setAttribute", { name: "SAVING_DATE", key: "title", value: newTitle });
      this.$store.commit("campaign/setAttribute", { name: "RSVP", key: "title", value: newTitle });
      this.$store.commit("campaign/setAttribute", { name: "COMING_SOON", key: "title", value: newTitle });
      this.$store.commit("campaign/setAttribute", { name: "FEEDBACK", key: "title", value: newTitle });
    },
    handleChangeCampaignDescription(newDescription) {
      this.$store.commit("campaign/setAttribute", { name: "COMING_SOON", key: "description", value: newDescription });
    },
    handleChangeCampaignVisibleSettings(key, value) {
      const visibleSettings = this.campaignVisibleSettings;
      this.$store.commit("campaign/setAttribute", {
        name: "COMING_SOON",
        key: "visibleSettings",
        value: { ...visibleSettings, [key]: value }
      });
    },
    handleChangeCoverImage(event) {
      this.$emit("change-cover-image", event);
    },
    handleChangeCampaignLogo(event) {
      this.$emit("change-logo", event);
    },
    async onFileChange(event) {
      const imageData = await getBase64(event.target.files[0]);
      this.$store.commit("campaign/setAttribute", { name: "COMING_SOON", key: "coverImage", value: imageData });
    },
  },
};
</script>
<style lang="scss" scoped>
.coundown-campaign {
  .countdown-cover-image {
    position        : relative;
    margin-bottom   : 110px;
    min-height      : 240px;
    img {
      max-height    : 500px;
      width         : 100%;
      border-radius : 30px;
      object-fit    : cover;
    }

    .change-cover-concept {
      width  : 1000px;
      height : 350px;
    }

    .countdown-time-panel {
      position : absolute;
      left     : 0;
      right    : 0;
      bottom   : -80px;
      z-index  : 15;
    }

    .cover-image-button {
      position  : absolute;
      left      : 50%;
      top       : 50%;
      transform : translate(-50%, -50%);
      z-index   : 14;
    }

    .concept-button {
      position  : absolute;
      left      : 50%;
      top       : 50%;
      transform : translate(-50%, 10%);
      z-index   : 14;
    }
  }

  .countdown-guests {
    position         : absolute;
    right            : 50px;
    top              : 50px;
    background-color : #fff;
    border-radius    : 3px;
    z-index          : 15;
  }

  .logo-section {
    margin-left  : auto;
    margin-right : auto;
    img {
      max-width: 200px;
    }
  }
}

</style>
