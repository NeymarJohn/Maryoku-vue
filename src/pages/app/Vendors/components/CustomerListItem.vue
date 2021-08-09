<template>
  <div class="customer-list-item">
    <div class="customer-mark font-size-24 font-bold-extra mb-1">F</div>

    <div v-for="proposal in customer.proposals" class="proposal-list-item white-card">
        <div class="avatar bg-white color-blue mr-40">
            Mt
        </div>

        <div>
            <div class="font-bold font-size-16">{{'Frog Design'}}</div>
        </div>
        <div class="font-size-14 color-black-middle">{{'12-3456789'}}</div>
        <div class="font-size-14 color-black-middle">${{0}}</div>
        <div class="font-size-14 color-black-middle text-capitalize">{{customer.name}}</div>
        <div class="font-size-14 color-black-middle">0</div>
        <div>
            <img :src="`${$iconURL}Group 19780.svg`"/>
        </div>

        <div class="d-flex align-center text-right">
            <img :src="`${$iconURL}Group 19190.svg`" class="mr-10">
            <md-menu md-size="medium" class="action-menu" :md-offset-x="-300" :md-offset-y="-36" @md-opened="isOpened">
                <md-button md-menu-trigger class="edit-btn md-simple" style="height: 30px">
                    <img :src="`${$iconURL}Group 19186.svg`"/>
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
  </div>
</template>
<script>
import moment from "moment";
import Button from "../../../../components/Button/ButtonDiv";

export default {
  components: { Button },
  props: {
    customer: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      iconUrl: `${this.$iconURL}VendorsProposalPage/`,
      customerStatus:{
        show: 0,
        edit: 1,
        download: 2,
        delete: 3,
        negotiation: 4,
      },
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
.customer-list-item{

}
.proposal-list-item {
  padding: 32px 40px;
  display: grid;
  align-items: center;
  grid-template-columns: 7% 15% 15% 15% 15% 15% 10% 8%;

}
.avatar{
    width: 50px;
    min-width: 50px;
    height: 50px;
    margin: auto;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    position: relative;
    border-radius: 40px;
    transition: .4s cubic-bezier(.4,0,.2,1);
    transition-property: color,background-color;
    will-change: color,background-color;
    font-size: 22px;
    font-weight: 600;
    letter-spacing: normal;
    vertical-align: middle;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, .2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, .12);
}
.customer-mark:after{
    content:"";
    display: inline-block;
    height: 0.5em;
    vertical-align: bottom;
    width: 97%;
    margin-right: -95%;
    margin-left: 10px;
    border-top: 1px solid #707070;
}
/deep/ .md-menu-content .md-list {
  padding: 0 !important;
}
</style>
