<template>
  <div class="event-plan d-flex">
    <loader :active="loading" :is-full-screen="true" page="vendor" />
    <div class="inboxSidebar" style="position: fixed;">
      <InboxSidebar />
    </div>
    <router-view />
    <div v-if="!selectedProposal" class="proposal-container no-proposal">
      <img :src="`${$iconURL}CommentsMode/ZeroState/Group 22588.svg`">
    </div>

    <section v-if="selectedProposal" class="footer-wrapper">
      <div>
        <md-button class="md-button md-simple md-just-icon md-theme-default scroll-top-button" @click="scrollToTop">
          <img :src="`${$iconURL}common/arrow-right-purple.svg`" width="17">
        </md-button>
      </div>
      <md-button class="md-vendor" @click="showFirstModal = true">Save & send</md-button>
    </section>
    <FirstTransaction v-show="showFirstModal" @start="goNext" @close-modal="showFirstModal = false" />
    <BillingInformationModal v-show="showBillingModal" @close-modal="showBillingModal = false" />
  </div>
</template>
<script>
import BillingInformationModal from "../../../../components/Modals/BillingInformationModal";
const components = {
    InboxSidebar: () => import("../components/InboxSidebar.vue"),
    Loader: () => import("@/components/loader/Loader.vue"),
    FirstTransaction: () => import("../../../../components/Modals/FirstTransaction"),
};
import state from "./state";
import { CommentMixins } from "@/mixins";

export default {
    components:{
      ...components,
      BillingInformationModal,
    },
    mixins: [CommentMixins],
    data() {
        return {
          showBillingModal: false,
          showFirstModal: false,
            loading: false,
            proposalIconsUrl: "https://static-maryoku.s3.amazonaws.com/storage/icons/NewSubmitPorposal/",
        };
    },
    computed: {
        vendorData() {
            return this.$store.state.vendor.profile;
        },
        selectedProposal() {
            return this.$store.state.comment.selectedProposal;
        },
    },
    beforeCreate() {
        this.$store.registerModule("commentProposal", state);
    },
    async created() {
        this.loading = true;
        await this.$store.dispatch("vendorDashboard/getComments", { vendorId: this.vendorData.id });
        await this.getCommentsProposalsByVendor(this.vendorData.id);
        this.loading = false;
    },
    methods: {
      goNext() {
        this.showFirstModal = false;
        this.showBillingModal = true;
      },
        scrollToTop() {
            setTimeout(() => {
                window.scrollTo(0, 0);
            }, 100);
        },
    }
};

</script>
<style lang="scss" scoped>
.no-proposal {
  position: absolute;
  height: 90vh;
  img{
    display: block;
    position: relative;
    top: 15%;
    left: 650px;
  }
}
section.footer-wrapper {
    padding: 11px 100px 11px 20px;
    background-color: #ffffff;
    border-radius: 3px;
    box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    width: 100%;
    z-index: 10;
    overflow: hidden;
    bottom: 0;

    .prev-cont {
        font-size: 16px;
        font-weight: 800;
        cursor: pointer;

        img {
            width: 20px;
            transform: rotate(180deg);
        }
    }

    .next-cont {
        span {
            font-size: 14px;
            font-weight: normal;
            margin-right: 41px;
        }

        a {
            padding: 18px 49px;
            cursor: pointer;
            border-radius: 3px;
            font-size: 20px;
            font-weight: 800;
            display: inline-block;
            min-width: 250px;
            text-align: center;

            &.discard {
                color: #050505;
                margin-right: 41px;
                min-width: 100px;
                padding: 18px 0px;

                img {
                    width: 25px;
                    margin-right: 12px;
                }
            }

            &.save {
                border: 1px solid #641856;
                color: #641856;
                margin-right: 41px;

                img {
                    width: 25px;
                    margin-right: 12px;
                }
            }

            &.next {
                background: #d5d5d5;
                color: #ffffff;

                &:hover {
                    color: #ffffff !important;
                }
            }
        }
    }
}

.scroll-top-button {
    img {
        height: 20px;
        transform: rotate(-90deg);
    }
}

.inboxSidebar {
    position: fixed;
    left: 80px;
    top: 0;
    bottom: 0;
    width: 25vw;
    height: 100vh;
    z-index: 10;
}

.event-plan {}

.inboxSidebar {
    z-index: 10;
}

</style>
