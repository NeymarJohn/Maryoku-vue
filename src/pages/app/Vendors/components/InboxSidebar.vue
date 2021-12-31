<template>
    <div class="progress-sidebar">
        <div class="summer-party">
            <div class="title-label text-uppercase">
                <span class="Comment-Mode">
                    Comment Mode
                </span>
            </div>
        </div>
        <div class="sidebar__items d-flex flex-column">
            <div class="sidebar__item d-flex align-items-center justify-content-between cursor-pointer" v-for="proposal in proposals" @click="$router.push(`/vendor/inbox/proposal/${proposal.id}`);">
                <div class="d-flex sidebar__item__content">
                    <img class="sidebar__item__img" src="/static/icons/Group 21554.png">
                    <div class="sidebar__item__details d-flex flex-column">
                        <span class="Product-Launch-Party">{{proposal.vendor.eventCategory.fullTitle}}</span>
                        <span>{{ proposal.dateCreated | date("DD") }} / {{ proposal.dateCreated | date("MM") }} &nbsp; | &nbsp; ${{ proposal.cost | withComma }}</span>
                    </div>
                </div>
                <!-- <span class="sidebar__item__badge mx-auto">1</span> -->
                <button class="md-button md-vendor md-theme-default sidebar__item__btn">Full Discussion</button>
                <!-- <div class="Path-1224"></div> -->
            </div>
            <div class="sidebar__item d-flex align-items-center justify-content-between">
                <div class="d-flex sidebar__item__content">
                    <img class="sidebar__item__img" src="/static/icons/Group 21554.png">
                    <div class="sidebar__item__details d-flex flex-column">
                        <span class="Product-Launch-Party">
                            Product Launch Party
                        </span>
                        <span>25 / 12 | $9,400</span>
                    </div>
                </div>
                <span class="sidebar__item__badge mx-auto">1</span>
                <!-- <button class="md-button md-vendor md-theme-default sidebar__item__btn">Full Discussion</button> -->
                <!-- <div class="Path-1224"></div> -->
            </div>
        </div>
        <Loader :active="loading" is-full-screen page="vendor"></Loader>
    </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import EventCommentComponent from "@/models/EventCommentComponent";
import { NEGOTIATION_REQUEST_STATUS, NEGOTIATION_REQUEST_TYPE, PROPOSAL_STATUS } from "@/constants/status";
import { PROPOSAL_PAGE_PAGINATION } from "@/constants/pagination";

const components = {
    Loader: () => import("@/components/loader/Loader.vue"),
}

export default {
    name: "inbox-sidebar",
    components,
    props: {},
    data: () => ({
        commnents: [],
        loading: false,
        pagination: PROPOSAL_PAGE_PAGINATION,
        sortFields: { sort: "cost", order: "desc" },
        tab: "all",
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
        proposals() {
            return this.$store.state.vendorDashboard.proposals.filter(p => p.status !== PROPOSAL_STATUS.INACTIVE);
        },
    },
    watch: {},
    methods: {
        async getProposal() {
            this.loading = true;
            const { pagination } = this;
            const params = { status: this.tab, ...this.sortFields };
            const data = await this.$store.dispatch("vendorDashboard/getProposals", {
                vendorId: this.vendor.id,
                pagination,
                params,
            });

            this.pagination.total = data.total;
            this.pagination.pageCount = Math.ceil(data.total / this.pagination.limit);
            this.loading = false;
        },
        async loadComments() {
            this.loading = true;
            this.commnents = await EventCommentComponent.find(this.vendor.id);
            console.log("response", this.commnents)
            this.loading = false;
        }
    }
};

</script>
<style lang="scss">
.sidebar__item {
    align-items: center;
    padding: 5px;
    padding-top: 8px;
    padding-bottom: 8px;
    border-bottom: 1.3px solid rgba(112, 112, 112, 0.45);
    transition: 0.3s ease-in-out all;
}

.sidebar__item:hover {
    background-color: #f6eef6;
}

.sidebar__item__details {
    justify-content: center;
    margin-left: 2px;
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
    width: 65px;
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

</style>
