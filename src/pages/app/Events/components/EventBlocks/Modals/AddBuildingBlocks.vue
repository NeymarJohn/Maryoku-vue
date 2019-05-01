<template>
    <div class="event_header-image-modal">
        <div class="md-layout">
            <modal v-if="addBuildingBlockModal">
                <template slot="header">
                    <div class="md-layout d-flex items-left" >
                        <h4>Add Building Block
                        </h4>
                    </div>
                    <md-button class="md-simple md-just-icon md-round modal-default-button" @click="closeModal">
                        <md-icon>clear</md-icon>
                    </md-button>
                </template>
                <template slot="body" v-if="categoryBuildingBlocks">

                    <ul class="add-building-blocks-list text-left">
                        <li v-for="(item,index) in categoryBuildingBlocks" :key="index" >
                            <template v-if="!item.childComponents">
                                <md-button :class="`md-${item.color} md-sm md-just-icon`">
                                    <md-icon >{{item.icon}}</md-icon>
                                </md-button>
                                <span>{{item.value}}</span>

                                <md-button class="md-success md-just-icon pull-right md-sm md-simple" @click="addBuildingBlock(item)"><md-icon class="">add</md-icon></md-button>

                            </template>
                            <template v-else-if="item.childComponents">
                                <h4>{{item.value}}</h4>
                                <template >
                                    <ul class="child-components-list">
                                        <li v-for="(item1,index1) in item.childComponents" :key="index1" >

                                            <md-button :class="`md-${item1.color} md-sm md-just-icon`">
                                                <md-icon>{{item1.icon}}</md-icon>
                                            </md-button>
                                            <span>{{item1.title}} </span>

                                            <md-button class="md-success md-just-icon pull-right md-sm md-simple" @click="addBuildingBlock(item1)"><md-icon class="">add</md-icon></md-button>
                                        </li>
                                    </ul>
                                </template>
                            </template>
                        </li>
                    </ul>
                </template>
                <template slot="footer">
                    <md-button class="md-success move-right" >
                        Add
                    </md-button>
                </template>
            </modal>
        </div>

    </div>
</template>
<script>
  import auth from '@/auth';
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';
  import CalendarEvent from '@/models/CalendarEvent';
  import EventPageHeaderImage from '@/models/EventPageHeaderImage';
  import {Modal} from "@/components";
  import Calendar from "@/models/Calendar";
  import EventComponent from "@/models/EventComponent";

  import swal from "sweetalert2";
  import { error } from 'util';
  import moment from 'moment';

  export default {
    components: {
      Modal,
    },
    props: {
      event : Object,
      categoryBuildingBlocks : Array
    },
    data: () => ({
      auth: auth,

    }),

    created() {

    },
    mounted() {


    },
    methods: {
        ...mapMutations('EventPlannerVuex', ['setBuildingBlockModal']),
        closeModal(){
          this.setBuildingBlockModal({ showModal: false });
      },
        addBuildingBlock(item){

          // Save event interaction
          let calendar = new Calendar({id: this.auth.user.defaultCalendarId});
          let event = new CalendarEvent({id: this.event.id});

            let new_block = {
                componentId : item.id,
                todos : "",
                values : "",
                vendors : "",
                calendarEvent: { id: event.id}
            }

            new EventComponent(new_block).for(calendar, event).save().then(res => {
                this.setBuildingBlockModal({ showModal: false });
                this.$emit("BlockAdded", res);

            })
                .catch(error => {
                    console.log('Error while saving ', error);
                })

        }
    },
      computed : {
          ...mapState('EventPlannerVuex', [
              'addBuildingBlockModal',
          ])
      }
  };
</script>
<style lang="scss" scope>
  .md-datepicker {
    .md-icon.md-date-icon {
      display: none;
      &~label {
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
  .md-field>.md-icon~.md-input {
    margin: 0;
  }
</style>
<style lang="scss">
    .modal-z-index {
        z-index: 5;
    }
    .large-z-index {
        z-index: 6;
        position: relative;
    }
    .move-center {
        margin: 0 auto!important;;
    }
    .move-left {
      margin-left: 0!important;
      margin-right: auto!important;
    }
    .move-right {
      margin-right: 0!important;
      margin-left: auto!important;
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
