<template>
  <md-card>
    <md-card-header class="md-card-header-icon md-card-header-blue">
      <div class="card-icon">
        <md-icon>timeline</md-icon>
      </div>
      <h5 class="title" style="padding-top: 6px;">
        Participants per Event
        <md-field class="pull-right md-xs" style="max-width: 120px; margin: 0; border: none;" md-inline>
          <md-select v-model="filterMonth" name="filterMonth" id="filterMonth">
            <md-option value="01">January</md-option>
            <md-option value="02">February</md-option>
            <md-option value="03">March</md-option>
            <md-option value="04">April</md-option>
            <md-option value="05">May</md-option>
            <md-option value="06">June</md-option>
            <md-option value="07">July</md-option>
            <md-option value="08">August</md-option>
            <md-option value="09">September</md-option>
            <md-option value="10">October</md-option>
            <md-option value="11">November</md-option>
            <md-option value="12">December</md-option>
          </md-select>
        </md-field>
      </h5>
    </md-card-header>
    <md-card-content style="min-height: 120px">
      <vue-element-loading :active="loading" spinner="ring" color="#FF547C"/>
      <div class="filter"></div>
      <template v-for="item in items">
        <div class="bar-item">
          <h5 style="margin-bottom: 0; margin-top: 0; font-weight: 500; font-size: 14px;" >{{item.text}}</h5>
          <div class="text-gray small" style="padding-bottom: 6px;">{{item.theDate}} <span class="pull-right"><span class="black-color">{{item.actual}}</span> / {{item.invited}}</span></div>
          <md-progress-bar class="md-info" style="min-height: 18px;" :md-value="(item.actual/item.invited)*100"></md-progress-bar>
        </div>
      </template>
    </md-card-content>
  </md-card>
</template>
<script>
  import auth from "@/auth";
  import VueElementLoading from 'vue-element-loading';
  import {

  } from "@/components";
  export default {
    name: "company-dashboard-participants-chart",
    components: {
      VueElementLoading
    },
    props: {
      participantsPerEventPerYearMonthEventType: {
        type: Object,
        default: ()=>{return {};}
      }
    },
    watch: {
      participantsPerEventPerYearMonthEventType(newVal, oldVal){
        this.loading = false;
        let keys = Object.keys(newVal["2019"]);
        if (keys.length > 0){
          for (const key of keys) {
            let contents = newVal["2019"][key];
            let contentsArray = [];
            let types = Object.keys(contents);
            for (const type of types){
              contentsArray.push({text: type, invited: contents[type].Invited, actual: contents[type].Actual, theDate: ""})
            }
            this.itemsPerMonth[key] = contentsArray;
          }
        }

        let value = this.itemsPerMonth[this.filterMonth];
        if (value){
          this.items = value;
        }
      }
    },
    data() {
      return {
        auth: auth,
        loading: true,
        items: [],
        itemsPerMonth: {},
        amount2: 20,
        filterMonth: "03",
      };
    }
  };
</script>
<style lang="scss" scoped>
  .md-menu.md-select {
    &i{
      background-color: #00b0ff !important;
    }
  }
  .md-select-value {
    font-size: 14px;
  }

  .md-select i {
    width: 13px !important;
    height: 13px;
    line-height: 13px;
  }
</style>
