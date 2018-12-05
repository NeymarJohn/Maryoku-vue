<template>
  <div class="md-layout">
    <modal v-if="modalOpen">
      <template slot="header">
        <h4 class="modal-title">Add new TODO</h4>
        <md-button class="md-simple md-just-icon md-round modal-default-button" @click="noticeModalHide">
          <md-icon>clear</md-icon>
        </md-button>
      </template>

      <template slot="body">
        <form @submit.prevent="validateModalForm" class="md-layout">
          <md-card>
            <div class="md-layout">
              <div class="md-layout-item md-small-size-100">
                <md-field>
                  <md-icon class="md-accent">help_outline</md-icon>
                  <label>What</label>
                  <md-input name="todo-what" v-model="form.what" />
                </md-field>
              </div>

              <div class="md-layout-item md-small-size-100">
                <md-datepicker v-model="form.date" name="todo-date" md-immediately>
                  <label>Due Date</label>
                </md-datepicker>
              </div>
            </div>

            <div class="md-layout">
              <div class="md-layout-item md-small-size-100">
                <md-field>
                  <md-icon class="md-accent">person_add</md-icon>
                  <label>Assign To</label>
                  <md-input name="todo-assign" v-model="form.assignTo" />
                </md-field>
              </div>
              <div class="md-layout-item md-small-size-100">
                <md-field>
                  <md-icon class="md-accent">check</md-icon>
                  <label>Status</label>
                  <md-input name="todo-status" v-model="form.status" />
                </md-field>
              </div>
            </div>

          </md-card>
        </form>
      </template>

      <template slot="footer">
        <md-button class="md-simple" @click="noticeModalHide">Cancel</md-button>
        <md-button class="md-primary">Create</md-button>
      </template>
    </modal>
  </div>
</template>
<script>
  import { Modal } from "@/components";

  export default {
    name: 'event-modal-todo',
    components: {
      Modal,
    },
    data() {
      return {
        modalOpen: false,
        form: {
          id: null,
          what: null,
          date: null,
          assignTo: null,
          status: null,
        },
      }
    },
    methods: {
      noticeModalHide() {
        this.modalOpen = false;
      },
      toggleModal(show) {
        this.modalOpen = show;
      },
      validateModalForm() {
        return true;
      },
    }
  }
</script>
<style lang="scss">

</style>
