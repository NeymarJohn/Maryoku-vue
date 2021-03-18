<template>
  <div class="policy-cont" id="Policy">
    <div class="rules">
      <div class="rules">
        <div class="rule" v-for="(policy, yIndex) in validPolicy" :key="yIndex">
          <div class="item">{{ policy.name }}</div>
          <div class="item" v-if="policy.type === 'MultiSelection'">
            <span class="mr-10" v-for="(v, vIndex) in policy.value">
              {{ `${v}${vIndex == policy.value.length - 1 ? "" : ","}` }}
            </span>
          </div>
          <div class="item" v-else-if="policy.type === 'Including'">
            <span class="mr-10" v-if="policy.value"> Yes </span>
            <span class="mr-10" v-if="!policy.value && policy.cost"> {{ `$ ${policy.cost}` }} </span>
          </div>
          <div class="item" v-else>
            <span v-if="policy.type === Number && !policy.isPercentage">$</span>
            <span v-if="policy.value === true">Yes</span>
            <span v-else>{{ policy.value }}</span>
            <span v-if="policy.isPercentage">%</span>
            <span class="ml-50" v-if="policy.hasOwnProperty('attendees')"> {{ policy.attendees }} attendees </span>
          </div>
        </div>
      </div>
    </div>
    <div class="not-allowed" v-if="vendor.vendorCategories[0] == 'venuerental'">
      <h5>We don't allow these 3rd party vendor:</h5>
      <p>{{ mergeStringItems(vendor.notAllowed) }}</p>
    </div>
    <div class="dont-work">
      <h5>We don't work on:</h5>
      <div class="item" v-if="mergeStringItems(vendor.selectedWeekdays)">
        <img :src="`${$iconURL}Vendor Signup/Group 5489 (4).svg`" />
        {{ mergeStringItems(vendor.selectedWeekdays) }}
      </div>
      <div class="item" v-for="(d, dIndex) in vendor.exDonts" :key="dIndex">
        <img :src="`${$iconURL}Vendor Signup/Group 5489 (4).svg`" />
        {{ d.holiday }}
      </div>
      <div class="item" v-if="vendor.dontWorkDays">
        <img :src="`${$iconURL}Vendor Signup/Group 5489 (4).svg`" />
        {{ dontWorkDays() }}
      </div>
      <div class="item" v-if="vendor.dontWorkTime">
        <img :src="`${$iconURL}Vendor Signup/Group 5489 (4).svg`" />
        {{ dontWorkTime() }}
      </div>
    </div>
    <div class="section">
      <h5 class="subtitle">Our cancellation approach</h5>
      <div id="Policy">
        <div class="rules">
          <div class="rule" v-for="(policy, yIndex) in cancellationData" :key="yIndex">
            <div class="item">
              <span class="font-bold-extra">If</span> {{ policy.notice }}
              <span class="font-bold-extra">Then</span>
              {{ policy.vendorPayout }} <span class="font-bold-extra">and</span> {{ policy.cancellationFee }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import _ from "underscore";
import { capitalize } from "@/utils/string.util";
export default {
  props: {
    vendor: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      cancellationData: [
        {
          notice: "the client cancel on the day of the Event",
          vendorPayout: "the client will pay in full",
          cancellationFee: "full Payment-no refund will be given",
        },
        {
          notice: "the client cancel less than a week prior of the Event but not on the day of the Event",
          vendorPayout: "the client will pay 80% ",
          cancellationFee: "full Payment-no refund will be given",
        },
        {
          notice: "the client cancel less than two weeks prior of the Event bu more than one week prior to the Event",
          vendorPayout: "the client willl pay 60%",
          cancellationFee: "80% Payment(20% refunded to Planner)",
        },
        {
          notice: "the client cancel more than two weeks prior to the Event",
          vendorPayout: "the client will pay 15% equivalent to down payment",
          cancellationFee: "Down payment will not be refunded",
        },
      ],
    };
  },
  methods: {
    mergeStringItems(items) {
      let naItems = "";
      _.each(items, (n) => {
        if (n.constructor.name == "Object") {
          naItems += `${capitalize(n.name)}s, `;
        } else {
          naItems += `${capitalize(n)}s, `;
        }
      });
      naItems = naItems.substring(0, naItems.length - 2);
      return "All " + naItems;
    },
    dontWorkDays() {
      let selectedDates = "";
      _.each(this.vendor.dontWorkDays, (s) => {
        selectedDates += `${s.date}, `;
      });
      selectedDates = selectedDates.substring(0, selectedDates.length - 2);
      return selectedDates;
    },
    dontWorkTime() {
      return `${this.vendor.dontWorkTime.startTime.hh}:${this.vendor.dontWorkTime.startTime.mm}:${this.vendor.dontWorkTime.amPack.start} ~ ${this.vendor.dontWorkTime.endTime.hh}:${this.vendor.dontWorkTime.endTime.mm}:${this.vendor.dontWorkTime.amPack.end}`;
    },
  },
  computed: {
    validPolicy() {
      if (this.vendor.policies)
        return this.vendor.policies.filter((item) => item.value || (item.type === "Including" && item.cost));
      return null;
    },
  },
};
</script>
<style lang="scss" scoped>
.policy-cont {
  .rules {
    margin: 3rem 0;
    .rule {
      padding: 2rem 0;
      border-bottom: 1px solid #dddddd;
      font: 600 16px Manrope-Regular, sans-serif;
      display: flex;
      align-items: center;

      .item {
        flex: 1;

        img {
          width: 30px;
        }
      }
      &:first-child {
        border-top: 1px solid #dddddd;
      }
    }
  }
  .not-allowed {
    h5 {
      font: 800 20px Manrope-Regular, sans-serif;
    }
    p {
      font: normal 16px Manrope-Regular, sans-serif;
    }
  }
  .dont-work {
    h5 {
      font: 800 20px Manrope-Regular, sans-serif;
    }
    .item {
      margin-bottom: 1rem;
      display: flex;
      img {
        width: 21px;
        margin-right: 1rem;
      }
    }
  }
  .section {
    h5.subtitle {
      margin: 0;
      padding: 15px 53px 20px 55px;
      margin-left: -60px;
      background-color: #ededed;
      display: inline-block;
      font-size: 20px;
      font-weight: 800;
      text-transform: none;
    }
    h6 {
      font-size: 20px;
      font-weight: 800;
      margin-top: 30px;
      margin-bottom: 8px;
      text-transform: none;
    }
    p {
      font-size: 16px;
      margin: 0;
    }
    .semi-column {
      display: flex;
      margin-top: 35px;
      p {
        flex: 1;
        margin: 0;
        font-size: 16px;
        strong {
          font-size: 20px;
          font-weight: 800;
        }
      }
    }
    .additional {
      margin-top: 60px;

      h6 {
        font-size: 16px;
        font-weight: 800;
      }
      p {
        margin-top: 13px;
        font-size: 16px;
      }
    }
    .signature-wrapper {
      display: grid;
      grid-gap: 20%;
      grid-template-columns: 40% 40%;
      padding-top: 60px;

      .half-side {
        text-align: center;
        h6 {
          text-transform: capitalize;
          text-decoration: underline;
          font-size: 16px;
          font-weight: 800;
          margin: 0;
        }

        .signature-client {
          margin-top: 23px;
          min-width: 350px;
          min-height: 270px;
          border: 1px dashed #f51355 !important;
          border-radius: 3px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        &:first-child {
          h6 {
            text-align: left;
          }
        }

        .upload-cont {
          a {
            margin: 0.5rem auto;
            display: inline-block;
            font: 800 14px Manrope-Regular, sans-serif;
            border: 1px solid #f51355;
            padding: 0.5rem;
            color: #f51355;
            cursor: pointer;
            img {
              width: 10px;
            }
          }
          .sign-here {
            .save,
            .clear {
              background-color: #ffffff;
              font: 800 14px Manrope-Regular, sans-serif;
              border: 1px solid #f51355;
              padding: 0.5rem;
              color: #f51355;
              cursor: pointer;
              margin-bottom: 0.5rem;
            }
          }
        }

        img {
          width: 100%;
          max-height: 162px;

          &.remove {
            width: 18px;
            cursor: pointer;
            position: absolute;
            right: 1rem;
            bottom: 3rem;
          }
        }
      }
    }
  }
}
</style>