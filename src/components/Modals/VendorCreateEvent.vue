<template>
  <modal class="vendor-create-event">
    <template slot="header">
      <div class="add-category-model__header">
        <h2 class="font-size-20 font-bold-extra">
          Give us a few details of the event
        </h2>
      </div>
      <md-button class="md-simple md-just-icon md-round modal-default-button" @click="close">
        <md-icon>clear</md-icon>
      </md-button>
    </template>
    <template slot="body">
      <div class="md-layout">
        <maryoku-input
            :value="date"
            class="form-input my-10"
            placeholder="Choose date…..."
            inputStyle="date"
            @change="changeDate"
        ></maryoku-input>
      </div>
    </template>
    <template slot="footer">
      <md-button class="md-default md-simple cancel-btn md-bold" @click="close">Cancel</md-button>
      <md-button class="md-red add-category-btn md-bold"
        >Done</md-button
      >
    </template>
  </modal>
</template>
<script>
import { Modal } from "@/components";
import { MaryokuInput} from "@/components";

export default {
  components: {
    Modal,
    MaryokuInput,
  },
  props: {
  },
  data() {
    return {
      date: null,
    };
  },
  methods: {
    changeDate(){
        console.log('changeDate');
    },
    close() {
      this.$emit("cancel");
    },
  },
  computed: {
  },
};
</script>
<style lang="scss" scoped>
</style>
