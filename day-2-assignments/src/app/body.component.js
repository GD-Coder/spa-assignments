import 'app/body.styles'
import templateUrl from 'app/body.template'

const controller =
  class FtBodyController {
    constructor ($log, appService) {
      'ngInject'
      this.service = appService
      $log.log('ft-body is a go')
    }
    get total () {
      return this.service.total
    }
    set total (val) {
      this.service.total = val
    }
    get amount () {
      return this.service.amount
    }
    set amount (val) {
      this.service.amount = val
    }
    get baseIncrement () {
      return this.service.state.base.increment
    }
    set baseIncrement (val) {
      this.service.base.state.increment = val
    }
    get stateMod () {
      return this.service.state.modifier
    }
    set stateMod (val) {
      this.service.state.modifier = val
    }
    clickAdd () {
      this.service.increment()
      this.service.saveState('points', this.service.total)
    }
    clickMulti () {
      this.service.decrementTen()
      this.service.multiple()
      this.service.saveState('modifier', this.service.state.modifier)
      this.service.saveState('points', this.service.total)
    }
    clickAuto () {
      this.service.decrementHundred()
      this.service.auto()
      this.service.automod++
      this.service.saveState('automod', this.service.automod)
    }
  }

export const ftBody = {
  controller,
  templateUrl,
  controllerAs: 'body'
}
