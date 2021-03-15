<template>
  <div class="phone-box p-30 font-size-16">
    <div><img :src="`/static/icons/vendor/message-dark.svg`" /></div>
    <div class="font-bold mt-10">Where would you like to get text message?</div>
    <div class="mt-30">
      By checking an SMS box, you agree to receive autodialed promotional texts from Mayuko and Airbnb’s partners at:
    </div>
    <div>
      <div class="mt-40">Phone Number</div>
      <div class="number-box mt-10">
        <img :src="`${$iconURL}Choose+vendor+and+Proposal/phone-dark.svg`" />894-9948838
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>
<style lang="scss" scoped>
.phone-box {
  border: solid 2px #dbdbdb;
  border-radius: 4px;
  text-align: left;
  width: 350px;
  img {
    width: 25px;
    margin-right: 10px;
  }
  .number-box {
    border: solid 1px #dbdbdb;
    border-radius: 2px;
    padding: 20px;
  }
}
</style>