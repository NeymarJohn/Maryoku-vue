<template>
  <div class="md-layout md-alignment-top-center">
    <div class="md-layout-item md-size-70" v-if="firstTime">
      <div class="margin-bottom-lg">
        <h3 class="title">
          <md-icon class="md-success md-size-2x margin-right-sm">check_circle</md-icon>You've been added to our marketplace as
          <a href="#">vetted vendor</a>.
        </h3>
      </div>
      <div class="margin-bottom-md">
        <h4 class="title">What's 262 days?</h4>
        <p>Our community based marketplace brings together event producers and vetted vendors to streamline event production.</p>
      </div>
      <div class="margin-bottom-lg">
        <h4 class="title">Win more quotes, get better leads</h4>
        <p>* Get insights about the competition and budget range to create winning quotes.</p>
        <p>* Get notified when quote outbided, and update your quote.</p>
        <p>* We study your preferences and send you more leads according to them.</p>
      </div>
    </div>

    <div class="md-layout-item md-size-70 margin-bottom-lg">
      <h4 class="title">Waiting for you quote</h4>
      <md-card class="proposals--card">
        <md-card-content>
          <div class="md-layout">
            <div class="md-layout-item separated">
              <div class="proposal--title margin-bottom-lg">
                <md-icon class="proposal--icon">date_range</md-icon>
                <span>{{ eventDate }}</span>
              </div>
              <div class="md-layout align-with-title">
                <div class="md-layout-item md-size-50 margin-bottom-md">
                  <div>Guests</div>
                  <p class="proposal--title">{{ proposalRequest.eventData.numberOfParticipants }}</p>
                </div>
                <div
                  v-if="proposalRequest.bidderRank > 1"
                  class="md-layout-item md-size-50 margin-bottom-md"
                >
                  <div>Budget</div>
                  <p class="proposal--title">
                    ${{ proposalRequest.bidRange.low }}
                    -
                    ${{ proposalRequest.bidRange.high }}
                  </p>
                </div>
                <div class="md-layout-item md-size-50 margin-bottom-md">
                  <div>Location</div>
                  <p class="proposal--title">{{ proposalRequest.eventData.location || '-' }}</p>
                </div>
                <div class="md-layout-item md-size-50 margin-bottom-md">
                  <div>Requirements</div>
                  <p class="proposal--title">{{ proposalRequest.requirements.length }}</p>
                </div>
              </div>
            </div>
            <div class="md-layout-item">
              <div class="proposal--title margin-bottom-lg centered">
                <span
                  v-if="proposalRequest.bidderRank > 1"
                >You're the {{proposalRequest.bidderRank | numeral('Oo')}} bidder</span>
                <span v-else>Budget</span>
              </div>
              <div class="md-layout md-alignment-top-center margin-bottom-lg">
                <div
                  v-if="proposalRequest.bidderRank > 1"
                  class="md-layout-item margin-bottom-md md-size-20"
                >
                  <div>Lowest</div>
                  <p class="proposal--title">
                    <!-- TODO: change this value -->
                    ${{ proposalRequest.bidRange.low }}
                  </p>
                </div>
                <div v-else class="md-layout-item margin-bottom-md md-size-20">
                  <div>Min</div>
                  <p class="proposal--title">${{ proposalRequest.bidRange.low }}</p>
                </div>
                <div class="md-layout-item margin-bottom-md md-size-30">
                  <div class="arrow"></div>
                </div>
                <div
                  v-if="proposalRequest.bidderRank > 1"
                  class="md-layout-item margin-bottom-md md-size-20"
                >
                  <div>Highest</div>
                  <p class="proposal--title">
                    <!-- TODO: change this value -->
                    ${{ proposalRequest.bidRange.high }}
                  </p>
                </div>
                <div v-else class="md-layout-item margin-bottom-md md-size-20">
                  <div>Max</div>
                  <p class="proposal--title">${{ proposalRequest.bidRange.high }}</p>
                </div>
              </div>
              <div class="centered">
                <md-button
                  v-if="proposalRequest.submitted"
                  class="md-button md-primary"
                >See more event requests</md-button>
                <md-button
                  v-else
                  @click.prevent="goToDetails"
                  class="md-button md-primary"
                >See full details</md-button>
              </div>
            </div>
          </div>
        </md-card-content>
      </md-card>
      <a href="#" @click.prevent="onSkipToAnotherEventRequest">
        Skip to another event request
        <md-icon class="md-primary">keyboard_arrow_right</md-icon>
      </a>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  props: ["proposalRequest", "proposals", "firstTime"],
  components: {},

  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {
    goToDetails() {
      this.$emit("goToDetails");
    },

    onSkipToAnotherEventRequest() {
      let index = _.findIndex(
        this.proposals,
        pr => pr.id == this.proposalRequest.id
      );
      let nextIndex = (index + 1) % this.proposals.length;
      this.$emit("requestAnotherProposal", this.proposals[nextIndex].id);
    }
  },
  computed: {
    eventDate() {
      if (!this.proposalRequest) return;

      let date = new Date(this.proposalRequest.eventData.eventStartMillis);
      return moment(date).format("MMM D, YYYY [at] hh:mma");
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/md/_colors.scss";
@import "@/assets/scss/md/_variables.scss";

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

.margin-right-sm {
  margin-right: 10px;
}

.proposals--card {
  margin-top: 10px;
  margin-bottom: 10px;
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

.centered {
  text-align: center;
}

.arrow {
  border-bottom: 1px solid $grey-600;
  position: relative;
  top: 46px;
  width: 60px;
  margin: auto;

  &::after {
    content: " ";
    position: absolute;
    width: 7px;
    height: 7px;
    border-bottom: 1px solid $grey-600;
    border-right: 1px solid $grey-600;
    transform: rotate(-45deg);
    bottom: -4px;
    right: 0px;
  }
}
</style>
