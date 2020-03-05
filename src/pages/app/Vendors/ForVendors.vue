<template>
  <div class="for-vendor-wrapper">
    <h4>
      So what are the details?
    </h4>
    <div class="main-cont">
      <h3>march madness event</h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </p>
      <div class="summary-cont">
        <ul>
          <li><i class="material-icons">email</i> <br/><br/> December 25, 2019</li>
          <li><i class="material-icons">email</i> <br/><br/> Day Time event</li>
          <li><i class="material-icons">email</i> <br/><br/> 6 Hours</li>
          <li><i class="material-icons">email</i> <br/><br/> 2,034 Guests</li>
          <li><i class="material-icons">email</i> <br/><br/> San Diego</li>
        </ul>
      </div>
      <hr/>
      <vendor-budget-list
        :title="`Budget`"
        :description="`Usually budget is flexible and could chane accordig to needs`"
        :items="vendors"
      ></vendor-budget-list>
    </div>
    <div class="rank-cont">
      <h3>
        Would you like to submit your bid?
      </h3>
      <p>
        You're the <strong>4th</strong> catering & venue <strong>bidder</strong>
      </p>
    </div>
    <div class="action-cont">
      <a class="another-date">Suggest Another Date</a>
      <button class="no">
        Thank You, But No.
      </button>
      <button class="yes">
        Submit Proposal
      </button>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import VueElementLoading from 'vue-element-loading'
import Vendors from '@/models/Vendors'
import VendorPropertyField from './VendorPropertyField'

//COMPONENTS
import Icon from '@/components/Icon/Icon.vue'
import VendorBudgetList from './components/VendorBudgetList.vue'

export default {
  components: {
    VueElementLoading,
    VendorBudgetList
  },
  data() {
    return {
      vendors: [
        {
          category: "Venue", 
          budget: 1100
        },
        {
          category: "Catering", 
          budget: 1300
        }
      ]
    }
  },
  created() {
    this.$auth.currentUser(this, true, function () {
    }.bind(this));
  },
  methods: {
  },
  computed: {
  },
  watch: {
  },
  filters: {
  },
};
</script>
<style lang="scss" scoped>
  .for-vendor-wrapper {
    background-color: #ffffff;
    box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);
    border-radius: 3px;
    max-width: 80%;
    margin: -64px auto 0 auto;
    padding: 83px 114px;
    
    h4 {
      margin: 0;
      font-size: 22px;
      color: #050505;
      font-weight: bold;
    }

    .main-cont {
      background-color: #f2f2f2;
      border: 1px solid #707070;
      border-radius: 3px;
      margin-top: 50px;
      padding: 60px;
      color: #050505;

      h3 {
        margin: 0;
        text-transform: uppercase;
        font-family: 'Cooperative';
      }
      p {
        font-size: 16px;
        max-width: 80%;
      }
      .summary-cont {
        ul {
          display: flex;
          list-style: none;
          padding: 0;
          justify-content: center;
          align-content: center;
          margin: 3rem 0;
          li {
            flex: 1;
            border-right: 1px solid #707070;
            border-radius: 3px;
            text-align: center;
            padding: 1rem;
            font-size: 22px;
            font-weight: 800;

            i {
              font-size: 36px;
            }

            &:last-child {
              border: none;
            }
          }
        }
      }
    }

    .rank-cont {
      color: #050505;
      padding: 5em 0 0 0;
      h3 {
        font-size: 40px;
        font-weight: bold;
        line-height: 1.68;
        margin: 0;
      }
      p {
        font-size: 22px;
        font-weight: 400;
        list-style: 1.32;
        strong {
          font-weight: 800;
        }
      }
    }
    
    .action-cont {
      text-align: right;
      padding: 6em 0;
      .another-date {
        font-size: 20px;
        color: #f51355;
        font-weight: 800;
        text-decoration: underline;
        cursor: pointer;
        padding: 0 2rem;
        margin-right: 23px;
      }
      .no {
        min-width: 382px;
        padding: 20px 0;
        color: #f51355;
        font-size: 20px;
        font-weight: 800;
        border-radius: 3px;
        border: 1px solid #f51355;
        box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
        margin-right: 23px;
      }
      .yes {
        min-width: 382px;
        padding: 20px 0;
        font-size: 20px;
        font-weight: 800;
        letter-spacing: 0.42px;
        border: none;
        border-radius: 3px;
        color: #ffffff;
        background-color: #f51355;
      }
    }
  }
</style>
