<template>
  <div class="vendor-signup-wrapper">
    <div class="inside-container">
      <div class="left-side">
        <img :src="`${iconsUrl}Path 251.svg`"/>
        <h4>Hi Relish caters & venues,</h4>
        <p>We are gald to have you onboard! Submitting quotes & proposals has never been easer. Let's begin with approving your basic info</p>
        <h2>0/4</h2>
        <h3>Only 5 simple steps & you're signed!</h3>
      </div>
      <div class="right-side">
        <h2>Before we begin, <br/>approve your basic info</h2>
        <div class="card">
          <v-signup-editable-field
            :title="'Company Name'"
            :img="''"
            :isEdit="false"
            :defaultVal="'Relish caterers & venues'"
            :borderBottom="true"
          />
          <v-signup-editable-field
            :title="'Business Category'"
            :img="''"
            :isEdit="false"
            :defaultVal="'Venue'"
            :borderBottom="true"
          />
          <v-signup-editable-field
            :title="'Address'"
            :img="`${iconUrl}Asset 573.svg`"
            :isEdit="false"
            :defaultVal="'575 Mission St. San Francisco CA 94105'"
            :borderBottom="true"
          />
          <v-signup-editable-field
            :title="'Phone'"
            :img="`${iconUrl}Asset 591.svg`"
            :isEdit="false"
            :defaultVal="'077-3000293'"
            :borderBottom="true"
          />
          <v-signup-editable-field
            :title="'Email'"
            :img="`${iconUrl}Asset 593.svg`"
            :isEdit="false"
            :defaultVal="'relish_service@gmail.com'"
            :borderBottom="false"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import VueElementLoading from 'vue-element-loading'
import Vendors from '@/models/Vendors'

//COMPONENTS
import Icon from '@/components/Icon/Icon.vue'
import VSignupEditableField from '@/components/Inputs/VSignupEditableField.vue'

export default {
  components: {
    VueElementLoading,
    VSignupEditableField
  },
  data() {
    return {
      vendor: null,
      iconUrl: 'http://static.maryoku.com/storage/icons/NewSubmitPorposal/',
    }
  },
  created() {
    
  },
  mounted() {
    
  },
  methods: {
    
  },
  computed: {
    
  },
  filters: {
    
  },
  watch: {
  }
};
</script>
<style lang="scss" scoped>
  .vendor-signup-wrapper {
    padding: 104px 124px;
    font-family: Manrope-Regular, sans-serif;
    margin-bottom: 126px;

    .inside-container {
      display: flex;
      color: #050505;

      .left-side {
        flex: 1;
        margin-right: 122px;

        img {
          width: 92.5px;
        }
        h4 {
          margin: 36px 0 11px 0;
          font: 800 20px Manrope-Regular, sans-serif;
        }
        p {
          margin: 0;
          padding: 0;
          font: normal 16px Manrope-Regular, sans-serif;
        }
        h2 {
          margin: 30px 0;
          font: 800 40px Manrope-Regular, sans-serif;
        }
        h3 {
          margin: 0;
          color: #f51355;
          font: bold 20px Manrope-Regular, sans-serif;
        }
      }
      .right-side {
        flex: 3;

        h2 {
          margin: 0;
          margin-bottom: 40px;
          font: 800 40px Manrope-Regular, sans-serif;
        }
        .card {
          padding: 30px 60px 60px 60px;
          max-width: 780px;
          background-color: #ffffff;
          box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);
        }
      }
    }
  }  
</style>
