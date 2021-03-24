<template>
  <div class="proposal-list-item">
    <div>
      <img style="width: 40px" src="https://maryoku.s3.amazonaws.com/company/logos/5e0ae1d2cfefec4b68f5d8a1.png" />
    </div>
    <div>
      <div>Microsoft</div>
      <div class="font-bold font-size-20 mt-5">March Madness</div>
      <div class="font-bold font-size-22 mt-5">23/12/20</div>
    </div>
    <div>23/12/20</div>
    <div><img src="/static/icons/vendor/proposalBoard/filter-won.svg" /></div>
    <div></div>
    <div>
      <span class="color-vendor font-bold cursor-pointer" @click="openProposal">
        <img src="/static/icons/vendor/proposalBoard/see-proposal.svg" class="mr-10" />See Proposal</span
      >
    </div>
    <div class="text-right">
      <md-menu md-size="medium" :md-offset-x="240" :md-offset-y="-36" class="action-menu">
        <md-button md-menu-trigger class="edit-btn md-simple" style="height: 40px">
          <md-icon style="font-size: 40px !important">more_vert</md-icon>
        </md-button>
        <md-menu-content>
          <md-menu-item @click="edit" class="md-purple">
            <span> <img :src="`${$iconURL}common/edit-dark.svg`" class="label-icon mr-10" />Make Changes</span>
          </md-menu-item>
          <md-menu-item @click="edit" class="md-purple">
            <span> <img :src="`${$iconURL}common/download.svg`" class="label-icon mr-10" />Download</span>
          </md-menu-item>
          <md-menu-item @click="edit" class="md-purple">
            <span> <img :src="`${$iconURL}common/duplicate.svg`" class="label-icon mr-10" />Duplicate</span>
          </md-menu-item>
          <md-menu-item @click="edit" class="md-purple">
            <span> <img :src="`${$iconURL}common/trash-dark.svg`" class="label-icon mr-10" />Cancel Event</span>
          </md-menu-item>
        </md-menu-content>
      </md-menu>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    openProposal() {},
    edit() {},
  },
};
</script>
<style lang="scss" scoped>
.proposal-list-item {
  display: flex;
  padding: 30px 40px;
  display: grid;
  align-items: center;
  grid-template-columns: 100px 20% 20% auto 20% 15% 50px;
}
</style>