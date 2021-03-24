<template>
  <div class="for-proposal-wrapper">
    <vue-element-loading
      v-if="!event || !vendor || !proposalRequest"
      :active="!event || !vendor || !proposalRequest"
      spinner="ring"
      color="#FF547C"
    />
    <div class="md-layout justify-content-between" v-else>
      <div class="md-layout-item md-size-70">
        <proposal-steps
          :eventCategory="vendor.eventCategory"
          :step="step"
          :hasVisionStep="!!event && !!event.concept"
          :vendor="vendor"
          :proposalRequest="proposalRequest"
        />
        <div class="step-wrapper" v-if="step == 0">
          <div class="proposal-add-personal-message-wrapper">
            <h3><img :src="`${iconUrl}Asset 611.svg`" />Let's begin with a personal message</h3>
            <h4>Write something nice, we'll add it to the final proposal</h4>
            <maryoku-textarea
              class="width-100"
              size="small"
              rows="6"
              v-model="personalMessage"
              v-if="proposalRequest"
            ></maryoku-textarea>
            <span>Sincerely,</span>
            <p>{{ vendor.companyName }}</p>
          </div>
          <proposal-event-vision :event="event"></proposal-event-vision>
          <proposal-additional-requirement></proposal-additional-requirement>
        </div>
        <div class="step-wrapper" v-if="step == 1">
          <proposal-bid-content></proposal-bid-content>
        </div>
        <div class="step-wrapper" v-if="step == 2">
          <h3>Can you also provide any of these services for this event?</h3>
          <p>
            <img :src="`${iconUrl}Group 5280 (5).svg`" />
            Did you know? Referring us to vendors for these services can get you a commission get!
          </p>
          <proposal-item-secondary-service
            v-for="(service, index) in extraServices"
            :key="index"
            :category="service.title"
            :services="servicesByCategory(service.componentId)"
            :isCollapsed="true"
            :isDropdown="true"
            :proposalRange="true"
            :img="`${$iconURL}Budget Elements/${service.icon}`"
            :proposalRequest="proposalRequest"
            :service="service"
          />

          <refer-new-vendor :event="event" :vendor="vendor" />
        </div>
        <div class="step-wrapper" v-if="step == 3">
          <proposal-event-summary
            :title="`Event Information & Details`"
            :eventData="event"
            :isEdit="false"
            :iconUrl="iconUrl"
            :personalMessage="proposalRequest.personalMessage"
            :proposalRequest="proposalRequest"
            :services="services"
          />
        </div>
      </div>
      <div class="md-layout-item md-size-30 pos-relative">
        <proposal-requirements-panel class="requirements-panel" v-if="step !== 3"></proposal-requirements-panel>
        <proposal-budget-summary
          :bundleDiscount="true"
          :warning="true"
          :additional="true"
          :isEdit="true"
          :step="step"
          :services="services"
          v-if="step >= 1"
        />
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { businessCategories, categoryNameWithIcons } from "@/constants/vendor";
import MaryokuTextarea from "@/components/Inputs/MaryokuTextarea";

//COMPONENTS
import Icon from "@/components/Icon/Icon.vue";
import ProposalBudgetSummary from "./ProposalBudgetSummary.vue";
import ProposalRequirementsPanel from "./ProposalRequirementsPanel";
import ProposalSteps from "./ProposalSteps.vue";
import ProposalItem from "./ProposalItem.vue";
import ProposalEventVision from "./ProposalEventVision.vue";
import ProposalBidContent from "./ProposalBidContent.vue";
import ProposalAddFiles from "./ProposalAddFiles.vue";
import ProposalTitleWithIcon from "./ProposalTitleWithIcon.vue";
import ReferNewVendor from "../components/ReferNewVendor.vue";
import ProposalEventSummary from "./ProposalEventSummary.vue";
import VueElementLoading from "vue-element-loading";
import ProposalItemSecondaryService from "./ProposalItemSecondaryService";
import ProposalAdditionalRequirement from "./ProposalAddtionalRequirement";
import S3Service from "@/services/s3.service";
export default {
  components: {
    VueElementLoading,
    ProposalBudgetSummary,
    ProposalItem,
    ProposalSteps,
    ProposalAddFiles,
    ProposalTitleWithIcon,
    ProposalEventSummary,
    ReferNewVendor,
    ProposalEventVision,
    ProposalItemSecondaryService,
    ProposalAdditionalRequirement,
    ProposalBidContent,
    ProposalRequirementsPanel,
    MaryokuTextarea,
  },
  data() {
    return {
      iconUrl: "https://static-maryoku.s3.amazonaws.com/storage/icons/NewSubmitPorposal/",
      services: null,
      iconsWithCategory: null,
      isLoading: false,
      markedDates: [],
    };
  },
  created() {},
  mounted() {
    this.services = Object.assign([], businessCategories);
    this.iconsWithCategory = Object.assign([], categoryNameWithIcons);
    this.$store.dispatch("common/fetchAllCategories");

    // handling uploading photo backhand process
    this.$root.$on("update-inspirational-photo", ({ file, index, link, url }) => {
      const currentPhoto = this.$store.state.vendorProposal.inspirationalPhotos[index];
      this.$store.commit("vendorProposal/setInspirationalPhoto", { index, photo: { ...currentPhoto, url } });
      S3Service.fileUpload(file, `photo-${index}`, link)
        .then((res) => {})
        .catch((event) => {});
    });
  },
  methods: {
    flatDeep(arr, d = 1) {
      return d > 0
        ? arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? this.flatDeep(val, d - 1) : val), [])
        : arr.slice();
    },
    servicesByCategory(category) {
      const services = this.services.filter((s) => s.name == category);

      if (services.length > 0) {
        return this.flatDeep(
          services[0].categories.map((s) => s.subCategories.map((sc) => sc.items.map((dd) => dd.name))),
          Infinity,
        );
      } else {
        return [];
      }
    },
  },
  filters: {},
  computed: {
    extraServices() {
      return this.event.components.filter(
        (item) => item.componentId !== this.vendor.vendorCategory && item.componentId !== "unexpected",
      );
    },
    personalMessage: {
      get() {
        return this.$store.state.vendorProposal.personalMessage;
      },
      set(value) {
        this.$store.commit("vendorProposal/setValue", { key: "personalMessage", value });
      },
    },
    vendor() {
      return this.$store.state.vendorProposal.vendor;
    },
    proposalRequest() {
      return this.$store.state.vendorProposal.proposalRequest;
    },
    event() {
      if (!this.proposalRequest) return {};
      return this.proposalRequest.eventData;
    },
    step() {
      return this.$store.state.vendorProposal.wizardStep;
    },
  },
};
</script>
<style lang="scss" scoped>
.for-proposal-wrapper {
  background-color: #f5f5f5;
  padding: 64px 45px;
  color: #050505;

  .step-wrapper {
    .proposal-add-personal-message-wrapper {
      border-radius: 3px;
      box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);
      background-color: #ffffff;
      margin-top: 20px;
      padding: 40px 40px 40px 34px;
      font-family: "Manrope-Regular", sans-serif;
      color: #050505;

      h3 {
        font-weight: 800;
        font-size: 30px;
        margin: 0 0 35px 0 !important;

        img {
          width: 26px;
          margin-right: 15px;
        }
      }

      h4 {
        font-size: 16px;
        font-weight: 800;
        margin: 0;
        margin-bottom: 12px;
      }

      textarea {
        width: 100%;
        resize: none;
        font-size: 16px;
        border-radius: 3px;
        border: solid 0.5px #707070;
        padding: 21px 18px;
        margin-bottom: 15px;
      }
      span {
        font-size: 14px;
      }
      p {
        font-size: 14px;
        font-weight: 800;
        text-decoration: underline;
        margin: 0;
      }
    }
    h3 {
      font-size: 30px;
      font-weight: 800;
      margin-top: 2em;
      margin-bottom: 0.5em;
    }
    p {
      font-size: 14px;
      font-weight: normal;
      margin: 0;

      img {
        width: 27px;
        margin-right: 15px;
      }
    }
  }
  .pos-relative {
    position: relative;
  }
  .requirements-panel {
    margin-bottom: 20px;
  }
}
</style>
