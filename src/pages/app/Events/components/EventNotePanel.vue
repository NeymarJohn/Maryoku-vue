<template>
  <div class="note-panel">
    <div class="note-panel-header">Notes</div>
    <div class="note-panel-content">
      <div>
        <img  :src="`${$iconURL}Notes/note-background.svg`" width="120px"/>
      </div>
      <span class="color-red">Add your personal tasks & notes <br/> to get things done</span>
    </div>
    <maryoku-input v-model="newNote" placeholder="Add new note..."></maryoku-input>
    <div v-if="showEditor">
      <div class="setting-item">
        <div class="d-flex justify-content-between align-center">
          <div><img :src="`${$iconURL}Notes/bell-dark.svg`"/>Remind me on</div>
          <md-switch v-model="editingNote.isReminding"></md-switch>
        </div>
        
        <div class="d-flex" v-if="editingNote.isReminding">
          <maryoku-input v-model="editingNote.date" inputStyle="date" placeholder="DD/MM/YY" readonly></maryoku-input>
          <div style="width:20px"></div>
          <maryoku-input v-model="editingNote.remindingTime" inputStyle="time" placeholder="00:00 PM" readonly></maryoku-input>
        </div>
        
      </div>
      <div class="setting-item">
        <div class="d-flex justify-content-between align-center">
          <div><img :src="`${$iconURL}Notes/bell-dark.svg`"/>Give it to someone else</div>
          <md-switch v-model="editingNote.isGivenEmail"></md-switch>
        </div>
        <maryoku-input  v-if="editingNote.isGivenEmail" v-model="editingNote.givingEmail"></maryoku-input>
      </div>
      <div class="text-right">
        <md-button class="md-simple md-black normal-btn" @click="clear">Clear</md-button>
        <md-button class="md-default md-red normal-btn" @click="saveNote" type="email">Save</md-button>
      </div>

    </div>
  </div>
</template>
<script>
import { MaryokuInput, TimeInput } from '@/components';
export default {
  name: "event-note-panel",
  components: {
    MaryokuInput,
    TimeInput
  },
  data() {
    return {
      notes:[],
      newNote:"",
      showEditor:false,
      boolean: false,
      editingNote: {
        description: "",
        isReminding: false,
        isGivenEmail: false,
        remindingDate: 0,
        givingEmail: ""
      }
    }
  },
  methods: {
    clear() {
      this.editingNote = {
        description: "",
        isReminding: false,
        isGivenEmail: false,
        remindingDate: 0,
        givingEmail: ""
      }
    },
    saveNote() {

    }
  },
  watch: {
    newNote(newValue, oldValue) {
      if (newValue) {
        this.showEditor = true;
      } else {
         this.showEditor = false;
      }
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
    .setting-item {
      margin: 20px 0px;
      img {
        width: 23px;
        margin-right: 10px;
      }
    }
  }
</style>