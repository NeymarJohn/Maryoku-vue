<template>
   <div class="position-relative">
       <md-button
           class="md-simple md-icon-button position-absolute"
           style="top: -20px;right:0px"
           @click="$emit('close')"
       >
           <md-icon>close</md-icon>
       </md-button>
       <md-table v-model="rfps" class="mt-10">
           <md-table-row slot="md-table-row" slot-scope="{ item }">
               <md-table-cell md-label="Id">{{getIndex(item) + 1}}</md-table-cell>
               <md-table-cell md-label="Event Name">
                   <div class="font-bold font-size-16" v-if="item.eventData.concept">
                       {{ item.eventData.concept.name }}
                   </div>
                   <div v-else-if="item.eventData.title">{{ item.eventData.title }}</div>
                   <div v-else>New Event</div>
               </md-table-cell>
               <md-table-cell md-label="Date">{{ item.eventData.eventStartMillis | date("DD/MM/YYYY") }}</md-table-cell>
               <md-table-cell md-label="Expire At">{{ item.expiredTime | date("DD/MM/YYYY") }}</md-table-cell>
               <md-table-cell md-label="Location">{{ item.eventData.location }}</md-table-cell>
               <md-table-cell md-label="Participants">{{ item.eventData.numberOfParticipants }}</md-table-cell>
               <md-table-cell md-label="Cost">$ {{ (item.proposal ? item.proposal.cost : item.componentInstance ? item.componentInstance.allocatedBudget : 0) | withComma }}</md-table-cell>
               <md-table-cell md-label="Status">{{ item.proposal ? 'Submitted' : 'Pending'}}</md-table-cell>
           </md-table-row>
       </md-table>
   </div>

</template>
<script>

export default {
    props:{
        rfps: {
          type: Array,
      }
    },
    methods:{
        getIndex (item){
            return this.rfps.findIndex(v => v.id === item.id);
        },
        getStatusIcon(status) {
            return ''
        },
    }
}
</script>
<style>
</style>
