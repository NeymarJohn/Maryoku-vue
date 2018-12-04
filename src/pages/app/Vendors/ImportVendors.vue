<template>
  <div class="md-layout">
    <div class="md-layout-item md-size-100">
      <h1>TEST</h1>
    <label for="header_rows">
      <input type="file" id="csv_file" name="csv_file" class="form-control" @change="loadCSV($event)">

      <input type="checkbox" id="header_rows">
      Label
    </label>

      <a href="#">Parse CSV</a>
      <table v-if="parse_csv">
        <thead>
        <tr>
          <th v-for="key in parse_head"
              @click="sortBy(key)"
          > {{ key | capitalize }}  </th>
        </tr>
        </thead>
      </table>

    </div>
  </div>
</template>

<script>
  export default {
    components: {
    },
    data() {
      return {

      }
    },
    created() {


    },
    methods: {

    }
  };
</script>
<style >
  .md-table-head-label {
    font-weight: 500;
  }
</style>
