let score = 0
let stopFlag = 0
let cookie = localStorage.getItem('score')
const errorMsg = 'You can\'t use that yet'
const displayScore = (a) => { return $('#score').html(' ' + a) }
const add = () => {
  score++
  return score
}
const addTimed = () => {
  if (stopFlag === 0) {
    displayScore(add())
    setTimeout(addTimed, 1000)
  } else {
    stopFlag = 0
  }
}
const clearScore = () => {
  localStorage.removeItem('score')
  stopFlag = 1
  score = 0
  displayScore(score)
}
const checkScore = () => {
  if (score > 100) {
    $('#auto_button').css('display', 'block')
    $('#mult_button').css('display', 'block')
  } else if (score > 9 && score < 100) {
    $('#mult_button').css('display', 'block')
    $('#auto_button').css('display', 'none')
  } else {
    $('#auto_button').css('display', 'none')
    $('#mult_button').css('display', 'none')
  }
}
$(document).ready(() => {
  if(cookie !== null) {
    score = cookie
    displayScore(score)
    checkScore()
  }
  $('.button')
  .click((e) => {
    let btn = e.target.id
    switch (btn) {
      case 'auto_button':
      score < 100
      ? alert(errorMsg)
      : score = score - 100
        addTimed()
        break
      case 'mult_button':
      score < 10
      ? alert(errorMsg)
      : score = (score * 1.2) - 10
        displayScore(score)
        break
      case 'reset_button':
        clearScore()
        displayScore(score)
        break
      default:
        displayScore(add())
    }
    checkScore()
    localStorage.setItem('score', score)
  })
})
