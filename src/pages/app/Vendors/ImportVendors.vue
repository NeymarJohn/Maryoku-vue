<template>
      <div class="md-layout-item md-size-100">
            <simple-wizard :removeHeader="false" data-color="rose">
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
                <section class="table-section" @md-end="wizardComplete" ref="step2">
                  <table class="border-table" v-if="parse_csv">
                    <thead>
                    <tr>
                      <th v-for="key in parse_header"
                          @click="sortBy(key)"
                          :class="{ active: sortKey == key }">
                        {{ key | capitalize }}
                        <span class="arrow" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'">
                </span>
                      </th>
                    </tr>
                    </thead>
                    <tr v-for="csv in parse_csv">
                      <td v-for="key in parse_header">
                        {{csv[key]}}
                      </td>
                    </tr>

                  </table>
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
  //  import VueElementLoading from 'vue-element-loading';
  export default {
    components:{
      SimpleWizard,
      WizardTab,
    },
    data() {
      return {
        channel_name: '',
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
      csvJSON(csv){
        let vm = this
        let lines = csv.split("\n")
        let result = []
        let headers = lines[0].split(",")
        console.log(csv);
        vm.parse_header = lines[0].split(",")
        lines[0].split(",").forEach(function (key) {
          vm.sortOrders[key] = 1
        })
        lines.map(function(line, indexLine){
          if (indexLine < 1) return // Jump header line
          let obj = {}
          let currentline = line.split(",")
          headers.map(function(header, indexHeader){
            obj[header] = currentline[indexHeader]
          })
          result.push(obj)
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
      async wizardComplete() {
        swal("Good job!", "You clicked the finish button!", "success");

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
</style>