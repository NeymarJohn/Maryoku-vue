<template>
  <div class="p-50 white-card mt-40 delivery-setting">
    <collapse-panel>
      <template slot="header">
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
      </template>
      <template slot="content">
        <div class="delivery-setting-content">
          <div class="setting-item">
            <md-checkbox v-model="usePhone" class="md-checkbox-narrow"></md-checkbox>
            <div>
              <img :src="`${$iconURL}Campaign/group-9439.svg`" class="mr-10 ml-10"/>
              <span class="font-size-22 font-bold-extra mr-30">By text message</span>
              <span>WhatsApp or sms</span>
            </div>
            <md-button class="md-icon-button md-simple collapse-button">
              <md-icon class="icon" v-if="usePhone">keyboard_arrow_down</md-icon>
              <md-icon class="icon"  v-if="!usePhone">keyboard_arrow_right</md-icon>
            </md-button>
          </div>
          <div class="mb-50 mt-50" v-if="usePhone">
            <div class="font-bold">To</div>
            <div class="d-flex align-center width-100">
              <maryoku-input placeholder="Paste your phone number list…" inputStyle="phone" class="flex-1"></maryoku-input>
              <span class="font-size-16" style="padding: 20px 40px">Or</span>
              <md-button class="md-outlined md-simple maryoku-btn">
                <img :src="`${$iconURL}Campaign/Group 9241.svg`" class="mr-10">
                <span class="color-red">Upload Excel list file</span>
              </md-button>
              <span class="ml-20"><img :src="`${$iconURL}Campaign/Group+1175.svg`"></span>
            </div>
            <div class="mt-50 font-bold">How would you like to send your text?</div>
            <div class="mt-10">
              <md-checkbox v-model="smsOrWhatsapp" class="md-checkbox-circle md-red  mr-50"  value="sms">
                <span :class="{'font-bold': smsOrWhatsapp === 'sms'}" class="p-5">By SMS</span></md-checkbox>
              <md-checkbox v-model="smsOrWhatsapp" class="md-checkbox-circle md-red ml-50" value="whatsapp">
                <img :src="`${$iconURL}Campaign/Image+74.png`"/>
                <span :class="{'font-bold': smsOrWhatsapp === 'whatsapp'}">By WhatsApp</span>
              </md-checkbox>
            </div>
          </div>
          <div class="setting-item">
            <md-checkbox v-model="useEmail" class="md-checkbox-narrow"></md-checkbox>
            <div>
              <img :src="`${$iconURL}Campaign/group-9437.svg`" class="mr-10 ml-10"/>
              <span class="font-size-22 font-bold-extra mr-30">By email</span>
              <span >Enter recipients emails or upload Microsoft excel or Google sheets with guests list</span>
            </div>
            <md-button class="md-icon-button md-simple collapse-button">
              <md-icon class="icon" v-if="useEmail">keyboard_arrow_down</md-icon>
              <md-icon class="icon"  v-if="!useEmail">keyboard_arrow_right</md-icon>
            </md-button>
          </div>
          <div v-if="useEmail">
            <div class="mt-50" >
              <label class="font-bold">Subject</label>
              <maryoku-input placeholder="Type your email subject here…" class="width-66"></maryoku-input>
            </div>
            <div class="mt-50" >
              <label class="font-bold">From</label>
              <maryoku-input placeholder="Your email address…" class="width-66"></maryoku-input>
            </div>
            <div class="mt-50">
              <label><span class="font-bold mr-10">To</span>Make sure to put space / comma between each address</label>
              <div class="d-flex align-center width-100">
                <maryoku-input placeholder="Paste list of guests emails here…" inputStyle="mail" class="flex-1 width-66"></maryoku-input>
                <span class="font-size-16" style="padding: 20px 40px">Or</span>
                <md-button class="md-outlined md-simple maryoku-btn">
                  <img :src="`${$iconURL}Campaign/Group 9241.svg`" class="mr-10">
                  <span class="color-red">Upload Excel list file</span>
                </md-button>
              </div>
            </div>
          </div>
        </div>
      </template>
    </collapse-panel>
    
   
  </div>
</template>
<script>
import { Modal, MaryokuInput, LocationInput } from "@/components";
import CollapsePanel from './CollapsePanel'
export default {
  components: {
    MaryokuInput,
    CollapsePanel
  },
  data() {
    return {
      usePhone: false,
      useEmail: false,
      smsOrWhatsapp:''
    }
  },
};
</script>
<style lang="scss" scoped>
.delivery-setting {
  &-content {
    margin: 0px 50px 0px 50px;
    .setting-item {
      display: flex;
      align-items: center;
      margin-top: 50px;
      padding: 40px 0px 0px;
      border-top: solid 1px #767676;
      position: relative;
    }
  }
  .collapse-button{
    position: absolute;
    right: 0;
    bottom: 0;
    .icon {
      font-size: 35px !important;
    }
  }
}
</style>