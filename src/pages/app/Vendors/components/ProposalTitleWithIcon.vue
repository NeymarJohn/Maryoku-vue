<template>
  <div class="proposal-title-with-icon-wrapper">
    <h3><md-icon>{{icon}}</md-icon>{{title}}</h3>
    <p>{{desc}}</p>
  </div>
</template>
<script>
  export default {
    name: 'proposal-title-with-icon',
    components: {
    },
    props: {
      icon: String,
      title: String, 
      desc: String
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
  .proposal-title-with-icon-wrapper {
    margin-top: 80px;
    display: flex;
    justify-content: flex-start;
    align-items: baseline;
    color: #050505;

    h3 {
      font-weight: 800;
      font-size: 30px;

      i {
        margin-right: 10px;
      }
    }
    p {
      font-size: 14px;
      padding-left: 1em;
    }
  }  
</style>
