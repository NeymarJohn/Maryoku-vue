<template>
      <div class="md-layout-item md-size-100 wizard-pos">
            <simple-wizard v-if="openWizard" :removeHeader="false" data-color="rose">
              <!--<md-card-header :removeHeader="false" slot="header">-->

              <!--</md-card-header>-->
              <wizard-tab>
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
                      <!--<div class="col-sm-offset-3 col-sm-9">-->
                      <!--<div class="checkbox-inline">-->
                      <!--</div>-->
                      <!--</div>-->

                      <!--<div class="col-sm-offset-3 col-sm-9">-->
                      <!--<a href="#" class="btn btn-primary">Parse CSV</a>-->
                      <!--</div>-->

                    </div>
                  </div>
                </section>
              </wizard-tab>

              <wizard-tab>
                <section class="table-section"  ref="step2">
                  <table class="border-table" v-if="parse_csv">
                    <thead>
                    <tr>
                      <th v-for="(key, index) in parse_header"
                          @click="sortBy(key)"
                          :class="{ active: sortKey == key }">
                          <md-field>
                              <md-select @input="setCSV($event, index)"  v-model="models[index].value" name="select">
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
                    <md-button class="finish-btn" @click="sendCSVFile">
                      FINISH
                    </md-button>
                </section>
              </wizard-tab>

              <!--<wizard-tab>-->
                <!--<template slot="label">-->
                  <!--Address-->
                <!--</template>-->
                <!--<third-step @md-end="wizardComplete"-->
                            <!--ref="step3">-->

                <!--</third-step>-->
              <!--</wizard-tab>-->
            </simple-wizard>
    </div>
</template>
<script>
  import CreateModal from './CreateModal/';
  import VendorsTable from './Table';
  import Vendors from "@/models/Vendors";
  import {SimpleWizard, WizardTab} from "@/components";
  import swal from "sweetalert2";
  //  import VueElementLoading from 'vue-element-loading';
  export default {
    components:{
      SimpleWizard,
      WizardTab,
    },
    data() {
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
                name: 'productCategory',
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
        ] ,
        channel_fields: [],
        channel_entries: [],
        parse_header: [],
        parse_csv: [],
        sortOrders:{},
        sortKey: ''
      };
    },
    filters: {
      capitalize: function (str) {
        return str.charAt(0).toUpperCase() + str.slice(1)
      }
    },
    methods: {
      sortBy: function (key) {
        let vm = this
        vm.sortKey = key
        vm.sortOrders[key] = vm.sortOrders[key] * -1
      },
        setCSV(event, id) {
          console.log(event)
            console.log(id)
        },
      csvJSON(csv){
        let vm = this
        let lines = csv.split("\n")
        let result = []
        let headers = lines[0].split(",")
        console.log(csv);
        vm.parse_header = lines[0].split(",")
          console.log(vm.parse_header)
          vm.parse_header.forEach((value, index) => {
            vm.models.push({value: vm.listOfTypes[0].name})
          });
        lines[0].split(",").forEach(function (key) {
          vm.sortOrders[key] = 1
        });
          console.log(lines)
        lines.map(function(line, indexLine){
//          if (indexLine < 1) return // Jump header line
          let obj = {}
          let currentLine = line.split(",")
            console.log('current line', currentLine)
//          headers.map(function(header, indexHeader){
//            obj[header] = currentline[indexHeader]
//          })
//          result.push(obj)
          result.push(currentLine)
        })
        result.pop() // remove the last item because undefined values
        return result // JavaScript object
      },
      loadCSV(e) {
        let vm = this
        if (window.FileReader) {
          let reader = new FileReader();
          reader.readAsText(e.target.files[0]);
          // Handle errors load
          reader.onload = function(event) {
            let csv = event.target.result;
            vm.parse_csv = vm.csvJSON(csv)
          };
          reader.onerror = function(evt) {
            if(evt.target.error.name == "NotReadableError") {
              alert("Canno't read file !");
            }
          };
        } else {
          alert('FileReader are not supported in this browser.');
        }
      },
      sendCSVFile() {
          let finalData = [];
          let vm = this;

          this.parse_csv.forEach((csvValue, csvIndex) => {
              let tempVendorObject = {}
              csvValue.forEach((value, index) => {

                  tempVendorObject[this.models[index].value] = value;
                  finalData.push(tempVendorObject);
              });

          })
         swal("Good job!", "You clicked the finish button!", "success");
         this.openWizard = false;

         this.$router.push('/vendors');
          console.log(finalData)


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

  .border-table, .border-table th, .border-table td {
    border: 1px solid black;
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
</style>