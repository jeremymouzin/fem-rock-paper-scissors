/* Please see README file for more explanations */

// Avoid tying CSS values with JavaScript code (if you update your CSS, you don't have to update your JavaScript code!)
const originalDisplayValues = new Map()

const fight = document.querySelector('.fight')
const buttonsGroup = document.querySelector('.buttons-group')

originalDisplayValues.set('fight', getComputedStyle(fight).display)
originalDisplayValues.set('buttons-group', getComputedStyle(buttonsGroup).display)

/* Make appear/disappear helper functions */
function makeDisappear(className) {
  const element = document.querySelector(`.${className}`)
  if (element) element.style.display = 'none'
}
function makeAppear(className) {
  const element = document.querySelector(`.${className}`)
  if (element) element.style.display = originalDisplayValues.get(className) || 'block'
}

/* Elements that are hidden at start */
makeDisappear('fight')

/* Pick a choice */
const TIME_TO_WAIT_BEFORE_HOUSE_PICK_CHOICE = 700
const TIME_BETWEEN_EACH_CHOICE_ITERATION = 100
const userChoice = document.querySelector('.user-choice')
const houseChoice = document.querySelector('.house-choice')
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
}

document.querySelectorAll('.buttons-group button').forEach((button) => {
  button.addEventListener('click', (e) => {
    makeDisappear('buttons-group')
    makeAppear('fight')
    userChoice.classList.add(e.currentTarget.dataset.choice)

    // Let's make the house pick a random choice
    const id = setInterval(pickHouseChoice, TIME_BETWEEN_EACH_CHOICE_ITERATION)
    setTimeout(() => {
      clearInterval(id)
    }, TIME_TO_WAIT_BEFORE_HOUSE_PICK_CHOICE)
  })
})

/* Rules dialog */
const rulesButton = document.querySelector('#rules-button')
const rulesDialog = document.querySelector('dialog.rules')

rulesButton.addEventListener('click', () => {
  rulesDialog.showModal()
})
