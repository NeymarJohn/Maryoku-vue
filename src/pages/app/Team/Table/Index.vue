<template>
    <md-table v-model="teamMembers" table-header-color="rose" class="table-striped table-hover">
        <md-table-row slot="md-table-row" slot-scope="{ item }">
            <md-table-cell md-label="Name">{{ item.displayName }}</md-table-cell>
            <md-table-cell md-label="Email">{{ item.emailAddress }}</md-table-cell>
            <md-table-cell md-label="Role">{{ item.role }}</md-table-cell>
            <md-table-cell md-label="Permissions">{{ item.permissions }}</md-table-cell>
        </md-table-row>
    </md-table>
</template>

<script>
    import {Modal, SimpleWizard, WizardTab} from "@/components";
    import swal from "sweetalert2";

    export default {
        components: {
            Modal,
            SimpleWizard,
            WizardTab
        },
        props: {
            teamMembers: {
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
                inviteModalOpen: false
            }
        },
        methods: {
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
