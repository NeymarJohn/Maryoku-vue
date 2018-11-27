<template>
  <md-table v-model="teamRecords" table-header-color="rose" class="table-striped table-hover">
    <md-table-row slot="md-table-row" slot-scope="{ item }">
      <md-table-cell md-label="Name">{{ item.name }}</md-table-cell>
      <md-table-cell md-label="Email">{{ item.email }}</md-table-cell>
      <md-table-cell md-label="Role">{{ item.role }}</md-table-cell>
      <md-table-cell md-label="Permissions">{{ item.permissions }}</md-table-cell>
    </md-table-row>
  </md-table>
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
          teamRecords: {
              type: Object,
              default: () => {
                  return {};
              }
          },
          item: {
              type: Object,
              default: () => {
                  return {};
              }
          }
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
