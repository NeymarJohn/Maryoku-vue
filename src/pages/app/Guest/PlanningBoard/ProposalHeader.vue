<template>
  <div class="proposal-header cursor-pointer" :class="{selected: proposalSelected === true}">
    <div class="cost">
      ${{ proposalRequest.cost | withComma }}
    </div>
    <div class="title">
        {{ proposalRequest.vendor ? proposalRequest.vendor.companyName : '' }}
    </div>
  </div>
</template>
<script>
export default {
  props: {
    event: {
      type: Object,
      default: () => {},
    },
    proposalSelected: {
      type: Boolean,
      default: () => false,
    },
    proposalRequest: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      defaultImage: "https://maryoku.s3.amazonaws.com/proposal/background-default.jpg",
    };
  },
  computed: {
  },
};
</script>
<style lang="scss" scoped>
.selected {
    box-shadow: none;
    background: white;
    border-top: 3px solid #f51355;
}
.proposal-header {

    .cost{
        color: #000;
        font-size: 30px;
        font-weight: 800;
        padding-bottom:5px;
    }

    .title{
        font-size: 22px;
        font-weight: 800;
        color: #000;
        margin-top: 10px;
    }

    position: relative;
    padding:2rem;
    width: 100%;
    border-radius: 3px;
    margin-right:5px;
    height: 130px;

    box-shadow: 5px -4px 5px -1px rgba(0, 0, 0, 0.08);
    -webkit-box-shadow: 5px -4px 5px -1px rgba(0, 0, 0, 0.08);
    -moz-box-shadow: 5px -4px 5px -1px rgba(0, 0, 0, 0.08);

}
</style>
