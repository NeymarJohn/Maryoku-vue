<template>
  <div class="event-calendar">
    <div class="calendar__header">
      <a href="javascript:;" class="arrow-btn btn-prevmonth" @click.prevent="changeMonth(false)">Prev</a>
      <div class="calendar__title" @click.prevent="backToToday()">
        <span class="caption-month">{{ convertMonthName }}</span>
        <span class="caption-year">{{ current.year }}</span>
      </div>
      <a href="javascript:;" class="arrow-btn btn-nextmonth" @click.prevent="changeMonth(true)">Next</a>
    </div>
    <div class="calendar__body">
      <ul class="calendar__heading">
        <li v-for="item in heading">
          <div class="calendar__item">{{ item }}</div>
        </li>
      </ul>
      <ul class="calendar__content">
        <li v-for="item in buildCalendar">
          <a
            href="javascript:;"
            class="calendar__item"
            :class="{
              'is-today': item.today === true,
              current: item.current === true,
              'has-event': item.number === '12',
            }"
            @click.prevent="getDateData(item)"
          >
            {{ item.number }}
            <div class="event-add-badge" v-if="item.number === '12'">
              <span class=""><md-icon>add</md-icon></span>
            </div>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import moment from "moment";
export default {
  data() {
    return {
      current: {
        year: 0,
        month: 0,
        date: 0,
      },
      today: {
        year: 0,
        month: 0,
        date: 0,
      },
      heading: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    };
  },
  methods: {
    changeMonth(isNext) {
      let month = this.current.month;
      isNext === true ? (month = month + 1) : (month = month - 1);
      if (month <= 0) {
        month = 12;
        this.current.year = this.current.year - 1;
      }
      if (month > 12) {
        month = 1;
        this.current.year = this.current.year + 1;
      }
      this.current.month = month;
      this.current.date = 1;
    },
    getDateData(data) {
      if (data.none === true) {
        return false;
      } else {
        if (data.years === this.current.year && data.month === this.current.month && data.date === this.current.date) {
          return false;
        } else {
          this.current.year = data.years;
          this.current.month = data.month;
          this.current.date = data.date;
        }
      }
    },
    backToToday() {
      this.current.year = this.today.year;
      this.current.month = this.today.month;
      this.current.date = this.today.date;
    },
    getToday() {
      this.today.year = moment().year();
      this.today.month = moment().month() + 1;
      this.today.date = moment().date();
    },
  },
  computed: {
    buildCalendar() {
      let myYears = this.current.year;
      let myMonth = this.current.month;
      let myDate = this.current.date;

      let monthText = "";
      myMonth < 10 ? (monthText = `0${myMonth}`) : (monthText = myMonth.toString());

      let dateArray = [];
      let patchNum = 0;
      let totalDate = moment(`${myYears}-${monthText}`).daysInMonth();
      let week = moment(`${myYears}-${monthText}`).format("d");

      for (let i = 0; i < totalDate; i++) {
        let dateNum = i + 1;
        let isToday = false;
        let isCurrent = false;
        let dateText = "";

        if (myYears === this.today.year && myMonth === this.today.month && dateNum === this.today.date) {
          isToday = true;
        }

        if (dateNum === myDate) {
          isCurrent = true;
        }

        dateNum < 10 ? (dateText = `0${dateNum}`) : (dateText = dateNum.toString());

        let obj = {
          years: myYears,
          month: myMonth,
          date: dateNum,
          number: dateText,
          today: isToday,
          current: isCurrent,
        };
        dateArray.push(obj);
      }

      //
      for (let i = 0; i < week; i++) {
        let obj = {
          number: "",
          none: true,
        };
        dateArray.splice(i, 0, obj);
      }

      //
      dateArray.length % 7 === 0 ? (patchNum = 0) : (patchNum = 7 - (dateArray.length % 7));

      for (let i = 0; i < patchNum; i++) {
        let obj = {
          number: "",
          none: true,
        };
        dateArray.splice(dateArray.length, 0, obj);
      }
      return dateArray;
    },
    convertTwoDigits() {
      let text = "";
      this.current.month < 10 ? (text = `0${this.current.month}`) : (text = this.current.month);
      return text;
    },
    convertMonthName() {
      return moment(this.convertTwoDigits, "MM").format("MMMM");
    },
  },
  created() {
    this.getToday();
    this.backToToday();
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
$color-black: #641856;
$color-white: #ffffff;
$color-gray: #f2f2f2;
$color-gray-default: #e5e5e5;
$color-gray-dark: #929292;
.event-calendar {
  ul {
    list-style: none;
  }

  a {
    text-decoration: none;
  }

  p {
    margin-bottom: 1em;
  }

  h1 {
    font-size: 2rem;
    font-weight: bold;
    line-height: 1.2em;
    margin: 1rem 0px;
    color: $color-white;
    text-align: center;
  }

  /* Wrap */
  .wrap {
    width: calc(100% - 20px);
    max-width: 420px;
    margin: auto;
  }

  /* Calendar */
  .calendar {
    margin: 1rem 0px;
    overflow: hidden;
    border-radius: 7px;
  }

  .calendar__body {
    border-bottom: solid 1px #d5d5d5;
  }
  .calendar__heading,
  .calendar__content {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    > li {
      width: 14.285%;
      text-align: center;
      min-height: 50px;
    }
  }

  .calendar__item {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 10px 0px;
    border-radius: 3px;
    transition: all 0.3s;
    color: $color-black;
    display: inline-block;
    border-radius: 50%;
    &.current {
      width: 46.3px;
      height: 46.3px;
      background-color: #d5d5d5;
      font-weight: bold;
    }
    &.is-today {
      width: 46.3px;
      height: 46.3px;
      background-color: $color-black;
      color: $color-white;
    }
    &.has-event {
      width: 46.3px;
      height: 46.3px;
      box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.42);
      background-color: #ffffff;
      border-radius: 50%;
      position: relative;
      font-weight: bolder;
      font-weight: bold;
      .event-add-badge {
        width: 22px;
        height: 22px;
        background-color: #641856;
        border-radius: 50%;
        color: white;
        font-size: 22px;
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: 1em;
        position: absolute;
        right: 0;
        top: 0;
        transform: translate(30%, -30%);
        padding: 5px;
        i {
          color: white !important;
          font-size: 1rem !important;
        }
      }
    }
  }

  .calendar__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 50px;
    // background-color: $color-gray-default;
    .arrow-btn {
      display: flex;
      font-size: 0rem;
      &::before {
        content: "";
        display: block;
        width: 0;
        height: 0;
        border-style: solid;
      }
      &.btn-prevmonth::before {
        border-width: 4px 0 0 4px;
        width: 15px;
        height: 15px;
        border-color: $color-black;
        border-radius: 3px;
        transform: rotate(-45deg) translateY(50%);
      }
      &.btn-nextmonth::before {
        border-width: 4px 4px 0 0;
        width: 15px;
        height: 15px;
        border-color: $color-black;
        border-radius: 3px;
        transform: rotate(45deg) translateY(50%);
      }
    }
  }

  .calendar__title {
    text-align: center;
    font-size: 1.3rem;
    cursor: pointer;
    font-weight: bold;
  }

  .calendar__heading {
    padding: 0px 5px;
    // background-color: $color-gray;
    border-bottom: solid 1px #d5d5d5;
    .calendar__item {
      color: $color-black;
    }
  }

  .calendar__content {
    padding: 5px;
    position: relative;
    background-color: $color-white;
    .calendar__item {
      font-size: 16px;
      cursor: pointer;
    }
  }

  /* Todolist */
  .todolist {
    margin: 1rem 0px;
    overflow: hidden;
    border-radius: 7px;
    background-color: $color-white;
  }

  .todolist__header {
    font-size: 1.5rem;
    padding: 10px 15px;
  }

  /* Animation */
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
}
</style>