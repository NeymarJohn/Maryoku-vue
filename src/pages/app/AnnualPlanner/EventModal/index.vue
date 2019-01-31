<template>
    <div>
        <div class="md-layout">
            <modal v-if="eventModalOpen" @close="noticeModalHide" container-class="modal-container">
                <template slot="header" class="header-position">
                    <h3 class="title">{{ modalTitle }}</h3>
                    <button class="btn-position" @click="closeModal">X</button>
                </template>
                <template slot="body">
                    <div class="md-layout">
                        <div class="md-layout-item md-size-100 md-small-size-100 scrollable-container">
                            <event-header-form :selected-date="selectedDate" :formData="formData"></event-header-form>
                        </div>
                    </div>
                </template>
                <template slot="footer">
                    <md-button class="move-left md-rose md-simple" @click="closeModal">Close</md-button>
                </template>
            </modal>
        </div>
    </div>
</template>
<script>
  import EventHeaderForm from 'src/pages/app/Events/components/EventHeaderForm.vue';
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';
  import {Modal} from "@/components";
  import {SlideYDownTransition} from "vue2-transitions";

  export default {
    components: {
      Modal,
      SlideYDownTransition,
      EventHeaderForm
    },
    props: {
      selectedDate: String,
      allowClickOutside: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        formData: null,
      }
    },
    created() {
    },
    computed: {
      ...mapState('AnnualPlannerVuex', [
        'eventModalOpen',
        'modalTitle',
        'editMode',
      ])
    },
    methods: {
      ...mapMutations('AnnualPlannerVuex', ['resetForm', 'setEventModal']),
      noticeModalHide: function () {
        this.setEventModal(false);
      },
      closeModal(){
        this.setEventModal(false);
      },
      toggleModal: function (show) {
        this.setEventModal(show);
      },
      getError(fieldName) {
        return this.errors.first(fieldName);
      },
      validate() {
        return this.$validator.validateAll().then(res => {
          this.$emit("on-validated", res);
          return res;
        });
      },
    },
  };
</script>

<style scoped>

</style>
