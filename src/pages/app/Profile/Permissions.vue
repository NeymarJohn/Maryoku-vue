<template>
  <div class="profile-permission">
    <div class="font-size-20 font-bold-extra">Add colleague to your projects</div>
    <div class="font-size-16 font-bold mt-40">Email</div>
    <div class="add-form">
      <maryoku-input v-model="invitedEmail" inputStyle="email"></maryoku-input>
      <div class="input-wrapper">
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
      </div>
      <div class="input-wrapper">
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
      </div>
      <md-button class="maryoku-btn md-red">Add</md-button>
    </div>
    <hr />
    <div class="permision-list">
      <div v-for="(user, index) in permittedUsers" :key="index" class="permission-row">
        <div><img :src="userData.avatar" class="user-icon" /></div>
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
  computed: {
    userData() {
      return this.$store.state.auth.user;
    },
  },
};
</script>
<style lang="scss" scoped>
.profile-permission {
  padding-top: 60px;
  text-align: left;
  .add-form {
    display: grid;
    grid-template-columns: 40% 18% 30% 12%;
    .input-wrapper {
      padding: 0 10px;
      /deep/ .multiselect {
        box-shadow: 0 3px 13px 0 rgba(0, 0, 0, 0.15);
        border: none;
        .multiselect__tags {
          border: none;
        }
      }
    }
    .maryoku_input,
    input,
    button {
      height: 100%;
      margin: 0;
    }
  }
  .permision-list {
    .permission-row {
      display: grid;
      grid-template-columns: 80px 25% 25% auto;
      padding: 20px 0;
      font-size: 16px;
      img.user-icon {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        overflow: hidden;
        object-fit: cover;
      }
    }
  }
}
</style>