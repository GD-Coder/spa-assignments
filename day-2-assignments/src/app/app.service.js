export class AppService {
  amount = 1
  total = 0
  automod = 0
  state = {
    points: 0,
    modifier: 0,
    base: {
      increment: 1,
      modifier: 0.2
    } }
constructor($interval, localStorageService, $timeout) {
  'ngInject'
  this.$interval = $interval
  this.localStorageService = localStorageService
  this.$timeout = $timeout
  this.$timeout(() => {
    let points = this.localStorageService.get('points')
    let mod = this.localStorageService.get('modifier')
    let autom = this.localStorageService.get('automod')
    if (points > 0) {this.total = points}
    if (mod > 0) {this.amount = this.amount + mod
    this.state.modifier = mod
    if (autom > 0) {this.automod = autom
    }}
    for(let i = 0; i < autom; i++){this.auto()}
    // alert(points)
    // alert(mod)
    // alert(autom)
  }, 1000)
}
increment() {
  this.total += this.amount
}
multiple() {
  let smod = this.state.modifier
  let bmod = this.state.base.modifier
  if (smod === 0) {
  this.total = this.amount * bmod
  this.amount = this.amount + bmod
  this.state.modifier = bmod
  } else {
  this.amount = this.amount + smod + bmod
  this.total = this.total + this.amount * smod
  this.state.modifier = smod + bmod
} }
decrementTen() {
  this.total -= 10
}
decrementHundred() {
  this.total -= 100
}
saveState(key,val) {
  this.localStorageService.set(key, val)
}
get points () {
  return this.service.state.points
}
set points (val) {
  this.service.state.points = val
}
auto() {
  this.$interval(() => {this.total++
  this.saveState('points', this.total)}, 1000)
} }
