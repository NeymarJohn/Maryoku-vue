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
      <div class="modal-wrapper ">
        <div v-click-outside="closeModal" :class="containerClass">
          <div class=" d-flex flex-column align-center">
            <div class="modal-header text-center">
              <slot name="header" />
            </div>

            <div class="modal-body text-center">
              <slot name="body" />
            </div>

            <div class="modal-footer text-center">
              <slot name="footer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
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
    closeModal: function() {
      if (this.allowClickOutside) {
        this.$emit("close");
      }
    },
    modalMaskClick: function(event) {
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
