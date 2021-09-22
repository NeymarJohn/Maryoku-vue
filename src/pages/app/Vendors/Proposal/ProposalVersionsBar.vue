<template>
  <div class="d-flex align-center" style="background-color: #ffedb7">
    <div class="d-flex align-center py-20 font-size-16 text-center cursor-pointer w-min-210 color-black-middle border-right" @click="select(-1)">
        <img src="/static/icons/vendor/proposal.svg" width="20px" class="mr-10">
        Original
    </div>
    <div v-for="(version, idx) in versions"
         class="d-flex align-center cursor-pointer font-size-16 text-center w-min-210 border-right"
         @click="select(idx)">
      <img src="/static/icons/vendor/proposal.svg" width="20px" class="mr-5">
        <img src="/static/icons/vendor/proposal.svg" width="20px" class="mr-5">
        {{version.name}}
    </div>
    <div class="d-flex font-size-16 py-20 pl-30 w-min-210 cursor-pointer" @click="saveVersion" style="color: #641856;">
        <md-icon class="mr-10" style="color: #641856">add</md-icon>
        Add New Version</div>
  </div>
</template>
<script>
import moment from 'moment';
export default {
  name: "proposal-versions-bar",
  components: {},
  props: {
  },
  data() {
    return {
    };
  },
  methods: {
    select(index){
      this.$store.commit('vendorProposal/selectVersion', index);
    },
    saveVersion(){
      let version = {
          name: `Ver${this.versions.length + 1}${moment().format("DD/MM/YYYY")}`,
          data: {},
      }
      this.$store.dispatch('vendorProposal/saveVersion', version);
    }
  },
  computed: {
    versions() {
      return this.$store.state.vendorProposal.versions;
    },
  },
  watch: {
    versions(){
    }
  },
};
</script>
<style lang="scss" scoped>
.border-right{
    border-right: 2px solid #707070;
}
</style>
