<template>
  <div class="position-relative">
    <div class="md-layout">
      <div
        style="margin-top: -90px; background-color: #f3f7fd; height: 370px; width: 100vw; margin-left: -40px; margin-right: -40px "
        class="text-center"
      >
        <div class="md-layout-item pl-0 md-size-100 mt-30" style="">
          <div class="d-flex justify-content-end" style="">
            <md-button class=" md-simple " @click="$emit('cancel')">
              <md-icon class="">close</md-icon>
            </md-button>
          </div>
        </div>

        <div class="md-layout-item pl-0 md-size-100 mt-20 text-center ">
          <div>
            <img src="/static/img/Group 20954.svg" />
          </div>
          <div class="mt-20">
            <h2 class="t_text">Upload completed successfully</h2>
            <p class="s_text">You can now see all your customers in the customer list</p>
          </div>
        </div>
      </div>
      <div class="md-layout-item pl-0 md-size-100 mt-50">
        <md-button class=" md-simple md-outlined px-70 md-vendor " @click="$emit('cancel')">
          Done
        </md-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.title {
  width: 237px;
  height: 40px;
  font-size: 30px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  color: #050505;
}
.custom_border {
  border: solid 1px #e0e0e0;
}

.custom_right {
  margin-left: 290px;
}
.subtitle {
  width: 506px;
  height: 21px;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.63;
  letter-spacing: normal;
  text-align: left;
  color: #000;
}
h2 {
  font-size: 16px;
  margin: 0px 5px;
}

.upload-section {
  border-color: #641856 !important;
}
.t_text {
  margin: 0 24.7px 19.5px 106px;
  font-size: 30px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  color: #641856;
}
.s_text {
  font-size: 22px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: center;
  color: #050505;
}
</style>
