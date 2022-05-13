<template>
  <transition name="modal">
    <div
      :style="styles.modalMask"
      class="modal-mask"
      @click="modalMaskClick"
      @dragstart="modalMaskClick"
      @dragenter="modalMaskClick"
      @dragover="modalMaskClick"
      @dragleave="modalMaskClick"
    >
      <div class="modal-wrapper">
        <div v-click-outside="closeModal" :class="containerClass">
          <div class="modal-header" :style="styles.header">
            <slot name="header" />
          </div>

          <div class="modal-body text-center" :style="styles.body">
            <slot name="body" />
          </div>

          <div class="modal-footer" :style="styles.footer">
            <slot name="footer" />
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
          header:"",
          body:"",
          footer:"",
          modalMask:"",
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

<style lang="scss">
/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container-wizard,
.modal-leave-active .modal-container-wizard .modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
