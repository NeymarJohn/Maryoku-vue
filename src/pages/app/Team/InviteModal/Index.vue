<template>
    <div class="md-layout">
        <modal v-if="inviteModalOpen" @close="noticeModalHide" container-class="modal-container">
            <template slot="header" class="header-position">
                <h3 class="title">Build your profile</h3>
                <md-button class="btn-position md-rose" @click="closeModal">Close</md-button>
            </template>
            <template slot="body">
                        <first-step :on-validated="wizardComplete"></first-step>
            </template>
            <template slot="footer">
                <md-button class="md-rose" @click="wizardComplete">Finish</md-button>
            </template>
        </modal>
    </div>
</template>

<script>
    import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';
    import teamVuexModule from '../team.vuex'
    import {Modal, SimpleWizard, WizardTab} from "@/components";
    import FirstStep from "./Wizard/FirstStep.vue";
    //    import SecondStep from "./Wizard/SecondStep.vue";
    //    import ThirdStep from "./Wizard/ThirdStep.vue";
    import swal from "sweetalert2";
    import Teams from "@/models/Teams";
    import TeamMember from "@/models/TeamMembers";


    export default {
        components: {
            Modal,
            FirstStep,
//            SecondStep,
//            ThirdStep,
            SimpleWizard,
            WizardTab
        },
        props: {
            team: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                inviteModalOpen: false,
            }
        },
        created() {
            this.$store.registerModule('teamVuex', teamVuexModule);
        },
        computed: {
            ...mapState('teamVuex', ['teamMemberData'])
        },
        methods: {
            noticeModalHide: function () {
                this.inviteModalOpen = false;
            },
            closeModal(){
              this.inviteModalOpen = false;
            },
            toggleModal: function (show) {
                this.inviteModalOpen = show;
            },
            validateStep(ref) {
                return this.$refs[ref].validate();
            },
            onStepValidated(validated, model) {
                this.wizardModel = {...this.wizardModel, ...model};
            },
            async wizardComplete() {
                swal("Good job!", "You clicked the finish button!", "success");
                let team = await Teams.first();

                team.members().attach(this.teamMemberData).then(response => {


                })


            }
        }
    };
</script>
<style>
    .swal2-container{
        z-index: 999999;
    }
    .header-position{
        position: relative;
    }
    .btn-position{
        position: absolute;
        right: 20px;
        top: 15px;
    }
</style>
