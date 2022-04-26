<template>
  <div class="services-cart-item d-flex align-center" :class="proposal.accepted ? 'booked': ''">
    <img
      :src="icon"
      style="width: 30px"
    >
    <div class="ml-10">
      <p class="mb-5 font-size-14 font-bold-extra">
        {{ proposal.vendor.companyName }}
      </p>
      <p class="m-0 font-size-14 color-black-middle">
        {{ title }}
      </p>
    </div>
    <span class="ml-auto">${{ proposal.cost | withComma }}</span>
    <md-menu v-if="field === 'cart' || field === 'favorite'"
             md-size="auto"
             class="action-menu ml-40"
             :md-offset-x="-300"
             :md-offset-y="-36"
             @md-opened="isOpened">
      <md-button md-menu-trigger class="edit-btn md-simple" style="height: 30px">
        <md-icon style="font-size: 30px !important">
          more_vert
        </md-icon>
      </md-button>
      <md-menu-content>
        <md-menu-item class="md-red" @click="action('move')">
          <span>
            <img :src="`${$iconURL}comments/SVG/heart-dark.svg`" class="label-icon-40 mr-10">
            Move to Favorite</span>
        </md-menu-item>
        <md-menu-item class="md-red" @click="action('remove')">
          <span>
            <img :src="`${$iconURL}VendorsProposalPage/group-11314.svg`" class="label-icon ml-10 mr-20">
            Remove from Cart
          </span>
        </md-menu-item>
      </md-menu-content>
    </md-menu>
    <img
      class="ml-40"
      v-else
      :src="`${$iconURL}budget+screen/SVG/Asset%2032.svg`"
      style="width: 30px"
    >
  </div>
</template>
<script>
export default {
  props: {
    proposal: {
      type: Object,
    },
    field: {
      type: String,
    },
    icon: {
      type: String,
    },
    title: {
      type: String,
    }
  },
  data(){
    return {

    }
  },
  methods: {
    action(name){
      this.$emit('action', name);
    },
    isOpened() {
      setTimeout((_) => {
        $("li.md-list-item").hover(
          function(el) {
            $(this).find("img").attr("style", "filter:brightness(0) invert(1)");
          },
          function() {
            $(this).find("img").attr("style", "filter:brightness(0) invert(0)");
          },
        );
      }, 0);
    },
  }
}
</script>
<style lang="scss" scoped>

</style>
