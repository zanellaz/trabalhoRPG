function resetActionsAnimation() {
    const allActions = document.getElementsByClassName('action')
    Array.from(allActions).forEach(action => {
        action.classList.remove('selected')
    })
}

function changeToDialogue() {
    cleanDialogue()
    enterNow = 'dialogue'
    const actions = document.getElementById('actions')
    const dialogue = document.getElementById('dialogueBox')
    actions.style.display = 'none'
    dialogue.style.display = 'flex'
}

function changeToActions() {
    const actAnimationTime = 0.5
    delay(actAnimationTime).then(() => enterNow = 'selectAction')
    const actions = document.getElementById('actions')
    const dialogue = document.getElementById('dialogueBox')
    actions.style.display = 'flex'
    dialogue.style.display = 'none'
    hideArrow()
}

function removeActionsAnimation() {
    const allActions = document.getElementsByClassName('action')
    Array.from(allActions).forEach(action => {
        action.style.animationDelay = '0s'
        action.style.animationDuration = '.5s'
    })
}

function cleanDialogue() {
    const dialogue = document.getElementById('dialogue')
    dialogue.innerHTML = ''
}

function showArrow() {
    const arrow = document.getElementById('arrow')
    arrow.style.display = 'flex'
}

function hideArrow() {
    const arrow = document.getElementById('arrow')
    arrow.style.display = 'none'
}

async function loadMessages(messages = []) {
    const clearDialogue = () => document.getElementById('dialogue').innerHTML = ''
    changeToDialogue()
    for (const message of messages) {
        clearDialogue()
        const { time, text } = message
        keysPressed['Enter'] = false
        await showMessage(Array.from(text), time);
    }
    changeToActions()
}

async function showMessage(message, time) {
    const dialogue = document.getElementById('dialogue')
    if (keysPressed['Enter'])
        time = 0
    const letter = message[0]
    if(!letter) {
        showArrow()
        await waitingKeypress()
        return 
    }
    await delay(time).then(() => dialogue.textContent += letter);
    message.shift()
    return await showMessage(message, time)
}

function waitingKeypress() {
    return new Promise((resolve) => {
      document.addEventListener('keyup', upKeyHandler);
      function upKeyHandler(e) {
        if (e.keyCode === 13) {
          document.removeEventListener('keyup', upKeyHandler);
          document.addEventListener('keydown', downKeyHandler);
        }
    }
    function downKeyHandler(e) {
        if (e.keyCode === 13) {
            document.removeEventListener('keyup', downKeyHandler);
            resolve();
        }
    }
    if (!keysPressed['Enter'])
        document.addEventListener('keydown', downKeyHandler)
    })
  }