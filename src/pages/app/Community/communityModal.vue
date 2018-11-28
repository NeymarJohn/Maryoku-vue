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
        <simple-wizard data-color="rose">
          <template slot="header">
            <h3 class="title">Build your profile</h3>
            <h5 class="category">This information will let us know more about you.</h5>
          </template>

            <template slot="label" data-color="red">
              About
            </template>


            <template slot="label" >
              Account
            </template>


            <template slot="label">
              Address
            </template>

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

  import swal from "sweetalert2";

  export default {
    components: {
      Modal,
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
      wizardComplete() {
        swal("Good job!", "You clicked the finish button!", "success");
      }
    }
  };
</script>
<style >

</style>
