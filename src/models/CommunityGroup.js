import Model from './Model'
import CommunityAsks from './CommunityAsks'

export default class CommunityGroup extends Model {
  resource() {
    return 'teams'
  }

  asks() {
    return this.hasMany(CommunityAsks)
  }
}
