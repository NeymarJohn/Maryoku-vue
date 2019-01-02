<template>
  <td class="editable-cell" v-tooltip="{html:`tooltipContent_${theDate}`, class: 'tooltip-custom-editable'}">
    <div class="cell cell-active">
      <span class="cell-date-number">{{dayOnMonth}}</span>
      <span class="event-cell">
        {{cellContents}}
      </span>
    </div>
    <div :id="`tooltipContent_${theDate}`" class="tooltip-custom-editable" style="text-align: center;">
      <md-list class="md-double-line">
        <md-list-item class="md-inset" v-for="calendarEvent in calendarEvents.editables" :key="calendarEvent.id">
          <md-button class="md-just-icon md-round md-sm md-rose " style="text-align: center; padding: 0; font-size: 10px;" :to="{name: 'EditEvent', params: {id: calendarEvent.id }}">
            <i class="fa fa-edit"></i>
          </md-button>
          <div class="md-list-item-text md-list-action">
            <span>{{calendarEvent.title}}</span>
            <span>{{calendarEvent.occasion}}</span>
          </div>
        </md-list-item>
      </md-list>

    </div>
  </td>
</template>
<script>

  export default {
    name: 'editable-event',
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

    },
    created() {

    },
    mounted() {

    },
    computed: {
      cellContents() {
        return this.calendarEvents.editables[0].title;
      }
    }
  }
</script>
<style lang="scss">
  .editable-cell {
    padding:0;
    height: inherit;
    background-color: #03a9f4;
    color: #fff;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    width: 1px;
    min-width: 1px;
    max-width: 1px;

    &:hover {
      background-color: #03a9f4;
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
      color: #fff !important;
      font-weight: 500;
    }

    a {
      color: #fff !important;
    }

    /*.calendar-grid td:hover {
      background-color: #e1f5fe;
    }*/

    .cell-date-number {
      float: left;
      font-size: 12px;
      font-weight: 500;
      color: #fff;
      padding: 3px 6px;
    }
  }

  .vue-tooltip.tooltip-custom-editable {
    background-color: #fefefe;
    border: 1px solid #03a9f4;
    color: black;
    font-size: 14px;
    font-weight: 500;
  }

  .vue-tooltip.tooltip-custom-editable .tooltip-arrow {
    border-color: #03a9f4;
  }

  .md-list {
    padding: 0;
    margin: 0;
  }

  .md-list-item {
    padding: 0;
    margin: 0;
  }
</style>
