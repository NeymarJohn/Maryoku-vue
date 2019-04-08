<template>
  <div class="md-layout">
    <vue-element-loading :active="isLoading" spinner="ring" color="#FF547C" is-full-screen/>

    <md-button class="md-info publish-event">
      Publish Event
    </md-button>
    <div class="md-layout-item md-size-100">
      <md-card class="event-details">
            <md-card-content class="md-layout">
              <div class="md-layout-item md-size-100 event-details_banner" :style="`background-image : url(`+ bannerURL  +`)`">


                <div class="update-banner-form">
                  <md-button  class="profile-button md-info md-sm" @click="uploadImage">
                    UPDATE IMAGE
                  </md-button>
                  <input type="file" style="display: none;" ref="inputFile" accept="image/gif, image/jpg, image/png" @change="onFilePicked">
                </div>

              </div>

              <div class="md-layout-item md-size-50">
                <h1 class="event-title">{{calendarEvent.title}}</h1>
                <div class="event-date">March 17 2019</div>

                <div class="event-info-tabs">
                  <tabs
                          :tab-name="['MEETING PLACE', 'WHEN TO ARRIVE', 'WHAT YOU NEED TO KNOW']"
                          flex-column
                          color-button="danger">
                    <!-- here you can add your content for tab-content -->
                    <template slot="tab-pane-1">
                      Collaboratively administrate empowered markets via plug-and-play networks. Dynamically procrastinate B2C users after installed base benefits.
                    </template>
                    <template slot="tab-pane-2">
                      Efficiently unleash cross-media information without cross-media value. Quickly maximize timely deliverables for real-time schemas.
                      <br><br>
                      Dramatically maintain clicks-and-mortar solutions without functional solutions.
                    </template>
                    <template slot="tab-pane-3">
                      Completely synergize resource taxing relationships via premier niche markets. Professionally cultivate one-to-one customer service with robust ideas.
                      <br><br>
                      Dynamically innovate resource-leveling customer service for state of the art customer service.
                    </template>
                  </tabs>

                </div>

                <div class="event-images-list md-layout">
                  <md-card v-for="(image,index) in eventImages" :key="index" class="md-layout-item md-size-25">
                    <md-card-media>
                      <div class="event-images_image-item" :style="`background-image : url(`+image+`)`">
                          <md-button class="md-info md-sm" @click="removeEventImage(index)">
                            DELETE
                          </md-button>
                      </div>
                    </md-card-media>
                  </md-card>

                  <div class="update-banner-form">
                    <md-button  title="Add Images" class="add-event-image md-info md-sm md-just-icon md-round" @click="uploadEventImage">
                      <md-icon>add</md-icon>
                    </md-button>
                    <input type="file" style="display: none;" ref="eventFile" accept="image/gif, image/jpg, image/png" @change="onEventFilePicked">
                  </div>

                </div>


                <div class="questions-answers-list">
                  <md-card>
                    <md-card-header>
                      <h4 class="title">Questions & Answers</h4>
                    </md-card-header>
                    <md-card-content>
                      <collapse
                              :collapse="questionsAndAnswersList"
                              icon="keyboard_arrow_down"
                              color-collapse="danger">
                        <template slot="md-collapse-pane-1">
                          <p>Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.</p>
                        </template>
                        <template slot="md-collapse-pane-2">
                          <p>Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.</p>
                        </template>
                        <template slot="md-collapse-pane-3">
                          <p>Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.</p>
                        </template>
                      </collapse>
                    </md-card-content>
                  </md-card>
                </div>

              </div>
              <div class="md-layout-item md-size-50">
                <div class=" time-line-section">
                  <h4>Timeline</h4>

                  <div  >
                    <ul class="time-line-blocks_selected-items">
                      <li v-for="(item,index) in timelineItems" :key="index" class="time-line-blocks_selected-items_item time-line-item">
                        <md-icon class="time-line-blocks_icon" :style="`background : ` + item.color">{{item.icon}}</md-icon>

                        <md-card class="block-info" >

                          <div class="item-title-and-time">
                                <span class="item-time" :style="`background : ` + item.color">
                                    {{item.from }} - {{item.to}}
                                </span>
                            <span class="item-title">
                                    {{item.title ? item.title : 'Title Bar' }}
                                </span>
                          </div>
                          <p class="item-desc">
                            {{ item.description }}
                          </p>
                        </md-card>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </md-card-content>
      </md-card>
    </div>

  </div>
</template>

<script>
//MAIN MODULES
import ChartComponent from "@/components/Cards/ChartComponent";
import auth from "@/auth";
import moment from "moment";
import VueElementLoading from "vue-element-loading";
import Calendar from '@/models/Calendar';
import CalendarEvent from '@/models/CalendarEvent';

//COMPONENTS
import { AnimatedNumber } from "@/components";
import Icon from "@/components/Icon/Icon.vue";
import { Tabs } from "@/components";
import { Collapse } from "@/components";
export default {
  components: {
      VueElementLoading,
    ChartComponent,
    AnimatedNumber,
    Icon,
      Tabs,
      Collapse
  },

  data() {
    return {
      auth: auth,
      calendarEvent: {},
      percentage: 0,
      totalRemainingBudget: 0,
      seriesData: [],
      isLoading: false,
      footerLink: [
        { title: "HOME" },
        { title: "COMPANY" },
        { title: "PORTFOLIO" },
        { title: "BLOG" }
      ],
        questionsAndAnswersList : [
            {
                title : 'Question 1 : what if'
            },
            {
                title : 'Question 2'
            },
            {
                title : 'Question 3'
            }
        ],
        bannerURL : 'https://bit.ly/2TWGILO', // default image for banner
        eventImages : [],
        timelineItems : [
            {
                id : 1,
                type : 'setup',
                icon : 'place',
                color : '#f44336',
                from : '8:00 AM',
                to : '4:00 PM',
                title : 'title 1',
                description : 'description here'
            },
            {
                id : 2,
                type : 'activity',
                icon : 'notifications_active',
                color : '#4caf50',
                from : '8:00 AM',
                to : '4:00 PM',
                title : 'title 2',
                description : 'description here'
            },
            {
                id: 3,
                type : 'meal',
                icon : 'restaurant',
                color : '#00bcd4',
                from : '8:00 AM',
                to : '4:00 PM',
                title : 'title 3',
                description : 'description here'
            }
        ],
    };
  },
  mounted() {
    this.getEvent();
  },
  methods: {
    getEvent() {
        this.auth.currentUser(this, true, function() {
            let _calendar = new Calendar({id: this.auth.user.defaultCalendarId});

            _calendar.calendarEvents().find(this.$route.params.id).then(event => {
                this.calendarEvent = event;              
                this.totalRemainingBudget = event.totalBudget - event.allocatedBudget;
                this.percentage = 100 - ((event.allocatedBudget / event.totalBudget) * 100).toFixed(2);
                this.seriesData = [(100 - this.percentage), this.percentage];
            });
        }.bind(this));
    },
      uploadImage() {
          this.$refs.inputFile.click();

      },

      onFilePicked(event) {
          let file = event.target.files || event.dataTransfer.files;
          if (!file.length) {
              return;
          }
          if (file[0].size <= 500000){
              let url = URL.createObjectURL(file[0]);
              this.bannerURL = url

              const formData = new FormData();
              formData.append("images", file[0], file[0].name) // TODO :: send this object once we have api for userPorfile photo
          }else{
              this.alretExceedPictureSize = true
          }

      },
      uploadEventImage() {
          this.$refs.eventFile.click();

      },

      onEventFilePicked(event) {
          let file = event.target.files || event.dataTransfer.files;
          if (!file.length) {
              return;
          }
          if (file[0].size <= 500000){
              let url = URL.createObjectURL(file[0]);
              this.eventImages.push(url);

              const formData = new FormData();
              formData.append("images", file[0], file[0].name) // TODO :: send this object once we have api for userPorfile photo
          }else{
              this.alretExceedPictureSize = true
          }

      },
      removeEventImage(index){
          this.eventImages.splice(index,1);

      }
  },
  computed: {
    pieChart() {
      return {
        data: {
          labels: [" ", " "], // should be empty to remove text from chart
          series: this.seriesData
        },
        options: {
          padding: 0,
          height: 120,
          donut: true,
          donutWidth: 12
        }
      };
    }
  },
  filters: {
    formatDate: function (date) {
      return moment(date).format('Do, MMM');
    },
    formatTime: function(date) {
      return moment(date).format('h:00 A')
    },
    formatDuration: function(startDate, endDate) {
      return moment(endDate).diff(startDate, 'hours')
    }
  },
  watch: {
  },  
};
</script>

<style lang="scss">
// .md-layout-item.md-layout.md-gutter {
//   margin-right: -20px;
//   margin-left: -20px;
// }
.percentage {
  padding-bottom: 8px;
  padding-left: 5px;
  grid-column: 1;
  grid-row: 1;
  margin-top: auto;
  margin-bottom: auto;
  font-size: 1.5rem;
  font-weight: 700;
}
.logo-block {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 0px 15px;
  margin: -20px 0px 20px 0px;
  .event-planer-logo {
    background: #eb3e79;
    width: 64px;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    .company-logo {
      color: white !important;
    }
  }
  .event-title {
    font-family: "Roboto";
    font-size: 18px;
    font-weight: 300;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.33;
    letter-spacing: normal;
    text-align: left;
    color: #000000;
  }
}
.control-main-block {
  display: flex;
  justify-content: center;
  .company-logo-block {
    border: 2px solid #8b8b8b;
    padding: 7px;
    border-radius: 50%;
    margin: 0px 5px;
  }
}
.title-text {
  font-family: "Roboto";
  font-size: 12px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: 2;
  letter-spacing: normal;
  text-align: left;
  color: #959595;
}
.title-budget-main {
  font-family: "Roboto";
  font-size: 18px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.33;
  letter-spacing: normal;
  text-align: center;
  color: #000000;
}
.title-budget-prise {
  color: rgba(33, 200, 152, 0.8) !important;
  font-size: 20px;
  font-weight: 500;
  line-height: 1.2;
}
.block-flex {
  display: flex;
}
.button-event-creatig .md-ripple {
  background-color: #00bcd4;
}
.footer-link-button .md-ripple {
  color: #89229b;
  background-color: rgba(240, 240, 240, 1);
}
.copyright {
  color: #9c27b0;
}
.copyright-block {
  justify-content: space-between;
}
</style>
