<template>
  <md-table v-model="group.members" md-card class="text-left table-hover clear-margins" table-header-color="orange" style="background-color: white !important;" :md-fixed-header="true" :md-height="300">
    <md-table-row slot="md-table-row" :key="item.id" slot-scope="{ item }">
      <md-table-cell md-label="Invitee" style="padding-left: 12px; max-width: 50%;">
        <template v-if="item.person.firstName || item.person.lastName">
          {{ item.person.firstName }} {{ item.person.lastName }} <small class="text-gray">({{ item.person.emailAddress }})</small>
        </template>
        <template v-else-if="item.person.displayName">
          {{ item.person.displayName }} <small class="text-gray">({{ item.person.emailAddress }})</small>
        </template>
        <template v-else>
          {{ item.person.emailAddress }}
        </template>
      </md-table-cell>
      <md-table-cell md-label="RSVP">
        <md-icon v-if="!item.inviteeResponse" class="text-gray" title="Not invited yet">
          help_outline
        </md-icon>
        <md-icon v-if="item.inviteeResponse && item.inviteeResponse.attending" class="text-success" title="Attending">
          done
        </md-icon>
        <md-icon v-if="item.inviteeResponse && !item.inviteeResponse.attending" class="text-danger" title="Attending">
          close
        </md-icon>
      </md-table-cell>
      <md-table-cell md-label="" class="text-right">
        <md-button class="md-danger md-round md-just-icon" :disabled="noActions" @click="unselectMember(item)">
          <md-icon>remove</md-icon>
          <md-tooltip md-direction="bottom">
            Unselect from this event
          </md-tooltip>
        </md-button>
      </md-table-cell>
    </md-table-row>
  </md-table>
</template>

<script>
export default {
  name: "EventInviteeGroupDetails",
  props: {
    group: Object
  },
  data () {
    return {
      noActions: false
    };
  },
  methods: {
    unselectMember (member) {
      this.$emit("unselect-member", member);
    }
  }
};
</script>

<style scoped>

</style>
