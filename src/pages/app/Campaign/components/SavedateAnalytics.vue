<template>
  <div class="p-50 white-card mt-40 mb-40 delivery-setting">
    <collapse-panel>
      <template slot="header">
        <div class="d-flex align-center">
          <div>
            <div class="font-size-30 font-bold-extra color-black">Analytics</div>
          </div>
        </div>
      </template>
      <template slot="content">
        <div class="savedate-analytics-content mt-50">
          <hr />
          <div class="d-flex align-center color-dark-gray mt-50 font-size-20">
            <span class="font-bold">Send on <span>{{$dateUtil.formatScheduleDay(new Date().getTime(), "MM.DD.YY")}}</span></span>
            <span class="vertical-line"></span>
            <img :src="`${$iconURL}Campaign/email-gray.svg`" style="width: 28px"/>
            <span class="ml-20 mr-20 font-size-30 font-bold font-bold color-black">100</span>
            Total emails sent
          </div>
          <div class="font-size-20 font-bold-extra mt-60 mb-20">Opened This Email</div>
          <div class="openedemails-pie-container d-flex">
            <radial-progress :percentage="90"></radial-progress>
            <div class="ml-50">
              <div>
                <color-dot-label class="mb-40" color="#00bcd4"><span class="font-bold">Opened</span> (90)</color-dot-label>
                <color-dot-label class="mb-40" color="#C4C1C1"><span class="font-bold">Didn't Open</span> (10)</color-dot-label>
              </div>
              <md-button class="md-simple md-red maryoku-btn md-outlined"> Send again</md-button>
              <div class="mt-10">Send to invitees who haven't opened this email</div>
            </div>
          </div>
        </div>
      </template>
    </collapse-panel>
  </div>
</template>
<script>
import CollapsePanel from "../CollapsePanel";
import RadialProgress from "@/components/ProgressBar/Radial"
import ColorDotLabel from "@/components/ColorDotLabel"
export default {
  components: {
    CollapsePanel,
    RadialProgress,
    ColorDotLabel
  },
  data() {
    return {
      pieChart: {
        data: {
          labels: [" ", " "], // should be empty to remove text from chart
          series: [
            { value: 90, className: "budget-chart-slice-a-negative" },
            { value: 10, className: "budget-chart-slice-b-negative" },
          ],
        },
        options: {
          padding: 0,
          height: 220,
          donut: true,
          donutWidth: 34,
        },
      },
      percentage: 90
    };
  },
};
</script>
<style lang="scss" scoped>
</style>