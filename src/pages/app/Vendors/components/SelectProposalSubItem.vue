<template>
  <div class="select-proposal-sub-item-wrapper" @click="clickItem(item)">
    <div v-if="active" class="active">
      <span>{{item}}</span> 
      <img src="http://static.maryoku.com/storage/icons/NewSubmitPorposal/Group 3668 (2).svg"/>
    </div>
    <div v-else class="inactive">
      <span>{{item}}</span> <md-icon>close</md-icon>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'select-proposal-sub-item',
    components: {
    },
    props: {
      item: String
    },
    data () {
      return {
        active: true,
      }
    },
    methods: {
      clickItem(item) {
        this.active = !this.active
        this.$root.$emit('add-service-item', item)
      }
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
  .select-proposal-sub-item-wrapper {
    margin-right: 30px;
    display: inline-block;

    div {
      padding: 16px 28px 15px 28px;
      border-radius: 100px;
      background-color: #ffffff;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      float: left;

      &.active {
        float: left;
        border: solid 1px #f51355;
        color: #f51355;

        span {
          text-transform: capitalize;
          display: inline-block;
        }
        img {
          width: 26px;
          margin-left: 1rem;
          display: inline-block;
        }
      }
      &.inactive {
        border: solid 1px #818080;

        span {
          text-transform: capitalize;
        }
        i {
          color: #818080;
          margin-left: 8px;
          margin-top: -3px;
        }
      }
    }
  }
</style>
