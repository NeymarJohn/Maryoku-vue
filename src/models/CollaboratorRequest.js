import Model from './Model'
import VendorCategories from './VendorCategories'

export default class CollaboratorRequest extends Model {
  resource() {
    return 'collaborator-request';
  }
}
