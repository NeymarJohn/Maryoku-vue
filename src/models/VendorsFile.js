import Model from './Model'
import VendorCategories from './VendorCategories'

export default class VendorsFile extends Model {
  resource() {
    return 'vendorsFile'
  }
    setHeader (config) {
         this.$http.defaults.headers['Content-Type'] = 'multipart/form-data';
    }
}
