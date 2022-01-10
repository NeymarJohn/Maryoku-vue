<template>
    <div class="progress-sidebar">
        <div class="summer-party">
            <img class="title-icon" src="/static/icons/inbox-sidebar.svg"" />
            <div class=" title-label title-text text-uppercase">
            <span class="Comment-Mode">
                Comment Mode
            </span>
        </div>
    </div>
    <div class="sidebar__items d-flex flex-column">
        <div class="sidebar__item d-flex align-items-center justify-content-between cursor-pointer" v-for="proposal in commentsProposals" @click="changeProposal(proposal)" :class="{'active':(activeProposal && activeProposal.id == proposal.id)}">
            <div class="d-flex sidebar__item__content">
                <!-- <img v-if="proposal.nonMaryoku" :src="'https://ui-avatars.com/api/?background=0D8ABC&color=fff&rounded&name='+proposal.eventData.customer.companyName"> -->
                <Avartar :name="proposal.eventData.customer.companyName"></Avartar>
                <!-- <img v-else class="sidebar__item__img" src="/static/icons/Group 21554.png"> -->
                <!-- <img class="sidebar__item__img" :src="proposal.vendor.vendorLogoImage"> -->
                <div class="sidebar__item__details d-flex flex-column">
                    <span class="Product-Launch-Party">{{proposal.vendor.eventCategory.fullTitle}}</span>
                    <span>{{ proposal.dateCreated | date("DD") }} / {{ proposal.dateCreated | date("MM") }} &nbsp; | &nbsp; ${{ proposal.cost | withComma }}</span>
                </div>
            </div>
            <!-- <span class="sidebar__item__badge mx-auto">1</span> -->
            <button class="md-button md-vendor md-theme-default sidebar__item__btn">Full Discussion</button>
            <!-- <div class="Path-1224"></div> -->
        </div>
    </div>
    <Loader :active="loading" :isFullScreen="true" page="vendor"></Loader>
    </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import EventCommentComponent from "@/models/EventCommentComponent";
import { NEGOTIATION_REQUEST_STATUS, NEGOTIATION_REQUEST_TYPE, PROPOSAL_STATUS } from "@/constants/status";
import { PROPOSAL_PAGE_PAGINATION } from "@/constants/pagination";

const components = {
    Loader: () => import("@/components/loader/Loader.vue"),
    Avartar: () => import("@/components/Avartar.vue"),
}

export default {
    name: "inbox-sidebar",
    components,
    props: {},
    data: () => ({
        proposals: [],
        loading: false,
        pagination: PROPOSAL_PAGE_PAGINATION,
        sortFields: { sort: "cost", order: "desc" },
        tab: "all",
        activeProposal: null
    }),
    computed: {},

    created() {},
    mounted() {
        // this.loadComments();
        this.getProposal();
    },
    computed: {
        vendor() {
            return this.$store.state.vendor.profile;
        },
        commentsProposals() {
            return this.proposals.filter((p) => p.commentComponent.length)
        }
    },
    watch: {},
    methods: {
        async getProposal() {
            this.loading = true;

            let query = new EventCommentComponent();
            const res = await query.params({ vendorId: this.vendor.id }).get();
            this.proposals = res.data;
            if (this.commentsProposals.length) {
                this.changeProposal(this.commentsProposals[0]);
            }
            this.loading = false;
        },
        changeProposal(proposal) {
            this.activeProposal = proposal;
            this.$router.push(`/vendor/inbox/proposal/${proposal.id}`);
        }
    }
};

</script>
<style lang="scss">
.title-icon {
    margin-right: 10px;
}

.title-text span {
    font-size: 27px !important;
}

.sidebar__items {
    height: 100vh;
    overflow-y: scroll !important;
}

.sidebar__item {
    align-items: center;
    padding: 20px;
    border-bottom: 1.3px solid rgba(112, 112, 112, 0.45);
    transition: 0.3s ease-in-out all;
    height: 100px;
}

.sidebar__item:hover,
.sidebar__item.active {
    background-color: #f6eef6;
}

.sidebar__item__details {
    justify-content: center;
    margin-left: 10px;
}

.sidebar__item__details span:nth-child(2) {
    font-size: 13px;
}

.sidebar__item__content {
    margin-left: 5px;
}

.sidebar__item__btn {
    padding: 5px 25px 5px 25px;
    font-size: 11.5px;
    font-weight: 800;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.88;
    letter-spacing: 1px;
    text-transform: capitalize;
    margin-right: 10px;
}

.sidebar__item__badge {
    width: 25px;
    height: 25px;
    background: #f51355;
    text-align: center;
    color: #fff;
    border-radius: 30px;
    font-size: 13px;
    font-weight: 800;
}

.sidebar__item__img {
  width: 57px;
  height: 57px !important;
  margin-right: 25px;
}

.Comment-Mode {
    width: 247px;
    height: 40px;
    font-size: 30px;
    font-weight: 800;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: #050505;
}

.Path-1224 {
    width: 474px;
    height: 0;
    margin: 21.5px 0 0 0px;
    border: solid 0.5px #707070;
}

.Product-Launch-Party {
    height: 21px;
    margin: 0 0 0px 0.3px;
    font-size: 14px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.8;
    letter-spacing: normal;
    text-align: left;
    color: #050505;
}

.progress-sidebar-content {
    position: absolute;
    left: 0;
    top: 133px;
}

.inbox-sidebar {
    overflow-y: hidden;
    left: 0;
    width: 25vw;
    height: 100%;
    box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);
    border-bottom: 1.3px solid rgba(112, 112, 112, 0.45);
}

.summer-party {
    position: inherit !important;
    border-bottom: 1.3px solid rgba(112, 112, 112, 0.45);
    box-shadow: none !important;
    height: 18vh;
    display: flex;
    align-items: center;
    padding-left:25px !important;
    width: 100% !important;
}

.sidebar__items::-webkit-scrollbar-thumb {
    border-radius: 0 !important;
}

</style>
