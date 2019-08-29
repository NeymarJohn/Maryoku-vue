<template>
    <div class="md-layout" >
        <vue-element-loading :active="isLoading" spinner="ring" color="#FF547C" is-full-screen/>
        <div class="md-layout vendor-proposals" v-if="proposalRequest">
            <vendor-proposals-form
              v-if="page == 'details'"
              :proposal-request-requirements="proposalRequestRequirements" 
              :proposal-request="proposalRequest"
              @goToLanding="goToLanding"
            />
            <vendor-proposals-landing 
              v-if="page == 'landing'" 
              :proposal-request="proposalRequest"
              @goToDetails="goToDetails"
            />
        </div>
    </div>
</template>

<script>
  import ProposalRequest from '@/models/ProposalRequest'
  import VendorProposalsForm from './VendorProposalsForm';
  import VendorProposalsLanding from './VendorProposalsLanding';

  export default {
    components: {
      VendorProposalsForm,
      VendorProposalsLanding
    },

    data () {
      return {
        page: 'landing', //landing, details
        proposalRequestRequirements: [],
        proposalRequest: null,
        isLoading: false
      }
    },
    created () {

    },
    mounted () {

      this.isLoading = true;
      ProposalRequest.find(this.$route.params.id)
        .then(resp => {
          this.$set(this, 'proposalRequest', resp)

          this.proposalRequestRequirements = _.chain(resp.requirements).groupBy('requirementPriority').map(function (value, key) {

            return {
              title: key,
              requirements: value
            }

          })
            .value();

          console.log(this.proposalRequest);
          this.isLoading = false;

        })
        .catch(error => {
          console.log(' error here   -->>>  ', error)
        })

    },
    methods: {
      goToDetails () {
        this.page = "details";
      },
      goToLanding () {
        this.page = "landing";
      }
    },
    computed: {
      
    }
  }
</script>
