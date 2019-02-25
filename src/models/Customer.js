import Model from './Model'
import TeamMembers from './TeamMembers'

export default class Customer extends Model {
    resource() {
        return 'customers'
    }
}
