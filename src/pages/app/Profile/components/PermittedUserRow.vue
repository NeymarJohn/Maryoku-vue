<template>
  <div class="permission-row">
    <div><avartar :name="`March Madness`"></avartar></div>
    <div>March Madness</div>
    <div>March Madness<md-icon class="schedule-menu-btn-icon">keyboard_arrow_down</md-icon></div>
    <div>March Madness<md-icon class="schedule-menu-btn-icon">keyboard_arrow_down</md-icon></div>
    <div>
      <md-menu md-size="big" md-align-trigger md-direction="bottom-center" class="schedule-menu">
        <md-button md-menu-trigger class="md-simple md-black schedule-menu-btn maryoku-btn">
          <span class="font-size-16 font-regular"> Can view </span>
          <md-icon class="schedule-menu-btn-icon">keyboard_arrow_down</md-icon>
        </md-button>
        <md-menu-content>
          <md-menu-item class="text-center" @click="selectRole('view')">
            <span class="font-size-16" :class="{ 'font-bold-extra': false }"> Can view </span>
          </md-menu-item>
          <md-menu-item class="text-center" @click="selectRole('edit')">
            <span class="font-size-16" :class="{ 'font-bold-extra': false }"> Can edit </span>
          </md-menu-item>
          <md-menu-item class="text-center" @click="selectRole('comment')">
            <span class="font-size-16" :class="{ 'font-bold-extra': false }"> Can comment </span>
          </md-menu-item>
          <md-divider></md-divider>
          <md-menu-item class="text-center" @click="selectRole('remove')">
            <span class="font-size-16" :class="{ 'font-bold-extra': false }"> Remove </span>
          </md-menu-item>
        </md-menu-content>
      </md-menu>
    </div>
  </div>
</template>
<script>
import Avartar from "@/components/Avartar.vue";

export default {
  components: {
    Avartar,
  },
  methods: {
    selectRole(role) {},
  },
};
</script>