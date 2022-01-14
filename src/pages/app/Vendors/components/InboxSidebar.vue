<template>
    <div class="progress-sidebar">
        <div class="summer-party3 flex-column" v-if="!fullDiscussion">
            <div class="title">
                <img class="title-icon" src="/static/icons/inbox-sidebar.svg" />
                <div class=" title-label title-text text-uppercase">
                    <span class="commentMode">
                        Comment Mode
                    </span>
                </div>
            </div>
            <div class="dropdown d-flex">
                <md-menu md-size="medium" class="action-menu mr-1" :md-offset-x="-300" :md-offset-y="-36">
                    <md-button md-menu-trigger class="edit-btn md-simple">
                        Sort &nbsp;&nbsp;
                        <i class="fas fa-chevron-up" v-if="sortType == 'asc'" @click.stop="changeSortType"></i>
                        <i class="fas fa-chevron-down" @click.stop="changeSortType" v-else></i>
                    </md-button>
                    <md-menu-content>
                        <md-menu-item @click="sortBy='name'" class="md-purple"><span>Name</span></md-menu-item>
                        <md-menu-item @click="sortBy='date'" class="md-purple"><span>Date</span></md-menu-item>
                    </md-menu-content>
                </md-menu>
                <md-button md-menu-trigger class="edit-btn md-simple" @click="changeStatusSortType">
                    Status &nbsp;&nbsp;
                    <i class="fas fa-chevron-up" v-if="statusSortType == 'asc'"></i>
                    <i class="fas fa-chevron-down" v-else></i>
                </md-button>
            </div>
        </div>
        <div class="summer-party2" v-else>
            <!-- <img class="title-icon" src="/static/icons/inbox-sidebar.svg" /> -->
            <div class="d-flex">
                <img src="/static/img/group-21590.png" @click="fullDiscussion=false" class="header-img" style="cursor: pointer;">
                <span class="titleText">
                    Full Discussion
                </span>
            </div>
            <div class="dropdown d-flex" style="margin-left: 70px;">
                <span class="subText">
                    March Madness
                </span>
            </div>
            <div class="dropdown2 d-flex">
                <md-menu md-size="medium" class="action-menu myr-1" :md-offset-x="-300" :md-offset-y="-36">
                    <md-button md-menu-trigger class="edit-btn md-simple sortStatus">
                        Sort
                        <i class="fas fa-chevron-up" v-if="sortType == 'asc'" @click.stop="changeSortType"></i>
                        <i class="fas fa-chevron-down" @click.stop="changeSortType" v-else></i>
                    </md-button>
                    <md-menu-content>
                        <md-menu-item @click="sortBy='name'" class="md-purple"><span>Name</span></md-menu-item>
                        <md-menu-item @click="sortBy='date'" class="md-purple"><span>Date</span></md-menu-item>
                    </md-menu-content>
                </md-menu>
                <md-button md-menu-trigger class="edit-btn md-simple sortStatus" @click="changeStatusSortType">
                    Status
                    <i class="fas fa-chevron-up" v-if="statusSortType == 'asc'"></i>
                    <i class="fas fa-chevron-down" v-else></i>
                </md-button>
            </div>
        </div>
        <div class="sidebar__items d-flex flex-column fullDiscussion" v-if="fullDiscussion">
            <div class="comment_item align-items-center justify-content-between cursor-pointer" v-for="(commentComponent, commentIndex) in commentComponents" :key="commentIndex">
                <div class="d-flex sidebar__item__content justify-content-between">
                    <div class="sidebar__item__details2 d-flex">
                        <img class="" src="/static/icons/Group-21554.png">
                        <div class="productLaunchParty">{{selectedProposal.vendor.eventCategory.fullTitle}}</div>
                    </div>
                    <timeago class="time-color" :datetime="commentComponent.dateCreated"></timeago>
                </div>
                <div class="d-flex sidebar__item__content">
                    <div class="dot"></div>
                    <span class="comment">{{commentComponent.comments.length ? commentComponent.comments[0].description : ''}} </span>
                </div>
                <div class="d-flex sidebar__item__content justify-content-between mt-1 mb-1">
                    <span class="replay" @click="toggleshowReply(commentIndex)">{{commentComponent.comments.length-1}} Reply
                        <i class="fas fa-chevron-down"></i>
                    </span>
                    <span class="unread-count2">02</span>
                    <!-- <span>
                        <Avartar :name="activeProposal.eventData.customer.companyName"></Avartar>
                    </span> -->
                </div>
                <div v-if="showReplyComment == commentIndex " class="commentsReplies p-4">
                    <div class="commentItem" v-for="(comment, cindex) in commentComponent.comments" v-if="cindex>0" :key="cindex">
                        <div class="d-flex sidebar__item__content justify-content-between">
                            <div class="d-flex sidebar__item__content">
                                <div class="sidebar__item__details d-flex">
                                    <img class="" src="/static/icons/Group-21554.png">
                                    <div class="productLaunchParty">{{selectedProposal.vendor.eventCategory.fullTitle}}</div>
                                </div>
                            </div>
                            <timeago class="time-color" :datetime="comment.dateCreated"></timeago>
                        </div>
                        <div class="commentDesc">
                            <span>{{comment.description}}</span>
                        </div>
                    </div>
                </div>
                <div v-if="showReplyComment == commentIndex ">
                    <div class="form-group position-relative reply-form">
                        <fade-transition v-if="showAddress">
                            <md-card class="position-absolute notification-card">
                                <md-card-content class="d-flex align-center position-relative p-10">
                                    <md-menu md-size="medium" class="action-menu">
                                        <md-menu-item v-for="c in customers" :key="c.id" @click="toAddress(c)">
                                            {{c.name}}
                                        </md-menu-item>
                                    </md-menu>
                                </md-card-content>
                            </md-card>
                        </fade-transition>
                        <textarea rows="4" class="form-control reply-text-area" placeholder="Write reply here" v-model="editingComment" ref="commentEditor" @input="getMessage"></textarea>
                        <img :src="`${$iconURL}comments/SVG/editor-dark.svg`" class="text-icon" />
                        <div class="footer text-right">
                            <md-button class="md-simple normal-btn" @click="">Cancel</md-button>
                            <md-button class="md-simple md-black normal-btn" @click="saveCommentReply($event, 'reply')">Submit</md-button>
                        </div>
                    </div>
                </div>
                <!-- <div v-if="showReplyComment == commentIndex " style="float: right;">
                    <md-button class="md-simple normal-btn"">Cancel</md-button>
                        <button class="md-button md-vendor md-theme-default sidebar__item__btn">Submit</button>
                </div> -->
            </div>
        </div>
        <div class="sidebar__items d-flex flex-column" v-if="!fullDiscussion">
            <div class="sidebar__item d-flex align-items-center justify-content-between cursor-pointer" v-for="(proposal, pindex) in commentsProposals" :key="pindex" @click="changeProposal(proposal)" :class="{'active':(selectedProposal && selectedProposal.id == proposal.id)}">
                <div class="d-flex align-item-center sidebar__item__content">
                    <Avartar :name="proposal.eventData.customer.companyName" :color="proposal.avatar_color" v-if="proposal.nonMaryoku"></Avartar>
                    <img v-else class="sidebar__item__img" src="/static/icons/maryoku_icon.png">
                    <div class="sidebar__item__details d-flex flex-column">
                        <span class="productLaunchParty">{{proposal.vendor.eventCategory.fullTitle}}</span>
                        <span>{{ proposal.dateCreated | date("DD") }} / {{ proposal.dateCreated | date("MM") }} &nbsp; | &nbsp; ${{ proposal.cost | withComma }}</span>
                    </div>
                </div>
                <!-- <span class="sidebar__item__badge mx-auto">1</span> -->
                <button class="md-button md-vendor md-theme-default sidebar__item__btn" @click="fullDiscussion=true" v-if="!proposal.unread_count">Full Discussion</button>
                <span class="unread-count" v-if="proposal.unread_count">{{proposal.unread_count}}</span>
            </div>
        </div>
        <!-- <div class="sidebar__items d-flex flex-column">
            <div class="sidebar__item d-flex align-items-center justify-content-between cursor-pointer" v-for="proposal in commentsProposals" @click="changeProposal(proposal)" :class="{'active':(selectedProposal && selectedProposal.id == proposal.id)}">

            </div>
        </div> -->
        <Loader :active="loading" :isFullScreen="true" page="vendor"></Loader>
    </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import EventCommentComponent from "@/models/EventCommentComponent";
import { NEGOTIATION_REQUEST_STATUS, NEGOTIATION_REQUEST_TYPE, PROPOSAL_STATUS } from "@/constants/status";
import { PROPOSAL_PAGE_PAGINATION } from "@/constants/pagination";
import { postReq, getReq } from "@/utils/token";
import { FadeTransition } from "vue2-transitions";
import {CommentMixins} from "@/mixins";

const components = {
    Loader: () => import("@/components/loader/Loader.vue"),
    Avartar: () => import("@/components/Avartar.vue"),
    FadeTransition
}

export default {
    name: "inbox-sidebar",
    components,
    props: {},
    mixins: [CommentMixins],
    data: () => ({
        loading: false,
        pagination: PROPOSAL_PAGE_PAGINATION,
        sortFields: { sort: "cost", order: "desc" },
        tab: "all",
        sortBy: '',
        sortType: 'asc',
        statusSortType: 'asc',
        fullDiscussion: false,
        showReply: false,
        showReplyComment: null,
        colors: ['#428dfc', '#21cfe0', '#a3809d', '#ff5888', '#77ad8c', '#fdbe00'],
        editingComment: "",
        showAddress: false,
        selectedComponent:null,
        customers: [],
    }),
    computed: {},

    created() {},
    mounted() {},
    computed: {
        vendor() {
            return this.$store.state.vendor.profile;
        },
        commentsProposals() {

            let proposals = []

            for (let proposal of this.proposals) {
                if (proposal.commentComponent.length) {
                    proposal.unread_count = this.getViewCount(proposal.commentComponent);
                    proposals.push(proposal);
                }
                proposal.avatar_color = this.colors[Math.floor(Math.random() * 5)];
            }

            if (this.sortBy == 'status') {
                proposals.sort((a, b) => {
                    if (this.statusSortType == 'asc') {
                        return b.unread_count - a.unread_count;
                    }

                    return a.unread_count - b.unread_count;
                });
            }

            if (this.sortBy == 'date') {
                proposals.sort((a, b) => {
                    if (this.sortType == 'asc') {
                        return a.dateCreated - b.dateCreated;
                    }

                    return b.dateCreated - a.dateCreated;
                });
            }

            if (this.sortBy == 'name') {
                proposals.sort((a, b) => {
                    if (this.sortType == 'asc') {
                        return a.eventData.customer.name > b.eventData.customer.name ? 1 : -1;
                    }

                    return a.eventData.customer.name < b.eventData.customer.name ? 1 : -1;
                });
            }

            return proposals;
        },
        proposals() {
            return this.$store.state.comment.commentsProposals;
        },
        selectedProposal() {
            if(this.$store.state.comment.selectedProposal){
              this.commentComponents = this.$store.state.comment.selectedProposal.commentComponent
            }
            return this.$store.state.comment.selectedProposal;
        },
    },
    watch: {
        proposals() {
            console.log("this.commentsProposals", this.commentsProposals.length)
            if (this.commentsProposals.length && this.selectedProposal == null) {
                this.changeProposal(this.commentsProposals[0]);
            }
        }
    },
    methods: {
        ...mapMutations("comment", ["setSelectedProposal"]),
        changeProposal(proposal) {
            this.$router.push(`/vendor/inbox/proposal/${proposal.id}`);
        },
        getViewCount(commentComponents = []) {
            let count = 0;
            for (let commentComponent of commentComponents) {
                for (let comment of (commentComponent.comments || [])) {
                    if (!comment.viewed) {
                        count++;
                    }
                }
            }

            return count;
        },
        changeStatusSortType() {
            this.statusSortType = this.statusSortType == 'asc' ? 'desc' : 'asc'
            this.sortBy = 'status';
        },
        changeSortType() {
            this.sortType = this.sortType == 'asc' ? 'desc' : 'asc'
            if (this.sortBy == '') {
                this.sortBy = 'date';
            }
        },
        toggleshowReply(commentIndex) {
            this.showReplyComment = this.showReplyComment == commentIndex ? null : commentIndex
            this.selectedComponent = this.selectedProposal.commentComponent[commentIndex];
        },
        async getMessage(e) {
            if (e.target.value.includes('@')) {
                let queryArray = e.target.value.split('@')

                let res = await getReq(`/1/customers?name=${queryArray[1]}`);
                console.log('customers', res);
                this.customers = res.data;

                this.showAddress = true;
            }
        },
        async saveCommentReply(event, type) {
          let selectedComponent = this.selectedComponent;
          console.log('saveComment', selectedComponent);
          const comment = {
                commentComponent: { id: selectedComponent.id },
                description: this.editingComment,
                parentId: this.mainComment ? this.mainComment.id : null,
                email: this.selectedCustomer ? this.selectedCustomer.email : null,
          };
          this.saveComment({component: selectedComponent, comment, index: this.showReplyComment});
          this.editingComment = ""
          event.stopPropagation();
        },
        toAddress(customer){
          console.log('toAddress', customer, this.editingComment);

          this.selectedCustomer = customer;
          let queryArray = this.editingComment.split('@');
          queryArray[1] = customer.name;

          this.editingComment = queryArray.join('@') + ' ';
          this.showAddress = false
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
    height: calc(100% - 10rem);
    overflow-y: scroll !important
}

.sidebar__item {
    align-items: center;
    padding: 20px;
    border-bottom: 1.3px solid rgba(112, 112, 112, 0.45);
    transition: 0.3s ease-in-out all;
    height: 100px;
    position: relative;
}

.sidebar__item:hover,
.sidebar__item.active {
    background-color: #f6eef6;
}

.sidebar__item__details {
    justify-content: center;
    margin-left: 10px;
}
.sidebar__item__details2 {
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
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

.commentMode {
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

.productLaunchParty {
    height: 21px;
    margin: 0 0 0px 0.3px;
    font-size: 16px;
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

.summer-party .title {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1.5rem;
}

.summer-party .dropdown {
    position: absolute;
    bottom: 3rem;
}

.summer-party .dropdown2 {
    position: absolute;
    bottom: 1rem;
    margin-left: 25px;
}

.summer-party .dropdown select {
    padding: 0 !important;
    border: none !important;
    margin-right: 10px;
}

.summer-party2 {
    position: inherit !important;
    border-bottom: 1.3px solid rgba(112, 112, 112, 0.45);
    box-shadow: none !important;
    height: 10rem;
    display: flex;
    align-items: center;
    padding-left: 25px !important;
    width: 100% !important;
}

.summer-party2 .title {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1.5rem;
}

.summer-party2 .dropdown {
    position: absolute;
    bottom: 3rem;
}

.summer-party2 .dropdown2 {
    position: absolute;
    bottom: 1rem;
    margin-left: 25px;
}

.summer-party2 .dropdown select {
    padding: 0 !important;
    border: none !important;
    margin-right: 10px;
}

.summer-party3 {
    position: inherit !important;
    border-bottom: 1.3px solid rgba(112, 112, 112, 0.45);
    box-shadow: none !important;
    height: 10rem;
    display: flex;
    align-items: center;
    width: 100% !important;
}

.summer-party3 .title {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 3rem;
}

.summer-party3 .dropdown {
    position: absolute;
    bottom: 1rem;
}

.summer-party3 .dropdown2 {
    position: absolute;
    bottom: 1rem;
    margin-left: 25px;
}

.summer-party3 .dropdown select {
    padding: 0 !important;
    border: none !important;
    margin-right: 10px;
}

.sidebar__items::-webkit-scrollbar-thumb {
    border-radius: 0 !important;
}

.unread-count {
    width: 28px;
    height: 28px;
    margin: 37px 34px 57px 13px;
    padding: 3px 11px 3px 10px;
    background-color: #f51355;
    font-size: 16px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: #fff;
    border-radius: 50%;
    position: absolute;
    right: 40px;
}

.unread-count2 {
    // width: 28px;
    // height: 28px;
    // margin: 37px 34px 57px 13px;
    padding: 3px 8px 3px 8px;
    background-color: lightgrey;
    font-size: 16px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: #fff;
    border-radius: 50%;
    position: absolute;
    right: 40px;
}

.event-plan .progress-sidebar {
    left: 0 !important;
    overflow-y: hidden;
}

.sort-bar {
    height: 50px;
    display: grid;
    align-items: center;
    grid-template-columns: 5% 20% 10% 15% 10% 10% 10% 15% 5%;

    .sort-item {
        cursor: pointer;
        color: #707070;
        font-size: 14px;

        &.selected {
            color: #050505;
            font-weight: bold;
        }
    }
}

.mr-1 {
    margin-right: 1rem;
}

.myr-1 {
    margin-right: 1.5rem;
}

.titleText {
    width: 262px;
    height: 40px;
    //   margin: 0 113px 10px 24.5px;
    font-size: 30px;
    font-weight: 800;
    font-stretch: normal;
    font-style: normal;
    // font-family: Manrope;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: #050505;
}

img.header-img {
    width: 21.1px;
    height: 18.5px;
    margin: 15.5px 24.5px 16px 24.5px;
    object-fit: contain;
}

.subText {
    font-size: 20px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    // font-family: Manrope;
    line-height: 1.5;
    letter-spacing: normal;
    text-align: right;
    color: #050505;
}

.fullDiscussion {

    padding: 2rem;

    img {
        width: 30px;
    }

    .dot {
        width: 8px;
        height: 8px;
        margin: 5px 8px 5px 0;
        background-color: #f51355;
        border-radius: 50%;
    }

    .comment {
        font-size: 14px;
        // color: #818080;
        color: black;
    }

    .replay {
        color: #818080;
    }

    .comment_item {
        align-items: center;
        border-bottom: 1.3px solid rgba(112, 112, 112, 0.45);
        transition: 0.3s ease-in-out all;
        position: relative;
        padding-top:1rem;
    }

    .commentsReplies {
        border-top: 1.3px solid rgba(112, 112, 112, 0.45);
        padding: 1rem;

        .commentItem {
            border-bottom: 0.5px solid rgba(112, 112, 112, 0.45);
            padding-top: 20px;
        }

        p {
            font-size: 14px;
        }
    }

    .time {
        font-size: 14px;
        color: #818080;
    }

    .commentDesc {
        padding: 10px 12px;
    }

    .reply-text-area {
        width: 100%;
        height: 100%;
        border-radius: 3px;
        border: solid 1px #989898;
        background-image: none;
        padding: 10px;
    }

    .text-icon {
        position: absolute;
        right: 10px;
        top: 10px;
        width: 20px;
    }
}

.align-item-center {
    align-items: center;
}

.md-button2.md-vendor2 {
    background-color: #fff !important;
    border-color: #fff !important;
    color: #050505 !important;
}
.time-color {
    color: #818080;
}

</style>
