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
            <div class="d-flex align-start width-100">
              <div class="flex-1">
                <maryoku-textarea 
                  type="phones" 
                  placeholder="Paste all phone numbers here…" 
                  inputStyle="phone" 
                  ></maryoku-textarea>

                <invalid-address-panel class="mt-30" v-if="invalidPastedPhones" :content="invalidPastedPhones"></invalid-address-panel>
              </div>
              <span class="font-size-16" style="padding: 20px 40px">Or</span>
              
              <md-button class="md-outlined md-simple maryoku-btn">
                <img :src="`${$iconURL}Campaign/Group 9241.svg`" class="mr-10">
                <span class="color-red">Upload Excel list file</span>
              </md-button>
              <span class="ml-20 mt-10"><img :src="`${$iconURL}Campaign/Group+1175.svg`"></span>
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
              <label class="font-bold mb-10 line-height-2">Subject</label>
              <maryoku-input placeholder="Type your email subject here…" class="width-60"></maryoku-input>
            </div>
            <div class="mt-50" >
              <label class="font-bold mb-10 line-height-2" >From</label>
              <maryoku-input placeholder="Your email address…" class="width-60"></maryoku-input>
            </div>
            <div class="mt-50 font-size-14 ">
              <label class="mb-10 line-height-2"><span class="font-bold mr-10 font-size-16">To</span>Make sure to put space / comma between each address</label>
              <div class="d-flex align-start width-100 ">
                <div class="width-60">
                  <maryoku-textarea 
                    placeholder="Paste all emails here…" 
                    type="input" 
                    inputStyle="emails" 
                    @change="handleInputEmails">
                  </maryoku-textarea>
                  <invalid-address-panel class="mt-30" v-if="invalidPastedEmails" :content="invalidPastedEmails"></invalid-address-panel>
                </div>
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
import { Modal, MaryokuInput, LocationInput, MaryokuTextarea } from "@/components";
import CollapsePanel from './CollapsePanel'
import InvalidAddressPanel from './components/InvalidAddressPanel'
import {validateEmail, validPhoneNumber} from '@/utils/validation.util'
export default {
  components: {
    MaryokuInput,
    CollapsePanel,
    MaryokuTextarea,
    InvalidAddressPanel
  },
  data() {
    return {
      usePhone: false,
      useEmail: false,
      smsOrWhatsapp:'',
      invalidPastedEmails: null,
      invalidPastedPhones: null
    }
  },
  methods: {
    handleInputEmails({value, type}) {
      const addresses = value.split(/[\s,]+/)
      let invalidEmails = ""
      if (type=='emails') {
        addresses.forEach(address=>{
          if (address && address.trim() && !validateEmail(address)) {
            if (!invalidEmails) invalidEmails = address
            else invalidEmails = `${invalidEmails},${address}`
          }
        })
        this.invalidPastedEmails = invalidEmails;
      } else if(type=='phones') {
        addresses.forEach(address=>{
          if (address && address.trim() && !validPhoneNumber(address)) {
            if (!invalidEmails) invalidEmails = address
            else invalidEmails = `${invalidEmails},${address}`
          }
        })
        this.invalidPastedPhones = invalidEmails;
      }
      
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