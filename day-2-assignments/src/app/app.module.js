import { AppService } from 'app/app.service'

import { ftApp } from 'app/app.component'
import { ftHeader } from 'app/header.component'
import { ftBody } from 'app/body.component'
import { ftLogin } from 'app/login.component'

import { config } from 'app/app.config'
import localStorage from 'angular-local-storage'

export default ng
  .module('ft.buttons', [localStorage])
  .service('appService', AppService)
  .component('ftApp', ftApp)
  .component('ftHeader', ftHeader)
  .component('ftBody', ftBody)
  .component('ftLogin', ftLogin)
  .config(config)
  .name
