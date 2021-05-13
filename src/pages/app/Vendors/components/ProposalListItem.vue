<template>
  <div class="proposal-list-item">
    <div>
      <img style="width: 40px" src="https://maryoku.s3.amazonaws.com/company/logos/5e0ae1d2cfefec4b68f5d8a1.png" />
    </div>
    <div>
      <div class="font-bold font-size-16">{{proposal.proposalRequest.eventData.title}}</div>
<!--      <div class="font-bold font-size-16">{{'March Madness'}}</div>-->
    </div>
    <div class="font-size-14 color-black-middle">{{proposal.dateCreated | date('DD/MM/YYYY')}}</div>
    <div class="font-size-14 color-black-middle">${{proposal.cost}}</div>
    <div class="font-size-14 color-black-middle">{{proposal.lastUpdated | date('DD/MM/YYYY')}}</div>
    <div><img class="ml-15" :src="getStatusIcon(proposal.status)" /></div>
    <div class="font-size-14 color-black-middle">Tom</div>

    <md-button class="md-simple md-vendor" @click="edit('show')">
      <img src="/static/icons/vendor/proposalBoard/see-proposal.svg" class="mr-5" style="width: 20px" />
      View Proposal
    </md-button>

    <div class="text-right">
      <md-menu md-size="medium" class="action-menu" :md-offset-x="240" :md-offset-y="-36" @closed="hoveredMenu = ''">
        <md-button md-menu-trigger class="edit-btn md-simple" style="height: 30px">
          <md-icon style="font-size: 30px !important">more_vert</md-icon>
        </md-button>
        <md-menu-content>
          <md-menu-item
            @click="edit('edit')"
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
            @click="edit('download')"
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
            @click="edit('duplicate')"
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
            @click="edit('cancel')"
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
    getStatusIcon(status){
        let path = '/static/icons/vendor/proposalBoard/';
        if (status == 'submit') {
            return `${path}filter-pending.svg`;
        } else if (status == 'top') {
            return `${path}filter-top3.svg`;
        } else if (status == 'lost') {
            return `${path}filter-reject.svg`;
        } else {
            return `${path}filter-${status}.svg`;
        }
    },
    edit(action) {
      if (action === 'show' || action === 'download' || action === 'duplicate' || action === 'cancel') {
        this.$emit('action', action, this.proposal.id);
      } else if (action === 'edit') {
        this.$router.push(`/vendors/${this.proposal.vendor.id}/proposal-request/${this.proposal.proposalRequest.id}/form`);
      }
    },
    leave(item){
      console.log('leave', item);
    }
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
/deep/ .md-menu-content .md-list{
    padding: 0 !important;
}
</style>
