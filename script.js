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
const userChoice = document.querySelector('.user-choice')

document.querySelectorAll('.buttons-group button').forEach((button) => {
  button.addEventListener('click', (e) => {
    makeDisappear('buttons-group')
    makeAppear('fight')
    userChoice.classList.add(e.currentTarget.dataset.choice)
  })
})

/* Rules dialog */
const rulesButton = document.querySelector('#rules-button')
const rulesDialog = document.querySelector('dialog.rules')

rulesButton.addEventListener('click', () => {
  rulesDialog.showModal()
})
