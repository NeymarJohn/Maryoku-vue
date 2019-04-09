<template>
      <div class="md-layout-item md-size-100 wizard-pos">
        <modal v-if="uploadModalOpen" @close="noticeModalHide" container-class="modal-container-wizard">
          <template slot="body">
            <simple-wizard  v-if="openWizard" data-color="rose">
              <template slot="header">
                <h3 class="title">Upload Vendors</h3>
                <button class="btn-position" @click="closeModal">X</button>
              </template>
              <wizard-tab>
                <vue-element-loading :active="csvUploading" spinner="ring" color="#FF547C"/>

                <template slot="label">
                  Upload file
                </template>
                <section ref="step1">
                  <div class="panel-body">
                    <div class="upload-option">
                      <md-icon>file_upload</md-icon>
                      <span>Upload from CSV file</span>
                    </div>
                    <div class="upload-box">
                      <span>Select File to upload</span>
                      <div class="upload-box_btn form-group">
                        <label for="csv_file" class="control-label col-sm-3 text-right">Browse</label>
                        <div class="col-sm-9">
                          <input type="file" id="csv_file" @change="sendCSVFile" name="csv_file" class="form-control">
                        </div>
                      </div>

                    </div>
                  </div>
                </section>
              </wizard-tab>

              <wizard-tab :before-change="() => updateVendorsFile()" >
              <template slot="label">
                Assign Columns
              </template>
              <section class="table-section"  ref="step2">
                <table class="border-table" v-if="parseCSV">
                  <thead>
                  <tr style="border-top: none;">
                    <th
                            v-if="column !== ''"
                            v-for="(column, index) in parseCSV.columns"
                        @click="sortBy(index)"
                        :class="{ active: sortKey == index }">
                      <md-field>
                        <md-select id="remove-border" v-model="databaseVendorColumns[index].value"  name="select">
                          <md-option
                                  v-if="item !== ''"
                                  v-for="(item, index) in databaseVendorColumns"
                                  :value="item.name"
                                  :key="index">
                            {{ item.displayName }}
                          </md-option>

                        </md-select>
                      </md-field>

                    </th>
                  </tr>
                  </thead>
                  <tr v-for="(row, rowIndex) in parseCSV.rows">
                    <td v-for="(column, columnIndex) in parseCSV.columns">
                      {{ row[column] }}
                    </td>
                  </tr>

                </table>

              </section>
            </wizard-tab>

              <wizard-tab>
                <template slot="label">
                  View results
                </template>
                <section class="table-section"  ref="step3">
                  <p>Rows processed: {{ finalResult.processed }} </p>
                  <p>Total: {{ finalResult.total }}</p>
                  <p>Duplicates: {{ finalResult.duplicates }}</p>
                  <md-button @click="backToVendor" class="finish-btn" >
                    FINISH
                  </md-button>
                </section>
              </wizard-tab>
            </simple-wizard>
          </template>
        </modal>
    </div>
</template>
<script>
  import Vendors from "@/models/Vendors";
  import VendorsFile from "@/models/VendorsFile";
  import vendorsModule from "./vendors.vuex"
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';
  import {SimpleWizard, WizardTab, Modal} from "@/components";
  import swal from "sweetalert2";
  import VueElementLoading from 'vue-element-loading';
  export default {
    components:{
      Modal,
      SimpleWizard,
      WizardTab,
      VueElementLoading
    },
      data () {
          return {
              uploadModalOpen: false,
              openWizard: true,
              channel_name: '',
              type: '',
              models: [],
              finalResult: {
                processed: 0,
                total: 0,
                duplicates: 0,
              },
              csvUploading: false,
              databaseVendorColumns: [
                {
                  displayName: 'Vendor Display Name',
                  name: 'vendorDisplayName',
                  value: 'vendorDisplayName',
                  mandatory: true

                },
                {
                  displayName: 'Contact Person',
                  name: 'contactPerson',
                  value: 'contactPerson',
                  mandatory: true

                },
                {
                  displayName: 'Vendor Main Email',
                  name: 'vendorMainEmail',
                  value: 'vendorMainEmail',
                  mandatory: true

                },
                {
                  displayName: 'Vendor Main Phone Number',
                  name: 'vendorMainPhoneNumber',
                  value: 'vendorMainPhoneNumber',
                  mandatory: true

                },
                {
                  displayName: 'Vendor Website',
                  name: 'vendorWebsite',
                  value: 'vendorWebsite',

                },
                  {
                      displayName: 'Vendor Category',
                      name: 'vendorCategory',
                      value: ''
                  },
                  {
                      displayName: 'Product Category',
                      name: 'productsCategory',
                      value: ''

                  },
                  {
                      displayName: 'Vendor Tax ID',
                      name: 'vendorTaxId',
                      value: ''

                  },

                  {
                      displayName: 'Vendor Invoice Name',
                      name: 'vendorInvoiceName',
                      value: ''

                  },

                {
                  displayName: 'Vendor Address Line 1',
                  name: 'vendorAddressLine1',
                  value: ''

                },
                {
                  displayName: 'Vendor Address Line 2',
                  name: 'vendorAddressLine2',
                  value: ''

                },
                {
                  displayName: 'Vendor City',
                  name: 'vendorCity',
                  value: ''

                },
                {
                  displayName: 'Vendor Region',
                  name: 'vendorRegion',
                  value: ''

                },
                {
                  displayName: 'Vendor Country',
                  name: 'vendorCountry',
                  value: ''

                },
                {
                  displayName: 'Vendor Zip Code',
                  name: 'vendorZipCode',
                  value: ''

                }
                ,{
                  displayName: 'Vendor Availability Options',
                  name: 'vendorAvailabilityOptions',
                  value: ''

                },
                {
                  displayName: 'Vendor Cancellation Policy',
                  name: 'vendorCancellationPolicy',
                  value: ''

                },
                {
                  displayName: 'Vendor Refund Policy',
                  name: 'vendorRefundPolicy',
                  value: ''

                },
                {
                  displayName: 'Vendor Logo Image',
                  name: 'vendorLogoImage',
                  value: ''

                }
              ],
              channel_fields: [],
              channel_entries: [],
              parse_header: [],
              parseCSV: [],
              sortOrders: {},
              sortKey: '',
              rawCSVFile: null,
          };
      },
      created () {
        this.$store.registerModule('vendorsVuex', vendorsModule);
      },
      filters: {
          capitalize: function (str) {
              return str.charAt(0).toUpperCase() + str.slice(1)
          }
      },
      methods: {
          ...mapMutations('vendorsVuex', ['setFileToState']),
        closeModal(){
          this.uploadModalOpen = false;
        },
        noticeModalHide: function () {
          this.uploadModalOpen = false;
        },
        closeModal(){
          this.uploadModalOpen = false;
        },
        toggleModal: function (show) {
          this.uploadModalOpen = show;
        },
        updateVendorsFile: async function () {
          let vendorFile = await VendorsFile.find(this.parseCSV.id)
          let columnsMapping = [];
          let mapping  = {}
          this.parseCSV.columns.map((item, index) => {

            if (item !== '') {
              mapping[item] = this.databaseVendorColumns[index].value

            }
          })
          vendorFile.columnsMapping = mapping;
          //validate column mapping
          if(!this.validateColumnsMapping(mapping)){
            return false
          }
          let finalResponse = await vendorFile.save();
          this.finalResult = finalResponse;
          return true

        },
        validateColumnsMapping(mapping){
          let _this = this;
          let vendorColumns = this.databaseVendorColumns;
          let isValid = true;
          for (let i = 0; i < vendorColumns.length; i++) {

          if(vendorColumns[i].mandatory){
            if (Object.values(mapping).indexOf(vendorColumns[i].name) === -1) {
              this.$notify(
                {
                  message: 'Field ' + vendorColumns[i].displayName + ' is mandatory.' ,
                  horizontalAlign: 'center',
                  verticalAlign: 'top',
                  type: 'warning'
                })
              isValid = false;
              break;
            }
          }
        }

        return isValid;
        },
          sortBy: function (key) {
              let vm = this
              vm.sortKey = key
              vm.sortOrders[key] = vm.sortOrders[key] * -1
          },
          setCSV(event, id) {
          },
          async sendCSVFile() {
            this.csvUploading = true;
            let reader = new FileReader();
            let _this = this;

            reader.onload = e => {
              let vendorsFile = new VendorsFile({vendorsFile: e.target.result});
              vendorsFile.save().then(result => {
                _this.parseCSV = result;
                _this.parseCSV.newColumns = [];
                _this.parseCSV.columns.map((item, index) => {
                   if (item !== '') {
                     let mapping = {}
                     _this.databaseVendorColumns[index].value = item

                     _this.parseCSV.newColumns.push(mapping)

                   }

                });
                _this.csvUploading = false
              })
                .catch((error) => {
                  _this.csvUploading = false
                  console.log(error);
                });
            };
            reader.readAsDataURL(document.getElementById('csv_file').files[0]);
          },
        backToVendor(){

          this.$notify(
            {
              message: 'Vendor imported successfully' ,
              horizontalAlign: 'center',
              verticalAlign: 'top',
              type: 'success'
            })
          this.uploadModalOpen = false;
//          this.$router.push('/vendors');

        }
      }
  };
</script>
<style lang="scss">
  .upload-option{
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .upload-box {
    background: #FF547C;
    padding: 15px;

    & span{
      color: white;
      display: inline-block;
      }
    &_btn{
      padding: 5px 20px;
      background: #00c782;
      width: 88px;
      height: 35px;
      border-radius: 2px;
      display: inline-block;
    }
  }
 .border-table {
    border-collapse: collapse;
  }

 .border-table tr {
    border-top: 1px solid #a9afbb;
  }
  .border-table tr td{
    padding: 15px;
    white-space: nowrap;
  }
  .table-section{
    width: 100%;
    overflow: scroll;
  }
  .wizard-pos{
    position: relative;
  }
  .finish-btn{
    position: absolute;
    background-color: #FF547C!important;
    bottom: -61px;
    right: 15px;
    z-index: 9999999;

    &:hover{
      background-color: #FF547C!important;
    }
  }
   #\32 > section > table > thead > tr > th > div > div{
    z-index: 9999;
    border: 1px solid white!important;
     padding: 0px 15px;
  }
  .btn-position{
    position: absolute;
    right: 15px;
    font-weight: bold;
    top: 20px;
    font-size: 17px;
    background-color: transparent!important;
    box-shadow: none!important;
    color: gray!important;
    border-color: transparent;
    cursor: pointer;

    &:hover, &:visited, &:focus, &:active{
      background-color: transparent!important;
      box-shadow: none!important;
      color: gray!important;
    }
  }
  .header-position {
    position: relative;
  }
</style>
