<template>
  <div>
    <md-button
      class="md-simple md-button md-black maryoku-btn"
      @click="sendToAddtionalGuests"
    >
      <Icon src="Campaign/Campaign/Group 8871.svg">
        Send To Additional Guests
      </Icon>
    </md-button>
    <span
      class="seperator"
      style="margin-top: 0"
    />
    <md-button
      class="md-simple md-button md-black maryoku-btn"
      @click="sendPreviewEmail"
    >
      <Icon src="Campaign/Group 1855.svg">
        Send Me A Preview
      </Icon>
    </md-button>
  </div>
</template>
<script>
export default {

};
</script>
