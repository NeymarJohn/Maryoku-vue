import Model from './Model';
import CalendarEvent from './CalendarEvent';

export default class CompanyLogoImage extends Model {
  resource () {
    return 'company/logo'
  }

//   event() {
//     return this.belongsTo(CalendarEvent)
//   }
}
