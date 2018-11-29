import Model from './Model'
import TeamMembers from './TeamMembers'

export default class Teams extends Model {
    resource() {
        return 'teams'
    }

    invite() {

    }

    members() {
        return this.hasMany(TeamMembers)
    }
}
