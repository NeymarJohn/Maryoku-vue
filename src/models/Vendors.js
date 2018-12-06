import Model from './Model'

export default class Vendors extends Model {
  resource() {
    return 'vendors'
  }

    categories() {
        return this.hasMany(VendorCategories)
    }
}
