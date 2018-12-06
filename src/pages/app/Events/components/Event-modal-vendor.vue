<template>
  <div class="md-layout">
    <modal v-if="modalOpen" @close="noticeModalHide">
      <template slot="header">
        <h4 class="modal-title">Add new vendor</h4>
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
                  <md-icon class="md-accent">person</md-icon>
                  <label>Vendor Name</label>
                  <md-input name="vendor-name" v-model="form.name" />
                </md-field>
              </div>
              <div class="md-layout-item md-small-size-100">
                <md-field>
                  <md-icon class="md-accent">email</md-icon>
                  <label>Email</label>
                  <md-input name="vendor-email" v-model="form.email" />
                </md-field>
              </div>
            </div>

            <div class="md-layout">
              <div class="md-layout-item md-small-size-100">
                <md-field>
                  <md-icon class="md-accent">person</md-icon>
                  <label>Contact Person</label>
                  <md-input name="vendor-contact" v-model="form.contactPerson" />
                </md-field>
              </div>
              <div class="md-layout-item md-small-size-100">
                <md-field>
                  <md-icon class="md-accent">phone</md-icon>
                  <label>Phone</label>
                  <md-input name="vendor-phone" v-model="form.phone" />
                </md-field>
              </div>
            </div>

            <div class="md-layout">
              <div class="md-layout-item md-size-50">
                <md-field>
                  <md-icon class="md-accent">attach_money</md-icon>
                  <label>Cost/Budget</label>
                  <md-input name="vendor-cost" type="text" v-model="form.cost" />
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
    name: 'event-modal-vendor',
    components: {
      Modal,
    },
    props: {
      vendorItem: Object
    },
    data() {
      return {
        modalOpen: false,
        form: {
          id: null,
          name: null,
          email: null,
          contactPerson: null,
          phone: null,
          cost: null,
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
      }
    }
  }
</script>
<style lang="scss">

</style>
