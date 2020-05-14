<template>
  <modal class="evnet-change-proposal-model">
    <template slot="header">
      <div class="maryoku-modal-header">
        <h2>Which of those proposals require changes?</h2>
        <div
          class="header-description"
        >We wish to make those better for you, But you could also request for alternative proposals</div>
      </div>
      <md-button class="md-simple md-just-icon md-round modal-default-button" @click="close">
        <md-icon>clear</md-icon>
      </md-button>
    </template>
    <template slot="body">
      <div class="md-layout maryoku-modal-body">
        <div class="d-flex align-center justify-content-between  md-size-100 md-layout-item">
          <md-checkbox v-model="selected"></md-checkbox>
          <img src="https://placeimg.com/200/200/any?5" width="130px"/>
          <div class="flex-1">
            <div class="font-size-16 font-bold-extra">
              Trump National Golf <br/>
              Club Philadelphia
            </div>
            <div class="font-size-22 font-bold-extra">$ 2,300</div>
          </div>
          <md-button class="md-rose md-simple md-outlined">
            Replace with alternative proposal
          </md-button>
        </div>
      </div>
    </template>
    <template slot="footer">
      <div>You could always find a vendor on your own and go to:</div>
      <md-button class="md-red md-bold add-category-btn" @click="close">Full venues list</md-button>
    </template>
  </modal>
</template>
<script>
import { Modal, MaryokuInput } from "@/components";
export default {
  name: "event-change-proposal-modal",

  components: {
    Modal
  },
  data() {
    return {
      selected: false
    };
  },
  methods: {
    cancel() {
      this.$emit("close");
    },
    close() {
      this.$emit("close");
    }
  }
};
</script>
<style lang="scss" scoped>
</style>