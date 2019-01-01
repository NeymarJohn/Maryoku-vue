<template>
  <td class="non-editable-cell" v-tooltip="cellContents">
    <div class="cell cell-active">
      <span class="cell-date-number">{{dayOnMonth}}</span>
      <span class="event-cell">
        <router-link :to="{name: 'NewEvent', params: {selectedDate: theDate, selectedOccasion: cellContents }}">{{cellContents}}</router-link>
      </span>
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
        type: Array
      },
      theDate: String,
      dayOnMonth: String,
    },
    methods: {

    },
    created() {

    },
    mounted() {

    },
    computed: {
      cellContents() {
        return this.calendarEvents[0].title;
      }
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
      background-color: transparent;
    }
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

  .vue-tooltip.tooltip-custom {
    background-color: #efefef;
    border: 1px solid #aaa;
    color: black;
  }

  .vue-tooltip.tooltip-custom .tooltip-arrow {
    border-color: #aaa;
  }
</style>
