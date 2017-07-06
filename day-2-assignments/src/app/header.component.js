import 'app/header.styles'
import templateUrl from 'app/header.template'

const controller =
  class FtHeaderController {
    constructor ($log, appService, $window) {
      'ngInject'
      this.service = appService
      this.$window = $window
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
    resetState () {
      this.service.localStorageService.remove('points')
      this.service.localStorageService.remove('modifier')
      this.service.localStorageService.remove('automod')
      this.service.total = 0
      this.service.state.modifier = 0
      this.service.automod = 0
      this.service.amount = 1
      this.$window.location.reload()
    }
 }
export const ftHeader = {
  controller,
  templateUrl,
  controllerAs: 'header'
}
