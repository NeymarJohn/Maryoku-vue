<template>
  <div id="afterFirstTransactionModalWrapper" >
    <FirstTransaction v-if="showFirstModal" @start="goNext" @close-modal="showFirstModal = false" />
    <BillingInformationModal v-if="showBillingModal" @close-modal="handleCloseModal" />
    <loader :active="loading" :is-full-screen="true" page="vendor" />

  </div>
</template>
<script>
import BillingInformationModal from "./BillingInformationModal";
import FirstTransaction from "./FirstTransaction";
import Loader from "@/components/loader/Loader.vue";
import { mapActions } from "vuex";

export default {
  name: "AfterFirstTransaction",
  components: {
    FirstTransaction,
    BillingInformationModal,
    Loader,
  },
  data() {
    return {
      showBillingModal: false,
      showFirstModal: false,
      vendorData: {},
      loading: false,
      bankDetails:{},
    };
  },
  mounted() {
    this.vendorData = this.$store.state.vendor.profile;
    if(this.vendorData && this.vendorData.firstTransaction && !this.vendorData.billingInformation){
      this.showFirstModal = true;
    }
  },
  methods: {
    ...mapActions("stripe", ["createDestinationAccount", "createStripeAccount"]),
    goNext() {
      this.showFirstModal = false;
      this.showBillingModal = true;
    },
    handleCloseModal(){
      this.loading = true;
      this.sendBankInfo().then(()=> {
          this.showBillingModal = false;
          this.loading = false;
        }
      );
    },
     async sendBankInfo()  {
      this.bankDetails = JSON.parse(localStorage.getItem("bankDetails"));
       return this.createDestinationAccount({
        "holderName": this.bankDetails.holderName,
        "routingNumber": this.bankDetails.routingNumber,
        "accountNumber": this.bankDetails.accountNumber,
        "representative": {
          "ssnLast4": this.bankDetails.ssnLast4 || "0000",
          "idNumber": this.bankDetails.idNumber || "000000000",
          "dob": {
            "year": this.bankDetails.date.getFullYear(),
            "month": this.bankDetails.date.getMonth() + 1,
            "day": this.bankDetails.date.getDate(),
          },
          "address": {
            "line1": this.bankDetails.address.route,
            "line2": this.bankDetails.address.street_number || "address_full_match",
            "postalCode": this.bankDetails.address.postal_code,
            "city": this.bankDetails.address.locality,
            "state": this.bankDetails.address.administrative_area_level_1,
          },
        }
      }).then(res => {
        this.getProfile().then( (res) => {
          if(res.billingInformation[0] && res.billingInformation[0].representative) {
            this.bankDetailsEditing = false;
          }
          this.isLoading = false;
        });
      }).catch(error => {
        this.bankDetailsEditing = true;
        this.isLoading = false;
      });
    },
  }
};

</script>
<style lang="scss" scoped>
</style>
