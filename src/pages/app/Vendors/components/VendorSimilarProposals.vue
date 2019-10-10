<template>
  <div class="full-width">
    <div class="proposals-wrapper">
      <md-card v-for="(item, index) in proposals" :value="item" :key="index">
        <md-card-header>
          <div class="upper-row">
            <img :src="item.image">
            <div class="text-container">
              <p>
                {{item.username}}
                <label
                  class="star-rating__star"
                  v-for="(rating, ratingIndex) in ratings"
                  :key="ratingIndex"
                  :class="{'is-selected' : true}"
                >★</label>
              </p>
              <h4>
                {{item.title}}
              </h4>
              <h5>
                {{item.description}}
              </h5>
            </div>
            <span>
              {{item.date}}
            </span>
          </div>
        </md-card-header>
        <md-card-content>
          <div class="down-row">
            <h4>
              ${{item.price | numeral('0,0')}}
            </h4>
            <div class="status">
              <span>
                {{item.status}}
              </span>
            </div>
            <a class="link-photos">
              <md-icon>photo</md-icon>
              view photos
            </a>
          </div>
        </md-card-content>
      </md-card>
    </div>
    <a class="more">Show more</a>
  </div>
</template>
<script>
  import VueElementLoading from 'vue-element-loading'
  import numeral from 'numeral';

  export default {
    name: 'vendor-similar-proposals',
    components: {
      VueElementLoading,
    },
    props: {
      proposals: Array,
      ratings: Array,
    },
    data: () => ({
      isLoading:true,
    }),
    mounted() {
      this.isLoading = false;
    },
  }
</script>
<style lang="scss" scoped>
  @import "@/assets/scss/md/_variables.scss";
  @import "@/assets/scss/md/_colors.scss";
  .full-width {
    width: 100%;
  }
  .proposals-wrapper {
    display: flex;
    flex-direction: column;
    
    .md-card {
      flex-basis: 100%;
      margin: 0;
      padding: 0;
      box-shadow: none;

      .md-card-header {
        padding: 0;
        .upper-row {
          border: 1px solid $grey-300;
          display: flex;
          margin: 0;
          padding: 0;

          img {
            width: 240px;
            margin-right: 2em;

            @media (max-width: $screen-sm-min) {
              width: 100%;
              margin-left: 0;
            }
          }
          .text-container {
            flex: 3;

            p {
              font-size: 14px;
            }
            h4 {
              font-size: 18px;
              font-weight: 400;
            }
            h5 {
              font-size: 16px;
              font-weight: 200;
            }
            @media (max-width: $screen-sm-min) {
              padding: 1em;
            }
          }
          span {
            flex: 1;
            padding: 1em 1em 0 0;
            text-align: right;

            @media (max-width: $screen-sm-min) {
              padding: 0 0 1em 1em;
              text-align: left;
            }
          }

          @media (max-width: $screen-sm-min) {
            flex-direction: column;
          }
        }
      }
      .md-card-content {
        padding: 0;
        margin-bottom: 1em;
        border: 1px solid $grey-300;
        border-top: none;

        .down-row {
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: row;

          h4 {
            margin: 0;
            width: 240px;
            margin-right: 1em;
            background: $grey-200;
            padding: 1em;
            font-weight: 600;
            font-size: 14px;

            @media (max-width: $screen-sm-min) {
              width: 100%;
              margin-right: 0;
            }
          }
          .status {
            flex: 3;
            padding: 12px 0 0 12px;

            span {
              border-radius: 10px;
              padding: 2px 8px;
              border: 1px solid $grey-500;
            }
          }
          .link-photos {
            flex: 1;
            text-transform: uppercase;
            font-weight: 600;
            font-size: 12px;
            text-align: right;
            padding: 1em 1em 0 0;

            i {
              color: $purple-500!important;
              font-size: 14px!important;
            }

            @media (max-width: $screen-sm-min) {
              text-align: left;
            }
          }

          @media (max-width: $screen-sm-min) {
            flex-direction: column;
          }
        }
      }
    }
  }
</style>
