<template>
  <div class="profile-permission">
    <div class="font-size-20 font-bold-extra">Add colleague to your projects</div>
    <div class="font-size-16 font-bold mt-40">Email</div>
    <div class="d-flex">
      <maryoku-input v-model="invitedEmail" inputStyle="mail"></maryoku-input>
      <select></select>
      <select></select>
      <md-button class="maryoku-btn md-red">Add</md-button>
    </div>
  </div>
</template>

<script>
import MaryokuInput from "@/components/Inputs/MaryokuInput.vue";
export default {
  components: {
    MaryokuInput,
  },
  data() {
    return {
      invitedEmail: "",
    };
  },
};
</script>
<style lang="scss" scoped>
.profile-permission {
  text-align: left;
}
</style>