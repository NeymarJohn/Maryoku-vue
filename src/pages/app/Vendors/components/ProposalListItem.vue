<template>
  <div class="proposal-list-item" :class="hasNegotiation ? 'negotiation-item' : ''">
    <div>
      <img v-if="proposal.nonMaryoku" :src="`${$storageURL}maryoku - logo square white@2x.png`" width="50">
      <img v-else src="https://maryoku.s3.amazonaws.com/company/logos/5e0ae1d2cfefec4b68f5d8a1.png" width="40"/>
    </div>
    <div>
      <div class="font-bold font-size-16" v-if="proposal.nonMaryoku && proposal.eventData && proposal.eventData.customer">
        {{ proposal.eventData.customer.company }}
      </div>
      <div class="font-bold font-size-16" v-else-if="proposal.proposalRequest && proposal.proposalRequest.eventData.title">
        {{ proposal.proposalRequest.eventData.title }}
      </div>
      <div class="font-bold font-size-16" v-else>New Event</div>
    </div>
    <div class="font-size-14 color-black-middle">{{ proposal.dateCreated | date("DD/MM/YYYY") }}</div>
    <div class="font-size-14 color-black-middle">${{ proposal.cost | withComma }}</div>
    <div class="font-size-14 color-black-middle">{{ proposal.lastUpdated | date("DD/MM/YYYY") }}</div>
    <div><img class="ml-15" :src="getStatusIcon(proposal.status)" /></div>
    <div class="font-size-14 color-black-middle text-capitalize">
      <span v-if="proposal.proposalRequest && proposal.proposalRequest.eventData">
        {{ proposal.proposalRequest.eventData.owner.displayName }}
      </span>
      <span v-else-if="proposal.eventData">
        {{ proposal.eventData.customer ? proposal.eventData.customer.name : "" }}
      </span>
    </div>

    <div class="text-center" v-if="hasNegotiation">
      <md-button class="md-simple md-red md-vendor-text">
        <img :src="`${iconUrl}Group%2014277_2.svg`" class="negotiation mr-5" style="width: 15px" />
          {{proposal.negotiations[0].type === requestType.ADD_MORE_TIME ? 'Additional time request' : 'Negotiation Request'}}
      </md-button>
      <md-button class="md-vendor" @click="edit(proposalStatus.negotiation)"> Respond </md-button>
    </div>
    <md-button v-else class="md-simple md-vendor" @click="edit(proposalStatus.show)">
      <img src="/static/icons/vendor/proposalBoard/see-proposal.svg" class="mr-5" style="width: 20px" />
      View Proposal
    </md-button>

    <div class="text-right">
      <md-menu md-size="medium" class="action-menu" :md-offset-x="-300" :md-offset-y="-36" @md-opened="isOpened">
        <md-button md-menu-trigger class="edit-btn md-simple" style="height: 30px">
          <md-icon style="font-size: 30px !important">more_vert</md-icon>
        </md-button>
        <md-menu-content>
          <md-menu-item @click="edit(proposalStatus.edit)" class="md-purple">
            <span>
              <img :src="`${$iconURL}common/edit-dark.svg`" class="label-icon mr-10" />
              Edit</span
            >
          </md-menu-item>
          <md-menu-item @click="edit(proposalStatus.download)" class="md-purple">
            <span>
              <img :src="`${$iconURL}common/download.svg`" class="label-icon mr-10" />
              Download
            </span>
          </md-menu-item>
          <md-menu-item @click="edit(proposalStatus.delete)" class="md-purple">
            <span>
              <img :src="`${$iconURL}VendorsProposalPage/group-11314.svg`" class="label-icon mr-10" /> Delete Proposal
            </span>
          </md-menu-item>
        </md-menu-content>
      </md-menu>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import Button from "../../../../components/Button/ButtonDiv";

export default {
  components: { Button },
  props: {
    proposal: {
      type: Object,
      required: true,
    },
    hasNegotiation: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      iconUrl: `${this.$iconURL}VendorsProposalPage/`,
      proposalStatus:{
        show: 0,
        edit: 1,
        download: 2,
        delete: 3,
        negotiation: 4,
      },
      requestType: {
        ADD_MORE_TIME: 0,
        NEGOTIATION: 1,
      }
    };
  },
  methods: {
    getStatusIcon(status) {
      let path = "/static/icons/vendor/proposalBoard/";
      if (status == "submit") {
        return `${path}filter-pending.svg`;
      } else if (status == "top") {
        return `${path}filter-top3.svg`;
      } else if (status == "lost") {
        return `${path}filter-reject.svg`;
      } else {
        return `${path}filter-${status}.svg`;
      }
    },
    edit(action) {
      this.$emit("action", action, this.proposal.id);
    },
    leave(item) {
      console.log("leave", item);
    },
    isOpened() {
      setTimeout((_) => {
        $("li.md-list-item").hover(
          function (el) {
            $(this).find("img").attr("style", "filter:brightness(0) invert(1)");
          },
          function () {
            $(this).find("img").attr("style", "filter:brightness(0) invert(0)");
          },
        );
      }, 0);
    },
  },
};
</script>
<style lang="scss" scoped>
.proposal-list-item {
  padding: 32px 40px;
  display: grid;
  align-items: center;
  grid-template-columns: 5% 20% 10% 15% 10% 10% 10% 15% 5%;

  &.negotiation-item{
    background-color: #ffefff!important;
  }
}
img.negotiation {
  position: relative;

  &:before {
    content: "\A";
    position: absolute;
    left: 0;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #f51355 !important;
    display: inline-block;
  }
}
/deep/ .md-menu-content .md-list {
  padding: 0 !important;
}
</style>
