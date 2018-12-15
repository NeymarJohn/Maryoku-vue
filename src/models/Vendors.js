import Model from './Model'
import VendorCategories from './VendorCategories'

export default class Vendors extends Model {
  resource() {
    return 'vendors'
  }

    categories() {
        return this.hasMany(VendorCategories)
    }
}
