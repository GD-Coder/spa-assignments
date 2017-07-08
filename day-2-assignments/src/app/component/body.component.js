import 'app/styles/body.styles'
import templateUrl from 'app/html/body.template'

const controller =
  class FtGameController {
    constructor ($log, $state, appService, $window, $location, ftGameSettings, $rootScope) {
      'ngInject'
      this.service = appService
      this.$window = $window
      this.$location = $location
      this.settings = ftGameSettings
      this.$state = $state
      $rootScope.$on(this.$location.$routeChangeStart, this.checkAuth())
      $log.log('ft-game is a go')
    }
    checkAuth () {
      if (this.service.localStorageService.get('isAuthenticated') !== null) {
        this.settings.userInfo.isAuthenticated = true
        this.$state.transitionTo('game')
      }
      let userAuthenticated = this.settings.userInfo.isAuthenticated
      if (userAuthenticated === false) {
        this.$state.transitionTo('login')
      }
    }
    get total () {
      return this.settings.defaultGameSettings.total
    }
    set total (val) {
      this.settings.defaultGameSettings.total = val
    }
    get amount () {
      return this.settings.defaultPointSettings.increment
    }
    set amount (val) {
      this.settings.defaultPointSettings.increment = val
    }
    get baseIncrement () {
      return this.settings.defaultPointSettings.baseincrement
    }
    set baseIncrement (val) {
      this.settings.defaultPointSettings.baseincrement = val
    }
    get stateMod () {
      return this.settings.defaultPointSettings.modifier.amount
    }
    set stateMod (val) {
      this.settings.defaultPointSettings.modifier.amount = val
    }
    get autoclickers () {
      return this.settings.defaultGameSettings.autoclickers
    }
    set autoclickers (val) {
      this.settings.defaultGameSettings.autoclickers = val
    }
    clickAdd () {
      this.service.increment()
      this.service.saveState('points', this.settings.defaultGameSettings.total)
    }
    clickMulti () {
      this.service.multiple()
      this.service.saveState('modifier', this.settings.defaultPointSettings.modifier.amount)
      this.service.saveState('points', this.settings.defaultGameSettings.total)
    }
    clickAuto () {
      this.service.decrementAuto()
      this.service.auto()
      this.autoclickers(this.settings.defaultGameSettings.autoclickers++)
      this.service.saveState('automod', this.settings.defaultGameSettings.autoclickers)
    }
    resetState () {
      this.service.localStorageService.remove('points')
      this.service.localStorageService.remove('modifier')
      this.service.localStorageService.remove('automod')
      this.$window.location.reload()
    }
  }

export const ftGame = {
  controller,
  templateUrl,
  controllerAs: 'game'
}
