<template>
  <div class="position-relative">
    <md-button
      class="md-simple md-icon-button position-absolute"
      style="top: -20px;right:0px"
      @click="$emit('close')"
    >
      <md-icon>close</md-icon>
    </md-button>
    <md-table v-model="events" class="mt-10">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Id">
          {{ item.id }}
        </md-table-cell>
        <md-table-cell md-label="Event Name">
          {{ item.title }}
        </md-table-cell>
        <md-table-cell md-label="Event Type">
          {{
            item.eventType ? item.eventType.name : item.eventType
          }}
        </md-table-cell>
        <md-table-cell md-label="Date">
          {{ item.eventStartMillis | moment }}
        </md-table-cell>
        <md-table-cell md-label="# Participants">
          {{ item.numberOfParticipants }}
        </md-table-cell>
        <md-table-cell md-label="Budget Per Participant">
          $ {{ item.budgetPerPerson }}
        </md-table-cell>
        <md-table-cell md-label="Location">
          {{ item.location }}
        </md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>
<script>
import { PROPOSAL_STATUS } from "@/constants/status";

export default {
    props:{
      events: {
          type: Array,
          default: () =>[]
      }
    },
    created() {
    },
    methods:{
    }
};
</script>
<style>
</style>
