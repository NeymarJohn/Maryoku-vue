import Model from './Model'

export default class TenantUser extends Model {
  constructor(email='', password='', name='', company='', role='' ) {
    super()
    this.email = email;
    this.password = password;
    this.name = name;
    this.company = company;
    this.role = role;
  }
  resource () {
    return 'tokens'
  }
}
