<template>
  <div v-if="page === 'proposal'" class="proposal-list-item proposal" :class="hasNegotiation ? 'negotiation-item' : ''">
    <div>
      <Avartar v-if="proposal.nonMaryoku" :name="proposal.eventData.customer.companyName" :color="color" />
      <img v-else :src="`${$iconURL}group-22441.svg`" width="52px">
    </div>
    <div class="font-bold font-size-16 ml-10">
      <div v-if="proposal.nonMaryoku && proposal.eventData && proposal.eventData.customer">
        {{ proposal.eventData.customer.companyName }}
      </div>
      <div v-else-if="proposal.proposalRequest && proposal.proposalRequest.eventData.title">
        {{ proposal.proposalRequest.eventData.title }}
      </div>
      <div v-else>
        New Event
      </div>
    </div>
    <div class="font-size-14 color-black-middle">
      {{ proposal.dateCreated | date("DD/MM/YYYY") }}
    </div>
    <div class="font-size-14 color-black-middle">
      ${{ proposal.cost | withComma }}
    </div>
    <div class="font-size-14 color-black-middle">
      {{ proposal.lastUpdated | date("DD/MM/YYYY") }}
    </div>
    <div>
      <status-icon
        :last-updated="proposal.lastUpdated"
        :status="proposal.status"
      />
    </div>
    <div class="font-size-14 color-black-middle text-capitalize">
      <span
        v-if="
          proposal.proposalRequest && proposal.proposalRequest.eventData && proposal.proposalRequest.eventData.owner
        "
      >
        {{ proposal.proposalRequest.eventData.owner.name }}
      </span>
      <span v-else-if="proposal.eventData">
        {{ proposal.eventData.customer ? proposal.eventData.customer.name : "" }}
      </span>
    </div>
    <div class="proposal-graph" @click="edit(proposalStatus.engagement)">
      <img src="/static/icons/vendor/proposalBoard/proposal-statistic.svg" class="label-icon mr-10">
    </div>
    <div v-if="hasNegotiation" class="text-center">
      <md-button class="md-simple md-red md-vendor-text">
        <img :src="`${iconUrl}Group%2014277_2.svg`" class="negotiation mr-5" style="width: 15px">
        {{
          proposal.negotiations[0].type === requestType.ADD_MORE_TIME ? "Additional time request" : "Request for change"
        }}
      </md-button>
      <md-button class="md-vendor" @click="edit(proposalStatus.negotiation)">
        Respond
      </md-button>
    </div>
    <md-button v-else class="md-simple md-vendor" @click="edit(proposalStatus.show)">
      <img src="/static/icons/vendor/proposalBoard/see-proposal.svg" class="mr-5" style="width: 20px">
      View Proposal
    </md-button>

    <div class="text-right">
      <md-menu md-size="medium" class="action-menu" :md-offset-x="-300" :md-offset-y="-36" @md-opened="isOpened">
        <md-button md-menu-trigger class="edit-btn md-simple" style="height: 30px">
          <md-icon style="font-size: 30px !important">
            more_vert
          </md-icon>
        </md-button>
        <md-menu-content>
          <md-menu-item
            :class="{ 'md-gray disabled': proposal.accepted, 'md-purple': !proposal.accepted }"
            @click="edit(proposalStatus.edit)"
          >
            <span>
              <img :src="`${$iconURL}common/edit-dark.svg`" class="label-icon mr-10">
              Edit</span>
          </md-menu-item>
          <md-menu-item class="md-purple" @click="edit(proposalStatus.download)">
            <span>
              <img :src="`${$iconURL}common/download.svg`" class="label-icon mr-10">
              Download
            </span>
          </md-menu-item>
          <md-menu-item class="md-purple" @click="edit(proposalStatus.resend)">
            <span>
              <img src="/static/icons/vendor/proposal.svg" class="label-icon mr-10">
              Resend proposal
            </span>
          </md-menu-item>
          <md-menu-item class="md-purple" @click="edit(proposalStatus.cancel)">
            <span>
              <img :src="`${$iconURL}VendorsProposalPage/group-11314.svg`" class="label-icon mr-10">
              Cancel proposal
            </span>
          </md-menu-item>
          <md-menu-item v-if="proposal.nonMaryoku" class="md-purple" @click="edit(proposalStatus.share)">
            <span>
              <img :src="`${$iconURL}Share/link-dark.svg`" class="label-icon mr-10">
              Copy Link
            </span>
          </md-menu-item>
        </md-menu-content>
      </md-menu>
    </div>
  </div>
  <div v-else class="proposal-list-item customer ml-40">
    <div class="font-size-14">
      {{ proposal.id }}
    </div>
    <div class="font-size-14 color-black-middle">
      {{ proposal.dateCreated | date("DD/MM/YYYY") }}
    </div>
    <div>
      <div v-if="proposal.nonMaryoku && proposal.eventData" class="font-bold font-size-16">
        {{ "New Event" }}
      </div>
      <div
        v-else-if="proposal.proposalRequest && proposal.proposalRequest.eventData.title"
        class="font-bold font-size-16"
      >
        {{ proposal.proposalRequest.eventData.title }}
      </div>
      <div v-else class="font-bold font-size-16">
        New Event
      </div>
    </div>
    <div>
      <status-icon
        :last-updated="proposal.lastUpdated"
        :status="proposal.status"
      />
    </div>
    <div class="font-size-14 color-black-middle">
      ${{ proposal.cost | withComma }}
    </div>
    <div class="font-size-14 color-black-middle text-capitalize">
      <span v-if="proposal.proposalRequest && proposal.proposalRequest.eventData">
        {{ proposal.proposalRequest.eventData.owner.name }}
      </span>
      <span v-else-if="proposal.eventData">
        {{ proposal.eventData.customer ? proposal.eventData.customer.name : "" }}
      </span>
    </div>
    <div class="text-right">
      <md-menu md-size="medium" class="action-menu" :md-offset-x="-300" :md-offset-y="-36" @md-opened="isOpened">
        <md-button md-menu-trigger class="edit-btn md-simple" style="height: 30px">
          <md-icon style="font-size: 30px !important">
            more_vert
          </md-icon>
        </md-button>
        <md-menu-content>
          <md-menu-item class="md-purple" @click="edit(proposalStatus.show)">
            <span>
              <img src="/static/icons/vendor/proposalBoard/see-proposal-black.svg" class="label-icon mr-10">
              See Proposal</span>
          </md-menu-item>
          <md-menu-item class="md-purple" @click="edit(proposalStatus.download)">
            <span>
              <img :src="`${$iconURL}common/download.svg`" class="label-icon mr-10">
              Download
            </span>
          </md-menu-item>
          <md-menu-item class="md-purple" @click="edit(proposalStatus.duplicate)">
            <span>
              <img :src="`${$iconURL}VendorsProposalPage/group-11314.svg`" class="label-icon mr-10"> Duplicate
            </span>
          </md-menu-item>
        </md-menu-content>
      </md-menu>
    </div>
  </div>
</template>
<script>
// components
import Avartar from "@/components/Avartar.vue";
import StatusIcon from "./StatusIcon";

export default {
  components: {
    Avartar,
    StatusIcon,
  },
  props: {
    proposal: {
      type     : Object,
      required : true,
    },
    page: {
      type     : String,
      default  : "proposal",
    },
    hasNegotiation: {
      type     : Boolean,
      default  : false,
    },
    color: {
      type     : String,
      default  : "#ff0066",
    },
  },
  data() {
    return {
      iconUrl: `${this.$iconURL}VendorsProposalPage/`,
      proposalStatus: {
        show        : 0,
        edit        : 1,
        download    : 2,
        delete      : 3,
        share       : 4,
        negotiation : 5,
        duplicate   : 6,
        resend      : 7,
        cancel      : 8,
        engagement  : 9,
      },
      requestType: {
        ADD_MORE_TIME : 0,
        NEGOTIATION   : 1,
      },
    };
  },
  watch: {
    proposal(newVal) {},
  },
  mounted() {
    // console.log("mounted", this.proposal);
  },
  methods: {
    edit(action) {
      if (this.proposal.accepted && action === this.proposalStatus.edit) return;
      this.$emit("action", action, this.proposal.id);
    },
    leave(item) {
      console.log("leave", item);
    },
    isOpened() {
      setTimeout(_ => {
        $("li.md-list-item").each(function(idx, el) {
          let disabled = $(el).hasClass("disabled");

          if (disabled)
            $(el)
              .find("img")
              .attr("style", "filter:brightness(0) invert(50%)");
          $(el).hover(
            function() {
              if (!disabled)
                $(this)
                  .find("img")
                  .attr("style", "filter:brightness(0) invert(1)");
            },
            function() {
              if (!disabled)
                $(this)
                  .find("img")
                  .attr("style", "filter:brightness(0) invert(0)");
            },
          );
        });
      }, 0);
    },
  },
};
</script>
<style lang="scss" scoped>
.proposal-graph {
  position: relative;
  &::after {
    position: absolute;
    top: 0;
    right: -5px;
    content: "";
    width: 1px;
    height: 27px;
    background-color: #707070;
  }
}
.proposal-list-item {
  display: grid;
  align-items: center;

  &.proposal {
    padding: 32px 40px;
    grid-template-columns: 5% 20% 10% 15% 10% 10% 10% 3% 12% 5%;
  }
  &.customer {
    background-color: rgba(255, 255, 255, 0.64);
    padding: 16px 20px;
    grid-template-columns: 20% 10% 20% 10% 15% 15% 10%;
  }

  &.negotiation-item {
    background-color: #ffefff !important;
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
