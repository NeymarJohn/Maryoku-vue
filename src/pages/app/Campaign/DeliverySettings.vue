<template>
  <div class="p-50 white-card mt-40 delivery-setting">
    <div class="d-flex align-center">
      <img class="mr-30" :src="`${$iconURL}Campaign/Group 9136.svg`" />
      <div >
        <div class="font-size-30 font-bold-extra color-red">Delivery settings</div>
        <div class="mt-2 d-flex align-center">
          <span class="font-bold-extra font-size-30 pr-20">0</span>
          <span>In your invitees list</span>
        </div>
      </div>
    </div>
    <div class="delivery-setting-content">
      <div class="setting-item">
        <md-checkbox v-model="selectedTool" value="phone"></md-checkbox>
        <div>
          <span class="font-size-22 font-bold-extra mr-30">By text message</span>
          <span>WhatsApp or sms</span>
        </div>
      </div>
      <div class="setting-item">
        <md-checkbox v-model="selectedTool" value="email"></md-checkbox>
        <div>
          <span class="font-size-22 font-bold-extra mr-30">By email</span>
          <span >Enter recipients emails or upload Microsoft excel or Google sheets with guests list</span>
        </div>
      </div>
      
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selectedTool: ''
    }
  },
};
</script>
<style lang="scss" scoped>
.delivery-setting {
  &-content {
    margin: 50px 50px 50px;
    .setting-item {
      display: flex;
      align-items: center;
      padding: 40px 0px;
      border-top: solid 1px #767676;
    }
  }
}
</style>