<template>
  <div class="vendor-account-notification">
    <div>
      <notification-setting-item
        class="notification-settiong-item"
        v-for="setting in settings"
        :key="setting.name"
        :setting="setting"
      ></notification-setting-item>
    </div>
    <div class="p-60">
      <phone-box :phoneNumer="vendorData.vendorMainPhoneNumber"></phone-box>
    </div>
  </div>
</template>
<script>
import NotificationSettingItem from "../../components/NotificationSettingItem.vue";
import PhoneBox from "./PhoneBox.vue";
export default {
  components: { NotificationSettingItem, PhoneBox },
  data() {
    return {
      settings: [
        {
          name: "Messages",
          description: "Receive messages from on new proposals requests",
          options: [
            { name: "Email", enabled: true },
            { name: "Text messages", enabled: false },
          ],
        },
        {
          name: "Reminders",
          description:
            "Receive proposal’s deadlines reminders, cancellations, pricing notices, and other reminders related to your activities on Maryoku.",
          options: [
            { name: "Email", enabled: true },
            { name: "Text messages", enabled: false },
          ],
        },
        {
          name: "Promotions and tips",
          description:
            "Receive coupons, promotions, surveys, product updates, and inspiration from Maryuko and Maryoku’s partners.",
          options: [
            { name: "Email", enabled: true },
            { name: "Text messages", enabled: false },
          ],
        },
        {
          name: "Policy and community",
          description:
            "Receive updates on events regulations and stay informed about advocacy efforts to create fair, responsible events laws in your community.",
          options: [
            { name: "Email", enabled: true },
            { name: "Text messages", enabled: false },
          ],
        },
        {
          name: "Account support",
          description:
            "Receive messages about your account, your events, legal notifications, security and privacy matters, and customer support requests. For your security, you cannot disable email notifications and we may contact you by phone or other means if needed.",
          options: [
            { name: "Email", enabled: true },
            { name: "Text messages", enabled: false },
          ],
        },
      ],
    };
  },
  computed: {
    vendorData() {
      return this.$store.state.vendor.profile;
    },
  },
};
</script>
<style lang="scss" scoped>
.vendor-account-notification {
  display: flex;
  flex-basis: 60% 40%;
  .notification-settiong-item {
    border-bottom: solid 2px #dbdbdb;
  }
}
</style>