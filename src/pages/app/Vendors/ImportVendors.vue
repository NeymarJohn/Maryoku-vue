<template>
      <div class="md-layout-item md-size-100 wizard-pos">
            <simple-wizard v-if="openWizard" :removeHeader="false" data-color="rose">
              <wizard-tab>
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
                          <input type="file" id="csv_file" name="csv_file" class="form-control" @change="loadCSV($event)">
                        </div>
                      </div>

                    </div>
                  </div>
                </section>
              </wizard-tab>

              <wizard-tab>
              <template slot="label">
                Assign Columns
              </template>
              <section class="table-section"  ref="step2">
                <table class="border-table" v-if="parse_csv">
                  <thead>
                  <tr style="border-top: none;">
                    <th v-for="(key, index) in parse_header"
                        @click="sortBy(key)"
                        :class="{ active: sortKey == key }">
                      <md-field>
                        <md-select id="remove-border" @input="setCSV($event, index)"  v-model="models[index].value" name="select">
                          <md-option v-for="(item, index) in listOfTypes" :value="item.name" :key="index">{{ item.displayName }}</md-option>

                        </md-select>
                      </md-field>

                    </th>
                  </tr>
                  </thead>
                  <tr v-for="(csv) in parse_csv">
                    <td v-for="(value) in csv">
                      {{ value }}
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
                  <table class="border-table" v-if="parse_csv">
                    <thead>
                    <tr style="border-top: none;">
                      <th v-for="(key, index) in parse_header"
                          @click="sortBy(key)"
                          :class="{ active: sortKey == key }">
                        <md-field>
                          <!--<md-select id="remove-border" @input="setCSV($event, index)"  v-model="models[index].value" name="select">-->
                            <!--<md-option v-for="(item, index) in listOfTypes" :value="item.name" :key="index">{{ item.displayName }}</md-option>-->

                          <!--</md-select>-->
                        </md-field>

                      </th>
                    </tr>
                    </thead>
                    <tr v-for="(csv) in parse_csv">
                      <td v-for="(value) in csv">
                        {{ value }}
                      </td>
                    </tr>

                  </table>
                  <md-button class="finish-btn" @click="sendCSVFile">
                    FINISH
                  </md-button>
                </section>
              </wizard-tab>
            </simple-wizard>
    </div>
</template>
<script>
  import Vendors from "@/models/Vendors";
  import VendorsFile from "@/models/VendorsFile";
  import vendorsModule from "./vendors.vuex"
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';
  import {SimpleWizard, WizardTab} from "@/components";
  import swal from "sweetalert2";
  import VueElementLoading from 'vue-element-loading';
  export default {
    components:{
      SimpleWizard,
      WizardTab,
    },
      data () {
          return {
              openWizard: true,
              channel_name: '',
              type: '',
              models: [],
              listOfTypes: [
                  {
                      displayName: 'Vendor Information',
                      name: 'vendorDisplayName',
                      value: ''
                  },
                  {
                      displayName: 'Category',
                      name: 'productsCategory',
                      value: ''

                  },
                  {
                      displayName: 'Website',
                      name: 'vendorWebsite',
                      value: ''

                  },
                  {
                      displayName: 'Address',
                      name: 'vendorAddressLine1',
                      value: ''

                  },
                  {
                      displayName: 'Email',
                      name: 'vendorMainEmail',
                      value: ''

                  },
                  {
                      displayName: 'Phone Number',
                      name: 'vendorMainPhonenumber',
                      value: ''

                  }
              ],
              channel_fields: [],
              channel_entries: [],
              parse_header: [],
              parse_csv: [],
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
          sortBy: function (key) {
              let vm = this
              vm.sortKey = key
              vm.sortOrders[key] = vm.sortOrders[key] * -1
          },
          setCSV(event, id) {
          },
          csvJSON(csv) {
              let vm = this
              let lines = csv.split("\n")
              let result = []
              let headers = lines[0].split(",")

              vm.parse_header = lines[0].split(",")
              vm.parse_header.forEach((value, index) => {
                  vm.models.push({value: vm.listOfTypes[0].name})
              });
              lines[0].split(",").forEach(function (key) {
                  vm.sortOrders[key] = 1
              });

              lines.map(function (line, indexLine) {
                  let obj = {}
                  let currentLine = line.split(",")
                  result.push(currentLine)
              })
              result.pop() // remove the last item because undefined values
              return result // JavaScript object
          },
          loadCSV(e) {
              let vm = this
              if (window.FileReader) {
                  let rawCSVFile = e.target.files[0];
                  let reader = new FileReader();
                  console.log('CSV file is: ', rawCSVFile);
                  this.setFileToState(rawCSVFile);
                  this.rawCSVFile = rawCSVFile;
                  reader.readAsText(rawCSVFile);
                  // Handle errors load
                  reader.onload = function (event) {
                      let csv = event.target.result;
                      vm.parse_csv = vm.csvJSON(csv)
                  };
                  reader.onerror = function (evt) {
                      if (evt.target.error.name == "NotReadableError") {
                          alert("Canno't read file !");
                      }
                  };
              } else {
                  alert('FileReader are not supported in this browser.');
              }
          },
          async sendCSVFile() {
              /*let finalData = [];
              let vm = this;
              console.log(this.rawCSVFile)
              let formData = new FormData();

              formData.append('vendorsFile', document.getElementById('csv_file').files[0], this.rawCSVFile.name);

              for (let [key, value] of formData.entries()) {
                  console.log(key, value);
              }
              let vendorsFile = new VendorsFile(formData);
              vendorsFile.save();

              return;

              swal("Good job!", "You clicked the finish button!", "success");
              this.openWizard = false;

              this.$router.push('/vendors');*/

            let reader = new FileReader();
            let _this = this;

            reader.onload = e => {
              let vendorsFile = new VendorsFile({vendorsFile: e.target.result});
              vendorsFile.save().then(result => {
                console.log(result);
              })
                .catch((error) => {
                  console.log(error);
                });
            };
            reader.readAsDataURL(document.getElementById('csv_file').files[0]);
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
</style>
