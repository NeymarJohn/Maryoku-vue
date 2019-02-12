import Model from './Model'
import TeamMembers from './TeamMembers'

export default class Customers extends Model {
    resource() {
        return 'customers'
    }
}
