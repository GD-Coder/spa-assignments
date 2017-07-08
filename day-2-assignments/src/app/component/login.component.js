import 'app/styles/login.styles'
import templateUrl from 'app/html/login.template'

const controller = class FtLoginController {
  constructor ($log, $state, $location, $http, ftGameSettings, $window, $rootScope, appService) {
    'ngInject'
    this.service = appService
    this.settings = ftGameSettings
    this.$location = $location
    this.$window = $window
    this.$state = $state
    $rootScope.$on(this.$location.$routeChangeStart, this.checkAuth())
    $log.log('ft-login is a go')
  }
  checkAuth () {
    if (this.service.localStorageService.get('isAuthenticated') !== null) {
      this.settings.userInfo.isAuthenticated = true
      this.$state.transitionTo('game')
    }
    let userAuthenticated = this.settings.userInfo.isAuthenticated
    if (userAuthenticated === false) {
      this.$state.transitionTo('login')
    } else {
      this.$state.transitionTo('body')
    }
  }
  loginSubmit () {
    let username = this.settings.userInfo.username
    let password = this.settings.userInfo.password
    let user = this.username
    let pass = this.password
    if ((username === user && password === pass)) {
      this.settings.userInfo.isAuthenticated = true
      this.service.saveState('isAuthenticated', true)
      this.$state.transitionTo('game')
    } else {
      this.error = 'Username or password are incorrect, please try again.'
    }
  }
}
export const ftLogin = {
  controller,
  templateUrl,
  controllerAs: 'login'
}
