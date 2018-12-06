<template>
  <md-table-row slot="md-table-row" @click.native="showModalTodo(todoItem)">
    <md-table-cell md-label="What">{{ todoItem.title }}</md-table-cell>
    <md-table-cell md-label="Due Date">{{ todoItem.dueDateMillis | moment }}</md-table-cell>
    <md-table-cell md-label="Assign To">{{ todoItem.assignee }}</md-table-cell>
    <md-table-cell md-label="Status">{{ todoItem.status }}</md-table-cell>
    <md-table-cell class="visible-on-hover">
      <md-button class="md-just-icon md-simple md-danger" @click.native="showSwal()">
        <md-icon>delete</md-icon>
      </md-button>
    </md-table-cell>
  </md-table-row>
</template>

<script>
  import moment from 'moment';
export default {

  name: 'event-todo-row',
  props: {
    todoItem: Object,
    showModalTodo: Function,
    showSwal: Function
  },
  filters: {
    moment: function (date) {
      return moment(date).format('YYYY-MM-DD');
    }
  }

}
</script>
