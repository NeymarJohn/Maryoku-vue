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
              
              <md-button class="md-outlined md-simple maryoku-btn" @click="choosePhoneExcel" v-if="!uploadedExcels.phone">
                <img :src="`${$iconURL}Campaign/Group 9241.svg`" class="mr-10">
                <span class="color-red">Upload Excel list file</span>
              </md-button>
              <div v-else class="uploadedFile border-gray-1">
                <div class="font-bold text-underline mb-10">{{uploadedExcels.phone}}</div>
                <md-button class="md-simple edit-btn" @click="choosePhoneExcel" >
                  <span class="color-red">change</span>
                </md-button>
              </div>
              <span class="ml-20 mt-10">
                <img class="ml-20" :src="`${$iconURL}Campaign/Group 9087.svg`">
                <md-tooltip >
                  <div class="font-size-14 input-tooltip ">{{tooltips.phoneExcel}}</div>
                </md-tooltip>
              </span>
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
              <div class="width-60 position-relative">
                <maryoku-input placeholder="Type your email subject here…"></maryoku-input>
                <span class="ml-20 mt-10 input-tooltip-wrapper position-relative" >
                  <img class="ml-20" :src="`${$iconURL}Campaign/Group 9087.svg`">
                  <md-tooltip >
                    <div class="font-size-14 input-tooltip ">Email Subject</div>
                  </md-tooltip>
                </span>
              </div>
            </div>
            <div class="mt-50" >
              <label class="font-bold mb-10 line-height-2" >From</label>
              <div class="width-60 position-relative">
                <maryoku-input placeholder="Your email address…"></maryoku-input>
                <span class="ml-20 mt-10 input-tooltip-wrapper position-relative" >
                  <img class="ml-20" :src="`${$iconURL}Campaign/Group 9087.svg`">
                  <md-tooltip >
                    <div class="font-size-14 input-tooltip ">Your email</div>
                  </md-tooltip>
                </span>
              </div>
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

                <!-- Emails Excel File Upload  -->
                <md-button v-if="!uploadedExcels.email" class="md-outlined md-simple maryoku-btn"  @click="chooseEmailExcel">
                  <img :src="`${$iconURL}Campaign/Group 9241.svg`" class="mr-10">
                  <span class="color-red">Upload Excel list file</span>
                </md-button>
                <div v-else class="uploadedFile border-gray-1">
                  <div class="font-bold text-underline mb-10">{{uploadedExcels.email}}</div>
                  <md-button class="md-simple edit-btn" @click="chooseEmailExcel" >
                    <span class="color-red">change</span>
                  </md-button>
                </div>
                <span class="ml-20 mt-10">
                  <img class="ml-20" :src="`${$iconURL}Campaign/Group 9087.svg`">
                  <md-tooltip >
                    <div class="font-size-14 input-tooltip ">{{tooltips.emailExcel}}</div>
                  </md-tooltip>
                </span>
              </div>
            </div>
          </div>
          <input
              style="display: none"
              id="execelFileInput"
              name="attachment"
              type="file"
              multiple="multiple"
              @change="onFileChange"
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" 
            />
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
      invalidPastedPhones: null,
      tooltips: {
        phoneExcel: "Please upload a csv file containing only phone numbers in a valid format.",
        emailExcel: "Please upload a csv file containing only email addresses in a valid format."
      },
      fileInputType: "",
      uploadedExcels: {
        phone: "",
        email: ""
      }
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
      
    },
    chooseEmailExcel() {
      document.getElementById("execelFileInput").click()
      this.fileInputType = "email"
    },
    choosePhoneExcel() {
      document.getElementById("execelFileInput").click()
      this.fileInputType = "phone"
    },
    onFileChange(event) {
      this.uploadedExcels[this.fileInputType] = event.target.files[0].name
      //handle validation excel files.
      // this.coverImage = await getBase64(event.target.files[0])
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
  .uploadedFile{
    padding: 10px 20px;
    text-align: center;
    border-radius: 3px;
    min-width: 200px;
  }
}
  .input-tooltip {
    max-width: 250px !important;
    white-space: break-spaces;
    text-align: left;
  }
  .input-tooltip-wrapper {
    position: absolute;
    right: 10px;
    top: 5px;
  }
</style>