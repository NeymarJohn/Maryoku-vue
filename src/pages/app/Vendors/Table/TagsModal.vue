<template>
  <div class="md-layout">
    <modal v-if="tagsModalOpen" container-class="modal-container" @close="noticeModalHide">
      <template slot="body">
        <h3 class="title">
          Tagging
        </h3>
        <div class="md-layout">
          <div class="md-layout-item md-size-95 mt-4 md-small-size-100">
            <div class="md-layout-item">
              <md-field>
                <label for="tag">Tags</label>
                <md-select v-model="tag" name="select">
                  <md-option v-for="(option, index) in tags" :key="index" :value="option">
                    {{ option }}
                  </md-option>
                </md-select>
              </md-field>
            </div>
          </div>
        </div>
      </template>
    </modal>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import vendorsVuex from "../vendors.vuex";
import { Modal } from "@/components";

export default {
  components: {
    Modal,
  },
  props: {},
  data() {
    return {
      tagsModalOpen: false,
      tags: [],
      tag: " ",
    };
  },
  computed: {
    ...mapState("vendors", ["vendorsMemberData"]),
  },
  created() {
    this.$store.registerModule("vendors", vendorsVuex);
  },
  destroyed() {
    this.$store.unregisterModule("vendors", vendorsVuex);
  },
  methods: {
    ...mapMutations("vendors", ["setMemberProperty"]),
    noticeModalHide: function () {
      this.tagsModalOpen = false;
    },
    toggleModal: function (show) {
      this.tagsModalOpen = show;
    },
  },
};
</script>
<style lang="scss">
</style>
