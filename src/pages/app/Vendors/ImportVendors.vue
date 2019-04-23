<template>
    <div class="md-layout-item md-size-50 wizard-pos">
        <modal v-if="uploadModalOpen" @close="noticeModalHide" container-class="modal-container-wizard md">
            <template slot="body">
                <div class="md-layout-item">
                    <md-card>
                        <md-card-header class="md-card-header-text md-card-header-blue">
                            <div class="card-text sm">
                                <i class="fa fa-upload"></i>
                            </div>
                            <h5 class="title">
                                <span>Upload Vendors</span>
                                <button class="btn-position" @click="closeModal"><i class="md-icon md-icon-font md-theme-defaul">close</i></button>
                            </h5>
                        </md-card-header>
                        <md-card-content style="min-height: 60px;">
                            <div class="md-layout">
                                <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33 btn-area">
                                    <button class="md-button md-lg md-theme-default" v-model="step1" v-bind:class="{ active: step1 }" v-on:click="showUploadFile">
                                        <span class="fa fa-upload"></span><br>Upload File</button>
                                    <button class="md-button md-lg md-theme-default"  v-model="step2" v-bind:class="{ active: step2 }" v-on:click="showAssign">
                                        <span class="fa fa-edit"></span><br>Assign Column</button>
                                    <button class="md-button md-lg md-theme-default"  v-model="step3" v-bind:class="{ active: step3 }" v-on:click="showResults">
                                        <span class="fa fa-list-alt"></span><br>View Results</button>
                                </div>
                                <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-66">
                                    <div class="step1" v-if="step1">
                                        <p>
                                            Collaboratively administrate empowered markets via plug-and-play networks. Dynamically procrastinate B2C users after installed base benefits.
                                        </p>
                                        <div class="main-upload-box">
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
                                    </div>
                                    <div class="step2" v-if="step2">
                                        <GlobalSalesTable></GlobalSalesTable>
                                    </div>
                                    <div class="step3" v-if="step3">
                                        <p>
                                            Collaboratively administrate empowered markets via plug-and-play networks. Dynamically procrastinate B2C users after installed base benefits.
                                        </p>
                                        <span>Row processed: 10</span>
                                        <span>Total: 10</span>
                                        <span>Duplicates: 0</span>
                                    </div>
                                </div>
                            </div>
                        </md-card-content>
                        <div class="md-layout">
                            <div class="md-layout-item md-medium-size-100 md-xsmall-size-100">
                                <button class="md-button next-btn" v-on:click="showAssign" v-if="step1">
                                    NEXT
                                </button>
                                <button class="md-button next-btn" v-on:click="showResults" v-if="step2">
                                    NEXT
                                </button>
                                <button class="md-button next-btn" v-on:click="closeModal" v-if="step3">
                                    FINISH
                                </button>
                            </div>
                        </div>
                    </md-card>
                </div>
            </template>
        </modal>
    </div>

</template>
<script>
  import Vendors from "@/models/Vendors";
  import VendorsFile from "@/models/VendorsFile";
  import vendorsModule from "./vendors.vuex"
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';
  import {GlobalSalesTable, Modal} from "@/components";
  import swal from "sweetalert2";
  import VueElementLoading from 'vue-element-loading';
  import Button from "../../../components/Button/ControlPanel";
  export default {
    components:{
        Button,
        Modal,
        GlobalSalesTable,
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
              step1:true,
              step2:false,
              step3:false,
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
            this.$set(this,'step1',true);
            this.$set(this,'step2',false);
            this.$set(this,'step3',false);
            this.uploadModalOpen = false;
        },
        noticeModalHide: function () {
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

        },
          showUploadFile(){
            this.$set(this,'step1',true);
            this.$set(this,'step2',false);
            this.$set(this,'step3',false);
          },
          showAssign(){
              this.$set(this,'step1',false);
              this.$set(this,'step2',true);
              this.$set(this,'step3',false);
          },
          showResults(){
              this.$set(this,'step1',false);
              this.$set(this,'step2',false);
              this.$set(this,'step3',true);
          }
      }
  };
</script>
<style lang="scss">
    .step1{
        p{
            text-align: center;
        }
    }
    .step3{
        text-align: center;
        span{
            display: block;
        }
    }
    .main-upload-box{
        padding: 10px;
        text-align: center;
        border: 2px dashed #f2f2f2 !important;
        .upload-option{
            margin-top: 20px;
            margin-bottom: 20px;
        }
        .upload-box {
            & span{
                display: inline-block;
            }
            &_btn{
                padding: 5px 20px;
                background: linear-gradient(60deg, #ffa726, #fb8c00);
                width: 88px;
                cursor: pointer;
                height: 35px;
                border-radius: 2px;
                color: #fff;
                display: inline-block;
            }
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
    .title{
        span{
            color: #919191;
            font-weight: normal;
            padding: 10px;
            font-size: 14px;
        }
        button{
            padding: 0;
            top: 0;
            right: 0;
            i{
                color: #c2c2c2;
            }
        }
    }
    .btn-area{
        button{
            &.active{
                background: #00bcd4 !important;
            }
            &:focus {
                background: #00bcd4 !important;
            }
            box-shadow: none;
            background: transparent !important;
            padding: 20px;
            width: 75%;
            color: #959595 !important;
            span{
                padding: 0 0 15px 0;
            }
        }
    }
    .next-btn{
        background: #0caf50 !important;
        font-size: 10px;
        float: right;
        padding: 10px;
        right: 15px;
    }
</style>
