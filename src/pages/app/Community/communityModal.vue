<template>
  <div class="md-layout">
    <modal v-if="inviteModalOpen" @close="noticeModalHide" container-class="modal-container">
      <template slot="body">
        <tabs
                :tab-name="['Ask the community', 'Share Vendor', 'Share experience']"
                plain
                color-button="rose">

          <!-- here you can add your content for tab-content -->
          <ask-community slot="tab-pane-1"></ask-community>

          <ask-community slot="tab-pane-2"></ask-community>
          <ask-community slot="tab-pane-3"></ask-community>

        </tabs>
      </template>

      <!--<template slot="footer">
        <md-button class="md-info md-round" @click="noticeModalHide">Sound Good</md-button>
      </template>-->
    </modal>
  </div>
</template>

<script>
    import { Modal } from "@/components";
    import AskCommunity from "./AskTheCommunityTab.vue";
    import swal from "sweetalert2";
    import { Tabs, NavTabsCard } from "@/components";

    export default {
        components: {
            Modal,
            AskCommunity,
            Tabs,
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
