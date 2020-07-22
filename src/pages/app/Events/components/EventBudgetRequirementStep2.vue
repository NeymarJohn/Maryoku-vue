<template>
  <div class="event-budget-requirement step2">
    <div class="container text-center">
      <div class="event-budget-flexibility event-basic-info">
        <div class="font-size-40 font-bold">
          2/2
        </div>
        <div class="font-size-40 font-bold text-transform-uppercase mt-3">
          Who’s calling the shots? 
        </div>
        <div class="mt-1">What character would you say he or she resembles?</div>
          <div class="mt-1 movies">
            <div 
              v-for="(movie) in movies" :key="movie.label"
              class="movie-card"
              :class="{selected:movie.label == selectedMovie.label}" 
              @click="selectedMovie=movie" 
              >
              <div class="movie-tip">
                <img :src="`${$iconURL}Event%20Page/light.svg`" width="18" >
                <transition name="fade">
                  <div class="tool-tip">
                      <b class="font-weight-bold">{{movie.label}}</b> is a queen bee. She likes things 
                      the way she likes them. At times she can seem 
                      bossy or hard to please - her standards are 
                      extremely high and your budget better be 
                      impeccable for her to approve it
                  </div>
                </transition>
              </div>
              <div class="movie-thumb">
                <img :src="`${$storageURL}${movie.icon}`"/>
              </div>
              <div >
                <md-checkbox class="md-checkbox-circle md-red " v-model="selectedMovie" :value="movie"><span class="movie-label">{{movie.label}}</span></md-checkbox>
              </div>
              
            </div>
          </div>
      </div>
    </div>
  </div>  
</template>
<script>

import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import { MaryokuInput } from '@/components'
import 'vue-range-slider/dist/vue-range-slider.css'
import RangeSlider from 'vue-range-slider'
import moment from 'moment'

export default {
  components: {
    RangeSlider,
    MaryokuInput
  },
  data() {
    return {
      flexibility: 5,
      noBudget: false,
      budget:"",
      selectedMovie:{},
      movies: [
        {
          icon: "movies/amy-santiago.png",
          label: "Amy Santiago"
        },{
          icon: "movies/amybrookheimer.jpg",
          label: "Amybrookheimer"
        },{
          icon: "movies/captain-kirk2.png",
          label: "Captain kirk"
        },{
          icon: "movies/dirty-harry2.png",
          label: "Dirty Harry"
        },{
          icon: "movies/jerry-seinfeld.png",
          label: "Jerry Seinfeld"
        },{
          icon: "movies/joan-harris.jpg",
          label: "Joan Harris"
        },{
          icon: "movies/mirandapreistly.jpg",
          label: "Mirandapreistly"
        },{
          icon: "movies/soprano.png",
          label: "Soprano"
        },
      ]
    }
  },
}
</script>
<style lang="scss" scoped>
  .movies {
    display: flex;
    flex-flow: wrap;
    justify-content: space-around;
    .movie-card {
      display: inline-block;
      margin: 10px;
      text-align: left;
      position: relative;
      &.selected {
        .movie-thumb {
          box-shadow: 0 3px 10px 0 rgba(245, 19, 85, 0.43);
        }
        .movie-label {
          color: #f51355;
          font-weight: bold;
        }
      }
      .movie-thumb {
        border-radius: 3px;
        img {
          border-radius: 3px;
          width: 280px;
          height: 200px;
          object-fit: cover;
        }
        &:hover {
           box-shadow: 0 3px 10px 0 rgba(245, 19, 85, 0.43);
        }
      }
      .movie-tip {
        position: absolute;
        right: 20px;
        top: 20px;

        img {
          background-color: white;
          border-radius: 50%;
          cursor: pointer;
        }
        &:hover{
          .tool-tip {
            display: block;
          }
        }
      }
      .tool-tip {
        width: 300px;
        // height: 192.5px;
        right:-30px;
        bottom: 40px;
        padding: 20px;
        box-shadow: 0 3px 21px 0 rgba(0, 0, 0, 0.21);
        background-color: #ffedb7;
        position: absolute;
        display: none;
        z-index: 20;
        &::after{
          width: 0;
          height: 0;
          border-left: 10px solid transparent;
          border-right: 10px solid transparent;
          border-top: 15px solid #ffedb7;
          // box-shadow: 0 3px 21px 0 rgba(0, 0, 0, 0.21);
          content: "";
          bottom: -15px;
          position: absolute;
          right: 30px;
        }
      }
    }
  }
</style>