<template>
  <div class="progress-sidebar">
    <div class="summer-party2">
      <div class="d-flex">
        <span class="titleText">
          All Comments
        </span>
      </div>
      <div class="dropdown d-flex">
        <span class="subText">
          March Madness
        </span>
      </div>
      <div class="dropdown2 d-flex">
        <md-menu md-size="medium" class="action-menu myr-1" :md-offset-x="-300" :md-offset-y="-36">
          <md-button
            md-menu-trigger
            class="edit-btn md-simple sortStatus"
            @click.stop="changeCommentSortType('name')"
          >
            Sort
            <i v-if="commentSortType == 'asc'" class="fas fa-chevron-up my-chevron"
               @click.stop="changeCommentSortType('name')" @click="sortBy='name'" />
            <i v-else class="fas fa-chevron-down my-chevron" @click.stop="changeCommentSortType('name')"
               @click="sortBy='name'" />
          </md-button>
        </md-menu>
        <md-button
          md-menu-trigger
          class="edit-btn md-simple sortStatus"
          @click.stop="changeCommentSortType('status')"
        >
          Status
          <i v-if="commentStatusSortType == 'asc'" class="fas fa-chevron-up my-chevron"
             @click.stop="changeCommentSortType('status')" />
          <i v-else class="fas fa-chevron-down my-chevron" @click.stop="changeCommentSortType('status')" />
        </md-button>
      </div>
    </div>
    <div class="sidebar__items d-flex flex-column fullDiscussion">
      <div
        v-for="(commentComponent, commentIndex) in commentComponents"
        v-if="commentComponent.comments && commentComponent.comments.length"
        :key="commentIndex"
        class="comment_item align-items-center justify-content-between cursor-pointer"
      >
        <div class="d-flex justify-content-between">
          <div class="sidebar__item__details2 d-flex">
            <img class="" src="/static/icons/Group 21554.png">
            <div class="productLaunchParty">
              <div v-if="commentComponent.planner">
                {{ commentComponent.planner.name }}
              </div>
              <div v-if="commentComponent.customer">
                {{ commentComponent.customer.name }}
              </div>
            </div>
          </div>
          <div v-if="daysDiff(commentComponent.dateCreated) > 1" class="time-color">
            {{ commentComponent.dateCreated | date("DD/MM/YYYY") }}
          </div>
          <timeago v-else class="time-color" :datetime="commentComponent.dateCreated" />
        </div>
        <div class="d-flex sidebar__item__content">
          <div class="dot" />
          <span class="comment">
            {{
              (commentComponent.comments && commentComponent.comments.length)
                ? commentComponent.comments[0].description : ""
            }}
          </span>
        </div>
        <div class="d-flex sidebar__item__content justify-content-between mt-1 mb-1">
          <span class="replay" @click="toggleshowReply(commentIndex)">{{ commentComponent.comments.length - 1 }} Reply
            <i class="fas fa-chevron-down" />
          </span>
          <span class="unread-count2">02</span>
        </div>
        <div v-if="showReplyComment == commentIndex" class="commentsReplies p-4">
          <div v-for="(comment, cindex) in commentComponent.comments" v-if="cindex>0" :key="cindex" class="commentItem"
               :class="{'b-bottom':(commentComponent.comments.length-1 !== cindex)}">
            <div class="d-flex sidebar__item__content2 justify-content-between">
              <!-- <div class="d-flex sidebar__item__content"> -->
              <div class="sidebar__item__details d-flex">
                <img class="" src="/static/icons/Group 21554.png">
                <div class="productLaunchParty">
                  <div v-if="comment.planner">
                    {{ comment.planner.name }}
                  </div>
                  <div v-if="comment.customer">
                    {{ comment.customer.name }}
                  </div>
                </div>
              </div>
              <!-- </div> -->
              <div v-if="daysDiff(comment.dateCreated) > 1" class="time-color">
                {{ comment.dateCreated | date("DD/MM/YYYY") }}
              </div>
              <timeago v-else class="time-color" :datetime="comment.dateCreated" />
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
            <textarea ref="commentEditor" v-model="editingComment" rows="4" class="form-control reply-text-area"
                      placeholder="Write reply here" @input="getMessage" />
            <img :src="`${$iconURL}comments/SVG/editor-dark.svg`" class="text-icon">
            <div class="footer text-right my-top my-bottom">
              <md-button class="md-simple normal-btn md-black" @click="">
                Cancel
              </md-button>
              <md-button class="normal-btn background-red" @click="saveCommentReply($event, 'reply')">
                Submit
              </md-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Loader :active="loading" :is-full-screen="true" page="vendor" />
  </div>
</template>

<script>
import { PROPOSAL_PAGE_PAGINATION } from "@/constants/pagination";
import { FadeTransition } from "vue2-transitions";
import { CommentMixins } from "@/mixins";
import moment from "moment";
import { getReq } from "@/utils/token";

const components = {
  Loader: () => import("@/components/loader/Loader.vue"),
  Avartar: () => import("@/components/Avartar.vue"),
  FadeTransition,
};

export default {
  name: "CommentSidebar",
  components,
  mixins: [CommentMixins],
  props: {},
  data: () => ({
    loading: false,
    pagination: PROPOSAL_PAGE_PAGINATION,
    sortFields: { sort: "cost", order: "desc" },
    tab: "all",
    sortBy: "",
    sortType: "asc",
    statusSortType: "asc",
    commentSortBy: "",
    commentSortType: "asc",
    commentStatusSortType: "asc",
    fullDiscussion: true,
    showReply: false,
    showReplyComment: null,
    colors: ["#428dfc", "#21cfe0", "#a3809d", "#ff5888", "#77ad8c", "#fdbe00"],
    editingComment: "",
    showAddress: false,
    selectedComponent: null,
    customers: [],
  }),
  mounted() {
    this.commentComponents = this.$store.state.comment.commentComponents.filter(component => component.comments && component.comments.length);
  },
  methods: {
    changeCommentSortType(sortByType) {
      if (sortByType == "name") {
        this.commentSortType = this.commentSortType == "asc" ? "desc" : "asc";
      }

      if (sortByType == "status") {
        this.commentStatusSortType = this.commentStatusSortType == "asc" ? "desc" : "asc";
      }

      this.commentSortBy = sortByType;

      let components2 = [];

      for (let component of this.commentComponents) {
        if (component.comments.length) {
          component.unread_count = this.getViewCount(component.comments);
          components2.push(component);
        }
      }

      if (sortByType == "name") {
        if (this.commentSortBy == "name") {
          components2.sort((a, b) => {
            let name1 = a.customer ? a.customer.name : a.planner.name;
            let name2 = b.customer ? b.customer.name : b.planner.name;
            if (this.commentSortType == "asc") {
              return name1 > name2 ? 1 : -1;
            } else {
              return name1 < name2 ? 1 : -1;
            }
          });
        }
      }

      if (sortByType == "status") {
        if (this.commentSortBy == "status") {
          components2.sort((a, b) => {
            if (this.commentStatusSortType == "asc") {
              return b.unread_count - a.unread_count;
            }

            return a.unread_count - b.unread_count;
          });
        }
      }

      this.commentComponents = components2;
    },
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
    async saveCommentReply(event, type) {
      let selectedComponent = this.selectedComponent;
      const comment = {
        commentComponent: { id: selectedComponent.id },
        description: this.editingComment,
        parentId: this.mainComment ? this.mainComment.id : null,
        email: this.selectedCustomer ? this.selectedCustomer.email : null,
      };
      this.saveComment({ component: selectedComponent, comment, index: this.showReplyComment });
      this.editingComment = "";
      event.stopPropagation();
    },
    daysDiff(date) {
      return moment(moment()).diff(moment(date), "days");
    },
  },
};

</script>

<style lang="scss" scoped>
.title-icon {
  margin-right: 10px;
}

.sidebar__items {
  height: calc(100% - 10rem);
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

.progress-sidebar {
  height: 80vh;
}

.summer-party2 {
  position: inherit !important;
  border-bottom: 1.3px solid rgba(112, 112, 112, 0.45);
  box-shadow: none !important;
  height: 10rem;
  display: flex;
  align-items: center;
  padding-left: 50px !important;
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
}

.summer-party2 .dropdown select {
  padding: 0 !important;
  border: none !important;
  margin-right: 10px;
}

.sidebar__items::-webkit-scrollbar-thumb {
  border-radius: 0 !important;
}

.unread-count2 {
  // width: 28px;
  // height: 28px;
  // margin: 37px 34px 57px 13px;
  padding: 5px 8px 5px 8px;
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
  right: 0;
  top: 75px;
}

.myr-1 {
  margin-right: 1.5rem;
  margin-top: 0.25rem;
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

  padding: 1rem 3rem;

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

  .time {
    font-size: 14px;
    color: #818080;
  }

  .commentDesc {
    padding: 10px 12px 10px 0px;
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

.md-button.md-simple i.my-chevron {
  color: #050505 !important;
}

.time-color {
  color: #818080;
}

.my-top {
  margin-top: 20px;
}

.my-bottom {
  margin-bottom: 20px;
}

.adaptive {
  overflow-y: hidden !important;
}

.background-red {
  background-color: #f51355 !important;
}

</style>
