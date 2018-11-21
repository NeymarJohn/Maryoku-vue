<template>
  <div class="md-layout">
    <modal v-if="inviteModalOpen" @close="noticeModalHide" container-class="modal-container-wizard">
      <!--<template slot="header">
        <h4 class="modal-title">How Do You Become An Affiliate?</h4>
        <md-button class="md-simple md-just-icon md-round modal-default-button" @click="noticeModalHide">
          <md-icon>clear</md-icon>
        </md-button>
      </template>-->

      <template slot="body">
        <simple-wizard>
          <template slot="header">
            <h3 class="title">Build your profile</h3>
            <h5 class="category">This information will let us know more about you.</h5>
          </template>

          <wizard-tab :before-change="() => validateStep('step1')">
            <template slot="label" data-color="red">
              About
            </template>
            <first-step ref="step1" @on-validated="onStepValidated"></first-step>
          </wizard-tab>

          <wizard-tab :before-change="() => validateStep('step2')">
            <template slot="label" >
              Account
            </template>
            <second-step ref="step2" @on-validated="onStepValidated"></second-step>
          </wizard-tab>

          <wizard-tab :before-change="() => validateStep('step3')">
            <template slot="label">
              Address
            </template>
            <third-step ref="step3"></third-step>
          </wizard-tab>
        </simple-wizard>
      </template>

      <!--<template slot="footer">
        <md-button class="md-info md-round" @click="noticeModalHide">Sound Good</md-button>
      </template>-->
    </modal>
  </div>
</template>

<script>
  import { Modal, SimpleWizard, WizardTab } from "@/components";
  import FirstStep from "src/pages/Dashboard/Forms/Wizard/FirstStep.vue";
  import SecondStep from "src/pages/Dashboard/Forms/Wizard/SecondStep.vue";
  import ThirdStep from "src/pages/Dashboard/Forms/Wizard/ThirdStep.vue";
  import swal from "sweetalert2";

  export default {
    components: {
      Modal,
      FirstStep,
      SecondStep,
      ThirdStep,
      SimpleWizard,
      WizardTab
    },
    props: {

    },
    data() {
      return {
        inviteModalOpen: false
      }
    },
    methods: {
      noticeModalHide: function() {
        this.inviteModalOpen = false;
      },
      toggleModal: function(show) {
        this.inviteModalOpen = show;
      },
      validateStep(ref) {
        return this.$refs[ref].validate();
      },
      onStepValidated(validated, model) {
        this.wizardModel = { ...this.wizardModel, ...model };
      },
      wizardComplete() {
        swal("Good job!", "You clicked the finish button!", "success");
      }
    }
  };
</script>
<style >

</style>
