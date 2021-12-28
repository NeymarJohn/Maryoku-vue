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
      <div class="modal-wrapper">
        <div :class="containerClass" v-click-outside="closeModal">
          <div class="modal-header position-relative">
            <md-button
                  class="md-simple position-absolute md-small-hide"
                  style="top: 20px;right:20px"
                  @click="closeModal"
            >
              <md-icon>close</md-icon>
            </md-button>

            <a v-if="actions[name].cancel" class="color-black text-decoration-none mobile-show" @click="closeModal"> Cancel </a>
            <div v-if="actions[name].title" class="font-bold-extra title">{{ actions[name].title }}</div>
            <a v-if="actions[name].action" class="color-red text-decoration-none mobile-show" @click="action">
                {{ actions[name].action }}
            </a>
          </div>

          <div class="modal-body text-center">
              <p class="font-size-14" v-if="actions[name].description"> {{actions[name].description}}</p>

              <div v-if="name === 'MORE_ACTIONS'" class="md-layout text-left">
                <template v-for="(action, key) in actions">
                    <div v-if="key !== 'MORE_ACTIONS'"  class="md-layout-item md-size-100 my-10" @click="selectAction(key)">
                        <img
                            :src="`${$iconURL}${action.icon}`"
                            class="mr-10"
                            style="width: 20px; height: 28px"
                        />
                        {{action.title}}
                    </div>
                </template>
              </div>

              <div v-if="name === 'NEGOTIATION'" class="text-left">
                  <label class="font-size-16 font-bold-extra">Negotiate By:</label>
                  <div class="md-layout md-alignment-center">
                      <div class="md-layout-item md-size-50 md-small-size-100 d-flex align-center">
                          <md-radio class="d-flex" v-model="rate" value="$"></md-radio>
                          <span>Fixed Rate</span>
                      </div>
                      <div class="md-layout-item md-size-50 md-small-size-100 d-flex align-center">
                          <md-radio v-model="rate" value="%"></md-radio>
                          <span>Percentages</span>
                      </div>
                  </div>
                  <label class="mt-10 font-size-16 font-bold-extra">Current Rate: <span class="font-size-18 font-regular ml-10">${{proposal.cost | withComma}}</span></label>
                  <div class="mt-50 width-70">
                      <label class="font-bold pb-10 d-inline-block">Your Rate</label>
                      <MaryokuInput :inputStyle="inputStyle" :placeholder="rate === '$' ? 'Type rate here' : 'Requested discount rate'" v-model="value"></MaryokuInput>
                  </div>
                  <div class="mt-50">
                      <label class="font-bold pb-10 d-inline-block">Add Comment</label>
                      <textarea v-model="comment" placeholder="Type your comment here..."> </textarea>
                  </div>
              </div>

              <div v-if="name === 'REMINDER'" class="text-left">
                  <label>Just select the best time for you: </label>
                  <div class="text-left">
                      <div><md-radio v-model="remindTimeOption" value="today">Later today</md-radio></div>
                      <div><md-radio v-model="remindTimeOption" value="tomorrow">Tomorrow</md-radio></div>
                      <div><md-radio v-model="remindTimeOption" value="specific">Specific Time</md-radio></div>
                  </div>
                  <div class="pl-40 time-selector" v-if="remindTimeOption === 'specific'">
                      <div class="text-left mb-20 d-flex">
                          <div class="width-50">
                              <MaryokuInput
                                  class="form-input mr-10"
                                  placeholder="Choose date…"
                                  inputStyle="date"
                                  v-model="selectedDate"
                              ></MaryokuInput>
                          </div>
                          <TimePicker v-model="selectedTime"></TimePicker>
                      </div>
                      <WarningMessage class="mb-50" label="This offer is valid for 4 days"></WarningMessage>
                  </div>
              </div>

              <event-detail v-if="name === 'EVENT_CHANGE'" :event="proposal.eventData" @change="handleEventChange"></event-detail>

              <div v-if="name === 'COMMENT'"></div>

              <div v-if="name === 'LOOK'"></div>
          </div>

          <div class="modal-footer">
              <md-button class="md-black md-simple my-10" @click="closeModal"> Cancel </md-button>
              <md-button class="md-red md-bold reminder-button my-10" @click="action" :disabled="!value">
                  Update Vendor
              </md-button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { ACTION } from "@/constants/modal";

const components = {
    MaryokuInput: () => import('../Inputs/MaryokuInput.vue'),
    EventDetail: () => import('@/pages/Dashboard/Pages/components/EventDetail.vue'),

    TimePicker: () => import('../Inputs/TimePicker.vue'),
    WarningMessage: () => import("../WarningMessage.vue"),
}

export default {
  components,
  props: {
    containerClass: {
      type: String,
      default: "modal-container",
    },
    allowClickOutside: {
      type: Boolean,
      default: true,
    },
    name: {
      type: String,
    }
  },
  data(){
    return {
        actions: ACTION,
        rate: "$",
        value: null,
        comment: null,

        selectedDate: "",
        selectedTime: "",
        remindTimeOption: "today",
        days: [
            { id: "1", title: "Tomorrow" },
            { id: "2", title: "2 days later" },
            { id: "3", title: "3 days later" },
            { id: "4", title: "4 days later" },
        ],
    };
  },
  beforeCreate() {
    document.body.style.overflow = "hidden";
  },
  destroyed() {
    document.body.style.overflow = "auto";
  },
  methods: {
    closeModal() {

      this.$store.commit('modal/setOpen', null);
    },
    modalMaskClick(event) {
      event.stopPropagation();
      return;
    },
    handleEventChange(){

    },
    selectAction(name){
      this.$store.commit('modal/setOpen', name);
    },
    action(){
      this.$emit('done');
    }
  },
  computed:{
     inputStyle(){
         return this.rate === '$' ? 'budget' : 'percent';
     },
     proposal(){
         return this.$store.state.modal.proposal;
     }
  }
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
