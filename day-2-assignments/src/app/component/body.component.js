import 'app/styles/body.styles'
import templateUrl from 'app/html/body.template'

const controller =
  class FtGameController {
    constructor ($log, $state, appService, $window, $location, ftGameSettings, $rootScope, $timeout, $interval, $http) {
      'ngInject'
      'ngAnimate'
      this.service = appService
      this.$window = $window
      this.$location = $location
      this.settings = ftGameSettings
      this.$state = $state
      this.$timeout = $timeout
      this.settings = ftGameSettings
      $rootScope.$on(this.$location.$routeChangeStart, this.checkAuth())
      $log.log('ft-game is a go')
    }
    checkAuth () {
      if (this.service.localStorageService.get('isAuthenticated') !== null) {
        let wallp = this.service.localStorageService.get('isAuthenticated')
        ng.element(document).find('body').css('background-image', wallp)
        this.settings.userInfo.isAuthenticated = true
        this.settings.userInfo.name = this.service.localStorageService.get('firstName')
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
    this.message = this.settings.defaultPointSettings.modifier.cost
      this.$timeout(() => {
        this.messageShow = true
        this.$timeout(() => {
          this.messageShow = false
        }, 300)
      }, 200)
      this.service.multiple()
      this.service.saveState('modifier', this.settings.defaultPointSettings.modifier.amount)
      this.service.saveState('points', this.settings.defaultGameSettings.total)
    }
    clickAuto () {
      this.message = this.settings.defaultPointSettings.autoclicker.cost
      this.$timeout(() => {
        this.messageShow = true
        this.$timeout(() => {
          this.messageShow = false
        }, 300)
      }, 200)
      this.settings.defaultGameSettings.autoclickers++
      this.service.decrementAuto()
      this.service.auto()
    }
    resetState () {
      this.settings.defaultGameSettings.autoclickers = 0
      this.settings.defaultGameSettings.total = 0
      this.settings.defaultPointSettings.increment = 1
      this.service.localStorageService.remove('points')
      this.service.localStorageService.remove('modifier')
      this.service.localStorageService.remove('automod')
      this.settings.defaultPointSettings.modifier.amount = 0.2
      this.settings.defaultGameSettings.modifiers = 0
      this.$window.location.reload()
    }
    logout () {
      this.service.localStorageService.remove('isAuthenticated')
      this.settings.userInfo.isAuthenticated = false
      this.$state.transitionTo('login')
    }
  }

export const ftGame = {
  controller,
  templateUrl,
  controllerAs: 'game'
}
