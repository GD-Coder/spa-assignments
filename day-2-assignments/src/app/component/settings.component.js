import 'app/styles/settings.styles'
import templateUrl from 'app/html/settings.template'

const controller =
  class FtSettingsController {
    constructor ($log, $state, appService, ftGameSettings, $location, $window, $rootScope) {
      'ngInject'
      this.service = appService
      this.settings = ftGameSettings
      this.$location = $location
      this.$window = $window
      this.$state = $state
      $rootScope.$on(this.$location.$routeChangeStart, this.checkAuth())
      $log.log('ft-settings is a go')
    }
    checkAuth () {
      if (this.service.localStorageService.get('isAuthenticated') !== null) {
        let wallp = this.service.localStorageService.get('wallpaper')
        ng.element(document).find('body').css('background-image', wallp)
        this.settings.userInfo.isAuthenticated = true
        this.$state.transitionTo('settings')
      }
      let userAuthenticated = this.settings.userInfo.isAuthenticated
      if (userAuthenticated === false) {
        this.$state.transitionTo('login')
      } else {
        // alert(userAuthenticated)
        this.$state.transitionTo('settings')
      }
    }
    changeMetal () {
      ng.element(document).find('body').css('background-image', 'url(/images/bg5.jpg)')
      this.service.localStorageService.set('wallpaper', 'url(/images/bg5.jpg)')
    }
    changeAntithesis () {
      ng.element(document).find('body').css('background-image', 'url(/images/bg3.jpg)')
      this.service.localStorageService.set('wallpaper', 'url(/images/bg3.jpg)')
    }
    changeBlue () {
      ng.element(document).find('body').css('background-image', 'url(/images/bg6.jpg)')
      this.service.localStorageService.set('wallpaper', 'url(/images/bg6.jpg)')
    }
    changeWarped () {
      ng.element(document).find('body').css('background-image', 'url(/images/bg7.jpg)')
      this.service.localStorageService.set('wallpaper', 'url(/images/bg7.jpg)')
    }
    changeGrid () {
      ng.element(document).find('body').css('background-image', 'url(/images/bg4.jpg)')
      this.service.localStorageService.set('wallpaper', 'url(/images/bg4.jpg)')
    }
}
export const ftSettings = {
  controller,
  templateUrl,
  controllerAs: 'settings'
}
