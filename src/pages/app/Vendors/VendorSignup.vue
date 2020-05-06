<template>
  <div class="vendor-signup-wrapper">
    <vendor-basic-info-form v-if="!isApproved"/>
    <vendor-signup-step2 v-if="isApproved && step == 2"/>
  </div>
</template>

<script>
import moment from 'moment'
import VueElementLoading from 'vue-element-loading'
import Vendors from '@/models/Vendors'

//COMPONENTS
import Icon from '@/components/Icon/Icon.vue'
import VSignupEditableField from '@/components/Inputs/VSignupEditableField.vue'
import VendorBasicInfoForm from './components/VendorBasicInfoForm.vue'
import VendorSignupStep2 from './components/VendorSignupStep2.vue'

export default {
  components: {
    VueElementLoading,
    VSignupEditableField,
    VendorBasicInfoForm,
    VendorSignupStep2,
  },
  data() {
    return {
      vendor: null,
      isApproved: false,
      step: 2,
      iconUrl: 'http://static.maryoku.com/storage/icons/Vendor Signup/',
    }
  },
  created() {
    
  },
  mounted() {
    this.$root.$on('approve-vendor-basic-info', () => {
      this.isApproved = true
      console.log('vendor basic info is approved')
    })
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
    padding: 84px 124px;    
    font-family: Manrope-Regular, sans-serif;
  }  
</style>
