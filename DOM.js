function changeToDialogue() {
    cleanDialogue()
    enterNow = 'dialogue'
    const actions = document.getElementById('actions')
    const dialogue = document.getElementById('dialogueBox')
    actions.style.display = 'none'
    dialogue.style.display = 'flex'
}

function changeToActions() {
    setTimeout(() => enterNow = 'selectAction', 1000)
    const actions = document.getElementById('actions')
    const dialogue = document.getElementById('dialogueBox')
    actions.style.display = 'flex'
    dialogue.style.display = 'none'
}

function removeActionsAnimation() {
    const allActions = document.getElementsByClassName('action')
    Array.from(allActions).forEach(action => {
        action.style.animationDelay = '0s'
        action.style.animationDuration = '.5s'
    })
}

function cleanDialogue() {
    const dialogue = document.getElementById('dialogueBox')
    dialogue.innerHTML = ''
}