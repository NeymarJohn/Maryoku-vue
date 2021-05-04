<template>
  <div class="proposal-list-item">
    <div>
      <img style="width: 40px" src="https://maryoku.s3.amazonaws.com/company/logos/5e0ae1d2cfefec4b68f5d8a1.png" />
    </div>
    <div>
      <div class="font-bold font-size-16">March Madness</div>
    </div>
    <div class="font-size-14 color-black-middle">{{getDateFormat(proposal.dateCreated)}}</div>
    <div class="font-size-14 color-black-middle">${{proposal.cost}}</div>
    <div class="font-size-14 color-black-middle">{{getDateFormat(proposal.lastUpdated)}}</div>
    <div><img class="ml-15" src="/static/icons/vendor/proposalBoard/filter-won.svg" /></div>
    <div class="font-size-14 color-black-middle">Tom</div>

   <span class="color-vendor font-size-14 font-bold cursor-pointer" @click="openProposal">
    <img src="/static/icons/vendor/proposalBoard/see-proposal.svg" class="mr-10" style="width: 20px"/>
    View Proposal
   </span>

    <div class="text-right">
      <md-menu md-size="medium" class="action-menu" :md-offset-x="240" :md-offset-y="-36" @closed="hoveredMenu = ''">
        <md-button md-menu-trigger class="edit-btn md-simple" style="height: 30px">
          <md-icon style="font-size: 40px !important">more_vert</md-icon>
        </md-button>
        <md-menu-content>
          <md-menu-item
            @click="edit"
            class="md-purple"
            @mouseenter="hoveredMenu = 'edit'"
            @mouseleave="hoveredMenu = ''"
          >
            <span>
              <img v-if="hoveredMenu !== 'edit'" :src="`${$iconURL}common/edit-dark.svg`" class="label-icon mr-10" />
              <img v-else :src="`${$iconURL}common/edit-white.svg`" class="label-icon mr-10" />
              Edit</span
            >
          </md-menu-item>
          <md-menu-item
            @click="edit"
            class="md-purple"
            @mouseenter="hoveredMenu = 'download'"
            @mouseleave="hoveredMenu = ''"
          >
            <span>
              <img v-if="hoveredMenu !== 'download'" :src="`${$iconURL}common/download.svg`" class="label-icon mr-10" />
              <img v-else :src="`${$iconURL}common/download-white.svg`" class="label-icon mr-10" />
              Download
            </span>
          </md-menu-item>
          <md-menu-item
            @click="edit"
            class="md-purple"
            @mouseenter="hoveredMenu = 'duplicate'"
            @mouseleave="hoveredMenu = ''"
          >
            <span>
              <img
                v-if="hoveredMenu !== 'duplicate'"
                :src="`${$iconURL}common/duplicate.svg`"
                class="label-icon mr-10"
              />
              <img v-else :src="`${$iconURL}common/duplicate-white.svg`" class="label-icon mr-10" />Duplicate</span
            >
          </md-menu-item>
          <md-menu-item
            @click="edit"
            class="md-purple"
            @mouseenter="hoveredMenu = 'cancel'"
            @mouseleave="hoveredMenu = ''"
          >
            <span>
              <img v-if="hoveredMenu !== 'cancel'" :src="`${$iconURL}common/trash-dark.svg`" class="label-icon mr-10" />
              <img v-else :src="`${$iconURL}common/trash-white.svg`" class="label-icon mr-10" />Cancel Event</span
            >
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
    components: {Button},
    props:{
    proposal: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      hoveredMenu: "",
    };
  },
  methods: {
    getDateFormat(date) {
      return moment(date).format('DD/MM/YYYY');
    },
    openProposal() {},
    edit() {},
  },
};
</script>
<style lang="scss" scoped>
.proposal-list-item {
  padding: 30px 40px;
  display: grid;
  align-items: center;
  grid-template-columns: 5% 20% 10% 15% 10% 10% 10% 15% 5%;
}
</style>
