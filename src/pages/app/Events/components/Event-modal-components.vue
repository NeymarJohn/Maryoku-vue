<template>
  <div class="md-layout">
    <modal v-if="modalOpen" @close="noticeModalHide">
      <template slot="header">
        <h4 class="modal-title">
          <span v-if="!form.id">Add new</span>
          <span v-if="form.id">Edit</span>
          component
        </h4>
        <md-button class="md-simple md-just-icon md-round modal-default-button" @click="noticeModalHide">
          <md-icon>clear</md-icon>
        </md-button>
      </template>

      <template slot="body">
        <form>
          <md-card>
            <div class="md-layout">
              <div class="md-layout-item">
                <md-autocomplete v-model="form.name"
                                 data-vv-name="name"
                                 v-validate= "modelValidations.name"
                                 required
                                 :md-options="propertyValues"
                                 class="change-icon-order select-with-icon mb16"
                                 :class="[{'md-error': errors.has('name')}]">
                  <md-icon class="md-accent">person</md-icon>
                  <label>Property Name</label>
                  <span class="md-error" v-if="errors.has('name')">This field is required</span>
                </md-autocomplete>
              </div>
            </div>

            <div class="md-layout">
              <div class="md-layout-item">
                <md-field :class="[{'md-error': errors.has('value')}]" class="mb16">
                  <md-icon class="md-accent">attach_money</md-icon>
                  <label>Value</label>
                  <md-input v-model="form.value"
                            data-vv-name="value"
                            v-validate= "modelValidations.value"
                            required/>
                  <span class="md-error" v-if="errors.has('value')">This field is required and should be in range of 0 - 100 000</span>
                </md-field>
              </div>
            </div>

            <div class="md-layout">
              <div class="md-layout-item">
                <md-field :class="[{'md-error': errors.has('comment')}]" class="mb16">
                  <md-icon class="md-accent">create</md-icon>
                  <label>Comments</label>
                  <md-textarea md-autogrow
                               v-model="form.comment"
                               data-vv-name="comment"
                               v-validate= "modelValidations.comment"
                               required
                               style="min-height: 36px;"></md-textarea>
                  <span class="md-error" v-if="errors.has('comment')">This field is required</span>
                </md-field>
              </div>
            </div>
          </md-card>
        </form>
      </template>

      <template slot="footer">
        <md-button class="md-simple" @click="noticeModalHide">Cancel</md-button>
        <md-button class="md-primary" @click="validateModalForm">
          <span v-if="!form.id">Create</span>
          <span v-if="form.id">Save</span>
        </md-button>
      </template>
    </modal>
  </div>
</template>
<script>
  import { Modal } from "@/components";

  export default {
    name: 'event-modal-components',
    props: {
      componentItem: Object,
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
          name: "",
          value: null,
          comment: null,
        },
        modelValidations: {
          name: {
            required: true,
          },
          value: {
            required: true,
            min_value: 0,
            max_value: 100000,
          },
          comment: {
            required: true,
          }
        },
        propertyValues: [],
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
    },
    watch: {
      componentId(newVal) {
        let propertyObj = this.$store.state.componentsList.find((val) => val.id === newVal);
        let valuesObjectsArray = 'childComponents' in propertyObj ? propertyObj.childComponents : [];
        this.propertyValues = valuesObjectsArray.length ? valuesObjectsArray.map((val) => val.title) : [];
      }
    },
  }
</script>
<style lang="scss">
  .change-icon-order {
    .md-menu {
      order: 2;
    }
    .md-icon {
      order: 1;
    }
  }
</style>
