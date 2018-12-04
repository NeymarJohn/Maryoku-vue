<template>
  <div class="md-layout-item md-size-100">
    <md-card>
      <md-card-header class="md-card-header-icon md-card-header-green md-layout md-gutter">
        <div class="md-layout-item">
          <div class="card-icon">
            <md-icon>assignment</md-icon>
          </div>
          <h4 class="title">SPACE</h4>
        </div>

        <div class="md-layout-item" style="text-align: right;">
          <md-button class="md-just-icon md-simple md-danger md-align-right">
            <md-icon>delete</md-icon>
          </md-button>
        </div>

      </md-card-header>

      <md-card-content>

        <md-field class="md-layout-item md-size-25">
          <label>Value</label>
          <md-select>
            <md-option value="new year">Some option 1</md-option>

            <md-optgroup label="Group name 1">
              <md-option value="birthday">Some option 2</md-option>
              <md-option value="new year">Some option 3</md-option>
              <md-option value="other">Some option 4</md-option>
            </md-optgroup>

            <md-optgroup label="Group name 2">
              <md-option value="birthday">Some option 5</md-option>
            </md-optgroup>
          </md-select>
        </md-field>
        <md-field class="md-layout-item md-size-50">
          <label>Special requests, constraints, needs</label>
          <md-textarea md-autogrow></md-textarea>
        </md-field>

        <nav-tabs-card>
          <template slot="content">
            <md-tabs md-sync-route class="md-success" md-alignment="left">

              <md-tab id="tab-properties" md-label="Component Properties" md-icon="settings">
                <md-table v-model="componentProperties" table-header-color="green">
                  <md-table-row slot="md-table-row" slot-scope="{ item }">
                    <md-table-cell md-label="Property name">{{ item.name }}</md-table-cell>
                    <md-table-cell md-label="Value">{{ item.value }}</md-table-cell>
                    <md-table-cell md-label="Comment">{{ item.comment }}</md-table-cell>
                    <md-table-cell style="text-align: right;">
                      <md-button class="md-just-icon md-simple md-danger">
                        <md-icon>delete</md-icon>
                      </md-button>
                    </md-table-cell>
                  </md-table-row>
                </md-table>
                <md-button class="md-button md-block md-primary md-size-5 md-layout-item center-icon">
                  <i class="material-icons">add</i> Add
                </md-button>
              </md-tab>

              <md-tab id="tab-suppliers" md-label="Optional Suppliers" md-icon="rv_hookup">
                <md-table v-model="optionalSuppliers" table-header-color="green">
                  <md-table-row slot="md-table-row" slot-scope="{ item }">
                    <md-table-cell md-label="Supplier Name">{{ item.supplierName }}</md-table-cell>
                    <md-table-cell md-label="Contact Person">{{ item.contactPerson }}</md-table-cell>
                    <md-table-cell md-label="Email">{{ item.email }}</md-table-cell>
                    <md-table-cell md-label="Phone">{{ item.phone }}</md-table-cell>
                    <md-table-cell md-label="Cost / Budget">{{ item.cost }}</md-table-cell>
                    <md-table-cell md-label="Proposal">{{ item.proposal }}</md-table-cell>
                    <md-table-cell style="text-align: right;">
                      <md-button class="md-just-icon md-simple md-danger">
                        <md-icon>delete</md-icon>
                      </md-button>
                    </md-table-cell>
                  </md-table-row>
                </md-table>
                <md-button class="md-button md-block md-primary md-size-5 md-layout-item center-icon">
                  <i class="material-icons">add</i> Add
                </md-button>
              </md-tab>

              <md-tab id="tab-posts" md-label="ToDo" md-icon="check_circle">
                <md-table v-model="toDo" table-header-color="green">
                  <md-table-row slot="md-table-row" slot-scope="{ item }">
                    <md-table-cell md-label="What">{{ item.what }}</md-table-cell>
                    <md-table-cell md-label="Due Date">{{ item.dueDate }}</md-table-cell>
                    <md-table-cell md-label="Assign To">{{ item.assignTo }}</md-table-cell>
                    <md-table-cell md-label="Status">{{ item.status }}</md-table-cell>
                    <md-table-cell style="text-align: right;">
                      <md-button class="md-just-icon md-simple md-danger">
                        <md-icon>delete</md-icon>
                      </md-button>
                    </md-table-cell>
                  </md-table-row>
                </md-table>
                <md-button class="md-button md-block md-primary md-size-5 md-layout-item center-icon">
                  <i class="material-icons">add</i> Add
                </md-button>
              </md-tab>
            </md-tabs>
          </template>
        </nav-tabs-card>
      </md-card-content>
    </md-card>



  </div>
</template>

<script>

  import {
    NavTabsCard
  } from "@/components";

  export default {
    components: {
      NavTabsCard,
    },
    name: 'event-card-component',
    data: () => ({
      optionalSuppliers: [
        {
          supplierName: 'Angelo&Nina' ,
          contactPerson: 'Eyal',
          email: 'angelonona@gmail.com',
          phone: '12345667',
          cost: '$2000',
          proposal: 'n/a'
        },
        {
          supplierName: 'Nur' ,
          contactPerson: 'Michal',
          email: 'michal@nur.com',
          phone: '3321312346',
          cost: '$7000',
          proposal: 'n/a'
        }
      ],
      componentProperties: [
        {
          name: 'Property name 1',
          value: 'Some value 1',
          comment: 'Some commentary'
        },
        {
          name: 'Property name 2',
          value: 'Some value 2',
          comment: 'Another commentary'
        }
      ],
      toDo: [
        {
          what: 'Negotiate Price',
          dueDate: '12/12/2018',
          assignTo: 'Rotem Sela',
          status: 'New'
        },
        {
          what: 'Something',
          dueDate: '11/05/2019',
          assignTo: 'Some person',
          status: 'In Work'
        },
      ]
    }),
  }
</script>
<style lang="scss">
  .md-tabs-content table thead {
    display: table-header-group;
  }
  .md-tabs-navigation {
    overflow: auto;
    padding-left: 15px;
  }
  .center-icon.md-button {
    padding-left: 6px;
  }
</style>
