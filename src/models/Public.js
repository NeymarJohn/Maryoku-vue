import Model from './Model';
import CalendarIcon from './CalendarIcon';
import CalendarColor from './CalendarColor';
import CalendarStatistics from './CalendarStatistics';
import { CalendarYear, CalendarEventType, CalendarCountry, CalendarHoliday } from './CalendarFilters';

export default class Public extends Model {
  resource() {
    return ''
  }

  icons() {
    return this.hasMany(CalendarIcon)
  }

  colors() {
    return this.hasMany(CalendarColor)
  }

  currencies(){
    return this.hasMany(Currency)
  }
}
