<template>
  <div v-if="selectedBlock" class="booking-event-requirement">
    <comment-editor-panel v-if="showCommentEditorPanel"></comment-editor-panel>
    <div class="booking-header md-layout-item md-size-100">
      <div class="d-flex justify-content-between">
        <div>
          <h3>
            <img
              :src="`${$iconURL}Budget+Elements/${selectedBlock.componentId}.svg`"
              style="width:30px; margin-right:0.5em"
              v-if="selectedBlock.componentId"
            />
            Let us know what you are looking for in a {{selectedBlock.title}}
          </h3>
          Our job is to bring you the most accurate offers for your event. 
          <br/>
          This is what we know about your event so far, let us know if there is anything we missed.
        </div>
        <header-actions @toggleCommentMode="toggleCommentMode" hideDownload></header-actions>
      </div>
    </div>

    <!-- Event Booking Items -->
    <div class="md-layout events-booking-items">
      <div class="md-layout-item md-size-100">
        <div v-for="(category, index) in Object.keys(requirementProperties)" :key="index">
          <template v-if="category=='Looking for'">
            <vendor-requirement-multiselect-panel  v-for="(data, id) in requirementProperties[category]" :key="id" :data="data"></vendor-requirement-multiselect-panel>
          </template>
          <div class="requirement-section"  v-else>
            <table class="requirement-section-table">
              <thead>
                <tr>
                  <th><span class="section-title"><img :src="`${$iconURL}Requirements/${category}.svg`" class="mr-20"/>{{category}}</span></th>
                  <th>How Many?</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(property, index) in requirementProperties[category].filter(item=>item.mustHave)" :key="index">
                  <td>
                    <div style="padding: 10px 0px">{{property.item}}</div>
                    <template v-if="property.type==='multiple-selection'">
                      <multiselect
                        v-model="property.selectedValue"
                        :options="property.selectionOptions"
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
                    <template v-if="property.qtyEnabled">
                      <input class="quantity-input" type="number" v-model="property.defaultQty">
                      <img :src="`${$iconURL}Event%20Page/light.svg`" width="20" />
                      <md-tooltip md-direction="bottom">*People who did an event similar to yours used 400</md-tooltip>
                    </template>
                    
                  </td>
                  <td>
                    <md-checkbox  class="md-simple md-checkbox-circle md-red" v-model="property.isMandatory" value="true">Must Have</md-checkbox>
                  </td>
                  <td>
                    <md-checkbox class="md-simple md-checkbox-circle md-red " v-model="property.isMandatory" value="false">Nice To Have</md-checkbox>
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
                  v-for="(property, index) in requirementProperties[category].filter(item=>!item.mustHave)" :key="index"
                  @click="addRequirement(category, property)">
                  {{property.item}}
                  <md-icon class="icon color-red">add_circle</md-icon>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- <div class="requirement-section">
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
          <div class="md-layout mt-50">
            <div class="md-layout-item md-size-40 mx-auto pl-0">
              <label>Name of item</label>
              <maryoku-input class="mt-20" v-model="editingSpecialRequest.name"></maryoku-input>
            </div>
            <div class="md-layout-item md-size-20 mx-auto">
              <label>Is this</label>
              <div>
                <md-checkbox class="md-simple md-checkbox-circle md-red" v-model="editingSpecialRequest.isMandatory" :value="true">
                    <span class="font-size-16">Mandatory</span></md-checkbox>
                <md-checkbox class="md-simple md-checkbox-circle md-red" v-model="editingSpecialRequest.isMandatory" :value="false">
                    <span class="font-size-16">Nice To Have</span></md-checkbox>
              </div>
            </div>
            <div class="md-layout-item md-size-40 mx-auto pr-0">
              <label>Notes</label>
              <maryoku-textarea class="mt-20" v-model="editingSpecialRequest.notes"></maryoku-textarea>
            </div>
            <div class="md-layout-item md-size-100 mx-auto pr-0 text-right mt-30 mb-30">
              <md-button class="md-simple md-red  maryoku-btn">Clear</md-button>
              <md-button class="md-red maryoku-btn" @click="addNewRequirement">Add</md-button>
            </div>
          </div>
          <div class="special-request-section d-flex" v-for="item in specialRequests" :key="item.name">
              <div class="flex-1 font-size-16 font-bold">{{item.name}}</div>
              <div class="flex-1">
                <span v-if="item.isMandatory"><img :src="`${$iconURL}Requirements/check-red.svg`" class="mr-10"/>Mandatory</span>
              </div>
              <div class="flex-1">
                {{item.notes}}
              </div>
              <div class="flex-1 text-right">
                <md-button class="md-icon-button md-simple"><img :src="`${$iconURL}Requirements/edit-dark.svg`"/></md-button>
                <md-button class="md-icon-button md-simple"><img :src="`${$iconURL}Requirements/delete-dark.svg`"/></md-button>
              </div>
          </div>
          <div class="special-request-section">
            <div class="font-bold">Anything Else?</div>

            <div>Tell us what else you would love to receive in the proposals we'll send you</div>
            <div class="special-request-section-options">
              <textarea placeholder="Type name of element here..." >
              </textarea>
            </div>
          </div>
        </div> -->
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
import MaryokuInput  from "@/components/Inputs/MaryokuInput.vue"
import MaryokuTextarea  from "@/components/Inputs/MaryokuTextarea.vue"

import { postReq, getReq } from '@/utils/token'
import { Modal } from "@/components";
import EventChangeProposalModal from "@/components/Modals/EventChangeProposalModal";
import HeaderActions from "@/components/HeaderActions";
import CommentEditorPanel from "./CommentEditorPanel";

import Calendar from "@/models/Calendar";
import CalendarEvent from "@/models/CalendarEvent";
import EventComponent from "@/models/EventComponent";
import VendorRequirementMultiselectPanel from "./VendorRequirementMultiselectPanel";
export default {
  name: "booking-event-requirement",
  components: {
    VueElementLoading,
    InputMask,
    Modal,
    EventChangeProposalModal,
    HeaderActions,
    CommentEditorPanel,
    Multiselect,
    MaryokuInput,
    MaryokuTextarea,
    VendorRequirementMultiselectPanel
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
    requirementProperties: {},
    editingSpecialRequest: {
      name: "",
      isMandatory: false,
      notes: ""
    },
    specialRequests: []
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
      if (!this.selectedBlock.componentId) return
      this.$http.get(`${process.env.SERVER_URL}/1/vendor/property/${this.selectedBlock.componentId}/${this.event.id}`).then(res=>{
        this.requirementProperties = res.data
      }) 

    },
    toggleCommentMode(mode) {
      this.showCommentEditorPanel = mode;
    },
    fetchData() {
      this.blockId = this.component.componentId;//this.$route.params.blockId
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
    },
    addNewRequirement() {
      this.specialRequests = [...this.addNewRequirement, this.editingSpecialRequest]
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
    eventData(newVal, oldVal) {
      if (newVal.id) {
        this.fetchData()
      }
    },
    component(newVal, oldVal) {
      if (newVal.componentId) {
        this.fetchData()
      }
    }
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
.booking-event-requirement {
  width: 100%;
  // .event-book-requirement-header{
  //   height: 256px;
  //   padding:0;
  //   display: flex;
  //   .header-title {
  //     display: flex;
  //     img {
  //       width: 25%;
  //     }
  //   }
  //   .header-actions {
  //     position: absolute;
  //     right: 50px;
  //     top: 30px;
  //     z-index: 99;
  //   }
  // }
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
    border-top: solid 1px #B7B7B7;
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
}

</style>
