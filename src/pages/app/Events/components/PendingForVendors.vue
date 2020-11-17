<template>
  <div class="text-center md-layout-item md-size-90 mt-50" style="margin: 0 auto">
    <img src="https://s3.amazonaws.com/static.maryoku.com/storage/3Proposals/Group 10668.svg" />
    <div class="font-size-22 font-bold mt-50 mb-50">OUR VENDORS ARE WORKING ON QUOTES FOR YOU</div>
    <div class="md-layout">
      <div class="md-layout-item d-flex text-right">
        <div class="p-40 proposal-card">
          <img src="https://s3.amazonaws.com/static.maryoku.com/storage/3Proposals/photo%20(1).svg"/>
          <h4 class="font-bold card-title">PROPOSAL 01</h4>
          <div class="mb-10 bar" style="width: 180px"></div>
          <div class="mb-10 bar" style="width: 100px"></div>
          <div class="mb-10 bar" style="width: 150px"></div>
          <div class="mb-10 bar" style="width: 150px;"></div>
          <div class="mb-10 bar" style="width: 100px"></div>
          <div class="action mt-40">Defaults & Booking</div>
        </div>
      </div>

      <div class="md-layout-item d-flex text-center">
        <div class="p-40 proposal-card">
          <img src="https://s3.amazonaws.com/static.maryoku.com/storage/3Proposals/photo%20(1).svg"/>
          <h4 class="font-bold card-title">PROPOSAL 02</h4>
          <div class="mb-10 bar" style="width: 180px"></div>
          <div class="mb-10 bar" style="width: 100px"></div>
          <div class="mb-10 bar" style="width: 150px"></div>
          <div class="mb-10 bar" style="width: 150px;"></div>
          <div class="mb-10 bar" style="width: 100px"></div>
          <div class="action mt-40">Defaults & Booking</div>
        </div>
      </div>

      <div class="md-layout-item d-flex text-left">
        <div class="p-40 proposal-card">
          <img src="https://s3.amazonaws.com/static.maryoku.com/storage/3Proposals/photo%20(1).svg"/>
          <h4 class="font-bold card-title">PROPOSAL 03</h4>
          <div class="mb-10 bar" style="width: 180px"></div>
          <div class="mb-10 bar" style="width: 100px"></div>
          <div class="mb-10 bar" style="width: 150px"></div>
          <div class="mb-10 bar" style="width: 150px;"></div>
          <div class="mb-10 bar" style="width: 100px"></div>
          <div class="action mt-40">Defaults & Booking</div>
        </div>
      </div>

      <div class="pull-center">
        <VendorBidTimeCounter
                :days="days"
                :hours="hours"
                :minutes="mins"
                :seconds="seconds"
                :content="'Until you receive your proposals'"
        />
      </div>
    </div>
  </div>
</template>
<style lang="scss">

  .md-layout{
    position: relative;
  }

  .proposal-card {
    background: #d5d5d5; text-align: left;

    .empty-img {
      height: 178px;
      background-color: #cccccc;
    }

    .card-title{
      color: #a0a0a0; letter-spacing: 1px;
      margin: 16px 0;
    }

    .bar{
      height: 8px; width: 180px; background: #cccccc; border-radius: 4px
    }

    .action{
      background:#cccccc;
      color: #ffffff;
      padding: 10px 40px;
      font-family: 'Manrope-Regular', sans-serif;
      font-size: 16px;
    }
  }

  .pull-center{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    .vendor-bid-time-counter-wrapper.event{
      background-color: #f51355;
      padding: 20px 40px;

      .time-cont{
        font-size: 47px;
        padding: 20px 18px 12px 18px;

        ul {

          li {
            margin-right: 24px;

            &.fix-digit{
              width: 60px;
            }

            span{
              margin-top: 12px;
              font-size: 18px;
            }
          }
        }
      }

      .action-cont{
        border-top: 1px solid rgba(255, 255, 255, 0.64);
        font-size: 20px;
        padding: 20px 0 12px;
      }
    }
  }
</style>
<script>

import VendorBidTimeCounter from "@/components/VendorBidTimeCounter/VendorBidTimeCounter";
export default {
  components: {
    VendorBidTimeCounter,
  },
  data() {
    return {
      days: 2,
      hours: 12,
      mins: 23,
      seconds: 34,
    }
  },
};
</script>
