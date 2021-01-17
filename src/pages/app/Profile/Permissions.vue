<template>
  <div class="profile-permission">
    <div class="font-size-20 font-bold-extra">Add colleague to your projects</div>
    <div class="font-size-16 font-bold mt-40">Email</div>
    <div class="d-flex add-form">
      <maryoku-input v-model="invitedEmail" inputStyle="email"></maryoku-input>
      <multiselect
        v-model="newColleague.role"
        class="white-card"
        :options="roles"
        :close-on-select="true"
        :clear-on-select="true"
        tag-placeholder="Add this as new tag"
        placeholder="Type to search category"
        label="title"
        track-by="id"
      ></multiselect>
      <multiselect
        v-model="newColleague.role"
        :options="roles"
        :close-on-select="true"
        :clear-on-select="true"
        tag-placeholder="Add this as new tag"
        placeholder="Type to search category"
        label="title"
        track-by="id"
      ></multiselect>
      <md-button class="maryoku-btn md-red">Add</md-button>
    </div>
    <hr />
    <div class="permision-list">
      <div v-for="(user, index) in permittedUsers" :key="index" class="permission-row">
        <div>March Madness</div>
        <div>March Madness</div>
        <div>March Madness</div>
      </div>
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
      permittedUsers: [{ name: "Rachel Mendelovich" }, { name: "Rachel Mendelovich" }, { name: "Rachel Mendelovich" }],
      roles: [
        { id: "editor", title: "Editor" },
        { id: "Admin", title: "Admin" },
      ],
      newColleague: {
        email: "",
        role: "editor",
        invitedEvent: "",
      },
    };
  },
};
</script>
<style lang="scss" scoped>
.profile-permission {
  padding-top: 60px;
  text-align: left;
  .add-form {
    .multiselect {
      border: none;
    }
  }
  .permision-list {
    .permission-row {
      display: grid;
      grid-template-columns: 40px 200px 200px 200px auto;
    }
  }
}
</style>