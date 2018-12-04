<template>
  <div class="container">
    <div class="panel panel-sm">
      <div class="panel-heading">
        <h4>CSV Import</h4>
      </div>
      <div class="panel-body">
        <div class="form-group">
          <label for="csv_file" class="control-label col-sm-3 text-right">CSV file to import</label>
          <div class="col-sm-9">
            <input type="file" id="csv_file" name="csv_file" class="form-control" @change="loadCSV($event)">
          </div>
        </div>
        <div class="col-sm-offset-3 col-sm-9">
          <div class="checkbox-inline">
          </div>
        </div>

        <div class="col-sm-offset-3 col-sm-9">
          <a href="#" class="btn btn-primary">Parse CSV</a>
        </div>
        <table v-if="parse_csv">
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
      </div>
    </div>

  </div>
</template>
<script>
    import CreateModal from './CreateModal/';
    import VendorsTable from './Table';
    import Vendors from "@/models/Vendors";
    //  import VueElementLoading from 'vue-element-loading';
    export default {
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
            }
        }

    };
</script>
