<template>
  <modal>
    <template slot="body">
      <div class="">
        <div class="md-layout">
          <div
            style="margin-top: -90px; background-color: #f3f7fd

              ; height: 225px; width: 100vw; margin-left: -40px; margin-right: -40px "
            class="text-center"
          >
            <div class="md-layout-item pl-0 md-size-100 mt-20 text-center px-20 ">
              <div class="my-25 d-flex align-center justify-content-start ml-40">
                <h3 class="header">Event Information & Details</h3>
              </div>

              <div class="">
                <div class="d-flex align-center justify-content-around">
                  <div>
                    <h2 class="t_text">Name</h2>
                    <p class="s_text ma-0">March Madness event</p>
                  </div>
                  <div class="divider"></div>
                  <div>
                    <h2 class="t_text">Date</h2>
                    <p class="s_text ma-0">December 25, 2021</p>
                  </div>
                  <div class="divider"></div>

                  <div>
                    <h2 class="t_text">Guest Arrival Time</h2>
                    <p class="s_text ma-0">11:00 AM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="md-layout-item pl-0 md-size-100 text-center">
            <div class="mt-40">
              <img :src="`${$iconURL}group-22314.svg`" alt="icon" />
            </div>
            <div>
              <h2 class="title">We are very sorry that the match failed :(</h2>
              <p class="subtitle">
                Let us help you find more vendors that are just right for your event. <br />
                In addition, you can offer new dates to the vendor.
              </p>
            </div>
          </div>
          <div class="md-layout-item pl-0 md-size-100 mt-50">
            <div class="d-flex align-center justify-content-center">
              <md-button class="px-20 py-5 md-simple " @click="$emit('cancel')">
                <span style="color: black"> Show me more suggestions</span>
              </md-button>
              <md-button class="px-20 py-5  md-primary " @click="$emit('cancel')">
                Offer me alternate dates
              </md-button>
            </div>
          </div>
        </div>
      </div>
    </template>
  </modal>
</template>
<script>
import Modal from "@/components/Modal.vue";

export default {
  components: {
    Modal,
  },
};
</script>

<style scoped>
.title {
  height: 30px;
  font-size: 22px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 2.05;
  letter-spacing: normal;
  color: #171717;
}
.subtitle {
  height: 49px;

  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.69;
  letter-spacing: normal;
  color: #000;
}
.divider {
  width: 0;
  height: 72.2px;
  border: solid 1px #050505;
}

.header {
  font-size: 22px;
  font-weight: 800;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #050505;
}
.t_text {
  font-size: 16px;
  font-weight: 800;
  font-stretch: normal;

  font-style: normal;
  letter-spacing: normal;
  color: #050505;
}

.s_text {
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  color: #050505;
}
</style>
