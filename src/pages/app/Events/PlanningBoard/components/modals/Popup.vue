<template>
  <modal>
    <template slot="body">
      <div class="">
        <div class="md-layout">
          <div
            style="margin-top: -90px; background-color: #f3f7fd

; height: 370px; width: 100vw; margin-left: -40px; margin-right: -40px "
            class="text-center"
          >
            <div class="md-layout-item pl-0 md-size-100 mt-30" style="">
              <div class="d-flex justify-content-end" style="">
                <md-button class="md-simple " @click="$emit('cancel')">
                  <md-icon class="">
                    close
                  </md-icon>
                </md-button>
              </div>
            </div>

            <div class="md-layout-item pl-0 md-size-100 mt-20 text-center ">
              <div>
                <img :src="`${$iconURL}group-8647.svg`" alt="icon">
              </div>
              <div class="mt-20">
                <h2 class="t_text">
                  Requirements update completed successfully
                </h2>
                <p class="s_text">
                  The timer has been reset, you will receive new offers within 4 days
                </p>
              </div>
            </div>
          </div>
          <div class="md-layout-item pl-0 md-size-100 mt-50">
            <md-button class="px-50  md-primary " @click="$emit('cancel')">
              Cool, Go To Booking
            </md-button>
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
.t_text {
  font-size: 30px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.53;
  letter-spacing: normal;

  color: #0fac4c;
}

.s_text {
  font-size: 20px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 2.09;
  letter-spacing: normal;
  text-align: center;
  color: #050505;
}
</style>
