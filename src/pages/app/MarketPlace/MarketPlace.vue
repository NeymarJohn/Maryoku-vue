<template>
  <div style="background:#fff">
    <div class="text-center">
      <img />
      <div class="md-headline">
        Discover great vendors, tried and vetted by event planners
        <div class="md-headline">just like you</div>
      </div>
      <div class="search-section">
        <md-field md-inline>
          <md-input v-model="inline"></md-input>
        </md-field>
        <md-button>Search</md-button>
      </div>
    </div>
    <div>
      <!--TODO : Filters Here-->
    </div>

    <div class="md-layout md-gutter ">
      <div class="md-layout-item md-size-30 sidebar-filters">
        <div class="list">
          <md-list :md-expand-single="expandSingle">
            <md-list-item md-expand :md-expanded="true">
                     <md-icon></md-icon>
              <span class="md-list-item-text md-headline">Category</span>
              <md-list slot="md-expand">
                <md-list-item class="md-inset">All Categories</md-list-item>
                <md-list-item v-for="(item,index) in items" :key="index" class="md-inset">Offsite</md-list-item>
              </md-list>
            </md-list-item>
               <md-list-item md-expand :md-expanded="true">
                     <md-icon></md-icon>
              <span class="md-list-item-text md-headline">Tags</span>
              <md-list slot="md-expand">
                <md-list-item v-for="(item,index) in items" :key="index" class="md-inset">Trade Shows</md-list-item>
              </md-list>
            </md-list-item>
               <md-list-item md-expand   :md-expanded="true">
                     <md-icon></md-icon>
              <span class="md-list-item-text md-headline">Rating</span>
              <md-list slot="md-expand" :md-expanded="true">
                <md-list-item class="md-inset">Show All</md-list-item>
                <md-list-item v-for="(item,index) in items" :key="index" class="md-inset">1 star and higher</md-list-item>
              </md-list>
            </md-list-item>
               <md-list-item md-expand :md-expanded="true">
                     <md-icon></md-icon>
              <span class="md-list-item-text md-headline">Good For</span>
              <md-list slot="md-expand">
                <md-list-item class="md-inset">All Categories</md-list-item>
                <md-list-item v-for="(item,index) in items" :key="index" class="md-inset">20-50 Employees</md-list-item>
              </md-list>
            </md-list-item>
          </md-list>
        </div>
      </div>
      <div class="md-layout-item">
        <event-card v-for="(item,index) in items" :key="index" />
        <div></div>
      </div>
    </div>
  </div>
</template>
<script>
import EventSidePanel from "@/pages/app/Events/EventSidePanel";
import EventCard from "./EventCard.vue";
export default {
  components: {
    EventCard
  },
  data() {
    return {
      items: [
        { message: "Foo" },
        { message: "Bar" },
        { message: "Bar" },
        { message: "Bar" },
        { message: "Bar" },
        { message: "Bar" }
      ]
    };
  },
  mounted() {
    this.$auth.currentUser(this, true, () => {});
  },
  methods: {
    openEventModal() {},
    openYearPlanner() {
      this.$router.push({ path: `/planner` });
    },
    openVendorsUpload() {
      this.$router.push({ path: `/vendors` });
    }
  }
};
</script>
<style lang="scss" scoped>
.get-started {
  background-color: #26c6da;
  height: 100vh;
}

.get-started-card-title {
  font-weight: 400 !important;
}
.search-section {
  display: flex;
  width: 90%;
  height: 40px;

  margin: auto;
  border-radius: 10px;

  .md-field {
    height: 40px;
    margin: 0;
    background: #eee;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
  }
  .md-field::after,
  .md-field::before {
    content: none;
  }

  button {
    background: #ff527d !important;
    border-top-right-radius: 40%;
    border-bottom-right-radius: 40%;
    margin: 0;
  }
}

.get-started-card-description {
  min-height: 100px;
  font-size: 16px;
  font-weight: 300;
  color: #777;
}
.full-control {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap-reverse;
}

.full-control > .md-list {
  max-width: 100%;
  height: 400px;
  display: inline-block;
  overflow: auto;
  border: 1px solid rgba(#000, 0.12);
  vertical-align: top;
}

.control {
  min-width: 250px;
  display: flex;
  flex-direction: column;
  padding: 16px;
}
.sidebar-filters{
    padding: 25px;
}
.md-layout{
    padding: 12px;
}
</style>
