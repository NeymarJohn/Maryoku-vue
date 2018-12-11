import Model from './Model';
import Calendar from './Calendar';
import CalendarEventInspiration from './CalendarEventInspiration';

export default class CalendarEvent extends Model {
  resource() {
    return 'events'
  }

  components() {
    return this.components;
  }

  calendar() {
    return this.belongsTo(Calendar)
  }

  inspirations() {
    return this.hasMany(CalendarEventInspiration)
  }
}
