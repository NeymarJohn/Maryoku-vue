<template>
  <div class="proposal-final-step">
    <div class="font-size-40 font-bold header">How does our bidding process work?</div>
    <div class="tabs d-flex">
      <div
        class="tab"
        v-for="(tab, index) in tabs"
        :class="{ active: selectedTab == index }"
        @click="selectTab(index)"
        :key="tab.title"
      >
        <img :src="`${$iconURL}Submit+Proposal/${tab.icon}`" />
        <div class="font-bold font-size-22">{{ tab.title }}</div>
      </div>
    </div>
    <div class="tab-content">
      <h2 class="font-bold-extra">{{ tabs[selectedTab].title }}</h2>
      <template v-if="selectedTab==0">
      <p>
        <h3 class="font-size-22 font-bold"> What can I do to make my chances better?</h3>
        <div>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
        </div>
      </p>
      <p>
        <h3 class="font-size-22 font-bold"> What if I submitted the offer and I am interested in canceling?</h3>
        <div>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren
        </div>
      </p>
      <p>
        <h3 class="font-size-22 font-bold"> What if I submitted the offer and I am interested in canceling?</h3>
        <div>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren
        </div>
      </p>
      </template>
      <template v-if="selectedTab == 4">
        <p>
          <h3 class="font-size-22 font-bold"> Can I improve my chances?</h3>
          <div>
            Sure. Once we finish our thorough examination and it's down to you and one more vendor, then you can tweet our post and share it with as many friends as possible. By doing so, you'll improve your chances to win Significantly
          </div>
        </p>
        <div class="white-card sharing-form">
          <div class="upoad-photo">
            <md-button class="md-simple maryoku-btn md-red"><md-icon>add</md-icon><br/><div>Add Photo</div></md-button>
          </div>
          <p>
          <h3 class="font-size-22 font-bold"> POST TO SHARE</h3>
          <div>
            Sure. Once we finish our thorough examination and it's down to you and one more vendor, then you can tweet our post and share it with as many friends as possible. By doing so, you'll improve your chances to win Significantly
          </div>
          <hr/>
          <div>
            
          </div>
        </p>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selectedTab: 0,
      tabs: [
        { title: "NOW WHAT?", icon: "final-tab-1.png" },
        { title: "HOW DO WE PICK?", icon: "final-tab-2.png" },
        { title: "IF I WON?", icon: "final-tab-3.png" },
        { title: "WHAT ELSE?", icon: "final-tab-4.png" },
        { title: "UP YOUR CHANCES", icon: "final-tab-5.png" },
      ],
    };
  },
  methods: {
    selectTab(tabIndex) {
      this.selectedTab = tabIndex;
    },
  },
};
</script>
<style lang="scss" scoped>
.proposal-final-step {
  margin: 40px 64px;
  box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);
  background-color: #f3f7fd;
  .header {
    padding: 40px 80px;
  }
  .tabs {
    border-top: solid 1px #c5c7cb;
    border-bottom: solid 1px #c5c7cb;
    .tab {
      flex-grow: 1;
      text-align: center;
      padding: 20px;
      border-right: solid 1px #c5c7cb;
      width: 20%;
      &:last-child {
        border-right: none;
      }
      &.active {
        border-bottom: solid 4px #f51355;
      }
    }
  }
  .tab-content {
    background-color: white;
    padding: 80px 20%;
    h2 {
      margin: 0;
      font-size: 40px;
    }
    p {
      margin-bottom: 40px;
    }
    .sharing-form {
      padding: 60px;
      .upoad-photo {
        border: dashed 1px #f51355;
        padding: 150px 10px;
        text-align: center;
      }
    }
  }
}
</style>