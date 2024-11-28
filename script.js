/* Please see README file for more explanations */

// Avoid tying CSS values with JavaScript code (if you update your CSS, you don't have to update your JavaScript code!)
const originalDisplayValues = new Map()

const fight = document.querySelector('.fight')
const buttonsGroup = document.querySelector('.buttons-group')
const result = document.querySelector('.result')

originalDisplayValues.set('fight', getComputedStyle(fight).display)
originalDisplayValues.set('buttons-group', getComputedStyle(buttonsGroup).display)
originalDisplayValues.set('result', getComputedStyle(result).display)

const userChoice = document.querySelector('.user-choice')
const userChoiceOriginalTransformValue = getComputedStyle(userChoice).transform

/* Make appear/disappear helper functions */
function hide(className) {
  const element = document.querySelector(`.${className}`)
  if (element) element.style.display = 'none'
}
function show(className) {
  const element = document.querySelector(`.${className}`)
  if (element) element.style.display = originalDisplayValues.get(className) || 'block'
}
function makeInvisible(className) {
  const element = document.querySelector(`.${className}`)
  if (element) element.style.visibility = 'hidden'
}
function makeVisible(className) {
  const element = document.querySelector(`.${className}`)
  if (element) element.style.removeProperty('visibility')
}

/* Elements that are hidden at start */
hide('fight')
hide('result')
show('buttons-group')

/* Pick a choice */
const TIME_TO_WAIT_BEFORE_HOUSE_PICK_CHOICE = 700
const TIME_BETWEEN_EACH_CHOICE_ITERATION = 100
const houseChoice = document.querySelector('.house-choice')
const playAgain = document.querySelector('.play-again')
const firstChoiceButton = document.querySelector('.choice.scissors')
let userChoiceValue
let houseChoiceValue
let lastPickedHouseChoice

function pickHouseChoice() {
  const CHOICES = ['rock', 'paper', 'scissors', 'lizard', 'spock']

  // We don't want to pick the same choice twice consecutively to avoid "lag" effect
  // when the button changes fast
  let houseChoiceNumber
  do {
    houseChoiceNumber = Math.floor(Math.random() * CHOICES.length)
  } while (lastPickedHouseChoice === houseChoiceNumber)
  lastPickedHouseChoice = houseChoiceNumber

  houseChoice.classList = 'choice house-choice ' + CHOICES[houseChoiceNumber]
  return CHOICES[houseChoiceNumber]
}

playAgain.addEventListener('click', () => {
  // Reset choices
  userChoice.classList.remove(userChoiceValue)
  houseChoice.classList.remove(houseChoiceValue)

  // Reset results
  userChoice.classList.remove('winner')
  houseChoice.classList.remove('winner')
  houseChoice.classList.remove('choice')

  // Hide results and get back to choice
  fight.classList.remove('results')
  hide('result')
  hide('fight')
  show('buttons-group')

  // Accessiblity improvement
  firstChoiceButton.focus()
})

document.querySelectorAll('.buttons-group button').forEach((button) => {
  button.addEventListener('click', (e) => {
    userChoiceValue = e.currentTarget.dataset.choice
    userChoice.classList.add(userChoiceValue)

    // Flying button animation
    flyingAnimation(e.currentTarget, () => {
      // Let's make the house pick a random choice
      const id = setInterval(pickHouseChoice, TIME_BETWEEN_EACH_CHOICE_ITERATION)
      setTimeout(() => {
        clearInterval(id)
        houseChoiceValue = pickHouseChoice()
        showResults(userChoiceValue, houseChoiceValue)
      }, TIME_TO_WAIT_BEFORE_HOUSE_PICK_CHOICE)
    })
  })
})

/* Show results of the fight */
const scoreSpan = document.querySelector('#score')
const SCORE_KEY = 'score'
let score = localStorage.getItem(SCORE_KEY) || 0
scoreSpan.textContent = score
const resultLabel = document.querySelector('#result-label')

function choice(userValue) {
  const losesAgainst = {
    rock: ['scissors', 'lizard'],
    paper: ['rock', 'spock'],
    scissors: ['paper', 'lizard'],
    lizard: ['spock', 'paper'],
    spock: ['scissors', 'rock'],
  }
  return {
    beats: function (houseValue) {
      return losesAgainst[userValue].includes(houseValue)
    },
  }
}

function showResults(userValue, houseValue) {
  let resultLabelValue = ''
  // Compute who wins
  if (userValue === houseValue) {
    resultLabelValue = 'draw'
  } else if (choice(userValue).beats(houseValue)) {
    resultLabelValue = 'you win'
    userChoice.classList.add('winner')
    score++
  } else {
    resultLabelValue = 'you lose'
    houseChoice.classList.add('winner')
    score--
  }

  resultLabel.textContent = resultLabelValue
  scoreSpan.textContent = score
  localStorage.setItem(SCORE_KEY, score)

  // Show result UI
  show('result')
  fight.classList.add('results')

  // Accessibility improvement
  playAgain.focus()
}

/* Rules dialog */
const rulesButton = document.querySelector('#rules-button')
const rulesDialog = document.querySelector('dialog.rules')

rulesButton.addEventListener('click', () => {
  rulesDialog.showModal()
})

/* WOW Effect animations */

function flyingAnimation(buttonClicked, callBack) {
  const { x: sourceX, y: sourceY } = buttonClicked.getBoundingClientRect()
  let iterations = 0

  function tryToStartFlyingAnimation(element) {
    // To get correct position, we must get rid of any transformation on the element
    userChoice.style.transform = 'none'
    userChoice.style.transition = 'none'
    const { x: destinationX, y: destinationY, width, height } = element.getBoundingClientRect()
    userChoice.style.removeProperty('transform')
    userChoice.style.removeProperty('transition')

    // If the UI didn't update, try again with 10ms delay (delay growing at each iteration)
    // to allow the browser to update the UI. Max retries are 11 (iterations goes from 0 to 10)
    if ((width === 0 || height === 0) && iterations <= 10) {
      setTimeout(() => tryToStartFlyingAnimation(element), 1 * iterations++)
      return
    }

    // Let's get the UI back for running animations
    hide('fight')
    makeVisible('fight')
    show('buttons-group')

    console.log(iterations)
    let animationEnabled = iterations <= 10

    let buttonCloned
    if (animationEnabled) {
      // Let's clone the button to let the buttons-group intact and disappear nicely
      buttonCloned = buttonClicked.cloneNode()
      buttonCloned.style.position = 'fixed'
      buttonCloned.style.insetInlineStart = `${sourceX}px`
      buttonCloned.style.insetBlockStart = `${sourceY}px`
      buttonCloned.classList.add('flying-button')

      document.querySelector('main').appendChild(buttonCloned)

      // Make the clicked button disappear
      buttonClicked.style.display = 'none'
    }

    buttonsGroup.addEventListener(
      'animationend',
      (e) => {
        if (e.animationName === 'fadeOut') {
          // Hides the buttons-group now it's fade out
          hide('buttons-group')
          buttonsGroup.classList.remove('fadeOut')
          // Make the clicked button get back in place
          if (animationEnabled) buttonClicked.style.removeProperty('display')
          // Let's fade in the next screen
          show('fight')
          fight.classList.add('fadeIn')
        }
      },
      {
        once: true,
      }
    )

    buttonsGroup.addEventListener(
      'animationstart',
      (e) => {
        if (e.animationName === 'fadeOut') {
          // If we failed to compute the destination position therefore we don't
          // animate it at all to avoid glitches
          if (animationEnabled) {
            buttonCloned.style.transform = userChoiceOriginalTransformValue
            buttonCloned.style.insetInlineStart = `${destinationX}px`
            buttonCloned.style.insetBlockStart = `${destinationY}px`
          }

          fight.addEventListener(
            'animationend',
            (e) => {
              if (e.animationName === 'fadeIn') {
                fight.classList.remove('fadeIn')
                if (animationEnabled) buttonCloned.remove()
                callBack()
              }
            },
            { once: true }
          )

          fight.classList.add('fadeIn')
        }
      },
      { once: true }
    )

    // This will kick start the animation process
    buttonsGroup.classList.add('fadeOut')
  }

  /*
  I need to compute the final destination position of the button.
  To compute actual correct position of the user-choice button I need to make it
  appear on screen briefly (even with visibility: hidden) but I need to get display
  property value other than none otherwise getBoundingClientRect() won't return correct values
  */
  hide('buttons-group')
  makeInvisible('fight')
  show('fight')

  setTimeout(() => tryToStartFlyingAnimation(userChoice), 0)
}
