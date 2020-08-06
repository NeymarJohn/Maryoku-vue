import moment from "moment";

const formatScheduleTime = (date) => {
  return moment(new Date(date)).format("hh:mm A");
}

const formatScheduleDay = (date, format) => {
  if (!format) format = "MM/DD/YY"
  if (typeof date == "number") {
    return moment(new Date(date)).format(format);
  }
  return moment(date).format(format);
}

export default {
  formatScheduleTime,
  formatScheduleDay
}