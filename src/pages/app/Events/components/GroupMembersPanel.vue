<template>
  <div class="md-layout group-members-panel" style="height: 100vh;">
    <vue-element-loading :active="working" spinner="ring" color="#FF547C" />
    <div class="md-layout-item md-size-5" style="padding: 0; margin: 0;">
      <h4 class="md-title">
        <md-button class="md-button md-theme-default md-simple md-just-icon" @click="closePanel">
          <md-icon>arrow_back</md-icon>
        </md-button>
      </h4>
    </div>
    <div class="md-layout-item md-size-95" style="max-height: 90vh; ">
      <h4 class="md-title" style="margin-bottom: 0; line-height: 51px;">
        Assign members
      </h4>
      <div v-if="allInvitees.length" class="md-layout md-gutter">
        <div class="md-layout-item md-size-100">
          <md-button class="md-info md-sm pull-right">
            Add Invitee
          </md-button>
          <md-button class="md-purple md-sm pull-right">
            Import Invitees
          </md-button>
        </div>
        <div class="md-layout-item  md-size-100">
          <md-table>
            <md-table-row>
              <md-table-cell>abc</md-table-cell>
            </md-table-row>
          </md-table>
        </div>
      </div>

      <div v-if="!allInvitees.length" class="text-center">
        <h4>You do not have any invitees yet</h4>
        <md-button class="md-info" @click="addInvitee">
          <md-icon>person</md-icon> Add Invitee
        </md-button>
        <md-button class="md-purple" @click="importInvitees">
          <md-icon>group</md-icon> Import Invitees
        </md-button>
      </div>
    </div>
  </div>
</template>
<script>

import EventInvitee from "@/models/EventInvitee";

export default {
  name: "GroupMemberPanel",
  props: {
    eventData: {
      type: Object,
      default: () => { return { title: ""}; }
    },
    groupData: {
      type: Object
    }
  },
  data () {
    return {
      working: true,
      allInvitees: [],
      inviteeTemplate: {
        firstName: null,
        lastName: null,
        emailAddress: null
      }
    };
  },
  watch: {
    groupData (newVal, oldVal) {
      new EventInvitee().get().then(res => {
        this.allInvitees = res;
        this.working = false;
      });
    }
  },
  mounted () {
    if (this.eventData) {
      if (this.groupData) {
        this.working = false;
      }
    }
  },
  methods: {
    closePanel () {
      this.$emit("closePanel");
    },
    addMember () {
      this.allInvitees.unshift({
        id: "new",
        firstName: null,
        lastName: null,
        emailAddress: null
      });
    },
    importInvitees () {

    }
  }
};
</script>
<style lang="scss" scoped>

</style>
