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
    this.$http = $http
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
    this.$http({
      method: 'POST',
      url: 'http://localhost:8080/validate/username/credentials/@' + this.username + '',
      data: {username: this.username, password: this.password}
    }).then(this.successCallback = (response) => {
      if (response.data === true) {
        this.$http.get('http://localhost:8080/users/@' + this.username + '')
       .then((response) => {
         this.settings.user.firstname = response.data.profile.firstName
         this.service.saveState('firstName', this.settings.user.firstname)
       })
        this.settings.userInfo.isAuthenticated = true
        this.service.saveState('isAuthenticated', true)
        this.$state.transitionTo('game')
      } else {
        this.error = 'Username or password are incorrect, please try again.'
      }
    }, this.errorCallback = (response) => {
      this.error = 'Username or password are incorrect, please try again.'
    })
  }
}
export const ftLogin = {
  controller,
  templateUrl,
  controllerAs: 'login'
}
