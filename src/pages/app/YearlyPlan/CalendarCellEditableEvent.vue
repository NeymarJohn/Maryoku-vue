<template>
  <td class="editable-cell" >
    <div class="cell cell-active">
      <span class="cell-date-number">{{dayOnMonth}}</span>
      <span class="event-cell">
        <router-link :to="{name: 'EditEvent', params: {id: calendarEvents.editables[0].id }}">{{cellContents}}</router-link>
      </span>
    </div>
  </td>
</template>
<script>
  import CalendarEvent from '@/models/CalendarEvent'

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
</style>
