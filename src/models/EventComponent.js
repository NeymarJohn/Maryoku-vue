import Model from './Model';
import EventComponentProperty from './EventComponentProperty';
import EventComponentTodo from './EventComponentTodo';
import EventComponentValue from './EventComponentValue';
import EventComponentVendor from './EventComponentVendor';

export default class EventComponent extends Model {
  resource() {
    return 'components'
  }

  componentProperties() {
    return this.hasMany(EventComponentProperty);
  }

  todos() {
    return this.hasMany(EventComponentTodo);
  }

  values() {
    return this.hasMany(EventComponentValue);
  }

  vendors() {
    return this.hasMany(EventComponentVendor);
  }
}
