<template>
    <div>
    <md-table v-model="vendorsList" table-header-color="rose" class="table-striped table-hover">
        <md-table-row slot="md-table-row" slot-scope="{ item }">
            <md-table-cell md-label="Vendor">{{ item.vendorDisplayName }}</md-table-cell>
            <md-table-cell md-label="Category">{{ item.productsCategory }}</md-table-cell>
            <md-table-cell md-label="Web site">{{ item.vendorWebsite }}</md-table-cell>
            <md-table-cell md-label="Address">{{ item.vendorAddressLine1 }}</md-table-cell>
            <md-table-cell md-label="Email">{{ item.vendorMainEmail }}</md-table-cell>
            <md-table-cell md-label="Phone">{{ item.vendorMainPhoneNumber }}</md-table-cell>
            <md-table-cell md-label="Actions">
                <md-button @click.native="openInviteModal" class="md-raised md-primary md-icon-button">
                    <md-icon>thumb_up</md-icon>
                    <md-tooltip md-direction="top">Ranking</md-tooltip>
                </md-button>
                <md-button class="md-raised md-primary md-icon-button" @click.native="test">
                    <md-icon>delete</md-icon>
                    <md-tooltip md-direction="top">Delete</md-tooltip>
                </md-button>
                <md-button class="md-raised md-primary md-icon-button" @click.native="test">
                    <md-icon>share</md-icon>
                    <md-tooltip md-direction="top">Share</md-tooltip>
                </md-button>
            </md-table-cell>

        </md-table-row>
    </md-table>
    <ranking-modal  ref="inviteModal"></ranking-modal>
</div>
</template>

<script>
    import {Modal, SimpleWizard, WizardTab} from "@/components";
    import swal from "sweetalert2";
    import RankingModal from './RankingModal';

    export default {
        components: {
            Modal,
            SimpleWizard,
            WizardTab,
            RankingModal
        },
        props: {
            vendorsList: {
                type: Array,
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
                inviteModalOpen: false,
                name: 'Direction'
            }
        },
        methods: {
            openInviteModal(){
              this.$refs.inviteModal.toggleModal(true);
            },
            noticeModalHide: function () {
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
            wizardComplete() {
                swal("Good job!", "You clicked the finish button!", "success");
            }
        }
    };
</script>
<style>

</style>
