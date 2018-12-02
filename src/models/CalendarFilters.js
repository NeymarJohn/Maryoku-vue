import Model from './Model';

export default class CalendarYear extends Model {
    resource() {
        return 'years'
    }
}

export default class CalendarEventType extends Model {
  resource() {
    return 'eventTypes'
  }
}

export default class CalendarCountry extends Model {
  resource() {
    return 'countries'
  }
}

export default class CalendarHoliday extends Model {
  resource() {
    return 'holidays'
  }
}
