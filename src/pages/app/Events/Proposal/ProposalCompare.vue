<template>
  <div class="event-proposal-comparison-panel booking-section">
    <vue-element-loading :active="isLoading" spinner="ring" color="#FF547C" background-color="#eee" />
    <comment-editor-panel v-if="showCommentEditorPanel"></comment-editor-panel>
    <div class="event-page-header md-layout-item md-size-100">
      <div class="header-title">
        <h3>
          <img
            :src="`${$iconURL}Budget+Elements/${selectedBlock.componentId}.svg`"
            style="width: 30px; margin-right: 0.5em"
          />
          {{ selectedBlock.bookTitle }}
        </h3>
      </div>
      <header-actions @toggleCommentMode="toggleCommentMode" hideDownload></header-actions>
    </div>
    <div class="booking-header md-layout-item md-size-100">
      <div class="header-title w-100">
        <div class="font-size-22 mb-20">Hey {{ $store.state.auth.user.name }}</div>
      </div>
      <div class="d-flex justify-content-between">
        <div>
          We found the top proposals for your event, <br />
          Book now before it’s too late
        </div>
        <div class="header-actions">
          <span class="seperator"></span>
          <md-button class="md-simple normal-btn md-red">
            <md-icon>edit</md-icon>
            Change Requirements
          </md-button>
        </div>
      </div>
    </div>
    <div class="compare-content white-card">
      <div class="grid-row">
        <div class="grid-cell comparing-name font-bold-extra">A comparision of the the three venus</div>
        <div class="grid-cell" v-for="proposal in proposals" :key="`name-${proposal.id}`">
          <div><img :src="proposal.vendor.images[0]" /></div>
          <div class="font-size-20 font-bold mt-20 mb-20">{{ proposal.vendor.companyName }}</div>
          <md-button class="md-red maryoku-btn width-100">Details & Booking</md-button>
        </div>
      </div>
      <div class="grid-row">
        <div class="grid-cell comparing-name font-bold-extra">Price</div>
        <div class="grid-cell text-center" v-for="proposal in proposals" :key="`name-${proposal.id}`">
          <div>${{ proposal.cost | withComma }}</div>
          <div>${{ selectedBlock.allocatedBudget - proposal.cost }} Less than original budget</div>
        </div>
      </div>
      <div class="grid-row">
        <div class="grid-cell comparing-name font-bold-extra">Match</div>
        <div
          class="grid-cell color-red text-center font-size-30 font-bold"
          v-for="proposal in proposals"
          :key="`name-${proposal.id}`"
        >
          80%
        </div>
      </div>
      <div class="section-header comparing-name font-bold-extra">All 3 Proposals Include:</div>
      <div
        class="grid-row"
        v-for="service in commonIncludedServices"
        :key="`common-service-${service.requirementTitle}`"
      >
        <div class="grid-cell comparing-name">{{ service.requirementTitle }}</div>
        <div
          class="grid-cell color-red text-center font-size-30 font-bold"
          v-for="proposal in proposals"
          :key="`check-${proposal.id}`"
        >
          <div class="grid-cell"><img src="/static/icons/vendor/proposalBoard/filter-won.svg" /></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import EventComponent from "@/models/EventComponent";
import Proposal from "@/models/Proposal";
import VueElementLoading from "vue-element-loading";
import _ from "underscore";
import HeaderActions from "@/components/HeaderActions";
import CommentEditorPanel from "../components/CommentEditorPanel";
export default {
  name: "event-block-comparison",
  components: {
    VueElementLoading,
    CommentEditorPanel,
    HeaderActions,
  },
  data() {
    return {
      isLoading: false,
      showCommentEditorPanel: false,
      proposals: [],
      selectedBlock: null,
      commonIncludedServices: [],
    };
  },
  created() {
    this.selectedBlock = _.findWhere(this.categoryList, {
      id: this.$route.params.blockId,
    });
    new Proposal()
      .for(new EventComponent({ id: this.$route.params.blockId }))
      .get()
      .then((result) => {
        this.proposals = result;
        this.commonIncludedServices = [];
        this.proposals[0].includedServices[this.selectedBlock.componentId].forEach((service) => {
          console.log("service", service);
          console.log(
            "object",
            this.proposals.every((proposal) => {
              return (
                proposal.includedServices[this.selectedBlock.componentId].findIndex(
                  (item) => item.requirementTitle == service.requirementTitle,
                ) >= 0
              );
            }),
          );
          if (
            this.proposals.every((proposal) => {
              return (
                proposal.includedServices[this.selectedBlock.componentId].findIndex(
                  (item) => item.requirementTitle == service.requirementTitle,
                ) >= 0
              );
            })
          ) {
            this.commonIncludedServices.push(service);
          }
        });
      });
  },
  methods: {
    toggleCommentMode(mode) {
      this.showCommentEditorPanel = mode;
    },
  },
  computed: {
    categoryList() {
      return this.$store.state.event.eventData.components;
    },
    // expiredTime() {
    //   return this.currentRequirement.expiredBusinessTime;
    // },
  },
};
</script>
<style lang="scss" scoped>
.event-proposal-comparison-panel {
  .compare-content {
    margin: 0 3rem;
    .grid-row {
      display: grid;
      grid-template-columns: auto repeat(3, 27%);
      border-bottom: solid 1px #cfcfcf;
      .grid-cell {
        padding: 15px 25px;
        &:not(:last-child) {
          border-right: solid 1px #cfcfcf;
        }
        &.comparing-name {
          font-size: 20px;
          padding: 30px 50px;
        }
      }
    }
    .section-header {
      background: #f8f8f8;
      border-bottom: solid 1px #cfcfcf;
      padding: 30px 50px;
      font-size: 20px;
    }
  }
}
</style>
