<template>
  <div class="for-proposal-wrapper">
    <div class="md-layout justify-content-between">
      <div class="md-layout-item md-size-70">
        <proposal-steps :eventCategory="vendor.eventCategory" :step="step" :vendor="vendor" />
        <div class="step-wrapper" v-if="step == 0">
          <proposal-wizard-step-0 class="mt-20"></proposal-wizard-step-0>
        </div>
        <div class="step-wrapper" v-if="step == 1">
          <proposal-event-vision :event="event"></proposal-event-vision>
          <!-- <proposal-additional-requirement></proposal-additional-requirement> -->
        </div>
        <div class="step-wrapper" v-if="step == 2">
          <proposal-wizard-step-2></proposal-wizard-step-2>
        </div>
        <div class="step-wrapper" v-if="step == 3">
          <proposal-wizard-step-3 :title="`Event Information & Details`" :isEdit="false" :iconUrl="iconUrl" />
        </div>
      </div>
      <div class="md-layout-item md-size-30 pos-relative">
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
import { businessCategories, categoryNameWithIcons } from "@/constants/vendor";
import MaryokuTextarea from "@/components/Inputs/MaryokuTextarea";

//COMPONENTS
import ProposalBudgetSummary from "./ProposalBudgetSummary.vue";
import ProposalRequirementsPanel from "./ProposalRequirementsPanel";
import ProposalSteps from "./ProposalSteps.vue";
import ProposalItem from "./ProposalItem.vue";
import ProposalEventVision from "./ProposalEventVision.vue";
import ProposalBidContent from "./ProposalBidContent.vue";
import ProposalAddFiles from "./ProposalAddFiles.vue";
import ProposalTitleWithIcon from "./ProposalTitleWithIcon.vue";
import ProposalItemSecondaryService from "./ProposalItemSecondaryService";
import ProposalAdditionalRequirement from "./ProposalAddtionalRequirement";
import S3Service from "@/services/s3.service";
import ProposalWizardStep0 from "./ProposalWizardStep0";
import ProposalWizardStep2 from "./ProposalWizardStep2";
import ProposalWizardStep3 from "./ProposalWizardStep3";
import Loader from "@/components/loader/index";
export default {
  components: {
    Loader,
    ProposalBudgetSummary,
    ProposalItem,
    ProposalSteps,
    ProposalAddFiles,
    ProposalTitleWithIcon,
    ProposalEventVision,
    ProposalItemSecondaryService,
    ProposalAdditionalRequirement,
    ProposalBidContent,
    ProposalRequirementsPanel,
    MaryokuTextarea,
    ProposalWizardStep0,
    ProposalWizardStep2,
    ProposalWizardStep3,
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
    this.$root.$on("update-inspirational-photo", ({ file, index, link, url, fileName }) => {
      const currentPhoto = this.$store.state.proposalForNonMaryoku.inspirationalPhotos[index];
      this.$store.commit("proposalForNonMaryoku/setInspirationalPhoto", { index, photo: { ...currentPhoto, url } });
      S3Service.fileUpload(file, fileName, link)
        .then((res) => {})
        .catch((event) => {});
    });
  },
  methods: {
    selectSecondCategory(serviceCategory) {
      this.$store.commit("proposalForNonMaryoku/setValue", { key: "currentSecondaryService", value: serviceCategory });
    },
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
        return this.$store.state.proposalForNonMaryoku.personalMessage;
      },
      set(value) {
        this.$store.commit("proposalForNonMaryoku/setValue", { key: "personalMessage", value });
      },
    },
    vendor() {
      return this.$store.state.proposalForNonMaryoku.vendor;
    },
    proposalRequest() {
      return this.$store.state.proposalForNonMaryoku.proposalRequest;
    },
    event() {
      if (!this.proposalRequest) return {};
      return this.proposalRequest.eventData;
    },
    step() {
      return this.$store.state.proposalForNonMaryoku.wizardStep;
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
