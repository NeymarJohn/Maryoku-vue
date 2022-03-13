<template>
  <div class="empty-request-card white-card d-flex">
    <div style="min-width: 56.3px;">
      <img class="mb-0" :src="`${$iconURL}vendordashboard/group-17116.png`" style="width: 56.3px; height: 56.5px">
    </div>
    <div class="ml-15">
      <div class="card-title color-vendor">
        No Open opportunities
      </div>
      <p class="card-description">
        We couldn't find any more opportunities for you at this point. Increase your exposure by improving your
        profile
      </p>
      <md-button class="card-button md-simple ml-auto md-vendor md-outlined">
        Optimize Profile
      </md-button>
    </div>
  </div>
</template>
<script>

export default {
  props: {
  },
  data() {
    return {

    };
  },
  mounted() {},
  methods: { },
};
</script>

<style lang="scss" scoped>
.empty-request-card{
  box-shadow: 0 3px 25px 0 rgba(0, 0, 0, 0.16);
  padding: 31.5px 30.9px 30.4px 23.1px;
  min-width: 468px;
}
        .card-title{
        font-family: "Manrope-Bold";
        text-transform: uppercase;
        letter-spacing: normal;
        margin-bottom:17.8px;
        font-stretch: normal;
        font-style: normal;
        font-weight: bold;
        font-size: 20px;
        }
        .card-description{
        font-family: 'Manrope-Regular';
        letter-spacing: normal;
        font-stretch: normal;
        font-weight: normal;
        font-style: normal;
        line-height: 1.88;
        color: #050505;
        font-size: 16px;
        }
          .card-button{
          font-family: "Manrope-Bold";
          letter-spacing: normal;
          font-stretch: normal;
          text-transform: none;
          line-height: normal;
          text-align: center;
          font-weight: bold;
          font-size: 16px;
          display:flex;
          }

</style>
