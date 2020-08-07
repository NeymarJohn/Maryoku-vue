<template>
  <div v-if="selectedBlock">
    <comment-editor-panel v-if="showCommentEditorPanel"></comment-editor-panel>
    <div class="event-book-requirement-header md-layout-item md-size-100">
      <div class="header-title">
        <img src="http://static.maryoku.com/storage/icons/Requirements/image-130.png"/>
        <img src="http://static.maryoku.com/storage/icons/Requirements/image-132.png"/>
        <img src="http://static.maryoku.com/storage/icons/Requirements/image-133.png"/>
        <img src="http://static.maryoku.com/storage/icons/Requirements/image-134.png"/>
      </div>
      <header-actions @toggleCommentMode="toggleCommentMode" hideDownload></header-actions>
    </div>
    <div class="booking-header md-layout-item md-size-100">
      <div class="d-flex justify-content-between">
        <div>
          <h3>
            <img
              :src="`${$iconURL}Budget+Elements/${selectedBlock.componentId}.svg`"
              style="width:30px; margin-right:0.5em"
              v-if="selectedBlock.componentId"
            />
            Plan {{selectedBlock.title}}
          </h3>
          We are here to find you the most accurate offers for your event<br />
          Before submitting a proposal to our suppliers, we want to make sure we know exactly what you are looking for
        </div>
      </div>
    </div>

    <!-- Event Booking Items -->
    <div class="md-layout events-booking-items">
      <div class="md-layout-item md-size-100">
        <div class="requirement-section" v-for="(category, index) in Object.keys(requirementProperties)" :key="index">
          <table class="requirement-section-table">
            <thead>
              <tr>
                <th><span class="section-title">{{category}}</span></th>
                <th>How Many?</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in requirementProperties[category].filter(item=>!item.isHide)" :key="index">
                <td>
                  <div style="padding: 10px 0px">{{item.name}}</div>
                  <template v-if="item.type==='multiple-selection'">
                    <multiselect
                      v-model="item.selectedValue"
                      :options="item.selectionOptions"
                      :close-on-select="true"
                      :clear-on-select="true"
                      tag-placeholder="Add this as new tag"
                      placeholder="Type to search category"
                      label="title"
                      track-by="id"
                      class="multiple-selection small-selector"
                    ></multiselect>
                  </template>
                </td>
                <td >
                  <template v-if="item.type==='integer'">
                    <input class="quantity-input" type="number">
                    <img :src="`${$iconURL}Event%20Page/light.svg`" width="20" />
                    <md-tooltip md-direction="bottom">*People who did an event similar to yours used 400</md-tooltip>
                  </template>
                  
                </td>
                <td>
                  <md-checkbox  class="md-simple md-checkbox-circle md-red" v-model="item.isMandatory" value="true">Must Have</md-checkbox>
                </td>
                <td>
                  <md-checkbox class="md-simple md-checkbox-circle md-red " v-model="item.isMandatory" value="false">Nice To Have</md-checkbox>
                </td>
              </tr>
            </tbody>
          </table>
          <div  class="additional-request">
            <div class="additional-request-description">
              <h4>Additional Requests</h4>
              <div>Would you like to add one of those items?</div>
            </div>
            <div>
              <div 
                class="additional-request-tag" 
                v-for="(item, index) in requirementProperties[category].filter(item=>item.isHide)" :key="index"
                @click="addRequirement(category, item)">
                {{item.name}}
                <md-icon class="icon color-red">add_circle</md-icon>
              </div>
            </div>
          </div>
        </div>
        <div class="requirement-section">
          <div class="special-request-header">
            <img :src="`${$iconURL}Requirements/special-request-red.svg`">
            <div class="title">
              <h3>Spacial Requests</h3>
              Would you like to add one of those items?
            </div>
            <div class="additional-request-tag">
              Loream lpsum 
              <md-icon class="icon color-red">add_circle</md-icon>
            </div>
            <div class="additional-request-tag">
              Loream lpsum 
              <md-icon class="icon color-red">add_circle</md-icon>
            </div>
          </div>
          <hr/>
          <div class="special-request-section">
            <div>
              <div>
                <md-checkbox class="md-simple md-checkbox-circle md-red" v-model="value" value="obj1">
                  <span class="special-request-section-subtitle">Accessibility</span></md-checkbox>
              </div>
              <div class="special-request-section-description">What kind of special attention do we need to know about?</div>
              <div class="special-request-section-options">
                <md-checkbox class="md-simple md-red" v-model="value" value="obj1">
                  <div class="checkbox-label-wrapper">
                    <img :src="`${$iconURL}Requirements/pregnant-women-dark.svg`"/>
                    Pregnant women
                  </div>
                </md-checkbox>
                <md-checkbox class="md-simple md-red" v-model="value" value="obj1">
                  <div class="checkbox-label-wrapper">
                    <img :src="`${$iconURL}Requirements/disabled-person-dark.svg`"/>
                    Disabled people
                  </div>
                </md-checkbox>
                <md-checkbox class="md-simple md-red" v-model="value" value="obj1">
                   <div class="checkbox-label-wrapper">
                    <img :src="`${$iconURL}Requirements/elderly-people-dark.svg`"/>
                    Elderly People
                   </div>
                </md-checkbox>
              </div>
            </div>
          </div>
          <hr/>
          <div class="special-request-section">
              <div>
                <md-checkbox class="md-simple md-checkbox-circle md-red" v-model="value" value="obj1">
                  <span class="special-request-section-subtitle">Around the venue</span></md-checkbox>
              </div>
              <span class="special-request-section-description">Which elements are important for you to have around the venue?</span>
              <div class="special-request-section-options">
                <md-checkbox class="md-simple md-red" v-model="value" value="obj1">
                  <div class="checkbox-label-wrapper">
                    <img :src="`${$iconURL}Requirements/park-dark.svg`"/>
                    Parking
                  </div>
                </md-checkbox>
                <md-checkbox class="md-simple md-red" v-model="value" value="obj1">
                  <div class="checkbox-label-wrapper">
                    <img :src="`${$iconURL}Requirements/restaurant-dark.svg`"/>
                    Restaurant
                  </div>
                </md-checkbox>
                <md-checkbox class="md-simple md-red" v-model="value" value="obj1">
                  <div class="checkbox-label-wrapper">
                    <img :src="`${$iconURL}Requirements/shopping-center-dark.svg`"/>
                    Shopping center
                  </div>
                </md-checkbox>
                <md-checkbox class="md-simple md-red" v-model="value" value="obj1">
                  <div class="checkbox-label-wrapper">
                    <img :src="`${$iconURL}Requirements/hotel-dark.svg`"/>
                    Hotel
                  </div>
                </md-checkbox>
              </div>
          </div>
          <hr/>
          <div class="special-request-section">
            <div class="font-bold">Anything Else?</div>

            <div>Tell us what else you would love to receive in the proposals we'll send you</div>
            <div class="special-request-section-options">
              <textarea placeholder="Type name of element here..." >
              </textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- ./Event Booking Items -->

    <div class="booking-section__actions">
      <div>
        <md-button class="md-bold add-category-btn md-black md-simple">
          <md-icon>arrow_back</md-icon>
          Back
        </md-button>
        <md-button class="md-simple md-just-icon md-black">
          <md-icon style="font-size: 40px">expand_less</md-icon>
        </md-button>
      </div>
      <div>
        <md-button class="md-bold add-category-btn md-black md-simple">Revert To Original</md-button>
        <md-button class="md-red md-bold add-category-btn" @click="findVendors">Find my perfect venue</md-button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import moment from "moment";
import InputMask from "vue-input-mask";
import VueElementLoading from "vue-element-loading";
import _ from "underscore";
import Multiselect from "vue-multiselect";

import { postReq, getReq } from '@/utils/token'
import { Modal } from "@/components";
import EventChangeProposalModal from "@/components/Modals/EventChangeProposalModal";
import HeaderActions from "@/components/HeaderActions";
import CommentEditorPanel from "./CommentEditorPanel";

import Calendar from "@/models/Calendar";
import CalendarEvent from "@/models/CalendarEvent";
import EventComponent from "@/models/EventComponent";

export default {
  name: "booking-event-requirement",
  components: {
    VueElementLoading,
    InputMask,
    Modal,
    EventChangeProposalModal,
    HeaderActions,
    CommentEditorPanel,
    Multiselect
  },
  props: {
    component: {
      type: Object,
      default: {}
    }
  },
  data: () => ({
    // auth: auth,
    calendar: null,
    isLoading: true,
    event: {},
    blockVendors: null,
    selectedBlock: {},
    proposals: [],
    showCommentEditorPanel: false,
    blockId:"",
    value: "",
    requirementProperties: {}
  }),
  methods: {
    ...mapMutations("event", ["setEventData"]),
    ...mapActions("comment", ["getCommentComponents"]),
    ...mapActions("vendor", ["fetchAllProperties"]),
    addRequirement(category, item) {
      const index = this.requirementProperties[category].findIndex(it=>it.name == item.name )
      this.requirementProperties[category][index].isHide = false;
      this.requirementProperties = { ...this.requirementProperties }
      this.$forceUpdate();
    },
    setProperties() {
      this.selectedBlock = this.component
      this.fetchAllProperties(this.selectedBlock.componentId).then(properties=>{
        const propertiesByGroup = {};
        properties.forEach(item=>{
          if (!propertiesByGroup[item.categoryTitle])   propertiesByGroup[item.categoryTitle] = []
          if (propertiesByGroup[item.categoryTitle].length >= 5) {
            item.isHide = true
          } else {
            item.isHide = false
          }
          propertiesByGroup[item.categoryTitle].push(item)
        })
        this.requirementProperties = {...propertiesByGroup}
      })
    },
    toggleCommentMode(mode) {
      this.showCommentEditorPanel = mode;
    },
    fetchData() {
      this.blockId = this.$route.params.blockId
      this.event = this.$store.state.event.eventData;
      this.getCommentComponents(this.blockId);
      this.setProperties();
    },
    findVendors() {
      postReq('/1/vendors/setting-requirements', {
        vendorCategory: "foodandbeverage",
        expiredBusinessTime: moment(new Date()).add(5, 'days').valueOf(),
        settingsJsonData: JSON.stringify(this.requirementProperties),
        eventComponentInstance: new EventComponent({id: this.blockId})
      }).then(res=>{
        this.$emit("setRequirements", res);
      })
    }
  },
  created() {
    this.calendar = new Calendar({id: this.$store.state.auth.user.profile.defaultCalendarId})
  },
  mounted() {
    this.isLoading = true;
    if (this.eventData.id) {
      this.fetchData()
    }
  },
  watch: {
    // event(newVal, oldVal) {
    //   this.$root.$emit(
    //     "set-title",
    //     this.event,
    //     this.routeName === "EditBuildingBlocks",
    //     true
    //   );
    // },
    eventData(newVal, oldVal) {
      if (newVal.id) {
        this.fetchData()
      }
    },
    '$route': 'fetchData'
  },
  filters: {
    formatDate: function(date) {
      return moment(date).format("MMM Do YYYY ");
    },
    formatTime: function(date) {
      return moment(date).format("h:00 A");
    },
    formatDuration: function(startDate, endDate) {
      return moment(endDate).diff(startDate, "hours");
    },
    withComma(amount) {
      return amount ? amount.toLocaleString() : 0;
    }
  },
  computed: {
    ...mapState('event',['eventData'])
  },
};
</script>
<style lang="scss">
.event-book-requirement-header{
  height: 256px;
  padding:0;
  display: flex;
  .header-title {
    display: flex;
    img {
      width: 25%;
    }
  }
  .header-actions {
    position: absolute;
    right: 50px;
    top: 30px;
    z-index: 99;
  }
}
.section-title {
  font-size: 22px;
  font-family: "Manrope-ExtraBold";
}
.requirement-section {
  border-radius: 3px;
  box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);
  background-color: #ffffff;
  padding: 60px;
  margin: 20px 0px;
  &-table {
    border-spacing: 0px;
    th {
      text-align: left;
    }
    width: 100%;
    td,th {
      padding: 24px 0;
    }
    tbody {
      td {
        border-top: solid 2px #DBDBDB !important; 
        // border: 1px solid black;
        border-collapse: collapse;
      }
    }
    .quantity-input {
      height: 47px;
      box-shadow: none;
      border: solid 0.5px #818080;
      font-family: "Manrope-regular";
      font-size: 16px;
    }
  }
}
.booking-section__actions {
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px 1.9em;
  background: white;
}
.additional-request {
  display: flex;
  align-items: flex-start;
  &-description {
    min-width: 350px;
  }
  h4 {
    margin-top: 5px;
    margin-bottom: 10px;
    font-family: "Manrope-Bold";
  }
}
.additional-request-tag {
  margin-left: 20px;
  margin-bottom: 10px;
  border: solid 1px #f51355;
  height: 50px;
  border-radius: 25px;
  display: inline-block;
  padding: 10px 20px;
  font-size: 16px;
  font-family: "Manrope-Bold";
  color: #f51355 !important;
  cursor: pointer;
  .icon {
    margin-left:10px;
    color: #f51355 !important;
    font-size: 30px !important;
  }
}
.special-request-header {
  display: flex;
  align-items: center;
  .title {
    margin-left: 20px;
    margin-right: 40px;
  }
}
.special-request-section {
  padding: 30px 0;
  &-subtitle {
    font-size: 22px;
    font-family: 'Manrope-ExtraBold';
  }
  &-description {
    font-size: 16px;
    font-family: 'Manrope-ExtraBold';
  }
  &-options {
    margin-top: 30px;
  }
}
.checkbox-label-wrapper{
  margin-top: -9px;
  margin-left: 20px;
  margin-right: 50px;
}
textarea {
  width: 100%;
  resize: none;
  padding: 20px;
  border: solid 1px #a0a0a0;
  border-radius: 3px;
}
.multiple-selection {
  width: 300px;
  display: inline-block;
  height: 50px;
  .multiselect__select {
    top:15px
  }
  .multiselect__tags {
    height: 50px;
    .multiselect__single {
      line-height: 30px;
    }
  }
  .multiselect__input{
    height: 30px;
  }
  .multiselect__placeholder {
    line-height: 20px;
  }
}
</style>
