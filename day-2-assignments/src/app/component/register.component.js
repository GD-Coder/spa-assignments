import 'app/styles/register.styles'
import templateUrl from 'app/html/register.template'

const controller = class FtRegisterController {
  constructor ($log, $state, $location, $http, ftGameSettings, $window, $rootScope, appService) {
    'ngInject'
    this.service = appService
    this.settings = ftGameSettings
    this.$location = $location
    this.$window = $window
    this.$state = $state
    this.$http = $http
    $rootScope.$on(this.$location.$routeChangeStart, this.checkAuth())
    $log.log('ft-register is a go')
  }
}

export const ftRegister = {
  controller,
  templateUrl,
  controllerAs: 'register'
}
