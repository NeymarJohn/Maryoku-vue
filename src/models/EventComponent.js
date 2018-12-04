import Model from './Model';
import CalendarEventInspiration from './CalendarEventInspiration';

export default class EventComponent extends Model {
  resource() {
    return 'components'
  }

  componentProperties() {
    return this.hasMany(EventComponentProperty);
  }
}
