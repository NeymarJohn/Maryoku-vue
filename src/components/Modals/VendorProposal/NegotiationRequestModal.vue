<template>
  <modal class="negotiation-modal" containerClass="modal-container md">
    <template slot="header">
      <div class="my-10">
        <div class="font-size-30 font-bold-extra">Negotiate rate for {{vendor}}</div>
        <div class="mt-15">
          Submit the hourly or fixed rate below that you’d like to propose to {{vendor}}
        </div>
      </div>
      <md-button class="md-simple md-just-icon md-round modal-default-button" @click="close">
        <md-icon>clear</md-icon>
      </md-button>
    </template>
    <template slot="body">
      <div class="text-left">
        <label class="font-size-16 font-bold-extra">Negotiate By:</label>
        <div class="d-flex align-center">
          <div class="d-flex align-center">
              <md-radio class="d-flex" v-model="rate" value="$"></md-radio>
              <span>Fixed Rate</span>
          </div>
          <div class="d-flex align-center ml-100">
              <md-radio v-model="rate" value="%"></md-radio>
              <span>Percentages</span>
          </div>
        </div>
        <label class="mt-10 font-size-16 font-bold-extra">Current Rate: <span class="font-size-18 font-regular ml-10">${{proposal.cost | withComma}}</span></label>
        <div class="mt-50 width-70">
            <label class="font-bold pb-10 d-inline-block">Your Rate</label>
            <maryoku-input :inputStyle="inputStyle" :placeholder="rate === '$' ? 'Type rate here' : 'Requested discount rate'" v-model="value"></maryoku-input>
        </div>
        <div class="mt-50">
            <label class="font-bold pb-10 d-inline-block">Add Comment</label>
            <textarea v-model="comment" placeholder="Type your comment here..."> </textarea>
        </div>
      </div>
    </template>
    <template slot="footer">
      <md-button class="md-black md-simple my-10" @click="close"> Cancel </md-button>
      <md-button class="md-red md-bold reminder-button my-10" @click="setRemind" :disabled="!value">
        Update Vendor
      </md-button>
    </template>
  </modal>
</template>
<script>
import { Modal, MaryokuInput } from "@/components";
import moment from "moment";
import Reminder from "@/models/Reminder";
import TimePicker from "@/components/Inputs/TimePicker";
import WarningMessage from "@/components/WarningMessage";
export default {
  components: {
    Modal,
    MaryokuInput,
    TimePicker,
    WarningMessage,
  },
  props: {
    proposal: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      rate: "$",
      value: null,
      comment: null,
    };
  },
  created() {
  },
  methods: {
    cancel() {
      this.$emit("close");
    },
    close() {
      this.$emit("close");
    },
    setRemind() {
      this.$emit("save", {price: {
          rate: this.rate,
          value: this.value,
          comment: this.comment}});
    },
  },
  computed:{
      inputStyle(){
        return this.rate === '$' ? 'budget' : 'percent';
      },
      vendor(){
          if(!this.proposal) return null;
          return this.proposal.vendor.tenantUser.company
      }
  }
};
</script>
<style lang="scss" scoped>
textarea{
    min-height: 140px;
}
@media only screen and (max-width: 959px) {
  .reminder-time-modal {
    .header-text {
      line-height: 1.2em;
      font-size: 24px !important;
      margin-bottom: 30px;
    }
    .maryoku_input {
      width: 100%;
    }
    .options-list {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-around;
      margin-top: 20px;
      .option-card {
        margin: 10px 10px;
        width: 100px;
        height: 100px;
        padding: 10px;
        font-size: 14px;
        img {
          width: 20px !important;
        }
      }
    }
    .reminder-button {
      width: 100%;
    }
  }
}
</style>
