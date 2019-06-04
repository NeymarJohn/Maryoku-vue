<template>
  <div class="md-layout event-group-details">
    <div class="md-layout-item">
      <md-card style="min-height: 50%;">
        <md-card-header class="md-card-header-text md-card-header-warning">
          <div class="card-text">
            <h4 class="title" style="color: white;">
              {{groupData.title}}
              <small style="display: block;">Details</small>
            </h4>
          </div>
          <md-button class="md-success md-sm pull-right" style="margin: 16px 6px;" @click="saveInteraction" :disabled="working">Save</md-button>
        </md-card-header>
        <md-card-content>
          <vue-element-loading :active="working" spinner="ring" color="#FF547C" />
          <div class="md-layout" style="margin: 0;">

          </div>
        </md-card-content>
      </md-card>
    </div>
  </div>
</template>
<script>

  import EventInteraction from '@/models/EventInteraction';
  import Calendar from '@/models/Calendar';

  export default {
    name: 'event-group-details',
    props: {
      eventData: {
        type: Object,
        default: ()=>{ return { title: ''};}
      },
      groupData: {
        type: Object,
        default: ()=>{return { title: ''};}
      }
    },
    data(){
      return {
        working: true
      };
    },
    mounted(){
    },
    methods: {

    },
    watch: {
      groupData(newVal, oldVal){
        this.working = true;

      }
    }
  }
</script>
<style lang="scss" scoped>

</style>
