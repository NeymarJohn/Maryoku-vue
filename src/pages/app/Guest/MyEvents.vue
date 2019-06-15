<template>
    <div class="md-layout">
        <div class="md-layout-item">
            <h4> My Events !</h4>
            <code>
                {{JSON.stringify($auth.user,null, 4)}}
            </code>
        </div>
    </div>
</template>
<script>

  export default {
    name: 'my-events',
    components: {},
    data() {
      return {};
    },
    mounted() {
    },
    methods: {},
    computed: {},
    watch: {}
  };
</script>
<style lang="scss" scoped>
    @import '@/assets/scss/md/_colors.scss';
</style>
