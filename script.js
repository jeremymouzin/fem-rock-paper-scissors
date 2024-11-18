const rulesButton = document.querySelector('#rules-button')
const rulesDialog = document.querySelector('dialog.rules')

rulesButton.addEventListener('click', () => {
  rulesDialog.showModal()
})
