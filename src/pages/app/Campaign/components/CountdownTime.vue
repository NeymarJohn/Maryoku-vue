<template>
  <div class="countdown-time d-flex">
    <div class="countdown-time-item">
      <div class="countdown-time-value">07</div>
      <div class="countdown-time-label" :style="`background-color: #d9fcf2`">DAYS</div>
    </div>
    <div class="countdown-time-item">
      <div class="countdown-time-value">07</div>
      <div class="countdown-time-label" :style="`background-color: #d9fcf2`">HOURS</div>
    </div>
    <div class="countdown-time-item">
      <div class="countdown-time-value">07</div>
      <div class="countdown-time-label" :style="`background-color: #d9fcf2`">MINUTES</div>
    </div>
    <div class="countdown-time-item">
      <div class="countdown-time-value">07</div>
      <div class="countdown-time-label" :style="`background-color: #d9fcf2`">SECONDS</div>
    </div>
  </div>
</template>
<script>
export default {
  
}
</script>
<style lang="scss" scoped>
.countdown-time{
  width: max-content;
  &-item {
    width: 118px;
    height: 161px;
    border-radius: 3px;
    box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);
    background-color: #ffffff;
    margin-right: 28px;
    &:last-child{
      margin-right: 0px;
    }
    display: flex;
    flex-direction: column;
  }
  &-value {
    width: 100%;
    text-align: center;
    line-height: 115px;
    font-size: 40px;
    font-family: "Manrope-ExtraBold";
  }
  &-label {
    width: 100%;
    text-align: center;
    line-height: 40px;
    font-size: 20px;
    flex-grow: 1;

  }
}
</style>