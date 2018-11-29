import Model from './Model'
import TeamMembers from './TeamMembers'

export default class Teams extends Model {
  resource() {
    return 'teams'
  }

  members() {
    return this.hasMany(TeamMembers)
  }
}
