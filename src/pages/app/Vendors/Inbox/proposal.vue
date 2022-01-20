<template>
    <div class="proposal-main-container" style="">
        <loader :active="loading" :isFullScreen="true" page="vendor"></loader>
        <template v-if="proposal && commentComponents.length">
            <comment-editor-panel
            v-if="showCommentEditorPanel"
            :commentComponents="commentComponents"
            :proposal="proposal"
            @saveComment="saveComment"
            @updateComment="updateComment"
            @deleteComment="deleteComment"
            @updateCommentComponent="updateCommentComponent">
            </comment-editor-panel>
            <div class="proposal-header md-layout md-alignment-top-left p-30 bg-white h-10rem">
                <div class="md-layout-item md-large-size-50 ">
                    <div class="d-flex align-center header-title">
                        <b class="fullTitle">{{ proposal.vendor ? proposal.vendor.eventCategory.fullTitle : '' }}</b>
                        <div class="companyName"> | {{ proposal.vendor? proposal.vendor.companyName : '' }}</div>
                    </div>
                    <ul class="event-details mt-20">
                        <li class="event-details__item">
                            Venue + Catering
                        </li>
                        <li class="event-details__item">
                            For Whole Event
                        </li>
                        <li class="event-details__item">
                            ${{ proposal.cost | withComma }}
                        </li>
                    </ul>
                </div>
                <div class="md-layout-item md-large-size-50 md-small-size-20 d-flex">
                    <HeaderActions className="ml-auto" page="proposal" @toggleCommentMode="toggleCommentMode" @export="downProposal"></HeaderActions>
                </div>
            </div>
            <ProposalVersionsBar
            :versions="proposal.versions"
            :selected="proposal.currentVersion"
            @select="selectVersion"
            @save="saveVersion"
            @change="changeVersion"
            @remove="removeVersion"></ProposalVersionsBar>
            <div class="proposal-container event-proposal" >
                <EventProposalDetails :proposal="proposal" :landingPage="true" :nonMaryoku="true" :step="step" v-if="proposal" @change="handleStep">
                </EventProposalDetails>
            </div>
        </template>
        <template>
            <div class="proposal-container no-proposal">
                <NoProposal :proposal="proposal">
                </NoProposal>
            </div>
        </template>
    </div>
</template>
<script>
import Proposal from "@/models/Proposal";
import Vendor from "@/models/Vendors";
import { mapActions, mapMutations } from "vuex";
import EventCommentComponent from '@/models/EventCommentComponent'
import {CommentMixins, ShareMixins} from "@/mixins";

const components = {
    EventProposalDetails: () => import('@/pages/app/Events/Proposal/EventProposalDetails.vue'),
    NoProposal: () => import('@/pages/app/Vendors/Inbox/NoProposal.vue'),
    TimerPanel: () => import("@/pages/app/Events/components/TimerPanel.vue"),
    CommentEditorPanel: () => import('@/pages/app/Events/components/CommentEditorPanel'),
    GuestSignUpModal: () => import('@/components/Modals/VendorProposal/GuestSignUpModal.vue'),
    HeaderActions: () => import('@/components/HeaderActions.vue'),

    Loader: () => import('@/components/loader/Loader.vue'),
    Modal: () => import('@/components/Modal.vue'),
    ProposalVersionsBar: () => import('../components/ProposalVersionsBar.vue'),
}
export default {
    components,
    data() {
        return {
            loading: true,
            step: 0,
            showDetailModal: false,
            showUpdateSuccessModal: false,
            showCommentEditorPanel: false,
            showGuestSignupModal: false,
        }
    },
    mixins: [CommentMixins, ShareMixins],
    async created() {
        console.log("created")
        this.loading = true;
        let tenantUser = null;
        if (this.loggedInUser) {
            tenantUser = await this.$store.dispatch("auth/checkToken", this.loggedInUser.access_token);
        }
        const givenToken = this.$route.query.token;

        await this.$store.dispatch("common/getEventTypes");
        this.loading = false;
    },
    mounted(){
        console.log("mounted");
        this.selectProposal();
    },
    methods: {
        ...mapActions("commentProposal", ["saveVersion"]),
        ...mapMutations("comment", ["setGuestName","setSelectedProposal"]),
        ...mapMutations("modal", ["setOpen", "setProposal", "setProposalRequest"]),
        handleStep(step) {
            this.step = step
        },
        downProposal() {
            this.openNewTab(`${process.env.SERVER_URL}/1/proposal/${this.proposal.id}/download`);
        },
        toggleCommentMode(mode) {
            this.showCommentEditorPanel = mode;
        },
        showModal(name) {
            this.setProposal(this.proposal)
            this.setProposalRequest(this.proposal.proposalRequest)
            this.setOpen(name)
        },
        openNewTab(link) {
            window.open(link, "_blank");
        },
        saveGuestComment(name) {
            this.showGuestSignupModal = false;
            this.setGuestName(name);
            let data = JSON.parse(localStorage.getItem("nonMaryokuAction"));

            if (data.action === "saveComment")
                this.saveComment({ index: data.index, comment: data.comment, component: data.component });
            if (data.action === "updateComment") this.updateComment({ comment: data.comment, component: data.component });
            if (data.action === "deleteComment") this.deleteComment({ index: data.index, comment: data.comment });
            if (data.action === "updateCommentComponent") this.saveComment({ component: data.component });
            this.showCommentEditorPanel = true;
        },
        async getProposal(proposalId) {
            this.loading = true;
            this.getComments(this.proposal.id);
            this.loading = false;
        },
        async getComments(proposalId) {

            let url = `/unregistered/proposals/${proposalId}`
            // this.proposalComments = await this.getCommentComponents(url);
        },
        selectProposal(){
            console.log("selectProposal")
            let proposal = this.proposals.find(x => x.id == this.$route.params.proposalId);
            if(proposal){
                this.commentComponents = proposal.commentComponent;
                proposal.versions = !proposal.versions ? [] : proposal.versions;
                this.setSelectedProposal(proposal);
                this.$store.dispatch("vendorProposal/setProposal",{...proposal});
                this.$store.dispatch("commentProposal/setProposal",{...proposal});
            }
        },
        selectVersion(index){
            this.$store.commit('commentProposal/selectVersion', index);
        },
        saveVersion(version){
            this.$store.dispatch('commentProposal/saveVersion', version);
        },
        changeVersion(versions){
            this.$store.commit('commentProposal/setVersions', versions);
        },
        removeVersion(id){
            this.$store.dispatch('commentProposal/removeVersion', id);
        }
    },
    computed: {
        loggedInUser() {
            return this.$store.state.auth.user;
        },
        customer() {
            return this.$store.state.comment.customer;
        },
        guestName() {
            return this.$store.state.comment.guestName;
        },
        vendor() {
            return this.proposal.vendor
        },
        proposal(){
            return this.$store.state.commentProposal.selectedVersion ? this.$store.state.commentProposal.selectedVersion : this.$store.state.commentProposal.proposal;
        },
        proposals(){
            return this.$store.state.comment.commentsProposals;
        },
        selectedVersion(){

        },
    },
    watch: {
        $route: function() {
            console.log("route")
            this.selectProposal();
            // this.getProposal(this.$route.params.proposalId);
            if(this.showCommentEditorPanel){
                this.showCommentEditorPanel = false;
                setTimeout(() => {
                    this.showCommentEditorPanel = true;
                },100);
            }
        },
        proposals(){
            console.log("proposals")
            this.selectProposal();
        }
    }
}

</script>
<style lang="scss" scoped>
.event-details {
    list-style: none;
    display: flex;
    flex-direction: row;
    margin: 0;
    padding: 0;

    &__item {
        font-size: 14px;
        padding-bottom: 10px;
        color: #505050;

        &:not(:last-child) {
            border-right: 1px solid #818080;
            padding-right: 40px;
            margin-right: 40px;
        }
    }
}

.h-10rem{
    height: 10rem;
}

.proposal-header{
    display: flex;
    align-items: center;
    justify-content: center;
}

.header-title{
    font-size: 30px;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: #050505;
}

.fullTitle {
    font-weight: 800;
    margin-right:15px;
}

.event-details__item {
    font-size: 20px !important;
}

.proposal-main-container{
    left: 400px;
    width: calc(100% - 400px);
}

.no-proposal {
    padding: 75px 75px;
}
.event-proposal {
    padding: 39px 92px;
}
</style>
