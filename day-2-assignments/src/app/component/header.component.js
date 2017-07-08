import 'app/styles/header.styles'
import templateUrl from 'app/html/header.template'

const controller =
  class FtHeaderController {
    constructor ($log, appService) {
      'ngInject'
      this.service = appService
      $log.log('ft-header is a go')
    }
    get total () {
      return this.service.total
    }
    set total (val) {
      this.service.total = val
    }
    updateTotal () {
      return this.service.points
    }
 }
export const ftHeader = {
  controller,
  templateUrl,
  controllerAs: 'header'
}
