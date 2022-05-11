<template>
  <div class="white-card mt-40 delivery-setting">
    <collapse-panel>
      <template slot="header">
        <DeliveryHeader :invitees-count="inviteesCount" />
      </template>
      <template slot="content">
        <div class="delivery-setting-content pb-50">
          <div class="setting-item">
            <div class="check-wrapper">
              <md-checkbox v-model="settingData.phone.selected" class="md-checkbox-narrow" />
              <div>
                <img :src="`${$iconURL}Campaign/group-9439.svg`" class="mr-10 ml-10">
                <span class="font-size-22 font-bold-extra mr-30">By text message</span>
                <span>WhatsApp or sms </span>
              </div>
              <md-button class="md-icon-button md-simple collapse-button" @click="phoneCollapsed = !phoneCollapsed">
                <colaps-icon :is-selected="phoneCollapsed" />
              </md-button>
            </div>
            <div
              v-if="phoneCollapsed && selectedCampaignStatusIs('EDITING', 'TESTING', 'SAVED')"
              class="mt-50"
            >
              <div class="font-bold">
                To
              </div>
              <div class="d-flex align-start width-100">
                <div class="flex-1 position-relative">
                  <maryoku-textarea
                    v-model="settingData.phone.numberString"
                    type="phones"
                    placeholder="Paste all phone numbers here…"
                    hint="###-##-#######"
                    input-style="phone"
                    @change="handleInputEmails"
                  />
                  <invalid-address-panel
                    v-if="invalidPastedPhones"
                    type="phone"
                    class="mt-30"
                    :content="invalidPastedPhones"
                  />
                  <span class="ml-20 mt-10 input-tooltip-wrapper position-relative">
                    <img class="ml-20" :src="`${$iconURL}Campaign/Group 9087.svg`">
                    <md-tooltip>
                      <div class="font-size-14 input-tooltip">###-##-#######</div>
                    </md-tooltip>
                  </span>
                </div>
                <span class="font-size-16" style="padding: 20px 40px">Or</span>
                <md-button
                  v-if="!settingData.phone.excelFileName"
                  class="md-outlined md-simple maryoku-btn"
                  @click="choosePhoneExcel"
                >
                  <img :src="`${$iconURL}Campaign/Group 9241.svg`" class="mr-10">
                  <span class="color-red">Upload Excel list file</span>
                </md-button>
                <div v-else class="uploadedFile border-gray-1">
                  <div class="font-bold text-underline mb-10">
                    {{ settingData.phone.excelFileName }}
                  </div>
                  <md-button class="md-simple edit-btn" @click="choosePhoneExcel">
                    <span class="color-red">change</span>
                  </md-button>
                  <md-button class="md-simple edit-btn" @click="removeExcel('phone')">
                    <span class="color-red">remove</span>
                  </md-button>
                </div>
                <span class="ml-20 mt-10">
                  <img class="ml-20" :src="`${$iconURL}Campaign/Group 9087.svg`">
                  <md-tooltip>
                    <div class="font-size-14 input-tooltip">
                      {{ tooltips.phoneExcel }}
                    </div>
                  </md-tooltip>
                </span>
              </div>
              <div class="mt-50 font-bold">
                How would you like to send your text?
              </div>
              <div class="mt-10">
                <md-checkbox
                  v-model="settingData.phone.smsOrWhatsapp"
                  class="md-checkbox-circle md-red mr-50"
                  value="sms"
                >
                  <span
                    :class="{
                      'font-bold': settingData.phone.smsOrWhatsapp === 'sms',
                    }"
                    class="p-5"
                  >By SMS</span>
                </md-checkbox>
                <md-checkbox
                  v-model="settingData.phone.smsOrWhatsapp"
                  class="md-checkbox-circle md-red ml-50"
                  value="whatsapp"
                  disabled
                >
                  <img :src="`${$iconURL}Campaign/Image+74.png`">
                  <span
                    :class="{
                      'font-bold': settingData.phone.smsOrWhatsapp === 'whatsapp',
                    }"
                  >By WhatsApp</span>
                </md-checkbox>
              </div>
            </div>
            <div
              v-if="phoneCollapsed && selectedCampaignStatusIs('STARTED', 'SCHEDULED')"
              class="mt-50"
            >
              <div class="mt-50">
                <div class="font-bold mb-10 line-height-2">
                  Sent to ({{ selectedCampaign.guestSMS ? selectedCampaign.guestSMS.length : 0 }})
                </div>
                <div class="d-flex align-start width-100">
                  {{ selectedCampaign.settings.phone.numberString }}
                </div>
                <div v-if="settingData.phone.smsOrWhatsapp" class="font-bold mb-10 line-height-2 mt-50">
                  By {{ settingData.phone.smsOrWhatsapp }}
                </div>
                <div class="mt-20">
                  <md-button class="md-simple md-red edit-btn" @click="downloadUsersPhone">
                    <img :src="`${$iconURL}Campaign/excel.png`" class="mr-10">Download Full Guests list
                  </md-button>
                </div>
              </div>
            </div>
          </div>

          <div class="setting-item">
            <div class="check-wrapper">
              <md-checkbox v-model="settingData.email.selected" class="md-checkbox-narrow" />
              <div>
                <img :src="`${$iconURL}Campaign/group-9437.svg`" class="mr-10 ml-10">
                <span class="font-size-22 font-bold-extra mr-30">By email</span>
                <span>Enter recipients emails or upload Microsoft excel or Google sheets with guests list</span>
              </div>

              <md-button class="md-icon-button md-simple collapse-button" @click="emailCollapsed = !emailCollapsed">
                <colaps-icon :is-selected="emailCollapsed" />
              </md-button>
            </div>
            <div
              v-if="emailCollapsed && selectedCampaignStatusIs('EDITING', 'TESTING', 'SAVED')"
              class="d-flex"
            >
              <div class="setting-item-fields">
                <div class="mt-50">
                  <label class="font-bold mb-10 line-height-2">Subject</label>
                  <div class="width-100 position-relative">
                    <maryoku-input
                      v-model="settingData.email.subject"
                      placeholder="Type your email subject here…"
                    />
                  </div>
                </div>
                <div class="mt-50">
                  <label class="font-bold mb-10 line-height-2">From</label>
                  <div class="width-100 position-relative">
                    <maryoku-input v-model="settingData.email.from" placeholder="Your email address…" />
                    <span class="ml-20 mt-10 input-tooltip-wrapper position-relative">
                      <img class="ml-20" :src="`${$iconURL}Campaign/Group 9087.svg`">
                      <md-tooltip class="emailTooltip">
                        Pick the email from which you wish the guests to get this mail
                      </md-tooltip>
                    </span>
                  </div>
                </div>
                <div class="mt-50 font-size-14">
                  <label class="mb-10 line-height-2">
                    <span class="font-bold mr-10 font-size-16">To</span>Make sure to put space / comma between each
                    address
                  </label>
                  <div class="d-flex align-center width-100">
                    <div class="width-100 position-relative">
                      <maryoku-textarea
                        v-model="settingData.email.addressString"
                        placeholder="Paste all emails here…"
                        type="input"
                        input-style="emails"
                        hint="example : example@mail.com"
                        @change="handleInputEmails"
                      />
                      <span class="ml-20 mt-10 input-tooltip-wrapper position-relative">
                        <img class="ml-20" :src="`${$iconURL}Campaign/Group 9087.svg`">
                        <md-tooltip>
                          <div class="font-size-14 input-tooltip">example : example@mail.com</div>
                        </md-tooltip>
                      </span>
                      <invalid-address-panel
                        v-if="invalidPastedEmails"
                        type="email"
                        class="mt-30"
                        :content="invalidPastedEmails"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="d-flex align-end setting-item-upload-field">
                <div class="d-flex align-center">
                  <span class="font-size-16" style="padding: 18px 30px">Or</span>

                  <!-- Emails Excel File Upload  -->
                  <md-button
                    v-if="!settingData.email.excelFileName"
                    class="md-outlined md-simple maryoku-btn"
                    @click="chooseEmailExcel"
                  >
                    <img :src="`${$iconURL}Campaign/Group 9241.svg`" class="mr-10">
                    <span class="color-red">Upload Excel list file</span>
                  </md-button>
                  <div v-else class="uploadedFile border-gray-1">
                    <div class="font-bold text-underline mb-10">
                      {{ settingData.email.excelFileName }}
                    </div>
                    <md-button class="md-simple edit-btn mr-10" @click="chooseEmailExcel">
                      <span class="color-red">change</span>
                    </md-button>
                    <span class="ml-10 mr-10" />
                    <md-button class="md-simple edit-btn ml-10" @click="removeExcel('email')">
                      <span class="color-red">remove</span>
                    </md-button>
                  </div>
                  <span class="ml-20">
                    <img class="ml-20" :src="`${$iconURL}Campaign/Group 9087.svg`">
                    <md-tooltip>
                      <div class="font-size-14 input-tooltip">
                        {{ tooltips.emailExcel }}
                      </div>
                    </md-tooltip>
                  </span>
                </div>
              </div>
            </div>
            <div v-if="emailCollapsed && selectedCampaignStatusIs('STARTED', 'SCHEDULED')">
              <div class="mt-50">
                <div class="font-bold mb-10 line-height-2">
                  Subject
                </div>
                <div class="width-60 position-relative">
                  {{ settingData.email.subject }}
                </div>
              </div>
              <div class="mt-50">
                <div class="font-bold mb-10 line-height-2">
                  From
                </div>
                <div class="width-60 position-relative">
                  {{ settingData.email.from }}
                </div>
              </div>
              <div class="mt-50">
                <div class="font-bold mb-10 line-height-2">
                  Sent to ({{ selectedCampaign.guestEmails ? selectedCampaign.guestEmails.length : 0 }})
                </div>
                <div class="d-flex align-start width-100">
                  {{ selectedCampaign.settings.email.addressString }}
                </div>
                <div class="mt-20">
                  <md-button class="md-simple md-red edit-btn" @click="downloadUsersEmailList">
                    <img :src="`${$iconURL}Campaign/excel.png`" class="mr-10">Download Full Guests list
                  </md-button>
                </div>
              </div>
            </div>
          </div>

          <input
            id="execelFileInput"
            style="display: none"
            name="attachment"
            type="file"
            multiple="multiple"
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            @change="onFileChange"
          >
        </div>
      </template>
    </collapse-panel>
  </div>
</template>
<script>
// core
import XLSX      from "xlsx";
import FileSaver from "file-saver";

// components
import { MaryokuInput, MaryokuTextarea } from "@/components";
import CollapsePanel                     from "../CollapsePanel";
import InvalidAddressPanel               from "../components/InvalidAddressPanel";
import DeliveryHeader                    from "./Header";
import ColapsIcon                        from "./ColapsIcon";

// utils
import { validateEmail, validPhoneNumber } from "@/utils/validation.util";
import defaultSettings                     from "../CampaignMainLayout/defaultSettings";

export default {
  components: {
    MaryokuInput,
    CollapsePanel,
    MaryokuTextarea,
    InvalidAddressPanel,
    DeliveryHeader,
    ColapsIcon,
  },
  props: {
    defaultSettings: {
      type    : Object,
      default : () => defaultSettings,
    },
    campaign: {
      type    : Object,
      default : () => ({}),
    },
  },
  data() {
    const tooltip = (text) => `Please upload a csv file containing only ${text} in a valid format.`;
    return {
      settingData: {
        email: {
          addressString: "",
        },
        phone: {
          numberString: "",
        },
      },
      invalidPastedEmails : null,
      invalidPastedPhones : null,
      phoneCollapsed      : false,
      emailCollapsed      : false,
      tooltips: {
        phoneExcel: tooltip("phone numbers"),
        emailExcel: tooltip("email addresses"),
      },
      fileInputType: "",
    };
  },
  computed: {
    event() {
      return this.$store.state.event.eventData;
    },
    emailSubject() {
      const campaignData = this.$store.state.campaign;
      switch (this.campaign.name) {
        case "SAVING_DATE":
          return `Save the date - ${campaignData.SAVING_DATE ? campaignData.SAVING_DATE.title : this.event.title}`;
        case "RSVP":
          return `RSVP - ${campaignData.RSVP ? campaignData.RSVP.title : this.event.title}`;
        case "COMING_SOON":
          return `Coming soon - ${campaignData.COMING_SOON ? campaignData.COMING_SOON.title : this.event.title}`;
        case "FEEDBACK":
          return `Feedback - ${campaignData.FEEDBACK ? campaignData.FEEDBACK.title : this.event.title}`;
        default:
          return "";
      }
    },
    selectedCampaign() {
      if (this.campaign.name) {
        const selectedCampaign = this.$store.state.campaign[this.campaign.name];
        if (selectedCampaign) return selectedCampaign;
      }
      return {};
    },
    selectedCampaignStatus () {
      const { campaignStatus = "TESTING" } = this.selectedCampaign;
      return campaignStatus;
    },
    emailInvitees() {
      const { guestEmails = [] } = this.selectedCampaign;
      if (guestEmails) {
        const { length = 0 } = guestEmails;
        return length || 0;
      }
      return 0;
    },
    phoneInvitees () {
      const { guestSMS = [] } = this.selectedCampaign;
      if (guestSMS) {
        const { length = 0 } = guestSMS;
        return length || 0;
      }
      return 0;
    },
    inviteesCount() {
      return this.emailInvitees + this.phoneInvitees;
    },
  },
  watch: {
    settingData: {
      handler(newValue) {
        this.$emit("change", newValue);
      },
      deep: true,
    },
    defaultSettings: {
      handler(newValue) {
        this.settingData               = newValue;
        this.settingData.email.subject = this.emailSubject;
        if (!this.settingData.email.from)
          this.settingData.email.from  = this.$store.state.auth.user.email || this.$store.state.auth.user.username;
      },
      deep: true,
    },
    emailSubject(newValue) {
      this.settingData.email.subject = newValue;
    },
  },
  created() {
    // set default subject for email
    this.settingData                     = this.defaultSettings;
    this.settingData.email.from          = this.$store.state.auth.user.email || this.$store.state.auth.user.username;
    this.settingData.email.subject       = this.emailSubject;
    this.settingData.phone.smsOrWhatsapp = "sms";
  },
  methods: {
    selectedCampaignStatusIs (...statuses) {
      return statuses.some((status) => status === this.selectedCampaignStatus);
    },
    handleInputEmails({ value, type }) {
      const addresses = value.split(/[\s,]+/);
      let invalidEmails = "";
      if (type == "emails") {
        addresses.forEach((address) => {
          if (address && address.trim() && !validateEmail(address)) {
            if (!invalidEmails) invalidEmails = address;
            else invalidEmails = `${invalidEmails},${address}`;
          }
        });
        this.invalidPastedEmails = invalidEmails;
      } else if (type == "phone") {
        addresses.forEach((address) => {
          if (address && address.trim() && !validPhoneNumber(address)) {
            if (!invalidEmails) invalidEmails = address;
            else invalidEmails = `${invalidEmails},${address}`;
          }
        });
        this.invalidPastedPhones = invalidEmails;
      }
    },
    chooseEmailExcel() {
      document.getElementById("execelFileInput").click();
      this.fileInputType = "email";
    },
    choosePhoneExcel() {
      document.getElementById("execelFileInput").click();
      this.fileInputType = "phone";
    },
    removeExcel(type) {
      this.settingData[type].excelFileName = "";
      const input = document.getElementById("execelFileInput");
      input.value = "";
      if (type === "email") this.settingData.email.addressString = "";
      else                  this.settingData.phone.numberString  = "";
    },
    onFileChange(event) {
      this.settingData[this.fileInputType].excelFileName = event.target.files[0].name;
      this.previewFiles(event.target.files[0]);
      //handle validation excel files.
      // this.coverImage = await getBase64(event.target.files[0])
    },
    previewFiles(file) {
      var reader = new FileReader();
      reader.onload = (e) => {
        var data = new Uint8Array(e.target.result);
        var workbook = XLSX.read(data, { type: "array" });
        let sheetName = workbook.SheetNames[0];
        /* DO SOMETHING WITH workbook HERE */
        let worksheet = workbook.Sheets[sheetName];
        const arrayOfRecords = XLSX.utils.sheet_to_json(worksheet);
        const key = Object.keys(arrayOfRecords[0])[0];
        const values = [];

        // if the list start at header, then add the key
        if (validateEmail(key)) {
          values.push(key);
        }
        arrayOfRecords.forEach((r) => {
          const val = r[key];
          values.push(val);
        });
        if (this.fileInputType === "email") {
          this.settingData.email.addressString = values.join();
        } else this.settingData.phone.numberString = values.join();
      };
      reader.readAsArrayBuffer(file);
    },
    downloadUsersPhone() {
      this.exportXls(this.selectedCampaign.guestSMS, "phonenumbers");
    },
    downloadUsersEmailList() {
      if (this.selectedCampaign.guestEmails) {
        if (this.campaign.name === "RSVP") {
          this.$http.get(`${process.env.SERVER_URL}/1/rsvp/guests-excel/${this.event.id}`).then((res) => {
            const rsvpUsers = res.data;
            const guestData = [];
            this.selectedCampaign.guestEmails.forEach((guest) => {
              if (rsvpUsers.findIndex((it) => it.email === guest.email) < 0) {
                guestData.push(guest);
              }
            });
            this.exportXls(rsvpUsers.concat(guestData), "emails");
          });
        } else {
          this.exportXls(this.selectedCampaign.guestEmails, "emails");
        }
      }
    },
    exportXls(csvData, fileName) {
      const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
      const fileExtension = ".xlsx";

      const ws = XLSX.utils.json_to_sheet(csvData);
      const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const data = new Blob([excelBuffer], { type: fileType });
      FileSaver.saveAs(data, this.selectedCampaign.campaignType + "_" + fileName + fileExtension);
    },
  },
};
</script>
<style lang="scss" scoped>
.delivery-setting {
  &-content {
    margin: 0px 50px 0px 50px;

    .setting-item {
      padding: 40px 0;
      margin: 0 50px;
      border-top: solid 1px #767676;
      position: relative;

      .check-wrapper {
        display: flex;
        align-items: center;

      }
    }
  }

  .collapse-button {
    position: absolute;
    right: 0;

    .icon {
      font-size: 35px !important;
    }
  }

  .uploadedFile {
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
.setting-item-fields {
  max-width: 700px;
  flex: 1 1 200px;
}

.setting-item-upload-field {
  max-width: 410px;
  flex: 1 1 410px;
}
</style>
