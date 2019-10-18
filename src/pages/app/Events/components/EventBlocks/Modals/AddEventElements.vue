<template>
  <div class="adding-building-blocks-panel">
    <div class="md-layout main-wrapper">
      <div class="md-layout-item md-size-95" style="max-height: 50vh;">
        <div class="md-title">
          <h4>
            Add Event Elements
          </h4>
          <md-button v-if="selectedItems.length > 0" class="md-danger no-padding" @click="addSelectedElements()">
            Add {{selectedItems.length}} Elements
          </md-button>
        </div>
        <div class="md-layout" style="overflow: auto; max-height: 80vh;">
          <div v-for="(item,index) in filteredEventBlocks" 
            :key="index" 
            class="md-layout-item md-size-100 mx-auto event-element-item no-padding"
            @click="addElement(item)"
          >
            <drag :class="[
              `md-button block-item text-center`,
              {'active': isElementSelected(item)}]"
              :transfer-data="{ item }"
              v-if="!item.childComponents">
              {{item.title}}
            </drag>
          </div>
        </div>
      </div>
    </div>
    <drop @drop="handleDrop" class="draggable-area" v-if="isLoaded">
      <p>
        <img src="/static/img/drag_drop_white.png" alt="drag and drop" style="width: 52px;"/>
      </p>
      <p class="" style="">Drag Event Elements Here</p>
    </drop>
  </div>
</template>
<script>
import {
  mapState,
  mapGetters,
  mapMutations,
  mapActions
} from 'vuex';
import CalendarEvent from '@/models/CalendarEvent';
import EventPageHeaderImage from '@/models/EventPageHeaderImage';
import {
  Modal
} from "@/components";
import Calendar from "@/models/Calendar";
import EventComponent from "@/models/EventComponent";
import swal from "sweetalert2";
import {
  error
} from 'util';
import moment from 'moment';
import draggable from 'vuedraggable';
import {
  Drag,
  Drop
} from 'vue-drag-drop';
import VueElementLoading from 'vue-element-loading';

export default {
  components: {
    draggable,
    Drag,
    Drop,
    VueElementLoading
  },
  props: {
    event: Object,
  },
  data: () => ({
    categoryBuildingBlocks: [],
    isLoaded: false,
    filteredEventBlocks: [],
    selectedItems: [],
  }),

  created() {
  },
  mounted() {
    this.getCategoryBlocks();
  },
  methods: {
    ...mapMutations('EventPlannerVuex', ['setBuildingBlockModal']),
    closeModal() {
      this.setBuildingBlockModal({
        showModal: false
      });
    },
    closePanel(payload) {
      this.$emit("closePanel", payload);
    },
    addEventElement(item) {
      let calendar = new Calendar({
        id: this.$auth.user.defaultCalendarId
      });
      let event = new CalendarEvent({
        id: this.event.id
      });

      let new_block = {
        componentId: item.id,
        componentCategoryId: item.categoryId,
        todos: "",
        values: "",
        vendors: "",
        calendarEvent: {
          id: event.id
        }
      }

      new EventComponent(new_block).for(calendar, event).save().then(res => {
        this.$parent.isLoading = false;

        this.setBuildingBlockModal({
          showModal: false
        });

        new EventComponent().for(calendar, event).find(res.item.id).then(item => {
          this.$emit("closePanel", item);
        });
        this.$root.$emit('refreshBuildingBlock');

      })
      .catch(error => {
        console.log('Error while saving ', error);
      })
    },
    getCategoryBlocks() {
      EventComponent.get()
        .then(res => {
          setTimeout(() => {
            this.isLoaded = true;
          }, 500);

          this.categoryBuildingBlocks = res;
          this.filteredEventBlocks = this.categoryBuildingBlocks;

        })
        .catch(error => {
          console.log('Error ', error);
        })
    },
    handleDrop(data, event) {
      this.$parent.isLoading = true;
      let block = data.item ? data.item : data.item1;

      if (block) {
        this.addEventElement(block);
      } else {
        this.$parent.isLoading = false;
      }
    },
    addSelectedElements() {
      this.selectedItems.forEach((item)=>{
        this.addEventElement(item);
      });
    },
    isElementSelected(item) {
      return this.selectedItems.includes(item);
    },
    addElement(item) {
      if (this.selectedItems.includes(item)) {
        this.selectedItems.splice(this.selectedItems.indexOf(item), 1);
      } else {
        this.selectedItems.push(item);
      }
    },
  },
  computed: {
  },
  watch: {
  }
};
</script>
<style lang="scss" scope>
  .md-datepicker {
    .md-icon.md-date-icon {
      display: none;
      & ~ label {
        left: 0;
      }
  }
  input {
    margin-left: 0 !important;
  }
  &.md-field::before,
    &.md-field::after {
      width: 100%;
    }
  }
  .md-field > .md-icon ~ .md-input {
    margin: 0;
  }
</style>
<style lang="scss">
  .main-wrapper {
    max-height: 50vh;
    justify-content: center;
  }
  .md-title {
    display: flex;
    align-items: center;
    justify-content: space-between;

    h4 {
      font-size: 25px;
      font-weight: normal;
      margin: 0;
      padding: .5em 0;
      line-height: 51px;
    }

    button {
      text-transform: capitalize;
      font-size: 14px;
      font-weight: 500;
    }
  }

  .block-item {
    text-transform: capitalize;
    background-color: #f2f2f2!important;
    color: #9c27b0!important;

    &.active {
      background-color: #9a9a9a!important;
      color: white!important;
    }
  }

  .modal-z-index {
    z-index: 5;
  }

  .large-z-index {
    z-index: 6;
    position: relative;
  }

  .move-center {
    margin: 0 auto !important;
    ;
  }

  .move-left {
    margin-left: 0 !important;
    margin-right: auto !important;
  }

  .move-right {
    margin-right: 0 !important;
    margin-left: auto !important;
  }

  .text-center {
    text-align: center;
  }

  .d-flex {
    display: flex;
  }

  .items-center-v {
    align-items: center;
  }

  .items-center-g {
    justify-content: center;
  }

  .justify-beetwen {
    justify-content: space-between
  }

  .md-field .md-error {
    text-align: left;
  }

  .swal2-container {
    z-index: 10000;
  }
</style>