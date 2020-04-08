<template>
  <div class="proposal-steps-wrapper">
    <div class="steps-cont">
      <ul class="progressbar">
        <li :class="[
          {active: step >= 1 },
          {current: step == 0 },
        ]"> 
          <span v-if="step == 0"><i>&#8226;</i></span> 
          <span v-else><md-icon>check</md-icon></span>
          <br/>
          Proposal Your Bid
        </li>
        <li :class="[
          { active: step >= 3 },
          { current: step >= 2 },
          { inactive: step < 2 }
        ]">
          <span v-if="step >=3"><md-icon>check</md-icon></span>
          <span v-else><i>&#8226;</i></span> 
          <br/> Additional Services
        </li>
        <li :class="[
          { current: step >= 3 },
          { inactive: step < 3 }
        ]"> 
          <span v-if="step >= 3"><i>&#8226;</i></span> 
          <span v-else><i>&#8226;</i></span> 
          <br/>Preview Proposal
        </li>
      </ul>
    </div>
    <div class="title-cont">
      <h3>Venue & Catering Proposal</h3>
      <p>Relish Catering & Venues</p>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'proposal-steps',
    components: {
    },
    props: {
      step: Number
    },
    data () {
      return {
      }
    },
    methods: {
    },
    created() {

    },
    mounted() {
    },
    computed: {
    },
    watch: {
    }
  }
</script>
<style lang="scss" scoped>
  .proposal-steps-wrapper {
    background-color: #ffffff;    
    border-radius: 3px;
    box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);
    padding: 46px;
    font-family: 'Manrope-Regular', sans-serif;
    
    .steps-cont {
      width:100%;
      margin: 0 auto;
      color: #a0a0a0;

      .progressbar {
        counter-reset: step;

        li {
          list-style-type: none;
          float: left;
          width: 33.33%;
          position:relative;
          text-align: center;
          font-weight: 600;
          font-size: 16px;

          span {
            width: 34px;
            height: 34px;
            display: inline-block;
            border-radius: 50%;
            z-index: 2;
            position: relative;
          }

          &.active, &.current {
            span {
              background: #e0ae17;
              i {
                color: white;
                position: relative;
                top: 3px;
              }
            }
          }

          &.current {
            span {
              i {
                position: relative;
                top: 5px;
                font-size: 24px;
              }
            }
          }

          &.inactive {
            span {
              i {
                color: #707070;
                position: relative;
                top: 5px;
                font-size: 50px;
              }
            }
          }
          &:after {
            content:'';
            position: absolute;
            width: 100%;
            height: 3px;
            background-color: #707070;
            top: 15px;
            left: -50%;
          }
          &:first-child:after {
            content: none;
          }
          &.active, &.current {
            color:#e0ae17;
          }
          &.active:before, &.current:before {
            background-color: #e0ae17;
            color: white;
            
          }
          &.active:after, &.current:after {
            background-color:#e0ae17;
          }
        }
      }
    }

    .title-cont {
      text-align: center;

      h3 {
        font-size: 34px;
        margin: 0;
        font-weight: 800;
        color: #050505;
        padding-top: 70px;
        margin-bottom: 10px;
      }
      p {
        color: #f11355;
        font-size: 20px;
        font-weight: 800;
        margin: 0;
      }
    }
  }  
</style>
