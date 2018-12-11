import Model from './Model';
import EventComponentProperty from './EventComponentProperty';

export default class EventComponent extends Model {
  resource() {
    return 'components'
  }

  componentProperties() {
    return this.hasMany(EventComponentProperty);
  }
}
