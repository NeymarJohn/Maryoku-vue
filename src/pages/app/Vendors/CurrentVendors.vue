<template>
  <div class="md-layout edit-vendor-details">
    <vue-element-loading :active="isLoading" spinner="ring" color="#FF547C" is-full-screen/>
    <div class="vendor-details-tabs">
      {{vendor}}
    </div>
  </div>
</template>

<script>
  import moment from 'moment'
  import VueElementLoading from 'vue-element-loading'
  import Vendors from '@/models/Vendors'

  //COMPONENTS
  import Icon from '@/components/Icon/Icon.vue'

  export default {
    components: {
      VueElementLoading,
      Icon,
    },
    props: {
      item: {
        type: Object,
        default: () => {
          return {};
        }
      },
    },
    data () {
      return {
        vendorId: null,
        isLoading: false,
        vendor: {statistics: {}},
        routeName: null
      }
    },
    created () {
      this.routeName = this.$route.name;
    },
    mounted () {
      let _self = this
      this.isLoading = true;

      this.getVendor()
    },
    methods: {
      getVendor () {
        this.$auth.currentUser(this, true, function () {
          Vendors.find(this.$route.params.id).then(vendor => {
            this.vendor = vendor
            this.isLoading = false;
          })
        }.bind(this))
      }
    },
    computed: {
    },
    filters: {
    },
    watch: {},
  }
</script>
