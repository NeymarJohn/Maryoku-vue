<template>
  <div class="permission-row">
    <div><avartar :name="`March Madness`"></avartar></div>
    <div>March Madness</div>
    <div>March Madness<md-icon class="schedule-menu-btn-icon">keyboard_arrow_down</md-icon></div>
    <div>
      <popper trigger="click" :options="{ placement: 'bottom' }">
        <div class="popper white-card permit-page">
          <div class="font-size-22 popper-header"></div>
          <div>
            <div class="mb-30">All pages</div>
            <div class="mb-30">Specific pages</div>
            <multiselect
              class="mb-30"
              v-model="permittedPages"
              :options="[
                { id: '123', title: 'test' },
                { id: '124', title: 'test' },
                { id: '125', title: 'test' },
              ]"
              :close-on-select="true"
              :clear-on-select="true"
              tag-placeholder="Add this as new tag"
              placeholder="Type to search category"
              label="title"
              track-by="id"
            ></multiselect>
            <div class="page-tags">
              <div class="page-tag">Timeline</div>
            </div>
          </div>
        </div>

        <md-button class="md-simple maryoku-btn md-black" slot="reference">
          All pages<md-icon class="schedule-menu-btn-icon">keyboard_arrow_down</md-icon>
        </md-button>
      </popper>
    </div>
    <div>
      <md-menu md-size="big" md-align-trigger class="schedule-menu">
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
import Popper from "vue-popperjs";
import "vue-popperjs/dist/vue-popper.css";
export default {
  components: {
    Avartar,
    Popper,
  },
  data() {
    return {
      permittedPages: [],
    };
  },
  methods: {
    selectRole(role) {},
  },
};
</script>
<style lang="scss" scoped>
.permit-page {
  width: 550px;
  padding: 40px;
  box-shadow: 0 8px 14px 0 rgba(0, 0, 0, 0.13);
  border: solid 0.5px #d5d5d5;
  background-color: #ffffff;
  font-size: 16px;
  text-align: left;
  /deep/ .multiselect {
    box-shadow: 0 3px 13px 0 rgba(0, 0, 0, 0.15);
    border: none;
    .multiselect__tags {
      border: none;
    }
  }
}
</style>