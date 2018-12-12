<template>
  <md-table-row slot="md-table-row" @click.native="showModalTodo(todoItem, todoIndex)">
    <md-table-cell>{{ todoItem.title }}</md-table-cell>
    <md-table-cell>{{ todoItem.dueDateMillis | moment }}</md-table-cell>
    <md-table-cell>{{ todoItem.assignee }}</md-table-cell>
    <md-table-cell>{{ todoItem.status }}</md-table-cell>
    <md-table-cell class="visible-on-hover" v-if="!readonly">
      <md-button class="md-just-icon md-simple md-danger" @click="showSwal($event, todoIndex, 'todos')">
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
    todoIndex: Number,
    showModalTodo: Function,
    showSwal: Function,
    readonly: Boolean,
  },
  filters: {
    moment: function (date) {
      return moment(date).format('YYYY-MM-DD');
    }
  }

}
</script>
