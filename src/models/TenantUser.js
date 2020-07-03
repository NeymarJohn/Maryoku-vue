import Model from './Model'

export default class TenantUser extends Model {
  constructor(email, password) {
    super()
    this.email = email;
    this.password = password;
  }
  resource () {
    return 'tokens'
  }
}
