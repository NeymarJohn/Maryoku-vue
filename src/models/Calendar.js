import Model from './Model';
import CalendarIcon from './CalendarIcon';
import CalendarColor from './CalendarColor';
import CalendarStatistics from './CalendarStatistics';
import CalendarYear from './CalendarYear';
import CalendarEventType from './CalendarEventType';
import CalendarCountry from './CalendarCountry';
import CalendarHoliday from './CalendarHoliday';
import CalendarEvent from './CalendarEvent';
import CalendarEventQuery from './CalendarEventQuery';

export default class Calendar extends Model {
  resource() {
    return 'calendars'
  }

  calendarEvents() {
    return this.hasMany(CalendarEvent)
  }

  queryEvents() {
    return new CalendarEventQuery().for(this);
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
