import Model from './Model'
import Events from './Event'

export default class Planners extends Model {
  resource () {
    return 'planners'
  }

  events () {
    return this.hasMany(Events)
  }
}
