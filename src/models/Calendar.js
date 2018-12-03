import Model from './Model';
import CalendarIcon from './CalendarIcon';
import CalendarColor from './CalendarColor';
import CalendarStatistics from './CalendarStatistics';
import { CalendarYear, CalendarEventType, CalendarCountry, CalendarHoliday } from './';

export default class Calendar extends Model {
  resource() {
    return 'calendars'
  }

  calendarEvents() {
    return this.hasMany(CalendarEvent)
  }

  icons() {
    return this.hasMany(CalendarIcon)
  }

  colors() {
    return this.hasMany(CalendarColor)
  }

  statistics(){
    return this.hasMany(CalendarStatistics)
  }

  years(){
    return this.hasMany(CalendarYear);
  }

  eventTypes(){
    return this.hasMany(CalendarEventType);
  }

  countries(){
    return this.hasMany(CalendarCountry);
  }

  holidays(){
    return this.hasMany(CalendarHoliday);
  }
}
