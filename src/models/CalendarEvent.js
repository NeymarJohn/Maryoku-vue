import Model from './Model';
import Calendar from './Calendar';
import CalendarEventInspiration from './CalendarEventInspiration';
import CalendarEventImage from './CalendarEventImage';

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

  images() {
    return this.hasMany(CalendarEventImage)
  }

  inspirations() {
    return this.hasMany(CalendarEventInspiration)
  }
}
