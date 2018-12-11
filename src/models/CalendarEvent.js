import Model from './Model';
import CalendarEventInspiration from './CalendarEventInspiration';

export default class CalendarEvent extends Model {
  resource() {
    return 'events'
  }

  components() {
    return this.components;
  }

  inspirations() {
    return this.hasMany(CalendarEventInspiration)
  }
}
