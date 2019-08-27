import Model from './Model';
import Calendar from './Calendar';
import CalendarEventInspiration from './CalendarEventInspiration';
import CalendarEventImage from './CalendarEventImage';
import EventTimelineItem from './EventTimelineItem';
import EventInteraction from './EventInteraction';

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

  eventImages() {
    return this.hasMany(CalendarEventImage)
  }

  inspirations() {
    return this.hasMany(CalendarEventInspiration)
  }

  timelineItems(){
    return this.hasMany(EventTimelineItem)
  }

  interactions(){
    return this.hasMany(EventInteraction)
  }
}
