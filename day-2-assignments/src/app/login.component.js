import 'app/login.styles'
import templateUrl from 'app/login.template'

const controller = class FtLoginController {
  constructor ($log) {
    'ngInject'
    $log.debug('ft-login is a go')
  }
}

export const ftLogin = {
  controller,
  templateUrl,
  controllerAs: 'login'
}
