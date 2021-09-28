<template>
  <div class="d-flex align-center" style="background-color: #ffedb7">
    <div class="d-flex align-center py-20 font-size-16 text-center cursor-pointer w-min-250 color-black-middle border-right"
         :class="{'selected': selected === -1}"
         @click="select(-1)">
        <img src="/static/icons/vendor/proposal.svg" width="20px" class="mr-10">
        Original
    </div>
    <div v-for="(version, idx) in versions"
         class="d-flex align-center cursor-pointer text-center py-20 font-size-16 text-center w-min-250 color-black-middle border-right"
         :class="{'selected': selected === idx}"
         @click="select(idx)">
        <img src="/static/icons/vendor/proposal.svg" width="20px" class="mr-10">
        {{version.name}}
        <md-button class="md-simple md-icon-button ml-10">
            <img :src="`${$iconURL}common/edit-dark.svg`" width="20px">
        </md-button>
    </div>
    <div class="d-flex font-size-16 py-20 pl-30 w-min-180 cursor-pointer" @click="saveVersion" style="color: #641856;">
        <md-icon class="mr-10" style="color: #641856">add</md-icon>
        Add New Version</div>
  </div>
</template>
<script>
import moment from 'moment';
import Button from "../../../../components/Button/Button";
export default {
  name: "proposal-versions-bar",
  components: {Button},
  props: {
  },
  data() {
    return {
        versionFields: [
            'costServices',
            'includedServices',
            'extraServices',
            'discounts',
            'taxes',
            'inspirationalPhotos',
            'additionalServices',
            'bundleDiscount',
            'attachments',
            'personalMessage',
            'coverImage',
        ]
    };
  },
  methods: {
    select(index){
      console.log(this.versions);
      this.$store.commit('vendorProposal/selectVersion', index);
    },
    saveVersion(){
      let data = {};
      this.versionFields.map(key => {
          data[key] = this.$store.state.vendorProposal.original[key];
      });

      let version = {
          name: `Ver${this.versions.length + 1}-${moment().format("DD/MM/YYYY")}`,
          data,
      }
      this.$store.dispatch('vendorProposal/saveVersion', version);
    }
  },
  computed: {
    versions() {
      return this.$store.state.vendorProposal.versions;
    },
    selected() {
      return this.$store.state.vendorProposal.currentVersion;
    }
  },
  watch: {
    versions(newVal){console.log('versions', newVal)}
  },
};
</script>
<style lang="scss" scoped>
.border-right{
    border-right: 2px solid #707070;
}
.selected{
    background-color: #ffe79f;
}
</style>
