<template>
  <div class="proposal-add-personal-message-wrapper">
    <h3><img :src="img"/>{{title}}</h3>
    <h4>
      {{desc}}
    </h4>
    <textarea rows="8" placeholder="Type your message here"></textarea>
    <span>Sincerely,</span>
    <p>Relish caterers & venues</p>
  </div>
</template>
<script>
  export default {
    name: 'proposal-add-personal-message',
    components: {
    },
    props: {
      icon: String,
      title: String, 
      desc: String,
      img: String,
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
    margin-top: 50px;
    padding: 40px 40px 40px 34px;
    font-family: 'Manrope-Regular', sans-serif;
    color: #050505;
  
    h3 {
      font-weight: 800;
      font-size: 30px;

      img {
        width: 26px;
        margin-right: 15px;
      }
    }

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
      margin-bottom: 15px;
    }
    span {
      font-size: 14px;
    }
    p {
      font-size: 14px;
      font-weight: 800;
      text-decoration: underline;
      margin: 0;
    }
  }
</style>
