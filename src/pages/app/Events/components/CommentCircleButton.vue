<template>
  <div class="maryoku-component color-select-button" :class="{topIcon:showEditPane}">
    <md-button
      class="add-button md-just-icon md-white"
      @click="toggleEditPane( $event )"
      v-if="showEditPane"
    >
      <img :src="`${$iconURL}common/message-yellow.svg`"  width="100%">
    </md-button>
    <md-button
      class="add-button md-just-icon md-yellow"
      @click="toggleEditPane( $event )"
      @mouseenter="showComments($event)"
      @mouseleave="showCommentList=false"
      v-else
    >
      <span> {{commentComponent.index}}</span>
    </md-button>
  </div>
</template>
<script>

export default {
  name: "comment-circle-button",
  props: {
    /**
     * Data binding
     * @model
     */
    value: {
      type: [Object, String]
    },
    commentComponent: {
      type: [Object]
    },
    selectedComponet: {
      type: [Object]
    }
  },
  data: () => ({
    showEditPane: false,
    showCommentList: true,
  }),
  methods: {
    hidePane: function(event) {
      this.showEditPane = false;
    },
    updateValue: function(value) {
    },
    toggleEditPane: function(event) {
      this.showEditPane = !this.showEditPane;
      this.$emit("toggleEditPane", this.commentComponent, this.showEditPane)
      event.stopPropagation();
    },
    
    showComments: function(event) {
      this.$emit("show", this.commentComponent)
      this.showCommentList = true
    },
  },
  created() {
  },
  watch: {
    selectedComponet(newValue, oldValue) {
      console.log(newValue)
      if (!newValue) {
        this.showEditPane = false
      } else {
        this.showEditPane = this.commentComponent.index == newValue.index
      }
    }
  },
};
</script>
<style lang="scss" scoped>
.color-select-button {
  position: absolute;
  &-mask {
    position: fixed;
    width: 100vw;
    height: 100vh;
    left:0px;
    top: 0px;
    z-index: 30;
  }
}
.md-button.add-button {
  width: 38px;
  height: 38px;
  // border-radius: 50%;
  margin:0px;
  // &.add-button {}
}
.add-button{
    -webkit-box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
    border-radius: 50%;
  }
.vc-chrome {
  left: 65px;
  top: 0px;
  &:before {
    content: "";
    width: 10px;
    height: 10px;
    position: absolute;
    border: 1px solid #989898;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
    left: -6px;
    top: 22px;
  }
}
.topIcon {
  z-index: 10 !important;
}
</style>
