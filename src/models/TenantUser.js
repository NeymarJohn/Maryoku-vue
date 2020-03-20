import Model from './Model'

export default class TenantUser extends Model {
  resource () {
    return 'tokens'
  }
}
