<template>
    <div class="md-layout md-alignment-top-center" >
        <div class="md-layout-item md-size-70 margin-bottom-lg">
            <h3 class="title">
              <md-icon class="md-success md-size-2x">check_circle</md-icon> You've been added to our marketplace as
              <a href="#">vetted vendor</a>.
            </h3>
        </div>
        <div class="md-layout-item md-size-70 margin-bottom-md">
          <h4 class="title">
            What's 262 days?
          </h4>
          <p>Our community based marketplace brings together event producers and vetted vendors  to streamline event production.</p>
        </div>
        <div class="md-layout-item md-size-70 margin-bottom-lg">
          <h4 class="title">
            Win more quotes, get better leads
          </h4>
          <p>* Get insights about the competition and budget range to create winning quotes.</p>
          <p>* Get notified when quote outbided, and update your quote.</p>
          <p>* We study your preferences and send you more leads according to them.</p>
        </div>
        <div class="md-layout-item md-size-70 margin-bottom-lg">
          <h4 class="title">
            Waiting for you quote
          </h4>
          <md-card class="proposals--card">
            <md-card-content>
              <div class="md-layout">
                <div class="md-layout-item separated">
                  <div class="proposal--title margin-bottom-lg">
                    <md-icon class="proposal--icon">date_range</md-icon>
                    <span >Aug 29, 2019 at 5:30pm</span>
                  </div>
                  <div class="md-layout">
                    <div class="md-layout-item margin-bottom-md align-with-title">
                      <div>Guests</div>
                      <p class="proposal--title">300</p>
                    </div>
                    <div class="md-layout-item margin-bottom-md">
                      <div>Location</div>
                      <p class="proposal--title">Tel Aviv</p>
                    </div>
                  </div>
                  <div class="md-layout">
                    <div class="md-layout-item align-with-title">
                      <div>Requirements</div>
                      <p class="proposal--title">6</p>
                    </div>
                  </div>
                </div>
                <div class="md-layout-item">y</div>
              </div>
            </md-card-content>
          </md-card>
        </div>
    </div>
</template>

<script>
  export default {
    props: ['proposalRequest'],
    components: {
    },

    data () {
      return {
      }
    },
    created () {
    },
    mounted () {
    },
    methods: {

    },
    computed: {
      
    }
  }
</script>
<style lang="scss" scoped>
  @import '@/assets/scss/md/_colors.scss';
  @import '@/assets/scss/md/_variables.scss';

  .md-success {
    color: $green-700 !important;
  }

  .title {
    font-weight: bold;
  }

  h4 {
    margin: 0;
  }

  p {
    margin: 10px 0 0 0;
  }

  .margin-bottom-lg {
    margin-bottom: 30px;
  }

  .margin-bottom-md {
    margin-bottom: 20px;
  }

  .proposals--card {
    margin-top: 10px;
  }

  .proposal--title {
    font-size: 20px;
    font-weight: 400;

    .proposal--icon {
      margin-right: 5px;
      margin-top: -5px;
    }
  }

  .align-with-title {
    padding-left: 34px;
  }

  .separated {
    border-right: 1px solid $input-border;
  }
</style>
