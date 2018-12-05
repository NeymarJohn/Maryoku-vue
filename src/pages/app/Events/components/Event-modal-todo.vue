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
        <form>
          <md-card>
            <div class="md-layout">
              <div class="md-layout-item md-small-size-100">
                <md-field :class="[{'md-error': errors.has('what')}]">
                  <md-icon class="md-accent">help_outline</md-icon>
                  <label>What</label>
                  <md-input v-model="form.what"
                            data-vv-name="what"
                            v-validate= "modelValidations.what"
                            required />
                  <span class="md-error" v-if="errors.has('what')">This field is required</span>
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
                <md-field :class="[{'md-error': errors.has('assignTo')}]" class="mb16">
                  <md-icon class="md-accent">person_add</md-icon>
                  <label>Assign To</label>
                  <md-input v-model="form.assignTo"
                            data-vv-name="assignTo"
                            v-validate= "modelValidations.assignTo"
                            required />
                  <span class="md-error" v-if="errors.has('assignTo')">This field is required</span>
                </md-field>

              </div>

              <div class="md-layout-item md-small-size-100">
                <md-field :class="[{'md-error': errors.has('status')}]" class="mb16">
                  <md-icon class="md-accent">check</md-icon>
                  <label>Status</label>
                  <md-input v-model="form.status"
                            data-vv-name="status"
                            v-validate= "modelValidations.status"
                            required />
                  <span class="md-error" v-if="errors.has('status')">This field is required</span>
                </md-field>

              </div>
            </div>

          </md-card>
        </form>
      </template>

      <template slot="footer">
        <md-button class="md-simple" @click="noticeModalHide">Cancel</md-button>
        <md-button class="md-primary" @click="validateModalForm">Create</md-button>
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
        modelValidations: {
          what: {
            required: true,
          },
          assignTo: {
            required: true,
          },
          status: {
            required: true,
          },
        }
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
        this.$validator.validateAll().then(isValid => {
          console.log(isValid);
        });
      },
    }
  }
</script>
<style lang="scss">

</style>
