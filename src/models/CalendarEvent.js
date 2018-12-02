import Model from './Model';
import CalendarEventInspiration from './CalendarEventInspiration';

export default class CalendarEvent extends Model {
    resource() {
        return 'events'
    }

    inspirations() {
        return this.hasMany(CalendarEventInspiration)
    }
}
