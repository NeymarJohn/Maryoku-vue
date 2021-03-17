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
  </div>
</template>
<script>
import _ from "underscore";
export default {
  props: {
    vendor: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    mergeStringItems(items) {
      let naItems = "";
      _.each(items, (n) => {
        if (n.constructor.name == "Object") {
          naItems += `${this.capitalize(n.name)}s, `;
        } else {
          naItems += `${this.capitalize(n)}s, `;
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
}
</style>