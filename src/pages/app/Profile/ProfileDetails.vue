<template>
  <div class="profile-detail">
    <div class="profile-detail-info">
      <div class="d-flex justify-content-between">
        <label><img :src="`${$iconURL}common/user-dark.svg`" class="label-icon" /><span>Full Name</span></label>
        <md-button class="md-simple edit-btn" @click="edit('fullName')"> Edit</md-button>
      </div>
      <div class="profile-field-value" v-if="editingFieldName === 'fullName'">
        <input type="text" style="width: 100%" />
        <div class="text-right">
          <md-button class="md-simple maryoku-btn" @click="editingFieldName = ''">Cancel</md-button>
          <md-button class="maryoku-btn md-red">Save</md-button>
        </div>
      </div>
      <div v-else class="profile-field-value">{{ userData.name }}</div>
    </div>
    <div class="profile-detail-info">
      <div class="d-flex justify-content-between">
        <label><img :src="`${$iconURL}common/email-dark.svg`" class="label-icon" /><span>Email Address</span></label>
        <md-button class="md-simple edit-btn" @click="edit('email')"> Edit</md-button>
      </div>
      <div class="profile-field-value" v-if="editingFieldName === 'email'">
        <input type="text" style="width: 100%" />
        <div class="text-right">
          <md-button class="md-simple maryoku-btn" @click="editingFieldName = ''">Cancel</md-button>
          <md-button class="maryoku-btn md-red">Save</md-button>
        </div>
      </div>
      <div v-else class="profile-field-value">{{ userData.email || userData.username }}</div>
    </div>
    <div class="profile-detail-info">
      <div class="d-flex justify-content-between">
        <label><img :src="`${$iconURL}common/password-dark.svg`" class="label-icon" /><span>Password</span></label>
        <md-button class="md-simple edit-btn" @click="edit('fullName')"> Edit</md-button>
      </div>
      <div class="profile-field-value">*********</div>
    </div>
    <div class="profile-detail-info">
      <div class="d-flex justify-content-between">
        <label> <img :src="`${$iconURL}common/phone-dark.svg`" class="label-icon" /><span>Phone Number</span></label>
        <md-button class="md-simple edit-btn" @click="edit('phoneNumber')"> Edit</md-button>
      </div>
      <div class="profile-field-value" v-if="editingFieldName === 'phoneNumber'">
        <input type="text" style="width: 100%" />
        <div class="text-right">
          <md-button class="md-simple maryoku-btn" @click="editingFieldName = ''">Cancel</md-button>
          <md-button class="maryoku-btn md-red">Save</md-button>
        </div>
      </div>
      <div v-else class="profile-field-value">{{ userData.phoneNumber }}</div>
    </div>
    <div class="profile-detail-info">
      <div class="d-flex justify-content-between">
        <label><img :src="`${$iconURL}common/company-dark.svg`" class="label-icon" /><span>Company Name</span></label>
        <md-button class="md-simple edit-btn" @click="edit('companyName')"> Edit</md-button>
      </div>
      <div class="profile-field-value" v-if="editingFieldName === 'companyName'">
        <input type="text" style="width: 100%" />
        <div class="text-right">
          <md-button class="md-simple maryoku-btn" @click="editingFieldName = ''">Cancel</md-button>
          <md-button class="maryoku-btn md-red">Save</md-button>
        </div>
      </div>
      <div v-else class="profile-field-value">{{ userData.company }}</div>
    </div>
    <div class="profile-detail-info">
      <div class="d-flex justify-content-between">About your company</div>
      <div>Lorem ipsum dolor sit amet, consetetur sadipscing</div>
      <textarea></textarea>
    </div>
    <div class="mt-30 mb-30">
      <md-button class="md-simple edit-btn">Delete My Profile</md-button>
      <div>You will receive an email to confirm your decision.</div>
      <div>
        Please note, that all events you have created will be permanently erased. You may want to save backups of these
        events or export them.
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      editingFieldName: "",
    };
  },
  methods: {
    edit(fieldName) {
      this.editingFieldName = fieldName;
    },
  },
  computed: {
    userData() {
      return this.$store.state.auth.user;
    },
  },
};
</script>
<style lang="scss" scoped>
.profile-detail {
  text-align: left;
  max-width: 800px;
  .profile-detail-info {
    border-bottom: solid 1px #e0e0e0;
    padding: 35px 0;
    label {
      span {
        padding-left: 20px;
        font-weight: bold;
        font-size: 16px;
      }
    }
    .profile-field-value {
      font-size: 16px;
      margin-top: 10px;
    }
  }
}
</style>