<template>
    <div class="md-layout">
        <div class="md-layout-item">
            {{this.$auth.user}}
        </div>
    </div>
</template>
<script>

export default {
  name: 'my-events',
  components: {},
  data () {
    return {}
  },
  mounted () {
    this.$auth.currentUser(this, true, () => {
      if (this.$auth.user.me && this.$auth.user.me.myEvents) {
        // alert(this.$auth.user.me.myEvents[0].id)
        this.$router.push({name: 'ShowEvent', params: {id: this.$auth.user.me.myEvents[0].id}})
      }
    })
  },
  methods: {},
  computed: {},
  watch: {}
}
</script>
<style lang="scss" scoped>
    @import '@/assets/scss/md/_colors.scss';
</style>
