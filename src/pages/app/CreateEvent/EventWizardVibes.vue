<template>
    <div class="">
        <div class="container">
            <div class="title">
              5/5
            </div>
            <div class="event-basic-info">
               <div class="text-center mt-2">
                Here is a fun question for you,
              </div>
              <div class="setting-title mt-2">
                Try describing your guest’s vibes using a song
              </div>
              <div class="mt-3 types">
                <music-card :class="{selected:song.selected}" v-for="(song) in songs" :key="song.title" :data="song" :isSelected="song.title == selectedSong.title" @select="selectSong"> 
                </music-card >
              </div>
            </div>
        </div>
        <wizard-status-bar :currentStep="5" @next="goToNext" @skip="skip" @back="back"></wizard-status-bar>
    </div>
</template>

<script>

import GoBack from './componenets/GoBack'
import SelectedValue from './componenets/SelectedValue'
import WizardStatusBar from './componenets/WizardStatusBar'
import MusicCard from './componenets/MusicCard'
import { MaryokuInput} from '@/components'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  components: {
    GoBack,
    SelectedValue,
    WizardStatusBar,
    MaryokuInput,
    MusicCard
  },
  created () {
  },
  methods: {
    ...mapMutations('PublicEventPlanner', ['setEventProperty', 'setCurrentStep']),
    validateDate () {
      return this.$refs.datePicker.$el.classList.contains('md-has-value')
    },
    validateAndSubmit () {
      // this.$emit('goToNextPage');
      //  return;
      let vm = this

      this.cerrors = {}
      this.validating = true

      this.$validator.validateAll().then(isValid => {
        if (isValid) {
          // this.$parent.isLoading = true;

          if (this.eventId) {
            vm.updateEvent()
          } else {
            vm.createEvent()
          }
        } else {
          this.showNotify()
        }
      })

      if (!this.eventType) {

      } else {
        // this.$emit('goToNextPage');
      }
    },
    showNotify () {
      this.$notify({
        message: 'Please, check all required fields',
        icon: 'warning',
        horizontalAlign: 'center',
        verticalAlign: 'top',
        type: 'danger'
      })
    },
    goToNext() {
      this.$router.push({path: `/signup`})
    },
    skip() {
      this.$router.push({path: `/signup`})
    },
    back() {
      this.$router.push({path: `/event-wizard-religion`})
    },
    selectSong(song) {
      this.selectedSong = song
    }
  },
  data () {
    return {
      selectedSong: {},
      songs: [
        {
          singer: "Sisters sledge", title: "We are family", selected:false, src: "ringtones/we_are_family_v2_53802.mp3", thumb: "Singers/Sister+Sledge.jpg"
        },
        {
          singer: "Sheryl Crow", title: "A change would do you good", selected:false, src: "ringtones/sheryl_crow_a_change_would_do_you_good_b_w_music_video.mp3", thumb: "Singers/Sheryl Crow.jpg"
        },
        {
          singer: "bobby mcferrin", title: "Don't worry be happy", selected:false, src: "ringtones/bobby_mcferrin_dont_worry_be_happy.mp3", thumb: "Singers/Bobby Mcferrin.jpg"
        },
        {
          singer: "freddie mercury", title: "We are the champions", selected:false, src: "ringtones/queen_we_are_the_champions_ringtone.mp3", thumb: "Singers/freddie mercury.jpg"
        },
        {
          singer: "Dolly Parton", title: "Working 9 to 5", selected:false, src: "ringtones/9_to_5_1605.mp3", thumb: "Singers/Dolly Parton.jpg"
        },
        {
          singer: "Abba", title: "Money Money Money", selected:false, src: "ringtones/abba_money_money_money_ringtone.mp3", thumb: "Singers/Abba.jpg"
        }
      ]
    }
  },
  computed: {
    ...mapState('PublicEventPlanner', [
      'publicEventData'
    ])
  }

}
</script>
<style lang="scss">

    .event-basic-info {
        width: 100%;
        margin: 0 auto;
        padding: 0;
        min-height: 440px;
    }
    
    .md-checkbox-circle {
      margin: 0px;
    }
    .input-name {
      width: 80%;
      text-align: right;
      .form-input {
        width: 280px;
        margin: 0 0 0 auto;
        display: inline-block;
      }
    }
    .indicator-reverse {
      transform: scaleX(-1);
      margin-left: 20px;
    }
</style>
