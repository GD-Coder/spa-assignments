let score = 0
let stopFlag = 0
let cookie = localStorage.getItem('score')
const errorMsg = 'You can\'t use that yet'
const displayScore = (a) => {
checkScore()
return $('#score').html(' ' + a) }
const add = () => {
  score++
  return score }
const addTimed = () => {
  if (stopFlag === 0) {
    displayScore(add())
    setTimeout(addTimed, 1000)
    localStorage.setItem('score', score)
  } else {
    stopFlag = 0
  } checkScore() }
const clearScore = () => {
  localStorage.removeItem('score')
  stopFlag = 1
  score = 0
  displayScore(score) }
const checkScore = () => {
  if (score >= 100) {
    $('#auto_button').fadeIn(300)
  } else if (score >= 10 && score < 100) {
    $('#multi_button').fadeIn(300)
    $('#auto_button').fadeOut(300)
  } else {
    $('#auto_button').fadeOut(300)
    $('#multi_button').fadeOut(300)
  } }
$(document).ready(() => {
  if(cookie !== null) {
    score = cookie
    displayScore(score)
    localStorage.removeItem('score')
  }
  $('.button')
  .click((e) => {
    switch (e.target.id) {
      case 'auto_button':
      score < 100 ? alert(errorMsg) : addTimed()
        if (score > 100) {score = score - 100 }
        break
      case 'reset_button':
        clearScore()
        break
      case 'multi_button':
      score < 10 ? alert(errorMsg) : score = (score * 1.2) - 10
        break
      default:
        displayScore(add())
    }
    displayScore(score)
    localStorage.setItem('score', score)
  }) })
