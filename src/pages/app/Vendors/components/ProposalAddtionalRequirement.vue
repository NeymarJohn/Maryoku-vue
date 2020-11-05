<template>
  <div class="white-card mt-40">
    <div class="p-40">
      <div>
        <img :src="`${$iconURL}Submit+Proposal/Group+8840.svg`" />
        <span class="font-size-30 font-bold">Additional requests from the client</span>
      </div>
      <div>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
        dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
        clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
        consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed
        diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
        takimata sanctus
      </div>
    </div>
    <hr />
    <div class="p-40">
      <div>
        <img :src="`${$iconURL}Submit+Proposal/request arrangement.png`" />
        <span class="font-size-30 font-bold">The client has requested these sitting arrangement, can you deliver?</span>
      </div>
      <div class="d-flex align-center">
        <div>
          <div>'Theatre'</div>
          <div><img :src="`${$iconURL}Requirements/theatre-small.png`" /></div>
        </div>
        <div>Or</div>
        <div>
          <div>'U shape'</div>
          <div><img :src="`${$iconURL}Requirements/u-shape-small.png`" /></div>
        </div>
        <div>
          <div><md-checkbox class="md-circle">Group Work Planned</md-checkbox></div>
          <div>
            <div>Group size:</div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
    <div class="p-40" style="background-color: #ffd9e4">
      <md-checkbox v-model="agreeTerms">I read this section & I agree</md-checkbox>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      agreeTerms: false,
    };
  },
};
</script>
<style lang="scss" scoped>
</style>