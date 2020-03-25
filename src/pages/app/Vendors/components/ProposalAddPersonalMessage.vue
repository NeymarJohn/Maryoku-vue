<template>
  <div class="proposal-add-personal-message-wrapper">
    <h4>
      {{desc}}
    </h4>
    <textarea rows="8" placeholder="Type your message here"></textarea>
  </div>
</template>
<script>
  export default {
    name: 'proposal-add-personal-message',
    components: {
    },
    props: {
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
  .proposal-add-personal-message-wrapper {
    border-radius: 3px;
    box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);
    background-color: #ffffff;
    padding: 34px 40px 34px 34px;
    font-family: 'Manrope-Regular', sans-serif;
    color: #050505;

    h4 {
      font-size: 16px;
      font-weight: 800;
      margin: 0;
      margin-bottom: 12px;
    }

    textarea {
      width: 100%;
      resize: none;
      font-size: 16px;
      border-radius: 3px;
      border: solid 0.5px #707070;
      padding: 21px 18px;
    }
  }
</style>
