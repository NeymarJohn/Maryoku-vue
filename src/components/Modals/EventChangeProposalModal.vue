<template>
  <modal class="evnet-change-proposal-model">
    <template slot="header">
      <div class="maryoku-modal-header">
        <h2 v-if="step == 1">
          Which of those proposals require changes?
        </h2>
        <h2 v-else>
          Help us find your something better
        </h2>
        <div v-if="step == 1" class="header-description">
          We wish to make those better for you, But you could also request for alternative proposals
        </div>
        <div v-else class="header-description">
          Tell us what was wrong with our suggestions so that we could make the future suggestion better for you?
        </div>
      </div>
      <md-button class="md-simple md-just-icon md-round modal-default-button" @click="close">
        <md-icon>clear</md-icon>
      </md-button>
    </template>
    <template slot="body">
      <div class="md-layout maryoku-modal-body">
        <template v-if="step == 1">
          <hr class="w-100">
          <template v-for="proposal in proposals">
            <div :key="proposal.id" class="d-flex align-center justify-content-between md-size-100 md-layout-item">
              <md-checkbox v-model="selected" />
              <img :src="proposal.vendor.images[0]" width="130px">
              <div class="flex-1 item-content">
                <div class="font-size-16 font-bold-extra">
                  {{ proposal.vendor.companyName }}
                </div>
                <div class="font-size-22 font-bold-extra">
                  $ {{ proposal.cost | withComma }}
                </div>
              </div>
              <md-button class="md-rose md-simple md-outlined" @click="replace">
                Replace with alternative proposal
              </md-button>
            </div>
            <hr class="w-100">
          </template>
        </template>
        <template v-else>
          <template v-for="reason in reasons">
            <md-checkbox :key="reason.label" v-model="reason.selected" class="w-100">
              {{ reason.label }}
            </md-checkbox>
            <div v-if="reason.hasContent && reason.selected" class="md-layout-item md-size-100">
              <div class="form-group">
                <textarea v-model="reason.content" row="10" type="text" class="form-control w-100" />
              </div>
            </div>
          </template>
        </template>
        <div class="text-right w-100">
          <md-button class="md-button md-simple md-black" @click="cancel">
            Cancel
          </md-button>
          <md-button class="md-button md-red" @click="nextStep">
            {{ step === 1 ? "Next" : "Send" }}
          </md-button>
        </div>
      </div>
    </template>

    <template slot="footer">
      <div class="text-center w-100">
        <div class="font-weight-bold">
          You could always find a vendor on your own and go to:
        </div>
        <br>
        <md-button class="md-red md-bold md-simple md-outlined" @click="close">
          Full venues list
        </md-button>
      </div>
    </template>
  </modal>
</template>
<script>
import { Modal, MaryokuInput } from "@/components";
export default {
  name: "EventChangeProposalModal",
  components: {
    Modal,
  },
  props: {
    proposals: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      textarea: "",
      selected: false,
      step: 1,
      suggestedProposals: [
        {
          content: "",
        },
      ],
      reasons: [
        { label: "Prices are higher than my expectations", selected: false },
        { label: "I don’t like the locations", selected: false },
        { label: "I did not like the style of the proposals", selected: false },
        { label: "I’m missing something essential", selected: false, hasContent: true, content: "" },
        { label: "Other", selected: false, hasContent: true, content: "" },
      ],
    };
  },
  methods: {
    cancel() {
      this.$emit("close");
    },
    close() {
      this.$emit("close");
    },
    nextStep() {
      this.step += this.step;
    },
  },
};
</script>
<style lang="scss" scoped>
.w-100 {
  width: 100%;
}
.modal-footer {
  border-top: solid 1px #828282 !important;
}
.item-content {
  padding-left: 20px;
}
.form-group {
  padding-left: 25px;
  .form-control {
    padding: 1em;
    min-height: 100px;
  }
}
</style>
