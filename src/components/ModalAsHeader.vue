<template>
  <transition name="modal">
    <div
      class="modal-mask"
      @click="modalMaskClick"
      @dragstart="modalMaskClick"
      @dragenter="modalMaskClick"
      @dragover="modalMaskClick"
      @dragleave="modalMaskClick"
    >
      <div class="modal-wrapper modal-modified">
        <div v-click-outside="closeModal" :class="containerClass">
          <div class="modal-body text-center body-modified" :style="styles.body">
            <slot name="body" />
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    styles: {
      type: Object,
      default(){
        return{
          body:""
        };
      }
    },
    containerClass: {
      type: String,
      default: "modal-container",
    },
    allowClickOutside: {
      type: Boolean,
      default: true,
    },
  },
  beforeCreate() {
    document.body.style.overflow = "hidden";
  },
  destroyed() {
    document.body.style.overflow = "auto";
  },
  methods: {
    closeModal: function () {

      this.$emit("close");
    },
    modalMaskClick: function (event) {
      event.stopPropagation();
      return;
    },
  },
};
</script>

<style lang="scss" scoped>

.modal-modified{
  width: 100%;
  position: absolute;
  top: 0;
.modal-container{
  width: 100%;
  max-width: unset;
  padding-left: 72px;
  position: fixed;
  top: 0;
  .body-modified{
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    align-items: center;
  }
}

}
//
//.modal-enter {
//  opacity: 0;
//}
//
//.modal-leave-active {
//  opacity: 0;
//}
//
//
//.modal-enter .modal-container-wizard,
//.modal-leave-active .modal-container-wizard .modal-enter .modal-container,
//.modal-leave-active .modal-container {
//  -webkit-transform: scale(1.1);
//  transform: scale(1.1);
//}
</style>
