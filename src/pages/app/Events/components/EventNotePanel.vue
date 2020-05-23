<template>
  <div class="note-panel">
    <div class="note-panel-header">Notes</div>
    <div class="note-panel-content">
      <span class="color-red">Add your personal tasks & notes <br/> to get things done</span>
    </div>
    <maryoku-input v-model="newNote" placeholder="Add new note..."></maryoku-input>
  </div>
</template>
<script>
import { MaryokuInput } from '@/components';

export default {
  name: "event-note-panel",
  components: {
    MaryokuInput,
  },
  data() {
    return {
      notes:[],
      newNote:""
    }
  },
}
</script>
<style lang="scss" scoped>
  .note-panel {
    width: 80%;
    margin: auto;
    &-header {
      font-size: 22px;
      font-family: "Manrope-ExtraBold";
      text-align: left;
    }
    &-content {
      padding: 30px 0px;
    }
  }
</style>