<template>
    <div class="md-layout">
        <div class="md-layout-item md-size-100">
            <div class="table table-stats text-right">
                <div class="text-right">
                    <md-button class="md-rose text-rose md-button_default" @click="openInviteModal">
                        Ask the community
                    </md-button>
                </div>
            </div>
            <tabs
                    :tab-name="['New asks', 'Tracked Conversations', 'My Conversations']"
                    plain
                    color-button="rose">

                <!-- here you can add your content for tab-content -->
                <new-asks slot="tab-pane-1"></new-asks>

                <my-company-profile slot="tab-pane-2"></my-company-profile>

                <my-company-approvals slot="tab-pane-3"></my-company-approvals>

            </tabs>
            <md-card>
                <md-card-header class="md-card-header-icon md-card-header-rose">
                    <!--<div class="card-icon">
                      <md-icon>assignment</md-icon>
                    </div>
                    <h4 class="title">To Do Today</h4>-->
                </md-card-header>
            </md-card>
        </div>
        <community-modal ref="inviteModal"></community-modal>
    </div>
</template>

<script>
import CommunityModal from './communityModal';
import { Tabs, NavTabsCard } from "@/components";
import NewAsks from "src/pages/app/Community/new-asks.vue";
import MyCompanyApprovals from "src/pages/app/MyCompany/MyCompanyApprovals.vue";
import MyCompanyProfile from "src/pages/app/MyCompany/MyCompanyProfile.vue";

    export default {
        components: {
            CommunityModal,
            Tabs,
            NavTabsCard,
            NewAsks,
            MyCompanyApprovals,
            MyCompanyProfile,
        },
        data() {
            return {
                teamRecords: [
                    {
                        id: 1,
                        name: "First Name Last Name",
                        email: "contact@somecompany.com",
                        role: "Event Participant",
                        permissions: "View, Vote"
                    },
                ]
            }
        },
        methods: {
            openInviteModal(){
                this.$refs.inviteModal.toggleModal(true);
            }
        }
    };
</script>
<style>
    .tab-pane-1, .tab-pane-2, .tab-pane-3{
        width: 100%!important;
    }
    .md-table-head-label {
        font-weight: 500;
    }
</style>
