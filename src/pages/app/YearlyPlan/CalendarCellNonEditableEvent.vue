<template>
  <td class="non-editable-cell" v-tooltip="{html:`tooltipContent_${theDate}`, class: 'tooltip-custom-non-editable'}">
    <div class="cell cell-active">
      <span class="cell-date-number">{{dayOnMonth}}</span>
      <span class="event-cell">
        <a href="#">{{cellContents}}</a>
      </span>
    </div>
    <div :id="`tooltipContent_${theDate}`" class="tooltip-custom-non-editable" style="text-align: center;">
      <div class="title">
        Start planning for
        <div v-for="calendarEvent in calendarEvents.nonEditables" :key="calendarEvent.id">
          <a href="#" class="text-gray md-sm" style="padding: 0;" @click="createEventFor(calendarEvent)">
            <strong>{{calendarEvent.title}}</strong>
            <md-icon>chevron_right</md-icon>
          </a>
        </div>
      </div>
    </div>
  </td>
</template>
<script>
  import CalendarEvent from '@/models/CalendarEvent'

  export default {
    name: 'non-editable-event',
    components: {

    },
    props: {
      calendarEvents: {
        type: Object
      },
      theDate: String,
      dayOnMonth: String,
    },
    methods: {
      createEventFor(event){
        this.$router.push({ name: 'NewEvent', params: {selectedDate: this.theDate, selectedOccasion: event.title }});
      }
    },
    created() {

    },
    mounted() {

    },
    computed: {
      cellContents() {
        return this.calendarEvents.nonEditables[0].title;
      },
    }
  }
</script>
<style lang="scss">
  .non-editable-cell {
    padding:0;
    height: inherit;
    background-color: transparent;
    color: #999;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    width: 1px;
    min-width: 1px;
    max-width: 1px;

    &:hover {
      background-color: #e1f5fe;
    }

    .cell {
      width: 100%;
      max-width: 100%;
      min-width: 100%;
      height: 100%;
      position: relative;
      padding: 0;
      margin: 0;

      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      display: inline;
    }

    .cell-active {
      cursor: pointer;
      top: 3px;
    }

    .event-cell {
      cursor: pointer;
      color: #ccc !important;
      font-weight: 500;
    }

    a {
      color: #bdbdbd !important;
    }

    /*.calendar-grid td:hover {
      background-color: #e1f5fe;
    }*/

    .cell-date-number {
      float: left;
      font-size: 12px;
      font-weight: 500;
      color: #999;
      padding: 3px 6px;
    }
  }

  .vue-tooltip.tooltip-custom-non-editable {
    background-color: #fff;
    border: 1px solid #aaa;
    color: black;
    font-size: 14px;
    font-weight: 400;
  }

  .vue-tooltip.tooltip-custom-non-editable .tooltip-arrow {
    border-color: #aaa;
  }
</style>
