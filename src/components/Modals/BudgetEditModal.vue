<template>
  <modal class="budget-edit-modal add-category-model">
    <template slot="header">
      <div class="add-category-model__header">
        <h2 class="black">
          What is your new budget?
        </h2>
        <div class="header-description">
          <img :src="`${$iconURL}Event Page/light.svg`" width="20">
          Increasing your budget to $ {{ event.totalBudget | withComma }} or more will allow you to get a videographer
        </div>
      </div>
      <md-button class="md-simple md-just-icon md-round modal-default-button" @click="close">
        <md-icon>clear</md-icon>
      </md-button>
    </template>
    <template slot="body">
      <div class="md-layout justify-content-center">
        <div class="md-layout-item md-size-60 margin-bottom justify-content-center">
          <div class="form-group with-icon budget-field">
            <div class="input-icon">
              <img :src="`${$iconURL}Event Page/budget-dark.svg`" width="20">
            </div>
            <input v-model="newBudget" type="text" class="form-control" placeholder>
          </div>
          <div v-if="newBudget && newBudget > event.totalBudget" class="label-item label-success text-center">
            <h4>Fantastic!</h4>
            <p>
              This budget is {{ 100 - parseInt((event.totalBudget * 100) / newBudget) }}% higher than average, your
              event is going to be wild!
            </p>
          </div>
          <div v-if="newBudget && newBudget < event.totalBudget" class="label-item label-warning text-center">
            <p>
              <img :src="`${$iconURL}Event Page/warning-circle-gray.svg`" width="20">
              This budget is {{ 100 - parseInt((newBudget * 100) / event.totalBudget) }}% lower than average for this
              type of event
            </p>
          </div>
          <div v-if="newBudgetNumber < minBudget" class="label-item label-warning text-center mt-10">
            <p>
              <img :src="`${$iconURL}Event Page/warning-circle-gray.svg`" width="20">
              The budget should be greater than ${{ minBudget | withComma }}. <br>If you want to reduce more, please
              resize allocated budget.
            </p>
          </div>
        </div>
      </div>
    </template>
    <template slot="footer">
      <md-button class="md-default md-simple cancel-btn" @click="close">
        Cancel
      </md-button>
      <md-button class="add-category-btn" @click="updateBudget">
        Save
      </md-button>
    </template>
  </modal>
</template>
<script>
import { Modal } from "@/components";
export default {
  components: {
    Modal,
  },
  props: {
    event: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      newBudget: 0,
    };
  },
  computed: {
    updateAvailable() {
      const newBudget = Number(this.newBudget.replace(/,/g, ""));
      return this.newBudget && this.event.totalBudget - newBudget <= this.event.unexpectedBudget;
    },
    minBudget() {
      return this.event.totalBudget - this.event.unexpectedBudget;
    },
    newBudgetNumber() {
      return Number(this.newBudget.replace(/,/g, ""));
    },
  },
  watch: {
    newBudget: function (newValue) {
      const result = newValue.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.newBudget = result;
    },
  },
  created() {
    this.newBudget = `${this.event.totalBudget}`.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  },
  methods: {
    close() {
      this.$emit("cancel");
    },
    updateBudget() {
      this.$emit("save", { totalBudget: Number(this.newBudget.replace(/,/g, "")) });
    },
  },
};
</script>
<style scoped lang="scss">
.add-category-btn {
  background-color: #f51355 !important;
}
</style>
