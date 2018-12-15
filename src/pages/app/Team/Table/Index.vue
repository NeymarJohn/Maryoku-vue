<template>
    <md-table v-model="teamMembers" table-header-color="rose" class="table-striped table-hover">
        <md-table-row slot="md-table-row" slot-scope="{ item }">
            <md-table-cell md-label="Name">{{ item.displayName }}</md-table-cell>
            <md-table-cell md-label="Email">{{ item.emailAddress }}</md-table-cell>
            <md-table-cell md-label="Role">{{ item.role }}</md-table-cell>
            <md-table-cell md-label="Permissions">{{ item.permissions }}</md-table-cell>
            <md-table-cell md-label="Actions">
                <md-button class="md-raised md-primary md-icon-button" @click.native="deleteTeam(item.id)">
                    <md-icon>delete</md-icon>
                    <md-tooltip md-direction="top">Delete</md-tooltip>
                </md-button>
            </md-table-cell>
        </md-table-row>
    </md-table>
</template>

<script>
    import {Modal, SimpleWizard, WizardTab} from "@/components";
    import swal from "sweetalert2";
    import Teams from "@/models/Teams";

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
            },
            async deleteTeam(id){
                let team = await Teams.first(id);
                console.log('team');
                team.delete();
                console.log(team, 'team');
                let teamIndex = this.teamMembers.findIndex(obj => obj.id === id)

                this.teamMembers.splice(teamIndex, 1)

          }
        }
    };
</script>
<style>

</style>
