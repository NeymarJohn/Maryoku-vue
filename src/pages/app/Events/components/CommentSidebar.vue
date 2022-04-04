<template>
  <div class="comment-sidebar">
    <div class="d-flex flex-column">
      <div class="header-section d-flex justify-content-start align-center">
        <span class="title-label">
          All Comments
        </span>
        <div class="dropdown">
          <span class="subText">
            Last Update
          </span>
          <i class="fas fa-chevron-down my-chevron" />
        </div>
      </div>
      <div class="header-tabs d-flex justify-content-around ">
        <div v-for="tab in commentsTab"
             :key="tab.value"
             class="header-tab"
             :class="{'tab-selected': tab.value === activeTab}"
             @click="activeTab = tab.value"
        >
          {{ tab.label }}
        </div>
      </div>
    </div>
    <div class="sidebar__items d-flex flex-column ">
      <div v-for="(commentComponent, commentIndex) in sortedComponents"
           v-if="commentComponent.comments && commentComponent.comments.length"
           :key="commentIndex"
           class="comment_item fullDiscussion align-items-center justify-content-between cursor-pointer"
      >
        <div class="d-flex justify-content-between">
          <!-- sidebar__item__content -->
          <div class="sidebar__item__details2 d-flex">
            <img class="" src="/static/icons/Group 21554.png">
            <div class="productLaunchParty">
              <div v-if="commentComponent.planner">
                {{ commentComponent.planner.name }}
              </div>
              <div v-if="commentComponent.customer">
                {{ commentComponent.customer.name }}
              </div>
              <div v-if="daysDiff(commentComponent.dateCreated) > 1" class="time-color">
                {{ commentComponent.dateCreated | date("DD/MM/YYYY") }}
              </div>
              <timeago v-else class="d-block time-color" :datetime="commentComponent.dateCreated" />
            </div>
          </div>
          <drop-down class="d-flex">
            <button class="more-button" data-toggle="dropdown">
              <md-icon class="font-size-30">
                more_vert
              </md-icon>
            </button>
            <ul class="dropdown-width dropdown-menu dropdown-other dropdown-menu-right ">
              <li class="other-list">
                <a class="other-item font-size-16">
                  <div class="other-name font-size-16">
                    <md-icon>share</md-icon>
                    &nbsp;&nbsp;
                    <span>
                      {{ "Share" }}
                    </span>
                  </div>
                </a>
              </li>
              <li class="other-list">
                <a class="other-item font-size-16">
                  <div class="other-name font-size-16">
                    <md-icon>edit</md-icon>
                    &nbsp;&nbsp;
                    <span>
                      {{ "Edit" }}
                    </span>
                  </div>
                </a>
              </li>
            </ul>
          </drop-down>
        </div>
        <div class="sidebar__item__content w-90">
          <div class="dot" />
          <span
            class="comment">{{ (commentComponent.comments && commentComponent.comments.length) ? commentComponent.comments[0].description : ""
            }} </span>
        </div>
        <div class="d-flex sidebar__item__content_2 justify-content-between mt-1 mb-1">
          <span class="replay" @click="toggleshowReply(commentIndex)">{{ commentComponent.comments.length - 1 }} Reply
            <i class="fas fa-chevron-down" />
          </span>
          <span class="unread-count"><center>{{ commentComponent.comments.length - 1 }}</center></span>
          <!-- <span>
                        <Avartar :name="activeProposal.eventData.customer.companyName"></Avartar>
                    </span> -->
        </div>
        <div v-if="showReplyComment == commentIndex" class="commentsReplies p-4"
             :class="{'commentsNoReply':(commentComponent.comments.length <= 1)}">
          <div v-for="(comment, cindex) in commentComponent.comments" v-if="cindex>0" :key="cindex" class="commentItem"
               :class="{'b-bottom':(commentComponent.comments.length-1 !== cindex)}">
            <div class="d-flex sidebar__item__content2 justify-content-between">
              <div class="sidebar__item__details d-flex">
                <img class="" src="/static/icons/Group 21554.png">
                <div class="productLaunchParty">
                  <div v-if="comment.planner">
                    {{ comment.planner.name }}
                  </div>
                  <div v-if="comment.customer">
                    {{ comment.customer.name }}
                  </div>
                  <div v-if="daysDiff(comment.dateCreated) > 1" class="time-color">
                    {{ comment.dateCreated | date("DD/MM/YYYY") }}
                  </div>
                  <timeago v-else class="d-block time-color" :datetime="comment.dateCreated" />
                </div>
              </div>
              <drop-down class="d-flex">
                <button class="more-button" data-toggle="dropdown">
                  <md-icon class="font-size-30">
                    more_vert
                  </md-icon>
                </button>
                <ul class="dropdown-width dropdown-menu dropdown-other dropdown-menu-right ">
                  <li class="other-list">
                    <a class="other-item font-size-16">
                      <div class="other-name font-size-16">
                        <md-icon>share</md-icon>
                        &nbsp;&nbsp;
                        <span>
                          {{ "Share" }}
                        </span>
                      </div>
                    </a>
                  </li>
                  <li class="other-list">
                    <a class="other-item font-size-16">
                      <div class="other-name font-size-16">
                        <md-icon>edit</md-icon>
                        &nbsp;&nbsp;
                        <span>
                          {{ "Edit" }}
                        </span>
                      </div>
                    </a>
                  </li>
                </ul>
              </drop-down>
            </div>
            <div class="commentDesc">
              <span>{{ comment.description }}</span>
            </div>
          </div>
        </div>
        <div v-if="showReplyComment == commentIndex">
          <div class="form-group position-relative reply-form my-top">
            <fade-transition v-if="showAddress">
              <md-card class="position-absolute notification-card">
                <md-card-content class="d-flex align-center position-relative p-10">
                  <md-menu md-size="medium" class="action-menu">
                    <md-menu-item v-for="c in customers" :key="c.id" @click="toAddress(c)">
                      {{ c.name }}
                    </md-menu-item>
                  </md-menu>
                </md-card-content>
              </md-card>
            </fade-transition>
            <textarea ref="commentEditor" v-model="editingCommentReply" rows="4" class="form-control reply-text-area"
                      placeholder="Write reply here" @input="getMessage" />
            <img :src="`${$iconURL}comments/SVG/editor-dark.svg`" class="text-icon">
            <div class="footer text-right my-top my-bottom d-flex">
              <md-icon class="">
                attach_file
              </md-icon>
              <md-icon class="">
                sentiment_satisfied_alt
              </md-icon>
              <md-button class="md-simple md-black normal-btn" @click="cancelCommentReply()">
                Cancel
              </md-button>
              <md-button class="md-red maryoku-btn" @click="saveCommentReply($event, 'reply')">
                Submit
              </md-button>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="comment_item fullDiscussion align-items-center justify-content-between cursor-pointer" style="float: right;">
                <div class="form-group position-relative reply-form my-top">
                    <textarea rows="4" class="form-control reply-text-area" placeholder="Write comment here" v-model="editingComment" ref="commentEditor" @input="getMessage"></textarea>
                    <img :src="`${$iconURL}comments/SVG/editor-dark.svg`" class="text-icon" />
                    <div class="footer text-right my-top my-bottom d-flex">
                        <md-icon class="" >attach_file</md-icon>
                        <md-icon class="" >sentiment_satisfied_alt</md-icon>
                        <md-button class="md-simple md-black normal-btn" @click="cancelNewComment()">Cancel</md-button>
                        <md-button class="md-red maryoku-btn" @click="saveNewComment($event, 'reply')">Submit</md-button>
                    </div>
                </div>
            </div> -->
    </div>
  </div>
</template>
<script>
import { CommentMixins } from "@/mixins";
import moment from "moment";
import { FadeTransition } from "vue2-transitions";
import { PROPOSAL_PAGE_PAGINATION } from "@/constants/pagination";

const components = {
  FadeTransition,
};

export default {
  name: "CommentSidebar",
  components,
  mixins: [CommentMixins],
  props: {},
  data() {
    return {
      loading: false,
      pagination: PROPOSAL_PAGE_PAGINATION,
      showReply: false,
      showReplyComment: null,
      editingComment: "",
      editingCommentReply: "",
      showAddress: false,
      selectedComponent: null,
      customers: [],
      commentsTab: [
        { label: "All", value: "all" },
        { label: "Internal", value: "internal" },
        { label: "Vendors", value: "vendors" },
        { label: "@ Mentions", value: "mentions" },
      ],
      activeTab: "all",
    };
  },
  computed: {
    proposal() {
      return this.$store.state.eventPlan.proposal;
    },
    url() {
      let proposal = this.$store.state.eventPlan.proposal;
      return proposal ? `/proposals/${this.$store.state.eventPlan.proposal.id}` : this.$route.path;
    },
    sortedComponents() {
      let components = [...this.filteredComponents];
      return components.sort((a, b) => b.lastUpdated - a.lastUpdated);
    },
    filteredComponents() {
      switch (this.activeTab) {
        case "internal":
          return this.commentComponents.filter(component => component.planner && !component.customer);
        case "vendors":
          return this.commentComponents.filter(component => component.customer && !component.planner);
        case "mentions":
          return this.commentComponents.filter(component => component.mentions);
        default: {
          return this.commentComponents;
        }
      }
    },
  },
  methods: {
    async getMessage(e) {
      if (e.target.value.includes("@")) {
        let queryArray = e.target.value.split("@");
        let res = await getReq(`/1/customers?name=${queryArray[1]}`);
        this.customers = res.data;
        this.showAddress = true;
      }
    },
    toggleshowReply(commentIndex) {
      this.showReplyComment = this.showReplyComment == commentIndex ? null : commentIndex;
      this.selectedComponent = this.commentComponents[commentIndex];
    },
    async saveNewComment(event, type) {
      let selectedComponent = this.selectedComponent;
      const comment = {
        commentComponent: { id: selectedComponent.id },
        description: this.editingComment,
        parentId: this.selectedComponent ? this.selectedComponent.comments[0].id : null,
        email: this.selectedCustomer ? this.selectedCustomer.email : null,
      };
      this.saveComment({ component: selectedComponent, comment, index: this.showReplyComment });
      this.editingComment = "";
      event.stopPropagation();
    },
    async saveCommentReply(event, type) {
      let selectedComponent = this.selectedComponent;
      const comment = {
        commentComponent: { id: selectedComponent.id },
        description: this.editingCommentReply,
        parentId: this.selectedComponent ? this.selectedComponent.comments[0].id : null,
        email: this.selectedCustomer ? this.selectedCustomer.email : null,
      };
      this.saveComment({ component: selectedComponent, comment, index: this.showReplyComment });
      this.editingCommentReply = "";
      event.stopPropagation();
    },
    daysDiff(date) {
      return moment(moment()).diff(moment(date), "days");
    },
  },
};

</script>

<style lang="scss">
.comment-sidebar {
  position: fixed;
  left: 80px;
  top: 0;
  bottom: 0;
  width: 400px;
  // background: #fff;
  background-color: #fff;

  // height: calc(100vh - 80px);
  overflow-x: hidden;
  overflow-y: auto;
  z-index: 1;
  height: 100%;
  // height: 80vh;
  // box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);

  .header-section {
    width: 400px;
    background: #fff;
    // padding : 1.5em 0 0.6em;
    padding: 35px 0px 40px;
    // position: absolute;
    // left: 0px;
    // right: 0px;
    // top: 0;
    // z-index: 999998;
    // border-bottom: 1.3px solid rgba(112, 112, 112, 0.45);
    // box-shadow: 0 43px 41px 0 rgba(0, 0, 0, 0.16);
    // height: 185px;
    height: 110px;

    .title-label {
      // width: 262px;
      // height: 40px;
      font-size: 30px;
      font-weight: 800;
      // font-family: "Manrope-ExtraBold", sans-serif;
      color: #050505;
      text-transform: uppercase;
      padding-left: 30px;
      padding-right: 15px;
      line-height: normal;
      letter-spacing: normal;
      text-align: left;
    }

    .subText {
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      // font-family: Manrope;
      line-height: 1.5;
      letter-spacing: normal;
      text-align: right;
      color: #050505;
      cursor: pointer;
    }

    i {
      cursor: pointer;
    }
  }

  .header-tabs {
    width: 400px;
    background: #fff;
    // padding : 1.5em 0 0.6em;
    // padding: 35px 0px 40px;
    // position: absolute;
    // left: 0px;
    // right: 0px;
    // top: 0;
    // z-index: 999999;
    border-bottom: 1.3px solid rgba(112, 112, 112, 0.45);
    // box-shadow: 0 43px 41px 0 rgba(0, 0, 0, 0.16);
    height: 58px;
    padding: 20px 0px 0px 0px;

    .header-tab {
      cursor: pointer;
    }

    .tab-selected {
      // border-bottom: 0.5px solid #707070;
      border-bottom: 4px solid #f51355;
    }
  }

  .sidebar__items {
    height: calc(100% - 10rem);
  }

  .sidebar__items::-webkit-scrollbar-thumb {
    border-radius: 0 !important;
  }

  .fullDiscussion {

    padding: 1rem 2rem;
    border-bottom: 1px groove;

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
      padding-top: 1rem;
    }

    .commentsReplies {
      border-top: 1.3px solid rgba(112, 112, 112, 0.45);
      border-bottom: 1.3px solid rgba(112, 112, 112, 0.45);
      padding: 1rem 0rem 1rem 2rem;

      .commentItem {
        // border-bottom: 0.5px solid rgba(112, 112, 112, 0.45);
        padding-top: 20px;
        padding-bottom: 10px;
      }

      .b-bottom {
        border-bottom: 0.5px solid rgba(112, 112, 112, 0.45);
      }

      p {
        font-size: 14px;
      }
    }

    .commentsNoReply {
      border-top: 1.3px solid rgba(112, 112, 112, 0.45) !important;
      border-bottom: none !important;
      padding: 0rem !important;
    }

    .commentDesc {
      padding: 10px 12px 10px 0px;
      margin-top: 10px;
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
    margin-top: 20px;
    display: -webkit-box !important;
  }

  .sidebar__item__content_2 {
    margin-left: 5px;
  }

  .sidebar__item__content2 {
    // margin-left: 5px;
    margin-left: -1rem;
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

  .unread-count {
    width: 35px;
    height: 35px;
    margin: -5px 3px 3px 3px;
    padding: 6px 7px 7px 8px;
    // margin: 37px 34px 57px 13px;
    // padding: 4px 8px 4px 8px;
    background-color: #ffc001;
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
    // top: 75px;
  }

  .myr-1 {
    margin-right: 1.5rem;
    margin-top: 0.25rem;
  }

  .md-button.md-simple i.my-chevron {
    color: #050505 !important;
  }

  .time-color {
    color: #a0a0a0;
    font-size: 12px;
    margin-top: -5px;
    font-weight: normal;
  }

  .my-top {
    margin-top: 20px;
  }

  .my-bottom {
    margin-bottom: 20px;
  }

  .w-90 {
    width: 90% !important;
  }

  .dropdown-menu li > a {
    padding: 5px 5px !important;
    margin: 0 0px !important;
  }

  .dropdown-menu li a:hover,
  .dropdown-menu li a:focus,
  .dropdown-menu li a:active {
    background-color: transparent !important;
    color: initial !important;
    box-shadow: none !important;
    padding: 5px 5px !important;
    margin: 0 0px !important;
  }

  .dropdown-other {
    padding: 13.5px 7px !important;
  }

  .dropdown-other li a:hover,
  .dropdown-other li a:focus,
  .dropdown-other li a:active {
    background-color: #fff7f9 !important;
    color: #000 !important;
    box-shadow: none !important;
    text-decoration: none !important;

    i {
      background-color: #fff7f9 !important;
      color: #000 !important;
    }
  }

  .dropdown-width {
    // width: max-content;
    width: 118px;
  }

  .more-button {
    border: none;
    background: none;
    cursor: pointer;
    // display: inline-flex;
    i {
      margin: 0px;
      color: #b7b5b5 !important;
    }
  }

}

</style>
