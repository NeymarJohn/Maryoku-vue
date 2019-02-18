import Model from './Model'
import TeamMembers from './TeamMembers'

export default class Me extends Model {
    resource() {
        return 'me'
    }

    customer() {
      return this.belongsTo(Customer);
    }
}
