<template>
  <div class="md-layout">
    <div class="md-layout-item md-size-100">
      <md-card>
        <md-card-header class="md-card-header-icon md-card-header-rose">
          <div class="card-icon">
            <md-icon>assignment</md-icon>
          </div>
          <h4 class="title">To Do Today</h4>
        </md-card-header>
        <md-card-content>
          <md-table v-model="todoToday" class="table-striped table-hover">
            <md-table-row slot="md-table-row" slot-scope="{ item }">
              <!--<md-table-cell md-label="#">{{ item.id }}</md-table-cell>-->
              <md-table-cell md-label="What">{{ item.what }}</md-table-cell>
              <md-table-cell md-label="Event">{{ item.event }}</md-table-cell>
              <md-table-cell md-label="When">{{ item.when }}</md-table-cell>
              <!--<md-table-cell md-label="Salary">{{ item.salary }}</md-table-cell>-->
              <md-table-cell md-label="Actions" :class="getAlignClasses(item)">
                <md-button class="md-just-icon md-centered" :class="getClass(item.icon1, item.id)">
                  <md-icon class="md-rose">{{ item.icon1 }}</md-icon>
                  <md-tooltip md-direction="right">Set Reminder</md-tooltip>
                </md-button>
                <!--<md-button class="md-just-icon" :class="getClass(item.icon2, item.id)"><md-icon>{{ item.icon2 }}</md-icon></md-button>
                <md-button class="md-just-icon" :class="getClass(item.icon3, item.id)"><md-icon>{{ item.icon3 }}</md-icon></md-button>-->
              </md-table-cell>
            </md-table-row>
          </md-table>
        </md-card-content>
      </md-card>
    </div>

    <div class="md-layout-item md-size-100">
      <md-card>
        <md-card-header class="md-card-header-icon md-card-header-rose">
          <div class="card-icon">
            <md-icon>assignment</md-icon>
          </div>
          <h4 class="title">Get Ready for Tomorrow</h4>
        </md-card-header>
        <md-card-content>
          <md-table v-model="todoTomorrow" class="table-striped table-hover">
            <md-table-row slot="md-table-row" slot-scope="{ item }">
              <!--<md-table-cell md-label="#">{{ item.id }}</md-table-cell>-->
              <md-table-cell md-label="What">{{ item.what }}</md-table-cell>
              <md-table-cell md-label="Event">{{ item.event }}</md-table-cell>
              <md-table-cell md-label="When">{{ item.when }}</md-table-cell>
              <!--<md-table-cell md-label="Salary">{{ item.salary }}</md-table-cell>-->
              <md-table-cell md-label="Actions" :class="getAlignClasses(item)">
                <md-button class="md-just-icon" :class="getClass(item.icon1, item.id)">
                  <md-icon class="md-rose">{{ item.icon1 }}</md-icon>
                  <md-tooltip md-direction="right">Set Reminder</md-tooltip>
                </md-button>
                <!--<md-button class="md-just-icon" :class="getClass(item.icon2, item.id)"><md-icon>{{ item.icon2 }}</md-icon></md-button>
                <md-button class="md-just-icon" :class="getClass(item.icon3, item.id)"><md-icon>{{ item.icon3 }}</md-icon></md-button>-->
              </md-table-cell>
            </md-table-row>
          </md-table>
        </md-card-content>
      </md-card>
    </div>

  </div>
</template>

<script>

  import CalendarColor from "src/models/CalendarColor";
  import CalendarIcon from "src/models/CalendarIcon";
  import Currency from "src/models/Currency";

  export default {
    components: {
    },
    mounted() {
      Currency.get().then(icons => {
        console.log(icons);
      }, (error) => {
        console.log(error);
      });
    },
    data() {
      return {
        todoToday: [
          {
            id: 1,
            what: "Do something great",
            event: "4th July",
            when: "9:00",
            icon1: "add_alert"
          },
          {
            id: 2,
            what: "Something even better",
            event: "Happy Hour",
            when: "10:00",
            icon1: "add_alert"
          }

        ],
        todoTomorrow: [
          {
            id: 1,
            what: "Do something great",
            event: "Women's day",
            when: "9:00",
            icon1: "add_alert"
          },
          {
            id: 2,
            what: "Something even better",
            event: "Off-Site",
            when: "10:00",
            icon1: "add_alert"
          }

        ],
      };
    },
    methods: {
      getClass: function(item, id) {
        let classes = "";
        switch (item) {
          case "person": {
            classes = "md-info";
            break;
          }
          case "edit": {
            classes = "md-success";
            break;
          }
          case "close": {
            classes = "md-danger";
            break;
          }
        }
        switch (id) {
          case 1:
          case 5: {
            break;
          }
          case 2:
          case 4: {
            classes = `${classes} md-round`;
            break;
          }
          case 3: {
            classes = `${classes} md-simple`;
            break;
          }
        }
        return classes;
      },
      getAlignClasses: ({ id }) => ({
        "text-right": id
      }),
    }
  };
</script>
