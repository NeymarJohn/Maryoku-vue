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
                <md-field :class="[{'md-error': errors.has('title')}]" class="mb16">
                  <md-icon class="md-accent">help_outline</md-icon>
                  <label>What</label>
                  <md-input :value="form.title"
                            data-vv-name="title"
                            v-validate= "modelValidations.title"
                            required />
                  <span class="md-error" v-if="errors.has('title')">This field is required</span>
                </md-field>

              </div>

              <div class="md-layout-item md-small-size-100">
                <md-datepicker :value="form.dueDateMillis" name="todo-date" md-immediately class="mb16">
                  <label>Due Date</label>
                </md-datepicker>
              </div>
            </div>

            <div class="md-layout">
              <div class="md-layout-item md-small-size-100">
                <md-field :class="[{'md-error': errors.has('assignee')}]" class="mb16">
                  <md-icon class="md-accent">person_add</md-icon>
                  <label>Assign To</label>
                  <md-input :value="form.assignee"
                            data-vv-name="assignee"
                            v-validate= "modelValidations.assignee"
                            required />
                  <span class="md-error" v-if="errors.has('assignee')">This field is required</span>
                </md-field>

              </div>

              <div class="md-layout-item md-small-size-100">
                <md-field :class="[{'md-error': errors.has('status')}]" class="mb16">
                  <md-icon class="md-accent">check</md-icon>
                  <label>Status</label>
                  <md-input :value="form.status"
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
    props: {
      todoItem: Object,
      componentId: String,
    },
    components: {
      Modal,
    },
    data() {
      return {
        modalOpen: false,
        form: {
          id: null,
          title: null,
          dueDateMillis: null,
          assignee:  null,
          status: null,
        },
        modelValidations: {
          title: {
            required: true,
          },
          assignee: {
            required: true,
          },
          status: {
            required: true,
          },
        }
      }
    },
    watch: {
      todoItem: function(val) {
        this.form.id = val ? val.id : null;
        this.form.title = val ? val.title : '';
        this.form.dueDateMillis = val ? new Date(val.dueDateMillis) : '';
        this.form.assignee = val ? val.assignee : '';
        this.form.status = val ? val.status : '';
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
          if (isValid) {
            let parentComponentArray = this.$store.state.eventData.components
            let editedComponentIndex = parentComponentArray.indexOf(parentComponentArray.find((val) => val.id === this.componentId));
            let editedItemIndex = parentComponentArray[editedComponentIndex].todos.indexOf(parentComponentArray[editedComponentIndex].todos.find((val) => val.id === this.form.id));
            // convert to timestamp
            this.form.dueDateMillis = new Date(this.form.dueDateMillis).getTime();

            if (editedItemIndex > -1) { // if found edited item
              parentComponentArray[editedComponentIndex].todos[editedItemIndex] = this.form;
            } else { // add new
              parentComponentArray[editedComponentIndex].push(this.form);
            }
            this.modalOpen = false;
          }
        });
      },
    }
  }
</script>
<style lang="scss">

</style>
