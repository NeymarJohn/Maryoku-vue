<template>
  <section class="proposal-header">
    <div class="background-image">
      <div class="d-flex concept-image-wrapper" v-if="vendor">
        <div
          v-for="(color, index) in vendor.images"
          :key="`header-image-${index}-1`"
          class="concept-color"
          :style="`background: ${color.color || '#EDEDED'}`"
        >
          <img class="concept-image" v-if="vendor.images[index]" :src="`${vendor.images[index]}`" />
        </div>
        <div
          v-for="(color, index) in vendor.images"
          :key="`header-image-1-${index}-1`"
          class="concept-color"
          :style="`background: ${color.color || '#EDEDED'}`"
        >
          <img class="concept-image" v-if="vendor.images[index]" :src="`${vendor.images[index]}`" />
        </div>
      </div>
      <img v-else :src="defaultImage" class="default-image" />
    </div>
    <div class="proposal-banner">
      <div class="header-content">
        <ul>
          <li class="font-size-30">
            {{ vendor ? vendor.name : "" }}
          </li>
        </ul>
      </div>
      <div class="summary-cont">
        <ul>
          <li>
            <img :src="`${$iconURL}common/clock-white.svg`" />
            {{ eventTime }}
          </li>
          <li>
            <img :src="`${$iconURL}common/calendar-white.svg`" />
            {{ eventDate }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
<script>
import VendorBidTimeCounter from "@/components/VendorBidTimeCounter/VendorBidTimeCounter";
import { Modal } from "@/components";
import moment from "moment";
export default {
  components: {
    VendorBidTimeCounter,
    Modal,
  },
  props: {
    vendor: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      showModal: false,
      dateTooltip: false,
      defaultImage: "https://maryoku.s3.amazonaws.com/proposal/background-default.jpg",
    };
  },
  computed: {
    eventDate() {
      let startDate = new Date();
      let endDate = new Date();
      return `${moment(startDate).format("MMM D, YYYY")} - ${moment(endDate).format("MMM D, YYYY")}`;
    },
    getRemainingTime() {
      if (!this.proposalRequest) return { days: 0, hours: 0, mins: 0, seconds: 0 };
      let remainingMs = this.proposalRequest.expiredTime - new Date().getTime();
      if (remainingMs <= 0) {
        this.isTimeUp = true;
        this.openedModal = "timeIsUp";
        return { days: 0, hours: 0, mins: 0, seconds: 0 };
      }
      const days = Math.floor(remainingMs / 24 / 3600 / 1000);
      remainingMs = remainingMs - days * 24 * 3600 * 1000;
      const hours = Math.floor(remainingMs / 3600 / 1000);
      remainingMs = remainingMs - hours * 3600 * 1000;
      const mins = Math.floor(remainingMs / 60 / 1000);
      remainingMs = remainingMs - mins * 60 * 1000;
      const seconds = Math.floor(remainingMs / 1000);
      return { days, hours, mins, seconds };
    },
    eventTime() {
      let startDate = new Date();
      let endDate = new Date();
      return `${moment(startDate).format("hh:mmA")} - ${moment(endDate).format("hh:mmA")}`;
    },
    getLocation() {
      if (this.proposalRequest) {
        return this.event.location || "-";
      } else {
        return "-";
      }
    },
  },
};
</script>
<style lang="scss" scoped>
section.proposal-header {
  background-color: #ffffff;
  position: relative;
  width: 100%;
  border-radius: 3px;
  -webkit-box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);
  box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);
  height: 200px;
  .background-image {
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    position: absolute;
    overflow: hidden;
    &::after {
      position: absolute;
      width: 100%;
      height: 100%;
      content: "";
      top: 0;
      left: 0;
      background-color: #000;
      opacity: 0.6;
    }
    .default-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .concept-color {
      min-width: 300px;
      height: 200px;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      .concept-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: 0.2s;
      }
    }
  }
  .proposal-banner {
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    position: absolute;
    padding: 40px 60px;
    .header-content {
      color: white;
      margin: 20px 0;
      ul {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        align-items: center;
        li {
          padding: 5px 20px;
          &:first-child {
            padding-left: 0px;
          }
          &:not(:last-child) {
            border-right: solid 1px white;
          }
          .company-logo {
            max-height: 30px;
            max-width: 30px;
          }
        }
      }
    }
    .summary-cont {
      font-family: "Manrope-Regular", sans-serif;
      width: calc(100% - 454px);
      margin: 10px 0;
      ul {
        list-style: none;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding: 0;
        margin: 0;
        color: white;
        li {
          font-size: 16px;
          font-weight: bold;
          padding: 0px 25px;
          display: flex;
          margin-right: 0px;
          border-right: solid 1px white;
          position: relative;
          &:first-child {
            padding-left: 0px;
          }
          &:last-child {
            border-right: none;
          }
          img {
            width: 20px;
            margin-right: 10px;
          }

          i {
            color: #818080;
            padding-right: 8px;
          }

          &.with-help {
            background: #ffedb7;
            cursor: pointer;
            position: relative;

            img {
              &.question {
                margin-left: 12px;
                margin-right: 0;
              }
            }
          }

          &:last-child {
            margin-right: 0;
          }
        }
      }
      p {
        font-size: 16px;
        font-weight: normal;
        color: #050505;
        max-width: 60%;
        margin: 2rem 0;
      }
      .a-right {
        text-align: right;
        max-width: 60%;

        i {
          position: relative;
          top: -1px;
        }
      }
    }
  }
}
</style>